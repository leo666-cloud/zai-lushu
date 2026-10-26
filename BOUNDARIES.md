# 路书 · 改动边界

给任何要修改这个项目的 AI（或人）看。

**一句话原则**：数据、协议、状态逻辑是骨架，动了会让老用户的数据或外部 AI 生成的链接失效；视觉和文案是皮肤，随便改。

---

## 🔒 LOCKED — 不要改

改了会坏数据、坏协议、或改变产品行为。

### 1. 存储键名

| 键 | 存什么 | 丢了会怎样 |
|---|---|---|
| `lushu.v1` | 全部路书数据 | 用户所有内容没了 |
| `lushu.v1.bak` | 上一次的备份 | 无法回滚 |
| `lushu.demoSeeded` | 示例是否已写入过 | 示例会重复塞进来 |
| `lushu.demoCleared` | 示例是否被清空过 | 清空按钮会重新出现 |
| `lushu.welcomed` | 首次引导是否看过 | 引导会重复弹 |
| `lushu.mapProvider` | 上次用的地图 | 每次都重新选 |

IndexedDB 库名 `lushu-db`，store 名 `images`。

### 2. 数据结构

```js
Trip {
  id, title, cityRaw, city, region,
  dateMode: 'exact' | 'fuzzy' | 'none',
  startDate, endDate, dateText, roughYm,
  manualStatus, promotedAt, wasWish, wishHidden, demo,
  cover: { emoji, tone, imgId },
  location: { lat, lng, name } | null,
  ledger: { budget, entries: [{ id, date, title, amount, category }] },
  brief, blocks: [], source, createdAt, updatedAt
}

Block — 四种 type：
  text  { title, body }
  day   { day, title, body,
          stops: [{ name, start:'HH:MM', duration:分钟, story, lat, lng,
                    transit: { mode, minutes, note } }],
          meals: [{ type:'breakfast|lunch|dinner|snack', start, name, note, lat, lng }] }
  todo  { title, items: [{ t, done }] }
  link  { title, url, body }
```

- `transit` 表示「从上一个点到这个点」，第一个点不带
- 坐标一律 **WGS84**，输出时再转 GCJ02 / BD09
- `region` 取值见 `js/cities.js` 的 `REGIONS`

### 3. 三态判定

`store.js` 的 `tripState()`，规则是产品定义，不是实现细节：

1. 没有 `promotedAt` → **想去**
2. 精确日期 + 已过 `endDate` → **回顾**
3. 精确日期 + 在区间内 → **进行中**
4. 精确日期 + 还没到 → **待出发**
5. **模糊日期不自动归档**，只给 `needsConfirm` 软提示
6. `manualStatus` 优先于以上全部

第 5 条尤其不要"优化"成自动归档——那是刻意留白。

### 4. 路由

```
#/road  #/wish  #/past  #/trip/:id
#/new   #/edit/:id      #/settings
#/add?d=<base64url(JSON)>
```

分享链接、AI 导入链接都长在上面，改路径等于让已发出去的链接失效。

### 5. AI 导入协议

`ai.txt` 里定义的 JSON 字段、链接格式、`status` 取值、以及「只新增不删除」的约束。

**所有外部 AI 都是按这份文件生成数据的**，改字段就等于让它们全部失效。

### 6. 构建产物

- `index.html` 只引用 `bundle.js`（不是 `js/app.js`）
- 改完任何 js/css，必须：
  1. `node scripts/build.mjs`
  2. 把 `index.html` 里 `bundle.js?v=` 和 `app.css?v=` 的版本号往后推一位
- `server.js` 对所有资源返回 `no-cache, no-store`，`text/plain` 必须带 `charset=utf-8`（否则 `ai.txt` 中文乱码）

漏掉任何一步，用户看到的还是旧代码。

### 7. 示例数据机制

- 一律带 `demo: true`
- 「清空示例」只删 `demo: true` 的
- 用户在编辑页保存后，该条 `demo` 变 `false`（转正，不再被清空波及）
- 只在「库为空 + 从未 seed + 不是从 `#/add` 进来」时自动写入

### 8. 账本口径

- 每条路书的账本互相独立，存在 `trip.ledger`
- 年度统计按每一笔的 `entry.date` 年份归属，不按行程日期

---

## 🟡 CONTRACT — 可以改，但要同步

| 改动 | 必须同时处理 |
|---|---|
| day 块新增字段 | `store.js` 的 `normalizeBlock` + `demo-data.js` 全部补上 + `ai.txt` 字段说明 |
| 新增账本分类 | `store.js` 的 `LEDGER_CATEGORIES`（id 用英文小写） |
| 修改 `ai.txt` | `node scripts/sync-ai.mjs` 重新生成 `ai.html` |
| 修改颜色变量 | 深色模式块（`@media (prefers-color-scheme: dark)`）里要同步 |
| 修改 `index.html` 里的资源引用 | 版本号要跟着变 |
| 修改 `tripState` 规则 | 先确认这是产品决策，不是 bug 修复 |

---

## 🟢 OPEN — 放开改

这些属于表现层，改了不会影响数据和行为：

- **颜色、圆角、阴影、间距的具体值**（变量名 `--accent`、`--r-lg`、`--shadow` 等保持不变）
- **字号、行高、字重、字距**（CSS 里的 `font-size` / `line-height` / `letter-spacing`）
- **组件内部排版与间距**（不改信息层级和顺序）
- **动效曲线与时长**（`--ease`、`transition`、`@keyframes`）
- **SVG 图标路径**（`js/ui.js` 的 `ICONS`）
- **示例文案内容**（不改字段结构，不改日程条数）
- **纯展示元素**（比如加分割线、加装饰、调整卡片留白）

加新元素的前提：**不引入新的数据字段**。需要新字段时，按 CONTRACT 处理。

---

## 改完必须跑

```bash
node scripts/build.mjs      # 打包（漏了这一步改动不会生效）
node scripts/selftest.mjs   # 39 项逻辑断言：城市识别 / 载荷解析 / 状态机
node scripts/e2e.mjs        # 35 项交互断言：真实浏览器跑完整流程
```

三个都过了再交付。

---

## 交付前自查

- [ ] 改了 js/css 后跑过 `build.mjs`，并更新了版本号
- [ ] 深色模式下检查过（颜色变量有没有只改一半）
- [ ] 新增字段已在 `normalizeBlock` 里做了兜底（老数据没有这个字段时不报错）
- [ ] 没有改动 `lushu.v1` 的结构（加了可选字段可以，改已有字段名不行）
- [ ] 示例数据仍然满足：3 条有日期 + 6 条想去，账本 3 条有支出
- [ ] `ai.txt` 若改动，`ai.html` 已重新生成
- [ ] 在手机宽度（390px）下看过实际效果，不只是桌面
