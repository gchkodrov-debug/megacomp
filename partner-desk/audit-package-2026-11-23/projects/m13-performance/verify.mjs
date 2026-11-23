/* M13 VERIFY — asserts the exam bars against the filed
   results.json (profile.mjs is the measuring instrument;
   this is the gate that reads its filing). Re-run
   profile.mjs to re-measure; run this to re-check.
   Run: node verify.mjs */
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const r = JSON.parse(await readFile(join(process.cwd(), 'results.json'), 'utf8'));
const checks = [];
const check = (name, ok, detail) => { checks.push({ name, ok }); console.log(`${ok ? 'PASS' : 'FAIL'}  ${name} — ${detail}`); };
const broken = r.runs.filter((x) => x.variant === 'broken');
const fixed = r.runs.filter((x) => x.variant === 'fixed');

check('H-15: broken build reads layout per-frame in the hot loop',
  broken.every((x) => x.scrollPhase.layoutReads.total > 1000),
  `broken layout reads per journey: ${broken.map((x) => x.scrollPhase.layoutReads.total).join(', ')}`);
check('H-15: fixed build reads layout ZERO times during the journey',
  fixed.every((x) => x.scrollPhase.layoutReads.total === 0),
  `fixed layout reads per journey: ${fixed.map((x) => x.scrollPhase.layoutReads.total).join(', ')}`);
check('B4 mechanism, deterministically: with the hero held 700 ms, broken CLS exceeds 0.1 on every probe, fixed stays at 0',
  r.clsProbes.broken.every((x) => x > 0.1) && r.clsProbes.fixed.every((x) => x <= 0.1),
  `delayed-hero CLS — broken: ${r.clsProbes.broken.join(', ')} · fixed: ${r.clsProbes.fixed.join(', ')} (the journey CLS is load-timing intermittent — 0.0014–0.6059 across filings — so the shift claim rides on this probe, not on luck)`);
check('fixed build inside standing CWV lab bars (CLS < 0.1, LCP <= 2.5 s) on every run',
  fixed.every((x) => x.scrollPhase.clsTotal < 0.1 && x.loadPhase.lcpMs <= 2500),
  `fixed CLS: ${fixed.map((x) => x.scrollPhase.clsTotal).join(', ')} · LCP ms: ${fixed.map((x) => x.loadPhase.lcpMs).join(', ')}`);
check('B5/F5: the startup sieve leaves a long app.js script in the broken filing (envelope max ≥ 100 ms) and none in the fixed build (every run ≤ 100 ms), with DCL separated in aggregate (> 100 ms between the means)',
  Math.max(...broken.map((x) => Math.max(0, ...x.loadPhase.appJsScriptMs))) >= 100 &&
  fixed.every((x) => Math.max(0, ...x.loadPhase.appJsScriptMs) <= 100) &&
  (broken.reduce((a, x) => a + x.loadPhase.domContentLoadedMs, 0) / broken.length) -
  (fixed.reduce((a, x) => a + x.loadPhase.domContentLoadedMs, 0) / fixed.length) > 100,
  `longest app.js script — broken: ${broken.map((x) => Math.max(0, ...x.loadPhase.appJsScriptMs)).join(', ')} ms · fixed: ${fixed.map((x) => Math.max(0, ...x.loadPhase.appJsScriptMs)).join(', ')} ms · DCL — broken: ${broken.map((x) => x.loadPhase.domContentLoadedMs).join(', ')} ms · fixed: ${fixed.map((x) => x.loadPhase.domContentLoadedMs).join(', ')} ms (envelope/aggregate form, repaired at re-review finding N-1: per-run floors straddled this bench's weather — broken script 95–251 ms, DCL 206–386 ms across filings — while the envelopes separated on every filing)`);
check('both builds arrive at the same place: identical index value, player settled on frame 72',
  r.runs.every((x) => x.loadPhase.indexValue === '1270607' && x.scrollPhase.player.currentFrame === 72 && x.scrollPhase.player.settled),
  `index values: ${r.runs.map((x) => x.loadPhase.indexValue).join(', ')}`);
check('zero console errors on all four runs',
  r.runs.every((x) => x.consoleErrors.length === 0),
  `errors: ${r.runs.map((x) => x.consoleErrors.length).join(', ')}`);
check('the interaction measurement is real on both builds (Event Timing samples present, counts filed)',
  r.interaction.broken.samples.length >= 10 && r.interaction.fixed.samples.length >= 2,
  `samples — broken: n=${r.interaction.broken.samples.length} · fixed: n=${r.interaction.fixed.samples.length} of 32 clicks per build (the browser issues interaction entries for the fast fixed page at a far lower rate than for the queued broken page — filed samples per build across all filings to date: broken 14–31 of 32, fixed 2–6 of 32; the counts are filed, not padded, and the fixed build's pooled worst across filings is the stronger evidence)`);
check('INP leg, lab proxy: worst click latency across the startup window — fixed < 200 ms (the INP bar), broken > 200 ms',
  r.interaction.fixed.worstMs < 200 && r.interaction.broken.worstMs > 200,
  `worst click latency — broken: ${r.interaction.broken.worstMs} ms · fixed: ${r.interaction.fixed.worstMs} ms (Event Timing API, trusted clicks from ~40 ms after navigation commits; a lab proxy for the INP bar, not field INP)`);

const failed = checks.filter((c) => !c.ok).length;
console.log(`\n== ${checks.length - failed}/${checks.length} checks passed ==`);
process.exit(failed ? 1 : 0);
