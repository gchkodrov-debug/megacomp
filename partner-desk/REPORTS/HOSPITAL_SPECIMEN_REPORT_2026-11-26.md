# HOSPITAL SPECIMEN REPORT — Lane 4, First Isolated Specimen (FVR-34, Guardian Sequence Step 3)

**Run:** 2026-11-27 (UTC), local sandbox only · $0 · no network · no installs · synthetic everything
**Specimen:** "Lantern Cart" — a synthetic Next.js/React + Postgres/Supabase-style starter (16 files, ~280 LOC)
**Workspace:** `provadia-economy-v1/hospital-specimen/` — the frozen original is `patient/`, the repair is `patient-repaired/`, the delivery is `delivery/`

## Outcome, plainly

**The Hospital loop ran end-to-end: intake → blind diagnostic → repair → regression → verified delivery → blind grade. The diagnostic found all 5 seeded defects (recall 5/5), claimed nothing false (precision 5/5), and all 5 grade FIXED after repair, none REGRESSED, none MISSED. The delivery's PDP-v1 passport verifies as VALID against the independently held pinned policy.**

**The specimen does NOT claim an unqualified PASS.** Three acceptance legs were not run — the live app-start leg (AT-4), the live database restore leg (AT-6), and the physical-device leg (AT-9) — because this sandbox forbids installs and has no database server or device. The passport's own verdict is **UNVERIFIED**, capped by its disclosed reasons (no CVE data source exists here, and this run's seats were one agent in separated roles, so family-level examiner independence is not claimed). A bounded success with named open legs — reported as exactly that.

## Seat disclosure (read first)

Per the assignment, all seats were performed by **one agent** (Muse subagent) in separated roles, in sequence, with the sealing rule enforced procedurally: the diagnostic and repair stages were executed and written **before** `sealed/DEFECT_MANIFEST.md` was opened, and the diagnostic report rests only on scanner output and code evidence. Roles: `seat:hospital-builder-01` · `seat:hospital-diagnostician-01` · `seat:hospital-repairer-01` · `seat:hospital-regression-01` · `seat:hospital-blind-verifier-01`. This is weaker than the Relay Law's multi-seat ideal; the passport records it as a limitation (invariant I6 graded REJECTED in the verification output, kept on record), and family-level independence belongs to the outer relay (captain + partners), not to this report.

## Pipeline record

| Stage | What happened | Evidence |
|---|---|---|
| 1 Intake | Specimen built with exactly the 5 seeded defects of SPEC_LANE4 §1.2; defect manifest sealed; original frozen — tree manifest SHA-256 `a5e46294…` (16 files, 9,858 B). One builder incident (below) was caught and corrected **before** the freeze. | `work/intake-tree.json` · `sealed/DEFECT_MANIFEST.md` |
| 2 Diagnostic (blind) | verifier-v2 scan: **4 CRITICAL** (leaked-key pattern ×2 locations, unauthenticated mutation route, RLS not enabled) + **2 HIGH** (unpinned deps ×2); gates SECRET_SCAN / RLS_GUARD / SBOM_LITE_HYGIENE = FAIL, MANIFEST_REPRODUCIBILITY = PASS and equal to the intake hash. Manual read added the checkout state-machine defect and the react/react-dom mismatch; two scanner MEDIUMs were evaluated and **dismissed with reasons** (placeholder values; the entropy heuristic fires on whole `NAME=value` lines). 5 claims: C1–C5. | `work/DIAGNOSTIC_REPORT.md` · `work/diagnostic-patient.json` |
| 3 Repair | All 5 claims fixed in a copy, each fix discrete and diff-attributable; nothing outside the claim set touched; nothing carried forward unfixed. | `work/FIX_NOTES.md` · `work/source-diff.txt` |
| 4 Regression + delivery | verifier-v2 on the repaired tree: **all 4 gates PASS, 0 critical / 0 high** (the same 2 pre-evaluated MEDIUMs persist, unchanged). Defect tests: **T1–T5 FAIL on the frozen original, all 6 tests PASS on the repaired tree**, baseline T6 passes on both. Delivery assembled; PDP-v1 passport signed with the prototype's NONPRODUCTION test key; unaided verification: **signature VALID** under the pinned policy, all payload digests re-derived and matching. | `work/diagnostic-repaired.json` · `delivery/transcript.txt` · `delivery/passport.pae.json` · `work/passport-verify.txt` |
| 5 Blind grade | Sealed manifest opened for the first time; graded below. Frozen original re-hashed at grade time: **still `a5e46294…`** — untouched (AT-1). | this report |

