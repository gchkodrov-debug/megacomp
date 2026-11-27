# ENGINEERING SPECIFICATION — LANES 2 + 6 (FVR-34)
**Issued under:** Construction Order — Economic Expansion (FVR-34), 2026-11-26
**Sources of record:** `CONSTRUCTION_ORDER_ECONOMIC_EXPANSION_2026-11-26.md` (Lanes 2 + 6) · `CAPTAIN_RECONCILIATION_ECONOMIC_EXPANSION_DRAFT_2026-11-26.md` §1.4–§1.5 · `PROVADIA_ECONOMIC_CIVILIZATION_EXPANSION_v0.1_ChatGPT_2026-11-26.md` (the paper) · `FOUNDATIONAL_VISION_REGISTER.md` (FVR-29, FVR-34) · `living-universe/MASTER_CIVILIZATION_INVENTORY_v0.1_DRAFT_2026-11-26.md` (MCI: CIV-094, CIV-095, CIV-100, CIV-105) · `living-universe/MASTER_ENGINEERING_SPECIFICATION_REGISTER_v0.3_2026-11-26.md` (MESR: MES-SEC-002, MES-PER-002/003/006, MES-ECO-005) · `~/memory/2026-11-20.md` (Book of Wants founding + live implementation) · `~/workspace/captain/OPEN_ITEMS.md` (Genesis Tranches 1–2, MES-SEC-002 state).
**Standing fences (both lanes):** $0 · no deployment · no commercial launch · no real visitor or member data in any specimen · Zero Known-Defect + Relay Law bind every deliverable · founder judges last.

---

# LANE 2 — BOOK OF WANTS → GLOBAL DEMAND DISCOVERY
**Line:** Living Entity line · Solnik's Third Duty · **Owner of record:** the Book of Wants (no new department — Reconciliation §1.5 verdict: ADOPT)

## 2.0 What already stands (do not rebuild)
- **The mechanism is LIVE and founder-founded.** The Book of Wants — Solnik's Third Duty (founder, 2026-11-20): aggregated themes-with-counts from visitor conversation, flowing host → captain → founder as build signals (Reconciliation §1.5(a); MCI Door 08 / Keeper's Chamber entry: "the Book of Wants (LIVE as a standing instrument — wants recorded, answered honestly)").
- **The live implementation of record:** the Solnik server build (2026-11-20, `~/memory/2026-11-20.md`) writes the Book to `/var/lib/solnik/wants.jsonl` — redacted 120-char phrases by theme + counts, **no personal data**. This file format is the intake substrate this lane extends; it is not replaced.
- **The intake host:** Solnik's brain (MES-INT-001, VERIFIED per MCI CIV-094 traceability) is the conversational front end.
- **The demand doctrine already exists:** FVR-06's Payoff Doctrine gates town product builds on demand evidence; FVR-27 records the participation doctrine (Reconciliation §1.5(a)).
- **What is missing (Reconciliation §1.5(b), verbatim substance):** the structured problem brief (budget, acceptance tests, deadline, data-sensitivity fields); clustering/reporting machinery and a price-intent field — **NOT FOUND as built mechanisms**; the paper's evidence test has not been run and no genuine-request count is on record.

