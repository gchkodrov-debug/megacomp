# M15 BLIND-INSTALL EXAM — SECOND SITTING (2026-11-23)

*Fresh builder, fixed documents, same client brief.
Start 12:05:57 UTC · end 12:09:38 UTC · elapsed 3m41s.
Site preserved at `exam-attempt-2/`.*

## Outcome

Everything built and working again: the cinematic page
(all Step 6 checks green, chase gradual, frames-m only at
390 px, keyboard journey complete), the Step 7
alternative page (built from the new step; JS-off and
images-off checks green; link 44 px), and the QA harness
example running exactly as documented (BASELINE-CREATED,
then 5/5 PASS — attempt 1's DOC-GAP 4 CLOSED; the one-set
rule likewise followed cleanly — DOC-GAP 1 CLOSED).

Four narrower gaps recorded — the documentation still
short of the exam's zero-question bar:

1. **Span-start tie-break missing** — the guide's example
   span (0.70) vs the brief's "roughly two-thirds" (~0.67):
   no rule said which governs. FIXED: the span is read
   off the builder's own frames (first visibly-separating
   frame), the example's figure explicitly demoted.
2. **Parity contradiction (producer's own documents)** —
   BUILD_A_PAGE said "copy the PRODUCT block"; the
   accessibility layer said "by reference, not by copy";
   step 7 also required JS-off, which forbids runtime
   import. FIXED in both documents: import where script-
   built; transcribe + filed comparison check where the
   page must stand with scripts off.
3. **No accessible-page example in the package** — the
   layer named an out-of-package study artifact as its
   reference. FIXED: `engine/accessibility/example.html`
   ships in the package; step 7 points at it.
4. **Shared-still case unstated** — "the frame where the
   part is most distinct" gave no word for several parts
   sharing one frame. FIXED: the shared-still sentence
   (same still, per-part alt and description).

*A third sitting runs with a fresh builder on the
re-fixed documents.*