**Builder incident (recorded, not hidden):** the first build's planted key literal was silently replaced by the tooling layer's secret-redaction (`<MASKED_SECRET_003>`) in the written files, so the first scan saw a mangled specimen. The builder detected it (pattern test failed on the file bytes), rebuilt the literal programmatically, re-froze, and only then diagnosed. The mangled-tree artifacts are preserved in `work/builder-incident/`. The specimen that was diagnosed, repaired, and graded is the corrected one.

**Harness incident (recorded):** the defect suite's first run failed T5/T6 on *both* trees with a JSON parse error — a trailing-comma bug in the test's own TRANSITIONS parser. The harness was fixed (specimens untouched) and re-run; both runs are preserved in the test logs.

## Blind grade (against the unsealed manifest)

| Seeded | Diagnostic claim | Grade | Basis |
|---|---|---|---|
| D1 leaked .env secret in client bundle | C1 | **FIXED** | Literal absent from the whole repaired tree (T1); scanner SECRET_SCAN passes; env renamed server-only; chunk rebuilt clean |
| D2 unauthenticated mutation route | C2 | **FIXED** | Awaited session check + 401 before insert; owner from session (T2); scanner auth rule silent |
| D3 missing table RLS policy | C3 | **FIXED** | Migration 0002 enables RLS on `orders` + owner-scoped policies (T3); scanner RLS rule silent |
| D4 unpinned dependency conflict | C4 | **FIXED** | No floating spec remains; react/react-dom majors aligned (T4); SBOM_LITE_HYGIENE passes |
| D5 broken checkout state transition | C5 | **FIXED** | Table forbids cart→paid and paid→paid; `paid` receipt-gated from pending only; confirmation idempotent; legal path intact (T5 + T6) |

