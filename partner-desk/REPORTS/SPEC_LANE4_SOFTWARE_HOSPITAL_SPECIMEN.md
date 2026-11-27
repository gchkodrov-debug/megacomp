# SPEC — LANE 4: AI SOFTWARE HOSPITAL, FIRST ISOLATED SPECIMEN (FVR-34)

**Lane:** 4 — AI Software Hospital, First Isolated Specimen (Software Engineering Division)
**Authority:** Founder Directive "BEGIN ECONOMIC EXPANSION CONSTRUCTION" (2026-11-26) · Construction Order — Economic Expansion (FVR-34), Lane 4 + Lane 3 · ChatGPT Economic Civilization Expansion Paper v0.1 (§4 candidate 1, §5 Phases B + C) · Captain's Reconciliation Draft 2026-11-26 (§1.1 Hospital — verdict ADAPT).
**Status:** SPECIFICATION. This document specifies an internal, isolated specimen run. It authorizes no public offer, no customer, no spending, no deployment, no launch. On completion the specification returns to the captain, passes the Relay, and only then is reported to the founder as a finished specification.
**LOCK-IN CONFORMANCE (2026-11-26 20:28 CT):** this draft is conformed to the FVR-34 lock-in contract. The specimen is a **Next.js/React + Postgres/Supabase starter** with the contract's **5 named seeded defects** (§1.2); internal rates are the contract's **$249 / $699 / $500–$1,500 / $1,000–$5,000+** (§3). The original LedgerLane draft (React/Vite + SQLite, 17 planted defects, the paper's $149 ladder) is **SUPERSEDED BY LOCK-IN CONTRACT 2026-11-26** in those points and is preserved, clearly marked, in §1.2's superseded block and §3 — not silently deleted.
**One-line purpose:** prove the Hospital loop — intake → diagnostic → repair → regression → verified delivery — end-to-end on a deliberately broken synthetic application, and produce the first real time logs the Hospital's unit economics will ever be built from.

---

## 1. The specimen

### 1.1 What it is

A small, complete, deliberately broken **synthetic** web application, built in-house to imitate the typical output of an AI app builder: plausible, demo-able, and quietly unsafe/unfinished underneath.

- **Form (lock-in contract):** a synthetic **Next.js/React + Postgres/Supabase starter app** of the kind an AI app builder ships — plausible, demo-able, and quietly unsafe/unfinished underneath. No real business, no real data, no real users; every Supabase project, key and dataset in the specimen is a local synthetic fixture.
- **Stack (the contract's bounded stack):** TypeScript/JavaScript · Next.js + React · Postgres/Supabase (local fixture) · **≤50,000 LOC**. Nothing outside this stack is in scope for the specimen (Phase B boundary, §5).
- **Features as "delivered" by its fictional AI builder:** signup/login (Supabase Auth) · a small table set where RLS is expected · an API mutation route set · a client bundle built from env config · a checkout flow with an explicit state machine (cart → pending → paid/failed) running against a **simulated payment step** (in-repo stub — no real processor, no real money, no network calls).
- **The frozen original:** at intake the untouched specimen tree is hashed (SHA-256 over the tree) and frozen. The hash is recorded in the delivery passport's origin block (§2, Stage 5). Any change to the frozen original after intake invalidates the run.

### 1.2 The planted defect list — SEALED

The specimen builder plants exactly the **5 defects named by the lock-in contract** below. This list is the grading ground truth. **Sealing protocol:** the list is written to a sealed file whose hash the captain records; the list is held by the **captain and the blind verifier only**. The diagnostic seat and the repair seat never see it — the diagnostician must find defects independently, and the repairer works only from the diagnostic report. Unsealing happens once, at blind verification (§5).

Each defect states its proof: the test or probe that shows it on the frozen original and must show its absence on the repaired build.

| ID | Seeded defect (lock-in contract names) | Proof |
|---|---|---|
| D1 | **Leaked .env secret in client bundle** — a secret from `.env` is inlined into the shipped client bundle. | Bundle scan finds the secret literal in the built client output on the original; absent after repair (secret server-side only, bundle rebuilt clean). |
| D2 | **Unauthenticated mutation route** — an API route mutates data with no session check. | Unauthenticated request mutates a row on the original; rejected 401/403 after repair, and the authenticated flow still works. |
| D3 | **Missing table RLS policy** — a table has RLS disabled or no policy, exposing other users' rows. | Cross-user read succeeds on the original with another user's key context; denied after repair (RLS enabled + policy present), owner access intact. |
| D4 | **Unpinned dependency conflict** — dependencies declared with floating ranges that resolve to a conflicting or broken set. | Clean install from the manifest reproduces the conflict on the original; the pinned manifest installs deterministically and builds after repair. |
| D5 | **Broken checkout state transition** — the checkout state machine permits an illegal transition (e.g. pending → paid without the payment step, or a double settlement). | Scripted illegal transition succeeds on the original; rejected after repair, with the legal path (cart → pending → paid via the simulated step) intact. |

**Precision ground truth (also sealed):** the starter's remaining surface — auth happy path, owner-scoped reads on RLS-correct tables, the legal checkout path — is known-good. A diagnostic claim of a defect in a known-good area counts as a **false positive** unless the critic seat independently confirms it is real — in which case it is recorded as an unplanted genuine find, not a builder error.

---

### SUPERSEDED BY LOCK-IN CONTRACT 2026-11-26 — original LedgerLane defect list (17 defects)

*The block below is the pre-lock-in draft's specimen (LedgerLane, React/Vite + SQLite, 17 planted defects, with its severity count and known-good list). It is preserved for the record and is **NOT operative**: the contract's 5-defect specimen in §1.2 above governs. Do not grade against this list.*

**SECURITY**

| ID | Sev | Defect | Proof |
|---|---|---|---|
| H-S1 | HIGH | SQL injection: the invoice-search endpoint builds its query by string-concatenating the search parameter. | Injection probe returns other users' invoice rows on the original; probe returns only the caller's own rows after repair. |
| H-S2 | HIGH | Broken access control (IDOR): `GET /api/invoices/:id` checks that a session exists but not that the invoice belongs to the caller. | User B's session reads User A's invoice on the original; receives 403/404 after repair. |
| H-S3 | HIGH | Passwords stored in plaintext in the users table. | Direct database inspection on the original; salted hashes only after repair, and login still works. |
| H-S4 | MED | A payment-gateway API key hardcoded in committed source config (a clearly synthetic, invalid string planted for this purpose). | Source scan finds the literal on the original; no secret literal in source after repair (config moved to env with a documented placeholder). |
| H-S5 | MED | Stored XSS: invoice notes are rendered with unsanitized HTML injection. | A script payload saved in a note executes on the original; renders as inert text after repair. |

**PAYMENTS (simulated gateway only — no real processor exists in the specimen)**

| ID | Sev | Defect | Proof |
|---|---|---|---|
| H-P1 | HIGH | Client-trusted totals: the server accepts the payment total sent by the browser instead of recomputing it from line items. | A tampered request pays a lower total on the original; the server recomputes and rejects/corrects the mismatch after repair. |
| H-P2 | HIGH | No idempotency: submitting the Pay action twice records two payments for one invoice. | Double-submit test shows two payment records on the original; exactly one after repair. |
| H-P3 | MED | Floating-point money math: invoice totals can differ from the sum of line items by one cent. | A crafted line-item set produces a 1-cent mismatch on the original; integer-cent arithmetic matches exactly after repair. |
| H-P4 | MED | Unverified gateway callback: the payment-confirmation endpoint accepts unsigned callbacks, so a forged callback marks an invoice "paid". | Forged callback flips an invoice to paid on the original; rejected after repair (signature check against the simulated gateway's secret). |

**CORRECTNESS**

| ID | Sev | Defect | Proof |
|---|---|---|---|
| H-C1 | MED | Tax computed on the pre-discount subtotal; the specimen's requirements sheet states tax applies to the discounted subtotal. | Worked example with a known expected total: original is wrong by the tax-on-discount amount; repaired matches to the cent. |
| H-C2 | MED | Invoice numbers derived from a seconds-resolution timestamp; two invoices created within the same second receive the same number. | Rapid-create test produces a duplicate number on the original; numbers are unique under the same test after repair. |
| H-C3 | LOW | Invoice-list pagination returns a duplicate row across pages (offset paging over an unstable sort). | Seeded 25-invoice list paged at 10 shows a repeated invoice on the original; pages are disjoint and complete after repair. |
| H-C4 | LOW | CSV export corrupts rows: notes containing commas or newlines are written unquoted. | Export of seeded data fails a parse round-trip on the original; parses back to identical records after repair. |

**COMPLETION GAPS (features the fictional builder left unfinished)**

| ID | Sev | Defect | Proof |
|---|---|---|---|
| H-G1 | MED | Forgot-password is a stub: the UI promises a reset; the endpoint returns 501 and no reset path exists. | Original: no completable reset. Repaired: a full flow works against the specimen's local mail sink — single-use token, expiry enforced, old password dead after reset. |
| H-G2 | MED | Settings page does not persist: the form shows a success message but writes nothing. | Change a setting, reload: original shows the old value; repaired shows the saved value. |
| H-G3 | LOW | Dead navigation: the "Reports" link leads to a 404. | Original: 404. Repaired: a minimal real reports page (invoice totals by status) renders from seeded data. Completion means building the page, not deleting the link. |
| H-G4 | LOW | No clean-start path: a fresh checkout fails to start (an undocumented required env var; the database seed step exists but is not wired or documented). | Original: clean checkout does not reach a running app by its own README. Repaired: documented, scripted clean start succeeds (§5, AT-4). |

**Severity count:** HIGH ×5 (H-S1, H-S2, H-S3, H-P1, H-P2) · MED ×8 · LOW ×4.

**Known-good areas (also sealed — the precision ground truth):** login happy path · invoice-creation happy path · client create/edit/delete · simulated-gateway happy-path charge. A diagnostic claim of a defect in a known-good area counts as a **false positive** unless the critic seat independently confirms it is real — in which case it is recorded as an unplanted genuine find, not a builder error.

---

*— END OF SUPERSEDED BLOCK — the operative defect set is §1.2 (D1–D5).*

## 2. The pipeline

Five stages. Each stage names its input, its work, its output, and its gate. Time is logged per stage per seat — these logs are a deliverable, not bookkeeping (Reconciliation §3 item 19: the paper's unit-economics figures are assumptions; this run replaces them with measurements).

**Stage 1 — INTAKE.**
Input: the frozen specimen package. Work: verify the tree hash against the recorded hash; open the passport's origin block (specimen ID, synthetic origin, frozen-original hash, builder seat, timestamp); sign the internal scope sheet naming which tariff lines (§3) the run will exercise; confirm isolation — specimen lives in its own directory, no outbound network, synthetic data only.
Output: intake record. **Gate: a hash mismatch stops the run before any work.**

**Stage 2 — DIAGNOSTIC.**
Input: the frozen original (read-only working copy) — and nothing else; the diagnostician has no access to the sealed list.
Work: independent examination of the whole application — code read, dynamic probes, the defect proofs of §1.2 re-derived from scratch (the diagnostician does not know they exist as a list). Every claimed defect is recorded with reproduction steps, evidence, and a severity.
Output: the **Diagnostic Report** — claimed defects with evidence, a scope mapping of each claim to a tariff line, known limitations of the examination itself, and the stage time log.
**Gate: the report is delivered to the captain before repair begins; no repair work starts from conversation or memory — only from this report.**

**Stage 3 — REPAIR.**
Input: the Diagnostic Report and a writable copy of the frozen original.
Work: the repair seat fixes the defects **the report claims**, within that bounded scope. Discoveries outside the report are logged as *additional findings* and are **not** silently fixed — scope discipline is the unit-economics discipline (paper §6: "scope creep destroys economics"). Every fix is a discrete, attributable change.
Output: the repaired tree · the **source diff** against the frozen original · per-defect fix notes keyed to the Diagnostic Report's claims · the stage time log.
**Gate: every report claim is either fixed or explicitly carried forward as an unfixed item with a reason — nothing disappears silently.**

**Stage 4 — REGRESSION.**
Input: frozen original, repaired tree, source diff.
Work: build and run the regression suite (§5, AT-3/AT-4): one defect test per fixed claim (must fail on the frozen original, pass on the repaired tree), baseline behavior tests for the known-good areas, the security re-checks, the database restore test, and the export round-trip test — all executed from a clean checkout via the repaired app's documented start. The improver seat hardens code and test quality; the critic seat attacks (§4).
Output: the suite itself (kept with the delivery — reproducible evidence, not a screenshot of green) · full run logs on both trees · the stage time log.
**Gate: the suite does not run green from a clean checkout → the delivery does not proceed.**

**Stage 5 — VERIFIED DELIVERY.**
Input: everything above.
Work: assemble the delivery package and its **Lane 3 evidence passport** (§2.1); the blind verifier then checks the evidence end-to-end **without the producer's help** and grades the run against the now-unsealed defect list (§5).
Output: the delivery package — repaired tree · source diff · Diagnostic Report · regression suite + run logs · customer-readable acceptance document (plain language: what was wrong, what was fixed, what remains limited — written as if for the fictional customer) · the passport · the complete time logs.
**Gate: the blind verifier's verdict (§5). A PASS with a known unresolved defect is impossible under the Zero Known-Defect Rule; missing evidence = UNVERIFIED, never PASS.**

### 2.1 The evidence shape the delivery carries (Lane 3)

Per Construction Order Lane 3, every Hospital delivery carries independently checkable evidence — **origin, security checks, licensing, tests run, delivery hash**. The delivery's passport is a **PDP-v1** passport: its envelope and Ed25519 signature contract are the canonical schema locked in `economy/PDP_V1_CANONICAL_SCHEMA.md` (Lane 3, the upstream spine) — this lane imports that schema exactly and invents no passport fields of its own. The table below lists the evidence **content** this specimen must supply into the canonical envelope:

| Field | Content for this specimen |
|---|---|
| Origin | Specimen ID · synthetic origin statement (built in-house as a test fixture; no customer, no real data) · specimen builder seat · frozen-original SHA-256 · intake timestamp |
| Scope | The internal scope sheet: tariff lines exercised (§3), the Diagnostic Report's claim set, exclusions (anything logged as an additional finding and not repaired) |
| Version | Repaired-tree version identifier + the source diff's hash |
| Security checks | Each security check run (the §1.2 security proofs + suite security tests), its result on the original and on the repaired tree, and the checking seat |
| Licensing | All specimen code is house-authored synthetic code; third-party dependencies listed with their licenses (SBOM-style list); no customer code, no external code of unknown license |
| Tests run | Suite name/version, test counts, pass/fail per tree, environment, full run logs referenced by hash |
| Examiner | The blind verifier's identity (seat + model family) and verdict |
| Time | Intake, diagnostic, repair, regression, delivery timestamps; per-stage time logs |
| Known limitations | Every unfixed item, every additional finding not repaired, every examination limit — stated, never omitted |
| Delivery hash | SHA-256 over the delivered tree — the artifact a future checker re-derives to confirm the delivery is the delivery |

Signing discipline follows the Gatehouse sequence (Lock → Sign → Persist → Broadcast → Verify) **as design reference only** — the passport is hash-chained to the frozen original and the diff; no wallet, no chain, no broadcast exists in this specimen (mainnet HOLD stands, §7).

### 2.2 Lock-in bindings — PDP-v1 spine + Three-Layer Contract

**PDP-v1 spine:** Lane 4's deliveries emit PDP-v1 passports under the canonical schema (`economy/PDP_V1_CANONICAL_SCHEMA.md`) — imported exactly, never re-fielded here (§2.1).

**Three-Layer Civilization Contract:** this specimen run is **internal** — it has no customer-facing surface, and AT-9's specimen-stage deferral of any cinematic layer stands for the run. The Hospital's customer-facing form, if the founder's gates ever open it, binds the contract in full: **Layer 1 Entrance** — the canonical doorway (palette #141210 / #30251B / #C9A227 / #E9DDC6), capability framing in plain words, **zero forced wallet/account walls** (a customer reaches intake without a wallet or an account wall); **Layer 2 Living World** — the Hospital as a district of the civilization with Solnik's guidance, adding **no latency to repeat utility actions** (status checks, passport lookups); **Layer 3 Functionality** — the **/verify** surface for passport checking (fast, keyboard-accessible, deterministic, local-first, one-click clean export of the check result) and the intake surface beside it. The Hospital is never specified as a standalone SaaS dashboard or orphan micro-site.

---

## 3. Internal test tariff

**Internal rates (lock-in contract, 2026-11-26 — INTERNAL CALIBRATION ONLY):**

| Tariff line (INTERNAL TEST ONLY) | Internal rate | Specimen stage booked against it |
|---|---|---|
| Tier-1 Diagnostic (audit) | **$249** | Stage 2 |
| Tier-2 Bounded Repair (sprint) | **$699** | Stage 3 |
| Completion | **$500–$1,500** | Stage 4 + completion work the diagnostic scopes |
| Production-prep | **$1,000–$5,000+** | Not exercised by this specimen (no production exists to prepare) |

Exercised by this specimen as an accounting fiction — each stage's logged time is booked against its line so the run produces a priced-as-if record, and the Phase C 55% margin-floor kill rule (§6) has real numbers to bite on.

**Fences on this table, stated on its face:** these rates are **INTERNAL ONLY** — calibrated solely for internal time-and-margin accounting. No public offer, no listing, no customer, no payment, no merchant step. Public pricing remains unsettled and the founder's call (standing rule: prices are labeled from cost math; the founder judges last).

*SUPERSEDED BY LOCK-IN CONTRACT 2026-11-26: the pre-lock-in draft's table — the paper's test ladder, quoted there exactly ("Test ladder $149 diagnostic / $499 bounded repair / $999 readiness assessment / custom scoped sprint above $1k; not approved tariff") booked at $149 / $499 / $999 — is superseded by the contract rates above and remains on record in the draft history only.* 

---

## 4. Roles — Relay Law

Per the Relay Law, the specimen passes hand to hand — builder → improver → different-family critic → blind verifier — each seat improving it, until the whole crew agrees it is the finest variant; only then does it reach the captain, who judges last. No seat grades its own work; no seat sees the sealed list except as assigned.

| Seat | Who | Stage(s) | Charter |
|---|---|---|---|
| Specimen Builder | A builder seat that takes **no later seat** in this run | §1, Stage 1 prep | Builds the Next.js/Supabase starter working-but-broken, plants exactly the 5 seeded defects of §1.2, writes the sealed list and the known-good list, freezes and hashes the original. |
| Diagnostician (Examiner) | An examiner seat, blind to the sealed list | Stage 2 | Independent diagnosis; evidence or it isn't claimed. |
| Repairer (Builder) | A builder seat that did not build the specimen | Stage 3 | Repairs the Diagnostic Report's claims, in scope, diff-attributable. |
| Improver | A second builder seat | Stage 4 | Hardens the repair and the suite: readability, test quality, documentation, the clean-start path. |
| Critic | A **different model family** from the repairer | Stage 4 | Attacks: re-runs every defect proof against the repaired tree, hunts regressions in known-good areas, challenges diagnostic false positives, tries to break the fixes. Disagreements are settled inside the relay, never carried into the delivery. |
| Blind Verifier | A verifier seat that produced nothing in this run | Stage 5 | Receives the sealed list from the captain at verification time only. Grades the run (§5), checks the passport end-to-end unaided, issues the verdict. |
| Captain | — | All | Holds the seal, records hashes, judges last. Reports the landing to the founder and both partners in the same motion. |

Crew briefs for every seat load the crew tools manifest and the crew skills pack together, per standing law.

---

## 5. Acceptance tests

The construction order adopts the paper's Phase B prototype rule for this lane. The paper, §5, verbatim:

> "Phase B ($0 isolated prototype): one deliberately broken synthetic app, independently diagnose and fix, freeze original, reproducible test evidence, regression/security/restore/export, customer-readable acceptance, demo accessible physical-device path. One isolated automation on synthetic inbox/docs, with human approval. Do not accept real customer private code until secure intake/consent/isolation and licensing gates pass."

Sentence 1 is Lane 4's rule. Sentence 2 is Lane 5's prototype, not this lane's. Sentence 3 is a standing fence this spec also adopts (§7).

**Sandbox parameters (lock-in contract, binding on the run):** diagnostic and repair work executes in an ephemeral zero-egress sandbox — `--network=none` · read-only `/src` mount · hard CPU/memory timeout — bounded to TypeScript/JavaScript + Postgres/Supabase at **≤50,000 LOC**; an intake beyond the stack or LOC boundary is rejected before work begins (Phase C kill rule, §6). The acceptance tests below operationalize sentence 1:

- **AT-1 — Freeze integrity.** The frozen original's hash at verification equals the intake hash. Any drift voids the run.
- **AT-2 — The blind gate (lock-in contract).** The blind verifier receives **only** three things: the original synthetic broken repo, the repaired repo, and its PDP-v1 passport. At verification the captain unseals the defect list; the verifier grades **each of the 5 seeded defects FIXED vs REGRESSED** (its §1.2 proof absent on the repaired tree = FIXED; still reproducible or worsened = REGRESSED) and verifies **zero newly introduced security/license flaws** in the repaired tree. Supporting numbers, all recorded in the passport: **recall** (seeded defects the Diagnostic Report found ÷ 5) and **precision** (report claims confirmed real ÷ total claims, with unplanted genuine finds recorded separately, not counted as errors).
- **AT-3 — Defect tests.** Every fixed defect has a reproducible test that **fails on the frozen original and passes on the repaired tree**. A fix without such a test is unverified and counts as not fixed.
- **AT-4 — Clean start + no regressions.** From a fresh checkout, the repaired app starts by its own documented steps and the baseline behavior tests for all known-good areas pass. The critic's regression report is part of the evidence.
- **AT-5 — Security re-check.** Every §1.2 security proof (D1 leaked secret, D2 unauthenticated mutation, D3 missing RLS) and the checkout-integrity proof (D5) is re-run against the repaired tree by the critic seat and fails to reproduce the defect.
- **AT-6 — Restore + export.** The Postgres database is backed up and restored into a fresh instance and the app runs correctly on the restored data; the customer-owned export (full source tree + data export) is produced and opened by the blind verifier.
- **AT-7 — Evidence checkable unaided.** The blind verifier validates the §2.1 passport end-to-end — hashes re-derived, logs matched, diff matched to fix notes — **without the producer's help**. Any field the verifier cannot check is recorded as missing evidence.
- **AT-8 — Customer-readable acceptance.** The acceptance document exists, is plain-language, and names what was wrong, what was fixed, and what remains limited — including every known limitation carried in the passport. No "vulnerability-free" or equivalent guarantee language appears anywhere in the delivery (paper §4.1: "No guarantee vulnerability-free").
- **AT-9 — Accessible demo path.** The repaired app's acceptance demo is reachable and usable via an accessible path on a physical device. No cinematic layer is required or built at specimen stage (cinematic form follows only after a real listing, real data, and an accessible route exist).
- **AT-10 — Time-log completeness.** Every stage's time log is present and booked against §3's tariff lines, producing the run's priced-as-if record.

**Pass rule (Zero Known-Defect, applied):** the specimen PASSES only if all 5 seeded defects grade FIXED (none REGRESSED) at the blind gate (AT-2), AT-1/AT-3/AT-4/AT-5/AT-6/AT-7 hold, and the passport's known-limitations field honestly carries everything else. Any known unresolved HIGH defect blocks the PASS automatically. Any missing evidence renders the affected claim UNVERIFIED, never PASS. A failed specimen is a result, not an embarrassment: it is reported as failed, with the defect named — a correction is not a failure; reporting unverified work as completed is the failure.

---

## 6. Kill rules — verbatim from the paper

The Construction Order (Lane 4) adopts the paper's Phase C kill rules verbatim. The paper, §5, verbatim:

> "Phase C (only after founder/commercial clearance): target 10 qualified requests in 30 days, 3 independent paid pilots at price covering realistic delivery, two completed on time with acceptance (target all), no unresolved high security/privacy incident, track all requests, quotes, acceptance/refunds and cost. Stop or re-scope if zero willing to pay after 10 qualified offers, negative contribution margin, unsafe access, or team cannot deliver. Do not interpret small sample as market dominance. After >=10 completed paid jobs, evaluate >=80% first-pass acceptance, positive median contribution, <=10% refund/dispute and repeat/maintenance interest with mature followup; proposed thresholds, founder/partners can refine before launch. No false confidence from tiny cohorts. Expand only after verified operational capacity."

**Applicability, stated plainly:** Phase C is **not authorized** by this specification — it sits behind founder/commercial clearance, which has not been given. The rules are recorded here unaltered, as the lane's standing stop law, so that no future clearance can quietly soften them. For this Phase B specimen, two of their conditions are already operative in substance: **unsafe access** (any pressure to admit real customer code, real data, or a real payment rail stops the run on the spot — §7) and **team cannot deliver** (if the loop cannot carry the specimen to verified delivery, the lane stops and re-scopes; it does not dress a failure as a pass).

**Phase C kill rules (lock-in contract formulation, binding alongside the verbatim rules above):** immediate abort/reject if (i) intake exceeds the stack/LOC boundaries (TypeScript/JavaScript + Postgres/Supabase, ≤50,000 LOC); (ii) repair requires an architectural rewrite rather than stabilization; or (iii) **contribution margin falls below the 55% house floor under logged engineering time** — the §3 internal rates against the run's real time logs decide (iii), which is why the logs are a deliverable.

---

## 7. Dependencies + fences

**Dependencies**
- **Lane 3 — PDP-v1 (the upstream spine).** The specimen's delivery carries a PDP-v1 passport under the canonical schema (`economy/PDP_V1_CANONICAL_SCHEMA.md`); §2.1's table is the evidence content this specimen supplies into that envelope. If the canonical lock lands after this spec, the specimen adopts the locked schema on arrival — it does not invent a second shape, and it does not wait idly: the run may proceed on §2.1's content table with the envelope applied at delivery.
- **Factory benches (Software Factory, CIV-058).** The pipeline runs on the Factory's benches and paperwork habits (the Eight-Gate evidence discipline proven on Specimen #501). The Hospital is the Factory's service face, not a new department (Reconciliation §1.1 verdict: ADAPT).
- **The captain's seal-keeping.** The sealed list, its hash, and the freeze hash exist only if the captain holds them from Stage 1. No seal, no run.
- **A physical device** for AT-9's accessible demo check.

**Fences (all standing law, restated for this lane)**
- **$0.** No spending of any kind: no tooling purchases, no services, no ads. The run uses existing benches only.
- **Synthetic only.** The specimen, its data, its users, its gateway, and its planted secret are synthetic. The simulated gateway never touches a real processor, a real key, or a network.
- **No real customer code.** Per the paper's Phase B fence (§5): no real customer private code is accepted — by this lane, at this stage, under any framing — until secure intake/consent/isolation and licensing gates exist and pass. They do not exist yet.
- **No public offer, no launch, no deployment.** The §3 tariff is internal test only. Nothing is listed, published, priced publicly, or deployed anywhere. The Studio door (CIV-039) stays as it stands — sealed, zero prices — until the founder's separate word.
- **Sequence fence (Reconciliation §1.1c).** #501's publication and price remain the founder's separate open calls, not ordered here and not advanced by this specimen. The Hospital specimen proves competence internally; it does not invert the founder's publish-our-own-first sequence.
- **Two Houses.** This is PROVADIA ground (Software Factory / Studio). Nothing in this lane attaches to OneJobKits' catalogue, storefront, or payment system.
- **Security law binds.** Zero Known-Defect Rule · Relay Law · Solnik's permanent verification requirements where any agent seat touches the work (no credential requests, no unauthorized transactions — the specimen requires neither) · Gatehouse mainnet HOLD untouched (design reference only, §2.1).
- **Honesty of record.** Recall, precision, misses, and false positives are reported as measured. A diagnostic miss is data about the diagnostic process; it is never edited out of the record.

---

*End of specification. Prepared for the captain's review; passes the Relay (builder → improver → different-family critic → blind verifier) before it is reported to the founder as a finished specification. No file other than this specification was created or edited in its preparation.*
