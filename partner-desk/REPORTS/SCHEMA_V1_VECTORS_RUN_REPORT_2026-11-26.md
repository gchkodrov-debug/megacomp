# PDP-v1 Passport Schema — Conformance Vectors Run Report

**Build:** closure step ②, schema layer — `provadia.passport.v1.schema.json` + §2.6 conformance vectors + Gemini corrigendum locks (2026-11-26 21:28 CT).
**Specification:** `~/workspace/newwave/next-build/economy/PDP_V1_CANONICAL_SCHEMA.md` (post-corrigendum C-1..C-4, C-1a, C-2a).
**Verifier of record:** `provadia-verifier-cli/verifier-v3.cjs` — READ-ONLY reference throughout; not one byte edited.
**Runs executed:** 2026-11-26 evening (America/Chicago). All commands re-runnable: `node schema-v1/validate.cjs --vectors schema-v1/vectors` and `bash schema-v1/run-v3-checks.sh`. Full outputs in `schema-v1/logs/`; hashes of every deliverable in `schema-v1/MANIFEST.sha256`.

---

## 1. Deliverables

| Artifact | What it is |
|---|---|
| `provadia.passport.v1.schema.json` | Formal JSON Schema (draft 2020-12) for the passport envelope, canonical name only (`"schema": "provadia.passport.v1"` const — the transitional `provadia.attestation.v1` shape is RETIRED and rejected). `additionalProperties: false` at every object level. |
| `validate.cjs` | Zero-dependency Node runner: strict UTF-8 decode → strict JSON parse → schema-subset validation → LOCK 1 policy gates → LOCK 3 three-axis outcome output. |
| `vectors/*.json` (42 files) | One file per vector: P1–P3 positive controls, FG + MUT-A..E reused fixtures, T1–T17 (§2.6), L1a–L4e (Gemini locks). Each = `{id, name, input, expected: {schemaValid, firstFailure}}`; inputs reference existing fixtures by path + sha256 wherever a fixture already embodies the vector. |
| `vectors/files/` | Synthetic fixtures: the conforming synthetic passport family (generator + unsigned sources in `src/`), evidence files, policies (revoked / stale-copy / expired / full-claims-required), tampered + empty base directories. |
| `logs/` | `validate-vectors.txt` (full vector run), `v3-*.txt` (per-vector verifier output), `v3-exit-codes.txt`, `outcomes-and-fg-demo.txt`. |
| `run-v3-checks.sh`, `make-vectors.cjs` | The exact execution/authoring records, kept so Step 3/4 seats can re-derive every result from the hashed bytes. |

**Profile mechanism (as tasked to state):** profile-scoped requirements are encoded two ways. (1) `$defs` per block with the closed enums the text defines; (2) root-level `allOf` + `if`/`then` keyed on `origin.producerLine`: FACTORY → `subject.artifacts` minItems 2 (§3.2); HOSPITAL → `origin.inputs` minItems 1 (§3.3); plus a third `if`/`then` for the chain of revision (LOCK 1(d): `passportRevision` ≥ 2 → `supersedes` non-null). The WORKFORCE profile's three named suites are **not** encoded: the canonical text names no suite identifiers, and inventing them would fork the spec — recorded as an under-specification, not silently filled.

**Policy gates (LOCK 1):** the requirement fields live in a machine-readable policy artifact (`vectors/files/policy-full-claims-required.json`: `requiredSchema`, `minimumPassportRevision`, `requiredSignatureScope`, `requiredSignatureAlg`, beside the pinned signer entries). `validate.cjs` applies them after structural validation, alg first — before any key/trust consideration. The document schema alone deliberately admits signature.scope *absence* (the C-1a legacy marker); the policy is what closes the downgrade.

## 2. What structural validation does NOT prove (honest scope)

`validate.cjs` implements only the JSON Schema subset our schema emits (type incl. type-arrays, const, enum, pattern, minLength, minimum, maximum, minItems, required, properties, additionalProperties, items, anyOf, allOf, if/then, local `$ref`). It is **not** a general JSON Schema engine. It proves **shape only**. It does not verify signatures, signer trust, rollup arithmetic (I3), verdict precedence (I4) beyond what the vectors probe at the verifier, same-seat rules (I7), clock ordering (I8), or claim-to-evidence binding. Those remain verifier-v3's invariant layer. A structural VALID is a statement about a document's form — nothing more.

