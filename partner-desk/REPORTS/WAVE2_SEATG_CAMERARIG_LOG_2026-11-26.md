# WAVE 2 — SEAT G · CAMERA RIG — BUILD LOG

**Date:** 2026-11-26 · **Seat:** G (Wave 2, first seat) · **Spend:** $0 · **Deployment:** none · **Desk filing:** none (captain files)
**Verdict ceiling: BUILT — UNVERIFIED** (mechanism-level proof below; the relay's critic + blind-verifier seats and the founder's device session are still owed)

---

## What was built

The house camera system as a reusable module at
`construction/camera-rig/` — the register's #1 gap: in MESR v0.2 the
camera is **MES-CAM-001, state MISSING** (Gemini's Tranche 1 claim of a
verified chase camera was the ET-120 scroll layer; no camera existed).
Sources read before building: Gemini Tranche 2 camera entries
(`GEMINI_COMMISSION_126_REPORT_TRANCHE2_2026-11-26.md` — chase camera,
safe-focal-box, micro-sway, reframer/dolly/peek entries) **as corrected
by ChatGPT's adjudication** (`CHATGPT_ADJUDICATION_126_2026-11-26.md`,
correction 7 binding), MESR v0.2 camera entries, and the house World
Engine + geometry + wiring in full.

| file | bytes | what it is |
|---|---|---|
| `camera.js` | 27,953 | the pure ES module — spring, rails, lead, solver, sway, validation |
| `camera.test.cjs` | 16,575 | node suite — **61 checks, all passing** |
| `exercise.html` / `exercise.js` | 890 / 6,238 | minimal host harness (engine clock + Library scene + camera data in memory) |
| `exercise.cjs` | 5,197 | headless host exercise — **11 checks, all passing**, zero page errors |
| `frame-desktop.png` / `frame-mobile-375.png` | 18,678 / 29,941 | evidence frames from the exercise |
| `README.md` | 8,514 | design, the Seat E statement, scene-data fields, host adapter sketch |
| `package.json` | 307 | module marker |

Work stayed inside `construction/camera-rig/` (+ this log). No file in
`world-engine/`, `wiring/`, or anywhere else was written.

## Per-spec evidence

**① Critically damped chase camera, dt-invariant** — exact closed-form
spring step (no Euler/RK anywhere). Node suite: step response sampled
at common times under 60 Hz and 120 Hz feeding — **max trajectory
divergence < 0.5 px spec, measured ~1e-9 px** (floating-point noise);
approach monotonic; **zero overshoot** past the target; unit-level
composition checks (one 100 ms step ≡ two 50 ms steps to 1e-12).
Measured settle to < 0.001 plate fractions at omega 9: **≈ 0.93 s**.
*Honest note:* MES-CAM-001's dossier says "settle within 500 ms" —
that figure is tagged [ESTIMATE] in the register and is **not** met at
the default omega 9; it is a stiffness choice (omega is scene data),
reported here rather than silently tuned to pass.

**② cameraBounds + soft composition rails** — effective centre range =
authored bounds ∩ plate containment. At both 60 Hz and 120 Hz, with
the subject parked at u = 0.98 beyond a 0.7 rail: the centre **never**
exceeded the rail (checked every sample, tolerance 1e-12) and
**settled on the rail** within 0.002 by 3 s. First-build defect found
and fixed during this seat: a per-step velocity multiply in the soft
zone was frame-rate dependent and stalled the 120 Hz settle at
0.6939; replaced with an exponential-in-dt bleed (rate 12 /s at the
rail), after which both rates settle.

**③ Velocity-weighted look-ahead** — exact first-order lag (τ = 0.35 s)
on the velocity, lead clamped to maxLead 0.12. Node suite, 375×812,
sustained rightward motion at 0.19 fractions/s: the subject stabilizes
at **37.6 % from the left edge** (spec band 32–40 %, σ < 0.01), with
both host-supplied velocity and rig-estimated velocity; lead clamp
verified at 0.12 ± 0.002 under a 0.5 fractions/s subject.

**④ Safe-focal-box solver + adaptive composition (adjudication
correction 7)** — cover window from plate aspect vs viewport aspect.
Node suite: focal-box corners project inside the viewport at
**2560×1080** and **1440×900** (mode `cover`, `primaryFitsAtCover`
true); at **375×812** the primary box cannot fit at cover, so with
`focalFallback: 'adaptive'` the mode is **`adaptive`**, the active box
is the declared portrait composition, its corners project inside, and
`primaryFitsAtCover === false` is exposed — never a silent crop; with
`focalFallback: 'contain'` the mode is `contain` and the primary box
is fully visible letterboxed.

