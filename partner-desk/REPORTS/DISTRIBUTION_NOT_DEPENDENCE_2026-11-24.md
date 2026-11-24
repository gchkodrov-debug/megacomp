# DISTRIBUTION, NOT DEPENDENCE — EXTERNAL ECOSYSTEMS AS CHANNELS FOR PROVADIA

**Commissioned:** 2026-11-24 00:36 CT — ChatGPT's challenge to the Pi case study's "colony" verdict (`PI_NETWORK_CASE_STUDY_2026-11-24.md` §8), carried and endorsed by the founder. **Organizing frame:** ChatGPT's three-part distinction, adopted by the captain's scope note 00:53 CT — (1) OUR HOME · (2) OUR DISTRIBUTION CHANNELS · (3) OUR INDEPENDENCE — and his closing line as the test for every channel verdict: *"Build our own civilization, but never artificially limit its commercial reach."*
**Method:** three research seats (Pi terms, clause-level · the marketplace analogy · the house's own shelf pattern) + a different-family critic over the doctrine and verdicts. Public sources only, $0, no signups, no submissions, no deployment. **Status: a study for reconciliation — FVR-27 stays PROPOSED; nothing here is authorized.**

---

## §0 · THE QUESTION, RESTATED HONESTLY

The Pi case study concluded (§8.3) that a standing Pi presence is **"a colony, not a bridge"**: whatever we build there stays there — paid in Pi, authenticated by Pi, unlinkable to our houses. ChatGPT's counter: Amazon merchants remain independent businesses; developers distribute through Apple's ecosystem without surrendering their commercial identity; *distribution is not dependence*. The founder's interest, in his own words: "PROVADIA could be our home without being the only place where we sell our products."

Both sides are partly right, and this study's job is to say exactly where each one holds. The short answer, proven in §1–§2:

- **ChatGPT is right about the business.** Pi's rules, read at clause level, bind the *app*, not the business. No exclusivity or non-compete over our outside activities was found in any primary Pi source. A business may keep its home store, its currency, and its brand, and also offer a Pi-native product. The study's "colony" word, if read as a claim about the *business*, overstates the bind.
- **The study is right about the product.** Inside Pi, a product cannot carry our checkout, our currency, our customer identity, or a road home. What can exist there is not our product distributed — it is a *separate Pi-native artefact*. And the analogy breaks at exactly one point, named precisely in §2: **no major host — not Amazon, not Apple, not Google, not Steam — prohibits a seller from selling the same product elsewhere in another currency, pays the seller only in the host's own scrip, and bans the seller's own login. Pi does all three inside its container.**
- **The doctrine (§4) therefore distinguishes the two shapes and judges each channel on which shape it forces:** a *shelf* (our product, our brand, our terms, host takes a toll) versus a *severed edition* (a new product born inside the host's money and identity, with no road home). Shelves are distribution. Severed editions are not dependence either — nothing at home is surrendered — but they are not distribution of our products, and they must justify themselves as standalone products, never as marketing.

---

## §1 · PI'S EXACT REQUIREMENTS, CLAUSE-LEVEL

*Sources: Pi Network Developer Terms of Use (SocialChain, last update Jan 9, 2023 — the current Developer Console terms accepted via the console/MCP `terms_accept` step were not publicly fetchable; flagged, §1.4) · Mainnet Listing Requirements (pi-apps.github.io/community-developer-guide) · PiNet docs (pi-apps.github.io) · Platform API doc (pi-apps/pi-platform-docs) · Pi Docs (developers.minepi.com) · Pi trademark guidelines (minepi.com) · MiCA White Paper v1.1 (Oct 2025, PiBit Ltd, hosted on minepi.com).*

### 1(a) · May a business keep its own home while also offering a Pi product? — **YES, on the clauses**

No business-wide exclusivity or non-compete was found in any source read. The Pi-only rules are drafted against the **app**: inside a listed app, all transactions must be in Pi and logins must use Pi Authentication. Nothing in the Listing Requirements addresses what the same business does on its own site.

The only competition language in the Developer Terms is tied to reverse-engineering Pi's own resources, §4:

> "reverse engineer any of Our developer resources to conduct unauthorized activities, including infringing Our intellectual property or hacking any of Our systems or processes or to develop any product or service which is competitive with the Pi Network"
> — Pi Developer Terms of Use, §4 — https://socialchain.app/developer_terms/

That bars building a Pi competitor out of Pi's reverse-engineered resources. It does not bar running an independent store, site, or currency. The trademark guidelines regulate only **Pi's** marks and expressly contemplate the developer's own separate identity:

> "If your app is compatible with the Pi blockchain, you may use the Trademark Pi to truthfully specify that it does so."
> — https://minepi.com/blog/pi-trademark-usage/

The Listing Requirements likewise require the app's domain **not** to start with "pi" and not to use Pi's logo/colors — the app is expected to carry the maker's own branding, not Pi's.

**Verdict (a):** The bind is app-scoped. PROVADIA-the-business is not touched by Pi's rules; only a Pi app is. The case study blended these two questions; separated, the business question answers in ChatGPT's favor.

### 1(b) · What does the anti-funnel rule actually prohibit? — **Redirection, as a listing matter; links and brand mentions are ambiguous on the face of the text**

Framing sentence (Listing Requirements intro):

> "not simply acting as funnels to external platforms"

Operative section, headed **"Avoid Redirection to External Sites"**:

> "Apps should not redirect users to external websites, apps or services."
> "External links increase risks like phishing and scams."
> "Redirection to external services will be evaluated on a case-by-case basis, based on their absolute necessity."
> — https://pi-apps.github.io/community-developer-guide/docs/gettingStarted/mainnetListingRequirements/

What the text establishes:
- It is a **listing criterion**, not a Developer Terms clause; the stated sanction is non-listing ("If it does not, it will remain outside the Ecosystem Listing"), not termination.
- The verb is **"should not redirect,"** with an undefined case-by-case exception judged on "absolute necessity." No categories of permitted links are enumerated.

**The ambiguity, quoted rather than resolved:** the rule speaks of *redirection*; its rationale sentence speaks of *external links* generally. The text never defines whether a static, user-clicked outbound link, an in-app mention of an external brand or site, or a product page naming its maker counts as "redirection." **No primary text found addresses mentioning an external brand/site inside the app, or a product page naming its maker, at all** — that point is unverified either way, and any future Pi edition must be designed as if attribution is tolerated only in the weakest form (the maker's name as a fact of authorship), never as a path.

**PiNet — the sanctioned external exposure:**

> "Is a platform that allows anyone to browse, view and share select Pi Apps on any browser of their choice and on any device"
> "While the PiNet user may view Pi apps without logging into their Pi account, the user will be blocked from the application at the point in the application where the Pi SDK is required for interaction."
> — https://pi-apps.github.io/pi-sdk-docs/pitopics/PiNet

PiNet exposes **the app itself** — its pre-authentication content — on the open web at a `*.pinet.com` URL; interaction and payment remain walled at the `Pi.authenticate` point, which sends the user to Pi Browser. **Unverified:** no primary PiNet text found states whether a PiNet page may link *onward* to the maker's own independent site, or prohibits it. PiNet sanctions exposure of the app on the open web; it does not, in the text read, sanction an outbound hop from PiNet to an external store.

**Verdict (b):** The rule bans apps that *redirect* users out or act as funnels, judged case-by-case on an undefined "absolute necessity" standard. It does not, on its face, ban being a known maker. But it bans the one thing that would make a Pi presence *distribution*: the road from the Pi user to our home.

### 1(c) · What does the host take, and what does exit cost? — **No documented toll; the price is paid in kind, not in percent**

**Fees:** no percentage, commission, revenue share, listing fee, or Platform API fee on User-to-App payments appears in any primary source read. The only monetary charge documented is the on-chain gas fee, MiCA White Paper §H.5:

> "There is no fee in mining Pi. Gas fee of 0.01 Pi is applied to each transaction on Pi blockchain."
> — https://minepi.com/wp-content/uploads/2025/11/MiCA-Whitepaper-Pi-1.pdf

(Who bears the gas fee is not stated as a fee rule; the payment-flow docs imply the signing/sending account bears it — labelled inference, not a quoted policy.) Directory staking is not a developer fee: it is optional staking by Pioneers/businesses to boost ranking, and "the original staked amount will be returned to the users once the staked duration has ended" (Pi2Day 2025 blog). The widely circulated Ad Network / App Studio "70/30" splits come from secondary sources only — **not verified from any primary source; not relied on here.**

**Data:** the Platform API hands the developer an app-specific `uid` and, if scoped, the Pi `username` and `wallet_address` (Platform API `UserDTO`; Pi Docs scope list: `username`, `payments`, `wallet_address`, `in_app_notifications`). There is **no email scope** — and the Listing Requirements separately restrict collecting personal information such as emails or phone numbers in-app unless required for the app's functionality. The customer relationship inside Pi is Pi's.

**Exit:** Pi's side is expressly at-will — Developer Terms §4 and §16 reserve the right to "remove any Developer Applications from being accessible through Pi Platform" and to "modify or discontinue, temporarily or permanently, Pi Network (or any part thereof) with or without notice." U2A funds settle directly into the developer's own app wallet; no primary doc describes Pi holding app balances. **Could not be verified from any primary source:** a developer-initiated withdrawal/delisting procedure, any exit fee or notice period, and what happens to the app's users or their in-app entitlements on delisting.

**Verdict (c):** Pi's toll is 0% — the cheapest shelf in this study in percent, and the most expensive in kind: it takes no cut of the sale; it takes the currency the sale is denominated in, the identity the customer arrives under, and the door back home.

### 1.4 · Standing gaps (not resolved by guess)

1. The current Developer Console terms (post-Nov 2026 console, accepted via `terms_accept`) were not publicly fetchable; §1 rests on the Jan 9, 2023 Developer Terms plus current listing/docs pages.
2. Whether in-app brand mentions, maker attribution, or static outbound links count as prohibited "redirection."
3. Whether a PiNet page may link onward to the maker's own site.
4. Any Ad Network / App Studio revenue-split percentage.
5. The explicit fee-bearer rule for the 0.01 Pi gas fee.
6. Developer-initiated delisting procedure, exit cost, and post-exit treatment of users.

---

## §2 · THE ANALOGY, TESTED HONESTLY

*ChatGPT's analogy: Amazon merchants remain independent businesses; developers distribute through Apple's ecosystem without surrendering their entire commercial identity. Tested against Amazon Marketplace, Apple App Store, Google Play, and Steam. Fee figures from official fee/policy pages where available; histories from reputable reporting, labelled as such; US Apple link-out and Google fee schedules were in active litigation/approval flux at the time of the sources (late 2026) and should be re-checked before any reliance.*

### 2.1 · The four hosts, in brief

**Amazon Marketplace.** Toll: referral fee on total price — most categories **15%**, 8% consumer electronics/computers, up to 45% (Amazon Device Accessories); plus selling-plan fees ($0.99/item or $39.99/mo) and, if used, FBA fulfilment/storage/returns fees; independent analyses put the stacked take at 25–40% for FBA before ads, 50–60%+ all-in for a typical private-label seller (secondary analyses — Marketplace Pulse via Thrive; Eightx). On Amazon, Amazon's rail is mandatory — but Amazon **settles the seller in fiat** by ACH. Off Amazon, the seller is free: no exclusivity; the former contractual price-parity clause was removed in the EU in 2013 and the US in 2019 (de facto parity pressure via Buy Box/Fair Pricing is alleged in ongoing state AG litigation — allegation, not adjudication). Customer ownership: **Amazon owns the customer** — sellers receive no buyer emails; Amazon's own policy requires all customer communication through Buyer-Seller Messaging and prohibits including contact information in packaging or attempting "to move conversations outside of Amazon's messaging system"; diversion of Amazon users to another website is expressly prohibited *on Amazon*. Dependence history: fee escalation by accretion (take rising from ~one-third of a typical seller's revenue in 2016 to 50–60% by 2023, per Marketplace Pulse/Thrive); suspension with funds held under Business Solutions Agreement §2 ("withhold any payments to you for as long as we determine any related risks… persist"), with a funds appeal only after 60 days from deactivation. Exit: product, inventory and trademark are portable; **demand is not** — reviews attach to the ASIN, not the seller; rank, Buy Box history and the Brand Store die with the account.

**Apple App Store.** Toll: **30%** standard on digital goods/IAP; **15%** Small Business Program (≤$1M prior-year proceeds, from Jan 1, 2021); 15% on subscriptions after year 1; $99/yr. EU terms from Oct 1, 2026 replace the Core Technology Fee with a tiered commission set (secondary reporting of Apple's published terms). Payment rules — the most litigated in the industry, now jurisdiction-split: digital goods unlocked in-app must use IAP (Guideline 3.1.1); **physical goods are the opposite rule** — Guideline 3.1.3(e) *requires* purchase methods other than IAP (Apple Pay, card) for goods/services consumed outside the app, at 0% to Apple. US digital link-outs: after the 2021 *Epic v. Apple* injunction and the Apr 30, 2025 contempt ruling, US external-payment links are currently permitted with no Apple commission (contested — the Ninth Circuit upheld contempt but remanded on the fee question; treat as current but unstable). EU: the DMA forced alternative marketplaces/payments from Mar 2024; the Commission fined Apple €500M (Apr 23, 2025) for anti-steering breaches. Outside the app — web, other platforms — Apple has never had a rule: the same digital product may be sold in fiat, at any price. Customer ownership: Apple is merchant of record for IAP and hands over no buyer identity; Sign in with Apple may yield only a revocable private-relay address. But developers may run their own account systems and email lists with consent; what Apple historically banned was *steering IAP buyers*, and that ban is what courts and the DMA have been dismantling. Dependence history: 30% held for 12 years and cut only under litigation/regulatory pressure; Aug 2020 — *Fortnite* removed within hours of Epic enabling direct payment, Epic's developer account terminated weeks later (a court blocked collateral termination of the separate Unreal account). Exit: code, brand and direct accounts portable; ratings, search rank, featuring and Apple-billed subscriptions are not (subscribers must re-subscribe under the developer's own billing).

**Google Play.** Toll: legacy/most markets **15%** on the first $1M annual revenue, 30% above; 15% flat on subscriptions; $25 registration. US/EEA/UK from Jun 30, 2026 (per Google's own help page): restructured service+billing fees (e.g. 10%+5% on first $1M and subscriptions; 20% for external web links) — in flux under the Epic settlement process. Payment rules: Play Billing historically mandatory for digital goods; under the *Epic v. Google* injunction (jury verdict Dec 2023, upheld on appeal 2025), Google's own compliance notice states it "will not require the use of Google Play Billing" and "will not prohibit a developer from… providing a link to download the app outside the Google Play Store or link to transactions" in the US. Physical goods/real-world services were always exempt — the seller's own fiat checkout, 0% to Google. Android additionally permits sideloading and rival stores. Customer ownership: Google is merchant of record for Play Billing and does not hand over buyer emails; developers may run their own accounts, lists and web billing off-Play. Dependence history: the billing monopoly was found illegal by a jury — the regime was changed by a court, not by Google; Google's own termination text states that on account termination "the users, statistics, and ratings associated with those apps are forfeited," related accounts are permanently suspended, and no warning is required. Exit: as Apple, plus the Android mitigant — the same APK can be distributed via the developer's own site or rival stores, so exit from Play is not exit from the platform's users.

**Steam (Valve).** Toll: **30%** of net revenue up to $10M lifetime per game, 25% to $50M, 20% above (tiers from Nov 30, 2018); $100 Steam Direct fee per game, recouped at $1,000 gross. Payment rules — **the open outlier**: inside the Steam client, purchases run through Steam checkout; outside it, anything goes. Valve's own Steamworks documentation:

> "Steam Keys are a free service we provide to developers as a convenient tool to help you sell your game on other stores and at retail"
> "You should use Steam Keys to sell your game on other stores in a similar way to how you sell your game on Steam. It is important that you don't give Steam customers a worse deal than Steam Key purchasers."
> — https://partner.steamgames.com/doc/features/keys

In practice: keys sold on the developer's own store, Humble, itch.io, retail — in fiat, via the developer's own processor — pay Valve **0%** and do not count toward the revenue tiers. (A wider informal price-parity claim against Valve is pleaded in the Wolfire class action — allegation, not adjudicated; Valve's published parity rule covers Steam-key sales only.) Brand/customer: the strongest branding of the four (custom store page, developer homepage, community hub, news feed); Valve provides no buyer emails, but — unlike Amazon and Apple — **does not prohibit** diverting players to the developer's own channels, collecting emails, or retargeting there. The relationship is shared by default and ownable off-Steam. Dependence history: the 2018 tiers arrived days before the Epic Games Store launched at 12% — competitive pressure, benefiting only $10M+ titles; delisting/relationship termination exists (Insel Games, 2018, review manipulation). Exit: the lowest of the four — reviews, wishlists and hub are non-portable, but the game can already be selling simultaneously elsewhere and D2C, and retired games remain in buyers' libraries.

### 2.2 · Where the analogy holds

1. **A toll for distribution, trust and payments is normal** — 8–45% (Amazon), 15/30% (Apple), 10–30% (Google), 20–30% (Steam). A host fee, by itself, is not loss of commercial identity. ChatGPT is right about this.
2. **Unilateral rule-making is the industry default.** Fees added by accretion (Amazon 2024), compliance-shaped fees imposed then struck down (Apple's 27% link fee, the €0.50 Core Technology Fee), automated enforcement (Google's strike system) — on all four, with no seller vote.
3. **Delisting power with money at risk exists everywhere** — Amazon funds held under BSA §2; Apple's termination of Epic; Google's forfeiture text; Valve's termination of Insel.
4. **The host owns the walk-in customer everywhere.** No host hands over buyer emails from host-processed purchases. Reviews, ratings and search rank are host property in effect — non-portable on all four.
5. **Branding inside a template is real branding.** Brand Stores, product pages, Play listings, Steam pages all let the seller look like itself inside the host's frame. Pi, notably, also passes this test (§1a).

### 2.3 · Where it breaks — the precise point

The four hosts separate three things that Pi fuses:

| Test | Amazon | Apple | Google Play | Steam | Pi (listing rule) |
|---|---|---|---|---|---|
| Host settles the seller in fiat | **Yes** — ACH to bank | **Yes** | **Yes** | **Yes** | **No** — transactions in Pi only |
| Seller's own payment rail allowed somewhere for the same product | Own rail on own site | **Required** for physical goods; US digital link-out at 0% today | Physical: own rail required; US digital: alt billing/links since Oct 2025 | Own rail for all off-client and key sales | **No** |
| External links / steering to own store | Banned *on Amazon* only | Banned pre-2021; now permitted US/EU after courts/DMA | Permitted in US under injunction | Permitted; D2C encouraged via keys | **Restricted** — "should not redirect," case-by-case "absolute necessity" (§1b) |
| Same product sold elsewhere, in another currency / at another price | **Yes** — parity clause removed US 2019 | **Yes** — web/other-platform sales unrestricted | **Yes** — plus sideloading/rival stores | **Yes** — keys at 0% Valve share | Silent on a separate off-Pi business — but inside the app: no fiat, no other tokens, no link out, so no bridge from the presence to that business |
| Seller's own identity/login allowed | Yes, off-Amazon | Yes — own account system allowed | Yes | Yes | **No** — Pi Authentication only; other logins prohibited |

**The one specific way Pi's currency exclusivity is stricter than Apple's payment rules:** Apple regulates *which rail processes a sale on Apple's shelf* — and even that has been rolled back by *Epic v. Apple*, *Epic v. Google* and the EU DMA — while settling the developer in fiat and leaving the developer's off-shelf commerce, currency, pricing and identity system entirely alone. Pi's listing rule governs **the currency of the transaction itself**, and fuses it with an identity monopoly (Pi Authentication only) and a sealed door (no redirection out). The hosts claim a toll on their shelf. Pi claims the money, the login, and the exit — while charging no toll at all. Steam is the cleanest counterexample to any claim that this fusion is necessary for distribution: Valve will deliver the identical product, sold on the developer's own website, in fiat, through the developer's own processor, and take **0%** — by Valve's own documented design.

**Analogy verdict:** *"Pi is like an app store in its toll (none), review and delisting power — and stricter than all four hosts combined in its money and identity rules."* ChatGPT's analogy correctly kills any claim that using a host's shelf is surrender. It does not reach Pi, because Pi is not offering a shelf for our products; it is offering citizenship for a new one.

---

## §3 · THE HOUSE'S OWN LIVING PROOF — ONEJOBKITS ALREADY DOES THIS

*Sources: PUBLISH_CONVEYOR_LEDGER.md (store goal hidden_files) · MEMORY.md standing rulings · day log 2026-11-23. The doctrine in §4 is not imported theory; it is this pattern, written down.*

### 3.1 · The shelves

The store's ruled sync order (Website-First Law, 2026-11-14) is: **Shopify (onejobkits.com) FIRST → Gumroad → Etsy → Payhip → Whop → Ko-fi → Fourthwall → Pinterest.** WarriorPlus and Digistore24 are expressly **not** touched by the conveyor. (The ledger's original text also carried Lemon Squeezy in test mode; MEMORY.md records its permanent closure 2026-11-16 and striking from the sync order — the later ruling governs.)

State of the shelves, per the record: **Shopify 394 of 400 products ACTIVE (98.5%)** · **Gumroad 159 total / 158 published** (2026-11-23, connector-verified first-hand) · **Etsy ≈94 active** · Payhip/Whop/Ko-fi/Fourthwall legs owed behind the Gumroad conveyor (the ledger is honest that later legs lag; the order, not the completion, is the doctrine) · **WarriorPlus: both submitted offers DENIED and CLOSED, never to be resubmitted** · revenue to date **$0** — every order on record is a captain $0 test order. That last fact matters and is carried into §5: the house has proven it can *shelve* everywhere; it has not yet proven a funnel anywhere.

### 3.2 · What crosses to the shelves

The products themselves: the same files (delivery ZIPs hash-verified against source in double-test), the same titles, the same home-set prices, home-designed covers and copy — replicated per shelf under the Publish-Don't-Hold Law and the No-Defect Double-Test (a product is DONE only when live and double-test verified on the website **and** its sync legs; any defect in either pass = not shelved). The customer-facing copy states the pattern outright: "OneJobKits publishes new products on a rolling conveyor (website-first at onejobkits.com)."

### 3.3 · What never crosses

- **The home.** Every product is born at onejobkits.com first; the website is the canonical listing, the place new categories/collections are created (in the same pass, by law), and the reference every shelf copy is verified against.
- **The price.** Prices are ruled at home (captain/Gemini-ruled, per the standing price laws) and carried onto shelves — never set by a shelf.
- **The customer relationship.** Store mail is the house's (both mailboxes swept every 5 minutes under Reply-Right-Away); no shelf holds the store's customer list, and no shelf's approval gates the home listing.
- **The product's shape.** A shelf's rule reroutes the product; it never edits it. Etsy cannot list $0 products — so free products (flagship manual, magnets) **skip the Etsy leg permanently**; their doors are the website Free Library + Gumroad $0 + free legs where allowed. The product is never re-priced to please a shelf.

### 3.4 · Rejection and exit, as practiced — survivability is already proven

- **Etsy removed listing #46** — house ruling: never appeal, never relist. The product line continued; the shelf lost the product, not the reverse.
- **WarriorPlus denied both offers** (96352, 96353) as "not suiting the platform" — both CLOSED, never resubmitted; the remaining ten wait on the platform's cooldown on the house's schedule (successor run Sat Nov 28, 2026), and the Grand Opening pass/fail criteria already price in the road closing entirely (≥8/10 fit-denials = road CLOSED) without touching the store.
- **Lemon Squeezy closed permanently (2026-11-16)** — struck from the sync order; the conveyor rerouted.
- **Digistore24 is PARKED by the founder's ruling** rather than publish a home address for its legal-information page — a shelf's requirement refused on a home principle, at the cost of the shelf. The house has already once chosen independence over reach, deliberately and in writing.

**The pattern, named:** *Home first, shelves second, in a ruled order. The product, the price and the customer are born at home and never move. A shelf may refuse, remove, close or demand — the answer is always a reroute, never a rewrite. Exit from any shelf costs that shelf's audience and nothing else, because nothing else was ever given to it.*

---

## §4 · THE DISTRIBUTION DOCTRINE

*Structure: ChatGPT's three-part distinction (captain's scope note, 2026-11-24 00:53 CT). Every criterion is stated as a testable rule — a channel passes or fails on evidence, not on feel. The founder's test governs every verdict: **"Build our own civilization, but never artificially limit its commercial reach."** A FAIL below never means "never" — it means "not in this shape." And **PASS-ONLY-AS-<shape> means the shape proposed FAILED and a different shape passed** — it is a fail with a named road, not a pass with an asterisk.*

### 4.1 · OUR HOME — one definition, then tests the channel must not touch

- **H1 · Sovereign checkout (the definition gate — a house choice, stated as one, not a law of nature).** We are a house with a home, and we define *distribution* as: a product that can also be bought at home, on home terms. Home checkout today = onejobkits.com for the store and the town's own doors for PROVADIA (the till is unruled and unbuilt; nothing in this doctrine leans on it). *Gate: can a customer buy this product at home today, without the channel? If the channel is the only place it exists, it is not distribution — it is a severed edition, judged under §4.4's shape rules, not as a channel. (The critic is right that this is a taxonomy, not an evidence test — a Steam-first indie with no home store is not thereby unhealthy. It is recorded here as our definitional choice, because every later verdict depends on it and the dependence must be visible.)*
- **H2 · Home currency, home prices.** Prices are set at home, in USD (and in PROVADIA where the founder has ruled). A channel may denominate a separate edition in its own currency; it may not dictate home pricing, forbid home currency, or impose parity on home. *Test: do the channel's terms reach pricing or currency outside the channel itself? (Amazon's removed parity clause would have failed this; its alleged de facto parity is the cautionary tale — a channel can fail H2 in practice while passing on paper, so H2 is re-tested on behavior, §4.3 I5.)*
- **H3 · Home rules are never imported.** A channel's content and policy rules bind the listing on that channel only; they never change the product, the copy, or the law at home. *Test, as practiced: Etsy's no-$0 rule rerouted free products to other doors — it never repriced one (§3.3). Any channel whose compliance would require editing the home product FAILS.*

### 4.2 · OUR DISTRIBUTION CHANNELS — tests the shelf itself must pass

- **C1 · The toll is priced against measured reach.** Total toll (headline % + mandatory extras + payment costs) must be stated, and weighed against the channel's *verified* reach — defined in the smallest honest unit available (active buyers/users, with source and date), never claimed registrations. *Test: toll % written down; reach figure sourced, defined, dated. If reach cannot be measured, the channel is an experiment with a written cap (crew-days and dollars), not a pillar. The failure line, so this is a test and not data collection: **no sourced reach figure → no pillar status, ever; a channel graduates from experiment to pillar only by a founder ruling made with §5.2's three numbers in hand.** (This is the Pi funnel lesson, generalized: 60M+ claimed engaged vs ~20–32K estimated daily active wallets — the case study, §1.1/§5.2.)*
- **C2 · No exclusivity; multi-homing is permitted.** The channel may not prohibit selling the same or equivalent products elsewhere, including at home, in any currency. *Test: clause check on the channel's terms, as in §1(a).*
- **C3 · Exit is survivable.** Leaving — or being expelled — may cost the channel's own audience assets (its reviews, its rank) and nothing else: product files, IP, home listings, and the home customer list are untouched, and funds earned are not hostage beyond a stated settlement cycle — including hostage to the host's own identity/migration plumbing. *Test: name, in writing, everything that dies on exit. If anything at home dies, FAIL. If the exit procedure itself is undocumented, C3 is NEEDS-CHECK and cannot be passed on silence. (Amazon's funds-hold clause and Google's forfeiture text are the standing warnings; both are survivable for a shelf, disqualifying for a home.)*

*House practice, not a channel test (moved here on the critic's finding): **rejection is data, not damage.** A host's refusal closes that shelf for that product; it never closes the product, and it is recorded as evidence about the channel, not the product's worth — the WarriorPlus precedent: two denials, both offers closed, the store untouched, the road's closure pre-priced in the Grand Opening criteria (§3.4).*

### 4.3 · OUR INDEPENDENCE — tests on what we keep

- **I1 · Brand intact.** Our name, marks and presentation travel with the product; a channel may frame the listing, it may not rename, re-badge or white-label the product. *Test: does the customer on the channel see whose product this is? (Pi passes this test — §1a; Amazon's Brand Store passes; a white-label-only channel would fail.)*
- **I2 · The customer relationship has a home address — two prongs, kept separate because the hosts differ on exactly this.** (i) *Withholding:* if the channel does not hand over buyer identity from its own sales (true of **every** host in §2 — Amazon aliases, Apple relay, Google anonymised, Steam accounts, Pi uid), those sales are **showroom sales** for relationship purposes: welcome, counted as discovery, never foundation, and the channel may not be a flagship's sole door. (ii) *Fencing:* if the channel **prohibits** building the relationship elsewhere — bans diverting buyers, bans collecting contact details off-channel, bans steering to home — it fails independence outright, whatever else it offers. *Test: (i) can we contact this channel's buyer again without the channel's permission? (ii) does the channel forbid us from winning the relationship anywhere else? Amazon fails (ii) by written policy. Steam passes (ii) — it withholds its buyers' emails under (i) but fences nothing beyond its own counter. The distinction is the evidence; the earlier draft of this rule, which failed Steam and Amazon on one prong, was wrong and is corrected here on the critic's finding.*
- **I3 · IP unencumbered.** No channel term takes ownership of the product, a license beyond display/distribution of the listing itself, or any claim on derivatives. *Test: clause check (Pi passes on the record read — entrants/developers retain their rights; the hackathon's judging-display license is the bounded shape of acceptable).*
- **I4 · No silent dependence.** Dependence is a ratio, not a feeling: no single external channel may become the majority source of revenue or of new customers without a founder ruling that names it as such. *Test: channel share measured quarterly, from home records. Crossing 50% from one external channel triggers a founder review — not an automatic exit, a deliberate decision. (PROPOSED rule, for founder adoption at reconciliation; today every channel's share of $0 revenue is 0%, which is precisely why now is the cheap time to adopt it.)*
- **I5 · A rule change re-runs the doctrine.** Hosts change terms unilaterally (§2.2) — a channel that passed can fail. *Material* is defined: any change to fees, payment rails, linking/steering rules, data access, or termination terms (the five §2 categories). Owner: the captain. Cadence: the re-test is logged in the channel's desk record within one conveyor cycle of the host's announcement, and a channel that now fails is exited under C3 while exit is still survivable. *A re-test loop nobody watches is a wish; the watch is named here so it can be audited.*

### 4.4 · Applications — each channel against Home, Channels, Independence

**PI — standing presence, now.**
- Home: **FAILS H1/H2 as a channel for our products** — inside Pi, our checkout and our currency cannot exist at all (§1); a Pi presence cannot distribute a PROVADIA or OneJobKits product. Passes H3 (nothing at home is edited) and, at business level, C2 (§1a — no exclusivity over the business).
- Channels: C1 — toll 0%, but reach unproven in the only unit that matters (paying users; §1c, case study §5.2) → experiment-grade at best. C3 — **NEEDS-CHECK, cannot be passed**: the developer-exit procedure is undocumented (§1.4), and earnings land as Pi in a developer wallet whose convertibility runs through host-controlled KYC/migration plumbing — the "funds not hostage" clause cannot be verified. Nothing at home would die on exit, because nothing connects; that cuts both ways and is recorded, not resolved. I1 — **NEEDS-CHECK**: that the app carries the maker's own branding is affirmative (Pi's rules require the maker's domain and forbid Pi's marks, §1a); whether the maker may *say who it is* beyond name/domain is unaddressed in primary text, and a pass may not rest on silence. **I2 FAILS on both prongs** — (i) uid/username only, no buyer identity; (ii) the listing rule's restriction on redirection ("should not redirect," judged case-by-case on "absolute necessity," §1b) fences the road from a Pi user to any home relationship. In Pi's own weaker verb, not ours: the road home is the restricted act.
- **VERDICT: FAIL as distribution. PASS-ONLY-AS a genuinely standalone Pi-native artefact** — in the doctrine's plain term, a **severed edition**: born in Pi, priced in Pi, justified by its own P&L inside Pi, entered only after the artefact is proven at home (the case study's revisit conditions stand: home-proven LKE or Guardian first — "proven" defined in §5.2). On the retired word: the case study's "colony" was **wrong about what it binds — the product, not the business** (§1a) — and retiring it is a correction of scope, not a softening: the outpost-level facts the word was naming (scrip-only settlement, host-held identity, removal at will without notice, undocumented exit) are all *confirmed* by §1, and they are exactly why the severed-edition shape is the only one on the table. Not a bridge (nothing crosses), not a colony of the business (nothing at home is bound) — a severed edition, commercially cut off by the host's rules. The founder's test is honored both ways: we do not artificially limit reach — we name the only shape in which this reach exists, and we do not mistake it for distribution.

**APPLE APP STORE + GOOGLE PLAY — a future town app.**
- Home: passes H1/H2 **only if** the app is a window, not a till: content, account access, the daily act, push — with purchases completed at home (web checkout / the till when ruled). An app that sells digital goods through IAP makes Apple/Google the merchant of record for those sales and pays 15/30% for the privilege — that shape fails H1 for those products. (Physical/real-world services are exempt from IAP by rule on both stores; US digital link-out currently stands at 0% Apple commission but is contested and unstable — no home architecture may be built on it.)
- Channels: C1 — toll known (15/30% digital; 0% on the window shape); reach real but rented (store search). C3 — ratings/subscriptions non-portable; survivable for a companion, disqualifying for a home. I2 — store buyers are the store's; the app's own consented accounts are ours. I5 — this pair is the most litigated, fastest-changing rule-set in the study; re-tests will be frequent.
- **VERDICT: PASS-ONLY-AS a free companion/window app whose commerce stays home.** The app distributes *presence and habit*; the till never moves into it. Timing is FVR-27's question (citizens + a daily act first, PWA before native, per the case study §6) — this doctrine adds only the shape.

**STEAM — any future software or game-adjacent product.**
- Home: passes H1/H2 outright — the identical product may be sold at home, in fiat, through our own processor, and Valve takes 0% on those sales by its own documented design (§2.1). Channels: C1 — passes *structurally*: the 30% toll falls only on sales Steam itself delivers (key sales elsewhere cost 0%), so the toll is priced against delivered reach by construction; Steam's absolute reach figure is asserted by industry consensus but is **not** sourced/dated in this study — recorded as a C1 documentation debt, the same standard applied to Pi, and it does not change the structural pass. C2 passes (multi-homing subsidized via free keys); C3 — lowest exit cost of any host studied (reviews/wishlists die; the business doesn't). Independence: I1 strongest branding of the four; I2 under the corrected two-prong rule — (i) Steam withholds its buyers' emails, so Steam-counter sales are showroom sales for relationship purposes, exactly as on every host; (ii) Steam fences *nothing* beyond its own counter — no diversion ban, no ban on collecting emails in-game or at home — and the identical product sold at home carries the full relationship. That combination, not an exemption, is what the PASS rests on.
- **VERDICT: PASS** — the doctrine's model channel, and the standing rebuttal to any host that claims fusion of toll, money and identity is necessary. If the town ever ships software, Steam is the first shelf tested.

**AMAZON MARKETPLACE — any future physical product.**
- Home: passes H1/H2 on paper (no exclusivity since 2019; home prices are ours) with the H2 behavior warning — alleged de facto parity via Buy Box suppression is litigated, not adjudicated; I5 re-tests would be mandatory. Channels: C1 — the heaviest toll in the study (15% headline; 25–40% FBA-stacked, 50–60%+ all-in, per the named secondary analyses in §2.1 — Marketplace Pulse via Thrive; Eightx) against the largest physical-goods reach in the study; C3 — survivable for product/IP, with the funds-hold clause (BSA §2) priced in as a cash-flow risk, never a home risk. Independence: **I2 FAILS outright, on prong (ii)** — Amazon owns the customer by written policy, diversion is prohibited, off-platform contact is prohibited; prong (i) withholding is universal, prong (ii) fencing is Amazon's own choice. I1 passes via Brand Registry (trademark required).
- **VERDICT: PASS-ONLY-AS a showroom shelf for physical goods, dependence-capped under I4** — reach rented by the month, customers never ours, exit rehearsed in advance. Never a flagship's only door; never the place a product is born.

**THE EXISTING SHELVES (Gumroad · Etsy · Payhip · Whop · Ko-fi · Fourthwall · Pinterest)** are **UNSCORED**. §3 documents the *pattern of practice* the doctrine was written from (website-first, home prices, reroute-never-rewrite, rejection-as-data) — but a pattern is not a verdict, and conformity is a claim to be tested, not asserted (the critic's finding, accepted). These are also the only channels that presently matter to the store. Their formal §4 scoring — toll, data access, termination terms, exit, per shelf — is owed as a desk exercise at reconciliation, and I5 applies to them from adoption of this doctrine forward.

---

## §5 · THE STRATEGIC SHAPE — TWO YEARS OF DISTRIBUTION WITHOUT DEPENDENCE

*No build or entry below is proposed as authorized. The founder rules after reconciliation (captain + Gemini + ChatGPT). The standing calendar governs: Grand Opening Fri Nov 27, 2026 · Field Command Top 25 due Tue Dec 2 · Sentinel Days 1–15 (no-spend) · SB 553 hard bar Dec 17 · all-394 by Jan 28, 2027.*

### 5.1 · The shape in one paragraph

**Products are born portable; channels are shelves, never the shop.** Every product is born at home with shelf-ready assets (files, cover, copy, price) so that entering a new channel is a shelving day, not a rebuild — the conveyor already works this way (§3). Expansion then runs in three movements, each gated by receipts, not enthusiasm: finish the shelves already owed → instrument the truth about channels (share, source, conversion) → open new channels one at a time, each under a written §4 test, each reversible. The mirror image matters as much as the expansion: **the same doctrine, inverted, is the standard our own Galaxy must meet for the houses we admit** — Umbrella V2 already rules houses keep 100%, no tithe (§3's pattern, FVR-01/FVR-12). A civilization that demands sovereign terms from its hosts and offers dependent terms to its own houses would fail its own doctrine; ours, as founded, passes its own tests — which is, at minimum, a coherence no shelf we sit on currently offers us in full.

### 5.2 · The movements

**Movement 1 — Finish what is already distribution (now → Jan 28, 2027).** No new channels. The owed sync legs (Etsy/Payhip/Whop/Ko-fi/Fourthwall/Pinterest behind the Gumroad conveyor) are completed in the ruled order as Field Command marches to all-394. Cost: conveyor labor already scheduled. Yield: every product present on every passing shelf before a single new door is considered. This movement *is* the founder's test applied at home scale: reach we already own the rights to, currently uncollected.

**Movement 2 — Instrument the truth (with Movement 1, near-zero marginal cost).** Every channel gets three numbers, kept at home: share of revenue, share of new customers, and cost-to-serve (crew-hours per channel per month). Buyer-source tagging at home checkout and in store mail ("where did you find us?") converts channel claims into channel evidence — C1 and I4 become arithmetic instead of argument. Gate to Movement 3: one full quarter of these numbers, or first genuine revenue + 90 days, whichever is later. **Honest ledger entry: revenue is $0 today.** Distribution expansion before home receipts would multiply shelves for an unproven funnel — Pi's exact failure, run in miniature (case study F-8). The sequence is receipts first, reach second, and this study's doctrine is what makes the second step safe when it comes.

**Movement 3 — Embassies, one at a time (Year 2, each founder-ruled).** Stated on its face, per the critic: **every candidate below is conditional on a product class the house does not yet sell** — no software product, no app, no physical goods exist today. This movement is a map of doors, not a plan to walk through them. Candidates in doctrine order: (i) **Steam**, if a software product exists — PASS today, first shelf tested; (ii) **app-store companion**, when FVR-27's citizens + daily act exist — PASS-ONLY-AS window; (iii) **a Pi-native artefact**, only if a home-proven LKE or Guardian edition justifies a standalone Pi edition on its own in-Pi P&L — PASS-ONLY-AS severed edition; "home-proven" means a home version with genuine users and receipts at home (at $0 revenue, that gate is currently met by nothing, and it is not to be quietly redefined); the hackathon question (feasibility study, FEASIBLE-ONLY-IF, KYC kill date Dec 15) remains a separate, time-boxed decision that this doctrine does not pre-judge; (iv) **Amazon**, only if a physical product exists — PASS-ONLY-AS showroom. Each entry is preceded by the written §4 test for that channel, an exit rehearsal (C3: what dies, written before anything is listed), and an I4 share cap set in advance. And the honest scope note: Movements 1–2 and the I4 rule are this study's whole actionable yield for the founder today; Movement 3 is vocabulary and gates for a future that must first be earned at home.

### 5.3 · The honest cost/risk ledger

| Cost / risk | Size | Mitigation in the doctrine |
|---|---|---|
| Listing + maintenance labor per channel | Real and recurring; the conveyor's owed legs already prove it is the binding constraint, not fees | Movement 1 before any new channel; C1 counts crew-hours as toll |
| Support surface multiplies (each shelf = another inbox, another policy) | Grows linearly with shelves | Home mail law already sweeps platform notification centers; new channel = new sweep added in the same pass |
| Rule-change whiplash (Apple/Google change fastest; Pi's terms reserve at-will removal) | Unavoidable | I5 re-tests; C3 keeps exit survivable at all times |
| Dependence creep (a winning shelf quietly becomes the business) | The central risk of the whole strategy | I4's 50% founder-review trigger, adopted while every share is 0% |
| Attention taken from the standing calendar | The December calendar is the densest of the year | Movements 2–3 are gated behind receipts and dates, not enthusiasm; nothing in this study asks for a December build |
| Mistaking a severed edition for distribution (the Pi trap) | Named, priced, and shaped in §4.4 | H1's test is mechanical: if it can't be bought at home, it isn't distribution |

### 5.4 · What this study changes, and what it does not

It **refines** the case study's §8 verdict: "colony" was wrong about *what it binds* — the product, not the business (§1a) — and the correct taxonomy is *shelf* vs *severed edition*; Pi offers only the second. It **adopts** ChatGPT's distinction and his closing test as the doctrine's frame. It **confirms** the case study's operative recommendation (no standing Pi presence now; revisit on a home-proven artefact) while changing its reason: not because Pi would colonize us — §1 shows it cannot touch the business — but because Pi cannot *distribute* us, and an island shop must earn its place as a product, in its own time. It does **not** found FVR-27, authorize any entry, or move any date. Gemini's independence on FVR-27 is preserved — he has not been shown this study's verdicts, per the standing reconciliation order.

---

## SOURCES (primary first)

- Pi Developer Terms of Use — https://socialchain.app/developer_terms/ · Mainnet Listing Requirements — https://pi-apps.github.io/community-developer-guide/docs/gettingStarted/mainnetListingRequirements/ · PiNet — https://pi-apps.github.io/pi-sdk-docs/pitopics/PiNet · Platform API — https://raw.githubusercontent.com/pi-apps/pi-platform-docs/master/platform_API.md · Pi Docs — https://developers.minepi.com/docs/build-first-app/BuildAnApp · Trademark guidelines — https://minepi.com/blog/pi-trademark-usage/ · Pi2Day 2025 — https://minepi.com/blog/pi2day2025/ · MiCA White Paper v1.1 — https://minepi.com/wp-content/uploads/2025/11/MiCA-Whitepaper-Pi-1.pdf
- Amazon: sell.amazon.com/pricing (via fee summaries checked Nov 2026) · Seller Central policies (Buyer-Seller Messaging; prohibited diversion, via sellerlabs.com guidance quoting policy) · Business Solutions Agreement §2 (via reinstate.io funds analysis) · price-parity removal — techcrunch.com (2019) · fee-accretion analyses — thrive3pl.com; eightx.co · Arizona AG parity litigation — hbsslaw.com.
- Apple: App Store Small Business Program — apple.com/newsroom (2020-11) · App Review Guidelines 3.1.1/3.1.3(e) (via newly.app guideline text) · user privacy — developer.apple.com/app-store/user-privacy-and-data-use/ · Epic contempt/link-out state — forasoft.com; gamesbeat.com · EU DMA fine and Oct 2026 terms — betanews.com; computerworld.com.
- Google Play: fee schedule — support.google.com/googleplay/android-developer/answer/112622 · Epic injunction compliance — support.google.com/googleplay/android-developer/answer/15582165 · termination forfeiture text — support.google.com/googleplay/android-developer/answer/9023898 · futura.law (verdict/injunction).
- Steam: Steamworks keys documentation — partner.steamgames.com/doc/features/keys · revenue-share tiers — gamestats.ai; immutable.com; datapointnews.com · Insel termination — pcgamer.com · Wolfire allegation — via news.ycombinator.com summary of the filing (allegation, not adjudicated).
- House record: `PUBLISH_CONVEYOR_LEDGER.md` (store goal hidden_files) · `MEMORY.md` (Website-First Law 2026-11-14; Lemon Squeezy closure 2026-11-16; Digistore24 parked ruling 2026-11-16; WarriorPlus state) · day log 2026-11-23 (Gumroad 159/158 first-hand) · Everything Pass index (website-first copy).

*Relay record: research seats A (Pi clauses) · B (analogy) · C (house pattern + workspace addendum) · critic seat Kimi K3 (different family), whose findings were adjudicated into this text: CONFIRMED and applied — I2 rewritten as two prongs and Steam re-graded under it (PASS stands, on the fencing distinction, not an exemption) · Pi I1 downgraded to NEEDS-CHECK · Pi C3 NEEDS-CHECK (exit undocumented; earnings' convertibility runs through host KYC/migration plumbing) · "prohibited act" re-anchored to Pi's own "should not redirect" · H1 relabelled a definition gate · C4 moved to house practice · C1 given a failure line (no sourced reach → no pillar) · I5 given an owner, a definition of material, and a cadence · existing shelves marked UNSCORED · "island shop" replaced by the plain term *severed edition* · the §5.1 competitor slogan struck (no competitor evidence exists in this study) · Movement 3 labelled conditional on product classes the house does not yet sell. REJECTED by the captain, with reason: the critic's charge that the Pi verdict is mere vocabulary-laundering — the operative recommendation is unchanged but its *reason* changed on clause evidence (§1a: no business-level bind exists), and the severed-edition shape is a genuinely different commercial object from the store-distribution shape the case study was asked about; the taxonomy correction is substantive, and §5.4 records it as such. This file is the post-critic text.*
