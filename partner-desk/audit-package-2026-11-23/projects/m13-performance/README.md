# M13 — BROWSER RENDERING & PERFORMANCE ENGINEERING

**The artifact:** one cinematic page built twice —
`broken/` and `fixed/` — from a single shared body
(`tools/build-pages.mjs` assembles both from `body.html`, so
the visible content is identical by construction), plus the
profiler that measures them (`profile.mjs` → `results.json`)
and the gate that reads the filing (`verify.mjs`, 9/9).

**The defect ledger** is `DEFECTS.md`: six planted defects
(B1–B6), six named fixes (F1–F6). The evidence map, stated
exactly: B1/B2/B3 are tied to the profiler's layout-read
counters and LoAF timings (the counters aggregate the three
— B2's individual share is not isolated); B4 to bytes on
disk plus the delayed-hero CLS probe; B5 to LoAF and DCL
timings. **B6 carries no isolated trace**: it is code-evident
(`width`/`box-shadow` are layout/paint properties;
`transform` is compositor-only — a platform fact), and the
module says so rather than dressing it in a neighbour's
numbers. (This sentence replaces an earlier blanket claim
that every bottleneck was trace-tied; the Promise axis
graded that claim overstated for B6, and it was.)

## The headline results (envelopes, two runs per build, current filing)

| Signal (method in DEFECTS.md) | Broken | Fixed |
|---|---|---|
| Layout reads during the scroll journey | **3,366–3,374** | **0** |
| CLS, scroll journey (lab trace; load-timing intermittent) | 0.0014–0.6059 across filings | 0.0014 |
| CLS, hero held 700 ms (the deterministic probe) | **0.6042–0.6045** | **0** |
| LCP (lab trace) | 524–648 ms | 96–132 ms |
| Longest single app.js script (LoAF-attributed) | 126–233 ms | 0–64 ms |
| Longest load long task | 126–235 ms | 0–65 ms |
| DOMContentLoaded | 194–430 ms | 90–111 ms |
| Worst click latency, startup window (Event Timing — the INP leg's lab proxy, not field INP) | **376 ms** (n=29) | **88 ms** (n=5) |
| Index value printed (both builds) | 1,270,607 | 1,270,607 |
| Player settled frame / console errors | 72 / 0 | 72 / 0 |

Lab values drift between filings on this bench (across
all filings: broken LCP 524–948 ms, fixed 96–168 ms;
broken worst click 288–432 ms, fixed 40–168 ms);
`results.json` is the governing record, and the envelopes
above are its current ones. The interaction sample for
the fixed build is thin (n=2–6 per filing — the browser
issues interaction entries for the fast page at a far
lower rate than for the queued broken page); the counts
are filed, not padded, and the worst-case figure is the
one the INP bar cares about.

FPS did **not** separate the builds on this bench (60 fps,
16.7 ms gaps, both) — the page is light enough that
SwiftShader holds the frame even while the broken build
wastes thousands of layout reads. The waste is filed as
what it measurably is — reads, shifts, paint-class work and
blocked time — not dressed up as dropped frames.

## H-15, discharged

The carry from Phase 0 — *per-frame layout reads in the
frame player's hot loop* — is fixed in the Engine component
itself: `cachedScrollProgress()` was added to
`project-1-engine-skeleton/engine/components/
scroll-sequence-player.js` (additive; the graded exports
untouched, and Project 1's verification re-run fresh after
the edit: **36/36**). The broken build wires the player to
the old per-call-reading helper; the fixed build wires the
same player to the cached source. The profiler's counters
make the difference a number: 3,366–3,374 reads against 0.

## The honest trade on file

F5 buys responsiveness with completion time: the fixed
build's index count lands at 8.6–9.4 s across the module's
filings, sliced into sub-8 ms pieces, while the broken
build seizes the main thread and lands it at 0.26–0.72 s.
For a background index
that trade is correct; the module names it instead of
hiding it, because a different page (a search box, a
checkout) would owe the opposite choice.

## Run it

```
node tools/make-media.mjs   # regenerate frames + heroes
node tools/build-pages.mjs  # assemble both builds
node profile.mjs            # measure (writes results.json)
node verify.mjs             # assert the bars on the filing
```

All figures are labelled local lab traces for undeployed
study artifacts (the captain's F-P3-2 ruling) — not
PageSpeed filings.
