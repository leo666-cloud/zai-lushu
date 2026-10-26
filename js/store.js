/**
 * store.js — 数据层
 * 主数据 localStorage；图片 IndexedDB（压缩后的 webp blob）。
 * 全部数据只存在于本设备浏览器，无任何网络请求。
 */
import { DEMO_PROMOTED, DEMO_WISHES } from './demo-data.js';

const KEY = 'lushu.v1';
const BAK = 'lushu.v1.bak';
const EMOJI_POOL = ['📍','🧊','🏝️','🏔️','🏜️','🌊','🌃','🏯','🕌','🗽','🏰','🌿','🦁','🐨','🌋','🚂','⛵','🎡','🗺️','🌅','❄️','🍜','🎿','🏖️','🌌','♨️','🌾','🛶','🚐','⛩️','🐧','✨','🏺','🚡'];

/* ============================================================
   基础工具
   ============================================================ */

export function uid() {
  return 't_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 7);
}

export function todayStr(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function curYm(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function parseD(s) {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, (m || 1) - 1, d || 1).getTime();
}

function clamp(n, a, b) {
  return Math.min(b, Math.max(a, n));
}

function clone(o) {
  return typeof structuredClone === 'function' ? structuredClone(o) : JSON.parse(JSON.stringify(o));
}

/* ============================================================
   状态
   ============================================================ */

let state = null;

function blank() {
  return {
    version: 1,
    trips: [],
    aliases: {},
    settings: { theme: 'auto', seededEmoji: 0 },
    updatedAt: new Date().toISOString(),
  };
}

function normalizeTrip(t) {
  const o = {
    id: t.id || uid(),
    title: String(t.title || '未命名路书').slice(0, 60),
    cityRaw: String(t.cityRaw || ''),
    city: String(t.city || ''),
    region: String(t.region || 'other'),
    manualStatus: t.manualStatus || null,
    promotedAt: t.promotedAt || null,
    wasWish: !!t.wasWish,
    wishHidden: !!t.wishHidden,
    demo: !!t.demo,
    dateMode: t.dateMode === 'exact' || t.dateMode === 'fuzzy' ? t.dateMode : 'none',
    startDate: t.startDate || null,
    endDate: t.endDate || null,
    dateText: String(t.dateText || ''),
    roughYm: t.roughYm || null,
    cover: {
      emoji: t.cover?.emoji || EMOJI_POOL[0],
      tone: Number.isFinite(t.cover?.tone) ? clamp(t.cover.tone, 0, 7) : 6,
      imgId: t.cover?.imgId || null,
    },
    brief: String(t.brief || ''),
    blocks: Array.isArray(t.blocks) ? t.blocks.map(normalizeBlock).filter(Boolean) : [],
    location: normalizeLocation(t.location),
    ledger: normalizeLedger(t.ledger),
    share: normalizeShare(t.share),
    source: t.source === 'ai' ? 'ai' : 'manual',
    createdAt: t.createdAt || new Date().toISOString(),
    updatedAt: t.updatedAt || new Date().toISOString(),
  };
  return o;
}

/* ---------- 定位 ---------- */

function normalizeLocation(loc) {
  if (!loc || typeof loc !== 'object') return null;
  const lat = Number(loc.lat);
  const lng = Number(loc.lng);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null;
  return {
    lat: Number(lat.toFixed(5)),
    lng: Number(lng.toFixed(5)),
    name: String(loc.name || '').slice(0, 40),
  };
}

/* ---------- 账本 ---------- */

export const LEDGER_CATEGORIES = [
  { id: 'transport', name: '交通', emoji: '✈️' },
  { id: 'stay', name: '住宿', emoji: '🏨' },
  { id: 'food', name: '餐饮', emoji: '🍜' },
  { id: 'ticket', name: '门票', emoji: '🎫' },
  { id: 'shopping', name: '购物', emoji: '🛍️' },
  { id: 'other', name: '其他', emoji: '📦' },
];

const CATEGORY_IDS = new Set(LEDGER_CATEGORIES.map((c) => c.id));

export function categoryInfo(id) {
  return LEDGER_CATEGORIES.find((c) => c.id === id) || LEDGER_CATEGORIES[LEDGER_CATEGORIES.length - 1];
}

function normalizeLedger(l) {
  if (!l || typeof l !== 'object') return { budget: 0, entries: [] };
  const entries = Array.isArray(l.entries)
    ? l.entries
        .map((e) => {
          if (!e || typeof e !== 'object') return null;
          const amount = Math.round(Number(e.amount));
          if (!Number.isFinite(amount) || amount === 0) return null;
          const d = String(e.date || '');
          return {
            id: e.id || uid(),
            date: /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : todayStr(),
            title: String(e.title || '支出').slice(0, 40),
            amount,
            category: CATEGORY_IDS.has(e.category) ? e.category : 'other',
          };
        })
        .filter(Boolean)
    : [];
  return {
    budget: Math.max(0, Math.round(Number(l.budget) || 0)),
    entries,
  };
}

/** 这条路书已花多少 */
export function ledgerSpent(trip) {
  return (trip.ledger?.entries || []).reduce((n, e) => n + e.amount, 0);
}

/** 按年汇总实际支出；年按每笔的记账日期算 */
export function yearSpent(trips, year = new Date().getFullYear()) {
  const y = String(year);
  let total = 0;
  let count = 0;
  const tripIds = new Set();
  const byCategory = {};

  for (const t of trips) {
    for (const e of t.ledger?.entries || []) {
      if ((e.date || '').slice(0, 4) !== y) continue;
      total += e.amount;
      count++;
      tripIds.add(t.id);
      byCategory[e.category] = (byCategory[e.category] || 0) + e.amount;
    }
  }
  return { year: Number(year), total, count, trips: tripIds.size, byCategory };
}

/** 记一笔 */
export function addExpense(id, entry) {
  const t = getTrip(id);
  if (!t) return null;
  const next = normalizeLedger({
    budget: t.ledger?.budget || 0,
    entries: [...(t.ledger?.entries || []), { ...entry, id: uid() }],
  });
  updateTrip(id, { ledger: next });
  return next;
}

/** 删一笔 */
export function removeExpense(id, entryId) {
  const t = getTrip(id);
  if (!t) return null;
  const next = normalizeLedger({
    budget: t.ledger?.budget || 0,
    entries: (t.ledger?.entries || []).filter((e) => e.id !== entryId),
  });
  updateTrip(id, { ledger: next });
  return next;
}

/** 改预算 */
export function setBudget(id, budget) {
  const t = getTrip(id);
  if (!t) return null;
  const next = normalizeLedger({ budget, entries: t.ledger?.entries || [] });
  updateTrip(id, { ledger: next });
  return next;
}

function normalizeBlock(b) {
  if (!b || typeof b !== 'object') return null;
  const type = ['text', 'day', 'todo', 'link'].includes(b.type) ? b.type : 'text';
  if (type === 'todo') {
    const items = Array.isArray(b.items)
      ? b.items.map((i) => ({ t: String(i?.t ?? i ?? '').slice(0, 200), done: !!i?.done })).filter((i) => i.t)
      : [];
    return { type, title: String(b.title || '清单').slice(0, 80), items };
  }
  if (type === 'link') {
    const url = String(b.url || b.text || '');
    if (!url) return null;
    return {
      type,
      title: String(b.title || '').slice(0, 80),
      url,
      body: String(b.body || ''),
    };
  }
  if (type === 'day') {
    return {
      type,
      day: Number(b.day) || 1,
      title: String(b.title || '').slice(0, 80),
      body: String(b.body || b.text || '').slice(0, 8000),
      stops: Array.isArray(b.stops) ? b.stops.map(normalizeStop).filter(Boolean) : [],
      meals: Array.isArray(b.meals) ? b.meals.map(normalizeMeal).filter(Boolean) : [],
      photos: Array.isArray(b.photos) ? b.photos.map(normalizePhoto).filter(Boolean) : [],
    };
  }
  return {
    type,
    title: String(b.title || '').slice(0, 80),
    body: String(b.body || b.text || '').slice(0, 8000),
  };
}

/* ---------- day 块的子结构：停留点与餐食 ---------- */

/** 一天里的一个点：玩多久、有什么来历、怎么过去 */
const TRANSIT_MODES = new Set(['walk', 'bus', 'metro', 'taxi', 'car', 'boat', 'train', 'flight']);

function normalizeStop(s) {
  if (!s || typeof s !== 'object') return null;
  const name = String(s.name || '').trim().slice(0, 40);
  if (!name) return null;
  const lat = Number(s.lat);
  const lng = Number(s.lng);
  const hasGeo = Number.isFinite(lat) && Number.isFinite(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;

  let transit = null;
  if (s.transit && typeof s.transit === 'object') {
    const mode = TRANSIT_MODES.has(s.transit.mode) ? s.transit.mode : 'car';
    const minutes = Math.max(0, Math.round(Number(s.transit.minutes) || 0));
    if (minutes > 0 || s.transit.note) {
      transit = { mode, minutes, note: String(s.transit.note || '').slice(0, 60) };
    }
  }

  return {
    name,
    start: normTime(s.start),
    duration: Math.max(0, Math.round(Number(s.duration) || 0)),
    story: String(s.story || '').slice(0, 900),
    lat: hasGeo ? Number(lat.toFixed(5)) : null,
    lng: hasGeo ? Number(lng.toFixed(5)) : null,
    transit,
  };
}

/** "9:30" / "09:30" / "0930" 都归一成 "09:30"，认不出就留空 */
function normTime(v) {
  const str = String(v || '').trim();
  const m = str.match(/^(\d{1,2})[:：]?(\d{2})$/);
  if (!m) return '';
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h > 23 || min > 59) return '';
  return `${String(h).padStart(2, '0')}:${m[2]}`;
}

const MEAL_TYPES = new Set(['breakfast', 'lunch', 'dinner', 'snack']);

/** 一天里的一张照片：存在 IndexedDB，这里只存引用 */
function normalizePhoto(p) {
  if (!p || typeof p !== 'object') return null;
  const imgId = String(p.imgId || '');
  const demoSrc = String(p.demoSrc || '');
  if (!imgId && !demoSrc) return null;
  return {
    id: p.id || uid(),
    imgId: imgId || null,
    demoSrc: demoSrc || null,
    caption: String(p.caption || '').slice(0, 60),
    at: normTime(p.at),
  };
}

/** 当前时间 HH:MM */
function nowTime() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

/** 给某一天加一张照片（file 传进来后压缩存 IndexedDB） */
export async function addPhoto(tripId, blockIndex, file, caption = '') {
  const t = getTrip(tripId);
  const block = t?.blocks?.[blockIndex];
  if (!block || block.type !== 'day') throw new Error('这一天不存在');

  const blob = await compressImage(file, 1600, 0.82);
  const imgId = await putImageBlob(blob);

  const photo = normalizePhoto({ imgId, caption, at: nowTime() });
  const photos = [...(block.photos || []), photo];

  updateTrip(tripId, {
    blocks: t.blocks.map((b, i) => (i === blockIndex ? { ...b, photos } : b)),
  });
  return photo;
}

/** 删一张照片（连图片一起清掉） */
export async function removePhoto(tripId, blockIndex, photoId) {
  const t = getTrip(tripId);
  const block = t?.blocks?.[blockIndex];
  if (!block?.photos?.length) return;

  const target = block.photos.find((p) => p.id === photoId);
  const photos = block.photos.filter((p) => p.id !== photoId);

  updateTrip(tripId, {
    blocks: t.blocks.map((b, i) => (i === blockIndex ? { ...b, photos } : b)),
  });

  if (target?.imgId) await deleteImage(target.imgId).catch(() => {});
}

/** 改照片说明 */
export function setPhotoCaption(tripId, blockIndex, photoId, caption) {
  const t = getTrip(tripId);
  const block = t?.blocks?.[blockIndex];
  if (!block?.photos?.length) return;
  const photos = block.photos.map((p) =>
    p.id === photoId ? { ...p, caption: String(caption || '').slice(0, 60) } : p
  );
  updateTrip(tripId, {
    blocks: t.blocks.map((b, i) => (i === blockIndex ? { ...b, photos } : b)),
  });
}

function normalizeMeal(m) {
  if (!m || typeof m !== 'object') return null;
  const name = String(m.name || '').trim().slice(0, 40);
  if (!name) return null;
  const lat = Number(m.lat);
  const lng = Number(m.lng);
  const hasGeo = Number.isFinite(lat) && Number.isFinite(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
  return {
    type: MEAL_TYPES.has(m.type) ? m.type : 'snack',
    start: normTime(m.start),
    name,
    note: String(m.note || '').slice(0, 60),
    lat: hasGeo ? Number(lat.toFixed(5)) : null,
    lng: hasGeo ? Number(lng.toFixed(5)) : null,
  };
}

export function load() {
  if (state) return state;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      state = {
        ...blank(),
        ...parsed,
        trips: Array.isArray(parsed.trips) ? parsed.trips.map(normalizeTrip) : [],
        aliases: parsed.aliases && typeof parsed.aliases === 'object' ? parsed.aliases : {},
        settings: { ...blank().settings, ...(parsed.settings || {}) },
      };
      return state;
    }
  } catch (e) {
    console.warn('[路书] 读取失败，尝试备份', e);
    try {
      const bak = localStorage.getItem(BAK);
      if (bak) state = JSON.parse(bak);
    } catch (_) { /* ignore */ }
  }
  if (!state) state = blank();
  return state;
}

