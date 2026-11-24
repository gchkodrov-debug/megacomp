# THE CAPTAIN'S INDEPENDENT GUARDIAN INVESTIGATION
## PROVADIA Guardian (FVR-26 PROPOSED) — digital asset recovery, forensics & cybersecurity
### 2026-11-23 · Research only · $0 spent · nothing built, bought, tested, or deployed

**Commission:** ChatGPT's Guardian commission (desk-filed `partner-desk/REPORTS/CHATGPT_GUARDIAN_COMMISSION_2026-11-23.md`), carried by the founder 2026-11-23 23:53 CT. **Method:** four independent research seats (A: the doorway · B: the industry · C: recovery economics + legal gates · D: internal protection audit) + the coordinator's own scanner research, challenged by a different-family critic seat under Relay Law; the captain adjudicates. This matrix was built from primary evidence independently — ChatGPT's 30-item list was dispositioned against the evidence (§3.4), not adopted as structure.

**Source classes used throughout:** PUBLISHED PRICE (vendor's own page) · ADVERTISED TERMS (vendor's stated terms) · REPORTED (independent press) · CLAIMED (a company's own unaudited figures) · ESTIMATED (third-party aggregates). **Advertised terms are never earnings. Claimed success rates are never facts.**

**Critic adjudications (captain's rulings on the critic's findings):** the critic's amendments to all three candidate verdicts are ACCEPTED (see §7); its rejection of the Fee Card as a *data moat* is ACCEPTED (the tracing capability exists free elsewhere — what survives is a narrowed, honest card, §4.3); its rejection of evidence-graded reporting as a *consumer paying advantage* is ACCEPTED for consumers and NOTED as standing in a different form for the consent-based attestation service, where the grading is the service's substance (§7.2); its correction of the coordinator's ShieldFi citation is ACCEPTED as NEEDS-CHECK (search-index evidence only, page not fetched; the commoditization conclusion survives on the critic's verified set — SealGuard, Sentinacle, SolFilter, CryptoShield, Scanner.net — and is stronger for it); the OffSpec closure is recorded as REPORTED on the company's own statement as fetched by Seat A, with the critic's caveat that it could not independently retrieve the notice — the anti-recovery case does not rest on it (see A2 in §5.2, Grand's own words).

---

## §1 · THE DOORWAY, VERIFIED — Joe Grand / Grand Idea Studio

**What is documented (independent reporting):**

1. **The 43.6 BTC recovery (~$3M) — REAL.** WIRED, Kim Zetter, May 28, 2024. The owner ("Michael," anonymous, Europe) generated a 20-character password with **RoboForm in 2013** and stored it in a TrueCrypt file that later corrupted. Grand and his collaborator **Bruno** reverse-engineered the 2013 RoboForm generator and found its pseudo-random output was **seeded by the computer's date and time** — given the generation window and parameters, the password was recomputable. The flaw survived until RoboForm 7.9.14 (June 2015); Siber Systems confirmed the fix to WIRED and never told users to regenerate old passwords. Found password: generated May 15, 2013, 16:10:40 GMT. Grand **first declined the case in 2022**; other specialists had called it impossible.
2. **The Trezor recovery (~$2M) — REAL.** The Verge, Kim Zetter, Jan 24, 2022. Dan Reich's Trezor One (THETA, bought ~$50K in 2018, PIN forgotten, 12 of 16 attempts burned). The old firmware **copied PIN + seed into RAM** during update; Grand used **voltage fault injection** to defeat readout protection and extract both — ~12 weeks of work, proven first on three identical practice devices, building on Saleem Rashid's 2017 research. **Trezor had already fixed the flaw in 2017**; Reich's device was vulnerable because it ran old firmware.
3. **The pattern in both:** the wins come from **a flaw in the surrounding software or firmware — never from defeating sound cryptography.** Both flaws were already patched. The addressable flaw pool shrinks every year as devices and software update.

**What is framing (his own materials say so):**

4. **"$75 million"** = the aggregate of *identified / predicted* wallet balances across recovery requests — his Part 1 description, verbatim: *"If the predicted balances are real and if I can free them, that's $75,000,000 at stake."* His co-founder's own site says "identified roughly $75M." **Not recovered money, not earnings.** In the videos themselves: a wallet expected to hold $800,000 held **$46,000**; another's coins **had been moved out years earlier**; the largest recovery actually shown was a KeepKey at ~$2.24M.
5. **"$66 million"** = a single teased Trezor in Part 2. **No independent reporting confirms it was opened or that the balance existed.** It is a thumbnail, not evidence.
6. The only aggregate recovery claim anywhere is OffSpec's own closing statement ("tens of millions recovered") — CLAIMED, unaudited, no case list.

**The business, as it actually is:**

7. Grand Idea Studio's standing lines (his own site): engineering/licensing, hardware vulnerability research and disclosure, and **training** — six courses (hardware hacking basics 2-day, firmware extraction, defeating code protection, implants, wallet exploitation 2-day, hands-off variant). **No prices on his own site**; historical conference listings $3,500–$3,900 (Black Hat 2013); a private-delivery reseller lists his basics course from €6,900 (min. 12 learners).
8. Wallet recovery ran through a separate company, **OffSpec**, co-founded from the Reich case. **OffSpec has closed** — its own site says the chapter has closed and points onward (REPORTED on the company's own statement as fetched; a critic seat could not independently retrieve the notice and flags it for the record — see §5.2 for why the conclusion stands without it).
9. Documented limits: physical possession mandatory; legacy non-secure-element devices only in every documented case; **no source shows extraction from a modern secure-element wallet**; a device passphrase is not on the device; he turns down most requests and **cannot help scam victims at all**.

---

## §2 · THE INDUSTRY

### 2.1 Recovery firms (access recovery — every legitimate one refuses stolen-funds work)

| Firm | Terms (source class) | Notes |
|---|---|---|
| Wallet Recovery Services (since 2013) | **20% success-only** (PUBLISHED) | Pseudonymous operator ("Dave Bitcoin") — its own FAQ concedes the trust problem: once decrypted, "it would be possible for us to steal the money." ~35% success on accepted cases (REPORTED via CoinDesk). |
| KeychainX (since 2017, Zug) | **20% success-only, no upfront** (PUBLISHED) | "1,000+ clients, ~79% success" — CLAIMED, unaudited. Publishes anti-impersonation warnings ("we never use WhatsApp"). |
| ReWallet AG (Zug) | **20% success-only** (PUBLISHED) | Named team, legal imprint, PGP key — the legitimacy-stack exemplar. Air-gapped process. |
| Crypto Asset Recovery (NH, since 2017) | **20% of liquid assets** (PUBLISHED) | Named father-son team, registered LLC. Fee taken from the unlocked wallet — see §5.4 on the custody tension this creates. ~62.5% success CLAIMED. |
| Professional Crypto Recovery (US) | **18% flat** (PUBLISHED) | Undercuts the anchor slightly; US contract as differentiator. |
| Unciphered (US, since 2021) | **No published price** (REPORTED range 10–35%) | The hardware-lab outlier: proprietary tooling, Wired-documented IronKey test-drive crack (200 trillion tries, chip extraction, CT scanning). Bespoke, slow, high-value only. Offered to unlock the famous 7,002 BTC IronKey; the owner declined. |
| Datarecovery.com | Value-based, no % published (ADVERTISED) | The physical-lab moat: cleanrooms, media repair, ~30 years. States plainly that a fully unknown 12-word seed is computationally impossible to brute-force. |

**Category pattern:** 18–20% success-only, no upfront, free assessment, written contract before data moves. Anyone charging an upfront "activation / tax / release" fee matches every legitimate firm's own description of a scam.

### 2.2 Forensics & analytics (enterprise)

Chainalysis, TRM Labs, Elliptic sell **attribution** — which real-world entity controls an address — built over a decade from seizures, exchange cooperation, and law-enforcement casework. Pricing is quote-only; REPORTED/ESTIMATED anchors run **$25K–$500K/yr** (Chainalysis AWS private offers from $50K; Vendr median ~$175K). TRM reached a $1B valuation (Feb 2026). **A small entrant cannot replicate the labels or the LE trust; a graph UI is not the product.** Bitquery is the instructive exception: raw indexed chain data, self-serve at **$29–$299/mo PUBLISHED** — data alone commands two orders of magnitude less than attribution.

### 2.3 Consumer security & monitoring — free sets the ceiling

The headline jobs are **free, by public address, no wallet connection**: Revoke.cash (approvals; Premium $99/yr, Ultimate $199/yr — and per the critic's check, Premium works out to ~$0.83/wallet/mo), Etherscan's approval checker, ScamSniffer's extension, GoPlus's scanner, RugCheck (Solana token risk: mint/freeze authority, LP lock, holder concentration, insider networks — free report + free cached API), plus a long tail of free Solana wallet scanners (SealGuard — free scan, hourly-watch "Guard" at $49/yr — Sentinacle, SolFilter, CryptoShield, Scanner.net). The protection that actually addresses the dominant loss vector — **signing a malicious transaction** — lives **inside wallets** (Blockaid, Blowfish), is free to the user and B2B-paid, and both standalone paths ended in acquisition or sunset (Blowfish→Phantom 2024, Wallet Guard→Consensys, sunset 2025, Pocket Universe→Kerberus 2025). Paid consumer tiers cap at **~$10/mo** (Webacy Pro $10/mo), and the only proven ceiling-breaker is **automation** (auto-revoke), not monitoring or reporting. B2B security APIs are real money (GoPlus $199–$3,499/mo PUBLISHED tiers; ScamSniffer API from $999/mo) — sold to wallets, launchpads, and terminals that already have distribution.

**Three structural facts a small entrant must accept:** (1) the moats are data and distribution, not software; (2) in recovery, trust is the product, it is binary, and the category is scam-poisoned; (3) free tools cap consumer prices at ~$0–$10/mo — any plan priced above that must name the non-scanning outcome it sells.

---

## §3 · THE CAPTAIN'S OPPORTUNITY MATRIX

Ranked on the commission's eight criteria (demand · costs · revenue · feasibility · legal exposure · AI automation · recurring · infrastructure fit). Bands are strictly separated. Scores are the captain's, on the seats' evidence: ● strong / ◐ partial / ○ weak.

### BAND A — Immediately feasible: defensive, read-only, no licence, no custody, no live-data dependency beyond public reads

| # | Opportunity | Home | Demand | Costs | Revenue | Feasibility | Legal | Automation | Recurring | Fit |
|---|---|---|---|---|---|---|---|---|---|---|
| A1 | **OneJobKits Guardian kits** — (a) Crypto Self-Custody Estate Kit (inventory + family access instructions that never collect a seed + the device-and-papers checklist for the retroactive-death case) · (b) Wallet Security Routine Planner (delegate/approval review cadence, burner setup, signing hygiene) · (c) Scam-Loss Evidence Packet Organizer (IC3/exchange-freeze documentation templates — an information product, **not** a recovery service) · (d) Lost-Access Preparedness Kit (backup assessment as a product) | OneJobKits downloads | ◐ (category demand proven; our traffic unproven) | ● near-zero | ◐ one-time $19–$149 class | ● | ● clean | ◐ | ○ one-time | ● the store exists |
| A2 | **Free Guardian scanner + narrowed Fee Card** as funnel/credibility demo (§4) — Solana-first, launched on the town's own assets first | Interactive tool (town) | ◐ (free-tool usage is proven; conversion is not) | ◐ build + public-RPC limits | ○ none directly | ● read-only | ● clean if labels stay honest (§4.3) | ● | ○ | ● Sentinel/Fee Card foundations |
| A3 | **Guardian internal dashboard** — the scanner pointed at PROVADIA itself: the coin's authority readout, creator-fee card for our own coin, town wallet watch (Proving Ground; doubles as the §6 remediation evidence) | Crew capability | ● internal, certain | ● | ○ (it *is* the credibility) | ● | ● | ● | ○ | ● |
| A4 | **Wallet security course** (interactive, OneJobKits) — the training line, productized at consumer prices instead of Grand's €6,900 classroom | OneJobKits download/interactive | ◐ | ◐ production time | ◐ $49–$199 class | ● | ● | ◐ | ○ | ● |

### BAND B — Services requiring demonstrated competence + safeguards (gates named per item)

| # | Opportunity | Home | Demand | Costs | Revenue | Feasibility | Legal | Automation | Recurring | Fit | Gate before first sale |
|---|---|---|---|---|---|---|---|---|---|---|---|
| B1 | **Sentinel Verified Project Profile** — consent-based attestation: the project proves ownership/identity, we publish *what was proved, when, and what was NOT checked* | PROVADIA service | ◐ (cold-start paradox, §7.2) | ● crew time | ◐ one-time per profile | ● | ◐ consent flips most PI/defamation risk | ◐ | ○/◐ re-verification | ● Sentinel's founded shape | Published verification standard + revocation process; the §6 D-fixes (product #0) |
| B2 | **Creator-fee investigation reports** (the Fee Card as a paid report on third-party creators) | PROVADIA service | ◐ | ◐ | ◐ $29–$149 class unproven | ◐ narrowed ceiling (§4.3) | ○ **PI-licensing + privacy + defamation exposure on non-consenting identifiable creators** | ◐ | ○ | ● | **HELD** — per-state PI counsel opinion, published standard, E&O quote; until then, crew-performed only for consenting clients and counsel |
| B3 | **Project security monitoring** for consenting projects (authority changes, fee-claim events, treasury moves) | Subscription (B2B) | ○ unproven | ◐ infra (§7.3 COGS) | ◐ | ◐ | ◐ consent-based = manageable | ● | ● | ● | Town-first proof (A3) + one paying pilot |
| B4 | **Digital inheritance coordination** (the retroactive seam: family + device + papers) — coordination and verification only, **no key handling, no seed contact** | PROVADIA service | ◐ real seam, fraud-dense | ◐ | ◐ $199–$1,999 hypotheses | ◐ | ○ fiduciary verification burden is the highest in this report | ○ human-led | ○ | ◐ | Counsel-reviewed fiduciary-verification protocol + insurance; A1(a) kit is the demand test first |

### BAND C — Specialist laboratory / regulated / high-risk

| # | Opportunity | Verdict | The gates it would need |
|---|---|---|---|
| C1 | **Success-fee access recovery — software password cracking** (btcrecover-class tooling is open-source; competence is demonstrable on synthetic wallets) | **PARKED — not killed, not scheduled** | The full legitimacy stack (§5.3) + E&O/cyber insurance bound + counsel sign-off on CFAA posture and contracts + demonstrated competence on synthetic cases + no-custody protocol proven. Even then: Grand's own testimony (§5.2) caps expectations — this is a side-quest economics business. |
| C2 | **Hardware recovery laboratory** (fault injection, chip extraction) | **KILLED for this house** | Rare expertise, capital equipment, DMCA §1201 exposure, a shrinking legacy-flaw pool — and the doorway's own operator closed his version of it. |
| C3 | **Stolen-asset "recovery"** (marketing retrieval of scammed funds) | **KILLED outright** | Tracing ≠ retrieval; retrieval belongs to exchanges, law enforcement, and courts. Marketing it places us inside a regulator-named scam category. Tracing *reports for counsel/LE referral* survive only inside B2's gates. |
| C4 | **Deduct-and-sweep fee collection** | **KILLED** | Accepting + transmitting client value forfeits the FinCEN no-custody harbor → MSB registration + state money-transmitter licences + 18 U.S.C. §1960 exposure. |
| C5 | **Enterprise attribution/forensics platform** | **KILLED** | The moat is a decade of labels + LE trust (§2.2). Not a gap; a wall. |
| C6 | **White-label wallet security dashboard / signing-moment protection** | **KILLED for now** | The signing moment is owned by wallets with distribution we do not have; both standalone attempts were acquired or sunset. |

### 3.4 Disposition of ChatGPT's 30 (on evidence, briefly)
**Survive into this matrix:** wallet health scanner (A2, repositioned) · Fee Card report (B2, gated) · wallet protection/monitoring (B3/A3, consent + internal first) · evidence packages (A1(c) as a product; counsel-grade packages only inside B2's gates) · inheritance (A1(a) + B4) · security digital products for OneJobKits (A1/A4 — promoted to first product) · project security monitoring (B3) · token-authority data (inside A2/B3, not a standalone API until B5's pilot gate — §7.3). **Killed on evidence:** both recovery service lines as near-term offers (C1 parked / C2 killed) · transaction preview & risk warning (the signing moment is the wallets') · fake-website detector (free incumbents + browser/wallet territory) · AI cybersecurity assistant subscription (undifferentiated against free) · authorized security testing as an offer (competence not demonstrated — the Proving-Ground Principle forbids selling it first) · white-label dashboard (C6) · smart-contract risk screening as a paid standalone (RugCheck/GoPlus give it away).

---

## §4 · THE FIRST CANDIDATE, HARD-TESTED — the free Wallet Health Scanner

### 4.1 What free already gives away
On Solana: RugCheck's token report (authorities, LP lock, concentration, insider graph, score, free API). A bench of free wallet scanners (SealGuard et al.). Solscan's labeled explorer. On EVM: Revoke.cash, Etherscan's checker, GoPlus, De.Fi. **The scan itself is a commodity at $0.** Any Guardian scanner whose pitch is "we scan" is dead on arrival.

### 4.2 What public data can and cannot do (our current access: public RPC + keyless DexScreener-class APIs)
**Feasible read-only from public RPC:** balances and token accounts; SPL delegates (Solana's "approvals"); mint/freeze/update authorities on every held token; Token-2022 extension flags (permanent delegate, transfer hooks, default-frozen); transaction history and counterparty first hops; pump.fun creator-fee accrual estimates and claim transactions. **Not feasible without an attribution source we do not own:** "suspicious activity" as a *label* — that is Chainalysis-class data. V1 heuristics (fresh-wallet funding patterns, known-drainer interaction patterns we define ourselves) must be labeled HEURISTIC, with UNKNOWN as a first-class output — FVR-12 discipline is not decoration here, it is the difference between a report and a defamation (§4.4). **Monitoring at any volume exceeds public-RPC rate limits** — a provisioned endpoint (the Helius-class dependency the house already owes Pulse and the Verifier) is a real future cost, and the critic priced the valley: Developer $49/mo, Business $499/mo tiers, per-event webhook billing — at a $7–$10/mo consumer price, infra + support eat the margin until well past hobby scale.

### 4.3 The Fee Card's honest ceiling (critic's M2, adopted)
Pump.fun mechanics cap what the card may claim: creator fees accrue to **one creator vault per creator, not per coin** (per-token attribution is reconstructed, not read); since Jan 2026 fees can **split across up to 10 wallets** and coin ownership can transfer; cashback coins redirect fees to traders; the only clean on-chain events are *accrual estimate* and *claim transaction* — after a claim, funds hitting an exchange deposit address, a bridge, or a mixer **end the trace**, and "sold" cannot be distinguished from "moved." **The card's honest form: accrued ≈X · claimed Y on [date] · first hop Z · beyond that, UNKNOWN.** That is a useful, distinctive card. It is not "where the creator's fees actually went," and Guardian copy must never say it is. Nor is the tracing a data moat (Arkham Visualizer, Bubblemaps, Scanner.net trace funds free) — the card's value is single-purpose packaging and honest grading, both copyable. It is a funnel asset, not a fortress.

### 4.4 The liability nobody may skip
Publishing "scam / rug / insider" labels — or a "Verified" badge — about identifiable projects creates **defamation/trade-libel exposure on false positives** (incumbent scores demonstrably misfire: the same token scoring 96/100 risk on one surface and 1/100 on another) and **implied-endorsement exposure** when a verified project later rugs (the badge screenshot outlives the revocation). Gates, before any external label or badge: a published verification standard, a correction/revocation process, evidence retained per claim, and E&O considered. This binds A2's labels and B1's badges alike.

### 4.5 Scanner verdict
**The scanner survives — as a free funnel and credibility demo, NOT as the first product.** Its defensible core is the combination no incumbent packages together: an evidence-graded plain-language report (VERIFIED / UNVERIFIED / UNKNOWN with receipts) + the narrowed Fee Card + Sentinel's verified-profile data, presented under the Glass Machinery Law so the visitor watches the checks happen. Launched on the town's own wallets and coin first (A3), it forces the §6 fixes and proves the machinery. It has no revenue mechanism of its own and must not be sold as one. **Gate: no external security claims or marketing until §6 items 1–4 close** (internal Proving-Ground use proceeds regardless — that is how they close).

---

## §5 · THE RECOVERY BUSINESS, COLD

### 5.1 Economics
20% success-only is the verified standard (published range 8–20%, tiering *down* as wallet value rises — the work is roughly fixed, the fee is on value, so large cases are the profit engine). **No audited success-rate data exists anywhere.** The honest anchor is WRS's ~35% on *accepted* cases (reporter-relayed); KeychainX's ~79% is CLAIMED and reflects stricter intake — success rate without the rejection rate is meaningless. Expected value per accepted case at honest parameters ≈ 0.35 × 20% = **7% of average wallet value**, minus compute and expert time spent on the 65% that pay nothing. Small wallets are uneconomic by construction (20% of $200 is $40 against hours of work), so every legitimate firm runs an implicit minimum. Inquiry volume spikes with price — revenue is pro-cyclical and lumpy. And the funnel's majority is unservable on arrival: stolen-funds cases (unservable, §5.5) and fully-lost-seed cases (cryptographically unrecoverable — a 12-word phrase is 128 bits with no reset authority; Chainalysis's 2.78–3.79M stranded-BTC estimate is an upper bound that blends death, discard, and dormant holders).

### 5.2 The doorway's own verdict (stronger than any modelling)
Joe Grand, on record (Cointelegraph Magazine): *"It's not a business for the faint of heart. I would say it's not really a business for someone who honestly is looking to make a lot of money"* — recovery as a "side quest"; dozens of emails a day; "we turn down most of them," the main reason being scam victims he cannot help. The best-distributed operator in the field — fame, a YouTube funnel no entrant will match, a decade of press — describes it as a poor business, and his recovery company has closed (REPORTED, §1.8). Add the impersonation tax: Grand actively fights deepfake impersonators using his face and voice to scam the same victim pool — visibility in recovery *creates* a brand-protection cost. And demand quality: 60% of one established firm's 2021–23 inbound was scam cases it had to refuse (REPORTED). **The funnel is mostly unservable, distressed, or fraudulent — a support and reputational burden, not a pipeline.**

### 5.3 The legitimacy stack — required BEFORE case #1 (if C1 is ever unparked)
Published legal identity (entity, named principals, real address) · ownership verification before any work (signed message / ID + provenance / fiduciary documents for estates) · written contract before data moves (fee %, valuation moment, no-guarantee language, data-destruction terms) · **the no-custody rule** (never receive a full seed phrase; work on encrypted files/partials on air-gapped machines; on success the *client* receives the credential and moves their own funds) · chain-of-custody logging (hashes at intake, access log, documented return/destruction) · insurance (GL + professional E&O + cyber; bonds where licensing requires) · anti-impersonation posture from day one (one published contact channel, "we never contact you first," a verification page).

### 5.4 Legal gates (research, not legal advice)
**CFAA:** cracking a client's own file locally, with written authorization, is the strong posture (no third-party system touched); logging into a client's *hosted* account is the weak one — the system owner, not the account holder, is the authorizer (Ninth Circuit line). **DMCA §1201** is flagged for firmware circumvention (hardware extraction). **PI licensing:** pure public-chain analytics is generally unlicensed — **but** the trigger plausibly flips with the deliverable ("investigation of an identifiable person") and the *subject's* jurisdiction; a leading tracing firm publicly holds Tennessee and DC PI licences precisely because those jurisdictions treat cyber-investigative work as PI work. Per-state counsel opinion is a pre-launch gate, not a footnote. **FinCEN:** never-custody is the safe harbor; deduct-and-sweep is accepting + transmitting value → MSB + state licences + §1960. (Noted tension: at least one established firm publishes a take-it-from-the-wallet fee model — the harbor analysis says that model carries the risk regardless of who else runs it.) **FTC:** the Telemarketing Sales Rule (16 CFR 310.4(a)(3)) bars collecting recovery fees until 7 business days after delivery in its scope; UDAP substantiation governs every success-rate claim — honest numbers will look worse than competitors' invented ones, a structural marketing handicap of being legitimate here. **Estates:** an heir's say-so is not authorization; fiduciary authority (executor/trustee, RUFADAA for custodied assets) must be documented first — and RUFADAA cannot compel a lost key into existence.

### 5.5 Access ≠ stolen — the permanent separation
Recovering **access** (owner locked out) is a cryptography/forensics problem with a legitimate industry. Recovering **stolen** assets is not a private capability: tracing follows funds, but retrieval requires an exchange's process, law enforcement, or a court — the FBI states plainly that private recovery companies cannot issue seizure orders, and recovery fraud is a named, measured scam category (IC3: fictitious law firms alone took $9.9M in one year; the 2025 report counts 10,516 recovery-scam complaints / $1.4B reported, with the original-loss double-count caveat). Guardian never markets retrieval. Full stop.

### 5.6 Partnership route
No top firm publishes a partner or white-label program. The one published referral rate found anywhere: Crypto Recovers pays **10% of its service fee (≈2% of recovered value)**, from a minor firm. At 2% of rare, binary, back-loaded recoveries — in exchange for handing vulnerable victims to a third party and carrying the endorsement/reputation risk if that party misbehaves — **the referral motion is not a business line; it is a liability with a tip.** Killed as a near-term motion (critic's R4, adopted). Revisit only with a named, licensed partner under a written agreement after the legitimacy stack exists.

---

## §6 · INTERNAL PROTECTION AUDIT — the Proving-Ground leg (Seat D, records-only)

The house's *honesty* machinery is genuinely strong: a hash-chained Day-Book (6 entries, blind-verified), a Genesis devnet rehearsal that passed 7/7 *including a blind-caught IDOR fixed in the rehearsal copy*, founder's-hands fences obeyed under pressure, the SSH gate never routed around. The gaps are not conduct; they are (1) one known production defect waiting on one founder gate-flip, (2) an evidence chain whose last mile waits on small founder steps, (3) the complete absence of the boring layer. Ranked (full audit = Seat D's report):

1. **Production members-service IDOR unpatched** — `/registry/<id>` returns any member's record to any signed-in account in the production source; the fix exists and is proven in rehearsal; mitigation today is only that the production DB holds **0 members**. Port is a hard gate before member #1; deployment waits on the founder's SSH-gate flip or an hPanel paste. *Cheapest remediation in the audit: port the proven fix before the first signup, while it is still free.*
2. **Wall digest repair unreceipted** — built and proof-tested in a work tree (five variants failing closed), but its build record does not exist and the Day-Book entry anchoring it is not in the live book. *Remediation: finish the paperwork — land the coupled deploy, write the record, get the blind verdict.*
3. **Zero Memo anchors; the whole proof chain lives on the founder's own hosting** — no off-server proof pack; the standalone Verifier unbuilt. *Remediation: the founder's pennies-wallet step (waiting since 2026-11-20; 0.02 SOL ≈ 4,000 anchors) unlocks the anchor, the Liveness Layer, and the Verifier's first raw source in one move.*
4. **No documented 2FA/recovery posture for any critical account** — grep-verified absence across the record (Gmail, Workspace admin, GitHub, Shopify, Hostinger, Cloudflare, registrar). *Remediation: one founder sitting + a one-page recovery sheet (method only, no secrets). The cheapest risk reduction in this entire investigation.*
5. **Founder-wallet key management & succession undocumented** — multisig is only a future Genesis option; succession exists only as the unbuilt Liveness Layer. *Remediation: a wallet register (purpose, address, custody type, backup-location description, successor path — no secrets).*
6. **One Google identity carries the film pipeline + the Gemini seat** — the current Flow outage already blocks 5+ workstreams; Veo 3.1 leaves Flow Dec 5.
7. **No backup/restore record** for the members DB, Day-Book sources, or watch/queue state.
8. **The coin's own authority facts unfiled** — the mint/freeze authority state of our own token and the creator-fee receiving wallet are not in the record (the fee *rules* are verified; the fee *destinations* are not). *Remediation: one read-only authority inspection of our own coin, filed — the house's own Fee Card, run on the house first (A3).*
9. **PROVADIA20 rail has no confirmation step designed**; the house wallet address is unlanded.

**The critic's M1, adopted as doctrine:** a house that sells verification while its own record shows an unpatched IDOR, zero off-server anchors, and unfiled authority facts for its own coin hands its first hostile researcher the entire Guardian brand. **Closing items 1–4 is not housekeeping; it is product #0, and a hard gate before any external security claim** — which would otherwise be a UDAP problem in itself: selling protection not yet applied at home violates the Proving-Ground Principle the founder made law the same night.

---

## §7 · VERDICTS

### 7.1 Strongest first product — **the OneJobKits Guardian kits (A1), with the free scanner + Fee Card (A2) as their funnel**
The only candidate with no licence, no custody, no live-data dependency, no attribution data, no defamation surface, and no per-user COGS — built once, sold repeatedly, through a store that already exists, converting the entire industry's research into inventory. The Estate Kit productizes the one genuinely unproductized seam the research found (the retroactive-death case) as *preparation and documentation*, which is legal to sell today. Every kit buyer is a qualified lead for the scanner and, later, Sentinel verification. **Honest caveat (critic's, adopted):** the house's proven bottleneck is traffic — 394 products, $0 revenue. The kits inherit that problem. They are not magic; they are the **cheapest, fastest, legally cleanest demand test** of everything in this file. *Kill condition:* if the kits, given the store's real distribution efforts, produce no sales signal, there is no evidence a regulated, infra-heavy Guardian service would have — and Guardian's external build stops at the funnel.

### 7.2 Strongest immediate service — **Sentinel Verified Project Profiles (B1), consent-based, crew-performed**
This is Sentinel's founded shape arriving early through Guardian's door: a consenting project proves ownership/identity; we publish exactly what was proved, when, and what was not checked. Consent flips most of the PI problem (attesting a client's own submissions, not investigating a third party), shrinks the defamation surface, and the evidence-grading that failed as a *consumer paying advantage* is, here, the service's very substance. It is crew-performed verification — the services-first doctrine — and every delivery teaches what the eventual platform must automate. **Gates:** the published standard + revocation process (§4.4) and product #0 (§6) precede the first external badge. *Kill conditions:* the cold-start paradox is real (projects won't pay to be verified by a verifier nobody reads) — if the town's own first cohort (our 35 catalogue offers + Galaxy houses, verified free as the Proving Ground) does not produce inbound interest from outside projects, the paid tier does not launch.

### 7.3 Strongest long-term business — **monitoring + evidence infrastructure for projects, wallets, and communities (B3/B5) — as a contingent hypothesis, not a plan**
The money in this industry is B2B and recurring (GoPlus $199–$3,499/mo; ScamSniffer API from $999/mo), and Guardian's long-term form is the protection layer over Sentinel's verified data. But the consumer-subscription version is **killed** (the ceiling is $0.83–$10/mo and the only breaker was automation), and the B2B version faces the attribution moat and a sales cycle nobody has priced. **It survives under one hard rule: no infrastructure build without one paying pilot or a signed LOI.** No LOI, no build. On today's evidence it is potentially the biggest business here and the least proven of the three verdicts.

### 7.4 The recovery laboratory — **not built**
On Grand's own testimony, on his company's closure, on the legal stack (CFAA posture, §1201, PI patchwork, the FinCEN harbor), on scam-density, and on the funnel's unservable majority. Software access recovery (C1) is parked behind the full legitimacy stack and demonstrated synthetic competence — it may be revisited as a *practice*, never launched as a *promise*. Hardware recovery (C2) and stolen-asset retrieval (C3) are killed outright.

### 7.5 The sequence the evidence signs
**Product #0:** close §6 items 1–4 (our own house first — the Proving-Ground Principle, and the gate on every external claim) → **A1 kits + A2 free scanner/Fee Card** (demand test + funnel, town-first) → **B1 consent-based verified profiles** (first service) → **B3/B5 B2B monitoring** only on a signed pilot. Guardian lives **inside the Web3 Intelligence division as Sentinel's protection arm** — one intelligence infrastructure, two faces: Sentinel verifies, Guardian protects — not a separate universe; its presentation, when it earns one, follows the Glass Machinery Law (the visitor watches the checks happen).

*Filed as the captain's independent investigation for the reconciliation: Gemini's independent matrix and ChatGPT's challenge are the next seats. Nothing in this document authorizes spending, building, testing, or deployment.*
