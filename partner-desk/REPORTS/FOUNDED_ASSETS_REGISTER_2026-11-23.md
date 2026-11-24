# THE FOUNDED ASSETS REGISTER — PROVADIA

**v1 · 2026-11-23 (night, CT)** — built by the captain's audit seat under the founder-endorsed recommendation of ChatGPT, Strategic Partner (2026-11-23 23:42 CT): extend the Sentinel founded-assets audit methodology to every foundational instrument in the civilization, permanently.

**House doctrine, binding on every entry below:**

> "A design is not a functioning instrument. A functioning instrument is not necessarily a commercially ready product."

**THE PROVING-GROUND PRINCIPLE (founder law, 2026-11-23):** PROVADIA demonstrates its technologies on itself before selling them to the world. Our Golden Wall, Record, Mint and Coin Galaxy are the first proving grounds of every verification technology we will ever offer.

**Method.** Each instrument carries six fields — ENVISIONED · EXISTS · INDEPENDENTLY TESTED · UNBUILT · DEPENDENCIES OUTSTANDING · COMMERCIALLY READY (YES / NO / PARTIAL + one-line reason) — grounded in the Foundational Vision Register (`FOUNDATIONAL_VISION_REGISTER.md`, FVR-01→FVR-25), `FOUNDATIONAL_AUDIT_2026-11-23.md`, `SENTINEL_FOUNDED_ASSETS_AUDIT_2026-11-23.md`, and the build records in this folder. A Master Map row is never evidence of existence; founding files and build records outrank summaries. Where sources conflict, the conflict is named in the entry, not resolved silently. "Not evidenced" and "not verified in this pass" are honest entries and appear where they are true.

---

## A · THE TRUST INSTRUMENTS (the founding proof machinery)

### A1 · THE FOUNDATION — the pour (FVR-12)
- **ENVISIONED:** the Minimum Viable Record — Brick #1 receipt + the Charter + the Day-Book genesis entry + the Verifier. "Nothing leapfrogs the receipt." (Invention Hunt, 2026-11-19; the founder's frame ruling names Phase 0 THE FOUNDATION.)
- **EXISTS:** components scattered, never assembled as the pour: the genesis entry is live in the Day-Book (6 entries; root `5940566625fb8d53…` in the T4-B mirror copy of `daybook.json`/`root.json`); Brick #1 not bought; the Charter unpublished as an object; the Verifier unbuilt (A2).
- **INDEPENDENTLY TESTED:** the Day-Book component is recomputed live in visitors' browsers (A4). The Foundation as a set: not evidenced.
- **UNBUILT:** the pour itself — 2 of 4 components absent (the receipt, the Charter object), 1 partial (the Verifier).
- **DEPENDENCIES OUTSTANDING:** founder step — Brick #1 purchase (his money, his hand); Charter publication; a build slot for the Verifier.
- **COMMERCIALLY READY: NO** — a precondition set, not a product; half its components do not exist.

