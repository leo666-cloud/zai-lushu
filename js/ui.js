/**
 * ui.js — DOM 工具、图标、弹层、提示
 */

/* ---------- 基础 ---------- */

export function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[c]);
}

export function $(sel, root = document) {
  return root.querySelector(sel);
}

export function $$(sel, root = document) {
  return [...root.querySelectorAll(sel)];
}

/* ---------- 封面色板 ---------- */

export const TONES = [
  'linear-gradient(155deg,#B6D3EC,#5E93C4)',
  'linear-gradient(155deg,#F5CD96,#CE8845)',
  'linear-gradient(155deg,#AFCDA5,#5B8C57)',
  'linear-gradient(155deg,#A4DAE0,#3F8E9C)',
  'linear-gradient(155deg,#CBAEDB,#7C5FA0)',
  'linear-gradient(155deg,#DCC8AC,#9E8058)',
  'linear-gradient(155deg,#E3EAF1,#93A6B6)',
  'linear-gradient(155deg,#F4BDC5,#C5717F)',
];

export function toneBg(i) {
  return TONES[Number(i) % TONES.length] || TONES[6];
}

/* ---------- 图标 ---------- */

const P = {
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  back: '<path d="M15 19l-7-7 7-7"/>',
  more: '<circle cx="5" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.6" fill="currentColor" stroke="none"/>',
  road: '<path d="M9 4 3.6 6.2v13.6L9 17.6l6 2.4 5.4-2.2V4.2L15 6.4 9 4z"/><path d="M9 4v13.6M15 6.4v13.6"/>',
  pin: '<path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/>',
  archive: '<rect x="3" y="4" width="18" height="5" rx="1.6"/><path d="M5 9v9.4A1.6 1.6 0 0 0 6.6 20h10.8A1.6 1.6 0 0 0 19 18.4V9"/><path d="M10 13h4"/>',
  edit: '<path d="M4 20h4L19 9a2.5 2.5 0 0 0-3.5-3.5L4.5 16.5 4 20z"/>',
  trash: '<path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13"/>',
  image: '<rect x="3" y="4.5" width="18" height="15" rx="2.4"/><circle cx="8.6" cy="10" r="1.5"/><path d="m4 17 5-5 4 4 3-3 4 4"/>',
  download: '<path d="M12 4v11m0 0 4-4m-4 4-4-4"/><path d="M5 19h14"/>',
  upload: '<path d="M12 20V9m0 0 4 4m-4-4-4 4"/><path d="M5 5h14"/>',
  sparkle: '<path d="M12 3.5 13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9 12 3.5z"/>',
  check: '<path d="m4.5 12.5 5 5 10-10"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.4"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  chevron: '<path d="m9 5 7 7-7 7"/>',
  link: '<path d="M10.5 13.5a4 4 0 0 0 5.7 0l2.6-2.6a4 4 0 1 0-5.7-5.7l-1.4 1.4"/><path d="M13.5 10.5a4 4 0 0 0-5.7 0l-2.6 2.6a4 4 0 1 0 5.7 5.7l1.4-1.4"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 1.8"/>',
  list: '<path d="M8 6h12M8 12h12M8 18h12"/><circle cx="4.2" cy="6" r="1.1" fill="currentColor" stroke="none"/><circle cx="4.2" cy="12" r="1.1" fill="currentColor" stroke="none"/><circle cx="4.2" cy="18" r="1.1" fill="currentColor" stroke="none"/>',
  settings: '<circle cx="12" cy="12" r="3.2"/><path d="M19.4 14.6a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"/>',
  globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.4 2.6 3.6 5.5 3.6 8.5S14.4 18.9 12 20.5C9.6 18.9 8.4 15 8.4 12S9.6 6.1 12 3.5z"/>',
  flag: '<path d="M5 21V4"/><path d="M5 4h11l-1.6 3.4L16 11H5"/>',
  wand: '<path d="m4 20 10-10"/><path d="M15 4.5 16 7l2.5 1L16 9l-1 2.5L14 9l-2.5-1L14 7l1-2.5z"/><path d="M19.5 13.5 20 15l1.5.5L20 16l-.5 1.5L19 16l-1.5-.5L19 15l.5-1.5z"/>',
};

export function icon(name, size = 20) {
  const d = P[name] || P.pin;
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none"
    stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true">${d}</svg>`;
}

/* ---------- Toast ---------- */

let toastTimer = null;
export function toast(msg, ms = 2000) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('is-show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('is-show'), ms);
}

/* ---------- 弹层 ---------- */

let sheetEl = null;
let sheetResolve = null;
let closeTimer = null;

export function isSheetOpen() {
  return !!sheetEl;
}

/**
 * @param {object} o
 * @param {string} o.title
 * @param {string} [o.desc]
 * @param {string} o.html 内容 HTML
 * @param {Array<{label:string,value:any,kind?:string}>} [o.buttons]
 * @param {(body:HTMLElement)=>void} [o.onMount]
 * @param {(v:any)=>void} [o.onClose]
 */
