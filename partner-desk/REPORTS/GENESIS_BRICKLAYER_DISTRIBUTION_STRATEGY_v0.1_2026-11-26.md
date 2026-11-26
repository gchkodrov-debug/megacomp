# GENESIS BRICKLAYER — DISTRIBUTION STRATEGY v0.1 (2026-11-26)

## ⚠️ STATUS OF THIS DOCUMENT

**DRAFT — FOR INDEPENDENT EXAMINATION (Gemini + ChatGPT) AND FOUNDER FINAL APPROVAL.**

**$0 SPEND UNTIL FOUNDER APPROVAL.** This is a strategy and design document only. It authorizes **no minting, no spending, no distribution, no deployment, no wallet actions**. Nothing in it moves until the founder approves the final plan and gives the DEPLOY GENESIS word (Founder Decisions, §F).

> ## 🔒 HARD PRECONDITION — THE SECURITY GATE (founder, 2026-11-26 12:21 CT)
> **ALL outstanding identity, privacy and claim-security defects are RESOLVED AND VERIFIED before registration or distribution opens** — named, at minimum: the **production `/registry/<id>` IDOR** (fix proven in rehearsal, production still carries the defect) and **MES-SEC-002** (identity-restore bypass, HIGH). **Membership and claiming must not open before that.** This is not a sequencing preference; it is a gate. §C items 1–2 carry the acceptance tests, and no later item in §C may be used to argue the gate is "close enough."

**Foundation:** built on the complete evidence in `GENESIS_BRICKLAYER_NFT_STATUS_2026-11-26.md` (same folder) — the adopted eligibility design, the devnet-proven mechanics, the remaining-build list and the gaps. That evidence is cited, not re-researched. Where this strategy adds something the evidence does not contain, it is labelled **RECOMMENDATION** or **PROPOSED**.

**Founder's direction (2026-11-26 12:19 CT, governing words):** free account creation and community membership · the 470 Bricklayer cap kept · an **initial pilot giveaway of 47**, subject to his final approval · eligibility based on genuine participation, never mere registration · protection against bots, fake accounts and duplicate claims · a magical citizenship ceremony conducted by Solnik inside the civilization · a permanent founding citizenship record, separate from the transferable NFT · a dedicated display place inside each member's personal PROVADIA account · **no promises of financial returns or future NFT value** · after the first 47, examine community engagement before releasing the remaining 423.

---

## A · RECOMMENDATIONS — THE STRONGEST DISTRIBUTION DESIGN

### A.1 The shape in one paragraph

One edition, two releases. The **Pilot (47 pieces)** runs first, under the *full* adopted gate — no weaker pilot gate — to the first members who genuinely qualify. Then a **pre-defined engagement examination** (A.3) is run and reported to the founder and both partners. Only on the founder's word after that examination does the **Full Release (remaining 423)** open. The edition closes permanently at #470 or the coin's first birthday (**2027-11-18**), when the mint authority is revoked — pilot or no pilot, that date does not move.

### A.2 The Pilot — who the first 47 are for, sequencing, ceremony cadence

- **Who:** the founding cohort — the first members to pass the complete Three-Lock Gate (§B) once claims open. No invitations list, no insider allocation, no reserved serials: the pilot is not a separate class of member, it is simply the first 47 successful claims under the same rules everyone else will face. This is deliberate: a pilot run under special rules would prove nothing about the real release.
- **Serials:** drawn by lot from the privately held shuffled pool (Privacy Amendment v1.1), exactly as in the full release. The pilot does **not** take serials #001–#047 in order — chronological or low-number allocation would create a visible "early = special" hierarchy the privacy design exists to prevent, and would hand flippers a numbered target.
- **Sequencing (dependency order, no step skippable):**
  1. Technical chain §C items 1–7 closed and verified (IDOR port first).
  2. Founder's hands §F items 3–5 done (relayer wallet · legal checklist · his own devnet ceremony inspection).
  3. Mainnet collection created under the Relayer Safeguard (§C item 9) — still with `GENESIS_CLAIM_ENABLED=false`.
  4. Real members exist who have run the 7-day clock and completed a genuine deed (the registry stands at **0 members** today; the earliest possible pilot start is 7 days after the first real members qualify — this cannot be shortcut, and the strategy does not pretend otherwise).
  5. Founder gives the DEPLOY GENESIS word → pilot claims open.
