/**
 * build.mjs — 把所有 JS 模块打成一个文件
 *
 * 为什么需要：浏览器对 `max-age` 缓存过的 .js 不会重新请求，改服务端头也救不回来。
 * 打包成新文件名（bundle.js）后，旧缓存自然失效；配合 no-cache 头，
 * 之后每次改代码刷新就能看到。
 *
 * 用法：node scripts/build.mjs
 */
import path from 'node:path';
import fs from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
let esbuild;
try {
  esbuild = require('esbuild');
} catch {
  console.error('缺少依赖：先运行 npm install');
  process.exit(1);
}

const ROOT = path.resolve(import.meta.dirname, '..');

const result = await esbuild.build({
  entryPoints: [path.join(ROOT, 'js/app.js')],
  bundle: true,
  format: 'esm',
  target: ['safari15', 'chrome100'],
  outfile: path.join(ROOT, 'bundle.js'),
  minify: false,
  charset: 'utf8',
  legalComments: 'none',
  logLevel: 'warning',
});

if (result.errors.length) {
  console.error('打包失败');
  process.exit(1);
}

const stat = fs.statSync(path.join(ROOT, 'bundle.js'));
const raw = fs.statSync(path.join(ROOT, 'js/app.js')).size;

// 统计源码总大小，方便对比
const srcFiles = fs.readdirSync(path.join(ROOT, 'js')).filter((f) => f.endsWith('.js'));
const srcTotal = srcFiles.reduce((n, f) => n + fs.statSync(path.join(ROOT, 'js', f)).size, 0);

console.log('打包完成 → bundle.js');
console.log(`  源码 ${srcFiles.length} 个文件 / ${(srcTotal / 1024).toFixed(1)} KB`);
console.log(`  产物 1 个文件 / ${(stat.size / 1024).toFixed(1)} KB`);
