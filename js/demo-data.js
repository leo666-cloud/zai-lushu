/**
 * demo-data.js — 首次打开时写入的示例路书
 *
 * 全部带 demo: true 标记：
 *   · 「清空示例」只删这些，用户自己加的一概不碰
 *   · 用户在编辑页保存过一次，该条会自动转正（去掉 demo 标记）
 *
 * day 块结构：
 *   { type:'day', day, title, body,
 *     stops: [{ name, duration(分钟), story(来历), lat, lng, transit:{mode,minutes,note} }],
 *     meals: [{ type:'breakfast'|'lunch'|'dinner'|'snack', name, note, lat, lng }] }
 *   坐标统一 WGS84。transit 表示"从上一个点到这个点"。
 *
 * 清单（todo）都放在 blocks 最前面，详情页会把它们提到页首折叠展示。
 */

const demoAntarctica = {
  title: '南极 20 天 · 从杭州到白色大陆',
  cityRaw: '南极',
  city: '南极',
  region: 'polar',
  dateMode: 'exact',
  startDate: '2026-12-01',
  endDate: '2026-12-20',
  cover: { emoji: '🐧', tone: 0, imgId: null },
  location: { lat: -63.5, lng: -57.0, name: '南极半岛' },
  ledger: {
    budget: 150000,
    entries: [
      { id: 'e_np1', date: '2026-09-10', title: '南极船票（10 天舱位）', amount: 88000, category: 'transport' },
      { id: 'e_np2', date: '2026-08-20', title: '国际往返机票', amount: 21500, category: 'transport' },
      { id: 'e_np3', date: '2026-09-05', title: '阿根廷签证 + 保险', amount: 1200, category: 'other' },
      { id: 'e_np4', date: '2026-10-12', title: '防水裤与冲锋衣', amount: 4300, category: 'shopping' },
      { id: 'e_np5', date: '2026-10-15', title: '含南极救援的旅行险', amount: 2600, category: 'other' },
    ],
  },
  brief: '杭州出发，经布宜诺斯艾利斯转乌斯怀亚登船，穿越德雷克海峡进南极半岛。12 月是企鹅产仔季。',
  blocks: [
    {
      type: 'todo', title: '行前 90 天清单',
      items: [
        { t: '确认船票与舱位（南极船位紧张，越早越好）', done: true },
        { t: '办阿根廷签证：有美签/申根签可走 AVE 电子签', done: true },
        { t: '订国际机票（国内—布宜—乌斯怀亚三段）', done: true },
        { t: '买包含南极救援的旅行保险', done: false },
        { t: '体检，确认心肺能适应高纬度航行', done: false },
      ],
    },
    {
      type: 'todo', title: '装备清单',
      items: [
        { t: '防水冲锋衣 + 防水裤（登陆必须）', done: true },
        { t: '保暖内衣两套（羊毛或抓绒）', done: true },
        { t: '防水手套两副（一副湿了换另一副）', done: false },
        { t: '晕船药（德雷克海峡必备）', done: true },
        { t: '高倍防晒 + 墨镜（雪面反射极强）', done: false },
        { t: '相机备用电池（低温掉电快）', done: false },
        { t: '防水背包或干袋（冲锋舟会溅水）', done: false },
      ],
    },
    {
      type: 'text', title: '路线骨架',
      body: '三段式：国内飞南美（约 30 小时）→ 乌斯怀亚登船 → 德雷克海峡往返 + 南极半岛 5 天登陆。\n船上 10 天，前后各 5 天在路上，中间不留硬转机，给南美段延误留余量。',
    },
    {
      type: 'day', day: 1, title: '杭州 → 上海 → 转机',
      body: '全天在移动。高铁到浦东，晚班机经多哈或亚的斯亚贝巴转布宜诺斯艾利斯。',
      stops: [
        { name: '杭州东站', start: '07:00', duration: 40, lat: 30.2908, lng: 120.2126 },
        { name: '上海浦东国际机场 T2', start: '09:00', duration: 180, lat: 31.1443, lng: 121.8083, transit: { mode: 'train', minutes: 75, note: '沪杭高铁直达' } },
      ],
      meals: [
        { type: 'dinner', name: 'T2 出发层餐厅', start: '18:30', note: '转机前吃顿热的，机上餐食按多哈时间供应', lat: 31.1443, lng: 121.8083 },
      ],
    },
    {
      type: 'day', day: 2, title: '飞行中',
      body: '全程约 30 小时，跨越 11 个时区。机上按目的地的作息睡，落地少受罪。',
      stops: [
        { name: '转机大厅', start: '14:00', duration: 150, lat: 25.2731, lng: 51.6081 },
      ],
      meals: [
        { type: 'snack', name: '转机区咖啡', start: '16:30', note: '长途飞行多喝水，少喝咖啡', lat: 25.2731, lng: 51.6081 },
      ],
    },
    {
      type: 'day', day: 3, title: '抵达布宜诺斯艾利斯',
      body: '上午落地。先回酒店放行李，下午去五月广场、博卡区。晚上早睡，倒时差。',
      stops: [
        { name: '五月广场', start: '10:30', duration: 90, lat: -34.6083, lng: -58.3712, story: '1810 年 5 月 25 日，布宜诺斯艾利斯的市民聚集在这片广场上推翻了西班牙总督，阿根廷独立战争由此开始。广场中央那座白色方尖碑叫「五月金字塔」，是全国最老的纪念碑。' },
        { name: '博卡区 La Boca', start: '13:30', duration: 120, lat: -34.6345, lng: -58.3631, transit: { mode: 'taxi', minutes: 20, note: '从市中心约 8 公里' }, story: '19 世纪末，热那亚来的码头工人住在铁皮屋里，把刷船剩下的油漆带回家刷墙，于是有了这一片歪歪扭扭的彩色房子。探戈据说就是从这片街区的酒馆里长出来的。' },
      ],
      meals: [
        { type: 'lunch', name: '圣特尔莫市场', start: '12:15', note: '烤肉夹馍 choripán，人均 40 元', lat: -34.6210, lng: -58.3730 },
        { type: 'dinner', name: '巴勒莫区烤肉店', start: '20:00', note: '阿根廷烤肉按重量点，别一次点太多', lat: -34.5830, lng: -58.4230 },
      ],
    },
    {
      type: 'day', day: 4, title: '布宜一日',
      body: '白天看墓园和书店，晚上早点收，明天飞南端。',
      stops: [
        { name: '雷科莱塔公墓', start: '09:30', duration: 90, lat: -34.5875, lng: -58.3931, transit: { mode: 'taxi', minutes: 15 }, story: '1822 年建成的贵族墓园，4 万平方米里挤着 4800 座家族墓室。贝隆夫人就葬在这里，她的家族墓室门口常年有人放花。整个墓园像一座微缩的城市，街道、广场、雕塑一应俱全。' },
        { name: '雅典人书店 El Ateneo', start: '11:15', duration: 60, lat: -34.5956, lng: -58.3947, transit: { mode: 'walk', minutes: 12 }, story: '1919 年建成时是剧院「大辉煌」，2000 年改成了书店。舞台被改成咖啡座，包厢变成阅读室，红色幕布还挂着。被不少媒体评为世界最美书店之一。' },
      ],
      meals: [
        { type: 'lunch', name: '雷科莱塔区简餐', start: '12:30', note: '看完墓园就近吃', lat: -34.5875, lng: -58.3931 },
        { type: 'dinner', name: '酒店附近', start: '19:30', note: '明天 5 点起，早睡', lat: -34.6037, lng: -58.3816 },
      ],
    },
    {
      type: 'day', day: 5, title: '飞乌斯怀亚',
      body: '三小时飞到世界最南端的小城。下午取装备、逛港口。',
      stops: [
        { name: '乌斯怀亚港', start: '14:00', duration: 90, lat: -54.8060, lng: -68.3040, transit: { mode: 'flight', minutes: 210, note: '布宜 → 乌斯怀亚' }, story: '南纬 54°48′，号称「世界尽头」。19 世纪这里是阿根廷流放重犯的地方，监狱现在改成了博物馆。城里所有招牌都写着「Fin del Mundo」，纪念品店会把你的护照盖上一个世界尽头的章。' },
        { name: '比格尔海峡岸边', start: '18:30', duration: 60, lat: -54.8019, lng: -68.3030, transit: { mode: 'walk', minutes: 15 }, story: '海峡名字来自达尔文乘坐的「比格尔号」。1833 年他在这里遇到火地岛原住民，后来在《小猎犬号航海记》里写下了那段著名的记录。傍晚的光从雪山后面斜过来，是这座城最好看的时候。' },
      ],
      meals: [
        { type: 'dinner', name: '港口的帝王蟹', start: '20:00', note: '本地帝王蟹按只卖，两个人一只刚好', lat: -54.8040, lng: -68.3050 },
      ],
    },
    {
      type: 'day', day: 6, title: '登船',
      body: '下午登船，安全演练、发冲锋衣。出港后沿比格尔海峡航行。船上探险队都有 IAATO 认证，演练会教你冲锋舟上下船的「水手抓握」。',
      stops: [
        { name: '登船与安全演练', start: '15:00', duration: 120, lat: -54.8070, lng: -68.3060 },
        { name: '比格尔海峡出港', start: '17:30', duration: 90, lat: -54.9000, lng: -68.2000, transit: { mode: 'boat', minutes: 60 } },
      ],
      meals: [
        { type: 'dinner', name: '船上餐厅', start: '19:30', note: '第一天晚上通常有船长欢迎酒会', lat: -54.8700, lng: -68.2500 },
      ],
    },
    {
      type: 'day', day: 7, title: '德雷克海峡 · 第一天',
      body: '进入西风带，浪高 4–8 米是常态。800 公里无遮挡的水道，老船员叫它「德雷克摇床」——过得了这一关，才算真的往南走。提前 1 小时吃晕船药，今天基本躺着。',
      stops: [
        { name: '西风带', start: '08:00', duration: 0, lat: -58.0000, lng: -63.0000 },
      ],
      meals: [
        { type: 'breakfast', name: '船上餐厅', start: '07:30', note: '晕船就别吃太饱，苏打饼干配姜茶', lat: -58.0000, lng: -63.0000 },
      ],
    },
    {
      type: 'day', day: 8, title: '德雷克海峡 · 第二天',
      body: '后半程通常平缓些。听探险队讲座，准备登陆。',
      stops: [
        { name: '探险队讲座', start: '10:00', duration: 150, lat: -60.5000, lng: -62.0000 },
      ],
      meals: [
        { type: 'lunch', name: '船上餐厅', start: '12:30', note: '今天风小了，可以正常吃', lat: -60.5000, lng: -62.0000 },
      ],
    },
    {
      type: 'day', day: 9, title: '第一次登陆',
      photos: [{ id: 'ph_np1', demoSrc: 'img/demo/penguin.jpg', caption: '登陆点，企鹅就在几步之外', at: '09:20' }],
      body: '清晨看到第一座冰山。登陆点视天气而定。',
      stops: [
        { name: '南设得兰群岛', start: '08:00', duration: 180, lat: -62.0500, lng: -58.3000, story: '1819 年，英国商人史密斯在这里发现了陆地，第二年就被确认为南极大陆的一部分。岛上的企鹅群是南极最容易接近的，因为人类的登陆点被严格限制在几条固定路径上。' },
        { name: '欺骗岛 Deception Island', start: '14:00', duration: 120, lat: -62.9500, lng: -60.6500, transit: { mode: 'boat', minutes: 180, note: '冲锋舟 + 破火山口' }, story: '一座沉没的火山口，船可以从一道叫「海神的风箱」的窄口开进去。1906 年挪威人在此建捕鲸站，1969 年火山喷发把它埋了。现在还能看到生锈的油罐和鲸骨。' },
      ],
      meals: [
        { type: 'lunch', name: '船上餐厅', start: '12:00', note: '登陆回来通常有热汤', lat: -62.5000, lng: -59.5000 },
      ],
    },
    {
      type: 'day', day: 10, title: '南极半岛 · 第二天',
      photos: [{ id: 'ph_np2', demoSrc: 'img/demo/iceberg.jpg', caption: '冲锋舟巡游，水面像镜子', at: '09:45' }],
      body: '冲锋舟巡游看冰山和座头鲸。',
      stops: [
        { name: '冰山巡游', start: '09:00', duration: 150, lat: -63.2000, lng: -58.5000, transit: { mode: 'boat', minutes: 60, note: '冲锋舟' }, story: '南极的冰山有 90% 在水下，看到的那一角只是零头。蓝得发亮的那种是老冰，压了几百年把气泡全挤掉了，光穿进去不容易散，所以颜色特别深。' },
        { name: '企鹅栖息地', start: '12:00', duration: 120, lat: -63.5000, lng: -57.5000, transit: { mode: 'boat', minutes: 45 }, story: '12 月是阿德利企鹅和巴布亚企鹅的产仔期。它们会偷邻居的石头来垒窝，被发现了就是一场吵。看的时候保持 5 米距离，别挡在它去海里的路上。' },
      ],
      meals: [
        { type: 'dinner', name: '船上餐厅', start: '19:00', note: '每天晚饭前有当天的回顾会', lat: -63.4000, lng: -58.0000 },
      ],
    },
    {
      type: 'day', day: 11, title: '南极半岛 · 第三天',
      body: '可能安排登陆象岛。防晒别省。',
      stops: [
        { name: '象岛 Elephant Island', start: '09:00', duration: 180, lat: -61.1333, lng: -55.1167, transit: { mode: 'boat', minutes: 240, note: '视冰况，可能改点' }, story: '1916 年，沙克尔顿的「坚忍号」沉没后，22 名船员在这座荒岛上撑了 137 天，靠翻过来的救生艇当屋顶。沙克尔顿带着 5 个人划了 1300 公里去南乔治亚求援，把所有人救了回来。' },
      ],
      meals: [
        { type: 'lunch', name: '船上餐厅', start: '13:00', note: '南极臭氧空洞，阴天也会晒伤', lat: -61.1333, lng: -55.1167 },
      ],
    },
    {
      type: 'day', day: 12, title: '南极半岛 · 第四天',
      body: '最后一个登陆日。想跳水的今天跳——水温 0–2°C，跳下去 20 秒内上来，船上会给一张写着水温的证书。心脏不好别逞强。',
      stops: [
        { name: 'Polar Plunge 跳水', start: '09:30', duration: 60, lat: -63.8000, lng: -57.5000, transit: { mode: 'boat', minutes: 90 } },
        { name: '半岛西岸锚地', start: '11:30', duration: 150, lat: -64.2000, lng: -58.0000, transit: { mode: 'boat', minutes: 120 }, story: '南极半岛是整块大陆最北、最暖的一段，也是人类活动最密集的区域。所有登陆点都由 IAATO 排期，同一时间一个点只允许一艘船。' },
      ],
      meals: [
        { type: 'dinner', name: '船上告别晚宴', start: '19:30', note: '通常是自助 + 船员表演', lat: -64.0000, lng: -58.0000 },
      ],
    },
    {
      type: 'day', day: 13, title: '返程 · 德雷克海峡',
      body: '掉头北上，整理照片。',
      stops: [
        { name: '北上', start: '08:00', duration: 0, lat: -60.0000, lng: -62.0000 },
      ],
      meals: [
        { type: 'breakfast', name: '船上餐厅', start: '07:30', note: '又开始晃了，吃苏打饼干', lat: -60.0000, lng: -62.0000 },
      ],
    },
    {
      type: 'day', day: 14, title: '德雷克海峡 · 第二天',
      body: '继续返航。留意结账截止时间。',
      stops: [
        { name: '比格尔海峡入口', start: '16:00', duration: 0, lat: -55.5000, lng: -66.0000 },
      ],
      meals: [
        { type: 'dinner', name: '船上餐厅', start: '19:00', note: '最后一顿船上晚饭', lat: -55.5000, lng: -66.0000 },
      ],
    },
    {
      type: 'day', day: 15, title: '下船 · 回布宜',
      body: '早上在乌斯怀亚下船，直接飞回布宜。',
      stops: [
        { name: '乌斯怀亚下船', start: '08:30', duration: 120, lat: -54.8070, lng: -68.3060 },
        { name: '布宜诺斯艾利斯机场', start: '14:00', duration: 60, lat: -34.8222, lng: -58.5358, transit: { mode: 'flight', minutes: 210 } },
      ],
      meals: [
        { type: 'lunch', name: '机场简餐', start: '12:30', note: '国内机场出发层', lat: -34.8222, lng: -58.5358 },
      ],
    },
    {
      type: 'day', day: 16, title: '布宜 → 转机',
      body: '白天补觉，晚上起飞。',
      stops: [
        { name: '市区半日', start: '11:00', duration: 180, lat: -34.6037, lng: -58.3816 },
      ],
      meals: [
        { type: 'dinner', name: '市区烤肉', start: '19:00', note: '走之前再吃一次', lat: -34.6037, lng: -58.3816 },
      ],
    },
    {
      type: 'day', day: 17, title: '飞行中',
      body: '又是 30 小时。往西飞，时差倒着来。',
      stops: [
      ],
      meals: [
        { type: 'snack', name: '转机区', start: '15:00', note: '多喝水', lat: 25.2731, lng: 51.6081 },
      ],
    },
    {
      type: 'day', day: 18, title: '抵达上海 → 杭州',
      body: '落地浦东，高铁回杭州。',
      stops: [
        { name: '浦东机场 → 杭州', start: '14:00', duration: 120, lat: 31.1443, lng: 121.8083 },
      ],
      meals: [
        { type: 'dinner', name: '回家吃', start: '19:00', note: '倒时差第一天，清淡为主', lat: 30.2908, lng: 120.2126 },
      ],
    },
    {
      type: 'day', day: 19, title: '缓冲日',
      body: '不安排任何事。倒时差、晾装备。',
      stops: [
      ],
      meals: [],
    },
    {
      type: 'day', day: 20, title: '缓冲日',
      body: '留一天应对航班延误的余量。',
      stops: [
      ],
      meals: [],
    },
    {
      type: 'text', title: '预算参考（以实际询价为准）',
      body: '船票是大头：10 天南极航程按舱位从 5 万到 15 万人民币不等，越早订越便宜。\n国际机票 1.5–2.5 万（旺季）。乌斯怀亚往返布宜约 2000–4000 元。\n签证、保险、装备另计。',
    },
    { type: 'link', title: 'IAATO 南极旅游组织者协会（查船只资质）', url: 'https://iaato.org/' },
  ],
};

