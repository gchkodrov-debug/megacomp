# GENESIS BRICKLAYER NFT — STATUS OF RECORD (2026-11-26)

**Research only.** This document answers the founder's six questions from primary house records, with exact paths. No minting, deployment, wallet action or code change was performed or is authorized by this document. Where a record does not exist, this document says **NO RECORD FOUND** rather than filling the gap.

**Principal sources read:**
- `~/workspace/newwave/next-build/FOUNDATIONAL_VISION_REGISTER.md` — FVR-03 (Golden Wall) · FVR-04 (Genesis)
- `~/workspace/newwave/next-build/gemini-seat/GEMINI_GENESIS_FEASIBILITY_COMPARISON_2026-11-23.md` — the feasibility study / spec of record (Gemini partner-desk commission; §§A/B/C/G + Relayer Safeguard amendment)
- `~/workspace/newwave/next-build/gemini-seat/GEMINI_GENESIS_PRIVACY_AMENDMENT_V1_1_2026-11-23.md` + `GENESIS_PRIVACY_AMENDMENT_FOUNDER_DECISION_2026-11-23.md` — spec v1.1, founder-signed 2026-11-23
- `~/workspace/newwave/next-build/BUILD_RECORD_GENESIS_DEVNET_REHEARSAL_2026-11-23.md` — Rehearsal #1 (off-chain)
- `~/workspace/newwave/next-build/BUILD_RECORD_GENESIS_PRIVACY_AMENDMENT_2026-11-23.md` — Rehearsal #2 (funded, on-chain devnet)
- `~/workspace/newwave/next-build/BUILD_RECORD_T3C_CEREMONY_SHELL_2026-11-23.md` + `BUILD_RECORD_GENESIS_SEAL_WIRING_2026-11-24.md`
- `~/workspace/newwave/next-build/genesis-rehearsal/` — the rehearsal workdir (config, logs, evidence)
- `~/workspace/newwave/next-build/living-universe/MASTER_CIVILIZATION_INVENTORY_v0.1_DRAFT_2026-11-26.md` — CIV-052 · CIV-102 · CIV-033
- `~/workspace/newwave/next-build/PROVADIA_MASTER_UNIVERSE_MAP.md` — §§2, 4, 7.2, 8 · line L-03
- `~/workspace/video-studies/coin-panel/NFT_RESEARCH_2026-11-21.md` — the older research document (the "47 editions" source)
- `~/workspace/your_files/COMPLETE_PRODUCT_REGISTER_2026-11-26.md` — the 421-name Coin Product Register (one NFT line)

---

## THE SIX ANSWERS

### 1. How many Bricklayer NFTs were actually CREATED (artwork + metadata), and where are the files?

**One master design exists — the Genesis Seal. The edition was never produced as 470 separate artwork files, by design: it is one design × 470 numbered editions, with per-token metadata generated at claim time.**

Two artwork artifacts exist, and they must not be confused:

**(a) The rehearsal SPECIMEN artwork (placeholder, rehearsal-only):**
- `~/workspace/newwave/next-build/genesis-rehearsal/art/specimen.svg` and `art/specimen.png` (99,760 bytes)
- Recorded in `~/workspace/newwave/next-build/genesis-rehearsal/evidence/artwork.json` as *"genesis-bricklayer-seal-v1 (SPECIMEN rendering)"*, `master_artwork_sha256 = 40a0debc52cee93ddfb63d638ad665674a005a413f9d64241fa26cf557f37209`
- It carries a red SPECIMEN banner and store-green ground colours; the T3-C record (`BUILD_RECORD_T3C_CEREMONY_SHELL_2026-11-23.md`) fences it explicitly: rehearsal-only, **never used on any town surface in any form**. This is the art inside the *devnet* collection's metadata.