export function save() {
  const s = load();
  s.updatedAt = new Date().toISOString();
  try {
    const prev = localStorage.getItem(KEY);
    if (prev && prev !== JSON.stringify(s)) {
      localStorage.setItem(BAK, prev);
    }
    localStorage.setItem(KEY, JSON.stringify(s));
    return true;
  } catch (e) {
    console.error('[路书] 保存失败（可能存储已满）', e);
    throw new Error('保存失败：本地存储空间可能已满，请先导出备份并清理部分图片。');
  }
}

export function getApp() {
  return load();
}

export function getTrip(id) {
  return load().trips.find((t) => t.id === id) || null;
}

/* ============================================================
   状态机
   ============================================================ */

export const STATUS = {
  WISH: 'wish',
  PLANNING: 'planning',
  ONGOING: 'ongoing',
  DONE: 'done',
};

export const STATUS_TEXT = {
  wish: '想去',
  planning: '即将出发',
  ongoing: '进行中',
  done: '已结束',
};

/**
 * 计算一条路书的真实状态。
 * @returns {{status:string, needsConfirm:boolean, reason:string}}
 */
export function tripState(trip, today = todayStr()) {
  // 手动覆盖优先（"拉回路上""标记结束"）
  if (trip.manualStatus) {
    return { status: trip.manualStatus, needsConfirm: false, reason: 'manual' };
  }

  if (!trip.promotedAt) {
    return { status: STATUS.WISH, needsConfirm: false, reason: 'wish' };
  }

  if (trip.dateMode === 'exact' && trip.startDate) {
    const s = trip.startDate;
    const e = trip.endDate || null;
    if (e) {
      if (today > e) return { status: STATUS.DONE, needsConfirm: false, reason: 'past-end' };
      if (today >= s) return { status: STATUS.ONGOING, needsConfirm: false, reason: 'in-range' };
      return { status: STATUS.PLANNING, needsConfirm: false, reason: 'before-start' };
    }
    // 只有开始日，没有结束日：出发后一直算进行中，直到手动结束
    if (today >= s) return { status: STATUS.ONGOING, needsConfirm: false, reason: 'no-end' };
    return { status: STATUS.PLANNING, needsConfirm: false, reason: 'before-start' };
  }

  if (trip.dateMode === 'fuzzy' && trip.roughYm) {
    const now = curYm();
    if (now > trip.roughYm) {
      // 模糊时间已过 —— 不自动归档，只做软提示，避免误判
      return { status: STATUS.PLANNING, needsConfirm: true, reason: 'fuzzy-passed' };
    }
    if (now === trip.roughYm) {
      return { status: STATUS.ONGOING, needsConfirm: false, reason: 'fuzzy-in-month' };
    }
    return { status: STATUS.PLANNING, needsConfirm: false, reason: 'fuzzy-future' };
  }

  return { status: STATUS.PLANNING, needsConfirm: false, reason: 'undated' };
}

