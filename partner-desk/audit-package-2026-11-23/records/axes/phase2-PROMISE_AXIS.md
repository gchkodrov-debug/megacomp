# TRACK 7 · PHASE 2 — PROMISE AXIS (BLIND REVIEW)

Reviewer: blind, fresh context, not the builder. Every claim below was
checked by running the harnesses myself and by my own independent
measurements against the files on disk. House style/rules were NOT
judged (other axis).

## VERDICTS

| Module | Bar (short form) | Verdict |
|---|---|---|
| M3 Graphics Math | working code projecting/rotating/lighting a 3D object from raw math, no library transforms, mathematics explained | **PASS** |
| M8 Blender | original 3D product animation rendered to a cinematic sequence + web GLB passing cleanup gate (≤5 MB, ≤250k tris), production stats filed | **PASS** |
| M9 / Project 5 | real product viewer with inspection, draw calls ≤500, keyboard orbit (carried requirement) | **PASS** |
| M10 / Project 6 | working site, original shader transitions, no-shader fallback that actually ships and works | **PASS** |
| M11 / Project 7 | scroll-driven 3D storytelling, multiple camera transitions, coordinated object animation, continuity unbroken | **PASS** |

All five bars are met on the artifacts. The book instalment, however,
contains printed claims about the code that do not survive checking —
see Findings D1–D5. They do not break any exam bar, but the book is
wrong in those places and should not be quoted from there.

---

## 1 · HARNESS RUNS (all executed by me, this sitting)

| Harness | Result on my run |
|---|---|
| m3-software-renderer `node verify.mjs` | **18/18 PASS**, exit 0 |
| project-5-coin-viewer `node verify.mjs` | **10/10 PASS**, exit 0 |
| project-6-shader-site `node verify.mjs` | **8/8 PASS**, exit 0 |
| project-7-scroll-3d `node verify.mjs` | **11/11 PASS**, exit 0 (≈170 s) |
| m8-blender-lamp `node verify.mjs` | **11/11 PASS**, exit 0 |

Key tallies from my runs: M3 B1 canvas renders 349 distinct colours,
18.3% lit · P5: 3 draw calls, model 512 tris, keyboard Δaz 0.72 /
Δpolar −0.22, zoom 4.20→3.25, latency 1 ms · P6: dissolve mean colour
(154,119,95)→mid (98,81,50)→(69,55,37), fallback colour moved 121.5 ·
P7: worst join turn 10.5°, max 40-landing step 0.94 units, bricks
0→24→47 lit, coin Δrot 12.6 rad · M8: 120 frames, films 960×540 /
5.00 s, GLB 192,468 B / 4,108 tris, viewer draw calls 9 = primitives 9.

## 2 · MY OWN SPOT-CHECKS (not the harness's word)

**(a) GLB — CONFIRMED.** I parsed `lumen-no1-web.glb` myself
(Python/struct): file is **192,468 bytes** on disk, header length
agrees, 9 meshes / 9 primitives, index counts sum to **4,108
triangles**. Both numbers match stats.json and the render.log
WEB_MODEL line exactly. Gate: 192,468 B ≤ 5 MB and 4,108 ≤ 250,000 —
passed with a wide margin. One definitional gap: stats.json files
`vertices: 2164`, which is Blender's pre-export count from the log;
the GLB's own POSITION accessors sum to **5,198** (vertices split at
export for normals/UVs). The gate does not cover vertices, so no bar
impact — see N1.

**(b) M3 math — CONFIRMED.** I evaluated `renderer.js` in Node with
my own tests, none copied from verify.mjs: rotation about (1,2,3) by
0.7 rad has determinant 1.00000002, unit columns, mutual dots ≤1.7e-8,
and preserves vector length (2.78926514 → 2.78926517, Float32 noise);
the normal matrix satisfies Nᵀ·M = I to 0.000 exactly on a
translate·rotate·scale model-view; a cube corner pushed through
P·V·M by hand lands at NDC (0.158, 0.158, 0.966), inside the clip
cube. Grep + full read of renderer.js: the only canvas context is
`getContext('2d')`; no imports, no WebGL, no library — every
transform (Rodrigues rotation, perspective, lookAt, inverse-
transpose normals, Lambert term) is hand-written in the file. The
page explains the pipeline, each matrix, normals/light,
quaternions and Bézier, with live readouts the harness proved equal
to the renderer's returned state (B2).

**(c) M11 rig — CONFIRMED.** I required
`engine/camera/camera-choreography.js` in Node and evaluated
`poseAt` at the five keyframe times: max position error **0.0** and
max target error **0.0** at every keyframe — exact, not approximate.
The keyframes I used are byte-identical to the page's own
`KEYFRAMES`/`__rigConfig` in project-7's index.html (I compared
them). My own `pathLength()` = **26.141** units; dense sampling
(2,000 poses) shows a max step of 0.019 units — no jumps anywhere.

