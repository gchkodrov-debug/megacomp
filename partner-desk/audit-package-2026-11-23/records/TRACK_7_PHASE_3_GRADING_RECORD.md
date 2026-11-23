# TRACK 7 — PHASE 3 GRADING RECORD

**Phase:** Phase 3 — M12 (Advanced Interactive Experience
Engineering) · M13 (Browser Rendering & Performance
Engineering) · M14 (Accessibility & Responsive Cinematic
Design) · M16 (Quality Assurance & Security).
**Run record:** `TRACK_7_PHASE_3_RUN.md`. **Book instalment:**
`TRACK_7_CINEMATIC_WEB_ENGINEERING.md` §§15–17, 19.
**Rules instalment:** Rules 24–31
(`crew-skills/cinematic-web-engineering-rules.md`).
**Graded:** 2026-11-23. Freeze: 144 files sha256'd in
`track7-artifacts/grading-phase3/FROZEN_SET.md`
(2026-11-23T10:47:04Z), with a full amendments ledger
appended to the same file (Waves 1–4) — read it with this
record; every post-freeze change is ledgered there with
reasons and new hashes.
**Seats:** House axis (house reviewer) · Promise axis
(promise reviewer) · Kimi-K3 (different-family critic).
Fixes were re-reviewed by FRESH seats on the failing axis
only: Promise re-review 1, Promise re-review 2, and a
micro confirmation seat. The captain judges last; this
record is the coordinator's filing of the whole loop.

---

## 1. Per-module verdicts

### M12 — Advanced Interactive Experience Engineering: **PASS**
Evidenced by three complete interactive presentations on
shared Engine donations (`engine/interaction/
state-machine.js`, `scene-nav.js`; `engine/launch/
pacing.js`, `reserve-book.js`):
- **Project 8** (`project-8-automotive/`, "AURELE GT S"
  configurator): harness **17/17** on the final state
  (16/16 as produced; the GOTO-veto check added at
  grading). Keyboard-only journey, 40-event interruption
  spam settling consistent, OPEN refused while moving,
  GOTO-to-current-view refused under test, reduced motion
  inside a tightened <300 ms gate (~21–26 ms observed),
  readout recomputed from the published catalogue
  ($187,900 default; $190,500 gold).
- **Project 9** (`project-9-launch/`, "Meridian №1"):
  harness **17/17** on the final state (15/15 as produced;
  a full keyboard-only journey added at grading — the
  M12-1 repair). Pacing schedule on its published times,
  reserve book with the fiction-acknowledgement tick
  load-bearing, reservations № 1 and № 2 by mouse and
  № 1 by keys alone.
