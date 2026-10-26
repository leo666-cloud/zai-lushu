/**
 * views.js — 列表 / 详情 / 设置 / Tab 栏
 */
import {
  getApp, getTrip, tripState, tripProgress, bucketOf, STATUS,
  deleteTrip, promoteTrip, setManualStatus, hideFromWish,
  shouldShowDemoBar, clearDemo,
  ledgerSpent, categoryInfo, LEDGER_CATEGORIES,
  addExpense, removeExpense, setBudget, yearSpent, todayStr, removePhoto, addPhoto,
  canShare, shareConfig, saveShare,
} from './store.js';
import { MAP_PROVIDERS, mapUrl, readChoice, rememberChoice, detectPlatform, coordText } from './maps.js';
import { regionInfo } from './city.js';
import { REGION_LIST } from './cities.js';
import {
  esc, icon, toneBg, toast, openSheet, closeSheet, confirmDialog, fmtDateRange, fmtRelative,
  siteURL, siteFile,
} from './ui.js';
import { makeShareLink } from './ai.js';

/* ============================================================
   Tab 栏
   ============================================================ */

const TABS = [
  { id: 'road', label: '路上', icon: 'road' },
  { id: 'wish', label: '想去', icon: 'pin' },
  { id: 'past', label: '回顾', icon: 'archive' },
];

export function renderTabbar(active) {
  return `<nav class="tabbar">
    ${TABS.map((t) => `
      <button class="tab ${active === t.id ? 'is-active' : ''}" data-act="tab" data-tab="${t.id}">
        ${icon(t.icon)}
        <span class="tab__label">${t.label}</span>
      </button>`).join('')}
  </nav>`;
}

export function renderFAB(show = true) {
  return show ? `<button class="fab" data-act="new" aria-label="添加">${icon('plus', 24)}</button>` : '';
}

/* ============================================================
   列表页
   ============================================================ */

const TAB_META = {
  road: { title: '路上', empty: { icon: '🧭', t: '还没有确定的行程', s: '把你已经排好的路线放进来，它就住在这里，直到走完。', a: '新建一段行程' } },
  wish: { title: '想去', empty: { icon: '📮', t: '想去的地方还没收进来', s: '随手记下一个地名就行，会自动按城市归好类。', a: '记一个想去的地方' } },
  past: { title: '回顾', empty: { icon: '📼', t: '还没有走完的行程', s: '行程结束日期一过，它就会自己搬到这里。', a: '新建一段行程' } },
};

export function viewList(tab, opt = {}) {
  const { q = '' } = opt;
  const app = getApp();
  const { road, wish, past, wishDone } = bucketOf(app.trips);
  const meta = TAB_META[tab] || TAB_META.road;

  const filter = (arr) => {
    if (!q) return arr;
    const k = q.toLowerCase();
    return arr.filter((t) =>
      `${t.title} ${t.cityRaw} ${t.city} ${t.brief}`.toLowerCase().includes(k)
    );
  };

  let bodyHtml = '';
  if (tab === 'road') {
    bodyHtml = listRoad(filter(road), q);
  } else if (tab === 'wish') {
    bodyHtml = listWish(filter(wish), filter(wishDone), q);
  } else {
    bodyHtml = listPast(filter(past), q);
  }

  const sub = subtitle(tab, { road, wish, past });

  return `
  <div class="page">
    <header class="topbar">
      <div class="topbar__row">
        <div class="topbar__title">${meta.title}</div>
        <button class="icon-btn" data-act="settings" aria-label="设置">${icon('settings', 18)}</button>
      </div>
      <div class="topbar__sub">${sub}</div>
      <label class="search">
        ${icon('search')}
        <input id="q" type="search" placeholder="搜地名、标题、关键词" value="${esc(q)}" autocomplete="off">
      </label>
      ${shouldShowDemoBar() ? `<div class="demo-bar">
        <span class="demo-bar__text"><b>示例数据</b>　先看看长什么样</span>
        <button class="demo-bar__btn" data-act="clear-demo">清空示例</button>
      </div>` : ''}
    </header>
    <div class="scroll">
      ${bodyHtml}
    </div>
  </div>
  ${renderTabbar(tab)}
  ${renderFAB(tab !== 'past')}`;
}

function subtitle(tab, { road, wish, past }) {
  if (tab === 'road') {
    const ongoing = road.filter((t) => tripState(t).status === STATUS.ONGOING).length;
    const planning = road.length - ongoing;
    if (!road.length) return '还没有确定下来的行程';
    const bits = [];
    if (ongoing) bits.push(`${ongoing} 段进行中`);
    if (planning) bits.push(`${planning} 段待出发`);
    return bits.join(' · ');
  }
  if (tab === 'wish') {
    if (!wish.length) return '随手记下，等它变成一段路';
    const regions = new Set(wish.map((t) => t.region));
    return `${wish.length} 个地方 · ${regions.size} 个区域`;
  }
  if (!past.length) return '走过的路会留在这里';
  return `${past.length} 段走过的路`;
}

/* ---------- 路上 ---------- */

function listRoad(trips, q) {
  if (!trips.length) return emptyState('road', q);
  const ongoing = trips.filter((t) => tripState(t).status === STATUS.ONGOING);
  const planning = trips.filter((t) => tripState(t).status === STATUS.PLANNING);

  let html = '';
  if (ongoing.length) {
    html += `<div class="section-label">进行中</div><div class="list">${ongoing.map(cardTrip).join('')}</div>`;
  }
  if (planning.length) {
    html += `<div class="section-label">即将出发</div><div class="list">${planning.map(cardTrip).join('')}</div>`;
  }
  return html;
}

/* ---------- 想去 ---------- */

function listWish(wishes, doneOnes, q) {
  if (!wishes.length && !doneOnes.length) return emptyState('wish', q);

  // 按区域分组
  const groups = new Map();
  for (const t of wishes) {
    const key = t.region || 'other';
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(t);
  }
  const order = REGION_LIST.map((r) => r.id).filter((id) => groups.has(id));

  let html = '';
  for (const rid of order) {
    const info = regionInfo(rid);
    html += `<div class="section-label">${info.emoji} ${esc(info.short)} · ${groups.get(rid).length}</div>
      <div class="list">${groups.get(rid).map(cardWish).join('')}</div>`;
  }

  if (doneOnes.length) {
    html += `<div class="section-label">已规划 / 已走过 · ${doneOnes.length}</div>
      <div class="list">${doneOnes.map(cardWishDone).join('')}</div>`;
  }
  return html;
}

/* ---------- 回顾 ---------- */

function listPast(trips, q) {
  if (!trips.length) return emptyState('past', q);
  // 按年份分组
  const groups = new Map();
  for (const t of trips) {
    const y = (t.endDate || t.updatedAt || '').slice(0, 4) || '——';
    if (!groups.has(y)) groups.set(y, []);
    groups.get(y).push(t);
  }
  return [...groups.entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([y, arr]) => `<div class="section-label">${y} 年 · ${arr.length}</div>
      <div class="list">${arr.map(cardPast).join('')}</div>`)
    .join('');
}

/* ============================================================
   卡片
   ============================================================ */

function coverInner(trip, emojiClass = 'card__cover-emoji') {
  const img = trip.cover?.imgId
    ? `<img data-img="${esc(trip.cover.imgId)}" alt="" loading="lazy">`
    : '';
  return `${img}<span class="${emojiClass}">${esc(trip.cover?.emoji || '📍')}</span>`;
}

