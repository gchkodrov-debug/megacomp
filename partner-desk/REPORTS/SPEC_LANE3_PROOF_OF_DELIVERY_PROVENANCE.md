# SPEC — LANE 3: PROOF-OF-DELIVERY + PROVENANCE MECHANISM

**Lane:** 3 of the Economic Expansion Construction Order (FVR-34)
**Issued under:** `CONSTRUCTION_ORDER_ECONOMIC_EXPANSION_2026-11-26.md`, Lane 3 — "Build the mechanism: every Factory/Hospital delivery carries independently checkable evidence — origin, security checks, licensing, tests run, delivery hash."
**Register homes:** FVR-34 opportunities **06** (Trust & Software Verification) + **09** (Digital Proof of Provenance) · discipline line: **FVR-12** (The Foundation + The Verifier) · commercial form: **FVR-26** Guardian — **PROPOSED, not founded** (this spec does not found it and sells nothing under it).
**Status of this document:** SPECIFICATION ONLY. Paper/local. No build is authorized by this document beyond the isolated specimen in §6; no deployment, no commercial launch, no customers.
**Fences (binding, restated from the construction order):** $0 new spending · no deployment · no commercial launch · Zero Known-Defect Rule and Relay Law bind every step · mainnet HOLD — no signing of anything real (§5).

**Why this lane exists, in one line:** the captain's reconciliation found the 'Proof of Delivery' passport **NOT FOUND as a named artifact** in the registers — our evidence packets (Specimen #501's `EVIDENCE_PACKET.md` is the worked example) are its unstandardized ancestors. This lane names the artifact, fixes its fields, and makes it checkable by someone who has never met us.

Sources are cited inline as [file]. Where a thing does not exist, this spec says NOT FOUND rather than inventing it.

---

## §1 — The evidence object (the "Passport")

### 1.1 Form

- The Passport is a **single evidence file that travels inside the delivery itself**, plus a detached copy held separately from the producer's machine (FVR-12 Verifier doctrine: the proof pack is stored off the founder's server [FOUNDATIONAL_VISION_REGISTER.md, FVR-12]).
- Two renderings of the same content, generated from one source, never hand-edited separately:
  1. **Human rendering** — Markdown, readable cold by a customer.
  2. **Machine rendering** — a `MANIFEST.sha256`-style manifest plus a structured field block, so a script (ours today, a third party's tomorrow, FVR-12's Verifier when built) can re-derive every checkable figure. (The two-level hash shape already exists in practice: #501's packet hashes both the delivered ZIP and the app inside it [software-factory/specimen-501/EVIDENCE_PACKET.md].)
- The Passport is **versioned as an artifact in its own right** (schema version + passport revision). Any modification to the delivery or the evidence re-issues the Passport at a new revision and re-opens the affected gates — a prior verdict never carries over a modification [conveyor/VERIFICATION_STANDARD_ZERO_KNOWN_DEFECT_2026-11-25.md, rule 7].

### 1.1A Lock-in conformance — PDP-v1 and the canonical schema (FVR-34 addendum, 2026-11-26 20:28 CT)

The founder's lock-in contract names this artifact and fixes this lane's place in the order:

- **The artifact's contract name is PDP-v1 — the PROVADIA Delivery Passport.** "Passport" in this spec means PDP-v1.
- **Lane 3 is the UPSTREAM SPINE.** The canonical PDP-v1 schema locks FIRST (Relay Wave 1); Lanes 1, 4 and 5 **import its exact canonical JSON + Ed25519 verification contract**. No lane — including this one, once the lock lands — maintains a divergent evidence format.
- **The canonical schema of record is `economy/PDP_V1_CANONICAL_SCHEMA.md`.** The field groups in §1.2 below are this draft's **content requirements** — what evidence must exist, drawn from #501's packet and the paper's list (§1.2's closure test stands). They are carried **inside** the canonical schema's blocks: `subject { artifactId, artifactType, sha256, buildRecipeRef }` · `origin { builderSeat, sourceCommitOrRecipeHash, reproducibleRebuildSha256 }` · `securityAndLicense { secretScan, sbomSha256, copyleftViolations, vulnerabilityPolicy }` · `verification { testSuiteId, testsPassed, testsFailed, transcriptSha256 }` · `signature { alg: "Ed25519", publicKey, sig }`. **Where §1.2 and the canonical schema diverge, the canonical schema governs**; the divergence is named in the Wave 2 conformance report, never silently resolved here. This spec invents no passport fields beyond §1.2's evidenced content set, and §1.2 yields to the lock.
- **Modeling:** PDP-v1 is modeled on **in-toto / SLSA v1.2 provenance** and **CycloneDX (v1.6) SBOM digest-bound attestations** — every claim cryptographically tied to the exact artifact SHA-256 digest, never to a mutable filename or tag.
- **Standalone offline verifier + tamper rule:** the §2 blind-check procedure is executed by a standalone verifier (CLI/browser) that runs **offline with zero producer assistance**; a **1-bit modification to either the deliverable or the test transcript invalidates verification immediately** (proven by AT-3).