## 3. LOCK 3 statement — read before any result below

**Exit 0 is not product acceptance.** verifier-v3 exit 0 on P1, P2, P3 and L4c means: the signature verifies, the signer is trusted, and the recorded claims are internally consistent — while the passports' own Delivery Verdict is **UNVERIFIED** in every one of those cases. A truthful failure attestation (an honest INCOMPLETE) would likewise "verify". The three axes are independent and are reported separately for every vector below: **Signer Trust** (TRUSTED / UNVERIFIED_SIGNER / INVALID / STALE_POLICY) · **Envelope Validity** (VALID / MALFORMED / SEMANTIC_INVARIANT_VIOLATION / CLAIM_EVIDENCE_MISMATCH) · **Delivery Verdict** (PASS / PASS-AFTER-FIX / INCOMPLETE / UNVERIFIED). `validate.cjs --outcomes` prints the same three fields and never fabricates a trust value (it reports NOT EVALUATED — trust is v3's axis). Nothing in this report, at any exit code, moves any product's READY count.

## 4. Results — all 42 vectors, both layers

Schema layer: `validate.cjs --vectors` — **42/42 MATCH** (expected = actual in every row; full log `logs/validate-vectors.txt`). Verifier layer: exit codes from `logs/v3-exit-codes.txt`; "v3 expected" was registered in each vector file **before** the runs.