const demoArctic = {
  title: '北极跨年 · 特罗姆瑟 7 天',
  cityRaw: '特罗姆瑟',
  city: '特罗姆瑟',
  region: 'europe',
  dateMode: 'exact',
  startDate: '2026-12-28',
  endDate: '2027-01-03',
  cover: { emoji: '✨', tone: 4, imgId: null },
  location: { lat: 69.6492, lng: 18.9553, name: '特罗姆瑟' },
  ledger: {
    budget: 32000,
    entries: [
      { id: 'e_ar1', date: '2026-09-18', title: '上海往返特罗姆瑟机票', amount: 8600, category: 'transport' },
      { id: 'e_ar2', date: '2026-09-20', title: '市区酒店 4 晚', amount: 7200, category: 'stay' },
      { id: 'e_ar3', date: '2026-09-22', title: '极光追猎团（8 小时）', amount: 2400, category: 'ticket' },
      { id: 'e_ar4', date: '2026-10-01', title: '防风冲锋衣', amount: 1800, category: 'shopping' },
    ],
  },
  brief: '北纬 69° 的极夜跨年。白天只有两小时蓝调光，晚上追极光，在雪地里倒数。',
  blocks: [
    {
      type: 'todo', title: '出发前',
      items: [
        { t: '申根签证（挪威）', done: true },
        { t: '订极光团（12 月底旺季，提前两个月）', done: true },
        { t: '确认跨年当晚餐厅是否营业（北欧很多店放假）', done: false },
        { t: '买防风防水的外层，内层抓绒 + 羊毛', done: true },
      ],
    },
    {
      type: 'todo', title: '要带的东西',
      items: [
        { t: '暖宝宝（贴脚底和后腰最有用）', done: false },
        { t: '面罩或围脖（风刮脸比低温更难受）', done: false },
        { t: '雪镜或墨镜（极夜里开车也要）', done: true },
        { t: '三脚架（拍极光必须）', done: false },
      ],
    },
    {
      type: 'text', title: '为什么选特罗姆瑟',
      body: '12 月底是极夜，太阳不上地平线，全天是蓝调时刻——拍照反而比极昼好看。\n它还在极光椭圆带正下方，城市边上就能看到极光，不用深入荒野。',
    },
    {
      type: 'day', day: 1, title: '12/28 上海 → 赫尔辛基 → 特罗姆瑟',
      body: '上午浦东出发，赫尔辛基转机，晚上到。第一晚别安排活动。',
      stops: [
        { name: '浦东机场', start: '09:00', duration: 150, lat: 31.1443, lng: 121.8083 },
        { name: '特罗姆瑟机场', start: '20:30', duration: 60, lat: 69.6833, lng: 18.9167, transit: { mode: 'flight', minutes: 780, note: '含赫尔辛基转机' } },
      ],
      meals: [
        { type: 'dinner', name: '酒店附近简餐', start: '21:30', note: '到了先吃口热的，别硬撑', lat: 69.6492, lng: 18.9553 },
      ],
    },
    {
      type: 'day', day: 2, title: '12/29 市区 + 缆车',
      photos: [{ id: 'ph_ar1', demoSrc: 'img/demo/harbour.jpg', caption: '蓝调时刻的港口', at: '15:30' }],
      body: '白天只有两三个小时的蓝调光，抓紧拍。',
      stops: [
        { name: '北极大教堂', start: '10:00', duration: 60, lat: 69.6483, lng: 18.9872, story: '1965 年建成的三角形教堂，11 块巨型混凝土板拼出冰山的形状，正面整面墙是彩色玻璃。设计灵感来自挪威北部的极地景观。' },
        { name: 'Fjellheisen 缆车', start: '13:00', duration: 120, lat: 69.6425, lng: 18.9936, transit: { mode: 'walk', minutes: 15 }, story: '1961 年开通，4 分钟升到海拔 421 米。站在 Storsteinen 平台上看整座城和峡湾，冬天从 11 月底到 1 月中，这个视角全是蓝紫色的。' },
        { name: '主街 Storgata', start: '16:00', duration: 90, lat: 69.6489, lng: 18.9562, transit: { mode: 'bus', minutes: 10 }, story: '19 世纪这里是北极捕猎和贸易的起点，从北冰洋带回来的皮毛和鲸油都在这条街上交易。现在街两侧全是木屋，1990 年代重建时按老图纸复原。' },
      ],
      meals: [
        { type: 'lunch', name: '港口鱼市', start: '11:30', note: '帝王蟹和鳕鱼，人均 300 元', lat: 69.6478, lng: 18.9600 },
        { type: 'dinner', name: 'Storgata 餐厅', start: '19:30', note: '驯鹿肉或鲸鱼肉，看敢不敢吃', lat: 69.6489, lng: 18.9562 },
      ],
    },
    {
      type: 'day', day: 3, title: '12/30 极光追猎',
      photos: [{ id: 'ph_ar2', demoSrc: 'img/demo/aurora.jpg', caption: '零下十八度，等了四十分钟', at: '22:10' }],
      body: '报团，向导开车跨境找晴空。带三脚架。',
      stops: [
        { name: '极光追猎营地', start: '18:00', duration: 480, lat: 69.4000, lng: 19.5000, transit: { mode: 'car', minutes: 90, note: '可能跨境到芬兰' }, story: '极光来自太阳风撞上地球磁场，粒子在电离层激发氧和氮发光——绿色是氧在 100–150 公里高度，紫色是氮。12 月底特罗姆瑟夜长 20 小时，只要天晴，概率很高。' },
      ],
      meals: [
        { type: 'dinner', name: '营地热汤', start: '19:00', note: '团里通常管一顿，可以自己带点吃的', lat: 69.4000, lng: 19.5000 },
      ],
    },
    {
      type: 'day', day: 4, title: '12/31 跨年',
      body: '白天补觉。晚上 23:30 到港口等烟花。',
      stops: [
        { name: '港口烟花', start: '14:00', duration: 120, lat: 69.6465, lng: 18.9600 },
        { name: '极地博物馆', start: '23:30', duration: 90, lat: 69.6476, lng: 18.9500, transit: { mode: 'walk', minutes: 10 }, story: '建在 1830 年代的码头仓库里，讲的是北极捕猎、渔民和第一批到达北极的探险队。里面复原了一间猎人小屋，零下二十度怎么睡觉一目了然。' },
      ],
      meals: [
        { type: 'dinner', name: '跨年晚餐', start: '20:30', note: '很多店 12/31 只接受预订，务必提前确认', lat: 69.6489, lng: 18.9562 },
      ],
    },
    {
      type: 'day', day: 5, title: '01/01 狗拉雪橇',
      body: '元旦上午雪橇犬营地，下午萨米帐篷里喝热汤。',
      stops: [
        { name: '雪橇犬营地', start: '09:30', duration: 240, lat: 69.4800, lng: 19.2000, transit: { mode: 'car', minutes: 40, note: '营地多有接送' }, story: '哈士奇拉雪橇时速能到 20 公里，狗比人兴奋。出发前向导会让你帮忙套缰绳——这是传统，不是客套。萨米人是斯堪的纳维亚的原住民，驯鹿放牧是他们几百年的营生。' },
      ],
      meals: [
        { type: 'lunch', name: '萨米帐篷', start: '12:30', note: '鹿肉汤 + 面包，营地管', lat: 69.4800, lng: 19.2000 },
        { type: 'dinner', name: '回城吃', start: '19:30', note: '元旦晚上开门的店不多', lat: 69.6492, lng: 18.9553 },
      ],
    },
    {
      type: 'day', day: 6, title: '01/02 返程',
      body: '上午自由活动，中午飞赫尔辛基。',
      stops: [
        { name: '最后的峡湾', start: '09:00', duration: 90, lat: 69.6530, lng: 18.9630 },
      ],
      meals: [
        { type: 'lunch', name: '机场简餐', start: '12:00', note: '赫尔辛基转机时间要留够', lat: 69.6833, lng: 18.9167 },
      ],
    },
    {
      type: 'day', day: 7, title: '01/03 抵达',
      body: '下午落地浦东。回国后两天别安排重活。',
      stops: [
        { name: '浦东 → 市区', start: '15:00', duration: 90, lat: 31.1443, lng: 121.8083, transit: { mode: 'flight', minutes: 780 } },
      ],
      meals: [],
    },
    {
      type: 'text', title: '进阶选项：斯瓦尔巴',
      body: '如果想把「北极」推到极致，可以再加一段飞朗伊尔城（北纬 78°），12 月底是彻底的极夜，全天漆黑，靠头灯行动。\n但航班少、气温 -20°C 以下、出城必须带枪防北极熊，7 天行程塞不下。这次先记着，下次单独安排。',
    },
  ],
};

