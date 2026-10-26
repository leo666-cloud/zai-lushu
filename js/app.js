/**
 * app.js — 入口、路由、全局事件、导入流程
 */
import {
  load, reconcile, todayStr, getTrip, createTrip, deleteTrip,
  promoteTrip, setManualStatus, hideFromWish, updateTrip,
  exportBackup, importBackup, wipeAll, getApp, tripState, tripProgress, STATUS,
  seedDemo, demoSed, clearDemo, loadDemo, removeExpense,
} from './store.js';
import { viewList, viewTrip, viewSettings, hydrateImages, showTripMenu, showAIHelp, showPasteJSON, showWelcome, bindRender, showMapPicker, showExpenseSheet, showBudgetSheet, showLedgerSheet, showPhotoSheet, showPhotoSourceSheet, viewShare, showShareEditSheet, showShareOutSheet } from './views.js';
import { viewEdit, mountEdit } from './editor.js';
import { readImportHash, decodePayload, toDrafts, normalizeDraft } from './ai.js';
import { esc, icon, toast, openSheet, closeSheet, confirmDialog, debounce, download, toneBg, isSheetOpen } from './ui.js';
import { regionInfo } from './city.js';

const app = document.getElementById('app');
let query = '';
let navStack = [];

/* ============================================================
   路由
   ============================================================ */

