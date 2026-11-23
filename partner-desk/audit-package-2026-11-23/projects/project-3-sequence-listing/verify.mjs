/* Project 3 verification — headless Chrome (puppeteer).
   Proves, against the built listing:
   · the 240-frame journey plays under scroll: many distinct
     displayed frames, the final frame reached, all 240 frames
     loaded, zero failed;
   · at each part board's midpoint exactly one callout is
     visible, and its leader tip lands on the storyboard's
     measured point (within 2 px — the Phase 0 method);
   · the workshop miniature demonstrates error recovery: its
     deliberately broken frame is counted as failed while the
     player keeps running;
   · on a phone-width viewport the mobile frame set is the
     source and the journey still completes;
   · reduced motion: the static path stands (poster + beats
     as a reading list), zero errors.
   Run: node verify.mjs  (serves the artifacts root itself) */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import puppeteer from 'puppeteer';

/* THE CONTRACT TEST. Every expectation about the callouts —
   titles, sides, tips — is parsed from M2's storyboard, never
   hard-coded from the page. (First grading round: this harness
   once expected the page's own improvised titles and so could
   not see the page drift from the boards. Rule: a test is
   written against the contract as read.) */
const storyboard = await readFile(join(process.cwd(), '..', 'm2-storyboard', 'STORYBOARD.md'), 'utf8');
const boardsSlice = storyboard.slice(storyboard.indexOf('**Board 0'), storyboard.indexOf('## Transitions'));
const norm = (s) => s.replace(/\s+/g, ' ').trim();
const SB_TITLES = [...boardsSlice.matchAll(/Title: `([^`]+)`/g)].map((m) => norm(m[1]));
const SB_SIDES = [...boardsSlice.matchAll(/Side: (left|right|center)/g)].map((m) => m[1]);
const SB_TIPS = [...boardsSlice.matchAll(/Tip:[^(]*\(([0-9.]+), ([0-9.]+)\)/g)].map((m) => [Number(m[1]), Number(m[2])]);
if (SB_TITLES.length !== 8 || SB_SIDES.length !== 8 || SB_TIPS.length !== 7) {
  console.error(`storyboard parse failed: titles=${SB_TITLES.length} sides=${SB_SIDES.length} tips=${SB_TIPS.length}`);
  process.exit(2);
}

const ROOT = join(process.cwd(), '..');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.mp4': 'video/mp4', '.vtt': 'text/vtt', '.webm': 'video/webm', '.jpg': 'image/jpeg' };
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
const base = `http://127.0.0.1:${server.address().port}/project-3-sequence-listing/`;

const checks = [];
const check = (name, ok, detail) => { checks.push({ name, ok, detail }); console.log(`${ok ? 'PASS' : 'FAIL'}  ${name} — ${detail}`); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ args: ['--no-sandbox'] });

/* ================= DESKTOP ================= */
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 800 });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
const badResponses = new Set();
page.on('response', (r) => { if (r.status() >= 400) badResponses.add(new URL(r.url()).pathname.split('/').pop()); });
await page.goto(base, { waitUntil: 'networkidle0', timeout: 90000 });
await sleep(800);

const geo = await page.evaluate(() => {
  const s = document.getElementById('journey');
  return { top: s.offsetTop, height: s.offsetHeight, vh: innerHeight };
});
const progressAt = (p) => geo.top + p * (geo.height - geo.vh);
const shownFrame = () => page.$eval('[data-ro="shown"]', (el) => Number(el.textContent));

/* The player starts its preload when the stage first intersects
   (its documented discipline) — bring the stage into view, then
   wait for the full order. */
await page.evaluate((y) => scrollTo(0, y), geo.top + 10);
await sleep(400);
let loaded = 0;
for (let i = 0; i < 60 && loaded < 240; i++) {
  /* a live page is woken by scroll — nudge it, as a visitor's
     hand would, so the chase paints the loading state */
  await page.evaluate((y) => scrollTo(0, y), geo.top + 10 + (i % 2) * 3);
  loaded = await page.$eval('[data-ro="loaded"]', (el) => Number(el.textContent));
  if (loaded < 240) await sleep(500);
}
check('all 240 frames load', loaded === 240, `loaded=${loaded}`);

