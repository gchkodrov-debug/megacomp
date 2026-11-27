# EVIDENCE PACKET — SOFTWARE FACTORY FIRST SPECIMEN
## Reseller Business OS 1.0 (product #501) on Chassis v0.1

**Authorization:** founder, 2026-11-25 00:41 CT — one controlled specimen only. No spending · no public deployment · no publication · no sale · no store changes · no priority changes. Stage 06 executed as distribution *readiness* only. This packet returns to the founder's chair before anything ships.
**Manufactured:** 2026-11-25, 06:43–07:37 UTC, by a five-seat relay (builder → improver → different-family critic → economics → blind verifier), coordinator-assembled.
**The artifact:** `package/ResellerBusinessOS-1.0.zip` — **290,578 bytes · sha256 `d12086687ef237e55d7f199251d04c787eb54c6fe1e5dfe5c170a084027782ec`** · the app inside it ("Reseller Business OS.html", single-file build) — **274,067 bytes · sha256 `c5cd7d5da81ce9ad273168799e866f9b826d97f77cf95473c2a4ccbb5801645d`**.

## HEADLINE

- **Eight Gates: 7 PASS · 1 PASS-after-fix (Gate 1) · 0 FAIL on the final artifact.** Gate 7 passes on local evidence; its store-checkout leg was excluded by the authorization itself and is named, not hidden.
- **Stage-04 battery: items 1–11 PASS · item 12 PARTIAL by design** (local customer-eye leg passed twice, independently; the $0 store leg requires publication the founder has not authorized).
- **Complete Clock: ≈75 seat-minutes** across all seven stages and all seats (54 live-stamped/logged + ≈13 for the original critic seat, whose report was completed by its successor seat + ≈8 packet assembly). Detail in §3, including the one reconstructed segment, flagged where it stands.
- **Margin receipt (Gate 8):** at the $79 hypothesis, the 55% floor holds from **13–26 lifetime sales (Shopify, base)** and the **kill criterion for this fee-table flagship title is 50 lifetime sales**. The Gumroad in-app (40%) and pure-Discover (30%) channels do **not** clear the floor at 50 sales — channel discipline is part of the product's economics, stated in §6.
- **The relay is unanimous on the final artifact.** The blind verifier confirmed every claim put to it, cold, including both defects' fixes exercised through the real UI.

---

## 1. WHAT WAS BUILT

**Chassis v0.1 (calculator class)** — `project/src/chassis/`: React 19.3.1 + TypeScript + Vite 8.3.8, exact-pinned with a house lockfile; runtime allowlist of exactly react / react-dom / lucide-react (a fourth package, scheduler, enters only as react-dom's own dependency — inventoried and attributed); OneJobKits theme tokens (ink #111111 · deep green #004C3F · accent #95BF47 · paper #FAFAF7) plus the PROVADIA token file proving theme-layering; IndexedDB storage engine with one-click JSON/CSV export and import/restore; the component set (labelled entry set · preset picker displaying each preset's source + Last-Verified date · results ledger · scenario set · import/export bar · chrome with About panel + clear-data); `STATIC_BUNDLE_CONTRACT.md` (Profile S); `scripts/license-pack.mjs` generating attribution from the distributed bundle.

**Reseller Business OS 1.0** — the #501 kit's workflows as application state, on the corrected fee tables as dated data:
- Six marketplaces, fee logic from the 2026-11-25 audit of record (the only lawful source): **eBay** 13.6% + $0.40/order on item+shipping+tax, with the $7,500→2.35% tier and a named 13.25% Coins & Collectibles variant · **Etsy (US)** 6.5% + 3%+$0.25 + $0.20 as shown components · **Amazon** 15% default (category options 8/12/17/45%), $0.30 minimum, referral-only labelled · **Depop (US)** 0% selling + 3.3%+$0.45 · **Poshmark** two-tier ($2.95 under $15 · 20% at $15+) · **Mercari** 10% on item + buyer-paid shipping (Buyer Protection shown, never deducted). Every preset displays its source and **Last Verified: 2026-11-25** in the product.
- Single-flip calculator with six-platform side-by-side comparison · reverse pricing both directions · Item Log (sourced→listed→sold, dead-stock flag >90 days) · Per-Platform Summary · Monthly P&L · Dashboard (platform × month) · Sourcing Log with target-margin flag · Tax-Time Summary with print view · saved scenarios · full JSON/CSV export · **Gen 1 bridge**: the kit's Item Log imports by CSV with totals reconciled on import.

## 2. THE SEVEN STAGES — PER-STAGE ACCOUNT