## 2.1 The founding fence — VERBATIM (senior law for this lane)
From the founding record, `~/memory/2026-11-20.md` (2026-11-20 ~13:05 CT, Solnik's Third Duty):

> "Solnik keeps a Book of Wants: aggregated themes-with-counts from visitor conversation (asks, searches, can't-finds, loves, refusals; guest words only as short anonymized phrases), flowing host → captain → George on the Day-Book rhythm as build signals for town, store and Umbrella. **Guests are never the product: no dossiers, nothing sold, no conversation manipulated to extract insight.**"

(Curated form, `~/MEMORY.md`: "Guests are never the product: no dossiers, nothing sold, no manipulated conversations.")

**Design consequence (binding):** every field, cluster and report in this lane is designed *under* this fence. Commercial use of intake stays inside aggregated, permissioned, anonymized themes. The paper's own fences (opt-in · no PII exposure · no invented popularity · no public sharing without permission — paper §3, candidate 5) are compatible and adopted, but the founding fence is senior: where any mechanism would need a per-person record to work, the mechanism is redesigned or dropped — never the fence.

## 2.2 Structured want-brief fields (the expansion's first mechanism)
A want brief is a **permissioned, structured record of a problem** — created only when a guest, in conversation with Solnik or through an explicit intake surface, agrees to state their problem in structured form. It extends the Book; it does not convert raw conversation into briefs silently.

| # | Field | Shape | Fence note |
|---|-------|-------|-----------|
| 1 | Problem statement | Short text, guest's own words, trimmed to the founding 120-char redacted-phrase discipline for any quoted fragment | No verbatim transcript retention |
| 2 | Theme tag | From the Book's existing theme vocabulary (asks · searches · can't-finds · loves · refusals) + a problem-domain tag | Aggregation key; never a person key |
| 3 | Who has this problem | Organization *type* and size band (e.g. "contractor, 2–10 people") — never a name | No dossiers: type, not identity |
| 4 | Current workaround | Short text: what they do today instead | Demand evidence, not profiling |
| 5 | Cost of the problem | Guest-stated band (time lost / money lost / both) | Guest's own estimate, labelled as such |
| 6 | Budget band | Banded ranges only (paper §3 field: budget) | Never an exact figure demanded |
| 7 | Price intent | Would-pay signal: *would consider a scoped offer at band X* / *would not pay* / *unstated* (Reconciliation §1.5(b): the price-intent field) | "Unstated" is a valid, unpressured value |
| 8 | Acceptance tests | Guest-stated "done looks like…" lines — what result would make the solution acceptable (paper §3 field) | Feeds Factory scoping directly |
| 9 | Deadline | Banded (urgent / this quarter / someday / none) (paper §3 field) | — |
| 10 | Data sensitivity | Guest-declared class: public / internal / sensitive — what data a solution would touch (paper §3 field) | Sets handling class before any build |
| 11 | Permission flags | Opt-in for: (a) counting this brief in aggregates, (b) follow-up contact *if* a matching solution exists, (c) quoting the anonymized phrase | Default = (a) only; (b)/(c) require explicit yes |
| 12 | Evidence link | Internal pointer to the originating Book entry (theme + count context) | The paper's "retain links to evidence" — internal only, never published |

**Hard rules:** no field may contain a name, email, wallet, or any direct identifier; a brief that arrives carrying one is redacted to the founding discipline before storage. Briefs are stored as structured records alongside — never inside — the raw `wants.jsonl` stream.

**Schema-level privacy scrubbing (lock-in contract, 2026-11-26 20:28 CT — binding):** scrubbing happens at the schema boundary, **before storage** — it is not a later redaction pass. Transport and session metadata are never brief fields and are stripped on arrival: **IP addresses · browser fingerprints · wallet addresses · session cookies**. The brief schema contains **no user-profile table, no behavioral-dossier fields, and no cross-session tracking keys** — a schema that cannot hold them cannot leak them. Any identifier arriving inside a field's content is redacted to the founding discipline before the record is written; a brief that cannot be scrubbed clean is refused, not stored dirty.

### WantBrief v1 — the canonical intake record (lock-in contract)
Every stored brief carries the canonical **WantBrief v1** core, exactly: `{ wantId, problemCategory, industryTag, currentToolFailure, desiredOutcome, privacyScrubbedAtUtc }`. `privacyScrubbedAtUtc` is stamped by the scrubbing step at the moment of scrubbing, before storage; a brief without it does not exist in the store. Clustering (§2.3) keys on the v1 core (problemCategory + industryTag + currentToolFailure). The twelve fields in the table above are this lane's **enrichment record** — budget band, price intent, acceptance tests, deadline, data sensitivity, permission flags — carried alongside the v1 core; enrichment never becomes an identity key. **NAMED TENSION (for the critic — not silently resolved):** the contract names the six-field v1 shape; this draft's twelve-field brief predates it. This pass layers v1 as the canonical core under the enrichment fields. If the founder/partners intend v1 to *replace* the twelve fields wholesale, the table above must be cut to the six — flagged in the Wave 2 conformance report.

