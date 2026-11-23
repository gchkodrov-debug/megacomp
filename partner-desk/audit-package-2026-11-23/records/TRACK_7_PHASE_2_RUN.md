# TRACK 7 · PHASE 2 RUN RECORD

*The run: 2026-11-23. Coordinator: the Phase 2 subagent run,
under the Mastery Standard and Relay Law. Phase 0's exit gate
had PASSED; Phase 1 was graded with its exit gate FAIL on
Project 4 alone (M6 — the film is not verifiably a Flow
production), and the captain ruled Phase 2 study proceeds
with the Phase 1 gate OPEN on the record. Nothing in this
phase attempts to close the M6 gap, and nothing here routes
around the Flow fence. Study + grading only — no website
building, no production work, nothing toward Track 8
(sealed). The blind grading of this phase, with per-module
verdicts and the exit-gate ruling, is filed separately:
`TRACK_7_PHASE_2_GRADING_RECORD.md`.*

## What was built (every module produced its required output)

- **M3 — Graphics mathematics** (`track7-artifacts/
  m3-software-renderer/`): a hand-written software renderer
  (vectors, matrices incl. Rodrigues rotation + the GL
  perspective + lookAt, inverse-transpose normal matrix,
  quaternions with slerp, cubic Bézier, cube + coin-prism
  meshes, painter's-algorithm Lambert rasterizer) and its
  teaching page, which walks one tracked vertex through all
  six coordinate stages from the renderer's own returned
  state. Harness: **18/18** (12 Node checks against
  first-principles expectations + 6 browser checks).
- **M9 / Project 5** (`project-5-coin-viewer/` + the Engine
  donation `engine/3d-viewer/viewer.js`): the cinematic 3D
  product viewer — own orbit controls (pointer/wheel/pinch/
  **keyboard**, discharging Phase 0's carried requirement),
  raycast part inspection, camera presets, smoothing chase,
  a code-built PMREM softbox environment, self-measured
  FPS/latency, complete idempotent destroy(), and a minimal
  hand-written GLB reader (static factor-coloured subset,
  named refusals outside it). Harness: **10/10** — 3 draw
  calls (bar ≤500), keyboard Δazimuth exactly 0.72 rad and
  settled, readout = state, destroy clean.
- **M10 / Project 6** (`project-6-shader-site/` + the Engine
  donation `engine/shaders/shader-pack.js`): a raw-WebGL
  transition stage with two original GLSL transitions
  (dissolve: 4-octave fbm threshold + gold burn edge;
  swirl: counter-rotating UV wind + radial mask), an eased
  progress clock, and a `supported()` preflight; the page
  ships the DOM-crossfade fallback in the same build.
  Harness: **8/8** — including the fallback proven in a
  browser launched with WebGL disabled, and the FPS delta
  measured + filed as an envelope across two independent
  runs (shader 20–21 · fallback 61 · Δ−40…−41 fps,
  SwiftShader lab, method named).
- **M11 / Project 7** (`project-7-scroll-3d/` + the Engine
  donation `engine/camera/camera-choreography.js`): the
  camera choreography system — Catmull-Rom keyframe rig
  evaluated as cubic Bézier segments, `poseAt(t)`, time
  warped by the keyframes' `at` values — and the
  scroll-driven scene: camera flight, coin turning, 47
  bricks lighting in reading order, four story beats, one
  scroll clock. Harness: **13/13** (Node, rig built from
  the page's own filed keyframes: endpoints exact, worst
  tangent break 10.5°, path ≈26.1 units; browser: 40
  scroll landings, largest camera step 0.94 units, all
  four segments traversed, the live flight standing on
  every middle keyframe at its own scroll fraction,
  reverse scroll flies home, the HUD's lit count graded
  against the scene's materials, reduced motion static +
  text journey).
- **M8 — Blender** (`m8-blender-lamp/`): *Lumen №1*, an
  original brass desk lamp authored as a bpy script — nine
  parts, Principled materials, three-act keyframed
  animation (orbit → exploded column → glowing hold) with
  the camera itself keyframed to keep the rising column
  framed, Eevee render of 120 frames at 960×540, film
  encodes (H.264 + VP9, 5.00 s, probed), poster, and the
  web model as a separate gated pass: **192,468 B · 4,108
  triangles · 9 parts** (gate ≤5 MB / ≤250k), parsed back
  from the GLB's own accessors and loaded by the Engine
  viewer with agreeing counts. Harness: **11/11**.

## The captain's arrangement (Blender)

The launch package's Phase 2 note assumes Blender sittings
need a rendering machine "arranged by the captain; the
bench VM does not render." The captain arranged it on the
bench itself: Blender 4.0.2 was installed on this VM before
the run, and Eevee rendered headless throughout (per-frame
times extracted from the build log: mean 5.02 s, range
4.25–8.09 s across 121 renders at 960×540, on Mesa software
rendering over surfaceless EGL; the EGL warnings in the build
log are the surfaceless driver introducing itself — every
frame landed). Mid-phase, a VM replacement wiped the system
install; the house's package-intent ledger held Blender as
recorded intent and a cache-first reinstall restored it
(Blender 4.0.2, verified by version print) in time for the
final build. No module was faked around the gap: while the
install was down, no render was claimed.

## Defects found by the instruments, fixed in the run

1. **The black coin (M9).** The textured, lit coin rendered
   near-black: a PBR metal takes its colour from an
   environment map the scene did not have. Fixed in the
   component (code-built PMREM softbox); filed as Rule 19.
2. **The animated GLB (M8).** The first web export carried
   the scene's timeline; the viewer's reader refused it by
   name ("animations are outside the supported subset").
   Export now forbids animations; the harness parses the
   file's accessors against the build log. Filed as
   Rule 20.
3. **The cropped column (M8).** The first exploded poster
   cut the column's top out of frame — the camera had been
   composed for the assembled lamp. The camera now reframes
   on its own keyframes during the explosion; the final
   trim was proven on a one-frame probe before the full
   re-render was bought. Filed as Rule 22.
4. **Harness-side lessons (no product defect):** WebGL
   pages hang `networkidle0` in this bench's Chrome (use
   `load` + `waitForFunction`); pixel tests must measure
   the subject's own bounds, not the frame's; settle
   assertions wait on the chase's own state, never on
   sleeps; a draw-call count is only meaningful with the
   whole model inside the frustum (M8 check 8 measures it
   zoomed out). Recorded in the artifact READMEs.

## Carries

- **Phase 1's gate stays open behind this phase** (captain's
  ruling): Track 7 graduation still requires a Flow-produced
  film passing M6 blind. This phase neither attempts nor
  implies it.
- **H-15** (per-frame layout reads in the frame player's
  hot loop) remains assigned to **M13** (Phase 3), untouched
  here, as the package orders.
- The shader pack's mid-flight retarget starts a new leg
  from the dominant scene rather than a pixel-exact snapshot
  of the interrupted frame — documented v1 behaviour in the
  component and its README, a candidate refinement for a
  later phase, not a Phase 2 bar.
- The M3 renderer's named limits (painter's sort, whole-face
  camera-plane rejection) stand as printed on its page.

## Book + rules

The Phase 2 instalment is appended to
`TRACK_7_CINEMATIC_WEB_ENGINEERING.md` (M3 · M8 · M9 · M10 ·
M11, each ending FOR GEORGE — WHAT I NOW KNOW), and rules
instalment 4 (Rules 19–23) is appended to
`crew-skills/cinematic-web-engineering-rules.md`. The Engine
README records Phase 2's three donations (3d-viewer,
shaders, camera) and the two deliberate non-donations (M3's
renderer stays a teaching reference; M8's pipeline is a
production route, not a runtime component).
