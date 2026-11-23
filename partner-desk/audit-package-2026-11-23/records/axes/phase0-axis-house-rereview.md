# Track 7 Phase 0 — HOUSE Axis Re-Review (fresh context)

Method: every item verified at runtime by this reviewer over local HTTP
(headless Chrome / puppeteer-core), plus source greps where the checklist
calls for them. The producer's notes and the previous review were not read.
Probe scripts: `/tmp/probe.mjs`, `/tmp/probe2.mjs` (this reviewer's own).

## Per-item verdicts

### 1. Readout truth — CONFIRMED-FIXED
650px viewport (step-2 thinned order), paper journey scrolled to ~27%,
waited for settle:
> readoutTarget="17", readoutShown="17", readoutTotal="31", readoutProgress="27%"
> state: targetFrame=17, currentFrame=17, orderLength=31, loadedCount=31,
> totalFrames=60, settled=true, displayed=0.26999

Readout target, `state().targetFrame`, `state().currentFrame`, and the
printed denominator vs `state().orderLength` all agree.

### 2. Failed frames named — CONFIRMED-FIXED
Request interception aborting paper frames ≥32 (retest probe with
scroll-into-view + state polling; the thinned order's frames ≥32 are
exactly 15: odd 33…59 plus frame 60):
> state: failedCount=15, loadedCount=16, aborted=15
> readout: "… frames loaded 2/31 · **15 frames failed to load** …",
> failedwrap hidden=false

State exposes the failure count and the readout's "frames failed to
load" note becomes visible with the matching number.
(Transparency: a first probe sampling on a short timeline under
`networkidle0`+interception read 0/0 before the IntersectionObserver-gated
preload ran; the retest with proper triggering is the evidence above.)

Minor observation (not a checklist failure): the readout's *loaded*
counter updates only on draw events and can lag `state().loadedCount`
transiently during preload (readout showed 2 while state was already 16;
it converges — verify.mjs reads loaded=60 at completion). The *failed*
counter was current in the same sample.

### 3. Reduced motion — CONFIRMED-FIXED
`prefers-reduced-motion: reduce` emulated, "Replay the dot" clicked,
sampled ~350ms later, on BOTH pages (exam site and M0):
> travel=686, transform="matrix(1, 0, 0, 1, 686, 0)", x=686 — dot already
> at its final position, no animation in progress.

Exam site under reduced motion: all 8 callouts computed opacity "1"
(static list renders); both players report `reduced=true`,
`currentFrame=1`, `loadedCount=1` (frame 1 only).

### 4. No-JS callouts — CONFIRMED-FIXED
Exam site loaded with JavaScript disabled: all 8 `.cl-callout` elements
have computed opacity "1" and non-zero height — callout text visible
without any script (CSS keeps them visible; `.cl-live` hiding is only
added by the component when it runs).

### 5. Callout validation — CONFIRMED-FIXED
Constructed live in the page via the real component:
> tip "1.4,0.5" → `CalloutConfigError: callout-leaders config.data-callout-tip: "x,y" in 0..1 is required (got "1.4,0.5")`
> span to=1.5 → `CalloutConfigError: callout-leaders config.data-callout-from/to: each callout needs a valid progress span inside 0..1 (got from=0.1, to=1.5)`
> valid config ("0.5,0.5", to=0.5) → no throw.

### 6. Inline styles — CONFIRMED-FIXED
`grep 'style="'` on both live pages' HTML
(`m0-how-the-web-works/index.html`,
`project-1-engine-skeleton/exam-site/index.html`): **zero hits**.
The only hits anywhere under the artifacts are inside
`m0-how-the-web-works/verification/dom-*.html` — serialized DOM
snapshot files, which the checklist excludes.

### 7. Smoothness claims — CONFIRMED-FIXED
No "butter" anywhere in the live pages or README. Remaining "smooth"
wording is definitional and number-anchored, e.g. "that number is the
frame budget every smooth page lives inside" in the same sentence as
60 FPS / 16.7 ms, and `scroll-behavior:smooth` (a CSS property, not a
claim). The exam readout's chase claim is tied to a measured figure:
"measured in this page's own verification: a jump to 81% of the journey
passed through 35 distinct displayed frames, no teleporting."

### 8. M0 FPS meter — CONFIRMED-FIXED
Four paired samples of #fps / #frametime taken ~1.1s apart:
> {"fps":"60","ft":"16.7"} ×4 — implied frametime 1000/60 = 16.7 in
> every sample; the two numbers are consistent in each window.

Source agrees: both values are computed from the same window
(`frames * 1000 / (t - lastT)` and `(t - lastT) / frames`) in the same
branch — no single-frame interval remains.

### 9. M0 hybrid loader failure — CONFIRMED-FIXED
Aborted `assets/frames/f010.jpg` via request interception (aborted=1):
> #sc-failed = " · 1 of 48 frames failed to load — the nearest loaded
> frame stands in for each missing one."

### 10. Regression hunt — CONFIRMED-FIXED (no regressions found)
- `verification/verify.mjs` run by this reviewer (with
  `/tmp/lh/node_modules` symlinked to the house node_modules):
  **36/36 checks passed**, including its own readout, leader-landing
  (error=0.0px), reduced-motion, and thinned-order mobile checks.
- Full scroll of both exam journeys (paper in 5% steps, web in 10%
  steps): **zero console errors, zero page errors**.
- Callout fade still animates: intermediate opacities observed
  mid-journey — 0.39, 0.06, 0.32, 0.08, 0.74, 0.18.
- Leaders track: at progress 0.5, leader group opacities
  ["0.000","1.000","0.000"] match the tipped callouts' opacities;
  a settled leader dot sits at (640.0, 469.8) and verify.mjs
  independently re-derives dot positions at 0.0px error.
- Keyboard tab walk complete: 26 stops (skip link → nav links →
  #gsap-play → video controls → #particles-toggle → quiz inputs →
  submit) then focus returns to BODY — nothing unreachable, no trap.

### 11. M0 printed formula copy — CONFIRMED-FIXED
The machinery readout now reads (live page text):
> "Two different numbers do the work: the *target* frame comes straight
> from your scroll position — `floor(progress × (totalFrames − 1)) + 1`
> — and the *displayed* frame chases it, closing 10% of the remaining
> gap each tick instead of jumping."

Target formula and chase are presented as two distinct mechanisms;
the single floor formula no longer stands as the whole mechanism.

## Summary

**11/11 CONFIRMED-FIXED. No STILL-BROKEN items. No regressions found**
(verify.mjs 36/36, zero console errors on full scrolls, fade/leaders/
keyboard all intact).

Worst finding (minor, outside the checklist's pass conditions): the
exam readout's "frames loaded" counter is refreshed only on draw
events, so during preload it can transiently lag the player's true
`loadedCount` (observed 2 printed vs 16 loaded, converging to exact
at completion). The failure counter required by item 2 was current
in the same conditions. Worth a one-line fix (refresh readouts on
load/error events too), not a Phase 0 blocker.