/* scroll the whole journey, sampling displayed frames */
const seen = new Set();
for (let i = 0; i <= 52; i++) {
  await page.evaluate((y) => scrollTo(0, y), progressAt(i / 52));
  await sleep(160);
  seen.add(await shownFrame());
}
await page.evaluate((y) => scrollTo(0, y), progressAt(1) + 50);
await sleep(1200);
const finalFrame = await shownFrame();
check('journey plays through many distinct frames', seen.size >= 40, `${seen.size} distinct displayed frames sampled`);
check('final frame reached', finalFrame >= 238, `displayed=${finalFrame}`);
const failedMain = await page.$eval('[data-ro="failed"]', (el) => el.textContent).catch(() => '0');
const failedHidden = await page.evaluate(() => document.querySelector('[data-ro="failedwrap"]').hidden);
check('main sequence: zero failures', failedHidden === true, `failedwrap hidden=${failedHidden}`);

/* the page's callouts must BE the storyboard's boards:
   titles, sides and tips, in order, read from the contract */
const pageBoards = await page.evaluate(() => [...document.querySelectorAll('[data-callout]')].map((c) => ({
  title: c.querySelector('.cl-title').textContent,
  side: c.classList.contains('left') ? 'left' : c.classList.contains('right') ? 'right' : 'center',
  tip: c.dataset.calloutTip || null,
})));
const tipEq = (attr, xy) => {
  if (!attr || !xy) return attr === null && xy === undefined;
  const [x, y] = attr.split(',').map(Number);
  return Math.abs(x - xy[0]) < 1e-9 && Math.abs(y - xy[1]) < 1e-9;
};
const boardsMatch = pageBoards.length === 8 && pageBoards.every((b, i) =>
  b.title === SB_TITLES[i] && b.side === SB_SIDES[i]
  && (i < 7 ? tipEq(b.tip, SB_TIPS[i]) : b.tip === null));
check('callouts are the storyboard’s boards (titles, sides, tips)', boardsMatch,
  boardsMatch ? 'all 8 boards match STORYBOARD.md' : JSON.stringify(pageBoards.map((b, i) => [b.title === SB_TITLES[i], b.side === SB_SIDES[i], b.tip])));

/* beat midpoints: exactly one visible callout + tip geometry
   (windows and tips from the storyboard, via the contract) */
const BEATS = [
  { mid: 0.20, tip: SB_TIPS[1], name: SB_TITLES[1] },
  { mid: 0.34, tip: SB_TIPS[2], name: SB_TITLES[2] },
  { mid: 0.45, tip: SB_TIPS[3], name: SB_TITLES[3] },
  { mid: 0.55, tip: SB_TIPS[4], name: SB_TITLES[4] },
  { mid: 0.64, tip: SB_TIPS[5], name: SB_TITLES[5] },
  { mid: 0.73, tip: SB_TIPS[6], name: SB_TITLES[6] },
];
for (const beat of BEATS) {
  await page.evaluate((y) => scrollTo(0, y), progressAt(beat.mid));
  await sleep(1500); // let the chase settle onto the target frame
  const res = await page.evaluate(() => {
    const stage = document.querySelector('.sq-stage');
    const sr = stage.getBoundingClientRect();
    const visible = [...document.querySelectorAll('[data-callout]')]
      .filter((c) => Number(getComputedStyle(c).opacity) > 0.5);
    const dot = [...stage.querySelectorAll('.cl-leader-dot')]
      .find((d) => Number(getComputedStyle(d.parentNode).opacity) > 0.5);
    let dotAt = null;
    if (dot) { const r = dot.getBoundingClientRect(); dotAt = [(r.left + r.width / 2 - sr.left), (r.top + r.height / 2 - sr.top)]; }
    return { visibleCount: visible.length, title: visible[0] ? visible[0].querySelector('.cl-title').textContent : null, dotAt, stageW: sr.width, stageH: sr.height };
  });
  /* The expectation is the storyboard tip passed through the
     cover-fit transform (frames are 960×540; the stage is not
     obliged to be 16:9) — the same math the component performs. */
  const s = Math.max(res.stageW / 960, res.stageH / 540);
  const expX = (res.stageW - 960 * s) / 2 + beat.tip[0] * 960 * s;
  const expY = (res.stageH - 540 * s) / 2 + beat.tip[1] * 540 * s;
  const tipErr = res.dotAt ? Math.max(Math.abs(res.dotAt[0] - expX), Math.abs(res.dotAt[1] - expY)) : 999;
  check(`beat ${beat.name}: one callout, tip on the measured point`,
    res.visibleCount === 1 && res.title === beat.name && tipErr <= 2,
    `visible=${res.visibleCount} title=${res.title} tipErr=${tipErr.toFixed(1)}px`);
}

