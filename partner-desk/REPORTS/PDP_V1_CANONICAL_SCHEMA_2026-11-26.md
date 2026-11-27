# PDP-v1 — CANONICAL SCHEMA (LOCKED, Wave 1)

**Artifact:** the PROVADIA Delivery Passport, schema `provadia.passport.v1`
**Status:** LOCKED as the upstream spine of FVR-34 (founder lock-in contract, 2026-11-26 20:28 CT). Lanes 1, 4 and 5 import this schema exactly; Wave 2 documents are graded against §6 of this file.
**Sources reconciled:** (A) `SPEC_LANE3_PROOF_OF_DELIVERY_PROVENANCE.md` — the Passport content spec · (B) `GEMINI_DUAL_SURFACE_ARCHITECTURE_2026-11-26.md` §4.1 — the PAE-v1 envelope · (C) FVR-34 lock-in addendum, Lane 3 paragraph — the founder's field groups (subject / origin / securityAndLicense / verification / signature), in-toto/SLSA v1.2 + CycloneDX modeling.
**Fences:** paper only · $0 · the signature in this schema is a local document signature under a house test key — **no signing of anything real, no wallet, no chain, no broadcast; mainnet HOLD** · no deployment · no commercial standing (FVR-26 unfounded).

---

## §0 — The PDP-v1 ↔ PAE-v1 relationship (decided)

**PDP-v1 and PAE-v1 are one artifact, not two: PDP-v1 is the Delivery Passport, and PAE-v1 is the name of its signed machine envelope — the canonical JSON rendering of the passport's checkable core is the PAE envelope, and that envelope is what gets signed and what verifiers verify.**

Why: source (A) already defines the Passport as two renderings of one content (human Markdown + machine manifest, §1.1 of A); source (B) supplies the machine rendering's envelope shape and signature; source (C) names the delivered artifact "PDP-v1" while mandating the signature group. There is therefore exactly **one** file — `passport.pae.json` (the PAE envelope) — plus its human Markdown rendering generated from it. No lane may emit a "passport" and an "attestation" as separate documents.

---

## §1 — The canonical schema

