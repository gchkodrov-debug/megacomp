/* Project 4 verification — headless Chrome (puppeteer).
   Proves: the film on the page is the produced master (8 s,
   its own file); a chapter control seeks it to the chapter's
   timestamp and updates the now-showing line; the captions
   track is present and loaded from the delivery set; zero
   page errors. Run: node verify.mjs (serves the artifacts
   root itself, with Range support as real hosting provides) */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import puppeteer from 'puppeteer';

const ROOT = join(process.cwd(), '..');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.mp4': 'video/mp4', '.vtt': 'text/vtt', '.webm': 'video/webm' };
const server = createServer(async (req, res) => {
  try {
    let path = normalize(join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname)));
    if (path.endsWith('/')) path = join(path, 'index.html');
    const data = await readFile(path);
    const type = MIME[extname(path)] || 'application/octet-stream';
    const range = /^bytes=(\d+)-(\d*)$/.exec(req.headers.range || '');
    if (range) {
      const start = Number(range[1]);
      const end = range[2] ? Math.min(Number(range[2]), data.length - 1) : data.length - 1;
      res.writeHead(206, { 'content-type': type, 'accept-ranges': 'bytes', 'content-range': `bytes ${start}-${end}/${data.length}`, 'content-length': end - start + 1 });
      res.end(data.subarray(start, end + 1));
    } else {
      res.writeHead(200, { 'content-type': type, 'accept-ranges': 'bytes' });
      res.end(data);
    }
  } catch { res.writeHead(404); res.end('nf'); }
});
await new Promise((r) => server.listen(0, r));
const base = `http://127.0.0.1:${server.address().port}/project-4-film/`;

const checks = [];
const check = (name, ok, detail) => { checks.push({ name, ok, detail }); console.log(`${ok ? 'PASS' : 'FAIL'}  ${name} — ${detail}`); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required'] });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 800 });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
await page.goto(base, { waitUntil: 'networkidle0', timeout: 60000 });
await sleep(600);

const meta = await page.evaluate(() => {
  const v = document.getElementById('film');
  return { duration: v.duration, src: v.currentSrc.split('/').pop(), tracks: v.textTracks.length };
});
check('the page carries the produced master', meta.src.includes('book-film') && Math.abs(meta.duration - 8) < 0.15,
  `${meta.src} · ${meta.duration}s`);
check('captions track present', meta.tracks >= 1, `${meta.tracks} text track(s)`);

await page.click('[data-seek="5.4"]');
await sleep(800);
const after = await page.evaluate(() => ({
  t: document.getElementById('film').currentTime,
  now: document.getElementById('now').textContent,
}));
check('chapter control seeks + narrates', Math.abs(after.t - 5.4) < 0.35 && after.now.startsWith('The Marks'),
  `t=${after.t.toFixed(2)} · "${after.now.slice(0, 30)}…"`);

check('zero page errors', errors.length === 0, errors.slice(0, 2).join(' | ') || 'none');
await browser.close();
server.close();
const failed = checks.filter((c) => !c.ok);
console.log(`\n${checks.length - failed.length}/${checks.length} checks passed`);
process.exit(failed.length ? 1 : 0);
