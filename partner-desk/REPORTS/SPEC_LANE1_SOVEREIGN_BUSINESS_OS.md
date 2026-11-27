# ENGINEERING SPECIFICATION — LANE 1: SOVEREIGN BUSINESS OPERATING SYSTEMS

**Lane:** FVR-34 Construction Order, Lane 1 (Software Engineering Division · Software Factory / FVR-32)
**Opportunity of record:** FVR-34 #08 — Sovereign Business Operating Systems (Gemini-added, founder-supported)
**Issued under:** `economy/CONSTRUCTION_ORDER_ECONOMIC_EXPANSION_2026-11-26.md` (Lane 1) · Founder Directive "BEGIN ECONOMIC EXPANSION CONSTRUCTION" (2026-11-26)
**Status:** SPECIFICATION. This document authorizes nothing by itself. It defines what gets built, in what order, behind which gates, and how each piece is accepted.
**Fences (standing, restated):** $0 new spending · no deployment · no commercial launch · **Specimen #501's publication and its $79 price are the founder's separate call and are NOT in this lane's scope** · Zero Known-Defect Rule and Relay Law bind every build · founder judges last.

**Evidence base (every factual claim below cites one of these):**
- `software-factory/specimen-501/` — DESIGN.md · REQUIREMENTS.md · EVIDENCE_PACKET.md · MAINTENANCE.md · CLOCK.md · app.spec.json · package/ResellerBusinessOS-1.0/LICENSE.txt
- `gemini-seat/GEMINI_SPECIMEN_501_JUDGMENT_117_2026-11-25.md` — Gemini's independent judgment + the captain's adjudication (4 marks) sustained whole
- `living-universe/MASTER_CIVILIZATION_INVENTORY_v0.1_DRAFT_2026-11-26.md` — CIV-058 (Software Factory + Specimen #501)
- `FOUNDATIONAL_VISION_REGISTER.md` — FVR-32 (Software Product Department) · FVR-34 (Economic Civilization Expansion) · FVR-31 addendum corrections
- `economy/CAPTAIN_RECONCILIATION_ECONOMIC_EXPANSION_DRAFT_2026-11-26.md` — §1 item 1 · §2

---

## 1. DOCTRINE — THE INDEPENDENCE PRINCIPLE, RESTATED

Lane 1 exists to manufacture **professional software a customer purchases once, owns, and operates on their own machine — without a mandatory subscription and without dependence on our cloud, our servers, or our continued existence.**

The doctrine, in the founder's own formulation (2026-11-25, carried in CIV-058 as the Factory's purpose):

> "We manufacture software that gives customers independence, rather than manufacturing dependence on subscriptions. Recurring revenue should come from genuine ongoing value, not artificial restrictions."

FVR-34 #08 records the same doctrine as a product line: *"professional software customers purchase, OWN and operate without mandatory subscriptions or cloud dependence,"* with the founder's particular support on record: *"That could be a stronger initial economic foundation than operating a labor-intensive freelance marketplace."*