- **Ceremony cadence (RECOMMENDATION):** claims are honoured in **weekly ceremony cohorts** rather than a continuous drip — Solnik conducts the birth-certificate ceremony inside the Agora for that week's qualifiers as one shared rite, which is the community event the founder's direction describes ("Solnik personally welcomes each qualifying member"). Practical bounds: the relayer's circuit breaker already caps minting at 25/24h, so a cohort is at most 25; a cohort of ~12 keeps the ceremony personal. At that cadence the 47-piece pilot completes in roughly four ceremony weeks — slow enough to watch every claim, fast enough to learn. A member who qualifies mid-week claims on-chain immediately (the claim is theirs; the house never holds a member's earned claim hostage to a schedule) and is *welcomed* at the next ceremony — the ceremony celebrates, it does not gate.
- **Pilot communications rule:** all public copy about the pilot carries the no-promises language of §E.5 verbatim. The pilot is announced as a founding-citizenship honour, never as an asset opportunity.

### A.3 The engagement examination — the pilot's measurable community-engagement objectives, defined BEFORE launch

These six metrics **are** the pilot's measurable community-engagement objectives (founder's requirement, 2026-11-26): named now, with their thresholds, before the pilot opens. The examination is fixed now, before any pilot claim exists, so nobody can move the goalposts after seeing the numbers. **Window:** it runs when the 47th pilot claim lands, and closes 30 days later (or 60 days after pilot claims open, whichever comes first). **Report:** captain compiles, both partners challenge, founder decides. **Decision rule:** the remaining 423 release **only** on the founder's explicit word after this report — silence or a mixed result means the pilot stays the whole release until he rules.

