/**
 * editor.js — 新建 / 编辑路书
 */
import {
  getTrip, createTrip, updateTrip, deleteImage, putImageBlob, compressImage,
  addAlias, getApp, todayStr,
} from './store.js';
import { resolve, suggest, allPlaces, regionInfo, emojiFor } from './city.js';
import { REGION_LIST } from './cities.js';
import { esc, icon, toneBg, TONES, toast, openSheet, closeSheet, confirmDialog } from './ui.js';
import { EMOJIS } from './store.js';

let M = null;        // 正在编辑的模型
let isNew = true;
let oldImgId = null; // 用于保存时清理旧图
let emojiTouched = false; // 用户是否亲手挑过图标

/* ============================================================
   渲染
   ============================================================ */

const TYPE_NAME = { text: '正文', day: '日程', todo: '清单', link: '链接' };

export function viewEdit(id) {
  isNew = !id;
  const existing = id ? getTrip(id) : null;
  oldImgId = existing?.cover?.imgId || null;
  emojiTouched = !!existing; // 已有条目视为已定型，不自动改它的图标

  M = existing
    ? JSON.parse(JSON.stringify(existing))
    : {
        title: '',
        cityRaw: '',
        city: '',
        region: 'other',
        dateMode: 'none',
        startDate: null,
        endDate: null,
        dateText: '',
        roughYm: null,
        cover: { emoji: '📍', tone: 6, imgId: null },
        brief: '',
        blocks: [],
        promotedAt: null,
        manualStatus: null,
      };

  return `
  <div class="page page--nothread">
    <header class="topbar">
      <div class="topbar__row">
        <button class="icon-btn" data-act="back" aria-label="返回">${icon('back')}</button>
        <div class="topbar__title" style="font-size:19px;margin-left:2px">${isNew ? '新建路书' : '编辑路书'}</div>
        <button class="btn btn--primary btn--sm" data-act="save-edit">保存</button>
      </div>
    </header>
    <div class="scroll" style="padding-bottom:60px">
      <div class="form">

        <div class="field">
          <div class="field__label">封面</div>
          <div class="cover-preview" id="cover-preview" style="background:${toneBg(M.cover.tone)}">
            ${M.cover.imgId ? `<img data-img="${esc(M.cover.imgId)}" id="cover-img" alt="">` : ''}
            <span class="cover-preview__emoji" id="cover-emoji">${esc(M.cover.emoji)}</span>
            <div class="cover-preview__tools">
              <label class="btn btn--sm">
                换图片
                <input type="file" accept="image/*" id="file-cover" hidden>
              </label>
              ${M.cover.imgId ? `<button class="btn btn--sm" data-act="clear-img">去掉</button>` : ''}
            </div>
          </div>
        </div>

        <div class="field">
          <div class="field__label">标题</div>
          <input class="input" id="f-title" value="${esc(M.title)}" placeholder="比如：南极 12 天" maxlength="60">
        </div>

        <div class="field">
          <div class="field__label">地点</div>
          <input class="input" id="f-cityraw" value="${esc(M.cityRaw)}" placeholder="去南极 / 京都 / 成都周边" autocomplete="off">
          <div class="city-echo" id="city-echo">${cityEchoHtml(M.cityRaw)}</div>
        </div>

        <div class="field">
          <div class="field__label">时间</div>
          <div class="seg" id="date-seg">
            <button class="seg__item ${M.dateMode === 'none' ? 'is-active' : ''}" data-dmode="none">暂不填</button>
            <button class="seg__item ${M.dateMode === 'exact' ? 'is-active' : ''}" data-dmode="exact">精确日期</button>
            <button class="seg__item ${M.dateMode === 'fuzzy' ? 'is-active' : ''}" data-dmode="fuzzy">模糊时间</button>
          </div>

          <div id="date-exact" style="display:${M.dateMode === 'exact' ? 'block' : 'none'};margin-top:9px">
            <div class="row-2">
              <div>
                <div class="field__label" style="font-size:11px">出发</div>
                <input class="input" type="date" id="f-start" value="${esc(M.startDate || '')}">
              </div>
              <div>
                <div class="field__label" style="font-size:11px">返回</div>
                <input class="input" type="date" id="f-end" value="${esc(M.endDate || '')}">
              </div>
            </div>
            <div class="field__hint">填了返回日期，过了这天它会自动搬进「回顾」。只填出发日则会一直算「进行中」，直到你手动结束。</div>
          </div>

          <div id="date-fuzzy" style="display:${M.dateMode === 'fuzzy' ? 'block' : 'none'};margin-top:9px">
            <input class="input" id="f-datetext" value="${esc(M.dateText)}" placeholder="比如：2027 年春节前后 / 等攒够假期">
            <div style="margin-top:9px">
              <div class="field__label" style="font-size:11px">大概哪个月（可选）</div>
              <input class="input" type="month" id="f-roughym" value="${esc(M.roughYm || '')}">
            </div>
            <div class="field__hint">模糊时间不会被自动归档。日子过了，详情页会问你一句「结束了吗」，你点头它才走。</div>
          </div>

          <div id="date-none" style="display:${M.dateMode === 'none' ? 'block' : 'none'};margin-top:9px">
            <div class="field__hint">不填时间也行。它会一直待在「想去」或「路上」，直到你给它安排日子。</div>
          </div>
        </div>

        <div class="field">
          <div class="field__label">一句话</div>
          <input class="input" id="f-brief" value="${esc(M.brief)}" placeholder="为什么想去 / 这趟的主线是什么" maxlength="200">
        </div>

        <div class="field">
          <div class="field__label">封面图标与配色</div>
          <div class="emoji-grid" id="emoji-grid">
            ${EMOJIS.map((e) => `<button class="emoji-opt ${e === M.cover.emoji ? 'is-active' : ''}" data-emoji="${e}">${e}</button>`).join('')}
          </div>
          <div class="tone-grid" style="margin-top:10px" id="tone-grid">
            ${TONES.map((g, i) => `<button class="tone-opt ${i === M.cover.tone ? 'is-active' : ''}" data-tone="${i}" style="background:${g}"></button>`).join('')}
          </div>
        </div>

        <div class="field">
          <div class="field__label">攻略内容</div>
          <div id="blocks" style="display:flex;flex-direction:column;gap:10px"></div>
          <div class="pill-row" style="margin-top:10px">
            <button class="chip" data-add-block="text">+ 正文</button>
            <button class="chip" data-add-block="day">+ 日程</button>
            <button class="chip" data-add-block="todo">+ 清单</button>
            <button class="chip" data-add-block="link">+ 链接</button>
          </div>
        </div>

      </div>
    </div>
  </div>`;
}

