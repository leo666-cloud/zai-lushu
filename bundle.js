var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// js/demo-data.js
var demoAntarctica, demoArctic, demoSanya, demoWishes, DEMO_PROMOTED, DEMO_WISHES, DEMO_TOTAL;
var init_demo_data = __esm({
  "js/demo-data.js"() {
    demoAntarctica = {
      title: "南极 20 天 · 从杭州到白色大陆",
      cityRaw: "南极",
      city: "南极",
      region: "polar",
      dateMode: "exact",
      startDate: "2026-12-01",
      endDate: "2026-12-20",
      cover: { emoji: "🐧", tone: 0, imgId: null },
      location: { lat: -63.5, lng: -57, name: "南极半岛" },
      ledger: {
        budget: 15e4,
        entries: [
          { id: "e_np1", date: "2026-09-10", title: "南极船票（10 天舱位）", amount: 88e3, category: "transport" },
          { id: "e_np2", date: "2026-08-20", title: "国际往返机票", amount: 21500, category: "transport" },
          { id: "e_np3", date: "2026-09-05", title: "阿根廷签证 + 保险", amount: 1200, category: "other" },
          { id: "e_np4", date: "2026-10-12", title: "防水裤与冲锋衣", amount: 4300, category: "shopping" },
          { id: "e_np5", date: "2026-10-15", title: "含南极救援的旅行险", amount: 2600, category: "other" }
        ]
      },
      brief: "杭州出发，经布宜诺斯艾利斯转乌斯怀亚登船，穿越德雷克海峡进南极半岛。12 月是企鹅产仔季。",
      blocks: [
        {
          type: "todo",
          title: "行前 90 天清单",
          items: [
            { t: "确认船票与舱位（南极船位紧张，越早越好）", done: true },
            { t: "办阿根廷签证：有美签/申根签可走 AVE 电子签", done: true },
            { t: "订国际机票（国内—布宜—乌斯怀亚三段）", done: true },
            { t: "买包含南极救援的旅行保险", done: false },
            { t: "体检，确认心肺能适应高纬度航行", done: false }
          ]
        },
        {
          type: "todo",
          title: "装备清单",
          items: [
            { t: "防水冲锋衣 + 防水裤（登陆必须）", done: true },
            { t: "保暖内衣两套（羊毛或抓绒）", done: true },
            { t: "防水手套两副（一副湿了换另一副）", done: false },
            { t: "晕船药（德雷克海峡必备）", done: true },
            { t: "高倍防晒 + 墨镜（雪面反射极强）", done: false },
            { t: "相机备用电池（低温掉电快）", done: false },
            { t: "防水背包或干袋（冲锋舟会溅水）", done: false }
          ]
        },
        {
          type: "text",
          title: "路线骨架",
          body: "三段式：国内飞南美（约 30 小时）→ 乌斯怀亚登船 → 德雷克海峡往返 + 南极半岛 5 天登陆。\n船上 10 天，前后各 5 天在路上，中间不留硬转机，给南美段延误留余量。"
        },
        {
          type: "day",
          day: 1,
          title: "杭州 → 上海 → 转机",
          body: "全天在移动。高铁到浦东，晚班机经多哈或亚的斯亚贝巴转布宜诺斯艾利斯。",
          stops: [
            { name: "杭州东站", start: "07:00", duration: 40, lat: 30.2908, lng: 120.2126 },
            { name: "上海浦东国际机场 T2", start: "09:00", duration: 180, lat: 31.1443, lng: 121.8083, transit: { mode: "train", minutes: 75, note: "沪杭高铁直达" } }
          ],
          meals: [
            { type: "dinner", name: "T2 出发层餐厅", start: "18:30", note: "转机前吃顿热的，机上餐食按多哈时间供应", lat: 31.1443, lng: 121.8083 }
          ]
        },
        {
          type: "day",
          day: 2,
          title: "飞行中",
          body: "全程约 30 小时，跨越 11 个时区。机上按目的地的作息睡，落地少受罪。",
          stops: [
            { name: "转机大厅", start: "14:00", duration: 150, lat: 25.2731, lng: 51.6081 }
          ],
          meals: [
            { type: "snack", name: "转机区咖啡", start: "16:30", note: "长途飞行多喝水，少喝咖啡", lat: 25.2731, lng: 51.6081 }
          ]
        },
        {
          type: "day",
          day: 3,
          title: "抵达布宜诺斯艾利斯",
          body: "上午落地。先回酒店放行李，下午去五月广场、博卡区。晚上早睡，倒时差。",
          stops: [
            { name: "五月广场", start: "10:30", duration: 90, lat: -34.6083, lng: -58.3712, story: "1810 年 5 月 25 日，布宜诺斯艾利斯的市民聚集在这片广场上推翻了西班牙总督，阿根廷独立战争由此开始。广场中央那座白色方尖碑叫「五月金字塔」，是全国最老的纪念碑。" },
            { name: "博卡区 La Boca", start: "13:30", duration: 120, lat: -34.6345, lng: -58.3631, transit: { mode: "taxi", minutes: 20, note: "从市中心约 8 公里" }, story: "19 世纪末，热那亚来的码头工人住在铁皮屋里，把刷船剩下的油漆带回家刷墙，于是有了这一片歪歪扭扭的彩色房子。探戈据说就是从这片街区的酒馆里长出来的。" }
          ],
          meals: [
            { type: "lunch", name: "圣特尔莫市场", start: "12:15", note: "烤肉夹馍 choripán，人均 40 元", lat: -34.621, lng: -58.373 },
            { type: "dinner", name: "巴勒莫区烤肉店", start: "20:00", note: "阿根廷烤肉按重量点，别一次点太多", lat: -34.583, lng: -58.423 }
          ]
        },
        {
          type: "day",
          day: 4,
          title: "布宜一日",
          body: "白天看墓园和书店，晚上早点收，明天飞南端。",
          stops: [
            { name: "雷科莱塔公墓", start: "09:30", duration: 90, lat: -34.5875, lng: -58.3931, transit: { mode: "taxi", minutes: 15 }, story: "1822 年建成的贵族墓园，4 万平方米里挤着 4800 座家族墓室。贝隆夫人就葬在这里，她的家族墓室门口常年有人放花。整个墓园像一座微缩的城市，街道、广场、雕塑一应俱全。" },
            { name: "雅典人书店 El Ateneo", start: "11:15", duration: 60, lat: -34.5956, lng: -58.3947, transit: { mode: "walk", minutes: 12 }, story: "1919 年建成时是剧院「大辉煌」，2000 年改成了书店。舞台被改成咖啡座，包厢变成阅读室，红色幕布还挂着。被不少媒体评为世界最美书店之一。" }
          ],
          meals: [
            { type: "lunch", name: "雷科莱塔区简餐", start: "12:30", note: "看完墓园就近吃", lat: -34.5875, lng: -58.3931 },
            { type: "dinner", name: "酒店附近", start: "19:30", note: "明天 5 点起，早睡", lat: -34.6037, lng: -58.3816 }
          ]
        },
        {
          type: "day",
          day: 5,
          title: "飞乌斯怀亚",
          body: "三小时飞到世界最南端的小城。下午取装备、逛港口。",
          stops: [
            { name: "乌斯怀亚港", start: "14:00", duration: 90, lat: -54.806, lng: -68.304, transit: { mode: "flight", minutes: 210, note: "布宜 → 乌斯怀亚" }, story: "南纬 54°48′，号称「世界尽头」。19 世纪这里是阿根廷流放重犯的地方，监狱现在改成了博物馆。城里所有招牌都写着「Fin del Mundo」，纪念品店会把你的护照盖上一个世界尽头的章。" },
            { name: "比格尔海峡岸边", start: "18:30", duration: 60, lat: -54.8019, lng: -68.303, transit: { mode: "walk", minutes: 15 }, story: "海峡名字来自达尔文乘坐的「比格尔号」。1833 年他在这里遇到火地岛原住民，后来在《小猎犬号航海记》里写下了那段著名的记录。傍晚的光从雪山后面斜过来，是这座城最好看的时候。" }
          ],
          meals: [
            { type: "dinner", name: "港口的帝王蟹", start: "20:00", note: "本地帝王蟹按只卖，两个人一只刚好", lat: -54.804, lng: -68.305 }
          ]
        },
        {
          type: "day",
          day: 6,
          title: "登船",
          body: "下午登船，安全演练、发冲锋衣。出港后沿比格尔海峡航行。船上探险队都有 IAATO 认证，演练会教你冲锋舟上下船的「水手抓握」。",
          stops: [
            { name: "登船与安全演练", start: "15:00", duration: 120, lat: -54.807, lng: -68.306 },
            { name: "比格尔海峡出港", start: "17:30", duration: 90, lat: -54.9, lng: -68.2, transit: { mode: "boat", minutes: 60 } }
          ],
          meals: [
            { type: "dinner", name: "船上餐厅", start: "19:30", note: "第一天晚上通常有船长欢迎酒会", lat: -54.87, lng: -68.25 }
          ]
        },
        {
          type: "day",
          day: 7,
          title: "德雷克海峡 · 第一天",
          body: "进入西风带，浪高 4–8 米是常态。800 公里无遮挡的水道，老船员叫它「德雷克摇床」——过得了这一关，才算真的往南走。提前 1 小时吃晕船药，今天基本躺着。",
          stops: [
            { name: "西风带", start: "08:00", duration: 0, lat: -58, lng: -63 }
          ],
          meals: [
            { type: "breakfast", name: "船上餐厅", start: "07:30", note: "晕船就别吃太饱，苏打饼干配姜茶", lat: -58, lng: -63 }
          ]
        },
        {
          type: "day",
          day: 8,
          title: "德雷克海峡 · 第二天",
          body: "后半程通常平缓些。听探险队讲座，准备登陆。",
          stops: [
            { name: "探险队讲座", start: "10:00", duration: 150, lat: -60.5, lng: -62 }
          ],
          meals: [
            { type: "lunch", name: "船上餐厅", start: "12:30", note: "今天风小了，可以正常吃", lat: -60.5, lng: -62 }
          ]
        },
        {
          type: "day",
          day: 9,
          title: "第一次登陆",
          photos: [{ id: "ph_np1", demoSrc: "img/demo/penguin.jpg", caption: "登陆点，企鹅就在几步之外", at: "09:20" }],
          body: "清晨看到第一座冰山。登陆点视天气而定。",
          stops: [
            { name: "南设得兰群岛", start: "08:00", duration: 180, lat: -62.05, lng: -58.3, story: "1819 年，英国商人史密斯在这里发现了陆地，第二年就被确认为南极大陆的一部分。岛上的企鹅群是南极最容易接近的，因为人类的登陆点被严格限制在几条固定路径上。" },
            { name: "欺骗岛 Deception Island", start: "14:00", duration: 120, lat: -62.95, lng: -60.65, transit: { mode: "boat", minutes: 180, note: "冲锋舟 + 破火山口" }, story: "一座沉没的火山口，船可以从一道叫「海神的风箱」的窄口开进去。1906 年挪威人在此建捕鲸站，1969 年火山喷发把它埋了。现在还能看到生锈的油罐和鲸骨。" }
          ],
          meals: [
            { type: "lunch", name: "船上餐厅", start: "12:00", note: "登陆回来通常有热汤", lat: -62.5, lng: -59.5 }
          ]
        },
        {
          type: "day",
          day: 10,
          title: "南极半岛 · 第二天",
          photos: [{ id: "ph_np2", demoSrc: "img/demo/iceberg.jpg", caption: "冲锋舟巡游，水面像镜子", at: "09:45" }],
          body: "冲锋舟巡游看冰山和座头鲸。",
          stops: [
            { name: "冰山巡游", start: "09:00", duration: 150, lat: -63.2, lng: -58.5, transit: { mode: "boat", minutes: 60, note: "冲锋舟" }, story: "南极的冰山有 90% 在水下，看到的那一角只是零头。蓝得发亮的那种是老冰，压了几百年把气泡全挤掉了，光穿进去不容易散，所以颜色特别深。" },
            { name: "企鹅栖息地", start: "12:00", duration: 120, lat: -63.5, lng: -57.5, transit: { mode: "boat", minutes: 45 }, story: "12 月是阿德利企鹅和巴布亚企鹅的产仔期。它们会偷邻居的石头来垒窝，被发现了就是一场吵。看的时候保持 5 米距离，别挡在它去海里的路上。" }
          ],
          meals: [
            { type: "dinner", name: "船上餐厅", start: "19:00", note: "每天晚饭前有当天的回顾会", lat: -63.4, lng: -58 }
          ]
        },
        {
          type: "day",
          day: 11,
          title: "南极半岛 · 第三天",
          body: "可能安排登陆象岛。防晒别省。",
          stops: [
            { name: "象岛 Elephant Island", start: "09:00", duration: 180, lat: -61.1333, lng: -55.1167, transit: { mode: "boat", minutes: 240, note: "视冰况，可能改点" }, story: "1916 年，沙克尔顿的「坚忍号」沉没后，22 名船员在这座荒岛上撑了 137 天，靠翻过来的救生艇当屋顶。沙克尔顿带着 5 个人划了 1300 公里去南乔治亚求援，把所有人救了回来。" }
          ],
          meals: [
            { type: "lunch", name: "船上餐厅", start: "13:00", note: "南极臭氧空洞，阴天也会晒伤", lat: -61.1333, lng: -55.1167 }
          ]
        },
        {
          type: "day",
          day: 12,
          title: "南极半岛 · 第四天",
          body: "最后一个登陆日。想跳水的今天跳——水温 0–2°C，跳下去 20 秒内上来，船上会给一张写着水温的证书。心脏不好别逞强。",
          stops: [
            { name: "Polar Plunge 跳水", start: "09:30", duration: 60, lat: -63.8, lng: -57.5, transit: { mode: "boat", minutes: 90 } },
            { name: "半岛西岸锚地", start: "11:30", duration: 150, lat: -64.2, lng: -58, transit: { mode: "boat", minutes: 120 }, story: "南极半岛是整块大陆最北、最暖的一段，也是人类活动最密集的区域。所有登陆点都由 IAATO 排期，同一时间一个点只允许一艘船。" }
          ],
          meals: [
            { type: "dinner", name: "船上告别晚宴", start: "19:30", note: "通常是自助 + 船员表演", lat: -64, lng: -58 }
          ]
        },
        {
          type: "day",
          day: 13,
          title: "返程 · 德雷克海峡",
          body: "掉头北上，整理照片。",
          stops: [
            { name: "北上", start: "08:00", duration: 0, lat: -60, lng: -62 }
          ],
          meals: [
            { type: "breakfast", name: "船上餐厅", start: "07:30", note: "又开始晃了，吃苏打饼干", lat: -60, lng: -62 }
          ]
        },
        {
          type: "day",
          day: 14,
          title: "德雷克海峡 · 第二天",
          body: "继续返航。留意结账截止时间。",
          stops: [
            { name: "比格尔海峡入口", start: "16:00", duration: 0, lat: -55.5, lng: -66 }
          ],
          meals: [
            { type: "dinner", name: "船上餐厅", start: "19:00", note: "最后一顿船上晚饭", lat: -55.5, lng: -66 }
          ]
        },
        {
          type: "day",
          day: 15,
          title: "下船 · 回布宜",
          body: "早上在乌斯怀亚下船，直接飞回布宜。",
          stops: [
            { name: "乌斯怀亚下船", start: "08:30", duration: 120, lat: -54.807, lng: -68.306 },
            { name: "布宜诺斯艾利斯机场", start: "14:00", duration: 60, lat: -34.8222, lng: -58.5358, transit: { mode: "flight", minutes: 210 } }
          ],
          meals: [
            { type: "lunch", name: "机场简餐", start: "12:30", note: "国内机场出发层", lat: -34.8222, lng: -58.5358 }
          ]
        },
        {
          type: "day",
          day: 16,
          title: "布宜 → 转机",
          body: "白天补觉，晚上起飞。",
          stops: [
            { name: "市区半日", start: "11:00", duration: 180, lat: -34.6037, lng: -58.3816 }
          ],
          meals: [
            { type: "dinner", name: "市区烤肉", start: "19:00", note: "走之前再吃一次", lat: -34.6037, lng: -58.3816 }
          ]
        },
        {
          type: "day",
          day: 17,
          title: "飞行中",
          body: "又是 30 小时。往西飞，时差倒着来。",
          stops: [],
          meals: [
            { type: "snack", name: "转机区", start: "15:00", note: "多喝水", lat: 25.2731, lng: 51.6081 }
          ]
        },
        {
          type: "day",
          day: 18,
          title: "抵达上海 → 杭州",
          body: "落地浦东，高铁回杭州。",
          stops: [
            { name: "浦东机场 → 杭州", start: "14:00", duration: 120, lat: 31.1443, lng: 121.8083 }
          ],
          meals: [
            { type: "dinner", name: "回家吃", start: "19:00", note: "倒时差第一天，清淡为主", lat: 30.2908, lng: 120.2126 }
          ]
        },
        {
          type: "day",
          day: 19,
          title: "缓冲日",
          body: "不安排任何事。倒时差、晾装备。",
          stops: [],
          meals: []
        },
        {
          type: "day",
          day: 20,
          title: "缓冲日",
          body: "留一天应对航班延误的余量。",
          stops: [],
          meals: []
        },
        {
          type: "text",
          title: "预算参考（以实际询价为准）",
          body: "船票是大头：10 天南极航程按舱位从 5 万到 15 万人民币不等，越早订越便宜。\n国际机票 1.5–2.5 万（旺季）。乌斯怀亚往返布宜约 2000–4000 元。\n签证、保险、装备另计。"
        },
        { type: "link", title: "IAATO 南极旅游组织者协会（查船只资质）", url: "https://iaato.org/" }
      ]
    };
    demoArctic = {
      title: "北极跨年 · 特罗姆瑟 7 天",
      cityRaw: "特罗姆瑟",
      city: "特罗姆瑟",
      region: "europe",
      dateMode: "exact",
      startDate: "2026-12-28",
      endDate: "2027-01-03",
      cover: { emoji: "✨", tone: 4, imgId: null },
      location: { lat: 69.6492, lng: 18.9553, name: "特罗姆瑟" },
      ledger: {
        budget: 32e3,
        entries: [
          { id: "e_ar1", date: "2026-09-18", title: "上海往返特罗姆瑟机票", amount: 8600, category: "transport" },
          { id: "e_ar2", date: "2026-09-20", title: "市区酒店 4 晚", amount: 7200, category: "stay" },
          { id: "e_ar3", date: "2026-09-22", title: "极光追猎团（8 小时）", amount: 2400, category: "ticket" },
          { id: "e_ar4", date: "2026-10-01", title: "防风冲锋衣", amount: 1800, category: "shopping" }
        ]
      },
      brief: "北纬 69° 的极夜跨年。白天只有两小时蓝调光，晚上追极光，在雪地里倒数。",
      blocks: [
        {
          type: "todo",
          title: "出发前",
          items: [
            { t: "申根签证（挪威）", done: true },
            { t: "订极光团（12 月底旺季，提前两个月）", done: true },
            { t: "确认跨年当晚餐厅是否营业（北欧很多店放假）", done: false },
            { t: "买防风防水的外层，内层抓绒 + 羊毛", done: true }
          ]
        },
        {
          type: "todo",
          title: "要带的东西",
          items: [
            { t: "暖宝宝（贴脚底和后腰最有用）", done: false },
            { t: "面罩或围脖（风刮脸比低温更难受）", done: false },
            { t: "雪镜或墨镜（极夜里开车也要）", done: true },
            { t: "三脚架（拍极光必须）", done: false }
          ]
        },
        {
          type: "text",
          title: "为什么选特罗姆瑟",
          body: "12 月底是极夜，太阳不上地平线，全天是蓝调时刻——拍照反而比极昼好看。\n它还在极光椭圆带正下方，城市边上就能看到极光，不用深入荒野。"
        },
        {
          type: "day",
          day: 1,
          title: "12/28 上海 → 赫尔辛基 → 特罗姆瑟",
          body: "上午浦东出发，赫尔辛基转机，晚上到。第一晚别安排活动。",
          stops: [
            { name: "浦东机场", start: "09:00", duration: 150, lat: 31.1443, lng: 121.8083 },
            { name: "特罗姆瑟机场", start: "20:30", duration: 60, lat: 69.6833, lng: 18.9167, transit: { mode: "flight", minutes: 780, note: "含赫尔辛基转机" } }
          ],
          meals: [
            { type: "dinner", name: "酒店附近简餐", start: "21:30", note: "到了先吃口热的，别硬撑", lat: 69.6492, lng: 18.9553 }
          ]
        },
        {
          type: "day",
          day: 2,
          title: "12/29 市区 + 缆车",
          photos: [{ id: "ph_ar1", demoSrc: "img/demo/harbour.jpg", caption: "蓝调时刻的港口", at: "15:30" }],
          body: "白天只有两三个小时的蓝调光，抓紧拍。",
          stops: [
            { name: "北极大教堂", start: "10:00", duration: 60, lat: 69.6483, lng: 18.9872, story: "1965 年建成的三角形教堂，11 块巨型混凝土板拼出冰山的形状，正面整面墙是彩色玻璃。设计灵感来自挪威北部的极地景观。" },
            { name: "Fjellheisen 缆车", start: "13:00", duration: 120, lat: 69.6425, lng: 18.9936, transit: { mode: "walk", minutes: 15 }, story: "1961 年开通，4 分钟升到海拔 421 米。站在 Storsteinen 平台上看整座城和峡湾，冬天从 11 月底到 1 月中，这个视角全是蓝紫色的。" },
            { name: "主街 Storgata", start: "16:00", duration: 90, lat: 69.6489, lng: 18.9562, transit: { mode: "bus", minutes: 10 }, story: "19 世纪这里是北极捕猎和贸易的起点，从北冰洋带回来的皮毛和鲸油都在这条街上交易。现在街两侧全是木屋，1990 年代重建时按老图纸复原。" }
          ],
          meals: [
            { type: "lunch", name: "港口鱼市", start: "11:30", note: "帝王蟹和鳕鱼，人均 300 元", lat: 69.6478, lng: 18.96 },
            { type: "dinner", name: "Storgata 餐厅", start: "19:30", note: "驯鹿肉或鲸鱼肉，看敢不敢吃", lat: 69.6489, lng: 18.9562 }
          ]
        },
        {
          type: "day",
          day: 3,
          title: "12/30 极光追猎",
          photos: [{ id: "ph_ar2", demoSrc: "img/demo/aurora.jpg", caption: "零下十八度，等了四十分钟", at: "22:10" }],
          body: "报团，向导开车跨境找晴空。带三脚架。",
          stops: [
            { name: "极光追猎营地", start: "18:00", duration: 480, lat: 69.4, lng: 19.5, transit: { mode: "car", minutes: 90, note: "可能跨境到芬兰" }, story: "极光来自太阳风撞上地球磁场，粒子在电离层激发氧和氮发光——绿色是氧在 100–150 公里高度，紫色是氮。12 月底特罗姆瑟夜长 20 小时，只要天晴，概率很高。" }
          ],
          meals: [
            { type: "dinner", name: "营地热汤", start: "19:00", note: "团里通常管一顿，可以自己带点吃的", lat: 69.4, lng: 19.5 }
          ]
        },
        {
          type: "day",
          day: 4,
          title: "12/31 跨年",
          body: "白天补觉。晚上 23:30 到港口等烟花。",
          stops: [
            { name: "港口烟花", start: "14:00", duration: 120, lat: 69.6465, lng: 18.96 },
            { name: "极地博物馆", start: "23:30", duration: 90, lat: 69.6476, lng: 18.95, transit: { mode: "walk", minutes: 10 }, story: "建在 1830 年代的码头仓库里，讲的是北极捕猎、渔民和第一批到达北极的探险队。里面复原了一间猎人小屋，零下二十度怎么睡觉一目了然。" }
          ],
          meals: [
            { type: "dinner", name: "跨年晚餐", start: "20:30", note: "很多店 12/31 只接受预订，务必提前确认", lat: 69.6489, lng: 18.9562 }
          ]
        },
        {
          type: "day",
          day: 5,
          title: "01/01 狗拉雪橇",
          body: "元旦上午雪橇犬营地，下午萨米帐篷里喝热汤。",
          stops: [
            { name: "雪橇犬营地", start: "09:30", duration: 240, lat: 69.48, lng: 19.2, transit: { mode: "car", minutes: 40, note: "营地多有接送" }, story: "哈士奇拉雪橇时速能到 20 公里，狗比人兴奋。出发前向导会让你帮忙套缰绳——这是传统，不是客套。萨米人是斯堪的纳维亚的原住民，驯鹿放牧是他们几百年的营生。" }
          ],
          meals: [
            { type: "lunch", name: "萨米帐篷", start: "12:30", note: "鹿肉汤 + 面包，营地管", lat: 69.48, lng: 19.2 },
            { type: "dinner", name: "回城吃", start: "19:30", note: "元旦晚上开门的店不多", lat: 69.6492, lng: 18.9553 }
          ]
        },
        {
          type: "day",
          day: 6,
          title: "01/02 返程",
          body: "上午自由活动，中午飞赫尔辛基。",
          stops: [
            { name: "最后的峡湾", start: "09:00", duration: 90, lat: 69.653, lng: 18.963 }
          ],
          meals: [
            { type: "lunch", name: "机场简餐", start: "12:00", note: "赫尔辛基转机时间要留够", lat: 69.6833, lng: 18.9167 }
          ]
        },
        {
          type: "day",
          day: 7,
          title: "01/03 抵达",
          body: "下午落地浦东。回国后两天别安排重活。",
          stops: [
            { name: "浦东 → 市区", start: "15:00", duration: 90, lat: 31.1443, lng: 121.8083, transit: { mode: "flight", minutes: 780 } }
          ],
          meals: []
        },
        {
          type: "text",
          title: "进阶选项：斯瓦尔巴",
          body: "如果想把「北极」推到极致，可以再加一段飞朗伊尔城（北纬 78°），12 月底是彻底的极夜，全天漆黑，靠头灯行动。\n但航班少、气温 -20°C 以下、出城必须带枪防北极熊，7 天行程塞不下。这次先记着，下次单独安排。"
        }
      ]
    };
    demoSanya = {
      title: "十一 · 三亚 7 天",
      cityRaw: "三亚",
      city: "三亚",
      region: "cn-south",
      dateMode: "exact",
      startDate: "2026-10-01",
      endDate: "2026-10-07",
      cover: { emoji: "🏝️", tone: 3, imgId: null },
      location: { lat: 18.2528, lng: 109.5119, name: "三亚" },
      ledger: {
        budget: 15e3,
        entries: [
          { id: "e_sy1", date: "2026-09-12", title: "往返机票（国庆溢价）", amount: 3260, category: "transport" },
          { id: "e_sy2", date: "2026-09-15", title: "亚龙湾酒店 3 晚", amount: 5400, category: "stay" },
          { id: "e_sy3", date: "2026-09-16", title: "海棠湾酒店 2 晚", amount: 2800, category: "stay" },
          { id: "e_sy4", date: "2026-10-03", title: "蜈支洲岛门票 + 潜水", amount: 960, category: "ticket" },
          { id: "e_sy5", date: "2026-10-05", title: "这几天吃的", amount: 1840, category: "food" },
          { id: "e_sy6", date: "2026-10-06", title: "免税店", amount: 2200, category: "shopping" }
        ]
      },
      brief: "亚龙湾躺三天，蜈支洲岛一天，后海冲浪两天。国庆人确实多，但海是真的好。",
      blocks: [
        {
          type: "todo",
          title: "这趟做对了的",
          items: [
            { t: "第一班船上蜈支洲岛", done: true },
            { t: "后海早上六点下水", done: true },
            { t: "提前订酒店（国庆溢价太高）", done: true },
            { t: "带了对珊瑚友好的物理防晒", done: true }
          ]
        },
        {
          type: "todo",
          title: "下次要改的",
          items: [
            { t: "避开国庆，提前一周去", done: false },
            { t: "亚龙湾网红餐厅不用特地去", done: false },
            { t: "南山路程太远，可以砍掉", done: false }
          ]
        },
        {
          type: "text",
          title: "复盘",
          body: "七天下来最值的两件事：后海早上六点下水，海面只有几个本地人；蜈支洲岛潜水的能见度比想象中好。\n最不值的：亚龙湾的网红餐厅，排队两小时，味道一般。"
        },
        {
          type: "day",
          day: 1,
          title: "10/01 抵达",
          photos: [{ id: "ph_sy1", demoSrc: "img/demo/beach.jpg", caption: "亚龙湾第一天，水清得不像话", at: "16:05" }],
          body: "凤凰机场落地，直接打车到亚龙湾。",
          stops: [
            { name: "凤凰国际机场", start: "12:00", duration: 60, lat: 18.3029, lng: 109.4123 },
            { name: "亚龙湾海滩", start: "15:30", duration: 180, lat: 18.225, lng: 109.635, transit: { mode: "taxi", minutes: 45, note: "机场到亚龙湾约 35 公里" }, story: "亚龙湾的沙是珊瑚和贝壳磨成的，白而细，踩上去不烫。海湾三面环山，风浪被挡住，所以水特别清——这也是它被叫「东方夏威夷」的原因。" }
          ],
          meals: [
            { type: "dinner", name: "酒店餐厅", start: "19:00", note: "第一晚别折腾，国庆第一天路上堵", lat: 18.225, lng: 109.635 }
          ]
        },
        {
          type: "day",
          day: 2,
          title: "10/02 亚龙湾躺平",
          body: "一整天在海边。傍晚去森林公园看日落。",
          stops: [
            { name: "亚龙湾热带天堂森林公园", start: "16:30", duration: 150, lat: 18.241, lng: 109.648, transit: { mode: "taxi", minutes: 15 }, story: "公园在亚龙湾北侧的山上，那条悬空 400 米的过江龙索桥因为《非诚勿扰 2》出名。山顶的鸟巢度假屋就是电影里那个悬崖泳池。" }
          ],
          meals: [
            { type: "lunch", name: "海边简餐", start: "12:30", note: "躺椅区一般能点", lat: 18.225, lng: 109.635 },
            { type: "dinner", name: "亚龙湾海鲜广场", start: "19:00", note: "自己挑海鲜找店加工，比酒店便宜一半", lat: 18.23, lng: 109.642 }
          ]
        },
        {
          type: "day",
          day: 3,
          title: "10/03 蜈支洲岛",
          body: "第一班船上岛，避开人流，下午三点回。",
          stops: [
            { name: "蜈支洲岛", start: "08:30", duration: 300, lat: 18.3116, lng: 109.7642, transit: { mode: "boat", minutes: 20, note: "码头到岛上，早班船人少" }, story: "岛上的珊瑚礁是海南保存最完整的一片，能见度能到 10 米以上。岛名来自一种叫「蜈支」的海洋生物，渔民觉得岛的形状像它。" },
            { name: "后海村", start: "14:30", duration: 120, lat: 18.293, lng: 109.742, transit: { mode: "car", minutes: 25 }, story: "一个原本打鱼的小村，因为浪型平缓成了国内最出名的初学者冲浪点。村里现在一半是冲浪店，一半还住着渔民，早上能看到晾在门口的渔网。" }
          ],
          meals: [
            { type: "lunch", name: "岛上简餐", start: "12:00", note: "岛上物价高，可以带点干粮", lat: 18.3116, lng: 109.7642 },
            { type: "dinner", name: "后海村海鲜", start: "19:00", note: "村子里的排档，比景区实在", lat: 18.293, lng: 109.742 }
          ]
        },
        {
          type: "day",
          day: 4,
          title: "10/04 海棠湾 + 免税店",
          body: "换酒店到海棠湾，下午免税店。",
          stops: [
            { name: "海棠湾免税城", start: "14:30", duration: 180, lat: 18.406, lng: 109.744, transit: { mode: "taxi", minutes: 35 } },
            { name: "海棠湾沙滩", start: "18:00", duration: 120, lat: 18.4, lng: 109.73, transit: { mode: "walk", minutes: 10 }, story: "比亚龙湾开阔，浪也更大，不太适合下水，但看日出是三亚最好的一段。海边那一排酒店是 2010 年后陆续建的。" }
          ],
          meals: [
            { type: "lunch", name: "免税城餐饮层", start: "12:00", note: "人多，错峰吃", lat: 18.406, lng: 109.744 },
            { type: "dinner", name: "海棠湾餐厅", start: "19:30", note: "酒店区选择少，提前订", lat: 18.4, lng: 109.73 }
          ]
        },
        {
          type: "day",
          day: 5,
          title: "10/05 后海冲浪",
          photos: [{ id: "ph_sy2", demoSrc: "img/demo/surf.jpg", caption: "六点的海，只有我们几个", at: "06:20" }],
          body: "早上六点下水，浪很温柔。下午村里喝咖啡。",
          stops: [
            { name: "后海冲浪点", start: "06:00", duration: 180, lat: 18.293, lng: 109.742, transit: { mode: "taxi", minutes: 40 }, story: "六点的海面只有几个本地人和教练。后海的浪是珊瑚礁推出来的，又长又软，新手一小时能站板。教练大多是村里长大的孩子。" }
          ],
          meals: [
            { type: "lunch", name: "村里的咖啡馆", start: "11:30", note: "冲完浪晒着太阳吃碗粉", lat: 18.293, lng: 109.742 },
            { type: "dinner", name: "海边烧烤", start: "19:00", note: "后海沙滩上的排档", lat: 18.292, lng: 109.741 }
          ]
        },
        {
          type: "day",
          day: 6,
          title: "10/06 后海 · 南山",
          body: "上午再冲一次，下午去南山看海上观音。",
          stops: [
            { name: "南山海上观音", start: "14:00", duration: 180, lat: 18.296, lng: 109.208, transit: { mode: "car", minutes: 75, note: "路程远，来回三小时" }, story: "108 米高的三面观音像，2005 年开光，比自由女神像还高。三面分别持箧、持莲、持珠，代表智慧、慈悲、和平。站在像前的平台上，能同时看到山和海。" }
          ],
          meals: [
            { type: "lunch", name: "南山素斋", start: "12:00", note: "寺庙里的斋饭，值得一试", lat: 18.296, lng: 109.208 },
            { type: "dinner", name: "回市区吃", start: "19:00", note: "第一市场附近的海鲜", lat: 18.253, lng: 109.512 }
          ]
        },
        {
          type: "day",
          day: 7,
          title: "10/07 返程",
          body: "上午收拾，中午去机场。提前三小时到。",
          stops: [
            { name: "凤凰机场", start: "11:00", duration: 60, lat: 18.3029, lng: 109.4123, transit: { mode: "taxi", minutes: 30 } }
          ],
          meals: [
            { type: "lunch", name: "机场吃", start: "11:30", note: "安检外选择多一些", lat: 18.3029, lng: 109.4123 }
          ]
        }
      ]
    };
    demoWishes = [
      {
        title: "哈尔滨 · 冰雪大世界",
        cityRaw: "哈尔滨",
        city: "哈尔滨",
        region: "cn-northeast",
        cover: { emoji: "❄️", tone: 6, imgId: null },
        location: { lat: 45.8038, lng: 126.535, name: "哈尔滨" },
        ledger: { budget: 5e3, entries: [] },
        brief: "12 月底开园，冰雕夜里打灯最好看。中央大街的马迭尔冰棍零下二十度吃。",
        blocks: [{ type: "text", title: "", body: "12 月底开园，冰雕夜里打灯最好看。中央大街的马迭尔冰棍零下二十度吃。" }]
      },
      {
        title: "阿勒泰 · 禾木雪村",
        cityRaw: "阿勒泰",
        city: "阿勒泰",
        region: "cn-northwest",
        cover: { emoji: "🎿", tone: 5, imgId: null },
        location: { lat: 48.5667, lng: 87.4333, name: "禾木村" },
        ledger: { budget: 8e3, entries: [] },
        brief: "粉雪滑雪 + 图瓦人木屋，清晨炊烟和雾凇。冬天进山要看路况。",
        blocks: [{ type: "text", title: "", body: "粉雪滑雪 + 图瓦人木屋，清晨炊烟和雾凇。冬天进山要看路况。" }]
      },
      {
        title: "泉州 · 蟳埔簪花",
        cityRaw: "泉州",
        city: "泉州",
        region: "cn-east",
        cover: { emoji: "🏯", tone: 7, imgId: null },
        location: { lat: 24.8741, lng: 118.6757, name: "泉州" },
        ledger: { budget: 3e3, entries: [] },
        brief: "蟳埔村戴一次簪花围，再去开元寺和西街。半城烟火半城仙。",
        blocks: [{ type: "text", title: "", body: "蟳埔村戴一次簪花围，再去开元寺和西街。半城烟火半城仙。" }]
      },
      {
        title: "景德镇 · 陶溪川",
        cityRaw: "景德镇",
        city: "景德镇",
        region: "cn-east",
        cover: { emoji: "🏺", tone: 6, imgId: null },
        location: { lat: 29.2688, lng: 117.1784, name: "景德镇" },
        ledger: { budget: 2500, entries: [] },
        brief: "周末市集淘手作，晚上逛陶溪川。可以自己拉坯烧一个杯子寄回来。",
        blocks: [{ type: "text", title: "", body: "周末市集淘手作，晚上逛陶溪川。可以自己拉坯烧一个杯子寄回来。" }]
      },
      {
        title: "淄博 · 八大局",
        cityRaw: "淄博",
        city: "淄博",
        region: "cn-east",
        cover: { emoji: "🍜", tone: 1, imgId: null },
        location: { lat: 36.8135, lng: 118.055, name: "淄博" },
        ledger: { budget: 1500, entries: [] },
        brief: "小饼卷葱加蘸料，主要吃个热闹。顺路去周村古商城。",
        blocks: [{ type: "text", title: "", body: "小饼卷葱加蘸料，主要吃个热闹。顺路去周村古商城。" }]
      },
      {
        title: "重庆 · 老城步道",
        cityRaw: "重庆",
        city: "重庆",
        region: "cn-southwest",
        cover: { emoji: "🚡", tone: 4, imgId: null },
        location: { lat: 29.563, lng: 106.5516, name: "重庆" },
        ledger: { budget: 3e3, entries: [] },
        brief: "不走洪崖洞主路，走山城步道和下浩里。晚上在南滨路看对岸灯火。",
        blocks: [{ type: "text", title: "", body: "不走洪崖洞主路，走山城步道和下浩里。晚上在南滨路看对岸灯火。" }]
      }
    ];
    DEMO_PROMOTED = [demoAntarctica, demoArctic, demoSanya];
    DEMO_WISHES = demoWishes;
    DEMO_TOTAL = DEMO_PROMOTED.length + DEMO_WISHES.length;
  }
});