| Stage | What happened | Exhibits |
|---|---|---|
| 01 Requirements | Requirements traced line-by-line to the kit's own record (contents, $19/$29 tiers, EXAMPLE); assumption register v1 filed (8 rows: figure · source URL · check date 2026-11-25); scope decisions recorded — six platforms, Whatnot/TikTok Shop deferred to v1.1, the Gen 1 kit's own preset correction recorded as a separable maintenance note (kit files untouched). | `REQUIREMENTS.md` |
| 02 Design | Data schemas, exact fee formulas + the round-half-up-once rule, IndexedDB schema + migration rule, Gen 1 CSV import format, view list — as a spec manifest a different provider could rebuild from. | `DESIGN.md` · `project/app.spec.json` |
| 03 Construction | Chassis v0.1 + the full application built into the pinned manifest (no generator boilerplate: 0 unused runtime declarations). Both a standard dist/ and a single-file build that opens from `file://`. Generation provenance: constructed by the house builder seat directly in the chassis — no external generator was used, which is itself a provider-independence datum. | `project/` · `seats/builder.md` |
| 04 Verification | The 12-item battery (§5) executed across improver, critic (DeepSeek V4-Pro + in-seat brute force), fix, and blind-verifier seats. Two defects found, fixed, and re-verified (§4). | `evidence/battery-stage04.md` · `evidence/fix-round.md` · `seats/critic.md` · `seats/verifier.md` |
| 05 Packaging | The §1.10 template complete: customer README, three-step install guide, `LICENSE.txt` (permanent-use licence, plain English), `THIRD-PARTY-LICENSES.txt` generated from the shipped bundle, `VERSION.txt`, changelog stub, screenshots, `MANIFEST.sha256`. Margin receipt produced (§6). | `package/ResellerBusinessOS-1.0/` + `.zip` · `evidence/margin-receipt.md` |
| 06 Distribution readiness | READINESS ONLY — nothing went live anywhere. The shipped ZIP was unzipped cold in a clean folder and walked by two independent seats (open → calculate → save → export), all green. | `evidence/customer-eye-local.md` · `seats/verifier.md` |
| 07 Maintenance | Plan filed: fee-table quarterly re-check (next due **2027-02-25**) against the register · locker re-download update mechanics · monthly vulnerability sweep of the pinned manifest · support script for the predictable questions (incl. "why does eBay show 13.6%?"). | `MAINTENANCE.md` |

## 3. THE COMPLETE CLOCK (cost data — never a pass mark)

| Stage | Seat-minutes |
|---|---|
| 01 Requirements | 17 (coordinator 14 + builder ~3) |
| 02 Design | ~2 (builder) |
| 03 Construction | ~5 (builder) |
| 04 Verification (improver 10 + critic seats ≈18 + fix 2 + blind verifier 7) | ≈37 |
| 05 Packaging + economics | ~4 (improver 1 + economics 3) |
| 06 Distribution readiness | ~1 |
| 07 Maintenance plan | ~1 |
| Packet assembly (coordinator) | ~8 |
| **TOTAL** | **≈75 seat-minutes** |

Honesty notes: the builder's ~10 minutes (Stages 01–03) were reconstructed from tool timestamps, not live-stamped — the flaw is named in `seats/builder.md`, and every later seat live-stamped. The original critic seat ended mid-flight after filing its DeepSeek pass and its rebuild; its minutes (≈13) are estimated from its artifacts' timestamps and its successor seat's record. **Reconciliation against the margin receipt:** the receipt costed the build at a 62-minute conservative bound; the final clock is ≈75. Restated at the final clock, the 24-month fixed cost is **≈$356 @ $25/h · ≈$713 @ $50/h** (vs $351/$702 in the receipt) — a +$5/+$11 shift that moves no floor crossing by a full sale except the single worst cell (Gumroad stress @ $50/h), whose arithmetic crossing moves from 50 to ≈51 sales; the kill criterion in §6 already stands at 50 as the governing round number and absorbs gaps of exactly this class. The receipt itself is unedited (its addendum excepted, marked as such).

## 4. THE EIGHT GATES — VERDICTS ON THE FINAL ARTIFACT