function parseHash() {
  const h = location.hash.replace(/^#/, '');
  if (!h || h === '/') return { name: 'road' };
  const [path, qs] = h.split('?');
  const parts = path.split('/').filter(Boolean);

  if (parts[0] === 'road') return { name: 'road' };
  if (parts[0] === 'wish') return { name: 'wish' };
  if (parts[0] === 'past') return { name: 'past' };
  if (parts[0] === 'settings') return { name: 'settings' };
  if (parts[0] === 'new') return { name: 'edit', id: null };
  if (parts[0] === 'trip' && parts[1]) return { name: 'trip', id: parts[1] };
  if (parts[0] === 'edit' && parts[1]) return { name: 'edit', id: parts[1] };
  if (parts[0] === 'share' && parts[1]) return { name: 'share', id: parts[1] };
  if (parts[0] === 'add') return { name: 'road', add: qs || '' };
  return { name: 'road' };
}

function route() {
  const r = parseHash();
  const prev = navStack[navStack.length - 1];
  const cur = location.hash || '#/road';
  if (prev !== cur) navStack.push(cur);
  if (navStack.length > 30) navStack = navStack.slice(-30);

  document.body.style.overflow = '';
  document.title = titleFor(r);

  if (r.name === 'road' || r.name === 'wish' || r.name === 'past') {
    app.innerHTML = viewList(r.name, { q: query });
    bindSearch();
  } else if (r.name === 'trip') {
    app.innerHTML = viewTrip(r.id);
    mountDayNav();
  } else if (r.name === 'share') {
    app.innerHTML = viewShare(r.id);
  } else if (r.name === 'settings') {
    app.innerHTML = viewSettings();
  } else if (r.name === 'edit') {
    app.innerHTML = viewEdit(r.id);
    mountEdit(app);
  }

  hydrateImages(app).catch(() => {});

  // 旅行日期是固定的：今天落在行程区间内，就直接定位到当天那一段
  const jumped = r.name === 'trip' && jumpToToday(r.id);
  if (!jumped) window.scrollTo(0, 0);

  // 导入链接
  if (r.add) handleAddQuery(r.add);
}

/**
 * 若今天是行程中的某一天，滚到对应日程并高亮索引
 * 返回 true 表示已经处理过滚动
 */
function jumpToToday(tripId) {
  const t = getTrip(tripId);
  if (!t) return false;

  const prog = tripProgress(t);
  if (!prog || prog.notStarted || prog.over) return false;

  const el = document.querySelector(`.block--day[data-day="${prog.day}"]`);
  if (!el) return false;

  requestAnimationFrame(() => {
    el.scrollIntoView({ block: 'start' });
    const nav = document.getElementById('day-nav');
    const pill = nav?.querySelector(`[data-day-jump="${el.id}"]`);
    if (nav && pill) {
      nav.querySelectorAll('.day-pill').forEach((p) => p.classList.remove('is-active'));
      pill.classList.add('is-active');
      nav.scrollLeft = pill.offsetLeft - nav.clientWidth / 2 + pill.offsetWidth / 2;
    }
  });
  return true;
}

function titleFor(r) {
  if (r.name === 'road') return '在路书 · 旅行路书';
  if (r.name === 'wish') return '想去 · 在路书';
  if (r.name === 'past') return '回顾 · 在路书';
  if (r.name === 'settings') return '设置 · 在路书';
  const t = r.id ? getTrip(r.id) : null;
  return (t ? t.title + ' · ' : '') + '在路书';
}

function go(hash) {
  if (location.hash === hash) { route(); return; }
  location.hash = hash;
}

function back() {
  navStack.pop();
  // 跳过中间的表单页：从详情返回应该回列表，而不是退回刚才的新建/编辑表单
  let target = navStack[navStack.length - 1];
  while (target && (/\/edit\//.test(target) || /\/new$/.test(target))) {
    navStack.pop();
    target = navStack[navStack.length - 1];
  }
  if (target && target !== location.hash) location.hash = target;
  else location.hash = '#/road';
}

function reRender(preserveScroll = true) {
  const y = window.scrollY;
  const r = parseHash();
  document.title = titleFor(r);
  if (r.name === 'road' || r.name === 'wish' || r.name === 'past') {
    app.innerHTML = viewList(r.name, { q: query });
    bindSearch();
  } else if (r.name === 'trip') {
    app.innerHTML = viewTrip(r.id);
    mountDayNav();
  } else if (r.name === 'share') {
    app.innerHTML = viewShare(r.id);
  } else if (r.name === 'settings') {
    app.innerHTML = viewSettings();
  }
  hydrateImages(app).catch(() => {});
  if (preserveScroll) requestAnimationFrame(() => window.scrollTo(0, y));
}

/* ============================================================
   搜索
   ============================================================ */

function bindSearch() {
  const input = document.getElementById('q');
  if (!input) return;
  const onInput = debounce(() => {
    query = input.value;
    const scroll = document.querySelector('.scroll');
    if (!scroll) return;
    const r = parseHash();
    const tmp = document.createElement('div');
    tmp.innerHTML = viewList(r.name, { q: query });
    const newScroll = tmp.querySelector('.scroll');
    if (newScroll) scroll.innerHTML = newScroll.innerHTML;
    hydrateImages(app).catch(() => {});
  }, 180);
  input.addEventListener('input', onInput);
}

/* ============================================================
   日程索引（吸顶）
   ============================================================ */

let dayNavScrollHandler = null;

function mountDayNav() {
  const nav = document.getElementById('day-nav');
  if (!nav) return;

  const blocks = [...document.querySelectorAll('.block--day')];
  if (!blocks.length) return;

  const pills = [...nav.querySelectorAll('[data-day-jump]')];
  const pillOf = new Map(pills.map((p) => [p.dataset.dayJump, p]));

  const setActive = (id, keepInView) => {
    for (const p of pills) p.classList.toggle('is-active', p.dataset.dayJump === id);
    if (!keepInView) return;
    const btn = pillOf.get(id);
    if (!btn) return;
    const navRect = nav.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const pad = 18;
    if (btnRect.left < navRect.left + pad) {
      nav.scrollLeft -= (navRect.left + pad) - btnRect.left;
    } else if (btnRect.right > navRect.right - pad) {
      nav.scrollLeft += btnRect.right - (navRect.right - pad);
    }
  };

  nav.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-day-jump]');
    if (!btn) return;
    const el = document.getElementById(btn.dataset.dayJump);
    if (!el) return;
    setActive(btn.dataset.dayJump, true);
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  if (dayNavScrollHandler) {
    window.removeEventListener('scroll', dayNavScrollHandler);
    dayNavScrollHandler = null;
  }

  let ticking = false;
  dayNavScrollHandler = () => {
    // 已经离开详情页：自我注销，避免引用失效的 DOM
    if (!document.body.contains(nav)) {
      window.removeEventListener('scroll', dayNavScrollHandler);
      dayNavScrollHandler = null;
      return;
    }
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      if (!document.body.contains(nav)) return;
      const navBottom = nav.getBoundingClientRect().bottom;
      let activeId = blocks[0].id;
      for (const el of blocks) {
        if (el.getBoundingClientRect().top <= navBottom + 10) activeId = el.id;
        else break;
      }
      setActive(activeId, true);
    });
  };
  window.addEventListener('scroll', dayNavScrollHandler, { passive: true });

  setActive(blocks[0].id, false);
}

/* ============================================================
   全局事件委托
   ============================================================ */

const HANDLED = new Set([
  'tab', 'new', 'open', 'back', 'settings', 'edit', 'promote', 'mark-done',
  'reopen', 'unhide-wish', 'trip-menu', 'toggle-todo', 'export-full',
  'import-file', 'paste-json', 'ai-help', 'wipe', 'clear-demo', 'load-demo',
  'open-map', 'add-expense', 'set-budget', 'del-expense',
  'story', 'toggle-prep', 'stop-map', 'open-ledger',
  'add-photo', 'view-photo', 'open-share', 'edit-share', 'share-out', 'share-back',
]);