function cityEchoHtml(raw) {
  if (!raw.trim()) return '<span>输入地名后会自动归类</span>';
  const hit = resolve(raw, getApp().aliases);
  if (hit) {
    const info = regionInfo(hit.region);
    return `<span>归入</span><b>${esc(info.name)}</b><span>·</span><span>${esc(hit.name)}</span>`;
  }
  return `<span>没认出这是哪儿 ——</span><button class="chip" data-act="pick-city" style="padding:1px 9px;font-size:12px">手动指定</button>`;
}

function blockEditorHtml(b, i) {
  const head = `<div class="block-editor__head">
      <span class="block-editor__type">${TYPE_NAME[b.type] || '正文'}</span>
      <button class="block-editor__del" data-act="block-del" data-i="${i}" aria-label="删除这一块">${icon('close', 13)}</button>
    </div>`;

  if (b.type === 'todo') {
    return `<div class="block-editor" data-i="${i}" data-type="todo">
      ${head}
      <input class="input" data-f="title" value="${esc(b.title || '清单')}" placeholder="清单名称">
      <textarea class="textarea" data-f="body" placeholder="每行一项&#10;办阿根廷签证&#10;买冲锋衣">${esc((b.items || []).map((x) => x.t).join('\n'))}</textarea>
    </div>`;
  }
  if (b.type === 'day') {
    return `<div class="block-editor" data-i="${i}" data-type="day">
      ${head}
      <div style="display:flex;gap:8px;align-items:center">
        <input class="input" data-f="day" type="number" min="1" max="99" value="${b.day || 1}" style="width:76px;flex:none">
        <input class="input" data-f="title" value="${esc(b.title || '')}" placeholder="这一天的安排">
      </div>
      <textarea class="textarea" data-f="body" placeholder="行程细节">${esc(b.body || '')}</textarea>
    </div>`;
  }
  if (b.type === 'link') {
    return `<div class="block-editor" data-i="${i}" data-type="link">
      ${head}
      <input class="input" data-f="title" value="${esc(b.title || '')}" placeholder="链接标题">
      <input class="input" data-f="url" value="${esc(b.url || '')}" placeholder="https://" inputmode="url">
    </div>`;
  }
  return `<div class="block-editor" data-i="${i}" data-type="text">
    ${head}
    <input class="input" data-f="title" value="${esc(b.title || '')}" placeholder="小标题（可留空）">
    <textarea class="textarea" data-f="body" placeholder="写点什么">${esc(b.body || '')}</textarea>
  </div>`;
}

