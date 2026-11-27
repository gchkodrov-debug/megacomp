# RUN REPORT — Verifier v3: Semantic Invariant Enforcement + Full-Claims Signing Scope

**Build:** Fix pass for the confirmed semantic defect (KD-002) on the FVR-34 $0 Diagnostic & Provenance Reference Prototype, incorporating the Guardian's critic recheck (signing scope) and Gemini's byte-level examination sharpenings (precedence rule · deterministic gate recomputation · negative mutation list)
**Date:** 2026-11-26 (run executed 2026-11-27T03:06–03:20Z)
**Location:** `~/workspace/newwave/next-build/provadia-economy-v1/` (hard isolation respected — nothing outside this directory was written)
**Cost:** $0 · zero npm installs · Node.js built-ins only · no network calls · no real secrets anywhere (all fixture keys are synthetic and contain the literal word FAKE)

---

## Verdict

**Every battery expectation was met.** The v2 regression battery re-run under v3 stays **10/10**. The Guardian-required semantic-rejection fixture — a validly signed envelope from the pinned key whose gate claims are *false* — now **fails closed in both presentations**: with its bound diagnostic supplied, `CLAIM_EVIDENCE_MISMATCH` (exit 5), naming the contradicting gates; without it, `SEMANTIC_INVARIANT_VIOLATION` (exit 4). The genuine envelope the fixture was forked from still verifies **PASS** — v3 tells the truthful envelope from the lying one, which v2 could not. The Hospital specimen passport verifies **exactly as the blind verifier found it** (signature VALID, verdict UNVERIFIED consistent), is reported in plain words as **LEGACY-SCOPE (claims unbound)**, and its **re-issuance under the v3 full-claims scope is demonstrated**: the re-issued passport verifies fully claim-bound with its honest UNVERIFIED verdict standing. All five of Gemini's negative mutations on the v3-signed passport return **INVALID** without re-signing.

v1 and v2 are preserved untouched: `verifier.cjs` (sha256 `840cf9af…`), `verifier-v2.cjs` (sha256 `e88fb574…`), `pae-inspector.html`, the CLI README, all fixture trees, the hospital specimen, and both earlier run directories were sha256-checked before and after this pass — **162 files compared, none changed** (`preservation-before.txt` / `preservation-after.txt`).

## What was built / changed