| ID | Schema layer (actual) | v3 expected → actual | Disposition |
|---|---|---|---|
| P1 specimen passport | INVALID — `$.securityAndLicense.securityChecks[0].evidenceRef: type` (+33 errors) | 0 → **0** VALID / LEGACY-SCOPE | ⚠️ DISAGREEMENT — see F-1 |
| P2 re-issued passport | INVALID — same first failure (+33) | 0 → **0** VALID / FULL-CLAIMS-V3 | ⚠️ DISAGREEMENT — headline, F-1 |
| P3 synthetic conforming | VALID | 0 → **0** VALID, 4 bindings re-derived OK | ✅ true positive control |
| FG false-gates envelope | INVALID — `$: required:passportId` (+33; retired name const + unknown fields also fail) | 5 with diagnostic / 4 without → **5 / 4** | ✅ both layers reject, different reasons |
| MUT-A..E (5) | INVALID — same as P2 (mutations are shape-invisible) | 1 → **1** ×5 INVALID (signature gate) | ✅ layering proven: structure cannot see tampering; the signature can |
| T1 duplicate keys | MALFORMED — duplicate key "gatesFailed" | 1 → **1** MALFORMED | ✅ |
| T2 substituted policy | VALID (envelope conforms) | 1 → **1** INVALID (envelope key ≠ pin) | ✅ |
| T3 revoked signer | VALID | 3 → **3** UNVERIFIED_SIGNER | ✅ |
| T4 unpinned signer | VALID | 3 → **3** UNVERIFIED_SIGNER | ✅ |
| T5 PASS-AFTER-FIX + open defect | VALID (structural) | 4 → **4** SEMANTIC_INVARIANT_VIOLATION (I1) | ✅ |
| T6 PASS + gate FAIL | VALID (structural) | 4 → **4** (I1/precedence) | ✅ |
| T7 rollup mismatch | VALID (structural) | 4 → **4** (I3) | ✅ |
| T8 empty gate status | INVALID — `$.verification.gateVerdicts[0].status: enum` | 0 → **0** | ⚠️ DISAGREEMENT — v3 never reads `gateVerdicts[].status` (F-2) |
| T9 same-seat retest | VALID (structural) | 4 → **4** (I7) | ✅ |
| T10 failed retest + PASS-AFTER-FIX | VALID (structural) | 4 → **4** (I1 binding) | ✅ |
| T11 digest vs disk mismatch | VALID (structural) | 5 → **5** CLAIM_EVIDENCE_MISMATCH (artifact sha256) | ✅ |
| T12 `..` evidence path | INVALID — `$.securityAndLicense.securityChecks[0].evidenceRef.path: pattern` | 0 → **0** | ⚠️ DISAGREEMENT — v3 does not resolve evidenceRef paths (F-2) |
| T13 evidence unavailable | VALID | 0 → **0**, 4 bindings printed "not held… grade UNVERIFIED" | ⚠️ PARTIAL — per-binding notes conform; headline outcome still reads VALID (F-3) |
| T14 stale policy copy | VALID | STALE_POLICY → **0** TRUSTED | ❌ DEFECT — v3 has no policy freshness (F-4) |
| T15 copyleft + PASS | VALID (structural) | 4 → **4** (I1/I5) | ✅ |
| T16 unsupported artifactType | INVALID — `$.subject.artifactType: enum` | 0 → **0** | ⚠️ DISAGREEMENT — v3 has no artifactType/profile check (F-2) |
| T17 expired policy | VALID | STALE_POLICY class → **0** TRUSTED | ❌ DEFECT — v3 ignores validity windows entirely (F-4) |
| L1a scope omitted (policy req.) | INVALID — `$.signature.scope: policy:requiredSignatureScope` | 1 → **1** (edited bytes, signature gate) | ✅ at this layer; the genuine-legacy hole is P1 → RF-1 |
| L1b scope "legacy" | INVALID — `$.signature.scope: const` (+ policy gate) | 1 → **1** | ✅ here; v3 treats any non-exact scope as legacy (source line 1276) → RF-1 |
| L1c alg "Ed448" | INVALID — `$.signature.alg: const` (+ policy gate, alg first) | 1 → **1** (signature bytes only) | ✅ here; v3 never reads `signature.alg` → RF-1 |
| L1d rev 2, supersedes null | INVALID — `$.supersedes: type` (schema if/then) | 0 → **0** | ⚠️ DISAGREEMENT — v3 has no revision-chain logic → RF-2 |
| L1e rev 2, wrong supersedes | INVALID — `$.supersedes: policy:supersedesBinding` | 0 → **0** | ⚠️ DISAGREEMENT → RF-2 |
| L2a invalid UTF-8 | MALFORMED — strict decode refused | 1 → **1** INVALID (signature gate) | ⚠️ PARTIAL — rejected, but at the wrong layer: v3 decodes lossily, no decode-time refusal → RF-3 |
| L2b escaped duplicate key | MALFORMED — duplicate key "gatesFailed" | 1 → **1** MALFORMED (decoded comparison) | ✅ both layers conform |
| L2c float in claims | MALFORMED — non-integer number | 1 → **1** MALFORMED | ✅ |
| L2d JCS edge passport | VALID | 0 → **0** (sign/verify round-trip over edge values) | ✅ canonicalization byte-stable: non-BMP, combining, \u0007, tab, max-safe integer, empty array, null |
| L2e escaped key (positive) | VALID (keys decoded before matching) | 0 → **0** VALID | ✅ — see correction note C-2: v3 signs canonical bytes, so respelling verifies; consistent JCS discipline, not a defect |
| L4a vulnPolicy FAIL + UNVERIFIED | VALID (structural) | 0 → **0** ("verdict cap consistent — vulnerabilityPolicy = FAIL (I5)") | ❌ DEFECT vs LOCK 4 — carrier missing from I4 precedence → RF-4 |
| L4a2 vulnPolicy FAIL + PASS | VALID (structural) | 4 → **4** (I5 success-block) | ✅ control: the carrier blocks PASS but does not force INCOMPLETE |
| L4b securityCheck FAIL, gatesFailed ∅ | VALID (structural) | 4 → **4** (I4 carrier, source line 1117) | ✅ LOCK 4 conforming side |
| L4c zero carriers + UNVERIFIED evidence | VALID | 0 → **0**, verdict UNVERIFIED stands | ✅ LOCK 4 control — UNVERIFIED issuable exactly here |
| L4d finalRunTestsFailed = 2 + UNVERIFIED | VALID (structural) | 0 → **0** | ❌ DEFECT vs LOCK 4 — final-run failures are not a carrier; C-2a fields unread → RF-4 |
| L4e gateVerdict status FAIL + UNVERIFIED | VALID (structural) | 0 → **0** | ❌ DEFECT vs LOCK 4 — carrier scan reads `.verdict`, never `.status` → RF-4/RF-5 |

## 5. Findings

