# FOURTH RUN — verifier-v3.1: the six required fixes RF-1..RF-6

**Date:** 2026-11-26 (evening, CT) · **Seat:** verifier-v3.1 implementer (Muse) · **Fences held:** $0, offline, NONPRODUCTION test keys only, no schema-text edits, P1/P2 and all prior trees read-only.

**Deliverable:** `provadia-verifier-cli/verifier-v3_1.cjs` — 1,988 lines, sha256 `72cadc419c1a821b0282b8a2d6a5a71cc1d471e31c308aedb8ecece58ae5fcca`. It is verifier-v3 (1,442 lines) plus the six enforcements below; the scanners, keygen, attest and scan pipeline are byte-for-byte v3 behaviour (proven: the fixture scan under v3.1 reproduces v3's gates, findings summary and manifest digest `51399057…` exactly).

**Specification sources:** `economy/PDP_V1_CANONICAL_SCHEMA.md` (post-corrigendum; the file lives at `~/workspace/newwave/next-build/economy/`, sibling of this tree), `schema-v1/provadia.passport.v1.schema.json`, `schema-v1/VECTORS_RUN_REPORT.md` §6 (RF-1..RF-6 verbatim), and Gemini's schema-layer precision locks (landed 2026-11-26 21:38 CT), which this run folds in: exact-schema-in-pipeline, the six enumerated I4 carriers, detached-digest chain binding, STALE_POLICY windows on policy root **and** signer entry, and the T13 claims-grade headline.

**Preservation (acceptance 5):** sha256 snapshots of 380 files (CLI dir, schema-v1, hospital-specimen, runs 1–3) taken before and after — `preservation-before.txt` / `preservation-after.txt`. **Zero files changed, zero missing; the only addition inside the preserved trees is `verifier-v3_1.cjs` itself.** The historical delivery passport is untouched.

---

## 1. RF-by-RF evidence table

| Fix | Mechanism in v3.1 | Evidence (log) | Result |
|---|---|---|---|
| **RF-1** Policy anti-downgrade | `algRequirementGate` runs before any key lookup (policy-declared alg, default Ed25519); `policyRequirementGate` enforces policy-declared `requiredSchema` / `minimumPassportRevision` / `requiredSignatureScope` before trust resolution, in both the passport and PAE paths. Legacy scope outside a policy: refused (new exit 6) unless `--historical-inspection`. | L1a → exit 1, *"policy requires signature.scope "full-claims-v3"; document carries \<absent\>"* (`logs/v31-l1a.txt`); L1b/L1c → exit 1 at the structural const (the schema pins both fields; the policy gate stands behind it); legacy variant of the conforming rev-2 body: refused exit **6** · admitted under `--historical-inspection` exit 0 with HOLD banner · rejected exit 1 under the full-claims policy **even with** the historical flag (`verify-legacy-variant-*.txt`) | ✅ |
| **RF-2** Revision-chain binding | Schema if/then makes revision > 1 with `supersedes: null` a structural failure; with `--prior <file>`, `supersedes` must equal the prior revision's **detached digest** (SHA-256 of the canonical prior envelope with `signature.sig` emptied, §2.1 item 4) — mismatch is `SEMANTIC_INVARIANT_VIOLATION [RF2_CHAIN_BINDING]`, exit 4. Without `--prior`, the link is reported NOT CHECKED (grades UNVERIFIED), never silently passed. | L1d → exit 1 STRUCT (`$.supersedes: type — expected string\|integer, got null`, identical to validate.cjs); L1e + `--prior` → exit 4, supersedes `"pdp_schema_v1_synthetic_999"` ≠ detached digest `7984b01a…` (`logs/v31-l1e.txt`); L1e without `--prior` → exit 0 with the NOT-CHECKED note; rev-2 demonstration passport binds its chain (digest `c782125b…` of the delivery passport) | ✅ |
| **RF-3** Strict UTF-8 | Envelope (and policy, and `--prior`) bytes pass `TextDecoder('utf-8', {fatal:true})` before the strict parser; invalid sequences are MALFORMED exit 1 at the decode layer. Lone surrogates / duplicate keys / unsafe numbers remain refused by the strict parser (unchanged). | L2a → exit 1 at decode; L2b (escaped duplicate) → exit 1; L2c (float) → exit 1; L2d (JCS round-trip) and L2e (`sch\u0065ma` positive control) → exit 0, correctly accepted | ✅ |
| **RF-4** Complete I4 carrier set | The precedence block now evaluates exactly the six carriers — knownDefects · gatesFailed · `securityChecks[].result` FAIL · `gateVerdicts[].status` FAIL (status field only; free-text verdict never a carrier) · `vulnerabilityPolicy` FAIL · `finalRunTestsFailed > 0` — before any UNVERIFIED may issue. Success over a carrier fails; UNVERIFIED over a carrier fails; INCOMPLETE with zero carriers fails; UNVERIFIED with zero carriers **and** zero required items UNVERIFIED fails (`I4_UNVERIFIED_WITHOUT_BASIS`). C-2a headline/final-run equality is enforced semantically. | L4a (vuln FAIL, verdict UNVERIFIED) 0→**4**; L4d (finalRunTestsFailed 2, C-2a-consistent) 0→**4**; L4e (gateVerdict status FAIL, verdict text "STILL OPEN") 0→**4**; L4a2 (vuln FAIL + verdict PASS) stays 4; L4b stays 4; **L4c control stays 0** (zero carriers + UNVERIFIED items present); T5/T6 stay 4 | ✅ |
| **RF-5** Exact schema in-pipeline + typed evidence | The pipeline loads `schema-v1/provadia.passport.v1.schema.json` from disk and runs the **same subset engine as validate.cjs** immediately after strict decode + parse, before trust/signature/invariants; failures print as `STRUCT` lines, exit 1, distinctly from semantic exit 4. `sign-passport` refuses non-conforming bodies (exit 2). Evidence binding walks **every** typed evidenceRef (securityChecks, testSuites, historicalBaselineSuites, gateVerdicts, fixRounds, thirdPartyLicensesRef per §1.2, disclosureEvidence) plus artifacts (files by hash+size; directories by manifest digest+size) under safe-relative-path rules — nothing named is silently skipped. | P1 → exit 1 with **34 STRUCT errors**, first failure `$.securityAndLicense.securityChecks[0].evidenceRef: type` — **identical count and first failure to validate.cjs**; cross-engine agreement on all 22 passports checked (§4); sign-passport on the specimen body → exit 2 refusal (34 errors); T12 path-escape (`../escape.json`) → exit 1 STRUCT, first failure identical to validate.cjs | ✅ |
| **RF-6** STALE_POLICY + scan-dir binding | `resolveTrust` returns a new `STALE_POLICY` outcome: policy copy older than `freshnessLimitSeconds` (from `policyIssuedAtUtc`/`fetchedAtUtc`; `maxPolicyAge*` aliases accepted), or document `issuedAtUtc` outside the `[validFromUtc, validUntilUtc]` window of the policy root **or** its signer entry. Crypto is classified against the presented key (invalid → exit 1); valid → exit 3, *Signer Trust: STALE_POLICY — reliance capped at UNVERIFIED*. `--scan-dir` computes the tree's canonical manifest digest and requires it in `subject.artifacts[]` **before** any scanner runs — unbound tree → `CLAIM_EVIDENCE_MISMATCH` exit 5, recomputation refused. | T14 → exit **3** STALE (copy 28,525,661 s old vs 3,600 s limit); T17 → exit **3** STALE (issued after `validUntilUtc` 2026-06-01); rev-2 demonstration: *"scan-dir binding: tree canonical digest dc2021c6… is bound in subject.artifacts[] — recomputation authenticated"* then partition recomputed and matched (`verify-reissued-full.txt`) | ✅ |

**New outcome vocabulary:** exit 6 = LEGACY-SCOPE refusal; STALE_POLICY rides the UNVERIFIED_SIGNER exit class (3), per §2.6's "STALE_POLICY / UNVERIFIED_SIGNER class outcome". Passport verifications that reach the end now print the LOCK-3 axes orthogonally — Signer Trust · Envelope Validity · Claims Grade · Delivery Verdict (T13's headline requirement: with `--base-dir` pointing at an empty dir, *Claims Grade: UNVERIFIED (15 named evidence item(s) not held by this verifier)*, exit 0).