document.addEventListener('click', async (e) => {
  const el = e.target.closest('[data-act]');
  if (!el) return;
  const act = el.dataset.act;
  if (!HANDLED.has(act)) return;

  const id = el.dataset.id;

  switch (act) {
    case 'tab':
      go('#/' + el.dataset.tab);
      break;

    case 'new':
      go('#/new');
      break;

    case 'open':
      if (id) go('#/trip/' + id);
      break;

    case 'back':
      back();
      break;

    case 'settings':
      go('#/settings');
      break;

    case 'edit':
      if (id) go('#/edit/' + id);
      break;

    case 'promote': {
      e.stopPropagation();
      if (!id) break;
      promoteTrip(id);
      toast('已加入「路上」');
      go('#/trip/' + id);
      break;
    }

    case 'mark-done': {
      e.stopPropagation();
      if (!id) break;
      const ok = await confirmDialog({
        title: '这段行程结束了吗？',
        message: '确认后它会从「路上」搬到「回顾」，随时可以再拉回来。',
        okText: '结束了',
      });
      if (ok) {
        setManualStatus(id, STATUS.DONE);
        toast('已归档到「回顾」');
        reRender(false);
      }
      break;
    }

    case 'reopen': {
      e.stopPropagation();
      if (!id) break;
      setManualStatus(id, STATUS.ONGOING);
      toast('已拉回「路上」');
      reRender(false);
      break;
    }

    case 'unhide-wish': {
      e.stopPropagation();
      if (!id) break;
      hideFromWish(id, true);
      toast('已从「想去」移出，攻略本身还在');
      reRender();
      break;
    }

    case 'trip-menu':
      if (id) showTripMenu(id);
      break;

    case 'toggle-todo': {
      const t = getTrip(el.dataset.id || id);
      if (!t) break;
      const bi = Number(el.dataset.bi);
      const ii = Number(el.dataset.ii);
      const block = t.blocks[bi];
      if (!block?.items?.[ii]) break;
      block.items[ii].done = !block.items[ii].done;
      updateTrip(t.id, { blocks: t.blocks });
      el.classList.toggle('is-done', block.items[ii].done);
      break;
    }

    case 'export-full':
      await doExport();
      break;

    case 'import-file':
      pickBackupFile();
      break;

    case 'paste-json':
      showPasteJSON();
      break;

    case 'ai-help':
      showAIHelp();
      break;

    case 'clear-demo': {
      const demos = getApp().trips.filter((t) => t.demo);
      const ok = await confirmDialog({
        title: '清空示例数据？',
        message: `将删除 <b>${demos.length}</b> 条示例路书。<br><br>你自己添加的内容不受影响。清空之后，这个按钮不会再出现。`,
        okText: '清空',
        danger: true,
      });
      if (!ok) break;
      const removed = clearDemo();
      toast(`已清空 ${removed} 条示例`);
      reRender(false);
      break;
    }

    case 'load-demo': {
      const res = loadDemo();
      if (res.already) {
        toast('示例已经在库里了');
        break;
      }
      toast(`已载入 ${res.added} 条示例`);
      go('#/road');
      reRender(false);
      break;
    }

    case 'open-ledger':
      showLedgerSheet(el.dataset.id);
      break;

    case 'add-photo':
      showPhotoSourceSheet(el.dataset.id, Number(el.dataset.bi));
      break;

    case 'open-share':
      location.hash = '#/share/' + el.dataset.id;
      break;

    case 'edit-share':
      showShareEditSheet(el.dataset.id);
      break;

    case 'share-out':
      showShareOutSheet(el.dataset.id);
      break;

    case 'share-back':
      history.length > 1 ? history.back() : (location.hash = '#/past');
      break;

    case 'view-photo':
      showPhotoSheet(el.dataset.id, Number(el.dataset.bi), el.dataset.pid);
      break;

    case 'open-map':
      showMapPicker(el.dataset.id);
      break;

    case 'stop-map':
      showMapPicker({
        lat: Number(el.dataset.lat),
        lng: Number(el.dataset.lng),
        name: el.dataset.name || '',
      });
      break;

    case 'story': {
      const body = document.getElementById(el.dataset.target);
      if (!body) break;
      const opening = body.hidden;
      body.hidden = !opening;
      el.classList.toggle('is-open', opening);
      el.querySelector('.stop__more-plus').textContent = opening ? '－' : '＋';
      break;
    }

    case 'toggle-prep': {
      const body = document.getElementById('prep-body');
      if (!body) break;
      const opening = body.hidden;
      body.hidden = !opening;
      el.classList.toggle('is-open', opening);
      el.setAttribute('aria-expanded', opening ? 'true' : 'false');
      break;
    }

    case 'add-expense':
      showExpenseSheet(el.dataset.id);
      break;

    case 'set-budget':
      showBudgetSheet(el.dataset.id);
      break;

    case 'del-expense': {
      const t = getTrip(el.dataset.id);
      const entry = t?.ledger?.entries?.find((x) => x.id === el.dataset.eid);
      if (!entry) break;
      const ok = await confirmDialog({
        title: '删掉这笔？',
        message: `${esc(entry.title)}　¥${entry.amount.toLocaleString("zh-CN")}<br><br>删掉后不影响其他记录。`,
        okText: '删除',
        danger: true,
      });
      if (!ok) break;
      removeExpense(el.dataset.id, el.dataset.eid);
      toast('已删除');
      reRender(true);
      break;
    }

    case 'wipe': {
      const ok1 = await confirmDialog({
        title: '清空所有数据？',
        message: '所有路书和封面图片都会被删除，无法恢复。<br><br>如果还没导出过备份，建议先去上面导一份。',
        okText: '继续',
        danger: true,
      });
      if (!ok1) break;
      const ok2 = await confirmDialog({
        title: '最后一次确认',
        message: `真的要删掉全部 ${getApp().trips.length} 条路书吗？`,
        okText: '全部删除',
        danger: true,
      });
      if (ok2) {
        await wipeAll();
        toast('已清空');
        go('#/road');
        reRender(false);
      }
      break;
    }
  }
});