function cardTrip(t) {
  const st = tripState(t);
  const prog = tripProgress(t);
  const isOn = st.status === STATUS.ONGOING;
  const parts = [`<span>${esc(t.city || t.cityRaw || '未分类')}</span>`];
  if (isOn && prog && !prog.notStarted) {
    parts.push(`<span>第 ${prog.day}/${prog.total} 天</span>`);
  } else {
    parts.push(`<span>${esc(fmtDateRange(t))}</span>`);
  }

  return `
  <div class="card" data-act="open" data-id="${t.id}" role="button" tabindex="0">
    <div class="card__cover" style="background:${toneBg(t.cover?.tone)}">${coverInner(t)}</div>
    <div class="card__body">
      <div class="card__title">${esc(t.title)}</div>
      <div class="card__meta">${parts.join('')}</div>
      <div class="card__foot">
        ${isOn ? `<span class="badge badge--ongoing">进行中</span>` : `<span class="badge badge--planning">待出发</span>`}
        ${st.needsConfirm ? `<span class="badge badge--ghost">时间已过？</span>` : ''}
      </div>
    </div>
  </div>`;
}

function cardWish(t) {
  return `
  <div class="card" data-act="open" data-id="${t.id}" role="button" tabindex="0">
    <div class="card__cover" style="background:${toneBg(t.cover?.tone)}">${coverInner(t)}</div>
    <div class="card__body">
      <div class="card__title">${esc(t.title)}</div>
      <div class="card__meta">
        <span>${esc(regionInfo(t.region).name)}</span>
        ${t.city && t.city !== t.title ? `<span>${esc(t.city)}</span>` : ''}
        ${t.dateText ? `<span>${esc(t.dateText)}</span>` : ''}
      </div>
      <div class="card__foot">
        <span class="badge badge--wish">想去</span>
        <button class="btn btn--sm btn--soft" data-act="promote" data-id="${t.id}">开始攻略</button>
      </div>
    </div>
  </div>`;
}

function cardWishDone(t) {
  const st = tripState(t).status;
  const label = st === STATUS.DONE ? '已走过' : st === STATUS.ONGOING ? '路上 · 进行中' : '已规划';
  return `
  <div class="card card--dim" data-act="open" data-id="${t.id}" role="button" tabindex="0">
    <div class="card__cover" style="background:${toneBg(t.cover?.tone)}">${coverInner(t)}</div>
    <div class="card__body">
      <div class="card__title">${esc(t.title)}</div>
      <div class="card__meta">
        <span>${esc(regionInfo(t.region).name)}</span>
        <span>${esc(fmtRelative(t.promotedAt))}升级</span>
      </div>
      <div class="card__foot">
        <span class="badge badge--ghost">${label}</span>
        <button class="btn btn--sm btn--outline" data-act="unhide-wish" data-id="${t.id}">移出</button>
      </div>
    </div>
  </div>`;
}

function cardPast(t) {
  return `
  <div class="card" data-act="open" data-id="${t.id}" role="button" tabindex="0">
    <div class="card__cover" style="background:${toneBg(t.cover?.tone)}">${coverInner(t)}</div>
    <div class="card__body">
      <div class="card__title">${esc(t.title)}</div>
      <div class="card__meta">${esc(fmtDateRange(t))}</div>
      <div class="card__foot"><span class="badge badge--done">已结束</span></div>
    </div>
  </div>`;
}

/* ---------- 空态 ---------- */

function emptyState(tab, q) {
  const m = TAB_META[tab]?.empty || TAB_META.road.empty;
  if (q) {
    return `<div class="empty">
      <div class="empty__icon">🔍</div>
      <div class="empty__title">没找到「${esc(q)}」</div>
      <div class="empty__text">换个关键词试试，或者新建一条。</div>
    </div>`;
  }
  return `<div class="empty">
    <div class="empty__icon">${m.icon}</div>
    <div class="empty__title">${m.t}</div>
    <div class="empty__text">${m.s}</div>
    <div class="empty__actions">
      <button class="btn btn--primary" data-act="new">${m.a}</button>
    </div>
  </div>`;
}

/* ============================================================
   详情页
   ============================================================ */

export function viewTrip(id) {
  const t = getTrip(id);
  if (!t) {
    return `<div class="page"><div class="empty"><div class="empty__icon">🫥</div>
      <div class="empty__title">这条路书不见了</div>
      <div class="empty__actions"><button class="btn btn--primary" data-act="back">返回</button></div>
    </div></div>`;
  }

  const st = tripState(t);
  const prog = tripProgress(t);
  const info = regionInfo(t.region);

  return `
  <div class="page page--nothread">
    <div class="scroll" style="padding-top:0">
      <div class="detail-hero" style="background:${toneBg(t.cover?.tone)}">
        ${t.cover?.imgId ? `<img data-img="${esc(t.cover.imgId)}" alt="">` : ''}
        <span class="detail-hero__emoji">${esc(t.cover?.emoji || '📍')}</span>
        <div class="detail-hero__scrim"></div>
        <div class="detail-hero__nav">
          <button class="icon-btn" data-act="back" aria-label="返回">${icon('back')}</button>
          <button class="icon-btn" data-act="trip-menu" data-id="${t.id}" aria-label="更多">${icon('more')}</button>
        </div>
      </div>

      <div class="detail-head">
        ${shareBannerHtml(t)}
        <h1 class="detail-title">${esc(t.title)}</h1>
        <div class="detail-meta">
          ${badgeFor(st)}
          <div class="detail-meta__rest">
            ${t.location
              ? `<button class="place-chip" data-act="open-map" data-id="${t.id}">
                   ${icon('pin', 12)}<span>${esc(t.city || t.cityRaw || '未分类')}</span>
                 </button>`
              : `<span>${esc(t.city || t.cityRaw || '未分类')}</span>`}
            <span class="detail-date">${icon('calendar', 13)} ${esc(fmtDateRange(t))}</span>
          </div>
        </div>
        ${t.brief ? `<div class="detail-brief">${esc(t.brief)}</div>` : ''}
        ${prog && st.status === STATUS.ONGOING ? `
          <div class="progress">
            <div class="progress__row">
              <span>行程进度</span>
              <span><span class="progress__num">第 ${prog.day} / ${prog.total} 天</span></span>
            </div>
            <div class="progress__bar"><div class="progress__fill" style="width:${prog.pct}%"></div></div>
          </div>` : ''}
        ${st.needsConfirm ? `
          <div class="notice notice--warn" style="margin-top:14px">
            <span class="notice__icon">⏳</span>
            <span>这条行程填的是「${esc(t.dateText || t.roughYm || '')}」，时间已经过去了。它结束了吗？</span>
          </div>` : ''}

        <div class="detail-actions">${actionsFor(t, st)}</div>

        ${prepHtml(t)}

        ${dayNavHtml(t)}

        <div class="blocks">${blocksHtml(t)}</div>
      </div>
    </div>
  </div>
  ${ledgerFab(t)}`;
}

/* ============================================================
   账本：左下角浮动入口 + 弹层
   ============================================================ */

function money(n) {
  const v = Math.round(Number(n) || 0);
  return '¥' + v.toLocaleString('zh-CN');
}

/** 左下角浮动按钮，显示已花金额 */
function ledgerFab(t) {
  const spent = ledgerSpent(t);
  const has = spent > 0 || (t.ledger?.entries || []).length > 0;
  return `<button class="ledger-fab ${has ? '' : 'is-empty'}" data-act="open-ledger" data-id="${t.id}" aria-label="打开账本">
    <span class="ledger-fab__sign">¥</span>
    <span class="ledger-fab__amt">${has ? money(spent) : '账本'}</span>
  </button>`;
}

