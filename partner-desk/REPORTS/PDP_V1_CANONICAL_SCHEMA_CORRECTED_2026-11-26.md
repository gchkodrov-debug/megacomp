# PDP-v1 — CANONICAL SCHEMA (LOCKED, Wave 1)

**Artifact:** the PROVADIA Delivery Passport, schema `provadia.passport.v1`
**Status:** LOCKED as the upstream spine of FVR-34 (founder lock-in contract, 2026-11-26 20:28 CT). Lanes 1, 4 and 5 import this schema exactly; Wave 2 documents are graded against §6 of this file.
**Sources reconciled:** (A) `SPEC_LANE3_PROOF_OF_DELIVERY_PROVENANCE.md` — the Passport content spec · (B) `GEMINI_DUAL_SURFACE_ARCHITECTURE_2026-11-26.md` §4.1 — the PAE-v1 envelope · (C) FVR-34 lock-in addendum, Lane 3 paragraph — the founder's field groups (subject / origin / securityAndLicense / verification / signature), in-toto/SLSA v1.2 + CycloneDX modeling.
**Fences:** paper only · $0 · the signature in this schema is a local document signature under a house test key — **no signing of anything real, no wallet, no chain, no broadcast; mainnet HOLD** · no deployment · no commercial standing (FVR-26 unfounded).
**Amendment:** amended 2026-11-26 (Guardian FVR-34 First Construction Review + Gemini conformance adjudication) — see **§7**. Where §7 conflicts with §§1–6, §7 governs; superseded wording is marked in place, never silently rewritten.
**Correction pass:** 2026-11-26 (Guardian — PDP-v1 Wave 1 & Wave 2 Schema Adjudication, Drive 1p1NNLiNFLWqbpia2T-98DTE8oSow3KIK) — the §7 amendments are **folded into the body** (§§1–2, §6): the body now states the pinned trust root, the signed-manifest signing input, the dual PASS / PASS-AFTER-FIX block, the typed unknown representation and the adversarial fixtures directly, and no body text contradicts §7. §7 is retained as the amendment record. Version history and the correction record are in §8.

---

## §0 — The PDP-v1 ↔ PAE-v1 relationship (decided)

**PDP-v1 and PAE-v1 are one artifact, not two: PDP-v1 is the Delivery Passport, and PAE-v1 is the name of its signed machine envelope — the canonical JSON rendering of the passport's checkable core is the PAE envelope, and that envelope is what gets signed and what verifiers verify.**

Why: source (A) already defines the Passport as two renderings of one content (human Markdown + machine manifest, §1.1 of A); source (B) supplies the machine rendering's envelope shape and signature; source (C) names the delivered artifact "PDP-v1" while mandating the signature group. There is therefore exactly **one** file — `passport.pae.json` (the PAE envelope) — plus its human Markdown rendering generated from it. No lane may emit a "passport" and an "attestation" as separate documents.

---

## §1 — The canonical schema

One JSON object. **Every field is mandatory unless marked OPTIONAL, and no field may be omitted because its value is unknown.** Unknowns are represented by the **typed evidence-status object** (corrected 2026-11-26, adjudication A3): `{ "status": "UNVERIFIED" | "NOT_APPLICABLE", "reason": "<why the value is unknown or inapplicable>" }`, used **in place of** the field's typed value. A bare string `"UNVERIFIED"` standing in a typed (numeric, array, object, hash) field is **not** valid, and no unknown may be filled with an invented zero, empty string, empty array or assumed constant. `NOT_APPLICABLE` is distinct from `UNVERIFIED`: it asserts the field does not apply to this artifact under its producer/artifact profile and requires a profile-governed justification in `reason`; `UNVERIFIED` asserts the field applies but its value is not established. Types: `sha256` = 64 lowercase hex chars; `utc` = RFC 3339 UTC (`...Z`); `int` = non-negative integer within the safe range of §2.1.

```json
{
  "schema": "provadia.passport.v1",
  "passportId": "pdp_01J...",
  "passportRevision": 1,
  "supersedes": null,
  "issuedAtUtc": "2026-11-26T20:21:00Z",

  "subject": {
    "artifactId": "specimen-501-reseller-business-os",
    "artifactName": "Reseller Business OS",
    "artifactVersion": "1.0",
    "artifactType": "software_build",
    "artifacts": [
      { "role": "package", "fileName": "reseller-os-1.0.zip", "sha256": "<sha256>", "bytes": 0 },
      { "role": "inner",   "fileName": "app.html",            "sha256": "<sha256>", "bytes": 0 }
    ],
    "buildRecipeRef": "chassis-v0.1/stage-03-build"
  },

  "origin": {
    "producerLine": "FACTORY",
    "authorizationRef": "<founder order / construction-order lane, quoted or linked>",
    "inputs": [
      { "name": "<source material or Hospital intake record>", "sha256": "<sha256>" }
    ],
    "constructionMethod": "<how it was made, as fact; every external generator/template/component named>",
    "sourceCommitOrRecipeHash": "<sha256>",
    "reproducibleRebuildSha256": "<sha256, or the typed evidence-status object (§1) until a rebuild is actually run>",
    "assumptionRegisterRef": "<dated figure·source·check-date register>",
    "seats": [
      { "seatId": "<stable unique seat id, e.g. seat:factory-builder-01>",
        "role": "builder | improver | critic | economics | blind_verifier",
        "family": "<model/family identity>", "startedUtc": "<utc>", "endedUtc": "<utc>" }
    ],
    "examiner": { "seatId": "<stable unique seat id>", "identity": "<blind verifier seat identity — never a producer seat>", "family": "<model/family identity>" },
    "completeClock": { "totalSeatMinutes": 0, "reconstructedSegments": [] }
  },

  "scope": {
    "scopeStatement": "<what was built or repaired, in plain words>",
    "exclusions": ["<what was deliberately NOT done or NOT checked>"]
  },

  "securityAndLicense": {
    "securityChecks": [
      { "check": "SECRET_SCAN", "method": "<tool/method>", "result": "PASS | FAIL | UNVERIFIED",
        "evidenceRef": "<evidence reference object, §1.2>" }
    ],
    "secretScan": "PASS | FAIL | UNVERIFIED",
    "sbomSha256": "<sha256 of the CycloneDX SBOM>",
    "copyleftViolations": 0,
    "vulnerabilityPolicy": "PASS | FAIL | UNVERIFIED",
    "knownDefects": [],
    "licenseGranted": "<the licence the customer receives, in plain English>",
    "thirdPartyLicensesRef": { "fileName": "THIRD-PARTY-LICENSES.txt", "sha256": "<sha256>" },
    "ownershipStatement": "<who owns the artifact, its inputs, and (Hospital) the customer's original>"
  },

  "verification": {
    "verifierVersion": "verifier-1.0.0",
    "testSuites": [
      { "testSuiteId": "golden-vectors", "testsPassed": 33, "testsFailed": 0,
        "environment": "<environment>", "evidenceRef": "<re-runnable reference>" }
    ],
    "testsPassed": 33,
    "testsFailed": 0,
    "gatesPassed": ["<gate or check ids>"],
    "gatesFailed": [],
    "gateVerdicts": [
      { "gate": "<Eight-Gate name — Factory | original defect id — Hospital>",
        "verdict": "<per-gate verdict | FIXED-AND-RETESTED | STILL OPEN>",
        "evidenceRef": "<reference>" }
    ],
    "fixRounds": [
      { "defectId": "<exact id of the original failure this fix answers>",
        "defect": "<defect found in production>", "fix": "<correction>",
        "fixingSeatId": "<stable seat id of the seat that made the fix>",
        "patchRef": "<patch / revision reference the fix landed in>",
        "evidenceRef": "<evidence reference object, §1.2 — the NEW evidence for the fix>",
        "retestedBy": "<stable seat id of the retesting seat — never the fixing seat>", "result": "PASS | FAIL" }
    ],
    "transcriptSha256": "<sha256 of the full test transcript>",
    "verdict": "PASS | PASS-AFTER-FIX | INCOMPLETE | UNVERIFIED",
    "limitations": "<mandatory, written for this delivery: what this passport does NOT establish>",
    "founderGate": "The founder's final approval remains mandatory above every seat's verdict; this passport records evidence, it does not approve."
  },

  "aiDisclosure": {
    "article50Disclosure": "<true | false — the ACTUAL disclosure made for this artifact, recorded as fact; never an assumed constant>",
    "aiAssistanceLevel": "<the actual assistance level for this artifact, recorded as fact — e.g. human_verified_ai_assisted only where a human actually verified>",
    "disclosureEvidence": "<evidence reference object, §1.2, or the typed evidence-status object (§1) where applicability or level is unknown>",
    "machineReadableMarker": "urn:provadia:ai-transparency:v1"
  },

  "signature": {
    "alg": "Ed25519",
    "keyId": "<id of the examiner's key in the pinned trustedSignerPubkeys policy, §2.3>",
    "publicKey": "<base64 public key — INFORMATIONAL ONLY: never trusted, never a fallback; verification uses the pinned key for keyId>",
    "sig": "<base64 Ed25519 signature over the SignedManifest canonical bytes, §2.2>"
  }
}
```

