# CONTINUITY REPORT — Living Mint Specimen
### The Infinite Living Universe directive §5 examination, first running
**Date:** 2026-11-25 · **Seat:** captain's construction seat (builder) ·
**Harness:** `continuity.html` + `continuity.js` (analyzer graded by
`engine/test/continuity.test.mjs`, 23 checks) · **Runner:**
`engine/test/continuity-run.mjs` (headless Chrome, software rendering,
854×480 / 1280×800) · **Traces:** `continuity-traces/headless-60s.json`
(+ `headless-300s.json` when the leg completes)

**Read this first — what a headless verdict is worth.** House law: the
headless browser's animation clock is starved and its rendering is
software-only on shared CPU. Media-clock observations (bookends crossed,
stalls, black frames, seam samples of the real files playing) are real
evidence about the assets and the swap mechanics. Pacing numbers are
evidence about THIS environment, not about a visitor's device — the
device verdict for pacing, thermal and feel remains UNVERIFIED until a
real-device leg runs (UV-01/UV-02 stay open). Every FAIL below is
reported with its environment attached; nothing is laundered into a
device claim in either direction.

---

## Leg 1 — 60 seconds, observation (headless, run three times)

| Directive §5 item | Verdict | Evidence |
|---|---|---|
| No perceptible beginning | **PASS (instrument)** | First play is phase-seeked to the plan offset (11.44 s into the film at the recorded seed); the world does not start at frame zero. Whether a visitor PERCEIVES a beginning is the founder's cold read (UV-01), not this instrument's. |
| Frame pacing / dropped frames | **FAIL — this environment** | Median 59.9 fps, p95 delta 33.3 ms, dropped-frame rate 1.65% / 3.18% / 3.05% across three runs (harness bar ≤ 1%). The tail is software-decode contention (two 1080p films + canvas sampling on 1.5 shared CPUs). Device verdict: UNVERIFIED. |
| Loop seams / repetition | **PASS** | 3 bookends crossed. Worst near-bookend frame diff 22.8 vs the scene's own non-bookend p95 20.3 — excess 2.5, no anomaly (differential rule; see instrument note). Frame-exact offline gate also PASS: bookend RMSE Mint 1.29 (≤ 8). |
| Black frames | **PASS** | 0 black frames captured in ~120 samples per run. |
| Synchronized layer restarts | **PASS (as far as observable)** | 0 sync events logged. Only one media layer exists today, so this grades the absence of self-coincidence; the machinery layer is procedural (no restarts to sync). Predicted syncs for the current interim pair: 13 per 30 min once a machinery media layer exists at 13 s — see the build log §1a. |
| Buffering interruptions | **FAIL — this environment** | 4 `waiting` stalls per run, 0.08–0.11 s total, each ≤ 0.04 s. Pattern: one at startup, and one within ~0.15 s after EACH bookend swap (26.3 / 40.65 / 54.8 s vs wraps 26.27 / 40.64 / 54.77) — a swap-adjacent decoder micro-stall. Sub-perceptual under a 700 ms crossfade here; on a weak device it is the first place to look. Feeds NC-06's evidence file. |
| 30-minute thermal / memory | **UNVERIFIED** | No page or headless seat can produce a phone's temperature curve. Named, not faked. |
| Character consistency during the leg | **UNVERIFIED** | The inhabitant's integration is evidenced by NC-04's performed run (cartoon build) and awaits the founder's device session (O-3). This harness does not grade it. |

**Instrument note (seam rule).** The analyzer's first version used an
absolute bar (near-bookend diff ≤ 12). The first live trace disproved
the instrument, not the world: near-bookend diffs (median 6.5) were
statistically identical to far-from-bookend diffs (median 8.0, p95
20.3) — at a 500 ms sampling cadence the absolute bar measures the
forge's ordinary motion. The rule is now differential (a bookend fails
only if it spikes > 12 above the leg's own baseline p95), the change
and its evidence are recorded in the analyzer's header, and synthetic
tests prove the corrected rule still FAILs a true spike (41 vs baseline
~5). The relay's critic seat was briefed to judge this change
specifically (verdict shopping vs instrument correction) — its finding
rides in the build log's relay record.

## Leg 2 — 5 minutes, interaction (headless)

**UNVERIFIED — the leg did not complete in this seat, on two attempts.**
Both runs died at ~183 s of the 300 s leg: the headless renderer's main
thread saturated under sustained software decoding (two 1080p films +
compositing + seam sampling on 1.5 shared CPUs; ~92% of a core
continuously), until the CDP control channel itself timed out
(`Runtime.callFunctionOn timed out`, protocol limit 180 s). No partial
verdicts are extracted from the corpse — the trace was never delivered,
so nothing about minutes 0–3 is claimed either. What the failure DOES
establish, plainly: sustained dual-film software decode is heavy, and
this sandbox is not a 5-minute seat. The leg belongs to the same
real-device session as Leg 3 (the harness runs unchanged there), or to
a hardware-accelerated browser seat. Named, not retried a third time.

## Leg 3 — 30 minutes, operation

**UNVERIFIED — not run by this seat.** Two named reasons: (1) wall time
— the leg is a 30-minute occupation of the seat for a headless result
whose pacing numbers would still not be device evidence; (2) the
leg's distinctive item (thermal/memory stability) is meaningless in a
software-rendered sandbox. The leg belongs to the founder's device
session (UV-01/O-3), where the harness runs unchanged — the examiner
page is the instrument, the phone is the missing seat.

## What this examination establishes, and what it does not

Establishes: the harness works end-to-end against the real specimen;
the current loops cross their bookends with no seam anomaly and no
black frames; the swap path produces measurable decoder micro-stalls in
a weak environment; the engine's continuity self-check runs and logs.
Does NOT establish: anything about a real device's pacing, temperature,
or a human visitor's perception — those remain UV-01/UV-02, the
founder's cold read, and PIS-01's human examination, exactly where the
reconciliation left them.
