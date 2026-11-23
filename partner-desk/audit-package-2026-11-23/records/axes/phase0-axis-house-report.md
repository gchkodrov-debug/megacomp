# Axis: HOUSE — Independent Review (fresh context)

Scope reviewed, and nothing else: `m0-how-the-web-works/index.html`; `project-1-engine-skeleton/` (`engine/`, `exam-site/`, `README.md`, `tools/`); the binding rules in `crew-skills/cinematic-web-engineering-rules.md` (instalments 1–2). No run notes, grading records, or producer narratives were read. Pages were served locally and run in headless Chrome (puppeteer-core) for the runtime checks quoted below; headless frame timings are flagged as environment-limited wherever used.

---

## CONFIRMED — violations

### H-1 · Readout recomputes the target frame on a different scale than the player — the printed target contradicts the settled frame whenever frame-thinning is active (Rule 14 / House law 7) — WORST
- `exam-site/site.js:169`: `ro.target.textContent = Math.round(s.target * (s.totalFrames - 1)) + 1;` — the readout derives a "target frame" from progress × **totalFrames**. The player has no such field in `state()` (`scroll-sequence-player.js:259-270` returns `target, displayed, currentFrame, loadedCount, orderLength, totalFrames, reduced, settled` — no target frame). This is a parallel computation, exactly what Rule 14 forbids.
- It diverges in reality, not just in principle. The player maps progress through its thinned `order` array: `scroll-sequence-player.js:152-160` sets `step = 2` on small screens / save-data, building `order` of 31 entries for a 60-frame set, and `draw()` indexes `order`, not the raw frame count.
- Runtime proof (500 px viewport, paper section scrolled to 25 %, chase settled): player state `{ target: 0.2501, displayed: 0.2501, currentFrame: 17, orderLength: 31, settled: true }`; the page's own readout strip printed **target frame 16 → displayed frame 17**. A settled player displaying a frame its own readout says was never the target.
- Same defect family in the loaded counter: `exam-site/index.html:153` hard-codes the denominator as literal text — `frames loaded <b data-ro="loaded">0</b>/60` — while `loadedCount` counts entries of the thinned order, so on a thinned client it can never exceed 31 and the strip permanently implies 29 frames are missing.

### H-2 · Reduced-motion regression in the exam site: the GSAP dot still animates (House law 6)
- `exam-site/site.js:60`: `gsap.fromTo(dot, { x: 0 }, { x: travel, duration: 1.6, ease: 'power3.inOut' });` — `play()` has no reduced-motion branch. `REDUCED` gates only the auto-play observer (`site.js:63`); the Replay button path is unguarded.
- Runtime proof (`prefers-reduced-motion: reduce` emulated, Replay clicked): the dot's computed transform progressed `0 → 1.70 → 27.75 → 157.19 → 483.89 → 775.59` px over ~1 s — full motion under a reduced-motion preference.
- The M0 original got this right (`m0…/index.html:343`, `duration: REDUCED ? 0 : 2.2`); the rebuild lost it.