One JSON object. **Every field is mandatory unless marked OPTIONAL.** A mandatory field that cannot be filled carries the string `"UNVERIFIED"` with a sibling `*_unverified_reason` — it is never omitted and never filled by assumption (source A §1.2; Zero Known-Defect rule 6). Types: `sha256` = 64 lowercase hex chars; `utc` = RFC 3339 UTC (`...Z`); `int` = non-negative integer.

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
    "reproducibleRebuildSha256": "<sha256 or UNVERIFIED>",
    "assumptionRegisterRef": "<dated figure·source·check-date register>",
    "seats": [
      { "role": "builder | improver | critic | economics | blind_verifier",
        "family": "<model/family identity>", "startedUtc": "<utc>", "endedUtc": "<utc>" }
    ],
    "examiner": "<blind verifier seat identity — never the producer>",
    "completeClock": { "totalSeatMinutes": 0, "reconstructedSegments": [] }
  },

  "scope": {
    "scopeStatement": "<what was built or repaired, in plain words>",
    "exclusions": ["<what was deliberately NOT done or NOT checked>"]
  },

  "securityAndLicense": {
    "securityChecks": [
      { "check": "SECRET_SCAN", "method": "<tool/method>", "result": "PASS | FAIL",
        "evidenceRef": "<reference>" }
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
      { "defect": "<defect found in production>", "fix": "<correction>",
        "retestedBy": "<seat different from the fixing seat>", "result": "PASS | FAIL" }
    ],
    "transcriptSha256": "<sha256 of the full test transcript>",
    "verdict": "PASS | PASS-AFTER-FIX | INCOMPLETE | UNVERIFIED",
    "limitations": "<mandatory, written for this delivery: what this passport does NOT establish>",
    "founderGate": "The founder's final approval remains mandatory above every seat's verdict; this passport records evidence, it does not approve."
  },

  "aiDisclosure": {
    "article50Disclosure": true,
    "aiAssistanceLevel": "human_verified_ai_assisted",
    "machineReadableMarker": "urn:provadia:ai-transparency:v1"
  },

  "signature": {
    "alg": "Ed25519",
    "publicKey": "<base64 house verifier public key — test key under the current fences>",
    "sig": "<base64 Ed25519 signature over the canonical bytes, §2>"
  }
}
```

### 1.1 Reconciliation decisions (each difference, chosen, one line why)

| # | Difference | Decision | Why (one line) |
|---|---|---|---|
| D1 | (A) issues the passport as an unsigned document act; (B) and (C) mandate an Ed25519 `signature` group. | **Signed envelope wins** — every PDP-v1 carries §2's signature. | The founder's lock-in (C) postdates and overrides (A) on this point, and 1-bit tamper-evidence is impossible without a signature. |
| D2 | (B) names the id `attestationId` (per-issuance); (A) names it `passport_id` (durable, with revisions). | **`passportId` + `passportRevision` + `supersedes`** (A's model, B's id format). | Revisions must chain under one durable identity or a corrected delivery looks like a new, unrelated artifact. |
| D3 | (C) gives `subject.sha256` (single hash); (A) requires the two-level hash (package + inner artifacts, the #501 shape). | **`subject.artifacts[]`** — an array of `{role, fileName, sha256, bytes}`; the first entry is the delivered package. | The schema must regenerate #501's packet without inventing or dropping a field (A §3 closure test), and one hash cannot name both levels. |
| D4 | (B) allows `commitOrSlotRef` incl. `solana-slot:…`; (C) uses `sourceCommitOrRecipeHash` + `buildRecipeRef`. | **(C)'s form wins; slot/chain refs are excluded from PDP-v1.** | Mainnet HOLD and (A)'s no-anchoring fence bar chain references; the recipe hash carries the same provenance without them. |
| D5 | (C) compresses origin to `builderSeat`; (A) requires the full `seats[]` relay record + separate `examiner`. | **`seats[]` + `examiner` kept in full**; (C)'s `builderSeat` is the `seats[]` entry with `role:"builder"`. | Seat separation is itself a blind-check step (A §2 Step 4) — a single builder field cannot prove the producer didn't grade its own work. |
| D6 | Only (A) has `scope` (statement + exclusions). | **Kept, mandatory.** | The never-claims (§4) and blind-check Step 2 are unenforceable without a written scope and named exclusions. |
| D7 | (C)'s securityAndLicense is four summary scalars; (A) carries `security_checks[]` detail + mandatory `known_defects[]`. | **Both: (C)'s scalars are rollups derived from (A)'s arrays**, and `knownDefects[]` is mandatory, present even when empty (empty = `[]` **and** the human rendering states "No known unresolved defects at issue time"). | The scalars are the machine-checkable headline; the arrays are the evidence behind them — a rollup that disagrees with its detail fails verification (§2.4). |
| D8 | (C) gives scalar `testsPassed/testsFailed`; (B) gives `gatesPassed/gatesFailed`; (A) gives `test_suites[]`, `gate_verdicts[]`, `fix_rounds[]` and a four-value `verdict`. | **All kept: (A)'s arrays are the record; (B)/(C) scalars and lists are rollups of them; the verdict enum is (A)'s — `PASS · PASS-AFTER-FIX · INCOMPLETE · UNVERIFIED`, no fifth value, no aggregate score.** | A bare pass/fail cannot express "defects fixed and retested" vs "evidence missing," and those are different facts a buyer must not confuse. |
| D9 | Only (B) has `euAiActCompliance`. | **Kept as `aiDisclosure`**, mandatory, values from (B) verbatim. | It is the only source addressing machine-readable AI-transparency marking; dropping it would fork Pillar 3's auditor use case. |
| D10 | Only (B) has `settlementProof` (x402/Stripe rails). | **Excluded from PDP-v1.** | Settlement belongs to opportunity #11's future escrow receipt, not to delivery evidence; rail fields inside a passport would invite exactly the commercial claim §4 forbids while every rail is on HOLD. |
| D11 | Only (A) has licensing beyond the SBOM (licence granted, attribution file + hash, ownership). | **Kept in full** inside `securityAndLicense`. | (C)'s `copyleftViolations` counts what (A)'s attribution file proves; a passport summarizing a licence that isn't in the package is a failed check (A §2 Step 6). |
| D12 | (A) requires two renderings (human + machine); (B)/(C) describe only JSON. | **Kept: the PAE JSON is canonical; the human Markdown rendering is generated from it, never hand-edited separately.** | One source of truth — a hand-edited rendering is a fork, and forks are what this lock exists to prevent. |

### 1.2 Field rules that bind every emitter

- `artifactType` ∈ `software_build | diagnostic_report | ai_deliverable | mcp_tool_output` (B's enum; `diagnostic_report` is a Hospital diagnostic-only delivery).
- `producerLine` ∈ `FACTORY | HOSPITAL | WORKFORCE` (A defined the first two; WORKFORCE is Lane 5's line under the same schema — see §3).
- `verdict` consistency is part of the schema, not guidance — see §2.4.
- `limitations` and `founderGate` are mandatory verbatim-bearing fields: `founderGate` carries the §1 sentence exactly; `limitations` is written for the delivery (boilerplate is a floor, never a substitute — A §1.2H).
- Timestamps: `issuedAtUtc` is the last timestamp in the document; all seat stamps fall inside the manufacture window; any reconstructed clock segment is flagged in `completeClock.reconstructedSegments` where it stands (A §1.2C honesty rule).

---

## §2 — Canonicalization + Ed25519 signing / verification contract

This is the exact contract a verifier implements. It follows (C)'s in-toto/SLSA discipline — every claim digest-bound to the artifact — and the Gatehouse order (Lock → Sign → Persist → Verify) **in design only**: the record is assembled and persisted before the signature exists; the signature binds to that record; nothing is broadcast anywhere.

### 2.1 Canonical form

1. Take the complete PDP-v1 JSON object. Set `signature.sig` to the empty string `""`. (`signature.alg` and `signature.publicKey` remain in place and are signed.)
2. Serialize with **JSON Canonicalization Scheme (RFC 8785 / JCS)**: object keys sorted lexicographically by UTF-16 code unit, no whitespace, strings minimally escaped per JCS, numbers in JCS form (integers only in v1 — no floats anywhere in the schema), UTF-8 encoded.
3. The resulting byte string is the **canonical bytes**. Its SHA-256 is the **passport digest**.

### 2.2 Signing (issuer side)

4. `sig` = base64( Ed25519_sign(house private key, canonical bytes) ). Ed25519 signs the canonical bytes directly — no pre-hash, no additional framing.
5. Issue order (mandatory): **assemble all fields → persist the unsigned record → sign → persist the signed envelope with the delivery → release**. A verdict or signature that predates its evidence fails verification of process even if the cryptography checks out (A §5).

### 2.3 Verification (checker side — offline, zero producer assistance)

A verifier holding only the artifact files + `passport.pae.json` performs, in order:

1. **Parse + schema**: reject as MALFORMED if any mandatory field is absent (absent ≠ empty; A §2 Step 5).
2. **Re-canonicalize**: apply §2.1 to the received object (sig → `""`, JCS). Transport formatting, key order and whitespace in the received file are irrelevant — the verifier never trusts the file's byte layout, only its parsed content.
3. **Verify signature**: Ed25519_verify(`signature.publicKey`, canonical bytes, base64-decode(`signature.sig`)). Failure ⇒ **REJECTED — signature invalid**, stop.
4. **Verify artifact binding**: SHA-256 every file named in `subject.artifacts[]`; compare hash **and byte size**. Any mismatch ⇒ **REJECTED — the passport describes a different artifact**, stop (A §2 Step 1).
5. **Verify transcript + SBOM binding**: SHA-256 the test transcript and the CycloneDX SBOM; compare against `verification.transcriptSha256` and `securityAndLicense.sbomSha256`. Mismatch ⇒ REJECTED for the affected claim group.
6. **Verify cross-field invariants** (§2.4). Any violation ⇒ the passport is internally false — REJECTED whole.
7. **Grade per claim group** CONFIRMED / NEEDS-CHECK / REJECTED (house Two-Axis grading); REJECTED findings stay on record. There is no aggregate trust step.

**Signer identity in v1 (stated honestly):** step 3 proves the envelope is untampered *since signing by whoever holds the key paired to `signature.publicKey`*. It does not by itself prove the signer is PROVADIA — identity pinning is a paper process in v1: the house public key's fingerprint is recorded in the register alongside this schema, and a checker compares the passport's key against that record. Key custody is a local test key under the current fences; no production key exists and none is created by this document.

### 2.4 Cross-field invariants (a verifier MUST enforce all of them)

- I1. `knownDefects` non-empty ⇒ `verdict` ≠ `PASS`. (Zero Known-Defect rule 1.)
- I2. Any mandatory field = `"UNVERIFIED"` ⇒ `verdict` = `UNVERIFIED`.
- I3. `verification.testsPassed` = Σ `testSuites[].testsPassed`; same for `testsFailed`. A rollup that disagrees with its detail invalidates the passport.
- I4. `gatesFailed` = the ids in `gateVerdicts[]` whose verdict is a failure/STILL OPEN; `testsFailed` > 0 with `verdict` = `PASS` is permitted **only** if every failure appears in `fixRounds[]` with `result:"PASS"` retest by a different seat — and then the verdict is `PASS-AFTER-FIX`, never `PASS`.
- I5. `securityAndLicense.secretScan` = `FAIL` ⇒ `verdict` ∈ {`INCOMPLETE`, `UNVERIFIED`}; likewise `vulnerabilityPolicy` = `FAIL`, and `copyleftViolations` > 0 must be named in `scope.exclusions` or `knownDefects` or the passport is internally false.
- I6. `examiner` ≠ every producer seat in `seats[]`, and examiner's `family` differs from the builder's. (A §2 Step 4.)
- I7. Every `fixRounds[]` entry: `retestedBy` ≠ the seat that made the fix.
- I8. `issuedAtUtc` ≥ every `seats[].endedUtc`; unflagged reconstructed clock segments discovered later void the clock claims, not the hashes (A §2 Step 7).

### 2.5 The 1-bit rule (what a single changed bit does)

- **1 bit in the artifact** → its SHA-256 changes → step 4 mismatch → REJECTED. The passport says nothing about the altered artifact.
- **1 bit in the test transcript or SBOM** → its hash changes → step 5 mismatch → the verification claims are REJECTED.
- **1 bit in any passport field** (a verdict letter, a timestamp digit, a gate id) → the canonical bytes change → the Ed25519 signature fails at step 3 → REJECTED, before any content is even read.
- **1 bit in `signature.sig` or `publicKey`** → step 3 fails → REJECTED.
- There is no "close enough": a figure that doesn't re-derive is failed (FVR-12 doctrine, via A §2).

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
2. **No PASS over a known defect.** A known unresolved defect blocks PASS at any severity; a verdict issued over one is a report of incompletion — and a record that does so is itself a defect.
3. **No claim beyond the checks run.** Missing evidence = UNVERIFIED, never PASS. The passport attests to the checks listed in it, at the times listed in it, on the hashes listed in it — nothing else, nothing later, nothing similar.
4. **No claim about any other artifact.** A different file — different hash, different version, a rebuild — is a different artifact. The passport is silent about it and says so in `limitations` (any modification re-opens the affected gates).
5. **No live-deployment claim from local evidence.** Local files are not proof of live deployment; a passport issued on local evidence says "verified locally" and names the live leg under `exclusions`.
6. **No founder approval.** The passport is evidence laid before the founder's chair; it never states or implies the founder approved, endorsed, or judged the delivery.
7. **No future-tense claims.** Nothing about durability, future compatibility, future security, or fitness for a purpose the scope statement didn't name. The passport is a record of a past examination, dated.
8. **No commercial standing.** Until FVR-26 is founded and reviewer/liability terms exist (NOT FOUND today), the passport is an internal delivery instrument — not an audit product, not a seal for sale, carrying no language a third party could mistake for one.

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
- [ ] Rollups reconcile: `testsPassed/testsFailed` = suite sums (I3); security scalars derivable from `securityChecks[]` + SBOM (D7).

**Cryptographic contract**
- [ ] Canonicalization implemented/described exactly as §2.1 (sig → `""`, RFC 8785 JCS, UTF-8) — no "sign the file as-is" variant.
- [ ] Verification described/performed in §2.3 order, offline, with zero producer assistance; signer-identity pinning stated as the paper process it is (§2.3), never oversold as proof of identity.
- [ ] 1-bit tests specified or run: artifact bit → hash mismatch; transcript/SBOM bit → hash mismatch; passport-field bit → signature failure (§2.5).
- [ ] Issue order respected: evidence assembled + persisted before signature; no verdict predates its evidence (§2.2 step 5).

**Lane import contract**
- [ ] Lane 1: Eight-Gate `gateVerdicts[]`, two-level `artifacts[]`, rebuild hash or honest `UNVERIFIED`, licence fields matching shipped files; #501's frozen RC unaltered.
- [ ] Lane 4: intake hash in `origin.inputs[0]`, defect list in place of gate verdicts, STILL OPEN defects mirrored into `knownDefects`, tariff class marked internal-test-only, no delivery without a passport.
- [ ] Lane 5: three Solnik requirements as named suites with counts, ActionProposal transcript hash-bound, no forked worker-passport variant, no presumed CIV-059 house.
- [ ] References use the `{passportId, passportRevision, subject.artifacts[0].sha256}` triple; no copied/embedded passport clones in lane documents.

**Never-claims + fences**
- [ ] Full-text scan of the document and its example passports: none of the §4 eight claims appears in any wording ("certified / guaranteed / safe" absent as artifact claims).
- [ ] No settlement/rail fields, no chain references (D4, D10), no chain-anchoring design or promise.
- [ ] $0, paper/local only, no deployment, no commercial offer or price-as-offer anywhere; mainnet HOLD and the FVR-26 gate stated where the document touches outsiders.

---

## Sources

- `~/workspace/newwave/next-build/economy/SPEC_LANE3_PROOF_OF_DELIVERY_PROVENANCE.md` — field set (§1.2), blind-check procedure (§2), lane attachment (§3), never-claims (§4), Gatehouse ordering debt (§5), acceptance tests (§6).
- `~/workspace/newwave/next-build/economy/GEMINI_DUAL_SURFACE_ARCHITECTURE_2026-11-26.md` §4.1 — PAE-v1 envelope: field names, `verifierVersion`, gate lists, transcript/SBOM hashes, `euAiActCompliance`, Ed25519 signature block. (Its `settlementProof` and `solana-slot` ref are excluded per D4/D10.)
- `~/workspace/newwave/next-build/FOUNDATIONAL_VISION_REGISTER.md` — FVR-34 lock-in addendum (2026-11-26 20:28 CT): Lane 3 as upstream spine; PDP-v1 field groups; in-toto/SLSA v1.2 + CycloneDX modeling; standalone offline verifier; 1-bit tamper rule; Relay execution order (Wave 1 = this lock).
