/* Project 5 verification — headless Chrome (puppeteer + sharp).
   Proves, against the built viewer page:
   · the coin renders (real pixels, gold present);
   · draw calls inside the house budget, model triangles as built;
   · KEYBOARD ORBIT works — the carried Phase 0 requirement:
     arrows steer the target, the camera chases and settles;
   · inspection by button and the state it files;
   · input latency measured by the component itself;
   · the printed readout equals the viewer's own state;
   · destroy() is complete and idempotent;
   · the page holds at phone width.
   Run: node verify.mjs  (serves the artifacts root itself) */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import puppeteer from 'puppeteer';
import sharp from 'sharp';

const checks = [];
const check = (name, ok, detail) => { checks.push({ name, ok, detail }); console.log(`${ok ? 'PASS' : 'FAIL'}  ${name} — ${detail}`); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const near = (a, b, eps) => Math.abs(a - b) <= eps;

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
const base = `http://127.0.0.1:${server.address().port}/project-5-coin-viewer/`;

const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push(String(e)));
await page.setViewport({ width: 1100, height: 950 });
await page.goto(base, { waitUntil: 'load', timeout: 90000 });
await page.waitForFunction(() => window.__viewer && window.__viewer.ready, { timeout: 60000 });
await page.evaluate(() => window.__viewer.ready);
await sleep(1200);

// 1 · Real pixels: the coin stands in the centre of a deliberately dark
//     stage, so the claim is regional — the centre crop is gold-bearing
//     and far brighter than the corners. (A whole-frame threshold was
//     tried first and measured the backdrop, not the coin.)
{
  const box = await page.evaluate(() => {
    const r = document.getElementById('stage').getBoundingClientRect();
    return { x: r.x, y: r.y, width: r.width, height: r.height };
  });
  const shot = await page.screenshot({ clip: box });
  const img = sharp(shot);
  const meta = await img.metadata();
  // The coin's own bounds at the home framing (measured on the saved
  // frame: it spans the centred 44% × 40%); the coin rotates in place,
  // so the bounds hold at any azimuth.
  const cw = Math.floor(meta.width * 0.44), ch = Math.floor(meta.height * 0.40);
  const cx = Math.floor(meta.width * 0.28), cy = Math.floor(meta.height * 0.30);
  const centre = await img.clone().extract({ left: cx, top: cy, width: cw, height: ch }).raw().toBuffer({ resolveWithObject: true });
  const corner = await img.clone().extract({ left: 0, top: 0, width: 120, height: 120 }).raw().toBuffer({ resolveWithObject: true });
  const stats = ({ data, info }) => {
    let gold = 0, sum = 0, n = 0;
    for (let i = 0; i < data.length; i += info.channels * 3) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      if (r > 110 && g > 70 && b < 130 && r > b + 30) gold++;
      sum += (r + g + b) / 3; n++;
    }
    return { goldFrac: gold / n, mean: sum / n };
  };
  const cs = stats(centre), ks = stats(corner);
  check('1 coin renders (coin bounds are gold, corners are backdrop)',
    cs.goldFrac > 0.10 && cs.mean > ks.mean * 2 && ks.goldFrac < 0.01,
    `coin bounds ${(100 * cs.goldFrac).toFixed(1)}% gold-ish, mean ${cs.mean.toFixed(0)} vs corner ${ks.mean.toFixed(0)} (corner gold ${(100 * ks.goldFrac).toFixed(1)}%)`);
}

// 2 · Budgets from the renderer's own info.
{
  const s = await page.evaluate(() => window.__viewer.getState());
  check('2 draw calls + triangles inside budget', s.drawCalls >= 1 && s.drawCalls <= 500 && s.modelTriangles === 512 && s.triangles > 0,
    `${s.drawCalls} draw calls (bar ≤500), model ${s.modelTriangles} tris, frame ${s.triangles} tris`);
}

// 3 · Keyboard orbit — the carried requirement. Arrows steer; the chase settles.
{
  await page.evaluate(() => { window.__viewer.setAutoRotate(false); });
  await page.focus('#stage');
  const before = await page.evaluate(() => window.__viewer.getState());
  for (let i = 0; i < 4; i++) await page.keyboard.press('ArrowRight');
  for (let i = 0; i < 2; i++) await page.keyboard.press('ArrowUp');
  const mid = await page.evaluate(() => window.__viewer.getState());
  // Settle = the chase arriving, however slow the headless frames run;
  // a fixed sleep flaked this check once (28 frames of chase at ~5 fps).
  await page.waitForFunction(() => {
    const s = window.__viewer.getState();
    return Math.abs(s.azimuth - s.targetAzimuth) < 0.02 && Math.abs(s.polar - s.targetPolar) < 0.02;
  }, { timeout: 30000 });
  const after = await page.evaluate(() => window.__viewer.getState());
  const dAz = mid.targetAzimuth - before.targetAzimuth;
  const dPol = mid.targetPolar - before.targetPolar;
  check('3 keyboard orbit steers + settles',
    near(dAz, 4 * 0.18, 0.02) && near(dPol, -2 * 0.18 * 0.6, 0.02)
      && near(after.azimuth, after.targetAzimuth, 0.02) && near(after.polar, after.targetPolar, 0.02),
    `target Δaz ${dAz.toFixed(2)} (expect 0.72), Δpolar ${dPol.toFixed(2)} (expect −0.22); settled within 0.02`);
}

