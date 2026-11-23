# PROJECT 6 — SHADER-DRIVEN TRANSITIONS

*Track 7 · Master Project 6 (M10's exam). A page whose
scene transitions are original house shaders on raw WebGL —
with the no-shader fallback shipped in the same build and
graded in a browser with WebGL disabled.*

## What is here

- `index.html` — the page: the stage, two drawn study
  scenes (a dawn, a wall), transition controls, and the
  mathematics of both shaders explained in plain words
  with the decisive GLSL lines printed.
- `assets/scene-a.png` · `scene-b.png` — the two scenes,
  drawn programmatically for this page.
- `evidence-mid-dissolve.png` — a captured mid-transition
  frame: neither endpoint, the burn edge visible in the
  noise field.
- `verify.mjs` — the harness: 8/8.

## The Engine donation

The shader pack: `../engine/shaders/shader-pack.js` — a
fullscreen-quad stage, two original fragment shaders
(**dissolve**: four-octave value-noise fbm threshold with a
gold burn edge; **swirl**: counter-rotating coordinate
wind with a radial handover mask), an eased progress clock,
`getState()` for readouts, and `supported()` — the honest
pre-flight that lets a page promise the fallback before it
promises the effect. Mid-flight retargeting starts the new
leg from the dominant scene; a pixel-exact snapshot
handover is the pack's named next step.

## The fallback, graded

Launched with `--disable-webgl`, the page stands in
fallback mode — stacked images, CSS crossfade, same
buttons — and the harness measures the picture actually
changing (mean colour moved 121.5). The fallback is a
code path, not a paragraph.

## Filed numbers (headless lab, method named)

FPS during a transition, rAF-measured in the page, across
two independent runs: shader path 20–21 fps · fallback
path 61 fps · **delta −40…−41 fps** under SwiftShader
software GL — the per-pixel noise field is the cost, and
software rendering is where it bites; the delta is filed
as an envelope with its method, per Rule 18. On GPU
hardware the relationship is expected to invert; that
expectation is labelled an expectation, not a measurement.
