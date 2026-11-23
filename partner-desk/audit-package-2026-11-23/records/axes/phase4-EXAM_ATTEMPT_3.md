# M15 BLIND-INSTALL EXAM — THIRD SITTING (2026-11-23)

*Fresh builder, re-fixed documents, same client brief.
Start 12:10:43 UTC · end 12:14:01 UTC · elapsed ~3.3 min.
Site preserved at `exam-attempt-3/`.*

## Outcome

Everything built and working a third time: install smoke
test clean; Step 5 readouts agreeing with the journey at
nine sampled stops (25%→31 … 100%→120); callouts fading
only inside their windows, leader dots observed on-part
(stem + base at 74%, bulb + shade at 93%); Step 6 checks
all green; Step 7's alternative built from the new
skeleton with the parity comparison run and passing
verbatim, JS-off and images-off checks green, link 45 px.
The builder also read the span off the frames themselves
(first visible separation in the last third → span start
0.67) — attempt 2's tie-break fix working as written.

Five items recorded; the coordinator's grading:

1. **example.html stylesheet paths** — CONFIRMED defect
   (the skeleton's `../foundation/` links resolve only
   from its home folder; step 7 said nothing). FIXED:
   step 7 now names the repointing explicitly.
2. **Folder slug rule absent** — CONFIRMED (minor).
   FIXED: step 1 names the slug rule.
3. **Many-parts stagger arithmetic unstated** — the
   builder in fact derived the determinate answer from
   the rule (stagger 0.038 = (0.33−0.14)/5, windows
   landing exactly on 1.000); the formula is now stated
   in the guide so the next builder need not re-derive
   it. FIXED (clarification).
4. **Supplied final-frame tips vs callout-frame tips** —
   the guide's check-in-the-browser instruction covered
   the verification (dots confirmed on-part at two
   progresses); the supplied-tips case is now stated.
   FIXED (clarification).
5. **No headless method for the manual checks** —
   REJECTED as a documentation defect, reason on record:
   the documents are written for a builder with a
   browser; INSTALL §4 itself names puppeteer (which all
   three builders used successfully for exactly these
   checks), and the QA harness is the documented
   automated route. The documents never promised an
   automated form of the manual checks.

*Edge observation filed by the builder, no action: at
exactly 100% the last callout reads opacity 0.005 — the
callout system's designed fade at its window's end, the
same shape the guide's example uses.*

*A fourth sitting runs on the micro-fixed documents. The
exam passes when a sitting records no confirmed gap.*
