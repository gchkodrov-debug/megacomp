# TRACK 7 · PHASE 2 — HOUSE AXIS (BLIND REVIEW)

*Reviewer: blind house-axis seat, fresh context. Scope: ONLY whether the
Phase 2 work obeys the house's binding rules (Rules 1–23, honesty fences).
Whether exam bars are met is the other axis and is not judged here.*

*Method: rules file, book Phase 2 instalment and run record read first;
every harness re-run by this reviewer (M3 18/18 · Project 5 10/10 ·
Project 6 8/8 · Project 7 11/11 · M8 11/11 — all reproduced); harness
sources read for circularity; Phase 2 materials grepped for Flow /
live / deployed / production implications; filed numbers re-measured
independently (GLB parsed from its own accessors, films ffprobed,
camera rig re-evaluated in Node, Three.js probed live in a page).*

## OVERALL HOUSE VERDICT: DEFECTS FOUND

No provenance fraud was found: the Blender/Eevee route is real, the GLB
chain is honest, the Flow fence is intact, and the headline 3D numbers
reproduce. The defects are concentrated where Phase 1's defects also
lived — in the *words around the artifacts*: the book misdescribes the
shader's noise, prints two M3 numbers no instrument produced, and
overclaims what two harnesses check; one harness (Project 7, Part A)
restates the page's keyframes instead of reading them; one HUD
(Project 7) prints a formula where its README claims it prints scene
state. Each finding below cites its rule and its evidence.

---

## CONFIRMED — real rule breaches

### F1 · Rule 16 / Rule 18 — the book's shader description does not describe the shipped shader (M10)
Book M10 states: "the hash is integer-only (a float sin-hash shimmers at
large coordinates) and the value noise wraps its lattice at 16 cells, so
the field tiles; the harness's mid-flight frame shows the field mid-burn
with no seam."
The shipped `engine/shaders/shader-pack.js` NOISE block is a **float**
`fract()` hash (`p = fract(p * vec2(123.34, 456.21)) … return fract(p.x *
p.y)`); there is no integer hash, no `mod`/wrap at 16 cells anywhere in
the file (grep-verified), and therefore no tiling guarantee. Project 6's
harness checks mean colours only — it never inspects a seam. Three
claims in one bullet are unsupported by, or contradict, the artifact.
The shaders themselves work (harness 8/8 reproduced); the *description*
is what breaches.

### F2 · Rule 18 — M3 normal-matrix degrees (1.76° vs 10.30°) are irreproducible
Book M3: the harness "demonstrates the difference in degrees (1.76° vs
10.30° off the true normal on the test transform)". Harness check A7
prints vectors, never degrees. Recomputing A7's own transform
(scale(2,1,1), normal (1,1,0)) independently: inverse-transpose result
vs original = 18.43°, naive result vs original = 18.43°, correct vs
naive = 36.87°. No pairing yields 1.76° or 10.30°. The numbers carry no
method and no envelope, and no filed instrument produces them.