// js/store.js
var store_exports = {};
__export(store_exports, {
  EMOJIS: () => EMOJIS,
  LEDGER_CATEGORIES: () => LEDGER_CATEGORIES,
  STATUS: () => STATUS,
  STATUS_TEXT: () => STATUS_TEXT,
  addAlias: () => addAlias,
  addExpense: () => addExpense,
  addPhoto: () => addPhoto,
  bucketOf: () => bucketOf,
  canShare: () => canShare,
  categoryInfo: () => categoryInfo,
  clearDemo: () => clearDemo,
  compressImage: () => compressImage,
  createTrip: () => createTrip,
  curYm: () => curYm,
  deleteImage: () => deleteImage,
  deleteTrip: () => deleteTrip,
  demoSed: () => demoSed,
  exportBackup: () => exportBackup,
  getApp: () => getApp,
  getImageURL: () => getImageURL,
  getTrip: () => getTrip,
  hasDemo: () => hasDemo,
  hideFromWish: () => hideFromWish,
  importBackup: () => importBackup,
  ledgerSpent: () => ledgerSpent,
  load: () => load,
  loadDemo: () => loadDemo,
  promoteTrip: () => promoteTrip,
  putImageBlob: () => putImageBlob,
  reconcile: () => reconcile,
  removeExpense: () => removeExpense,
  removePhoto: () => removePhoto,
  save: () => save,
  saveShare: () => saveShare,
  seedDemo: () => seedDemo,
  setBudget: () => setBudget,
  setManualStatus: () => setManualStatus,
  setPhotoCaption: () => setPhotoCaption,
  shareConfig: () => shareConfig,
  shouldShowDemoBar: () => shouldShowDemoBar,
  todayStr: () => todayStr,
  tripProgress: () => tripProgress,
  tripState: () => tripState,
  uid: () => uid,
  updateTrip: () => updateTrip,
  wipeAll: () => wipeAll,
  yearSpent: () => yearSpent
});
function uid() {
  return "t_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 7);
}
function todayStr(d = /* @__PURE__ */ new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function curYm(d = /* @__PURE__ */ new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}
function parseD(s) {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, (m || 1) - 1, d || 1).getTime();
}
function clamp(n, a, b) {
  return Math.min(b, Math.max(a, n));
}
function clone(o) {
  return typeof structuredClone === "function" ? structuredClone(o) : JSON.parse(JSON.stringify(o));
}
function blank() {
  return {
    version: 1,
    trips: [],
    aliases: {},
    settings: { theme: "auto", seededEmoji: 0 },
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function normalizeTrip(t) {
  const o = {
    id: t.id || uid(),
    title: String(t.title || "未命名路书").slice(0, 60),
    cityRaw: String(t.cityRaw || ""),
    city: String(t.city || ""),
    region: String(t.region || "other"),
    manualStatus: t.manualStatus || null,
    promotedAt: t.promotedAt || null,
    wasWish: !!t.wasWish,
    wishHidden: !!t.wishHidden,
    demo: !!t.demo,
    dateMode: t.dateMode === "exact" || t.dateMode === "fuzzy" ? t.dateMode : "none",
    startDate: t.startDate || null,
    endDate: t.endDate || null,
    dateText: String(t.dateText || ""),
    roughYm: t.roughYm || null,
    cover: {
      emoji: t.cover?.emoji || EMOJI_POOL[0],
      tone: Number.isFinite(t.cover?.tone) ? clamp(t.cover.tone, 0, 7) : 6,
      imgId: t.cover?.imgId || null
    },
    brief: String(t.brief || ""),
    blocks: Array.isArray(t.blocks) ? t.blocks.map(normalizeBlock).filter(Boolean) : [],
    location: normalizeLocation(t.location),
    ledger: normalizeLedger(t.ledger),
    share: normalizeShare(t.share),
    source: t.source === "ai" ? "ai" : "manual",
    createdAt: t.createdAt || (/* @__PURE__ */ new Date()).toISOString(),
    updatedAt: t.updatedAt || (/* @__PURE__ */ new Date()).toISOString()
  };
  return o;
}
function normalizeLocation(loc) {
  if (!loc || typeof loc !== "object") return null;
  const lat = Number(loc.lat);
  const lng = Number(loc.lng);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null;
  return {
    lat: Number(lat.toFixed(5)),
    lng: Number(lng.toFixed(5)),
    name: String(loc.name || "").slice(0, 40)
  };
}
function categoryInfo(id) {
  return LEDGER_CATEGORIES.find((c) => c.id === id) || LEDGER_CATEGORIES[LEDGER_CATEGORIES.length - 1];
}
function normalizeLedger(l) {
  if (!l || typeof l !== "object") return { budget: 0, entries: [] };
  const entries = Array.isArray(l.entries) ? l.entries.map((e) => {
    if (!e || typeof e !== "object") return null;
    const amount = Math.round(Number(e.amount));
    if (!Number.isFinite(amount) || amount === 0) return null;
    const d = String(e.date || "");
    return {
      id: e.id || uid(),
      date: /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : todayStr(),
      title: String(e.title || "支出").slice(0, 40),
      amount,
      category: CATEGORY_IDS.has(e.category) ? e.category : "other"
    };
  }).filter(Boolean) : [];
  return {
    budget: Math.max(0, Math.round(Number(l.budget) || 0)),
    entries
  };
}
function ledgerSpent(trip) {
  return (trip.ledger?.entries || []).reduce((n, e) => n + e.amount, 0);
}
function yearSpent(trips, year = (/* @__PURE__ */ new Date()).getFullYear()) {
  const y = String(year);
  let total = 0;
  let count = 0;
  const tripIds = /* @__PURE__ */ new Set();
  const byCategory = {};
  for (const t of trips) {
    for (const e of t.ledger?.entries || []) {
      if ((e.date || "").slice(0, 4) !== y) continue;
      total += e.amount;
      count++;
      tripIds.add(t.id);
      byCategory[e.category] = (byCategory[e.category] || 0) + e.amount;
    }
  }
  return { year: Number(year), total, count, trips: tripIds.size, byCategory };
}
function addExpense(id, entry) {
  const t = getTrip(id);
  if (!t) return null;
  const next = normalizeLedger({
    budget: t.ledger?.budget || 0,
    entries: [...t.ledger?.entries || [], { ...entry, id: uid() }]
  });
  updateTrip(id, { ledger: next });
  return next;
}
function removeExpense(id, entryId) {
  const t = getTrip(id);
  if (!t) return null;
  const next = normalizeLedger({
    budget: t.ledger?.budget || 0,
    entries: (t.ledger?.entries || []).filter((e) => e.id !== entryId)
  });
  updateTrip(id, { ledger: next });
  return next;
}
function setBudget(id, budget) {
  const t = getTrip(id);
  if (!t) return null;
  const next = normalizeLedger({ budget, entries: t.ledger?.entries || [] });
  updateTrip(id, { ledger: next });
  return next;
}
function normalizeBlock(b) {
  if (!b || typeof b !== "object") return null;
  const type = ["text", "day", "todo", "link"].includes(b.type) ? b.type : "text";
  if (type === "todo") {
    const items = Array.isArray(b.items) ? b.items.map((i) => ({ t: String(i?.t ?? i ?? "").slice(0, 200), done: !!i?.done })).filter((i) => i.t) : [];
    return { type, title: String(b.title || "清单").slice(0, 80), items };
  }
  if (type === "link") {
    const url = String(b.url || b.text || "");
    if (!url) return null;
    return {
      type,
      title: String(b.title || "").slice(0, 80),
      url,
      body: String(b.body || "")
    };
  }
  if (type === "day") {
    return {
      type,
      day: Number(b.day) || 1,
      title: String(b.title || "").slice(0, 80),
      body: String(b.body || b.text || "").slice(0, 8e3),
      stops: Array.isArray(b.stops) ? b.stops.map(normalizeStop).filter(Boolean) : [],
      meals: Array.isArray(b.meals) ? b.meals.map(normalizeMeal).filter(Boolean) : [],
      photos: Array.isArray(b.photos) ? b.photos.map(normalizePhoto).filter(Boolean) : []
    };
  }
  return {
    type,
    title: String(b.title || "").slice(0, 80),
    body: String(b.body || b.text || "").slice(0, 8e3)
  };
}
function normalizeStop(s) {
  if (!s || typeof s !== "object") return null;
  const name = String(s.name || "").trim().slice(0, 40);
  if (!name) return null;
  const lat = Number(s.lat);
  const lng = Number(s.lng);
  const hasGeo = Number.isFinite(lat) && Number.isFinite(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
  let transit = null;
  if (s.transit && typeof s.transit === "object") {
    const mode = TRANSIT_MODES.has(s.transit.mode) ? s.transit.mode : "car";
    const minutes = Math.max(0, Math.round(Number(s.transit.minutes) || 0));
    if (minutes > 0 || s.transit.note) {
      transit = { mode, minutes, note: String(s.transit.note || "").slice(0, 60) };
    }
  }
  return {
    name,
    start: normTime(s.start),
    duration: Math.max(0, Math.round(Number(s.duration) || 0)),
    story: String(s.story || "").slice(0, 900),
    lat: hasGeo ? Number(lat.toFixed(5)) : null,
    lng: hasGeo ? Number(lng.toFixed(5)) : null,
    transit
  };
}
function normTime(v) {
  const str = String(v || "").trim();
  const m = str.match(/^(\d{1,2})[:：]?(\d{2})$/);
  if (!m) return "";
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h > 23 || min > 59) return "";
  return `${String(h).padStart(2, "0")}:${m[2]}`;
}
function normalizePhoto(p) {
  if (!p || typeof p !== "object") return null;
  const imgId = String(p.imgId || "");
  const demoSrc = String(p.demoSrc || "");
  if (!imgId && !demoSrc) return null;
  return {
    id: p.id || uid(),
    imgId: imgId || null,
    demoSrc: demoSrc || null,
    caption: String(p.caption || "").slice(0, 60),
    at: normTime(p.at)
  };
}
function nowTime() {
  const d = /* @__PURE__ */ new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}
async function addPhoto(tripId, blockIndex, file, caption = "") {
  const t = getTrip(tripId);
  const block = t?.blocks?.[blockIndex];
  if (!block || block.type !== "day") throw new Error("这一天不存在");
  const blob = await compressImage(file, 1600, 0.82);
  const imgId = await putImageBlob(blob);
  const photo = normalizePhoto({ imgId, caption, at: nowTime() });
  const photos = [...block.photos || [], photo];
  updateTrip(tripId, {
    blocks: t.blocks.map((b, i) => i === blockIndex ? { ...b, photos } : b)
  });
  return photo;
}
async function removePhoto(tripId, blockIndex, photoId) {
  const t = getTrip(tripId);
  const block = t?.blocks?.[blockIndex];
  if (!block?.photos?.length) return;
  const target = block.photos.find((p) => p.id === photoId);
  const photos = block.photos.filter((p) => p.id !== photoId);
  updateTrip(tripId, {
    blocks: t.blocks.map((b, i) => i === blockIndex ? { ...b, photos } : b)
  });
  if (target?.imgId) await deleteImage(target.imgId).catch(() => {
  });
}
function setPhotoCaption(tripId, blockIndex, photoId, caption) {
  const t = getTrip(tripId);
  const block = t?.blocks?.[blockIndex];
  if (!block?.photos?.length) return;
  const photos = block.photos.map(
    (p) => p.id === photoId ? { ...p, caption: String(caption || "").slice(0, 60) } : p
  );
  updateTrip(tripId, {
    blocks: t.blocks.map((b, i) => i === blockIndex ? { ...b, photos } : b)
  });
}
function normalizeMeal(m) {
  if (!m || typeof m !== "object") return null;
  const name = String(m.name || "").trim().slice(0, 40);
  if (!name) return null;
  const lat = Number(m.lat);
  const lng = Number(m.lng);
  const hasGeo = Number.isFinite(lat) && Number.isFinite(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
  return {
    type: MEAL_TYPES.has(m.type) ? m.type : "snack",
    start: normTime(m.start),
    name,
    note: String(m.note || "").slice(0, 60),
    lat: hasGeo ? Number(lat.toFixed(5)) : null,
    lng: hasGeo ? Number(lng.toFixed(5)) : null
  };
}
function load() {
  if (state) return state;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      state = {
        ...blank(),
        ...parsed,
        trips: Array.isArray(parsed.trips) ? parsed.trips.map(normalizeTrip) : [],
        aliases: parsed.aliases && typeof parsed.aliases === "object" ? parsed.aliases : {},
        settings: { ...blank().settings, ...parsed.settings || {} }
      };
      return state;
    }
  } catch (e) {
    console.warn("[路书] 读取失败，尝试备份", e);
    try {
      const bak = localStorage.getItem(BAK);
      if (bak) state = JSON.parse(bak);
    } catch (_) {
    }
  }
  if (!state) state = blank();
  return state;
}
function save() {
  const s = load();
  s.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
  try {
    const prev = localStorage.getItem(KEY);
    if (prev && prev !== JSON.stringify(s)) {
      localStorage.setItem(BAK, prev);
    }
    localStorage.setItem(KEY, JSON.stringify(s));
    return true;
  } catch (e) {
    console.error("[路书] 保存失败（可能存储已满）", e);
    throw new Error("保存失败：本地存储空间可能已满，请先导出备份并清理部分图片。");
  }
}
function getApp() {
  return load();
}
function getTrip(id) {
  return load().trips.find((t) => t.id === id) || null;
}
function tripState(trip, today = todayStr()) {
  if (trip.manualStatus) {
    return { status: trip.manualStatus, needsConfirm: false, reason: "manual" };
  }
  if (!trip.promotedAt) {
    return { status: STATUS.WISH, needsConfirm: false, reason: "wish" };
  }
  if (trip.dateMode === "exact" && trip.startDate) {
    const s = trip.startDate;
    const e = trip.endDate || null;
    if (e) {
      if (today > e) return { status: STATUS.DONE, needsConfirm: false, reason: "past-end" };
      if (today >= s) return { status: STATUS.ONGOING, needsConfirm: false, reason: "in-range" };
      return { status: STATUS.PLANNING, needsConfirm: false, reason: "before-start" };
    }
    if (today >= s) return { status: STATUS.ONGOING, needsConfirm: false, reason: "no-end" };
    return { status: STATUS.PLANNING, needsConfirm: false, reason: "before-start" };
  }
  if (trip.dateMode === "fuzzy" && trip.roughYm) {
    const now = curYm();
    if (now > trip.roughYm) {
      return { status: STATUS.PLANNING, needsConfirm: true, reason: "fuzzy-passed" };
    }
    if (now === trip.roughYm) {
      return { status: STATUS.ONGOING, needsConfirm: false, reason: "fuzzy-in-month" };
    }
    return { status: STATUS.PLANNING, needsConfirm: false, reason: "fuzzy-future" };
  }
  return { status: STATUS.PLANNING, needsConfirm: false, reason: "undated" };
}
function tripProgress(trip, today = todayStr()) {
  if (trip.dateMode !== "exact" || !trip.startDate || !trip.endDate) return null;
  const s = parseD(trip.startDate);
  const e = parseD(trip.endDate);
  const t = parseD(today);
  if (e < s) return null;
  const total = Math.round((e - s) / 864e5) + 1;
  const passed = Math.round((t - s) / 864e5) + 1;
  return {
    day: clamp(passed, 0, total),
    total,
    pct: clamp(Math.round(passed / total * 100), 0, 100),
    notStarted: t < s,
    ended: t > e
  };
}
function createTrip(partial = {}) {
  const s = load();
  const t = normalizeTrip({
    ...partial,
    id: uid(),
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  });
  s.trips.unshift(t);
  save();
  return t;
}
function updateTrip(id, patch) {
  const s = load();
  const i = s.trips.findIndex((t) => t.id === id);
  if (i < 0) return null;
  const merged = normalizeTrip({
    ...s.trips[i],
    ...patch,
    cover: { ...s.trips[i].cover, ...patch.cover || {} },
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  });
  s.trips[i] = merged;
  save();
  return merged;
}
function deleteTrip(id) {
  const s = load();
  const i = s.trips.findIndex((t) => t.id === id);
  if (i < 0) return false;
  const [removed] = s.trips.splice(i, 1);
  if (removed.cover?.imgId) deleteImage(removed.cover.imgId).catch(() => {
  });
  save();
  return true;
}
function promoteTrip(id) {
  return updateTrip(id, { promotedAt: (/* @__PURE__ */ new Date()).toISOString(), manualStatus: null, wasWish: true });
}
function setManualStatus(id, status) {
  if (status === STATUS.WISH) {
    return updateTrip(id, { manualStatus: null, promotedAt: null, wasWish: false, wishHidden: false });
  }
  return updateTrip(id, { manualStatus: status });
}
function hideFromWish(id, hidden = true) {
  return updateTrip(id, { wishHidden: hidden });
}
function normalizeShare(s) {
  if (!s || typeof s !== "object") return null;
  return {
    title: String(s.title || "").slice(0, 60),
    lead: String(s.lead || "").slice(0, 240),
    coverPhotoId: s.coverPhotoId || null,
    photoIds: Array.isArray(s.photoIds) ? s.photoIds.filter((x) => typeof x === "string").slice(0, 40) : [],
    showLedger: s.showLedger !== false,
    updatedAt: s.updatedAt || (/* @__PURE__ */ new Date()).toISOString()
  };
}
function canShare(trip) {
  return tripState(trip).status === STATUS.DONE;
}
function shareConfig(trip) {
  const allPhotos = (trip.blocks || []).filter((b) => b.type === "day").flatMap((b) => (b.photos || []).map((p) => ({ ...p, day: b.day })));
  if (trip.share) {
    return {
      ...trip.share,
      photoIds: trip.share.photoIds.length ? trip.share.photoIds : allPhotos.map((p) => p.id)
    };
  }
  return {
    title: trip.title,
    lead: trip.brief || "",
    coverPhotoId: allPhotos[0]?.id || null,
    photoIds: allPhotos.map((p) => p.id),
    showLedger: true,
    updatedAt: null
  };
}
function saveShare(tripId, patch) {
  const t = getTrip(tripId);
  if (!t) return null;
  const cur = shareConfig(t);
  const next = normalizeShare({ ...cur, ...patch, updatedAt: (/* @__PURE__ */ new Date()).toISOString() });
  updateTrip(tripId, { share: next });
  return next;
}
function loadDemo() {
  const s = load();
  if (s.trips.some((t) => t.demo)) return { added: 0, already: true };
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const stamp = (i) => new Date(Date.now() - i * 6e4).toISOString();
  const tripped = DEMO_PROMOTED.map((d, i) => normalizeTrip({
    ...d,
    demo: true,
    source: "manual",
    promotedAt: now,
    createdAt: stamp(i),
    updatedAt: now
  }));
  const wished = DEMO_WISHES.map((d, i) => normalizeTrip({
    ...d,
    demo: true,
    source: "manual",
    promotedAt: null,
    createdAt: stamp(i + 10),
    updatedAt: now
  }));
  s.trips = [...tripped, ...wished, ...s.trips];
  save();
  try {
    localStorage.setItem(SEED_FLAG, "1");
    localStorage.removeItem(CLEARED_FLAG);
  } catch (_) {
  }
  return { added: tripped.length + wished.length, already: false };
}
function seedDemo() {
  return loadDemo();
}
function demoSed() {
  try {
    return localStorage.getItem(SEED_FLAG) === "1";
  } catch (_) {
    return false;
  }
}
function hasDemo() {
  return load().trips.some((t) => t.demo);
}
function shouldShowDemoBar() {
  try {
    if (localStorage.getItem(CLEARED_FLAG) === "1") return false;
  } catch (_) {
  }
  return hasDemo();
}
function clearDemo() {
  const s = load();
  const before = s.trips.length;
  s.trips = s.trips.filter((t) => !t.demo);
  const removed = before - s.trips.length;
  save();
  try {
    localStorage.setItem(CLEARED_FLAG, "1");
  } catch (_) {
  }
  return removed;
}
function addAlias(raw, cityName) {
  const s = load();
  const k = String(raw || "").trim().toLowerCase();
  if (!k || !cityName) return;
  s.aliases[k] = cityName;
  save();
}
function bucketOf(trips, today = todayStr()) {
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
      if (t.wasWish && !t.wishHidden) wishDone.push(t);
    } else if (t.wasWish && !t.wishHidden) {
      wishDone.push(t);
      road.push(t);
    } else {
      road.push(t);
    }
  }
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
function openDB() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve2, reject) => {
    if (!("indexedDB" in window)) return resolve2(null);
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(DB_STORE)) db.createObjectStore(DB_STORE);
    };
    req.onsuccess = () => resolve2(req.result);
    req.onerror = () => reject(req.error);
  }).catch((e) => {
    console.warn("[路书] IndexedDB 不可用，图片功能降级", e);
    return null;
  });
  return dbPromise;
}
async function tx(mode, fn) {
  const db = await openDB();
  if (!db) return null;
  return new Promise((resolve2, reject) => {
    const t = db.transaction(DB_STORE, mode);
    const store = t.objectStore(DB_STORE);
    let out;
    try {
      out = fn(store);
    } catch (e) {
      reject(e);
      return;
    }
    t.oncomplete = () => resolve2(out && out.__req ? out.__req.result : out);
    t.onerror = () => reject(t.error);
    t.onabort = () => reject(t.error);
  });
}
async function putImageBlob(blob) {
  const id = "img_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 6);
  const ok = await tx("readwrite", (store) => {
    const req = store.put(blob, id);
    return { __req: req };
  });
  if (ok === null) throw new Error("当前浏览器不支持本地图片存储");
  return id;
}
async function getImageURL(id) {
  if (!id) return null;
  if (urlCache.has(id)) return urlCache.get(id);
  const blob = await tx("readonly", (store) => ({ __req: store.get(id) }));
  if (!blob) return null;
  const url = URL.createObjectURL(blob);
  urlCache.set(id, url);
  return url;
}
async function deleteImage(id) {
  if (!id) return;
  const u = urlCache.get(id);
  if (u) {
    URL.revokeObjectURL(u);
    urlCache.delete(id);
  }
  await tx("readwrite", (store) => ({ __req: store.delete(id) }));
}
function compressImage(file, maxSide = 1600, quality = 0.8) {
  return new Promise((resolve2, reject) => {
    if (!file || !/^image\//.test(file.type)) {
      reject(new Error("请选择图片文件"));
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
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, w, h);
      const tryTypes = ["image/webp", "image/jpeg"];
      let idx = 0;
      const attempt = () => {
        canvas.toBlob(
          (blob) => {
            if (blob && blob.type === tryTypes[idx]) return resolve2(blob);
            if (idx < tryTypes.length - 1) {
              idx++;
              return attempt();
            }
            resolve2(file);
          },
          tryTypes[idx],
          quality
        );
      };
      attempt();
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("图片读取失败"));
    };
    img.src = url;
  });
}
function blobToDataURL(blob) {
  return new Promise((resolve2) => {
    const r = new FileReader();
    r.onload = () => resolve2(r.result);
    r.onerror = () => resolve2(null);
    r.readAsDataURL(blob);
  });
}
function dataURLToBlob(dataURL) {
  const [head, b64] = String(dataURL).split(",");
  const mime = (head.match(/data:([^;]+)/) || [, "image/webp"])[1];
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return new Blob([arr], { type: mime });
}
async function exportBackup({ includeImages = true } = {}) {
  const s = load();
  const payload = {
    app: "lushu",
    version: 1,
    exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
    trips: clone(s.trips),
    aliases: clone(s.aliases),
    settings: clone(s.settings),
    _images: {}
  };
  if (includeImages) {
    const ids = [...new Set(s.trips.map((t) => t.cover?.imgId).filter(Boolean))];
    for (const id of ids) {
      const blob = await tx("readonly", (store) => ({ __req: store.get(id) }));
      if (blob) {
        const d = await blobToDataURL(blob);
        if (d) payload._images[id] = d;
      }
    }
  }
  return payload;
}
async function restoreImages(images, idMap) {
  for (const [oldId, dataURL] of Object.entries(images || {})) {
    try {
      const blob = dataURLToBlob(dataURL);
      const newId = await putImageBlob(blob);
      idMap[oldId] = newId;
    } catch (e) {
      console.warn("[路书] 恢复图片失败", oldId, e);
    }
  }
}
async function importBackup(payload, mode = "merge") {
  const s = load();
  if (!payload || !Array.isArray(payload.trips)) throw new Error("文件格式不正确，缺少 trips");
  const idMap = {};
  await restoreImages(payload._images, idMap);
  const incoming = payload.trips.map((t) => {
    const n = normalizeTrip(t);
    if (n.cover.imgId && idMap[n.cover.imgId]) n.cover.imgId = idMap[n.cover.imgId];
    return n;
  });
  let added = 0;
  if (mode === "replace") {
    s.trips = incoming;
    s.aliases = payload.aliases || {};
    added = incoming.length;
  } else {
    const seen = new Set(s.trips.map((t) => t.id));
    const titleSet = new Set(s.trips.map((t) => `${t.title}|${t.startDate || ""}`));
    for (const t of incoming) {
      if (seen.has(t.id) || titleSet.has(`${t.title}|${t.startDate || ""}`)) continue;
      s.trips.push(t);
      seen.add(t.id);
      titleSet.add(`${t.title}|${t.startDate || ""}`);
      added++;
    }
    if (payload.aliases) s.aliases = { ...payload.aliases, ...s.aliases };
  }
  save();
  return { added, replaced: mode === "replace" };
}
async function wipeAll() {
  const s = load();
  for (const t of s.trips) {
    if (t.cover?.imgId) await deleteImage(t.cover.imgId).catch(() => {
    });
  }
  state = blank();
  try {
    localStorage.removeItem(KEY);
    localStorage.removeItem(BAK);
  } catch (_) {
  }
  save();
}
async function reconcile() {
  const s = load();
  let touched = false;
  for (const t of s.trips) {
    if (t.startDate && t.endDate && t.startDate > t.endDate) {
      [t.startDate, t.endDate] = [t.endDate, t.startDate];
      touched = true;
    }
  }
  if (touched) save();
}
var KEY, BAK, EMOJI_POOL, state, LEDGER_CATEGORIES, CATEGORY_IDS, TRANSIT_MODES, MEAL_TYPES, STATUS, STATUS_TEXT, SEED_FLAG, CLEARED_FLAG, DB_NAME, DB_STORE, dbPromise, urlCache, EMOJIS;
var init_store = __esm({
  "js/store.js"() {
    init_demo_data();
    KEY = "lushu.v1";
    BAK = "lushu.v1.bak";
    EMOJI_POOL = ["📍", "🧊", "🏝️", "🏔️", "🏜️", "🌊", "🌃", "🏯", "🕌", "🗽", "🏰", "🌿", "🦁", "🐨", "🌋", "🚂", "⛵", "🎡", "🗺️", "🌅", "❄️", "🍜", "🎿", "🏖️", "🌌", "♨️", "🌾", "🛶", "🚐", "⛩️", "🐧", "✨", "🏺", "🚡"];
    state = null;
    LEDGER_CATEGORIES = [
      { id: "transport", name: "交通", emoji: "✈️" },
      { id: "stay", name: "住宿", emoji: "🏨" },
      { id: "food", name: "餐饮", emoji: "🍜" },
      { id: "ticket", name: "门票", emoji: "🎫" },
      { id: "shopping", name: "购物", emoji: "🛍️" },
      { id: "other", name: "其他", emoji: "📦" }
    ];
    CATEGORY_IDS = new Set(LEDGER_CATEGORIES.map((c) => c.id));
    TRANSIT_MODES = /* @__PURE__ */ new Set(["walk", "bus", "metro", "taxi", "car", "boat", "train", "flight"]);
    MEAL_TYPES = /* @__PURE__ */ new Set(["breakfast", "lunch", "dinner", "snack"]);
    STATUS = {
      WISH: "wish",
      PLANNING: "planning",
      ONGOING: "ongoing",
      DONE: "done"
    };
    STATUS_TEXT = {
      wish: "想去",
      planning: "即将出发",
      ongoing: "进行中",
      done: "已结束"
    };
    SEED_FLAG = "lushu.demoSeeded";
    CLEARED_FLAG = "lushu.demoCleared";
    DB_NAME = "lushu-db";
    DB_STORE = "imgs";
    dbPromise = null;
    urlCache = /* @__PURE__ */ new Map();
    EMOJIS = EMOJI_POOL;
  }
});