/** 账本正文（弹层里用） */
function ledgerBodyHtml(t) {
  const entries = t.ledger?.entries || [];
  const spent = ledgerSpent(t);
  const budget = t.ledger?.budget || 0;
  const pct = budget > 0 ? Math.min(100, Math.round((spent / budget) * 100)) : 0;
  const over = budget > 0 && spent > budget;
  const remain = budget - spent;

  const list = entries.length
    ? [...entries]
        .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
        .map((e) => {
          const c = categoryInfo(e.category);
          return `<div class="expense">
            <span class="expense__emoji">${c.emoji}</span>
            <span class="expense__main">
              <span class="expense__title">${esc(e.title)}</span>
              <span class="expense__date">${esc(e.date.slice(5).replace('-', '/'))}</span>
            </span>
            <span class="expense__amt">${money(e.amount)}</span>
            <button class="expense__del" data-act="del-expense" data-id="${t.id}" data-eid="${e.id}" aria-label="删除这笔">${icon('trash', 14)}</button>
          </div>`;
        })
        .join('')
    : `<div class="ledger__empty">还没有记账</div>`;

  return `
    <div class="ledger__head">
      <div class="ledger__col">
        <div class="ledger__label">已花</div>
        <div class="ledger__spent">${money(spent)}</div>
      </div>
      <button class="ledger__col ledger__col--right" data-act="set-budget" data-id="${t.id}">
        <div class="ledger__label">预算 ${icon('edit', 11)}</div>
        <div class="ledger__budget">${budget > 0 ? money(budget) : '设置'}</div>
      </button>
    </div>

    ${budget > 0 ? `
      <div class="ledger__bar"><i class="${over ? 'is-over' : ''}" style="width:${pct}%"></i></div>
      <div class="ledger__remain ${over ? 'is-over' : ''}">
        ${over ? `超出预算 ${money(-remain)}` : `还剩 ${money(remain)}`}
        <span class="ledger__pct">${pct}%</span>
      </div>` : ''}

    <div class="ledger__list">${list}</div>`;
}

export function showLedgerSheet(tripId) {
  const t = getTrip(tripId);
  if (!t) return;

  openSheet({
    title: '账本',
    desc: esc(t.title),
    html: `<div class="ledger-body">${ledgerBodyHtml(t)}</div>
      <button class="btn btn--primary btn--block" id="ls-add" style="margin-top:14px">
        ${icon('plus', 15)} 记一笔
      </button>`,
    onMount: (body) => {
      body.querySelector('#ls-add').addEventListener('click', () => {
        closeSheet();
        setTimeout(() => showExpenseSheet(t.id), 80);
      });
      // 删一笔后原地刷新弹层内容
      body.addEventListener('click', (e) => {
        const del = e.target.closest('[data-act="del-expense"]');
        if (del) {
          e.stopPropagation();
          const entry = getTrip(t.id)?.ledger?.entries?.find((x) => x.id === del.dataset.eid);
          if (!entry) return;
          confirmDialog({
            title: '删掉这笔？',
            message: `${esc(entry.title)}　¥${entry.amount.toLocaleString('zh-CN')}<br><br>删掉后不影响其他记录。`,
            okText: '删除',
            danger: true,
          }).then((ok) => {
            if (!ok) return;
            removeExpense(t.id, del.dataset.eid);
            toast('已删除');
            closeSheet();
            setTimeout(() => {
              render(true);
              showLedgerSheet(t.id);
            }, 80);
          });
          return;
        }
        const bud = e.target.closest('[data-act="set-budget"]');
        if (bud) {
          e.stopPropagation();
          closeSheet();
          setTimeout(() => showBudgetSheet(t.id), 80);
        }
      });
    },
  });
}

/** 行前准备：把待办、装备清单提到正文最前面，折叠收起 */
function prepHtml(t) {
  const lists = (t.blocks || [])
    .map((b, i) => ({ b, i }))
    .filter((x) => x.b.type === 'todo' && x.b.items?.length);
  if (!lists.length) return '';

  const total = lists.reduce((n, x) => n + x.b.items.length, 0);
  const done = lists.reduce((n, x) => n + x.b.items.filter((it) => it.done).length, 0);

  return `<div class="prep">
    <button class="prep__head" data-act="toggle-prep" aria-expanded="false">
      <span class="prep__ico">${icon('list', 16)}</span>
      <span class="prep__title">行前准备</span>
      <span class="prep__meta">${done}/${total}</span>
      <span class="prep__chev">${icon('chevron', 15)}</span>
    </button>
    <div class="prep__body" id="prep-body" hidden>
      ${lists.map(({ b, i }) => `
        <div class="prep__list">
          <div class="prep__list-title">${esc(b.title || '清单')}</div>
          ${b.items.map((it, j) => `
            <div class="todo ${it.done ? 'is-done' : ''}" data-act="toggle-todo" data-id="${t.id}" data-bi="${i}" data-ii="${j}">
              <div class="todo__box">${icon('check', 12)}</div>
              <div class="todo__text">${esc(it.t)}</div>
            </div>`).join('')}
        </div>`).join('')}
    </div>
  </div>`;
}

/** 日程索引条：只有 2 天以上才值得做导航 */
function dayNavHtml(t) {  const days = (t.blocks || [])
    .map((b, i) => ({ b, i }))
    .filter((x) => x.b.type === 'day');
  if (days.length < 2) return '';
  return `<nav class="day-nav" id="day-nav" aria-label="日程索引">
    ${days.map(({ b, i }) => `<button class="day-pill" data-day-jump="dayblock-${i}">D${b.day}</button>`).join('')}
  </nav>`;
}

function badgeFor(st) {
  if (st.status === STATUS.ONGOING) return `<span class="badge badge--ongoing">进行中</span>`;
  if (st.status === STATUS.PLANNING) return `<span class="badge badge--planning">待出发</span>`;
  if (st.status === STATUS.DONE) return `<span class="badge badge--done">已结束</span>`;
  return `<span class="badge badge--wish">想去</span>`;
}

function actionsFor(t, st) {
  if (st.status === STATUS.WISH) {
    return `<button class="btn btn--primary" data-act="promote" data-id="${t.id}">开始攻略</button>
            <button class="btn btn--soft" data-act="edit" data-id="${t.id}">编辑</button>`;
  }
  if (st.status === STATUS.PLANNING || st.status === STATUS.ONGOING) {
    const extra = st.needsConfirm
      ? `<button class="btn btn--soft" data-act="mark-done" data-id="${t.id}">已结束</button>`
      : `<button class="btn btn--soft" data-act="mark-done" data-id="${t.id}">提前结束</button>`;
    return `<button class="btn btn--primary" data-act="edit" data-id="${t.id}">编辑攻略</button>
            ${extra}`;
  }
  return `<button class="btn btn--primary" data-act="edit" data-id="${t.id}">编辑</button>
          <button class="btn btn--soft" data-act="reopen" data-id="${t.id}">拉回路上</button>`;
}

function blocksHtml(t) {
  if (!t.blocks?.length) {
    return `<div class="block">
      <div class="block__label">还没有内容</div>
      <div class="block__body" style="color:var(--muted)">这份攻略还是空的。点上面的「编辑攻略」，把路线、日程、要带的东西写进去。</div>
    </div>`;
  }
  // 待办清单已经提到页首的「行前准备」里，正文不再重复渲染
  return t.blocks
    .map((b, i) => (b.type === 'todo' ? '' : blockHtml(b, i, t.id)))
    .join('');
}

const TRANSIT_META = {
  walk: { emoji: '🚶', label: '步行' },
  bus: { emoji: '🚌', label: '公交' },
  metro: { emoji: '🚇', label: '地铁' },
  taxi: { emoji: '🚕', label: '打车' },
  car: { emoji: '🚗', label: '驾车' },
  boat: { emoji: '⛴️', label: '乘船' },
  train: { emoji: '🚄', label: '高铁' },
  flight: { emoji: '✈️', label: '飞行' },
};

const MEAL_META = {
  breakfast: { emoji: '🍳', label: '早餐' },
  lunch: { emoji: '🍜', label: '午餐' },
  dinner: { emoji: '🍲', label: '晚餐' },
  snack: { emoji: '🍡', label: '小吃' },
};

function fmtMinutes(m) {
  if (!m || m <= 0) return '';
  if (m < 60) return `${m} 分钟`;
  const h = Math.floor(m / 60);
  const r = m % 60;
  return r ? `${h} 小时 ${r} 分` : `${h} 小时`;
}