| Piece | Path |
|---|---|
| Semantic verifier + full-claims issuance (v3; v1/v2 untouched) | `provadia-verifier-cli/verifier-v3.cjs` (sha256 `b49e5f9b…`) |
| Regression + new-test battery driver (re-runnable) | `runs/third-run/run-battery.sh` |
| Negative mutation battery driver (Gemini's list + legacy pair) | `runs/third-run/run-mutations.sh` |
| Run evidence (diagnostics, signed envelopes, re-issued passport, mutation copies, verify outputs with exit codes, transcripts, preservation snapshots) | `runs/third-run/` |

## The fix, in brief

1. **Strict parse (PDP-v1 §2.1).** Verify parses claims objects with a hand-rolled recursive-descent parser that **refuses duplicate object keys at any depth** (JSON.parse silently keeps the last — §2.6 T1), lone surrogates, and non-integer / unsafe-range numbers. A duplicate-key payload is `MALFORMED` (exit 1) before any signature work (battery N12).
2. **Pinned trust resolution (§2.3 step 2, tightened vs v2).** The verification key is resolved **from the pinned policy by keyId**; the envelope-supplied `publicKey` is never the verification key and never a fallback. Envelope key ≠ pinned key for its keyId ⇒ `INVALID` (substituted envelope, T2 — battery N13, via a doctored policy). Unpinned keyId with valid cryptography ⇒ `UNVERIFIED_SIGNER` (exit 3). Every run prints its trust result **and the policy version used**.
3. **Standalone envelope invariants (§2.4 I1–I8 as applicable).** Fail closed as `SEMANTIC_INVARIANT_VIOLATION` (exit 4): success verdict (explicit, or — for PAE envelopes — a complete success gate partition) while `gatesFailed` / `unverifiedGates` / `knownDefects` are non-empty; required profile gates missing, duplicated, in both lists, or outside the profile's gate set; rollups disagreeing with detail arrays (I3, D7); `PASS-AFTER-FIX` without `fixRounds[]` bound to defectIds with independent-retest PASS (I1/I7); verdict outside the enum; examiner-is-producer (I6); clock order (I8).
4. **The success-claim rule (I1/I4).** A complete success partition is a claim the verifier must be able to **derive** from bound evidence, never merely read as asserted. Presented **without** its bound diagnostic, a success claim fails closed (`I1_I4_SUCCESS_CLAIM_WITHOUT_BOUND_EVIDENCE`): the required gate evidence is unknown to the verifier. A **failure attestation** (gatesFailed non-empty) makes no success claim and is not fired on — the asymmetry is the fail-closed direction: success requires evidence; admitting failure gains a liar nothing. This rule fires on a *truthful* all-pass envelope presented without evidence too (battery N7) — it is about provability, not suspicion.
5. **Bound evidence cross-check.** With `--diagnostic`, the file's SHA-256 is recomputed against the envelope's declared subject hash, and the diagnostic's **actual gate statuses**, SBOM-lite digest and manifest reference are compared against the envelope's summary claims — any contradiction is `CLAIM_EVIDENCE_MISMATCH` (exit 5), naming the gate. `--transcript` likewise binds `testTranscriptSha256` (right transcript passes; wrong transcript mismatches, battery N14). Deliberate reclassification vs v2: a subject-hash mismatch is now named `CLAIM_EVIDENCE_MISMATCH` rather than folded into `INVALID` — the envelope may be authentic while its evidence binding is false.
6. **Precedence rule (I4 determinism; Gemini sharpening).** **Failure dominates missing evidence.** Encoded in the passport verdict logic: where an unambiguous failure carrier stands — an open `knownDefects[]` entry, a gate in `gatesFailed`, a `securityCheck` at FAIL, a `gateVerdict` at FAIL — a claimed `UNVERIFIED` verdict is internally false (`I4_PRECEDENCE_FAILURE_DOMINATES`); `INCOMPLETE` is the only issuable non-success verdict over a failure. `UNVERIFIED` issues only when failures are zero **and** required evidence is UNVERIFIED/missing — against the specimen passport (zero failure carriers; vulnerability evidence UNVERIFIED) the rule records the cap as *consistent*, which is the behavior the blind verifier graded.
7. **Deterministic gate recomputation (Gemini sharpening).** The validator never takes an envelope's summary on trust. For PAE envelopes the partition is recomputed from the digest-bound diagnostic (item 5). For passports, `--scan-dir` **re-runs the scanner over the delivered tree inside the verify run** and compares the derived partition against the passport's claims: on the specimen, v3's own scan of `hospital-specimen/delivery/patient-repaired` derives `gatesPassed=[MANIFEST_REPRODUCIBILITY, RLS_GUARD, SBOM_LITE_HYGIENE, SECRET_SCAN], gatesFailed=[]` — **exactly the passport's claimed partition**.
8. **Full-claims signing scope (Guardian recheck; Gemini formulation).** The legacy PDP-v1 SignedManifest bound only three payload digests + identity fields — descriptive fields, dates and other claims were unauthenticated. v3 issuance (`attest`, and the new `sign-passport` for passports) signs the **JCS-canonical bytes of the complete authoritative-claims object: the entire document with only `signature.sig` removed** — the signature group's identity fields (alg, keyId, publicKey, keyLabel, scope) are themselves inside the signed bytes; only the signature value cannot sign itself; payload digests stay non-circular; any whole-envelope digest stays detached. Envelopes carry `signature.scope: "full-claims-v3"` so the scope is selected from the document itself. PAE v1/v2 envelopes were signed whole-envelope-minus-signature-group (every claim already bound) and verify under that legacy form, reported as such.

## Battery results — v2 regression (re-run under v3)

| # | Test | Expected | Actual |
|---|------|----------|--------|
| 1 | v3 scan `fixture/` | 3C · 2H · 1M; SECRET/RLS/SBOM_LITE fail, MANIFEST_REPRODUCIBILITY pass; manifest `51399057…` | ✅ exactly that — manifest identical to the v1/v2 runs over the untouched tree |
| 1b | v3 scan `fixture/` repeated | Manifest identical across runs | ✅ identical (`manifest-reproducibility.txt`) |
| 2 | v3 scan `fixture-clean/` | 0 findings, all gates pass | ✅ 0 findings |
| 3 | v3 scan `fixture-regression-comments/` | Same ground truth as `fixture/` despite decoy comments | ✅ 3C · 2H · 1M |
| 4 | **v1** scan `fixture-regression-comments/` (control) | v1 fooled: D3 + D4 missed, RLS_GUARD falsely passes | ✅ fooled exactly as recorded — 1 CRITICAL only, `RLS_GUARD=pass` |
| 5 | v3 scan `fixture-negative/` | Exactly 3 CRITICAL: NOT_AWAITED, AFTER_MUTATION, PERMISSIVE_USING_TRUE; controls silent | ✅ exactly 3, correct rules |
| 6 | Pinned signer: attest + verify with policy (+ diagnostic) | PASS, exit 0 | ✅ PASS (keyId `c025de7a…`) — the envelope still honestly attests a FAILING artifact (3 gates failed, recorded, cross-checked, not laundered) |
| 7 | Unpinned signer: attest (second key) + verify with policy | UNVERIFIED_SIGNER, exit 3 | ✅ exit 3 |
| 8 | Unpinned envelope, no policy · pinned envelope, no policy | UNVERIFIED_SIGNER, exit 3 (no policy → no trust) | ✅ both exit 3 |
| 9 | Tamper 1: one character in `issuedAtUtc` of the pinned envelope | INVALID, exit 1 | ✅ FAIL (INVALID) |
| 10 | Tamper 2: gates forged to all-passed on the pinned envelope (unsigned edit) | INVALID, exit 1 | ✅ FAIL (INVALID) — the unsigned forgery is still defeated by the signature, as in v2 |

## Battery results — new v3 tests

| # | Test | Expected | Actual |
|---|------|----------|--------|
| N1 | Semantic-rejection fixture **with** diagnostic + policy | FAIL — CLAIM_EVIDENCE_MISMATCH (5) | ✅ exit 5; contradicting gates named: SECRET_SCAN, RLS_GUARD, SBOM_LITE_HYGIENE (subject hash itself is genuine — the lie is in the claims, and it is caught in the claims) |
| N2 | Semantic-rejection fixture **without** diagnostic | FAIL — SEMANTIC_INVARIANT_VIOLATION (4) | ✅ exit 4 via `I1_I4_SUCCESS_CLAIM_WITHOUT_BOUND_EVIDENCE` — see the honest analysis below |
| N3 | The genuine `pae-v2.json` (the envelope the fixture was forked from) with diagnostic, under v3 | PASS, exit 0 | ✅ PASS — v3 distinguishes the truthful envelope from the lying one; v2 returned PASS for both |
| N4 | Genuine `pae-v2.json` without diagnostic | PASS, exit 0 (failure attestation) | ✅ PASS |
| N5 | Stored v2 tampered envelopes (`pae-v2-tampered`, `pae-v2-tampered-gates`) under v3 | INVALID, exit 1 | ✅ both exit 1 — the v1/v2 whole-envelope scope is still enforced |
| N6 | Truthful all-pass envelope (clean fixture) **with** bound diagnostic | PASS, exit 0 | ✅ PASS — success claim derived from evidence |
| N7 | The same truthful all-pass envelope **without** diagnostic | FAIL — SEMANTIC_INVARIANT_VIOLATION (4) | ✅ exit 4 — the success-claim rule fires on a truthful envelope too: unprovable success does not stand |
| N8 | Specimen passport + policy + `--base-dir` + `--scan-dir` | VALID signature (LEGACY-SCOPE), invariants consistent, verdict UNVERIFIED stands | ✅ exit 0 — all six evidence bindings re-derived OK; gate recomputation matches the claimed partition; I2/I6 caps recorded as consistent observations |
| N9 | Legacy passport, ONE descriptive character altered (`subject.artifactName`) | Signature still VALID — the Guardian finding, demonstrated | ✅ exit 0, reported **LEGACY-SCOPE (claims unbound)** — the altered name is *not* authenticated and v3 says so in the output |
| N10 | **Re-issuance**: specimen passport content re-signed under v3 scope (`sign-passport`, pinned prototype test key) | Verifies fully claim-bound; honest UNVERIFIED verdict stands | ✅ exit 0 — `FULL-CLAIMS-V3`; invariants consistent; recomputation matches; verdict UNVERIFIED stands (file: `passport-v3-reissued.pae.json`) |
| N11 | The identical descriptive alteration on the **re-issued** passport | INVALID, exit 1 | ✅ FAIL (INVALID) — the claim is now inside the signature |
| N12 | Duplicate-key payload (§2.6 T1) | MALFORMED, exit 1, before signature checks | ✅ strict parse refuses the second `gatesFailed` key |
| N13 | Substituted key vs policy (§2.6 T2, doctored policy pinning a different key under the pinned keyId) | INVALID, exit 1 | ✅ FAIL (INVALID) — envelope key ≠ pinned key for its keyId |
| N14 | Transcript binding: correct transcript · wrong transcript | PASS · CLAIM_EVIDENCE_MISMATCH (5) | ✅ exit 0 · exit 5 |
| N15 | Semantic fixture with diagnostic but **no policy** | UNVERIFIED_SIGNER, exit 3 (trust precedes semantics) | ✅ exit 3 — pipeline order documented by result |
| N16 | Legacy passport, backward date move (supplementary) | Caught despite the unbound field | ✅ exit 4 — the **I8 clock invariant** fires (the moved `issuedAtUtc` now precedes a seat's `endedUtc`): the invariant layer has teeth beyond the signature, recorded as observed layer interaction |

## Negative mutation tests (Gemini's list — on the v3-signed re-issued passport, no re-signing)

| Case | Mutation | Expected | Actual |
|---|------|----------|--------|
| (a) | `issuedAtUtc` — one character | INVALID | ✅ exit 1 (signature) |
| (b) | `scope.scopeStatement` — one character | INVALID | ✅ exit 1 (signature) |
| (c) | `origin.examiner.seatId` — one character | INVALID | ✅ exit 1 (signature) |
| (d) | `securityChecks[0].evidenceRef` — one hex character in the recorded digest | INVALID | ✅ exit 1 (signature) |
| (e) | `verification.verdict` UNVERIFIED → INCOMPLETE (in-enum, internally plausible — only the signature can catch it) | INVALID | ✅ exit 1 (signature) |

## The specimen passport, stated plainly (scope-addition requirement)

The existing specimen passport (`hospital-specimen/delivery/passport.pae.json`) was signed under the **LEGACY three-digest scope**. Under the v3 contract it verifies as **LEGACY-SCOPE (claims unbound), NOT as fully claim-bound**: its signature authenticates the three payload digests and identity fields, and battery N9 demonstrates that a descriptive claim in it can be altered without disturbing the signature. The delivery file itself is **untouched** (preservation hashes prove it). **Re-issuance was feasible inside the fences** — the pinned prototype test key (`NONPRODUCTION_TEST_KEY_ONLY`) is held locally in `runs/second-run/keys-pinned/` — and is demonstrated in `runs/third-run/passport-v3-reissued.pae.json`: identical claims content, signature over the complete claims object, verified FULL-CLAIMS-V3 with all invariants consistent, evidence bindings re-derived, gate recomputation matching, and its honest **UNVERIFIED verdict standing**. The re-issued file is a *demonstration artifact in the run directory*, not a replacement delivery; a production re-issuance would chain `passportRevision` + `supersedes` per decision D2 (carried in the corrigendum text below).

## Honest analysis — which check fires on the fixture, and why (N2)

The false-gates envelope's **own fields are internally self-consistent**: `gatesFailed` is empty, the gate partition is complete with no duplicates, and the PAE shape carries no verdict, `unverifiedGates`, or `knownDefects` field in which a contradiction could sit. No field-vs-field invariant fires on it, and this report does not pretend otherwise. What fires standalone is the **success-claim rule** (item 4): the envelope asserts a complete success partition, and a success claim the verifier cannot derive from bound evidence may not stand (I1's evidence-unknown block; I4 derived-not-asserted). The **operative detector of the specific lie** is the with-diagnostic cross-check (N1), which names the three contradicted gates. Both presentations fail closed; neither is a faked pass in either direction — the genuine envelope (N3/N4) and the truthful success claim *with* its evidence (N6) pass.

## Known-defect entry (closed by this pass, regression-covered)

> **KD-002 — Signature proves identity/integrity, not truth (verifier semantic gap).** First recorded in the Gemini byte-exam pack's `SEMANTIC_REJECTION_TEST.md` (2026-11-27): `verifier-v2.cjs` returned PASS (exit 0) for a validly signed envelope from the pinned key claiming all four gates passed, while the diagnostic the envelope itself referenced recorded three of them FAILED; the genuine envelope and the lying one were indistinguishable to the tool. Root cause: `verifyEnvelope`/`cmdVerify` checked signature + pinned status + subject hash only; none of the §2.4 invariants (I1–I8) were implemented. **Status: CLOSED by verifier-v3** — invariant layer + bound-evidence cross-check + success-claim rule implemented; the fixture is preserved in `runs/third-run/semantic-fixture/` and battery N1/N2 are its permanent regression cases. Any future verifier version must be run against that fixture before its results are quoted. (Battery #10 of run 2 was never contradicted: that forgery was an *unsigned edit*, which the signature defeats; KD-002 was the harder case inside a validly signed envelope.)

## What v3 still cannot see (honest limits)

- **The standalone machine-readable JSON Schema is NOT built by this pass and remains outstanding** (closure step ②'s other half): `provadia.attestation.v1.schema.json` — structural bounds (`additionalProperties: false`, required enums, digest patterns) enforced by schema before semantic checks. v3's strict parser covers duplicate keys, malformed JSON, unknown `schema` values and number ranges; it is not a JSON Schema validator, and no structural claim beyond that is made.
- **Precedence enforcement carriers.** The I4 precedence rule is enforced over the unambiguous failure carriers (`knownDefects[]`, `gatesFailed[]`, `securityChecks` at FAIL, `gateVerdicts` at FAIL). Final-run *test*-failure attribution is **not** derived from the `testsPassed/testsFailed` rollup alone: the specimen's rollup includes its frozen-original baseline suite (the I4 form deviation the blind verifier already recorded — conforming final-run rollup 11/0), so the rollup is checked arithmetically (I3) and the attribution limit is printed as an observation rather than enforced blind. An emitter-side fix (final-run-only rollups) belongs to the schema corrigendum's emitter rules.
- **Canonicalization.** The house canonicalizer's output equals RFC 8785 JCS for the value classes present in v1 documents (strings, integers, booleans, null, arrays, objects). Full JCS edge cases (floats, non-ASCII escape forms) are machine-schema work; v1 forbids floats in claims objects and the strict parser refuses them.
- **Inherited scanner limits are unchanged** (v2's list stands): the dominance check is an approximation, not a CFG; delegated-helper guards still false-positive; the JS stripper does not recognise regex literals; the entropy threshold is a blunt knob; MANIFEST_REPRODUCIBILITY is still not a build; SBOM_LITE is still not an SBOM; pinned-policy custody is out of scope (the prototype policy names a throwaway test key and carries no freshness fields, so the §2.3 STALE_POLICY case cannot arise or be tested against it).
- **Passport evidence binding is convention-based where the passport does not name a file**: `subject.artifacts[]` and `thirdPartyLicensesRef` carry their own file names and are re-derived exactly; the transcript and SBOM are located under `--base-dir` by their delivery names (`transcript.txt`, `sbom.json`) and are recorded *unavailable* — never silently skipped — when absent. The passport's `evidenceRef` fields are free-text strings (the blind verifier's form finding), so they are bound by the v3 signature but not independently re-derived by path.
- **`/verify` browser surface remains UNTESTED**, unchanged from v1/v2; the CLI is the tested verification path.

## Schema corrigendum specification (for the captain to land — the schema file was NOT edited by this pass)

**C-1. Replace PDP-v1 §2.2 step 4 in full** (the SignedManifest definition and its paragraph) with:

> 4. **The signing input is the complete authoritative-claims object and nothing else** (corrigendum 2026-11-26, Guardian critic recheck; formulation confirmed by Gemini's byte-level examination — supersedes the three-digest SignedManifest form formerly defined at this step):
>
> The signed object is the entire passport object with only `signature.sig` removed — every other field present exactly as issued: `schema`, `passportId`, `passportRevision`, `supersedes`, `issuedAtUtc`, `subject` (including `artifacts[]`), `origin` (including `seats[]`, `examiner`, `completeClock`), `scope`, `securityAndLicense` (including `knownDefects[]`), `verification` (including `testSuites[]`, `gateVerdicts[]`, `fixRounds[]`, the verdict, `limitations` and `founderGate`), `aiDisclosure`, and the signature group's own identity fields (`alg`, `keyId`, `publicKey`, `keyLabel`, `scope`). No claim the passport asserts — identity, dates, rates recorded in scope, defect records, disclosures, descriptive fields — stands outside the signature. Only the signature value cannot sign itself; the payload digests inside the object stay non-circular (no digest covers the object that contains it — §1.2), and any whole-envelope digest stays detached (§2.1 item 4), never a field inside the passport.
>
> `sig` = base64( Ed25519_sign(examiner private key, §2.1 canonical bytes of the claims object) ). Ed25519 signs the canonical bytes directly — no pre-hash, no additional framing. The signature group carries `"scope": "full-claims-v3"` so a verifier selects this scope from the document itself. The signing key is the examiner key named by `keyId`, held under the custody rules of §2.3/§7.5.
>
> **Legacy scope.** Passports signed under the superseded three-digest SignedManifest (`schema`, `passportId`, `passportRevision`, `keyId`, `artifactSha256`, `testTranscriptSha256`, `sbomSha256`) remain verifiable, but a verifier MUST report them as **LEGACY-SCOPE**: their payload digests are bound; every other claim is unauthenticated, and an alteration to any unbound claim does not disturb the signature. A legacy-scope passport is re-issued under this step — a new revision per D2, `supersedes` naming the legacy revision — before any consumer relies on its descriptive claims.

**C-2. Add the precedence rule to §2.4 as the verdict-logic statement of I4** (it is the corrigendum's rule, encoded in the v3 validator):

> **Precedence: failure dominates missing evidence.** Any open `knownDefects[]` entry, failed required gate, or failed final-run test forces the verdict to `INCOMPLETE` strictly. `UNVERIFIED` is issuable ONLY when zero required failures and zero open defects exist AND one or more required items or evidence fields are UNVERIFIED. `PASS` / `PASS-AFTER-FIX` remain barred per I1 as corrected. A verdict that understates a failure (UNVERIFIED over a failure) is internally false.

**C-3. Harmonize §2.3 step 2 with §7.1 (fallback wording).** §7.1's trust wording ("a key inside the envelope is never trusted") and §2.3 step 2 must read as one rule with no divergent fallback: replace any phrasing in §7.1 that can be read as permitting a fallback to the envelope-supplied key with the §2.3 formulation verbatim — *"the envelope-supplied `signature.publicKey` is never used as the verification key and never as a fallback; it is informational only"* — and mark §7.1 as the amendment record of that rule, not a parallel instruction.

**C-4. §7.2 verification order.** Add to §7.2: *"§7.2 defines the hashing construction only (non-circular detached digests). Verification follows the order of §2.3 exactly — strict parse → trust resolution → signature → artifact binding → evidence binding → invariants — and nothing in this amendment reorders it."* Conforming edit to §2.3 step 3: the verification input is *"§2.1 canonical bytes of the complete authoritative-claims object re-derived from the passport (the whole document with only `signature.sig` removed); for a legacy-scope passport, the superseded SignedManifest, with the result reported as LEGACY-SCOPE."* Conforming edit to §2.5: under full-claims scope the third bullet's mechanism holds for **every** field (any field change breaks the signature itself); the amendment note's distinction survives only for legacy-scope passports.

## Files in this run

`runs/third-run/`: `RUN_REPORT.md` (this file) · `run-battery.sh` · `run-mutations.sh` ·
`preservation-before.txt` · `preservation-after.txt` ·
`diagnostic-v3-fixture.json` · `diagnostic-v3-fixture-repeat.json` · `diagnostic-v3-clean.json` ·
`diagnostic-v3-regression.json` · `diagnostic-v1-regression.json` (the fooled control) · `diagnostic-v3-negative.json` ·
`manifest-reproducibility.txt` · scan transcripts for every run ·
`pae-v3.json` (pinned, genuine) · `pae-v3-unpinned.json` · `pae-v3-clean.json` ·
`pae-v3-tampered.json` · `pae-v3-tampered-gates.json` · `pae-v3-dupkey.json` ·
`semantic-fixture/` (the preserved KD-002 fixture: envelope, diagnostic, transcript, pinned policy) ·
`passport-v3-reissued.pae.json` (the full-claims re-issuance) ·
mutation copies + make records (`passport-v3-mut-a-issuedat` … `passport-v3-mut-e-verdict`, `passport-legacy-desc-altered`, `passport-v3-desc-altered`, `passport-legacy-date-altered`) ·
`pinned-signers-substituted.json` (test-only doctored policy for T2) ·
verify/attest/sign outputs with exit codes for every case above.

## Next in the Guardian sequence (not performed by this pass)

Closure step ②'s remaining half — the standalone machine-readable JSON Schema + §2.6 conformance vectors publication; step ③ — the different-family critic recheck of the corrected schema and lane specs; step ④ — blind-verifier execution over the corrected set. The schema corrigendum specified above (C-1…C-4) is the captain's to land in `economy/PDP_V1_CANONICAL_SCHEMA.md`; this pass implemented the tool to match it and did not edit the schema.