**⑤ Bounded micro-sway + reduced-motion zero-lock** — dual
non-commensurate sines; measured bounds over 4 s at 60 Hz: |X| ≤
0.0018, |Y| ≤ 0.0010 of the plate, and the sway demonstrably breathes
(range > 0.0005). Under `setReducedMotion(true)`: sway **=== 0 on
every sampled frame** (exact, not faded); scene data `sway: false`
also yields exact 0. *Units note:* Gemini's coefficients (±1.8) are
adopted as **thousandths of the plate** — read literally they would
throw the view ±180 % of the frame; the reading is recorded in the
module header.

**⑥ Host exercise, zero page errors** — the harness hosts the rig on
the World Engine's own clock and Library scene (camera data injected
in memory; `scenes.example.json` untouched). Puppeteer, two viewports:
desktop 1440×900 → mode `cover`, 285 samples; phone 375×812 → mode
`adaptive`, `primaryFitsAtCover` false, 282 samples; the scripted
walking subject stayed inside the viewport in **every** sampled frame
at both sizes; **zero page errors**. Evidence frames visually
confirmed: desktop shows the gold active focal box framed with the
subject + companion dots inside; mobile shows the camera followed to
centre 0.800 with the non-active primary box honestly drawn dashed
past the frame edge.

**⑦ Discipline checks** — hostile raw dt 0.5 ≡ dt 0.05 bit-for-bit
(the master-clock clamp defended in the rig); dt 0 = no motion, no
NaN; project→unproject round-trips < 1e-9 in cover, adaptive, and
contain; `sceneFromScreen` inverts a subject through the engine's
`feetY`; `camX()` equals `scenePointToWorld` of the centre; camera-data
validation catches bad plateAspect, inverted bounds, off-plate boxes,
unknown fallback, omega 0, out-of-range anchors — and a scene with no
camera field validates clean (defaults).

## How the camera respects the house geometry (Seat E)

The named disagreement stands, stated in the README and the module
header: geometry's **nonlinear projection serves placement/pointer**;
**`scaleAt`/`feetY`/`zOf` remain sole authority for band scale, feet,
and layering**. The rig derives a subject's follow point through the
engine's own `feetY`, feeds projected hosts only `camX()` (computed
via `scenePointToWorld`), and its window transform is a translation +
per-axis scale of the stage plane — it invents no second perspective
law and computes no scale, feet line, or z of its own.

## Decisions taken inside the seat

- **Scene camera fields are DATA validated in `camera.js`, not a
  `SCENE_SCHEMA` extension.** The brief allowed either; editing
  `world-engine.js` sits outside this seat's work boundary ("work ONLY
  inside construction/camera-rig/"), so the fields are documented in
  the README and validated here in the engine's error-string style.
  Adopting them into `SCENE_SCHEMA` is a named follow-up for the World
  Engine seat.
- **Minimal harness instead of a wiring-demo copy** (the brief's own
  fallback): the wiring stage's renderer is a full host rewrite, not a
  clean copy target; the harness exercises the same contract (engine
  clock frames, renderer onFrame, real scene data) with zero edits
  outside this folder.
- **Follow anchors:** anchorX 0.5 / anchorY 0.62 defaults (subject
  rests at horizontal centre, feet at 62 % of the view height), both
  scene-tunable.

## Honest limits

- **BUILT — UNVERIFIED.** No critic seat, no blind verifier, no
  founder device session yet. Headless Chromium proves layout, math,
  and mode selection; per the cloud-browser motion law it is **not**
  evidence about how the follow *feels* — smoothness, sway taste, and
  the 500 ms settle question are device/founder judgments.
- `contain` mode freezes panning by definition (whole plate on
  screen); a scene that declares it accepts that trade.
- The lead's finite-difference estimator clamps spikes at ±3
  fractions/s; a teleporting subject gets one frame of clamped lead
  (~0.006 of the plate) before the estimate zeroes — measured in the
  step test design and deliberately excluded there by passing explicit
  velocity, which real hosts (the stage tracks pose velocity) will do.
- Not built, by the brief: the intelligent reframer, the threshold
  dolly, the peek pan; adoption into `stage.js`/`demo.js`; the
  `SCENE_SCHEMA` camera extension.

## Register deltas this seat proposes (captain to file)

- MES-CAM-001 (chase camera + soft rails + look-ahead): MISSING →
  **BUILT — UNVERIFIED** on this evidence.
- MES-CAM-002 (aspect-ratio safe focal box): the adaptive-composition
  correction is implemented as specified → **BUILT — UNVERIFIED**.
- Micro-sway (Gemini Tranche 2, unnumbered): implemented →
  **BUILT — UNVERIFIED**.
- MES-CAM-003 (threshold dolly), reframer, peek pan: remain
  DESIGNED/later increments — untouched by this seat.