---

## 2. The 42 vectors under v3.1 (acceptance 1)

Runner: `runs/fourth-run/run-vectors.sh` (mirrors `schema-v1/run-v3-checks.sh` invocation-for-invocation; L1e additionally receives `--prior`, plus two extra rows P1-REQPOL and L1e-NOPRIOR). Logs: `runs/fourth-run/logs/v31-*.txt`; codes: `logs/v31-exit-codes.txt`.

| Vector | v3 | v3.1 | Status |
|---|---|---|---|
| P1 specimen passport | 0 | **1 STRUCT** | deliberate RF-5 (34 errors; §4 agreement) |
| P1 under full-claims policy | — | 1 STRUCT | structural layer fires first; the RF-1 scope gate independently rejects legacy scope (demonstrated on a conforming body by L1a + the legacy variant) |
| P2 v3-reissued body | 0 | **1 STRUCT** | deliberate RF-5 (same non-conforming body as P1) |
| P3 synthetic conforming | 0 | 0 | ✅ unchanged — and now **BOUND-VERIFIED** (all 15 evidence items re-derived under `--base-dir files`) |
| FG with diagnostic | 5 | 5 | ✅ unchanged |
| FG without diagnostic | 4 | 4 | ✅ unchanged |
| MUT-A..E (unsigned edits of P2 body) | 1 | 1 | ✅ same exit; layer changed (structural now precedes signature on a non-conforming body — the signature-layer form of the same tests runs on the conforming rev-2 body in §5, all exit 1 at the signature layer) |
| T1 dup-key PAE | 1 | 1 | ✅ |
| T2 substituted policy | 1 | 1 | ✅ |
| T3 revoked signer | 3 | 3 | ✅ |
| T4 unpinned keyId | 3 | 3 | ✅ |
| T5 PASS-AFTER-FIX + knownDefects | 4 | 4 | ✅ (carrier 1) |
| T6 PASS + gatesFailed | 4 | 4 | ✅ (carrier 2) |
| T7 rollup/C-2a mismatch | 4 | 4 | ✅ (I3 + C-2a semantic) |
| T8 gateVerdict status `""` | 0 | **1 STRUCT** | deliberate RF-5 (status enum — validate.cjs agrees, §4) |
| T9 invented securityCheck | 4 | 4 | ✅ |
| T10 gateVerdict/partition | 4 | 4 | ✅ |
| T11 tampered evidence dir | 5 | 5 | ✅ |
| T12 evidence path escape `../escape.json` | 0 | **1 STRUCT** | deliberate RF-5 (path pattern — validate.cjs agrees, §4) |
| T13 empty base-dir | 0 | 0 | ✅ + headline now surfaces **Claims Grade: UNVERIFIED (15 items not held)** (RF-6/LOCK 3) |
| T14 stale policy copy | 0 | **3 STALE_POLICY** | deliberate RF-6 |
| T15 invented gate | 4 | 4 | ✅ |
| T16 `quantum_deliverable` | 0 | **1 STRUCT** | deliberate RF-5 (artifactType enum — validate.cjs agrees) |
| T17 expired policy windows | 0 | **3 STALE_POLICY** | deliberate RF-6 |
| L1a scope omitted, full-claims policy | 1 | 1 | ✅ same exit; reason is now the RF-1 policy gate itself |
| L1b scope `"legacy"` | 1 | 1 | ✅ (structural const first; policy gate behind) |
| L1c alg Ed448 | 1 | 1 | ✅ (structural const first; RF-1 alg gate behind — no key lookup occurs either way) |
| L1d rev 2, supersedes null | 0 | **1 STRUCT** | deliberate RF-2/RF-5 |
| L1e rev 2, wrong supersedes (+`--prior`) | 0 | **4** | deliberate RF-2 |
| L1e without `--prior` | — | 0 | chain link reported NOT CHECKED / grades UNVERIFIED — never silently passed |
| L2a invalid UTF-8 | 1 | 1 | ✅ (decode layer) |
| L2b escaped duplicate key | 1 | 1 | ✅ |
| L2c float | 1 | 1 | ✅ |
| L2d JCS round-trip control | 0 | 0 | ✅ positive control, accepted |
| L2e escaped-key control | 0 | 0 | ✅ positive control, accepted |
| L4a vuln FAIL / UNVERIFIED verdict | 0 | **4** | deliberate RF-4 (carrier 5) |
| L4a2 vuln FAIL / PASS verdict | 4 | 4 | ✅ |
| L4b securityCheck FAIL / UNVERIFIED | 4 | 4 | ✅ (carrier 3) |
| L4c precedence control | 0 | 0 | ✅ control holds |
| L4d finalRunTestsFailed 2 / UNVERIFIED | 0 | **4** | deliberate RF-4 (carrier 6) |
| L4e gateVerdict status FAIL / UNVERIFIED | 0 | **4** | deliberate RF-4 (carrier 4) |