/* 键盘：卡片可用回车打开 */
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;
  const el = document.activeElement;
  if (el?.dataset?.act === 'open') el.click();
});

/* ============================================================
   导出
   ============================================================ */

async function doExport() {
  try {
    toast('正在打包…', 1600);
    const data = await exportBackup({ includeImages: true });
    const name = `路书备份-${todayStr()}.json`;
    download(name, JSON.stringify(data));
    toast('已导出 ' + name);
  } catch (e) {
    toast(e.message || '导出失败');
  }
}

/* ============================================================
   从文件恢复
   ============================================================ */

function pickBackupFile() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json,application/json';
  input.onchange = async () => {
    const f = input.files?.[0];
    if (!f) return;
    try {
      const text = await f.text();
      const data = JSON.parse(text);
      if (!Array.isArray(data.trips)) {
        // 也许是单条数据的导入
        const drafts = toDrafts(data, 'wish');
        if (!drafts.length) throw new Error('这个文件里没有可用的路书');
        showImportPreview(drafts, { kind: 'file' });
        return;
      }
      const mode = await confirmDialog({
        title: '怎么合并？',
        message: `文件里有 <b>${data.trips.length}</b> 条记录。<br><br><b>合并</b>：只添加本地没有的，不动现有数据。<br><b>覆盖</b>：用文件里的完全替换当前所有数据。`,
        okText: '合并',
        cancelText: '覆盖',
      });
      const res = await importBackup(data, mode ? 'merge' : 'replace');
      toast(res.replaced ? `已覆盖，${res.added} 条` : `已合并，新增 ${res.added} 条`);
      reRender(false);
    } catch (e) {
      toast('读取失败：' + (e.message || '文件格式不对'));
    }
  };
  input.click();
}

/* ============================================================
   导入（链接 / 粘贴）
   ============================================================ */

async function handleAddQuery(qs) {
  // 先清掉 hash，防止刷新或返回时重复触发
  const raw = qs.startsWith('?') ? qs.slice(1) : qs;
  history.replaceState(null, '', location.pathname + location.search + '#/road');
  navStack = ['#/road'];

  const params = new URLSearchParams(raw);
  const d = params.get('d') || params.get('data') || params.get('payload');
  if (!d) {
    toast('链接里没有数据');
    return;
  }
  try {
    const payload = decodePayload(d);
    const drafts = toDrafts(payload, 'wish');
    if (!drafts.length) throw new Error('没认出里面有什么路书');
    showImportPreview(drafts, { kind: 'link', raw: d });
  } catch (e) {
    toast('导入失败：' + (e.message || '格式无法识别'));
  }
}

window.__lushuParseText = (txt) => {
  try {
    const payload = decodePayload(txt);
    const drafts = toDrafts(payload, 'wish');
    if (!drafts.length) throw new Error('没认出里面有什么路书');
    showImportPreview(drafts, { kind: 'paste' });
  } catch (e) {
    toast('解析失败：' + (e.message || '格式无法识别'));
  }
};