/** 从一个地点到下一个地点的交通提示 */
function tlTransit(tr) {
  const meta = TRANSIT_META[tr.mode] || TRANSIT_META.car;
  const parts = [meta.label];
  if (tr.minutes) parts.push(`约 ${fmtMinutes(tr.minutes)}`);
  if (tr.note) parts.push(tr.note);
  return `<div class="tl-row tl-row--transit">
    <div class="tl-time"></div>
    <div class="tl-mark"><span class="tl-line"></span></div>
    <div class="tl-main"><span class="tl-badge">${meta.emoji}</span><span class="tl-tt">${parts.map(esc).join(' · ')}</span></div>
  </div>`;
}

/** 地点名 + 下划线 + 小定位图标，整体可点，不再单独占用一个按钮位 */
function placeChip(name, lat, lng, plain) {
  const label = `<span class="tl-name${plain ? ' tl-name--plain' : ''}">${esc(name)}</span>`;
  if (lat == null) return `<span class="tl-place">${label}</span>`;
  return `<button class="tl-place" data-act="stop-map" data-lat="${lat}" data-lng="${lng}" data-name="${esc(name)}">
    ${label}${icon('pin', 11)}
  </button>`;
}

function tlStop(s, dayNo, idx, isFirst) {
  const storyId = `story-${dayNo}-${idx}`;
  const isSpot = !!s.story;
  return `${!isFirst && s.transit ? tlTransit(s.transit) : ''}
  <div class="tl-row tl-row--stop ${isSpot ? 'is-spot' : 'is-plain'}">
    <div class="tl-time">${s.start ? esc(s.start) : ''}</div>
    <div class="tl-mark"><span class="tl-dot"></span></div>
    <div class="tl-main">
      <div class="tl-title">
        ${placeChip(s.name, s.lat, s.lng, !isSpot)}
        ${s.duration ? `<span class="tl-dur">${fmtMinutes(s.duration)}</span>` : ''}
      </div>
      ${isSpot ? `
        <button class="stop__more" data-act="story" data-target="${storyId}">
          <span class="stop__more-plus">＋</span><span>来历</span>
        </button>
        <div class="stop__story" id="${storyId}" hidden>${esc(s.story)}</div>` : ''}
    </div>
  </div>`;
}

function tlMeal(m) {
  const meta = MEAL_META[m.type] || MEAL_META.snack;
  return `<div class="tl-row tl-row--meal">
    <div class="tl-time">${m.start ? esc(m.start) : ''}</div>
    <div class="tl-mark"><span class="tl-dot"></span></div>
    <div class="tl-main">
      <div class="tl-title">
        <span class="tl-meal-tag">${meta.label}</span>
        ${placeChip(m.name, m.lat, m.lng, true)}
      </div>
      ${m.note ? `<div class="tl-note">${esc(m.note)}</div>` : ''}
    </div>
  </div>`;
}

/** 一天的照片：随手拍的记录，存在本地 */
function photosHtml(photos, tripId, bi) {
  const tiles = photos.map((p) => `
    <button class="photo" data-act="view-photo" data-id="${tripId}" data-bi="${bi}" data-pid="${p.id}">
      <span class="photo__img" data-img="${p.imgId || ''}" data-demo-src="${p.demoSrc || ''}"></span>
      ${p.at ? `<span class="photo__at">${esc(p.at)}</span>` : ''}
    </button>`).join('');

  return `<div class="photos">
    ${tiles}
    <button class="photo photo--add" data-act="add-photo" data-id="${tripId}" data-bi="${bi}" aria-label="拍一张">
      <span class="photo__plus">＋</span>
      <span class="photo__hint">照片</span>
    </button>
  </div>`;
}

/** 选照片来源：拍照 or 从相册选 */
export function showPhotoSourceSheet(tripId, bi) {
  openSheet({
    title: '添加照片',
    desc: '照片只存在这台设备上，不会上传',
    html: `<div class="menu">
      <button class="menu__item" data-src="camera">
        <span class="menu-ico">📷</span>
        <span><div>拍一张</div><div class="menu__item__sub">直接打开相机</div></span>
      </button>
      <button class="menu__item" data-src="library">
        <span class="menu-ico">🖼️</span>
        <span><div>从相册选</div><div class="menu__item__sub">选手机里已有的照片</div></span>
      </button>
    </div>`,
    onMount: (body) => {
      body.addEventListener('click', (e) => {
        const b = e.target.closest('[data-src]');
        if (!b) return;
        const useCamera = b.dataset.src === 'camera';
        closeSheet();
        setTimeout(() => pickAndSave(tripId, bi, useCamera), 80);
      });
    },
  });
}

function pickAndSave(tripId, bi, useCamera) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  if (useCamera) input.setAttribute('capture', 'environment');
  input.style.display = 'none';
  document.body.appendChild(input);

  input.addEventListener('change', async () => {
    const file = input.files?.[0];
    input.remove();
    if (!file) return;
    try {
      toast('正在保存…');
      await addPhoto(tripId, Number(bi), file);
      toast('已存入本地');
      render(true);
    } catch (err) {
      toast(err?.message || '保存失败');
    }
  });

  input.click();
}

/* ============================================================
   旅游分享页
   ============================================================ */

/** 把一条路书里所有照片摊平，带上所属的天 */
function collectPhotos(t) {
  return (t.blocks || [])
    .filter((b) => b.type === 'day')
    .flatMap((b) => (b.photos || []).map((p) => ({ ...p, day: b.day, dayTitle: b.title })));
}

/** 详情页顶部横幅：路书结束后自动出现 */
function shareBannerHtml(t) {
  if (!canShare(t)) return '';
  const cfg = shareConfig(t);
  const ready = !!t.share;
  return `<button class="share-banner" data-act="open-share" data-id="${t.id}">
    <span class="share-banner__ico">${icon('sparkle', 17)}</span>
    <span class="share-banner__body">
      <span class="share-banner__title">${ready ? '分享页已准备好' : '这趟已经结束，做一份回顾'}</span>
      <span class="share-banner__sub">${ready ? '查看 · 编辑 · 发给朋友' : '配图 + 行程 + 花费，一页看完'}</span>
    </span>
    <span class="share-banner__chev">${icon('chevron', 16)}</span>
  </button>`;
}