- **F-1 (headline) — the verifier of record accepts, at its highest trust grade, an envelope the corrected schema structurally rejects.** P2 verifies VALID / FULL-CLAIMS-V3 (exit 0) while carrying 34 structural errors against the corrected text: string-form evidence references throughout (§1.2 A4), `thirdPartyLicensesRef` in the retired `{fileName, sha256}` form, `gateVerdicts` entries with no `status` (§7.3), and the C-2a segregated counts absent entirely. P1 is the same body at LEGACY-SCOPE. Both passports predate the corrigenda — the finding is about **v3's enforcement surface**, not about the specimen's honesty: v3 enforces none of §1.2's evidenceRef form, §7.3's status presence, or C-2a's field presence. There is also a text-internal tension to settle in a future corrigendum: §1's example still shows `{fileName, sha256}` for `thirdPartyLicensesRef` while §1.2's later rule requires `{path, sha256, bytes}`; this schema follows §1.2 (later, explicit rule) and v3's binding code still expects the `fileName` form — under the corrected form, v3 silently skips the licenses binding.
- **F-2 — structural-only enforcement gaps in v3 (T8, T12, T16, L1d, L1e).** Empty/absent gate status, `..` evidence paths, unsupported artifactType, and broken revision chains are all invisible to v3. Today the schema layer is the only enforcement for §7.3 status, §1.2 A4 path safety (structural half), §3.1's profile enum, and the I1 chain's shape. T12's symlink and duplicate sub-cases are filesystem properties **no** structural schema can express; neither layer exercises them — named here so they are not mistaken for covered.
- **F-3 — T13 partial conformance.** With an empty `--base-dir`, v3 prints every binding "not held by this verifier; claims resting on it grade UNVERIFIED (never silently skipped)" — the recording conforms — yet the run's headline outcome is still `VERIFY: VALID`, exit 0. For P3's envelope no false PASS results (its own verdict is UNVERIFIED), but T13's text asks the *claims grade* to read UNVERIFIED; the outcome line does not carry it.
- **F-4 — STALE_POLICY does not exist in v3 (T14, T17).** `resolveTrust` reads only entry `status` and the publicKey match. A policy copy months past its freshness limit (T14) and a policy whose entry and whole-policy `validUntilUtc` expired before the envelope's `issuedAtUtc` (T17) are both TRUSTED, exit 0. The corrected text (§2.3, §2.6 T14/T17, §7.1, §7.5) requires refusal. This is the single largest trust-surface gap the vectors found.
- **F-5 — LOCK 4's carrier set is incomplete in v3 (L4a, L4d, L4e).** v3's I4 precedence (source lines 1114–1119) carries: knownDefects, gatesFailed, securityChecks FAIL, gateVerdicts **verdict** FAIL. Missing: `vulnerabilityPolicy: "FAIL"` (present only as an I5 success-block, line 1077 — hence L4a passes at UNVERIFIED while L4a2 correctly fails at PASS), `finalRunTestsFailed > 0` (the C-2a fields are never read), and gateVerdicts entries at **status** FAIL with non-FAIL verdict text. L4b/L4c confirm the implemented half behaves exactly as LOCK 4 requires.
- **F-6 — LOCK 3 scan-dir binding absent.** With `--scan-dir`, v3 re-runs the scanner and compares the derived **gate partition** to the claimed partition. It builds a tree manifest digest internally (twice, for reproducibility) but never binds that digest against `subject.artifacts[]` **before** scanning. Artifact binding exists only in the separate `--base-dir` path. The lock's required binding is absent → RF-6.
- **F-7 — v3 accepts the retired name.** v3 verifies both `provadia.passport.v1` and `provadia.attestation.v1` envelopes (FG is attestation-shaped and reaches its semantic layer). The corrected schema retires the attestation shape; the JSON Schema rejects it (`FG` row). Under LOCK 1 the *policy* should govern the required schema name — v3 has no such gate → RF-1.

## 6. Required fixes for a v3.1 pass (named; v3 was read-only in this seat — none applied)