/** 行程进度（仅精确日期可用） */
export function tripProgress(trip, today = todayStr()) {
  if (trip.dateMode !== 'exact' || !trip.startDate || !trip.endDate) return null;
  const s = parseD(trip.startDate);
  const e = parseD(trip.endDate);
  const t = parseD(today);
  if (e < s) return null;
  const total = Math.round((e - s) / 86400000) + 1;
  const passed = Math.round((t - s) / 86400000) + 1;
  return {
    day: clamp(passed, 0, total),
    total,
    pct: clamp(Math.round((passed / total) * 100), 0, 100),
    notStarted: t < s,
    ended: t > e,
  };
}

/* ============================================================
   增删改
   ============================================================ */

export function createTrip(partial = {}) {
  const s = load();
  const t = normalizeTrip({
    ...partial,
    id: uid(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  s.trips.unshift(t);
  save();
  return t;
}

export function updateTrip(id, patch) {
  const s = load();
  const i = s.trips.findIndex((t) => t.id === id);
  if (i < 0) return null;
  const merged = normalizeTrip({
    ...s.trips[i],
    ...patch,
    cover: { ...s.trips[i].cover, ...(patch.cover || {}) },
    updatedAt: new Date().toISOString(),
  });
  s.trips[i] = merged;
  save();
  return merged;
}

export function deleteTrip(id) {
  const s = load();
  const i = s.trips.findIndex((t) => t.id === id);
  if (i < 0) return false;
  const [removed] = s.trips.splice(i, 1);
  if (removed.cover?.imgId) deleteImage(removed.cover.imgId).catch(() => {});
  save();
  return true;
}

/** 想去 → 路上。打上 wasWish 标记，让它继续留在「想去」列表里沉底，而不是凭空消失 */
export function promoteTrip(id) {
  return updateTrip(id, { promotedAt: new Date().toISOString(), manualStatus: null, wasWish: true });
}

/** 手动改状态；传 null 恢复自动判定 */
export function setManualStatus(id, status) {
  if (status === STATUS.WISH) {
    return updateTrip(id, { manualStatus: null, promotedAt: null, wasWish: false, wishHidden: false });
  }
  return updateTrip(id, { manualStatus: status });
}

/** 从"想去"列表隐藏（不删除攻略本身） */
export function hideFromWish(id, hidden = true) {
  return updateTrip(id, { wishHidden: hidden });
}

/* ---------- 分享页 ---------- */

/** 分享页的可编辑部分；null 表示还没做过，用默认值渲染 */
function normalizeShare(s) {
  if (!s || typeof s !== 'object') return null;
  return {
    title: String(s.title || '').slice(0, 60),
    lead: String(s.lead || '').slice(0, 240),
    coverPhotoId: s.coverPhotoId || null,
    photoIds: Array.isArray(s.photoIds) ? s.photoIds.filter((x) => typeof x === 'string').slice(0, 40) : [],
    showLedger: s.showLedger !== false,
    updatedAt: s.updatedAt || new Date().toISOString(),
  };
}

/** 路书结束后才谈得上"分享" */
export function canShare(trip) {
  return tripState(trip).status === STATUS.DONE;
}

/** 拿分享配置；没配过就用路书本身生成一份默认的 */
export function shareConfig(trip) {
  const allPhotos = (trip.blocks || [])
    .filter((b) => b.type === 'day')
    .flatMap((b) => (b.photos || []).map((p) => ({ ...p, day: b.day })));

  if (trip.share) {
    return {
      ...trip.share,
      photoIds: trip.share.photoIds.length ? trip.share.photoIds : allPhotos.map((p) => p.id),
    };
  }
  return {
    title: trip.title,
    lead: trip.brief || '',
    coverPhotoId: allPhotos[0]?.id || null,
    photoIds: allPhotos.map((p) => p.id),
    showLedger: true,
    updatedAt: null,
  };
}

export function saveShare(tripId, patch) {
  const t = getTrip(tripId);
  if (!t) return null;
  const cur = shareConfig(t);
  const next = normalizeShare({ ...cur, ...patch, updatedAt: new Date().toISOString() });
  updateTrip(tripId, { share: next });
  return next;
}

/* ============================================================
   示例数据
   ============================================================ */

const SEED_FLAG = 'lushu.demoSeeded';
const CLEARED_FLAG = 'lushu.demoCleared';

/** 把示例追加进当前库（不碰已有数据）；已有示例时直接返回 */
export function loadDemo() {
  const s = load();
  if (s.trips.some((t) => t.demo)) return { added: 0, already: true };

  const now = new Date().toISOString();
  const stamp = (i) => new Date(Date.now() - i * 60000).toISOString();

  const tripped = DEMO_PROMOTED.map((d, i) => normalizeTrip({
    ...d,
    demo: true,
    source: 'manual',
    promotedAt: now,
    createdAt: stamp(i),
    updatedAt: now,
  }));

  const wished = DEMO_WISHES.map((d, i) => normalizeTrip({
    ...d,
    demo: true,
    source: 'manual',
    promotedAt: null,
    createdAt: stamp(i + 10),
    updatedAt: now,
  }));

  s.trips = [...tripped, ...wished, ...s.trips];
  save();

  try {
    localStorage.setItem(SEED_FLAG, '1');
    // 主动载入示例时，把"已清空"标记撤掉，让它重新能被清空
    localStorage.removeItem(CLEARED_FLAG);
  } catch (_) { /* 隐私模式 */ }

  return { added: tripped.length + wished.length, already: false };
}

/** 写入示例（首次打开、库为空时调用，等同 loadDemo） */
export function seedDemo() {
  return loadDemo();
}

/** 是否已经写过示例 */
export function demoSed() {
  try {
    return localStorage.getItem(SEED_FLAG) === '1';
  } catch (_) {
    return false;
  }
}

/** 还有没有示例残留 */
export function hasDemo() {
  return load().trips.some((t) => t.demo);
}

/** 是否该显示「清空示例」这条提示（清空过一次就永远不显示） */
export function shouldShowDemoBar() {
  try {
    if (localStorage.getItem(CLEARED_FLAG) === '1') return false;
  } catch (_) { /* ignore */ }
  return hasDemo();
}

/** 一次性清空所有示例；返回删掉的条数 */
export function clearDemo() {
  const s = load();
  const before = s.trips.length;
  s.trips = s.trips.filter((t) => !t.demo);
  const removed = before - s.trips.length;
  save();
  try {
    localStorage.setItem(CLEARED_FLAG, '1');
  } catch (_) { /* ignore */ }
  return removed;
}

export function addAlias(raw, cityName) {
  const s = load();
  const k = String(raw || '').trim().toLowerCase();
  if (!k || !cityName) return;
  s.aliases[k] = cityName;
  save();
}

/* ============================================================
   查询
   ============================================================ */

export function bucketOf(trips, today = todayStr()) {
  const road = [];
  const wish = [];
  const past = [];
  const wishDone = [];

  for (const t of trips) {
    const st = tripState(t, today).status;
    if (st === STATUS.WISH) {
      wish.push(t);
    } else if (st === STATUS.DONE) {
      past.push(t);
      // 只有"从想去里长出来的"才在想去列表沉底；直接新建的行程不该出现在这里
      if (t.wasWish && !t.wishHidden) wishDone.push(t);
    } else if (t.wasWish && !t.wishHidden) {
      wishDone.push(t);
      road.push(t);
    } else {
      road.push(t);
    }
  }

  // 想去的沉底项：按升级时间倒序沉底
  wishDone.sort((a, b) => String(b.promotedAt).localeCompare(String(a.promotedAt)));
  road.sort(sortRoad);
  past.sort((a, b) => String(b.endDate || b.updatedAt).localeCompare(String(a.endDate || a.updatedAt)));
  return { road, wish, past, wishDone };
}

function sortRoad(a, b) {
  const rank = { ongoing: 0, planning: 1 };
  const ra = rank[tripState(a).status] ?? 2;
  const rb = rank[tripState(b).status] ?? 2;
  if (ra !== rb) return ra - rb;
  return String(a.startDate || a.createdAt).localeCompare(String(b.startDate || b.createdAt));
}

/* ============================================================
   图片（IndexedDB）
   ============================================================ */

const DB_NAME = 'lushu-db';
const DB_STORE = 'imgs';
let dbPromise = null;
const urlCache = new Map();

function openDB() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) return resolve(null);
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(DB_STORE)) db.createObjectStore(DB_STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  }).catch((e) => {
    console.warn('[路书] IndexedDB 不可用，图片功能降级', e);
    return null;
  });
  return dbPromise;
}