const demoSanya = {
  title: '十一 · 三亚 7 天',
  cityRaw: '三亚',
  city: '三亚',
  region: 'cn-south',
  dateMode: 'exact',
  startDate: '2026-10-01',
  endDate: '2026-10-07',
  cover: { emoji: '🏝️', tone: 3, imgId: null },
  location: { lat: 18.2528, lng: 109.5119, name: '三亚' },
  ledger: {
    budget: 15000,
    entries: [
      { id: 'e_sy1', date: '2026-09-12', title: '往返机票（国庆溢价）', amount: 3260, category: 'transport' },
      { id: 'e_sy2', date: '2026-09-15', title: '亚龙湾酒店 3 晚', amount: 5400, category: 'stay' },
      { id: 'e_sy3', date: '2026-09-16', title: '海棠湾酒店 2 晚', amount: 2800, category: 'stay' },
      { id: 'e_sy4', date: '2026-10-03', title: '蜈支洲岛门票 + 潜水', amount: 960, category: 'ticket' },
      { id: 'e_sy5', date: '2026-10-05', title: '这几天吃的', amount: 1840, category: 'food' },
      { id: 'e_sy6', date: '2026-10-06', title: '免税店', amount: 2200, category: 'shopping' },
    ],
  },
  brief: '亚龙湾躺三天，蜈支洲岛一天，后海冲浪两天。国庆人确实多，但海是真的好。',
  blocks: [
    {
      type: 'todo', title: '这趟做对了的',
      items: [
        { t: '第一班船上蜈支洲岛', done: true },
        { t: '后海早上六点下水', done: true },
        { t: '提前订酒店（国庆溢价太高）', done: true },
        { t: '带了对珊瑚友好的物理防晒', done: true },
      ],
    },
    {
      type: 'todo', title: '下次要改的',
      items: [
        { t: '避开国庆，提前一周去', done: false },
        { t: '亚龙湾网红餐厅不用特地去', done: false },
        { t: '南山路程太远，可以砍掉', done: false },
      ],
    },
    {
      type: 'text', title: '复盘',
      body: '七天下来最值的两件事：后海早上六点下水，海面只有几个本地人；蜈支洲岛潜水的能见度比想象中好。\n最不值的：亚龙湾的网红餐厅，排队两小时，味道一般。',
    },
    {
      type: 'day', day: 1, title: '10/01 抵达',
      photos: [{ id: 'ph_sy1', demoSrc: 'img/demo/beach.jpg', caption: '亚龙湾第一天，水清得不像话', at: '16:05' }],
      body: '凤凰机场落地，直接打车到亚龙湾。',
      stops: [
        { name: '凤凰国际机场', start: '12:00', duration: 60, lat: 18.3029, lng: 109.4123 },
        { name: '亚龙湾海滩', start: '15:30', duration: 180, lat: 18.2250, lng: 109.6350, transit: { mode: 'taxi', minutes: 45, note: '机场到亚龙湾约 35 公里' }, story: '亚龙湾的沙是珊瑚和贝壳磨成的，白而细，踩上去不烫。海湾三面环山，风浪被挡住，所以水特别清——这也是它被叫「东方夏威夷」的原因。' },
      ],
      meals: [
        { type: 'dinner', name: '酒店餐厅', start: '19:00', note: '第一晚别折腾，国庆第一天路上堵', lat: 18.2250, lng: 109.6350 },
      ],
    },
    {
      type: 'day', day: 2, title: '10/02 亚龙湾躺平',
      body: '一整天在海边。傍晚去森林公园看日落。',
      stops: [
        { name: '亚龙湾热带天堂森林公园', start: '16:30', duration: 150, lat: 18.2410, lng: 109.6480, transit: { mode: 'taxi', minutes: 15 }, story: '公园在亚龙湾北侧的山上，那条悬空 400 米的过江龙索桥因为《非诚勿扰 2》出名。山顶的鸟巢度假屋就是电影里那个悬崖泳池。' },
      ],
      meals: [
        { type: 'lunch', name: '海边简餐', start: '12:30', note: '躺椅区一般能点', lat: 18.2250, lng: 109.6350 },
        { type: 'dinner', name: '亚龙湾海鲜广场', start: '19:00', note: '自己挑海鲜找店加工，比酒店便宜一半', lat: 18.2300, lng: 109.6420 },
      ],
    },
    {
      type: 'day', day: 3, title: '10/03 蜈支洲岛',
      body: '第一班船上岛，避开人流，下午三点回。',
      stops: [
        { name: '蜈支洲岛', start: '08:30', duration: 300, lat: 18.3116, lng: 109.7642, transit: { mode: 'boat', minutes: 20, note: '码头到岛上，早班船人少' }, story: '岛上的珊瑚礁是海南保存最完整的一片，能见度能到 10 米以上。岛名来自一种叫「蜈支」的海洋生物，渔民觉得岛的形状像它。' },
        { name: '后海村', start: '14:30', duration: 120, lat: 18.2930, lng: 109.7420, transit: { mode: 'car', minutes: 25 }, story: '一个原本打鱼的小村，因为浪型平缓成了国内最出名的初学者冲浪点。村里现在一半是冲浪店，一半还住着渔民，早上能看到晾在门口的渔网。' },
      ],
      meals: [
        { type: 'lunch', name: '岛上简餐', start: '12:00', note: '岛上物价高，可以带点干粮', lat: 18.3116, lng: 109.7642 },
        { type: 'dinner', name: '后海村海鲜', start: '19:00', note: '村子里的排档，比景区实在', lat: 18.2930, lng: 109.7420 },
      ],
    },
    {
      type: 'day', day: 4, title: '10/04 海棠湾 + 免税店',
      body: '换酒店到海棠湾，下午免税店。',
      stops: [
        { name: '海棠湾免税城', start: '14:30', duration: 180, lat: 18.4060, lng: 109.7440, transit: { mode: 'taxi', minutes: 35 } },
        { name: '海棠湾沙滩', start: '18:00', duration: 120, lat: 18.4000, lng: 109.7300, transit: { mode: 'walk', minutes: 10 }, story: '比亚龙湾开阔，浪也更大，不太适合下水，但看日出是三亚最好的一段。海边那一排酒店是 2010 年后陆续建的。' },
      ],
      meals: [
        { type: 'lunch', name: '免税城餐饮层', start: '12:00', note: '人多，错峰吃', lat: 18.4060, lng: 109.7440 },
        { type: 'dinner', name: '海棠湾餐厅', start: '19:30', note: '酒店区选择少，提前订', lat: 18.4000, lng: 109.7300 },
      ],
    },
    {
      type: 'day', day: 5, title: '10/05 后海冲浪',
      photos: [{ id: 'ph_sy2', demoSrc: 'img/demo/surf.jpg', caption: '六点的海，只有我们几个', at: '06:20' }],
      body: '早上六点下水，浪很温柔。下午村里喝咖啡。',
      stops: [
        { name: '后海冲浪点', start: '06:00', duration: 180, lat: 18.2930, lng: 109.7420, transit: { mode: 'taxi', minutes: 40 }, story: '六点的海面只有几个本地人和教练。后海的浪是珊瑚礁推出来的，又长又软，新手一小时能站板。教练大多是村里长大的孩子。' },
      ],
      meals: [
        { type: 'lunch', name: '村里的咖啡馆', start: '11:30', note: '冲完浪晒着太阳吃碗粉', lat: 18.2930, lng: 109.7420 },
        { type: 'dinner', name: '海边烧烤', start: '19:00', note: '后海沙滩上的排档', lat: 18.2920, lng: 109.7410 },
      ],
    },
    {
      type: 'day', day: 6, title: '10/06 后海 · 南山',
      body: '上午再冲一次，下午去南山看海上观音。',
      stops: [
        { name: '南山海上观音', start: '14:00', duration: 180, lat: 18.2960, lng: 109.2080, transit: { mode: 'car', minutes: 75, note: '路程远，来回三小时' }, story: '108 米高的三面观音像，2005 年开光，比自由女神像还高。三面分别持箧、持莲、持珠，代表智慧、慈悲、和平。站在像前的平台上，能同时看到山和海。' },
      ],
      meals: [
        { type: 'lunch', name: '南山素斋', start: '12:00', note: '寺庙里的斋饭，值得一试', lat: 18.2960, lng: 109.2080 },
        { type: 'dinner', name: '回市区吃', start: '19:00', note: '第一市场附近的海鲜', lat: 18.2530, lng: 109.5120 },
      ],
    },
    {
      type: 'day', day: 7, title: '10/07 返程',
      body: '上午收拾，中午去机场。提前三小时到。',
      stops: [
        { name: '凤凰机场', start: '11:00', duration: 60, lat: 18.3029, lng: 109.4123, transit: { mode: 'taxi', minutes: 30 } },
      ],
      meals: [
        { type: 'lunch', name: '机场吃', start: '11:30', note: '安检外选择多一些', lat: 18.3029, lng: 109.4123 },
      ],
    },
  ],
};

