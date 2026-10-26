/**
 * sync-ai.mjs — 由 ai.txt 生成 ai.html
 * 为什么要两份：
 *   ai.txt  体积小、纯文本，AI 直接读最省 token，但部分服务器不给 charset，可能乱码
 *   ai.html 带 <meta charset="utf-8">，任何环境都不会乱码，AI 抓网页时更稳
 * 改动 ai.txt 后务必重跑：node scripts/sync-ai.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const src = path.join(root, 'ai.txt');
const out = path.join(root, 'ai.html');

const raw = fs.readFileSync(src, 'utf8');
const esc = raw.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>路书 · AI 导入协议</title>
<meta name="description" content="路书网站的机器可读说明书：AI 读取这份协议即可为用户添加旅行记录。">
<link rel="icon" type="image/svg+xml" href="favicon.svg">
<link rel="alternate" type="text/plain" href="ai.txt">
<style>
  :root { color-scheme: light dark; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 40px 20px 80px;
    background: #F7F4EE;
    color: #1C1A17;
    font: 15px/1.75 -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif;
  }
  .wrap { max-width: 760px; margin: 0 auto; }
  .top {
    display: flex; align-items: baseline; gap: 12px;
    margin-bottom: 22px; padding-bottom: 16px;
    border-bottom: 1px solid #E6E0D5;
  }
  .top h1 { font-size: 20px; margin: 0; letter-spacing: -.02em; }
  .top a { margin-left: auto; font-size: 13px; color: #E4613C; text-decoration: none; }
  pre {
    margin: 0;
    white-space: pre-wrap;
    word-break: break-word;
    font: inherit;
    font-size: 13.5px;
    line-height: 1.85;
    background: #fff;
    border: 1px solid #E6E0D5;
    border-radius: 14px;
    padding: 22px 24px;
    box-shadow: 0 1px 2px rgba(28,26,23,.05), 0 8px 24px -12px rgba(28,26,23,.14);
  }
  @media (prefers-color-scheme: dark) {
    body { background: #121110; color: #F2EFE9; }
    .top { border-color: #302E29; }
    .top a { color: #FF7A52; }
    pre { background: #1E1D1A; border-color: #302E29; }
  }
</style>
</head>
<body>
<div class="wrap">
  <div class="top">
    <h1>路书 · AI 导入协议</h1>
    <a href="ai.txt">纯文本版 ai.txt</a>
  </div>
  <pre>${esc}</pre>
</div>
</body>
</html>
`;

fs.writeFileSync(out, html);
console.log('已生成 ai.html');
console.log('  源文件 ai.txt :', raw.length, '字符');
console.log('  输出 ai.html  :', html.length, '字节');