async function tx(mode, fn) {
  const db = await openDB();
  if (!db) return null;
  return new Promise((resolve, reject) => {
    const t = db.transaction(DB_STORE, mode);
    const store = t.objectStore(DB_STORE);
    let out;
    try {
      out = fn(store);
    } catch (e) {
      reject(e);
      return;
    }
    t.oncomplete = () => resolve(out && out.__req ? out.__req.result : out);
    t.onerror = () => reject(t.error);
    t.onabort = () => reject(t.error);
  });
}

export async function putImageBlob(blob) {
  const id = 'img_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 6);
  const ok = await tx('readwrite', (store) => {
    const req = store.put(blob, id);
    return { __req: req };
  });
  if (ok === null) throw new Error('当前浏览器不支持本地图片存储');
  return id;
}

export async function getImageURL(id) {
  if (!id) return null;
  if (urlCache.has(id)) return urlCache.get(id);
  const blob = await tx('readonly', (store) => ({ __req: store.get(id) }));
  if (!blob) return null;
  const url = URL.createObjectURL(blob);
  urlCache.set(id, url);
  return url;
}

export async function deleteImage(id) {
  if (!id) return;
  const u = urlCache.get(id);
  if (u) {
    URL.revokeObjectURL(u);
    urlCache.delete(id);
  }
  await tx('readwrite', (store) => ({ __req: store.delete(id) }));
}

