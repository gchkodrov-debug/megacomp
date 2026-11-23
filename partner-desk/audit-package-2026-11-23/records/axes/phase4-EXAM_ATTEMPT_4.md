# M15 BLIND-INSTALL EXAM — FOURTH SITTING: PASS (2026-11-23)

*Filed late, and the lateness is part of the record: this
filing was believed written on the sitting's day — a
chained shell command whose middle step failed silently
skipped the write while its final echo reported success
(the coordinator's process defect, of the same family as
Phase 3's F-0; the blind House and Promise reviewers both
caught the absence independently). It is written now,
during the grading fix wave, from the builder's own
report and the captain-side verification, both of which
existed all along. Sittings 1–3 were filed on time.*

*Fresh builder (fourth), micro-fixed documents, same
client brief. Start 12:14:56 UTC · end 12:18:13 UTC ·
elapsed 3m17s (from the builder's report). Site preserved
at `exam-attempt-4/` (product folder `beacon-1/`).*

## Outcome

Everything built and working a fourth time. The builder
additionally used the harness's shipped example as the
install smoke test (a documented route: its e2e journey
clicks Template F's views/finishes and asserts the
recomputed totals — BASELINE-CREATED, then 5/5 PASS). The
window formula was applied as written (length 0.14,
stagger (0.33 − 0.14) ÷ 5 = 0.038, windows landing
exactly on 1.000); the client's tips were verified on the
final frame before use (each dot plotted on its part);
the alternative page was built from the shipped skeleton
with its stylesheet repointing done as instructed, and a
scripted parity comparison filed: PARITY ALL TRUE. Step
6 checks all green (zero console errors across desktop,
mobile, and reduced-motion loads; frames-m only at
390 px; keyboard journey to frame 120; budgets unchanged
at 175,788 B per folder). Step 7 checks green (0 scripts,
first Tab stop the back-link at 44 px min-height, no
sideways scroll, stills loaded with per-part alts).

Captain-side verification (verify-attempt4.mjs, run by
the coordinator and independently re-run by the Promise
reviewer with identical output): cinematic — progress
100%, 120/120 frames loaded, 6 callouts, zero console
errors; alternative — 6 part sections, 0 scripts.

## Items recorded by the builder, with the grading

1. **Rendering "№" in a slug** — REJECTED as a defect.
   The rule states the constraint (lowercase, hyphens,
   no special characters); a character's transliteration
   is builder judgment — two sittings chose differently
   (beacon-no1, beacon-1) and both are correct.
2. **Splitting the brief's lines into name/does** —
   REJECTED: the Step 3 worked example demonstrates the
   split, and the builder's report cites that example as
   its source. The documentation answered.
3. **Markup for the alternative-page link** — REJECTED:
   Step 7 specifies the link, its place (the header) and
   its text; an anchor is the single standard
   construction, and the builder produced exactly what
   the step describes.

The builder's environment note (headless checks via
puppeteer) repeats sitting 3's item 5 — REJECTED there
with its reason, which stands.

**No confirmed documentation gap. The exam's bar — a
fresh builder, documents alone, timed, zero questions
the documents fail to answer — is met. M15's blind-
install exam: PASS (fourth sitting; the full sitting
history is this folder's record).**