### F3 · Rule 18 — M3 slerp example misstates what the harness checks
Book M3: "The harness checks the midpoint of identity→90° is the 45°
rotation applied to (1,0,0) — (√2/2, √2/2, 0)". Harness A9 actually
checks identity→**180° about Y**, midpoint → (0,0,−1). The book's
vector is true only for rotation about Z, an axis the book never names;
evaluating the same claim about Y (the harness's axis) gives
(0.707, 0, −0.707) — verified by running the renderer. The book's
account of its own harness is wrong as filed. (The Bézier bullet has
the same shape in miniature: "weights proven to sum to 1 at ten sample
points" — A10 checks endpoints and one midpoint, not ten points.)

### F4 · Rule 13 / Rule 16 — Project 7 harness Part A restates the keyframe config instead of reading it
`project-7-scroll-3d/verify.mjs` defines its own `KEYS` literal,
duplicating the page's `KEYFRAMES` in `index.html`, and computes the
phase's headline continuity numbers (worst tangent 10.5°, path ≈26.1)
on that private copy. The page exposes its filed config as
`window.__rigConfig`, and check B1 correctly reads it — but only for
the two endpoints. A drift in any middle keyframe would leave A2/A3
certifying a rig the page no longer flies, and B2–B4 are too loose to
catch it. This is the Phase 1 circularity pattern (harness expecting
the page's own values from memory) in structural form. Mitigation
recorded honestly: this reviewer diffed the two copies — they are
currently identical, B1 passes, and independent re-evaluation of the
rig reproduces 10.47° / 26.14 units. The breach is the unguarded
structure, not present-day drift.

### F5 · Rule 14 — Project 7's HUD prints a parallel computation for the lit count; its README claims it prints scene state
In `project-7-scroll-3d/index.html`, `applyPose()` computes
`lit = Math.round(BRICKS * clamp((t − 0.45)/0.40))` from the scroll
formula, sets the brick materials from it, and prints that computed
variable to the HUD. The HUD never reads the scene. The README states
"`__state()` reads the camera's transform, the bricks' actual
materials, and the coin's actual rotation — the HUD prints those, and
the harness grades those." `__state()` does read the scene (compliant),
but the HUD does not print `__state()`'s values, and no harness check
reads the HUD text at all. The t and segment HUD fields do come from
the rig's returned pose; the lit field — the one the sentence is about
— does not come from the bricks' materials.

### F6 · Rule 16 — M8's filed shot plan misdescribes the camera's orbit and the hold
README + `index.html` present three acts — orbiting camera (1–36),
explosion (37–84), hold (85–120) "where only the light changes"
(index.html's animation card, verbatim). `build_lamp.py` keyframes the
orbit empty's rotation from −34° (frame 1) to +34° (frame 120) with no
intermediate keys: the camera orbits continuously through the explosion
and the hold, so in the hold the camera is still moving — the harness's
own hold measurement (mean |Δ| 2.6, not ~0) is consistent with glow
*plus* camera motion. The part keyframes (37/84), camera reframe keys
(37/84/120) and bulb keys (85/120) match the plan exactly; the orbit's
range does not match its act description.

### F7 · Rule 18 (filing form) — Project 6 performance numbers filed as point values, no envelope
Shader 21 fps · fallback 61 fps · Δ−40 fps, and fallback mean-colour
121.5, are filed as single numbers in three places (book M10, run
record, Project 6 README). Rule 18's filed form is the envelope across
runs with the method named. The method *is* named (SwiftShader software
GL, rAF during a live transition) — and this reviewer's independent
rerun reproduced all four numbers **exactly** (21 / 61 / −40 / 121.5),
so the substance is sound and stable in this lab. The breach is the
form: no spread is stated anywhere, unlike Phase 1's own filings
(e.g. LCP ranges) and Project 5's latency range in this same phase.

### F8 · Rule 18 (minor) — Project 7 harness prints a wrong path length in its own record string
Check B2's detail string, printed in the passing run, reads "largest
single-step move 0.94 units (path ≈ 24 units…)". The same run's A3
measures the path at ≈26.1 units (independently confirmed: 26.14).
The 0.94 figure is correct and reproduced; the "24 units" in the
harness's printed record is a stale constant that contradicts the
run's own measurement.

### F9 · Rule 14 / Rule 18 (minor) — M3 harness overclaims its readout coverage; one table row is not renderer state
Harness B2's detail claims "object/world/view/ndc/screen match
__lastState", but its code compares only world, view, NDC and screen —
object and clip are never checked. The page's Object row is printed
from `meshes[meshName].positions[0]` directly; the renderer's returned
state (`projected[]`) carries no object-space field at all, so the
book's "printed from the renderer's own returned state" does not hold
for that row (the value is nevertheless the true object coordinate —
it is the mesh's own data, not a recomputation). The M3 page also
introduces the table as "four spaces" above a six-row table the book
calls six stages.

### F10 · Rule 18 (minor) — Project 5 page text misstates its readout cadence
`project-5-coin-viewer/index.html` tells the visitor the readout is
printed "once a second"; the page's own code uses
`setInterval(…, 500)` — twice a second. The readout's *values* are
fully Rule-14 compliant (see R4); only the cadence sentence is wrong.

---

## NEEDS-CHECK — unsettleable on the filed evidence

### N1 · Rule 14 (spirit) — Project 5's `modelTriangles` is a construction constant, not a count
`engine/3d-viewer/viewer.js` `buildCoin()` returns
`triangles: 128 * 4` — arithmetic from the segment parameter, not a
count taken from the built geometry — and the harness expects the
literal 512. The number is true today: `renderer.info.triangles` read
512 in this reviewer's run, and a 128-segment closed cylinder does
have 512 triangles. Whether a parameter-derived constant counts as
"the component's own state" or as a value that would silently lie if
the geometry changed is a judgement the artifacts alone do not settle.

### N2 · Rule 18 — M8 render environment attribution ("llvmpipe", "≈5.4 s/frame")
`render.log` proves Blender 4.0.2, Eevee (32 samples), surfaceless-EGL
fallback and 120 landed frames. It nowhere names llvmpipe, which the
run record and README assert as the rendering route. Per-frame totals
extracted from the log: mean 5.02 s, min 4.25 s, max 8.09 s (121
renders incl. poster) against the filed "≈5.4 s/frame". The filed
figure sits inside the observed spread and "≈" is claimed, but no
envelope or method for the 5.4 figure is filed, and the llvmpipe
attribution rests on no filed evidence.

---

## REJECTED — suspected breaches tested and cleared

### R1 · Rule 17 (M8 provenance) — CLEARED
Suspected: "Eevee" claimed where another route was walked. Evidence:
`build_lamp.py` sets `scene.render.engine = 'BLENDER_EEVEE'`,
`taa_render_samples = 32`; `render.log` opens "Blender 4.0.2", shows
the surfaceless-EGL fallback exactly as the README describes, renders
at 32 samples, and saves all 120 frames; the log's appended tail
honestly records the animated-GLB re-export (`export_animations=False`,
203,644 B → 192,468 B) instead of hiding it. Claims match the walked
route, including the mid-phase install loss, which the run record
discloses rather than papering over.

### R2 · Rule 13/14 (M8 stats chain circularity) — CLEARED
Suspected: stats.json → page → harness certifying itself. Evidence:
the chain has three independent sources that must agree — the build
log's WEB_MODEL line, `stats.json` (written by `make_stats.mjs` from
that line + ffprobe), and the GLB's own accessors, which the harness
parses itself (check 5/6). This reviewer parsed the GLB independently:
**192,468 B · 4,108 triangles · 9 meshes / 9 primitives · no
`animations` key** — agreeing with log, stats, page (check 9) and the
Engine viewer's own count (check 8: viewer 4,108 = file 4,108, draw
calls 9 = primitives 9). Films independently ffprobed: both 960×540,
5.00 s. This is the model of a non-circular chain.

### R3 · Rule 13 (Project 7 endpoint check) — CLEARED as far as it goes
Suspected per the brief: B1 restates the endpoints. It does not — it
reads `window.__rigConfig` from the live page and compares the
rendered camera positions against it (the Part A duplication in F4 is
the separate, real defect).

### R4 · Rule 14 (Project 5 readout + keyboard expectations) — CLEARED
The page's readout is built field-for-field from `viewer.getState()`
(angles, distance, `renderer.info` draw calls/triangles, the
component's own FPS ledger and latency stamp); harness check 7 waits
for the chase to settle, then asserts DOM = state (reproduced: az
180° = 180°, calls 3 = 3). The harness's keyboard expectations
(Δazimuth 0.72 = 4 × 0.18, Δpolar −0.22, zoom ×0.88) duplicate
constants from `viewer.js`, but no external contract file exists for
Project 5 whose values the harness could parse instead — unlike
Phase 1's storyboard case, where the contract file existed and was
ignored. Duplication here pins behaviour; it does not self-certify.

### R5 · Rule 21 (vendored Three.js claim) — CLEARED on live probe
Suspected: book/Rule 21 claim "`outputColorSpace` present,
`outputEncoding` removed" while the file is REVISION "160" and both
strings occur in the source. Live probe of the vendored build in a
page: REVISION = "160"; `outputColorSpace` present and functional
(value "srgb"); `outputEncoding` survives only as a deprecated stub
accessor whose own console warning reads "THREE.WebGLRenderer:
Property .outputEncoding has been removed. Use .outputColorSpace
instead." The claim is substantively the library's own account of
itself, and the viewer's both-ways guard takes the correct branch.

### R6 · Honesty fence (Flow) — CLEARED
Grep of the book's Phase 2 instalment, the run record, all Phase 2
READMEs, the Engine README and all Phase 2 pages: no claim of Flow
production for any Phase 2 artifact. The run record states the Phase
1 gate FAIL on M6 in its opening paragraph, repeats "nothing here
routes around the Flow fence", and its Carries section states plainly:
"Track 7 graduation still requires a Flow-produced film passing M6
blind. This phase neither attempts nor implies it." Wherever
graduation is mentioned, the gate is described as OPEN.

### R7 · Honesty fence (production / deployment) — CLEARED
Every Phase 2 page carries its study fence (Project 5: "not a
production page"; Project 6: "Nothing here is a production page";
Project 7: "demonstrated here and deployed nowhere"; M8: "not a
catalogue offer"; M3: teaching instrument). The one "production"
phrase — the Engine/run records calling M8's Blender pipeline "a
production route, not a runtime component" — denotes an asset-making
route, in documents that simultaneously state "no production work"
was done. No live, deployed, or shipped claim attaches to any study
artifact.

### R8 · Rules 19–23 constitution (each rule earned by a book event) — CLEARED
Rule 19 ← book M9 + run defect 1 (coin near-black for want of an
environment; fix is the code-built PMREM softbox in `viewer.js`).
Rule 20 ← book M8 + run defect 2 (animated GLB refused by name;
R1/R2 evidence). Rule 21 ← book M9 (live probe of the vendored build;
R5 evidence). Rule 22 ← book M8 + run defect 3 (cropped exploded
poster; `probe_poster.py` / `poster-probe.png` on disk; camera
keyframes in the build script). Rule 23 ← book M11 (continuity claimed
from the Catmull-Rom construction *and* filed as measured; this
reviewer reproduced both halves: worst tangent 10.47° ≈ 10.5°, path
26.14 ≈ 26.1 units, largest scroll step 0.94 units on rerun). No rule
in instalment 4 lacks its earning event in the book.

### R9 · Rule 18 (headline Phase 2 numbers) — CLEARED
Independently verified: GLB 192,468 B / 4,108 tris / 9 parts (own
parse, R2); M8 films 5.00 s at 960×540, both encodes (own ffprobe);
Project 7 10.5° / 26.1 units / 0.94 units (own evaluation + harness
rerun); Project 5 3 draw calls, 512 model triangles, latency 1 ms in
rerun against the filed 0–1 ms lab range, method named (SwiftShader
lab) in its README; M3's harness expectations are first-principles
(known rotations, NDC planes, slerp midpoint) rather than renderer
output, and its B4 prism counts (58 / 112) are the correct arithmetic
for a 28-side prism. Harness totals in the run record (18/18, 10/10,
8/8, 11/11, 11/11) all reproduced exactly.

---

## Finding counts

- CONFIRMED: 10 (F1–F10; F1–F6 substantive, F7–F10 minor/form)
- NEEDS-CHECK: 2 (N1–N2)
- REJECTED (tested, cleared): 9 (R1–R9)

*End of house-axis report. No promise-axis judgement is expressed or
implied anywhere above.*