/** 压缩图片：长边 ≤ maxSide，输出 webp（不支持则 jpeg） */
export function compressImage(file, maxSide = 1600, quality = 0.8) {
  return new Promise((resolve, reject) => {
    if (!file || !/^image\//.test(file.type)) {
      reject(new Error('请选择图片文件'));
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width: w, height: h } = img;
      const scale = Math.min(1, maxSide / Math.max(w, h));
      w = Math.max(1, Math.round(w * scale));
      h = Math.max(1, Math.round(h * scale));

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, w, h);

      const tryTypes = ['image/webp', 'image/jpeg'];
      let idx = 0;
      const attempt = () => {
        canvas.toBlob(
          (blob) => {
            if (blob && blob.type === tryTypes[idx]) return resolve(blob);
            if (idx < tryTypes.length - 1) {
              idx++;
              return attempt();
            }
            // 都失败则退回原始文件
            resolve(file);
          },
          tryTypes[idx],
          quality
        );
      };
      attempt();
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('图片读取失败'));
    };
    img.src = url;
  });
}

/* ============================================================
   备份 / 导入
   ============================================================ */

function blobToDataURL(blob) {
  return new Promise((resolve) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = () => resolve(null);
    r.readAsDataURL(blob);
  });
}

function dataURLToBlob(dataURL) {
  const [head, b64] = String(dataURL).split(',');
  const mime = (head.match(/data:([^;]+)/) || [, 'image/webp'])[1];
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return new Blob([arr], { type: mime });
}