**(d) M9 keyboard orbit — CONFIRMED real.** Two independent proofs.
Source: `viewer.js` has an `onKey` handler wired with
`canvas.addEventListener('keydown', onKey)` — ArrowLeft/Right step
azimuth by 0.18, ArrowUp/Down step polar by 0.18×0.6, `+`/`-` zoom,
`0` resets, handled keys `preventDefault()`. Harness: I read
project-5's verify.mjs — it does **not** poke state; it calls
`page.focus('#stage')` then real `page.keyboard.press('ArrowRight')`
×4 and `('ArrowUp')` ×2, then asserts the target moved exactly
4×0.18 = 0.72 and −2×0.108 = −0.22 and waits for the chase to
settle within 0.02. On my run it passed with those exact deltas.

## 3 · VISUAL EVIDENCE (I looked at the pictures)

- `m8 renders/frame_0012.png` — the assembled Lumen №1: brass desk
  lamp, angled arm, black joint, lit pool on the floor. Unmistakably
  the product.
- `m8 renders/frame_0110.png` and `poster.png` — the exploded hold:
  shade + glowing bulb at top, arm segment, joint ball, stem, base
  disc, all separated along one vertical column and **all fully
  inside the frame — nothing cropped at any edge**. The subject
  stays framed in the exploded hold. (poster.png is a separate
  render of frame 110 per build_lamp.py's `frame_set(110)`, which
  is why its bytes differ from frame_0110.png at identical size.)
- `project-5 renders-coin.png` — **reads plainly as a gold coin**:
  round, brass-gold, beaded rim, embossed brick-pattern face with a
  central motif, visible edge thickness, warm key light.

## 4 · FINDINGS

### CONFIRMED — verified true (positive)

- **C1** M3 harness 18/18 and P5 10/10, P6 8/8, P7 11/11, M8 11/11
  on my own runs (tallies in §1).
- **C2** M3 rotation/normal-matrix/projection mathematics correct
  under my independent Node evaluation (§2b).
