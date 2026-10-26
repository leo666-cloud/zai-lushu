/**
 * maps.js — 把地点坐标变成能唤起地图 App 的链接
 *
 * 坐标系约定：**一律存 WGS84**（国际标准，维基/Google/OSM 都是它）。
 * 输出时再按目标地图转换：
 *   · 高德 / 中国区 Apple → GCJ02（境内偏移）
 *   · 百度              → GCJ02 再转 BD09
 *   · Google            → 直接用 WGS84
 *   · 境外坐标三者都不转换
 *
 * 浏览器拿不到"系统默认地图"，所以这里做的是：按平台预选一个最可能的，
 * 同时让用户能换，并记住上次的选择。
 */

const PI = Math.PI;
const A = 6378245.0;
const EE = 0.00669342162296594323;

const inChina = (lat, lng) => lng > 73.66 && lng < 135.05 && lat > 3.86 && lat < 53.55;

function tLat(x, y) {
  let r = -100 + 2 * x + 3 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
  r += ((20 * Math.sin(6 * x * PI) + 20 * Math.sin(2 * x * PI)) * 2) / 3;
  r += ((20 * Math.sin(y * PI) + 40 * Math.sin((y / 3) * PI)) * 2) / 3;
  r += ((160 * Math.sin((y / 12) * PI) + 320 * Math.sin((y * PI) / 30)) * 2) / 3;
  return r;
}

function tLng(x, y) {
  let r = 300 + x + 2 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
  r += ((20 * Math.sin(6 * x * PI) + 20 * Math.sin(2 * x * PI)) * 2) / 3;
  r += ((20 * Math.sin(x * PI) + 40 * Math.sin((x / 3) * PI)) * 2) / 3;
  r += ((150 * Math.sin((x / 12) * PI) + 300 * Math.sin((x / 30) * PI)) * 2) / 3;
  return r;
}

/** WGS84 → GCJ02（标准算法） */
function wgs84ToGcj02(lat, lng) {
  if (!inChina(lat, lng)) return { lat, lng };
  const dLatRaw = tLat(lng - 105, lat - 35);
  const dLngRaw = tLng(lng - 105, lat - 35);
  const radLat = (lat / 180) * PI;
  let magic = Math.sin(radLat);
  magic = 1 - EE * magic * magic;
  const sqrtMagic = Math.sqrt(magic);
  const dLat = (dLatRaw * 180) / (((A * (1 - EE)) / (magic * sqrtMagic)) * PI);
  const dLng = (dLngRaw * 180) / ((A / sqrtMagic) * Math.cos(radLat) * PI);
  return { lat: lat + dLat, lng: lng + dLng };
}

/** 标准 GCJ02 → BD09 */
function gcj02ToBd09(lat, lng) {
  const z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * PI * 3000 / 180);
  const theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * PI * 3000 / 180);
  return { lat: z * Math.sin(theta) + 0.006, lng: z * Math.cos(theta) + 0.0065 };
}

/**
 * GCJ02 → WGS84
 * 用正向公式求偏移量再减回去，误差 < 2m，对定位足够
 */
function gcj02ToWgs84(lat, lng) {
  if (!inChina(lat, lng)) return { lat, lng };
  const g = wgs84ToGcj02(lat, lng);
  return { lat: lat * 2 - g.lat, lng: lng * 2 - g.lng };
}

/* ------------------------------------------------------------------ */

export const MAP_PROVIDERS = [
  { id: 'amap', name: '高德地图', short: '高德' },
  { id: 'baidu', name: '百度地图', short: '百度' },
  { id: 'apple', name: 'Apple 地图', short: 'Apple' },
  { id: 'google', name: 'Google 地图', short: 'Google' },
];

export function detectPlatform() {
  const ua = navigator.userAgent || '';
  if (/iPhone|iPad|iPod/i.test(ua)) return 'ios';
  if (/Android/i.test(ua)) return 'android';
  return 'desktop';
}

/** 按平台猜一个最可能对的地图 */
export function defaultProvider() {
  const saved = readChoice();
  if (saved) return saved;
  return 'amap';
}

const KEY = 'lushu.mapProvider';

export function readChoice() {
  try {
    const v = localStorage.getItem(KEY);
    return MAP_PROVIDERS.some((p) => p.id === v) ? v : null;
  } catch (_) {
    return null;
  }
}

export function rememberChoice(id) {
  try {
    localStorage.setItem(KEY, id);
  } catch (_) { /* ignore */ }
}

/** 生成某个地图 App 的打开地址。loc 里存的是 WGS84 */
export function mapUrl(provider, loc) {
  if (!loc) return '';
  const { lat, lng } = loc;
  const name = loc.name || '目的地';
  const label = encodeURIComponent(name);
  const cn = inChina(lat, lng);
  const gcj = cn ? wgs84ToGcj02(lat, lng) : { lat, lng };

  switch (provider) {
    case 'amap':
      // coordinate=gaode 告诉高德：我传的是 GCJ02
      return `https://uri.amap.com/marker?position=${gcj.lng.toFixed(5)},${gcj.lat.toFixed(5)}&name=${label}&coordinate=gaode&callnative=1&src=lushu`;

    case 'baidu': {
      const p = cn ? gcj02ToBd09(gcj.lat, gcj.lng) : gcj;
      return `https://api.map.baidu.com/marker?location=${p.lat.toFixed(5)},${p.lng.toFixed(5)}&title=${label}&content=${label}&output=html&coord_type=bd09ll&src=webapp.lushu`;
    }

    case 'apple':
      // 中国区 Apple 地图用 GCJ02
      return `https://maps.apple.com/?ll=${gcj.lat.toFixed(5)},${gcj.lng.toFixed(5)}&q=${label}`;

    case 'google':
      // Google 就用 WGS84，不转
      return `https://www.google.com/maps/search/?api=1&query=${lat.toFixed(5)},${lng.toFixed(5)}`;

    default:
      return `https://uri.amap.com/marker?position=${gcj.lng.toFixed(5)},${gcj.lat.toFixed(5)}&name=${label}`;
  }
}

/** 复制到剪贴板的通用坐标串 */
export function coordText(loc) {
  return `${loc.lat.toFixed(5)}, ${loc.lng.toFixed(5)}`;
}