/** 分享页本身：一套固定模板 */
export function viewShare(tripId) {
  const t = getTrip(tripId);
  if (!t) {
    return `<div class="page"><div class="scroll"><div class="empty">
      <div class="empty__icon">🧭</div><div class="empty__title">这份路书不在了</div>
    </div></div></div>`;
  }

  const cfg = shareConfig(t);
  const all = collectPhotos(t);
  const byId = new Map(all.map((p) => [p.id, p]));
  const chosen = cfg.photoIds.map((id) => byId.get(id)).filter(Boolean);
  const cover = byId.get(cfg.coverPhotoId) || chosen[0] || null;
  const days = (t.blocks || []).filter((b) => b.type === 'day');
  const stopCount = days.reduce((n, d) => n + (d.stops || []).length, 0);
  const spent = ledgerSpent(t);

  const daysHtml = days.map((d) => {
    const stops = (d.stops || []).filter((s) => s.story || s.duration);
    const photos = (d.photos || []);
    if (!stops.length && !photos.length && !d.title) return '';
    return `<section class="sp-day">
      <div class="sp-day__head">
        <span class="sp-day__no">D${d.day}</span>
        <span class="sp-day__title">${esc(d.title || '')}</span>
      </div>
      ${d.body ? `<p class="sp-day__body">${esc(d.body)}</p>` : ''}
      ${stops.length ? `<ul class="sp-stops">
        ${stops.map((s) => `<li>
          <span class="sp-stop__time">${esc(s.start || '')}</span>
          <span class="sp-stop__name">${esc(s.name)}</span>
          ${s.duration ? `<span class="sp-stop__dur">${fmtMinutes(s.duration)}</span>` : ''}
        </li>`).join('')}
      </ul>` : ''}
    </section>`;
  }).join('');

  const photoHtml = chosen.length
    ? `<div class="sp-gallery">
        ${chosen.map((p) => `<figure class="sp-shot">
          <span class="sp-shot__img" data-img="${p.imgId || ''}" data-demo-src="${p.demoSrc || ''}"></span>
          ${p.caption ? `<figcaption>${esc(p.caption)}</figcaption>` : ''}
        </figure>`).join('')}
      </div>`
    : '';

  return `
  <div class="page page--share">
    <header class="sp-top">
      <button class="icon-btn" data-act="share-back" aria-label="返回">${icon('back', 20)}</button>
      <div class="sp-top__title">回顾</div>
      <div class="sp-top__right">
        <button class="icon-btn" data-act="share-out" data-id="${t.id}" aria-label="分享">${icon('upload', 17)}</button>
        <button class="icon-btn" data-act="edit-share" data-id="${t.id}" aria-label="编辑">${icon('edit', 17)}</button>
      </div>
    </header>

    <div class="sp-hero">
      <span class="sp-hero__img" data-img="${cover?.imgId || ''}" data-demo-src="${cover?.demoSrc || ''}"></span>
      <div class="sp-hero__scrim"></div>
      <div class="sp-hero__text">
        <div class="sp-hero__date">${esc(fmtDateRange(t))}</div>
        <h1 class="sp-hero__title">${esc(cfg.title || t.title)}</h1>
        <div class="sp-hero__meta">
          <span>${esc(t.city || t.cityRaw || '')}</span>
          <span>${days.length} 天</span>
          ${stopCount ? `<span>${stopCount} 个地方</span>` : ''}
          ${chosen.length ? `<span>${chosen.length} 张照片</span>` : ''}
        </div>
      </div>
    </div>

    <div class="sp-body">
      ${cfg.lead ? `<p class="sp-lead">${esc(cfg.lead)}</p>` : ''}

      ${daysHtml ? `<h2 class="sp-h2">行程</h2>${daysHtml}` : ''}

      ${photoHtml}

      ${cfg.showLedger && spent > 0 ? `
        <h2 class="sp-h2">花费</h2>
        <div class="sp-cost">
          <div class="sp-cost__num">${money(spent)}</div>
          <div class="sp-cost__sub">${(t.ledger?.entries || []).length} 笔记录${t.ledger?.budget ? ` · 预算 ${money(t.ledger.budget)}` : ''}</div>
        </div>` : ''}

      <div class="sp-foot">用「路书」记下这一段</div>
    </div>
  </div>`;
}

/** 编辑分享页 */
export function showShareEditSheet(tripId) {
  const t = getTrip(tripId);
  if (!t) return;

  const cfg = shareConfig(t);
  const all = collectPhotos(t);
  const picked = new Set(cfg.photoIds);

  let titleEl;
  let leadEl;
  let showLedger = cfg.showLedger;
  let coverId = cfg.coverPhotoId;
  const chosen = new Set(cfg.photoIds);

  const photoTiles = all.length
    ? all.map((p) => `
      <button class="pick ${chosen.has(p.id) ? 'is-on' : ''}" data-pick="${p.id}">
        <span class="pick__img" data-img="${p.imgId || ''}" data-demo-src="${p.demoSrc || ''}"></span>
        <span class="pick__tick">${icon('check', 12)}</span>
      </button>`).join('')
    : `<div class="ledger__empty">这条还没有照片，去行程里拍几张</div>`;

  const coverTiles = all.length
    ? all.map((p) => `
      <button class="pick pick--cover ${p.id === coverId ? 'is-on' : ''}" data-cover="${p.id}">
        <span class="pick__img" data-img="${p.imgId || ''}" data-demo-src="${p.demoSrc || ''}"></span>
      </button>`).join('')
    : '';

  openSheet({
    title: '编辑回顾',
    html: `
      <div class="field">
        <span class="field__label">标题</span>
        <input id="sh-title" class="input" type="text" maxlength="40" value="${esc(cfg.title || t.title)}" placeholder="给这段起个名字">
      </div>

      <div class="field">
        <span class="field__label">导语</span>
        <textarea id="sh-lead" class="textarea" rows="3" maxlength="200" placeholder="一句话说清这趟的感觉">${esc(cfg.lead || '')}</textarea>
      </div>

      ${all.length ? `
        <div class="field">
          <span class="field__label">封面</span>
          <div class="pick-row" id="sh-cover">${coverTiles}</div>
        </div>
        <div class="field">
          <span class="field__label">照片（点选要展示的）</span>
          <div class="pick-grid" id="sh-photos">${photoTiles}</div>
        </div>` : ''}

      <button class="switch-row" id="sh-ledger">
        <span>显示花费</span>
        <span class="switch ${showLedger ? 'is-on' : ''}"><i></i></span>
      </button>

      <button class="btn btn--primary btn--block" id="sh-save" style="margin-top:14px">保存</button>
    `,
    onMount: (body) => {
      titleEl = body.querySelector('#sh-title');
      leadEl = body.querySelector('#sh-lead');
      hydrateImages(body).catch(() => {});

      body.querySelector('#sh-cover')?.addEventListener('click', (e) => {
        const b = e.target.closest('[data-cover]');
        if (!b) return;
        coverId = b.dataset.cover;
        body.querySelectorAll('[data-cover]').forEach((x) => x.classList.toggle('is-on', x === b));
      });

      body.querySelector('#sh-photos')?.addEventListener('click', (e) => {
        const b = e.target.closest('[data-pick]');
        if (!b) return;
        const id = b.dataset.pick;
        if (chosen.has(id)) chosen.delete(id);
        else chosen.add(id);
        b.classList.toggle('is-on', chosen.has(id));
      });

      body.querySelector('#sh-ledger')?.addEventListener('click', () => {
        showLedger = !showLedger;
        body.querySelector('#sh-ledger .switch').classList.toggle('is-on', showLedger);
      });

      body.querySelector('#sh-save').addEventListener('click', () => {
        saveShare(t.id, {
          title: titleEl.value.trim() || t.title,
          lead: leadEl.value.trim(),
          coverPhotoId: coverId,
          photoIds: [...chosen],
          showLedger,
        });
        closeSheet();
        toast('已保存');
        render(false);
      });
    },
  });
}

/** 分享出去：复制文案 or 复制链接 */
export function showShareOutSheet(tripId) {
  const t = getTrip(tripId);
  if (!t) return;
  const cfg = shareConfig(t);
  const days = (t.blocks || []).filter((b) => b.type === 'day');
  const spent = ledgerSpent(t);

  const text = [
    `${cfg.title || t.title}`,
    `${fmtDateRange(t)}　${t.city || t.cityRaw || ''}`,
    cfg.lead ? `\n${cfg.lead}` : '',
    '',
    ...days.map((d) => {
      const stops = (d.stops || []).filter((s) => s.story || s.duration);
      return `D${d.day} ${d.title || ''}${stops.length ? `\n　${stops.map((s) => s.name).join(' · ')}` : ''}`;
    }),
    spent > 0 && cfg.showLedger ? `\n花费 ${money(spent)}` : '',
    '',
    '—— 用「路书」记下的',
  ].filter((x) => x !== undefined).join('\n');

  const url = siteURL() + '#/share/' + t.id;

  openSheet({
    title: '分享这一趟',
    desc: '文案适合直接发微信；链接打开的是你这台设备上的分享页',
    html: `<div class="menu">
      <button class="menu__item" data-share="text">
        <span class="menu-ico">📝</span>
        <span><div>复制文字版</div><div class="menu__item__sub">行程 + 花费，粘到哪都能看</div></span>
      </button>
      <button class="menu__item" data-share="link">
        <span class="menu-ico">🔗</span>
        <span><div>复制分享链接</div><div class="menu__item__sub">打开就是你现在的分享页</div></span>
      </button>
    </div>`,
    onMount: (body) => {
      body.addEventListener('click', async (e) => {
        const b = e.target.closest('[data-share]');
        if (!b) return;
        const payload = b.dataset.share === 'text' ? text : url;
        closeSheet();
        try {
          await navigator.clipboard.writeText(payload);
          toast(b.dataset.share === 'text' ? '文案已复制' : '链接已复制');
        } catch (_) {
          toast('复制失败，请手动选择');
        }
      });
    },
  });
}