const demoWishes = [
  {
    title: '哈尔滨 · 冰雪大世界',
    cityRaw: '哈尔滨', city: '哈尔滨', region: 'cn-northeast',
    cover: { emoji: '❄️', tone: 6, imgId: null },
    location: { lat: 45.8038, lng: 126.5350, name: '哈尔滨' },
    ledger: { budget: 5000, entries: [] },
    brief: '12 月底开园，冰雕夜里打灯最好看。中央大街的马迭尔冰棍零下二十度吃。',
    blocks: [{ type: 'text', title: '', body: '12 月底开园，冰雕夜里打灯最好看。中央大街的马迭尔冰棍零下二十度吃。' }],
  },
  {
    title: '阿勒泰 · 禾木雪村',
    cityRaw: '阿勒泰', city: '阿勒泰', region: 'cn-northwest',
    cover: { emoji: '🎿', tone: 5, imgId: null },
    location: { lat: 48.5667, lng: 87.4333, name: '禾木村' },
    ledger: { budget: 8000, entries: [] },
    brief: '粉雪滑雪 + 图瓦人木屋，清晨炊烟和雾凇。冬天进山要看路况。',
    blocks: [{ type: 'text', title: '', body: '粉雪滑雪 + 图瓦人木屋，清晨炊烟和雾凇。冬天进山要看路况。' }],
  },
  {
    title: '泉州 · 蟳埔簪花',
    cityRaw: '泉州', city: '泉州', region: 'cn-east',
    cover: { emoji: '🏯', tone: 7, imgId: null },
    location: { lat: 24.8741, lng: 118.6757, name: '泉州' },
    ledger: { budget: 3000, entries: [] },
    brief: '蟳埔村戴一次簪花围，再去开元寺和西街。半城烟火半城仙。',
    blocks: [{ type: 'text', title: '', body: '蟳埔村戴一次簪花围，再去开元寺和西街。半城烟火半城仙。' }],
  },
  {
    title: '景德镇 · 陶溪川',
    cityRaw: '景德镇', city: '景德镇', region: 'cn-east',
    cover: { emoji: '🏺', tone: 6, imgId: null },
    location: { lat: 29.2688, lng: 117.1784, name: '景德镇' },
    ledger: { budget: 2500, entries: [] },
    brief: '周末市集淘手作，晚上逛陶溪川。可以自己拉坯烧一个杯子寄回来。',
    blocks: [{ type: 'text', title: '', body: '周末市集淘手作，晚上逛陶溪川。可以自己拉坯烧一个杯子寄回来。' }],
  },
  {
    title: '淄博 · 八大局',
    cityRaw: '淄博', city: '淄博', region: 'cn-east',
    cover: { emoji: '🍜', tone: 1, imgId: null },
    location: { lat: 36.8135, lng: 118.0550, name: '淄博' },
    ledger: { budget: 1500, entries: [] },
    brief: '小饼卷葱加蘸料，主要吃个热闹。顺路去周村古商城。',
    blocks: [{ type: 'text', title: '', body: '小饼卷葱加蘸料，主要吃个热闹。顺路去周村古商城。' }],
  },
  {
    title: '重庆 · 老城步道',
    cityRaw: '重庆', city: '重庆', region: 'cn-southwest',
    cover: { emoji: '🚡', tone: 4, imgId: null },
    location: { lat: 29.5630, lng: 106.5516, name: '重庆' },
    ledger: { budget: 3000, entries: [] },
    brief: '不走洪崖洞主路，走山城步道和下浩里。晚上在南滨路看对岸灯火。',
    blocks: [{ type: 'text', title: '', body: '不走洪崖洞主路，走山城步道和下浩里。晚上在南滨路看对岸灯火。' }],
  },
];

/** 三条"已经在路上"的（有日期就是确定行程） */
export const DEMO_PROMOTED = [demoAntarctica, demoArctic, demoSanya];

/** 想去阶段 */
export const DEMO_WISHES = demoWishes;

export const DEMO_TOTAL = DEMO_PROMOTED.length + DEMO_WISHES.length;