function renderBlocks() {
  const host = document.getElementById('blocks');
  if (!host) return;
  host.innerHTML = M.blocks.length
    ? M.blocks.map(blockEditorHtml).join('')
    : `<div style="font-size:13px;color:var(--muted);padding:4px 2px">还没有内容，可以从下面加一块。</div>`;
}

/* ============================================================
   绑定
   ============================================================ */

export function mountEdit(root) {
  renderBlocks();
  hydrateCover();

  /* --- 标题 --- */
  const title = root.querySelector('#f-title');
  title.addEventListener('input', () => { M.title = title.value; });

  /* --- 地点 --- */
  const cityRaw = root.querySelector('#f-cityraw');
  const echo = root.querySelector('#city-echo');
  const onCity = () => {
    M.cityRaw = cityRaw.value;
    const hit = resolve(cityRaw.value, getApp().aliases);
    if (hit) {
      M.city = hit.name;
      M.region = hit.region;
      if (!emojiTouched) {
        const auto = emojiFor(cityRaw.value + ' ' + (title?.value || ''), hit.region);
        if (auto && auto !== M.cover.emoji) {
          M.cover.emoji = auto;
          root.querySelector('#cover-emoji').textContent = auto;
          root.querySelectorAll('#emoji-grid [data-emoji]').forEach((b) =>
            b.classList.toggle('is-active', b.dataset.emoji === auto)
          );
        }
      }
    } else {
      M.city = '';
      M.region = 'other';
    }
    echo.innerHTML = cityEchoHtml(cityRaw.value);
  };
  cityRaw.addEventListener('input', onCity);

  /* --- 日期 --- */
  const seg = root.querySelector('#date-seg');
  const boxes = {
    exact: root.querySelector('#date-exact'),
    fuzzy: root.querySelector('#date-fuzzy'),
    none: root.querySelector('#date-none'),
  };
  seg.addEventListener('click', (e) => {
    const b = e.target.closest('[data-dmode]');
    if (!b) return;
    const mode = b.dataset.dmode;
    M.dateMode = mode;
    [...seg.children].forEach((c) => c.classList.toggle('is-active', c === b));
    Object.entries(boxes).forEach(([k, el]) => { el.style.display = k === mode ? 'block' : 'none'; });
  });

  root.querySelector('#f-start')?.addEventListener('change', (e) => { M.startDate = e.target.value || null; });
  root.querySelector('#f-end')?.addEventListener('change', (e) => { M.endDate = e.target.value || null; });
  root.querySelector('#f-datetext')?.addEventListener('input', (e) => { M.dateText = e.target.value; });
  root.querySelector('#f-roughym')?.addEventListener('change', (e) => { M.roughYm = e.target.value || null; });

  /* --- 简介 --- */
  const brief = root.querySelector('#f-brief');
  brief.addEventListener('input', () => { M.brief = brief.value; });

  /* --- emoji / tone --- */
  const eg = root.querySelector('#emoji-grid');
  eg.addEventListener('click', (e) => {
    const b = e.target.closest('[data-emoji]');
    if (!b) return;
    emojiTouched = true;
    M.cover.emoji = b.dataset.emoji;
    [...eg.children].forEach((c) => c.classList.toggle('is-active', c === b));
    root.querySelector('#cover-emoji').textContent = M.cover.emoji;
  });

  const tg = root.querySelector('#tone-grid');
  tg.addEventListener('click', (e) => {
    const b = e.target.closest('[data-tone]');
    if (!b) return;
    M.cover.tone = Number(b.dataset.tone);
    [...tg.children].forEach((c) => c.classList.toggle('is-active', c === b));
    const pv = root.querySelector('#cover-preview');
    pv.style.background = toneBg(M.cover.tone);
  });

  /* --- 图片 --- */
  const fileInput = root.querySelector('#file-cover');
  fileInput?.addEventListener('change', async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      toast('正在压缩图片…', 1200);
      const blob = await compressImage(f, 1600, 0.8);
      const id = await putImageBlob(blob);
      M.cover.imgId = id;
      const pv = root.querySelector('#cover-preview');
      let img = root.querySelector('#cover-img');
      if (!img) {
        img = document.createElement('img');
        img.id = 'cover-img';
        pv.prepend(img);
      }
      img.src = URL.createObjectURL(blob);
      toast('封面已更新');
    } catch (err) {
      toast(err.message || '图片处理失败');
    }
  });

  root.querySelector('[data-act="clear-img"]')?.addEventListener('click', () => {
    M.cover.imgId = null;
    root.querySelector('#cover-img')?.remove();
  });

  /* --- 正文块 --- */
  const host = root.querySelector('#blocks');
  host.addEventListener('click', (e) => {
    const d = e.target.closest('[data-act="block-del"]');
    if (!d) return;
    collectBlocks(host);
    M.blocks.splice(Number(d.dataset.i), 1);
    renderBlocks();
  });

  root.querySelectorAll('[data-add-block]').forEach((btn) => {
    btn.addEventListener('click', () => {
      collectBlocks(host);
      const type = btn.dataset.addBlock;
      if (type === 'day') {
        M.blocks.push({ type: 'day', day: M.blocks.filter((b) => b.type === 'day').length + 1, title: '', body: '' });
      } else if (type === 'todo') {
        M.blocks.push({ type: 'todo', title: '清单', items: [] });
      } else if (type === 'link') {
        M.blocks.push({ type: 'link', title: '', url: '' });
      } else {
        M.blocks.push({ type: 'text', title: '', body: '' });
      }
      renderBlocks();
      const last = host.lastElementChild;
      last?.querySelector('textarea, input[data-f="url"]')?.focus();
    });
  });

  /* --- 手动指定城市 --- */
  root.querySelector('#city-echo').addEventListener('click', (e) => {
    if (!e.target.closest('[data-act="pick-city"]')) return;
    showCityPicker(cityRaw.value, (place) => {
      M.city = place.name;
      M.region = place.region;
      addAlias(cityRaw.value, place.name);
      const info = regionInfo(place.region);
      echo.innerHTML = `<span>归入</span><b>${esc(info.name)}</b><span>·</span><span>${esc(place.name)}</span>`;
    });
  });

  /* --- 保存 --- */
  root.querySelector('[data-act="save-edit"]').addEventListener('click', () => save(root));
}