**Every v3→v3.1 change is one of the twelve deliberate RF changes named above (P1, P2, T8, T12, T16, L1d, L1e, L4a, L4d, L4e, T14, T17); there are no unexplained mismatches and nothing was tuned to reach them** — each falls out of the corrected schema/policy/carrier rules, and each structural one is independently confirmed by validate.cjs (§4).

---

## 3. Regression battery + N1–N16 (acceptance 2)

Runner: `runs/fourth-run/run-battery.sh` (the third-run battery re-pointed at v3.1; fixture copied from `runs/third-run/semantic-fixture/`). **All PAE-side checks are exit-identical to the third run:** attest/verify pinned 0 · unpinned 3 · no-policy 3/3 · tamper1 1 · tamper2 1 · genuine v2 envelope 0/0 · stored v2 tampers 1/1 · clean success claim 0 with diagnostic / 4 without · transcript binding 0 / wrong transcript 5 · duplicate key 1 · substituted key 1 · manifest reproducibility IDENTICAL. The scanner is untouched (same gates/findings/digest as v3).

| N | Third-run meaning | v3.1 outcome |
|---|---|---|
| N1 | FG fixture + diagnostic | **5** ✅ unchanged |
| N2 | FG fixture, no diagnostic | **4** ✅ unchanged (acceptance 4: fails closed both ways) |
| N3 / N4 | Genuine v2 envelope ± diagnostic | **0 / 0** ✅ |
| N5 | Stored v2 tampers | **1 / 1** ✅ |
| N6 / N7 | Truthful success ± bound evidence | **0 / 4** ✅ |
| N8 | Specimen + base-dir + scan-dir → 0 | **1 STRUCT** — deliberate RF-5; the semantics (all bindings re-derived, recomputation matching, UNVERIFIED standing) are re-proven on the conforming rev-2 body: `verify-reissued-full.txt`, exit 0, 26/26 evidence items re-derived |
| N9 | Legacy descriptive alteration still verifies (claims unbound) | On the specimen copy: **1 STRUCT** (deliberate RF-5 precedence). The N9 semantics are re-proven on the conforming legacy variant: tampered + `--historical-inspection` → **0 admitted with the HOLD banner** — the legacy signature demonstrably does not bind the altered name (`verify-legacy-variant-tampered-historical.txt`) |
| N10 | Re-issuance under full-claims verifies, UNVERIFIED stands | The third run's re-issued file (non-conforming body) → **1 STRUCT** (deliberate). Its corrected successor — rev-2, §5 — verifies **0**, FULL-CLAIMS-V3, verdict UNVERIFIED standing |
| N11 | Descriptive alteration on the re-issued passport → 1 | **1** ✅ — on the rev-2 body it fails at the **signature layer** (`verify-rev2-desc-altered.txt`), the strongest form |
| N12 | Duplicate key | **1** ✅ |
| N13 | Substituted key | **1** ✅ |
| N14 | Transcript binding right/wrong | **0 / 5** ✅ |
| N15 | FG + diagnostic, no policy | **3** ✅ (trust precedes semantics — order preserved) |
| N16 | Legacy backward date move → I8 exit 4 | On the specimen copy: **1 STRUCT** (deliberate precedence). I8 itself is unchanged in code and re-demonstrated on a conforming, validly signed body: backdated rev-2 variant → **4 [I8_CLOCK_ORDER]** (`verify-rev2-backdated.txt`) |