export function openSheet(o) {
  closeSheet(null, true);
  // 取消上一步关闭动作留下的清理定时器，否则它会在新弹层渲染后把容器清空
  clearTimeout(closeTimer);
  closeTimer = null;

  const layer = document.getElementById('layer');
  const wrap = document.createElement('div');
  wrap.className = 'scrim';
  const sheet = document.createElement('div');
  sheet.className = 'sheet';
  sheet.setAttribute('role', 'dialog');
  sheet.setAttribute('aria-modal', 'true');

  const btns = (o.buttons || []).map((b, i) =>
    `<button class="btn ${b.kind === 'primary' ? 'btn--primary' : b.kind === 'danger' ? 'btn--soft btn--danger' : 'btn--soft'}" data-sheet-btn="${i}">${esc(b.label)}</button>`
  ).join('');

  sheet.innerHTML = `
    <div class="sheet__grab"></div>
    ${o.title ? `<div class="sheet__title">${esc(o.title)}</div>` : ''}
    ${o.desc ? `<div class="sheet__desc">${o.desc}</div>` : ''}
    <div class="sheet__body">${o.html || ''}</div>
    ${btns ? `<div class="sheet__foot">${btns}</div>` : ''}
  `;

  layer.innerHTML = '';
  layer.appendChild(wrap);
  layer.appendChild(sheet);
  layer.classList.add('is-open');
  document.body.style.overflow = 'hidden';

  sheetEl = sheet;
  sheetResolve = o.onClose || null;

  wrap.addEventListener('click', () => closeSheet(null));
  sheet.addEventListener('click', (e) => {
    const b = e.target.closest('[data-sheet-btn]');
    if (!b) return;
    const i = Number(b.dataset.sheetBtn);
    closeSheet((o.buttons || [])[i]?.value ?? null);
  });

  const body = sheet.querySelector('.sheet__body');
  if (o.onMount) requestAnimationFrame(() => o.onMount(body, sheet));
}

export function closeSheet(value = null, silent = false) {
  const layer = document.getElementById('layer');
  const sheet = layer?.querySelector('.sheet');
  if (!sheet) {
    clearTimeout(closeTimer);
    closeTimer = null;
    if (layer) layer.innerHTML = '';
    layer?.classList.remove('is-open');
    document.body.style.overflow = '';
    return;
  }
  const s = sheet;
  const cb = sheetResolve;
  sheetEl = null;
  sheetResolve = null;

  s.style.transform = 'translateY(102%)';
  const scrim = layer.querySelector('.scrim');
  if (scrim) scrim.style.opacity = '0';

  clearTimeout(closeTimer);
  closeTimer = setTimeout(() => {
    closeTimer = null;
    if (layer) layer.innerHTML = '';
    layer?.classList.remove('is-open');
    document.body.style.overflow = '';
  }, 260);

  if (!silent && cb) cb(value);
  else if (silent && cb) { /* 被新弹层替换，不触发回调 */ }
}

/* ---------- 二次确认 ---------- */

export function confirmDialog({ title, message, okText = '确定', cancelText = '取消', danger = false }) {
  return new Promise((resolve) => {
    openSheet({
      title,
      html: `<div style="font-size:14.5px;line-height:1.7;color:var(--text-2);padding:2px 0 10px">${message}</div>`,
      buttons: [
        { label: cancelText, value: false },
        { label: okText, value: true, kind: danger ? 'danger' : 'primary' },
      ],
      onClose: (v) => resolve(!!v),
    });
  });
}

/* ---------- 日期格式化 ---------- */

const MONTH_CN = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];

export function fmtMD(d) {
  if (!d) return '';
  const [, m, day] = d.split('-');
  return `${Number(m)}月${Number(day)}日`;
}

export function fmtDateRange(trip) {
  if (trip.dateMode === 'exact' && trip.startDate) {
    const y1 = trip.startDate.slice(0, 4);
    if (!trip.endDate) return `${y1}年${fmtMD(trip.startDate)} 出发`;
    const sameYear = trip.startDate.slice(0, 4) === trip.endDate.slice(0, 4);
    const endTxt = sameYear ? fmtMD(trip.endDate) : `${trip.endDate.slice(0, 4)}年${fmtMD(trip.endDate)}`;
    const days = Math.round((new Date(trip.endDate) - new Date(trip.startDate)) / 86400000) + 1;
    return `${y1}年${fmtMD(trip.startDate)} – ${endTxt} · ${days}天`;
  }
  if (trip.dateMode === 'fuzzy') {
    if (trip.dateText) return trip.dateText;
    if (trip.roughYm) {
      const [y, m] = trip.roughYm.split('-');
      return `${y}年${Number(m)}月`;
    }
  }
  return '时间未定';
}

export function fmtRelative(iso) {
  if (!iso) return '';
  const diff = Date.now() - new Date(iso).getTime();
  const day = Math.floor(diff / 86400000);
  if (day < 1) return '今天';
  if (day === 1) return '昨天';
  if (day < 30) return `${day} 天前`;
  if (day < 365) return `${Math.floor(day / 30)} 个月前`;
  return `${Math.floor(day / 365)} 年前`;
}

/* ---------- 杂 ---------- */

export function debounce(fn, ms = 220) {
  let t = null;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

export function download(filename, text, mime = 'application/json') {
  const blob = new Blob([text], { type: mime + ';charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export function haptic(ms = 8) {
  if (navigator.vibrate) {
    try { navigator.vibrate(ms); } catch (_) { /* ignore */ }
  }
}

export function regionLabel(regionId, info) {
  return info?.name || '其他';
}

/**
 * 当前站点的"根地址"，保留 query（分享链接的 sharecode 就在 query 里，
 * 丢了参数整站会 403，所以凡是拼给外部用的地址都必须走这里）
 */
export function siteURL() {
  const u = new URL(location.href);
  const p = u.pathname.replace(/index\.html$/, '');
  return u.origin + p + u.search;
}

/** 站点上某个资源/页面的完整地址 */
export function siteFile(name) {
  const u = new URL(location.href);
  const dir = u.pathname.replace(/[^/]*$/, '');
  return `${u.origin}${dir}${name}${u.search}`;
}