/** 看大图 */
export function showPhotoSheet(tripId, bi, photoId) {
  const t = getTrip(tripId);
  const block = t?.blocks?.[bi];
  const photo = block?.photos?.find((p) => p.id === photoId);
  if (!photo) return;

  const when = [block.title, photo.at].filter(Boolean).join(' · ');

  openSheet({
    title: '照片',
    desc: esc(when),
    html: `
      <div class="photo-view">
        <span class="photo-view__img" data-img="${photo.imgId || ''}" data-demo-src="${photo.demoSrc || ''}"></span>
      </div>
      ${photo.caption ? `<div class="photo-view__cap">${esc(photo.caption)}</div>` : ''}`,
    buttons: [
      { label: '删除', value: 'del', kind: 'danger' },
      { label: '关闭', value: null, kind: 'primary' },
    ],
    onMount: (body) => {
      hydrateImages(body).catch(() => {});
    },
    onClose: async (v) => {
      if (v !== 'del') return;
      const ok = await confirmDialog({
        title: '删掉这张照片？',
        message: '照片只存在这台设备上，删了就找不回来了。',
        okText: '删除',
        danger: true,
      });
      if (!ok) return;
      await removePhoto(tripId, bi, photoId);
      toast('已删除');
      render(true);
    },
  });
}
function timelineHtml(stops, meals, dayNo) {
  if (!stops.length && !meals.length) return '';

  const items = [
    ...stops.map((s, si) => ({ kind: 'stop', start: s.start || '', si, data: s })),
    ...meals.map((m) => ({ kind: 'meal', start: m.start || '', data: m })),
  ];

  // 有时间的按时间升序；没时间的保持原顺序排在后面
  items.sort((a, b) => {
    if (a.start && b.start) return a.start < b.start ? -1 : a.start > b.start ? 1 : 0;
    if (a.start) return -1;
    if (b.start) return 1;
    return 0;
  });

  let firstStop = true;
  return `<div class="tl">${items.map((it) => {
    if (it.kind === 'meal') return tlMeal(it.data);
    const html = tlStop(it.data, dayNo, it.si, firstStop);
    firstStop = false;
    return html;
  }).join('')}</div>`;
}

function blockHtml(b, i, tripId) {
  if (b.type === 'day') {
    return `<div class="block block--day" id="dayblock-${i}" data-day="${b.day}">
      <div class="block__daytag">D${b.day}</div>
      ${b.title ? `<div class="block__title">${esc(b.title)}</div>` : ''}
      ${b.body ? `<div class="block__body">${esc(b.body)}</div>` : ''}
      ${timelineHtml(b.stops || [], b.meals || [], b.day)}
      ${photosHtml(b.photos || [], tripId, i)}
    </div>`;
  }
  if (b.type === 'todo') {
    return `<div class="block">
      <div class="block__label">${icon('list', 13)} ${esc(b.title || '清单')}</div>
      ${(b.items || []).map((it, j) => `
        <div class="todo ${it.done ? 'is-done' : ''}" data-act="toggle-todo" data-id="${tripId}" data-bi="${i}" data-ii="${j}">
          <div class="todo__box">${icon('check', 12)}</div>
          <div class="todo__text">${esc(it.t)}</div>
        </div>`).join('')}
    </div>`;
  }
  if (b.type === 'link') {
    return `<a class="block block--link" href="${esc(b.url)}" target="_blank" rel="noopener noreferrer">
      <div class="block__icon">🔗</div>
      <div class="block__grow">
        <div class="block__title" style="margin:0">${esc(b.title || b.url)}</div>
        <div class="block__body">${esc(b.url)}</div>
      </div>
    </a>`;
  }
  return `<div class="block">
    ${b.title ? `<div class="block__label">${esc(b.title)}</div>` : ''}
    <div class="block__body">${esc(b.body)}</div>
  </div>`;
}

/* ============================================================
   操作菜单
   ============================================================ */

export function showTripMenu(id) {
  const t = getTrip(id);
  if (!t) return;
  const st = tripState(t);
  const items = [];

  // 任何状态都能分享：想去阶段把"种草的念头"发给朋友也很常见
  items.push({
    act: 'share',
    label: st.status === STATUS.WISH ? '分享这个想法' : '分享这条路书',
    sub: '生成一条链接，谁打开就加到谁的手机里',
    icon: 'link',
  });
  items.push({ act: 'edit', label: '编辑', icon: 'edit' });
  if (st.status === STATUS.DONE) {
    items.push({ act: 'reopen', label: '拉回路上（改签/延期）', icon: 'road' });
  }
  if (st.status === STATUS.WISH && t.promotedAt) {
    items.push({ act: 'unhide-wish', label: '从「想去」中移出', icon: 'archive' });
  }
  items.push({ act: 'delete', label: '删除这条路书', icon: 'trash', danger: true });

  openSheet({
    title: t.title,
    html: `<div class="menu">${items.map((i) => `
      <button class="menu__item ${i.danger ? 'menu__item--danger' : ''}" data-menu-act="${i.act}">
        ${icon(i.icon)}
        <span><div>${i.label}</div>${i.sub ? `<div class="menu__item__sub">${i.sub}</div>` : ''}</span>
      </button>`).join('')}</div>`,
    onMount: (body) => {
      body.addEventListener('click', async (e) => {
        const b = e.target.closest('[data-menu-act]');
        if (!b) return;
        const act = b.dataset.menuAct;
        closeSheet();
        if (act === 'edit') location.hash = `#/edit/${id}`;
        else if (act === 'delete') {
          const ok = await confirmDialog({
            title: '删除这条路书？',
            message: `「${esc(t.title)}」会被永久删除，无法撤销。${t.cover?.imgId ? '封面图片也会一起删掉。' : ''}`,
            okText: '删除',
            danger: true,
          });
          if (ok) {
            deleteTrip(id);
            toast('已删除');
            location.hash = '#/road';
          }
        } else if (act === 'reopen') {
          setManualStatus(id, STATUS.ONGOING);
          toast('已拉回「路上」');
          render();
        } else if (act === 'unhide-wish') {
          hideFromWish(id, true);
          toast('已从「想去」移出');
          render();
        } else if (act === 'share') {
          showShareSheet(t);
        }
      });
    },
  });
}

function showShareSheet(t) {
  const link = makeShareLink(t);
  openSheet({
    title: '分享这条路书',
    desc: '对方打开链接后，会看到一条可导入的记录，点确认才会写进他手机的本地存储。',
    html: `
      <div class="notice"><span class="notice__icon">💡</span>
        <span>数据本身在链接里，不经过任何服务器。链接比较长是因为带了完整内容。</span></div>
      <textarea class="textarea input--mono" readonly rows="5" id="share-link">${esc(link)}</textarea>`,
    buttons: [
      { label: '关闭', value: null },
      { label: '复制链接', value: 'copy', kind: 'primary' },
    ],
    onMount: (body) => {
      const ta = body.querySelector('#share-link');
      ta?.addEventListener('click', () => ta.select());
    },
    onClose: async (v) => {
      if (v === 'copy') {
        try {
          await navigator.clipboard.writeText(link);
          toast('链接已复制');
        } catch (_) {
          toast('复制失败，请长按手动复制');
        }
      }
    },
  });
}