## 2.3 Clustering method — recurring problems
Purpose: turn many individual briefs into a small number of *recurring-problem clusters* a factory can act on, without ever reconstructing who asked.

1. **Normalize.** Each brief is reduced to its theme tag + problem-domain tag + a canonical problem phrase (the redacted short-phrase discipline of the founding record).
2. **Group.** Briefs sharing theme + domain + materially the same problem phrase group into one cluster. Grouping is by *problem sameness*, judged on the problem statement and acceptance tests — never by requester attributes (there are none to group by, by design).
3. **Count honestly.** A cluster's count is the number of *independent* briefs in it. Independence test (from the paper's evidence gate): briefs count as independent only when they originate from separate guest sessions/organizations-types with no coordination signal. Duplicate or near-duplicate submissions of the same problem by the same session count once.
4. **Attach the economics.** Each cluster carries the aggregate of its briefs' budget bands, price-intent distribution, deadline bands and data-sensitivity ceiling (the strictest class present governs handling).
5. **Threshold flag.** A cluster is flagged **SIGNAL** when it meets the paper's evidence test: **≥5 independent organizations with the same pain AND ≥3 willing to consider the same scoped offer** (paper §3, candidate 5). Below threshold, a cluster is a *watch item* — recorded, never built on. The paper's rule, adopted verbatim: **no build based on popularity alone.**
6. **Decay + review.** Clusters are re-counted on the Day-Book rhythm the founding record already sets (host → captain → founder). A cluster whose count does not grow across two consecutive cycles is marked dormant, not deleted — the record is evidence, and evidence is kept.

## 2.4 The demand-signal report (output — feeds the Factory queue)
One report per cycle, in the Day-Book rhythm, addressed captain → founder, with a Factory-queue extract. Shape:

- **Header:** cycle date · briefs received this cycle · briefs total · clusters active / dormant / newly SIGNAL.
- **Per SIGNAL cluster (the only part that can move the Factory):** canonical problem phrase · independent-organization count · willing-to-consider count · budget-band range · price-intent summary · representative acceptance tests (merged, anonymized) · strictest data-sensitivity class · recommended Factory disposition — one of: *match to an existing finished application* / *scope a tightly-bounded house service* / *commission a custom build candidate* (the paper §2 thesis flow) — each with the cluster's evidence link.
- **Watch list:** sub-threshold clusters with counts, one line each. No narrative inflation: a watch item is a count, not a trend.
- **Fence attestation (every report, standing line):** briefs counted · briefs redacted on arrival · zero identifiers stored · zero briefs shared outside the house. A report that cannot print this line truthfully does not ship.
- **Queue rule:** only SIGNAL clusters enter the Factory's manufacturing queue, and they enter as *candidates* — FVR-06's Payoff Doctrine gate and the founder's build word still decide manufacturing. The report discovers demand; it does not authorize builds.

