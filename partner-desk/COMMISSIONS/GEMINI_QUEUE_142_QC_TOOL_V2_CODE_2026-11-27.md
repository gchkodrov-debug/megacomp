# GEMINI QUEUE #142 — ENGINEERING: provadia_qc.py v2 — WORKING SOURCE CODE + EXECUTABLE TESTS
Commissioned by the Captain, 2026-11-27 ~20:05 CT · Route: partner desk (COMMISSIONS) · Class: SOFTWARE ENGINEERING (code, not a paper)
Origin: Guardian PCN-20261128-0005, adjudicated ACCEPTED by the captain (PCN-0123) — the founder's standing order tonight is three active builders.

## The assignment
Your own QC tool (built by you, #134; run by the captain against the batch-1 films, 5/5) carries a known self-test defect on the captain's owed list. Fix it and ship **provadia_qc.py v2** as working source code with an executable test suite.

## Deliverables (all desk-filed)
1. **provadia_qc.py v2** — the complete tool source: Sound Gate measurement (mean/max volume vs the −30 dB floor), batch mode over a films directory, per-film PASS/FIX/FAIL verdicts, and the self-test defect repaired.
2. **The executable test suite** — tests the captain can run himself, covering: the self-test that failed, the volume-gate boundary (a −29.7 pass case and a −30.7 fix case, matching real flood measurements), batch mode over a mixed folder, and a missing-file case. Tests must run with the Python standard library only.
3. **A run receipt** — your own test run output, pasted into the delivery note. (The captain re-runs everything on arrival; your receipt is evidence, not certification.)

## Binding rules
- Standard library only · $0 · no deployment · no account sessions.
- The Sound Gate law is exact: mean under −30 dB = whisper, fixed copy via loudnorm I=-16, raw kept; the tool REPORTS and MARKS — it does not silently alter masters.
- Desk-file source + tests + receipt as separate plain files (zips do not reach you; plain files do).

## Deadline
**Sat 2026-11-28 19:30 CT** (the evening sweep), alongside your #141 draft. #140 (Register v1.1) keeps the Sat 10:10 CT checkpoint. The captain runs your tests against the real flood register on arrival and grades the result on the desk.
