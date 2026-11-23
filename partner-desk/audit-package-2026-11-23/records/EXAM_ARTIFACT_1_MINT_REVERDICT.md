# EXAM ARTIFACT #1 — BLIND RE-GRADE (RE-SIT): THE COIN MINT SCROLL SPECIMEN

- **Artifact:** https://provadiacoin.com/listings/mint.html (live page fetched and read
  2026-11-23; repo `gchkodrov-debug/provadia` read via the GitHub API the same day)
- **Re-graded against:** the original blind verdict `EXAM_ARTIFACT_1_MINT_VERDICT.md`
  (FAIL — re-sit list of 4 items), the artifact's filed evidence
  `EXAM_ARTIFACT_1_RESIT_RECORD.md`, PRESENTATION_STANDARD_2026-11-22 (Craft Rule 8),
  and the Track 5 QA checklist (Gates 4–5 and their measurement rules)
- **Grader:** blind verifier (did not build or fix this; graded only what the live page,
  the repo, and the artifact's filed evidence prove)

## OVERALL VERDICT: **FAIL** — one item remains (the CWV gate is still unproven)

The re-sit fixed everything that was fixable in code, and fixed it well: leader lines
are real, per-beat measured, and opacity-wired; the mobile set is a true 480w set
inside budget and actually served; the housekeeping is done and the previously passed
items show no regression. What remains is the one thing the re-sit could not produce
from inside this environment: **a measured Lighthouse run**. Gate 4's lines are still
empty, and the QA checklist's own rule is that a gate is failed by an empty line.
Honesty about the gap is filed and credited — it does not fill the line.

---

## PER-CRITERION GRADES

### 1. Leader lines + tip dots (was FAIL, Craft Rule 8) — ✅ PASS

Verified in the **live page source** (26,886 B, fetched 2026-11-23):

- **All 8 stage callouts carry a tip:** `data-sa-tip` attributes with per-stage values —
  `0.445,0.135` · `0.428,0.196` · `0.298,0.243` · `0.524,0.250` · `0.420,0.507` ·
  `0.470,0.580` · `0.375,0.580` · `0.485,0.790` — matching the re-sit record's
  per-beat table exactly (the ninth `data-sa-tip="x,y"` string in the file is the
  mechanism's own pattern comment, not a callout).
- **The leader mechanism is real code, not decoration:** one SVG group per tipped
  callout, built with `createElementNS` — a `line` plus two `circle`s (halo r=11,
  tip dot r=4.5, house gold) — on a `.sa-leaders` overlay layer, hidden under
  `prefers-reduced-motion` and in the static reduced mode.
- **Opacity is tied to the settled state, as required:** the leader group's opacity is
  set from the callout's own opacity value (`setAttribute('opacity', o.toFixed(3))`),
  so a leader is fully visible only when its callout is at its settled beat and fades
  with it between beats — the exact behaviour the criterion names.
- **Anchoring is per-beat, not assumed:** the tip coordinates differ per stage and
  follow the film's open–close arc (edge-on rim for S1–S2, plates for S3–S5, whole
  coin for S6–S8), corroborating the record's account of re-measuring each tip on its
  own stage's settled frame after the first pass's settled-stack premise was disproved
  by frame inspection. Rendered placement (dot on the coin/plate at each beat) rests
  on the artifact's filed evidence — beat-by-beat screenshots in
  `mint-specimen/resit-evidence/` plus two pixel-matches against the frame files
  (S1 = f082 exact; S3 drawn f119 vs target f118) — which this grader accepts as the
  artifact's filing; the mechanism, coordinates, and wiring above were verified live
  by this grader.
- The record's two declared imperfections are inside the rule's substance, not
  breaches: where a card physically abuts the coin (S7) the line is a few px but the
  dot sits on the coin's face at the card's edge; on tall screens a tip may be clamped
  onto the part at the screen edge rather than floating in space.

### 2. Mobile frame set (was FAIL, >2× the ≤1.5 MB Gate-5 budget) — ✅ PASS

- **The set exists and is a true 480w set:** GitHub API listing of
  `listings/mint-frames/m/` — **exactly 235 WebP files, 1,486,596 bytes total**
  (1.418 MiB), i.e. under the ≤1.5 MB budget on both readings (1,500,000 B decimal
  and 1.5 MiB). Sampled live: `m/f001.webp` decodes at **480×270** and serves
  **9,510 B**; `m/f235.webp` serves **5,976 B** — both byte-equal to the generated
  set the record files.
- **The player actually serves it on small screens:** the live source wires the set
  by the same test as its frame-step logic — `small = matchMedia('(max-width:
  700px)')`, `frameDir = small ? 'mint-frames/m/' : 'mint-frames/'`. The record's
  network capture on a byte-identical mirror (desktop → 235 requests, 0 to `m/`;
  390×844 mobile → 118 requests, all to `m/`, ≈0.75 MB actually transferred) is
  consistent with that wiring. The graded build's breach (≈3.02 MB of step-sampled
  960px files on a phone) is closed.

### 3. CWV gate (was UNPROVEN) — ❌ FAIL (remains unproven)

Judged strictly on the gate's own wording:

- The original verdict's re-sit item 3 requires **filed measurements: a Lighthouse
  run (LCP / INP / CLS against ≤ 2.5 s / < 200 ms / < 0.1)**.