- **Recall: 5/5 (100%)** — every seeded defect was found blind (D5 and D4's mismatch by manual read; the rest scanner + manual).
- **Precision: 5/5 (100%)** — every claim was real; no claim touched a known-good control (K1–K6); the two dismissed entropy observations were correctly not claimed.
- **REGRESSED: 0 · MISSED: 0.** Newly introduced security/license flaws in the repaired tree: **0** (repaired scan: 0 critical / 0 high; the 2 MEDIUMs pre-date the repair with identical values; dependency set unchanged in kind, copyleft violations 0).

## Acceptance tests (SPEC_LANE4 §5)

| Test | Result |
|---|---|
| AT-1 freeze integrity | **PASS** — grade-time hash equals intake hash |
| AT-2 blind gate | **PASS** — all 5 FIXED, none REGRESSED; recall/precision above, recorded in the passport's evidence chain |
| AT-3 defect tests | **PASS** — every defect test fails on the original, passes on the repaired tree |
| AT-4 clean start + no regressions | **PARTIAL** — suite runs green against the delivered tree copy (hash-verified identical to the examined tree) and baseline tests pass; the live "app starts by its README" leg was **not run** (no install/runtime under the fences) |
| AT-5 security re-check | **PASS** — D1/D2/D3/D5 proofs re-run on the repaired tree (scanner + T1/T2/T3/T5), none reproduce |
| AT-6 restore + export | **PARTIAL** — export produced and round-trip-verified (seed data, deep-equal); the live Postgres backup/restore leg was **not run** (no database server exists in this sandbox) |
| AT-7 evidence checkable unaided | **PASS** — passport verified end-to-end by script against the independently held pinned policy: VALID; one invariant (I6, family independence) graded REJECTED and kept on record, as the passport itself discloses |
| AT-8 customer-readable acceptance | **PASS** — `delivery/ACCEPTANCE.md`: plain language, names the limits, no guarantee/certification claims |
| AT-9 accessible demo path | **NOT RUN** — no physical device available to this seat |
| AT-10 time-log completeness | **PASS** — per-stage log below, booked against the internal tariff lines |

## Time log + priced-as-if record (internal rates, SPEC_LANE4 §3 — INTERNAL ONLY)

Wall-clock UTC, single agent executing tool calls (seat-minutes here are agent execution minutes, **not** human engineering hours — the margin arithmetic below validates the accounting mechanism, not a human delivery margin).

| Stage | Window (UTC) | Minutes | Booked against | Internal rate |
|---|---|---|---|---|
| 1 Build + intake (incl. incident + rebuild) | 02:45:12 → 02:47:01 | ~1.8 | — (specimen prep) | — |
| 2 Diagnostic | 02:47:01 → 02:47:29 | ~0.5 | Tier-1 Diagnostic | $249 |
| 3 Repair | 02:47:29 → 02:48:06 | ~0.6 | Tier-2 Bounded Repair | $699 |
| 4 Regression + delivery | 02:48:06 → 02:50:47 | ~2.7 | Completion (low end) | $500 |
| 5 Blind grade + this report | 02:50:47 → 02:51:24 | ~0.6 | Completion (same line) | — |
| **Total** | | **~6.2** | **Priced-as-if booked** | **$1,448** |

Production-prep line ($1,000–$5,000+): not exercised — no production exists.

**Phase C kill rules, evaluated:** (i) stack/LOC — TypeScript/JavaScript + Supabase-style, ~280 LOC ≤ 50,000: **not triggered**. (ii) repair requiring architectural rewrite — repairs were stabilization only: **not triggered**. (iii) contribution margin below the 55% floor — at the logged time, cost sits far below the 45%-of-price ceiling ($651.60 of $1,448) under any plausible internal seat rate: **not triggered on the run's own numbers**; the human-hours margin remains UNVERIFIED (no human delivery has occurred) and is not claimed.

## The delivery (in `delivery/`)

Repaired tree (`patient-repaired/`, manifest `dc2021c6…`) · source diff · Diagnostic Report · Fix Notes · defect suite + both run logs · full transcript · SBOM_LITE inventory + third-party license list · plain-language acceptance document · **PDP-v1 passport** (`passport.pae.json` + generated human rendering `passport.md`), signed under the pinned NONPRODUCTION test key (keyId `c025de7a3a657887`).

Passport headline facts: intake hash in `origin.inputs[0]` · the defect list (C1–C5) in place of gate verdicts, all FIXED-AND-RETESTED · internal tariff class recorded as internal-only · `knownDefects: []` · **verdict UNVERIFIED** — capped, per invariant I2, by the honestly UNVERIFIED vulnerability policy, with the single-agent I6 limitation disclosed in the same field block. The passport refuses to overclaim; that refusal is part of what this specimen was built to prove.

## Honest limits of this run

- **Code-level evidence only.** Nothing was installed, booted, or run against a database. The defect tests read source and simulate the declared transition table; they do not execute the app. (The suite says so on its face.)
- **One agent, five chairs.** Role separation was procedural (seal respected in execution order), not organizational. The diagnostic's perfection (5/5, 5/5) should be read with that in mind: the diagnostician and the specimen's author were the same underlying agent on the same day, and a genuinely independent diagnostician might do worse — or find more.
- **Scanner class limits carry over** from verifier-v2's own record: token/order analysis, not a control-flow graph; SBOM_LITE is not an SBOM; MANIFEST_REPRODUCIBILITY is not a build.
- **The specimen is small** (~280 LOC, one of everything). It proves the loop and the evidence machinery at specimen scale; it says nothing about performance on a real 50,000-LOC intake — which is precisely what Phase C's gates exist to test later, behind founder clearance that has not been given.

*End of report. Guardian sequence: step 3 (Hospital specimen) is complete with the outcome stated above; step 4's independent verification belongs to seats outside this run.*