### 1.2 Exact fields

Every field is mandatory. A field that cannot be filled is written as **UNVERIFIED** with the reason — it is never omitted and never filled by assumption [Zero Known-Defect, rule 6]. The field set is the paper's own list — artifact hash, version, scope, test results, examiner, time, limitations [PROVADIA_ECONOMIC_CIVILIZATION_EXPANSION_v0.1_ChatGPT_2026-11-26.md, §Trust] — expanded only with fields #501's packet already carries, per the reconciliation's closure test: *the passport regenerates Specimen #501's evidence packet in the new format without inventing a field* [CAPTAIN_RECONCILIATION_ECONOMIC_EXPANSION_DRAFT_2026-11-26.md, §2].

**A. Identity**
| Field | Content |
|---|---|
| `passport_id` | One durable identity for the delivery's whole life; never reused. |
| `passport_schema` | This spec's schema version. |
| `passport_revision` | Revision of this Passport; increments on any re-issue, with `supersedes` naming the prior revision. |
| `artifact_name` / `artifact_version` | The delivered thing and its version, exactly as the customer receives it. |
| `producer_line` | `FACTORY` or `HOSPITAL` (Lane 1 / Lane 4), plus the specimen or order reference. |
| `authorization_ref` | The authorization the work was done under (founder order / construction-order lane), quoted or linked — #501's packet opens with exactly this line. |

