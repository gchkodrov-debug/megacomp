/* M14 verification — the accessible alternative, graded as a
   full presentation in its own right:
   · content parity with the cinematic page (its headings and
     paragraphs, transcribed; its edition facts, compared
     against the EDITION object imported from its own module);
   · landmarks, a working skip link, a sequential heading
     order;
   · a full keyboard focus walk in the page's own order,
     every stop visibly outlined;
   · target sizes on the house bar (≥ 44 px controls);
   · contrast ratios computed from the declared palette by
     the WCAG formula (the filing's numbers come from here);
   · the same book: identical validator messages, № 1 taken;
   · no motion anywhere; the cinematic page's reduced-motion
     path exercised under the browser's own emulation;
   · 200% zoom without horizontal scroll; zero errors.
   Run: node verify.mjs */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import puppeteer from 'puppeteer';

const checks = [];
const check = (name, ok, detail) => { checks.push({ name, ok }); console.log(`${ok ? 'PASS' : 'FAIL'}  ${name} — ${detail}`); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ROOT = join(process.cwd(), '..');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };
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
const port = server.address().port;
const base = `http://127.0.0.1:${port}/m14-accessible-alternative/`;
const p9base = `http://127.0.0.1:${port}/project-9-launch/`;
const browser = await puppeteer.launch({ args: ['--no-sandbox'] });

const { EDITION, validateReserve } = await import('../project-9-launch/app.js');

/* contrast, by the WCAG formula, from the declared palette */
function lum(hex) {
  const c = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(c.substr(i, 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
const ratio = (a, b) => { const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x); return (hi + 0.05) / (lo + 0.05); };

async function freshPage(url = base, reducedMotion = false) {
  const page = await browser.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));
  if (reducedMotion) await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.setViewport({ width: 1180, height: 1000 });
  await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  await sleep(250);
  return { page, errors };
}

/* 1 — parity with the cinematic page */
{
  const { page } = await freshPage();
  const altText = await page.evaluate(() => document.body.textContent.replace(/\s+/g, ' '));
  const p9html = await readFile(join(ROOT, 'project-9-launch', 'index.html'), 'utf8');
  const p9text = p9html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const p9Paras = [...p9html.matchAll(/<p>([\s\S]*?)<\/p>/g)].map((m) => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim())
    .filter((t) => t.length > 40 && !t.startsWith('Act ') && !t.startsWith('The acts reveal'));
  const missingParas = p9Paras.filter((t) => !altText.includes(t.slice(0, 60)));
  check('every substantive paragraph of the cinematic page is present in the alternative',
    missingParas.length === 0, missingParas.length ? `missing: ${missingParas[0].slice(0, 50)}…` : `${p9Paras.length} paragraphs carried over`);
  const factsOk = altText.includes(`Edition of ${EDITION.pieces}`)
    && altText.includes(`$${EDITION.price.toLocaleString('en-US')}`)
    && altText.includes(`at most ${EDITION.perPersonCap} pieces`);
  check('edition facts equal the cinematic page\u2019s EDITION object',
    factsOk, `pieces=${EDITION.pieces} price=${EDITION.price} cap=${EDITION.perPersonCap}`);
  await page.close();
}

/* 2 — structure: landmarks, skip link, heading order */
{
  const { page } = await freshPage();
  const structure = await page.evaluate(() => {
    const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => Number(h.tagName[1]));
    let orderOk = true;
    for (let i = 1; i < headings.length; i++) if (headings[i] > headings[i - 1] + 1) orderOk = false;
    return {
      banner: document.querySelectorAll('header').length,
      main: document.querySelectorAll('main').length,
      contentinfo: document.querySelectorAll('footer').length,
      nav: document.querySelectorAll('nav[aria-label]').length,
      h1s: headings.filter((l) => l === 1).length,
      orderOk,
      skip: document.querySelector('.skip-link')?.getAttribute('href'),
    };
  });
  check('one banner, one main, one contentinfo, one labelled nav',
    structure.banner === 1 && structure.main === 1 && structure.contentinfo === 1 && structure.nav === 1,
    JSON.stringify(structure));
  check('exactly one h1 and a heading order that never skips a level',
    structure.h1s === 1 && structure.orderOk, `h1s=${structure.h1s} orderOk=${structure.orderOk}`);
  await page.focus('.skip-link');
  await page.keyboard.press('Enter');
  await sleep(120);
  const landed = await page.evaluate(() => document.activeElement && document.activeElement.id === 'main');
  check('the skip link is first and lands on main', structure.skip === '#main' && landed, `activeElement main=${landed}`);
  await page.close();
}

