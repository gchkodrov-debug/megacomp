/* Project 7 verification — two halves.
   A. The rig, in Node, built from THE PAGE'S OWN filed
      keyframes (read out of the running page as
      window.__rigConfig — the contract as read, Rule 13):
      poses at keyframe times ARE the keyframes, tangents
      match across every join, the path length is finite
      and filed.
   B. The page, in headless Chrome: forty landings down the
      scroll — no camera step jumps; the bricks light in
      order across the third leg and unlight on the way
      back, and the HUD's printed lit count agrees with the
      scene's materials at both ends; the coin's turn is a
      function of scroll; at least three camera segments are
      traversed; reduced motion stands still; zero console
      errors.
   Run: node verify.mjs  (serves the artifacts root itself) */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { createRequire } from 'node:module';
import puppeteer from 'puppeteer';
import sharp from 'sharp';

const require = createRequire(import.meta.url);
const Rig = require('../engine/camera/camera-choreography.js');

const checks = [];
const check = (name, ok, detail) => { checks.push({ name, ok, detail }); console.log(`${ok ? 'PASS' : 'FAIL'}  ${name} — ${detail}`); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const near = (a, b, eps) => Math.abs(a - b) <= eps;
const vecNear = (a, b, eps) => a.every((v, i) => near(v, b[i], eps));
const dist3 = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

/* ---------- serve + load the page first: the contract is read from it ---------- */
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
const base = `http://127.0.0.1:${server.address().port}/project-7-scroll-3d/`;

const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push(String(e)));
await page.setViewport({ width: 1100, height: 900 });
await page.goto(base, { waitUntil: 'load', timeout: 90000 });
await page.waitForFunction(() => typeof window.__state === 'function' && Array.isArray(window.__rigConfig), { timeout: 60000 });
await sleep(900);
const KEYS = await page.evaluate(() => window.__rigConfig);

/* ---------- A. the rig, built from the page's filed keyframes ---------- */
const rig = Rig.createRig(KEYS);
{
  let ok = true;
  KEYS.forEach((k) => {
    const p = rig.poseAt(k.at);
    if (!vecNear(p.position, k.position, 1e-9) || !vecNear(p.target, k.target, 1e-9)) ok = false;
  });
  check('A1 poses at keyframes are the keyframes', ok,
    `position + target exact at all ${KEYS.length} \`at\` values, rig built from the page's __rigConfig`);
}
{
  // Tangent continuity: the direction of travel just before a
  // join vs just after it — the angle between them must be
  // small (a corner would read as a cut in flight).
  const eps = 0.004;
  let worst = 0;
  for (let i = 1; i < KEYS.length - 1; i++) {
    const at = KEYS[i].at;
    const before = rig.poseAt(at - eps).position, atP = rig.poseAt(at).position, after = rig.poseAt(at + eps).position;
    const v1 = before.map((v, j) => atP[j] - v), v2 = after.map((v, j) => v - atP[j]);
    const cos = (v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]) /
      (Math.hypot(...v1) * Math.hypot(...v2) || 1);
    worst = Math.max(worst, Math.acos(Math.min(1, Math.max(-1, cos))) * 180 / Math.PI);
  }
  check('A2 tangent continuity at joins', worst < 12, `worst direction change at a keyframe join: ${worst.toFixed(1)}° (a cut would read 40°+)`);
}
{
  const len = rig.pathLength();
  check('A3 path length finite + filed', Number.isFinite(len) && len > 10, `camera path ≈ ${len.toFixed(1)} units over the journey`);
}

/* ---------- B. the page under scroll ---------- */
async function scrollToFrac(frac) {
  await page.evaluate((f) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo(0, Math.round(max * f));
  }, frac);
  await sleep(260); // a few frames at headless rates
  return page.evaluate(() => window.__state());
}

// B1 · Endpoints: the page's camera stands on the first and last
//      keyframes of its own filed config.
{
  const s0 = await scrollToFrac(0);
  const s1 = await scrollToFrac(1);
  check('B1 endpoints match the keyframe contract',
    vecNear(s0.position, KEYS[0].position, 0.05) && vecNear(s1.position, KEYS[KEYS.length - 1].position, 0.05),
    `start (${s0.position.map((v) => v.toFixed(1))}) · end (${s1.position.map((v) => v.toFixed(1))})`);
}

// B1b · The live flight passes through the MIDDLE keyframes too:
//       at each keyframe's own scroll fraction, the camera read
//       off the scene stands on that keyframe. This binds the
//       exported config to the motion itself — the page cannot
//       fly one rig and file another. (Added at grading: the
//       different-family critic named the residue F4's fix
//       left — config bound to the harness, not yet to motion.)
{
  let ok = true;
  const seen = [];
  for (let i = 1; i < KEYS.length - 1; i++) {
    const s = await scrollToFrac(KEYS[i].at);
    const good = vecNear(s.position, KEYS[i].position, 0.05);
    if (!good) ok = false;
    seen.push(`at ${KEYS[i].at}: ${good ? 'on' : 'OFF'} keyframe`);
  }
  check('B1b live flight passes through the middle keyframes', ok, seen.join(' · '));
}