function collectBlocks(host) {
  const editors = [...host.querySelectorAll('.block-editor')];
  editors.forEach((el, idx) => {
    const i = Number(el.dataset.i);
    const type = el.dataset.type;
    const b = M.blocks[i];
    if (!b) return;
    const get = (f) => el.querySelector(`[data-f="${f}"]`)?.value ?? '';
    if (type === 'todo') {
      b.title = get('title') || '清单';
      const old = b.items || [];
      const lines = get('body').split('\n').map((s) => s.trim()).filter(Boolean);
      b.items = lines.map((t) => {
        const prev = old.find((o) => o.t === t);
        return { t, done: prev ? prev.done : false };
      });
    } else if (type === 'day') {
      b.day = Number(get('day')) || 1;
      b.title = get('title');
      b.body = get('body');
    } else if (type === 'link') {
      b.title = get('title');
      b.url = get('url');
    } else {
      b.title = get('title');
      b.body = get('body');
    }
  });
}

async function save(root) {
  const host = root.querySelector('#blocks');
  collectBlocks(host);

  const titleVal = root.querySelector('#f-title').value.trim();
  const cityVal = root.querySelector('#f-cityraw').value.trim();

  if (!titleVal && !cityVal) {
    toast('至少写个标题或地点');
    root.querySelector('#f-title').focus();
    return;
  }
  M.title = titleVal || cityVal || '未命名路书';

  // 重新识别一次，保证城市与最新输入一致
  const hit = resolve(cityVal, getApp().aliases);
  if (hit) {
    M.city = hit.name;
    M.region = hit.region;
  }

  const payload = {
    title: M.title.trim().slice(0, 60),
    cityRaw: cityVal,
    city: M.city,
    region: M.region,
    // 用户亲手改过就不再是示例，避免「清空示例」把他改的东西也带走
    demo: false,
    dateMode: M.dateMode,
    startDate: M.dateMode === 'exact' ? M.startDate : null,
    endDate: M.dateMode === 'exact' ? M.endDate : null,
    dateText: M.dateMode === 'fuzzy' ? M.dateText.trim() : '',
    roughYm: M.dateMode === 'fuzzy' ? M.roughYm : null,
    cover: { ...M.cover },
    brief: M.brief.trim(),
    blocks: M.blocks.filter((b) => {
      if (b.type === 'todo') return b.items && b.items.length;
      if (b.type === 'link') return b.url;
      return (b.body || '').trim() || (b.title || '').trim();
    }),
  };

  // 没亲手挑过图标 → 按地名和标题猜一个
  if (!emojiTouched) {
    payload.cover.emoji = emojiFor(`${cityVal} ${payload.title}`, M.region);
  }

  // 起止日期顺序纠正
  if (payload.startDate && payload.endDate && payload.startDate > payload.endDate) {
    [payload.startDate, payload.endDate] = [payload.endDate, payload.startDate];
  }

  // 新建时填了精确出发日期 —— 说明这是已确定的行程，直接进「路上」
  if (isNew && payload.dateMode === 'exact' && payload.startDate) {
    payload.promotedAt = new Date().toISOString();
  }

  try {
    if (isNew) {
      const t = createTrip(payload);
      toast('已保存');
      location.hash = `#/trip/${t.id}`;
    } else {
      updateTrip(M.id, payload);
      if (oldImgId && oldImgId !== payload.cover.imgId) {
        deleteImage(oldImgId).catch(() => {});
      }
      toast('已更新');
      location.hash = `#/trip/${M.id}`;
    }
  } catch (e) {
    toast(e.message || '保存失败');
  }
}