/** 导出备份。includeImages=true 时把图片转 base64 一并打包（换设备必备） */
export async function exportBackup({ includeImages = true } = {}) {
  const s = load();
  const payload = {
    app: 'lushu',
    version: 1,
    exportedAt: new Date().toISOString(),
    trips: clone(s.trips),
    aliases: clone(s.aliases),
    settings: clone(s.settings),
    _images: {},
  };

  if (includeImages) {
    const ids = [...new Set(s.trips.map((t) => t.cover?.imgId).filter(Boolean))];
    for (const id of ids) {
      const blob = await tx('readonly', (store) => ({ __req: store.get(id) }));
      if (blob) {
        const d = await blobToDataURL(blob);
        if (d) payload._images[id] = d;
      }
    }
  }

  return payload;
}

/** 恢复图片，并返回 旧id → 新id 映射（无冲突时 id 不变） */
async function restoreImages(images, idMap) {
  for (const [oldId, dataURL] of Object.entries(images || {})) {
    try {
      const blob = dataURLToBlob(dataURL);
      const newId = await putImageBlob(blob);
      idMap[oldId] = newId;
    } catch (e) {
      console.warn('[路书] 恢复图片失败', oldId, e);
    }
  }
}

/**
 * 导入数据
 * @param {object} payload 与 exportBackup 同构
 * @param {'merge'|'replace'} mode
 * @returns {Promise<{added:number, replaced:boolean}>}
 */