> **Amended 2026-11-26 (§7) + correction pass 2026-11-26:** the `signature` block carries the mandatory `keyId` (§7.1, folded into the block above); the signed content is the `SignedManifest` (§2.2 body text, §7.2); `securityChecks[].result` includes `UNVERIFIED` (§7.3); `seats[]` / `examiner` / `fixRounds[]` carry stable seat ids (§1.2); `aiDisclosure` records actuals, never assumed constants (§1.2). §7 remains the amendment record; the body above is normative and agrees with it.

### 1.1 Reconciliation decisions (each difference, chosen, one line why)

| # | Difference | Decision | Why (one line) |
|---|---|---|---|
| D1 | (A) issues the passport as an unsigned document act; (B) and (C) mandate an Ed25519 `signature` group. | **Signed envelope wins** — every PDP-v1 carries §2's signature. | The founder's lock-in (C) postdates and overrides (A) on this point, and 1-bit tamper-evidence is impossible without a signature. **Clarified 2026-11-26 (adjudication A4):** the signature is not the only way to detect tampering — comparison against an independently trusted digest detects alteration too; the signature's distinct contribution is **signer authentication under the trust policy** (§2.3), not tamper detection alone. |
| D2 | (B) names the id `attestationId` (per-issuance); (A) names it `passport_id` (durable, with revisions). | **`passportId` + `passportRevision` + `supersedes`** (A's model, B's id format). | Revisions must chain under one durable identity or a corrected delivery looks like a new, unrelated artifact. |
| D3 | (C) gives `subject.sha256` (single hash); (A) requires the two-level hash (package + inner artifacts, the #501 shape). | **`subject.artifacts[]`** — an array of `{role, fileName, sha256, bytes}`; the first entry is the delivered package. | The schema must regenerate #501's packet without inventing or dropping a field (A §3 closure test), and one hash cannot name both levels. |
| D4 | (B) allows `commitOrSlotRef` incl. `solana-slot:…`; (C) uses `sourceCommitOrRecipeHash` + `buildRecipeRef`. | **(C)'s form wins; slot/chain refs are excluded from PDP-v1.** | Mainnet HOLD and (A)'s no-anchoring fence bar chain references; the recipe hash carries the same provenance without them. |
| D5 | (C) compresses origin to `builderSeat`; (A) requires the full `seats[]` relay record + separate `examiner`. | **`seats[]` + `examiner` kept in full**; (C)'s `builderSeat` is the `seats[]` entry with `role:"builder"`. | Seat separation is itself a blind-check step (A §2 Step 4) — a single builder field cannot prove the producer didn't grade its own work. |
| D6 | Only (A) has `scope` (statement + exclusions). | **Kept, mandatory.** | The never-claims (§4) and blind-check Step 2 are unenforceable without a written scope and named exclusions. |
| D7 | (C)'s securityAndLicense is four summary scalars; (A) carries `security_checks[]` detail + mandatory `known_defects[]`. | **Both: (C)'s scalars are rollups derived from (A)'s arrays**, and `knownDefects[]` is mandatory, present even when empty (empty = `[]` **and** the human rendering states "No known unresolved defects at issue time"). | The scalars are the machine-checkable headline; the arrays are the evidence behind them — a rollup that disagrees with its detail fails verification (§2.4). |
| D8 | (C) gives scalar `testsPassed/testsFailed`; (B) gives `gatesPassed/gatesFailed`; (A) gives `test_suites[]`, `gate_verdicts[]`, `fix_rounds[]` and a four-value `verdict`. | **All kept: (A)'s arrays are the record; (B)/(C) scalars and lists are rollups of them; the verdict enum is (A)'s — `PASS · PASS-AFTER-FIX · INCOMPLETE · UNVERIFIED`, no fifth value, no aggregate score.** | A bare pass/fail cannot express "defects fixed and retested" vs "evidence missing," and those are different facts a buyer must not confuse. |
| D9 | Only (B) has `euAiActCompliance`. | **Kept as `aiDisclosure`**, mandatory. **Corrected 2026-11-26 (adjudication A5):** (B)'s fixed values are NOT adopted as constants — `article50Disclosure` and `aiAssistanceLevel` record the **actual** disclosure and assistance level for the artifact, with evidence or the typed evidence-status object where unknown; the block records facts, never a legal certification (never-claim 11). | It is the only source addressing machine-readable AI-transparency marking; dropping it would fork Pillar 3's auditor use case — but an assumed `true` / assumed level would be a claim without evidence. |
| D10 | Only (B) has `settlementProof` (x402/Stripe rails). | **Excluded from PDP-v1.** | Settlement belongs to opportunity #11's future escrow receipt, not to delivery evidence; rail fields inside a passport would invite exactly the commercial claim §4 forbids while every rail is on HOLD. |
| D11 | Only (A) has licensing beyond the SBOM (licence granted, attribution file + hash, ownership). | **Kept in full** inside `securityAndLicense`. | (C)'s `copyleftViolations` counts what (A)'s attribution file proves; a passport summarizing a licence that isn't in the package is a failed check (A §2 Step 6). |
| D12 | (A) requires two renderings (human + machine); (B)/(C) describe only JSON. | **Kept: the PAE JSON is canonical; the human Markdown rendering is generated from it, never hand-edited separately.** | One source of truth — a hand-edited rendering is a fork, and forks are what this lock exists to prevent. |

### 1.2 Field rules that bind every emitter

- `artifactType` ∈ `software_build | diagnostic_report | ai_deliverable | mcp_tool_output` (B's enum; `diagnostic_report` is a Hospital diagnostic-only delivery).
- `producerLine` ∈ `FACTORY | HOSPITAL | WORKFORCE` (A defined the first two; WORKFORCE is Lane 5's line under the same schema — see §3).
- `verdict` consistency is part of the schema, not guidance — see §2.4.
- `limitations` and `founderGate` are mandatory verbatim-bearing fields: `founderGate` carries the §1 sentence exactly; `limitations` is written for the delivery (boilerplate is a floor, never a substitute — A §1.2H).
- Timestamps: `issuedAtUtc` is the last timestamp in the document; all seat stamps fall inside the manufacture window; any reconstructed clock segment is flagged in `completeClock.reconstructedSegments` where it stands (A §1.2C honesty rule).
- **Stable seat ids (corrected 2026-11-26, adjudication A3):** every `seats[]` entry, the `examiner`, and every `fixRounds[]` `fixingSeatId` / `retestedBy` carry a **stable unique seat id**; invariants I6/I7 are enforced against ids, never against names or family strings alone. A signature alone does not prove a seat's independence — independence is established by the seat record + the pinned-key custody record (§2.3), and the passport claims no more than that.
- **Evidence references (corrected 2026-11-26, adjudication A4):** every `evidenceRef` is an object `{ "path": "<package-relative path>", "sha256": "<sha256>", "bytes": <int> }` naming the exact evidence file (transcript, SBOM, attribution file, test evidence). Paths must be relative: absolute paths, `..` traversal, symlinks and duplicate paths are rejected as MALFORMED; an evidence file not declared here is not evidence, and a declared file that cannot be produced is marked unavailable — never silently skipped (this applies to `thirdPartyLicensesRef` exactly as to any other evidence).
- **Package placement — no self-referential digest (corrected 2026-11-26, adjudication A4):** `subject.artifacts[0]` is the delivered package; its digest is computed over the package's payload files **excluding the passport and the signature**. The passport is delivered as its own file (`passport.pae.json`) alongside the package (or inside a detached evidence envelope); no digest inside the passport covers an archive that contains the passport itself. Where an archive-level receipt is needed it is detached, recorded outside the envelope (§7.2). Rebuild and original-intake references are claims bound by their hashes — a signed hash string does not by itself verify the rebuild or the intake; the verifier re-derives what it holds and marks the rest UNVERIFIED.
- **`aiDisclosure` records actuals (corrected 2026-11-26, adjudication A5):** `article50Disclosure` and `aiAssistanceLevel` state what actually happened for this artifact; where applicability or level is not established, `disclosureEvidence` carries the typed evidence-status object (§1). The block is a transparency record, never a legal certification (never-claim 11). The SBOM referenced by `sbomSha256` is **SBOM-lite** unless full CycloneDX schema validation is itself recorded as a passed check (never-claim 10); no licence or vulnerability clearance is claimed beyond the recorded checks.

---

## §2 — Canonicalization + Ed25519 signing / verification contract

This is the exact contract a verifier implements. It follows (C)'s in-toto/SLSA discipline — every claim digest-bound to the artifact — and the Gatehouse order (Lock → Sign → Persist → Verify) **in design only**: the record is assembled and persisted before the signature exists; the signature binds to that record; nothing is broadcast anywhere.

### 2.1 Canonical form

**Strict parse (before any canonicalization — corrected 2026-11-26, adjudication A1):** a PDP-v1 payload is rejected as **MALFORMED**, before parsing proceeds, if it contains **duplicate object keys at any depth** (refused, never first-wins or last-wins), malformed UTF-8 or lone surrogates, an unknown `schema` value, or numbers outside the safe range (integers only in v1; every integer must satisfy |n| ≤ 2^53−1). There is no lenient parse of a passport.

1. **For signing/verification**, the canonical object is the **SignedManifest** (§2.2) — payload digests only. *(Wave 1 signed the complete passport object; that form is superseded — §7.2, folded here by the 2026-11-26 correction pass.)*
2. Serialize with **JSON Canonicalization Scheme (RFC 8785 / JCS)**: object keys sorted lexicographically by UTF-16 code unit, no whitespace, strings minimally escaped per JCS, numbers in JCS form (integers only in v1 — no floats anywhere in the schema), UTF-8 encoded.
3. The resulting byte string is the **canonical bytes** of the SignedManifest — the Ed25519 input (§2.2).
4. The complete envelope may also be canonicalized the same way (with `signature.sig` set to `""`) to compute the **passport digest** — a **detached** identifier recorded outside the envelope (§7.2). The passport digest is never signed and never a field inside the passport.

### 2.2 Signing (issuer side)

4. **The signing input is the SignedManifest and nothing else** (folded from §7.2 by the 2026-11-26 correction pass):

```json
"SignedManifest": {
  "schema": "provadia.passport.v1",
  "passportId": "<passportId>",
  "passportRevision": 1,
  "keyId": "<signature.keyId>",
  "artifactSha256": "<subject.artifacts[0].sha256 — the delivered package digest>",
  "testTranscriptSha256": "<verification.transcriptSha256>",
  "sbomSha256": "<securityAndLicense.sbomSha256>"
}
```

   The manifest covers **payload digests only** — it contains no signature, no hash of itself, and no passport digest; non-circular by construction. `sig` = base64( Ed25519_sign(examiner private key, §2.1 canonical bytes of the SignedManifest) ). Ed25519 signs the canonical bytes directly — no pre-hash, no additional framing. The signing key is the examiner key named by `keyId`, held under the custody rules of §2.3/§7.5.
5. Issue order (mandatory): **assemble all fields → persist the unsigned record → sign → persist the signed envelope with the delivery → release**. A verdict or signature that predates its evidence fails verification of process even if the cryptography checks out (A §5).

*(Historical note: Wave 1's step 4 signed the whole-object canonical bytes; superseded by §7.2 and folded above — retained here as record, not as instruction.)*

### 2.3 Verification (checker side — offline, zero producer assistance)

A verifier holding only the artifact files + `passport.pae.json` performs, in order:

1. **Strict parse + schema**: apply §2.1's strict parse (duplicate keys, malformed UTF-8/lone surrogates, unknown `schema`, unsafe numbers ⇒ **MALFORMED**, stop). Reject as MALFORMED if any mandatory field is absent (absent ≠ empty; A §2 Step 5).
2. **Trust resolution (pinned policy only — folded from §7.1/§7.5 by the 2026-11-26 correction pass; adjudication A1)**: look up `signature.keyId` in the **pinned `trustedSignerPubkeys` policy** — a policy record distributed **independently of any passport** (house register custody; never delivered inside the package it vouches for, never fetched from the delivery). Rules:
   - **No trust on first use:** a key first seen inside an envelope is never added to the policy by verification, and the envelope-supplied `signature.publicKey` is **never** used as the verification key and **never** as a fallback. It is informational only.
   - If the envelope's `publicKey` is present and **differs from the pinned key** for `keyId` ⇒ **INVALID** (substituted envelope), stop.
   - If `keyId` is absent from the policy, expired at `issuedAtUtc`, or revoked ⇒ the outcome is **UNVERIFIED_SIGNER** (step 3 still classifies the cryptography; the passport is never trusted), and the passport's verdict is capped at `UNVERIFIED`.
   - **Explicit trust result:** every verification records its trust outcome — `TRUSTED` (pinned, in-window) · `UNVERIFIED_SIGNER` · `INVALID` — **together with the policy version used**. A verification that does not name its policy version is incomplete.
   - **Freshness is visible:** the policy carries `policyVersion`, `policyIssuedAtUtc` and a stated freshness limit. If the verifier's policy copy is older than that limit, the trust result is reported as **STALE_POLICY**, the outcome caps at UNVERIFIED_SIGNER-equivalent (verdict capped at `UNVERIFIED`), and the staleness is stated in the result — offline rotation/revocation can only be as fresh as the policy copy, and the schema says so rather than hiding it.
   - **No production keys:** under the current fences only NONPRODUCTION_TEST_KEY_ONLY keys (§7.5) may be pinned; no production key exists and none is created by this document.
3. **Verify signature**: Ed25519_verify(**pinned key for `keyId`**, §2.1 canonical bytes of the SignedManifest re-derived from the passport, base64-decode(`signature.sig`)). Failure ⇒ **INVALID — signature invalid**, stop. (Where step 2 already determined the key is unpinned/expired/revoked, this step runs against the presented key solely to classify the outcome as UNVERIFIED_SIGNER vs INVALID; it confers no trust.)
4. **Verify artifact binding**: SHA-256 every file named in `subject.artifacts[]`; compare hash **and byte size** against the passport and against the SignedManifest's `artifactSha256`. Any mismatch ⇒ **REJECTED — the passport describes a different artifact**, stop (A §2 Step 1). The verifier **never executes the artifact** to verify a signature or hash.
5. **Verify transcript + SBOM + evidence binding**: SHA-256 the test transcript, the CycloneDX SBOM and every file named by an `evidenceRef` (§1.2 — including `thirdPartyLicensesRef`); compare against `verification.transcriptSha256`, `securityAndLicense.sbomSha256` and the recorded digests. Every named evidence file is either checked or explicitly recorded **unavailable** (its claims grade UNVERIFIED); none is silently skipped. Mismatch ⇒ REJECTED for the affected claim group.
6. **Verify cross-field invariants** (§2.4). Any violation ⇒ the passport is internally false — REJECTED whole.
7. **Grade per claim group** CONFIRMED / NEEDS-CHECK / REJECTED (house Two-Axis grading); REJECTED findings stay on record. There is no aggregate trust step. **Consumer binding (§7.4):** consumers (UI/CLI) render and act on this verified parsed object — never a re-parse of the raw input after verification; the object that was verified is the object that is shown.

**Signer identity (corrected 2026-11-26):** identity is established **only** by the pinned policy of step 2: the policy binds each `keyId` to an examiner seat id, its validity window and its rotation/revocation record (§7.1, §7.5). A signature proves the SignedManifest is untampered since signing **by the holder of the pinned key**; the policy — not the envelope — is what makes that holder a trusted examiner. *(The Wave-1 form of this paragraph — identity pinning as a manual fingerprint comparison against a register note — is superseded and retained only in §7's amendment record; it is not an instruction.)*

### 2.4 Cross-field invariants (a verifier MUST enforce all of them)

- I1. **Zero-defect gating (corrected 2026-11-26, adjudication A2 — the PASS-AFTER-FIX loophole is closed).** While `knownDefects` is non-empty, **both `PASS` and `PASS-AFTER-FIX` are impossible**; the only issuable verdicts are `INCOMPLETE` or `UNVERIFIED`. The same block applies while any **required gate has status FAIL**, any **required test is unresolved**, or any **required evidence is unknown** (typed status `UNVERIFIED`). `PASS-AFTER-FIX` becomes issuable only at a revision where `knownDefects` is empty **and** every defect listed in any superseded revision carries a `fixRounds[]` record — bound to its exact original `defectId`, with the fix, its `patchRef`, new evidence, and an independent retest `result: "PASS"` by a seat other than the fixing seat. `PASS` is issuable only where no defect was ever listed for the artifact and no required item failed or is unknown. (Zero Known-Defect rule 1.)
- I2. Any mandatory field carrying the typed evidence-status object with `status: "UNVERIFIED"` (§1) ⇒ `verdict` = `UNVERIFIED`. (A field carrying `NOT_APPLICABLE` with a profile-governed justification does not trigger this invariant.)
- I3. `verification.testsPassed` = Σ `testSuites[].testsPassed`; same for `testsFailed`. A rollup that disagrees with its detail invalidates the passport.
- I4. **Final-run results vs history; the required-gate partition (rewritten 2026-11-26, adjudication A2 — the Wave-1 text contradicted itself and left historical counts ambiguous).** `verification.testsPassed/testsFailed`, `gatesPassed/gatesFailed` and the per-gate statuses describe the **final run only**. Historical failures live exclusively in `fixRounds[]`, each bound to its original `defectId` — a historical failure is never counted in the final-run rollups, and a final-run pass never erases the historical record. The gate partition is **derived, not asserted**: each producer/artifact profile defines a **unique required gate set**; every required gate appears **exactly once** in `gateVerdicts[]` with an explicit status (§7.3), and `gatesPassed` = the ids at PASS, `gatesFailed` = the ids at FAIL, with UNVERIFIED ids listed in the partition — no required gate may be missing, duplicated, or recorded with an empty status, and no empty or missing test suite may manufacture a success; any of those ⇒ internally false. **INCOMPLETE vs UNVERIFIED is deterministic:** if any required item **failed** (open defect, gate FAIL, final-run test FAIL) the verdict is `INCOMPLETE`; if nothing failed but required evidence is missing or unknown the verdict is `UNVERIFIED`; when both failure and missing evidence exist the verdict is `INCOMPLETE` — a failure is never silently converted into a lesser category, and never into a success.
- I5. `securityAndLicense.secretScan` = `FAIL` ⇒ `verdict` ∈ {`INCOMPLETE`, `UNVERIFIED`}; likewise `vulnerabilityPolicy` = `FAIL`. **License violations cannot be neutralized by listing them under `scope.exclusions`:** `copyleftViolations` > 0 ⇒ the violations must appear in `knownDefects` (an exclusions-only listing makes the passport internally false), and while they stand there I1 blocks both successful verdicts.
- I6. `examiner.seatId` ≠ every producer `seats[].seatId`, and the examiner's `family` differs from the builder's. (A §2 Step 4; ids per adjudication A3.)
- I7. Every `fixRounds[]` entry: `retestedBy` (seat id) ≠ `fixingSeatId`, and `defectId` names the exact original failure the fix answers — an unbound or same-seat retest does not count as a retest.
- I8. `issuedAtUtc` ≥ every `seats[].endedUtc`; unflagged reconstructed clock segments discovered later void the clock claims, not the hashes (A §2 Step 7).

### 2.5 The 1-bit rule (what a single changed bit does)

**Scope of the promise (clarified 2026-11-26, adjudication A4):** verification works on the **parsed, canonicalized** object (§2.1), so **benign transport differences — whitespace, key order, formatting — do not break verification and are not tampering**. What fails is a **semantic** alteration: any change to a signed field, a digest-bound payload, or a field the invariants bind. There is no blanket raw-byte tamper promise, and none is needed: tamper detection rests on digest comparison against independently trusted digests as much as on the signature — the signature's distinct contribution is signer authentication under the trust policy (§2.3, D1).

- **1 bit in the artifact** → its SHA-256 changes → step 4 mismatch → REJECTED. The passport says nothing about the altered artifact.
- **1 bit in the test transcript or SBOM** → its hash changes → step 5 mismatch → the verification claims are REJECTED.
- **1 bit in any passport field** (a verdict letter, a timestamp digit, a gate id) → the canonical bytes change → the Ed25519 signature fails at step 3 → REJECTED, before any content is even read.
- **1 bit in `signature.sig` or `publicKey`** → step 3 fails → REJECTED.
- There is no "close enough": a figure that doesn't re-derive is failed (FVR-12 doctrine, via A §2).

**Amendment note (2026-11-26, §7.2):** the third bullet's mechanism is stated precisely for fields outside the signed manifest. A changed digest or manifest field still fails the signature itself; a changed rollup or descriptive field is caught by re-derivation from the digest-bound evidence (artifact / transcript / SBOM hashes) and by the §2.4 invariants, and is REJECTED on that basis. The outcome — rejection — is unchanged; the detecting mechanism is named honestly rather than attributed to the signature.

### 2.6 Adversarial tests for the schema itself (corrected lock, 2026-11-26)

Every verifier implementation and every corrected-lock recheck must run these fixtures; expected outcomes are normative. (Sources: the correction-pass brief + adjudication A1/A2/A4 negative fixtures.)

| # | Fixture | Expected outcome |
|---|---|---|
| T1 | Payload containing duplicate object keys (e.g. two `gatesFailed` entries with different values) | **MALFORMED** — rejected at parse, before any verification (§2.1) |
| T2 | Envelope `publicKey` ≠ pinned key for `keyId` | **INVALID** — substituted envelope, rejected (§2.3 step 2) |
| T3 | Cryptographically valid signature under a key whose `keyId` is unpinned, expired or revoked | **UNVERIFIED_SIGNER** — distinct from INVALID; verdict capped at UNVERIFIED (§2.3 step 2, §7.5) |
| T4 | Envelope re-signed by an attacker under their own key (valid cryptography, unpinned `keyId`) | **UNVERIFIED_SIGNER**, never VALID — no trust on first use (§2.3 step 2) |
| T5 | Passport claiming `PASS-AFTER-FIX` while a defect is still listed in `knownDefects[]` | **Internally false — REJECTED at the invariant step** (§2.4 I1) |
| T6 | Passport claiming `PASS` with a required gate at FAIL, an unresolved required test, or required evidence unknown | **Internally false — REJECTED** (§2.4 I1) |
| T7 | Signed but internally inconsistent summary (rollups disagree with detail arrays) | **REJECTED** (§2.4 I3/I4) |
| T8 | A required gate missing from `gateVerdicts[]`, duplicated, or recorded with an empty status | **Internally false — REJECTED** (§2.4 I4) |
| T9 | Fix bound to no original `defectId`, or retested by the fixing seat itself | Retest does not count; verdict cannot rise (§2.4 I7, I1) |
| T10 | Historical failure with no matched final-run pass + independent retest record | `PASS` / `PASS-AFTER-FIX` cannot issue (§2.4 I1/I4) |
| T11 | Artifact or evidence file substituted after signing (bytes differ from the recorded digest) | Digest mismatch — **REJECTED** for the affected claim group (§2.3 steps 4–5) |
| T12 | Evidence reference with an absolute path, `..` traversal, a symlink, or a duplicate path | **MALFORMED** (§1.2) |
| T13 | Named evidence file absent from the package | Its claims grade **UNVERIFIED** — never silently skipped, never PASS (§2.3 step 5) |
| T14 | Verification attempted with a policy copy older than its freshness limit | Trust result **STALE_POLICY**; verdict capped at `UNVERIFIED` (§2.3 step 2) |
| T15 | Copyleft violation listed only under `scope.exclusions` | **Internally false — REJECTED** (§2.4 I5) |
| T16 | Unsupported `artifactType` / `producerLine` profile (no defined required gate set) | No verdict above UNVERIFIED may issue; the profile is undefined, not passed (§2.4 I4) |

---

## §3 — Import contract for Lanes 1, 4, 5

### 3.1 The shared rule

Each lane **emits** PDP-v1 passports for its verified artifacts and **references** passports by the triple `{ passportId, passportRevision, subject.artifacts[0].sha256 }`. A reference is a citation, never a copy — the passport itself is the only evidence object.

**Fields no lane may ever fork** (change, rename, extend, or reinterpret locally): `schema` · the field names and group structure of §1 · the `verdict` enum · the §2.1 canonicalization · the §2.2/§2.3 signing and verification contract · the §2.4 invariants · the mandatory `knownDefects` / `limitations` / `founderGate` fields · the §4 never-claims. A lane that needs a field this schema lacks raises it as a schema revision proposal to the captain — it does not invent one in its own documents (the AT-1 rule: fields are justified against this schema or struck).

**Lane-specific data lives in exactly three places**: `scope`, the `gateVerdicts[]` / `testSuites[]` entries, and `subject`/`origin` values. Everything else is identical across lanes — one schema, one checker, three fills (A §3).

### 3.2 Lane 1 — Software Factory (Sovereign OS / Chassis)

- `producerLine: "FACTORY"`; `artifactType: "software_build"`.
- **Must emit:** `gateVerdicts[]` = the Eight Gates, one entry per gate with evidence refs · `subject.artifacts[]` at **two levels minimum** (delivery package + principal inner artifact) · `origin.reproducibleRebuildSha256` = the clean-rebuild hash (Chassis byte-identical build; `UNVERIFIED` until a rebuild is actually run) · licensing from the shipped files: `licenseGranted` matching the in-package `LICENSE.txt`, `thirdPartyLicensesRef` = the generated attribution file + its hash.
- **Must never:** alter Specimen #501's frozen release candidate to produce a passport — the passport is generated *about* the artifact, never by modifying it (founder lock-in, Lane 1).

### 3.3 Lane 4 — AI Software Hospital

- `producerLine: "HOSPITAL"`; `artifactType: "software_build"` (repaired delivery) or `"diagnostic_report"` (Tier-1 diagnostic only).
- **Must emit:** `origin.inputs[0]` = the intake record — the broken application **as received**, with its intake SHA-256 (the provable "before") · `gateVerdicts[]` replaced by the **original defect list**: one entry per defect found at diagnostic, verdict `FIXED-AND-RETESTED` or `STILL OPEN`; every `STILL OPEN` defect also appears in `knownDefects[]` · `scope.scopeStatement` names the tariff class exercised as **INTERNAL test rate only** (per the lock-in: $249 diagnostic / $699 bounded sprint calibration) — the passport records the class and never quotes a price as an offer · delivery does not ship, even internally, without a passport (A §3).
- **Must never:** emit a passport over a specimen whose seeded-defect list it cannot name — the blind verifier grades against that list from the passport alone.

### 3.4 Lane 5 — AI Workforce (CIV-059 Resident line)

- `producerLine: "WORKFORCE"`; `artifactType: "ai_deliverable"` (a capability module release or a verified worker output bundle).
- **Must emit:** the three Solnik verification requirements as **named test suites** in `verification.testSuites[]` — memory isolation, knowledge accuracy, security boundaries — each with pass/fail counts and evidence refs (tested, never asserted; Lane 5 spec §3) · worker-action evidence bound by hash: the ActionProposal transcript (proposal-and-commit record, incl. TIER_2 sign-offs) is the transcript whose hash sits in `verification.transcriptSha256` · `securityAndLicense.securityChecks[]` naming the scoped/revocable token checks run for the worker's read access.
- **Must never:** fork a "worker passport" variant, soften the three-requirement suites into a single aggregate score, or emit a passport for a capability whose house placement (CIV-059) it presumes — the passport records evidence about the capability; the house decision stays the founder's open call.

---

## §4 — Never-claims (carried over from Lane 3 spec §4 — binding on every PDP-v1)

The passport is evidence, not a warranty. The following claims are forbidden in any passport, in any wording, however softened:

1. **No blanket certification.** Not blanket certification, financial guarantee, or proof software is safe forever. The words "certified," "guaranteed," and "safe" do not appear as claims about the artifact.
2. **No PASS over a known defect.** A known unresolved defect blocks PASS and PASS-AFTER-FIX at any severity (§2.4 I1); a verdict issued over one is a report of incompletion — and a record that does so is itself a defect.
3. **No claim beyond the checks run.** Missing evidence = UNVERIFIED, never PASS. The passport attests to the checks listed in it, at the times listed in it, on the hashes listed in it — nothing else, nothing later, nothing similar.
4. **No claim about any other artifact.** A different file — different hash, different version, a rebuild — is a different artifact. The passport is silent about it and says so in `limitations` (any modification re-opens the affected gates).
5. **No live-deployment claim from local evidence.** Local files are not proof of live deployment; a passport issued on local evidence says "verified locally" and names the live leg under `exclusions`.
6. **No founder approval.** The passport is evidence laid before the founder's chair; it never states or implies the founder approved, endorsed, or judged the delivery.
7. **No future-tense claims.** Nothing about durability, future compatibility, future security, or fitness for a purpose the scope statement didn't name. The passport is a record of a past examination, dated.
8. **No commercial standing.** Until FVR-26 is founded and reviewer/liability terms exist (NOT FOUND today), the passport is an internal delivery instrument — not an audit product, not a seal for sale, carrying no language a third party could mistake for one.

**Added by amendment (2026-11-26):** three further never-claims — no SLSA-level claim, no full CycloneDX compliance claim, and no legal-compliance claim from the Art. 50 marker — are stated in §7.3 and bind every PDP-v1 exactly as items 1–8 do.

---

## §5 — Fences on this lock

- **Paper only.** This document defines a format; it builds nothing, signs nothing, and issues no passport.
- **$0.** No spending; implementation, when separately ordered, uses existing seats and local tooling only.
- **No signing of anything real.** The §2 signature is over a document, with a local test key, for tamper-evidence of our own evidence files. No wallet, no transaction, no chain anchor, no broadcast — mainnet HOLD stands; chain anchoring remains a named future founder decision, undesigned here.
- **Existing construction untouched.** This lock constrains the *format* of Lane 1/4/5 evidence from Wave 2 onward; it retroactively changes no issued record, and #501's publication remains the founder's separate call.

---

## §6 — Conformance checklist (Wave 2 relay grading)

Every Wave 2 lane document (Lanes 1, 2, 4, 5, 6 + R1–R3 briefs) and every specimen passport is graded against this list by the Relay — builder → improver → different-family critic → blind verifier. Any unchecked box is a defect in the document under review, graded CONFIRMED / NEEDS-CHECK / REJECTED per claim, with REJECTED findings kept on record.

**Schema conformance**
- [ ] Emits/references passports only in the §1 shape: `schema` = `provadia.passport.v1`, all mandatory fields present, no lane-local fields added anywhere.
- [ ] PDP-v1 ↔ PAE-v1 treated as one artifact (§0): a single `passport.pae.json` + generated human rendering; no separate "attestation" document exists or is promised.
- [ ] `artifactType` / `producerLine` / `verdict` values drawn only from the §1 enums; verdict consistency rules I1–I8 (§2.4) hold on every example passport in the document.
- [ ] `knownDefects` present (empty or populated) and `limitations` + verbatim `founderGate` present in every example.
- [ ] **Dual successful-verdict block (§2.4 I1, corrected 2026-11-26):** while `knownDefects[]` is non-empty — or any required gate is FAIL, any required test unresolved, or any required evidence unknown — **neither `PASS` nor `PASS-AFTER-FIX` is issuable**; only `INCOMPLETE` / `UNVERIFIED`. `PASS-AFTER-FIX` appears only at a revision with `knownDefects[]` empty **and** an independent-retest record for every previously listed defect.
- [ ] **Typed unknowns (§1, adjudication A3):** unknown values use the typed evidence-status object (`UNVERIFIED` | `NOT_APPLICABLE` + reason); no bare `"UNVERIFIED"` string in a typed field, no invented zero/empty values; `NOT_APPLICABLE` carries a profile-governed justification.
- [ ] **Stable seat ids (§1.2, adjudication A3):** `seats[]`, `examiner` and `fixRounds[]` carry stable unique seat ids; I6/I7 check against ids; every fix binds its original `defectId` + `patchRef` + new evidence.
- [ ] **Evidence references (§1.2, adjudication A4):** every `evidenceRef` is `{path, sha256, bytes}` with a package-relative path; no absolute paths, traversal, symlinks or duplicate paths; the passport's own digest never covers an archive containing the passport.
- [ ] Rollups reconcile: `testsPassed/testsFailed` = suite sums (I3); security scalars derivable from `securityChecks[]` + SBOM (D7).

**Cryptographic contract**
- [ ] Canonicalization implemented/described exactly as §2.1 (sig → `""`, RFC 8785 JCS, UTF-8) — no "sign the file as-is" variant.
- [ ] Verification described/performed in §2.3 order, offline, with zero producer assistance; signer identity established **only** by the pinned policy (§2.3 step 2), with the explicit trust result + policy version recorded and policy freshness visible — never oversold as proof beyond the policy. *(Corrected 2026-11-26: the Wave-1 "paper process" wording of this box is superseded and struck.)*
- [ ] **Pinned trust root enforced (§7.1):** the signature is verified against the pinned `trustedSignerPubkeys` policy entry for `signature.keyId`; a key supplied inside the envelope alone is never trusted; the policy carries rotation + revocation entries and is distributed independently of any passport.
- [ ] **UNVERIFIED_SIGNER outcome implemented (§7.5):** a cryptographically valid signature from an unpinned, expired or revoked keyId yields UNVERIFIED_SIGNER — distinct from INVALID — and caps the passport's verdict at UNVERIFIED.
- [ ] **Signed-manifest scope (§7.2):** the signature covers the signed manifest only (payload digests: artifactSha256 · testTranscriptSha256 · sbomSha256); the manifest and the signature itself are excluded from the signed content; the outer archive / passport digest stays detached.
- [ ] **Duplicate-key + consumer-binding controls (§7.4):** parsers reject any payload containing duplicate object keys as MALFORMED; UI/CLI consumers bind strictly to the verified parsed object and never re-parse raw input after verification.
- [ ] 1-bit tests specified or run: artifact bit → hash mismatch; transcript/SBOM bit → hash mismatch; passport-field bit → signature failure (§2.5).
- [ ] **Adversarial fixtures (§2.6) specified or run:** duplicate-key payload → MALFORMED · envelope key ≠ pinned key → INVALID · valid signature under unpinned key → UNVERIFIED_SIGNER · PASS-AFTER-FIX claimed with a defect still listed → REJECTED at the invariant step · plus the remaining T5–T16 fixtures with their normative outcomes.
- [ ] **Trust result recorded (§2.3 step 2):** every verification outcome names TRUSTED / UNVERIFIED_SIGNER / INVALID / STALE_POLICY **and the policy version used**; no trust on first use anywhere in the document or its examples.
- [ ] **Machine schema + conformance vectors (adjudication §C — next closure step, NOT yet published):** a formal machine-readable schema + semantic validator rules and the §2.6 conformance vectors are published as companion artifacts and the blind verifier executes them independently. *(Unchecked until those artifacts exist; this document alone does not satisfy it.)*
- [ ] Issue order respected: evidence assembled + persisted before signature; no verdict predates its evidence (§2.2 step 5).

**Lane import contract**
- [ ] Lane 1: Eight-Gate `gateVerdicts[]`, two-level `artifacts[]`, rebuild hash or honest `UNVERIFIED`, licence fields matching shipped files; #501's frozen RC unaltered.
- [ ] Lane 4: intake hash in `origin.inputs[0]`, defect list in place of gate verdicts, STILL OPEN defects mirrored into `knownDefects`, tariff class marked internal-test-only, no delivery without a passport.
- [ ] Lane 5: three Solnik requirements as named suites with counts, ActionProposal transcript hash-bound, no forked worker-passport variant, no presumed CIV-059 house.
- [ ] References use the `{passportId, passportRevision, subject.artifacts[0].sha256}` triple; no copied/embedded passport clones in lane documents.

**Never-claims + fences**
- [ ] Full-text scan of the document and its example passports: none of the §4 eight claims appears in any wording ("certified / guaranteed / safe" absent as artifact claims).
- [ ] **Per-gate explicit status (§7.3):** every gate and security check records PASS | FAIL | UNVERIFIED explicitly; no gate pass is inferred from signature validity anywhere in the document or its examples.
- [ ] **Claim discipline (§7.3):** no SLSA level claimed without separate verification; no full CycloneDX compliance claimed (SBOM is digest-bound reference only, unless schema validation is itself recorded as a check); the Art. 50 marker carries no legal-compliance claim in any wording.
- [ ] No settlement/rail fields, no chain references (D4, D10), no chain-anchoring design or promise.
- [ ] $0, paper/local only, no deployment, no commercial offer or price-as-offer anywhere; mainnet HOLD and the FVR-26 gate stated where the document touches outsiders.

---

## Sources

- `~/workspace/newwave/next-build/economy/SPEC_LANE3_PROOF_OF_DELIVERY_PROVENANCE.md` — field set (§1.2), blind-check procedure (§2), lane attachment (§3), never-claims (§4), Gatehouse ordering debt (§5), acceptance tests (§6).
- `~/workspace/newwave/next-build/economy/GEMINI_DUAL_SURFACE_ARCHITECTURE_2026-11-26.md` §4.1 — PAE-v1 envelope: field names, `verifierVersion`, gate lists, transcript/SBOM hashes, `euAiActCompliance`, Ed25519 signature block. (Its `settlementProof` and `solana-slot` ref are excluded per D4/D10.)
- `~/workspace/newwave/next-build/FOUNDATIONAL_VISION_REGISTER.md` — FVR-34 lock-in addendum (2026-11-26 20:28 CT): Lane 3 as upstream spine; PDP-v1 field groups; in-toto/SLSA v1.2 + CycloneDX modeling; standalone offline verifier; 1-bit tamper rule; Relay execution order (Wave 1 = this lock).

---

## §7 — AMENDMENT 2026-11-26 (Guardian + Gemini conformance)

**Provenance:** the Guardian's FVR-34 First Construction Review (seven technical corrections) + Gemini's reconciled conformance rulings adopting them, incl. Gemini's adversarial vector 1 (canonicalization & duplicate-key smuggling) — both carried by the founder, 2026-11-26. This is Guardian sequence step 1: Passport.
**Force:** where this section conflicts with §§1–6, **this section governs**. Superseded wording in §§1–6 is marked in place and retained as the Wave-1 record — nothing above has been silently rewritten.
**Folded into body 2026-11-26 (correction pass):** the Guardian's PDP-v1 Wave 1 & Wave 2 Schema Adjudication required the operative rules to live in the body, not only in this amendment. §2.1 (strict parse), §2.2 (SignedManifest signing input), §2.3 (pinned-policy trust resolution, explicit trust result + policy version, UNVERIFIED_SIGNER) and §2.4–§2.6 now state §§7.1–7.5's rules directly; **the body does not contradict this section anywhere** (grep-verified at the correction pass, §8). This section is retained as the amendment record.
**Fences:** unchanged — paper only · $0 · local test keys only · no signing of anything real · mainnet HOLD · no deployment · no commercial standing.

**Supersession map (what changed, where):**

| Prior provision | Amended by | Change |
|---|---|---|
| §1 `signature` block (alg / publicKey / sig only) | §7.1 | gains mandatory `keyId` |
| §2.2 step 4 (signature over whole-object canonical bytes) | §7.2 | signing input is the signed manifest only |
| §2.3 step 3 (verify against envelope-supplied `signature.publicKey`) | §7.1 | verify against the pinned key for `signature.keyId` |
| §2.3 "Signer identity in v1" paragraph (paper-process pinning) | §7.1 + §7.5 | replaced by the pinned trust-root policy + UNVERIFIED_SIGNER outcome |
| §1 `securityChecks[].result` = "PASS \| FAIL" | §7.3 | extended to "PASS \| FAIL \| UNVERIFIED"; per-gate status made explicit everywhere |
| §2.5 bullet 3 (any passport-field bit fails the signature) | §7.2 note | mechanism split: digest/manifest fields fail the signature; other fields fail by re-derivation + invariants |

**Schema deltas (normative):** (1) `signature.keyId` added, mandatory. (2) A `signedManifest` sub-object is defined (§7.2) — it is assembled from fields already in the passport, listed explicitly, and is the only signed content. (3) `securityChecks[].result` and every gate record carry an explicit status from `PASS | FAIL | UNVERIFIED` (§7.3). No other field changes; no lane may fork these deltas (§3.1 applies to this section in full).

### 7.1 Pinned trust root — a key inside the envelope is never trusted

Verification must establish that the signature belongs to a **trusted examiner**, not merely that somebody signed the document.

- The `signature` block carries `keyId` alongside `alg` / `publicKey` / `sig`. The envelope's `publicKey` is informational only; if it is present and differs from the pinned key for that `keyId`, the passport is **INVALID**.
- A verifier trusts a signature only if `keyId` appears in the **pinned `trustedSignerPubkeys` policy**, distributed **independently of any passport** (house register / policy record under the captain's custody — never delivered inside the artifact package it vouches for, never fetched from the delivery itself).
- Policy entry shape: `{ keyId, publicKey, examinerSeat, validFromUtc, validUntilUtc, status }`, plus a **rotation / revocation list**: rotation = a new `keyId` entry is added and the old entry's `validUntilUtc` is set (old signatures inside their validity window stay verifiable); revocation = `status: "revoked"` with `revokedAtUtc` + reason recorded. A revoked key, and any key outside its validity window at `issuedAtUtc`, is not trusted.
- A signature whose `keyId` is absent from the policy is **never** verified against the envelope-supplied key as a fallback. There is no fallback. (Outcome: §7.5.)

### 7.2 Non-circular detached hashing — the signed manifest

- The signed content is a **signed manifest** and nothing else:

```json
"SignedManifest": {
  "schema": "provadia.passport.v1",
  "passportId": "<passportId>",
  "passportRevision": 1,
  "keyId": "<signature.keyId>",
  "artifactSha256": "<subject.artifacts[0].sha256 — the delivered package digest>",
  "testTranscriptSha256": "<verification.transcriptSha256>",
  "sbomSha256": "<securityAndLicense.sbomSha256>"
}
```

- The manifest covers **payload digests only**. Inner artifacts are bound through the package digest (the package contains them) and through the digest-bound transcript, whose artifact manifest names them. The manifest does **not** contain the signature, any hash of itself, or the passport digest — non-circular by construction; there is no self-reference to exclude at verify time.
- `sig` = base64( Ed25519_sign(examiner private key, RFC 8785 JCS canonical bytes of the SignedManifest) ) — canonicalization per §2.1/§7.4, key per §7.1.
- **Detached outer digests:** the whole-envelope passport digest (§2.1) and any delivery-archive digest are computed over the finished envelope and recorded **outside** it (register / delivery record). They are never fields inside the signed manifest, and signature verification never depends on a digest that contains the signature.
- **Verification order (amends §2.3):** parse (duplicate keys ⇒ MALFORMED, §7.4) → re-derive the three payload digests from the artifact, transcript and SBOM and compare against the manifest → canonicalize the manifest → verify the signature against the **pinned** key (§7.1) → §2.4 invariants → per-claim grading (§2.3 step 7). Descriptive and rollup fields are verified by this re-derivation and the invariants — the signature's job is to bind the digests to a pinned examiner key, and this schema now says so instead of implying the signature covers every word.

### 7.3 Per-gate explicit status — signature validity never implies a gate passed

- Every gate in `verification.gateVerdicts[]` and every check in `securityAndLicense.securityChecks[]` records an **explicit** status: `PASS | FAIL | UNVERIFIED`. A gate with no evidence is recorded `UNVERIFIED` — present in the record, never omitted, never defaulted to PASS, and never inferred from the signature, from another gate, or from the verdict.
- A passport may be validly signed with gates at FAIL — the verifier prototype's honest attestation of a failing artifact is the model case. Signature validity attests the digests (§7.2); gate status attests the examination; the two never borrow each other's strength.
- **Claim discipline (never-claims, binding as §4 items 9–11):**
  9. **No SLSA level.** This schema is *modeled on* in-toto / SLSA v1.2 discipline. No SLSA level (e.g. "SLSA Level 2") may be claimed unless that level's requirements are separately verified and the verification recorded as its own check.
  10. **No full CycloneDX compliance.** The SBOM enters the passport as a digest-bound reference. "CycloneDX compliant" (or equivalent) may not be claimed unless the SBOM itself passes CycloneDX schema validation, recorded as its own check with its own status.
  11. **No legal compliance from the Art. 50 marker.** `aiDisclosure`'s marker is a machine-readable transparency marker only. It never claims compliance with the EU AI Act or any other law, in any wording.

### 7.4 Canonicalization attack control (Gemini vector 1)

The attack: duplicate JSON keys (`{"gatesFailed":[],"gatesFailed":["SECRET_SCAN"]}`) or normalization differences make the signer's parser and the verifier's parser read different documents, or the signature verifies raw bytes while a UI renders a re-parsed object.

- **RFC 8785 (JCS) over UTF-8** — already mandated in §2.1 — is the only canonical form, for the signed manifest (§7.2) as for the envelope.
- **Duplicate-key rejection:** any parser handling a PDP-v1 payload MUST reject a document containing duplicate object keys, at any depth, as MALFORMED. The ambiguity is refused, never resolved by parser order, first-wins, or last-wins.
- **Consumer binding:** UI/CLI consumers render and act on the **verified parsed object** produced by verification — never a re-parse of the raw input after verification. The object that was verified is the object that is shown; there is no verify-one-thing/display-another gap.

### 7.5 Signer identity — the trusted-examiner requirement

- Pinned keys may be held **only by examiner seats**: the blind verifier / examiner seat for the delivery, independent of every producer seat on that artifact (invariant I6 extended from the written record to key custody). A producer seat's key is never pinned for its own line's passports; a passport signed by its producer is, at best, UNVERIFIED_SIGNER.
- Key issuance, rotation and revocation are register events: the policy (§7.1) records which examiner seat holds each `keyId`, from when, and why any key stopped being trusted.
- **Verification outcomes (vocabulary amended):**
  - **VALID** — `keyId` pinned and in-window, signature verifies against the pinned key, payload digests re-derive (§7.2).
  - **INVALID** — signature fails against the pinned key · a payload digest mismatches · the envelope key conflicts with the pinned key · the document is MALFORMED (incl. duplicate keys). ⇒ REJECTED.
  - **UNVERIFIED_SIGNER** — the signature is cryptographically valid under the presented key, but that `keyId` is absent from the pinned policy, expired, or revoked. **A distinct outcome from INVALID:** the document may be internally consistent, but no trusted examiner stands behind it. The passport is not accepted as examined evidence and its `verdict` is capped at `UNVERIFIED` regardless of its contents.
- Prototype keys are labeled **NONPRODUCTION_TEST_KEY_ONLY** wherever pinned for testing; passports signed under them are specimens, and no outcome vocabulary above upgrades them.

---

## §8 — CORRECTION PASS 2026-11-26 (Guardian adjudication) + version history

**Source:** Guardian — PDP-v1 Wave 1 & Wave 2 Schema Adjudication (founder hand-carry; transcribed at `partner-desk/REPORTS/GUARDIAN_PDP_V1_WAVE1_WAVE2_SCHEMA_ADJUDICATION_2026-11-26.md`). Verdict: architecture and schema direction ACCEPTED; the lock is reopened for this bounded, versioned corrigendum before consumer-contract acceptance. The Wave 2 improver pass is not a critic/blind PASS.

**Version history of this document:**

| Version | Date | Change |
|---|---|---|
| Wave 1 lock | 2026-11-26 | Canonical schema locked (§§0–6): PDP-v1 ↔ PAE-v1 unified; D1–D12 reconciliation. |
| Amendment §7 | 2026-11-26 | Guardian First Construction Review + Gemini conformance: pinned trust root, signed manifest, per-gate status, duplicate-key control, UNVERIFIED_SIGNER. |
| Correction pass (§8) | 2026-11-26 | Guardian schema adjudication A1–A5 incorporated; §7 folded into the body; I1 loophole closed; §2.6 adversarial fixtures added. |

**Dispositions of the five blocking defects:**

- **A1 — Trust binding: CORRECTED in body.** §2.3 step 2 binds `keyId` to the independently distributed pinned policy; substituted/re-signed envelopes are rejected even if cryptographically valid (envelope key ≠ pinned key ⇒ INVALID; valid-but-unpinned ⇒ UNVERIFIED_SIGNER); every verification records an explicit trust result + policy version; no trust on first use; policy freshness limits are visible (STALE_POLICY caps the verdict); §2.1's strict parse rejects duplicate keys before parsing, malformed UTF-8/lone surrogates, unsafe numeric ranges and unknown schema; consumers render the same verified parsed object (§2.3 step 7); no production keys (NONPRODUCTION_TEST_KEY_ONLY only).
- **A2 — Zero-defect gating: CORRECTED in body.** §2.4 I1 blocks **both** PASS and PASS-AFTER-FIX on any unresolved defect, failed required gate, unresolved required test or unknown required evidence; I4 rewritten — final-run results distinct from history, every fix bound to its original `defectId` + patch/revision + new evidence + independent retester, the gate partition derived from a unique required gate set per profile (no empty/missing/duplicate gate or suite can manufacture success), INCOMPLETE vs UNVERIFIED distinguished deterministically (failure dominates), licence violations cannot be neutralized via `scope.exclusions` (I5). Negative fixtures recorded as §2.6 T5–T10, T15, T16.
- **A3 — Typed fields: CORRECTED in body.** §1 replaces the bare string `"UNVERIFIED"` in typed fields with the typed evidence-status object (`UNVERIFIED` | `NOT_APPLICABLE` + mandatory reason; NOT_APPLICABLE requires profile-governed justification); no invented zero/empty values for unknowns; stable seat ids added to `seats[]`, `examiner` and `fixRounds[]` (`fixingSeatId`, `defectId`, `patchRef`, evidence links) so I6/I7 are enforceable by id; the schema states that a signature alone does not prove seat independence.
- **A4 — Packaging hash: CORRECTED in body.** §1.2: the package digest excludes the passport and signature; no self-referential archive digest; detached archive-level receipt where needed; evidence named by exact path+hash+size with traversal/absolute/symlink/duplicate paths rejected; every named evidence file (incl. `thirdPartyLicensesRef`) is checked or marked unavailable; the verifier never executes the artifact to verify (§2.3 step 4); rebuild/intake references are not verified merely because a hash string is signed; §2.5 now distinguishes semantic alteration (fails) from benign whitespace/order (does not), and D1 records that digest comparison also detects tampering — the signature adds signer authentication under the trust policy.
- **A5 — AI disclosure: CORRECTED in body.** §1 `aiDisclosure` + D9: `article50Disclosure` and `aiAssistanceLevel` record actuals with evidence (or the typed status object), never assumed constants and never a legal certification; SBOM-lite is explicitly distinct from full CycloneDX (never-claim 10); §4 never-claims preserved in full.

**Wave 2 seam dispositions touching this schema (adjudication §B):** B1 — Lane 3's content groups are retained and the landed unified schema governs; the human rendering is generated from the canonical verified object (§0/D12, §2.3 step 7). B7 (schema half) — verification outcomes now expose the explicit trust result (§2.3 step 2), so downstream receipt links can show actual trust/verification status rather than the mere presence of a reference. The remaining §B dispositions govern the Lane 1/2/4/5/6 documents and are recorded there, not here.

**Closure path from here (adjudication §C), in order:** (1) this revised schema — **done, this pass** · (2) publish the formal machine-readable schema + semantic validator rules + the §2.6 conformance vectors as companion artifacts — **NEXT STEP, not yet done; nothing in this document claims they exist** · (3) different-family critic recheck of all five conformed lane specifications against this corrected schema · (4) blind verifier independently executes the positive and adversarial fixtures and reports exact paths/revisions, raw outputs, hashes and verdict. Only final Passport-dependent acceptance waits on steps 2–4; all other construction continues in parallel. Fences unchanged: no spending, deployment, live data, commercial launch, escrow, chain anchoring or financial action.