**What the doctrine requires of every Lane 1 product (each item evidenced in the #501 artifact, not aspirational):**

1. **Buy once, use forever.** The bought version never expires, never deactivates, never checks in. (#501 LICENSE.txt: "There is no subscription. There is no activation, no licence key, and no check-in — the app never contacts us, and nothing in it can switch it off, expire, or ask you to pay again for this version.")
2. **Runs offline, on the customer's machine.** Profile S static bundle: zero runtime network calls, no external assets, opens from `file://`. (#501 DESIGN.md §7, STATIC_BUNDLE_CONTRACT.md; EVIDENCE_PACKET Gate 3, PASS on scoped wording: "zero page-issued external requests.")
3. **The customer's data is the customer's.** Records live in the customer's own storage (IndexedDB); export in open formats (CSV + JSON) is available at any time; a clear-data control exists and says plainly what it erases. (#501 REQUIREMENTS.md NFR-2; DESIGN.md §4.)
4. **No artificial restrictions.** Recurring revenue, where it exists at all, comes from genuine ongoing value (dated-data re-checks, new versions the customer may choose) — never from holding the bought product hostage. (Founder formulation, above.)
5. **Ownership is engineered, not promised — and it is not immortality.** FVR-31 addendum correction (6), adopted house-wide: *"Ownership ≠ immortality — independence is engineered; maintenance is a named ongoing cost; 'runs forever' struck."* Every Lane 1 product therefore ships with a named maintenance plan (§5) whose cost is counted in its economics (Gate 8), not waved away.

**Department frame (FVR-32):** Lane 1 products are PROVADIA Grand Library products (FVR-05 Two Houses — never attached to the OneJobKits store catalogue or checkout; reconciliation §1.1(c)). FVR-32 requires every department product to ship with **secure exportable source, documentation, maintenance/support terms and a delivery mechanism**; the Software Factory line (Specimen #501, Chassis) is the department's manufacturing proof, and FVR-32 extends that line rather than duplicating it. Department price classes ($100 / $200 / $500 / $1,000) exist **subject to demand validation** — they are classes, not tariffs, and §4 of this spec promises none.

---

## 1A. LOCK-IN CONTRACT CONFORMANCE (FVR-34 ADDENDUM, 2026-11-26 20:28 CT)

The founder's lock-in contract binds this lane in the following points. Where this section and an earlier section of this draft differ, **this section governs**.

**1A.1 The Universal Three-Layer Civilization Contract (binding on every Lane 1 product's customer-facing form).** No Lane 1 product may be specified or presented as a standalone SaaS dashboard or orphan micro-site.
- **Layer 1 — Entrance:** arrival through PROVADIA's canonical architectural doorway — palette **#141210 / #30251B / #C9A227 / #E9DDC6** — with clear capability framing in plain words and **zero forced wallet/account walls**: a customer reaches, opens and uses the product they bought without being made to create an account or connect a wallet.
- **Layer 2 — Living World:** the product is presented inside the civilization's districts (the Grand Library shelf, FVR-32) with Solnik's guidance available; the Living World layer adds **no latency to repeat utility actions** — opening the owned app and working in it is never slowed by the world around it.
- **Layer 3 — Functionality:** the **/app** surface — fast, keyboard-accessible, deterministic execution. The Sovereign OS's single-file `file://` form (C5, §2.1) IS its functionality surface; /app is its civilization address when presented inside PROVADIA. Local-first persistence (C2) and **one-click clean export** (§5.2) are Layer 3 requirements, not features.

**1A.2 Chassis extraction invariant.** Chassis v0.2 is extracted from Specimen #501 by lift/copy-out (§2). **Specimen #501's frozen release candidate is NOT altered** — its package bytes and `MANIFEST.sha256` remain exactly as gate-verified; the lift reads the specimen, it never writes it. Any change to #501 itself is a separate founder-gated act; #501's publication remains strictly the founder's separate call.

**1A.3 Contract-mandated v0.2 requirements (sourced from the lock-in contract — NOT evidenced in #501, and marked so under §2.3's discipline).** These are requirements the contract imposes on Chassis v0.2; they are not claimed as existing anywhere:
- **Append-only IndexedDB Write-Ahead Log:** every mutation appends an immutable event `{ seq, timestampUtc, op, payloadHash, prevEventHash }` before materialized views update (extends C2's storage engine).
- **`.provadia` snapshot export:** one-click export produces a deterministic, canonical-JSON `.provadia` snapshot, in addition to the clean CSV/PDF accounting exports of §5.2 — so user data remains readable even without PROVADIA software.

**1A.4 Specimen #502 acceptance gates (lock-in contract, in addition to §6.2).** Specimen #502 must: compile **byte-identically across clean builds** · pass **100% of its 30+ golden math vectors** · emit **0 outbound network packets under `file://`** · and **fail closed (zero DB mutation) on a corrupted `.provadia` import**.

**1A.5 PDP-v1 spine.** Lane 1 deliveries carry PDP-v1 passports under the canonical schema locked in `economy/PDP_V1_CANONICAL_SCHEMA.md` (Lane 3, the upstream spine) — imported exactly (canonical JSON + Ed25519 verification contract), never re-fielded by this lane (see the §6.1 dependency, read with this section).

## 2. CHASSIS v0.2 — SHARED-COMPONENT LIST

Chassis v0.1 exists today only as code inside the first specimen: `software-factory/specimen-501/project/src/chassis/`. **No standalone chassis package exists yet** (searched 2026-11-26: NOT FOUND outside the specimen folder). Chassis v0.2 is therefore, first, a *lift*: the proven shared pieces move out of the specimen into the shared chassis so every future Business OS inherits them tested, without copying code (Gemini #117, pre-replication gate 2).

### 2.1 EVIDENCED in the #501 record (Chassis v0.1, as built and gate-verified)

Source: DESIGN.md §7 · EVIDENCE_PACKET §1 · app.spec.json · REQUIREMENTS.md NFR-3/NFR-4/NFR-5.

| # | Component | What it is (as evidenced) |
|---|---|---|
| C1 | **Theme layer** (`chassis/themes/`) | Token files (OneJobKits + PROVADIA in v0.1). Components read CSS variables only, never a hex value — theme-layering proven by the second token file existing and rendering. |
| C2 | **Storage engine** (`chassis/storage.ts`) | IndexedDB wrapper + versioned schema + migration rule (version only increases; every bump carries records forward field-by-field, new fields get defaults). Settings mirror to localStorage for first paint; IndexedDB is the record of truth. |
| C3 | **I/O engine** (`chassis/io.ts`) | CSV/JSON parse + stringify with plain-English row errors that name the row and the problem; no silent partial imports (REQUIREMENTS.md FR-11). |
| C4 | **Component set** (`chassis/components.tsx`) | Labelled entry set · preset picker displaying each preset's source + Last-Verified date · results ledger · import/export bar · chrome with About panel + clear-data control. |
| C5 | **Static Bundle Contract** (`STATIC_BUNDLE_CONTRACT.md`, Profile S) | The build contract: zero runtime network calls, no external assets, opens from `file://`; two outputs from one source (standard `dist/` + single-file `dist-single/index.html`). |
| C6 | **Licence packer** (`project/scripts/license-pack.mjs`) | Generates `THIRD-PARTY-LICENSES.txt` from the shipped bundle's dependency closure; enforces the runtime allowlist. (In v0.1 it lives under the specimen's `project/scripts/`; its function is chassis-level.) |
| C7 | **Pinned stack + allowlist** | react 19.3.1 · react-dom 19.3.1 · lucide-react 0.546.0 (runtime allowlist: exactly these three; scheduler enters only as react-dom's own dependency, inventoried and attributed). Vite 8.3.8 + TypeScript + vitest/jsdom build-time. Exact pins + house lockfile. **No Tailwind** (NFR-4). |
| C8 | **System font stack** | Named design decision (DESIGN.md §7): system-ui stack only — zero requests, zero bytes, zero licence surface, identical behaviour from `file://`. |
| C9 | **Archetypes** | The Ledger (calculator + results ledger) and The Board (records log / dashboard over the customer's own records) — DESIGN.md §1; app.spec.json `"archetypes":["Ledger","Board"]`. |

### 2.2 v0.2 REQUIRED LIFT (evidenced debt — ordered by Gemini #117 gate 2, adopted by the captain)

| # | Lift | Evidence |
|---|---|---|
| L1 | **Scenario save/compare components** move from the specimen's app directory into `chassis/components` | EVIDENCE_PACKET §8: "Scenario components live in the app, not yet lifted into `chassis/components` — chassis debt for the second title, recorded by the builder." Gemini #117 gate 2: lift "before building Title #2 so every future Business OS inherits tested scenario persistence without copying code." |
| L2 | **Chassis hardening checks** ride the lift: a screen-reader accessibility pass (NVDA/VoiceOver) and a cross-machine / clean-room rebuild check | Gemini #117, riding qualifier 3 (adopted by the captain as stated): both run "during Chassis v0.2 hardening." v0.1's Gate 6 is smoke-qualified and its reproducibility proof is same-machine only (EVIDENCE_PACKET §7) — v0.2 closes both. |

### 2.3 PROPOSED for v0.2 (NOT evidenced — proposals, requiring captain/founder adoption before they are built)

| # | Proposal | Note |
|---|---|---|
| P1 | **Dated-assumption register module** — a chassis-level pattern for sourced, check-dated data tables (the #501 fee register: figure · source URL · check date, displayed in-product, quarterly re-check) | The *register discipline* is evidenced (REQUIREMENTS.md §4; MAINTENANCE.md §1); the *lift into a reusable chassis module* is NOT FOUND in any record — proposed here because every industry variant (§4) will carry its own dated data (rates, rules, schedules). |
| P2 | **Print-clean stylesheet component** | Evidenced inside #501's app (Tax-Time Summary print view, DESIGN.md §6); a shared chassis component is NOT FOUND — proposed. |
| P3 | **Per-industry data packs as chassis-level plug-ins** (an industry = schemas + dated register + views over C1–C9) | NOT FOUND as a named mechanism. This is the architectural hypothesis that makes §4 a register rather than four separate factories; it must be proven by the second specimen (§3), not assumed. |

**Discipline:** nothing in §2.3 may be described, in any later document, as existing. If the second specimen proves P3's shape, it graduates to EVIDENCED in that specimen's packet; if not, it is struck or redesigned there.

---

## 3. THE SECOND-SPECIMEN PATH AND ITS FIVE GATES

**The second specimen is named in the record:** a **Contractor / Trades Business OS** — **Specimen #502** (the number is fixed by the FVR-34 lock-in contract, 2026-11-26 20:28 CT) — Gemini #117: "CLEARED FOR ONE CONTROLLED SECOND-FAMILY SPECIMEN (CONTRACTOR / TRADES BUSINESS OS) ONLY AFTER FIVE HARD PRE-REPLICATION GATES CLOSE," the family choice per his #115 recommendation, sustained in the captain's adjudication. CIV-058 records the same: "A controlled second specimen (Contractor) stands behind five gates (Gemini #117)."

**What the second specimen must prove** (beyond its own Eight Gates, §6): that replication is real — that Chassis v0.2's shared components (including lift L1) carry a *second industry family* without copying specimen code, and that the per-industry shape (P3) holds or fails honestly. Gemini #117's governing caution stands verbatim in force: the #501 packet "proves the calculator-class manufacturing line works end-to-end, but it does NOT justify mass replication… #501 has $0 real buyer demand proof and… left real chassis debt and tooling gaps."

### The five gates (Gemini #117, as adopted and re-scoped by the captain's adjudication, Mark 2)

| Gate | Requirement | Scope (per captain's Mark 2) |
|---|---|---|
| **G-A · Founder authorization (governing)** | Zero replication, publication, or sale until the founder rules on #501. | Governs everything below. The founder's ruling is on the #501 packet + Gemini #117 + ChatGPT's parallel challenge (still owed at the time of #117's adjudication). **This spec does not supply that ruling and does not ask the lane to proceed without it.** |
| **G-B · Chassis lift** | Scenario & shared UI components lifted into `chassis/components` (Chassis v0.2) before Title #2 is built. | Build gate for the second specimen (= §2.2 L1, with L2 hardening). |
| **G-C · Live-stamped clock law** | Every seat (including Stage 01–03 builder) logs live start/end UTC timestamps in CLOCK.md; reconstructed tool-timestamp estimates are barred. | Build gate. (Born of #501's named honesty flaw: ≈10 builder minutes reconstructed, ≈13 critic minutes estimated — EVIDENCE_PACKET §3.) |
| **G-D · Full build-tree vulnerability coverage** | Resolve the VM egress 403 on `npm audit`, **or** run an automated OSV scan over **all** lockfile entries (127 in #501), not only the distributed runtime packages. | Build gate. (v0.1 state: OSV clean for the 4 distributed packages; full build-tree audit NOT RUN — recorded, never claimed clean. EVIDENCE_PACKET Gate 4/§8.) |
| **G-E · Channel discipline** | Any commercial release of #501 enforces Shopify primary + Gumroad direct link only; the Gumroad in-app (40%) and pure-Discover (30%) channels are banned at $79, where they break the 55% margin floor even at 50 sales (EVIDENCE_PACKET §6). | **Release gate for #501 — NOT a second-specimen build gate** (captain's Mark 2 re-scoping). It binds a founder-authorized #501 release; it does not block building the Contractor specimen. It is listed here so the path record is complete and the re-scoping is never lost. |

### Riding qualifiers (Gemini #117 §B, adopted — they do not block the second specimen's build; they bind scale and release)

1. **Store-checkout customer-eye leg** (Stage-04 battery item 12) executes immediately upon founder publication authorization of #501 ($0 test order / checkout walkthrough). Until then Gate 7 stands at PASS-on-local-evidence, named as such.
2. **Demand telemetry before mass scale:** mass replication across further industry families stays HELD until real buyer demand is proven by #501 crossing its kill criterion — **50 lifetime sales at $79** (EVIDENCE_PACKET §6). The second specimen may be built in parallel; the *line* does not multiply on hope.
3. **Accessibility + reproducibility hardening** (screen-reader pass; cross-machine clean-room build) run during Chassis v0.2 hardening (= §2.2 L2).

**Path, in order:** founder ruling (G-A) → Chassis v0.2 lift + hardening (G-B, L2) under live-stamped clock law (G-C) and full-tree audit coverage (G-D) → Contractor specimen through the seven stages and Eight Gates (§6) → its evidence packet to the founder's chair. At no point does this path publish, sell, or deploy anything; G-E and qualifier 1 wait on the founder's separate #501 decisions, which this lane neither makes nor pre-empts.

---

## 4. PER-INDUSTRY VARIANT REGISTER

**This is a REGISTER, not a promise.** No variant below — except the second specimen's family, which is named in the #117 record — is authorized, scheduled, priced, or promised to anyone. No tariff is stated for any variant: FVR-32's price classes ($100/$200/$500/$1,000) are department classes **subject to demand validation**, and #501's $79 is a founder-held hypothesis for that title alone (EVIDENCE_PACKET §6), not a variant price. Demand evidence today, for every row: **zero buyer interviews, zero requests** (reconciliation §1.1(b), stated of the Factory's service face and true of the line's demand picture generally; #501 demand "unproven ($0 house revenue to date)" — EVIDENCE_PACKET Gate 8).

| # | Variant (proposal) | Status in the record | What it would be (shape only) |
|---|---|---|---|
| V1 | **Contractors / Trades Business OS** | **NAMED SECOND SPECIMEN** — Gemini #117/#115, sustained by the captain; CIV-058. Not yet authorized: stands behind the five gates (§3). | The replication proof: a second industry family on Chassis v0.2 (job costing / records / dated rate data class — detailed requirements are that specimen's own Stage 01 work, NOT FOUND yet and not invented here). |
| V2 | **Retailers Business OS** | **PROPOSAL.** No register entry found. Note honestly: Specimen #501 (Reseller Business OS) already serves *resellers*; whether a distinct retailer OS differs enough to be its own title is an open question for demand evidence, not an assumption. NOT FOUND as a decided variant. | Would ride the Ledger + Board archetypes with retail-shaped schemas and its own dated assumption register — if a real difference and real demand are shown. |
| V3 | **Property Managers Business OS** | **PROPOSAL.** NOT FOUND in any register, packet, or judgment read for this spec. | Shape only: records/board class over properties, tenants, schedules; its own dated register (local rules vary — the register discipline, §2.3 P1, is the point). |
| V4 | **Agencies Business OS** | **PROPOSAL.** NOT FOUND in any register, packet, or judgment read for this spec. | Shape only: client/project board class with engagement records and exports. |

**Register rules:**
- A variant enters this register as PROPOSAL, graduates to NAMED only by a partner-grade judgment or founder ruling on record (as V1 did), and to AUTHORIZED only by the founder.
- Every variant, when its turn comes, runs the full path: its own Stage 01 requirements traced to a real source of record (as #501's were traced to the parent kit — REQUIREMENTS.md §1), its own dated assumption register, the seven stages, the Eight Gates, the Relay (§6).
- The Book of Wants expansion (Construction Order Lane 2) is the demand-discovery mechanism whose signal report feeds the Factory's manufacturing queue; variant promotion should cite that signal when it exists. Until it exists, "we think they'd buy it" promotes nothing.

---

## 5. OWNERSHIP / EXPORT / DOCUMENTATION / MAINTENANCE — TERMS SHAPE

The terms shape is the one already shipped inside Specimen #501 (package LICENSE.txt + MAINTENANCE.md), generalized to the lane. Where #501's terms are product-specific (its fee tables), the *shape* carries and the *content* is per-product.

### 5.1 Ownership (per LICENSE.txt, the shipped shape)
- Buy this version once; it is yours to use forever. No subscription, no activation, no licence key, no check-in; nothing in the product can switch it off or expire it.
- Use: the customer's own business, on their own devices; backup copies for themselves.
- Not permitted: reselling/sharing/uploading the product files; another business using their copy; building a competing product from the files.
- Liability limited to the price paid; the product is records-and-arithmetic, not professional advice (tax/accounting/financial disclaimers per product class).

### 5.2 Export & data guarantees
- All customer records exportable at any time, in open formats (CSV + JSON), from inside the product (REQUIREMENTS.md FR-11/NFR-2: "the customer's data is theirs").
- Import never silently partial: unreadable rows are reported by row number in plain English and block the import (DESIGN.md §5).
- Storage schema version only ever increases; every bump ships a migration path carrying records forward field-by-field; **a version that cannot read its predecessor's data must say so in its listing before it is sold** (DESIGN.md §4, citing the specimen investigation Part 2 §2.3.3).
- Clear-data control deletes everything, after a plain-words confirm naming what will be erased; export is offered in the same panel, before the erase button (DESIGN.md §4).
- **Known gap carried openly:** Safari/ITP can purge browser storage after inactivity; Gemini #117 adopted the fix as a pre-publication item — README + in-app Backup bar must warn Safari/iOS users to export a JSON backup periodically. This warning is part of the lane's terms shape from v0.2 onward.

### 5.3 Documentation (ships inside every package — #501 §1.10 template, EVIDENCE_PACKET Stage 05)
Customer README (plain English) · three-step install guide · LICENSE.txt (plain-English permanent-use licence) · THIRD-PARTY-LICENSES.txt generated from the shipped bundle · VERSION.txt (product version + dated-data last-verified date) · CHANGELOG.md · screenshots · MANIFEST.sha256 · an About panel in-product carrying version, chassis version, per-table source + Last-Verified dates, the ownership licence summary, and the clear-data control (REQUIREMENTS.md FR-13).

### 5.4 Maintenance (per MAINTENANCE.md, the shipped plan's shape)
- **Dated-data re-check — quarterly.** Every figure in the product's assumption register re-checked against the primary source's own page (never a blog, forum, or competitor). Each re-check writes a dated audit note, updates the register + the in-product Last-Verified date. The date shown must always be the date of a real check.
- **Updates — the locker re-download model.** An update is a new ZIP of the same package shape placed in the same listing the customer bought from; records carry over because they live in the customer's storage, not in the file; the guide tells customers to export a JSON backup before swapping files. Every update ships CHANGELOG entry (changes named individually), bumped VERSION.txt, fresh MANIFEST.sha256.
- **Core vs rule-packs (lock-in contract distinction, binding on every Lane 1 title):** the bought core — including defect corrections — is permanently the customer's and is never paywalled after purchase. Optional paid updates are confined to genuine new value: dated rule-pack / tax-table refreshes and new versions the customer may choose. A paid update may never be the thing that keeps the bought core working.
- **Versioning rule:** corrections and additions within a product line are **1.x, free to 1.0 buyers**. A 2.0 is a separate purchase and must be labelled as such before it exists. The bought version keeps working either way (LICENSE.txt).
- **Vulnerability sweep — monthly**, on the pinned distributed manifest, by the OSV method proven in #501 (evidence/vulnerability-inspection.md); if a distributed package is vulnerable: stop, do not ship or re-ship, assess reachability against the product's security card, bump/rebuild/re-verify, record in the maintenance log.
- **Support:** a defined window per product (#501: 12 months from purchase, by email through the store page; after the window the product is still the customer's forever — support is the only part that ends), plus a support script for the predictable questions, written plain-words-first (MAINTENANCE.md §4).
- **Cost honesty:** maintenance is a named, counted cost in every product's Gate 8 economics — in #501 it is ~86% of the 24-month fixed cost (EVIDENCE_PACKET §6). No Lane 1 business case may omit it (FVR-31 correction (6): maintenance is a named ongoing cost).

---

## 6. DEPENDENCIES + ACCEPTANCE TESTS

### 6.1 Dependencies
| Dependency | State | Source |
|---|---|---|
| Chassis v0.1 record (the lift's source material) | EXISTS — inside `software-factory/specimen-501/` | DESIGN.md §7 · EVIDENCE_PACKET §1 |
| Founder ruling on #501 (packet + #117 + ChatGPT's challenge) | **OPEN — gates the whole lane's build path (G-A)** | Gemini #117 + captain's adjudication; CIV-058 open founder decisions |
| ChatGPT's parallel challenge of the #501 evidence + economics | **OWED** at the time of the #117 adjudication ("still owed before the founder's decision") | `GEMINI_SPECIMEN_501_JUDGMENT_117` — captain's adjudication preamble |
| Chassis v0.2 lift + hardening (L1, L2) | Not started; build gate G-B | §2.2 |
| Full build-tree audit coverage (egress fix or OSV-over-lockfile) | Not in place; build gate G-D | Gemini #117 gate 4 |
| Lane 3 Proof-of-Delivery passport | Construction Order Lane 3: the passport is specified as an addition to the Factory's Eight-Gate paperwork and must regenerate #501's evidence packet in the new format without inventing a field (reconciliation §2 Phase 1(ii)). Lane 1 specimens adopt the passport as their delivery evidence once Lane 3's spec passes the Relay. | Construction Order Lane 3 · reconciliation §2 |
| Lane 2 Book of Wants signal report | Feeds the Factory's manufacturing queue (variant promotion evidence, §4). Lane 1 does not block on it for the named second specimen; it blocks on it for any *further* variant promotion. | Construction Order Lane 2 |
| #501 publication / $79 price | **NOT a dependency of this lane's specification or build path** — founder's separate call; only release-side items (G-E, qualifier 1) wait on it. | FVR-34 fences · Construction Order Lane 1 dependencies |

### 6.2 Acceptance — the Eight Gates, per specimen
Every Lane 1 specimen is judged on the final artifact against the Eight-Gate standard exactly as #501 was (EVIDENCE_PACKET §4), with #501's qualifiers carried as v0.2 obligations, not forgotten:

1. **Functional accuracy** — golden suite green, cold re-run by two seats; any exactness claim (solvers, money maths) proven against brute force at the #501 standard (301 + 151 one-cent targets, 0 mismatches). A narrow FAIL is marked FAIL, fixed, and blind-verified — the Gate 1 precedent.
2. **Current business assumptions** — every figure traced to the primary source's own page (figure · base · source · check date), displayed in-product with its Last-Verified date; re-check scheduled.
3. **Offline operation** — scoped wording only: zero page-issued external requests, proven by net-logs + static scan; opens from `file://`; full workflow completed offline.
4. **Security & privacy** — security card: 0 injection sinks, 0 network primitives in source, all data in customer storage, clear-data control present; vulnerability inspection over the distributed set **and** (v0.2, per G-D) the full build tree — a NOT RUN is recorded as NOT RUN, never as clean.
5. **Third-party licensing** — bundle-true dependency inventory; attribution generated from the bundle and sample-verified verbatim against upstream licences; 0 unused runtime declarations.
6. **Mobile compatibility** — viewport renders (phone/tablet/desktop, no horizontal overflow), labelled controls, AA contrast — **plus the v0.2 screen-reader session** that v0.1 lacks (Gemini #117 qualifier 3); until that session exists, the gate is smoke-qualified and says so.
7. **Customer experience** — two independent cold walks of the shipped package by non-technical path (open → core workflow → save → export), plus the sameness check (identity · workflow · voice differences named against sibling titles — the Individuality Principle). The $0 store-checkout leg runs only on founder publication authorization and is named unrun until then.
8. **Commercial economics** — margin receipt under the challenge's six conditions (volume-conditional · crew rate as a range · chargeback line · distribution costed · 24-month sheet · headlines volume-conditional), maintenance costed (§5.4), a named kill criterion per title. **Conditional is a verdict, not a pass** — #501's Gate 8 stands conditional on 50 lifetime sales at $79, and every later title carries its own.

Plus the Stage-04 battery shape (12 items, EVIDENCE_PACKET §5) executed across improver → critic → fix → blind-verifier seats, and reproducibility: rebuilt from shipped source + lockfile, byte-identical (same-machine wording until the v0.2 cross-machine check exists).

### 6.3 Acceptance — the Relay (process gate, applies to this spec and every build)
Per the Construction Order's Reporting clause and the Relay Law: builder → improver → different-family critic → blind verifier, each seat improving the work, the whole crew in agreement before it reaches the captain, and the founder judges last. A known unresolved defect blocks a final PASS (Zero Known-Defect Rule). Missing evidence = UNVERIFIED, never PASS. Local files are not proof of live deployment — and this lane deploys nothing, so no Lane 1 claim may ever be stated as live.

---

## 7. WHAT THIS SPEC DOES NOT DO (named, so it cannot drift)
- It does **not** publish, price, sell, or deploy Specimen #501 or anything else; #501's publication and $79 remain the founder's separate call (FVR-34 fences).
- It does **not** authorize the Contractor specimen's build; it defines the path and the five gates that stand in front of it (G-A above all).
- It does **not** promise any variant in §4, any tariff, any date, or any demand.
- It does **not** lift the flagship-only door law, the indiscriminate-marketplace rejection, or any Two Houses boundary (FVR-05).
- Items marked NOT FOUND or PROPOSED in this spec stay marked that way in every document that cites it, until evidence replaces the mark.