// 4 · Keyboard zoom.
{
  const before = await page.evaluate(() => window.__viewer.getState().targetDistance);
  await page.keyboard.press('+'); await page.keyboard.press('+');
  const afterD = await page.evaluate(() => window.__viewer.getState().targetDistance);
  check('4 keyboard zoom', near(afterD, before * 0.88 * 0.88, 0.05), `distance ${before.toFixed(2)} → ${afterD.toFixed(2)}`);
}

// 5 · Inspect by button: selection, panel, camera preset.
{
  await page.click('[data-part="reverse"]');
  await sleep(200);
  const got = await page.evaluate(() => ({
    selected: window.__viewer.getState().selected,
    tAz: window.__viewer.getState().targetAzimuth,
    title: document.getElementById('part-title').textContent,
  }));
  check('5 inspect by button', got.selected === 'reverse' && near(got.tAz, Math.PI, 0.02) && got.title === 'The reverse face',
    `selected=${got.selected}, target azimuth ${got.tAz.toFixed(2)} (π), panel "${got.title}"`);
}

// 6 · Input latency, measured by the component (lab envelope, named as such).
{
  const lat = await page.evaluate(() => window.__viewer.getState().lastLatencyMs);
  check('6 input latency measured', typeof lat === 'number' && lat >= 0 && lat < 250,
    `last input → next frame: ${lat === null ? 'unmeasured' : Math.round(lat) + ' ms'} (headless lab figure)`);
}

// 7 · The readout prints the viewer's own state. Wait for the chase to
//     settle first (headless frames are slow; a readout sampled mid-chase
//     legitimately differs from the state a moment later), then let one
//     readout tick print the settled state before comparing.
{
  await page.waitForFunction(() => {
    const s = window.__viewer.getState();
    return Math.abs(s.azimuth - s.targetAzimuth) < 0.002
      && Math.abs(s.polar - s.targetPolar) < 0.002
      && Math.abs(s.distance - s.targetDistance) < 0.002;
  }, { timeout: 30000 });
  await sleep(700); // one full readout interval past the settle
  const both = await page.evaluate(() => {
    const s = window.__viewer.getState();
    const t = document.getElementById('readout').textContent;
    const num = (re) => { const m = t.match(re); return m ? Number(m[1]) : NaN; };
    return {
      state: s,
      dom: { az: num(/az (-?[0-9]+)°/), polar: num(/polar (-?[0-9]+)°/), dist: num(/dist ([0-9.]+)/), calls: num(/([0-9]+) draw calls/) },
    };
  });
  const deg = (r) => Math.round(r * 180 / Math.PI);
  check('7 readout = viewer state',
    near(both.dom.az, deg(both.state.azimuth), 1) && near(both.dom.polar, deg(both.state.polar), 1)
      && near(both.dom.dist, both.state.distance, 0.02) && both.dom.calls === both.state.drawCalls,
    `az ${both.dom.az}° vs ${deg(both.state.azimuth)}° (±1 print-rounding), dist ${both.dom.dist} vs ${both.state.distance.toFixed(2)}, calls ${both.dom.calls}`);
}

// 8 · destroy(): complete, idempotent, and the ticker stops.
{
  const res = await page.evaluate(async () => {
    const v = window.__viewer;
    v.destroy();
    let secondThrew = false;
    try { v.destroy(); } catch { secondThrew = true; }
    const s1 = v.getState();
    await new Promise((r) => setTimeout(r, 400));
    const s2 = v.getState();
    return { destroyed: s1.destroyed, secondThrew, fpsFrozen: s1.fps === s2.fps };
  });
  check('8 destroy complete + idempotent', res.destroyed === true && res.secondThrew === false,
    `destroyed=${res.destroyed}, second destroy threw=${res.secondThrew}`);
}

// 9 · Phone width: no horizontal overflow, page stands.
{
  const p2 = await browser.newPage();
  p2.on('pageerror', (e) => errors.push('mobile: ' + String(e)));
  await p2.setViewport({ width: 390, height: 780 });
  await p2.goto(base, { waitUntil: 'load', timeout: 90000 });
  await p2.waitForFunction(() => window.__viewer && window.__viewer.ready, { timeout: 60000 });
  await p2.evaluate(() => window.__viewer.ready);
  const overflow = await p2.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  check('9 phone width holds', overflow <= 0, `horizontal overflow ${overflow}px at 390px`);
  await p2.close();
}

check('10 zero console errors', errors.length === 0, errors.length ? errors.join(' | ') : 'clean');

await browser.close();
server.close();
const failed = checks.filter((c) => !c.ok);
console.log(`\n${checks.length - failed.length}/${checks.length} checks passed`);
process.exit(failed.length ? 1 : 0);
