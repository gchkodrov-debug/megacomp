# Axis Report — PROMISE axis (fresh-context reviewer)

Scope: only the artifacts named in the brief, run over local HTTP in headless
Chrome (puppeteer-core + chrome-headless-shell, same tooling pattern as the
project's own verify.mjs, which was read as a tooling example only). No run
notes, grading records, or producer narratives were read. Every finding below
is graded CONFIRMED / NEEDS-CHECK / REJECTED, with quoted evidence. CONFIRMED
findings are labelled **[promise verified]** or **[defect]**.

Method, in brief: both pages loaded and interacted with programmatically —
console/pageerror listeners, failed-request listeners, canvas pixel sampling,
computed-transform sampling, element screenshots, stepped scrolling through
both scroll journeys, a clean Tab-from-top walk on both pages, quiz submission
with the page's own answer keys, reduced-motion emulation, viewport checks at
390 / 768 / 1280 px, ffprobe on the video files, byte counts on disk, and
grep over `engine/` for product-specific strings.

---

## M0 — "How the Web Works" (m0-how-the-web-works/index.html)

### F1 — CONFIRMED [promise verified]: all six kinds are present, each as a live miniature, none fake or stubbed
- Sections in DOM order measured at runtime: `journey, engine-room, k1, k2, k3, k4, k5, k6, choose, quiz`; headings include "Static — files, painted once" (index.html:136), "Animated — still pictures, changing on a schedule" (:153), "Video-based — a film does the moving" (:167), "Canvas — code paints every pixel" (:184), "Real-time 3D — a world, re-rendered live" (:196), "Hybrid — several engines, one experience" (:208).
- Static (K1): a real HTML table whose text states "This section would look identical with scripts turned off" — true of the markup as written; no script touches that box.
- Animated (K2): CSS sunrise computed `animation-name: rise` and its transform changed between samples; the GSAP dot's computed transform moved between samples (matrix x 0 → 0.2584 on M0, 0 → 1.3524 on the exam rebuild) after clicking "Replay the dot".
- Video (K3): `<video>` reached `readyState 4`, `duration 6`, `currentSrc …/clip.webm`; programmatic `play()` advanced `currentTime` 0.014 → 0.823 s with `paused:false`.
- Canvas (K4): `#particles` canvas (960×360) sampled non-blank (109 non-black samples, 22 distinct colours in the sampled region) and its `toDataURL` changed over 700 ms (motion is real); the page's "90 dots" claim matches the code (`for(i = 0; i < 90; i++)`, index.html:~353).
- Real-time 3D (K5): renderer readout `#gl-calls` printed `2` (live draw calls), and two element screenshots of `#gl` 700 ms apart differ (18,013 vs 18,035 bytes) — the scene is re-rendering, not a static picture.
- Hybrid (K6): see F15 — the scroll-scrub miniature measurably works.

### F2 — CONFIRMED [promise verified]: the page's checkable factual claims are accurate, and the teach-back quiz's own keys are correct
- Codec claim (index.html:178): "WebM (VP9) **247,497 bytes** · MP4 (H.264) **594,087 bytes**". On disk: `clip.webm` = 247,497 bytes, `clip.mp4` = 594,087 bytes (exact match). ffprobe: mp4 = `codec_name=h264, 640×360, avg_frame_rate=30/1, duration=6.0`; webm = `codec_name=vp9, 640×360, 30/1` — so "a six-second clip" and "decoding … 30 a second" are both true.
- Frame budget: "At 60 FPS, each picture gets 16.7 milliseconds" — 1000/60 = 16.67, correct. Pipeline order given as "parse → style → layout → paint → composite" — correct order.
- Hybrid miniature size: page says 48 frames; `assets/frames/` contains exactly 48 JPEGs (480×270).
- Quiz: submitting the page's own `data-answer` keys scored "6 of 6 — the page taught it. That is the M0 bar.", and each key is independently right (record page → Static; exact frame 137 → Canvas; drag-to-turn → Real-time 3D; 60 FPS → ~16.7 ms; files→page → the visitor's browser; staged mix → Hybrid). A no-background grader can answer what each kind is and when to use it from the "Which kind should you build?" table (Kind / Right tool when… / Watch out for) plus the six sections.
- Live readouts are real, not printed constants: Navigation Timing readout filled with `ttfb=75 ms, dom=1196 ms, load=1601 ms` (headless run values) and the FPS meter printed a number (`42`).