- **Project 10** (`project-10-architecture/`, "Villa
  Lumen"): harness **11/11**. Five-room walkthrough,
  day/night proven by computed style (glow 0.25 → 0.95),
  materials verified against the published table,
  reduced-motion settle filed as ~6–25 ms across runs.
All three seats concur; Kimi signed M12.

### M13 — Browser Rendering & Performance Engineering: **PASS**
One page built twice from a single shared body; six
planted defects (B1–B6), six named repairs (F1–F6);
profiler + gate in `m13-performance/`. Final gate:
**9/9**, reproduced on consecutive fresh filings by the
coordinator (×2), the second re-review seat (×2), and the
confirmation seat (×1). Headline evidence (labelled local
lab traces throughout; envelopes across all filings):
layout reads ~3,370 → **0**; LCP 524–948 ms → **96–168
ms**; longest app.js script 95–442 ms → **0–79 ms**
per-run; journey CLS intermittent 0.0014–0.6059 broken /
0.0014 fixed, with the deterministic delayed-hero probe
at **0.6042–0.6045 broken / 0 fixed** on every probe of
every filing; worst click latency across the startup
window (the INP leg's lab proxy) **288–432 ms broken /
40–168 ms fixed**. H-15 (Phase 2's carry) discharged in
the Engine component itself; Project 1's verification
stands at **36/36 across seven consecutive passes**.
Honest trades filed: FPS never separated the builds; the
fixed build's sliced index completes later (8.6–9.4 s vs
0.26–0.72 s across filings) — responsiveness is the
trade, named. The Promise axis's three MAJORs (INP
unmeasured; B6's missing trace against a blanket claim;
the `some()` CLS gate) were all repaired and confirmed
by fresh seats; the coordinator's own repaired B5 gate
then failed the first re-review (finding N-1) and was
repaired again — see §2. **M13-1 is referred to the
captain** (§3).

### M14 — Accessibility & Responsive Cinematic Design: **PASS**
`m14-accessible-alternative/`: Project 9's complete
alternative presentation, harness **15/15**. Parity by
reference (imports Project 9's own EDITION + the shared
reserve book; 6/6 paragraphs), contrast by WCAG formula
from the declared palette (16.24 / 8.74 / 5.89 / 6.30 /
7.28 / 5.84 against a 3:1 border bar), an 11-stop Tab
walk with 3px outlines, controls ≥44 px (smallest filed
48 px, independently re-probed by the Promise axis),
200% zoom clean, zero transitions. The Promise axis
called it the cleanest of the set. `WCAG_FILING.md` is a
study filing, **not a certification** (§5). Kimi signed
M14; two limitations are carried (§6).

### M16 — Quality Assurance & Security: **PASS**
The QA harness (`engine/qa-harness/`: unit, e2e, visual,
a11y, perf gates) and its exam (`m16-qa-harness/`):
**8/8 expectations** on the producer's run, the Promise
axis's own re-run, and the coordinator's confirmation
run. Clean build passes all five gates with no false
positives; the planted build fails, each of the five
planted defects caught by its owning gate (unit cap
breach, e2e step-7 stop, visual 1.81% > 1.00%, one
unnamed role=img, 2,441 layout reads vs budget 50). One
honest non-catch is filed: the planted thrash produced
0 ms of long tasks in every run — the layout-read
counter owns that defect class, and the filing says so.
Kimi signed M16.

---

## 2. Findings register — every seat, every finding

Grades: CONFIRMED (the finding was right) · NEEDS-CHECK
(could not be settled as stated) · REJECTED (kept on
record). No finding from any seat was rejected outright;
two summary-only claims are graded at the end.

### House axis — PASS all four modules; 0 blockers, 0 majors, 3 MINORs
- **H-1 (MINOR) — run-record CLS shorthand** compressed
  the 0.0014–0.6059 envelope. CONFIRMED; fixed (envelope
  form in run record + book). House re-review:
  CONFIRMED-FIXED.
- **H-2 (MINOR) — "~9 s vs ~0.5 s"** rounded the filed
  8.7–9.0 / 0.3–0.7. CONFIRMED; fixed; re-review
  CONFIRMED-FIXED. (Wave 3 later moved both records to
  cross-filing envelopes, 8.6–9.4 s vs 0.26–0.72 s, so
  lab drift stops making them stale.)
- **H-3 (MINOR) — Project 10 README pointed at "the
  Phase 3 grading record"** for D-P3-1/2, which live in
  the run record. CONFIRMED; fixed; re-review
  CONFIRMED-FIXED.
The axis spot-verified 8 frozen hashes, found lab
labelling clean everywhere, no external requests, and
the fictional fencing present including in-form consent.

### Kimi-K3 (critic) — SIGN on M12, M13, M14, M16 and the exit gate; 9 observations
1. **D-P3 numbering reconciliation** — CONFIRMED as a
   filing task; the map is §4 of this record.
2. **M14's reduced-motion narrowing belongs in the
   carries** — CONFIRMED; added to the run record's
   carries (House re-review item 4: CONFIRMED-FIXED);
   carried again in §6 here.
3. **M13 n=2 runs is thin; the CLS improvement rests on
   the tail** — CONFIRMED as a standing caution; the
   claim stays glued to it. (The fix loop's deterministic
   delayed-hero probe later removed the luck from the
   gate; the journey CLS is still filed as an envelope.)
4. **INP standing state must be carried** — CONFIRMED;
   see §3.
5. **M14 contrast is from the declared palette; no
   assistive-technology run exists** — CONFIRMED;
   carried in §6. "WCAG checks filed" must never mature
   into "AT-tested."
6. **M16's open-key self-planted exam proves five defect
   classes, not generality** — CONFIRMED; the breadth
   evidence is the incidental unplanted catches (D-P3-2,
   D-P3-3, the producer's catalogue arithmetic error),
   cited as such in §1/M16's filing.
7. **The six filed self-convictions are the pack's
   dominant honesty signal** — noted, agreed.
8. **Fictional-marque fencing** (footer + edition copy +
   mandatory in-form tick) — adopted as the standing
   pattern for later phases.
9. **Phase 1 gate unchanged** — CONFIRMED; §5.

### Promise axis — M12 PASS · M13 PASS (3 MAJORs) · M14 PASS · M16 PASS · gate SUPPORTED
- **F-0 (MAJOR, process) — frozen-set drift.** Three
  prose files (run record, book, P10 README) were edited
  at 10:50 CT, AFTER the 10:47:04Z freeze, while this
  axis was grading — the House MINOR fixes and the Kimi
  carry, applied mid-grading instead of amend-first or
  wait. **CONFIRMED, coordinator-owned.** No code or
  evidence file was affected and the axis confirmed no
  verdict rests on a drifted file. Remedy: the full
  amendments ledger appended to FROZEN_SET.md (Waves
  1–4), hash-verified by both re-review seats. The
  breach is owned here, not papered over: the correct
  order was amend-then-grade, or wait.
- **M12-1 (MAJOR) — Project 9 had no keyboard journey in
  its own harness.** CONFIRMED; fixed: §6 keyboard-only
  journey added (skip button is the first stop pre-reveal
  by design; then name → email → pieces → consent →
  submit; reservation № 1 by keys alone). Re-review 1:
  CONFIRMED-FIXED on its own 17/17 run.
- **M12-2 (MINOR) — P8's GOTO-veto claim untested.**
  CONFIRMED; fixed: §4b check (send returns false, state
  unchanged). Re-review 1: CONFIRMED-FIXED (17/17).
- **M12-3 (MINOR) — reduced-motion gates loose**
  (<1200 / <900 ms). CONFIRMED; fixed: both tightened to
  <300 ms. Re-review 1 measured 26 ms / 6 ms inside them.
- **M12-4 (MINOR) — P10's "~8 ms" did not reproduce**
  (axis measured 25 ms). CONFIRMED; fixed in substance:
  the figure is a range in the P10 README, "~6–25 ms
  across runs" in final form (re-review 1 measured 6 ms,
  below the first range's floor; the floor was widened
  in Wave 3). Two filing notes ride with it: the figure
  lives only in the README — the run record carries no
  P10 reduced-motion figure, and the Wave-2 description
  overstated where the range landed; and the range is a
  typical-runs range, not a bound.
- **M13-1 (MAJOR) — INP never measured.** CONFIRMED;
  fixed: an Event-Timing interaction phase in the
  profiler (trusted clicks from ~40 ms after navigation
  commits, 8 clicks × 4 series per build in final form)
  + two gate checks, labelled a lab proxy everywhere the
  number appears. Re-review 1 measured broken worst
  312/336 ms, fixed 48/120 ms; re-review 2: broken
  296/392, fixed 64/32; confirmation seat: fixed worst
  inside the bar again. **Referred to the captain** (§3).
- **M13-2 (MAJOR) — B6 had no trace, against the
  README's blanket trace claim.** CONFIRMED; fixed: the
  blanket claim replaced by an exact evidence map
  (B1/B2/B3 → read counters + LoAF, with B2's share
  inside the aggregate disclosed; B4 → bytes + the
  delayed-hero probe; B5 → LoAF + DCL; **B6 code-evident,
  no isolated trace, named as such**). A CDP
  LayoutCount/RecalcStyleCount corroboration was tried
  for B6 and REMOVED: the deltas inverted the naive
  expectation (the fixed build lays out more during its
  journey), so the instrument measured the wrong thing
  and the claim was repaired in prose instead.
  Re-review 1: CONFIRMED-FIXED.
- **M13-3 (MAJOR) — the CLS gate passed on timing luck**
  (`broken.some(> 0.1)`; filed broken runs 0.6059 and
  0.0014). CONFIRMED; fixed: a deterministic delayed-hero
  CLS probe (hero held 700 ms by request interception)
  carries the claim; the gate asserts broken probes
  > 0.1 and fixed ≤ 0.1 on every probe. Every filing by
  every seat: broken 0.6042–0.6045, fixed 0.
  Re-review 1: CONFIRMED-FIXED.
- **M13-4 (MINOR) — verify.mjs gates the filed
  results.json, not a live re-measurement.** CONFIRMED
  as a disclosed design property (the gate's own header
  states it). Disposition: accepted as designed; the
  mitigation is procedural and it happened — both
  re-review seats re-ran the profiler live, repeatedly,
  and the gate reproduced on their filings.
- **M13-5 (MINOR) — DEFECTS.md F5 claimed "no long
  task"** while the filing recorded a 61 ms fixed long
  task. CONFIRMED; fixed in waves (see N-2 below): the
  false claim is gone; the figure is now a to-date
  observation (51–92 ms) with the bound machine-checked
  in the gate (≤100 ms).
- **M14-1 (MINOR) — reduced-motion exercised under
  browser emulation, not a physical device.** CONFIRMED;
  self-disclosed in the filing; carried (§6).
- **M14-2 (MINOR) — contrast from the declared palette,
  not rendered pixels.** CONFIRMED; disclosed in the
  filing; carried (§6). (M16's a11y gate separately
  measured Project 9's computed body contrast at
  15.26:1 from live styles.)
- **M16-1 (MINOR) — the visual gate's clean PASS is
  baseline-relative by design.** CONFIRMED; disclosed in
  EXAM_RESULTS.md; the discriminating power is the
  planted 1.81% catch.
- **M16-2 (MINOR) — lab LCP cited as a single figure.**
  CONFIRMED; fixed: "72–188 ms across runs" in
  EXAM_RESULTS.md, the run record, and the book.
  Re-review 1: CONFIRMED-FIXED.
- The axis byte-verified the media ledger itself: 72
  frame files totalling **112,168 bytes**; hero
  6,969,381 B → 9,348 B. (No filed document ever claimed
  a different frame total; the axis's figure is the
  record's.)

### Promise re-review 1 — 9/10 CONFIRMED-FIXED, M12-4 in substance; one NEW finding
- **N-1 (MAJOR, M13 filing) — the coordinator's repaired
  B5 gate failed 8/9 on both of the seat's fresh
  filings.** The per-run floors (script ≥100 ms AND DCL
  ≥250 ms on every broken run) straddled the bench's
  weather (a 95 ms script / 206 ms DCL run; a 234 ms DCL
  run) — the same instrument disease as M13-3, sign
  flipped. **CONFIRMED, coordinator-owned.** Fixed
  (Wave 3): the check is envelope/aggregate in form
  (broken script envelope max ≥100 ms; fixed every run
  ≤100 ms; DCL means separated by >100 ms). On the
  first stability filing the interaction-samples check
  then flaked once on the fixed build's thin sample
  (n=2 against a ≥3 floor), so the instrument was
  thickened (8 clicks × 4 series) and the floor restated
  at n≥2 with the thinness disclosed in the check text.
  Re-review 2: **CONFIRMED-FIXED** — 9/9 on both of its
  fresh filings, both of which would have failed the
  old gate (99 ms script; 203 ms DCL); DCL mean
  separations 194 ms and 121.5 ms.
- Nits filed by re-review 1 (M12-4's 6 ms floor; F5's
  51–53 ms figure) — dispositioned in Waves 3–4.

### Promise re-review 2 — N-1 + samples CONFIRMED-FIXED; one item re-opened, then closed
- **N-2 — F5's figure re-opened.** The seat's Filing 2
  observed a fixed load long task of 92 ms and an app.js
  script of 91 ms, past the Wave-3 printed ranges.
  CONFIRMED; fixed (Wave 4) by restating the figures as
  to-date observations (51–92 ms; app.js 0–91 ms) with
  the bound moved into the gate — two successive
  widenings of a printed ceiling, each overtaken within
  a day, taught the module to stop printing ceilings for
  weather. The seat also widened the samples check's
  printed range (broken n=31 overtook "14–29"); fixed
  in the same wave ("14–31 of 32").
- **Confirmation seat (fresh, micro-scope):
  CONFIRMED-FIXED on both Wave-4 items** — hashes match;
  its own fresh filing reproduced 9/9 with the fixed
  build's longest load long task at 82 ms and longest
  app.js script at 81 ms, inside the printed ranges and
  under the gate bound; samples broken n=30, fixed n=5.
- **Standing watch note (re-review 2):** the fixed
  build's longest app.js script filed at 91 ms on one
  filing against the gate's 100 ms ceiling — the margin
  is real but narrowing on a loaded bench (filing maxima
  0–91 ms). Recorded as a watch item for later phases,
  not a failure: the gate held on every filing by every
  seat.

### Summary-only claims (from the first Promise handoff summary; NOT in its filed report)
- **"M13 FAIL, 2 MAJORs" incl. a B5 "setTimeout(0)"
  MAJOR** — REJECTED as a finding (the filed report says
  M13 PASS with three MAJORs; no such finding exists in
  it). Its substance was nevertheless checked by the
  coordinator against the code: there is no setTimeout
  in broken.js (the only setTimeouts are fixed.js's F5
  slicing timers), and B5's "load path" wording did
  overstate placement for a deferred module script.
  The wording was repaired in DEFECTS.md, broken.js,
  the generated pages, and the book; re-review 1
  verified the repair by grep. Recorded so the
  divergence is never mistaken for a suppressed finding.
- **"P1 35/36"** — NEEDS-CHECK, unresolved as an
  observation, closed as a risk: never reproduced. The
  coordinator looped Project 1's verification ×4
  (36/36 ×4) and re-review seats ran it again (36/36) —
  seven consecutive full passes on the post-H-15 state.
  H-15's verdict rests on the addition's additive nature
  (graded exports untouched) plus this pass record; the
  flake is named in the FROZEN_SET ledger, not hidden.

---

## 3. The INP standing state — referred to the captain

M13-1's repair files the third CWV leg as a **lab
proxy**: Event-Timing click latencies across the startup
window, worst case 40–168 ms for the fixed build across
all filings (bar: <200 ms), labelled "not field INP" in
the profiler, the gate, the ledger, and the README.
Field INP requires field data, which an undeployed study
artifact cannot have — the same construction as the
captain's F-P3-2 ruling for LCP/CLS lab traces. The
Promise axis referred the scope question explicitly:
**if the standing CWV bar is read as all-three-or-fail
on field terms, M13's pass should be re-cast as
conditional.** The coordinator's filing: M13 PASS on the
lab evidence, with this referral standing for the
captain's ruling. Nothing in the exit gate's letter
turns on it (§5).

---

## 4. Producer defects (D-P3) — with the numbering map Kimi required

- **D-P3-1** — the state machine's header claimed a bare
  return vetoes; the code refuses only on `{veto:true}`.
  Header corrected to the code (Rule 25).
- **D-P3-2** — Project 10's controller was first written
  against a *paraphrased* scene-nav API and died on load;
  rewritten to the disk contract (Rule 24: the file on
  disk is the contract).
- **D-P3-3** — Project 8's stage overflowed 390 px by
  188 px (aspect-ratio vs min-height); rebuilt as a
  grid-stack stage; hotspot dots re-seated; Project 9's
  dial text moved inside the dial.
- **D-P3-4** — **M16's instrument defects** (the evidence
  pack narrated these unnumbered; this is their number):
  the perf gate read LCP from `getEntriesByType`, which
  delivers nothing — the first clean run "failed" LCP at
  null ms, a broken instrument, not a slow page; fixed
  with a buffered PerformanceObserver. Riding with it:
  the exam's own e2e expectation named the wrong step
  and was corrected to the step where the defect
  actually stops the journey.
- **D-P3-5** — **M14's three instrument defects**:
  `innerText` vs `textContent` on the hidden
  confirmation; the checkbox target measured by its box
  instead of its label row; the "empty form" expectation
  corrected to the browser's actual values (including
  the select's default — which is also why the
  alternative's empty-submit speaks 3 validator messages
  to Project 9's 4).
- Plus the producer's catalogue arithmetic error (test
  expected $190,900; the catalogue prices $190,500 — the
  page was right, the test was fixed), cited by Kimi as
  part of M16's incidental-catch breadth evidence.