**(b) The real canonical master artwork (the production seal):**
- `~/workspace/newwave/next-build/assets/genesis-seal-flat-v1-2026-11-24.jpg` — 852,875 B · 1376×768 · sha256 `4b32642ba9bd6efd134691f86579fff6947346daca7e5d786189609787f351a4`
- Struck in Flow 2026-11-24 and judged by Gemini (commission #85): **"TAKE 1 WINS AND PASSES"** — this is the canonical Genesis Seal.
- Wired live the same day (`BUILD_RECORD_GENESIS_SEAL_WIRING_2026-11-24.md`): served at `https://provadiacoin.com/genesis/assets/seal.webp` (WebP conversion, sha256 `4f9f029e…`, customer-eye verified HTTP 200, byte-identical).
- A second take exists on disk (`assets/genesis-seal-flat-v2-geminichat-2026-11-24.jpg`); the judgment record names Take 1 canonical. **NO RECORD FOUND** of v2 ever being judged.

**Metadata:** no set of 470 metadata files exists anywhere. Per-token JSON is generated at the moment of a claim by a single allowlist generator (the Privacy Amendment's `metadata.mjs` pattern) carrying only public fields (serial, mint timestamp, artwork URI + SHA-256, collection identity, entitlements "NONE — Commemorative Mark Only"). The only metadata JSONs on disk are rehearsal artifacts from the devnet run: two uploaded token-metadata files in `~/workspace/newwave/next-build/genesis-rehearsal/assets/` plus the collection metadata at `ar://99DsNvQbQjSrW8hvPXTYb4S6Y25J4zS8zqLQUohWAWQk` (devnet Irys). **No mainnet metadata set exists.**

**Also created:** the ceremony film — Film 06, `~/workspace/newwave/next-build/films/solnik-nft-ceremony-v1.mp4` (Cinematic Register CIN-VID-025, EXISTS-VERIFIED, landed 2026-11-24).

### 2. How many have been MINTED on-chain?

**Mainnet: ZERO. The house standing record is CONFIRMED: the Genesis Bricklayer was a design/feasibility commission plus a devnet rehearsal only — no NFT deployment was ever authorized, and none occurred on mainnet.** No mainnet collection address and no mainnet mint transaction exists in any record searched. The live /genesis/ page's own sealed-state ledger reads: *Mainnet — Sealed · Minting — Sealed · Claims — Closed · Edition struck — 0 of 470* (T3-C record; seal-wiring record confirms unchanged 2026-11-24).

**Devnet (rehearsal only, play money) — a collection and exactly 4 test assets exist:**
- Collection: `GpCczcCMQyqs2domYw6R47gLVi3V8cmK4kLBZuRktpAe` (Solana **devnet**), created 2026-11-24T01:36Z, create tx `2kJuySyEiEoE71AadMDtH2DFeJgWRyuRvp45ib7zFkjLHorrNviatpBif8jHHQ8mi3itoCexga3J4Xv9Ekayq76i` — `~/workspace/newwave/next-build/genesis-rehearsal/config.json`
- Exactly **4 assets minted**, final `numMinted = 4` (`genesis-rehearsal/logs/mints.log` — exactly 4 lines; `BUILD_RECORD_GENESIS_PRIVACY_AMENDMENT_2026-11-23.md`, Test 5 + Final State):
  - Serial **443** → rehearsal member A — asset `29tD1xP9bX8RPAwWueLC8KB1UbuAXBYJSnCPf8e28zAY` · tx `2CmsJf2uAreZyspJMJKiDu8pkVoFiJS2df63xQZ1Gcbe1jbCmdLzDwstki8YJxzF2hdZaXHDbiQd15FsogMWGbDe` (later transferred A→B in Test 7, tx `4CdzjBDxQyZehtk3FB9L7wA6v1jZmmM8byAtqrRNTCWoySiFpefCMk2ojPY7kapJacueUQAn4BJnMsAc39oX3rF4`)
  - Serial **380** → member B — asset `6C98n5sxn19i2gHHbJso5zLAuLugS1MB4Ld6tjDFryKp` · tx `2js6T5URJw8yyGTqMx2fbwY4vNrjkD79o9ZgjsqQFWUepuRS94zCgh8o8fbLcaxx73SG4JCyTkUHriMQimYofumK`
  - Serial **54** → member C — asset `4ycnX3i4zcxF5Etc5CZVx8Bj1A43mraWEubWP1hNQwFC` · tx `2nADZRWj6Z2iHUfqxmwUqLnrzrh14fxzgP4LHpokmivB1bmwX6wtiD2FoBPozgbYHxza8Au7gizyQ4gmYioM7SDS`
  - Serial **404** → member D — asset `GPhyKAeuBa3SNrv7JApx1uXuTGVdFj1xk8Ba6wUm7dbM` · tx `48yLBzkurMpFeVRGtq8zxJxSAWkPtLTzUZHRJp4Z8897qNuRQ64QcKDcbUoNNDY28Yqp4fcDrc5r1oUHkhcoeFmB`
- After the cap test, the collection's update authority was moved to a cold key (`4hpW5dH4tfHzxejyLsffGJNcLPAf9nKJDtQjnigbrE2y`, tx `3KkcBVRqvnWemTTniW5CEg5VGgcCZMeK4E5q4W2Qbp4ByipA7T77ywQX6TMTS19S6YRfpmct1XSpvnH7jbisUi4W`) and the cold secret file destroyed (operational log: `genesis-rehearsal/evidence/cold-destruction.log`). All rehearsal keys are throwaway crew-generated devnet keypairs; no founder wallet was touched.
- The full spec-v1.1 mandatory 7-test suite passed on devnet (zero-PII metadata audit · shuffled-pool unlinkability · API leak test — after a real IDOR was found by the blind verifier, fixed, and re-proven 7/7 · relayer/authority fence 4/4 · exact 470 allocation cap · disconnect/resume idempotency · post-sale citizenship separation 9/9), with two honest limits stated in the record itself: only 4 physical mints exist (what is proven end-to-end is the *allocation* cap, not a literal 470-mint run), and **B9 IP-velocity remains NEEDS-CHECK**.

> **Record divergence, flagged for correction (see §D):** Rehearsal #1's build record, the Master Universe Map (§§2, 4, L-03) and Inventory v0.1 (CIV-052, CIV-102) still state *"on-chain half NOT RUN (faucet blocked)."* That was true when written on 2026-11-23; hours later the founder funded the devnet faucet himself and Rehearsal #2 ran the complete on-chain suite. FVR-04's line — *"devnet rehearsal 7/7 PASS · ceremony shell LIVE /genesis/ · mainnet SEALED"* — is the current statement. The founder's relayed summary ("off-chain tested, on-chain awaiting verification") matches the stale layer, not the final evidence.

### 3. Exactly how do members QUALIFY to receive one free?

Source: feasibility comparison §B/§D (`GEMINI_GENESIS_FEASIBILITY_COMPARISON_2026-11-23.md`), as adopted and amended by the signed **Giveback Amendment** (2026-11-23 18:23 CT) and **Privacy Amendment / spec v1.1** (founder decision 2026-11-23 19:00 CT); carried at Inventory CIV-052 and Map §8.

**The shape — two objects, two steps:**
- **Citizenship** (the Bricklayer Number + off-chain Citizenship Record) is granted at Step 1, registration, for $0. It is **permanent, non-transferable, and never published**.
- **The Collectible** (the NFT) is Step 2 — an *optional* on-chain claim through the house relayer. It is fully transferable, and a sale never moves citizenship or any right: entitlements are **"NONE — Commemorative Mark Only."**

**The Three-Lock Eligibility Gate — all three must pass before the claim unlocks:**
1. **Verified Town Membership** — a registered account on the members service with a **verified email PLUS at least one verified OAuth identity (Google or X)**.
2. **Qualifying Period** — the account must be **at least 7 calendar days old**.
3. **First Genuine Deed** — at least one verifiable town action logged in the database: **either** 2 substantive, non-spam Agora posts/replies (passing moderation + Turnstile human check), **or** 1 completed purchase/service receipt in either house (PROVADIA or OneJobKits), **or** 1 accepted entry in the Book of Wants.

**Plus the 6-layer anti-bot package enforced at claim time:** Cloudflare Turnstile + IP velocity (max 1 registration / IP / 24h; max 1 claim / IP / 24h) · disposable-email blocklist and rejection of X accounts younger than 30 days · the 7-day + first-deed gate itself · **wallet uniqueness 1:1** (one claim per member, one member per wallet) with the claiming wallet holding **≥ 0.005 SOL** (proves a real active wallet; the member pays nothing to the house) · relayer daily circuit breaker (**25 mints / 24h**, relayer balance ≤ 0.25 SOL) · admin pause switch (`GENESIS_CLAIM_ENABLED`).

**Terms of the giveaway itself:** price **$0.00** — the house pays all minting and storage costs (study's costed model: ~0.0029 SOL per Metaplex Core mint; ≈1.43 SOL / ~$257 total for all 470 at the study's $180 reference rate). **One per member, ever.** The serial is **drawn by lot from a privately held, server-side shuffled pool** (Privacy Amendment v1.1 — this *supersedes* the feasibility draft's chronological-numbering line; the member↔serial link exists only in the protected registry table, never on-chain). The edition closes permanently at #470 or the coin's first birthday (**2027-11-18**), when the mint authority is revoked. The **ceremony** — Solnik's birth-certificate ceremony — is the claim's presentation: designed as an interactive scene inside /agora/ (and /knock/) the moment a member passes the gate (feasibility §E), with the 3-beat stage + Birth Certificate live today in sealed preview form at /genesis/.

### 4. Are there OTHER NFT collections previously created or planned?

**Created: NO.** No other NFT collection exists in any record — on any chain. The 421-name Coin Product Register contains exactly **one** NFT line (the Genesis Bricklayer Collectible). ("NFT Art Preparation" in the town catalogue is a *service sold to others*, not a house collection; Umbrella houses are other founders' coins, not NFTs; Day-Book Honors and SALT are off-chain by founding law.)

**Planned: only as a rule about the future, not as collections.** The feasibility study (§B) provides that any future seasonal or milestone editions (its examples: *"Year One Builders, Wall Completion"*) must use a **separate collection address, distinct silhouette/border geometry, and distinct title — never sharing the GENESIS mark**. No such edition has been designed, named, costed, or authorized beyond that sentence. **NO RECORD FOUND** of any other planned collection.

### 5. Where will they appear inside the cinematic civilization?

Per Inventory v0.1 (CIV-052, CIV-102, CIV-033), the Master Map (§§2, 4), and the Pulse architecture (`gemini-seat/GEMINI_PULSE_ARCHITECTURE_2026-11-23.md`). Genesis lives in three places at once:

- **The Pulse (/coin/) — the Genesis Constellation (CIV-033):** 470 orbital positions on three tilted rings around the coin (Inner #001–#100 · Middle #101–#270 · Outer #271–#470). A node lights permanently **only on a genuine mint**, and pulses on a genuine sale. Today all 470 render in honest SPECIMEN state — *"SPECIMEN · 0 / 470 MINTED."* Status: **DESIGNED, NOT BUILT** (Pulse Slice 1 ships the specimen strip).
- **/genesis/ — the Ceremony home (CIV-052):** **LIVE today** as a sealed shell — the SPECIMEN #000 alcove with the judged seal in place, the 3-beat ceremony stage (Film 06, CIN-VID-025), the Birth Certificate view (public facts only), and the inert claim gate printing its three opening conditions. The live interactive ceremony is designed to run inside **/agora/** (and /knock/) when a member passes the gate.
- **My PROVADIA (/account/) — the Genesis Gate & Pedestal (CIV-102):** the member's personal home — NFT **claiming & inspection** face, with the eligibility meter kept strictly separate from the ownership meter. This is where a member's claimed collectible is displayed inside their personal PROVADIA account.
- **The Agora:** eligibility begins with membership, and the birth-certificate ceremony is Solnik's.
- **The member's own wallet:** once claimed, the collectible is a native Metaplex Core asset rendering in Phantom / Solflare / Tensor / Magic Eden like any Solana NFT.

### 6. What remains to be BUILT before the giveaway can begin?

From Rehearsal #1 record §8, Rehearsal #2 record ("What remains / Not run" + production warning), Gemini's rehearsal review #43 (`gemini-seat/GEMINI_GENESIS_REHEARSAL_REVIEW_2026-11-23.md`), and Inventory CIV-052/CIV-102 open decisions:

**Crew / technical:**
1. **Port the proven `/registry/<id>` IDOR fix into the production members service.** The blind verifier extracted member↔wallet↔ticket mappings through this route in rehearsal; the fix exists and is proven in `genesis-rehearsal/server.cjs`, but **the production source of record (`~/workspace/provadia-server/members/server.js`) still carries the IDOR**. Gemini #43 ruled this a **HARD BEFORE-ANY-MEMBER-JOINS GATE**: registration stays closed until the port + a 7/7 production replay pass.
2. **Deploy the Genesis claim module to the Hostinger members service** (it has never run against production) + the staged CORS patch + the `api.provadiacoin.com` DNS A record. The access path is founder-gated (his SSH-door setting or an hPanel paste).
3. **Real Cloudflare Turnstile** keys + production siteverify, with nginx X-Real-IP / `TRUST_PROXY=true` verified by probe (the B9 velocity rule silently depends on it).
4. **Real email-verification delivery** (a mailer) — Lock 1's email leg is currently seeded flags, not delivered mail.
5. **Real Google/X OAuth apps** (created in the founder's name) replacing the honest 501 stubs, with the <30-day X-account rule verified against real provider data.
6. **Mainnet Arweave/Irys upload of the FINAL seal master** (the judged Take 1) + the production metadata set. The only collection that exists carries the rehearsal SPECIMEN art; mainnet metadata must be struck from the real seal.
7. **The ceremony front-end as a full user journey** in a real browser (arrival → eligibility → claim → resume-after-refresh) — converting the server-side proofs into a user-journey proof.
8. **Mainnet collection creation** under the Relayer Safeguard (update authority to founder cold/multisig; relayer funded ≤ 0.25 SOL) + the `GENESIS_CLAIM_ENABLED` flip procedure.
9. **§F flip-back monitoring:** instrument the study's five thresholds (Sybil ratio · speculation share · per-claim cost · legal/platform flags · claim/conversion rate) wired to the pause switch, as the statute requires.
10. **Close the deferred verification legs:** B9 IP-velocity NEEDS-CHECK against a landed production claim; Test 3's Nexus-serializer, /coin/ Constellation, and /api/public/* legs (those components are not yet built — the Constellation itself is DESIGNED, NOT BUILT).
11. **MESR entries for the claim/relayer/collectible machinery** (Inventory FLAG A — none exist today) and closure of **MES-SEC-002** (identity-restore bypass, HIGH, open) — the identity layer Genesis eligibility stands on.

**The founder's hands (no crew seat can complete these):**
12. The **mainnet relayer wallet** (his hands) · the **legal checklist** marked documented · the founder **inspects the devnet ceremony himself** · and finally **the DEPLOY GENESIS word** (Map §7.2; the /genesis/ page prints these conditions beside its sealed claim gate).
13. **Members.** The registry stands at **0 members**. The giveaway needs real eligible members, and the 7-day clock + first deed cannot be shortcut — the earliest any giveaway could begin is 7 days after the first real members join and complete a deed, even if every technical gate above closed tomorrow.

---

## B. RECONCILIATION — 47 vs 470

**The two numbers, in their own source documents:**

- **47 — the Golden Wall's brick count (standing covenant, live).** FVR-03 (`FOUNDATIONAL_VISION_REGISTER.md`): 20% of creator fees buys physical 1g gold bars into a named third-party vault; the Wall **ends at 47 bricks or the first birthday (2027-11-18)**; Brick #1 is the founder's own money, **not yet bought; the Wall stands 0/47**. This 47 is real, current, and has nothing to do with NFTs except as the number the NFT plan deliberately echoes.
- **47 — the older research scenario (unadopted, superseded).** `~/workspace/video-studies/coin-panel/NFT_RESEARCH_2026-11-21.md` (2026-11-21 research panel) proposed a **paid first drop**: *"Micro edition | 47 (matches the Wall) | 0.25 SOL (~$23)"*, with a full planning cost table ("first drop: 47 editions at 0.25 SOL") and the supply question left as founder decision #1 ("1-of-1, 47 editions (captain's recommendation), or another fixed cap"). The same math was carried into `BLOCKCHAIN_LEARNINGS_PLAN.md` (same folder). The document's own honesty note argued the drop only made sense *after* Brick #1 and a real community existed. It was a research scenario for a **sale** — never adopted, never built, never minted. The Coin Product Register carries it accurately: *"the research's planning scenario is a first drop of 47 editions at 0.25 SOL — RESEARCHED (no NFT deployment without founder approval)."*
- **470 — the adopted Genesis plan (founder-approved design, 2026-11-23).** `GEMINI_GENESIS_FEASIBILITY_COMPARISON_2026-11-23.md` §B: *"Recommended Permanent Edition Cap: 470 Genesis Collectibles (#001 of 470 through #470 of 470) — echoing the Golden Wall's 47-brick monument (10 × 47)."* Adopted the same day through the signed **Giveback Amendment** (the standing no-airdrops-of-value statute's single bounded carve-out: the 470-piece edition, **free** to gated verified members, zero entitlements, permanent supply lock) and the **Privacy Amendment (spec v1.1)**. FVR-04 records it as the founding line: *"the Collectible = a real Metaplex Core NFT, 470 pieces, free to gated members, transferable."*

**Finding: THE NUMBERS DO NOT CONFLICT — they describe different things.**
47 is (a) the Wall's physical brick count, and (b) the size of an unadopted 2026-11-21 *paid-sale* research scenario that borrowed the Wall's number. 470 is the *adopted* Genesis edition cap, set two days later at exactly **10 × 47** to echo the Wall, under opposite economics (free giveaway to gated members instead of a 0.25 SOL sale). The 47-edition scenario was superseded by the 470-piece Genesis plan before anything was built; nothing was ever minted under either number on mainnet. The two numbers also close on the same date by design: the Genesis edition window and the Golden Wall both end at #470 / 47 bricks or **2027-11-18**.

> ### RECOMMENDATION — single statement of record (for the founder to approve; NOT a ruling)
> *"The Genesis Bricklayer Collectible is a single permanent edition of **470** numbered pieces (#001–#470), issued **free** to gated verified members under the Giveback + Privacy Amendments (spec v1.1); 470 = 10 × **47**, echoing the Golden Wall's 47 physical gold bricks (Wall stands 0/47; Brick #1 not yet bought). The '47 editions at 0.25 SOL' figure in the 2026-11-21 NFT research was an unadopted paid-sale planning scenario, superseded on 2026-11-23, and is retired as a number. Devnet rehearsal only: 1 test collection + 4 test mints. Mainnet: 0 minted, sealed pending the founder's DEPLOY word."*

---

## C. DRAFT REGISTER ADDITIONS (drafts only — the register and inventory files were NOT edited)

### C.1 Cinematic Production Register — proposed rows (IDs proposed, to be confirmed against register numbering at the v0.2 merge; statuses use the register's own vocabulary)

Existing Genesis rows for reference: CIN-VID-025 (Film 06 ceremony, EXISTS-VERIFIED) · CIN-VID-071 (Genesis Seal film, MISSING) · CIN-PRD-008 (collectible presentation, MISSING).

| Proposed ID | Asset | Component | Status | Path / evidence | Note |
|---|---|---|---|---|---|
| CIN-IMG-017 *(proposed)* | Genesis Seal — canonical master artwork (Take 1) | CIV-052 | **EXISTS-VERIFIED** | `assets/genesis-seal-flat-v1-2026-11-24.jpg` (sha256 4b32642b…) · live as `genesis/assets/seal.webp` | Judged by Gemini #85 "TAKE 1 WINS AND PASSES"; wired live 2026-11-24 with customer-eye verification. The edition's single master design. A v2 take exists on disk, unjudged on record. |
| CIN-VID-072 *(proposed)* | The Claim Experience — interactive birth-certificate ceremony (arrival → 3-lock gate → claim → certificate) | CIV-052 · CIV-102 | **MISSING** | — | The /genesis/ shell is LIVE in sealed preview (T3-C record) and Film 06 (CIN-VID-025) is the rite's film; the *interactive* claim journey (feasibility §E, inside /agora/ + /knock/) is not built. Distinct from CIN-VID-025: that row is the film; this row is the experience the film serves. |
| CIN-VID-073 *(proposed)* | Genesis Constellation — 470-node lighting display inside the Pulse | CIV-033 · CIV-052 | **MISSING** | Designed in `gemini-seat/GEMINI_PULSE_ARCHITECTURE_2026-11-23.md` | Three rings (#001–#100 / #101–#270 / #271–#470); nodes light only on genuine mints. Map grades it DESIGNED, NOT BUILT; Slice 1 carries the honest specimen strip (0/470). Absorbs the Inventory's constellation sub-flag currently carried inside CIN-VID-071's note — the v0.2 pass should split it out, not double-count. |
| CIN-PRD-009 *(proposed)* | My PROVADIA Genesis Pedestal — member's collectible display + inspection | CIV-102 | **MISSING** | — | The personal-account display face: eligibility meter ≠ ownership meter (two meters, kept separate). No build record found. |
| CIN-PRD-010 *(proposed)* | The Birth Certificate — post-claim certificate view (public facts only) | CIV-052 · CIV-102 | **EXISTS-UNVERIFIED** | /genesis/ shell (T3-C record) | The Specimen #000 certificate renders live on /genesis/ with the privacy fence (never carries membership number, name, handle, or account date). The *issued* certificate — generated from a real claim — has never existed; grade the specimen face EXISTS-UNVERIFIED and the issued form MISSING until a production claim lands. |

### C.2 Inventory v0.2 — draft notes (for the reconciliation pass; v0.1 file untouched)

1. **CIV-052 status correction:** replace *"on-chain half NOT RUN (devnet faucet blocked)"* with the Rehearsal #2 final state: devnet collection `GpCczcCMQyqs2domYw6R47gLVi3V8cmK4kLBZuRktpAe` created · 4 assets minted (serials 443/380/54/404) · spec-v1.1 7-test suite PASS · update authority at cold, secret destroyed · **B9 IP-velocity NEEDS-CHECK still open** · mainnet SEALED. Source: `BUILD_RECORD_GENESIS_PRIVACY_AMENDMENT_2026-11-23.md`. Same correction at **CIV-102** and at Master Map L-03 / §§2, 4 (the Map carries the same stale line).
2. **CIV-052 new named gate:** the production `/registry/<id>` IDOR port (fix proven in `genesis-rehearsal/server.cjs`; production source still carries the defect) — Gemini #43's HARD BEFORE-ANY-MEMBER-JOINS GATE; registration closed until port + 7/7 production replay pass.
3. **CIV-052 dependency note:** MES-SEC-002 (identity-restore bypass, HIGH, open) is the identity layer the 3-lock gate stands on; Genesis cannot open while it stands open.
4. **CIV-033 (Constellation):** carry the proposed MES-ENV-008 + the draft CIN-VID-073 row so the constellation stops riding inside other rows' notes.
5. **Numbers note (pending founder approval of §B's statement of record):** "470 = adopted edition cap (10 × 47, the Wall's brick count); the 47-edition paid scenario of 2026-11-21 is retired." Add to CIV-052's record so the 47 figure stops resurfacing as an open question.
6. **Cinematic flow-through:** the five draft rows in §C.1 (seal master · claim experience · constellation display · pedestal display · birth certificate) enter the Cinematic Production Register v0.2 under CIV-052/CIV-102/CIV-033, alongside existing CIN-VID-025 / CIN-VID-071 / CIN-PRD-008.

---

## D. GAPS — WHERE THE RECORDS ARE SILENT

1. **Mainnet relayer wallet:** NO RECORD FOUND of one existing. By design it is the founder's own step; it has not happened on record.
2. **Legal checklist:** listed as owed in Map §7.2 and Inventory CIV-052 ("the legal checklist marked documented"). NO RECORD FOUND of a completed or documented checklist.
3. **Founder's devnet ceremony inspection:** a standing gate before the DEPLOY word (Map §7.2). NO RECORD FOUND of it having taken place.
4. **Mainnet metadata / final-seal Arweave upload:** NO RECORD FOUND — only rehearsal specimen uploads exist (devnet Irys).
5. **Seal Take 2:** the v2 file exists on disk; NO RECORD FOUND of a judgment on it. Take 1 is canonical per Gemini #85.
6. **Partner desk beyond the local files:** the Genesis commissions of record are the gemini-seat documents (feasibility study; queue #34P privacy amendment · #37/#40 ceremony film · #43 rehearsal review · #63 shell ratification · #85 seal judgment). The local `partner-desk-drafts/` folder contains NO Genesis file. Whether anything further exists on the GitHub desk beyond what was desk-filed locally was outside the sources searched.
7. **A literal 470-mint run:** never performed on any chain (stated plainly in the Rehearsal #2 record); the cap is proven at the allocation layer with 4 physical devnet mints.
8. **B9 IP-velocity:** NEEDS-CHECK, open since Rehearsal #1 — no record of it ever being exercised against a landed claim.

---

*Compiled 2026-11-26 from the sources listed at the head of this document. Statuses are as recorded in those sources; divergences between sources are flagged, not harmonized. Nothing in this document authorizes minting, deployment, or distribution.*
