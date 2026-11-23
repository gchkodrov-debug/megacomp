# TRACK 7 · PHASE 2 — HOUSE AXIS RE-REVIEW (FIX VERIFICATION)

*Reviewer: fresh house-axis re-review seat. Scope: ONLY whether the
builder's fixes for the first blind review's findings F1–F10 and
N1–N2 are actually in the artifacts on disk. No re-grading from
scratch; no promise-axis judgement.*

*Method: original HOUSE_AXIS.md read first; every corrected passage
read in place; M3 degree figures recomputed independently from the
shipped `renderer.js`; M8 per-frame times extracted independently
from `render.log`; three harnesses re-run by this reviewer
(M3 18/18 · Project 5 10/10 · Project 7 12/12 — all reproduced);
stale-string sweep across all touched files (integer-only / 16 cells
/ ≈24 units / once a second / 128 * 4 — none found).*

## VERDICT: 12 OF 12 CONFIRMED-FIXED · 0 STILL-OPEN

---

### F1 · Book M10 shader description — CONFIRMED-FIXED
Book M10 now reads: "the shipped `hash()` is a float `fract()` hash
with a dot-product feedback, and the value noise interpolates it over
an unwrapped lattice — the field is sampled in a bounded UV domain,
so no tiling property is needed and none is claimed," with a
correction note naming the first printing's error. Verified against
the shipped code: `engine/shaders/shader-pack.js` lines 45–48 are
exactly `p = fract(p * vec2(123.34, 456.21)) … return fract(p.x *
p.y)`; the noise block uses `floor`/`fract` with no `mod`/wrap
anywhere in the file. Description and artifact now agree.

### F2 · M3 normal-matrix degrees — CONFIRMED-FIXED
Book M3 now prints 18.43° / 18.43° / 36.87°. This reviewer recomputed
from the shipped `m3-software-renderer/renderer.js` (scale(2,1,1),
normal (1,1,0)/√2, using the renderer's own `normalMatrix`,
`applyMat3`, `vNorm`): inverse-transpose result vs original =
**18.43°**, naive result vs original = **18.43°**, correct vs naive =
**36.87°** — the book's figures exactly. The book also carries a
correction note stating the first printing's figures appear in no
artifact. The old 1.76° / 10.30° appear nowhere (grep-verified).

### F3 · M3 slerp + Bézier descriptions — CONFIRMED-FIXED
Book M3 now reads: "The harness checks the midpoint of identity→180°
about Y: applied to (1,0,0) it lands on (0,0,−1), the quarter-turn,
at a tolerance of 1e-6." That is harness A9 verbatim in substance
(`verify.mjs` A9: slerp identity→half-turn about Y, `(1,0,0)→(0,0,−1)`
at 1e-6), and A9 passed in this reviewer's M3 re-run. The Bézier
bullet now claims only what A10 checks — endpoints exact, midpoint
Bernstein weights ⅛, ⅜, ⅜, ⅛ at t=0.5 — and states the sum-to-1
property "as algebra, not dressed as a measurement." A10 passed in
the re-run (mid (0.500, 0.750, 0.000)).

### F4 · Project 7 harness Part A circularity — CONFIRMED-FIXED
`project-7-scroll-3d/verify.mjs` line 58 now reads
`const KEYS = await page.evaluate(() => window.__rigConfig);` and
line 61 builds the Node rig from that read (`Rig.createRig(KEYS)`).
No keyframe literal remains in the file (grep for `at:` values /
`position: [` arrays: none). This reviewer re-ran the harness:
**12/12**, and check A1's own printed detail states "position +
target exact at all 5 `at` values, rig built from the page's
__rigConfig"; A2/A3 reproduce 10.5° worst tangent and ≈26.1-unit
path on the page-sourced rig. (The local variable keeps the name
KEYS, but its value now comes from the running page — the private
copy the finding objected to is gone.)

### F5 · Project 7 HUD lit count — CONFIRMED-FIXED
`project-7-scroll-3d/index.html` `applyPose()` now sets the brick
materials from the scroll target (line 181–182) and then counts the
lit bricks from the materials themselves (line 185:
`bricks.reduce((n, b) => n + (b.material === litMat ? 1 : 0), 0)`)
before printing that count to the HUD (line 192). The new harness
check B6 grades the HUD text against the scene at both scroll ends,
and it passed in this reviewer's run: HUD at top `"t=0.00 · seg 0 ·
lit 0/47"`, at end `"t=1.00 · seg 3 · lit 47/47"`.

