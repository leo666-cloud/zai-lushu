/**
 * e2e.mjs — 用系统 Chrome 走一遍真实交互
 * 运行：
 *   node scripts/e2e.mjs
 */
import fs from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
let puppeteer;
try {
  puppeteer = require('puppeteer-core');
} catch {
  console.error('缺少依赖：先运行 npm install');
  process.exit(1);
}

const BASE = 'http://127.0.0.1:8765/';
const SHOTS = '/tmp/lushu-shots';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

fs.mkdirSync(SHOTS, { recursive: true });

const errors = [];
let step = 0;

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  protocolTimeout: 45000,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--lang=zh-CN'],
});

const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1');

page.on('console', (m) => {
  if (m.type() === 'error') errors.push('console: ' + m.text());
});
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('requestfailed', (r) => {
  if (!r.url().includes('favicon')) errors.push('requestfailed: ' + r.url());
});
page.on('response', (r) => {
  if (r.status() >= 400) errors.push(`HTTP ${r.status()}: ${r.url()}`);
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function shot(name) {
  step++;
  const file = `${SHOTS}/${String(step).padStart(2, '0')}-${name}.png`;
  await page.screenshot({ path: file });
  console.log('  📸 ' + file.split('/').pop());
  return file;
}

async function typeInto(sel, text) {
  await page.click(sel, { clickCount: 3 });
  await page.type(sel, text, { delay: 12 });
}

function assert(cond, msg) {
  if (!cond) {
    errors.push('断言失败: ' + msg);
    console.log('  ✗ ' + msg);
  } else {
    console.log('  ✓ ' + msg);
  }
}

/* ============================================================ */

console.log('\n[1] 首次打开（应有示例数据）');
await page.goto(BASE, { waitUntil: 'domcontentloaded' });
await sleep(1000);
const title = await page.title();
assert(title.includes('路书'), '标题包含"路书"');
assert(!!(await page.$('.demo-bar')), '出现「示例数据」提示条');
const demoRoadCards = await page.$$eval('.card', (els) => els.length);
assert(demoRoadCards === 2, '路上有 2 条示例（南极 / 北极），实际 ' + demoRoadCards);
const demoTitles = await page.$$eval('.card__title', (els) => els.map((e) => e.textContent));
assert(demoTitles.some((t) => t.includes('南极')), '含南极示例');
await shot('demo-road');

const wishCount = await page.evaluate(async () => {
  const r = await fetch(location.href, { cache: 'no-store' });
  return r.status;
});
assert(wishCount === 200, '页面可正常返回');

// 关掉一次性引导弹窗（点上方空白）
if (await page.$('.sheet')) {
  await page.mouse.click(195, 70);
  await sleep(500);
  console.log('  · 已关闭首次引导弹窗');
}

console.log('\n[1.5] 清空示例');
await page.click('[data-act="clear-demo"]');
await sleep(500);
const confirmText = await page.$eval('.sheet__title', (e) => e.textContent).catch(() => '');
assert(confirmText.includes('清空示例'), '弹出二次确认：' + confirmText);
await page.click('[data-sheet-btn="1"]');
await sleep(900);
assert((await page.$$eval('.card', (els) => els.length)) === 0, '清空后路上为空');
assert(!(await page.$('.demo-bar')), '提示条消失');
assert(!!(await page.$('.empty__title')), '显示空状态');
await shot('demo-cleared');

await page.reload({ waitUntil: 'domcontentloaded' });
await sleep(1000);
assert(!(await page.$('.demo-bar')), '刷新后提示条仍不出现');
assert((await page.$$eval('.card', (els) => els.length)) === 0, '刷新后仍然为空');

console.log('\n[2] 新建一条有精确日期的行程');
await page.waitForSelector('.fab', { timeout: 5000 });
// 用 DOM click：fab 是 fixed 定位，puppeteer 的坐标点击在部分情况下会落空
await page.evaluate(() => document.querySelector('.fab').click());
await page.waitForSelector('#f-title', { timeout: 5000 });
await sleep(300);
await typeInto('#f-title', '北海道看雪');
await typeInto('#f-cityraw', '去北海道');
await sleep(350);
const echo = await page.$eval('#city-echo', (e) => e.textContent).catch(() => '');
assert(echo.includes('东亚') || echo.includes('日本'), '城市识别生效：' + echo.replace(/\s+/g, ' ').trim());
await shot('editor-filled');

await page.click('[data-dmode="exact"]');
await sleep(250);
const today = new Date();
const start = new Date(today.getTime() + 20 * 86400000);
const end = new Date(today.getTime() + 27 * 86400000);
const f = (d) => d.toISOString().slice(0, 10);
await page.$eval('#f-start', (el, v) => { el.value = v; el.dispatchEvent(new Event('change', { bubbles: true })); }, f(start));
await page.$eval('#f-end', (el, v) => { el.value = v; el.dispatchEvent(new Event('change', { bubbles: true })); }, f(end));
await typeInto('#f-brief', '第一次去雪国，主要想泡温泉和看流冰');

// 加一个正文块
await page.click('[data-add-block="text"]');
await sleep(250);
await page.type('.block-editor textarea[data-f="body"]', '新千岁机场落地 → 登别 → 小樽 → 札幌', { delay: 8 });
await shot('editor-blocks');

await page.click('[data-act="save-edit"]');
await sleep(700);
const h1 = await page.evaluate(() => location.hash);
assert(/^#\/trip\//.test(h1), '保存后跳到详情页：' + h1);
const dt = await page.$eval('.detail-title', (e) => e.textContent).catch(() => '');
assert(dt.includes('北海道'), '详情页标题正确：' + dt);
const badge = await page.$eval('.badge', (e) => e.textContent).catch(() => '');
assert(badge.includes('待出发'), '状态是"待出发"：' + badge);
await shot('detail-road');

console.log('\n[3] 返回列表');
await page.click('.detail-hero__nav .icon-btn');
await sleep(500);
const hashList = await page.evaluate(() => location.hash);
assert(hashList === '#/road', '回到路上列表：' + hashList);
const cardCount = await page.$$eval('.card', (els) => els.length);
assert(cardCount === 1, '列表有 1 张卡片');
await shot('road-list');

console.log('\n[4] 新建一条"想去"（无日期）');
await page.click('[data-tab="wish"]');
await sleep(500);
await page.evaluate(() => document.querySelector('.fab').click());
await page.waitForSelector('#f-cityraw', { timeout: 5000 });
await sleep(300);
await typeInto('#f-cityraw', '京都');
await sleep(350);
await page.click('[data-act="save-edit"]');
await sleep(700);
const h2 = await page.evaluate(() => location.hash);
assert(/^#\/trip\//.test(h2), '想去条目保存成功');
const badge2 = await page.$eval('.badge', (e) => e.textContent).catch(() => '');
assert(badge2.includes('想去'), '状态是"想去"：' + badge2);
const acts = await page.$$eval('.detail-actions .btn', (els) => els.map((e) => e.textContent.trim()));
assert(acts.some((a) => a.includes('开始攻略')), '详情页有"开始攻略"按钮：' + acts.join('/'));
await shot('detail-wish');

console.log('\n[5] 想去 → 开始攻略');
await page.click('[data-act="promote"]');
await sleep(700);
const badge3 = await page.$eval('.badge', (e) => e.textContent).catch(() => '');
assert(!badge3.includes('想去'), '升级后不再是"想去"：' + badge3);
await shot('detail-promoted');

console.log('\n[6] 想去列表里应能看到沉底项');
await page.goto(BASE + '#/wish', { waitUntil: 'domcontentloaded' });
await sleep(600);
const dimCards = await page.$$eval('.card--dim', (els) => els.length);
assert(dimCards >= 1, '想去列表出现沉底的"已规划"：' + dimCards);
await shot('wish-list');

console.log('\n[7] 回顾板块');
await page.goto(BASE + '#/past', { waitUntil: 'domcontentloaded' });
await sleep(500);
const pastEmpty = await page.$('.empty__title');
assert(!!pastEmpty, '回顾当前为空并显示空状态');
await shot('past-empty');

console.log('\n[8] AI 导入链接');
const payload = {
  title: '南极 12 天',
  city: '南极',
  brief: '从乌斯怀亚登船穿越德雷克海峡，看企鹅和冰川',
  dateText: '2027年春节前后',
  status: 'wish',
  blocks: [
    { type: 'text', title: '路线', body: '国内飞布宜诺斯艾利斯 → 乌斯怀亚 → 登船 → 南极半岛' },
    { type: 'todo', title: '出发前准备', items: [{ t: '确认船票', done: false }, { t: '买冲锋衣', done: false }] },
  ],
};
const link = BASE + '#/add?d=' + encodeURIComponent(JSON.stringify(payload));
await page.goto(link, { waitUntil: 'domcontentloaded' });
await sleep(900);
const sheetOpen = await page.$('.sheet');
assert(!!sheetOpen, '导入链接弹出确认卡');
const previewTitle = await page.$eval('.import-preview__title', (e) => e.textContent).catch(() => '');
assert(previewTitle.includes('南极'), '预览卡显示内容：' + previewTitle);
await shot('import-preview');

await page.click('[data-sheet-btn="1"]'); // 先放进想去
await sleep(800);
const hashAfter = await page.evaluate(() => location.hash);
assert(hashAfter === '#/wish', '导入后跳到想去：' + hashAfter);
const cardsNow = await page.$$eval('.card', (els) => els.map((e) => e.querySelector('.card__title')?.textContent));
assert(cardsNow.some((c) => c?.includes('南极')), '南极已进入想去：' + cardsNow.join(' / '));
await shot('wish-after-import');

console.log('\n[9] 导入的攻略内容完整性');
const nanjiId = await page.evaluate(() => {
  const card = [...document.querySelectorAll('.card')].find((c) => c.textContent.includes('南极'));
  return card?.dataset.id;
});
await page.goto(BASE + '#/trip/' + nanjiId, { waitUntil: 'domcontentloaded' });
await sleep(700);
const blockCount = await page.$$eval('.block', (els) => els.length);
assert(blockCount >= 1, '导入的正文块渲染正常：' + blockCount);
assert(!!(await page.$('.prep')), '待办已改为页首折叠的「行前准备」');
const todos = await page.$$eval('.todo', (els) => els.length);
assert(todos === 2, '清单渲染 2 项：' + todos);
await shot('imported-detail');

// 勾选清单（待办已移到页首折叠区，先展开）
await page.evaluate(() => document.querySelector('.prep__head')?.click());
await sleep(400);
await page.click('.todo');
await sleep(400);
const doneCount = await page.$$eval('.todo.is-done', (els) => els.length);
assert(doneCount === 1, '清单可勾选');
await shot('todo-checked');

console.log('\n[10] 设置页');
await page.goto(BASE + '#/settings', { waitUntil: 'domcontentloaded' });
await sleep(500);
const stats = await page.$$eval('.kv', (els) => els.map((e) => e.textContent.replace(/\s+/g, ' ').trim()));
assert(stats.some((s) => s.includes('3')), '设置页统计正确：' + stats.join(' | '));
await shot('settings');

console.log('\n[11] 刷新后数据仍在');
await page.goto(BASE + '#/road', { waitUntil: 'domcontentloaded' });
await sleep(600);
const roadCards = await page.$$eval('.card', (els) => els.length);
assert(roadCards >= 1, '刷新后路上仍有数据：' + roadCards);
await shot('persisted');

console.log('\n[12] 协议文件可访问');
await page.goto(BASE + 'ai.html', { waitUntil: 'domcontentloaded' });
const aiTxt = await page.$eval('pre', (el) => el.textContent).catch(() => '');
assert(aiTxt.includes('AI 导入协议') && aiTxt.includes('blocks'), 'ai.html 内容完整，长度 ' + aiTxt.length);
const res = await fetch(BASE + 'ai.txt');
const buf = Buffer.from(await res.arrayBuffer()).toString('utf8');
assert(buf.includes('AI 导入协议'), 'ai.txt UTF-8 内容正确，长度 ' + buf.length);

/* ============================================================ */

await browser.close();

console.log('\n' + '─'.repeat(50));
if (errors.length) {
  console.log(`❌ 发现 ${errors.length} 个问题：`);
  errors.forEach((e, i) => console.log(`  ${i + 1}. ${e}`));
  process.exit(1);
} else {
  console.log('✅ 全流程通过，无控制台错误');
}
