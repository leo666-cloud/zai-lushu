/**
 * 纯逻辑自测：城市识别 / AI 载荷解析 / 三态状态机
 * 运行：node scripts/selftest.mjs
 */

// --- 最小浏览器环境垫片 ---
const mem = new Map();
globalThis.localStorage = {
  getItem: (k) => (mem.has(k) ? mem.get(k) : null),
  setItem: (k, v) => mem.set(k, String(v)),
  removeItem: (k) => mem.delete(k),
};
globalThis.indexedDB = undefined;
globalThis.window = globalThis;

const { resolve, regionInfo } = await import('../js/city.js');
const { decodePayload, normalizeDraft, toDrafts, encodePayload } = await import('../js/ai.js');
const { tripState, todayStr, normalizeTripForTest } = await import('../js/store.js').catch(() => ({}));

let pass = 0;
let fail = 0;
const fails = [];

function eq(label, actual, expect) {
  const ok = JSON.stringify(actual) === JSON.stringify(expect);
  if (ok) { pass++; } else { fail++; fails.push(`${label}\n    实际 ${JSON.stringify(actual)}\n    期望 ${JSON.stringify(expect)}`); }
}

/* ============ 1. 城市识别 ============ */
console.log('\n【城市识别】');
const cityCases = [
  ['去南极', '南极', 'polar'],
  ['京都', '京都', 'asia-e'],
  ['魔都', '上海', 'cn-east'],
  ['我想去冰岛看极光', '冰岛', 'europe'],
  ['成都', '成都', 'cn-southwest'],
  ['中国香港', '中国香港', 'cn-hkmo'],
  ['台湾', '中国台湾', 'cn-tw'],
  ['乌鲁木齐', '乌鲁木齐', 'cn-northwest'],
  ['大阪', '大阪', 'asia-e'],
  ['明天想去大理', '大理', 'cn-southwest'],
  ['巴厘岛', '巴厘岛', 'asia-se'],
  ['明年春节去北海道滑雪', '北海道', 'asia-e'],
];
for (const [input, name, region] of cityCases) {
  const r = resolve(input, {});
  eq(`resolve("${input}")`, r ? [r.name, r.region] : null, [name, region]);
}
eq('resolve("随便写个不存在的地名zzz")', resolve('随便写个不存在的地名zzz', {}), null);
eq('resolve("去圣托里尼")', resolve('去圣托里尼', {})?.name, '圣托里尼');
eq('用户别名优先', resolve('某未知地', { '某未知地': '北京' })?.name, '北京');

/* ============ 2. AI 载荷解析 ============ */
console.log('\n【AI 载荷解析】');
const obj = { title: '南极 12 天', city: '南极' };

eq('纯 JSON', decodePayload('{"title":"南极 12 天","city":"南极"}'), obj);
eq('带前后说明文字', decodePayload('好的，数据如下：\n{"title":"南极 12 天","city":"南极"}\n还需要我补充吗？'), obj);
eq('URL 编码', decodePayload(encodeURIComponent(JSON.stringify(obj))), obj);
eq('base64url', decodePayload(encodePayload(obj)), obj);
eq('数组', decodePayload('[{"title":"A"},{"title":"B"}]').length, 2);

const d1 = normalizeDraft({ title: '南极 12 天', city: '南极', dateText: '2027年春节' }, 'wish');
eq('识别区域', [d1.city, d1.region], ['南极', 'polar']);
eq('模糊日期模式', d1.dateMode, 'fuzzy');
eq('默认未升级', d1.promotedAt, null);

const d2 = normalizeDraft({ title: '京都赏枫', city: '京都', startDate: '2026/11/20', endDate: '2026年11月26日' });
eq('日期归一化', [d2.startDate, d2.endDate], ['2026-11-20', '2026-11-26']);

const d3 = normalizeDraft({ title: 'X', city: '成都', status: 'planning' });
eq('status=planning 直接进路上', typeof d3.promotedAt, 'string');

const d4 = normalizeDraft({ name: '冰岛环岛', destination: '冰岛', content: '沿一号公路自驾' });
eq('字段别名兼容', [d4.title, d4.city, d4.blocks.length], ['冰岛环岛', '冰岛', 1]);

eq('空对象返回 null', normalizeDraft({}), null);
eq('数组批量', toDrafts([{ title: 'A', city: '成都' }, { title: 'B', city: '京都' }]).length, 2);

/* ============ 3. 状态机 ============ */
console.log('\n【三态状态机】');
const { tripState: TS } = await import('../js/store.js');
const base = {
  promotedAt: '2026-01-01T00:00:00.000Z',
  dateMode: 'exact',
  manualStatus: null,
};

eq('未升级 → 想去', TS({ ...base, promotedAt: null }).status, 'wish');
eq('未来 → 待出发', TS({ ...base, startDate: '2099-01-01', endDate: '2099-01-10' }).status, 'planning');
eq('区间内 → 进行中', TS({ ...base, startDate: '2020-01-01', endDate: '2099-01-01' }).status, 'ongoing');
eq('已过期 → 回顾', TS({ ...base, startDate: '2020-01-01', endDate: '2020-01-10' }).status, 'done');
eq('只有出发日且已过 → 进行中', TS({ ...base, startDate: '2020-01-01', endDate: null }).status, 'ongoing');
eq('无日期 → 待出发', TS({ ...base, startDate: null, endDate: null }).status, 'planning');
eq('手动覆盖为结束', TS({ ...base, startDate: '2099-01-01', manualStatus: 'done' }).status, 'done');

const fuzzy = { ...base, dateMode: 'fuzzy', roughYm: '2020-01' };
const fs = TS(fuzzy);
eq('模糊已过 → 不自动归档', fs.status, 'planning');
eq('模糊已过 → 软提示', fs.needsConfirm, true);
eq('模糊当月 → 进行中', TS({ ...base, dateMode: 'fuzzy', roughYm: todayStr().slice(0, 7) }).status, 'ongoing');
eq('模糊未来 → 待出发', TS({ ...base, dateMode: 'fuzzy', roughYm: '2099-06' }).status, 'planning');

/* ============ 结果 ============ */
console.log('\n' + '─'.repeat(46));
console.log(`通过 ${pass} · 失败 ${fail}`);
if (fails.length) {
  console.log('\n失败项：');
  fails.forEach((f, i) => console.log(`  ${i + 1}. ${f}`));
  process.exit(1);
} else {
  console.log('全部通过');
}