// js/app.js
init_store();

// js/views.js
init_store();

// js/maps.js
var PI = Math.PI;
var A = 6378245;
var EE = 0.006693421622965943;
var inChina = (lat, lng) => lng > 73.66 && lng < 135.05 && lat > 3.86 && lat < 53.55;
function tLat(x, y) {
  let r = -100 + 2 * x + 3 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
  r += (20 * Math.sin(6 * x * PI) + 20 * Math.sin(2 * x * PI)) * 2 / 3;
  r += (20 * Math.sin(y * PI) + 40 * Math.sin(y / 3 * PI)) * 2 / 3;
  r += (160 * Math.sin(y / 12 * PI) + 320 * Math.sin(y * PI / 30)) * 2 / 3;
  return r;
}
function tLng(x, y) {
  let r = 300 + x + 2 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
  r += (20 * Math.sin(6 * x * PI) + 20 * Math.sin(2 * x * PI)) * 2 / 3;
  r += (20 * Math.sin(x * PI) + 40 * Math.sin(x / 3 * PI)) * 2 / 3;
  r += (150 * Math.sin(x / 12 * PI) + 300 * Math.sin(x / 30 * PI)) * 2 / 3;
  return r;
}
function wgs84ToGcj02(lat, lng) {
  if (!inChina(lat, lng)) return { lat, lng };
  const dLatRaw = tLat(lng - 105, lat - 35);
  const dLngRaw = tLng(lng - 105, lat - 35);
  const radLat = lat / 180 * PI;
  let magic = Math.sin(radLat);
  magic = 1 - EE * magic * magic;
  const sqrtMagic = Math.sqrt(magic);
  const dLat = dLatRaw * 180 / (A * (1 - EE) / (magic * sqrtMagic) * PI);
  const dLng = dLngRaw * 180 / (A / sqrtMagic * Math.cos(radLat) * PI);
  return { lat: lat + dLat, lng: lng + dLng };
}
function gcj02ToBd09(lat, lng) {
  const z = Math.sqrt(lng * lng + lat * lat) + 2e-5 * Math.sin(lat * PI * 3e3 / 180);
  const theta = Math.atan2(lat, lng) + 3e-6 * Math.cos(lng * PI * 3e3 / 180);
  return { lat: z * Math.sin(theta) + 6e-3, lng: z * Math.cos(theta) + 65e-4 };
}
var MAP_PROVIDERS = [
  { id: "amap", name: "高德地图", short: "高德" },
  { id: "baidu", name: "百度地图", short: "百度" },
  { id: "apple", name: "Apple 地图", short: "Apple" },
  { id: "google", name: "Google 地图", short: "Google" }
];
var KEY2 = "lushu.mapProvider";
function readChoice() {
  try {
    const v = localStorage.getItem(KEY2);
    return MAP_PROVIDERS.some((p) => p.id === v) ? v : null;
  } catch (_) {
    return null;
  }
}
function rememberChoice(id) {
  try {
    localStorage.setItem(KEY2, id);
  } catch (_) {
  }
}
function mapUrl(provider, loc) {
  if (!loc) return "";
  const { lat, lng } = loc;
  const name = loc.name || "目的地";
  const label = encodeURIComponent(name);
  const cn = inChina(lat, lng);
  const gcj = cn ? wgs84ToGcj02(lat, lng) : { lat, lng };
  switch (provider) {
    case "amap":
      return `https://uri.amap.com/marker?position=${gcj.lng.toFixed(5)},${gcj.lat.toFixed(5)}&name=${label}&coordinate=gaode&callnative=1&src=lushu`;
    case "baidu": {
      const p = cn ? gcj02ToBd09(gcj.lat, gcj.lng) : gcj;
      return `https://api.map.baidu.com/marker?location=${p.lat.toFixed(5)},${p.lng.toFixed(5)}&title=${label}&content=${label}&output=html&coord_type=bd09ll&src=webapp.lushu`;
    }
    case "apple":
      return `https://maps.apple.com/?ll=${gcj.lat.toFixed(5)},${gcj.lng.toFixed(5)}&q=${label}`;
    case "google":
      return `https://www.google.com/maps/search/?api=1&query=${lat.toFixed(5)},${lng.toFixed(5)}`;
    default:
      return `https://uri.amap.com/marker?position=${gcj.lng.toFixed(5)},${gcj.lat.toFixed(5)}&name=${label}`;
  }
}
function coordText(loc) {
  return `${loc.lat.toFixed(5)}, ${loc.lng.toFixed(5)}`;
}

