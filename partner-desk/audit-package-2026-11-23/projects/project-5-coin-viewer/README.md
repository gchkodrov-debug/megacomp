# PROJECT 5 — THE KEEPER'S COIN VIEWER

*Track 7 · Master Project 5 (M9's exam). A cinematic 3D
product viewer: the town's coin, rotatable, zoomable,
inspectable — built on the Engine's 3D viewer component.*

## What is here

- `index.html` — the exam room: the viewer stage, part
  buttons (Front / Reverse / Edge / Reset), an inspection
  panel, and a state readout printed from the component's
  own `getState()` (Rule 14).
- `assets/` — the two anchored coin-face textures, copied
  from the town's design assets (the coin must remain THIS
  coin).
- `vendor/three.min.js` — the house's vendored Three.js
  r160 UMD build (never CDN).
- `renders-coin.png` — a frame of the coin as the viewer
  presents it, kept as visual evidence.
- `verify.mjs` — the harness: 10/10 (see below).

## The Engine donation

The viewer itself: `../engine/3d-viewer/viewer.js` — its
own orbit controls (pointer drag, wheel, pinch, and
**keyboard**: arrows orbit and tilt, +/− zoom, 0 resets),
raycast inspection with named parts, the smoothing chase,
idle auto-rotate that yields to interaction and to
reduced-motion, a self-measured FPS and input-latency
ledger, and a complete, idempotent `destroy()`. It also
carries the pack's minimal GLB reader (static, unskinned,
factor-coloured models — the subset our own cleanup gate
exports; anything outside it fails with a named error),
proven in M8's harness against Blender's own export.

## The carried requirement, discharged

Phase 0's grading ruled the pointer-only 3D drag a binding
carry: *M9's real product viewer owes keyboard orbit.* It
is paid here — harness check 3 drives four ArrowRight and
two ArrowUp presses, verifies the targets moved by the
exact key steps, and waits for the chase to settle on them.

## Filed numbers (headless lab, method named)

3 draw calls for the coin (bar ≤500) · 512 model triangles ·
input latency 0–1 ms (event → next rendered frame, SwiftShader
lab) · readout verified equal to component state after
settle · keyboard targets exact by construction (0.72 rad =
4 × the 0.18 step), settle asserted inside a 0.02 tolerance.
The coin's darkness before the environment map was
added is recorded as the phase's PBR lesson: a metal with
nothing to reflect renders near-black — the viewer now
builds a small softbox room and PMREM-filters it into
`scene.environment`.