// B2 · Continuity under scroll: 40 landings, no jump. The budget
//      comes from the rig's own path length (≈26 units / 40 steps
//      ≈ 0.65 mean) — a cut would be several units in one step.
{
  const states = [];
  for (let i = 0; i <= 40; i++) states.push(await scrollToFrac(i / 40));
  let maxStep = 0, nan = false;
  for (let i = 1; i < states.length; i++) {
    const d = dist3(states[i].position, states[i - 1].position);
    if (!Number.isFinite(d)) nan = true;
    maxStep = Math.max(maxStep, d);
  }
  const segs = new Set(states.map((s) => s.segment));
  check('B2 no camera jump across 40 landings', !nan && maxStep < 1.4,
    `largest single-step move ${maxStep.toFixed(2)} units (path ≈ 26 units; a cut would be 5+)`);
  check('B3 multiple camera transitions traversed', segs.size >= 4,
    `segments visited: ${[...segs].sort().join(', ')} of 0–3`);
  // B4 · Coordinated animation: bricks + coin read the same clock.
  const at = (f) => states[Math.round(f * 40)];
  check('B4 bricks light in the third leg, coin turns with scroll',
    at(0.2).litCount === 0 && at(0.65).litCount > 0 && at(0.65).litCount < 47
      && at(1).litCount === 47 && Math.abs(at(1).coinRotY - at(0).coinRotY) > 6,
    `lit: t.2=${at(0.2).litCount}, t.65=${at(0.65).litCount}, t1=${at(1).litCount} · coin Δrot ${(Math.abs(at(1).coinRotY - at(0).coinRotY)).toFixed(1)} rad`);
  // B5 · The flight is reversible: home again, the wall is dark.
  const back = await scrollToFrac(0);
  check('B5 reverse scroll flies home', back.litCount === 0 && back.t < 0.02,
    `back at t=${back.t.toFixed(2)}, lit=${back.litCount}`);
  // B6 · The HUD prints the scene's own lit count (Rule 14):
  //      its text must agree with the materials at both ends.
  const hudTop = await page.evaluate(() => document.getElementById('hud').textContent);
  await scrollToFrac(1);
  const hudEnd = await page.evaluate(() => document.getElementById('hud').textContent);
  check('B6 HUD lit count = the scene\'s materials',
    /lit 0\/47/.test(hudTop) && /lit 47\/47/.test(hudEnd),
    `HUD at top: "${hudTop}" · at end: "${hudEnd}"`);
}

// B7 · The scene renders (screenshot: gold present at the end pose).
{
  await scrollToFrac(1);
  const shot = await page.screenshot();
  const { data, info } = await sharp(shot).raw().toBuffer({ resolveWithObject: true });
  let gold = 0, n = 0;
  for (let i = 0; i < data.length; i += info.channels * 9) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    if (r > 110 && g > 70 && b < 130 && r > b + 30) gold++;
    n++;
  }
  check('B7 end pose renders the lit wall', gold / n > 0.01, `${(100 * gold / n).toFixed(1)}% gold-ish pixels at t=1`);
}

// B8 · Reduced motion: the stage stands still, the text journey shows.
{
  const p2 = await browser.newPage();
  p2.on('pageerror', (e) => errors.push('reduced: ' + String(e)));
  await p2.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await p2.setViewport({ width: 1100, height: 900 });
  await p2.goto(base, { waitUntil: 'load', timeout: 90000 });
  await p2.waitForFunction(() => typeof window.__state === 'function', { timeout: 60000 });
  await sleep(600);
  const a = await p2.evaluate(() => window.__state());
  await p2.evaluate(() => window.scrollTo(0, 1500));
  await sleep(600);
  const b = await p2.evaluate(() => window.__state());
  const beatsVisible = await p2.evaluate(() => {
    const el = document.querySelector('.beats-static');
    return el && getComputedStyle(el).display !== 'none';
  });
  check('B8 reduced motion stands still + text journey visible',
    a.t === b.t && vecNear(a.position, b.position, 0.001) && beatsVisible,
    `t fixed at ${a.t}, camera unmoved by scroll, text beats shown`);
  await p2.close();
}

check('B9 zero console errors', errors.length === 0, errors.length ? errors.join(' | ') : 'clean');

await browser.close();
server.close();
const failed = checks.filter((c) => !c.ok);
console.log(`\n${checks.length - failed.length}/${checks.length} checks passed`);
process.exit(failed.length ? 1 : 0);