### F6 · M8 shot-plan wording (orbit / hold) — CONFIRMED-FIXED
`m8-blender-lamp/index.html` animation card now reads: "Three acts on
one timeline, under a camera whose slow orbit runs through all of
them: … the hold, where the parts rest and only the light changes
(85–120)." `m8-blender-lamp/README.md` shot plan carries the same
form: "Three acts, under a camera whose slow orbit runs through all
of them … the hold (85–120), where the parts rest and only the bulb's
emissive strength and its point light rise." The continuous orbit is
no longer contradicted; "only the light changes" is now scoped to
the parts resting, which matches the build script's keyframes.

### F7 · Project 6 FPS filing form — CONFIRMED-FIXED
All three filing places now carry the envelope with the method:
- Book M10: "across two independent runs, shader 20–21 fps, fallback
  61 fps, delta −40…−41 — under SwiftShader *software* rendering."
- Run record (`TRACK_7_PHASE_2_RUN.md` lines 49–50): "runs (shader
  20–21 · fallback 61 · Δ−40…−41 fps, SwiftShader lab, method
  named)."
- `project-6-shader-site/README.md` lines 45–46: "two independent
  runs: shader path 20–21 fps · fallback path 61 fps · **delta
  −40…−41 fps** under SwiftShader."
No bare point-value filing of these figures remains in any of the
three.

### F8 · Project 7 harness B2 path figure — CONFIRMED-FIXED
The B2 detail string in `verify.mjs` now reads "path ≈ 26 units",
and this reviewer's harness run printed it live: "B2 no camera jump
across 40 landings — largest single-step move 0.94 units (path ≈ 26
units; a cut would be 5+)", consistent with the same run's A3
measurement (path ≈ 26.1 units). The stale "≈24 units" appears
nowhere (grep-verified).

### F9 · M3 readout coverage claims — CONFIRMED-FIXED
All four places verified:
- Harness B2 detail (source and this reviewer's run output,
  18/18): "world/view/ndc/screen rows match __lastState field for
  field (the object row is the mesh's own vertex — the chain's
  input, not renderer output)" — object and clip are no longer
  claimed as checked.
- Page (`m3-software-renderer/index.html`): "travels through **six**
  spaces" (no "four spaces" remains) and "the Object row is the
  mesh's own vertex — where the journey starts — and every later row
  is read from the render state itself."
- Book M3: "the object-space row is the mesh's own vertex (the
  chain's input), and every later row is printed from the renderer's
  own returned state"; pipeline named as all six stages.
- M3 README lines 20–21: "the object row is the mesh's own vertex
  (the chain's input); every later row is …" — same qualification.

### F10 · Project 5 readout cadence — CONFIRMED-FIXED
`project-5-coin-viewer/index.html` line 68 now says the readout is
printed "twice a second", and the same file's readout loop closes
with `}, 500);` — a 500 ms `setInterval`. Text and code agree.

### N1 · Viewer `modelTriangles` construction constant — CONFIRMED-FIXED
`engine/3d-viewer/viewer.js` `buildCoin()` (line 178) now counts from
the built geometry: `const triangles = geo.index ? geo.index.count
/ 3 : geo.attributes.position.count / 3;`, with a comment stating it
is counted from the built geometry, never derived from the segment
parameter. The `128 * 4` arithmetic is gone (grep-verified). This
reviewer re-ran `project-5-coin-viewer/verify.mjs`: **10/10**, and
check 2 still prints "model 512 tris, frame 512 tris" — the number
survives the honest counting route.

### N2 · M8 render environment + per-frame time — CONFIRMED-FIXED
Run record (lines 84–87) and `m8-blender-lamp/README.md` (lines
72–73) now file "mean 5.02 s, range 4.25–8.09 s across 121 renders
at 960×540, on Mesa software rendering over surfaceless EGL" — the
llvmpipe attribution is gone from both (grep-verified). This
reviewer extracted the per-frame summary lines (`^Time: MM:SS.ss`)
from `render.log` independently: **n=121, mean 5.02 s, min 4.25 s,
max 8.09 s** — the filed envelope reproduces exactly from the log.

---

## Counts

- CONFIRMED-FIXED: 12 (F1–F10, N1, N2)
- STILL-OPEN: 0

*End of house-axis re-review. Verification only; no new grading is
expressed or implied.*
