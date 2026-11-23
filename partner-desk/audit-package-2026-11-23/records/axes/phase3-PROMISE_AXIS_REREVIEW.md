# TRACK 7 PHASE 3 — PROMISE-AXIS BLIND RE-REVIEW (fix verification)

**Reviewer:** fresh blind re-review seat (Promise axis). No prior
involvement in the build or the first grading. Every verdict
below rests on this seat's own harness re-runs, source reads,
greps and hash checks — nothing taken from the fix claims.
**Governing document:** the FILED `PROMISE_AXIS.md` (its handoff
summary diverged from it in three places — "M13 FAIL, 2 MAJORs",
a B5 "setTimeout(0)" MAJOR, "P1 35/36" — none of those exist in
the filed report, which says M13 PASS with three MAJORs and
P1 36/36; the filed report governed this re-check, as briefed).
**Amendment ledger:** `FROZEN_SET.md`, "AMENDMENTS AFTER
FREEZE" — Wave-2 hashes verified against disk (see §11).

All harnesses run with stdin closed (`< /dev/null`).

---

## This seat's harness runs

| Harness | Result on my run |
|---|---|
| Project 9 (`node verify.mjs`) | **17/17 PASS**, exit 0 |
| Project 8 (`node verify.mjs`) | **17/17 PASS**, exit 0 |
| Project 10 (`node verify.mjs`) | **11/11 PASS**, exit 0 |
| M13 profiler (`node profile.mjs`, ×2) | ran clean both times, regenerated `results.json` |
| M13 gate (`node verify.mjs`, ×2, once per filing) | **8/9 both times** — see finding N-1 |
| Project 1 (`node verification/verify.mjs`, spot run) | **36/36 PASS**, exit 0 |

---

## Per-finding verdicts

### 1. M12-1 (MAJOR) — P9 keyboard journey — **CONFIRMED-FIXED**
`project-9-launch/verify.mjs` §6 exists in source (line 163:
"the whole journey by keyboard alone (M12-1, added at blind
grading)"). My run reproduces the claimed journey exactly:
`first=skipReveal → f-name → f-email → f-pieces → f-consent →
submit`, and the keys-only reservation completes with
"Reservation № 1 … errors=0". Harness total **17/17** (was
15/15). The explicit M12 bar is now exercised proof on all
three projects, not construction-plus-circumstance.

### 2. M12-2 (MINOR) — P8 GOTO-veto untested — **CONFIRMED-FIXED**
§4b present in source (`verify.mjs:151–162`, commented as the
M12-2 addition). My run: "the machine refuses a GOTO to the
view it already holds … sent=false view=0→0 state=settled".
Harness total **17/17** (was 16/16).

### 3. M12-3 (MINOR) — loose reduced-motion gates — **CONFIRMED-FIXED**
Source: P8 asserts `elapsed < 300` (`verify.mjs:200`); P10
asserts `Date.now() - t0 < 300` (`verify.mjs:140`). No 900 or
1200 threshold remains in either file. My runs pass with wide
margin inside the tightened gate: P8 elapsed **26 ms**, P10
elapsed **6 ms**.