| # | Metric (named, measured from house records) | GO — supports releasing the rest | PAUSE — holds the release |
|---|---|---|---|
| 1 | **Claim uptake** — % of members who passed the gate during the pilot window who actually claimed within 14 days of qualifying | ≥ 30% | < 10% (the feasibility study's §F conversion floor) |
| 2 | **Sybil integrity** — % of pilot claims flagged by wallet-cluster / funding-source / velocity analysis | < 5% flagged, and no single funding source behind ≥ 5 claiming wallets | Any §F-1 breach: ≥ 20% of any 25-mint batch listed/transferred within 24h of claim, OR ≥ 5 claiming wallets traced to one upstream funder |
| 3 | **Belonging retention** — % of pilot claimants who perform ≥ 1 further genuine town action (substantive Agora post, Book of Wants entry, return ceremony attendance, purchase in either house) within 30 days after claiming | ≥ 50% | < 25% |
| 4 | **Speculation share** — % of pilot pieces listed on a secondary marketplace within 7 days of claim; floor-price/trading share of weekly Agora posts | < 5% listed; < 5% of Agora posts | §F-2 line: ≥ 15% of weekly Agora posts on floor price/trading, OR repeated public misrepresentation of gold backing despite warnings |
| 5 | **Cost discipline** — average all-in SOL cost per pilot claim (mint + priority fee) | ≤ 0.005 SOL average | §F-3 line: > 0.015 SOL average over any rolling 20-claim window |
| 6 | **Safety** — privacy/security incidents touching member data or claims (IDOR class, metadata PII, registry leak) | Zero incidents | **Any single incident = immediate PAUSE**, regardless of every other metric |

GO on all six = the captain *recommends* release; the founder still decides. PAUSE on any one = the release waits, the cause is named in the report, and the fix (if any) is proposed — the §F flip-back machinery (§E.4) may also fire independently at any time, during the pilot or after.

### A.4 The full-release shape (remaining 423)

- Same gate, same shuffled pool, same one-per-member-ever rule, same weekly ceremony cohorts. Nothing about eligibility loosens because the pilot went well — loosening after success is how Sybil farms get in.
- The release is **not** a second launch event; claims simply continue past #47 as members qualify, until #470 or 2027-11-18. The Constellation (CIV-033) lights node by node as genuine mints land.
- §F threshold monitoring (§C item 10) stays live for the entire edition life.
- Future milestone editions, if the founder ever wants them, remain what the feasibility study already rules: **separate collections, distinct marks, never sharing the GENESIS name or seal** — nothing about them is designed or authorized here.

---

## B · ELIGIBILITY RULES — FINAL FORM

The adopted design (Giveback Amendment + Privacy Amendment / spec v1.1, founder-signed 2026-11-23), restated in full, with strengthenings where the status evidence shows weakness. Strengthenings are marked ◆ and are RECOMMENDATIONS until the founder approves this plan.

**The two objects (never merged):**
- **Citizenship** — the Bricklayer Number + off-chain Citizenship Record. Granted at registration for $0. **Permanent, non-transferable, never published.** It is the founding-citizenship record the founder's direction requires, and it survives any sale of the NFT.
- **The Collectible** — a Metaplex Core NFT. An *optional* claim after the gate. Fully transferable. Entitlements, on-chain and in all copy: **"NONE — Commemorative Mark Only."** A sale moves the collectible and nothing else — no citizenship, no rights, no standing.

**The Three-Lock Gate — all three must pass before the claim unlocks:**
1. **Verified Town Membership** — registered account with **verified email PLUS at least one verified OAuth identity (Google or X)**.
2. **Qualifying Period** — account **at least 7 calendar days old**.
3. **First Genuine Deed** — at least one verifiable town action in the database: **either** 2 substantive, non-spam Agora posts/replies (moderation pass + Turnstile human check), **or** 1 completed purchase/service receipt in either house (PROVADIA or OneJobKits), **or** 1 accepted Book of Wants entry.

**Standing terms:**
- **Price $0.00.** The house pays all minting and storage costs (§D). The member pays nothing to the house, ever.
- **One per member, ever** — enforced in both directions: one claim per member, one member per wallet.
- **Serial drawn by lot** from a privately held, server-side shuffled pool; the member↔serial link exists only in the protected registry table, never on-chain, never published (Privacy Amendment v1.1 — this supersedes the feasibility draft's chronological numbering).
- **Claiming wallet must hold ≥ 0.005 SOL** (proves a real, active wallet; anti-disposable-wallet friction; the SOL is the member's and is never transferred to the house). — **⚠ §B.1(b) RECOMMENDS REMOVING this minimum** (it bars exactly the empty-wallet newcomer a free giveaway exists to welcome); it remains in the adopted design until the founder rules on the recommendation (§F item 1).
- **Edition window:** closes permanently at #470 or **2027-11-18**, when mint authority is revoked.

**◆ Strengthenings (each answers a named weakness in the evidence):**
- ◆ **Real verification, not seeded flags.** Lock 1's email leg is today seeded flags, not delivered mail, and the OAuth providers are honest 501 stubs (status §6 items 4–5). Pilot claims may not open until both are real and probe-verified (§C items 5–6) — a gate checked against stubs is not a gate.
- ◆ **Identity layer closed first.** MES-SEC-002 (identity-restore bypass, HIGH, open) is the ground the gate stands on; it must be CLOSED before pilot claims open (§C item 2).
- ◆ **Velocity proven in production.** B9 IP-velocity has been NEEDS-CHECK since Rehearsal #1; it must be exercised against the production service (real Turnstile + verified X-Real-IP / `TRUST_PROXY`) before the pilot, not after (§C item 4).
- ◆ **Deed durability.** A deed counts only if it still stands 48 hours later (a post deleted as spam, a refunded purchase, or a withdrawn Book of Wants entry un-counts) — RECOMMENDATION; the rehearsal suite did not test deed reversal.
- ◆ **X-account age rule verified against real provider data** (the <30-day rejection exists in the design; it has never been checked against a real X API response).

### B.1 · Eligibility examinations (founder-ordered 2026-11-26 12:21 CT — three open questions, examined, with a recommendation each)

**Kept without examination (founder's invariants):** the 7-day account age · the genuine-participation deed · one per member, ever · the house pays all costs within the approved budget (§D) · the 25-mints/day relayer safety cap.

**Examination (a) — Must social login (Google/X OAuth) be MANDATORY, or is verified email enough?**
*The tension:* Lock 1 as adopted requires verified email **plus** at least one verified OAuth identity. The OAuth leg is real anti-Sybil strength — a Google/X identity is costlier to farm than an email address, and the X-account-age rule hangs off it. But mandating it excludes a legitimate person who has email and no Google/X account, or who declines on principle to link a social identity to a town membership — and PROVADIA's own privacy posture (Privacy Amendment v1.1) argues for collecting the *least* identity that does the job.
**RECOMMENDATION: email-verification mandatory; social login OPTIONAL — but the deed requirement does the anti-Sybil work either way.** A member with email only must pass the identical 7-day + deed gate (the deed, not the login method, is the participation proof). Offer OAuth as the faster, encouraged path (it also pre-verifies the X-age rule where used), never as a toll gate. Consequence to record honestly: this *loosens* adopted Lock 1 — it enters the plan only if the founder approves it in §F item 1, and §C item 6's acceptance test then reads "OAuth available and verified where used," not "OAuth required."

**Examination (b) — Does the ≥ 0.005 SOL wallet minimum unnecessarily bar legitimate members from a FREE giveaway?**
*The tension:* the minimum (~$0.90 at the study's $180 reference) exists to prove a real, active wallet and to add friction against disposable-wallet farming. But the giveaway's whole point is that it costs the member nothing; a brand-new member whose wallet is empty — plausibly exactly the newcomer the community initiative wants — is told to go acquire SOL before receiving a *free* honour. The house relayer already pays the mint; the member's balance plays no functional role in the claim itself.
**RECOMMENDATION: REMOVE the balance minimum as an eligibility condition; keep wallet *uniqueness* (1:1) as the binding wallet rule.** The anti-farm weight it carried shifts to the layers that actually measure humanness and participation — Turnstile, velocity, the 7-day clock, and above all the genuine deed, which a farm must fake one account at a time at real cost in effort. If the pilot examination (§A.3, metric 2) shows Sybil pressure the design did not predict, the founder can reinstate a minimum for the full release with evidence in hand — a reversible decision, taken on data. (Also a RECOMMENDATION changing the adopted design; founder approves or strikes it in §F item 1.)

**Examination (c) — The 1-claim-per-IP rule vs legitimate households.**
*The flaw:* as a hard lock, "max 1 claim / IP / 24h" punishes exactly the wrong people — a household, a dorm, a workplace or a café where several genuine members share one connection and one public IP; carrier-grade NAT puts whole neighbourhoods behind one address. Two founding citizens in one home would find the second one's claim refused for a fact about their *router*, not about them. Meanwhile a determined farm rotates IPs trivially — the hard lock burdens the honest and barely inconveniences the attacker.
**RECOMMENDATION: IP becomes a SIGNAL, not a lock.** Design: (i) claims from one IP are *counted and scored*, never refused on IP alone; (ii) a soft threshold (RECOMMENDED: the 4th distinct member claiming from one IP within 24h) raises the claim's risk score and triggers the step-up already in the design — a fresh Turnstile challenge and a human moderation review of the deed — rather than a refusal; (iii) a claim is refused on velocity grounds only when IP signal *combines* with another independent signal (shared funding source, synchronized deed timing, disposable-email pattern); (iv) the registration-side 1/IP/24h likewise becomes a step-up trigger, not a wall, for the same household reason; (v) every velocity decision is logged with its signals, so the pilot examination can audit false positives by name. The B9 acceptance test (§C item 4) is rewritten accordingly: it must prove both directions — a scripted farm burst is caught, **and** a simulated household of four distinct genuine members on one IP all claim successfully.

---

## C · TECHNICAL REQUIREMENTS — DEPENDENCY ORDER, WITH ACCEPTANCE TESTS

From the status report's remaining-build list (§6), ordered so no item starts before its dependencies. An item is DONE only when its acceptance test passes — missing evidence = UNVERIFIED, never PASS (Zero Known-Defect Rule).

| # | Requirement | Acceptance test |
|---|---|---|
| 1 | **Port the proven `/registry/<id>` IDOR fix into the production members service** (`~/workspace/provadia-server/members/server.js`; fix proven in `genesis-rehearsal/server.cjs`). Gemini #43: HARD BEFORE-ANY-MEMBER-JOINS GATE — registration stays closed until this passes. | Full spec-v1.1 7-test suite replayed against **production**: 7/7 PASS, including the API-leak test that originally caught the IDOR. Blind-verifier seat confirms independently. |
| 2 | **Close MES-SEC-002** (identity-restore bypass, HIGH). Genesis eligibility stands on this identity layer. | The MESR v0.4 acceptance test for MES-SEC-002 passes: a restore attempt cannot resurrect or hijack another member's identity; regression suite green. |
| 3 | **Deploy the Genesis claim module to the Hostinger members service** + staged CORS patch + `api.provadiacoin.com` DNS A record. (Access path is founder-gated — his SSH-door setting or an hPanel paste.) | Module answers from outside the server at the production origin; CORS probe from the town origin passes; sealed state (`GENESIS_CLAIM_ENABLED=false`) confirmed live. |
| 4 | **Real Cloudflare Turnstile** keys + production siteverify, with nginx X-Real-IP / `TRUST_PROXY=true` verified — closes the **B9 IP-velocity NEEDS-CHECK**. Velocity implemented as **signal + step-up**, per the §B.1(c) recommendation. | Two-direction probe: (i) a scripted farm burst from one IP is caught by combined signals and refused; (ii) a simulated household of four distinct genuine members on one shared IP **all claim successfully** (step-up challenge/review, never a refusal on IP alone); velocity counters read the real client IP, not the proxy's. B9 re-graded VERIFIED or stays a named blocker. |
| 5 | **Real email-verification delivery** (a working mailer) replacing seeded flags. | A fresh test account receives the verification email end-to-end and the link completes Lock 1's email leg; no seeded flag involved. |
| 6 | **Real Google + X OAuth apps** (created in the founder's name) replacing the 501 stubs. | Live sign-in completes via both providers; an X account younger than 30 days is refused by the age rule against real provider data. |
| 7 | **The ceremony front-end as a full user journey** — arrival → eligibility → claim → certificate, inside /agora/ (+ /knock/), converting the server-side rehearsal proofs into a user-journey proof. | A real-browser run of the whole journey passes, including **disconnect/resume idempotency**: refresh or disconnect mid-claim, resume, exactly one mint results. Mobile widths 320/375/390/430 checked. |
| 8 | **Mainnet Arweave/Irys upload of the FINAL seal master** (canonical Take 1, sha256 `4b32642b…`) + the production metadata set struck from the real seal (never the rehearsal SPECIMEN art). | The `ar://` URIs resolve publicly; the uploaded artwork's hash matches the canonical master; the zero-PII metadata audit (rehearsal Test 1 pattern) passes on the production set. |
| 9 | **Mainnet collection creation under the Relayer Safeguard** — update authority to founder cold/multisig; relayer funded ≤ 0.25 SOL by the founder's hands (§F); `GENESIS_CLAIM_ENABLED` flip procedure documented and rehearsed on devnet first. | Collection exists on mainnet with authority verified at the founder's cold address; relayer balance ≤ 0.25 SOL; a devnet flip-procedure rehearsal is on record; claims still sealed until §F item 6. |
| 10 | **§F flip-back monitoring wired to the pause switch** — the feasibility study's five thresholds (Sybil ratio · speculation share · per-claim cost · legal/platform flags · claim/conversion rate) instrumented as standing monitors. | A simulated breach of any one threshold flips `GENESIS_CLAIM_ENABLED=false` automatically and the event is logged; the captain can demonstrate each of the five on demand. |
| 11 | **MESR claim/relayer entries created** (Appendix B) so the machinery stops being Flag A (no mechanism on record). | MESR v0.4 carries the six proposed entries with statuses set from evidence — none marked VERIFIED beyond what items 1–10 actually prove. |

---

## D · DISTRIBUTION COSTS — HONEST TABLE

**$0 has been spent on distribution. $0 is spent until the founder approves this plan.** Every figure below is either (i) from the feasibility study's costed model (`GEMINI_GENESIS_FEASIBILITY_COMPARISON_2026-11-23.md`, Metaplex Core column, priced at the study's **$180/SOL reference of 2026-11-23** — USD figures move with SOL's price; the SOL figures are the stable ones), (ii) arithmetic derived from those study figures and labelled DERIVED, or (iii) marked **UNVERIFIED** where no house record supports a number.

| Cost item | Figure | Basis |
|---|---|---|
| One-time: mainnet collection creation + Arweave permanent upload (artwork + metadata) | **~0.045 SOL (~$8.10)** | Feasibility study cost table (one-time setup row) |
| Per-claim: Metaplex Core mint + priority fee, paid by the house relayer | **~0.00295 SOL (~$0.53)** | Feasibility study cost table |
| **PILOT (47 claims) — one-time setup** | ~0.045 SOL (~$8.10) | Study figure (same setup serves the full edition) |
| **PILOT (47 claims) — minting** | ~0.139 SOL (~$24.99) | DERIVED: 47 × 0.00295 SOL (USD at study reference) |
| **PILOT (47) — TOTAL** | **~0.184 SOL (~$33.09)** | DERIVED from study figures |
| Relayer float (working balance, not consumed — capped by the Safeguard) | ≤ 0.25 SOL held | Relayer Safeguard amendment (founder funds it, §F); at study rates 0.25 SOL covers ~84 claims before refill |
| Full release (remaining 423 claims) — minting | ~1.248 SOL (~$224.63) | DERIVED: 423 × 0.00295 SOL |
| **FULL EDITION (470) — lifetime total** | **~1.43 SOL (~$257.20)** | Feasibility study headline figure (setup + all 470 mints) |
| Overrun guard: §F cost threshold | Pause at > 0.015 SOL average per claim (rolling 20) | Feasibility study §F-3 — the budget cannot silently balloon; worst case is bounded by the pause, not by hope |
| Members-service hosting (claim module) | No new line item | The module deploys onto the existing Hostinger members service — no record of additional hosting cost; any change is UNVERIFIED until quoted |
| Cloudflare Turnstile | **UNVERIFIED** | No house record prices it; no figure claimed |
| Email delivery service | **UNVERIFIED** | No house record selects or prices a mailer (§C item 5 chooses one; its cost enters the plan then, founder-visible before any spend) |
| Arweave/Irys mainnet upload price at execution time | **UNVERIFIED** | The study's ~0.045 SOL setup figure is a 2026-11-23 estimate; only devnet Irys uploads have actually been performed. The real mainnet quote is taken at §C item 8, before spending |
| Legal checklist | **UNVERIFIED** | Founder's-hands item (§F); no record prices professional review |

**⭐ CONTROLLED PILOT BUDGET (founder's requirement, 2026-11-26): the pilot's total spend is capped at 0.25 SOL, all-in** — one-time setup + all 47 mints + fees. Expected spend at study rates is ~0.184 SOL; the cap is enforced mechanically, not by intention: the relayer float itself is ≤ 0.25 SOL (the pilot physically cannot spend money that is not in the relayer), the 25-mints/day breaker paces it, and the §F per-claim pause (> 0.015 SOL average) halts it if unit costs spike. **Any spend beyond 0.25 SOL requires a new founder approval** — the pilot does not drift into the full-release budget on its own. The remaining 423 claims (~1.248 SOL derived) are a separate budget, unlocked only by the founder's post-examination ruling (§F item 7).

**Budget shape for the founder's decision:** the pilot's entire on-chain exposure is **~0.184 SOL expected (~$33 at the study's reference rate), hard-capped at 0.25 SOL, plus the ≤ 0.25 SOL relayer float** — and the §F pause machinery caps the downside mechanically. That is the whole financial risk of testing the strategy; the remaining ~1.25 SOL is spent only if he releases the 423 after the examination.

---

## E · SECURITY SAFEGUARDS

### E.1 The six-layer anti-bot package (adopted design, enforced at claim time)
1. **Cloudflare Turnstile** human check on registration, deed actions and claim.
2. **IP velocity:** max 1 registration / IP / 24h; max 1 claim / IP / 24h in the adopted design — **⚠ §B.1(c) RECOMMENDS REPLACING the hard lock with IP-as-signal + step-up** (a hard lock refuses legitimate households sharing one connection while barely inconveniencing farms); the recommendation's design and its two-direction acceptance test are at §B.1(c) and §C item 4. Depends on real client IP through the proxy, probe-verified.
3. **Disposable-email blocklist** + rejection of X accounts younger than 30 days.
4. **The gate itself as a layer:** 7-day account age + a genuine, durable deed (§B ◆) — time and real action are the two things farms cannot fake cheaply.
5. **Wallet uniqueness 1:1** (one claim per member, one member per wallet) + claiming wallet holds ≥ 0.005 SOL.
6. **Relayer circuit breaker + pause switch:** max 25 mints / 24h; relayer balance never above 0.25 SOL; `GENESIS_CLAIM_ENABLED` admin pause, flippable by the captain at any moment and automatically by §E.4.

### E.2 The IDOR fix (the one real breach the rehearsal found)
The blind verifier extracted member↔wallet↔ticket mappings through `/registry/<id>` in rehearsal. The fix exists and is proven in the rehearsal server; **production still carries the defect today.** Port + 7/7 production replay is §C item 1 and gates everything — registration itself stays closed until it passes (Gemini #43). The member↔serial link (Privacy v1.1) lives behind the same protected registry, so this fix is also the privacy amendment's enforcement.

### E.3 MES-SEC-002 — identity-restore bypass (HIGH, open)
Genesis eligibility is only as strong as the identity layer beneath it. MES-SEC-002 must be CLOSED (§C item 2) before pilot claims open; the pilot's safety metric (§A.3 #6) treats any identity/privacy incident as an automatic pause.

### E.4 Relayer protections (the Relayer Safeguard, as rehearsed)
- The relayer is a dedicated, low-balance hot wallet: **≤ 0.25 SOL, 25 mints/24h breaker** — its total theft/drain exposure is bounded by design.
- **Update authority never sits with the relayer:** it moves to the founder's cold/multisig at collection creation (§C item 9). The rehearsal proved the pattern (authority moved to cold, secret destroyed, on devnet).
- The relayer's private key lives only in server secret env — never in chat, logs, or any document (feasibility §G).
- **§F flip-back machinery:** breach of any of the five study thresholds (Sybil ≥20%/24h-flip or ≥5 wallets/one funder · speculation ≥15% of weekly Agora posts or gold-backing misrepresentation · per-claim cost > 0.015 SOL · any formal legal/platform warning · claim rate < 10% after 60 days) **automatically freezes transferable minting** and reverts the unminted remainder to soulbound-only. This is statute, not a judgement call (§C item 10 wires it).

### E.5 The no-promises language rule (binding on ALL public copy)
Every public surface that mentions the Collectible — the /genesis/ page, the ceremony, the account pedestal, announcements, social posts — carries the honesty line in substance, and the following are **banned formulations** anywhere: any promise or implication of financial returns, future value, price appreciation, scarcity-driven worth, or gold backing (the Collectible is not backed by the Golden Wall; conflating them is itself a §F-2 trigger).
**The line, in substance:** *"A commemorative mark of founding citizenship. It carries no entitlements, no financial return, and no promised value — its worth is the belonging it records."* On-chain metadata already encodes it: entitlements **"NONE — Commemorative Mark Only."**

### E.6 Privacy safeguards (Privacy Amendment v1.1, carried)
Zero-PII metadata (public fields only, audited) · serial unlinkability (shuffled pool; member↔serial only in the protected registry) · citizenship never published · the Birth Certificate shows public facts only — never membership number, name, handle, or account date.

---

## F · FOUNDER DECISIONS — ONLY WHAT TRULY NEEDS GEORGE

1. **Approve this strategy as the final plan** — including the 47-piece pilot **within** the 470 collection (not a separate collection), the §A.3 examination as pre-committed, the §B strengthenings (◆), and the three §B.1 examination recommendations (optional social login · removal of the 0.005 SOL wallet minimum · IP-as-signal) — or strike any of them by name. (This document is a draft until he does.)
2. **Approve the statement of record on 47 vs 470** (status report §B RECOMMENDATION) so the retired paid-drop number stops resurfacing.
3. **Create and fund the mainnet relayer wallet** — his hands only (≤ 0.25 SOL; key into server secret env, never through chat).
4. **Mark the legal checklist documented** (feasibility §C.2 + the mandatory honesty notice) — his standing documentation rule.
5. **Inspect the devnet Birth-Certificate Ceremony himself** on his own phone/laptop — a standing gate since 2026-11-23; NO RECORD FOUND of it having happened.
6. **Give the DEPLOY GENESIS word** — flips `GENESIS_CLAIM_ENABLED=true` and opens pilot claims. Nothing in §C item 9's flip procedure runs without it.
7. **After the pilot: rule on the examination report** — release the remaining 423, extend the pilot, or close the edition at 47. His word alone; the examination recommends, it does not decide.

*Everything else in this strategy is crew work.*

---

## APPENDIX A · FOR INVENTORY v0.2 / MESR v0.4 — CIV UPDATES

*(Inventory v0.1 and MESR v0.3 are frozen for partner examination and were NOT edited. The entries below are written ready to merge at the v0.2 / v0.4 reconciliation pass.)*

### A-1 · CIV-052 (Genesis — Citizenship + Bricklayer) — corrected status line
*(Traceability: the same correction was applied DIRECTLY to the Master Universe Map on 2026-11-26 under the founder's order — Map lines for the Genesis Bricklayer row, the NFT claiming & inspection row, the Genesis Seal asset row, and line L-03. The Inventory itself stays frozen at v0.1 mid partner-examination; its correction enters here, for v0.2.)*
Replace the stale *"on-chain half NOT RUN (devnet faucet blocked)"* with the Rehearsal #2 final state (source: `BUILD_RECORD_GENESIS_PRIVACY_AMENDMENT_2026-11-23.md`):
> Devnet rehearsal COMPLETE: collection `GpCczcCMQyqs2domYw6R47gLVi3V8cmK4kLBZuRktpAe` created 2026-11-24 · exactly 4 assets minted (serials 443/380/54/404) · spec-v1.1 mandatory 7-test suite PASS · relayer/authority fence 4/4 · update authority moved to cold, secret destroyed · **B9 IP-velocity NEEDS-CHECK still open** · mainnet SEALED (0 minted; live page reads 0 of 470). Cap proven at the allocation layer; a literal 470-mint run was never performed — stated plainly.
The same correction applies at **CIV-102** and at Master Universe Map L-03 / §§2, 4, which carry the same stale line.

### A-2 · CIV-052 — new named gates (add)
- **GATE: production `/registry/<id>` IDOR port** — fix proven in `genesis-rehearsal/server.cjs`; production source (`provadia-server/members/server.js`) still carries the defect. Gemini #43 HARD BEFORE-ANY-MEMBER-JOINS GATE: registration closed until port + 7/7 production replay PASS. (Strategy §C item 1.)
- **DEPENDENCY: MES-SEC-002** (identity-restore bypass, HIGH, open) is the identity layer the 3-lock gate stands on; Genesis cannot open while it stands open. (Strategy §C item 2.)
- **DISTRIBUTION (founder directive 2026-11-26):** pilot of **47** first under the full gate → pre-committed engagement examination (strategy §A.3) → remaining **423** only on the founder's word. The giveaway is a community-building initiative, **not a commercial product** — it stays separate from the paid Grand Library products in every register and roadmap (founder, 2026-11-26 12:15 CT).

### A-3 · CIV-102 (NFT Claiming & Inspection) — updates
- Claim face proven server-side on devnet (rehearsal suite); the production claim module has never run against the production members service (strategy §C item 3) and the full user journey is unbuilt (§C item 7).
- The member display place = the **Genesis Gate & Pedestal**: eligibility meter strictly separate from ownership meter (draft Cinematic row CIN-PRD-012, Appendix strategy §C-register / register §K).

### A-4 · CIV-033 (Genesis Constellation) — updates
- Carry the proposed **MES-ENV-008** (Gemini) as its mechanism and draft Cinematic row **CIN-VID-081** so the constellation stops riding inside other rows' notes. Status unchanged: DESIGNED, NOT BUILT; 470 ring positions; nodes light only on genuine mints; honest SPECIMEN 0/470 today.

### A-5 · Numbers note for CIV-052 (pending founder approval, decision §F-2)
> 470 = the adopted edition cap (10 × 47, echoing the Golden Wall's 47 physical bricks; Wall stands 0/47, Brick #1 not yet bought). The "47 editions at 0.25 SOL" figure in the 2026-11-21 NFT research was an unadopted paid-sale planning scenario, superseded 2026-11-23, and is retired as a number.

## APPENDIX B · FOR MESR v0.4 — THE MISSING CLAIM/RELAYER ENTRIES (FLAG A)

*(PROPOSED IDs and entries, answering Inventory FLAG A: no MESR mechanism exists today for the Genesis claim/relayer/collectible machinery. Statuses are set from evidence only.)*

| Proposed ID | Mechanism | Status (from evidence) | Acceptance criteria |
|---|---|---|---|
| MES-GEN-001 | **Three-Lock Eligibility Gate evaluation** — verified membership (email + OAuth) · ≥7-day account age · first genuine deed, evaluated server-side before claim unlock | BUILT–UNVERIFIED (proven in devnet rehearsal suite; production identity inputs — real mailer, real OAuth — do not yet exist) | Production: all three locks evaluated against real providers; each lock independently falsifiable in test (remove any one → claim refuses) |
| MES-GEN-002 | **Shuffled-pool serial allocation** (Privacy Amendment v1.1) — serial drawn by lot from a private server-side pool; member↔serial link only in the protected registry | BUILT–UNVERIFIED (rehearsal Test 2 unlinkability PASS on devnet) | Statistical unlinkability re-proven on production data shape; no on-chain or API surface exposes the link (pairs with the IDOR fix) |
| MES-GEN-003 | **Relayer mint execution + safeguards** — house-paid Metaplex Core mint via dedicated relayer; 25 mints/24h breaker; ≤ 0.25 SOL balance cap; `GENESIS_CLAIM_ENABLED` pause switch | BUILT–UNVERIFIED (rehearsal fence 4/4 on devnet; no mainnet relayer exists) | Breaker trips at 26th mint in 24h in test; pause switch halts claims within one request; relayer holds no update authority |
| MES-GEN-004 | **Citizenship Record issuance + separation** — off-chain, permanent, non-transferable citizenship granted at registration; survives any NFT transfer | BUILT–UNVERIFIED (rehearsal Test 7 separation 9/9: A→B transfer moved the collectible, citizenship unmoved) | Transfer of a claimed collectible leaves the seller's citizenship record byte-identical; citizenship has no transfer path in code |
| MES-GEN-005 | **Claim idempotency — disconnect/resume** — an interrupted claim resumes to exactly one mint | BUILT–UNVERIFIED (rehearsal Test 6 PASS on devnet) | Kill-and-resume at every step of the claim sequence yields exactly one asset and one registry entry, every time |
| MES-GEN-006 | **§F threshold monitoring → automatic pause** — the five flip-back thresholds instrumented and wired to `GENESIS_CLAIM_ENABLED` | MISSING (the thresholds exist as statute in the feasibility study; no monitoring is built) | Simulated breach of each of the five thresholds flips the switch and logs the event (strategy §C item 10) |

*MES-SEC-002 (identity-restore bypass, HIGH, open) is an existing MESR entry, not a new one — Appendix A-2 records Genesis as a dependent of its closure.*

---

*— Genesis Bricklayer Distribution Strategy v0.1, 2026-11-26. DRAFT for partner challenge + founder approval. Built on the status-of-record evidence; nothing in it was minted, spent, deployed, or distributed by its writing.*