### H-3 · Frame-load failures are silent — no `onerror` anywhere in the player or the M0 scrub loader (Rule 7 / House law 3)
- `engine/components/scroll-sequence-player.js:254`: `im.onload = () => { loaded.set(n, im); kick(); … }; im.src = framesCfg.url(n);` — no `im.onerror` in the player, in `callout-leaders.js`, or in the M0 sequence loader (onload-only). A failed frame is indistinguishable from a slow one; the nearest-loaded fallback masks it forever and nothing ever names it.
- Runtime proof (one paper frame's request aborted): the player settled at `loadedCount: 59` of 60 with no error text, status, or named outcome anywhere in the section — the only trace was a console network error the page itself never surfaces.

### H-4 · Callout content is invisible when JavaScript does not run — CSS hides, only JS reveals (Rule 9)
- `engine/components/callout-leaders.css:12`: `.cl-callout{ … opacity:0; … }` — every beat starts hidden by the presentation layer; visibility is restored only by `callout-leaders.js:161` (`update()` writing opacity as scroll progresses).
- Runtime proof (exam site, JavaScript disabled, styles applied): the first paper callout's computed opacity is `0` while its text ("A Sheet of Paper — Flat, still, full of potential…") sits in the DOM. The beats are the journey's substantive content, not decoration; a failed module import loses them silently. (The `<noscript>` fallback covers only the canvas image, not the beats.)

### H-5 · Inline `style=` attributes mix presentation into the HTML layer on both pages (Rule 9)
Three per page, identical in both artifacts, e.g.:
- `m0…/index.html:161` and `exam-site/index.html:91`: `<span class="readout" style="display:inline-block;margin-left:.6rem">`
- `m0…/index.html:172` and `exam-site/index.html:102`: `<video … style="width:100%;height:auto">`
- `m0…/index.html:284` and `exam-site/index.html:249`: quiz-score span with the same inline style.
Minor in effect, but Rule 9 says mixtures are refactored on sight, and these survived a rebuild whose stated purpose was layer discipline.

### H-6 · Smoothness asserted in words, with no measured number attached (Rule 5 / House law 2)
- `m0…/index.html:216`: "that chase is the whole secret of 'buttery'".
- `exam-site/index.html:153`: "that chase is the butter" (in the player's own readout strip).
- `project-1-engine-skeleton/README.md:34`: the player promise says it works "smoothly, and never blank".
The "10 % of the gap per frame" figure beside these claims is a mechanism parameter, not a measurement: no frame time, FPS, or dropped-frame count for the sequence is printed anywhere near the claim, and the player component exposes no per-frame cost in `state()`. (A page-level FPS meter exists — see H-11 — but it is not bound to these claims or to the player.)

### H-7 · Boundary validation does not enforce the range its own error message promises (Rule 11)
- `engine/components/callout-leaders.js:88-90`: a tip passes if both parts are merely finite — `parts.length !== 2 || !parts.every(Number.isFinite)` — yet the thrown error claims `"x,y" in 0..1 is required`. A tip of `5,5` or `-1,0.5` validates cleanly and is only silently clamped later in `layout()`. The span check at `:78` likewise accepts spans outside 0..1 (only `to <= from` is rejected).

### H-8 · The callout component writes presentation directly from JS, and the CSS has to fight it with `!important` (Rule 9)
- `engine/components/callout-leaders.js:161`: `item.el.style.opacity = o.toFixed(3);` — behaviour layer setting a presentation property inline, per frame.
- `engine/components/callout-leaders.css:68` (and the media-query twin): `.sq-reduced .cl-callout{ … opacity:1 !important; … }` — the stylesheet needs `!important` precisely because the inline style outranks it. The two layers are in a specificity fight inside the component's own contract.

---

## CONFIRMED — laws verified upheld

### H-9 · Rule 4 (frame-exact work in code; video never scrubs) — UPHELD
Grep for `currentTime` across all reviewed sources: zero hits. Both `<video>` elements are plain user-controlled playback. Every scroll sequence is drawn with `drawImage` on canvas: the player's `draw()` (`scroll-sequence-player.js:203-222`), the M0 miniature's `drawFrame`, and both exam journeys via the component.

### H-10 · Product-agnostic engine components — UPHELD
Grep of the whole `engine/` tree for `mint|provadia|coin|onejob|paper|plane|solnik` (case-insensitive): **no hits**. Products enter only through config (`frames.count/url/width/height`, `progressSource`), as the player's header states (`scroll-sequence-player.js:21-25`). The word "Mint" appears only in page copy (`exam-site/index.html:163`, `m0…/index.html:211`) — teaching prose about a past specimen, not engine code, frame paths, or component data.

### H-11 · Accessibility of navigation and controls; focus visible — UPHELD
- `:focus-visible{outline:3px solid var(--gold);outline-offset:2px}` in both `engine/base.css:17` and `m0…/index.html:27`; skip links in both shells.
- Runtime check: every `nav.pills a` is keyboard-focusable (`tabIndex >= 0`), and a focused button computes `outline: solid / 3px`. All interactive elements found are native links, buttons, radio inputs, or the video element's own controls — no div-buttons, no inline handlers (grep for `onclick=` etc.: none).

### H-12 · Reduced motion in the engine components themselves — UPHELD (contrast H-2)
Runtime check with reduced motion emulated on the exam site: `player.reduced === true`, state settled at `currentFrame: 1, loadedCount: 1` (first frame only, no preload storm — `scroll-sequence-player.js:274-280`), callout beats compute to `position: static; opacity: 1` (a real static list, leaders never built — `callout-leaders.js:100`), sun animation `none`. On M0, the scrub readout switches to the literal text "still (reduced motion)" (`m0…/index.html:483-484`). These are real code paths, not comments.

### H-13 · Honest numbers where they are read from the thing itself — UPHELD on the desktop path
- Codec sizes printed on both pages (WebM 247,497 bytes · MP4 594,087 bytes) match the files on disk exactly (`stat` on both artifacts' `clip.webm`/`clip.mp4`).
- Desktop runtime check (step = 1): after settling, readout and state agree field for field — progress 67 %, target 40, shown 40, loaded 60 = `state()` verbatim via the `onDraw` seam (`site.js:166-172`). The dishonesty in H-1 is specific to the thinned path and the recomputed target, not the general wiring.
- Exam-site WebGL readout is live: `gl-calls` showed the renderer's actual count (2) in a working-GL run, updated every frame (`site.js`, K5 loop).

### H-14 · Errors named as outcomes for config and WebGL failures — UPHELD for these paths (contrast H-3)
- Both components throw typed errors naming the offending field: `SequencePlayerConfigError` (`scroll-sequence-player.js`, `requireConfig`) and `CalloutConfigError` (`callout-leaders.js:78-90`).
- M0's WebGL failure writes a named outcome onto the page: `m0…/index.html:433-435` — `catch(err){ … 'unavailable (WebGL context failed) — the fallback text is the lesson' }` (observed firing in a GL-disabled run). The exam site's K5 catch does the same (`site.js:107-110`, 'WebGL unavailable in this browser'). Neither catch is silent.

---

## NEEDS-CHECK

### H-15 · Per-frame layout reads in the chase loop (Rule 6) — needs a trace
`scroll-sequence-player.js:230` re-reads `progressSource()` every chase tick; the supplied source is `scrollProgress(section)`, which reads `section.offsetHeight` and `section.getBoundingClientRect()` (`:127-129`) — layout-stage reads — while the same tick's `onDraw` writes callout opacity (style invalidation). That is the shape of a per-frame layout thrash; only a performance trace can convict or acquit it. Reviewer's own headless scroll sample (110 rAF deltas during steady scroll): median 16.7 ms, p95 83.3 ms — but headless Chrome on a shared VM without a GPU is not a representative device, so this number is recorded, not graded.

### H-16 · The draggable 3D coin is pointer-only (House law 8 judgement call)
`#gl` computes `tabIndex: -1` on both pages (runtime-checked), and there are no keyboard handlers anywhere in the reviewed sources (grep `tabindex|keydown|keyup`: none). Every *control* is keyboard-reachable (H-11), but the one direct-manipulation demo answers only a hand. Whether a teaching demo canvas counts as an interactive control under the house law is for the captain to rule.

### H-17 · M0's FPS/frametime pair and its "live" draw-call readout are samples wearing live labels
- `m0…/index.html:322`: frametime is overwritten every 10th frame with the *single last interval* — `(t - lastFrameT).toFixed(1)` — while the adjacent FPS is a one-second average. In a reduced-motion run the page simultaneously displayed **37 FPS** and **16.7 ms per frame**, two numbers a reader cannot reconcile (37 FPS implies ≈27 ms).
- `m0…/index.html:427-430`: `gl-calls` is written exactly once (`callsShown` flag) under copy that says "Live from the renderer". The scene's call count is constant, so the number is very likely right — but it is a first-frame sample, not a live readout. (The exam site fixed this; see H-13.)

### H-18 · M0's printed scrub formula does not describe M0's own code
`m0…/index.html:216` teaches `frameIndex = floor(progress × (totalFrames − 1))`. The code below it rounds (`nearestLoaded(Math.round(n))`) and the displayed value is a lerp-chase state, not a direct function of progress at all. The formula is the simplified story, printed as "the machinery, exposed" next to readouts that follow the other rule.

### H-19 · Small lifecycle gaps in the components
- The player's reduced branch (`scroll-sequence-player.js:274-280`) registers no ResizeObserver and no resize listener (the non-reduced branch does, `:290-295`), so a reduced-motion canvas keeps a stale backing store across resizes.
- `player.destroy()` never disconnects the IntersectionObserver created in the wiring block (it is a local `io`, unreachable from `destroy`); `callouts.destroy()` (`callout-leaders.js:177`) removes only the resize listener, leaving the `load` and `document.fonts.ready` layout hooks behind. Harmless on a single-page demo; a leak in any long-lived host page.
- Exam site, minor: `site.js:18` fills the "structure was ready" readout from `nav.domInteractive`, where M0 used `domContentLoadedEventEnd` — a milestone-naming drift between the two versions of the same lesson.

---

## REJECTED — hunted, not found (or disproven)

### H-20 · "Video scrubs the frame-exact sequences" — REJECTED. No `currentTime` use exists; see H-9.
### H-21 · "Product facts leaked into the engine" — REJECTED. Full-tree grep is clean; see H-10.
### H-22 · "Silent catch blocks swallow failures" — REJECTED as stated. Both `catch` blocks in the corpus write a named outcome to the page (H-14). The real silent-failure defect is the *absent* `onerror` on image loads, filed separately as H-3.
### H-23 · "Focus styles missing" — REJECTED. Present in both stylesheets and verified live; see H-11.
### H-24 · "The exam site auto-plays motion under reduced motion" — REJECTED in the general form. Auto-play paths are gated (`site.js:63` IntersectionObserver requires `!REDUCED`; particles start paused; the 3D spin is gated). The single leaking path is the user-clicked GSAP replay, filed as H-2.

---

**Counts: CONFIRMED 14 (8 violations, 6 upheld) · NEEDS-CHECK 5 · REJECTED 5 — worst confirmed violation: H-1, the exam readout recomputes the target frame from totalFrames instead of the player's own state, so on any thinned (mobile / save-data) client the page settles on frame 17 while its own readout claims the target was 16 — a Rule 14 breach in the exact defect class Rule 14 was written to prevent.**