---

## 5. PHASE 3 EXIT GATE — RULING: **PASS**

The package (§5) defines the gate: *"Projects 8, 9, and
10 passed blind; the QA harness exists and has caught
planted defects (M16's exam)."*

- Projects 8, 9, and 10 passed blind on every seat's own
  runs — final harnesses 17/17, 17/17, 11/11 — with the
  two evidence gaps the Promise axis found in them (P9's
  keyboard journey, P8's GOTO veto) now exercised checks
  that pass, not claims.
- The QA harness exists and caught its planted defects:
  5 of 5, each by its owning gate, on three independent
  runs of the exam (8/8 expectations each).
- The phase's other two modules also pass their §4 bars:
  M13 PASS (three MAJORs repaired and confirmed; the
  INP referral of §3 stands for the captain), M14 PASS.
- The House axis passes all four modules; Kimi-K3 signs
  all four modules and the gate; the Promise axis
  supports the gate in its filed report and both
  re-reviews.

**What this ruling does NOT claim — stated plainly:**
- **Phase 1's exit gate remains OPEN** on Project 4
  alone (M6: the film is not verifiably a Flow
  production; there is no crew door into Flow). Nothing
  in Phase 3 touches it, and no attempt was made to
  route around the Flow fence. **Track 7 is NOT
  graduated**: graduation requires every phase gate
  plus the §26 final examination, neither of which this
  record grants.
- **No live-performance filing exists.** Every CWV
  figure in Phase 3 is a labelled local lab trace for
  undeployed study artifacts (captain's F-P3-2 ruling);
  INP is a lab proxy, not field data. Live pages file
  live PageSpeed numbers, and the two are never mixed.
- **M14 is not a WCAG certification and nothing was
  AT-tested** — it is a study filing with its methods
  and limits disclosed (§6).
- **Stamps are per-artifact.** This record grades
  Phase 3's artifacts and exams only; it awards no
  blanket mastery and nothing toward Track 8, which
  remains sealed.
- **No website building was done or authorised.** The
  gate order stands: full Track 7 graduation before any
  website building.

---

## 6. Carries forward

- **Phase 1 gate (open)** — Project 4 / M6, Flow
  production. Unblock is a captain-run Flow session or
  the Ultra purchase (George's tap). Carried, untouched.
- **INP standing state** — lab proxy filed; the
  captain's scope ruling (§3) is the open item.
- **M14's two limitations** — reduced-motion evidence is
  the browser's emulated setting in a headless lab, not
  a physical device (the alternative itself contains no
  motion); contrast is computed from the declared
  palette, not sampled from rendered pixels, and no
  assistive-technology run exists.
- **M13 watch items** — the fixed build's app.js gate
  margin (filing maxima 0–91 ms vs the 100 ms ceiling);
  the fixed build's interaction samples run thin per
  filing (n=2–6) — the pooled cross-filing worst is the
  stronger evidence and is what the record cites.
- **From Phase 2, still standing** — the Engine
  components' silent-ignore config behaviour (recorded
  as a decision in `engine/README.md`; improvement
  candidate), and the shader pack's mid-flight retarget
  documented as v1 behaviour.
- **Process lesson, filed by F-0** — a freeze is amended
  BEFORE grading resumes, or the grading waits. The
  amendments ledger is the mechanism; this record is
  its first full exercise.

---

## CAPTAIN'S RULING — M13-1 INP SCOPE REFERRAL (2026-11-23, captain, on the record)

**Ruling: M13's PASS stands as filed.** The INP leg evidenced as a labelled lab proxy (fixed worst 40–168 ms against the <200 ms bar) is the correct evidence class for an undeployed study artifact, under the same construction as the F-P3-2 ruling (Phase 1): labelled local lab traces stand for undeployed study artifacts; live PageSpeed filings are required for live pages; the two methods are never mixed. INP field data cannot exist for a page with no traffic — requiring it would make the bar unsatisfiable by construction, which is a defect in the bar's reading, not in the work. The condition that DOES bind: any page that goes live and gains traffic owes a field-INP filing at its first live CWV measurement, and a field breach re-opens the question for that page. The referral is closed on those terms; the standing watch item on the app.js filing maxima (0–91 ms vs the 100 ms gate ceiling) remains open as filed.