## 2.5 Acceptance — Lane 2
Per the Construction Order, verbatim substance: **"mechanism demonstrated on synthetic wants under blind verification; no real visitor data used in specimens."** Concretely:
1. A synthetic corpus of **50 or more** invented want briefs (the lock-in contract's blind-gate minimum — fictional guests, fictional problems — including edge cases: a brief carrying an identifier that must be redacted, duplicate submissions that must count once, a coordinated cluster that must NOT reach SIGNAL) is run through briefs → clustering → report.
2. A **blind verifier** — who did not build the mechanism and is not shown the producer's reasoning — checks: field discipline (no identifier survives), cluster counts against a hand count, the SIGNAL threshold applied exactly, the fence attestation true, and the report shape complete.
3. Relay Law applies in full (builder → improver → different-family critic → blind verifier) before the specification or any specimen is reported to the founder as finished.
4. **Out of scope for acceptance:** running the paper's genuine-request evidence test (20–30 genuine requests) — that requires real visitors and is a later, separately-gated step; nothing in this lane's acceptance claims it.

## 2.6 Cinematic requirement — the Three-Layer Civilization Contract (lock-in binding)
The Book's customer-facing form binds the Universal Three-Layer Civilization Contract (FVR-34 lock-in, 2026-11-26 20:28 CT) explicitly — never a standalone form page or orphan micro-site:
- **Layer 1 — Entrance:** arrival through the canonical architectural doorway (palette **#141210 / #30251B / #C9A227 / #E9DDC6**), capability framing in plain words, **zero forced wallet/account walls** — a guest meets the Book and offers a want with no account and no wallet demanded of them (the founding fence, §2.1, already forbids the dossier such walls would feed).
- **Layer 2 — Living World:** the Book stands where it already stands LIVE — a living instrument inside the Keeper's world, with Solnik present and guiding; the brief is offered conversationally, in his chamber, never as a bare web form. The Living World layer adds **no latency to repeat utility actions** (checking a want's counted status, withdrawing a brief).
- **Layer 3 — Functionality:** the structured-brief surface inside the civilization — fast, **keyboard-accessible**, deterministic; the guest's own brief view is local-first in presentation and exports clean in one click. No new route is invented for this lane: its functionality surface is the Book instrument itself, inside the world.
No film production is ordered by this specification.

---

# LANE 6 — MY PROVADIA → PROFESSIONAL BUSINESS ENVIRONMENT
**Line:** CIV-095 · Members line · **Owner of record:** My PROVADIA (no new "headquarters" department — Reconciliation §1.4 verdict: ADAPT)

## 6.0 What already stands (the ground this lane builds on)
- **The designed object exists.** CIV-095 · MY PROVADIA — "every member's personal universe": a sanctuary of **7 instruments** — Citizenship Stone · Genesis Gate & Pedestal (eligibility ≠ ownership, two meters) · read-only Wallet Bridge · Agora Ledger & Honor Crests · private Acquisitions Vault (the town's order-tracking home) · private Keeper's Desk · Watch Bells & Share Kit. **Status: DESIGNED, NOT BUILT** — Slice 2 of the Nexus program, sequenced after the members CORS patch (MCI CIV-095; Vision: Map §2 `my-provadia-sanctuary-v1`; FVR-25 one account across the town's worlds).
- **The identity base is live.** CIV-094: the members service (:8731 — accounts, Join-the-Town panel, Genesis eligibility) and the Solnik host service (:8730) are **BOTH LIVE** on the house VPS (MCI CIV-094). CIV-100 (Registration & Login): "LIVE as a service, plain as a page" (MCI CIV-100). Named gaps on that base: the staged CORS patch is **NOT deployed** (blocked on the founder's server-door step, MCI CIV-094/CIV-100); social logins are honest 501 stubs.
- **Register variance, flagged not harmonized (Reconciliation §1.4(c)):** MCI states "members DB at 0 / 0 members" (CIV-094/CIV-100) while the Genesis Tranche 1 live replay left exactly **2 captain test accounts** in the live registry. MCI predates the replay; Inventory v0.2 (already owed) is where the correction belongs.
- **Supporting designed mechanisms:** MES-PER-002 (visitor identity persistence — BUILT–UNVERIFIED) · MES-PER-003 (citizen record — DESIGNED) · MES-PER-006 (sovereign state export/import — DESIGNED) · MES-SHR-004 (guild ledger inscriptions — DESIGNED) · MES-ECO-005 (auditable receipt & deterministic order-intent hashing — DESIGNED, under CIV-097) (MCI CIV-095/CIV-097 traceability).

## 6.1 Headquarters module list — designed vs built, per the record
The Construction Order names the headquarters as: *customers, documents, projects, AI workers, purchased applications, invoices — one connected place.* Each module below is marked strictly from the record; where the record names no such module, it says NOT FOUND rather than borrowing a neighbour's name.

| Module (Construction Order) | Record basis | State |
|---|---|---|
| **Customers** (the member's own business customers) | No instrument in CIV-095's seven addresses a member's *business* customers; the seven are membership-facing (citizenship, eligibility, vault, desk). | **NOT FOUND** as a designed module. New design work, owned by this lane's spec phase. |
| **Documents** | No dedicated documents module is named in CIV-095. Nearest designed surfaces: the private **Keeper's Desk** (a personal desk instrument) and the **Acquisitions Vault** — neither is recorded as a document store. | **NOT FOUND** as a named module; nearest designed instruments named at left. |
| **Projects** | CIV-105 · Order Tracking — the Milestone Astrolabe: "a commissioned service's progress, tracked in-world; its account home is the My PROVADIA Acquisitions Vault (CIV-095)." | **DESIGNED, UNBUILT** (MCI CIV-105: "Town: DESIGNED, UNBUILT"). |
| **AI workers** | No worker instrument appears in CIV-095's seven. Worker capability is Lane 5's ground (CIV-059 Resident line); a headquarters *surface* for a member's installed workers is not in the CIV-095 record. | **NOT FOUND** in the CIV-095 record; depends on Lane 5 specimens. |
| **Purchased applications** | The private **Acquisitions Vault** — "the town's order-tracking home" (MCI CIV-095). Reconciliation §1.4(b): "no licensed-asset shelf in operation." | **DESIGNED, NOT BUILT.** |
| **Invoices** | Receipts side: MES-ECO-005 (auditable receipt & deterministic order-intent hashing) — DESIGNED (MCI CIV-097 traceability). An invoices module as such is not named in CIV-095 or its traceability. | Receipts **DESIGNED** (MES-ECO-005); invoices as a named HQ module **NOT FOUND**. |

**The honest summary:** of the headquarters as ordered, the *container* (CIV-095) and its membership instruments are designed; the *projects* and *purchased-applications* modules have designed record bases (CIV-105, the Acquisitions Vault); *customers*, *documents*, *AI workers* and *invoices* have **no designed module in the record** and are this lane's genuine new design work. **Nothing in CIV-095 is built.** What is built and live is the identity base beneath it (CIV-094/CIV-100).

**PDP-v1 receipt linkage (lock-in contract, 2026-11-26 20:28 CT — binding):** every deliverable and every worker action inside the headquarters links back to its **PDP-v1 verification receipt** (canonical schema: `economy/PDP_V1_CANONICAL_SCHEMA.md`, Lane 3 spine). Concretely: a purchased application's Acquisitions Vault entry carries its delivery passport; a project's (CIV-105) milestone record carries the receipt of the delivery that satisfied it; an invoice/receipt record (MES-ECO-005) references the passport of what was delivered against it; an AI worker's committed action (Lane 5 — a TIER_2 ActionProposal with human sign-off) is recorded with the receipt of the proposal-and-delivery chain that authorized it. An item with no receipt is displayed as **UNVERIFIED** — the headquarters never presents an unreceipted deliverable as proven (Promise-to-Function + Zero Known-Defect).

**First slice (adopted from the paper's narrowing, per Reconciliation §1.4(d)):** a customer project room (on CIV-105 + the Vault) plus reliable export (MES-PER-006, sovereign state export/import) — sequenced behind §6.2 and §6.3 below. Retention/subscription claims for this lane carry **zero local evidence** (Reconciliation §1.4(b)) and are not asserted anywhere in this specification.

## 6.2 The MES-SEC-002 dependency — stated exactly
**MES-SEC-002 is OPEN, HIGH.** It sits in this lane's exact layer — identity restore / account recovery on the members line — and it gates any live member-data expansion (Construction Order, Lane 6 dependencies). The record carries it in two places, both stated here without harmonizing them:

**(a) The members-line record** (`~/workspace/captain/OPEN_ITEMS.md`, 2026-11-26):
- Tranche 1 (13:05–13:08 CT): the recovery surface **did not exist** and was built in the working copy (hashed tokens, no-oracle answers, resend caps, direct links, consume-on-use) — 31/31 PASS; blind verification **CONFIRMED the mechanism** but **closure was REJECTED** — the defect stays OPEN (HIGH) on the real-email-delivery dependency alone (K3). A NEEDS-CHECK guardrail was adopted: re-issue must revoke earlier unexpired tokens (single-outstanding).
- Tranche 2 (13:19 CT): **BUILT** — a real SMTP transport (zero-dependency client, sending as support@provadiacoin.com via the Workspace door, env-configured) + single-outstanding token revocation; EMAIL suite 35/35, IDOR regression 15/15. **MES-SEC-002 stays OPEN (HIGH).**
- **Remaining closure items are founder-side:** (1) the Workspace app password provisioned into the VPS env (`/etc/provadia/members.env`); (2) founder-side DNS — SPF currently authorizes Cloudflare only, **DKIM MISSING, DMARC MISSING**; (3) the founder-gated deploy call; (4) an acceptance replay against actually delivered mail; (5) blind-verifier confirmation. **Item-4 companions (Turnstile + HMAC-IP velocity) are still unbuilt.**

**(b) The MESR register record** (`MASTER_ENGINEERING_SPECIFICATION_REGISTER_v0.3_2026-11-26.md`, MES-SEC-002): "DEFECT A-1 — identity restore bypass — **defect open, HIGH** (critic fix list #1)": the `createIdentity` restore path re-fenced only guests; the Wave-1 fix pass landed a fix (restore now re-derives identity state through the live gates; forged or stale records demote to guest; both critic forgery cases run as tests) — and **the defect stays open, HIGH, pending blind verification + independent retest**, because under the Zero Known-Defect Rule a landed fix is not a closed defect.

**Dependency statement for this lane:** until MES-SEC-002 closes — founder-side items (a)(1)–(5) completed, item-4 companions built, and independent retest passed — **no headquarters feature may promise account recovery, and no live member data may be expanded into the headquarters.** The paper's own security list for this lane (tenant isolation, restore, account recovery, least privilege — Reconciliation §1.4(c)) cannot be honestly offered before then.

## 6.3 Relationship to the FVR-29 PROVADIA OS foundation
- **FVR-29 (FOUNDED 2026-11-25)** founds PROVADIA OS as ONE modular software foundation — one website, one shared foundation, multiple access ways, never separate systems per device — and names the **"personalized professional workspace"** as one of the ecosystem's founded forms (Reconciliation §1.4(a)). My PROVADIA is that workspace's house name and designed form; this lane builds *inside* the OS foundation, never as a separate system.
- **Identity is settled on paper first.** FVR-29's ruling: identity and membership architecture is established NOW, on paper — the F0 Foundation Paper (Module Law · Identity & Data Decision · Route & Shell Discipline, with the Offline Line). The F0 draft has landed; the captain's review + Gemini challenge #118 are still owed (Reconciliation §1.4(a)). This lane's specification conforms to the F0 Identity & Data Decision; where the two would conflict, F0 governs and the conflict is reported, not silently resolved.
- **The OS security terms bind this lane directly** (FVR-29 ruling's terms): authenticated applications isolated from the public website · Gatehouse and wallet security take absolute priority · the Offline Line — offline surfaces fail CLOSED toward the Gatehouse and never present stale chain state as current · an installable PROVADIA never holds keys, seeds, keystores, pre-signed transactions or provider secrets · $0 additional spending target for the prototype.
- **The gate (stated exactly):** FVR-29 rules that **full workspace construction follows SEPARATE commercial validation (demand-gated)** — Master Plan road step 7: "construction waits on specimen proof + first buyer validation + George's word" (Reconciliation §1.4(c)). FVR-31's later course change superseded the "paper only" ruling **for the prototype** — isolated prototype construction is ordered; **live deployment still requires founder approval** (FVR Register, FVR-31 entry, relationship note). This lane therefore proceeds: specification → isolated prototype → (MES-SEC-002 closure + validation + founder's word) → any construction beyond prototype.

## 6.4 Acceptance — Lane 6
Per the Construction Order, verbatim: **"specification + isolated prototype only until MES-SEC-002 closes and the founder rules."** Concretely:
1. **This specification** passes the Relay (builder → improver → different-family critic → blind verifier) before it is reported to the founder as a finished specification.
2. **An isolated prototype** of the first slice (project room on CIV-105/Vault design + export on MES-PER-006 design) may be built — isolated from the live members service, on synthetic member data only, at $0, undeployed. The prototype demonstrates the §6.1 PDP-v1 receipt linkage on its mock data: every mock deliverable and mock worker action carries a checkable receipt or is displayed UNVERIFIED.
3. **Nothing beyond prototype is accepted work** until all three stand: MES-SEC-002 CLOSED (per §6.2, including independent retest) · the FVR-29 commercial-validation gate satisfied · the founder's ruling given (the lock-in contract's wording for this gate: **MES-SEC-002 closed + founder-verified**).
4. Tenant-isolation and restore claims are **tested, not asserted**, in any prototype report — and any prototype report states plainly that account recovery remains blocked behind §6.2 for as long as it is.

## 6.5 Cinematic requirement — the Three-Layer Civilization Contract (lock-in binding)
The headquarters' customer-facing form binds the Universal Three-Layer Civilization Contract (FVR-34 lock-in, 2026-11-26 20:28 CT) explicitly — never an ordinary dashboard (FVR-29: "never an ordinary dashboard"), never a standalone SaaS surface or orphan micro-site:
- **Layer 1 — Entrance:** arrival through the canonical architectural doorway (palette **#141210 / #30251B / #C9A227 / #E9DDC6**) into the member's own chamber (CIV-095's sanctuary design, Map §2), capability framing in plain words, **zero forced wallet/account walls** beyond the membership the visitor already holds — no additional wall is erected between a member and their own headquarters.
- **Layer 2 — Living World:** the chamber sits inside the civilization, its professional instruments present as the room's working furniture, Solnik's guidance available; the Living World layer adds **no latency to repeat utility actions** (opening a project room, checking a receipt, exporting state).
- **Layer 3 — Functionality:** the workspace surface on the FVR-29 foundation — fast, **keyboard-accessible**, deterministic, **local-first** (MES-PER-006 sovereign export is the member's own one-click clean export). Every deliverable and worker action shown here carries its PDP-v1 receipt link (§6.1).
No film production is ordered by this specification.

---

## Sources & gaps — the honest tail
- Lane 2 founding text, mechanism and live storage form: FOUND (`~/memory/2026-11-20.md`, founding ~13:05 CT + server build record 21:15 CT). Brief fields + clustering thresholds: grounded in the paper §2/§3 as reconciled at Reconciliation §1.5(b) — the fields and machinery themselves are **NOT FOUND as built mechanisms** and are specified here as new work on the live Book.
- Lane 6 container + instruments + states: FOUND (MCI CIV-094/095/100/105). Modules *customers*, *documents*, *AI workers*, *invoices*: **NOT FOUND** as designed modules in the record — marked so in §6.1 rather than inferred.
- MES-SEC-002: FOUND in two records (OPEN_ITEMS members line; MESR v0.3 DEFECT A-1) — both stated in §6.2, neither harmonized into the other.
- FVR-29 terms and the FVR-31 prototype supersession: FOUND (`FOUNDATIONAL_VISION_REGISTER.md`, FVR-29 + FVR-31 entries).