/* ============================================================
   城市选择器
   ============================================================ */

function showCityPicker(raw, onPick) {
  const places = allPlaces();
  const grouped = new Map();
  for (const p of places) {
    if (!grouped.has(p.region)) grouped.set(p.region, []);
    grouped.get(p.region).push(p);
  }
  const order = REGION_LIST.map((r) => r.id).filter((id) => grouped.has(id));

  openSheet({
    title: '指定城市',
    desc: raw ? `「${raw}」没被认出来，挑一个最接近的。以后同样的说法会自动认。` : '挑一个地点',
    html: `
      <input class="input" id="city-q" placeholder="搜索地名" style="margin-bottom:12px">
      <div id="city-list">
        ${order.map((rid) => {
          const info = regionInfo(rid);
          return `<div class="section-label" style="margin-top:8px">${info.emoji} ${esc(info.short)}</div>
            <div class="pill-row" data-region="${rid}">
              ${grouped.get(rid).map((p) => `<button class="chip" data-pick="${esc(p.name)}" data-region="${esc(p.region)}">${esc(p.name)}</button>`).join('')}
            </div>`;
        }).join('')}
      </div>`,
    buttons: [{ label: '取消', value: null }],
    onMount: (body) => {
      const q = body.querySelector('#city-q');
      q.addEventListener('input', () => {
        const k = q.value.trim().toLowerCase();
        body.querySelectorAll('[data-pick]').forEach((b) => {
          const hit = !k || b.dataset.pick.toLowerCase().includes(k);
          b.style.display = hit ? '' : 'none';
        });
        body.querySelectorAll('.pill-row[data-region]').forEach((g) => {
          const any = [...g.querySelectorAll('[data-pick]')].some((b) => b.style.display !== 'none');
          g.style.display = any ? '' : 'none';
          const label = g.previousElementSibling;
          if (label?.classList.contains('section-label')) label.style.display = any ? '' : 'none';
        });
      });

      body.addEventListener('click', (e) => {
        const b = e.target.closest('[data-pick]');
        if (!b) return;
        const name = b.dataset.pick;
        const region = b.dataset.region;
        closeSheet();
        onPick({ name, region });
        toast(`已指定为「${name}」`);
      });
    },
  });
}

/* ============================================================
   封面水合
   ============================================================ */

async function hydrateCover() {
  const el = document.getElementById('cover-img');
  if (!el || !M?.cover?.imgId) return;
  const { getImageURL } = await import('./store.js');
  const url = await getImageURL(M.cover.imgId).catch(() => null);
  if (url) el.src = url;
}
