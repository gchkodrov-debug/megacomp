# TRACK 7 — LAUNCH PACKAGE
## Advanced Creative Development & Cinematic Web Experience Engineering

*Launch package written 2026-11-22, the night Tracks 1–6 graduated
(Exam Artifact #1 — the Coin Mint specimen — full PASS, 6 of 6,
captain's official PageSpeed filing: mobile LCP 2.4s · CLS 0 ·
desktop LCP 0.6s · CLS 0 · INP 120 ms trace). By George's standing
order, graduation unseals this track: founding document
`MASTER_DIRECTIVE_CINEMATIC_WEB_ENGINEERING_2026-11-22.md` (filed
verbatim, 27 sections), chartered in `CHARTER_AND_CURRICULUM.md`.*

*This package is study ORGANIZATION only. It builds nothing. It
turns the sealed directive into a sequenced program: modules in
dependency order, the 12 master projects mapped to house artifacts,
the Engine specified, exams defined with pass bars, and phases laid
out the way the A-to-Z program office laid out its schedule —
honestly, crediting what the Mint specimen already proved and
refusing to re-teach proven ground as new.*

**The laws that bind every line below** (from the directive, the
charter, and George's appended orders — nothing here softens them):

- **George's output rule:** every learning module produces working
  code or a finished visual asset — never just a written report.
- **The end-state artifact is the OneJobKits Cinematic Website
  Engine** — owned, understood, customizable, reusable across
  multiple original premium products.
- **The Mastery Standard:** graduation is proven, never claimed.
  Practical exams on shipped work, graded blind (different-family
  critic + blind verifier who never see the builder's reasoning),
  finest-variant bar, **captain judging last**. Production-Ready
  stamps land per skill, only on a blind pass, with the graded
  artifact named. Failures loop back to the module that owns them
  and are re-sat.
- **The A–J study method** (charter): Explain, Demonstrate,
  Reproduce, Modify, Debug, Optimize, Integrate, Build, Review,
  TEACH — a subject is not mastered until the seat can teach it.
  Inside each module, teaching follows the directive's own 15-step
  sequence (§23). See the flags section for how the two sequences
  sit together.
- **Team capability, not universal individual mastery** (directive
  §2): the 20 professional disciplines are held by the crew as a
  whole; specialist seats are assigned per module (directive §25).

---

## 1. MODULE MAP — 18 modules, dependency order

Foundations first; nothing downstream is scheduled before its
prerequisites exist as artifacts. Each module names what it teaches
(directive section), its binding official resources (directive §24 —
authoritative documentation only), and its **required output** —
the code or finished visual asset the module must ship before its
exam can be sat. A module with no output does not exist.

### M0 — Level Zero: How the Web Actually Works (§3)
- **Teaches:** what the internet is; how browsers work; how websites
  load; HTML/CSS/JavaScript roles; servers; HTTP; rendering;
  animation and FPS; CPU, GPU, memory; the rendering pipeline;
  graphics APIs; compositing. The six website kinds — static,
  animated, video-based, canvas, real-time 3D, hybrid — and when
  each is the right tool.
- **Binding resources:** MDN (developer.mozilla.org) · Chrome
  Developers (developer.chrome.com) · web.dev.
- **Required output:** a working interactive explainer page — "How
  the Web Works" — that demonstrates each of the six website kinds
  as a live miniature on one page. (Code, not an essay: the
  explainer is the crew's first teaching artifact, and the A–J
  TEACH stage is built into it.)

### M1 — Foundations: HTML, CSS, JavaScript, TypeScript (§4)
- **Teaches:** semantic HTML; modern CSS, Grid, Flexbox, transforms,
  transitions, animations, custom properties; JavaScript
  fundamentals; TypeScript; DOM; events; async and Promises;
  modules; component architecture; React; Next.js; Git/GitHub;
  Node tooling; DevTools; responsive design; accessibility. How the
  browser turns code into pixels.
- **Binding resources:** MDN · React (react.dev) · Next.js
  (nextjs.org/docs).
- **Required output:** the directive's own exam build, produced as
  coursework — an original responsive website with interactive
  sections, reusable components, and accessible navigation (this is
  also Master Project 1's foundation; see §2).

### M2 — Cinematic Design & Art Direction (§5)
- **Teaches:** cinematography; visual storytelling; composition;
  framing; camera language; perspective; lighting; color grading;
  typography; negative space; hierarchy; contrast; depth; rhythm;
  pacing; motion continuity; scene transitions; storyboarding;
  attention and emotional storytelling; interactive narrative;
  brand consistency. How storytelling changes when the viewer
  drives through scroll.
- **Binding resources:** the directive names no single official doc
  for this craft module; its binding inputs are the house design
  law (One DNA) and the §21 structured study of world-class sites
  (run inside M17). Resource honesty: this module's authority is
  the storyboard exam below, not a documentation link.
- **Required output:** a complete cinematic website storyboard —
  every major scene, transition, interaction, and responsive
  adaptation drawn and specified (the directive's exam artifact).
  A finished visual asset: the storyboard itself, board by board.

### M3 — Computer Graphics Mathematics (§10)
- **Teaches:** vectors; matrices; linear algebra; trigonometry;
  coordinate systems; transformations (rotation, translation,
  scaling); quaternions; camera projection; perspective;
  interpolation; Bézier curves; splines; raycasting; lighting
  mathematics; surface normals; texture coordinates; animation
  timing. Students must explain *and implement* the math.
- **Binding resources:** MDN WebGL/WebGPU API references · Three.js
  docs (math classes) · web.dev.
- **Required output:** a hand-written software renderer — working
  code that projects, rotates, and lights a 3D object from raw
  math, no library doing the transforms. (The A-to-Z program's
  hand-written renderer exercise, adopted as this module's
  artifact.)

### M4 — The Animation Engine: GSAP Master Training (§6)
- **Teaches:** tweens; timelines; easing; staggering; transforms;
  SVG animation; motion paths; ScrollTrigger; scroll-controlled
  timelines; pinned sections; scrubbing; scroll progress; text
  animation; page transitions; sequencing; timeline nesting;
  responsive animation rules; cleanup; React integration;
  performance; reduced-motion alternatives. How animations are
  scheduled, and how to keep animation, scrolling, and rendering
  from fighting.
- **Binding resources:** GSAP docs (gsap.com/docs/v3) · MDN.
- **Required output:** a multi-section cinematic website with
  precisely coordinated transitions and scroll-driven storytelling
  (the directive's exam artifact; also Master Project 2).

### M5 — Video Production & Cinematic Media Engineering (§8)
- **Teaches:** frame rates; resolution; aspect ratios; codecs
  (H.264, H.265/HEVC, AV1); MP4/WebM; FFmpeg; compression; frame
  extraction; seeking; buffering; synchronization; overlays; color
  grading; alpha techniques; compositing; audio sync; captions;
  media accessibility; adaptive delivery; mobile video
  restrictions; CDN delivery. Choosing format by quality, support,
  size, bandwidth, and performance.
- **Binding resources:** FFmpeg documentation (ffmpeg.org) ·
  web.dev · MDN.
- **Required output:** an interactive cinematic website integrating
  video, animation, text, and user-controlled transitions (the
  directive's exam artifact), plus its filed delivery set — the
  same film encoded and measured across formats, numbers on
  record.

### M6 — Google Flow & AI Cinematic Production (§14)
- **Teaches:** Flow; Veo; Nano Banana; Gemini; AI Studio; Stitch.
  AI storyboarding; cinematic prompting; reference-image creation;
  scene, camera, lighting, and product consistency; image-to-video
  and text-to-video; editing and refinement; export; frame
  extraction; integration into cinematic websites. The limitations
  of generated footage — never assume it provides accurate geometry
  or usable 3D assets.
- **Binding resources:** Google Flow (labs.google/fx/tools/flow) ·
  Google AI (ai.google.dev).
- **Required output:** original cinematic footage produced in Flow
  and integrated into a responsive, interactive website (the
  directive's exam artifact; also Master Project 4).
- **Specimen credit:** the Mint film (matched pair at 0 credits,
  Veo Fast film at 20 credits, 235 frames, flaw logged) already
  proved this pipeline once, at Production-Ready on that artifact.
  M6 does not re-teach the pipeline; its exam is breadth — a
  second product's film, end to end (the breadth Track 6's Task 1
  still owes).

### M7 — Apple-Style Image-Sequence Websites (§7)
- **Teaches:** the full 24-step craft — concept, storyboard, video
  and 3D production, frame extraction, FFmpeg, formats, numbering,
  compression, quality, preloading, progressive loading, canvas
  rendering, scroll-position mapping, ScrollTrigger sync,
  responsive canvas scaling, memory, caching, mobile optimization,
  reduced motion, error recovery, performance and cross-browser
  testing, deployment/CDN. The math: `frameIndex =
  floor(scrollProgress × (totalFrames − 1))` — clamping, rounding,
  interpolation, decode timing, frame availability. The five
  rendering families compared (sequence, scroll-video, real-time
  3D, pre-rendered 3D, hybrid).
- **Binding resources:** FFmpeg docs · GSAP docs · web.dev · MDN
  (Canvas).
- **Required output:** an original cinematic product website with
  **at least 240 optimized frames**, scroll-controlled playback,
  responsive layouts, and documented performance measurements
  (the directive's exam artifact; also Master Project 3).
- **Specimen credit:** the Mint specimen *is* this architecture,
  shipped and exam-passed — chase, priority preload, callouts,
  mobile set, filed CWV. M7's new ground is the 240-frame bar at
  full standard on a *new* product (see the flags section: the
  specimen's 235 frames do not satisfy this module's 240), plus
  error recovery and cross-browser evidence the specimen never
  had to file.

### M8 — Blender & Professional 3D Asset Creation (§9)
- **Teaches:** modeling; mesh topology; hard-surface modeling; UV
  mapping; PBR materials; textures; lighting; camera animation;
  product and exploded-view animation; rigging; Geometry Nodes;
  procedural animation; scene composition; rendering; texture
  baking; asset compression; glTF/GLB export; polygon optimization;
  level-of-detail systems. Assets for both pre-rendered film and
  real-time browser graphics.
- **Binding resources:** Blender docs (docs.blender.org).
- **Required output:** an original 3D product animation rendered
  into a cinematic sequence, **and** a separate optimized model
  prepared for real-time web use (the directive's exam artifact) —
  the optimized model must pass the house cleanup gate with its
  stats line filed (Track 5 budgets: ≤5 MB, ≤250k triangles).
- **Honest starting point:** this is the crew's plainest zero
  (dashboard L6: Beginner, no authored asset has ever existed).
  Nothing here is credited in advance.

### M9 — Three.js & Real-Time 3D Websites (§11)
- **Teaches:** Three.js architecture; React Three Fiber; Drei;
  scene graphs; cameras; lighting; materials; textures;
  environment maps; meshes; geometry; model loading; animation
  mixers; raycasting; pointer interaction; orbit controls;
  scroll-driven camera movement; product rotation; exploded-view
  interactions; configurators; postprocessing; particles; shadows;
  reflections; render optimization; GPU profiling.
- **Binding resources:** Three.js docs (threejs.org/docs) · React
  Three Fiber (r3f.docs.pmnd.rs).
- **Required output:** a cinematic 3D product website where users
  rotate, zoom, inspect, and interact with the product (the
  directive's exam artifact; also Master Project 5).
- **Specimen credit:** none claimed from the Mint page (it is a
  canvas build, deliberately 3D-free). The town's live WebGL coin
  is Intermediate evidence (dashboard L7) — a starting point, not
  this module's pass.

### M10 — Shader Engineering (§12)
- **Teaches:** WebGL and WebGPU fundamentals; GLSL; WGSL; vertex
  and fragment shaders; uniforms; texture sampling; noise;
  procedural patterns; lighting shaders; distortion; dissolve;
  refraction; reflection; particle shaders; custom transitions;
  GPU performance optimization. Original effects, not preset
  rental.
- **Binding resources:** MDN WebGL API · MDN WebGPU API ·
  Three.js docs.
- **Required output:** a cinematic interactive website using
  original shader-driven visual transitions (the directive's exam
  artifact; also Master Project 6), with the fallback for
  shader-less browsers shipped, not promised.
- **Honest starting point:** Beginner — zero custom shaders exist
  in any house build (dashboard L8). Nothing credited in advance.

### M11 — Advanced Camera & Scene Choreography (§13)
- **Teaches:** camera paths and rigs; interpolation; depth of
  field; focal length; perspective; tracking; dolly and orbit
  movements; scene transitions; object reveals; lighting
  transitions; motion continuity; product disassembly sequences;
  scroll-controlled camera and scene changes; cinematic pacing.
  Coordinating camera, objects, lighting, typography, and
  interaction into one continuous experience.
- **Binding resources:** Three.js docs · GSAP docs · Blender docs
  (camera animation).
- **Required output:** an interactive cinematic scene containing
  multiple camera transitions and coordinated object animations
  (the directive's exam artifact).

### M12 — Advanced Interactive Experience Engineering (§15)
- **Teaches:** scroll, pointer, touch, and gesture interaction;
  drag; hotspots; configurators; scene navigation; keyboard
  accessibility; interactive storytelling; multi-scene
  transitions; responsive interaction design; state management;
  animation state machines; event coordination; input-latency
  optimization. Interactions that remain understandable and
  usable.
- **Binding resources:** MDN · web.dev · WCAG
  (w3.org/WAI/standards-guidelines/wcag).
- **Required output:** a complete interactive product presentation
  with multiple user-controlled experiences (the directive's exam
  artifact).

### M13 — Browser Rendering & Performance Engineering (§16)
- **Teaches:** Chromium architecture; Blink; V8; DOM construction;
  CSS parsing; layout; paint; compositing; GPU acceleration;
  requestAnimationFrame; main-thread blocking; JS, memory, and GPU
  profiling; asset loading; network waterfalls; image decoding;
  texture memory; frame timing; garbage collection; mobile thermal
  and battery limits. DevTools; Lighthouse; Core Web Vitals;
  real-user monitoring; performance budgets; progressive
  enhancement; graceful degradation. Visual smoothness is not
  page-load performance — the module teaches the difference by
  measurement.
- **Binding resources:** Chrome Developers · web.dev · MDN.
- **Required output:** a deliberately inefficient cinematic website,
  profiled, its bottlenecks identified, and measurable improvements
  demonstrated (the directive's exam artifact) — before/after
  numbers filed, same method as the specimen's CWV record.
- **Specimen credit:** Performance is Production-Ready *on the Mint
  specimen* (filed CWV: mobile LCP 2.4s · CLS 0 · INP 120 ms
  trace). M13 generalizes that one page's discipline into a
  repeatable profiling system; the exam artifact is a *different*,
  deliberately broken page, so the skill is proven on unseen
  ground.

### M14 — Accessibility & Responsive Cinematic Design (§17)
- **Teaches:** WCAG principles; semantic HTML; keyboard navigation;
  screen-reader compatibility; reduced-motion preferences; focus
  management; accessible navigation; contrast; readability; touch
  targets; responsive layouts; mobile interaction; alternative
  content; captions; animation pause controls; motion sensitivity.
  A cinematic website must remain usable when animation is
  reduced, disabled, or unsupported.
- **Binding resources:** WCAG · MDN · web.dev.
- **Required output:** a cinematic experience with a complete
  accessible alternative presentation (the directive's exam
  artifact) — the alternative is a shipped build, not a settings
  toggle screenshot.

### M15 — Cinematic Website Architecture — the Engine Module (§18)
- **Teaches:** component architecture; reusable animation systems;
  scene management; state machines; asset pipelines; design
  tokens; animation configuration; data-driven content; modular
  code; error handling; testing; documentation; deployment;
  version control; dependency management. The directive's standing
  order: do not build every project from scratch when a reliable
  reusable component can be developed.
- **Binding resources:** MDN · React · Next.js · the house books
  (Tracks 1–6) as internal authority.
- **Required output:** the **OneJobKits Cinematic Website Engine**
  itself — assembled, documented, installable (spec in §3 of this
  package). This module's output is the course's end-state
  artifact; it is built piece by piece by every earlier module and
  finished here.

### M16 — Quality Assurance & Security (§19)
- **Teaches:** unit, integration, and end-to-end testing; visual
  regression; accessibility testing; performance regression;
  browser compatibility; device testing; input validation;
  dependency security; Content Security Policy; secure asset
  delivery; error monitoring; release management. Every commercial
  product tested on its supported browsers and devices; universal
  compatibility is never claimed without evidence.
- **Binding resources:** web.dev · MDN · Chrome Developers.
- **Required output:** the Engine's QA harness — a working test
  suite (unit + end-to-end + visual regression + accessibility +
  performance gates) that runs against a real build and files its
  results. The harness is code; its first full run grades Master
  Project 11.

### M17 — The Architectures & Studying the World's Best (§20 + §21)
- **Teaches:** Architectures A–G, each answered in the directive's
  ten questions (how it works, technology, why chosen, advantages,
  limitations, performance, production workflow, maintenance,
  accessibility, commercial applications): A image-sequence ·
  B video-driven · C real-time 3D · D shader-driven · E hybrid ·
  F interactive configurator · G immersive storytelling. Plus the
  §21 research discipline: structured technical study of
  outstanding public sites (Apple, Google, Awwwards, CSS Design
  Awards, automotive, luxury, agencies, museums, education,
  premium tech) — observable techniques only, loading and network
  behavior measured, performance and accessibility evaluated,
  tradeoffs named, and an original demonstration built for every
  technique studied. No proprietary claims, no copied assets,
  branding, or code.
- **Binding resources:** the award and brand sites themselves
  (public, observed) · web.dev (measurement method).
- **Required output:** for each architecture, one original working
  demonstration build (seven builds — most are the master projects
  themselves, mapped in §2), and for each studied site an original
  technique demonstration. Research notes alone do not satisfy
  this module; the demonstrations are the output.

---

## 2. THE 12 MASTER PROJECTS — build order → house artifacts

The directive's progression (§22), unchanged in order. Every
project carries the directive's standing requirements: original
design, working source code, documented architecture, responsive
layouts, accessibility, performance optimization, error handling,
testing, installation instructions, customization instructions,
independent review. Each project also *donates* its proven
components to the Engine (§3) — a project that ends as a demo has
failed its second purpose.

| # | Project (directive §22) | House artifact it produces / upgrades | Engine donation |
|---|---|---|---|
| 1 | Responsive Website Foundation | The Engine's skeleton repository + the foundations exam site (M1's build, grown up) | Component shell, design tokens, responsive grid |
| 2 | Advanced GSAP Animation Website | A full GSAP-driven presentation page in the house design language — the animation layer every later page inherits | Animation system: timelines, ScrollTrigger rig, cleanup + reduced-motion rules |
| 3 | Apple-Style Scroll-Controlled Image Sequence | A catalogue listing rebuilt to the full scroll standard at **≥240 frames** — the Mint specimen's successor, on a second product | Scroll-sequence player v1 (see §3) |
| 4 | Google Flow Cinematic Product Presentation | The second product's Flow film, integrated as a page — closes Track 6 Task 1's owed breadth | Frame pipeline (pair → film → slice → web sets) as a documented, repeatable run |
| 5 | Three.js Interactive Product Viewer | **The Keeper's Coin viewer** (A-to-Z Project B / Capstone 4): the town coin, rotatable, zoomable, inspectable | 3D viewer component + model-loading and cleanup-gate rules |
| 6 | Shader-Driven Cinematic Website | A live page whose transitions are original house shaders | Shader pack v1 + fallback ladder |
| 7 | Advanced Scroll-Controlled 3D Storytelling | The town's coin page, upgraded: scroll drives camera and scene, not a frame strip | Camera choreography system + scroll↔scene binding |
| 8 | Premium Automotive Product Experience | A new demonstration product page at the automotive bar — the Engine proven outside our own catalogue's habits | Hero/scene templates stress-tested at the highest visual bar |
| 9 | Luxury Product-Launch Website | A launch-class page (the Founder/launch pattern): timed reveals, scarcity-honest copy under the Receipt Law | Launch template + pacing system |
| 10 | Interactive Architecture / Real-Estate Presentation | A spatial presentation demo — walkthrough-style interaction, the configurator's sibling | Scene navigation + hotspot system |
| 11 | Hybrid Video and Real-Time 3D Website | The town front door candidate: video, sequence, and live 3D in one page, graded by M16's harness | The full Engine, integrated under load |
| 12 | **Complete Commercial Cinematic Website Kit** | **The flagship product** (A-to-Z Capstone 10 = Track 5 Project E = Track 6 Exam Task 5): the Engine packaged as a commercial kit — installable, customizable, documented | The Engine itself, productized |

---

## 3. THE ENGINE — OneJobKits Cinematic Website Engine

**What it is:** a reusable, documented, installable codebase —
components, pipelines, and budgets — that turns "build a cinematic
product page" from a from-scratch craft act into an assembly from
proven parts. OneJobKits owns it outright: every component was
built by the crew as a module output, is understood well enough to
be taught (A–J's final stage), and can be customized per product.
It is the course's end-state artifact (George's additional
requirement) and Master Project 12's product.

**Components** (each born in a module, proven in a project,
finished in M15):

1. **Scroll-sequence player** (M7 · Project 3) — canvas +
   drawImage; the lerp smoothing chase (target += diff × 0.1,
   never raw scroll → frame); priority-tier preload (frame 0,
   last, midpoint, binary-subdivision quartiles) with
   nearest-loaded fallback; DPR cap; reduced-motion respect. All
   of it already proven live in the Mint specimen — the Engine
   inherits the specimen's player as its v1, extracted and
   generalized, not rewritten from memory.
2. **Callout / leader-line system** (M7 · Project 3) — the
   specimen's reusable component: any callout with a tip anchor
   gets an SVG leader line + halo + dot through the same cover-fit
   transform as the canvas, opacity wired to the callout's own
   settled state, tips measured per stage on that stage's own
   frame. Plus the Bullet-Point Law as configuration: each part
   named and explained in one line, at its scroll moment.
3. **Frame pipeline** (M5 + M6 · Projects 3–4) — the documented
   run: matched start/end frames → Flow film → FFmpeg slice at
   30 fps → optimized WebP sets (desktop + true mobile set) →
   byte budgets verified. A pipeline document a seat can run
   cold, with the credit and byte costs measured per run.
4. **Performance budget enforcer** (M13 · all projects) — the
   gate as code: Core Web Vitals bars (LCP ≤2.5s · INP <200ms ·
   CLS <0.1) measured and filed per page; Track 5 budgets
   enforced at build time (sequence ≤8.5 MB desktop / ≤1.5 MB
   mobile; product models ≤5 MB / ≤250k triangles / ≤500 draw
   calls); LCP-asset rules learned the hard way on the specimen
   (reserved boxes on every medium, font preloads, the hero asset
   eager and prioritized). A page that misses a bar does not ship;
   the enforcer's filing is the proof.
5. **Animation system** (M4 · Project 2) — GSAP timelines,
   ScrollTrigger rigs, pinned scenes, page transitions, cleanup
   discipline, responsive and reduced-motion rules.
6. **3D viewer** (M9 · Project 5) — Three.js/R3F product viewer:
   load, rotate, zoom, inspect, exploded views, configurator
   hooks, render optimization, GPU profiling hooks.
7. **Shader pack** (M10 · Project 6) — original transition and
   effect shaders with a tested fallback ladder.
8. **Camera choreography system** (M11 · Project 7) — paths,
   rigs, interpolation, scroll-bound camera and scene control.
9. **Interaction kit** (M12 · Projects 5, 10) — hotspots, drag,
   configurators, scene navigation, animation state machines,
   input-latency discipline.
10. **Accessibility layer** (M14 · every project) — the complete
    alternative presentation as a first-class build mode:
    reduced-motion, keyboard, screen-reader, captions, pause
    controls.
11. **QA harness** (M16 · Project 11) — unit, end-to-end, visual
    regression, accessibility, and performance-regression gates
    that file their own results.
12. **Architecture templates** (M17 · Projects 8–11) — the seven
    architectures as starting configurations of the same Engine,
    so a new product begins from the right shape, not a blank
    file.

**How the projects feed it:** no component enters the Engine from
a lesson — only from a project that shipped it and passed review.
Projects 1–2 lay the shell and motion; 3–4 the sequence player,
callouts, and frame pipeline; 5–7 the 3D, shader, and camera
systems; 8–10 stress the templates outside the catalogue's habits;
11 integrates everything under the QA harness; M15 assembles and
documents; Project 12 packages the result as the commercial kit.
The Engine's version at any moment is exactly the set of
components with a graded project behind them — the same honesty
rule as the capability dashboard: a component that isn't proven
isn't in.

---

## 4. EXAM DEFINITIONS — pass bars, Mastery Standard

**The grading law for every exam below** (charter + George's
graduation amendment): the artifact is graded **blind** — a
different-family critic and a blind verifier who never see the
builder's reasoning — against the stated bars; the relay must
agree it is the finest variant; **the captain judges last**.
Production-Ready stamps are awarded per module skill only on a
blind pass, with the artifact named. Any failed bar loops back to
its module and is re-sat. Tutorial completion, study, and reports
earn nothing. Every exam artifact must also satisfy the standing
project requirements (directive §22): original design, working
source, documented architecture, responsive, accessible,
performance-optimized, error handling, testing, install and
customization instructions, independent review.

**Standing measured bars** (house law, applied wherever they fit):
Core Web Vitals on the live artifact — LCP ≤2.5s · INP <200ms ·
CLS <0.1, measured and filed the way the specimen's were (official
PageSpeed filing + the gate's trace method for INP). Sequence
budgets: ≤8.5 MB desktop / ≤1.5 MB mobile frame sets. Model
budgets: ≤5 MB · ≤250k triangles · ≤500 draw calls.

### Per-module exams
- **M0** — The explainer page, blind-graded as a teaching
  artifact: a grader with no web background can correctly answer
  what each of the six website kinds is and when to use it, from
  the page alone. Any kind misexplained = fail, loop to M0.
- **M1** — The directive's exam: original responsive website,
  interactive sections, reusable components, accessible
  navigation. Bars: components genuinely reused (no copy-paste
  twins); keyboard-complete navigation; zero console errors.
- **M2** — The storyboard exam: every scene, transition,
  interaction, and responsive adaptation specified. Bar: a builder
  who never met the designer can build from the boards without
  asking a question; any scene that needs a verbal explanation =
  fail.
- **M3** — The renderer: transforms, projection, and lighting
  computed from the student's own math. Bar: the output object
  rotates and lights correctly under inspection, and the student
  explains each matrix in the TEACH stage — unexplained code,
  however correct, is not mastery.
- **M4** — The directive's exam: multi-section cinematic site,
  precisely coordinated transitions, scroll-driven storytelling.
  Bars: no animation conflicts under fast/reverse scrolling;
  reduced-motion alternative shipped; frame timing filed.
- **M5** — The directive's exam: interactive site integrating
  video, animation, text, user-controlled transitions. Bars: the
  delivery set's format choices justified by filed measurements
  (size vs quality per codec), captions present, mobile playback
  restrictions handled.
- **M6** — The directive's exam: original Flow footage integrated
  into a responsive interactive website. Bars: product consistency
  held across every generated shot (a shot that redraws the
  product = reject at the still, per Track 3's law); credits per
  finished film measured and filed; the second-product breadth
  requirement met.
- **M7** — The directive's exam: original product site, **≥240
  optimized frames**, scroll-controlled playback, responsive
  layouts, documented performance. Bars: the standing CWV and
  sequence budgets on the live page; chase and priority preload
  present and verified; callouts with leader lines at every
  stage; error recovery demonstrated (a missing frame degrades,
  never breaks).
- **M8** — The directive's exam: original 3D product animation
  rendered to a cinematic sequence + a separate web-optimized
  model. Bars: the optimized model passes the cleanup gate inside
  budget (≤5 MB, ≤250k triangles) with its stats line filed; the
  rendered sequence is storyboard-faithful.
- **M9** — The directive's exam: cinematic 3D product site —
  rotate, zoom, inspect, interact. Bars: draw calls ≤500 filed
  from a real profile; interaction latency measured; the model
  inside budget.
- **M10** — The directive's exam: cinematic site with original
  shader-driven transitions. Bars: every shader original (no
  preset passes as coursework); the no-shader fallback shipped
  and graded; FPS delta of the shader path measured and filed.
- **M11** — The directive's exam: interactive scene, multiple
  camera transitions, coordinated object animations. Bar:
  continuity — no cut, jump, or lighting break a blind grader can
  catch on a full pass.
- **M12** — The directive's exam: complete interactive product
  presentation, multiple user-controlled experiences. Bars: every
  experience completable by keyboard alone; state machine handles
  interrupted and reversed interactions without a stuck state.
- **M13** — The directive's exam: profile the deliberately
  inefficient site, name the bottlenecks, demonstrate measurable
  improvement. Bars: before/after filings on the same measurement
  route; every claimed bottleneck tied to a trace, not an opinion;
  the improved page inside the standing CWV bars.
- **M14** — The directive's exam: cinematic experience + complete
  accessible alternative. Bars: the alternative graded as a full
  presentation in its own right (content-complete, not a stripped
  page); WCAG checks filed; reduced-motion path exercised on a
  real device setting.
- **M15** — The Engine exam: a blind verifier installs the Engine
  and builds a new product page from its documentation alone,
  timed, zero questions (the A-to-Z Phase 4 gate, adopted). Any
  question the verifier has to ask = a documentation fail, loop
  to M15.
- **M16** — The harness exam: the QA suite runs against a build
  with planted defects. Bar: every planted defect caught by the
  gate that owns it (the Qwen-style planted-defect discipline,
  applied to our own harness); a missed defect = the harness, not
  the build, goes back.
- **M17** — Seven architecture demonstrations, each blind-graded
  against the directive's ten questions for that architecture.
  Bar: for each architecture, the grader can state from the build
  and its filing why a professional would choose it — and what it
  costs.

### The Final Master Examination (directive §26)
Sat once, at the end, under the same rules — on the flagship
artifact (Master Project 12, the Complete Commercial Cinematic
Website Kit) plus the Engine it packages. The candidate crew must
independently demonstrate all eighteen §26 abilities: architect a
complete cinematic website; storyboard it professionally; produce
original assets; implement advanced GSAP animation; build
scroll-controlled image sequences; create real-time 3D scenes;
develop custom shaders; engineer camera choreography; integrate
video and 3D; optimize browser performance; support mobile; meet
accessibility requirements; debug rendering and animation
problems; write maintainable code; build automated tests;
document the implementation; pass independent technical review;
deliver a finished commercial-quality product.
**Pass bar:** every one of the eighteen demonstrated on shipped
work at the finest-variant standard, blind-graded, captain judging
last. One undemonstrated ability = the examination is not passed;
the owning module is re-sat and the examination re-taken. There is
no partial graduation.

---

## 5. PHASES — the run order

Mirroring the A-to-Z schedule's shape: phases are a *sequence*, not
a selection; no calendar dates are promised (report landings, not
forecasts); a phase ends when its exit gate passes. One objective
per chair per week, named as an artifact in advance; A–J stage
visible in the work; blind grade at week's end; the dashboard
re-scored from grades only.

### Phase 0 — Launch & the floor (M0, M1)
Level Zero and Foundations. Short by design: the crew works at
this level daily, but the floor has never been *examined* under
this specialization. **Exit gate:** M0 and M1 exams passed blind;
Project 1 shipped (the Engine's skeleton exists).

### Phase 1 — The cinematic core (M2, M4, M5, M6, M7)
Design, GSAP, media, Flow, image sequences — the path the house
already walks, taken to exam depth. **Specimen credit, stated
plainly:** M6's pipeline and M7's architecture were proven on the
Mint specimen at Production-Ready *on that artifact*; these
modules do not re-teach them. Their exams are sat on new ground —
a second product's film (M6) and a ≥240-frame listing at full
standard (M7). **Exit gate:** Projects 2, 3, and 4 passed blind;
the sequence player, callout system, and frame pipeline enter the
Engine as proven components.

### Phase 2 — 3D depth (M3, M8, M9, M10, M11)
Math, Blender, Three.js, shaders, camera. The honest phase: two
of its modules start at Beginner (Blender, shaders — the
dashboard's named zeros) and nothing is credited in advance.
Blender sittings need a machine that renders — arranged by the
captain; the bench VM does not render. **Exit gate:** Projects 5,
6, and 7 passed blind; the viewer, shader pack, and camera system
enter the Engine.

### Phase 3 — Experience & quality systems (M12, M13, M14, M16)
Interaction, performance, accessibility, QA/security. M13 and M14
start from specimen-proven ground (filed CWV; the specimen's
reduced-motion and mobile work) and generalize it into systems.
**Exit gate:** Projects 8, 9, and 10 passed blind; the QA harness
exists and has caught planted defects (M16's exam).

### Phase 4 — The Engine (M15, M17)
Architecture and the seven architectures. The Engine is assembled
from proven components only, documented to the blind-install bar.
**Exit gate:** M15's blind-install exam passed; M17's seven
demonstrations graded; Project 11 (hybrid) passed under the full
QA harness.

### Phase 5 — The commercial summit (Project 12 + §26)
The Complete Commercial Cinematic Website Kit is built from the
Engine, then the Final Master Examination is sat on it. **Exit
gate:** the examination passed in full — all eighteen abilities,
blind, captain last. On that pass, Track 7 graduates and the
Engine's skills earn their Production-Ready stamps, artifact
named: the Kit.

---

## FLAGS — where the sources disagree or need a ruling

*Per house practice: disagreements are flagged, never silently
resolved. Four are recorded; the package's working treatment is
stated for each, and the captain's ruling can replace any of them.*

1. **Two teaching sequences.** The charter's Study Method Law
   prescribes A–J (10 stages, ending in TEACH); the directive's
   §23 prescribes a 15-step sequence (ending in "evaluate
   independent mastery"). They overlap heavily but are not the
   same list. *Working treatment:* both bind — §23 is the teaching
   sequence inside a module; A–J is the per-seat mastery
   progression across the course, and its TEACH stage is the
   stricter ending, so it governs the definition of "mastered."
2. **The 240-frame bar vs the specimen's 235.** Directive §7's
   exam requires at least 240 optimized frames. The Mint specimen
   shipped 235 (its film is 7.85 seconds; at 30 fps that is the
   honest count) and passed its Tracks 5/6 exam in full. *Working
   treatment:* the specimen's pass stands — it was graded under
   its own exam's bars. Track 7's bar is NOT lowered to fit it:
   M7/Project 3 must reach ≥240 frames, which in practice means
   commissioning a source film of a full 8.00 seconds or better.
3. **"Component library" vs "Engine."** Directive §18 and §25
   name the reusable output a *component library*; George's
   additional requirement names the end-state artifact the
   *Cinematic Website Engine*. *Working treatment:* the Engine is
   the superset — library + frame pipeline + budget enforcer +
   QA harness + documentation — and the name "Engine" governs,
   as the later and more specific instruction from George.
4. **Stamps are per-artifact, not per-crew.** The dashboard's
   Production-Ready stamps (Motion & Scroll, Flow, Cinematic
   Production, Performance) were earned *on the Mint specimen*.
   Nothing in this package reads them as blanket mastery of M6,
   M7, M13, or M14 — each module's exam is still sat, on new
   artifacts, exactly as §5 phases state. Any reading that treats
   graduation as "Track 7 is half done" is rejected here in
   advance.

---

## FOR GEORGE — WHAT TRACK 7 IS

Track 7 is the crew's second degree. The first degree taught them
to build one great cinematic page — and they proved it: the Mint
page passed its exam with real measured numbers. Track 7 teaches
them to do it every time, for any product, like a professional
studio.

They will learn the whole craft from the ground up: how a browser
really works, how to design a scene before building it, how to
animate it, how to film it with AI, how to build it in real 3D,
how to make it fast, and how to make it work for every visitor —
including visitors who need the motion turned off.

Every lesson must end in something real: working code, a finished
film, a built page. No lesson counts if it only produces a report.

Piece by piece, those builds become one thing we own: the
OneJobKits Cinematic Website Engine. It is our own reusable
machine for making cinematic product pages — the scroll player,
the callouts that point at each part, the film pipeline, the speed
guards — all built by our crew, all understood by our crew, ready
to be used again and again for new premium products. The final
project packages that engine as a product we can sell: a complete
commercial cinematic website kit.

And you will know it is real the same way you knew the Mint page
was real: every step is an exam on shipped work, graded blind by
critics who never saw the builder's reasoning, with the captain
judging last — and the final exam's flagship gets judged by you.
Nothing graduates by saying it knows. It graduates by proving it,
in numbers and in pages you can open.