// js/cities.js
var REGIONS = {
  "cn-north": { name: "中国 · 华北", short: "华北", emoji: "🏯", tone: 5 },
  "cn-east": { name: "中国 · 华东", short: "华东", emoji: "🌉", tone: 3 },
  "cn-south": { name: "中国 · 华南", short: "华南", emoji: "🌴", tone: 2 },
  "cn-central": { name: "中国 · 华中", short: "华中", emoji: "⛰️", tone: 5 },
  "cn-southwest": { name: "中国 · 西南", short: "西南", emoji: "🏔️", tone: 0 },
  "cn-northwest": { name: "中国 · 西北", short: "西北", emoji: "🏜️", tone: 1 },
  "cn-northeast": { name: "中国 · 东北", short: "东北", emoji: "❄️", tone: 6 },
  "cn-hkmo": { name: "中国 · 港澳", short: "港澳", emoji: "🌃", tone: 4 },
  "cn-tw": { name: "中国 · 台湾", short: "台湾", emoji: "🏝️", tone: 7 },
  "asia-se": { name: "亚洲 · 东南亚", short: "东南亚", emoji: "🛶", tone: 2 },
  "asia-e": { name: "亚洲 · 东亚", short: "东亚", emoji: "⛩️", tone: 7 },
  "asia-s": { name: "亚洲 · 南亚", short: "南亚", emoji: "🕌", tone: 1 },
  "asia-w": { name: "亚洲 · 西亚中亚", short: "西亚", emoji: "🕍", tone: 1 },
  "europe": { name: "欧洲", short: "欧洲", emoji: "🏰", tone: 4 },
  "namerica": { name: "北美洲", short: "北美", emoji: "🗽", tone: 3 },
  "samerica": { name: "拉丁美洲", short: "拉美", emoji: "🌿", tone: 2 },
  "africa": { name: "非洲", short: "非洲", emoji: "🦁", tone: 1 },
  "oceania": { name: "大洋洲", short: "大洋洲", emoji: "🐨", tone: 3 },
  "polar": { name: "极地", short: "极地", emoji: "🧊", tone: 0 },
  "other": { name: "其他", short: "其他", emoji: "📍", tone: 6 }
};
var RAW = [
  // ---------- 中国 · 华北 ----------
  ["北京", "cn-north", "京城,帝都,北平,beijing"],
  ["天津", "cn-north", "津门,tianjin"],
  ["石家庄", "cn-north", ""],
  ["承德", "cn-north", "避暑山庄"],
  ["秦皇岛", "cn-north", "北戴河,阿那亚"],
  ["张家口", "cn-north", "崇礼,草原天路,太舞"],
  ["大同", "cn-north", "云冈石窟,悬空寺"],
  ["平遥", "cn-north", "平遥古城"],
  ["五台山", "cn-north", ""],
  ["太原", "cn-north", ""],
  ["呼和浩特", "cn-north", "呼市"],
  ["呼伦贝尔", "cn-north", "呼伦贝尔草原,海拉尔"],
  ["鄂尔多斯", "cn-north", "响沙湾"],
  ["锡林郭勒", "cn-north", ""],
  ["阿尔山", "cn-north", ""],
  ["满洲里", "cn-north", ""],
  ["乌兰哈达", "cn-north", "火山"],
  // ---------- 中国 · 华东 ----------
  ["上海", "cn-east", "魔都,沪,申城,shanghai,外滩,陆家嘴"],
  ["南京", "cn-east", "金陵,六朝古都"],
  ["苏州", "cn-east", "姑苏,园林,周庄,同里"],
  ["杭州", "cn-east", "西湖,临安,hangzhou"],
  ["无锡", "cn-east", "鼋头渚"],
  ["扬州", "cn-east", "瘦西湖"],
  ["常州", "cn-east", ""],
  ["徐州", "cn-east", ""],
  ["黄山", "cn-east", "宏村,西递,屯溪"],
  ["合肥", "cn-east", ""],
  ["九华山", "cn-east", ""],
  ["天柱山", "cn-east", ""],
  ["厦门", "cn-east", "鼓浪屿,曾厝垵,思明"],
  ["福州", "cn-east", "三坊七巷"],
  ["泉州", "cn-east", ""],
  ["武夷山", "cn-east", ""],
  ["泰宁", "cn-east", ""],
  ["南昌", "cn-east", ""],
  ["景德镇", "cn-east", ""],
  ["婺源", "cn-east", "篁岭"],
  ["庐山", "cn-east", ""],
  ["三清山", "cn-east", ""],
  ["井冈山", "cn-east", ""],
  ["济南", "cn-east", "泉城"],
  ["青岛", "cn-east", "栈桥,崂山"],
  ["淄博", "cn-east", "八大局,烧烤,周村"],
  ["烟台", "cn-east", "蓬莱"],
  ["威海", "cn-east", ""],
  ["潍坊", "cn-east", ""],
  ["义乌", "cn-east", "小商品"],
  ["泰山", "cn-east", "泰安"],
  ["曲阜", "cn-east", "三孔"],
  ["潍坊", "cn-east", ""],
  ["日照", "cn-east", ""],
  ["舟山", "cn-east", "普陀山,东极岛,嵊泗"],
  ["乌镇", "cn-east", ""],
  ["西塘", "cn-east", ""],
  ["莫干山", "cn-east", ""],
  ["千岛湖", "cn-east", ""],
  ["雁荡山", "cn-east", ""],
  ["宁波", "cn-east", ""],
  ["绍兴", "cn-east", ""],
  ["温州", "cn-east", ""],
  ["台州", "cn-east", ""],
  ["丽水", "cn-east", "松阳,云和"],
  ["湖州", "cn-east", "南浔"],
  ["衢州", "cn-east", ""],
  // ---------- 中国 · 华南 ----------
  ["广州", "cn-south", "羊城,花城,guangzhou"],
  ["深圳", "cn-south", "鹏城,shenzhen"],
  ["珠海", "cn-south", ""],
  ["佛山", "cn-south", "顺德"],
  ["中山", "cn-south", ""],
  ["江门", "cn-south", "开平碉楼"],
  ["惠州", "cn-south", "巽寮湾"],
  ["汕尾", "cn-south", ""],
  ["汕头", "cn-south", "南澳岛"],
  ["潮州", "cn-south", ""],
  ["梅州", "cn-south", ""],
  ["韶关", "cn-south", "丹霞山"],
  ["桂林", "cn-south", "阳朔,漓江,象鼻山"],
  ["北海", "cn-south", "涠洲岛"],
  ["南宁", "cn-south", ""],
  ["德天瀑布", "cn-south", ""],
  ["巴马", "cn-south", ""],
  ["柳州", "cn-south", ""],
  ["三亚", "cn-south", "海棠湾,亚龙湾,蜈支洲岛"],
  ["海口", "cn-south", ""],
  ["万宁", "cn-south", "日月湾,石梅湾"],
  ["文昌", "cn-south", ""],
  ["琼海", "cn-south", "博鳌"],
  ["五指山", "cn-south", ""],
  // ---------- 中国 · 华中 ----------
  ["郑州", "cn-central", ""],
  ["开封", "cn-central", "清明上河园"],
  ["洛阳", "cn-central", "龙门石窟,老君山"],
  ["少林寺", "cn-central", "嵩山"],
  ["云台山", "cn-central", "焦作"],
  ["安阳", "cn-central", "殷墟"],
  ["武汉", "cn-central", "江城,wuhan,黄鹤楼"],
  ["宜昌", "cn-central", "三峡"],
  ["恩施", "cn-central", ""],
  ["神农架", "cn-central", ""],
  ["襄阳", "cn-central", ""],
  ["荆州", "cn-central", ""],
  ["十堰", "cn-central", "武当山"],
  ["长沙", "cn-central", "星城,changsha,橘子洲"],
  ["张家界", "cn-central", "武陵源,天门山"],
  ["凤凰", "cn-central", "凤凰古城"],
  ["芙蓉镇", "cn-central", ""],
  ["岳阳", "cn-central", "洞庭湖"],
  ["衡山", "cn-central", "南岳"],
  ["郴州", "cn-central", "东江湖"],
  ["常德", "cn-central", "桃花源"],
  ["许昌", "cn-central", "胖东来"],
  // ---------- 中国 · 西南 ----------
  ["成都", "cn-southwest", "蓉城,天府,chengdu,大熊猫"],
  ["九寨沟", "cn-southwest", ""],
  ["黄龙", "cn-southwest", ""],
  ["峨眉山", "cn-southwest", ""],
  ["乐山", "cn-southwest", "大佛"],
  ["都江堰", "cn-southwest", ""],
  ["青城山", "cn-southwest", ""],
  ["稻城亚丁", "cn-southwest", "稻城,亚丁"],
  ["色达", "cn-southwest", ""],
  ["四姑娘山", "cn-southwest", ""],
  ["康定", "cn-southwest", ""],
  ["理塘", "cn-southwest", ""],
  ["泸沽湖", "cn-southwest", ""],
  ["西昌", "cn-southwest", ""],
  ["重庆", "cn-southwest", "渝,山城,chongqing,洪崖洞"],
  ["武隆", "cn-southwest", ""],
  ["大足", "cn-southwest", ""],
  ["丽江", "cn-southwest", "古城,玉龙雪山"],
  ["大理", "cn-southwest", "洱海,苍山"],
  ["香格里拉", "cn-southwest", "迪庆"],
  ["昆明", "cn-southwest", "春城"],
  ["西双版纳", "cn-southwest", "景洪,版纳"],
  ["腾冲", "cn-southwest", ""],
  ["元阳", "cn-southwest", "梯田"],
  ["普者黑", "cn-southwest", ""],
  ["建水", "cn-southwest", ""],
  ["梅里雪山", "cn-southwest", "雨崩,德钦"],
  ["拉萨", "cn-southwest", "布达拉宫,西藏"],
  ["日喀则", "cn-southwest", ""],
  ["林芝", "cn-southwest", "桃花"],
  ["珠峰大本营", "cn-southwest", "珠穆朗玛"],
  ["阿里", "cn-southwest", "冈仁波齐"],
  ["纳木错", "cn-southwest", ""],
  ["羊卓雍措", "cn-southwest", "羊湖"],
  ["山南", "cn-southwest", ""],
  ["墨脱", "cn-southwest", ""],
  ["然乌湖", "cn-southwest", ""],
  ["榕江", "cn-southwest", "村超"],
  // ---------- 中国 · 西北 ----------
  ["西安", "cn-northwest", "长安,xian,兵马俑,古城"],
  ["华山", "cn-northwest", ""],
  ["延安", "cn-northwest", ""],
  ["汉中", "cn-northwest", ""],
  ["宝鸡", "cn-northwest", "太白山"],
  ["兰州", "cn-northwest", ""],
  ["敦煌", "cn-northwest", "莫高窟,鸣沙山,月牙泉"],
  ["张掖", "cn-northwest", "丹霞,七彩丹霞"],
  ["嘉峪关", "cn-northwest", ""],
  ["酒泉", "cn-northwest", ""],
  ["青海湖", "cn-northwest", ""],
  ["茶卡盐湖", "cn-northwest", ""],
  ["西宁", "cn-northwest", "塔尔寺"],
  ["祁连", "cn-northwest", ""],
  ["门源", "cn-northwest", "油菜花"],
  ["德令哈", "cn-northwest", ""],
  ["格尔木", "cn-northwest", ""],
  ["可可西里", "cn-northwest", ""],
  ["银川", "cn-northwest", "西夏王陵"],
  ["中卫", "cn-northwest", "沙坡头"],
  ["天水", "cn-northwest", "麦积山,麻辣烫"],
  ["乌鲁木齐", "cn-northwest", "乌市,新疆"],
  ["喀什", "cn-northwest", "古城"],
  ["伊犁", "cn-northwest", "那拉提,赛里木湖,喀拉峻"],
  ["喀纳斯", "cn-northwest", "禾木,白哈巴"],
  ["吐鲁番", "cn-northwest", "火焰山,吐峪沟"],
  ["库车", "cn-northwest", "克孜利亚"],
  ["阿勒泰", "cn-northwest", "可可托海"],
  ["巴音布鲁克", "cn-northwest", "九曲十八弯"],
  ["哈密", "cn-northwest", ""],
  // ---------- 中国 · 东北 ----------
  ["沈阳", "cn-northeast", ""],
  ["大连", "cn-northeast", ""],
  ["哈尔滨", "cn-northeast", "冰城,中央大街"],
  ["雪乡", "cn-northeast", ""],
  ["漠河", "cn-northeast", "北极村"],
  ["长白山", "cn-northeast", ""],
  ["延吉", "cn-northeast", "图们"],
  ["丹东", "cn-northeast", ""],
  ["长春", "cn-northeast", ""],
  ["吉林", "cn-northeast", "雾凇岛"],
  ["五大连池", "cn-northeast", ""],
  ["伊春", "cn-northeast", ""],
  ["镜泊湖", "cn-northeast", ""],
  // ---------- 中国 · 港澳 ----------
  ["中国香港", "cn-hkmo", "香港,hongkong,hk,港岛,九龙"],
  ["中国澳门", "cn-hkmo", "澳门,macau,macao,氹仔"],
  // ---------- 中国 · 台湾 ----------
  ["中国台湾", "cn-tw", "台湾,taiwan"],
  ["台北", "cn-tw", "九份,士林夜市"],
  ["高雄", "cn-tw", ""],
  ["台中", "cn-tw", ""],
  ["台南", "cn-tw", ""],
  ["垦丁", "cn-tw", ""],
  ["花莲", "cn-tw", "太鲁阁"],
  ["台东", "cn-tw", "绿岛,兰屿"],
  ["阿里山", "cn-tw", ""],
  ["日月潭", "cn-tw", ""],
  ["澎湖", "cn-tw", ""],
  // ---------- 亚洲 · 东南亚 ----------
  ["泰国", "asia-se", "泰国,Thailand"],
  ["曼谷", "asia-se", "bangkok"],
  ["清迈", "asia-se", "清莱"],
  ["普吉", "asia-se", "普吉岛,phuket"],
  ["苏梅岛", "asia-se", ""],
  ["甲米", "asia-se", ""],
  ["芭提雅", "asia-se", ""],
  ["皮皮岛", "asia-se", ""],
  ["越南", "asia-se", "vietnam"],
  ["河内", "asia-se", ""],
  ["胡志明市", "asia-se", "西贡"],
  ["岘港", "asia-se", ""],
  ["会安", "asia-se", ""],
  ["芽庄", "asia-se", ""],
  ["下龙湾", "asia-se", ""],
  ["富国岛", "asia-se", ""],
  ["柬埔寨", "asia-se", "cambodia"],
  ["暹粒", "asia-se", "吴哥窟"],
  ["金边", "asia-se", ""],
  ["老挝", "asia-se", "laos"],
  ["琅勃拉邦", "asia-se", ""],
  ["缅甸", "asia-se", "myanmar"],
  ["蒲甘", "asia-se", ""],
  ["曼德勒", "asia-se", ""],
  ["仰光", "asia-se", ""],
  ["马来西亚", "asia-se", "malaysia,大马"],
  ["吉隆坡", "asia-se", ""],
  ["槟城", "asia-se", ""],
  ["兰卡威", "asia-se", ""],
  ["沙巴", "asia-se", "亚庇,仙本那"],
  ["马六甲", "asia-se", ""],
  ["新加坡", "asia-se", "singapore,狮城"],
  ["印度尼西亚", "asia-se", "印尼,indonesia"],
  ["巴厘岛", "asia-se", "bali"],
  ["雅加达", "asia-se", ""],
  ["日惹", "asia-se", ""],
  ["龙目岛", "asia-se", ""],
  ["科莫多", "asia-se", ""],
  ["菲律宾", "asia-se", "philippines"],
  ["马尼拉", "asia-se", ""],
  ["长滩岛", "asia-se", ""],
  ["宿务", "asia-se", ""],
  ["巴拉望", "asia-se", "爱妮岛,科隆"],
  ["薄荷岛", "asia-se", ""],
  ["文莱", "asia-se", ""],
  // ---------- 亚洲 · 东亚 ----------
  ["日本", "asia-e", "japan,日本国"],
  ["东京", "asia-e", "tokyo,银座,涩谷,新宿"],
  ["大阪", "asia-e", "osaka,心斋桥"],
  ["京都", "asia-e", "kyoto,清水寺,岚山"],
  ["奈良", "asia-e", ""],
  ["神户", "asia-e", ""],
  ["北海道", "asia-e", "hokkaido"],
  ["札幌", "asia-e", ""],
  ["小樽", "asia-e", ""],
  ["函馆", "asia-e", ""],
  ["富良野", "asia-e", "美瑛"],
  ["冲绳", "asia-e", "okinawa,琉球"],
  ["名古屋", "asia-e", ""],
  ["福冈", "asia-e", "九州"],
  ["广岛", "asia-e", ""],
  ["鹿儿岛", "asia-e", ""],
  ["横滨", "asia-e", ""],
  ["镰仓", "asia-e", ""],
  ["富士山", "asia-e", "河口湖,箱根"],
  ["白川乡", "asia-e", ""],
  ["金泽", "asia-e", ""],
  ["直岛", "asia-e", "濑户内海"],
  ["韩国", "asia-e", "korea,南韩"],
  ["首尔", "asia-e", "seoul,汉城"],
  ["釜山", "asia-e", ""],
  ["济州岛", "asia-e", "济州"],
  ["仁川", "asia-e", ""],
  ["庆州", "asia-e", ""],
  ["蒙古", "asia-e", "乌兰巴托"],
  // ---------- 亚洲 · 南亚 ----------
  ["印度", "asia-s", "india"],
  ["新德里", "asia-s", "德里"],
  ["孟买", "asia-s", ""],
  ["斋浦尔", "asia-s", ""],
  ["瓦拉纳西", "asia-s", ""],
  ["果阿", "asia-s", ""],
  ["斯里兰卡", "asia-s", "srilanka"],
  ["科伦坡", "asia-s", ""],
  ["康提", "asia-s", ""],
  ["尼泊尔", "asia-s", "nepal"],
  ["加德满都", "asia-s", ""],
  ["博卡拉", "asia-s", ""],
  ["马尔代夫", "asia-s", "maldives,马代"],
  ["不丹", "asia-s", "bhutan"],
  ["巴基斯坦", "asia-s", ""],
  // ---------- 亚洲 · 西亚中亚 ----------
  ["土耳其", "asia-w", "turkey,土国"],
  ["伊斯坦布尔", "asia-w", ""],
  ["卡帕多奇亚", "asia-w", "格雷梅"],
  ["棉花堡", "asia-w", ""],
  ["安塔利亚", "asia-w", ""],
  ["以色列", "asia-w", ""],
  ["耶路撒冷", "asia-w", ""],
  ["约旦", "asia-w", ""],
  ["佩特拉", "asia-w", ""],
  ["死海", "asia-w", ""],
  ["阿联酋", "asia-w", "uae"],
  ["迪拜", "asia-w", "dubai"],
  ["阿布扎比", "asia-w", ""],
  ["沙特阿拉伯", "asia-w", "沙特"],
  ["伊朗", "asia-w", "波斯"],
  ["伊斯法罕", "asia-w", ""],
  ["哈萨克斯坦", "asia-w", "阿拉木图"],
  ["乌兹别克斯坦", "asia-w", "撒马尔罕,塔什干,布哈拉"],
  ["格鲁吉亚", "asia-w", "第比利斯"],
  ["亚美尼亚", "asia-w", "埃里温"],
  ["阿塞拜疆", "asia-w", "巴库"],
  ["黎巴嫩", "asia-w", "贝鲁特"],
  // ---------- 欧洲 ----------
  ["英国", "europe", "uk,英格兰,大不列颠"],
  ["伦敦", "europe", "london"],
  ["爱丁堡", "europe", "苏格兰"],
  ["爱尔兰", "europe", "都柏林"],
  ["法国", "europe", "france"],
  ["巴黎", "europe", "paris,埃菲尔"],
  ["普罗旺斯", "europe", "薰衣草"],
  ["尼斯", "europe", "蔚蓝海岸"],
  ["马赛", "europe", ""],
  ["里昂", "europe", ""],
  ["波尔多", "europe", ""],
  ["圣米歇尔山", "europe", ""],
  ["德国", "europe", "germany"],
  ["柏林", "europe", ""],
  ["慕尼黑", "europe", ""],
  ["法兰克福", "europe", ""],
  ["科隆", "europe", ""],
  ["海德堡", "europe", ""],
  ["新天鹅堡", "europe", ""],
  ["黑森林", "europe", ""],
  ["意大利", "europe", "italy"],
  ["罗马", "europe", "rome"],
  ["米兰", "europe", ""],
  ["威尼斯", "europe", "venice"],
  ["佛罗伦萨", "europe", "翡冷翠"],
  ["托斯卡纳", "europe", ""],
  ["那不勒斯", "europe", ""],
  ["阿马尔菲", "europe", ""],
  ["西西里", "europe", ""],
  ["五渔村", "europe", ""],
  ["西班牙", "europe", "spain"],
  ["马德里", "europe", ""],
  ["巴塞罗那", "europe", "高迪"],
  ["塞维利亚", "europe", ""],
  ["格拉纳达", "europe", "阿尔罕布拉"],
  ["瓦伦西亚", "europe", ""],
  ["葡萄牙", "europe", "portugal"],
  ["里斯本", "europe", ""],
  ["波尔图", "europe", ""],
  ["荷兰", "europe", "netherlands,尼德兰"],
  ["阿姆斯特丹", "europe", ""],
  ["鹿特丹", "europe", ""],
  ["羊角村", "europe", ""],
  ["比利时", "europe", "belgium"],
  ["布鲁塞尔", "europe", ""],
  ["布鲁日", "europe", ""],
  ["卢森堡", "europe", ""],
  ["瑞士", "europe", "switzerland"],
  ["苏黎世", "europe", ""],
  ["日内瓦", "europe", ""],
  ["因特拉肯", "europe", "少女峰"],
  ["卢塞恩", "europe", "琉森"],
  ["采尔马特", "europe", "马特洪峰"],
  ["奥地利", "europe", "austria"],
  ["维也纳", "europe", ""],
  ["萨尔茨堡", "europe", ""],
  ["哈尔施塔特", "europe", ""],
  ["捷克", "europe", "czech"],
  ["布拉格", "europe", ""],
  ["克鲁姆洛夫", "europe", "CK小镇"],
  ["波兰", "europe", ""],
  ["华沙", "europe", ""],
  ["克拉科夫", "europe", ""],
  ["匈牙利", "europe", "布达佩斯"],
  ["斯洛伐克", "europe", ""],
  ["斯洛文尼亚", "europe", "布莱德湖"],
  ["克罗地亚", "europe", "杜布罗夫尼克"],
  ["塞尔维亚", "europe", "贝尔格莱德"],
  ["波黑", "europe", "萨拉热窝"],
  ["黑山", "europe", "科托尔"],
  ["阿尔巴尼亚", "europe", ""],
  ["希腊", "europe", "greece"],
  ["雅典", "europe", ""],
  ["圣托里尼", "europe", ""],
  ["米克诺斯", "europe", ""],
  ["保加利亚", "europe", ""],
  ["罗马尼亚", "europe", ""],
  ["丹麦", "europe", "哥本哈根"],
  ["瑞典", "europe", "斯德哥尔摩"],
  ["挪威", "europe", "norway,奥斯陆,卑尔根,罗弗敦"],
  ["芬兰", "europe", "赫尔辛基,罗瓦涅米,拉普兰"],
  ["特罗姆瑟", "europe", "tromso,极光之城"],
  ["冰岛", "europe", "iceland,雷克雅未克,蓝湖"],
  ["爱沙尼亚", "europe", "塔林"],
  ["拉脱维亚", "europe", "里加"],
  ["立陶宛", "europe", "维尔纽斯"],
  ["俄罗斯", "europe", "russia,俄国"],
  ["莫斯科", "europe", ""],
  ["圣彼得堡", "europe", ""],
  ["贝加尔湖", "europe", "伊尔库茨克"],
  ["海参崴", "europe", "符拉迪沃斯托克"],
  ["摩尔曼斯克", "europe", "科拉半岛"],
  ["马耳他", "europe", ""],
  ["塞浦路斯", "europe", ""],
  // ---------- 北美洲 ----------
  ["美国", "namerica", "usa,美利坚"],
  ["纽约", "namerica", "newyork,曼哈顿"],
  ["洛杉矶", "namerica", "la,好莱坞"],
  ["旧金山", "namerica", "三藩市,硅谷"],
  ["拉斯维加斯", "namerica", "vegas"],
  ["大峡谷", "namerica", ""],
  ["黄石", "namerica", "黄石公园"],
  ["优胜美地", "namerica", ""],
  ["西雅图", "namerica", ""],
  ["芝加哥", "namerica", ""],
  ["波士顿", "namerica", ""],
  ["华盛顿", "namerica", ""],
  ["迈阿密", "namerica", ""],
  ["奥兰多", "namerica", "迪士尼世界"],
  ["夏威夷", "namerica", "檀香山,火奴鲁鲁"],
  ["阿拉斯加", "namerica", ""],
  ["塞班", "namerica", ""],
  ["关岛", "namerica", ""],
  ["新奥尔良", "namerica", ""],
  ["加拿大", "namerica", "canada"],
  ["多伦多", "namerica", ""],
  ["温哥华", "namerica", ""],
  ["蒙特利尔", "namerica", ""],
  ["班夫", "namerica", "露易丝湖"],
  ["贾斯珀", "namerica", ""],
  ["魁北克", "namerica", ""],
  ["墨西哥", "namerica", "mexico"],
  ["坎昆", "namerica", ""],
  ["图卢姆", "namerica", ""],
  ["古巴", "namerica", "哈瓦那"],
  ["巴哈马", "namerica", ""],
  // ---------- 拉丁美洲 ----------
  ["秘鲁", "samerica", "peru"],
  ["马丘比丘", "samerica", "库斯科,利马"],
  ["玻利维亚", "samerica", "乌尤尼"],
  ["智利", "samerica", "chile,圣地亚哥,复活节岛,百内"],
  ["阿根廷", "samerica", "argentina"],
  ["布宜诺斯艾利斯", "samerica", ""],
  ["乌斯怀亚", "samerica", "世界尽头,南极门户"],
  ["埃尔卡拉法特", "samerica", "莫雷诺冰川"],
  ["巴西", "samerica", "brazil"],
  ["里约热内卢", "samerica", ""],
  ["圣保罗", "samerica", ""],
  ["亚马逊", "samerica", "亚马逊雨林"],
  ["哥伦比亚", "samerica", "波哥大,麦德林"],
  ["厄瓜多尔", "samerica", "加拉帕戈斯"],
  ["哥斯达黎加", "samerica", ""],
  ["巴拿马", "samerica", ""],
  // ---------- 非洲 ----------
  ["埃及", "africa", "egypt"],
  ["开罗", "africa", "金字塔"],
  ["卢克索", "africa", ""],
  ["阿斯旺", "africa", ""],
  ["摩洛哥", "africa", "morocco"],
  ["卡萨布兰卡", "africa", ""],
  ["马拉喀什", "africa", ""],
  ["舍夫沙万", "africa", "蓝城"],
  ["撒哈拉", "africa", "沙漠"],
  ["突尼斯", "africa", ""],
  ["南非", "africa", "southafrica"],
  ["开普敦", "africa", "好望角"],
  ["约翰内斯堡", "africa", ""],
  ["克鲁格", "africa", ""],
  ["肯尼亚", "africa", "kenya,内罗毕,马赛马拉"],
  ["坦桑尼亚", "africa", "塞伦盖蒂,乞力马扎罗,桑给巴尔"],
  ["埃塞俄比亚", "africa", ""],
  ["纳米比亚", "africa", ""],
  ["维多利亚瀑布", "africa", "津巴布韦,赞比亚"],
  ["博茨瓦纳", "africa", ""],
  ["马达加斯加", "africa", ""],
  ["毛里求斯", "africa", ""],
  ["塞舌尔", "africa", ""],
  ["卢旺达", "africa", ""],
  // ---------- 大洋洲 ----------
  ["澳大利亚", "oceania", "澳洲,australia"],
  ["悉尼", "oceania", "sydney"],
  ["墨尔本", "oceania", "melbourne,大洋路"],
  ["布里斯班", "oceania", ""],
  ["黄金海岸", "oceania", ""],
  ["凯恩斯", "oceania", "大堡礁"],
  ["珀斯", "oceania", ""],
  ["塔斯马尼亚", "oceania", "霍巴特"],
  ["乌鲁鲁", "oceania", "大石头,艾尔斯岩"],
  ["新西兰", "oceania", "newzealand,纽西兰"],
  ["奥克兰", "oceania", ""],
  ["皇后镇", "oceania", "queenstown"],
  ["基督城", "oceania", ""],
  ["惠灵顿", "oceania", ""],
  ["罗托鲁瓦", "oceania", ""],
  ["斐济", "oceania", ""],
  ["大溪地", "oceania", "塔希提"],
  ["瓦努阿图", "oceania", ""],
  ["帕劳", "oceania", ""],
  ["新喀里多尼亚", "oceania", ""],
  // ---------- 极地 ----------
  ["南极", "polar", "南极洲,南极半岛,南极点,antartica,antarctica"],
  ["北极", "polar", "北极圈,北冰洋,北极点"],
  ["斯瓦尔巴", "polar", "朗伊尔城"],
  ["格陵兰", "polar", "greenland"],
  ["法罗群岛", "polar", ""]
];
var PLACES = RAW.map(([n, r, a]) => ({
  name: n,
  region: r,
  aliases: a ? a.split(",").filter(Boolean) : []
}));
var REGION_LIST = Object.entries(REGIONS).map(([id, v]) => ({ id, ...v }));