export async function importBackup(payload, mode = 'merge') {
  const s = load();
  if (!payload || !Array.isArray(payload.trips)) throw new Error('文件格式不正确，缺少 trips');

  const idMap = {};
  await restoreImages(payload._images, idMap);

  const incoming = payload.trips.map((t) => {
    const n = normalizeTrip(t);
    if (n.cover.imgId && idMap[n.cover.imgId]) n.cover.imgId = idMap[n.cover.imgId];
    return n;
  });

  let added = 0;
  if (mode === 'replace') {
    s.trips = incoming;
    s.aliases = payload.aliases || {};
    added = incoming.length;
  } else {
    const seen = new Set(s.trips.map((t) => t.id));
    const titleSet = new Set(s.trips.map((t) => `${t.title}|${t.startDate || ''}`));
    for (const t of incoming) {
      // 同 id 或同标题+同起始日视为重复，跳过，避免重复导入
      if (seen.has(t.id) || titleSet.has(`${t.title}|${t.startDate || ''}`)) continue;
      s.trips.push(t);
      seen.add(t.id);
      titleSet.add(`${t.title}|${t.startDate || ''}`);
      added++;
    }
    if (payload.aliases) s.aliases = { ...payload.aliases, ...s.aliases };
  }

  save();
  return { added, replaced: mode === 'replace' };
}

/** 清空全部数据 */
export async function wipeAll() {
  const s = load();
  for (const t of s.trips) {
    if (t.cover?.imgId) await deleteImage(t.cover.imgId).catch(() => {});
  }
  state = blank();
  try {
    localStorage.removeItem(KEY);
    localStorage.removeItem(BAK);
  } catch (_) { /* ignore */ }
  save();
}

/* ============================================================
   启动时的一次性维护
   ============================================================ */

/** 打开 App 时调用：清理孤儿图片引用，不做任何自动归档的破坏性操作 */
export async function reconcile() {
  const s = load();
  let touched = false;
  for (const t of s.trips) {
    // 精确日期都填反了则交换
    if (t.startDate && t.endDate && t.startDate > t.endDate) {
      [t.startDate, t.endDate] = [t.endDate, t.startDate];
      touched = true;
    }
  }
  if (touched) save();
}

export const EMOJIS = EMOJI_POOL;
