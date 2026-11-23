# M13 — THE DEFECT LEDGER

One page, built twice. The broken build carries six defects,
each planted deliberately and named here; the fixed build is
the same page — same words, same pictures, same destination —
with each defect removed by its named fix. `profile.mjs`
measures both on the same route and files `results.json`.

## The broken build's six defects

- **B1 · Per-frame layout reads in the hot loop (this is H-15,
  the carry from Phase 0).** The sequence player's progress
  source is the component's own `scrollProgress()` helper,
  which reads `section.offsetHeight` and
  `section.getBoundingClientRect().top` on every call — and
  the chase calls it on every animation-frame tick. Every
  read risks a forced synchronous layout, sixty times a
  second, for the whole journey.
- **B2 · An unthrottled scroll handler doing layout work.**
  Every scroll event (dozens per gesture) reads
  `getBoundingClientRect()` + `offsetHeight` and writes the
  badge's `left`/`top` — a layout read and a layout-causing
  write per event.
- **B3 · Layout thrash as a feature.** A "card equalizer"
  runs every animation frame: for each of six cards it reads
  `offsetHeight` and immediately writes `minHeight` — the
  classic read-after-write pattern that forces the browser
  to recompute layout on every read.
- **B4 · An unoptimized hero.** The hero ships as a
  6,969,381-byte 3840×2400 PNG with no `width`/`height`
  attributes: a long download on the critical path and a
  layout shift when it finally lands.
- **B5 · A long task in the page's startup script.** The
  archive index (a sieve counting primes below 20,000,000)
  is computed in one synchronous pass inside the page's own
  script. Precision, because the axis graded an earlier
  wording: the script is a module, and module scripts are
  deferred — the sieve does not block parsing; it runs
  after parsing, before DOMContentLoaded, as one long task
  that delays DOMContentLoaded, the first interactions,
  and everything queued behind it. (No `setTimeout` is
  involved on the broken side; the slicing timers exist
  only in F5.)
- **B6 · Paint-and-layout properties as animation.** The
  progress hairline is animated by writing `width` and
  `box-shadow` on every scroll event — both force work far
  beyond the compositor.

## The fixed build's six fixes

- **F1 (fixes B1 + discharges H-15)** — the player is fed by
  `cachedScrollProgress()` (added to the Engine component in
  this module): geometry measured once and on resize;
  per-tick answers from `scrollY` alone.
- **F2 (fixes B2)** — scroll handling is one rAF-batched
  `kick()`; the badge moves by `transform` and prints the
  player's own state from `onDraw` (Rule 14).
- **F3 (fixes B3)** — heights are read all, then written
  all, once at load and again only on resize.
- **F4 (fixes B4)** — the hero ships as a 9,348-byte
  1600×1000 WebP with `width`/`height` attributes.
- **F5 (fixes B5)** — the same sieve, walked in sub-8 ms
  idle slices; the same final count. The sieve's own long
  task is gone (longest app.js-attributed script: 0 ms on
  the coordinator's filing; 0–91 ms across filings to
  date); the fixed build's longest load long task of any
  kind has filed at 51–92 ms of browser work across the
  module's filings to date. Those figures are stated as
  observations, not bounds — the bench drifts, and two
  successive widenings of a printed ceiling (51–53, then
  51–80, each overtaken within a day) taught the module
  to stop printing ceilings for weather. The bound is the
  gate's, and it is machine-checked on the governing
  filing: the fixed build's longest app.js script stays
  ≤ 100 ms on every run (observed filing maxima 0–91 ms —
  the margin is watched, and the re-review filed it). An
  earlier wording claimed "no long task," and the filing
  itself refutes it.
- **F6 (fixes B6)** — the hairline is a full-width bar
  animated by `transform: scaleX` — compositor only.

## The measurement route (named, per Rule 18)

Headless Chrome (puppeteer) on this bench, localhost server,
1280×900 viewport. In-page probes installed before load
count layout reads (`getBoundingClientRect`, `offsetHeight`,
`offsetWidth`, `clientHeight`, `clientWidth`) while armed;
PerformanceObserver files long tasks, layout shifts (CLS),
and largest contentful paint. The scroll journey is scripted:
the full document scrolled in 60 steps over ~6 s while an
rAF sampler records frame times. Every figure in
`results.json` is an envelope across two runs per build.
Two further probes ride the same route: a **delayed-hero
CLS probe** (the hero request is held 700 ms by request
interception — the shift claim rides on this deterministic
probe, because the journey CLS proved load-timing
intermittent: 0.0014–0.6059 across filings) and an
**interaction phase** (trusted clicks land across the
startup window from ~40 ms after navigation commits; the
Event Timing API files each click's latency — the INP
leg's lab proxy, labelled as one: field INP needs field
data, which an undeployed page cannot have).
These are **labelled local lab traces** for undeployed study
artifacts, under the captain's F-P3-2 ruling — not PageSpeed
filings, and never mixed with them.