Passport-side battery deltas, all deliberate: `verify-passport-legacy` 0→1 STRUCT · `verify-passport-legacy-historical` → 1 STRUCT (structural precedence over scope handling is deliberate: a non-conforming body is not rescued by the historical mode) · `sign-passport-reissue` on the specimen body 0→**2 refusal** (RF-5: never mint what the verifier would refuse).

---

## 4. Cross-engine structural agreement (RF-5's "single source of truth", verified)

`validate.cjs` was run over 22 passport files (`logs/validate-crosscheck.txt` + §1 rows). On **every** file the two engines agree on VALID/INVALID, and on every structural failure the **first failure (path + rule) is identical**: P1 `$.securityAndLicense.securityChecks[0].evidenceRef: type` (34 errors both) · T8 `$.verification.gateVerdicts[0].status: enum` · T12 `$.securityAndLicense.securityChecks[0].evidenceRef.path: pattern` · T16 `$.subject.artifactType: enum` · L1d `$.supersedes: type`. Policy-gate agreement under the full-claims policy also holds: L1a (validate.cjs first failure `$.signature.scope: policy:requiredSignatureScope`; v3.1 rejects at the same gate), L1b/L1c (structural const first in both). The demonstration passport is VALID under both layers (§5). Structural coverage statement, exactly: v3.1's in-pipeline stage is the schema JSON itself, evaluated by the same subset engine as validate.cjs — no parallel subset is maintained. Cross-field rules the schema cannot express (C-2a equalities, rollup arithmetic, precedence) remain in the semantic layer by design and are reported as exit 4, never as STRUCT.