- **C3** M3 uses no library transforms — raw math, 2D canvas only.
- **C4** M3's mathematics is explained on its own page (pipeline
  table through six spaces, per-matrix cards, Lambert, slerp,
  Bézier), with limits (painter's sort, whole-face rejection)
  printed on the page.
- **C5** M8 GLB = 192,468 B / 4,108 tris by my parse = stats.json =
  render.log; cleanup gate passed (§2a).
- **C6** M8 films real: 120 rendered frames on disk; film.mp4 and
  film.webm both ffprobe at 960×540, 5.00 s (harness, my run).
- **C7** M8 originality: build_lamp.py starts from
  `read_factory_settings(use_empty=True)` and builds 9 parts from
  primitives — no imported model; parts keyframed home at frame 37,
  exploded at frame 84, camera + target also keyframed (source
  lines confirm the book's 37/84 claim); lamp.blend on file
  (748,068 B).
- **C8** M9 draw calls 3 (bar ≤500), inspection by button works
  (selected=reverse, target azimuth π), readout = viewer state.
- **C9** M9 keyboard orbit exists in the component and is genuinely
  driven by the harness (§2d).
- **C10** M10 shaders are original code in
  `engine/shaders/shader-pack.js`: raw WebGL, a hash-based value-
  noise fbm dissolve with a gold burn edge and a coordinate-wind
  swirl — two distinct fragment shaders, no library, GLSL in the
  file. Both transitions run and land exactly (harness checks 2–3).
- **C11** M10 fallback genuinely ships: the harness launches a
  second browser with `--disable-webgl --disable-webgl2`; the page
  stands in fallback mode and its DOM crossfade measurably changes
  the picture (mean colour moved 121.5). Page source confirms the
  fallback stack + `ShaderPack.supported()` pre-flight.
- **C12** M11 poseAt hits all five keyframes exactly (§2c); the
  page traverses all 4 camera segments, bricks light in order and
  unlight in reverse, coin rotation is a function of scroll —
  continuity unbroken (harness B2–B5 + my dense sampling).

### CONFIRMED — book/harness text that contradicts the artifacts

- **D1 (M10, the serious one)** The book says: *"the hash is
  integer-only (a float sin-hash shimmers…) and the value noise
  wraps its lattice at 16 cells, so the field tiles."* The shipped
  GLSL in shader-pack.js does none of this: `hash()` is a **float**
  `fract()` hash (not integer-only, not sin-based), and `vnoise()`
  has **no lattice wrap at 16 cells or anywhere** — the field does
  not tile by construction. The book also says *"the harness's
  mid-flight frame shows the field mid-burn with no seam"* — the
  harness measures mean colours only; **no seam check exists**.
  The shaders work and the bar is met, but this paragraph
  describes a different noise implementation than the one on disk.
- **D2 (M3)** The book's *"1.76° vs 10.30° off the true normal"*
  appears nowhere else in the artifacts and cannot be reproduced
  from harness A7's transform (scale 2,1,1), where the relevant
  angles are 18.43° (either method vs the original normal) and
  36.87° (correct vs naive). Unreproducible printed number.
- **D3 (M3)** The book describes the slerp check as *"the midpoint
  of identity→90° is the 45° rotation… (√2/2, √2/2, 0) — to nine
  decimals."* Harness A9 actually tests identity→**180°** about Y
  (midpoint quarter-turn, (1,0,0)→(0,0,−1)) at tolerance **1e-6**.
  I verified the book's stated property separately: it is true of
  the code to ~7 decimals (0.707106769 vs 0.707106781 — Float32
  matrices), not nine. The math is right; the description of the
  test and its precision is wrong.
- **D4 (M3)** *"its Bernstein weights are proven to sum to 1 at
  ten sample points"* — harness A10 tests Bézier endpoints and one
  midpoint only; no ten-point weight-sum check exists. (The
  property itself is true — I summed the implemented weights at
  six t values, all exactly 1.0 — but it is not what the harness
  proves.)
- **D5 (M9)** *"Δazimuth 0.72 rad for four presses, to 0.001"* —
  the harness tolerance is **0.02 rad** (`near(dAz, 0.72, 0.02)`);
  0.001 is not the tolerance anything was checked to. The delta
  itself (0.72) is exact.
- **D6 (minor, harness text)** P7 harness check B2's detail string
  says *"path ≈ 24 units"* while its own A3, the book, and my
  measurement all say ≈26.1. A stale string in a detail message;
  the check itself (max step < 1.4) is unaffected.

### NEEDS-CHECK — could not settle

- **N1** stats.json `vertices: 2164` vs the GLB's 5,198 POSITION
  vertices (§2a). The filed number is traceable to Blender's
  export log, so it is sourced — but stats.json does not state
  which vertex definition it files, and it cannot be reproduced
  from the GLB it sits beside. No bar impact (gate is bytes +
  triangles only).
- **N2** M10 FPS figures: README + book file *shader 21 fps ·
  fallback 61 fps · delta −40*; my run measured **20 / 61 / −41**.
  Headless SwiftShader figures move by ±1 between runs, so neither
  set can be called the true one; the substance (fallback ≈61,
  shader ≈20, large negative delta in software rendering) is
  consistent. The bar only requires the measurement to exist,
  which it does.
- **N3** The book's M8 narrative durations (e.g. "ten-minute
  re-render") leave no trace in the artifacts I can check them
  against. Not counted for or against any verdict.

### REJECTED — suspected defects I tested and cleared

- **R1** *GLB stats inflated or invented* — cleared: my own parse
  reproduces bytes and triangles exactly (C5).
- **R2** *Keyboard orbit faked (harness sets state directly)* —
  cleared: harness sends real key events; deltas match the source
  step constants (C9).
- **R3** *M3 secretly uses a library/WebGL* — cleared: full read +
  grep; hand-written math, 2D canvas (C3).
- **R4** *Exploded hold crops the lamp / poster is not the film* —
  cleared: frame_0110 and poster both show every part inside the
  frame; poster is the build script's own frame-110 render (C7, §3).
- **R5** *Fallback is a mode label with nothing behind it* —
  cleared: separate WebGL-disabled browser, pixel-measured
  crossfade (C11).
- **R6** *Catmull-Rom→Bézier conversion only approximately hits
  keyframes* — cleared: poseAt error is exactly 0.0 at all five
  keyframes, position and target (§2c).

## 5 · BOOK INSTALMENT — NUMBER-BY-NUMBER

Reproduced exactly: M8 192,468 B · 4,108 tris · 120 frames ·
960×540 · 9 parts · keyframes 37/84 · M9 3 draw calls · latency
1 ms on my run · M11 worst join 10.5° · path ≈26.1 units · 47
bricks · largest scroll step 0.94 (< 1 unit) · M3 near-plane
NDC −1 · 120° diagonal rotation cycling the axes.
NOT reproduced / contradicted: the M10 noise paragraph (D1),
M3's 1.76°/10.30° (D2), M3's slerp test description and "nine
decimals" (D3), M3's ten-point Bézier claim (D4), M9's "to 0.001"
(D5), M10's filed FPS set differing by 1 from a fresh run (N2).

## 6 · BOTTOM LINE

Promise axis: **5 of 5 modules PASS.** Every harness passes on a
fresh run, every gate figure I re-measured independently agrees,
the keyboard-orbit debt is genuinely paid, the fallback genuinely
ships, and the camera rig is exact at its keyframes. The defects
found are in the book's prose about the code (D1–D5), not in the
artifacts the bars judge — D1 in particular describes a noise
implementation that is not the one on disk and should be corrected
before the instalment is treated as a record.
