# CORRIGENDUM PASS REPORT — PDP-v1 Schema + Lane Specs (2026-11-26)

**Pass:** the bounded corrigendum, Guardian + Gemini aligned. Paper only, $0. All edits in place with dated corrigendum markers (2026-11-26); history preserved — superseded wording is marked as superseded, never silently rewritten.
**Sources applied:** verifier-v3 third-run RUN_REPORT §C (C-1…C-4, applied exactly) · Gemini's Drop B rulings (byte-examination verdict) · Gemini's v3-verdict additions (C-1a, C-2a + three registrations, folded in before this report).
**Files edited (6):** `PDP_V1_CANONICAL_SCHEMA.md` · `SPEC_LANE1_SOVEREIGN_BUSINESS_OS.md` · `SPEC_LANE3_PROOF_OF_DELIVERY_PROVENANCE.md` · `SPEC_LANES2_6_WANTS_AND_HEADQUARTERS.md` · `SPEC_LANE5_AI_WORKFORCE.md` · `SPEC_LANE4_SOFTWARE_HOSPITAL_SPECIMEN.md`.
**Fences honored:** no tool code changed (verifier-v3.cjs untouched) · no specimen tree changed · historical passports immutable and untouched.

---

## 1. Edits — `PDP_V1_CANONICAL_SCHEMA.md`