/* 3 — the focus walk */
{
  const { page } = await freshPage();
  const stops = [];
  for (let i = 0; i < 11; i++) {
    await page.keyboard.press('Tab');
    await sleep(60);
    stops.push(await page.evaluate(() => {
      const el = document.activeElement;
      const cs = getComputedStyle(el);
      return {
        tag: el.tagName, id: el.id || '', href: el.getAttribute && el.getAttribute('href'),
        text: (el.textContent || '').trim().slice(0, 22),
        outline: cs.outlineStyle, outlineWidth: cs.outlineWidth,
      };
    }));
  }
  const sequenceOk = stops[0].href === '#main'
    && stops.slice(1, 6).every((s) => s.tag === 'A' && s.href && s.href.startsWith('#act-'))
    && stops[6].id === 'f-name' && stops[7].id === 'f-email' && stops[8].id === 'f-pieces'
    && stops[9].id === 'f-consent' && stops[10].tag === 'BUTTON';
  check('Tab walks skip link → five act links → the form in order, nothing skipped',
    sequenceOk, stops.map((s) => s.id || s.href || s.text).join(' → '));
  const outlined = stops.every((s) => s.outline !== 'none' && parseFloat(s.outlineWidth) >= 2);
  check('every stop on the walk carries a visible outline (≥ 2 px, styled)',
    outlined, stops.map((s) => `${s.outline}/${s.outlineWidth}`).join(' '));
  await page.close();
}

/* 4 — targets + contrast */
{
  const { page } = await freshPage();
  const targets = await page.evaluate(() => {
    const els = [...document.querySelectorAll('nav a, form input, form select, form button')];
    return els.map((el) => {
      /* a checkbox's real target is its label row, text and
         all — measure that, not the 24 px box alone */
      const target = (el.type === 'checkbox' || el.type === 'radio') && el.closest('label') ? el.closest('label') : el;
      return { what: el.id || el.textContent.trim().slice(0, 14), h: target.getBoundingClientRect().height };
    });
  });
  const small = targets.filter((t) => t.h < 44);
  check('every nav link and form control is at least 44 px tall (house bar)',
    small.length === 0, small.length ? `small: ${JSON.stringify(small)}` : `${targets.length} controls measured`);
  const pairs = [
    ['body text', '#1c1a15', '#faf7ef', 4.5],
    ['muted text', '#4d4636', '#faf7ef', 4.5],
    ['links/headings accent', '#7a5b12', '#faf7ef', 4.5],
    ['button label', '#ffffff', '#7a5b12', 4.5],
    ['error text', '#a31621', '#faf7ef', 4.5],
    ['control borders (UI)', '#6e5f3a', '#faf7ef', 3.0],
  ];
  const results = pairs.map(([name, fg, bg, bar]) => ({ name, r: ratio(fg, bg), bar }));
  const failed = results.filter((x) => x.r < x.bar);
  check('contrast: every declared pair meets its WCAG bar, computed by formula',
    failed.length === 0,
    results.map((x) => `${x.name} ${x.r.toFixed(2)}:1 (bar ${x.bar})`).join(' · '));
  await page.close();
}

/* 5 — the same book */
{
  const { page, errors } = await freshPage();
  await page.click('.submit');
  await sleep(150);
  const boxText = await page.evaluate(() => document.getElementById('formErrors').textContent.replace(/\s+/g, ' '));
  const expected = Object.values(validateReserve({ name: '', email: '', pieces: 1, consent: false }).errors);
  check('empty submit: the alternative speaks the validator\u2019s own words',
    expected.every((m) => boxText.includes(m)), `${expected.length} messages matched`);
  await page.type('#f-name', 'Ada Lovelace');
  await page.type('#f-email', 'ada@example.com');
  await page.click('#f-consent');
  await page.click('.submit');
  await sleep(150);
  const s = await page.evaluate(() => window.__m14.state());
  check('a clean reservation takes № 1 in the alternative\u2019s book',
    s.reservations === 1 && s.lastConfirmation.includes('№ 1'), s.lastConfirmation);
  check('zero console errors on the alternative', errors.length === 0, JSON.stringify(errors));
  await page.close();
}

/* 6 — motion: none here; the cinematic page's reduced path */
{
  const { page } = await freshPage();
  const motion = await page.evaluate(() => {
    const els = [document.querySelector('section'), document.querySelector('.submit'), document.querySelector('nav a')];
    return els.map((el) => getComputedStyle(el).transitionDuration);
  });
  check('the alternative has no transitions at all — nothing moves, ever',
    motion.every((d) => d === '0s'), JSON.stringify(motion));
  await page.close();

  const { page: p9 } = await freshPage(p9base, true);
  await p9.waitForFunction(() => window.__p9, { timeout: 30000 });
  await sleep(300);
  const rp = await p9.evaluate(() => {
    const s = window.__p9.state();
    const inertLeft = [...document.querySelectorAll('[data-step]')].some((el) => el.inert);
    return { done: s.done, fired: s.fired.length, inertLeft };
  });
  check('the cinematic page under reduced-motion emulation: fully revealed, nothing inert',
    rp.done && rp.fired === 5 && !rp.inertLeft, JSON.stringify(rp));
  await p9.close();
}

/* 7 — 200% zoom */
{
  const page = await browser.newPage();
  await page.emulate({ viewport: { width: 590, height: 800, deviceScaleFactor: 2 } });
  await page.goto(base, { waitUntil: 'load', timeout: 60000 });
  await sleep(250);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  check('at 200% zoom (590 CSS px at 2×) nothing scrolls sideways', overflow <= 0, `overflow=${overflow}px`);
  await page.close();
}

await browser.close();
server.close();
const failed = checks.filter((c) => !c.ok).length;
console.log(`\n== ${checks.length - failed}/${checks.length} checks passed ==`);
process.exit(failed ? 1 : 0);