/* workshop miniature: error recovery */
await page.evaluate(() => document.querySelector('.workshop').scrollIntoView());
await sleep(600);
for (let i = 0; i < 12; i++) { await page.evaluate((dy) => scrollBy(0, dy), 120); await sleep(120); }
let mini = { loaded: '0', failed: '0' };
for (let i = 0; i < 30 && !(mini.loaded === '5' && mini.failed === '1'); i++) {
  await page.evaluate((dy) => scrollBy(0, dy), i % 2 ? 24 : -24); // keep the chase awake, as a visitor's hand does
  mini = await page.evaluate(() => ({
    loaded: document.getElementById('mini-loaded').textContent,
    failed: document.getElementById('mini-failed').textContent,
  }));
  if (!(mini.loaded === '5' && mini.failed === '1')) await sleep(400);
}
check('workshop miniature: broken frame counted, player alive', mini.loaded === '5' && mini.failed === '1', JSON.stringify(mini));

check('desktop: zero page errors', errors.length === 0, errors.slice(0, 3).join(' | ') || 'none');
check('desktop: the only failed resource is the deliberate one',
  badResponses.size === 1 && badResponses.has('deliberately-missing.webp'),
  [...badResponses].join(', ') || 'none');
await page.close();

/* ================= MOBILE ================= */
const mob = await browser.newPage();
await mob.setViewport({ width: 390, height: 844 });
const merrors = [];
mob.on('pageerror', (e) => merrors.push(String(e)));
const mbad = new Set();
mob.on('response', (r) => { if (r.status() >= 400) mbad.add(new URL(r.url()).pathname.split('/').pop()); });
await mob.goto(base, { waitUntil: 'networkidle0', timeout: 90000 });
await sleep(600);
const mgeo = await mob.evaluate(() => {
  const s = document.getElementById('journey');
  return { top: s.offsetTop, height: s.offsetHeight, vh: innerHeight };
});
await mob.evaluate((y) => scrollTo(0, y), mgeo.top + 10);
await sleep(400);
const usedMobileSet = await mob.evaluate(() =>
  performance.getEntriesByType('resource').some((r) => r.name.includes('/frames-m/')));
check('mobile viewport uses the mobile frame set', usedMobileSet, 'frames-m requests observed');
let mloaded = 0;
for (let i = 0; i < 60 && mloaded < 240; i++) {
  await mob.evaluate((y) => scrollTo(0, y), mgeo.top + 10 + (i % 2) * 3);
  mloaded = await mob.$eval('[data-ro="loaded"]', (el) => Number(el.textContent));
  if (mloaded < 240) await sleep(500);
}
await mob.evaluate((y) => scrollTo(0, y), mgeo.top + (mgeo.height - mgeo.vh) + 50);
await sleep(1500);
const mfinal = await mob.$eval('[data-ro="shown"]', (el) => Number(el.textContent));
check('mobile journey completes', mloaded === 240 && mfinal >= 238, `loaded=${mloaded} displayed=${mfinal}`);
check('mobile: zero page errors, no failed resources on this path',
  merrors.length === 0 && mbad.size === 0,
  `pageerrors=${merrors.length} bad=${[...mbad].join(',') || 'none'} (the deliberate-failure proof lives on the desktop path, which visits the workshop)`);
await mob.close();

/* ================= REDUCED MOTION ================= */
const rm = await browser.newPage();
await rm.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
await rm.setViewport({ width: 1280, height: 800 });
const rerrors = [];
rm.on('pageerror', (e) => rerrors.push(String(e)));
await rm.goto(base, { waitUntil: 'networkidle0', timeout: 90000 });
await sleep(600);
const rmState = await rm.evaluate(() => ({
  reducedClass: document.getElementById('journey').classList.contains('sq-reduced'),
  beatsVisible: [...document.querySelectorAll('[data-callout]')].every((c) => Number(getComputedStyle(c).opacity) > 0.5),
}));
check('reduced motion: static path, beats readable as a list', rmState.reducedClass && rmState.beatsVisible, JSON.stringify(rmState));
check('reduced motion: zero page errors', rerrors.length === 0, rerrors.slice(0, 2).join(' | ') || 'none');
await rm.close();

await browser.close();
server.close();
const failed = checks.filter((c) => !c.ok);
console.log(`\n${checks.length - failed.length}/${checks.length} checks passed`);
process.exit(failed.length ? 1 : 0);
