/**
 * 离线城市识别
 * 策略：剥离动词前缀 → 用户别名表 → 精确命中 → 最长包含命中
 * 全程无网络、无大模型调用。
 */
import { PLACES, REGIONS } from './cities.js';

/* ---------- 索引 ---------- */

const norm = (s) =>
  String(s || '')
    .toLowerCase()
    .replace(/[\uFF01-\uFF5E]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xfee0)) // 全角转半角
    .replace(/[\s\u3000·・\-—_/\\|,，.。、:：;；'"'"'"《》<>()（）\[\]【】]/g, '');

const byKey = new Map();        // 归一化后的名称/别名 -> place
const nameKeys = [];            // 只含正式地名，按长度降序
const aliasKeys = [];           // 只含别名，按长度降序
const nameKeySet = new Set();

for (const p of PLACES) {
  const nk = norm(p.name);
  if (nk && !byKey.has(nk)) {
    byKey.set(nk, p);
    nameKeySet.add(nk);
  }
  for (const c of p.aliases) {
    const k = norm(c);
    if (k && !byKey.has(k)) byKey.set(k, p);
  }
}

// 正式地名优先于别名，各自内部按长度降序（"中国香港"优先于"香港"）
for (const k of new Set(byKey.keys())) {
  (nameKeySet.has(k) ? nameKeys : aliasKeys).push(k);
}
nameKeys.sort((a, b) => b.length - a.length);
aliasKeys.sort((a, b) => b.length - a.length);

/* ---------- 动词/时间前缀 ---------- */

const PREFIX = /^(?:我想去|我想|我想要|我要去|我要|打算去|计划去|准备去|想要去|想去|去一趟|走一趟|明年|后年|大后年|今年|去年|明年春天|下个月|这个月|寒假|暑假|春节|过年|十一|国庆|五一|元旦|假期|周末|去|到|前往|飞往|飞|游|玩|逛|打卡|旅行|旅游|自驾|徒步|骑行|出差|出差去|回)+/;

function stripPrefix(text) {
  let prev = null;
  let cur = text;
  let guard = 0;
  while (cur !== prev && guard++ < 8) {
    prev = cur;
    cur = cur.replace(PREFIX, '');
  }
  return cur;
}

/* ---------- 主函数 ---------- */

/**
 * @param {string} raw 用户输入，如"去南极看极光"
 * @param {object} userAliases 手动指定学习表 { "归一化原文": "标准地名" }
 * @returns {{name:string, region:string, matched:string, method:string}|null}
 */
export function resolve(raw, userAliases = {}) {
  const original = norm(raw);
  if (!original) return null;

  // 1. 用户手动指定过的，优先且直接命中
  if (userAliases[original]) {
    const p = byKey.get(norm(userAliases[original]));
    if (p) return pack(p, original, 'user');
  }

  const text = stripPrefix(original) || original;
  if (!text) return null;

  // 2. 整串精确命中
  if (byKey.has(text)) return pack(byKey.get(text), text, 'exact');
  if (byKey.has(original)) return pack(byKey.get(original), original, 'exact');

  // 3. 包含命中：先找正式地名，再找别名（避免"极光"这类通用别名盖过"冰岛"）
  for (const k of nameKeys) {
    if (k.length < 2) continue;
    if (text.includes(k)) return pack(byKey.get(k), k, 'contains-name');
  }
  for (const k of aliasKeys) {
    if (k.length < 2) continue;
    if (text.includes(k)) return pack(byKey.get(k), k, 'contains-alias');
  }

  return null;
}

function pack(place, matched, method) {
  return {
    name: place.name,
    region: place.region,
    matched,
    method,
  };
}

/* ---------- 区域信息 ---------- */

export function regionInfo(regionId) {
  return REGIONS[regionId] || REGIONS.other;
}

/* ---------- 封面图标：按语义猜，比一律用区域图标好看 ---------- */

const KEYWORD_EMOJI = [
  [/极光|aurora/i, '🌌'],
  [/泡汤|温泉/, '♨️'],
  [/滑雪|看雪|雪国|冰川|雪山|寒冬/, '❄️'],
  [/沙漠|戈壁|荒漠|沙漠公路/, '🏜️'],
  [/潜水|浮潜|海岛|沙滩|海滩|海岸|环岛/, '🏝️'],
  [/徒步|登顶|山峰|峡谷|山脉/, '🏔️'],
  [/古城|古镇|寺庙|寺院|故宫|城墙|遗迹/, '🏯'],
  [/草原|牧场|花海|油菜花|薰衣草/, '🌾'],
  [/湖|湖畔|河流|水乡|运河/, '🛶'],
  [/夜市|美食|小吃|吃/, '🍜'],
  [/自驾|公路|环线/, '🚐'],
  [/城市|夜景|都市|购物/, '🌃'],
];

export function emojiFor(text, regionId) {
  if (regionId === 'polar') return '🧊';
  const s = String(text || '');
  for (const [re, e] of KEYWORD_EMOJI) {
    if (re.test(s)) return e;
  }
  return REGIONS[regionId]?.emoji || '📍';
}

/** 供编辑页做"猜你想填"：返回前 N 个候选地名 */
export function suggest(text, limit = 6) {
  const t = norm(text);
  if (!t) return [];
  const out = [];
  const seen = new Set();
  for (const k of [...nameKeys, ...aliasKeys]) {
    if (out.length >= limit) break;
    if (k.length < 2) continue;
    if (!k.includes(t) && !t.includes(k)) continue;
    const p = byKey.get(k);
    if (seen.has(p.name)) continue;
    seen.add(p.name);
    out.push(p);
  }
  return out;
}

/** 全部地名，用于手动选择弹层的分组列表 */
export function allPlaces() {
  const map = new Map();
  for (const p of PLACES) {
    if (!map.has(p.name)) map.set(p.name, p);
  }
  return [...map.values()];
}