### F3 — CONFIRMED [defect, both pages]: the Real-time 3D demo's headline interaction is pointer-only — the canvas is not focusable and has no keyboard handler
- Exam site: `exam-site/index.html:131` — `<canvas id="gl">WebGL is not available in this browser.</canvas>`; measured at runtime `tabIndex = -1`, `focusable = false`, no `onkeydown`. The only manipulation handlers are pointer handlers: `exam-site/site.js:133` `cv.addEventListener('pointerdown', …)` (+ pointermove/pointerup/pointercancel at :134–142).
- M0 is identical in shape: `m0-how-the-web-works/index.html:410` `glCanvas.addEventListener('pointerdown', …)`, canvas likewise unfocusable.
- A grep for `keydown|onkeydown|tabindex` across both artifacts' HTML/JS (excluding vendored assets) returned **no hits at all**.
- Both pages invite the reader to "drag the coin — a film could not answer your hand; this can". A keyboard-only visitor cannot perform that interaction on either page. (This does not break M1's *navigation* bar — see F8 — but it is a real keyboard gap in an interactive section, which the brief asked to hunt.)

### F10 — NEEDS-CHECK: one FPS claim is a dubious simplification (not a kind definition)
- `m0-how-the-web-works/index.html:130`: "Film runs at 24 FPS; our scroll films are sliced at 30. **Below roughly 24, motion stops reading as motion.**" Motion is routinely perceived well below 24 FPS (e.g. 12 FPS hand-drawn animation reads as motion). This is an engine-room aside, not the definition of any of the six kinds, so it does not by itself trigger the promise's "any kind misexplained = fail" clause — but a strict grader could flag the page's teaching accuracy here. The same sentence appears in the exam rebuild.

### F11 — NEEDS-CHECK: the Hybrid sections cite an external product page's numbers that cannot be verified from these artifacts
- `m0-how-the-web-works/index.html:211`: "The Mint page this crew graduated on is one: a film, sliced into **235 still frames**, drawn on a canvas as you scroll." The exam rebuild repeats it (`exam-site/index.html:163`). No 235-frame set or Mint page exists inside the reviewed artifacts, so the claim is unverifiable from the page alone. It is an illustrative example, not the definition of "hybrid" (which is stated independently and correctly), but the number is asserted as fact.

### F15 — REJECTED: suspicion that the M0 hybrid miniature is decorative / non-functional
- Disproved by stepped scrolling: as scroll advanced through `#scrub-wrap`, the exposed machinery readouts moved `progress 3% → 44% → 66% → 94% → 100%`, `target 2 → 21 → 31 → 45 → 48`, `shown 1 → 21 → 31 → 45 → 48`, and the callout stage text changed "Act 1 — the whole thing" → "Act 2 — the middle" → "Act 3 — the end", with zero console errors during the scroll. The miniature does what the text says, including the chase (shown settles onto target).

---

## M1 — Engine skeleton + exam site (project-1-engine-skeleton/)

### F4 — CONFIRMED [promise verified]: zero console errors — both pages, load and interaction
- Exam site: `errorsAfterLoad = []`, `failedReqs = []` after load, button clicks, video play, quiz submission, and full scroll-journey interaction (`examJourneyErrors = []`); the reduced-motion load also produced no errors.
- M0 page: likewise `errorsAfterLoad = []`, `failedReqs = []`, and no errors during the scrub-scroll run.

### F5 — CONFIRMED [promise verified]: the two components are genuinely reused — one implementation, driven twice; no copy-paste twins found
- `exam-site/site.js:155` defines a single `wireJourney(sectionId, canvasId, beatsId, frameConfig)`; it is called exactly twice with different literals — paper at :179 (`count: 60, width: 640, height: 360, url: n => 'frames-paper/f' + …`) and web at :186 (`count: 48, width: 480, height: 270, url: n => 'assets/frames-web/f' + …`). Both journeys construct the components the same way: `createSequencePlayer(canvas, {…})` at :162 and `createCallouts({stage, beats, player})` at :174.
- No twin implementation hides in the page layer: grep for `drawImage` across `site.js` + `engine/components/*.js` hits only inside `scroll-sequence-player.js`; `site.js` contains no cover-fit or leader math — callouts consume the player's transform (`callout-leaders.js:129` `const t = player.coverTransform();`).
- CSS reuse is by import, not paste: `exam-site/site.css` opens with four `@import`s (tokens, base, both component stylesheets) and defines no `.cl-callout` / `.sq-canvas` / `.cl-leader` rules of its own (only `.journey` heights, `.sq-readout`, and page-demo styles).
- The one deliberate duplication is *content*, not components: the exam site's teaching sections reproduce the M0 lesson text, which the site itself declares ("This is the M0 teaching page **rebuilt from the Engine's first components**", `exam-site/index.html`, header). See F12 for the related "original" question.

### F6 — CONFIRMED [promise verified]: the components' executable code is product-agnostic — no product facts, content, or file names inside `engine/components/`
- Grep of `engine/` for `mint|provadia|coin|paper|plane|fold|flight|landing|onejob|solnik|235` returned **no hits in any code**; the only hits for the wider pattern were the generic word "specimen" in header comments (see F13). Grep for `http|\.jpg|\.webp|\.png|frames/` in `engine/components/` returned a single hit: `callout-leaders.js:54` `const SVG_NS = 'http://www.w3.org/2000/svg';` (the SVG XML namespace, not a product reference).
- All product data enters through configuration, as the contract states: frame count / URL function / frame size via the config object in `scroll-sequence-player.js` (`requireConfig` validates `frames.count`, `frames.url`, `frames.width/height`, `progressSource` and throws a named `SequencePlayerConfigError` per field), and beat windows/tips via `data-callout-from/to/tip` attributes parsed in `callout-leaders.js`.

### F7 — CONFIRMED [promise verified]: a second product enters by configuration alone — demonstrated twice on the page, and a third time by this reviewer
- Paper journey at progress 0.25: player state `{displayed: 0.24998…, currentFrame: 16, loadedCount: 60, totalFrames: 60, settled: true}` and 3 leader groups built in `#paper .cl-leaders`.
- Web journey (same components, different config) at progress 0.5: `{displayed: 0.49997…, currentFrame: 24, loadedCount: 48, totalFrames: 48, settled: true}` — mid-sequence of a different frame set, size, and beat set, with no component code change.
- Reviewer's own third instantiation: importing only the two component modules into the loaded page and constructing them with a new section, new beats (one tipped beat), and a new config returned `{count: 1, tippedCount: 1}` and a player reporting `orderLength: 60, totalFrames: 60` from the supplied config, with zero console/page errors. No component source was touched.

### F8 — CONFIRMED [promise verified]: keyboard-complete *navigation* on the exam site (tab walk measured)
- Clean Tab-from-top walk (both pages): 1st stop is the skip link (`A .skip → #main "Skip to the lesson"`), then the nav pills in order (#journey … #quiz, 11 links on the exam site including `#paper`), then `BUTTON#gsap-play`, then the `<video>`'s native controls (5 tab stops), then `BUTTON#particles-toggle`, then one tab stop per quiz radio group (6 groups — standard radio behaviour, arrow keys move within a group), then the submit `BUTTON`, then focus returns to BODY. No keyboard trap, no unreachable nav item, no interactive element skipped.
- Navigation is real links in a real `<nav aria-label="The sections of this site">` (`exam-site/index.html:21–33`) plus a skip link as the first focusable element; `:focus-visible` outlines are defined in `engine/base.css`. Scroll-driven sections are reachable by keyboard scrolling (page scroll drives both players), and the callout texts are ordinary DOM paragraphs.
- The exception is not navigation but one demo's manipulation: see F3 (3D drag).

### F9 — CONFIRMED [defect]: the exam site's in-stage player readout is clipped off-screen at phone and tablet widths — the "responsive website" bar fails for that element
- `exam-site/site.css:26–31`: `.sq-readout{ position:absolute; left:50%; … transform:translateX(-50%); … }` with `white-space:nowrap` at :28, and no max-width / wrapping rule at any breakpoint.
- Measured at viewport 390 px: paper readout bounding box `left: -384, right: 774, width: 1158` (`fullyVisible: false`); web readout `left: -167, right: 557, width: 723` (also not fully visible). The stage's `overflow:hidden` clips both ends, so on a phone the start and end of the readout text — including the progress/frame numbers the page presents as its honesty surface — cannot be read. The same 1158 px width was measured at 768 px viewport, so it is clipped there too.
- Page-level check passes (document `scrollWidth − innerWidth = 0` at 390 / 768 / 1280 on both sites), which is exactly why this defect hides: nothing scrolls sideways, the text is simply cut off inside the stage. Fix name (not proposed in detail): allow the readout to wrap / constrain its width on small viewports.

### F12 — NEEDS-CHECK: "original website" vs. the exam site being a declared rebuild of the M0 page's content
- The M1 promise says "An **original** responsive website". The exam site's own header states it is "the M0 teaching page **rebuilt** from the Engine's first components", and its lesson copy, quiz, tables, and media are the M0 page's (the 48-frame set is byte-identical to M0's — `diff -rq` on the two frame folders reported no differences; `clip.mp4`/`clip.webm` have identical md5s in both artifacts). The *site machinery* is original work built on the skeleton; the *content* is intentionally not new. Whether "original" in the promise means "hand-built, not a template" (met) or "new content" (not met) is a ruling for the parent — the artifact alone supports both readings.

### F13 — NEEDS-CHECK: component header comments still reference the source specimen (unnamed) — no product name, fact, or file name, but not zero references
- `engine/components/scroll-sequence-player.js:5` "specimen-proven core, generalized", :7 "Inheritance: the graduated specimen's player…", :42 "chase: 0.1, // lerp factor (specimen-proven)"; `engine/components/callout-leaders.js:7` "Inheritance: the graduated specimen's callout system…"; `engine/tokens.css:29` "callout glass (the specimen's panel, tokenized)". The specimen is never named and no product fact, content string, or file name appears — the executable code is clean (F6). If the bar "no facts, content, or file names of any specific product inside the components" is read to include comments mentioning an unnamed predecessor at all, this needs a ruling; on a plain reading (names/facts/files), it passes.

### F14 — REJECTED: suspicion that the skip link is missing from the tab order
- An early tab walk in this review appeared to start at the first nav pill. A clean retest (fresh page, Tab from the top, no prior focus manipulation) showed the skip link **is** the first tab stop on both pages: `"A .skip#main \"Skip to the lesson\""` followed by `#journey`, `#engine-room`, `#k1`. The earlier miss was an artifact of the test's own pre-press/blur step. No defect.

### Supporting observation (not separately graded): reduced-motion behaviour works as the components promise
- With `prefers-reduced-motion: reduce` emulated on the exam site: exactly 1 frame requested per player (paper=1, web=1), `document.querySelectorAll('.cl-leaders').length = 0`, and the paper player reported `{reduced: true, currentFrame: 1, loadedCount: 1}` — consistent with the accessible-presentation claim in the component contracts.

---

**Counts: CONFIRMED 9 (7 promises verified true, 2 defects) · NEEDS-CHECK 4 · REJECTED 2 — worst confirmed defect: F9, the exam site's in-stage readout is clipped off-screen at 390 px and 768 px widths (1158 px wide, left edge at −384 px on a 390 px viewport), hiding the player's own progress/frame numbers on phone and tablet.**