// js/city.js
var norm = (s) => String(s || "").toLowerCase().replace(/[\uFF01-\uFF5E]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 65248)).replace(/[\s\u3000·・\-—_/\\|,，.。、:：;；'"'"'"《》<>()（）\[\]【】]/g, "");
var byKey = /* @__PURE__ */ new Map();
var nameKeys = [];
var aliasKeys = [];
var nameKeySet = /* @__PURE__ */ new Set();
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
for (const k of new Set(byKey.keys())) {
  (nameKeySet.has(k) ? nameKeys : aliasKeys).push(k);
}
nameKeys.sort((a, b) => b.length - a.length);
aliasKeys.sort((a, b) => b.length - a.length);
var PREFIX = /^(?:我想去|我想|我想要|我要去|我要|打算去|计划去|准备去|想要去|想去|去一趟|走一趟|明年|后年|大后年|今年|去年|明年春天|下个月|这个月|寒假|暑假|春节|过年|十一|国庆|五一|元旦|假期|周末|去|到|前往|飞往|飞|游|玩|逛|打卡|旅行|旅游|自驾|徒步|骑行|出差|出差去|回)+/;
function stripPrefix(text) {
  let prev = null;
  let cur = text;
  let guard = 0;
  while (cur !== prev && guard++ < 8) {
    prev = cur;
    cur = cur.replace(PREFIX, "");
  }
  return cur;
}
function resolve(raw, userAliases = {}) {
  const original = norm(raw);
  if (!original) return null;
  if (userAliases[original]) {
    const p = byKey.get(norm(userAliases[original]));
    if (p) return pack(p, original, "user");
  }
  const text = stripPrefix(original) || original;
  if (!text) return null;
  if (byKey.has(text)) return pack(byKey.get(text), text, "exact");
  if (byKey.has(original)) return pack(byKey.get(original), original, "exact");
  for (const k of nameKeys) {
    if (k.length < 2) continue;
    if (text.includes(k)) return pack(byKey.get(k), k, "contains-name");
  }
  for (const k of aliasKeys) {
    if (k.length < 2) continue;
    if (text.includes(k)) return pack(byKey.get(k), k, "contains-alias");
  }
  return null;
}
function pack(place, matched, method) {
  return {
    name: place.name,
    region: place.region,
    matched,
    method
  };
}
function regionInfo(regionId) {
  return REGIONS[regionId] || REGIONS.other;
}
var KEYWORD_EMOJI = [
  [/极光|aurora/i, "🌌"],
  [/泡汤|温泉/, "♨️"],
  [/滑雪|看雪|雪国|冰川|雪山|寒冬/, "❄️"],
  [/沙漠|戈壁|荒漠|沙漠公路/, "🏜️"],
  [/潜水|浮潜|海岛|沙滩|海滩|海岸|环岛/, "🏝️"],
  [/徒步|登顶|山峰|峡谷|山脉/, "🏔️"],
  [/古城|古镇|寺庙|寺院|故宫|城墙|遗迹/, "🏯"],
  [/草原|牧场|花海|油菜花|薰衣草/, "🌾"],
  [/湖|湖畔|河流|水乡|运河/, "🛶"],
  [/夜市|美食|小吃|吃/, "🍜"],
  [/自驾|公路|环线/, "🚐"],
  [/城市|夜景|都市|购物/, "🌃"]
];
function emojiFor(text, regionId) {
  if (regionId === "polar") return "🧊";
  const s = String(text || "");
  for (const [re, e] of KEYWORD_EMOJI) {
    if (re.test(s)) return e;
  }
  return REGIONS[regionId]?.emoji || "📍";
}
function allPlaces() {
  const map = /* @__PURE__ */ new Map();
  for (const p of PLACES) {
    if (!map.has(p.name)) map.set(p.name, p);
  }
  return [...map.values()];
}

// js/ui.js
function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[c]);
}
var TONES = [
  "linear-gradient(155deg,#B6D3EC,#5E93C4)",
  "linear-gradient(155deg,#F5CD96,#CE8845)",
  "linear-gradient(155deg,#AFCDA5,#5B8C57)",
  "linear-gradient(155deg,#A4DAE0,#3F8E9C)",
  "linear-gradient(155deg,#CBAEDB,#7C5FA0)",
  "linear-gradient(155deg,#DCC8AC,#9E8058)",
  "linear-gradient(155deg,#E3EAF1,#93A6B6)",
  "linear-gradient(155deg,#F4BDC5,#C5717F)"
];
function toneBg(i) {
  return TONES[Number(i) % TONES.length] || TONES[6];
}
var P = {
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
  wand: '<path d="m4 20 10-10"/><path d="M15 4.5 16 7l2.5 1L16 9l-1 2.5L14 9l-2.5-1L14 7l1-2.5z"/><path d="M19.5 13.5 20 15l1.5.5L20 16l-.5 1.5L19 16l-1.5-.5L19 15l.5-1.5z"/>'
};
function icon(name, size = 20) {
  const d = P[name] || P.pin;
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none"
    stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true">${d}</svg>`;
}
var toastTimer = null;
function toast(msg, ms = 2e3) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("is-show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("is-show"), ms);
}
var sheetEl = null;
var sheetResolve = null;
var closeTimer = null;
function isSheetOpen() {
  return !!sheetEl;
}
function openSheet(o) {
  closeSheet(null, true);
  clearTimeout(closeTimer);
  closeTimer = null;
  const layer = document.getElementById("layer");
  const wrap = document.createElement("div");
  wrap.className = "scrim";
  const sheet = document.createElement("div");
  sheet.className = "sheet";
  sheet.setAttribute("role", "dialog");
  sheet.setAttribute("aria-modal", "true");
  const btns = (o.buttons || []).map(
    (b, i) => `<button class="btn ${b.kind === "primary" ? "btn--primary" : b.kind === "danger" ? "btn--soft btn--danger" : "btn--soft"}" data-sheet-btn="${i}">${esc(b.label)}</button>`
  ).join("");
  sheet.innerHTML = `
    <div class="sheet__grab"></div>
    ${o.title ? `<div class="sheet__title">${esc(o.title)}</div>` : ""}
    ${o.desc ? `<div class="sheet__desc">${o.desc}</div>` : ""}
    <div class="sheet__body">${o.html || ""}</div>
    ${btns ? `<div class="sheet__foot">${btns}</div>` : ""}
  `;
  layer.innerHTML = "";
  layer.appendChild(wrap);
  layer.appendChild(sheet);
  layer.classList.add("is-open");
  document.body.style.overflow = "hidden";
  sheetEl = sheet;
  sheetResolve = o.onClose || null;
  wrap.addEventListener("click", () => closeSheet(null));
  sheet.addEventListener("click", (e) => {
    const b = e.target.closest("[data-sheet-btn]");
    if (!b) return;
    const i = Number(b.dataset.sheetBtn);
    closeSheet((o.buttons || [])[i]?.value ?? null);
  });
  const body = sheet.querySelector(".sheet__body");
  if (o.onMount) requestAnimationFrame(() => o.onMount(body, sheet));
}
function closeSheet(value = null, silent = false) {
  const layer = document.getElementById("layer");
  const sheet = layer?.querySelector(".sheet");
  if (!sheet) {
    clearTimeout(closeTimer);
    closeTimer = null;
    if (layer) layer.innerHTML = "";
    layer?.classList.remove("is-open");
    document.body.style.overflow = "";
    return;
  }
  const s = sheet;
  const cb = sheetResolve;
  sheetEl = null;
  sheetResolve = null;
  s.style.transform = "translateY(102%)";
  const scrim = layer.querySelector(".scrim");
  if (scrim) scrim.style.opacity = "0";
  clearTimeout(closeTimer);
  closeTimer = setTimeout(() => {
    closeTimer = null;
    if (layer) layer.innerHTML = "";
    layer?.classList.remove("is-open");
    document.body.style.overflow = "";
  }, 260);
  if (!silent && cb) cb(value);
  else if (silent && cb) {
  }
}
function confirmDialog({ title, message, okText = "确定", cancelText = "取消", danger = false }) {
  return new Promise((resolve2) => {
    openSheet({
      title,
      html: `<div style="font-size:14.5px;line-height:1.7;color:var(--text-2);padding:2px 0 10px">${message}</div>`,
      buttons: [
        { label: cancelText, value: false },
        { label: okText, value: true, kind: danger ? "danger" : "primary" }
      ],
      onClose: (v) => resolve2(!!v)
    });
  });
}
function fmtMD(d) {
  if (!d) return "";
  const [, m, day] = d.split("-");
  return `${Number(m)}月${Number(day)}日`;
}
function fmtDateRange(trip) {
  if (trip.dateMode === "exact" && trip.startDate) {
    const y1 = trip.startDate.slice(0, 4);
    if (!trip.endDate) return `${y1}年${fmtMD(trip.startDate)} 出发`;
    const sameYear = trip.startDate.slice(0, 4) === trip.endDate.slice(0, 4);
    const endTxt = sameYear ? fmtMD(trip.endDate) : `${trip.endDate.slice(0, 4)}年${fmtMD(trip.endDate)}`;
    const days = Math.round((new Date(trip.endDate) - new Date(trip.startDate)) / 864e5) + 1;
    return `${y1}年${fmtMD(trip.startDate)} – ${endTxt} · ${days}天`;
  }
  if (trip.dateMode === "fuzzy") {
    if (trip.dateText) return trip.dateText;
    if (trip.roughYm) {
      const [y, m] = trip.roughYm.split("-");
      return `${y}年${Number(m)}月`;
    }
  }
  return "时间未定";
}
function fmtRelative(iso) {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const day = Math.floor(diff / 864e5);
  if (day < 1) return "今天";
  if (day === 1) return "昨天";
  if (day < 30) return `${day} 天前`;
  if (day < 365) return `${Math.floor(day / 30)} 个月前`;
  return `${Math.floor(day / 365)} 年前`;
}
function debounce(fn, ms = 220) {
  let t = null;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}
