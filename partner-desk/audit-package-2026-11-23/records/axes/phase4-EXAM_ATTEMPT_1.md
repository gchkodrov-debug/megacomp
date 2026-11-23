# M15 BLIND-INSTALL EXAM — FIRST SITTING (2026-11-23)

*Builder: a fresh-context agent, package documents alone.
Start 11:59:41 UTC · end 12:03:35 UTC · elapsed 3m54s.
Site preserved at `exam-attempt-1/` (the builder's
beacon-no1 page, fully working).*

## Outcome

The page: **fully functional** — install smoke test
passed (Template F: totals recomputed $1,000 → $1,250,
machine state tracked, zero console errors); BUILD_A_PAGE
Step 6 checks all observed green (zero errors; reduced
motion holds frame 1; phone width loads frames-m only,
no sideways scroll; keyboard-only reaches frame 120;
budgets unchanged at 175,788 B per folder); the chase
sampled gradual (1→58 over ~1 s of samples, no jump-cut);
callouts faded in inside their windows with leader dots
at the brief's tip coordinates under the player's cover
transform.

The documentation: **FAILED the exam's bar** — four
DOC-GAP items, each a place the builder needed an answer
the documents did not contain (the exam's definition: a
question the builder would have asked is a documentation
defect):

1. **One frame set supplied, two sets required** — no
   document covered a single pre-sliced set, whether it
   may serve both folders, or what sizes to declare.
2. **Callout windows underivable** — the guide gave
   rules ("journey order") and a worked example fixing
   three of this client's six windows, but no derivation
   rule for the rest. *Producer's note, filed openly:
   the guide's example had been written with this
   client's own product and parts (Base/Stem/Bulb) — the
   example pre-answered half the exam. The example has
   been replaced with a different product (the Meridian
   Kettle) as part of the fix.*
3. **The alternative presentation had no build
   instructions** — the accessibility layer states every
   page ships one, but the step-by-step guide never
   mentioned building it: no location, no contents, no
   wiring.
4. **The QA harness had no runnable entry point in the
   package** — a contract in its README, no example
   config or runner; the guide's "where to go next"
   pointed at a door that did not open.

## Fixes landed before the re-sit

- BUILD_A_PAGE step 2: the one-set rule (same set serves
  both folders; declare true sizes; budgets per folder).
- BUILD_A_PAGE step 3: the example genericized (Meridian
  Kettle) + the window-derivation rule (find the action's
  span; stagger evenly in naming order; ~0.12–0.15 each;
  last window ends where the action ends; check windows
  against the frames at their edges).
- BUILD_A_PAGE step 7 (new): the alternative presentation
  as a buildable step — sibling `accessible.html`, the
  link both ways, its concrete contents, its own checks.
- The package now ships the harness's worked example
  (`engine/qa-harness/example.config.mjs` +
  `run-example.mjs`, born in the harness's home tree,
  assembled into the package): proven end-to-end from the
  package root — BASELINE-CREATED reported as its own
  step, then unit/e2e/visual/a11y/perf PASS, second run
  grading clean. BUILD_A_PAGE's pointer now names the
  command.
- Package re-assembled: 45 files in the manifest.

*The re-sit runs with a fresh builder, the same client
brief, and the fixed documents. Its record is filed
separately (EXAM_ATTEMPT_2.md).*