- **RF-1 (LOCK 1) — policy-enforced scope & anti-downgrade.** Read the policy's requirement fields; reject: schema name ≠ policy's required name; revision below the policy minimum; signature.scope absent / "legacy" / unknown where the policy requires `"full-claims-v3"` (today any non-exact scope silently takes the legacy path, source line 1276); signature.alg ≠ `"Ed25519"` **before key lookup** (today the verify path never reads `signature.alg`). Evidence: P1 (genuine legacy accepted, exit 0), L1a–L1c.
- **RF-2 (LOCK 1(d)) — revision-chain enforcement.** Revision ≥ 2 must name the prior revision, bound against the prior revision's detached digest. Evidence: L1d, L1e (both exit 0 today).
- **RF-3 (LOCK 2) — strict UTF-8 decode before parsing.** Today the file is read with a lossy UTF-8 decode; L2a was refused only downstream at the signature gate. (Escaped-duplicate keys and float refusal already conform — L2b, L2c.)
- **RF-4 (LOCK 4) — complete the I4 carrier set.** Add `vulnerabilityPolicy: "FAIL"`, `finalRunTestsFailed > 0`, and gateVerdicts **status** FAIL to `failureCarriers`; read the C-2a final-run fields. Evidence: L4a, L4d, L4e (exit 0 today); controls L4a2, L4b, L4c behave correctly.
- **RF-5 (§1.2 / §7.3 / C-2a structural enforcement in the verifier).** Enforce the evidenceRef object form and path safety, gateVerdicts `status` presence and values, C-2a field presence, and the §3.1 artifactType enum — or formally delegate them to a schema-validation step in the verify pipeline (this schema + runner are built to be that step). Evidence: P1/P2 (34 errors accepted), T8, T12, T16. Includes settling the `thirdPartyLicensesRef` form tension (§1 example vs §1.2) and v3's `fileName`-form binding expectation.
- **RF-6 (LOCK 3 / §2.6 T13–T14–T17) — policy time & binding grades.** Implement STALE_POLICY (policy freshness limit + entry/policy validity windows); carry the UNVERIFIED claims grade in the headline outcome when bindings are unavailable; bind the `--scan-dir` tree's canonical digest against `subject.artifacts[]` before scanning. Evidence: T13, T14, T17, §5 F-6.

## 7. LOCK 5 — Hospital discipline (register only, no action taken)

The historical specimen passport (P1) and the re-issued passport (P2) remain **untouched and UNVERIFIED** — read-only inputs to this build; nothing in the specimen tree was edited, re-signed, or re-graded. The registered checkout order-ownership defect (authorization without object-level ownership, both trees) is **not** closed by anything in this build: its closure is reserved to the next specimen revision, to be proven by runtime HTTP probes (a two-user cross-order probe expecting 403/404) plus blind retest — not by schema or passport evidence.

## 8. Corrections made during this build (recorded, not buried)

- **C-1 — P1/P2 first-failure expectation corrected before the report.** The first registered draft named `$.origin.sourceCommitOrRecipeHash` as the first failure, from a misread of the fixture; the hash-pinned bytes show a valid 64-hex digest there. The expectation was corrected to the evidenceRef failure (the `schemaValid: false` verdict never changed) and the correction is recorded inside the P1 vector file itself.
- **C-2 — L2e verifier expectation corrected by the run.** I predicted v3 would reject the escaped-key respelling at the signature gate (exit 1). It verifies (exit 0): v3's signature binds the **canonical** claims object, so escape respellings of the same document verify. That is consistent JCS discipline — the error was in my prediction, not in v3 — and the L2b/L2e pair now documents the rule precisely: decode-then-compare for structure, canonical-bytes for signatures.

## 9. Byte packet (Step 3/4 alignment)

`MANIFEST.sha256` (same folder) lists the sha256 of: this report, the schema, `validate.cjs`, `make-vectors.cjs`, `run-v3-checks.sh`, both fixture generators, all 42 vector files, every file under `vectors/files/` and `vectors/files-tampered/`, and every log under `logs/` — so the captain can assemble the Step 3/4 byte packet from these outputs and any seat can re-verify the bytes before re-running. (The manifest cannot list its own hash; it is the one unlisted file.)

**Bottom line:** the corrected schema text now has a machine-readable form, a runner, and a 42-vector conformance record. The schema layer and v3 agree wherever v3 implements the text; every disagreement is named above as a defect with a required fix — none was tuned away. Structural validity proves shape; semantics remain v3's invariant layer; acceptance remains the founder's.