function download(filename, text, mime = "application/json") {
  const blob = new Blob([text], { type: mime + ";charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}
function siteURL() {
  const u = new URL(location.href);
  const p = u.pathname.replace(/index\.html$/, "");
  return u.origin + p + u.search;
}
function siteFile(name) {
  const u = new URL(location.href);
  const dir = u.pathname.replace(/[^/]*$/, "");
  return `${u.origin}${dir}${name}${u.search}`;
}

// js/ai.js
function bytesToB64Url(bytes) {
  let bin = "";
  const CH = 32768;
  for (let i = 0; i < bytes.length; i += CH) {
    bin += String.fromCharCode.apply(null, bytes.subarray(i, i + CH));
  }
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function b64UrlToBytes(s) {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - s.length % 4);
  const b = s.replace(/-/g, "+").replace(/_/g, "/") + pad;
  const bin = atob(b);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
function encodePayload(obj) {
  const json = JSON.stringify(obj);
  return bytesToB64Url(new TextEncoder().encode(json));
}
function extractJSON(text) {
  const s = String(text || "").trim();
  const first = (() => {
    let i1 = s.indexOf("{");
    let i2 = s.indexOf("[");
    if (i1 < 0) return i2;
    if (i2 < 0) return i1;
    return Math.min(i1, i2);
  })();
  if (first < 0) return s;
  const open = s[first];
  const close = open === "{" ? "}" : "]";
  let depth = 0;
  let inStr = false;
  let escp = false;
  for (let i = first; i < s.length; i++) {
    const c = s[i];
    if (inStr) {
      if (escp) escp = false;
      else if (c === "\\") escp = true;
      else if (c === '"') inStr = false;
      continue;
    }
    if (c === '"') {
      inStr = true;
      continue;
    }
    if (c === open) depth++;
    else if (c === close) {
      depth--;
      if (depth === 0) return s.slice(first, i + 1);
    }
  }
  return s.slice(first);
}
function decodePayload(raw) {
  const attempts = [];
  const s = String(raw || "").trim();
  if (!s) throw new Error("内容为空");
  attempts.push(() => JSON.parse(extractJSON(s)));
  attempts.push(() => JSON.parse(extractJSON(decodeURIComponent(s))));
  attempts.push(() => {
    const clean = s.replace(/\s/g, "");
    const txt = new TextDecoder().decode(b64UrlToBytes(clean));
    return JSON.parse(extractJSON(txt));
  });
  attempts.push(() => {
    const clean = decodeURIComponent(s).replace(/\s/g, "");
    const txt = new TextDecoder().decode(b64UrlToBytes(clean));
    return JSON.parse(extractJSON(txt));
  });
  let lastErr = null;
  for (const fn of attempts) {
    try {
      const out = fn();
      if (out && typeof out === "object") return out;
    } catch (e) {
      lastErr = e;
    }
  }
  throw new Error("无法识别这段数据（既不是 JSON，也不是有效的分享链接）" + (lastErr ? "：" + lastErr.message : ""));
}
var pick = (o, ...keys) => {
  for (const k of keys) {
    if (o[k] !== void 0 && o[k] !== null && o[k] !== "") return o[k];
  }
  return void 0;
};
function normDate(v) {
  if (!v) return null;
  const s = String(v).trim();
  let m = s.match(/(\d{4})[-/.年](\d{1,2})[-/.月](\d{1,2})/);
  if (m) return `${m[1]}-${String(m[2]).padStart(2, "0")}-${String(m[3]).padStart(2, "0")}`;
  m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;
  return null;
}
function normYm(v) {
  if (!v) return null;
  const s = String(v).trim();
  const m = s.match(/(\d{4})[-/.年](\d{1,2})/);
  if (m) return `${m[1]}-${String(m[2]).padStart(2, "0")}`;
  return null;
}
function guessEmoji(city, region, title = "") {
  return emojiFor(`${city} ${title}`, region);
}
function normalizeDraft(raw, defaultStatus = "wish") {
  if (!raw || typeof raw !== "object") return null;
  const title = String(pick(raw, "title", "name", "标题", "名称", "目的地") || "").trim();
  const cityRaw = String(pick(raw, "cityRaw", "city", "城市", "地点", "destination", "place") || "").trim();
  if (!title && !cityRaw) return null;
  const hit = resolve(cityRaw || title, {});
  const city = hit?.name || cityRaw || "";
  const region = hit?.region || "other";
  const startDate = normDate(pick(raw, "startDate", "start", "from", "出发日期", "开始日期"));
  const endDate = normDate(pick(raw, "endDate", "end", "to", "返回日期", "结束日期"));
  const dateText = String(pick(raw, "dateText", "date", "when", "时间", "日期描述") || "").trim();
  let dateMode = "none";
  if (startDate) dateMode = "exact";
  else if (dateText) dateMode = "fuzzy";
  const blocks = [];
  const rawBlocks = pick(raw, "blocks", "sections", "content", "正文", "攻略", "详情");
  if (typeof rawBlocks === "string" && rawBlocks.trim()) {
    blocks.push({ type: "text", title: "", body: rawBlocks.trim().slice(0, 4e3) });
  } else if (Array.isArray(rawBlocks)) {
    for (const b of rawBlocks) {
      if (typeof b === "string") {
        if (b.trim()) blocks.push({ type: "text", title: "", body: b.trim().slice(0, 4e3) });
        continue;
      }
      if (!b || typeof b !== "object") continue;
      const type = String(b.type || "").toLowerCase();
      if (type === "todo" || type === "checklist" || type === "list") {
        const items = (b.items || b.list || []).map(
          (i) => typeof i === "string" ? { t: i.slice(0, 200), done: false } : { t: String(i?.t || i?.text || "").slice(0, 200), done: !!i?.done }
        ).filter((i) => i.t);
        if (items.length) blocks.push({ type: "todo", title: b.title || "准备清单", items });
      } else if (type === "link" || b.url) {
        if (b.url) blocks.push({ type: "link", title: b.title || "", url: String(b.url), body: String(b.body || "") });
      } else if (type === "day" || b.day) {
        blocks.push({
          type: "day",
          day: Number(b.day) || 1,
          title: String(b.title || "").slice(0, 80),
          body: String(b.body || b.text || "").slice(0, 4e3)
        });
      } else if (b.body || b.text) {
        blocks.push({
          type: "text",
          title: String(b.title || "").slice(0, 80),
          body: String(b.body || b.text).slice(0, 4e3)
        });
      }
    }
  }
  if (!blocks.length) {
    const body = pick(raw, "body", "brief", "summary", "备注", "简介", "description");
    if (body) blocks.push({ type: "text", title: "", body: String(body).slice(0, 4e3) });
  }
  const brief = String(pick(raw, "brief", "summary", "一句话", "简介") || "").trim().slice(0, 200);
  const statusHint = String(pick(raw, "status", "状态") || "").toLowerCase();
  let promoted = defaultStatus !== "wish";
  if (statusHint === "planning" || statusHint === "ongoing" || statusHint === "road" || statusHint === "路上") {
    promoted = true;
  }
  if (statusHint === "wish" || statusHint === "想去" || statusHint === "idea") {
    promoted = false;
  }
  return {
    title: title || cityRaw || "未命名路书",
    cityRaw: cityRaw || title,
    city,
    region,
    dateMode,
    startDate,
    endDate,
    dateText,
    roughYm: normYm(pick(raw, "roughYm", "month", "月份")),
    brief,
    blocks: blocks.slice(0, 30),
    cover: { emoji: guessEmoji(city, region, title), tone: regionTone(region), imgId: null },
    promotedAt: promoted ? (/* @__PURE__ */ new Date()).toISOString() : null,
    source: "ai",
    _matched: hit
  };
}
function regionTone(region) {
  const map = {
    "cn-north": 5,
    "cn-east": 3,
    "cn-south": 2,
    "cn-central": 5,
    "cn-southwest": 0,
    "cn-northwest": 1,
    "cn-northeast": 6,
    "cn-hkmo": 4,
    "cn-tw": 7,
    "asia-se": 2,
    "asia-e": 7,
    "asia-s": 1,
    "asia-w": 1,
    europe: 4,
    namerica: 3,
    samerica: 2,
    africa: 1,
    oceania: 3,
    polar: 0,
    other: 6
  };
  return map[region] ?? 6;
}
function toDrafts(payload, defaultStatus = "wish") {
  if (!payload) return [];
  if (Array.isArray(payload)) {
    return payload.map((p) => normalizeDraft(p, defaultStatus)).filter(Boolean);
  }
  if (Array.isArray(payload.trips)) {
    return payload.trips.map((p) => normalizeDraft(p, defaultStatus)).filter(Boolean);
  }
  const one = normalizeDraft(payload, defaultStatus);
  return one ? [one] : [];
}
function makeShareLink(trip, origin = siteURL()) {
  const payload = {
    title: trip.title,
    city: trip.cityRaw || trip.city,
    status: trip.promotedAt ? "planning" : "wish",
    dateText: trip.dateMode === "fuzzy" ? trip.dateText : void 0,
    startDate: trip.dateMode === "exact" ? trip.startDate : void 0,
    endDate: trip.dateMode === "exact" ? trip.endDate : void 0,
    brief: trip.brief,
    blocks: trip.blocks
  };
  return `${origin}#/add?d=${encodePayload(payload)}`;
}

// js/views.js
var TABS = [
  { id: "road", label: "路上", icon: "road" },
  { id: "wish", label: "想去", icon: "pin" },
  { id: "past", label: "回顾", icon: "archive" }
];
function renderTabbar(active) {
  return `<nav class="tabbar">
    ${TABS.map((t) => `
      <button class="tab ${active === t.id ? "is-active" : ""}" data-act="tab" data-tab="${t.id}">
        ${icon(t.icon)}
        <span class="tab__label">${t.label}</span>
      </button>`).join("")}
  </nav>`;
}
function renderFAB(show = true) {
  return show ? `<button class="fab" data-act="new" aria-label="添加">${icon("plus", 24)}</button>` : "";
}
var TAB_META = {
  road: { title: "路上", empty: { icon: "🧭", t: "还没有确定的行程", s: "把你已经排好的路线放进来，它就住在这里，直到走完。", a: "新建一段行程" } },
  wish: { title: "想去", empty: { icon: "📮", t: "想去的地方还没收进来", s: "随手记下一个地名就行，会自动按城市归好类。", a: "记一个想去的地方" } },
  past: { title: "回顾", empty: { icon: "📼", t: "还没有走完的行程", s: "行程结束日期一过，它就会自己搬到这里。", a: "新建一段行程" } }
};
function viewList(tab, opt = {}) {
  const { q = "" } = opt;
  const app2 = getApp();
  const { road, wish, past, wishDone } = bucketOf(app2.trips);
  const meta = TAB_META[tab] || TAB_META.road;
  const filter = (arr) => {
    if (!q) return arr;
    const k = q.toLowerCase();
    return arr.filter(
      (t) => `${t.title} ${t.cityRaw} ${t.city} ${t.brief}`.toLowerCase().includes(k)
    );
  };
  let bodyHtml = "";
  if (tab === "road") {
    bodyHtml = listRoad(filter(road), q);
  } else if (tab === "wish") {
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
        <button class="icon-btn" data-act="settings" aria-label="设置">${icon("settings", 18)}</button>
      </div>
      <div class="topbar__sub">${sub}</div>
      <label class="search">
        ${icon("search")}
        <input id="q" type="search" placeholder="搜地名、标题、关键词" value="${esc(q)}" autocomplete="off">
      </label>
      ${shouldShowDemoBar() ? `<div class="demo-bar">
        <span class="demo-bar__text"><b>示例数据</b>　先看看长什么样</span>
        <button class="demo-bar__btn" data-act="clear-demo">清空示例</button>
      </div>` : ""}
    </header>
    <div class="scroll">
      ${bodyHtml}
    </div>
  </div>
  ${renderTabbar(tab)}
  ${renderFAB(tab !== "past")}`;
}
function subtitle(tab, { road, wish, past }) {
  if (tab === "road") {
    const ongoing = road.filter((t) => tripState(t).status === STATUS.ONGOING).length;
    const planning = road.length - ongoing;
    if (!road.length) return "还没有确定下来的行程";
    const bits = [];
    if (ongoing) bits.push(`${ongoing} 段进行中`);
    if (planning) bits.push(`${planning} 段待出发`);
    return bits.join(" · ");
  }
  if (tab === "wish") {
    if (!wish.length) return "随手记下，等它变成一段路";
    const regions = new Set(wish.map((t) => t.region));
    return `${wish.length} 个地方 · ${regions.size} 个区域`;
  }
  if (!past.length) return "走过的路会留在这里";
  return `${past.length} 段走过的路`;
}
function listRoad(trips, q) {
  if (!trips.length) return emptyState("road", q);
  const ongoing = trips.filter((t) => tripState(t).status === STATUS.ONGOING);
  const planning = trips.filter((t) => tripState(t).status === STATUS.PLANNING);
  let html = "";
  if (ongoing.length) {
    html += `<div class="section-label">进行中</div><div class="list">${ongoing.map(cardTrip).join("")}</div>`;
  }
  if (planning.length) {
    html += `<div class="section-label">即将出发</div><div class="list">${planning.map(cardTrip).join("")}</div>`;
  }
  return html;
}
function listWish(wishes, doneOnes, q) {
  if (!wishes.length && !doneOnes.length) return emptyState("wish", q);
  const groups = /* @__PURE__ */ new Map();
  for (const t of wishes) {
    const key = t.region || "other";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(t);
  }
  const order = REGION_LIST.map((r) => r.id).filter((id) => groups.has(id));
  let html = "";
  for (const rid of order) {
    const info = regionInfo(rid);
    html += `<div class="section-label">${info.emoji} ${esc(info.short)} · ${groups.get(rid).length}</div>
      <div class="list">${groups.get(rid).map(cardWish).join("")}</div>`;
  }
  if (doneOnes.length) {
    html += `<div class="section-label">已规划 / 已走过 · ${doneOnes.length}</div>
      <div class="list">${doneOnes.map(cardWishDone).join("")}</div>`;
  }
  return html;
}
function listPast(trips, q) {
  if (!trips.length) return emptyState("past", q);
  const groups = /* @__PURE__ */ new Map();
  for (const t of trips) {
    const y = (t.endDate || t.updatedAt || "").slice(0, 4) || "——";
    if (!groups.has(y)) groups.set(y, []);
    groups.get(y).push(t);
  }
  return [...groups.entries()].sort((a, b) => b[0].localeCompare(a[0])).map(([y, arr]) => `<div class="section-label">${y} 年 · ${arr.length}</div>
      <div class="list">${arr.map(cardPast).join("")}</div>`).join("");
}
function coverInner(trip, emojiClass = "card__cover-emoji") {
  const img = trip.cover?.imgId ? `<img data-img="${esc(trip.cover.imgId)}" alt="" loading="lazy">` : "";
  return `${img}<span class="${emojiClass}">${esc(trip.cover?.emoji || "📍")}</span>`;
}
function cardTrip(t) {
  const st = tripState(t);
  const prog = tripProgress(t);
  const isOn = st.status === STATUS.ONGOING;
  const parts = [`<span>${esc(t.city || t.cityRaw || "未分类")}</span>`];
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
      <div class="card__meta">${parts.join("")}</div>
      <div class="card__foot">
        ${isOn ? `<span class="badge badge--ongoing">进行中</span>` : `<span class="badge badge--planning">待出发</span>`}
        ${st.needsConfirm ? `<span class="badge badge--ghost">时间已过？</span>` : ""}
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
        ${t.city && t.city !== t.title ? `<span>${esc(t.city)}</span>` : ""}
        ${t.dateText ? `<span>${esc(t.dateText)}</span>` : ""}
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
  const label = st === STATUS.DONE ? "已走过" : st === STATUS.ONGOING ? "路上 · 进行中" : "已规划";
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
function viewTrip(id) {
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
        ${t.cover?.imgId ? `<img data-img="${esc(t.cover.imgId)}" alt="">` : ""}
        <span class="detail-hero__emoji">${esc(t.cover?.emoji || "📍")}</span>
        <div class="detail-hero__scrim"></div>
        <div class="detail-hero__nav">
          <button class="icon-btn" data-act="back" aria-label="返回">${icon("back")}</button>
          <button class="icon-btn" data-act="trip-menu" data-id="${t.id}" aria-label="更多">${icon("more")}</button>
        </div>
      </div>

      <div class="detail-head">
        ${shareBannerHtml(t)}
        <h1 class="detail-title">${esc(t.title)}</h1>
        <div class="detail-meta">
          ${badgeFor(st)}
          <div class="detail-meta__rest">
            ${t.location ? `<button class="place-chip" data-act="open-map" data-id="${t.id}">
                   ${icon("pin", 12)}<span>${esc(t.city || t.cityRaw || "未分类")}</span>
                 </button>` : `<span>${esc(t.city || t.cityRaw || "未分类")}</span>`}
            <span class="detail-date">${icon("calendar", 13)} ${esc(fmtDateRange(t))}</span>
          </div>
        </div>
        ${t.brief ? `<div class="detail-brief">${esc(t.brief)}</div>` : ""}
        ${prog && st.status === STATUS.ONGOING ? `
          <div class="progress">
            <div class="progress__row">
              <span>行程进度</span>
              <span><span class="progress__num">第 ${prog.day} / ${prog.total} 天</span></span>
            </div>
            <div class="progress__bar"><div class="progress__fill" style="width:${prog.pct}%"></div></div>
          </div>` : ""}
        ${st.needsConfirm ? `
          <div class="notice notice--warn" style="margin-top:14px">
            <span class="notice__icon">⏳</span>
            <span>这条行程填的是「${esc(t.dateText || t.roughYm || "")}」，时间已经过去了。它结束了吗？</span>
          </div>` : ""}

        <div class="detail-actions">${actionsFor(t, st)}</div>

        ${prepHtml(t)}

        ${dayNavHtml(t)}

        <div class="blocks">${blocksHtml(t)}</div>
      </div>
    </div>
  </div>
  ${ledgerFab(t)}`;
}
function money(n) {
  const v = Math.round(Number(n) || 0);
  return "¥" + v.toLocaleString("zh-CN");
}
function ledgerFab(t) {
  const spent = ledgerSpent(t);
  const has = spent > 0 || (t.ledger?.entries || []).length > 0;
  return `<button class="ledger-fab ${has ? "" : "is-empty"}" data-act="open-ledger" data-id="${t.id}" aria-label="打开账本">
    <span class="ledger-fab__sign">¥</span>
    <span class="ledger-fab__amt">${has ? money(spent) : "账本"}</span>
  </button>`;
}
function ledgerBodyHtml(t) {
  const entries = t.ledger?.entries || [];
  const spent = ledgerSpent(t);
  const budget = t.ledger?.budget || 0;
  const pct = budget > 0 ? Math.min(100, Math.round(spent / budget * 100)) : 0;
  const over = budget > 0 && spent > budget;
  const remain = budget - spent;
  const list = entries.length ? [...entries].sort((a, b) => a.date < b.date ? 1 : a.date > b.date ? -1 : 0).map((e) => {
    const c = categoryInfo(e.category);
    return `<div class="expense">
            <span class="expense__emoji">${c.emoji}</span>
            <span class="expense__main">
              <span class="expense__title">${esc(e.title)}</span>
              <span class="expense__date">${esc(e.date.slice(5).replace("-", "/"))}</span>
            </span>
            <span class="expense__amt">${money(e.amount)}</span>
            <button class="expense__del" data-act="del-expense" data-id="${t.id}" data-eid="${e.id}" aria-label="删除这笔">${icon("trash", 14)}</button>
          </div>`;
  }).join("") : `<div class="ledger__empty">还没有记账</div>`;
  return `
    <div class="ledger__head">
      <div class="ledger__col">
        <div class="ledger__label">已花</div>
        <div class="ledger__spent">${money(spent)}</div>
      </div>
      <button class="ledger__col ledger__col--right" data-act="set-budget" data-id="${t.id}">
        <div class="ledger__label">预算 ${icon("edit", 11)}</div>
        <div class="ledger__budget">${budget > 0 ? money(budget) : "设置"}</div>
      </button>
    </div>

    ${budget > 0 ? `
      <div class="ledger__bar"><i class="${over ? "is-over" : ""}" style="width:${pct}%"></i></div>
      <div class="ledger__remain ${over ? "is-over" : ""}">
        ${over ? `超出预算 ${money(-remain)}` : `还剩 ${money(remain)}`}
        <span class="ledger__pct">${pct}%</span>
      </div>` : ""}

    <div class="ledger__list">${list}</div>`;
}
function showLedgerSheet(tripId) {
  const t = getTrip(tripId);
  if (!t) return;
  openSheet({
    title: "账本",
    desc: esc(t.title),
    html: `<div class="ledger-body">${ledgerBodyHtml(t)}</div>
      <button class="btn btn--primary btn--block" id="ls-add" style="margin-top:14px">
        ${icon("plus", 15)} 记一笔
      </button>`,
    onMount: (body) => {
      body.querySelector("#ls-add").addEventListener("click", () => {
        closeSheet();
        setTimeout(() => showExpenseSheet(t.id), 80);
      });
      body.addEventListener("click", (e) => {
        const del = e.target.closest('[data-act="del-expense"]');
        if (del) {
          e.stopPropagation();
          const entry = getTrip(t.id)?.ledger?.entries?.find((x) => x.id === del.dataset.eid);
          if (!entry) return;
          confirmDialog({
            title: "删掉这笔？",
            message: `${esc(entry.title)}　¥${entry.amount.toLocaleString("zh-CN")}<br><br>删掉后不影响其他记录。`,
            okText: "删除",
            danger: true
          }).then((ok) => {
            if (!ok) return;
            removeExpense(t.id, del.dataset.eid);
            toast("已删除");
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
    }
  });
}
function prepHtml(t) {
  const lists = (t.blocks || []).map((b, i) => ({ b, i })).filter((x) => x.b.type === "todo" && x.b.items?.length);
  if (!lists.length) return "";
  const total = lists.reduce((n, x) => n + x.b.items.length, 0);
  const done = lists.reduce((n, x) => n + x.b.items.filter((it) => it.done).length, 0);
  return `<div class="prep">
    <button class="prep__head" data-act="toggle-prep" aria-expanded="false">
      <span class="prep__ico">${icon("list", 16)}</span>
      <span class="prep__title">行前准备</span>
      <span class="prep__meta">${done}/${total}</span>
      <span class="prep__chev">${icon("chevron", 15)}</span>
    </button>
    <div class="prep__body" id="prep-body" hidden>
      ${lists.map(({ b, i }) => `
        <div class="prep__list">
          <div class="prep__list-title">${esc(b.title || "清单")}</div>
          ${b.items.map((it, j) => `
            <div class="todo ${it.done ? "is-done" : ""}" data-act="toggle-todo" data-id="${t.id}" data-bi="${i}" data-ii="${j}">
              <div class="todo__box">${icon("check", 12)}</div>
              <div class="todo__text">${esc(it.t)}</div>
            </div>`).join("")}
        </div>`).join("")}
    </div>
  </div>`;
}
function dayNavHtml(t) {
  const days = (t.blocks || []).map((b, i) => ({ b, i })).filter((x) => x.b.type === "day");
  if (days.length < 2) return "";
  return `<nav class="day-nav" id="day-nav" aria-label="日程索引">
    ${days.map(({ b, i }) => `<button class="day-pill" data-day-jump="dayblock-${i}">D${b.day}</button>`).join("")}
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
    const extra = st.needsConfirm ? `<button class="btn btn--soft" data-act="mark-done" data-id="${t.id}">已结束</button>` : `<button class="btn btn--soft" data-act="mark-done" data-id="${t.id}">提前结束</button>`;
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
  return t.blocks.map((b, i) => b.type === "todo" ? "" : blockHtml(b, i, t.id)).join("");
}
var TRANSIT_META = {
  walk: { emoji: "🚶", label: "步行" },
  bus: { emoji: "🚌", label: "公交" },
  metro: { emoji: "🚇", label: "地铁" },
  taxi: { emoji: "🚕", label: "打车" },
  car: { emoji: "🚗", label: "驾车" },
  boat: { emoji: "⛴️", label: "乘船" },
  train: { emoji: "🚄", label: "高铁" },
  flight: { emoji: "✈️", label: "飞行" }
};
var MEAL_META = {
  breakfast: { emoji: "🍳", label: "早餐" },
  lunch: { emoji: "🍜", label: "午餐" },
  dinner: { emoji: "🍲", label: "晚餐" },
  snack: { emoji: "🍡", label: "小吃" }
};
function fmtMinutes(m) {
  if (!m || m <= 0) return "";
  if (m < 60) return `${m} 分钟`;
  const h = Math.floor(m / 60);
  const r = m % 60;
  return r ? `${h} 小时 ${r} 分` : `${h} 小时`;
}
function tlTransit(tr) {
  const meta = TRANSIT_META[tr.mode] || TRANSIT_META.car;
  const parts = [meta.label];
  if (tr.minutes) parts.push(`约 ${fmtMinutes(tr.minutes)}`);
  if (tr.note) parts.push(tr.note);
  return `<div class="tl-row tl-row--transit">
    <div class="tl-time"></div>
    <div class="tl-mark"><span class="tl-line"></span></div>
    <div class="tl-main"><span class="tl-badge">${meta.emoji}</span><span class="tl-tt">${parts.map(esc).join(" · ")}</span></div>
  </div>`;
}
function placeChip(name, lat, lng, plain) {
  const label = `<span class="tl-name${plain ? " tl-name--plain" : ""}">${esc(name)}</span>`;
  if (lat == null) return `<span class="tl-place">${label}</span>`;
  return `<button class="tl-place" data-act="stop-map" data-lat="${lat}" data-lng="${lng}" data-name="${esc(name)}">
    ${label}${icon("pin", 11)}
  </button>`;
}
function tlStop(s, dayNo, idx, isFirst) {
  const storyId = `story-${dayNo}-${idx}`;
  const isSpot = !!s.story;
  return `${!isFirst && s.transit ? tlTransit(s.transit) : ""}
  <div class="tl-row tl-row--stop ${isSpot ? "is-spot" : "is-plain"}">
    <div class="tl-time">${s.start ? esc(s.start) : ""}</div>
    <div class="tl-mark"><span class="tl-dot"></span></div>
    <div class="tl-main">
      <div class="tl-title">
        ${placeChip(s.name, s.lat, s.lng, !isSpot)}
        ${s.duration ? `<span class="tl-dur">${fmtMinutes(s.duration)}</span>` : ""}
      </div>
      ${isSpot ? `
        <button class="stop__more" data-act="story" data-target="${storyId}">
          <span class="stop__more-plus">＋</span><span>来历</span>
        </button>
        <div class="stop__story" id="${storyId}" hidden>${esc(s.story)}</div>` : ""}
    </div>
  </div>`;
}
function tlMeal(m) {
  const meta = MEAL_META[m.type] || MEAL_META.snack;
  return `<div class="tl-row tl-row--meal">
    <div class="tl-time">${m.start ? esc(m.start) : ""}</div>
    <div class="tl-mark"><span class="tl-dot"></span></div>
    <div class="tl-main">
      <div class="tl-title">
        <span class="tl-meal-tag">${meta.label}</span>
        ${placeChip(m.name, m.lat, m.lng, true)}
      </div>
      ${m.note ? `<div class="tl-note">${esc(m.note)}</div>` : ""}
    </div>
  </div>`;
}
function photosHtml(photos, tripId, bi) {
  const tiles = photos.map((p) => `
    <button class="photo" data-act="view-photo" data-id="${tripId}" data-bi="${bi}" data-pid="${p.id}">
      <span class="photo__img" data-img="${p.imgId || ""}" data-demo-src="${p.demoSrc || ""}"></span>
      ${p.at ? `<span class="photo__at">${esc(p.at)}</span>` : ""}
    </button>`).join("");
  return `<div class="photos">
    ${tiles}
    <button class="photo photo--add" data-act="add-photo" data-id="${tripId}" data-bi="${bi}" aria-label="拍一张">
      <span class="photo__plus">＋</span>
      <span class="photo__hint">照片</span>
    </button>
  </div>`;
}
function showPhotoSourceSheet(tripId, bi) {
  openSheet({
    title: "添加照片",
    desc: "照片只存在这台设备上，不会上传",
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
      body.addEventListener("click", (e) => {
        const b = e.target.closest("[data-src]");
        if (!b) return;
        const useCamera = b.dataset.src === "camera";
        closeSheet();
        setTimeout(() => pickAndSave(tripId, bi, useCamera), 80);
      });
    }
  });
}
function pickAndSave(tripId, bi, useCamera) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  if (useCamera) input.setAttribute("capture", "environment");
  input.style.display = "none";
  document.body.appendChild(input);
  input.addEventListener("change", async () => {
    const file = input.files?.[0];
    input.remove();
    if (!file) return;
    try {
      toast("正在保存…");
      await addPhoto(tripId, Number(bi), file);
      toast("已存入本地");
      render(true);
    } catch (err) {
      toast(err?.message || "保存失败");
    }
  });
  input.click();
}
function collectPhotos(t) {
  return (t.blocks || []).filter((b) => b.type === "day").flatMap((b) => (b.photos || []).map((p) => ({ ...p, day: b.day, dayTitle: b.title })));
}
function shareBannerHtml(t) {
  if (!canShare(t)) return "";
  const cfg = shareConfig(t);
  const ready = !!t.share;
  return `<button class="share-banner" data-act="open-share" data-id="${t.id}">
    <span class="share-banner__ico">${icon("sparkle", 17)}</span>
    <span class="share-banner__body">
      <span class="share-banner__title">${ready ? "分享页已准备好" : "这趟已经结束，做一份回顾"}</span>
      <span class="share-banner__sub">${ready ? "查看 · 编辑 · 发给朋友" : "配图 + 行程 + 花费，一页看完"}</span>
    </span>
    <span class="share-banner__chev">${icon("chevron", 16)}</span>
  </button>`;
}
function viewShare(tripId) {
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
  const days = (t.blocks || []).filter((b) => b.type === "day");
  const stopCount = days.reduce((n, d) => n + (d.stops || []).length, 0);
  const spent = ledgerSpent(t);
  const daysHtml = days.map((d) => {
    const stops = (d.stops || []).filter((s) => s.story || s.duration);
    const photos = d.photos || [];
    if (!stops.length && !photos.length && !d.title) return "";
    return `<section class="sp-day">
      <div class="sp-day__head">
        <span class="sp-day__no">D${d.day}</span>
        <span class="sp-day__title">${esc(d.title || "")}</span>
      </div>
      ${d.body ? `<p class="sp-day__body">${esc(d.body)}</p>` : ""}
      ${stops.length ? `<ul class="sp-stops">
        ${stops.map((s) => `<li>
          <span class="sp-stop__time">${esc(s.start || "")}</span>
          <span class="sp-stop__name">${esc(s.name)}</span>
          ${s.duration ? `<span class="sp-stop__dur">${fmtMinutes(s.duration)}</span>` : ""}
        </li>`).join("")}
      </ul>` : ""}
    </section>`;
  }).join("");
  const photoHtml = chosen.length ? `<div class="sp-gallery">
        ${chosen.map((p) => `<figure class="sp-shot">
          <span class="sp-shot__img" data-img="${p.imgId || ""}" data-demo-src="${p.demoSrc || ""}"></span>
          ${p.caption ? `<figcaption>${esc(p.caption)}</figcaption>` : ""}
        </figure>`).join("")}
      </div>` : "";
  return `
  <div class="page page--share">
    <header class="sp-top">
      <button class="icon-btn" data-act="share-back" aria-label="返回">${icon("back", 20)}</button>
      <div class="sp-top__title">回顾</div>
      <div class="sp-top__right">
        <button class="icon-btn" data-act="share-out" data-id="${t.id}" aria-label="分享">${icon("upload", 17)}</button>
        <button class="icon-btn" data-act="edit-share" data-id="${t.id}" aria-label="编辑">${icon("edit", 17)}</button>
      </div>
    </header>

    <div class="sp-hero">
      <span class="sp-hero__img" data-img="${cover?.imgId || ""}" data-demo-src="${cover?.demoSrc || ""}"></span>
      <div class="sp-hero__scrim"></div>
      <div class="sp-hero__text">
        <div class="sp-hero__date">${esc(fmtDateRange(t))}</div>
        <h1 class="sp-hero__title">${esc(cfg.title || t.title)}</h1>
        <div class="sp-hero__meta">
          <span>${esc(t.city || t.cityRaw || "")}</span>
          <span>${days.length} 天</span>
          ${stopCount ? `<span>${stopCount} 个地方</span>` : ""}
          ${chosen.length ? `<span>${chosen.length} 张照片</span>` : ""}
        </div>
      </div>
    </div>

    <div class="sp-body">
      ${cfg.lead ? `<p class="sp-lead">${esc(cfg.lead)}</p>` : ""}

      ${daysHtml ? `<h2 class="sp-h2">行程</h2>${daysHtml}` : ""}

      ${photoHtml}

      ${cfg.showLedger && spent > 0 ? `
        <h2 class="sp-h2">花费</h2>
        <div class="sp-cost">
          <div class="sp-cost__num">${money(spent)}</div>
          <div class="sp-cost__sub">${(t.ledger?.entries || []).length} 笔记录${t.ledger?.budget ? ` · 预算 ${money(t.ledger.budget)}` : ""}</div>
        </div>` : ""}

      <div class="sp-foot">用「路书」记下这一段</div>
    </div>
  </div>`;
}
function showShareEditSheet(tripId) {
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
  const photoTiles = all.length ? all.map((p) => `
      <button class="pick ${chosen.has(p.id) ? "is-on" : ""}" data-pick="${p.id}">
        <span class="pick__img" data-img="${p.imgId || ""}" data-demo-src="${p.demoSrc || ""}"></span>
        <span class="pick__tick">${icon("check", 12)}</span>
      </button>`).join("") : `<div class="ledger__empty">这条还没有照片，去行程里拍几张</div>`;
  const coverTiles = all.length ? all.map((p) => `
      <button class="pick pick--cover ${p.id === coverId ? "is-on" : ""}" data-cover="${p.id}">
        <span class="pick__img" data-img="${p.imgId || ""}" data-demo-src="${p.demoSrc || ""}"></span>
      </button>`).join("") : "";
  openSheet({
    title: "编辑回顾",
    html: `
      <div class="field">
        <span class="field__label">标题</span>
        <input id="sh-title" class="input" type="text" maxlength="40" value="${esc(cfg.title || t.title)}" placeholder="给这段起个名字">
      </div>

      <div class="field">
        <span class="field__label">导语</span>
        <textarea id="sh-lead" class="textarea" rows="3" maxlength="200" placeholder="一句话说清这趟的感觉">${esc(cfg.lead || "")}</textarea>
      </div>

      ${all.length ? `
        <div class="field">
          <span class="field__label">封面</span>
          <div class="pick-row" id="sh-cover">${coverTiles}</div>
        </div>
        <div class="field">
          <span class="field__label">照片（点选要展示的）</span>
          <div class="pick-grid" id="sh-photos">${photoTiles}</div>
        </div>` : ""}

      <button class="switch-row" id="sh-ledger">
        <span>显示花费</span>
        <span class="switch ${showLedger ? "is-on" : ""}"><i></i></span>
      </button>

      <button class="btn btn--primary btn--block" id="sh-save" style="margin-top:14px">保存</button>
    `,
    onMount: (body) => {
      titleEl = body.querySelector("#sh-title");
      leadEl = body.querySelector("#sh-lead");
      hydrateImages(body).catch(() => {
      });
      body.querySelector("#sh-cover")?.addEventListener("click", (e) => {
        const b = e.target.closest("[data-cover]");
        if (!b) return;
        coverId = b.dataset.cover;
        body.querySelectorAll("[data-cover]").forEach((x) => x.classList.toggle("is-on", x === b));
      });
      body.querySelector("#sh-photos")?.addEventListener("click", (e) => {
        const b = e.target.closest("[data-pick]");
        if (!b) return;
        const id = b.dataset.pick;
        if (chosen.has(id)) chosen.delete(id);
        else chosen.add(id);
        b.classList.toggle("is-on", chosen.has(id));
      });
      body.querySelector("#sh-ledger")?.addEventListener("click", () => {
        showLedger = !showLedger;
        body.querySelector("#sh-ledger .switch").classList.toggle("is-on", showLedger);
      });
      body.querySelector("#sh-save").addEventListener("click", () => {
        saveShare(t.id, {
          title: titleEl.value.trim() || t.title,
          lead: leadEl.value.trim(),
          coverPhotoId: coverId,
          photoIds: [...chosen],
          showLedger
        });
        closeSheet();
        toast("已保存");
        render(false);
      });
    }
  });
}
function showShareOutSheet(tripId) {
  const t = getTrip(tripId);
  if (!t) return;
  const cfg = shareConfig(t);
  const days = (t.blocks || []).filter((b) => b.type === "day");
  const spent = ledgerSpent(t);
  const text = [
    `${cfg.title || t.title}`,
    `${fmtDateRange(t)}　${t.city || t.cityRaw || ""}`,
    cfg.lead ? `
${cfg.lead}` : "",
    "",
    ...days.map((d) => {
      const stops = (d.stops || []).filter((s) => s.story || s.duration);
      return `D${d.day} ${d.title || ""}${stops.length ? `
　${stops.map((s) => s.name).join(" · ")}` : ""}`;
    }),
    spent > 0 && cfg.showLedger ? `
花费 ${money(spent)}` : "",
    "",
    "—— 用「路书」记下的"
  ].filter((x) => x !== void 0).join("\n");
  const url = siteURL() + "#/share/" + t.id;
  openSheet({
    title: "分享这一趟",
    desc: "文案适合直接发微信；链接打开的是你这台设备上的分享页",
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
      body.addEventListener("click", async (e) => {
        const b = e.target.closest("[data-share]");
        if (!b) return;
        const payload = b.dataset.share === "text" ? text : url;
        closeSheet();
        try {
          await navigator.clipboard.writeText(payload);
          toast(b.dataset.share === "text" ? "文案已复制" : "链接已复制");
        } catch (_) {
          toast("复制失败，请手动选择");
        }
      });
    }
  });
}
function showPhotoSheet(tripId, bi, photoId) {
  const t = getTrip(tripId);
  const block = t?.blocks?.[bi];
  const photo = block?.photos?.find((p) => p.id === photoId);
  if (!photo) return;
  const when = [block.title, photo.at].filter(Boolean).join(" · ");
  openSheet({
    title: "照片",
    desc: esc(when),
    html: `
      <div class="photo-view">
        <span class="photo-view__img" data-img="${photo.imgId || ""}" data-demo-src="${photo.demoSrc || ""}"></span>
      </div>
      ${photo.caption ? `<div class="photo-view__cap">${esc(photo.caption)}</div>` : ""}`,
    buttons: [
      { label: "删除", value: "del", kind: "danger" },
      { label: "关闭", value: null, kind: "primary" }
    ],
    onMount: (body) => {
      hydrateImages(body).catch(() => {
      });
    },
    onClose: async (v) => {
      if (v !== "del") return;
      const ok = await confirmDialog({
        title: "删掉这张照片？",
        message: "照片只存在这台设备上，删了就找不回来了。",
        okText: "删除",
        danger: true
      });
      if (!ok) return;
      await removePhoto(tripId, bi, photoId);
      toast("已删除");
      render(true);
    }
  });
}
function timelineHtml(stops, meals, dayNo) {
  if (!stops.length && !meals.length) return "";
  const items = [
    ...stops.map((s, si) => ({ kind: "stop", start: s.start || "", si, data: s })),
    ...meals.map((m) => ({ kind: "meal", start: m.start || "", data: m }))
  ];
  items.sort((a, b) => {
    if (a.start && b.start) return a.start < b.start ? -1 : a.start > b.start ? 1 : 0;
    if (a.start) return -1;
    if (b.start) return 1;
    return 0;
  });
  let firstStop = true;
  return `<div class="tl">${items.map((it) => {
    if (it.kind === "meal") return tlMeal(it.data);
    const html = tlStop(it.data, dayNo, it.si, firstStop);
    firstStop = false;
    return html;
  }).join("")}</div>`;
}
function blockHtml(b, i, tripId) {
  if (b.type === "day") {
    return `<div class="block block--day" id="dayblock-${i}" data-day="${b.day}">
      <div class="block__daytag">D${b.day}</div>
      ${b.title ? `<div class="block__title">${esc(b.title)}</div>` : ""}
      ${b.body ? `<div class="block__body">${esc(b.body)}</div>` : ""}
      ${timelineHtml(b.stops || [], b.meals || [], b.day)}
      ${photosHtml(b.photos || [], tripId, i)}
    </div>`;
  }
  if (b.type === "todo") {
    return `<div class="block">
      <div class="block__label">${icon("list", 13)} ${esc(b.title || "清单")}</div>
      ${(b.items || []).map((it, j) => `
        <div class="todo ${it.done ? "is-done" : ""}" data-act="toggle-todo" data-id="${tripId}" data-bi="${i}" data-ii="${j}">
          <div class="todo__box">${icon("check", 12)}</div>
          <div class="todo__text">${esc(it.t)}</div>
        </div>`).join("")}
    </div>`;
  }
  if (b.type === "link") {
    return `<a class="block block--link" href="${esc(b.url)}" target="_blank" rel="noopener noreferrer">
      <div class="block__icon">🔗</div>
      <div class="block__grow">
        <div class="block__title" style="margin:0">${esc(b.title || b.url)}</div>
        <div class="block__body">${esc(b.url)}</div>
      </div>
    </a>`;
  }
  return `<div class="block">
    ${b.title ? `<div class="block__label">${esc(b.title)}</div>` : ""}
    <div class="block__body">${esc(b.body)}</div>
  </div>`;
}
function showTripMenu(id) {
  const t = getTrip(id);
  if (!t) return;
  const st = tripState(t);
  const items = [];
  items.push({
    act: "share",
    label: st.status === STATUS.WISH ? "分享这个想法" : "分享这条路书",
    sub: "生成一条链接，谁打开就加到谁的手机里",
    icon: "link"
  });
  items.push({ act: "edit", label: "编辑", icon: "edit" });
  if (st.status === STATUS.DONE) {
    items.push({ act: "reopen", label: "拉回路上（改签/延期）", icon: "road" });
  }
  if (st.status === STATUS.WISH && t.promotedAt) {
    items.push({ act: "unhide-wish", label: "从「想去」中移出", icon: "archive" });
  }
  items.push({ act: "delete", label: "删除这条路书", icon: "trash", danger: true });
  openSheet({
    title: t.title,
    html: `<div class="menu">${items.map((i) => `
      <button class="menu__item ${i.danger ? "menu__item--danger" : ""}" data-menu-act="${i.act}">
        ${icon(i.icon)}
        <span><div>${i.label}</div>${i.sub ? `<div class="menu__item__sub">${i.sub}</div>` : ""}</span>
      </button>`).join("")}</div>`,
    onMount: (body) => {
      body.addEventListener("click", async (e) => {
        const b = e.target.closest("[data-menu-act]");
        if (!b) return;
        const act = b.dataset.menuAct;
        closeSheet();
        if (act === "edit") location.hash = `#/edit/${id}`;
        else if (act === "delete") {
          const ok = await confirmDialog({
            title: "删除这条路书？",
            message: `「${esc(t.title)}」会被永久删除，无法撤销。${t.cover?.imgId ? "封面图片也会一起删掉。" : ""}`,
            okText: "删除",
            danger: true
          });
          if (ok) {
            deleteTrip(id);
            toast("已删除");
            location.hash = "#/road";
          }
        } else if (act === "reopen") {
          setManualStatus(id, STATUS.ONGOING);
          toast("已拉回「路上」");
          render();
        } else if (act === "unhide-wish") {
          hideFromWish(id, true);
          toast("已从「想去」移出");
          render();
        } else if (act === "share") {
          showShareSheet(t);
        }
      });
    }
  });
}
function showShareSheet(t) {
  const link = makeShareLink(t);
  openSheet({
    title: "分享这条路书",
    desc: "对方打开链接后，会看到一条可导入的记录，点确认才会写进他手机的本地存储。",
    html: `
      <div class="notice"><span class="notice__icon">💡</span>
        <span>数据本身在链接里，不经过任何服务器。链接比较长是因为带了完整内容。</span></div>
      <textarea class="textarea input--mono" readonly rows="5" id="share-link">${esc(link)}</textarea>`,
    buttons: [
      { label: "关闭", value: null },
      { label: "复制链接", value: "copy", kind: "primary" }
    ],
    onMount: (body) => {
      const ta = body.querySelector("#share-link");
      ta?.addEventListener("click", () => ta.select());
    },
    onClose: async (v) => {
      if (v === "copy") {
        try {
          await navigator.clipboard.writeText(link);
          toast("链接已复制");
        } catch (_) {
          toast("复制失败，请长按手动复制");
        }
      }
    }
  });
}
function viewSettings() {
  const app2 = getApp();
  const total = app2.trips.length;
  const imgs = app2.trips.filter((t) => t.cover?.imgId).length;
  return `
  <div class="page page--nothread">
    <header class="topbar">
      <div class="topbar__row">
        <button class="icon-btn" data-act="back" aria-label="返回">${icon("back")}</button>
        <div class="topbar__title" style="font-size:21px;margin-left:2px">设置</div>
      </div>
    </header>
    <div class="scroll">
      <div class="section-label">本年度消费</div>
      <div class="block spend-card">
        ${(() => {
    const ys = yearSpent(app2.trips);
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
        <div class="kv"><span class="kv__k">最近修改</span><span class="kv__v">${esc(fmtRelative(app2.updatedAt))}</span></div>
      </div>

      <div class="notice" style="margin-top:14px">
        <span class="notice__icon">🔒</span>
        <span>所有内容只存在这台设备的这个浏览器里，不上传、不备份到云端。换手机、清缓存、换浏览器都会丢，请定期导出。</span>
      </div>

      <div class="section-label">备份与恢复</div>
      <div class="block" style="padding:6px 16px">
        <button class="menu__item" data-act="export-full" style="padding-left:0;padding-right:0">
          ${icon("download")}
          <span><div>导出完整备份</div><div class="menu__item__sub">含图片，换手机靠它</div></span>
        </button>
        <div class="divider"></div>
        <button class="menu__item" data-act="import-file" style="padding-left:0;padding-right:0">
          ${icon("upload")}
          <span><div>从备份文件恢复</div><div class="menu__item__sub">合并或覆盖，会让你选</div></span>
        </button>
      </div>

      <div class="section-label">示例数据</div>
      <div class="block" style="padding:6px 16px">
        <button class="menu__item" data-act="load-demo" style="padding-left:0;padding-right:0">
          ${icon("sparkle")}
          <span><div>载入示例数据</div><div class="menu__item__sub">9 条样例，看三种状态长什么样，不影响你已有的</div></span>
        </button>
      </div>

      <div class="section-label">AI 添加</div>
      <div class="block" style="padding:6px 16px">
        <button class="menu__item" data-act="paste-json" style="padding-left:0;padding-right:0">
          ${icon("wand")}
          <span><div>粘贴 AI 给的数据</div><div class="menu__item__sub">AI 输出一段 JSON，粘进来即可</div></span>
        </button>
        <div class="divider"></div>
        <button class="menu__item" data-act="ai-help" style="padding-left:0;padding-right:0">
          ${icon("sparkle")}
          <span><div>怎么让 AI 帮你加</div><div class="menu__item__sub">一段可以直接转发的话术</div></span>
        </button>
      </div>

      <div class="section-label">危险操作</div>
      <div class="block" style="padding:6px 16px">
        <button class="menu__item menu__item--danger" data-act="wipe" style="padding-left:0;padding-right:0">
          ${icon("trash")}
          <span><div>清空所有数据</div><div class="menu__item__sub">不可恢复，先导出备份</div></span>
        </button>
      </div>

      <div style="text-align:center;color:var(--muted);font-size:12px;padding:26px 0 40px">
        路书 · 数据留在你手里
      </div>
    </div>
  </div>`;
}
function buildAIPrompt() {
  const site = siteURL();
  const txtUrl = siteFile("ai.txt");
  const htmlUrl = siteFile("ai.html");
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
function showWelcome() {
  const demo = buildAIPrompt();
  try {
    localStorage.setItem("lushu.welcomed", "1");
  } catch (_) {
  }
  openSheet({
    title: "第一次用？让 AI 帮你记",
    desc: "点空白处就能关掉。以后想再看：右上角 ⚙ → 怎么让 AI 帮你加。",
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
      { label: "先自己逛逛", value: null },
      { label: "复制这段话", value: "copy", kind: "primary" }
    ],
    onMount: (body) => {
      body.querySelector("#welcome-prompt")?.addEventListener("click", (e) => e.target.select());
    },
    onClose: async (v) => {
      if (v !== "copy") return;
      try {
        await navigator.clipboard.writeText(demo);
        toast("已复制，发给 AI 就行");
      } catch (_) {
        toast("复制失败，请长按文字手动复制");
      }
    }
  });
}
function showMapPicker(target) {
  let loc = null;
  if (typeof target === "string") {
    loc = getTrip(target)?.location || null;
  } else if (target && typeof target === "object") {
    loc = target;
  }
  if (!loc || loc.lat == null || loc.lng == null) {
    toast("这个地点还没有坐标");
    return;
  }
  const last = readChoice();
  const rows = MAP_PROVIDERS.map((p) => `
    <button class="menu__item" data-map="${p.id}">
      <span class="map-badge">${esc(p.short.slice(0, 2))}</span>
      <span>
        <div>${esc(p.name)}</div>
        ${p.id === last ? '<div class="menu__item__sub">上次用的</div>' : ""}
      </span>
    </button>`).join("");
  openSheet({
    title: "用哪个地图打开",
    desc: `${esc(loc.name || "这个地点")}　${esc(coordText(loc))}`,
    html: `
      <div class="menu">${rows}</div>
      <button class="menu__item" data-map="copy">
        <span class="map-badge">⧉</span>
        <span><div>复制坐标</div><div class="menu__item__sub">粘到任意地图里搜索</div></span>
      </button>`,
    onMount: (body) => {
      body.addEventListener("click", async (e) => {
        const b = e.target.closest("[data-map]");
        if (!b) return;
        const id = b.dataset.map;
        closeSheet();
        if (id === "copy") {
          try {
            await navigator.clipboard.writeText(coordText(loc));
            toast("坐标已复制");
          } catch (_) {
            toast("复制失败");
          }
          return;
        }
        rememberChoice(id);
        window.open(mapUrl(id, loc), "_blank", "noopener");
      });
    }
  });
}
function showExpenseSheet(tripId) {
  const t = getTrip(tripId);
  if (!t) return;
  let amountEl;
  let titleEl;
  let dateEl;
  let cat = "transport";
  const cats = LEDGER_CATEGORIES.map((c) => `
    <button class="cat-chip${c.id === cat ? " is-active" : ""}" data-cat="${c.id}">
      <span>${c.emoji}</span>${c.name}
    </button>`).join("");
  openSheet({
    title: "记一笔",
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
      amountEl = body.querySelector("#ex-amount");
      titleEl = body.querySelector("#ex-title");
      dateEl = body.querySelector("#ex-date");
      body.querySelector("#cat-row").addEventListener("click", (e) => {
        const b = e.target.closest("[data-cat]");
        if (!b) return;
        cat = b.dataset.cat;
        body.querySelectorAll("[data-cat]").forEach((x) => x.classList.toggle("is-active", x === b));
      });
      body.querySelector("#ex-save").addEventListener("click", () => {
        const amount = Math.round(Number(amountEl.value));
        if (!Number.isFinite(amount) || amount <= 0) {
          toast("先填个金额");
          amountEl.focus();
          return;
        }
        addExpense(t.id, {
          amount,
          title: titleEl.value.trim() || categoryInfo(cat).name,
          category: cat,
          date: dateEl.value || todayStr()
        });
        closeSheet();
        toast("已记下");
        render(true);
      });
      setTimeout(() => amountEl?.focus(), 240);
    }
  });
}
function showBudgetSheet(tripId) {
  const t = getTrip(tripId);
  if (!t) return;
  let input;
  openSheet({
    title: "这趟的预算",
    desc: "填 0 或留空表示不设预算",
    html: `
      <div class="money-input">
        <span class="money-input__unit">¥</span>
        <input id="bg-input" type="number" inputmode="decimal" min="0" step="100"
               value="${t.ledger?.budget || ""}" placeholder="0">
      </div>
      <button class="btn btn--primary btn--block" id="bg-save" style="margin-top:14px">保存</button>`,
    onMount: (body) => {
      input = body.querySelector("#bg-input");
      body.querySelector("#bg-save").addEventListener("click", () => {
        const v = Math.max(0, Math.round(Number(input.value) || 0));
        setBudget(t.id, v);
        closeSheet();
        toast(v > 0 ? "预算已更新" : "已取消预算");
        render(true);
      });
      setTimeout(() => input?.focus(), 240);
    }
  });
}
function showAIHelp() {
  const demo = buildAIPrompt();
  openSheet({
    title: "让任何 AI 帮你加",
    desc: "复制下面这段话，连同你的需求一起发给元宝、千问、Kimi。链接打不开也没关系，话术里已经带了格式。",
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
      { label: "关闭", value: null },
      { label: "复制这段话", value: "copy", kind: "primary" }
    ],
    onMount: (body) => {
      body.querySelector("#ai-prompt")?.addEventListener("click", (e) => e.target.select());
    },
    onClose: async (v) => {
      if (v === "copy") {
        try {
          await navigator.clipboard.writeText(demo);
          toast("话术已复制");
        } catch (_) {
          toast("复制失败，请长按选择");
        }
      }
    }
  });
}
function showPasteJSON() {
  let ta = null;
  openSheet({
    title: "粘贴 AI 给的数据",
    desc: "把 AI 输出的 JSON 原样粘进来，多余的说明文字也没关系，会自动提取。",
    html: `<textarea class="textarea input--mono" rows="8" id="paste-in"
      placeholder='{"title":"南极 12 天","city":"南极","dateText":"2027年春节","brief":"..."}'></textarea>`,
    buttons: [
      { label: "取消", value: null },
      { label: "解析", value: "go", kind: "primary" }
    ],
    onMount: (body) => {
      ta = body.querySelector("#paste-in");
      setTimeout(() => ta?.focus(), 120);
    },
    onClose: (v) => {
      if (v !== "go") return;
      const txt = ta ? ta.value : "";
      if (!txt || !txt.trim()) {
        toast("还没粘贴内容");
        return;
      }
      window.__lushuParseText?.(txt);
    }
  });
}
async function hydrateImages(root = document) {
  const { getImageURL: getImageURL2 } = await Promise.resolve().then(() => (init_store(), store_exports));
  const nodes = [...root.querySelectorAll("[data-img]")];
  for (const n of nodes) {
    const id = n.dataset.img;
    const demo = n.dataset.demoSrc || "";
    const key = id || demo;
    if (!key || n.dataset.loaded === key) continue;
    let url = id ? await getImageURL2(id).catch(() => null) : null;
    if (!url) url = demo;
    if (!url) continue;
    let img = n.querySelector("img");
    if (!img) {
      img = document.createElement("img");
      img.alt = "";
      n.prepend(img);
    }
    img.src = url;
    n.dataset.loaded = key;
  }
}
var render = () => {
};
function bindRender(fn) {
  render = fn;
}

// js/editor.js
init_store();
init_store();
var M = null;
var isNew = true;
var oldImgId = null;
var emojiTouched = false;
var TYPE_NAME = { text: "正文", day: "日程", todo: "清单", link: "链接" };
function viewEdit(id) {
  isNew = !id;
  const existing = id ? getTrip(id) : null;
  oldImgId = existing?.cover?.imgId || null;
  emojiTouched = !!existing;
  M = existing ? JSON.parse(JSON.stringify(existing)) : {
    title: "",
    cityRaw: "",
    city: "",
    region: "other",
    dateMode: "none",
    startDate: null,
    endDate: null,
    dateText: "",
    roughYm: null,
    cover: { emoji: "📍", tone: 6, imgId: null },
    brief: "",
    blocks: [],
    promotedAt: null,
    manualStatus: null
  };
  return `
  <div class="page page--nothread">
    <header class="topbar">
      <div class="topbar__row">
        <button class="icon-btn" data-act="back" aria-label="返回">${icon("back")}</button>
        <div class="topbar__title" style="font-size:19px;margin-left:2px">${isNew ? "新建路书" : "编辑路书"}</div>
        <button class="btn btn--primary btn--sm" data-act="save-edit">保存</button>
      </div>
    </header>
    <div class="scroll" style="padding-bottom:60px">
      <div class="form">

        <div class="field">
          <div class="field__label">封面</div>
          <div class="cover-preview" id="cover-preview" style="background:${toneBg(M.cover.tone)}">
            ${M.cover.imgId ? `<img data-img="${esc(M.cover.imgId)}" id="cover-img" alt="">` : ""}
            <span class="cover-preview__emoji" id="cover-emoji">${esc(M.cover.emoji)}</span>
            <div class="cover-preview__tools">
              <label class="btn btn--sm">
                换图片
                <input type="file" accept="image/*" id="file-cover" hidden>
              </label>
              ${M.cover.imgId ? `<button class="btn btn--sm" data-act="clear-img">去掉</button>` : ""}
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
            <button class="seg__item ${M.dateMode === "none" ? "is-active" : ""}" data-dmode="none">暂不填</button>
            <button class="seg__item ${M.dateMode === "exact" ? "is-active" : ""}" data-dmode="exact">精确日期</button>
            <button class="seg__item ${M.dateMode === "fuzzy" ? "is-active" : ""}" data-dmode="fuzzy">模糊时间</button>
          </div>

          <div id="date-exact" style="display:${M.dateMode === "exact" ? "block" : "none"};margin-top:9px">
            <div class="row-2">
              <div>
                <div class="field__label" style="font-size:11px">出发</div>
                <input class="input" type="date" id="f-start" value="${esc(M.startDate || "")}">
              </div>
              <div>
                <div class="field__label" style="font-size:11px">返回</div>
                <input class="input" type="date" id="f-end" value="${esc(M.endDate || "")}">
              </div>
            </div>
            <div class="field__hint">填了返回日期，过了这天它会自动搬进「回顾」。只填出发日则会一直算「进行中」，直到你手动结束。</div>
          </div>

          <div id="date-fuzzy" style="display:${M.dateMode === "fuzzy" ? "block" : "none"};margin-top:9px">
            <input class="input" id="f-datetext" value="${esc(M.dateText)}" placeholder="比如：2027 年春节前后 / 等攒够假期">
            <div style="margin-top:9px">
              <div class="field__label" style="font-size:11px">大概哪个月（可选）</div>
              <input class="input" type="month" id="f-roughym" value="${esc(M.roughYm || "")}">
            </div>
            <div class="field__hint">模糊时间不会被自动归档。日子过了，详情页会问你一句「结束了吗」，你点头它才走。</div>
          </div>

          <div id="date-none" style="display:${M.dateMode === "none" ? "block" : "none"};margin-top:9px">
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
            ${EMOJIS.map((e) => `<button class="emoji-opt ${e === M.cover.emoji ? "is-active" : ""}" data-emoji="${e}">${e}</button>`).join("")}
          </div>
          <div class="tone-grid" style="margin-top:10px" id="tone-grid">
            ${TONES.map((g, i) => `<button class="tone-opt ${i === M.cover.tone ? "is-active" : ""}" data-tone="${i}" style="background:${g}"></button>`).join("")}
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
  if (!raw.trim()) return "<span>输入地名后会自动归类</span>";
  const hit = resolve(raw, getApp().aliases);
  if (hit) {
    const info = regionInfo(hit.region);
    return `<span>归入</span><b>${esc(info.name)}</b><span>·</span><span>${esc(hit.name)}</span>`;
  }
  return `<span>没认出这是哪儿 ——</span><button class="chip" data-act="pick-city" style="padding:1px 9px;font-size:12px">手动指定</button>`;
}
function blockEditorHtml(b, i) {
  const head = `<div class="block-editor__head">
      <span class="block-editor__type">${TYPE_NAME[b.type] || "正文"}</span>
      <button class="block-editor__del" data-act="block-del" data-i="${i}" aria-label="删除这一块">${icon("close", 13)}</button>
    </div>`;
  if (b.type === "todo") {
    return `<div class="block-editor" data-i="${i}" data-type="todo">
      ${head}
      <input class="input" data-f="title" value="${esc(b.title || "清单")}" placeholder="清单名称">
      <textarea class="textarea" data-f="body" placeholder="每行一项&#10;办阿根廷签证&#10;买冲锋衣">${esc((b.items || []).map((x) => x.t).join("\n"))}</textarea>
    </div>`;
  }
  if (b.type === "day") {
    return `<div class="block-editor" data-i="${i}" data-type="day">
      ${head}
      <div style="display:flex;gap:8px;align-items:center">
        <input class="input" data-f="day" type="number" min="1" max="99" value="${b.day || 1}" style="width:76px;flex:none">
        <input class="input" data-f="title" value="${esc(b.title || "")}" placeholder="这一天的安排">
      </div>
      <textarea class="textarea" data-f="body" placeholder="行程细节">${esc(b.body || "")}</textarea>
    </div>`;
  }
  if (b.type === "link") {
    return `<div class="block-editor" data-i="${i}" data-type="link">
      ${head}
      <input class="input" data-f="title" value="${esc(b.title || "")}" placeholder="链接标题">
      <input class="input" data-f="url" value="${esc(b.url || "")}" placeholder="https://" inputmode="url">
    </div>`;
  }
  return `<div class="block-editor" data-i="${i}" data-type="text">
    ${head}
    <input class="input" data-f="title" value="${esc(b.title || "")}" placeholder="小标题（可留空）">
    <textarea class="textarea" data-f="body" placeholder="写点什么">${esc(b.body || "")}</textarea>
  </div>`;
}
function renderBlocks() {
  const host = document.getElementById("blocks");
  if (!host) return;
  host.innerHTML = M.blocks.length ? M.blocks.map(blockEditorHtml).join("") : `<div style="font-size:13px;color:var(--muted);padding:4px 2px">还没有内容，可以从下面加一块。</div>`;
}
function mountEdit(root) {
  renderBlocks();
  hydrateCover();
  const title = root.querySelector("#f-title");
  title.addEventListener("input", () => {
    M.title = title.value;
  });
  const cityRaw = root.querySelector("#f-cityraw");
  const echo = root.querySelector("#city-echo");
  const onCity = () => {
    M.cityRaw = cityRaw.value;
    const hit = resolve(cityRaw.value, getApp().aliases);
    if (hit) {
      M.city = hit.name;
      M.region = hit.region;
      if (!emojiTouched) {
        const auto = emojiFor(cityRaw.value + " " + (title?.value || ""), hit.region);
        if (auto && auto !== M.cover.emoji) {
          M.cover.emoji = auto;
          root.querySelector("#cover-emoji").textContent = auto;
          root.querySelectorAll("#emoji-grid [data-emoji]").forEach(
            (b) => b.classList.toggle("is-active", b.dataset.emoji === auto)
          );
        }
      }
    } else {
      M.city = "";
      M.region = "other";
    }
    echo.innerHTML = cityEchoHtml(cityRaw.value);
  };
  cityRaw.addEventListener("input", onCity);
  const seg = root.querySelector("#date-seg");
  const boxes = {
    exact: root.querySelector("#date-exact"),
    fuzzy: root.querySelector("#date-fuzzy"),
    none: root.querySelector("#date-none")
  };
  seg.addEventListener("click", (e) => {
    const b = e.target.closest("[data-dmode]");
    if (!b) return;
    const mode = b.dataset.dmode;
    M.dateMode = mode;
    [...seg.children].forEach((c) => c.classList.toggle("is-active", c === b));
    Object.entries(boxes).forEach(([k, el]) => {
      el.style.display = k === mode ? "block" : "none";
    });
  });
  root.querySelector("#f-start")?.addEventListener("change", (e) => {
    M.startDate = e.target.value || null;
  });
  root.querySelector("#f-end")?.addEventListener("change", (e) => {
    M.endDate = e.target.value || null;
  });
  root.querySelector("#f-datetext")?.addEventListener("input", (e) => {
    M.dateText = e.target.value;
  });
  root.querySelector("#f-roughym")?.addEventListener("change", (e) => {
    M.roughYm = e.target.value || null;
  });
  const brief = root.querySelector("#f-brief");
  brief.addEventListener("input", () => {
    M.brief = brief.value;
  });
  const eg = root.querySelector("#emoji-grid");
  eg.addEventListener("click", (e) => {
    const b = e.target.closest("[data-emoji]");
    if (!b) return;
    emojiTouched = true;
    M.cover.emoji = b.dataset.emoji;
    [...eg.children].forEach((c) => c.classList.toggle("is-active", c === b));
    root.querySelector("#cover-emoji").textContent = M.cover.emoji;
  });
  const tg = root.querySelector("#tone-grid");
  tg.addEventListener("click", (e) => {
    const b = e.target.closest("[data-tone]");
    if (!b) return;
    M.cover.tone = Number(b.dataset.tone);
    [...tg.children].forEach((c) => c.classList.toggle("is-active", c === b));
    const pv = root.querySelector("#cover-preview");
    pv.style.background = toneBg(M.cover.tone);
  });
  const fileInput = root.querySelector("#file-cover");
  fileInput?.addEventListener("change", async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      toast("正在压缩图片…", 1200);
      const blob = await compressImage(f, 1600, 0.8);
      const id = await putImageBlob(blob);
      M.cover.imgId = id;
      const pv = root.querySelector("#cover-preview");
      let img = root.querySelector("#cover-img");
      if (!img) {
        img = document.createElement("img");
        img.id = "cover-img";
        pv.prepend(img);
      }
      img.src = URL.createObjectURL(blob);
      toast("封面已更新");
    } catch (err) {
      toast(err.message || "图片处理失败");
    }
  });
  root.querySelector('[data-act="clear-img"]')?.addEventListener("click", () => {
    M.cover.imgId = null;
    root.querySelector("#cover-img")?.remove();
  });
  const host = root.querySelector("#blocks");
  host.addEventListener("click", (e) => {
    const d = e.target.closest('[data-act="block-del"]');
    if (!d) return;
    collectBlocks(host);
    M.blocks.splice(Number(d.dataset.i), 1);
    renderBlocks();
  });
  root.querySelectorAll("[data-add-block]").forEach((btn) => {
    btn.addEventListener("click", () => {
      collectBlocks(host);
      const type = btn.dataset.addBlock;
      if (type === "day") {
        M.blocks.push({ type: "day", day: M.blocks.filter((b) => b.type === "day").length + 1, title: "", body: "" });
      } else if (type === "todo") {
        M.blocks.push({ type: "todo", title: "清单", items: [] });
      } else if (type === "link") {
        M.blocks.push({ type: "link", title: "", url: "" });
      } else {
        M.blocks.push({ type: "text", title: "", body: "" });
      }
      renderBlocks();
      const last = host.lastElementChild;
      last?.querySelector('textarea, input[data-f="url"]')?.focus();
    });
  });
  root.querySelector("#city-echo").addEventListener("click", (e) => {
    if (!e.target.closest('[data-act="pick-city"]')) return;
    showCityPicker(cityRaw.value, (place) => {
      M.city = place.name;
      M.region = place.region;
      addAlias(cityRaw.value, place.name);
      const info = regionInfo(place.region);
      echo.innerHTML = `<span>归入</span><b>${esc(info.name)}</b><span>·</span><span>${esc(place.name)}</span>`;
    });
  });
  root.querySelector('[data-act="save-edit"]').addEventListener("click", () => save2(root));
}
function collectBlocks(host) {
  const editors = [...host.querySelectorAll(".block-editor")];
  editors.forEach((el, idx) => {
    const i = Number(el.dataset.i);
    const type = el.dataset.type;
    const b = M.blocks[i];
    if (!b) return;
    const get = (f) => el.querySelector(`[data-f="${f}"]`)?.value ?? "";
    if (type === "todo") {
      b.title = get("title") || "清单";
      const old = b.items || [];
      const lines = get("body").split("\n").map((s) => s.trim()).filter(Boolean);
      b.items = lines.map((t) => {
        const prev = old.find((o) => o.t === t);
        return { t, done: prev ? prev.done : false };
      });
    } else if (type === "day") {
      b.day = Number(get("day")) || 1;
      b.title = get("title");
      b.body = get("body");
    } else if (type === "link") {
      b.title = get("title");
      b.url = get("url");
    } else {
      b.title = get("title");
      b.body = get("body");
    }
  });
}
async function save2(root) {
  const host = root.querySelector("#blocks");
  collectBlocks(host);
  const titleVal = root.querySelector("#f-title").value.trim();
  const cityVal = root.querySelector("#f-cityraw").value.trim();
  if (!titleVal && !cityVal) {
    toast("至少写个标题或地点");
    root.querySelector("#f-title").focus();
    return;
  }
  M.title = titleVal || cityVal || "未命名路书";
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
    startDate: M.dateMode === "exact" ? M.startDate : null,
    endDate: M.dateMode === "exact" ? M.endDate : null,
    dateText: M.dateMode === "fuzzy" ? M.dateText.trim() : "",
    roughYm: M.dateMode === "fuzzy" ? M.roughYm : null,
    cover: { ...M.cover },
    brief: M.brief.trim(),
    blocks: M.blocks.filter((b) => {
      if (b.type === "todo") return b.items && b.items.length;
      if (b.type === "link") return b.url;
      return (b.body || "").trim() || (b.title || "").trim();
    })
  };
  if (!emojiTouched) {
    payload.cover.emoji = emojiFor(`${cityVal} ${payload.title}`, M.region);
  }
  if (payload.startDate && payload.endDate && payload.startDate > payload.endDate) {
    [payload.startDate, payload.endDate] = [payload.endDate, payload.startDate];
  }
  if (isNew && payload.dateMode === "exact" && payload.startDate) {
    payload.promotedAt = (/* @__PURE__ */ new Date()).toISOString();
  }
  try {
    if (isNew) {
      const t = createTrip(payload);
      toast("已保存");
      location.hash = `#/trip/${t.id}`;
    } else {
      updateTrip(M.id, payload);
      if (oldImgId && oldImgId !== payload.cover.imgId) {
        deleteImage(oldImgId).catch(() => {
        });
      }
      toast("已更新");
      location.hash = `#/trip/${M.id}`;
    }
  } catch (e) {
    toast(e.message || "保存失败");
  }
}
function showCityPicker(raw, onPick) {
  const places = allPlaces();
  const grouped = /* @__PURE__ */ new Map();
  for (const p of places) {
    if (!grouped.has(p.region)) grouped.set(p.region, []);
    grouped.get(p.region).push(p);
  }
  const order = REGION_LIST.map((r) => r.id).filter((id) => grouped.has(id));
  openSheet({
    title: "指定城市",
    desc: raw ? `「${raw}」没被认出来，挑一个最接近的。以后同样的说法会自动认。` : "挑一个地点",
    html: `
      <input class="input" id="city-q" placeholder="搜索地名" style="margin-bottom:12px">
      <div id="city-list">
        ${order.map((rid) => {
      const info = regionInfo(rid);
      return `<div class="section-label" style="margin-top:8px">${info.emoji} ${esc(info.short)}</div>
            <div class="pill-row" data-region="${rid}">
              ${grouped.get(rid).map((p) => `<button class="chip" data-pick="${esc(p.name)}" data-region="${esc(p.region)}">${esc(p.name)}</button>`).join("")}
            </div>`;
    }).join("")}
      </div>`,
    buttons: [{ label: "取消", value: null }],
    onMount: (body) => {
      const q = body.querySelector("#city-q");
      q.addEventListener("input", () => {
        const k = q.value.trim().toLowerCase();
        body.querySelectorAll("[data-pick]").forEach((b) => {
          const hit = !k || b.dataset.pick.toLowerCase().includes(k);
          b.style.display = hit ? "" : "none";
        });
        body.querySelectorAll(".pill-row[data-region]").forEach((g) => {
          const any = [...g.querySelectorAll("[data-pick]")].some((b) => b.style.display !== "none");
          g.style.display = any ? "" : "none";
          const label = g.previousElementSibling;
          if (label?.classList.contains("section-label")) label.style.display = any ? "" : "none";
        });
      });
      body.addEventListener("click", (e) => {
        const b = e.target.closest("[data-pick]");
        if (!b) return;
        const name = b.dataset.pick;
        const region = b.dataset.region;
        closeSheet();
        onPick({ name, region });
        toast(`已指定为「${name}」`);
      });
    }
  });
}
async function hydrateCover() {
  const el = document.getElementById("cover-img");
  if (!el || !M?.cover?.imgId) return;
  const { getImageURL: getImageURL2 } = await Promise.resolve().then(() => (init_store(), store_exports));
  const url = await getImageURL2(M.cover.imgId).catch(() => null);
  if (url) el.src = url;
}

// js/app.js
var app = document.getElementById("app");
var query = "";
var navStack = [];
function parseHash() {
  const h = location.hash.replace(/^#/, "");
  if (!h || h === "/") return { name: "road" };
  const [path, qs] = h.split("?");
  const parts = path.split("/").filter(Boolean);
  if (parts[0] === "road") return { name: "road" };
  if (parts[0] === "wish") return { name: "wish" };
  if (parts[0] === "past") return { name: "past" };
  if (parts[0] === "settings") return { name: "settings" };
  if (parts[0] === "new") return { name: "edit", id: null };
  if (parts[0] === "trip" && parts[1]) return { name: "trip", id: parts[1] };
  if (parts[0] === "edit" && parts[1]) return { name: "edit", id: parts[1] };
  if (parts[0] === "share" && parts[1]) return { name: "share", id: parts[1] };
  if (parts[0] === "add") return { name: "road", add: qs || "" };
  return { name: "road" };
}
function route() {
  const r = parseHash();
  const prev = navStack[navStack.length - 1];
  const cur = location.hash || "#/road";
  if (prev !== cur) navStack.push(cur);
  if (navStack.length > 30) navStack = navStack.slice(-30);
  document.body.style.overflow = "";
  document.title = titleFor(r);
  if (r.name === "road" || r.name === "wish" || r.name === "past") {
    app.innerHTML = viewList(r.name, { q: query });
    bindSearch();
  } else if (r.name === "trip") {
    app.innerHTML = viewTrip(r.id);
    mountDayNav();
  } else if (r.name === "share") {
    app.innerHTML = viewShare(r.id);
  } else if (r.name === "settings") {
    app.innerHTML = viewSettings();
  } else if (r.name === "edit") {
    app.innerHTML = viewEdit(r.id);
    mountEdit(app);
  }
  hydrateImages(app).catch(() => {
  });
  const jumped = r.name === "trip" && jumpToToday(r.id);
  if (!jumped) window.scrollTo(0, 0);
  if (r.add) handleAddQuery(r.add);
}
function jumpToToday(tripId) {
  const t = getTrip(tripId);
  if (!t) return false;
  const prog = tripProgress(t);
  if (!prog || prog.notStarted || prog.over) return false;
  const el = document.querySelector(`.block--day[data-day="${prog.day}"]`);
  if (!el) return false;
  requestAnimationFrame(() => {
    el.scrollIntoView({ block: "start" });
    const nav = document.getElementById("day-nav");
    const pill = nav?.querySelector(`[data-day-jump="${el.id}"]`);
    if (nav && pill) {
      nav.querySelectorAll(".day-pill").forEach((p) => p.classList.remove("is-active"));
      pill.classList.add("is-active");
      nav.scrollLeft = pill.offsetLeft - nav.clientWidth / 2 + pill.offsetWidth / 2;
    }
  });
  return true;
}
function titleFor(r) {
  if (r.name === "road") return "在路书 · 旅行路书";
  if (r.name === "wish") return "想去 · 在路书";
  if (r.name === "past") return "回顾 · 在路书";
  if (r.name === "settings") return "设置 · 在路书";
  const t = r.id ? getTrip(r.id) : null;
  return (t ? t.title + " · " : "") + "在路书";
}
function go(hash) {
  if (location.hash === hash) {
    route();
    return;
  }
  location.hash = hash;
}
function back() {
  navStack.pop();
  let target = navStack[navStack.length - 1];
  while (target && (/\/edit\//.test(target) || /\/new$/.test(target))) {
    navStack.pop();
    target = navStack[navStack.length - 1];
  }
  if (target && target !== location.hash) location.hash = target;
  else location.hash = "#/road";
}
function reRender(preserveScroll = true) {
  const y = window.scrollY;
  const r = parseHash();
  document.title = titleFor(r);
  if (r.name === "road" || r.name === "wish" || r.name === "past") {
    app.innerHTML = viewList(r.name, { q: query });
    bindSearch();
  } else if (r.name === "trip") {
    app.innerHTML = viewTrip(r.id);
    mountDayNav();
  } else if (r.name === "share") {
    app.innerHTML = viewShare(r.id);
  } else if (r.name === "settings") {
    app.innerHTML = viewSettings();
  }
  hydrateImages(app).catch(() => {
  });
  if (preserveScroll) requestAnimationFrame(() => window.scrollTo(0, y));
}
function bindSearch() {
  const input = document.getElementById("q");
  if (!input) return;
  const onInput = debounce(() => {
    query = input.value;
    const scroll = document.querySelector(".scroll");
    if (!scroll) return;
    const r = parseHash();
    const tmp = document.createElement("div");
    tmp.innerHTML = viewList(r.name, { q: query });
    const newScroll = tmp.querySelector(".scroll");
    if (newScroll) scroll.innerHTML = newScroll.innerHTML;
    hydrateImages(app).catch(() => {
    });
  }, 180);
  input.addEventListener("input", onInput);
}
var dayNavScrollHandler = null;
function mountDayNav() {
  const nav = document.getElementById("day-nav");
  if (!nav) return;
  const blocks = [...document.querySelectorAll(".block--day")];
  if (!blocks.length) return;
  const pills = [...nav.querySelectorAll("[data-day-jump]")];
  const pillOf = new Map(pills.map((p) => [p.dataset.dayJump, p]));
  const setActive = (id, keepInView) => {
    for (const p of pills) p.classList.toggle("is-active", p.dataset.dayJump === id);
    if (!keepInView) return;
    const btn = pillOf.get(id);
    if (!btn) return;
    const navRect = nav.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const pad = 18;
    if (btnRect.left < navRect.left + pad) {
      nav.scrollLeft -= navRect.left + pad - btnRect.left;
    } else if (btnRect.right > navRect.right - pad) {
      nav.scrollLeft += btnRect.right - (navRect.right - pad);
    }
  };
  nav.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-day-jump]");
    if (!btn) return;
    const el = document.getElementById(btn.dataset.dayJump);
    if (!el) return;
    setActive(btn.dataset.dayJump, true);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  if (dayNavScrollHandler) {
    window.removeEventListener("scroll", dayNavScrollHandler);
    dayNavScrollHandler = null;
  }
  let ticking = false;
  dayNavScrollHandler = () => {
    if (!document.body.contains(nav)) {
      window.removeEventListener("scroll", dayNavScrollHandler);
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
  window.addEventListener("scroll", dayNavScrollHandler, { passive: true });
  setActive(blocks[0].id, false);
}
var HANDLED = /* @__PURE__ */ new Set([
  "tab",
  "new",
  "open",
  "back",
  "settings",
  "edit",
  "promote",
  "mark-done",
  "reopen",
  "unhide-wish",
  "trip-menu",
  "toggle-todo",
  "export-full",
  "import-file",
  "paste-json",
  "ai-help",
  "wipe",
  "clear-demo",
  "load-demo",
  "open-map",
  "add-expense",
  "set-budget",
  "del-expense",
  "story",
  "toggle-prep",
  "stop-map",
  "open-ledger",
  "add-photo",
  "view-photo",
  "open-share",
  "edit-share",
  "share-out",
  "share-back"
]);
document.addEventListener("click", async (e) => {
  const el = e.target.closest("[data-act]");
  if (!el) return;
  const act = el.dataset.act;
  if (!HANDLED.has(act)) return;
  const id = el.dataset.id;
  switch (act) {
    case "tab":
      go("#/" + el.dataset.tab);
      break;
    case "new":
      go("#/new");
      break;
    case "open":
      if (id) go("#/trip/" + id);
      break;
    case "back":
      back();
      break;
    case "settings":
      go("#/settings");
      break;
    case "edit":
      if (id) go("#/edit/" + id);
      break;
    case "promote": {
      e.stopPropagation();
      if (!id) break;
      promoteTrip(id);
      toast("已加入「路上」");
      go("#/trip/" + id);
      break;
    }
    case "mark-done": {
      e.stopPropagation();
      if (!id) break;
      const ok = await confirmDialog({
        title: "这段行程结束了吗？",
        message: "确认后它会从「路上」搬到「回顾」，随时可以再拉回来。",
        okText: "结束了"
      });
      if (ok) {
        setManualStatus(id, STATUS.DONE);
        toast("已归档到「回顾」");
        reRender(false);
      }
      break;
    }
    case "reopen": {
      e.stopPropagation();
      if (!id) break;
      setManualStatus(id, STATUS.ONGOING);
      toast("已拉回「路上」");
      reRender(false);
      break;
    }
    case "unhide-wish": {
      e.stopPropagation();
      if (!id) break;
      hideFromWish(id, true);
      toast("已从「想去」移出，攻略本身还在");
      reRender();
      break;
    }
    case "trip-menu":
      if (id) showTripMenu(id);
      break;
    case "toggle-todo": {
      const t = getTrip(el.dataset.id || id);
      if (!t) break;
      const bi = Number(el.dataset.bi);
      const ii = Number(el.dataset.ii);
      const block = t.blocks[bi];
      if (!block?.items?.[ii]) break;
      block.items[ii].done = !block.items[ii].done;
      updateTrip(t.id, { blocks: t.blocks });
      el.classList.toggle("is-done", block.items[ii].done);
      break;
    }
    case "export-full":
      await doExport();
      break;
    case "import-file":
      pickBackupFile();
      break;
    case "paste-json":
      showPasteJSON();
      break;
    case "ai-help":
      showAIHelp();
      break;
    case "clear-demo": {
      const demos = getApp().trips.filter((t) => t.demo);
      const ok = await confirmDialog({
        title: "清空示例数据？",
        message: `将删除 <b>${demos.length}</b> 条示例路书。<br><br>你自己添加的内容不受影响。清空之后，这个按钮不会再出现。`,
        okText: "清空",
        danger: true
      });
      if (!ok) break;
      const removed = clearDemo();
      toast(`已清空 ${removed} 条示例`);
      reRender(false);
      break;
    }
    case "load-demo": {
      const res = loadDemo();
      if (res.already) {
        toast("示例已经在库里了");
        break;
      }
      toast(`已载入 ${res.added} 条示例`);
      go("#/road");
      reRender(false);
      break;
    }
    case "open-ledger":
      showLedgerSheet(el.dataset.id);
      break;
    case "add-photo":
      showPhotoSourceSheet(el.dataset.id, Number(el.dataset.bi));
      break;
    case "open-share":
      location.hash = "#/share/" + el.dataset.id;
      break;
    case "edit-share":
      showShareEditSheet(el.dataset.id);
      break;
    case "share-out":
      showShareOutSheet(el.dataset.id);
      break;
    case "share-back":
      history.length > 1 ? history.back() : location.hash = "#/past";
      break;
    case "view-photo":
      showPhotoSheet(el.dataset.id, Number(el.dataset.bi), el.dataset.pid);
      break;
    case "open-map":
      showMapPicker(el.dataset.id);
      break;
    case "stop-map":
      showMapPicker({
        lat: Number(el.dataset.lat),
        lng: Number(el.dataset.lng),
        name: el.dataset.name || ""
      });
      break;
    case "story": {
      const body = document.getElementById(el.dataset.target);
      if (!body) break;
      const opening = body.hidden;
      body.hidden = !opening;
      el.classList.toggle("is-open", opening);
      el.querySelector(".stop__more-plus").textContent = opening ? "－" : "＋";
      break;
    }
    case "toggle-prep": {
      const body = document.getElementById("prep-body");
      if (!body) break;
      const opening = body.hidden;
      body.hidden = !opening;
      el.classList.toggle("is-open", opening);
      el.setAttribute("aria-expanded", opening ? "true" : "false");
      break;
    }
    case "add-expense":
      showExpenseSheet(el.dataset.id);
      break;
    case "set-budget":
      showBudgetSheet(el.dataset.id);
      break;
    case "del-expense": {
      const t = getTrip(el.dataset.id);
      const entry = t?.ledger?.entries?.find((x) => x.id === el.dataset.eid);
      if (!entry) break;
      const ok = await confirmDialog({
        title: "删掉这笔？",
        message: `${esc(entry.title)}　¥${entry.amount.toLocaleString("zh-CN")}<br><br>删掉后不影响其他记录。`,
        okText: "删除",
        danger: true
      });
      if (!ok) break;
      removeExpense(el.dataset.id, el.dataset.eid);
      toast("已删除");
      reRender(true);
      break;
    }
    case "wipe": {
      const ok1 = await confirmDialog({
        title: "清空所有数据？",
        message: "所有路书和封面图片都会被删除，无法恢复。<br><br>如果还没导出过备份，建议先去上面导一份。",
        okText: "继续",
        danger: true
      });
      if (!ok1) break;
      const ok2 = await confirmDialog({
        title: "最后一次确认",
        message: `真的要删掉全部 ${getApp().trips.length} 条路书吗？`,
        okText: "全部删除",
        danger: true
      });
      if (ok2) {
        await wipeAll();
        toast("已清空");
        go("#/road");
        reRender(false);
      }
      break;
    }
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  const el = document.activeElement;
  if (el?.dataset?.act === "open") el.click();
});
async function doExport() {
  try {
    toast("正在打包…", 1600);
    const data = await exportBackup({ includeImages: true });
    const name = `路书备份-${todayStr()}.json`;
    download(name, JSON.stringify(data));
    toast("已导出 " + name);
  } catch (e) {
    toast(e.message || "导出失败");
  }
}
function pickBackupFile() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json,application/json";
  input.onchange = async () => {
    const f = input.files?.[0];
    if (!f) return;
    try {
      const text = await f.text();
      const data = JSON.parse(text);
      if (!Array.isArray(data.trips)) {
        const drafts = toDrafts(data, "wish");
        if (!drafts.length) throw new Error("这个文件里没有可用的路书");
        showImportPreview(drafts, { kind: "file" });
        return;
      }
      const mode = await confirmDialog({
        title: "怎么合并？",
        message: `文件里有 <b>${data.trips.length}</b> 条记录。<br><br><b>合并</b>：只添加本地没有的，不动现有数据。<br><b>覆盖</b>：用文件里的完全替换当前所有数据。`,
        okText: "合并",
        cancelText: "覆盖"
      });
      const res = await importBackup(data, mode ? "merge" : "replace");
      toast(res.replaced ? `已覆盖，${res.added} 条` : `已合并，新增 ${res.added} 条`);
      reRender(false);
    } catch (e) {
      toast("读取失败：" + (e.message || "文件格式不对"));
    }
  };
  input.click();
}
async function handleAddQuery(qs) {
  const raw = qs.startsWith("?") ? qs.slice(1) : qs;
  history.replaceState(null, "", location.pathname + location.search + "#/road");
  navStack = ["#/road"];
  const params = new URLSearchParams(raw);
  const d = params.get("d") || params.get("data") || params.get("payload");
  if (!d) {
    toast("链接里没有数据");
    return;
  }
  try {
    const payload = decodePayload(d);
    const drafts = toDrafts(payload, "wish");
    if (!drafts.length) throw new Error("没认出里面有什么路书");
    showImportPreview(drafts, { kind: "link", raw: d });
  } catch (e) {
    toast("导入失败：" + (e.message || "格式无法识别"));
  }
}
window.__lushuParseText = (txt) => {
  try {
    const payload = decodePayload(txt);
    const drafts = toDrafts(payload, "wish");
    if (!drafts.length) throw new Error("没认出里面有什么路书");
    showImportPreview(drafts, { kind: "paste" });
  } catch (e) {
    toast("解析失败：" + (e.message || "格式无法识别"));
  }
};
function showImportPreview(drafts, meta = {}) {
  const sourceText = {
    link: "来自一条导入链接",
    paste: "来自你粘贴的内容",
    file: "来自选中的文件",
    ai: "来自 AI"
  }[meta.kind] || "来自外部";
  const cards = drafts.map((d) => {
    const info = regionInfo(d.region);
    const blocks = (d.blocks || []).length;
    const dateTxt = d.dateMode === "exact" ? `${d.startDate || ""}${d.endDate ? " → " + d.endDate : ""}` : d.dateText || (d.roughYm || "时间未定");
    return `<div class="import-preview">
      <div class="import-preview__head">
        <div class="import-preview__cover" style="background:${toneBg(d.cover?.tone)}">${esc(d.cover?.emoji || "📍")}</div>
        <div>
          <div class="import-preview__title">${esc(d.title)}</div>
          <div class="import-preview__meta">${info.emoji} ${esc(info.name)} · ${esc(d.city || "未识别")}</div>
        </div>
      </div>
      <div class="import-preview__row"><b>时间</b><span>${esc(dateTxt)}</span></div>
      ${d.brief ? `<div class="import-preview__row"><b>一句话</b><span>${esc(d.brief)}</span></div>` : ""}
      <div class="import-preview__row"><b>内容</b><span>${blocks ? blocks + " 个内容块" : "暂无正文"}</span></div>
    </div>`;
  }).join("");
  openSheet({
    title: drafts.length > 1 ? `发现 ${drafts.length} 条路书` : "发现一条路书",
    desc: `${sourceText}。确认后才会写进这台手机的本地存储。`,
    html: `
      <div class="notice"><span class="notice__icon">🛡</span>
        <span>导入只会新增，不会修改或删除你已有的路书。看着不对就点取消。</span></div>
      ${cards}
      ${meta.raw ? `<details style="margin-top:6px"><summary style="font-size:12px;color:var(--muted);cursor:pointer">查看原始数据</summary>
        <div class="import-preview__raw" style="margin-top:8px">${esc(meta.raw.slice(0, 2e3))}</div></details>` : ""}`,
    buttons: [
      { label: "取消", value: null },
      { label: "先放进想去", value: "wish" },
      { label: "直接开始攻略", value: "road", kind: "primary" }
    ],
    onClose: async (v) => {
      if (!v) return;
      try {
        let n = 0;
        for (const d of drafts) {
          if (v === "wish") {
            d.promotedAt = null;
          } else if (!d.promotedAt) {
            d.promotedAt = (/* @__PURE__ */ new Date()).toISOString();
          }
          const { _matched, ...rest } = d;
          createTrip(rest);
          n++;
        }
        toast(`已加入 ${n} 条路书`);
        go(v === "wish" ? "#/wish" : "#/road");
      } catch (e) {
        toast(e.message || "写入失败");
      }
    }
  });
}
async function boot() {
  try {
    load();
    await reconcile();
    const fromImport = /add\?/i.test(location.hash || "");
    if (!demoSed() && getApp().trips.length === 0 && !fromImport) {
      seedDemo();
    }
  } catch (e) {
    console.error(e);
  }
  bindRender((keep) => reRender(!!keep));
  window.addEventListener("hashchange", route);
  if (!location.hash) {
    history.replaceState(null, "", "#/road");
  }
  route();
  try {
    const welcomed = localStorage.getItem("lushu.welcomed");
    const isEmpty = getApp().trips.length === 0;
    if (!welcomed && isEmpty) {
      let interacted = false;
      window.addEventListener("pointerdown", () => {
        interacted = true;
      }, { once: true, capture: true });
      setTimeout(() => {
        if (interacted || isSheetOpen()) return;
        showWelcome();
      }, 700);
    }
  } catch (_) {
  }
  try {
    const used = new Blob([localStorage.getItem("lushu.v1") || ""]).size;
    if (used > 3.8 * 1024 * 1024) {
      setTimeout(() => toast("本地存储快满了，建议导出备份并删掉一些封面图", 4e3), 2400);
    }
  } catch (_) {
  }
}
boot();