---

## 5. Re-issuance demonstration (acceptance 3)

Builder: `runs/fourth-run/build-reissue.cjs` (transforms the revision-1 body read-only; every digest recomputed from the live files). Signed: `verifier-v3_1.cjs sign-passport` with the pinned NONPRODUCTION test key (`keys-pinned`, keyId `c025de7a3a657887`). Product: **`runs/fourth-run/passport-v31-reissued.pae.json`** — passportId `pdp_hospital_specimen_2026_11_27_r1`, **revision 2**, `supersedes` = detached digest of revision 1 (`c782125bc1602356b8c0d0ab40c8f69302988409beb3e724f05d30608acf9f69`).

Corrected shape, and only this: full-claims-v3 signature · every evidenceRef typed `{path, sha256, bytes}` (paths relative to the specimen root, so `work/diagnostic-repaired.json` binds alongside `delivery/…`) · thirdPartyLicensesRef in the §1.2 typed form · gateVerdicts C1–C5 gain `status: "PASS"` (their verdict FIXED-AND-RETESTED stands) · C-2a segregation — final run 11/0/0 (`defect-tests@repaired` 6/0, `verifier-v2-gates@repaired` 4/0, `export-round-trip@seed-data` 1/0), the frozen-original baseline (1/5) quarantined in `historicalBaselineSuites[]` (the baselineSuite $def admits exactly four fields; its environment note remains in revision 1 and the transcript) · `unverifiedGates: []` present · a fourth artifact binds the repaired **tree** (role `repaired-tree`, digest `dc2021c63eb50d69ab8046b24382effa9f8a6baa18317339c6b9218b9cf63592` — the verifier's own walk **agrees** with the hospital-recorded manifest digest) · disclosureEvidence typed to `delivery/ACCEPTANCE.md`.

Verification (`verify-reissued-full.txt`), one run with `--pinned` + `--base-dir hospital-specimen` + `--scan-dir …/patient-repaired` + `--prior` (the delivery passport):

- structural VALID in-pipeline **and** `validate.cjs` VALID on the signed file (`validate-reissued.txt`, exit 0) — both layers identical;
- signer TRUSTED, FULL-CLAIMS-V3 signature valid; **revision chain binds** (RF-2);
- **26/26 evidence items re-derived** (4 artifacts incl. the tree, 6 securityChecks, licenses ref, 3 final suites, 1 baseline suite, 5 gateVerdicts, 5 fixRounds, disclosure) — Claims Grade **BOUND-VERIFIED**;
- scan-dir digest bound **before** recomputation; derived partition matches the claimed partition;
- **Delivery Verdict: UNVERIFIED — standing honestly.** The invariant notes name why: vulnerabilityPolicy UNVERIFIED + VULNERABILITY_CVE UNVERIFIED + reproducibleRebuild UNVERIFIED (I2 — the CVE leg was never exercised), and examiner family independence not established inside the record (I6). A re-issuance corrects the *shape*; it does not manufacture the missing evidence, and the unexercised live legs are unchanged.
- Also: verifies **0 under the full-claims policy** (RF-1 satisfied, not merely unopposed) and **3 under an unpinned policy** (trust semantics intact on a conforming body).
- Mutations (a)–(e) on the rev-2 body (issuedAtUtc, scope statement, examiner seatId, a typed evidence digest, verdict swap) — **all exit 1 at the signature layer** (`verify-rev2-mutation-*.txt`).

The historical delivery passport stays untouched (preservation proof, header).

---

## 6. Findings (reported, never edited away)

1. **Supersedes binding-form divergence.** This run implements the detached-digest form (Gemini's lock text for v3.1 + §2.1 item 4). `validate.cjs`'s policy gate instead compares `supersedes` to the prior revision's **passportId**, and §1's field description admits a "prior passportId or revision identifier". L1e rejects under both forms (its value is neither), and the rev-2 demonstration follows the lock text — but one `supersedes` value cannot satisfy both forms at once. The schema owner should pin one form in the canonical text; until then the divergence is on record here, not silently resolved.
2. **§1 vs §1.2 licenses-ref form.** §1's example block retains the retired `{fileName, sha256}` form; §1.2 and the schema JSON require `{path, sha256, bytes}`. v3.1 follows §1.2/the schema (per the 21:38 CT precision check; the captain is aligning §1 separately). Not edited here.
3. **L2d/L2e are positive controls** (JCS round-trip; escaped-key equivalence) — accepted by v3 and v3.1 alike, exit 0. Recorded so the pair is never misread as missed rejections.
4. **Historical mode is a reading mode, not a reliance mode.** On a conforming body it admits even a descriptively tampered legacy passport (exit 0) — by design: the legacy signature never bound those claims (the N9 finding), and the protection is the HOLD banner + consumer gates, which the output prints on every legacy admission. Any consumer that treats exit 0 under `--historical-inspection` as reliance has misread the mode; the default path refuses legacy scope outright (exit 6).

## 7. Honest limits

- STALE_POLICY freshness is evaluated against verification time; T14's recorded age (28,525,661 s) grows with the clock — the outcome class is stable, the number is not.
- The structural stage loads the schema from `../schema-v1/` relative to the CLI (override `--schema`); a v3.1 binary copied away from the tree refuses to verify passports rather than skip the stage (fail-closed, exit 1 with the reason printed).
- RF-2 binding is checked only when `--prior` is supplied; otherwise the link is reported NOT CHECKED. Making the prior mandatory for revision > 1 is a policy decision for the captain, not taken unilaterally here.
- PAE envelopes are gated by alg + policy requirement fields but have no passport structural schema (none exists); their invariant layer is v3's, unchanged.
- The ownership defect (Lane 4) stays registered for the next specimen revision's runtime probes — untouched by this run, per LOCK 5.

## 8. Files of this run

`provadia-verifier-cli/verifier-v3_1.cjs` (the deliverable) · `runs/fourth-run/run-vectors.sh` + `logs/` (42 vectors + 2 extra rows, per-vector logs, exit-code table, validate.cjs crosscheck) · `runs/fourth-run/run-battery.sh` + per-check transcripts · `runs/fourth-run/build-reissue.cjs`, `make-legacy-variant.cjs`, `run-reissue-checks.sh` · `runs/fourth-run/passport-v31-reissued.pae.json` (the corrected revision-2 demonstration; unsigned body + legacy variant + mutations under `fixtures/`) · `preservation-before.txt` / `preservation-after.txt` · this report.
