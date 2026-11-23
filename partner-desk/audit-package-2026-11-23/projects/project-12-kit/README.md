# The Complete Commercial Cinematic Website Kit

**OneJobKits Cinematic Website Engine · v1.1.0**

A complete, installable kit for building cinematic product
websites — the kind where the product turns, opens, and
explains itself as the visitor scrolls — from proven parts
instead of from a blank file.

Every component in this Kit was built by the OneJobKits
crew as coursework, proven inside a graded project, and
only then admitted. A component that isn't proven isn't
in. The Kit is the Engine, productized: the same code the
crew's own pages run, packaged with the documents a
stranger needs to install it, customize it, and grade the
result.

## What you get

- **12 Engine components** (`kit/engine/`): the
  scroll-sequence player with its smoothing chase and
  priority preload; the callout/leader-line system; the
  frame pipeline (matched frames → film → web frame sets);
  the GSAP animation system under house discipline; the
  Three.js product viewer (which pauses itself off
  screen); the shader pack with its tested fallback; the
  camera choreography rig; the interaction kit (state
  machine, scene navigation); the launch pacing system;
  the accessibility layer as a first-class build mode;
  the five-gate QA harness; and the standing budgets as
  data.
- **7 architecture templates** (`kit/templates/` A–G):
  image-sequence, video-driven, real-time 3D,
  shader-driven, hybrid, configurator, immersive
  storytelling — the seven shapes a cinematic page takes,
  each a starting configuration of the same Engine, each
  with the worked example from its own graded project.
- **Vendored libraries** (`kit/vendor/`): GSAP 3.12.5 +
  ScrollTrigger, Three.js r160 — no CDN, no build step,
  no accounts. The Kit works offline.
- **The documents**: INSTALL.md (fifteen minutes to a
  running example), CUSTOMIZE.md (make it yours — tokens,
  templates, budgets, page classes), BUDGETS.md (what the
  numbers are and the measurements they were derived
  from), CHANGELOG.md (what changed since v1.0.0 and
  why), and KIT_MANIFEST.json — every shipped file, its
  source, and its sha256, reproducible by re-running
  `assemble-kit.mjs`.

## What it asks of you

Node 18+ and a static file server are all the machinery
there is. The QA harness additionally wants puppeteer +
sharp (INSTALL.md step 4) — it grades pages in a real
browser, which is the point. Your product's assets are
yours to bring: a model inside the cleanup budgets
(≤5 MB, ≤250k triangles), a frame set inside the sequence
budgets (≤8.5 MB desktop / ≤1.5 MB mobile), a captioned
film. The frame pipeline document walks the production
run; the budgets are enforced by the harness, not by
hope.

## The standing bars

Pages built with this Kit are graded, not vibes-checked:
layout reads, long tasks, CLS and LCP against budgets
declared **per page class** (a page with a live 3D stage
is judged on its waste, not on a number its lab cannot
meet — BUDGETS.md derives both classes from filed
measurements); a complete accessible alternative as a
build mode, not an afterthought; and a baseline that is
filed as a decision, never folded into a pass.

## Whose it is

The Kit is OneJobKits' own product, built by its crew
under Track 7 of Crew University and graded blind —
different-family critic, two independent review axes,
the captain judging last — before it was allowed to call
itself finished. Its flagship demonstration, a complete
commercial product site built from nothing but this Kit,
ships beside it as Project 12's demo and was graded by
the same harness the Kit sells you.