### 4. M12-4 (MINOR) — P10 "~8 ms" figure — **CONFIRMED-FIXED, with two nits**
`project-10-architecture/README.md:59` now reads "reduced
motion settles in ~8–25 ms across runs". The false single
best-run figure is gone. Nits, reported plainly:
(a) my own P10 run measured **6 ms** — 2 ms *below* the filed
range's floor. The range is a typical-runs range, not a bound;
the substance (same order of magnitude, gate at <300 ms) is
unaffected, and faster-than-filed is not a broken promise.
(b) The claimed fix said the run record carries the range
too; `../TRACK_7_PHASE_3_RUN.md` in fact carries **no**
reduced-motion figure for Project 10 at all (its only
reduced-motion number is Project 8's ~21 ms). Nothing false
stands in the run record, but the fix's own description
overstates where the range landed.

### 5. M13-1 (MAJOR) — INP never measured — **CONFIRMED-FIXED**
`profile.mjs` has a real interaction phase (source: Event
Timing observer filing entries with `interactionId`;
`interactionRun()` issuing trusted clicks across the startup
window; three series per variant, samples pooled). `verify.mjs`
carries the two claimed checks, and the lab-proxy labelling is
present in every place the number appears — the verify check
text itself, `DEFECTS.md`'s measurement route, and the README
table ("the INP leg's lab proxy, not field INP"). My measured
figures (fresh filings, both runs):

| Filing | Broken worst | Broken n | Fixed worst | Fixed n |
|---|---|---|---|---|
| Run A | **312 ms** | 17 | **48 ms** | 3 |
| Run B | **336 ms** | 18 | **120 ms** | 4 |

Both filings: fixed < 200 ms, broken > 200 ms; both
interaction checks PASS. The fixed build's sample is thin
(n=3–4) — the filing discloses this rather than padding it,
and the worst-case figure is the one the bar turns on. The
third CWV leg is now evidenced, as a labelled lab proxy.

### 6. M13-2 (MAJOR) — blanket trace claim overstated — **CONFIRMED-FIXED**
`m13-performance/README.md` now opens with an exact evidence
map: B1/B2/B3 tied to the layout-read counters and LoAF
timings *with the aggregate disclosed* ("B2's individual
share is not isolated"); B4 to bytes plus the delayed-hero
probe; B5 to LoAF and DCL; and, verbatim in substance, "**B6
carries no isolated trace**: it is code-evident … and the
module says so rather than dressing it in a neighbour's
numbers." The paragraph also names the earlier blanket claim
as replaced and graded overstated. `DEFECTS.md`'s
measurement-route section now describes both new probes.
Judgement: the claim as now written is accurate — every
bottleneck's evidence class is stated, and the one without a
trace says so.

### 7. M13-3 (MAJOR) — CLS gate on timing luck — **CONFIRMED-FIXED**
Source confirms the mechanism: `profile.mjs` `clsProbe()`
(line ~160) enables request interception and holds any
`/hero…` request for 700 ms (`await sleep(700)`), two probes
per variant, filed as `clsProbes`. `verify.mjs` check 3 now
asserts `clsProbes.broken.every(> 0.1) &&
clsProbes.fixed.every(≤ 0.1)` — the `some()` logic is gone.
My two fresh filings produced **identical** probe values,
which is what deterministic means here:

- broken: **[0.6045, 0.6045]** (both filings)
- fixed: **[0, 0]** (both filings)

(Journey CLS in my filings was 0.6056 on all four broken
runs this time; the probe no longer depends on that luck.)

### 8. M13-5 + B5 wording (MINOR) — **CONFIRMED-FIXED, with one drift nit**
- `DEFECTS.md` B5 is rewritten precisely: title now "A long
  task in the page's startup script"; the entry states the
  script is a module, deferred, running after parsing and
  before DOMContentLoaded, and states "(No `setTimeout` is
  involved on the broken side; the slicing timers exist only
  in F5.)" Verified against the code: `grep setTimeout` on
  `broken.js` returns nothing; the only `setTimeout`s are
  `fixed.js`'s two slicing timers (lines 68, 75).
- F5 no longer claims "no long task": it now files the fixed
  build's longest load long task as 51–53 ms and names the
  earlier wording as refuted by the filing itself.
- `broken.js` header + B5 comment reworded, and the generated
  `broken/app.js` matches: `grep "load path"` = **0 hits** in
  both files; "startup script" present in both (lines 10,
  45). `broken.js` and `broken/app.js` hash identically
  (a3093470…), consistent with the build copying the source.
- The book chapter carries the same precision
  (`../TRACK_7_CINEMATIC_WEB_ENGINEERING.md:1111`: "a
  synchronous sieve in the page's startup script"; its M13
  section also files the delayed-hero probe and the INP
  lab proxy, line 1137).
- **Drift nit:** F5's replacement figure is already stale
  against my bench — my two filings recorded fixed-build load
  long tasks of **51, 67 and 80 ms** (max 80 ms, vs the filed
  51–53 ms envelope). The fix's substance — the false "no
  long task" claim is gone and a real figure stands in its
  place — holds; the figure itself is a filing envelope, and
  the README already governs this ("results.json is the
  governing record… envelopes drift between filings").

### 9. M16-2 (MINOR) — single lab LCP figure — **CONFIRMED-FIXED**
Range wording present in all three places:
- `m16-qa-harness/EXAM_RESULTS.md:25`: "LCP 72–188 ms across
  runs (lab)", and lines 53–54 explain the variance
  explicitly (188 ms filed first; later runs 72–96 ms).
- `../TRACK_7_PHASE_3_RUN.md:94`: "LCP 72–188 ms lab across
  runs".
- Book, line 1267: "LCP 72–188 ms lab across runs".
No surviving single-figure citation found.

### 10. P1 flake — **NO REPRODUCTION; pass record extended**
My spot run: **36/36 PASS**, exit 0 (~34 s). With the
producer's ×2 and the coordinator's ×4 on the post-fix state,
that is **seven consecutive full passes** and still no
reproduction of the summary-only 35/36. The ledger files the
flake openly rather than hiding it; nothing further is owed
on the evidence available.

---

## 11. Frozen-set amendment ledger — hash verification

`sha256sum` over every Wave-2 ledger entry, compared to
`FROZEN_SET.md`'s amendments section:

- **All 13 non-regenerating files match exactly:**
  `m13-performance/profile.mjs` 965f1573…, `verify.mjs`
  6cca1ef3…, `README.md` fd95bd16…, `DEFECTS.md` be76c5b2…,
  `broken.js` **and** `broken/app.js` a3093470… (identical to
  each other, as the ledger states), `project-9-launch/
  verify.mjs` 56b62674…, `project-8-automotive/verify.mjs`
  0e0ed44f…, `project-10-architecture/verify.mjs` 66cbb85b…,
  `project-10-architecture/README.md` 49dca93f…,
  `m16-qa-harness/EXAM_RESULTS.md` 780b38f6…,
  `../TRACK_7_PHASE_3_RUN.md` 3129884a…,
  `../TRACK_7_CINEMATIC_WEB_ENGINEERING.md` c6cb7e24….
- The three `m16-qa-harness/results-*.json` also still match
  the ledger (2538cd69… / 08497e38… / 14e89f69…) — this seat
  did not re-run the M16 exam, so they stand as the
  coordinator's generation; judged by the original axis's
  8/8 re-run and the verdicts on file, per the brief.
- `m13-performance/results.json` legitimately differs from
  its ledger hash (eeb6c3e2…): my two mandated profiler runs
  regenerated it. Judged by content and verdicts: layout
  reads 3,368–3,382 broken / 0 fixed, index 1,270,607 in all
  runs, frame 72 settled, zero console errors — the filing's
  substance reproduces.

No unledgered drift found in anything this seat checked.

---

## 12. NEW FINDING

### N-1 (MAJOR for the M13 filing; outside the exit gate's letter) — the repaired M13 gate fails 8/9 on fresh filings, on timing luck of the opposite sign
The fix loop replaced the CLS `some()` gate with deterministic
probes (correctly — finding 7), but the same repair re-based
the B5/F5 check on per-run timing thresholds, and that check
now fails on **both** of this seat's fresh profile filings,
for **two different sub-reasons**:

- Run A filing: broken run 2's longest app.js script measured
  **95 ms** (< the gate's ≥ 100 ms), DCL 206 ms (< 250 ms).
  Gate output: "broken: 251, 95 ms · fixed: 79, 0 ms · DCL —
  broken: 386, 206 ms".
- Run B filing: script durations passed (114, 153 ms) but
  broken run 2's DCL measured **234 ms** (< 250 ms). Gate
  output: "DCL — broken: 270, 234 ms · fixed: 110, 151 ms".

`verify.mjs` check 5 requires `broken.every(script ≥ 100 &&
DCL ≥ 250)` — an every-run assertion over two quantities that
demonstrably straddle their thresholds on this bench (broken
script filed across sessions at 95–251 ms; DCL at 206–386 ms).
The gate therefore passes or fails on measurement luck — the
same instrument weakness class as the original M13-3, with
the sign flipped (too strict where M13-3 was too lax).
Consequences, stated precisely:

- The README's "(verify.mjs, 9/9)" did **not** reproduce on a
  fresh profile on this bench today: **8/9, twice**, exit 1.
- The B5 *substance* is not in doubt: on every filing the
  broken sieve's script (95–251 ms) dwarfs the fixed build's
  (0–79 ms), and DCL separates in aggregate. What fails is
  the gate's threshold form, not the defect or its fix.
- This finding does **not** touch the Phase 3 exit gate,
  whose letter covers Projects 8/9/10 and the M16 harness
  only. It is owed as a repair to M13's gate (an envelope- or
  aggregate-based assertion, like the module's other checks,
  would match how the bench actually behaves) and to the
  README's 9/9 line until the gate reproduces it.

No other new finding was tripped over. The M13 README
headline table's envelopes are from an earlier filing than
mine (e.g. fixed worst click filed at 168 ms vs my 48/120 ms)
— disclosed in the README itself, with `results.json` named
as governing; not a finding.

---

## 13. Overall ruling — Phase 3 exit gate

The gate (§5): *"Projects 8, 9, and 10 passed blind; the QA
harness exists and has caught planted defects (M16's exam)."*

- Projects 8, 9, 10 passed blind **on this seat's own runs**:
  17/17, 17/17, 11/11 — and the two evidence gaps the first
  axis found in them (P9's keyboard journey, P8's GOTO veto)
  are now exercised checks that pass, not claims.
- The QA harness's planted-defect catch stands on the first
  axis's own 8/8 re-run; its results files still hash-match
  the amendment ledger, and its one wording defect (M16-2)
  is fixed in all three records.
- Every other re-checked finding (M12-3, M12-4, M13-1,
  M13-2, M13-3, M13-5/B5, the ledger hashes, the P1 pass
  record) is CONFIRMED-FIXED on this seat's measurements,
  with the small nits recorded above (a 6 ms reading 2 ms
  under a filed range floor; a run record that omits a figure
  rather than ranging it; a 51–53 ms envelope my bench
  exceeded at 80 ms).
- The one substantive new item, N-1, concerns M13's gate —
  a module the exit gate's letter does not name — and the
  defect/fix substance behind it reproduces on every run.

**Promise-axis re-review ruling: the Phase 3 exit gate is
SUPPORTED — PASS.** Nine of the ten re-checked items are
confirmed fixed outright; the tenth (M12-4) is confirmed in
substance with nits. One new MAJOR-grade filing defect (N-1,
the 9/9 gate claim not reproducing on fresh profiles) is
recorded for repair; it does not block the gate as written,
and the captain judges last.
