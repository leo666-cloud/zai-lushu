/**
 * server.js — 线上与本地通用的静态服务器
 *
 * 存在的唯一理由：给 text/plain 补 charset=utf-8。
 * 默认的 python3 -m http.server 不返回 charset，
 * 中文的 ai.txt 在部分环境会被按错误编码解析，导致 AI 读到乱码。
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
};

// 不希望被直接下载的开发文件
const BLOCKED = new Set(['/server.js', '/package.json', '/package-lock.json', '/README.md', '/PLAN.md']);

const server = http.createServer((req, res) => {
  let urlPath;
  try {
    urlPath = decodeURIComponent(new URL(req.url, `http://${req.headers.host || 'localhost'}`).pathname);
  } catch {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Bad Request');
    return;
  }

  if (urlPath === '/') urlPath = '/index.html';
  if (urlPath === '/favicon.ico') {
    const svg = path.join(ROOT, 'favicon.svg');
    if (fs.existsSync(svg)) {
      res.writeHead(200, { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'max-age=86400' });
      fs.createReadStream(svg).pipe(res);
    } else {
      res.writeHead(204).end();
    }
    return;
  }
  if (BLOCKED.has(urlPath) || urlPath.startsWith('/scripts/')) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not Found');
    return;
  }

  const safe = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, '');
  const filePath = path.join(ROOT, safe);
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not Found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const isText = /^(text|application\/(json|javascript))/.test(MIME[ext] || '');
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Content-Length': stat.size,
      // 全部 no-cache：这个站点没有构建版本号，靠缓存头保证改完就能看到
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
      'X-Content-Type-Options': 'nosniff',
    });
    if (isText && req.method === 'HEAD') {
      res.end();
      return;
    }
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`路书 · running on http://${HOST}:${PORT}`);
});