| Gate | Verdict | Evidence |
|---|---|---|
| 1 Functional accuracy | **PASS — after a narrow FAIL at the critic seat, fixed and blind-verified** | Golden suite 33/33 (`project/`, re-run cold by two seats). The critic's brute force found the reverse-pricing solver overpricing by 6–12¢ in two fee-step windows (Poshmark targets $12.03/$12.04; eBay $8.26–$8.34) — it never under-delivered a target net, but it broke its own "lowest list price" spec: **Gate 1 was marked FAIL (narrow)**. Fix R1 made the search exact around fee steps; proof: Poshmark 301 one-cent targets + eBay 151 targets, **0 mismatches** vs brute force; the blind verifier then drove the real UI: $12.03 → **$14.98** ✓ · $12.05 → **$15.06** ✓. |
| 2 Current business assumptions | **PASS** | `evidence/assumption-audit.md`: 8/8 app rows traced to the marketplaces' own pages via the audit of record (figure · base · source · 2026-11-25), each preset displaying source + Last-Verified date in-product; re-check scheduled 2027-02-25. The parent kit's table is stale on all 4 of its rows — recorded, not edited (maintenance note, §8). |
| 3 Offline operation | **PASS** (scoped wording, per the critic's ruling) | The claim the evidence supports, stated exactly: **zero page-issued external requests** — proven by Chromium net-logs on both builds (`evidence/offline-proof.md`) and by the blind verifier's whole-session net-log (its only requests were browser housekeeping, none from the page), plus a static scan of the shipped file (no external src/href; no font or CDN references). Opens from `file://`; full workflow completed offline by two seats. |
| 4 Security & privacy | **PASS** | `evidence/security-card.md`: 0 injection sinks (no innerHTML/eval paths), 0 fetch/XHR/WebSocket/sendBeacon in source, all data in the customer's IndexedDB, clear-data control present. Vulnerability inspection: **OSV clean for all 4 distributed packages** (`evidence/vulnerability-inspection.md`); the full build-tree `npm audit` could NOT be run — this VM's egress policy refuses the registry audit endpoint (403) — recorded as NOT RUN, never as clean. |
| 5 Third-party licensing | **PASS** | Dependency inventory from the shipped bundle: 127 lockfile entries build-time vs **4 distributed packages** (react, react-dom, lucide-react, scheduler) — `evidence/dependency-inventory.md`. `THIRD-PARTY-LICENSES.txt` generated from the bundle; the critic sampled **all 4 texts verbatim** against the packages' own LICENSE files (the improver had caught scheduler shipping unattributed and fixed the packer to the dependency closure). 0 unused runtime declarations. Our own `LICENSE.txt` (permanent-use) ships beside it. |
| 6 Mobile compatibility | **PASS, smoke-qualified** | `evidence/viewport-accessibility.md`: Chromium renders at 375×812, 768×1024, 1440×900 — no horizontal overflow in either build; 0 unlabelled controls; all 17 token contrast pairs ≥5.76:1 (AA). The qualifier stands: this is a smoke pass — no screen-reader session was run. |
| 7 Customer experience | **PASS on local evidence** | Two independent cold walks of the shipped ZIP (`evidence/customer-eye-local.md`; blind verifier §2 of `seats/verifier.md`): a non-technical path — open the named file → calculate a flip (fee $11.01 / net $42.99, hand-checked exact) → save a scenario (persists across reload) → log an item (appears in summaries) → export a backup (parses, complete). Individuality: the blind verifier's sameness check names three real differences from MarginLedger (identity · workflow · voice) — battery item 10 PASS. **The $0 store-checkout leg was not run: publication is outside this authorization.** |
| 8 Commercial economics | **PASS, conditional** | `evidence/margin-receipt.md` satisfies all six conditions of the margin challenge (volume-conditional · crew rate as a $25–$50/h range · chargeback line · distribution costed · 24-month sheet · headlines volume-conditional). Verdict in §6. The condition is the kill criterion: this title must reach **50 lifetime sales at $79** for the factory claim to hold — demand is unproven ($0 house revenue to date). |

## 5. THE STAGE-04 BATTERY — ITEM BY ITEM

1. Golden-case math suite — **PASS** (Poshmark boundary pair, eBay fee-base + $7,500-tier, Depop zero-fee, Mercari shipping-in-base, Amazon $0.30-minimum, Etsy stack, reverse pricing; 33/33 with the storage/UI suites).
2. EXAMPLE reconciliation — **PASS**: the kit's 15-item dataset, imported through the app's own bridge, lands on the **corrected** totals — fees **$92.00** · net **$362.55** — against an expectation computed independently (Python/Decimal, no shared code) from the corrected table; the +$6.76 delta vs the kit's $355.79 is the stale eBay rate, documented in `project/fixtures/README.md`.
3. Assumption audit, signed — **PASS** (Gate 2).
4. Zero-call offline proof — **PASS** (Gate 3, scoped wording).
5. Dependency audit artifact — **PASS** (Gate 5).
6. Licence scan + attribution — **PASS** (Gate 5; one in-seat find — scheduler — fixed before the gate was judged).
7. Security card — **PASS** (Gate 4).
8. Viewport + accessibility — **PASS, smoke-qualified** (Gate 6).
9. Import/bridge + export sanity — **PASS** (import reconciles on screen: kit $98.76 → corrected $92.00; exported CSV parses in a real parser; JSON backup parses and round-trips value-for-value).
10. Sameness check — **PASS** (blind verifier: identity · workflow · voice differences named against MarginLedger and the Gen 1 parent).
11. Blind verification — **PASS** (a fresh seat ran the exhibits cold and confirmed every claim; `seats/verifier.md`).
12. Customer-eye run — **PARTIAL BY DESIGN**: local leg PASS twice independently; the $0 store-checkout leg requires a live listing — publication is the founder's separate decision, not part of this authorization.

## 6. THE MARGIN RECEIPT — FLOOR VERDICT AT $79

Full receipt: `evidence/margin-receipt.md` (+ its marked fix-round addendum). 24-month fixed cost ≈**$356–$713** per title across the $25–$50/h crew-rate range — of which **fee-table maintenance is ~86%** (12 h over 24 months); the entire manufacturing clock is ~$31–$63 of it. Lifetime sales at which the 55% floor first holds:

| Channel | Base | Stress (refunds 10%, chargebacks 1.85%, support ×2) |
|---|---|---|
| Shopify | 13–26 sales | 16–33 sales |
| Gumroad direct | 18–37 sales | 24–50 sales |
| Gumroad in-app (40% take) | **does not clear at 50** (44.4% / 35.0%) | — |
| Gumroad Discover (30%, pure mix, addendum) | **does not clear at 50** (54.4% / 45.0%) | — |

At 10 lifetime sales, $79 fails in every channel, case, and rate (best cell 45.6%). At ~200 sales on Shopify the margin is ≈87.8% — the old 88.2% headline lives there and only there, as the challenge ruled. **Kill criterion for this title: 50 lifetime sales at $79.** Cross-check: the receipt reproduces the independent challenge's §6 cases within ~0.1–1 pt wherever the inputs coincide (Shopify @200: 87.8% vs 87.9%).

## 7. THE FOUNDER'S EIGHT DEMONSTRATIONS — EACH MAPPED

1. **Permanent offline customer ownership** — Profile S artifact: opens from `file://`, zero page-issued requests, no activation/key/account anywhere in the product; the licence (`package/.../LICENSE.txt`) grants the bought version forever. Gates 3+7.
2. **Provider-independent architecture** — the product was built *in* the house chassis from a written spec (`app.spec.json`); no generator runtime, account, or vendor code path exists inside it; its rebuild from source + lockfile reproduced it byte-for-byte (below).
3. **Verified and dated fee assumptions** — Gate 2: every row sourced + check-dated 2026-11-25, displayed in-product, re-check scheduled.
4. **Reliable storage, backup, restoration** — IndexedDB persistence proven across reloads by two seats; backup export → wipe → import round-trip value-for-value in the automated suite (5 storage tests) and by hand in the cold walks.
5. **Complete licensing + dependency accountability** — Gate 5: bundle-true inventory (127 vs 4), attribution generated from the bundle and sample-verified verbatim, supply-chain records filed (§9 of the improver's exhibits; `evidence/dependency-inventory.md`, `evidence/license-scan.md`, `evidence/vulnerability-inspection.md`).
6. **Independent functional, security, usability verification** — five seats, two of them adversarial by design (different-family critic with a DeepSeek V4-Pro pass; blind verifier cold). Gates 1, 4, 6, 7.
7. **Actual manufacturing time + full commercial cost accounting** — §3 (actual clock, with its two estimation flags named) + §6 (24-month receipt under the challenge's six conditions).
8. **Commercial packaging a non-technical customer can use** — the package's named-file shape (double-click "Reseller Business OS.html", no server, no install), three-step install guide, plain-English README and licence; walked cold by two seats as a non-technical buyer.

**Reproducibility (Supply Chain Record 4), in the critic's authorized wording:** *"Rebuilt from the shipped source + lockfile with a fresh npm ci in a separate directory on the same machine; the output is byte-identical to the shipped file (sha256 c5cd7d5d…). Cross-machine reproducibility is not claimed."* — proven twice: by the critic seat on the pre-fix artifact and by the blind verifier on the final one.

## 8. DEVIATIONS + OPEN ITEMS (all named, none buried)

- **Battery item 12 store leg unrun** — authorization, not artifact. Publication returns to the founder with this packet.
- **Full build-tree `npm audit` NOT RUN** — VM egress refuses the registry audit endpoint; OSV covers the distributed set (clean). The build tree's dev-only packages are un-audited by that tool.
- **Margin definition changed vs the Gen 1 kit — now disclosed (fix R2).** The app's margin (net ÷ item price, both shipping legs in net) serves the reseller better (both critic seats concur), but it shipped initially with the kit's 40% threshold and "BELOW TARGET" wording and *no* disclosure — a confirmed transparency defect, fixed by the critic's sentence now standing in the Sourcing view, the README, and the About panel, and grep-verified in the shipped file by the blind verifier.
- **System fonts, not self-hosted WOFF2** — a deliberate v0.1 decision (zero external requests is the contract's substance); recorded by the builder, judged not gate-relevant by the critic.
- **Gen 1 bridge is CSV-shaped** (the kit's Item Log export shape); full restore travels by the app's own JSON backup. Named in-product.
- **Accessibility is smoke-level** (contrast + labels + overflow); no screen-reader session exists in this house's tooling yet.
- **Scenario components live in the app**, not yet lifted into `chassis/components` — chassis debt for the second title, recorded by the builder.
- **Gen 1 maintenance note (separate from the specimen):** the parent kit's own fee table is stale on all four rows (eBay 13.25% among them). A two-cell-class correction to the kit is recommended to the founder as ordinary maintenance — it was NOT made under this authorization.
- **Platform set:** Whatnot + TikTok Shop are deferred to v1.1 by the recorded scope decision; the free-calculator field already covers them — the packet's §4.5-of-record risk stands.
- **DeepSeek's reply is truncated** at its source (it ends mid-sentence in its third weakest-claim section and never judged the EXAMPLE reconciliation or the economics); the critic completion seat closed both gaps in-seat and recorded the truncation in `seats/critic.md`. The DeepSeek pass stands as one instrument inside the critic seat, not as the seat itself.
- **Process incident, plainly:** the original critic seat ended mid-flight without a report. Its DeepSeek attack and its rebuild were adopted by a completion seat, which finished the grading. No evidence was lost; the relay's verdicts all postdate the recovery.

## 9. RELAY VERDICTS

- **Builder** — built to the brief; self-reported 8 deviations + 4 known weaknesses, every one of which the later seats either fixed or judged. Its two named flaws (reconstructed clock; silent storage failure) were corrected in the seats that followed.
- **Improver** — cold-reproduced the builder's gates exactly; fixed persistence testing, silent-failure surfacing, and the settings race; caught the scheduler attribution defect in its own pass and fixed the packer; executed battery items 3–9 and the local customer-eye leg; packaged the artifact.
- **Critic (different family: DeepSeek V4-Pro instrument + completion seat)** — graded 5 CONFIRMED defects (reverse-pricing non-minimality · margin non-disclosure · offline wording · "clean-room" wording · test-scope wording) and REJECTED 4 attacks on the record (DeepSeek's exact $12.05 failure construction — the app was right · the Case-9 defect reading · the rebuild-circularity suspicion · the dashboard-drift suspicion, killed by 300 randomized trials). Ruled Gate 1 FAIL (narrow) pre-fix; its remedies R1–R8 sized the fix round.
- **Economics** — the receipt under the challenge's six conditions; kill criterion 50; the in-app/Discover channel failures stated, not softened.
- **Blind verifier** — every claim CONFIRMED cold: hashes, manifest, the full non-technical walk, both fix spot-checks through the real UI, byte-identical rebuild, 33/33, sameness, Gate 7 PASS on local evidence. No disagreement carried forward.
- **Coordinator's adjudication:** the relay is **unanimous on the final artifact**. The specimen demonstrates the factory for the calculator class — no larger sentence than that, per the adoption bar.

## 10. WHAT THIS PACKET DOES NOT PROVE

Demand (no customer has been offered this product; house revenue is $0) · the $79 price (a hypothesis the receipt tests, not a market fact) · Gen 3 / Profile H anything · any other product class · cross-machine reproducibility · screen-reader-grade accessibility · the store leg of the customer-eye run. Publication, pricing, and replication are the founder's decisions, and they begin — if they begin — from this packet.

*Filed 2026-11-25 by the coordinator. Every number above traces to a filed exhibit in this folder: `REQUIREMENTS.md` · `DESIGN.md` · `CLOCK.md` · `MAINTENANCE.md` · `seats/` (5 reports + the DeepSeek prompt/reply) · `evidence/` (battery, audits, proofs, receipt, fix round, verifier results) · `package/` (the artifact + its manifest). The founder judges last.*