**B. Origin & provenance**
| Field | Content |
|---|---|
| `inputs` | What the artifact was made from: source materials, and for Hospital work the intake record — the customer's (specimen: synthetic) broken application as received, with its own hash, so "before" is provable, not described. |
| `construction_method` | How it was made, stated as fact (e.g. #501: "constructed by the house builder seat directly in the chassis — no external generator was used"). Any external generator, template or third-party component used is named here, never hidden. |
| `assumption_register_ref` | The dated source register every factual figure in the artifact traces to (figure · source · check date), as in #501 Stage 01. |

**C. Producer seats (the Relay, named)**
| Field | Content |
|---|---|
| `seats[]` | One entry per Relay seat — builder → improver → different-family critic → economics (where applicable) → blind verifier — each with: seat role, model/family identity, and its working timestamps. Producer and examiner are never the same seat; builder and reviewer incentives stay separate [paper, §Trust]. |
| `examiner` | The blind verifier seat's identity, named separately because §2's check depends on the examiner not being the producer. |
| `complete_clock` | Total seat-time, with the #501 honesty rule: any segment reconstructed rather than live-stamped is **flagged as reconstructed where it stands** — the flaw is named, not smoothed over. |

**D. Scope**
| Field | Content |
|---|---|
| `scope_statement` | What was built or repaired, in plain words — the exact claim the rest of the Passport supports. |
| `exclusions` | What was deliberately NOT done or NOT checked (e.g. #501 Gate 7: "its store-checkout leg was excluded by the authorization itself and is named, not hidden"). An exclusion written here is honest; the same gap left unwritten is a defect. |

**E. Security checks**
| Field | Content |
|---|---|
| `security_checks[]` | One entry per check actually run: what was checked, method/tool, result, evidence reference. Only checks that were run appear; a check not run is listed under `exclusions`, never implied. |
| `known_defects[]` | Every known unresolved defect at issue time, with severity. **This field is present even when empty**, and empty is written as the sentence "No known unresolved defects at issue time" — never as a missing field. If this list is non-empty, the verdict block (§1.2H) cannot read PASS [Zero Known-Defect, rule 1]. |

**F. Licensing**
| Field | Content |
|---|---|
| `license_granted` | The licence the customer receives, in plain English (the #501 shape: a `LICENSE.txt` permanent-use licence shipped inside the package). |
| `third_party_licenses_ref` | The generated third-party attribution file (in #501: `THIRD-PARTY-LICENSES.txt`, generated from the shipped bundle by `scripts/license-pack.mjs`) plus its hash — so the checker can confirm the attribution file itself was not altered after issue. |
| `ownership_statement` | Who owns what: the artifact, its inputs, and (Hospital) the customer's original application — ownership is verified and stated, never assumed [paper: "Verify ownership/license, provenance"]. |

**G. Tests run + results**
| Field | Content |
|---|---|
| `test_suites[]` | One entry per suite: suite name, item count, pass/fail counts, environment, and the evidence reference a checker can re-run or inspect. Counts are stated as fractions (e.g. #501: golden suite 33/33; Eight Gates 7 PASS · 1 PASS-after-fix · 0 FAIL) — never as a bare "tested". |
| `gate_verdicts[]` | Factory deliveries: the Eight-Gate verdicts, one line per gate with its evidence. Hospital deliveries: the original defect list, one line per defect — FIXED-AND-RETESTED / STILL OPEN — where STILL OPEN entries also appear in `known_defects[]`. |
| `fix_rounds[]` | Every defect found during production, its fix, and the **independent retest** that closed it. Assigning a correction is not completing it; a defect closes only when a different seat retests it [Zero Known-Defect, rules 2 + 5]. |

**H. Delivery hash + verdict**
| Field | Content |
|---|---|
| `delivery_hash` | SHA-256 of the delivered artifact exactly as delivered, **and** the SHA-256 + byte size of each principal inner artifact (the #501 two-level shape: ZIP hash + size, inner app hash + size). The algorithm is named in the field; an unnamed hash is not a hash. |
| `timestamps` | Manufacture window, per-seat stamps, and Passport issue time, in UTC. |
| `limitations` | Mandatory free-text: what this Passport does **not** establish (see §4). Present in every Passport, written for this delivery, not boilerplate pasted blind — boilerplate is permitted only as a floor, never as a substitute for delivery-specific limits. |
| `verdict` | One of: **PASS** (every gate passed, `known_defects[]` empty) · **PASS-AFTER-FIX** (defects found, fixed, independently retested) · **INCOMPLETE** (any known defect open — this is a report of incompletion, not a pass) · **UNVERIFIED** (any mandatory field UNVERIFIED). There is no fifth verdict and no aggregate score. |
| `founder_gate` | The standing line: the founder's final approval remains mandatory above every seat's verdict; the Passport records evidence, it does not approve [Zero Known-Defect, Enforcement]. |

---

## §2 — The blind-check procedure (checking it without the producer's help)

The test of the whole mechanism: **a customer or third party, holding only the delivery and its Passport, can check every load-bearing claim without contacting the producer, without an account with us, and without trusting our word.** The governing attitude is FVR-12's: the checker *renders NOTHING for a figure it cannot reconcile* — a figure that doesn't re-derive is not "close enough," it is failed [FVR-12].

**Step 1 — Hash the artifact.** Recompute SHA-256 of the delivered file with any standard tool (e.g. `sha256sum <file>` or `shasum -a 256 <file>`) and compare against `delivery_hash`, byte size included. Then open the package and hash the principal inner artifact(s) the same way. **Any mismatch ends the check: the Passport describes a different artifact than the one in hand, and says nothing about this one.**

**Step 2 — Read the scope against the thing.** Compare `scope_statement` + `exclusions` against what the artifact visibly does. Anything the artifact claims (in its own About/readme surfaces) that the Passport's scope does not cover is outside the evidence — treat it as unevidenced, not as covered.

**Step 3 — Re-run what can be re-run.** Where a test suite ships with the delivery or is named with a public evidence reference, re-run it and compare counts with `test_suites[]` (33/33 must come back 33/33). Where a suite cannot be re-run by the checker, its result stands as *reported*, and the Passport's `limitations` must say so.

**Step 4 — Check the seats.** Confirm from §1.2C that builder and examiner are different seats and different model families, and that every fix in `fix_rounds[]` names a retesting seat different from the fixing seat. A Passport where the producer graded its own work fails this step on its face.

**Step 5 — Read the defects before the verdict.** Read `known_defects[]` first, then `verdict`. If `known_defects[]` is non-empty and `verdict` reads PASS, the Passport is internally false — reject it whole. If the `known_defects[]` field is *absent* (not empty — absent), the Passport is malformed: verdict UNVERIFIED.

**Step 6 — Check the licensing.** Open the shipped licence file and the third-party attribution file; hash the attribution file and compare with `third_party_licenses_ref`. Confirm `license_granted` matches the licence text actually shipped — the Passport summarizing a licence that isn't in the package is a failed check.

**Step 7 — Check the times.** Confirm `timestamps` are internally consistent (seats worked inside the manufacture window; issue time is last) and that any reconstructed clock segment is flagged as reconstructed. An unflagged reconstruction discovered later voids the Passport's clock, not its hashes — the checker records exactly which claim failed.

**Step 8 — Conclude per claim, not in aggregate.** The checker issues findings per field group, graded **CONFIRMED / NEEDS-CHECK / REJECTED** (the house Two-Axis grading [custom-skills/two_axis_independent_review/SKILL.md]), with REJECTED findings kept on record, never deleted. There is no step where the checker "trusts the rest."

**Failure path.** A failed check is not a dead end: the Passport names the producer line and the remediation follow-up route [paper: "remediation follow-up" is part of the mechanism]. What the checker does NOT do is ask the producer to explain the evidence into passing — explanation is not evidence; a corrected delivery arrives as a new Passport revision under §1.1, and the failed revision stays on record.

---

## §3 — How it attaches to Factory + Hospital deliveries

**Factory (Lane 1 / Software Factory).** The Passport is **an addition to the Factory's existing Eight-Gate paperwork, not a replacement for it** [reconciliation §2, deliverable (ii)]. Concretely:
- It is issued at the packaging stage (in #501's staging: Stage 05 Packaging, proven at Stage 06 distribution-readiness), generated from the same evidence the gates already produce — gate verdicts, battery results, fix rounds, margin receipt, `MANIFEST.sha256`.
- The delivered package carries: the artifact, the licence file, the third-party attribution file, and the Passport (both renderings). This is #501's package shape with the Passport standardizing what its `EVIDENCE_PACKET.md` did by hand.
- **Acceptance shape for the format itself:** the Passport schema must regenerate Specimen #501's evidence packet in the new format **without inventing a field** [reconciliation §2]. Any field the schema wants that #501's packet doesn't have is either justified as a §1.2 requirement of the paper (hash · version · scope · test results · examiner · time · limitations) or struck.

**Hospital (Lane 4).** The Hospital specimen's verified delivery carries the same Passport, with the lane-specific fill:
- `inputs` = the intake record: the deliberately broken synthetic application **as received**, hashed at intake — the provenance "before" the whole repair claim rests on.
- `gate_verdicts[]` is replaced by the **original defect list**: every defect found at diagnostic, its repair, and its independent regression retest. The blind verifier grades the repaired specimen against this list [Construction Order, Lane 4 acceptance].
- `scope_statement` names the tariff class exercised (diagnostic / repair / completion / production-prep) as an **INTERNAL test price only** — no public offer, no customers [Construction Order, Lane 4]. The Passport records the class; it never quotes a price to anyone.
- Lane 4's delivery is **dependent on this lane's mechanism** [Construction Order, Lane 4 Dependencies] — the Hospital specimen does not ship its delivery, even internally, without a Passport.

**Both lines:** one schema, one checker procedure (§2), two fills. A Passport from either line can be checked by the same blind verifier in the same sitting — that uniformity is the product (FVR-34 opp. 09) before it is ever a service.

---

## §4 — What the Passport must never claim

The Passport is evidence, not a warranty. The following claims are forbidden in any Passport, in any wording, however softened:

1. **No blanket certification.** The paper's own fence, verbatim in substance: the Passport is *"not blanket certification, financial guarantee or proof software is safe forever"* [paper, §Trust]. The words "certified," "guaranteed," and "safe" do not appear as claims about the artifact.
2. **No PASS over a known defect.** A known unresolved defect blocks PASS at any severity; a verdict issued over one is not a PASS, it is a report of incompletion — and a record that does so is itself a defect [Zero Known-Defect, rules 1 + Enforcement].
3. **No claim beyond the checks run.** Missing evidence = UNVERIFIED, never PASS [rule 6]. The Passport attests to the checks listed in it, at the times listed in it, on the hash listed in it — nothing else, nothing later, nothing similar.
4. **No claim about any other artifact.** A different file — different hash, different version, a rebuild — is a different artifact. The Passport is silent about it, and must say so in `limitations` (modification re-opens the gates [rule 7]).
5. **No live-deployment claim from local evidence.** Local files are not proof of live deployment [rule 3]; a Passport issued on local evidence says "verified locally" and names the live leg as excluded (the #501 Gate 7 shape) rather than letting "verified" float.
6. **No founder approval.** The Passport is evidence laid before the founder's chair; it never states or implies the founder approved, endorsed, or judged the delivery [Zero Known-Defect, Enforcement: founder's final approval remains mandatory].
7. **No future-tense claims.** Nothing about durability, future compatibility, future security, or fitness for a purpose the scope statement didn't name. The Passport is a record of a past examination, dated.
8. **No commercial standing.** Until FVR-26 is founded and reviewer/liability terms exist — **NOT FOUND today** [reconciliation §1.6(b)] — the Passport is an internal delivery instrument. It is not an audit product, not a seal for sale, and carries no language a third party could mistake for one.

---

## §5 — Design debt owed to the Gatehouse sequence (reference only)

This lane borrows an **ordering discipline**, not machinery. The source is the Gatehouse signed-broadcast safety sequence — register MES-SEC-001, "BUILT–VERIFIED on paper + service live" [living-universe/MASTER_CIVILIZATION_INVENTORY_v0.1_DRAFT_2026-11-26.md] — as codified in [custom-skills/signed_broadcast_safety_sequence/SKILL.md] and built in [newwave/next-build/gatehouse-work/amendment8/]. The debt, mapped:

| Gatehouse rule | Passport analogue (design debt) |
|---|---|
| Create the durable record and confirm the write **before** any signature; browser state is a mirror, never the record. | The Passport record (id reserved, fields assembled, evidence persisted) exists and is confirmed **before** the verdict is issued. A draft in a chat window is a mirror, never the record. |
| Atomic reservation before signing; one item, one durable identity; refuse a second signature while one is unresolved. | One delivery, one `passport_id`; a revision in flight locks the prior revision against silent edit — re-issue supersedes openly (§1.1) or not at all. |
| Bind the signature to the reservation. | The verdict binds to the `delivery_hash` it was issued over; a verdict that doesn't name its hash attests to nothing. |
| Fixed order: **Lock → Sign → Persist → Broadcast → Verify**; a build that signs before the lock fails even if its other tests pass. | Fixed order: **Assemble evidence → Issue verdict → Persist Passport with the delivery → Release → Blind-check (§2)**. A Passport whose verdict predates its evidence fails even if its hashes match. |
| Never clear state on incomplete evidence; empty/expired provider data is incomplete information, not an outcome. | Never advance a field on incomplete evidence; a missing check is UNVERIFIED (§1.2), not a pass and not a fail — it is named as incomplete. |
| A timed-out reservation stays locked; no automatic unlock. | A known defect never ages off `known_defects[]`. It closes by correction + independent retest [Zero Known-Defect, rules 2+5] or it stays on the record forever. |
| Prove the sequence with adversarial tests before live use. | §6's tamper and malformed-passport tests are adversarial tests in the same spirit, run before the format is relied on. |

**The fences on this debt, stated once and plainly:**
- **Reference only.** This spec does not integrate with, call, or depend on the Gatehouse service. The Gatehouse's own road stands where it stands: Amendment 8 complete on paper, devnet rehearsal next, **mainnet HOLD** — and the newest fix bytes still await partner byte-level certification [reconciliation §1.6(a)]. The Passport owes the sequence its *order*, and owes the Gatehouse nothing operational.
- **No signing of anything real.** The Passport's "issue" step is a document act, not a cryptographic signature over anything of value. No wallet is involved, no transaction exists, nothing is broadcast.
- **Chain anchoring is OUT of this spec.** The paper permits *"optional chain anchoring of non-sensitive commitments only after clearance"* [paper, §Trust]. No clearance exists; anchoring is recorded here as a named future decision for the founder, gated behind the Gatehouse's own road — it is not designed, not prototyped, and not promised in any Passport issued under this spec.

---

## §6 — Acceptance tests

The lane is accepted when **one specimen delivery is checked end-to-end by a blind verifier** [Construction Order, Lane 3 acceptance], under the Relay: builder → improver → different-family critic → blind verifier, unanimous, then the captain; the founder judges last. The specimen is Specimen #501's existing delivery, re-issued in Passport format (it is the only completed Factory delivery in existence; using it invents no new product and spends nothing).

| # | Test | Pass condition |
|---|---|---|
| AT-1 | **Regeneration** — #501's `EVIDENCE_PACKET.md` is regenerated as a Passport under §1.2. | Every §1.2 field is filled from the packet's existing evidence; **zero invented fields**; anything the packet cannot fill reads UNVERIFIED with the reason [reconciliation §2 closure test]. |
| AT-2 | **Blind end-to-end check** — a blind verifier (different family from every producer seat) receives ONLY the delivery package + its Passport. No producer contact, no extra files, no oral explanation. | The verifier completes §2 Steps 1–8 and issues per-claim findings (CONFIRMED / NEEDS-CHECK / REJECTED). The lane passes on the *procedure completing*, with every load-bearing claim CONFIRMED or honestly graded down — a check that can only pass is not a check. |
| AT-3 | **Tamper test** — one byte of a copy of the artifact is flipped; the copy + original Passport go to the checker. | Step 1 concludes MISMATCH and the check stops there; the checker does not proceed to grade the tampered copy on the original's evidence. |
| AT-4 | **Malformed-passport test** — the `limitations` section (then, in a second run, the `known_defects[]` field) is removed from a copy of the Passport. | The checker concludes UNVERIFIED for the affected claims in both runs. Absence is detected as absence — never read as "nothing to report." |
| AT-5 | **Known-defect honesty test** — a Passport is drafted for a synthetic delivery carrying one known open defect, with `verdict` attempted as PASS. | The format itself refuses the combination: the specimen is re-issued INCOMPLETE, and the attempted PASS is recorded as a defect in the test evidence [Zero Known-Defect, Enforcement]. |
| AT-6 | **Two-level hash test** — the checker verifies both the package hash and the inner-artifact hash from §1.2H against a cold-unzipped copy in a clean folder (the #501 Stage 06 shape). | Both levels reconcile, cold, by a seat that did not pack the delivery. |

A failure in any test is a defect in **this mechanism** (not in the specimen), is fixed, and is **independently retested** before the lane is reported [Zero Known-Defect, rule 5]. The lane is reported to the founder and both partners in the same motion, with the blind verifier's findings attached whole — including any REJECTED findings, which stay on record.

---

## §7 — Fences (this lane, complete list)

- **$0.** No new spending of any kind. All work is local files and existing seats.
- **Paper/local only.** The Passport format is proven on a local specimen (§6). Nothing in this lane is deployed, published, or served anywhere.
- **No commercial anything.** No customers, no offers, no prices, no standalone audit sales — those wait on FVR-26's founding and liability terms that are NOT FOUND today.
- **No signing of anything real.** No wallets, no keys, no transactions, no chain anchoring. Mainnet HOLD stands (§5).
- **No new department.** The lane lives on the verification line (FVR-12 discipline) inside the existing registers, per FVR-34's assignment of opportunities 06 + 09.
- **Existing construction untouched.** This lane adds paperwork discipline to the Factory/Hospital lines; it reorders none of their work and gates none of it retroactively — #501's own publication remains the founder's separate call, exactly as before.

---

## §8 — The Three-Layer Civilization Contract (lock-in binding on this lane's customer-facing form)

PDP-v1's mechanism is paper; its customer-facing form — the public verification experience — binds the Universal Three-Layer Civilization Contract in full. It is never a standalone checker page or orphan micro-site.
- **Layer 1 — Entrance:** arrival through the canonical doorway (palette **#141210 / #30251B / #C9A227 / #E9DDC6**), capability framing in plain words ("check any delivery's evidence"), and **zero forced wallet/account walls** — verification never requires an account, a wallet, or a sign-in; a stranger holding a delivery + passport can check it (§2).
- **Layer 2 — Living World:** the verifier lives inside the civilization's districts with Solnik's guidance available; re-checking a known passport is a repeat utility action and carries **no added latency or ceremony**.
- **Layer 3 — Functionality:** the **/verify** surface — fast, keyboard-accessible, deterministic. The standalone verifier runs **local-first and offline** (in-browser or CLI, §1.1A); the check report exports in one click, clean.

## Sources cited

- `~/workspace/newwave/next-build/economy/CONSTRUCTION_ORDER_ECONOMIC_EXPANSION_2026-11-26.md` — Lane 3 (mandate, dependencies, acceptance); Lane 4 (attachment + dependency).
- `~/workspace/newwave/next-build/economy/CAPTAIN_RECONCILIATION_ECONOMIC_EXPANSION_DRAFT_2026-11-26.md` — §1.6 Trust Universe (passport NOT FOUND; ancestors; FVR-26 gate); §2 deliverable (ii) + closure test.
- `~/workspace/newwave/next-build/economy/PROVADIA_ECONOMIC_CIVILIZATION_EXPANSION_v0.1_ChatGPT_2026-11-26.md` — the passport field list and its never-claim fence (§Trust).
- `~/workspace/newwave/next-build/FOUNDATIONAL_VISION_REGISTER.md` — FVR-12 (Verifier doctrine), FVR-26 (PROPOSED), FVR-34 (opportunities 06 + 09, fences).
- `~/workspace/newwave/next-build/conveyor/VERIFICATION_STANDARD_ZERO_KNOWN_DEFECT_2026-11-25.md` — the eight rules + Promise-to-Function amendment.
- `~/workspace/custom-skills/signed_broadcast_safety_sequence/SKILL.md` — the Lock → Sign → Persist → Broadcast → Verify sequence and its adversarial-test doctrine; built form in `~/workspace/newwave/next-build/gatehouse-work/amendment8/`; register status MES-SEC-001 in `~/workspace/newwave/next-build/living-universe/MASTER_CIVILIZATION_INVENTORY_v0.1_DRAFT_2026-11-26.md`.
- `~/workspace/newwave/next-build/software-factory/specimen-501/EVIDENCE_PACKET.md` — the ancestor artifact: two-level hashes, seat record, gate verdicts, honesty-flagged clock.
- `~/workspace/custom-skills/two_axis_independent_review/SKILL.md` — CONFIRMED / NEEDS-CHECK / REJECTED grading.

**Explicitly NOT FOUND** (recorded, not invented): the Passport as a named artifact before this spec · qualified-reviewer standing · liability terms for external verification work · any clearance for chain anchoring.