function showImportPreview(drafts, meta = {}) {
  const sourceText = {
    link: '来自一条导入链接',
    paste: '来自你粘贴的内容',
    file: '来自选中的文件',
    ai: '来自 AI',
  }[meta.kind] || '来自外部';

  const cards = drafts.map((d) => {
    const info = regionInfo(d.region);
    const blocks = (d.blocks || []).length;
    const dateTxt = d.dateMode === 'exact'
      ? `${d.startDate || ''}${d.endDate ? ' → ' + d.endDate : ''}`
      : (d.dateText || (d.roughYm || '时间未定'));
    return `<div class="import-preview">
      <div class="import-preview__head">
        <div class="import-preview__cover" style="background:${toneBg(d.cover?.tone)}">${esc(d.cover?.emoji || '📍')}</div>
        <div>
          <div class="import-preview__title">${esc(d.title)}</div>
          <div class="import-preview__meta">${info.emoji} ${esc(info.name)} · ${esc(d.city || '未识别')}</div>
        </div>
      </div>
      <div class="import-preview__row"><b>时间</b><span>${esc(dateTxt)}</span></div>
      ${d.brief ? `<div class="import-preview__row"><b>一句话</b><span>${esc(d.brief)}</span></div>` : ''}
      <div class="import-preview__row"><b>内容</b><span>${blocks ? blocks + ' 个内容块' : '暂无正文'}</span></div>
    </div>`;
  }).join('');

  openSheet({
    title: drafts.length > 1 ? `发现 ${drafts.length} 条路书` : '发现一条路书',
    desc: `${sourceText}。确认后才会写进这台手机的本地存储。`,
    html: `
      <div class="notice"><span class="notice__icon">🛡</span>
        <span>导入只会新增，不会修改或删除你已有的路书。看着不对就点取消。</span></div>
      ${cards}
      ${meta.raw ? `<details style="margin-top:6px"><summary style="font-size:12px;color:var(--muted);cursor:pointer">查看原始数据</summary>
        <div class="import-preview__raw" style="margin-top:8px">${esc(meta.raw.slice(0, 2000))}</div></details>` : ''}`,
    buttons: [
      { label: '取消', value: null },
      { label: '先放进想去', value: 'wish' },
      { label: '直接开始攻略', value: 'road', kind: 'primary' },
    ],
    onClose: async (v) => {
      if (!v) return;
      try {
        let n = 0;
        for (const d of drafts) {
          if (v === 'wish') {
            d.promotedAt = null;
          } else if (!d.promotedAt) {
            d.promotedAt = new Date().toISOString();
          }
          const { _matched, ...rest } = d;
          createTrip(rest);
          n++;
        }
        toast(`已加入 ${n} 条路书`);
        go(v === 'wish' ? '#/wish' : '#/road');
      } catch (e) {
        toast(e.message || '写入失败');
      }
    },
  });
}

/* ============================================================
   启动
   ============================================================ */

async function boot() {
  try {
    load();
    await reconcile();

    // 首次打开、库里还是空的、而且不是从导入链接进来的 → 铺一份示例
    const fromImport = /add\?/i.test(location.hash || '');
    if (!demoSed() && getApp().trips.length === 0 && !fromImport) {
      seedDemo();
    }
  } catch (e) {
    console.error(e);
  }

  bindRender((keep) => reRender(!!keep));

  window.addEventListener('hashchange', route);

  if (!location.hash) {
    history.replaceState(null, '', '#/road');
  }

  route();

  // 首次打开：一次性教程（只弹一次，点空白处可关）
  try {
    const welcomed = localStorage.getItem('lushu.welcomed');
    const isEmpty = getApp().trips.length === 0;
    if (!welcomed && isEmpty) {
      let interacted = false;
      window.addEventListener('pointerdown', () => { interacted = true; }, { once: true, capture: true });
      setTimeout(() => {
        // 用户已经动手了、或正在看导入确认卡，就别再盖上来
        if (interacted || isSheetOpen()) return;
        showWelcome();
      }, 700);
    }
  } catch (_) { /* 隐私模式下忽略 */ }

  // 存储临近上限预警
  try {
    const used = new Blob([localStorage.getItem('lushu.v1') || '']).size;
    if (used > 3.8 * 1024 * 1024) {
      setTimeout(() => toast('本地存储快满了，建议导出备份并删掉一些封面图', 4000), 2400);
    }
  } catch (_) { /* ignore */ }
}

boot();