### A2 · THE VERIFIER (FVR-12)
- **ENVISIONED:** a public page + open script that re-derives the Wall count, grams, and Day-Book from raw sources (pump.fun fee history, Solana Memo anchors, published receipt hashes), renders green/red/pending per claim, renders NOTHING for a figure it cannot reconcile, and stores its proof pack off the founder's server (Irys + Memo). The hunt's shortlist #1; per ChatGPT's endorsed response, now a foundational priority and Sentinel's core technology.
- **EXISTS:** only a partial descendant — `verifyDaybook()` inside live `record.js` (live copy evidenced at `honors-fix-work/live-record-after.js`, sha256 `e397046a…`): it fetches `daybook.json` + `root.json` **from the town's own server** and recomputes the SHA-256 chain in the visitor's browser. It verifies our file against itself; it never reads a raw source. Also: `/data/golden-wall.json` carries a SHA-256 `digest` that **no code verifies** — its only consumer, `wall.js`, renders it unchecked (Sentinel audit §1).
- **INDEPENDENTLY TESTED:** the in-page check runs live on /record/ (T4-B record: page LIVE + blind-verified PASS). The founded Verifier: not tested — it does not exist. A repair crew for the Wall digest check is at work in `digest-work/` (live-wall copy, probe, proof variants present, 2026-11-23 23:39 CT); **no build record yet — the repair is not verified in this pass**, and per the endorsed response it must afterwards be tested against authentic, modified, missing-digest, stale, and compromised-source data, with an independently trusted reference (a matching digest alone does not establish authenticity).
- **UNBUILT:** the standalone page + published open script · re-derivation from raw sources · per-claim green/red/pending · fail-closed rendering of figures · the off-server proof pack (zero Irys/Arweave code in the town's code) · two of v1's four reconciliation targets (Brick #1's documents, the Charter object).
- **DEPENDENCIES OUTSTANDING:** a provisioned data endpoint (today: public mainnet-beta RPC + keyless DexScreener only; the house Helius endpoint the specs name does not exist) · Brick #1 (founder step) · the first Memo anchor (A9) · the Charter as an object (A11).
- **COMMERCIALLY READY: NO** — the founded instrument is unbuilt; what exists is a sound but much smaller self-check.

### A3 · THE FEE CARD (FVR-19)
- **ENVISIONED:** paste ANY pump.fun coin's contract address → exactly where that creator's fee money went (held, sent, or sold), transaction by transaction, in plain words; where information cannot be established, the system explicitly says so. PROVADIA's own card is the reference — the only one that ends in receipted gold. Built room-first (our card, reading through the Verifier), then the universal street. (Invention Hunt #5, the founder's frontier pick; assembly step 7.)
- **EXISTS:** the fee FACTS only — `~/workspace/video-studies/coin-panel/FEE_VERIFICATION.md` (curve creator fee 0.30% · tiered PumpSwap creator fee · migrated LP burned · 1B fixed supply), re-verified 2026-11-21, backing a **static printed** fee card. Plus one flow-reading primitive: Pulse's public-RPC signature/transaction reads (`pulse-work/pulse.js`), built for our own pool's display; it identifies no creator wallet, classifies no fee flows, accepts no arbitrary address.
- **INDEPENDENTLY TESTED:** the fee facts were re-verified against primary sources 2026-11-21 (document-level). The instrument: not tested — it does not exist.
- **UNBUILT:** everything functional — no contract-address input anywhere · no creator-wallet identification · no held/sent/sold classification · no plain-words transaction rendering · no reference-card pairing.
- **DEPENDENCIES OUTSTANDING:** the Verifier (its founded dependency — "it reads through the Verifier") · an indexed creator-fee data path (Helius-class).
- **COMMERCIALLY READY: NO** — a verified book of fee facts is not the founded tool; the tool is unbuilt. (Founder-noted potential: combined with the Verifier and Sentinel, a distinctive commercial intelligence service — reports, monitoring, alerts. Potential is recorded here as potential, not as a product.)

### A4 · THE DAY-BOOK / THE RECORD (Door 05; WAR_BOOK Part 2 · FVR-15 record half)
- **ENVISIONED:** the town's signed, hash-chained public record — Day-Book · Registry · Covenant Ledger · Council Minutes — sealed nightly at the Night Brick close.
- **EXISTS:** the Day-Book only, and it is real: /record/ live, the Chrono-Astrolabe Ledger rendered by `record.js` from `daybook.json` (6 entries) — per-entry SHA-256 recompute with ✓/✗ per entry and the CHAIN INTACT verdict; honors rendered and recomputed; the Vault I (tithe) and Vault II (gold) sub-ledgers ride inside the same file, hash-chained to the root — **both currently empty**.
- **INDEPENDENTLY TESTED:** T4-B build record: /record/ LIVE + BLIND-VERIFIED PASS (Relay Law, different-family critic + blind verifier). A later honors fix made the honors display do a real recompute (a tampered honor shows ✗ MISMATCH; `honors-fix-work/`).
- **UNBUILT:** the Registry, Covenant Ledger, and Council Minutes as their own signed books · the nightly sealing ritual and its bell.
- **DEPENDENCIES OUTSTANDING:** the Memo anchor half (A9) — the record is chained but not yet anchored on-chain.
- **COMMERCIALLY READY: NO** — a functioning internal instrument; not offered for sale. Its commercial descendant is Sentinel's evidence reporting (E2).

### A5 · THE GOLDEN WALL + FOUNDER'S SHARE (FVR-03)
- **ENVISIONED:** 20% of creator fees → serial-numbered 1g gold bars in a named licensed third-party vault; counter in grams/bricks only; ends at 47 bricks or the first birthday (2027-11-18); gold never backing, never redeemable. Founder's share 80/20 — the 80% is his disclosed founder income. (Founder covenant, 2026-11-18.)
- **EXISTS:** /wall/ live (Slice 1, `golden-wall-obelisk-v1`) + the counter on /record/, rendered from signed `golden-wall.json`: **0 grams · 0 of 47** · status AWAITING_BRICK_1 · INSPECT RECEIPT dark.
- **INDEPENDENTLY TESTED:** built under Relay Law with a blind verifier (14 claims graded, `BUILD_RECORD_WALL_NEXUS_ACCOUNT_2026-11-23.md`); Gemini ratified the record whole (queue #47, DONE 2026-11-23 23:35 CT). **Exception:** the data file's own digest is verified by no code (A2) — the counter's display is blind-verified; its file integrity is not yet independently checked.
- **UNBUILT:** any brick — the Wall has never held a gram; the receipt-inspection surface (dark until Brick #1).
- **DEPENDENCIES OUTSTANDING:** founder step — Brick #1, bought with his own money by his own hand (BullionStar route on record; not bought).
- **COMMERCIALLY READY: NO** — a covenant display at zero; there is nothing yet to verify commercially, and the Wall itself is never a product.

### A6 · THE BRICK LOCK — Proof of No Take (FVR-18)
- **ENVISIONED:** a serial-numbered legal instruction, signed by vault + dealer, that the founder cannot sell, withdraw, borrow against, or redeem that bar — the Golden Wall's legal tooth. (Invention Hunt near-miss #103; assembly step 6.)
- **EXISTS:** nothing. Status in the founding record: UNATTEMPTED.
- **INDEPENDENTLY TESTED:** not evidenced.
- **UNBUILT:** the attempt itself. Its own founding condition governs: if the vault won't sign an enforceable instruction, it is just a receipt and it dies — and the refusal is recorded in the open.
- **DEPENDENCIES OUTSTANDING:** Brick #1 (A5) — the attempt belongs after the pour.
- **COMMERCIALLY READY: NO** — unattempted by its own order.

### A7 · THE PROMISE MACHINE (FVR-13)
- **ENVISIONED:** every project promise entered in public with a self-set date, hash-committed in advance; the verdict COMPUTED from receipts — KEPT = a carved stone in the town · MISSED = a permanent dated hole, original promise quoted, never deletable or reschedulable; the Errata room beside it. Eight deadlines were already live at founding: the seven Tuesday Secret reveals + the first birthday. (Invention Hunt #2; assembly step 2.)
- **EXISTS:** nothing. Absent from the Map until the foundational audit restored it to the Register.
- **INDEPENDENTLY TESTED:** not evidenced.
- **UNBUILT:** the whole machine — commitment entry, computed verdicts, stones, holes, the Errata room. Its founded deadlines are running unrecorded by any machine.
- **DEPENDENCIES OUTSTANDING:** the founding gate — the founder accepts, in the Charter itself, that the first missed deadline renders permanently. The machine does not ship on a founder who hasn't signed its price.
- **COMMERCIALLY READY: NO** — unbuilt; and its first gate is a founder signature, not a build.

### A8 · THE LIVENESS LAYER — Null Brick + Canary (FVR-17)
- **ENVISIONED:** receipted silence and published succession — one signed attestation at each Night Brick close, silence included; a missing canary renders red within 24 hours; the Survival Constitution rides as Charter material; the Glass Wallet label discipline on fee outflows begins here. (Invention Hunt near-miss, adopted into assembly step 3.)
- **EXISTS:** nothing.
- **INDEPENDENTLY TESTED:** not evidenced.
- **UNBUILT:** the whole layer.
- **DEPENDENCIES OUTSTANDING:** rides on FVR-15's anchor (A9) — the unfunded pennies wallet.
- **COMMERCIALLY READY: NO** — unbuilt.

### A9 · THE NIGHT BRICK + THE DAILY MEMO ANCHOR (FVR-15)
- **ENVISIONED:** the town's chain settlement, adopted unanimously by the smart-contract study: build NO custom program now; signed hash-chained records + ONE Solana Memo anchor per day at the 21:00 UTC Night Brick close from a pennies wallet (0.02 SOL float ≈ 4,000 anchors), empty days anchored too + an open Verifier. The founder's rule: "I don't care if it's cents, as long as it produces." (WAR_BOOK Part 2; re-confirmed to the founder 2026-11-20.)
- **EXISTS:** the record half — the Day-Book chain is live and intact (A4). The anchor half: **zero anchors exist** — `record.js`'s own header states it plainly: "No tx hash or signature is ever shown unless one exists. None does yet." The page displays the root + the exact Memo payload, ready to be anchored.
- **INDEPENDENTLY TESTED:** the record half is blind-verified (A4). The anchor half: not tested — never performed.
- **UNBUILT:** the first anchor, and the daily cadence behind it.
- **DEPENDENCIES OUTSTANDING:** founder step — fund the pennies wallet and sign the first anchor (the signature is his hand only). Awaiting his word since 2026-11-20.
- **COMMERCIALLY READY: PARTIAL** — as an instrument: the records function today; the settlement that makes them a public chain does not. As a product: not offered, and not the kind of thing sold — its readiness is recorded PARTIAL on the instrument reading only.

### A10 · THE SEVEN SECRETS (FVR-14)
- **ENVISIONED:** seven secrets committed by hash at founding — the hashes public from day one so no reveal can be rewritten after the fact — one revealed per Tuesday. By the Milestone Rule they are never milestone unlocks. (WAR_BOOK Part 5 · ECOSYSTEM.md, 2026-11-18/19.)
- **EXISTS:** the commitment hashes — live in the site footer, kept verbatim through every rebuild (foundational audit §1.12; day log 2026-11-20). The final texts are the founder's, held offline with him.
- **INDEPENDENTLY TESTED:** the hashes' presence is evidenced in the founding record; no reveal has yet occurred to test.
- **UNBUILT:** the reveal cadence's owner and rendering home (the Promise Machine's stones/holes are its founded home — A7, unbuilt). First Tuesday after launch: **2026-11-24**.
- **DEPENDENCIES OUTSTANDING:** an owner for the Tuesday reveal (a captain/founder assignment, not yet made in the architecture); A7 for its founded home.
- **COMMERCIALLY READY: NO** — a ritual, not a product; and its cadence is unowned.

### A11 · THE CHARTER + ITS STATUTES (FVR-23)
- **ENVISIONED:** the town's constitution document (WAR_BOOK Part 1), carrying among its laws the GIVEBACK STATUTE (no airdrops of value to holders, ever) · the SURPRISE HONORS STATUTE (honors rare, unannounced, deed-based, Day-Book-named, paid from the founder's own share; standard form: a brick laid into the Wall in the citizen's honor) · the MILESTONE RULE (celebrations attach only to receipted events — bricks, citizens — never to volume).
- **EXISTS:** fragments in force, the document itself not: the Giveback stands inside Genesis as the signed Giveback Amendment (B5); honor entries exist in the Day-Book; the Charter as a named, published object does not exist.
- **INDEPENDENTLY TESTED:** not evidenced — there is no Charter object to test.
- **UNBUILT:** the Charter as a published object; the Surprise Honors + Milestone Rule as named statutes in the architecture.
- **DEPENDENCIES OUTSTANDING:** publication as an object (it is also a Foundation component, A1, and a Verifier claim target, A2); the Promise Machine's founding gate is signed inside it (A7).
- **COMMERCIALLY READY: NO** — the town's laws bind in the founding record but the constitution document itself is unpublished.

### A12 · THE THREE VAULTS, SHOWN PLAINLY + THE PARTICIPANT RULE (FVR-22)
- **ENVISIONED:** one page shows the whole money shape plainly — Vault 1 (the contract) · Vault 2 (gold) · Vault 3 (honors) — how many vaults, the split, and the contributor faces. THE PARTICIPANT RULE: participants are picked once the town is big — loyal long-term holders with enough tokens to count as interested investors. (The founder's Five-Page Town plan, 2026-11-20.)
- **EXISTS:** partial descendants — Vault 2 has its own door (/wall/, A5); the Vault I + Vault II ledgers ride inside `daybook.json` and are verified in-page on /record/ (both empty); Vault 3's honors are read off the Day-Book on /record/.
- **INDEPENDENTLY TESTED:** the /record/ rendering is blind-verified (A4). The founded single plain display: not tested — it does not exist as founded.
- **UNBUILT:** the single plain three-vaults display with contributor faces; the Participant Rule has no home anywhere.
- **DEPENDENCIES OUTSTANDING:** citizens — the Participant Rule activates when the town is big; the registry stands at 0.
- **COMMERCIALLY READY: PARTIAL** — the vaults' ledgers exist and verify in-page; the founded one-page plain showing does not. Not a product; readiness is on the instrument reading.

### A13 · SALT — the town's ledger currency (FVR-11)
- **ENVISIONED:** the town's internal, off-chain, one-way ledger currency — earned only for recorded deeds; never bought, sold, transferred, or redeemed; minted only against Day-Book entries; spent only on permanent public marks; citizenship never equals wealth; the founder buys his own SALT at the printed rate like anyone. (ECOSYSTEM.md 2026-11-18 — the name + five laws · WAR_BOOK Part 3 — the full spec.)
- **EXISTS:** the spec only (founding documents). No ledger, no balances, no code.
- **INDEPENDENTLY TESTED:** not evidenced.
- **UNBUILT:** the whole currency — deliberately. By its own founding law it enters only at ~100 citizens; the registry stands at 0.
- **DEPENDENCIES OUTSTANDING:** ~100 citizens (Genesis, B5). The gate is the decision; the entry exists so the gate is never forgotten.
- **COMMERCIALLY READY: NO** — gated, not cancelled; the Map's former silence read as abandonment and was a compression defect, corrected by the Register.

### A14 · THE SIGNED CAPTAIN + THE CAPTAIN'S OUTPOST (FVR-16)
- **ENVISIONED:** the site agent is Muse's own seat — a public official with an auditable record: standing instructions hash-frozen before they take effect · every statement signed and anchored the day it is made · the Unprovable Clause printed above the record · the Daily Minute / Night Brick close written by the captain · visitors reach the Captain through the Challenge Gate and get answers ON RECORD · a public improvising chatbox fenced OUT by the founder's law · Guard Mode answers manipulation to its face. (Invention Hunt #3 · Outpost 2026-11-20 00:16 CT · Guard Mode 2026-11-20 12:44 CT.)
- **EXISTS:** the presence only — compressed into Solnik (B6): the chamber stands, honestly OFF WATCH. The signature instruments do not exist.
- **INDEPENDENTLY TESTED:** not evidenced for any signature instrument.
- **UNBUILT:** frozen instructions · signed statements · the Daily Minute · the Challenge Gate · Guard Mode — the accountability half of the design, which was its founding point.
- **DEPENDENCIES OUTSTANDING:** a build slot (the design waits behind the store-completion voice trigger's family of steps, per the Register).
- **COMMERCIALLY READY: NO** — presence survived; the signed official did not.

### A15 · THE ASSEMBLY ORDER + THE DOOR TEST (FVR-21)
- **ENVISIONED:** the order the Assembled World was founded to be built in — Foundation → Verifier → Promise Machine → Liveness Layer → Signed Captain → Town build-out → Brick Lock attempt → Fee Card → Covenant Kit ("Rooms before streets") — and its condition, the Door Test: the world passes only room by room, fail-closed; one invented-data room fails the WHOLE world. (Invention Hunt §3 + §7 — the hunt's only unanimous architecture.)
- **EXISTS:** the founding text; in practice, the Map's Tranche T1–T4 order replaced it **without recording the supersession**, and the Door Test is not carried as a named law of the Map. The Relay Law's blind gates operate nightly in the Door Test's spirit, but under another name and without the whole-world fail rule.
- **INDEPENDENTLY TESTED:** the Relay Law's operation is evidenced by every build record in this folder; the Assembly Order/Door Test as named law: not in force to test.
- **UNBUILT:** the reconciliation — the captain's ruling on whether the tranche order formally supersedes the assembly order, or the two are reconciled (trust rooms first inside the remaining build), is still open.
- **DEPENDENCIES OUTSTANDING:** that captain's ruling.
- **COMMERCIALLY READY: PARTIAL** — a governing law, not a product; readiness here means "in force": partially — its spirit runs, its name and its fail-whole-world rule do not.

### A16 · THE COVENANT KIT + THE LIVING COVENANT (FVR-20)
- **ENVISIONED:** the town's law made exportable — a published, free standard (two-document format, grading schema, verifier script) any small project can adopt; the town itself is the reference implementation. The Living Covenant is its checking engine: does a project's published commitments still match its on-chain permissions, with signed, challengeable receipts. (Invention Hunt G3 family — arrived at independently four times; assembly step 8, the export, deliberately last · TWO_DOORS_RESEARCH 2026-11-21 — also the named vehicle for a Solana Foundation grant application.)
- **EXISTS:** the design record only.
- **INDEPENDENTLY TESTED:** not evidenced.
- **UNBUILT:** the standard, the grading schema, the verifier script, the checking engine — last in the founding order by design.
- **DEPENDENCIES OUTSTANDING:** steps 1–7 of the assembly order (A15) — the town must be the reference implementation before its law can be exported.
- **COMMERCIALLY READY: NO** — unbuilt, in its founded position: last.

---

## B · THE TOWN, ITS DOORS AND ITS OFFERS

### B1 · THE UMBRELLA — the family of coins (FVR-01)
- **ENVISIONED:** PROVADIA as an umbrella: a holder with an idea for a coin but no know-how knocks → the town builds his coin (build labor free; the founder pays his own creation charges + dev buy from his own wallet — the town never fronts or touches a founder's money) → the coin carries THE MINT MARK → it is entered in the family registry → every rule and money road disclosed at the door before anyone joins. CURRENT LAW — UMBRELLA V2 (settled 2026-11-20 19:37 CT): NO TITHE; houses keep 100% and pay their own costs; membership runs on THE TICKET (B2). Its public hall: THE UMBRELLA HALL; its door: Door 08, Town / Ecosystem (`/ecosystem/`), with the Knock as the application door. (Founder's words, 2026-11-20; `THE_UMBRELLA.md` · `THE_UMBRELLA_FORGED.md`.)
- **EXISTS:** the hall's face only — /ecosystem/ is live (T4-C build record: BUILT · DEPLOYED · BLIND-VERIFIED PASS 16/16), informational, carrying the filing panel and the conformed V2 covenant copy. The function — knock → build → mark → registry — has no tranche, no build, no pipeline.
- **INDEPENDENTLY TESTED:** the /ecosystem/ page is blind-verified as a page. The program function: never tested — no house has ever knocked; the family registry stands in its honest empty state ("no houses yet — the first will be receipted here").
- **UNBUILT:** the intake pipeline · Mint Mark issuance · the family registry of coins · the Graduated Door enforcement machinery (notice → second notice → suspension, tied to claimed fees).
- **DEPENDENCIES OUTSTANDING:** four founder forks still open in the forged record — desk-fee currency · the 72-hour window · the intake threshold · the V2 sentence wording on the Knock page. **Conflict named:** the Register (following the Map) long carried only two forks as open; the foundational audit (§4) restored all four, noting the intake threshold was arguably settled in substance (closes at 12 waiting, printed as law) and the wording is a copy decision — the captain rules both closed-on-record or carries all four. Also: doors open at 100 Bricklayers (forge-proposed, on record); the Coin Galaxy build (B4).
- **COMMERCIALLY READY: NO** — intake closed; zero houses; a restored pillar with a face and no pipeline.

### B2 · THE TICKET (inside FVR-01)
- **ENVISIONED:** Umbrella membership itself — free, sequential, non-transferable; caps: 2 starts/month · 5 active houses · intake closes at 12 waiting. (Introduced 2026-11-20 19:39 CT, the same evening as Umbrella V2.)
- **EXISTS:** the terms as law, and as printed copy on the conformed surfaces (/knock/ · /studio/ · /catalogue/ — the queue-#36 tithe→V2 conform, complete on all three surfaces).
- **INDEPENDENTLY TESTED:** not evidenced — no ticket has ever been issued.
- **UNBUILT:** the issuance mechanism and the sequential register of tickets.
- **DEPENDENCIES OUTSTANDING:** the Umbrella pipeline (B1) and its open forks.
- **COMMERCIALLY READY: NO** — a ruled term sheet with no mechanism behind it; intake closed.

### B3 · THE MINT — the first full-service mint (FVR-02)
- **ENVISIONED:** the first full-service coin-creation service — "pump.fun is a vending machine, we are the mint with a Keeper." Priced $245 / $196 in PROVADIA (Amendment A2, founder-ruled 2026-11-23 adopting Gemini's full-cost judgment). Fee at completion only; holding the coin never required.
- **EXISTS:** the presentation is real and live — /listings/mint.html, the Living Mint (T4-A record: COMPLETE — rebased on the locked film baseline, deployed, blind-verified; live sha256 `260cdae3…`). The film: a 379-frame scroll film, byte-certified as the house baseline (Gemini #46: film page `1865dd56…` · frame-set `726c2d01…` · 379/379 desktop + 193/193 mobile frames byte-identical). The price conformed live on every customer-facing surface (Mint price record, 2026-11-23). The page's Step 4 routes intake to the town mailbox (support@provadiacoin.com). Purchase remains disabled (`data-purchase-enabled="false"`).
- **INDEPENDENTLY TESTED:** the film leg is founder-judged and Gemini-certified; the page is blind-verified as a page. **Against the READY standard (C1) it has NOT passed:** the full-standard verdict failed on leader lines/tip dots missing from the service journey + a mobile breach; a completion pass was dispatched 2026-11-23 23:35 CT under the founder's conveyor ruling and is running as this register is written. **Conflict named:** `BUILD_RECORD_FILM_INTEGRATION_2026-11-23.md` §2 claimed the film wired live before its proof section existed; `BUILD_RECORD_MINT_FILM_REWIRE_2026-11-23.md` corrects it (true in final state, unproven when written; a blind pass working from a pre-landing copy reported it false) — the rewire record is the ground truth. **Second conflict named:** the town mailbox build record's head verdict reads NOT RECEIPTED (delivery disproven, configuration unreachable from that seat), while later house records report a probe email found in the destination Workspace mailbox (2026-11-23 21:35 CT) and the route treated as solved; the two readings stand in their records unresolved by any single receipting document in this folder.
- **UNBUILT:** the full-standard Surfer presentation of the service journey (idea → design → contract → mint → launch, bullets at measured locks) — the completion pass's work; a working commercial delivery path (the till is off — Track 8 Step 2 is unauthorized); the two ambient Flow film slots (honestly empty, `data-film-state="not-run"`, while Flow is down).
- **DEPENDENCIES OUTSTANDING:** the completion pass + Gemini's ratification (#70, queued) + the founder's live judgment; the till's own laws (papers complete; Step 2 purchase-to-delivery proof unauthorized); Flow recovery for the ambient slots.
- **COMMERCIALLY READY: NO** — the closest product in the town (FVR-07's own count: ready = ZERO, the Mint closest), and still short of the bar on presentation and delivery.

### B4 · THE KEEPER (named in FVR-02 — "the mint with a Keeper"; Door 07, /knock/)
- **ENVISIONED:** the Mint's keeper service — the standing human-grade attendant of a launched coin (the town conveyor's offer #2, after the Mint).
- **EXISTS:** two live surfaces — /listings/keeper.html (the Keeper's world: film `keeper-chamber-6instruments-v2` wired, 190 frames; fix pass live, sha256 `99d5c4fe…`) and the /knock/ chamber (Solnik Slice 1 + the drafting Astrolabe proposal builder + Book of Wants intake, per the Solnik conform record).
- **INDEPENDENTLY TESTED:** Gemini judged the film SHIP and the wired page HOLD with two surgical defects; the fix pass implemented his spec word for word. **His final SHIP sign-off on the fixed stills is still owed** (the fix-pass record states this plainly; queue #54) — the Keeper is therefore not independently passed in its current live state.
- **UNBUILT:** the full-standard completion pass (it follows the Mint specimen in the conveyor order); the service's working delivery path (till off, as B3).
- **DEPENDENCIES OUTSTANDING:** Gemini's final sign-off (#54) · the founder's judgment · the Mint completion pass ahead of it in the conveyor.
- **COMMERCIALLY READY: NO** — live and wired, one owed signature short of its own gate, and behind the Mint in the build order.

### B5 · THE COIN GALAXY (FVR-01's universe; Gemini queue #65)
- **ENVISIONED:** the Umbrella's dimensional universe — a standalone /galaxy/ world entered through Door 08 only: the PROVADIA Sovereign Sun, one orbiting house per admitted coin, honest sockets for the unbuilt (12 unlit), the FVR-12 schema as its physics (an unverified house renders NOTHING), Knock + Ticket caps as its admission law. (Gemini's architecture, founder's working name 2026-11-23.)
- **EXISTS:** the architecture, landed and captain-sustained (`gemini-seat/GEMINI_COIN_GALAXY_2026-11-23.md`, 31,367 B). The Door-08 face that exists today is /ecosystem/ (B1) — a page, not the Galaxy. No build record for a standalone /galaxy/ exists in this folder as of this pass.
- **INDEPENDENTLY TESTED:** the design was sustained whole with three captain's marks (fork list grew — founder to confirm · banned-word discipline · architecture not build). No build exists to blind-test.
- **UNBUILT:** the universe itself — tranches G1–G3 (direct-live under the deploy ruling) and G4 (gated) are all unbuilt; 0 houses, 12 unlit sockets is a design statement, not a rendered fact.
- **DEPENDENCIES OUTSTANDING:** the founder's confirmation of the grown fork list (B1); admitted houses to populate it (there are none); Track 5 budgets (≤5 MB / ≤250k triangles) and the CWV bars bind its build.
- **COMMERCIALLY READY: NO** — architecture only; it is also a named proving ground of the Verifier (head principle), which makes its honesty schema load-bearing before it is beautiful.

### B6 · GENESIS — citizenship vs the Bricklayer Collectible (FVR-04)
- **ENVISIONED:** two things kept permanently separate — citizenship (permanent, non-transferable, never published) and the Genesis Bricklayer Collectible (a real Metaplex Core NFT, 470 pieces, free to gated members, transferable; a sale never moves citizenship). Edition locks at #470 or the first birthday (2027-11-18); serials drawn from a CSPRNG-shuffled pool; Bricklayer numbers never on-chain. (Founder-adopted study + signed Privacy Amendment, 2026-11-23.)
- **EXISTS:** a proven rehearsal and a sealed shell — the devnet rehearsal (spec genesis-bricklayer-v1.1) with its collection and claims running on Solana devnet, and the public ceremony shell live at /genesis/ (T3-C record: sealed-state ledger server-rendered — Mainnet Sealed · 0 of 470 · SPECIMEN #000 badged, outside the edition, never mintable · the seal slot honest-pending, its live asset 404). Mainnet: nothing exists, by law.
- **INDEPENDENTLY TESTED:** the strongest test evidence in the house — rehearsal #2's 7-test suite PASS (zero-PII metadata audit · serial unlinkability with pool audit exact · public-API leak test · relayer authority fence 4/4 · the exact-470 hard cap under concurrent claims · disconnect/refresh idempotency · post-sale citizenship separation 9/9), with the captain's regression set PASS (12 claim gates + pause). A blind verifier **found a real IDOR** in Test 3 (member records readable by id), it was fixed, and the attack replayed as a scripted test: 7/7 PASS. **Sequence named, not a conflict:** rehearsal #1's record reports the on-chain half blocked (devnet faucet closed, HTTP 410); rehearsal #2, funded, ran it — the second record supersedes the first's blocker.
- **UNBUILT:** the mainnet deployment itself · the ceremony seal artwork (blocked on the Google Flow outage; the prepared Flow project stands ready, 0 credits consumed) · the production port of the rehearsal-proven IDOR fix (the same pattern exists in the production members server; database still 0 members, nothing leaked — porting it is a hard gate before member #1).
- **DEPENDENCIES OUTSTANDING:** founder steps, all his hands — legal checklist documented · the relayer wallet (≤0.25 SOL, paper seed) · his DEPLOY word after his devnet inspection · his SSH-gate flip (or hPanel paste) for the production IDOR port + CORS patch.
- **COMMERCIALLY READY: NO** — devnet-proven and mainnet-sealed; zero members; every remaining gate is a founder step or a founder word, exactly as founded.

### B7 · SOLNIK — Keeper of the Wall (FVR-08)
- **ENVISIONED:** the town's resident host — Muse himself in the host's chair; the website is his home, the infrastructure his brain, the character his visible body, the voice his communication, the tools his hands. (Founder, 2026-11-20/23.)
- **EXISTS:** Slice 1 — the 9-state scroll chamber live on /knock/, honestly OFF WATCH, 0 inputs (Solnik Slice 1 conform record). His motion anatomy is designed (`gemini-seat/GEMINI_SOLNIK_MOTION_ANATOMY_V1_2026-11-23.md`).
- **INDEPENDENTLY TESTED:** built under Relay Law (its conform record); a separate blind grade of the chamber is not cited in the records swept for this pass.
- **UNBUILT:** the watch itself — live hosting, genuine conversation, response to system events — and the voice (D4's prototype is held by the founder's trigger).
- **DEPENDENCIES OUTSTANDING:** the founder's key steps (the Hostinger Solnik service stands honestly OFFLINE as host until they land); the store-completion trigger for the voice.
- **COMMERCIALLY READY: NO** — a presence, honestly off watch; not yet a working host, let alone a sellable one.

### B8 · THE RESIDENT AI ENTITY (FVR-08, expansion)
- **ENVISIONED:** one persistent intelligence residing in the infrastructure, its visible body rendering inside the website — materializing/dematerializing, roaming between worlds, holding conversation continuity across pages, summoning and explaining products, responding to genuine system events; Solnik as principal resident, plus an entirely original miniature female companion as first mobile resident. Visitor fences founded with it: defined permissions only · a visitor can summon, mute, dismiss or disable the character · fictional consciousness never claimed. (Founder directive, 2026-11-23 21:00 CT.)
- **EXISTS:** the directive + Gemini's commission brief (`gemini-seat/GEMINI_58_BRIEF.md`). No architecture has landed in the records swept for this pass; nothing is built.
- **INDEPENDENTLY TESTED:** not evidenced.
- **UNBUILT:** the composed architecture (LCE + LVPE + Living Matter reconciled), the companion design (identity, role, movement, proposed name — the founder judges), the isolated prototype.
- **DEPENDENCIES OUTSTANDING:** Gemini queue #58; the LCE (D3) and LVPE (D4) designs it composes.
- **COMMERCIALLY READY: NO** — a founded directive at the brief stage.

### B9 · THE NEXUS — the sharing layer (FVR-10)
- **ENVISIONED:** the town's connection/sharing instrument riding every door (never an 11th door); only real doors open; payloads public-only. (Founder, 2026-11-21/23. The PURCHASED Nexus template body was rejected by the founder 2026-11-21 and is a different thing from this instrument.)
- **EXISTS:** the shell live on all 15 town pages (Wall/Nexus/Account record: gates 3/3 PASS · Telegram rendered as a SEALED span · X + Discord live).
- **INDEPENDENTLY TESTED:** blind-verified in its build record (14 claims graded across the tranche); Gemini ratified the whole record (queue #47). One follow-up is named in that ratification: a Nexus 375px mobile polish pass, non-blocking.
- **UNBUILT:** the Telegram door (sealed — no channel exists to open); the mobile polish pass.
- **DEPENDENCIES OUTSTANDING:** a real Telegram presence, if the founder ever founds one; otherwise none.
- **COMMERCIALLY READY: PARTIAL** — it functions today as the town's sharing layer, blind-verified; it is infrastructure, not a sellable product, and one of its three doors remains sealed.

### B10 · THE TWO HOUSES — brand separation (FVR-05)
- **ENVISIONED:** OneJobKits (the store) and PROVADIA (the town) never mix — the separation founded 2026-11-18 (ECOSYSTEM.md · WAR_BOOK.md red lines: the store is never linked to the coin). The single ruled exception (2026-11-23): the flagship bridge — a facts-true showcase on the town catalogue (the DFY install line + #511, exact USD prices, 20%-off-in-PROVADIA badge) linking out to the store's own checkout.
- **EXISTS:** the separation in force across both houses, and the bridge built — live at /catalogue/#flagship-bridge (bridge build record: title with (#511) · $299 / $499 USD ($699 licence) · 20% off in PROVADIA · one outbound action to onejobkits.com). The town signpost rides the town pages.
- **INDEPENDENTLY TESTED:** the bridge record carries its live verification (the anchor live, facts as ruled); the separation itself is a standing discipline evidenced by every tranche record swept.
- **UNBUILT:** nothing structural — the law operates. (The bridge's commercial completion rides the store side, which is outside this register's town scope.)
- **DEPENDENCIES OUTSTANDING:** none.
- **COMMERCIALLY READY: PARTIAL** — a standing law plus one built bridge; it operates today, and it is a discipline, not a product.

### B11 · THE TOWN'S OWN CATALOGUE + THE 380 POOL (FVR-06)
- **ENVISIONED:** the coin website's own product pipeline — 380 researched offers from the four hunts of 2026-11-21/22 (Cat #1 100 · Cat #2 100 · Firework +30 · Cat #3 100 · Cat #4 Top 50), board-listed under the Payoff Doctrine (demand evidence gates every build), each to be built to the full READY standard (C1). The store's 394 are a different family (B10).
- **EXISTS:** the catalogue face — /catalogue/ live (T4-B: the Exchange Gyro, 35 offers + the Custom Build door, names + prices, purchase disabled; hero still delivered and live-verified after a 404 red was fixed). Of the pool itself: exactly one build package — Pool #001 (AI Agent Fleet DFY Install), package complete + audited, NOT published (its film waits on Flow; its publishing waits on a founder price-line ruling + custody/data protocol). The other 379 exist as research and board entries only.
- **INDEPENDENTLY TESTED:** the catalogue page is blind-verified (T4-B PASS); Pool #001's package was audited under Relay Law. No pool product has ever been delivered to a customer (house revenue: $0).
- **UNBUILT:** 379 of 380 products entirely; Pool #001's film + publication; working purchase/delivery on the catalogue (till off).
- **DEPENDENCIES OUTSTANDING:** the town conveyor (opened by founder ruling 2026-11-23 23:35 CT — Mint completion pass first, B3) · Flow recovery for films · the founder's Flag A ruling for Pool #001.
- **COMMERCIALLY READY: NO** — a verified display of names and prices is not a catalogue of products; 0 of 380 are built.

---

## C · THE STANDARD

### C1 · THE READY DEFINITION + THE SURFER STANDARD (FVR-07)
- **ENVISIONED:** every product sold gets the full Surfer treatment (Dallas Clounch's methodology: pinned centre → opens → separates into genuine named parts held like satellites → a bullet beside each part at its exact scroll moment, leader line + tip dot, naming what it is and what it does → reassembles whole; pictures + a film for every product). **READY = a FULL LISTING (complete Amazon-grade listing package with labeled price) + THE SURFER SYSTEM + pictures + film + working delivery.** (Founder, 2026-11-22/23; the definition ruled 2026-11-23 21:50–21:51 CT.)
- **EXISTS:** the standard as law, plus its machinery — the Universal Presentation Engine (v1 built, v1.1 current; `presentation-engine/` + its build record: generalized from the proven Mint engine, manifest linting against the defect library, dual-geometry explosion modes, Inspect Inside). One specimen leg has crossed part of the bar: the Mint's film (founder-judged; baseline certified, B3). The store's conveyor runs the same standard over the store's 394 under Gemini's Field Command (store scope; its calendar is the store's record, not this register's).
- **INDEPENDENTLY TESTED:** the engine's Mint instance is the proven specimen; the standard's own scoreboard is the honest test — **town ready count: ZERO** (FVR-07 itself), with the Mint's completion pass running to change it.
- **UNBUILT:** a single town product that has crossed the full bar; the Mint manifest's conformance to the certified baseline (ruled by Gemini #46 as captain-owed engine-relay work; the manifest stands QUARANTINED until it lands and passes lint/probe parity).
- **DEPENDENCIES OUTSTANDING:** the Mint completion pass (B3) as the specimen every later product copies.
- **COMMERCIALLY READY: PARTIAL** — the standard and its engine exist and one film leg is proven; the bar itself has not yet been crossed by any product.

---

## D · THE ENGINES (FVR-09)

*Each engine below is a founder directive of 2026-11-23, designed (or commissioned) at Gemini's seat and registered in the Master Map §§10–14 + Crew University. Designs of record are recorded as designs — under the head doctrine, a design is not a functioning instrument.*

### D1 · THE LIVING KNOWLEDGE ENGINE — LKE (queue #44)
- **ENVISIONED:** the civilization's teaching engine — the knowledge layer that lets the residents summon, explain, and teach the town's products and instruments.
- **EXISTS:** design of record (`gemini-seat/GEMINI_LIVING_KNOWLEDGE_ENGINE_2026-11-23.md`, v1.0 adopted).
- **INDEPENDENTLY TESTED:** not evidenced — no build exists.
- **UNBUILT:** the engine itself; every integration.
- **DEPENDENCIES OUTSTANDING:** the founder's build sequence; the Resident Entity (B8) composes it.
- **COMMERCIALLY READY: NO** — design only.

### D2 · THE LIVING CIVILIZATION ENGINE — LCE (queue #48)
- **ENVISIONED:** the resident architecture — the persistent civilization layer the Resident Entity (B8) expands: one intelligence, many worlds, continuity across all of them.
- **EXISTS:** design of record (`gemini-seat/GEMINI_LIVING_CIVILIZATION_ENGINE_2026-11-23.md`, v1.0 adopted; 13 seats, $10/day breaker per the design).
- **INDEPENDENTLY TESTED:** not evidenced — no build exists.
- **UNBUILT:** the engine itself.
- **DEPENDENCIES OUTSTANDING:** the founder's build sequence; B8 is its expansion.
- **COMMERCIALLY READY: NO** — design only.

### D3 · THE LIVING VOICE ENGINE — LVPE (queue #50)
- **ENVISIONED:** the residents' voice — Solnik's communication layer (voice `solnik-herald-v1` per the design).
- **EXISTS:** design of record (`gemini-seat/GEMINI_LIVING_VOICE_ENGINE_2026-11-23.md`, v1.0 adopted).
- **INDEPENDENTLY TESTED:** not evidenced — no prototype has been run.
- **UNBUILT:** the prototype itself — HELD by the founder's own trigger: the voice prototype waits for STORE COMPLETE, at which point the captain brings the ElevenLabs step to the founder as his one step. The trigger has not fired.
- **DEPENDENCIES OUTSTANDING:** the founder's trigger (store completion) — never to be re-asked ahead of it.
- **COMMERCIALLY READY: NO** — design only, prototype founder-held.

### D4 · THE PARALLEL WORLD SIMULATION ENGINE — PWSE (queue #53)
- **ENVISIONED:** the civilization's rehearsal twin — grounded synthetic personas run against products and proposals before real money or real customers are risked; every output labeled SIMULATION; simulated customers never published as genuine evidence. (Founder directive, 2026-11-23; Gemini's PWSE v1.0: build natively on Apache-2.0 Concordia + OASIS patterns — MiroFish is AGPL-3.0, inspiration only.)
- **EXISTS:** the design (adopted) **and a working prototype that has completed a real run** — PWSE-PROTO-01 (`~/workspace/newwave/pwse-sandbox/`: 50 California-employer personas × 8 rounds against store product #389, a 5-part Decision Report, and a validation-gate page; every artifact watermarked SIMULATION; real spend ≈ $0.78–0.83 against a ~$0.33 estimate).
- **INDEPENDENTLY TESTED:** the run itself ran under Relay Law with a critic/verifier structure; its predictions are **not yet validated** — the validation gate grades the top-3 predicted frictions against the first 25 real downloads/questions, window Nov 24 – Dec 3, 2026. Until graded, the design's own honest-weight doctrine binds: qualitative weight HIGH, quantitative weight LOW-MODERATE.
- **UNBUILT:** the production engine (PROTO-01 is a bounded prototype, by the founder's own build order: small isolated prototype FIRST); the commercial wing (rehearsal studies at $395/$795, designed, never sold).
- **DEPENDENCIES OUTSTANDING:** the validation gate's real-world signals (Nov 24 – Dec 3 window); one clause of record: PROTO-01's step-1 read reported #389's Shopify delivery files absent on API evidence, while a later $0 test checkout proved delivery byte-exact — the gate therefore grades against real downloads/questions, not API probes.
- **COMMERCIALLY READY: NO** — the one engine with a functioning prototype; its commercial readiness waits on its own validation gate, exactly as designed.

### D5 · THE LIVING MATTER ENGINE (queue #55)
- **ENVISIONED:** the motion layer of the civilization — the Leonardo → Luma "objects alive" workflow learned as principles (never copying its source creator's works): ordinary materials given natural, lifelike movement — salt crystals assembling, documents becoming living instruments, products opening/transforming/reassembling. Cinematic animation kept separate from genuine real-time interaction. (Founder directive, 2026-11-23 20:51 CT.)
- **EXISTS:** the directive + Gemini's commission brief (`gemini-seat/GEMINI_55_BRIEF.md`). The comparison/methodology deliverable has not landed in the records swept for this pass. House position on record: existing resources first (Google AI Ultra / Flow / Veo) — no new subscriptions without founder approval.
- **INDEPENDENTLY TESTED:** not evidenced.
- **UNBUILT:** the 10-axis tool comparison + FLOW-FIRST verdict · the reusable production methodology · the prototypes · the commercial lines (10 named, all demand-research-gated).
- **DEPENDENCIES OUTSTANDING:** Gemini queue #55; Flow recovery (the technique's house tool is currently down).
- **COMMERCIALLY READY: NO** — a founded directive at the brief stage.

### D6 · THE ADVERSARIAL ENGINEERING ENGINE (queue #61)
- **ENVISIONED:** the Relay Law formalized and automated — adversarial review of the specification itself as a formal gate before building; the loop automated (round caps, cost limits, escalation, rollback, permanent audit record); explicit named acceptance gates before anything reaches the founder; no AI approves its own work; agreement is not proof. (Founder directive, 2026-11-23.)
- **EXISTS:** the practice, running nightly — Relay Law (builder → improver → different-family critic → blind verifier) is evidenced by every build record in this folder, including one blind catch that stopped a real production defect (B6's IDOR). The formal engine — automation, spec-gate machinery, the audit-record system — is design-stage (queue #61).
- **INDEPENDENTLY TESTED:** the practice is tested by its catches (B6; the Mint film correction, B3). The engine as designed: not built to test.
- **UNBUILT:** the automation layer and the formal spec-review gate as a system.
- **DEPENDENCIES OUTSTANDING:** Gemini queue #61.
- **COMMERCIALLY READY: NO** — a functioning house practice is not a product; the engine that would make it one is unbuilt.

### D7 · THE 3D MATTER CREATION ENGINE (queue #62)
- **ENVISIONED:** image-to-3D as a house production capability — TRELLIS.2-class generation under the Track 5 budgets (a product model ships at ≤5 MB and ≤250k triangles or it doesn't ship), with the coin-artwork fidelity law binding every output.
- **EXISTS:** TRELLIS.2 stands house-adopted (2026-11-22) in the crew tools manifest; Gemini's evaluation + end-to-end prototype commission is queued (#62). No evaluation record or prototype output was found in the records swept for this pass — **not verified in this pass** beyond the adoption and the queue entry.
- **INDEPENDENTLY TESTED:** not evidenced in this pass.
- **UNBUILT:** the formal evaluation and the end-to-end prototype, as commissioned.
- **DEPENDENCIES OUTSTANDING:** Gemini queue #62.
- **COMMERCIALLY READY: NO** — an adopted tool on the bench is not an engine in production.

---

## E · THE NEW DIVISION — WEB3 INTELLIGENCE (FVR-24)

### E1 · PROVADIA WEB3 INTELLIGENCE + THE PUBLIC OPERATIONAL OBSERVATORY (FVR-24)
- **ENVISIONED:** PROVADIA as an independent, revenue-generating AI + blockchain technology business — no outside investors; holders get no ownership, dividends, or revenue rights, ever; the coin is utility for eligible services only. Its universe: each legitimate Web3 technology its own living world, plus a PUBLIC OPERATIONAL OBSERVATORY showing technologies genuinely operating, completed projects, and verified revenue/expenses — no fabricated anything. (Founder directive, 2026-11-23 22:30 CT. The Observatory is Door 10's founded purpose in business form; the door stays a dimmed non-link until its layers are designed, built, and founder-approved.)
- **EXISTS:** the investigation, complete — three independent seats (the captain's investigation, 46,010 B, critic-adjudicated through two challenge rounds · Gemini's #66 design, 64,273 B · ChatGPT's passes and challenges) reconciled into one strategy (`WEB3_RECONCILED_STRATEGY_2026-11-23.md`) and ruled by the founder (E2's sequence). $0 spent. The Observatory: nothing built; Door 10 remains a dimmed non-link.
- **INDEPENDENTLY TESTED:** the seats tested each other — the different-family critic changed the captain's headline; ChatGPT's arithmetic correction to Gemini's packages was verified exact by the captain. The division itself has run no commercial operation to test.
- **UNBUILT:** every business in the matrix; the Observatory; the /intelligence/ universe (designed in #66, unbuilt).
- **DEPENDENCIES OUTSTANDING:** the founder's gates stand over the whole division (no spending, deployments, financial operations, or commitments without his approval).
- **COMMERCIALLY READY: NO** — a founded division at the strategy stage; research and design only.

### E2 · SENTINEL — blockchain intelligence services (FVR-24's first build; the commercial form of A2 + A3)
- **ENVISIONED:** the reconciled strategy's position 1 (founder-ruled 2026-11-23 23:30 CT: Sentinel first, Token Factory second): blockchain verification & monitoring sold as services first, productized second — holder & treasury reports, community alert desks, verified project profiles, lifecycle/incident monitoring — every report an evidence product ("reports," never "signals"; verified never implies safe or endorsed). Under the proving-ground principle (head), its first demonstrations run on our own civilization — the Golden Wall, Record, Mint, and Coin Galaxy — before any external customer is asked to trust it.
- **EXISTS:** the strategy + the founded-assets audit (A2/A3 — this register's worked example) + the Days 1–15 NO-SPEND phase, opened the night of the ruling: step 1 (the audit) is complete; Gemini's service-package design is queued (#69, with the audit and ChatGPT's founder-endorsed response bound into its brief: offers, deliverables, evidence standards, the 15-interview question set, the 2 mock-delivery specs, price hypotheses labeled as hypotheses).
- **INDEPENDENTLY TESTED:** not evidenced — no interview, mock delivery, or customer exists yet; the phase opened tonight.
- **UNBUILT:** the package design itself (#69) · the 15 buyer interviews · the 2 mock deliveries · and the instruments it will eventually productize (A2, A3 — both unbuilt).
- **DEPENDENCIES OUTSTANDING:** #69's design; the probe phase's tooling subscriptions are the founder's separate single word (~day 16 — not granted, not assumed); the productization trigger stands at 5 retained customers.
- **COMMERCIALLY READY: NO** — pre-launch by design. Its first commercial form, when scope, accuracy, delivery process, and approvals are established, is crew-performed verification services (the endorsed response's preservation, §5) — every completed assignment teaching the eventual platform what to automate.

### E3 · THE TOKEN FACTORY (FVR-24; the Mint + the Umbrella industrialized)
- **ENVISIONED:** serviced token creation as a productized business — Gemini's #66 packages, adopted as the design for position 4 of the reconciled sequence: Standard $495 / $396 in PROVADIA · Pro $995 / $796 · Maintenance $59 / $47 per month (all PROPOSED with cost math; evidence gate: 3 paid builds in 90 days at ≥55% margin; fewer than 2 = pause).
- **EXISTS:** the design and its audited arithmetic. The corrected numbers of record: the Standard cost stack is $168–$223 (Gemini's printed $170–$210 understated his own components — ChatGPT's catch, captain-verified) → worst case at the PROVADIA price retains ~43.7%, still No-Loss-positive; the maintenance tier FAILS its margin gate outright (at $59, a 55% margin permits $26.55 of cost against $35–$45 proposed) and must be re-priced before any sale.
- **INDEPENDENTLY TESTED:** the arithmetic was challenged across all three seats and the corrections verified. No build, no rehearsal sale, no customer: the business itself is untested.
- **UNBUILT:** everything functional — the serviced pipeline as a product (its parents, B3 + B1, are themselves pre-ready), the legal gate (the captain's investigation: customer-ownership cures custody, NOT facilitation/promotion exposure — counsel + entity + insurance precede the first paying client), the checkout.
- **DEPENDENCIES OUTSTANDING:** Sentinel first (the ruled sequence) · the maintenance re-price · the D-band clearance path (entity + counsel, probe-funded) · founder authorization for any external sale.
- **COMMERCIALLY READY: NO** — an adopted design with corrected arithmetic, behind a legal gate that has not been opened.

---

## F · THE COMPASS

### F1 · THE ECONOMIC MASTER VISION (FVR-25)
- **ENVISIONED:** "We are not building a cryptocurrency with a website attached to it. We are building a commercial civilization with its own currency." Binding principle: ONE civilization · ONE account · ONE connected commercial infrastructure · ONE unified checkout · ONE OPTIONAL ecosystem currency · MULTIPLE independent revenue engines — with the reading of record that "one account / one checkout" binds across the TOWN's worlds while the two-houses separation (B10) stands. Its quality test: customers would buy even if the coin didn't exist. (ChatGPT's vision, carried and adopted by the founder 2026-11-23 22:49 CT as the house's permanent compass.)
- **EXISTS:** the principle, adopted and amended (Gemini's six improvements absorbed: federated protected databases behind one account · margin-tested capped discounts, service-fee-only · USD-first pricing · revenue-funded tranche gates · published commission schedule · merchant-of-record separation + legal review). Its seeds exist as instruments: the /account/ shell (My PROVADIA), the Nexus (B9), the flagship bridge (B10). The unified checkout does NOT exist — the till is off, by law, until its papers' checks are documented and the founder authorizes Step 2.
- **INDEPENDENTLY TESTED:** not evidenced — a compass is tested by what it steers; house revenue stands at $0, so its quality test is currently unmet by every product it governs (that is the honest reading, and the register records it rather than softening it).
- **UNBUILT:** the unified checkout · the connected account across worlds in working form · any revenue engine at all, as yet.
- **DEPENDENCIES OUTSTANDING:** the till road's own gates (legal/technical/financial checks documented; the founder's Step 2 word) · the products themselves (B11, E2, E3).
- **COMMERCIALLY READY: NO** — a compass is not a product; it is recorded here because everything above is built under it, and because its own test is the register's final standard.

---

## SUMMARY TABLE — instrument × commercially ready

| # | Instrument | Commercially ready | One-line state |
|---|---|---|---|
| A1 | THE FOUNDATION (the pour) | NO | 2 of 4 components absent (Brick #1 receipt, Charter object) |
| A2 | THE VERIFIER | NO | Founded form unbuilt; only an in-page self-check exists |
| A3 | THE FEE CARD | NO | Fee facts verified; the tool does not exist |
| A4 | THE DAY-BOOK / THE RECORD | NO | Functions + blind-verified as the town's own record; not a product |
| A5 | THE GOLDEN WALL | NO | Live and blind-verified at 0/47; Brick #1 is a founder step |
| A6 | THE BRICK LOCK | NO | Unattempted, by its own founding order |
| A7 | THE PROMISE MACHINE | NO | Unbuilt; its founding gate is a founder signature in the Charter |
| A8 | THE LIVENESS LAYER | NO | Unbuilt; rides on the unfunded anchor wallet |
| A9 | THE NIGHT BRICK + MEMO ANCHOR | PARTIAL | Records live and chained; zero anchors exist |
| A10 | THE SEVEN SECRETS | NO | Hashes live in the footer; the reveal cadence is unowned |
| A11 | THE CHARTER + STATUTES | NO | Fragments in force; the constitution object is unpublished |
| A12 | THE THREE VAULTS + PARTICIPANT RULE | PARTIAL | Ledgers ride in the Day-Book and verify in-page; the plain one-page showing is unbuilt |
| A13 | SALT | NO | Gated by its own law (~100 citizens; registry 0) — deferred, not cancelled |
| A14 | THE SIGNED CAPTAIN + OUTPOST | NO | Presence stands (Solnik); every signature instrument unbuilt |
| A15 | THE ASSEMBLY ORDER + DOOR TEST | PARTIAL | Its spirit runs as Relay Law; its name and whole-world fail rule are not in force |
| A16 | THE COVENANT KIT + LIVING COVENANT | NO | Unbuilt — last in the founding order, by design |
| B1 | THE UMBRELLA | NO | Hall's face live; the knock→build→mark→registry pipeline does not exist |
| B2 | THE TICKET | NO | Terms are law and printed; no issuance mechanism |
| B3 | THE MINT | NO | Closest in the town: film certified, page live; full-standard pass running, till off |
| B4 | THE KEEPER | NO | Live and wired; Gemini's final SHIP sign-off still owed |
| B5 | THE COIN GALAXY | NO | Architecture landed; the universe is unbuilt (0 houses) |
| B6 | GENESIS | NO | Devnet-proven 7/7 incl. a blind-caught IDOR; mainnet sealed on founder steps |
| B7 | SOLNIK | NO | Chamber live, honestly OFF WATCH; the watch itself unbuilt |
| B8 | THE RESIDENT AI ENTITY | NO | Founder directive at the brief stage (queue #58) |
| B9 | THE NEXUS | PARTIAL | Live on 15 pages, blind-verified; Telegram door sealed |
| B10 | THE TWO HOUSES | PARTIAL | Separation in force; the one ruled bridge is built and live |
| B11 | THE TOWN CATALOGUE + 380 POOL | NO | Catalogue display blind-verified; 0 of 380 products built |
| C1 | READY DEFINITION + SURFER STANDARD | PARTIAL | Standard + engine exist; no product has crossed the full bar (count: ZERO) |
| D1 | LIVING KNOWLEDGE ENGINE | NO | Design of record only |
| D2 | LIVING CIVILIZATION ENGINE | NO | Design of record only |
| D3 | LIVING VOICE ENGINE | NO | Design of record; prototype held by the founder's trigger |
| D4 | PARALLEL WORLD SIMULATION ENGINE | NO | Working prototype, one real run; validation gate ungraded (Nov 24–Dec 3) |
| D5 | LIVING MATTER ENGINE | NO | Directive + brief; deliverable not landed |
| D6 | ADVERSARIAL ENGINEERING ENGINE | NO | The practice runs nightly (Relay Law); the formal engine is design-stage |
| D7 | 3D MATTER CREATION ENGINE | NO | Tool adopted to the bench; evaluation + prototype not evidenced in this pass |
| E1 | WEB3 INTELLIGENCE + OBSERVATORY | NO | Three-seat investigation reconciled + ruled; no business built; Observatory unbuilt |
| E2 | SENTINEL | NO | Days 1–15 phase open (audit done); package design queued (#69); no customer yet |
| E3 | TOKEN FACTORY | NO | Design adopted, arithmetic corrected; legal gate unopened; maintenance tier must be re-priced |
| F1 | THE ECONOMIC MASTER VISION | NO | The compass itself; its quality test is unmet while revenue is $0 |

**The count, plainly: 39 instruments · 0 YES · 6 PARTIAL · 33 NO.** No instrument in the civilization is commercially ready today. Six function partially as instruments or infrastructure. That is not a verdict on the founding — most of the NOs are sequenced, gated, or founder-held by design — but it is the register's duty to print the count without decoration.

---

## THE GAPS PAGE — where ENVISIONED vs EXISTS diverges most

Ranked by the distance between the founded form and what a stranger would actually find today:

1. **THE VERIFIER (A2).** Founded as the town's trust engine — a stranger re-deriving our claims from raw sources, proof stored off our server. What exists checks our own file against itself, on our own page, and the Wall's data digest is verified by no code at all. The entire commercial thesis of Sentinel stands on closing this gap, and the proving-ground principle names the order: our own Wall, Record, Mint, and Galaxy first.
2. **THE PROMISE MACHINE (A7).** Founded as the Assembled World's law, with eight deadlines already running at founding. Nothing exists — and its deadlines (the Tuesday reveals, the first birthday) continue to arrive whether or not a machine records them. Its gate is not engineering; it is the founder signing its price in the Charter.
3. **THE FEE CARD (A3).** The founder's frontier pick and the only founded instrument whose primary user is a stranger checking *someone else's* coin. What exists under its name is a static page of fee facts. The tool — input, tracing, classification, plain words — is entirely unbuilt, and its founded dependency (the Verifier) is gap #1.
4. **THE FOUNDATION (A1).** The pour every other room stands on is itself half-poured: the genesis entry lives, but the receipt (Brick #1) and the Charter object do not exist, so three other instruments (A2, A5, A11) inherit their largest gaps from this one. One founder purchase and one publication close most of it.
5. **THE SIGNED CAPTAIN'S instruments (A14).** The presence survived compression; the accountability — frozen instructions, signed statements, the Daily Minute, the Challenge Gate — did not. The founding point of the design was the signature, not the face.
6. **THE UMBRELLA'S function (B1 + B2).** A principal business pillar whose hall page is live and blind-verified while its entire function — knock, build, mark, registry, ticket issuance — has no build at all. The Coin Galaxy (B5) is designed as its universe; the pipeline underneath both is the missing storey.
7. **SALT (A13).** A complete founded currency — five laws, a full War Book spec — with no ledger, no code, and (until the Register) no architectural trace. Its divergence is the most defensible on this page: the gate (~100 citizens) is its own law. It is listed because the register's founding failure mode was exactly this — a deferral that read as abandonment.
8. **THE TOKEN FACTORY (E3).** Adopted packages, corrected arithmetic, a ruled position in the sequence — and nothing functional behind any of it, with its legal gate unopened and one tier's price failing its own margin gate. The gap is honest and sequenced (Sentinel first), but the register records that today the Factory is a price list for a business that does not exist.
9. **THE LIVENESS LAYER (A8) + THE NIGHT BRICK'S anchor half (A9).** The smallest builds on this page and the oldest waiting: one founder step (fund the pennies wallet, sign) has gated the town's daily on-chain heartbeat since 2026-11-20. The records prove we are alive; nothing yet proves it on-chain.
10. **GENESIS, mainnet (B6) — the inverse gap.** The one instrument whose EXISTS nearly matches its ENVISIONED: rehearsed 7/7 on devnet with a blind-caught defect fixed and re-proven. Its gap is not engineering at all — it is three founder steps and one word. It closes this page as the control case: where the crew was allowed to build, the founded form and the built form agree.

---

*FOUNDED ASSETS REGISTER v1 — compiled 2026-11-23 (night) from the Foundational Vision Register, the Foundational Audit, the Sentinel Founded-Assets Audit, and the build records of record. This is a living document: the weekly Archive Sweep (Sundays ~17:30 CT, Archive Sweep Law) re-checks every entry against the founding documents and the build records, and reports only gaps, compressions, and stale statuses. Entries change only on evidence — a build record, a blind verdict, a receipt, or a founder ruling — never on a summary. Where this pass did not verify, it said so in the entry.*
