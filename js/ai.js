/**
 * ai.js — AI 导入协议
 *
 * 设计要点：
 * 1. 任何 AI 只需输出 JSON 或一条 "站内 #/add?d=<JSON>" 链接即可。
 * 2. 解析容错：原样 JSON / URL 编码 / base64url / 夹带说明文字，全都试一遍。
 * 3. 导入永远是"预演 + 人工确认"，且只新增，不改不删。
 */
import { resolve, emojiFor } from './city.js';
import { siteURL } from './ui.js';

/* ============================================================
   编码 / 解码
   ============================================================ */

function bytesToB64Url(bytes) {
  let bin = '';
  const CH = 0x8000;
  for (let i = 0; i < bytes.length; i += CH) {
    bin += String.fromCharCode.apply(null, bytes.subarray(i, i + CH));
  }
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function b64UrlToBytes(s) {
  const pad = s.length % 4 === 0 ? '' : '='.repeat(4 - (s.length % 4));
  const b = s.replace(/-/g, '+').replace(/_/g, '/') + pad;
  const bin = atob(b);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

/** 把任意对象编成紧凑链接载荷（base64url） */
export function encodePayload(obj) {
  const json = JSON.stringify(obj);
  return bytesToB64Url(new TextEncoder().encode(json));
}

/**
 * 从一段文本里挖出 JSON。
 * AI 常常会先写"好的，这是你要的数据："再给 JSON，所以要能剥壳。
 */
export function extractJSON(text) {
  const s = String(text || '').trim();
  const first = (() => {
    let i1 = s.indexOf('{');
    let i2 = s.indexOf('[');
    if (i1 < 0) return i2;
    if (i2 < 0) return i1;
    return Math.min(i1, i2);
  })();
  if (first < 0) return s;

  const open = s[first];
  const close = open === '{' ? '}' : ']';
  let depth = 0;
  let inStr = false;
  let escp = false;
  for (let i = first; i < s.length; i++) {
    const c = s[i];
    if (inStr) {
      if (escp) escp = false;
      else if (c === '\\') escp = true;
      else if (c === '"') inStr = false;
      continue;
    }
    if (c === '"') { inStr = true; continue; }
    if (c === open) depth++;
    else if (c === close) {
      depth--;
      if (depth === 0) return s.slice(first, i + 1);
    }
  }
  return s.slice(first);
}

/** 多路尝试解析载荷 */
export function decodePayload(raw) {
  const attempts = [];
  const s = String(raw || '').trim();
  if (!s) throw new Error('内容为空');

  // 1. 直接是 JSON
  attempts.push(() => JSON.parse(extractJSON(s)));
  // 2. URL 编码后再解析
  attempts.push(() => JSON.parse(extractJSON(decodeURIComponent(s))));
  // 3. base64url
  attempts.push(() => {
    const clean = s.replace(/\s/g, '');
    const txt = new TextDecoder().decode(b64UrlToBytes(clean));
    return JSON.parse(extractJSON(txt));
  });
  // 4. base64 后再 URL 解码
  attempts.push(() => {
    const clean = decodeURIComponent(s).replace(/\s/g, '');
    const txt = new TextDecoder().decode(b64UrlToBytes(clean));
    return JSON.parse(extractJSON(txt));
  });

  let lastErr = null;
  for (const fn of attempts) {
    try {
      const out = fn();
      if (out && typeof out === 'object') return out;
    } catch (e) {
      lastErr = e;
    }
  }
  throw new Error('无法识别这段数据（既不是 JSON，也不是有效的分享链接）' + (lastErr ? '：' + lastErr.message : ''));
}

/* ============================================================
   从 URL hash 中取出载荷
   ============================================================ */

/** 判断当前 hash 是否是导入指令；返回 { payload, raw } */
export function readImportHash(hash) {
  const h = String(hash || '').replace(/^#/, '');
  if (!h) return null;
  // 支持 #/add?d=... 与 #add?d=...
  const m = h.match(/^\/?add(?:\?(.*))?$/i);
  if (m) {
    const qs = new URLSearchParams(m[1] || '');
    const d = qs.get('d') || qs.get('data') || qs.get('payload');
    if (!d) return null;
    return { raw: d, payload: decodePayload(d) };
  }
  return null;
}

/* ============================================================
   把任意形状的 AI 输出规范成路书草稿
   ============================================================ */

const pick = (o, ...keys) => {
  for (const k of keys) {
    if (o[k] !== undefined && o[k] !== null && o[k] !== '') return o[k];
  }
  return undefined;
};

function normDate(v) {
  if (!v) return null;
  const s = String(v).trim();
  let m = s.match(/(\d{4})[-/.年](\d{1,2})[-/.月](\d{1,2})/);
  if (m) return `${m[1]}-${String(m[2]).padStart(2, '0')}-${String(m[3]).padStart(2, '0')}`;
  m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;
  return null;
}

function normYm(v) {
  if (!v) return null;
  const s = String(v).trim();
  const m = s.match(/(\d{4})[-/.年](\d{1,2})/);
  if (m) return `${m[1]}-${String(m[2]).padStart(2, '0')}`;
  return null;
}

function guessEmoji(city, region, title = '') {
  return emojiFor(`${city} ${title}`, region);
}

/**
 * 单体规范化。
 * @param {object} raw AI 给的一条数据
 * @param {string} defaultStatus 'wish' | 'planning'
 */
export function normalizeDraft(raw, defaultStatus = 'wish') {
  if (!raw || typeof raw !== 'object') return null;

  const title = String(pick(raw, 'title', 'name', '标题', '名称', '目的地') || '').trim();
  const cityRaw = String(pick(raw, 'cityRaw', 'city', '城市', '地点', 'destination', 'place') || '').trim();
  if (!title && !cityRaw) return null;

  const hit = resolve(cityRaw || title, {});
  const city = hit?.name || cityRaw || '';
  const region = hit?.region || 'other';

  const startDate = normDate(pick(raw, 'startDate', 'start', 'from', '出发日期', '开始日期'));
  const endDate = normDate(pick(raw, 'endDate', 'end', 'to', '返回日期', '结束日期'));
  const dateText = String(pick(raw, 'dateText', 'date', 'when', '时间', '日期描述') || '').trim();

  let dateMode = 'none';
  if (startDate) dateMode = 'exact';
  else if (dateText) dateMode = 'fuzzy';

  // 正文块
  const blocks = [];
  const rawBlocks = pick(raw, 'blocks', 'sections', 'content', '正文', '攻略', '详情');
  if (typeof rawBlocks === 'string' && rawBlocks.trim()) {
    blocks.push({ type: 'text', title: '', body: rawBlocks.trim().slice(0, 4000) });
  } else if (Array.isArray(rawBlocks)) {
    for (const b of rawBlocks) {
      if (typeof b === 'string') {
        if (b.trim()) blocks.push({ type: 'text', title: '', body: b.trim().slice(0, 4000) });
        continue;
      }
      if (!b || typeof b !== 'object') continue;
      const type = String(b.type || '').toLowerCase();
      if (type === 'todo' || type === 'checklist' || type === 'list') {
        const items = (b.items || b.list || []).map((i) =>
          typeof i === 'string' ? { t: i.slice(0, 200), done: false } : { t: String(i?.t || i?.text || '').slice(0, 200), done: !!i?.done }
        ).filter((i) => i.t);
        if (items.length) blocks.push({ type: 'todo', title: b.title || '准备清单', items });
      } else if (type === 'link' || b.url) {
        if (b.url) blocks.push({ type: 'link', title: b.title || '', url: String(b.url), body: String(b.body || '') });
      } else if (type === 'day' || b.day) {
        blocks.push({
          type: 'day',
          day: Number(b.day) || 1,
          title: String(b.title || '').slice(0, 80),
          body: String(b.body || b.text || '').slice(0, 4000),
        });
      } else if (b.body || b.text) {
        blocks.push({
          type: 'text',
          title: String(b.title || '').slice(0, 80),
          body: String(b.body || b.text).slice(0, 4000),
        });
      }
    }
  }

  // 没有结构化正文，但有摘要字段
  if (!blocks.length) {
    const body = pick(raw, 'body', 'brief', 'summary', '备注', '简介', 'description');
    if (body) blocks.push({ type: 'text', title: '', body: String(body).slice(0, 4000) });
  }

  const brief = String(pick(raw, 'brief', 'summary', '一句话', '简介') || '').trim().slice(0, 200);

  const statusHint = String(pick(raw, 'status', '状态') || '').toLowerCase();
  let promoted = defaultStatus !== 'wish';
  if (statusHint === 'planning' || statusHint === 'ongoing' || statusHint === 'road' || statusHint === '路上') {
    promoted = true;
  }
  if (statusHint === 'wish' || statusHint === '想去' || statusHint === 'idea') {
    promoted = false;
  }

  return {
    title: title || cityRaw || '未命名路书',
    cityRaw: cityRaw || title,
    city,
    region,
    dateMode,
    startDate,
    endDate,
    dateText,
    roughYm: normYm(pick(raw, 'roughYm', 'month', '月份')),
    brief,
    blocks: blocks.slice(0, 30),
    cover: { emoji: guessEmoji(city, region, title), tone: regionTone(region), imgId: null },
    promotedAt: promoted ? new Date().toISOString() : null,
    source: 'ai',
    _matched: hit,
  };
}

function regionTone(region) {
  const map = {
    'cn-north': 5, 'cn-east': 3, 'cn-south': 2, 'cn-central': 5, 'cn-southwest': 0,
    'cn-northwest': 1, 'cn-northeast': 6, 'cn-hkmo': 4, 'cn-tw': 7,
    'asia-se': 2, 'asia-e': 7, 'asia-s': 1, 'asia-w': 1, europe: 4,
    namerica: 3, samerica: 2, africa: 1, oceania: 3, polar: 0, other: 6,
  };
  return map[region] ?? 6;
}

/** 一个载荷可能包含 1 条或多条 */
export function toDrafts(payload, defaultStatus = 'wish') {
  if (!payload) return [];
  // 直传数组
  if (Array.isArray(payload)) {
    return payload.map((p) => normalizeDraft(p, defaultStatus)).filter(Boolean);
  }
  // 备份文件形态：{ trips: [...] }
  if (Array.isArray(payload.trips)) {
    return payload.trips.map((p) => normalizeDraft(p, defaultStatus)).filter(Boolean);
  }
  // 单条
  const one = normalizeDraft(payload, defaultStatus);
  return one ? [one] : [];
}

/* ============================================================
   反向：把路书编成可分享的链接
   ============================================================ */

/**
 * 把路书编成可分享的链接
 * 必须基于 siteURL()，否则会丢掉线上分享链接的 sharecode 参数，对方打不开
 */
export function makeShareLink(trip, origin = siteURL()) {
  const payload = {
    title: trip.title,
    city: trip.cityRaw || trip.city,
    status: trip.promotedAt ? 'planning' : 'wish',
    dateText: trip.dateMode === 'fuzzy' ? trip.dateText : undefined,
    startDate: trip.dateMode === 'exact' ? trip.startDate : undefined,
    endDate: trip.dateMode === 'exact' ? trip.endDate : undefined,
    brief: trip.brief,
    blocks: trip.blocks,
  };
  return `${origin}#/add?d=${encodePayload(payload)}`;
}

export function makeEmptyAddLink(origin = siteURL()) {
  return `${origin}#/add?d=${encodePayload({ title: '示例：去南极', city: '南极', brief: '说明 AI 应该按什么格式给你数据' })}`;
}