/* ============================================================
   设置页
   ============================================================ */

export function viewSettings() {
  const app = getApp();
  const total = app.trips.length;
  const imgs = app.trips.filter((t) => t.cover?.imgId).length;

  return `
  <div class="page page--nothread">
    <header class="topbar">
      <div class="topbar__row">
        <button class="icon-btn" data-act="back" aria-label="返回">${icon('back')}</button>
        <div class="topbar__title" style="font-size:21px;margin-left:2px">设置</div>
      </div>
    </header>
    <div class="scroll">
      <div class="section-label">本年度消费</div>
      <div class="block spend-card">
        ${(() => {
          const ys = yearSpent(app.trips);
          if (!ys.count) {
            return `<div class="spend-card__num">¥0</div>
              <div class="spend-card__sub">${ys.year} 年还没有记账，去任一路书里点「记一笔」</div>`;
          }
          return `<div class="spend-card__num">${money(ys.total)}</div>
            <div class="spend-card__sub">${ys.year} 年 · ${ys.count} 笔 · 覆盖 ${ys.trips} 段行程</div>`;
        })()}
      </div>

      <div class="section-label">数据</div>
      <div class="block" style="padding:6px 16px">
        <div class="kv"><span class="kv__k">路书总数</span><span class="kv__v">${total} 条</span></div>
        <div class="kv"><span class="kv__k">带封面的</span><span class="kv__v">${imgs} 条</span></div>
        <div class="kv"><span class="kv__k">存储位置</span><span class="kv__v">本机浏览器</span></div>
        <div class="kv"><span class="kv__k">最近修改</span><span class="kv__v">${esc(fmtRelative(app.updatedAt))}</span></div>
      </div>

      <div class="notice" style="margin-top:14px">
        <span class="notice__icon">🔒</span>
        <span>所有内容只存在这台设备的这个浏览器里，不上传、不备份到云端。换手机、清缓存、换浏览器都会丢，请定期导出。</span>
      </div>

      <div class="section-label">备份与恢复</div>
      <div class="block" style="padding:6px 16px">
        <button class="menu__item" data-act="export-full" style="padding-left:0;padding-right:0">
          ${icon('download')}
          <span><div>导出完整备份</div><div class="menu__item__sub">含图片，换手机靠它</div></span>
        </button>
        <div class="divider"></div>
        <button class="menu__item" data-act="import-file" style="padding-left:0;padding-right:0">
          ${icon('upload')}
          <span><div>从备份文件恢复</div><div class="menu__item__sub">合并或覆盖，会让你选</div></span>
        </button>
      </div>

      <div class="section-label">示例数据</div>
      <div class="block" style="padding:6px 16px">
        <button class="menu__item" data-act="load-demo" style="padding-left:0;padding-right:0">
          ${icon('sparkle')}
          <span><div>载入示例数据</div><div class="menu__item__sub">9 条样例，看三种状态长什么样，不影响你已有的</div></span>
        </button>
      </div>

      <div class="section-label">AI 添加</div>
      <div class="block" style="padding:6px 16px">
        <button class="menu__item" data-act="paste-json" style="padding-left:0;padding-right:0">
          ${icon('wand')}
          <span><div>粘贴 AI 给的数据</div><div class="menu__item__sub">AI 输出一段 JSON，粘进来即可</div></span>
        </button>
        <div class="divider"></div>
        <button class="menu__item" data-act="ai-help" style="padding-left:0;padding-right:0">
          ${icon('sparkle')}
          <span><div>怎么让 AI 帮你加</div><div class="menu__item__sub">一段可以直接转发的话术</div></span>
        </button>
      </div>

      <div class="section-label">危险操作</div>
      <div class="block" style="padding:6px 16px">
        <button class="menu__item menu__item--danger" data-act="wipe" style="padding-left:0;padding-right:0">
          ${icon('trash')}
          <span><div>清空所有数据</div><div class="menu__item__sub">不可恢复，先导出备份</div></span>
        </button>
      </div>

      <div style="text-align:center;color:var(--muted);font-size:12px;padding:26px 0 40px">
        路书 · 数据留在你手里
      </div>
    </div>
  </div>`;
}

/** 生成一段可直接转发给任何 AI 的话术 */
export function buildAIPrompt() {
  const site = siteURL();
  const txtUrl = siteFile('ai.txt');
  const htmlUrl = siteFile('ai.html');
  return `帮我往「路书」里加一条旅行记录。网站是：${site}

能打开的话先读 ${txtUrl} 了解格式（读出来是乱码就换 ${htmlUrl}）；打不开就按下面这个 JSON 结构给我。

{"title":"标题","city":"地点","brief":"一句话介绍","dateText":"模糊时间","status":"wish","blocks":[{"type":"text","title":"小标题","body":"正文"}]}

规则：
- status 用 wish 表示只是想去（进「想去」），planning 表示已确定要走（进「路上」）
- 有确切日期就加 "startDate":"2027-02-06","endDate":"2027-02-17"，格式 YYYY-MM-DD
- blocks 可以是 text（段落）/ day（某一天）/ todo（清单）/ link（链接）
- 只负责新增，不要输出删除或修改的指令

我要加的：去南极，12 天，2027 年春节前后`;
}

/**
 * 首次打开的一次性引导
 * 只弹一次（写入 lushu.welcomed），点空白处即可关闭
 */
export function showWelcome() {
  const demo = buildAIPrompt();

  try {
    localStorage.setItem('lushu.welcomed', '1');
  } catch (_) { /* 隐私模式下写不了，下次再弹也无妨 */ }

  openSheet({
    title: '第一次用？让 AI 帮你记',
    desc: '点空白处就能关掉。以后想再看：右上角 ⚙ → 怎么让 AI 帮你加。',
    html: `
      <div class="field__hint" style="margin-bottom:10px;line-height:1.72">
        这个网站里放了一份给 AI 看的说明书。把下面这段话发给<b>元宝、千问、Kimi、豆包</b>，
        说清楚你要加什么 —— AI 就会回你一段数据，或者一条链接。
      </div>

      <textarea class="textarea input--mono" readonly rows="6" id="welcome-prompt"
        style="font-size:11px;line-height:1.7">${esc(demo)}</textarea>

      <div class="field__hint" style="margin-top:11px;line-height:1.78">
        <b>它回 JSON</b> → 复制，回来点「粘贴 AI 给的数据」<br>
        <b>它回链接</b> → 直接点开，弹确认卡，点一下就成
      </div>

      <div class="notice" style="margin-top:11px">
        <span class="notice__icon">🛡</span>
        <span>AI 碰不到你手机里的数据：它只能"提议"，链接点开后还要你亲手点一次确认，才存得进来。</span>
      </div>`,
    buttons: [
      { label: '先自己逛逛', value: null },
      { label: '复制这段话', value: 'copy', kind: 'primary' },
    ],
    onMount: (body) => {
      body.querySelector('#welcome-prompt')?.addEventListener('click', (e) => e.target.select());
    },
    onClose: async (v) => {
      if (v !== 'copy') return;
      try {
        await navigator.clipboard.writeText(demo);
        toast('已复制，发给 AI 就行');
      } catch (_) {
        toast('复制失败，请长按文字手动复制');
      }
    },
  });
}

/* ============================================================
   地图与账本的弹层
   ============================================================ */