| Section | Before → After (one line each) |
|---|---|
| §1 example, `verification` | `gateVerdicts[]` entry carried only a free-text `verdict` → entry now carries an explicit **`status` (`PASS \| FAIL \| UNVERIFIED`)** plus the verdict text. |
| §1 example, `verification` | Partition was `gatesPassed`/`gatesFailed` only → **`unverifiedGates` added**, making the required-gate partition explicit and complete. |
| §1 example, `verification` | Rollups were bare `testsPassed`/`testsFailed` → **C-2a fields added**: `finalRunTestsPassed` / `finalRunTestsFailed` / `finalRunTestsUnverified` + `historicalBaselineSuites[]` (segregated, never in rollups). |
| §1 example, `signature` | `sig` described as "over the SignedManifest canonical bytes", no scope field → **`"scope": "full-claims-v3"` added**; `sig` now "over the §2.1 canonical bytes of the complete authoritative-claims object". |
| §1 note under the example | Note said the signed content "is the `SignedManifest`" → note corrected to C-1 full-claims (SignedManifest-only marked superseded, legacy record only) + a corrigendum paragraph aligning the example with C-2 and the final-run/historical segregation. |
| §2.1 item 1 | "The canonical object is the **SignedManifest** — payload digests only" → canonical object is the **complete authoritative-claims object** (whole document, only `signature.sig` removed); both prior forms marked superseded/legacy. |
| §2.1 item 3 | "Canonical bytes of the SignedManifest" → "canonical bytes of the complete authoritative-claims object". |
| §2.2 step 4 (**C-1**) | Three-digest SignedManifest step (folded from §7.2) → **replaced in full with the RUN_REPORT §C C-1 text**: signed object = entire passport minus `signature.sig`, every field enumerated; `scope: "full-claims-v3"`; legacy-scope definition + mandatory re-issuance; the replaced form marked superseded and retained via §7.2. |
| §2.2 step 4 (**C-1a**) | No algorithm pinning stated → **`alg` is `"Ed25519"` only**; substitution rejected **before** key lookup; a present `publicKey` must match the pinned key **byte-for-byte** or INVALID; legacy paragraph strengthened: consumers MUST treat legacy descriptive claims as **unauthenticated (HOLD)** until re-issuance. |
| §2.3 step 2 (**C-1a**) | Trust resolution began directly with the `keyId` lookup → step now opens with the **alg check before any key lookup** (any other `alg` ⇒ INVALID, stop); the envelope-key rule strengthened to **byte-for-byte match** against the pinned policy; **legacy-scope consumer HOLD bullet added**. |
| §2.3 step 3 (**C-4**) | Verification input was "canonical bytes of the SignedManifest re-derived" → input is the **complete authoritative-claims object** (whole document, only `signature.sig` removed); legacy-scope passports verify against the superseded SignedManifest **with the result reported as LEGACY-SCOPE**. |
| §2.3 step 4 | Artifact digest compared "against the SignedManifest's `artifactSha256`" → compared against `subject.artifacts[0].sha256` (the same digest the legacy manifest named). |
| §2.3 signer-identity paragraph | "A signature proves the SignedManifest is untampered" → "proves its signed input (full-claims object under v3; the SignedManifest under legacy scope) is untampered". |
| §2.4 head (**C-2**) | No global precedence statement → the **C-2 precedence rule stands verbatim** at the head of §2.4 ("failure dominates missing evidence…"), marked as the verdict-logic statement of I4, + the **C-2a field-enforcement note** (computed from `finalRunTestsFailed` / `finalRunTestsUnverified` / `knownDefects[]` / `gatesFailed`, never from mixed rollups). |
| §2.4 I1 | "Both PASS and PASS-AFTER-FIX impossible; only issuable verdicts INCOMPLETE or UNVERIFIED" → block retained, selection made deterministic under C-2: failure/open defect ⇒ **INCOMPLETE strictly**; unknown evidence alone ⇒ UNVERIFIED. |
| §2.4 I2 | "Any UNVERIFIED mandatory field ⇒ verdict = UNVERIFIED" (conflicted with I4) → same rule **subject to C-2 precedence**: with any failure/open defect present the verdict is INCOMPLETE. |
| §2.4 I3 | "Rollups = suite sums" (run class unstated) → **final-run suites only**; baseline/historical results segregated to `fixRounds[]` + evidence records + `historicalBaselineSuites[]`; C-2a equality (`testsPassed` = `finalRunTestsPassed`, etc.) made normative. |
| §2.4 I4 | Deterministic INCOMPLETE-vs-UNVERIFIED paragraph → restated as C-2 with the explicit `unverifiedGates` partition reference. |
| §2.4 I5 | "`secretScan`/`vulnerabilityPolicy` = FAIL ⇒ verdict ∈ {INCOMPLETE, UNVERIFIED}" → **INCOMPLETE strictly**; the former disjunction is retained in place, marked **superseded and non-operative** (C-2). |
| §2.5 amendment note (**C-4**) | Note split the 1-bit mechanism (signature vs re-derivation) for all passports → note marked **superseded for full-claims scope**: under full-claims-v3 the third bullet's mechanism holds for **every** field; the split survives only for legacy-scope passports. |
| §2.6 vector list (**registration 3**) | Vectors ended at T16 → **T17 added**: verification against an **expired pinned policy** (`validUntilUtc` in the past) ⇒ **STALE_POLICY**, verdict capped at UNVERIFIED (distinct from T14's stale copy). |
| §0 (**registration 1**) | One-artifact statement only → registration added: canonical schema name is **`provadia.passport.v1`**; the transitional **`provadia.attestation.v1`** shape is **RETIRED** — not an alias or fallback; no local fork survives into closure step ④. |
| §1.2 evidence references (**registration 2**) | `evidenceRef {path, sha256, bytes}` stated for named evidence → **every** evidence binding (incl. transcript + SBOM) must be explicit in that form; **filename-convention resolution is superseded**; absent path = unavailable evidence, never a name search. (`..`, leading `/`, symlinks already rejected per A4.) |
| §6 checklist, canonicalization box | "(sig → `""`, RFC 8785 JCS, UTF-8)" → claims-object formulation (whole document, only `signature.sig` removed); former parenthetical marked superseded. |
| §6 checklist, signing-scope box | "The signature covers the signed manifest only (§7.2)" → **full-claims signing scope (C-1)** box; the former box's wording retained in a marked superseded parenthetical (legacy-scope check only). |
| §7.1 head + fallback bullet (**C-3**) | §7.1 read as a parallel instruction; fallback bullet worded independently → head note marks §7.1 as the **amendment record** of §2.3 step 2, **not a parallel instruction**, carrying the §2.3 formulation **verbatim** ("the envelope-supplied `signature.publicKey` is never used as the verification key and never as a fallback; it is informational only"); the bullet now points to that one formulation. |
| §7.2 head (**C-4**) | §7.2 presented its SignedManifest rule without qualification → head note added verbatim in substance: **"§7.2 defines the hashing construction only (non-circular detached digests). Verification follows the order of §2.3 exactly — strict parse → trust resolution → signature → artifact binding → evidence binding → invariants — and nothing in this amendment reorders it"**; its signing rule marked superseded for new issuances (legacy record). |
| §8 version history + disposition | History ended at the correction pass → **bounded-corrigendum row added** (C-1–C-4 + example/I3/I4 alignment) and a **bounded-corrigendum disposition paragraph** recording each item's landing point, the **C-1a/C-2a additions**, and the **three registered-for-schema-build items**. |

## 2. Edits — `SPEC_LANE3_PROOF_OF_DELIVERY_PROVENANCE.md`

| Section | Before → After |
|---|---|
| §1.1A mapping | Quoted mapping named `subject { … sha256 … }`, `origin { builderSeat, … }`, `signature { alg, publicKey, sig }` (no `keyId`) → **replaced with the corrected canonical mapping**: `subject.artifacts[] {role, fileName, sha256, bytes}` · `origin.seats[] {seatId, …}` + `examiner {seatId, …}` · `securityChecks[] {check, method, result, evidenceRef {path, sha256, bytes}}` · full gate partition incl. `unverifiedGates` · `signature { alg, keyId (mandatory), publicKey (informational only), scope: "full-claims-v3", sig }` · signed input = §2.2 full-claims object (C-1); the old form is named once, in the corrigendum sentence, as superseded and non-operative. |
| §1.2 intro | "A field that cannot be filled is written as **UNVERIFIED**" → the **typed evidence-status object** (`UNVERIFIED \| NOT_APPLICABLE` + reason); bare string in a typed field invalid; tables declared content requirements, canonical wire names (§1.1A) govern. |
| §1.2 A–H field labels | Draft snake_case labels (`passport_id`, `delivery_hash`, `known_defects[]`, `license_granted`, …) → **canonical names throughout** (`passportId`, `subject.artifacts[]`, `securityAndLicense.knownDefects[]`, `securityAndLicense.licenseGranted`, `verification.testSuites/gateVerdicts/fixRounds`, `verification.founderGate`, …); seats/examiner carry stable `seatId`s; `evidenceRef` = `{path, sha256, bytes}`. |
| §1.2 E (defects) | "If `knownDefects` is non-empty, verdict cannot read PASS" → can read **neither PASS nor PASS-AFTER-FIX**; under C-2 the verdict is **INCOMPLETE**. |
| §1.2 G (tests) | Suites unqualified → **final-run suites only**; baseline/historical segregated to `fixRounds[]`/evidence; gate entries carry explicit `status` and the complete partition. |
| §1.2 H (verdict) | PASS-AFTER-FIX = "defects found, fixed, independently retested"; UNVERIFIED = "any mandatory field UNVERIFIED" → verdict definitions rewritten under **C-2 precedence**: PASS-AFTER-FIX only at a revision with `knownDefects[]` empty + fixRounds retest records; INCOMPLETE strictly on any failure/open defect; UNVERIFIED only at zero failures/open defects. |
| §2 steps 1–6, §3, §5, §6 | Remaining draft labels in the blind-check procedure, lane attachment, Gatehouse-debt table and AT-4 (`delivery_hash`, `scope_statement`, `test_suites[]`, `passport_id`, `known_defects[]`, …) → canonical names (`subject.artifacts[]`, `scope.scopeStatement`, `verification.testSuites[]`, `passportId`, `knownDefects[]`, …); Step 5 now rejects PASS **or PASS-AFTER-FIX** over a non-empty defect list. |
| §4 items 2–3 + closing | Item 2 blocked PASS only; item 3 equated missing evidence with UNVERIFIED absolutely → item 2 blocks **PASS and PASS-AFTER-FIX** (I1) with INCOMPLETE forced under C-2; item 3 states missing evidence yields UNVERIFIED **only at zero failures/open defects**, else INCOMPLETE; closing corrigendum paragraph binds the §7.3 never-claims (no SLSA level, no full CycloneDX, no legal compliance from the Art. 50 marker) and states the signature binds the full claims object, never implying a gate passed. |

## 3. Edits — `SPEC_LANE1_SOVEREIGN_BUSINESS_OS.md`

| Section | Before → After |
|---|---|
| §1A.6 (new) | No binding data/storage/isolation subsection → **added, marked corrigendum 2026-11-26 (Gemini Drop B)**: (i) **BigInt canonical decimal strings or range-checked safe integers** for money/large integers, **zero floating-point money math**, mandatory **overflow-rejection tests**; (ii) **IndexedDB namespacing `${titleId}::${schemaMajor}::${vaultInstanceId}`, fail closed on header mismatch**, no fallback database; (iii) **atomic WAL + mandatory crash-recovery tests** (kill mid-mutation, replay to exact pre-crash state); (iv) **physical cross-browser `file://` origin isolation tests** in real browser engines/profiles (string-format assertions do not satisfy); (v) **#501 freeze + Founder Gate G-A preserved** — the requirements prepare the lift, they do not authorize past G-A. |

## 4. Edits — `SPEC_LANES2_6_WANTS_AND_HEADQUARTERS.md`

| Section | Before → After |
|---|---|
| §2.2 scrubbing | Scrub-before-storage bound the brief record → extended (corrigendum) to **all logs and error paths** (logs, error objects, stack traces, telemetry, exports, report drafts); an unscrubbable path is closed, never written dirty. |
| §2.2 WantBrief tension | Layering carried as a **NAMED TENSION (for the critic — not silently resolved)** → **RESOLVED BY CORRIGENDUM**: §2.2 resolves **in favor of consented enrichment over the six-field WantBrief v1 core**; enrichment stored only under the guest's permission flags, never an identity or counting key; the former tension text is marked resolved, not dropped. |
| §2.3 step 3 (counting) | Independence rested on session/organization-type separation → **UNVERIFIED_INDEPENDENCE labelling added**: session-grouped counts (and any count without consented independence proof) carry the label in cluster record and reports; only unlabelled counts feed the SIGNAL threshold. |
| §6.1 (new paragraph) | Receipt linkage stated without a display vocabulary → **mock-view trust vocabulary added**: every HQ view (mock or built) carries per-item **trust status (`TRUSTED` / `UNVERIFIED_SIGNER` / `INVALID` / `STALE_POLICY`) + verdict (`PASS` / `PASS-AFTER-FIX` / `INCOMPLETE` / `UNVERIFIED`)**; a link's presence is never rendered as proof; no receipt ⇒ displayed UNVERIFIED. |
| §6.2 dependency statement | MES-SEC-002 stated as a dependency → **HARD GATE paragraph added**: MES-SEC-002 (HIGH, OPEN) is a hard gate — no §6.4 acceptance item beyond specification + isolated prototype may be treated as met while it stands open. |

## 5. Edits — `SPEC_LANE5_AI_WORKFORCE.md`

| Section | Before → After |
|---|---|
| §1A (new paragraphs) | TIER_2 gate required "explicit sign-off" without a bound object; citations required hash presence → **TIER_2 approval binding added (corrigendum)**: approval = single-use tuple **`{ proposalId, action, userId, tenantId, targetEntity, patchHash, scope, issuedAtUtc, expiresAtUtc, nonce }`**, all fields verified against the live proposal + operator session **at the policy boundary**, expiry enforced, nonce consumed atomically, any mismatch/replay/expired ⇒ **fail closed (403)**; a changed patch is a new `patchHash` needing a new approval. **Entailment validation added**: the validator resolves each cited record/line and checks the claim is **entailed by** the cited content — hash presence alone is not sufficient; an unsupported claim fails exactly as an uncited one. |
| §2.2 testing | Defect-list testing without named authorization fixtures → **five mandatory adversarial fixtures added (corrigendum)**: (i) TIER_1 direct-commit attempt, (ii) replayed approval (nonce), (iii) expired approval, (iv) tampered patch (`patchHash` mismatch), (v) cross-tenant `vaultEpoch` replay (`403 TOKEN_EPOCH_REVOKED`); a fixture that does not fail closed is a blocking defect. |

## 6. Edits — `SPEC_LANE4_SOFTWARE_HOSPITAL_SPECIMEN.md`

| Section | Before → After |
|---|---|
| §1.3 (new) | The checkout order-ownership gap existed only as an out-of-frame observation → **registered as a KNOWN DEFECT (corrigendum)**: checkout route authenticates the session but never verifies the caller owns the target order; present in **both** trees; not one of D1–D5; the sealed 5/5 grade and the historical passport (immutable, UNVERIFIED) are unchanged; under Zero Known-Defect + I1 it **bars any future successful verdict** while it stands. **Closure path binding on the next specimen revision:** object-level ownership enforcement (non-owner ⇒ 403/404) + synthetic **two-user cross-order negative probe** (User B on User A's order ⇒ 403/404; owner's path intact) as a fail-before/pass-after regression test + **independent blind retest** before closure. |
| §3 margin note | Priced-as-if record stood without a margin qualification → **margin status added (corrigendum)**: reported Hospital margins are **UNVERIFIED** until costs are separated per offer (human review, maintenance, infrastructure, refund, support) and the separated figures are checked against the **55% floor**. |

---

## 7. Grep evidence — no superseded instruction survives unmarked

Run over the edited files at the close of this pass:

- **Envelope-key trust (schema):** every occurrence of the envelope-key/fallback wording is a prohibition or a marked record — §2.3 step 2 ("**never** used as the verification key and **never** as a fallback. It is informational only"), §7.1's C-3 note + bullet (the same formulation, marked amendment record), §1's signature example ("INFORMATIONAL ONLY: never trusted, never a fallback"), and the §7 supersession map's historical row naming the replaced provision. No instruction anywhere verifies against an envelope-supplied key.
- **Old I1 fragment:** the pre-corrigendum narrowing ("the only issuable verdicts are `INCOMPLETE` or `UNVERIFIED`") — **0 occurrences**; I1 now selects the surviving verdict deterministically under C-2.
- **Old I5 disjunction:** `verdict ∈ {INCOMPLETE, UNVERIFIED}` survives at exactly **1** location — inside I5's own corrigendum parenthetical, explicitly marked "superseded and non-operative".
- **SignedManifest-only as an operative instruction:** the strings "signing input is the SignedManifest and nothing else" / "the signature covers the signed manifest only" occur **0 times as instructions**; the latter survives once inside the §6 checklist's marked superseded parenthetical. Remaining `SignedManifest` mentions (12) are the legacy-scope definition, the §7.2 amendment record under its C-4 supersession note, D1/history text, or marked superseded notes.
- **Stale Lane 3 mapping terms:** `subject.sha256`, `builderSeat`, `passport_id`, `passport_schema`, `delivery_hash`, `known_defects[]`, `license_granted`, `scope_statement`, `test_suites[]`, `gate_verdicts[]`, `fix_rounds[]`, `founder_gate`, `construction_method`, `complete_clock` — **0 occurrences** in `SPEC_LANE3_PROOF_OF_DELIVERY_PROVENANCE.md` after the pass (the superseded §1.1A form is described in words, once, inside its corrigendum sentence; the old byte form is not reproduced as an instruction).
- **Additions present:** `C-1a` ×6, `C-2a` ×4, `finalRunTests*` ×7, `historicalBaselineSuites` present in §1 + I3 + §2.4, T17 present in §2.6, `provadia.attestation.v1` present only inside the §0/§8 retirement registration.
- **Corrigendum markers:** every edited file carries dated `corrigendum 2026-11-26` markers (schema ×10+, Lane 3 ×2 sections + §4 closing, Lanes 2+6 ×5, Lane 5 ×3, Lane 4 ×2, Lane 1 §1A.6).

## 8. Registered for the schema build (recorded in the schema, not built)

1. Canonical schema name **`provadia.passport.v1`**; transitional `provadia.attestation.v1` **RETIRED** — no local fork survives into closure step ④ (§0 + §8).
2. Evidence bindings are **explicit safe relative paths** (`{path, sha256, bytes}`); filename-convention resolution superseded; `..`, leading `/`, symlinks rejected per A4 (§1.2).
3. **STALE_POLICY expired-policy conformance vector** added to the §2.6 list as **T17** (§2.6).

## 9. The one remaining outstanding item — named plainly

**`provadia.passport.v1.schema.json` — the standalone machine-readable JSON Schema — is NOT part of this pass and does not exist yet.** It remains closure step ②'s outstanding artifact (with the published §2.6 conformance vectors as its companion). Nothing in the corrected documents claims it exists; the semantic validator (verifier-v3) implements the corrected text, and the critic recheck (step ③) + blind-verifier execution (step ④) over this corrected set follow.

*End of report.*