- The Track 5 QA checklist, Gate 4, requires the measured values on the lines
  ("LCP ≤ 2.5 s (Lighthouse, mobile-throttled) — value: ___"), and its how-to-use
  rule is explicit: **"A gate is failed by an empty line, not by an honest number"**;
  "A product record that says 'fast' without a Lighthouse run and a trace has failed
  Gate 4"; the CWV bars do not move; performance is "measured, never merely
  claimed." The checklist's only relief valve is a captain's written budget re-rule
  filed in the release decision — **no such re-rule exists**.
- The re-sit record files **no CWV numbers at all** — LCP / INP / CLS are declared
  STILL UNMEASURED, and this grader invents none and accepts none. The attempts are
  documented and the blocks are environmental, not the page's fault (PageSpeed
  Insights returned HTTP 429, a hard stop that was honoured; this VM's egress proxy
  refuses Chrome's CONNECT tunnel, so no local browser engine can load the live
  page; a mirror run was deliberately not filed, correctly, since it would measure
  localhost, not the live page). The explanation is accepted in full — and it does
  not satisfy the gate.
- The measurable facts filed instead are real and credited — HTML 26,886 B
  (verified live by this grader, byte count exact), three.min.js gone and page JS
  down by roughly two-thirds (verified, criterion 4), lazy tiered frame loading,
  mobile set 1,486,596 B (verified, criterion 2) — but page weight is a Gate 5 /
  budget fact, not a Gate 4 measurement. Facts about the page are not a Lighthouse
  run, and the gate passes on measurements or not at all.

**Gate 4 therefore remains unproven, which under the checklist is a failed gate.**
This is the sole failing criterion in this re-grade.

### 4. Housekeeping — ✅ PASS

- **three.min.js no longer loaded:** zero occurrences of `three.min.js` in the live
  page source (the graded build carried 669,884 B of it on a canvas-only page).
- **Frame count exactly 235, repo and page in agreement:** GitHub API listing of
  `listings/mint-frames/` shows exactly 235 WebP files (f001–f235) plus the `m/`
  directory; the page's `TOTAL=235`; `listings/mint-frames/f236.webp` and
  `f240.webp` return **HTTP 404** live. f236–f240 are gone.

### 5. Regression check on previously passed items — ✅ PASS (no regression)

- **Frame sequence integrity:** the desktop set measures **6,302,660 bytes across
  exactly 235 WebP files** via the repo API — byte-identical to the original
  verdict's measurement of the graded build. `f001.webp` decodes live at 960×540
  (the anchored brick-P front face set) and `f235.webp` serves 200. The real coin
  sequence is untouched.
- **Smoothing chase:** the lerp is in the live code — `dispP += diff*0.1` inside the
  rAF chase; raw scroll still never maps to a frame.
- **Priority-tier preload with nearest-loaded fallback:** `prioritySeq()` present;
  the draw path carries the nearest-loaded search loop (`for(var d=1; …)` checking
  `frames[order[idx-d]]` in both directions) — never a blank stage.
- **Listing facts unchanged:** `$50 pilot` present in the live text; the permanent
  honesty sentence present ("PROVADIA is a place, not an investment…");
  `data-purchase-enabled="false"` present. The page is 26,886 B live, matching the
  record's byte-equal claim.
- **Fences held:** the 15 most recent repo commits are all Mint re-sit commits
  (mobile frames, the five frame deletions, the two page PUTs — final: "Exam #1
  re-sit (final): per-beat leader tips + mobile frame set + three.min.js removed",
  2026-11-23T04:42Z). **`marks/` was last touched 2026-11-20** — untouched by the
  specimen and the re-sit alike. No other page or listing appears.

### 6. Motion — ✅ SATISFIED (on record, not re-demanded)

Per the Cloud-Browser Motion Law, smoothness is judged on the founder's real device.
That verdict is on record: George, 2026-11-22 21:50 CT, on the live specimen —
*"It looks 100 times better than the first one — although the first one was perfect…
now this looks much, much better."* The motion criterion is satisfied and is not
re-demanded here.

---

## REMAINING ITEM (exact, and the only one)

1. **One filed Lighthouse run against the live page** —
   https://provadiacoin.com/listings/mint.html, mobile-throttled (and desktop),
   run from an ordinary network that can load the page in a real browser engine
   (or PageSpeed Insights once its quota allows), with **LCP / INP / CLS values
   written against the Gate 4 bars (≤ 2.5 s / < 200 ms / < 0.1)** and the report
   filed with this artifact's record. Nothing about the expected values is
   predicted or assumed; the gate closes when the measured line is filled, pass or
   fail on the numbers themselves.

## PRODUCTION-READY STAMPS

**None awarded.** Under the Mastery Standard, stamps are named only on a PASS, and
this re-grade is a FAIL on the one unproven gate. For the captain's record, the
dashboard rows this artifact has now substantively proven in code and assets —
**Motion & Scroll (L3–L4)**, **Flow & AI production (L10)**, **Cinematic production
(L16)** — remain blocked from Production-Ready solely by the same missing filing
that blocks the artifact itself, and **Performance (L20)** remains unproven by its
own row's terms ("no product has a filed CWV report"). One measured run closes all
four; until it is filed, the levels do not move.

*Re-verdict filed 2026-11-22/23 by the blind verifier. The builder was not
interviewed and no run reasoning beyond the artifact's own filed re-sit record was
consulted; every grade above traces to the live page, the repo state, the filed
record, or the exam documents.*
