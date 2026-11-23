/* Project 6 verification — headless Chrome (puppeteer + sharp).
   Proves, against the built page:
   · the shader path is real: WebGL stage, transitions run
     0→1, mid-transition pixels are neither endpoint;
   · both transitions (dissolve + swirl) complete;
   · the fallback is a shipped path: with WebGL disabled at
     the browser level the page stands in fallback mode and
     its crossfade still changes the picture;
   · the FPS of the shader path and of the fallback path are
     both measured, and the delta filed (the exam bar is the
     measurement, not a magnitude);
   · reduced motion makes transitions instant;
   · the readout prints the stage's own state.
   Run: node verify.mjs  (serves the artifacts root itself) */
import { createServer } from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import puppeteer from 'puppeteer';
import sharp from 'sharp';

const checks = [];
const check = (name, ok, detail) => { checks.push({ name, ok, detail }); console.log(`${ok ? 'PASS' : 'FAIL'}  ${name} — ${detail}`); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const ROOT = join(process.cwd(), '..');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.mp4': 'video/mp4', '.vtt': 'text/vtt', '.webm': 'video/webm', '.jpg': 'image/jpeg', '.glb': 'model/gltf-binary', '.json': 'application/json' };
const server = createServer(async (req, res) => {
  try {
    let path = normalize(join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname)));
    if (path.endsWith('/')) path = join(path, 'index.html');
    const data = await readFile(path);
    res.writeHead(200, { 'content-type': MIME[extname(path)] || 'application/octet-stream' });
    res.end(data);
  } catch { res.writeHead(404); res.end('nf'); }
});
await new Promise((r) => server.listen(0, r));
const base = `http://127.0.0.1:${server.address().port}/project-6-shader-site/`;

async function canvasShot(page) {
  const box = await page.evaluate(() => {
    const el = document.getElementById('stage').style.display !== 'none'
      ? document.getElementById('stage') : document.getElementById('fallback-stack');
    const r = el.getBoundingClientRect();
    return { x: r.x, y: r.y, width: r.width, height: r.height };
  });
  return page.screenshot({ clip: box });
}
async function meanColor(buf) {
  const { data, info } = await sharp(buf).raw().toBuffer({ resolveWithObject: true });
  let r = 0, g = 0, b = 0, n = 0;
  for (let i = 0; i < data.length; i += info.channels * 11) { r += data[i]; g += data[i + 1]; b += data[i + 2]; n++; }
  return [r / n, g / n, b / n];
}
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
function measureFps(page, ms) {
  return page.evaluate((dur) => new Promise((resolve) => {
    let frames = 0; const t0 = performance.now();
    function f() { frames++; if (performance.now() - t0 < dur) requestAnimationFrame(f); else resolve(Math.round(frames / ((performance.now() - t0) / 1000))); }
    requestAnimationFrame(f);
  }), ms);
}

/* ---------- the shader path ---------- */
const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push(String(e)));
await page.setViewport({ width: 1100, height: 1000 });
await page.goto(base, { waitUntil: 'load', timeout: 90000 });
await page.waitForFunction(() => window.__stage && window.__stage.getState().mode === 'shader', { timeout: 60000 });
await sleep(600);

const state0 = await page.evaluate(() => window.__stage.getState());
check('1 shader stage live', state0.mode === 'shader' && state0.current === 0 && state0.transitioning === false,
  `mode=${state0.mode}, scene=${state0.current}`);

const shotA = await canvasShot(page);
const colA = await meanColor(shotA);

// Dissolve to B, sampling mid-flight.
await page.click('#btn-b');
await page.waitForFunction(() => { const s = window.__stage.getState(); return s.transitioning && s.progress > 0.25 && s.progress < 0.8; }, { timeout: 30000 });
const shotMid = await canvasShot(page);
const colMid = await meanColor(shotMid);
const fpsShader = await measureFps(page, 900);
await page.waitForFunction(() => { const s = window.__stage.getState(); return !s.transitioning && s.current === 1; }, { timeout: 30000 });
const shotB = await canvasShot(page);
const colB = await meanColor(shotB);
check('2 dissolve runs + lands on scene B',
  dist(colMid, colA) > 4 && dist(colMid, colB) > 4 && dist(colA, colB) > 10,
  `mean colour A (${colA.map((v) => v.toFixed(0))}) → mid (${colMid.map((v) => v.toFixed(0))}) → B (${colB.map((v) => v.toFixed(0))}); mid is neither endpoint`);