/** 用哪个地图打开；target 可以是路书 id，也可以是 { lat, lng, name } */
export function showMapPicker(target) {
  let loc = null;
  if (typeof target === 'string') {
    loc = getTrip(target)?.location || null;
  } else if (target && typeof target === 'object') {
    loc = target;
  }
  if (!loc || loc.lat == null || loc.lng == null) {
    toast('这个地点还没有坐标');
    return;
  }

  const last = readChoice();
  const rows = MAP_PROVIDERS.map((p) => `
    <button class="menu__item" data-map="${p.id}">
      <span class="map-badge">${esc(p.short.slice(0, 2))}</span>
      <span>
        <div>${esc(p.name)}</div>
        ${p.id === last ? '<div class="menu__item__sub">上次用的</div>' : ''}
      </span>
    </button>`).join('');

  openSheet({
    title: '用哪个地图打开',
    desc: `${esc(loc.name || '这个地点')}　${esc(coordText(loc))}`,
    html: `
      <div class="menu">${rows}</div>
      <button class="menu__item" data-map="copy">
        <span class="map-badge">⧉</span>
        <span><div>复制坐标</div><div class="menu__item__sub">粘到任意地图里搜索</div></span>
      </button>`,
    onMount: (body) => {
      body.addEventListener('click', async (e) => {
        const b = e.target.closest('[data-map]');
        if (!b) return;
        const id = b.dataset.map;
        closeSheet();
        if (id === 'copy') {
          try {
            await navigator.clipboard.writeText(coordText(loc));
            toast('坐标已复制');
          } catch (_) {
            toast('复制失败');
          }
          return;
        }
        rememberChoice(id);
        window.open(mapUrl(id, loc), '_blank', 'noopener');
      });
    },
  });
}

/** 记一笔 */
export function showExpenseSheet(tripId) {
  const t = getTrip(tripId);
  if (!t) return;

  let amountEl;
  let titleEl;
  let dateEl;
  let cat = 'transport';

  const cats = LEDGER_CATEGORIES.map((c) => `
    <button class="cat-chip${c.id === cat ? ' is-active' : ''}" data-cat="${c.id}">
      <span>${c.emoji}</span>${c.name}
    </button>`).join('');

  openSheet({
    title: '记一笔',
    html: `
      <div class="field">
        <span class="field__label">金额</span>
        <div class="money-input">
          <span class="money-input__unit">¥</span>
          <input id="ex-amount" type="number" inputmode="decimal" step="0.01" min="0"
                 placeholder="0" autocomplete="off">
        </div>
      </div>

      <div class="field">
        <span class="field__label">花在什么上</span>
        <input id="ex-title" class="input" type="text" maxlength="40"
               placeholder="例如：往返机票" autocomplete="off">
      </div>

      <div class="field">
        <span class="field__label">分类</span>
        <div class="cat-row" id="cat-row">${cats}</div>
      </div>

      <div class="field field--inline">
        <span class="field__label">日期</span>
        <input id="ex-date" class="input input--date" type="date" value="${todayStr()}">
      </div>

      <button class="btn btn--primary btn--block" id="ex-save">记下</button>`,
    onMount: (body) => {
      amountEl = body.querySelector('#ex-amount');
      titleEl = body.querySelector('#ex-title');
      dateEl = body.querySelector('#ex-date');

      body.querySelector('#cat-row').addEventListener('click', (e) => {
        const b = e.target.closest('[data-cat]');
        if (!b) return;
        cat = b.dataset.cat;
        body.querySelectorAll('[data-cat]').forEach((x) => x.classList.toggle('is-active', x === b));
      });

      body.querySelector('#ex-save').addEventListener('click', () => {
        const amount = Math.round(Number(amountEl.value));
        if (!Number.isFinite(amount) || amount <= 0) {
          toast('先填个金额');
          amountEl.focus();
          return;
        }
        addExpense(t.id, {
          amount,
          title: titleEl.value.trim() || categoryInfo(cat).name,
          category: cat,
          date: dateEl.value || todayStr(),
        });
        closeSheet();
        toast('已记下');
        render(true);
      });

      setTimeout(() => amountEl?.focus(), 240);
    },
  });
}

/** 设置预算 */
export function showBudgetSheet(tripId) {
  const t = getTrip(tripId);
  if (!t) return;

  let input;
  openSheet({
    title: '这趟的预算',
    desc: '填 0 或留空表示不设预算',
    html: `
      <div class="money-input">
        <span class="money-input__unit">¥</span>
        <input id="bg-input" type="number" inputmode="decimal" min="0" step="100"
               value="${t.ledger?.budget || ''}" placeholder="0">
      </div>
      <button class="btn btn--primary btn--block" id="bg-save" style="margin-top:14px">保存</button>`,
    onMount: (body) => {
      input = body.querySelector('#bg-input');
      body.querySelector('#bg-save').addEventListener('click', () => {
        const v = Math.max(0, Math.round(Number(input.value) || 0));
        setBudget(t.id, v);
        closeSheet();
        toast(v > 0 ? '预算已更新' : '已取消预算');
        render(true);
      });
      setTimeout(() => input?.focus(), 240);
    },
  });
}

export function showAIHelp() {
  const demo = buildAIPrompt();

  openSheet({
    title: '让任何 AI 帮你加',
    desc: '复制下面这段话，连同你的需求一起发给元宝、千问、Kimi。链接打不开也没关系，话术里已经带了格式。',
    html: `
      <textarea class="textarea input--mono" readonly rows="11" id="ai-prompt" style="font-size:12px">${esc(demo)}</textarea>

      <div class="field__hint" style="margin-top:14px">
        AI 会回你两样东西之一 ——<br>
        <b>一段 JSON</b>：复制 → 回这里点「粘贴 AI 给的数据」<br>
        <b>一条链接</b>：直接点开 → 确认导入
      </div>

      <div class="notice" style="margin-top:13px"><span class="notice__icon">🛡</span>
        <span>AI 只能"提议"，碰不到你手机里的数据。导入都要你亲手点确认，而且只新增、不覆盖。</span></div>`,
    buttons: [
      { label: '关闭', value: null },
      { label: '复制这段话', value: 'copy', kind: 'primary' },
    ],
    onMount: (body) => {
      body.querySelector('#ai-prompt')?.addEventListener('click', (e) => e.target.select());
    },
    onClose: async (v) => {
      if (v === 'copy') {
        try {
          await navigator.clipboard.writeText(demo);
          toast('话术已复制');
        } catch (_) {
          toast('复制失败，请长按选择');
        }
      }
    },
  });
}

export function showPasteJSON() {
  let ta = null;
  openSheet({
    title: '粘贴 AI 给的数据',
    desc: '把 AI 输出的 JSON 原样粘进来，多余的说明文字也没关系，会自动提取。',
    html: `<textarea class="textarea input--mono" rows="8" id="paste-in"
      placeholder='{"title":"南极 12 天","city":"南极","dateText":"2027年春节","brief":"..."}'></textarea>`,
    buttons: [
      { label: '取消', value: null },
      { label: '解析', value: 'go', kind: 'primary' },
    ],
    onMount: (body) => {
      ta = body.querySelector('#paste-in');
      setTimeout(() => ta?.focus(), 120);
    },
    onClose: (v) => {
      if (v !== 'go') return;
      const txt = ta ? ta.value : '';
      if (!txt || !txt.trim()) {
        toast('还没粘贴内容');
        return;
      }
      window.__lushuParseText?.(txt);
    },
  });
}

/* ============================================================
   图片水合
   ============================================================ */

export async function hydrateImages(root = document) {
  const { getImageURL } = await import('./store.js');
  const nodes = [...root.querySelectorAll('[data-img]')];
  for (const n of nodes) {
    const id = n.dataset.img;
    const demo = n.dataset.demoSrc || '';
    const key = id || demo;
    if (!key || n.dataset.loaded === key) continue;

    // 本地存的图优先；示例图在被抓进本地之前，先用在线地址兜底
    let url = id ? await getImageURL(id).catch(() => null) : null;
    if (!url) url = demo;
    if (!url) continue;
    let img = n.querySelector('img');
    if (!img) {
      img = document.createElement('img');
      img.alt = '';
      n.prepend(img);
    }
    img.src = url;
    n.dataset.loaded = key;
  }
}

/* 由 app.js 注入的重新渲染钩子 */
let render = () => {};
export function bindRender(fn) {
  render = fn;
}