await writeFile('evidence-mid-dissolve.png', shotMid);

// Swirl back to A.
await page.select('#sel-kind', 'swirl');
await page.click('#btn-a');
await page.waitForFunction(() => { const s = window.__stage.getState(); return s.transitioning && s.kind === 'swirl'; }, { timeout: 30000 });
await page.waitForFunction(() => { const s = window.__stage.getState(); return !s.transitioning && s.current === 0; }, { timeout: 30000 });
const shotA2 = await canvasShot(page);
const colA2 = await meanColor(shotA2);
check('3 swirl runs + lands back on scene A', dist(colA2, colA) < 3 && dist(colA2, colB) > 10,
  `returned mean (${colA2.map((v) => v.toFixed(0))}) vs A (${colA.map((v) => v.toFixed(0))})`);

// Readout truth.
{
  await sleep(400);
  const both = await page.evaluate(() => ({
    state: window.__stage.getState(),
    text: document.getElementById('readout').textContent,
  }));
  check('4 readout = stage state',
    both.text.includes('mode shader') && both.text.includes(`scene ${both.state.current}`) && both.text.includes(both.state.kind),
    `"${both.text}"`);
}

// Reduced motion: transitions are instant.
{
  const p2 = await browser.newPage();
  p2.on('pageerror', (e) => errors.push('reduced: ' + String(e)));
  await p2.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await p2.setViewport({ width: 1100, height: 1000 });
  await p2.goto(base, { waitUntil: 'load', timeout: 90000 });
  await p2.waitForFunction(() => window.__stage && window.__stage.getState().mode === 'shader', { timeout: 60000 });
  await sleep(400);
  await p2.click('#btn-b');
  await sleep(350);
  const s = await p2.evaluate(() => window.__stage.getState());
  check('5 reduced motion = instant transition', s.current === 1 && s.transitioning === false,
    `scene=${s.current} within 350 ms of the click under reduce`);
  await p2.close();
}
await browser.close();

/* ---------- the fallback path (WebGL disabled at the browser) ---------- */
const browser2 = await puppeteer.launch({ args: ['--no-sandbox', '--disable-webgl', '--disable-webgl2'] });
const fp = await browser2.newPage();
const ferrors = [];
fp.on('console', (m) => { if (m.type() === 'error') ferrors.push(m.text()); });
fp.on('pageerror', (e) => ferrors.push(String(e)));
await fp.setViewport({ width: 1100, height: 1000 });
await fp.goto(base, { waitUntil: 'load', timeout: 90000 });
await fp.waitForFunction(() => window.__stage && window.__stage.getState().mode === 'fallback', { timeout: 60000 });
await sleep(400);
const fState = await fp.evaluate(() => window.__stage.getState());
const fShotA = await canvasShot(fp);
const fColA = await meanColor(fShotA);
await fp.click('#btn-b');
const fpsFallback = await measureFps(fp, 900);
await sleep(1800);
const fShotB = await canvasShot(fp);
const fColB = await meanColor(fShotB);
const fState2 = await fp.evaluate(() => window.__stage.getState());
check('6 fallback ships: no-WebGL page stands + crossfades',
  fState.mode === 'fallback' && fState2.current === 1 && dist(fColA, fColB) > 10,
  `mode=${fState.mode}, scene ${fState.current}→${fState2.current}, mean colour moved ${dist(fColA, fColB).toFixed(1)}`);
await browser2.close();

check('7 FPS delta measured + filed (bar: the measurement exists)',
  Number.isFinite(fpsShader) && Number.isFinite(fpsFallback) && fpsShader > 0 && fpsFallback > 0,
  `shader path ${fpsShader} fps · fallback path ${fpsFallback} fps · delta ${fpsShader - fpsFallback} fps (headless SwiftShader lab figures; the shader's per-pixel noise field is the cost the delta prices)`);

check('8 zero console errors (both paths)', errors.length === 0 && ferrors.length === 0,
  [...errors, ...ferrors].join(' | ') || 'clean');

server.close();
const failed = checks.filter((c) => !c.ok);
console.log(`\n${checks.length - failed.length}/${checks.length} checks passed`);
process.exit(failed.length ? 1 : 0);
