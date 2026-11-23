# THE MINT — FULL COST MODEL FOR ONE PILOT TRANSACTION

**Filed:** 2026-11-23 · **Status:** EVIDENCE PAPER — the evidence base for the Step 2 rehearsal's workability test (founder's Q12 condition: the model must be confirmed workable before it runs live). **It authorizes nothing**: no price change, no charge, no build follows from this paper. Ordered by the partner's review of the founder's No-Loss Rule (2026-11-23): *deducting transaction fees does not by itself prove a transaction cannot lose money — labor, support, refunds, taxes, chargebacks, and creation costs must all be in the model.* They are all in this model.

**Scope.** ONE Mint pilot transaction, end to end: from checkout, through the eight delivery steps, to the end of the 30-day support window — plus the amortized creation cost of the listing that sold it. Two revenue cases: **$50** (card · PayPal · SOL at full price) and **$40** (PROVADIA, after the flat 20% discount). Two views of cost: the **cash view** (money that actually leaves the house) and the **full-cost view** (cash plus the crew's delivery time priced at a stated shadow rate). The No-Loss Rule is tested against both, and the results differ — that difference is this paper's main finding (§8).

## How every figure is classed

- **SOURCED** — stated in the house record (the Mint Listing Standard, the founder's decisions log, the Mint Service Specification, the partner-desk BRIEF's house-measured figures). Source named.
- **[UNSOURCED — verify before use]** — a figure the record does not contain (e.g. a provider's published fee). Shown because the model needs a number, printed with this mark, and listed in §8 for verification at clearance. No decision may rest on it until verified.
- **[ASSUMPTION — to be measured in the rehearsal]** — an honest estimate where the record contains nothing (e.g. minutes per delivery step). The Step 2 rehearsal exists to replace every one of these with a measurement (§8).
- **[CLEARANCE-CHECK]** — a line whose size or existence depends on the Q1 legal/financial clearance. Carried symbolically, excluded from totals — which makes every total in this paper **optimistic**.

---

## §1 — REVENUE (what one transaction brings in)

| Case | Gross | Source |
|---|---|---|
| Card / PayPal / SOL | $50.00 | SOURCED — the pilot price (Listing Standard §4.1) |
| PROVADIA | $40.00 | SOURCED — $50 less the flat 20% PROVADIA discount (Q3; Listing Standard §4.3). The $10 forgone is a real cost of the coin rail, taken voluntarily as the town's published offer; it is named here so the $40 case is never compared to $50 as if they were the same revenue. |

The chain's own creation costs are **not** revenue and **not** a town cost: the buyer pays them from his own wallet directly to the chain (SOURCED — Listing Standard §4.4). They appear nowhere in this model except this sentence.

## §2 — TRANSACTION COSTS (cash, off the top, per the No-Loss mechanics)

Under Q13 as amended, provider and network costs come off the top first, covered by the transaction itself; only net receipts are split 80/20.

| Line | Card | PayPal | SOL | PROVADIA ($40) | Class |
|---|---|---|---|---|---|
| Provider fee | $1.75 (2.9% + $0.30 on $50) | $2.24 (3.49% + $0.49 on $50) | — | — | **[UNSOURCED — verify before use]** (providers' commonly published US rates; the record states no provider figure — verify against the actual provider terms at Q1 clearance) |
| Network cost of receipt | — | — | ~$0.01 | ~$0.01 | **[UNSOURCED — verify before use]** (Solana network fees are fractions of a cent; the buyer's own wallet pays his sending cost — whether any receipt-side cost falls on the town is a mechanics question for step 2) |
| Behind-the-counter conversion | — | — | ~$0.25 (0.5% illustrative swap cost) | ~$0.20 (0.5% illustrative, when proceeds are converted) | **[UNSOURCED — verify before use]** (the Whole House §6 conversion is designed, not operational; no rate exists in the record) |
| Price-movement exposure | — | — | small (SOL, between receipt and batch conversion) | **real and unpriced** — the town receives and holds PROVADIA by design; a −5% move between receipt and conversion is −$2.00 on this transaction | SOURCED as a design fact (Whole House §6: conversion "at receipt or in a disclosed daily batch"); size **[ASSUMPTION]** scenario, not an expected value |
| **Net receipts** | **$48.25** | **$47.76** | **≈$49.74** | **≈$39.80** (before any price movement) | arithmetic on the lines above |
| Split 80/20 on net | $38.60 / $9.65 | $38.21 / $9.55 | ≈$39.79 / ≈$9.95 | ≈$31.84 / ≈$7.96 | SOURCED mechanics (Q13 + No-Loss amendment) |

**Cash-view result so far:** on transaction costs alone, every rail is positive — the founder's amendment does exactly what it was written to do at this layer. The remaining sections are the layers it does not reach by itself.

## §3 — DELIVERY LABOR (the cost the fee-only model never sees)

The Mint is a guided human-judgment service: eight steps (Listing Standard §1.3), delivered by the town's side (the captain/crew, with the Keeper honestly OFFLINE — this time is crew time today, not a wage the house pays, and not free in any honest accounting). No step durations exist in the record; the table is the model's honest estimate, stated so the rehearsal can replace it.

| Step | Minutes [ASSUMPTION] |
|---|---|
| 1 · The Conversation | 40 |
| 2 · The Honest Question | 20 |
| 3 · The Rehearsal (guided practice run) | 50 |
| 4 · The Covenant (read in full, signed) | 15 |
| 5 · The Mark (image prepared, mint mark placed) | 45 |
| 6 · The Launch (guided, founder's hands) | 40 |
| 7 · The Record (registry + Day-Book + Passport facts) | 15 |
| 8 · The Handover (unaided-operation test) | 25 |
| **Delivery total** | **250 min ≈ 4.2 h** (honest range 3.3–4.8 h) |

**Pricing the time.** Cash view: **$0** — the crew is the house's own AI and founder-side capacity; no wage leaves the house. Full-cost view: a shadow rate must be chosen by the founder; this paper computes at an illustrative **$25/h [UNSOURCED — the founder sets the rate, or rules the time out of the model]** → **≈$104** of delivery time per transaction (range ≈$83–$120 at the same rate). Even at $15/h the line is ≈$63 — more than the entire fee.

## §4 — THE 30-DAY SUPPORT WINDOW

Full support runs from the build's start through 30 days after the birth (SOURCED — Listing Standard §7.1). Expected load per house: **[ASSUMPTION]** 3 contacts × ~12 minutes ≈ **0.6 h** → cash $0 · full-cost ≈ **$15** at the illustrative $25/h. The window's cost is small per house but certain: unlike refunds, it is not an exposure — it is a promise already made to every buyer.

## §5 — REFUND AND CHARGEBACK EXPOSURE (under the Q7 policy draft)

The fee-at-completion rule (Q12) shrinks this layer by design: before completion the town holds no fee, so cancellation, refusal, and STOPPED cases return **$0 of fee** (Refund Policy Draft §§2–4). What remains:

| Exposure | Expected cost per transaction | Class |
|---|---|---|
| Mistaken-charge returns (duplicate/wrong/post-refusal charges): rare, returned in full; the cost carried is the return's own provider/network cost | ≈$0.10–0.50 | **[ASSUMPTION]** (frequency unmeasured; mechanics SOURCED from the policy draft §5) |
| Card/PayPal **chargebacks**: a disputed payment claws back the amount **plus a provider dispute fee (~$15 [UNSOURCED — verify before use])** — and it can land **after** the 80/20 split has been accounted, which is why the policy draft's §8.2 unwinds the split proportionally | at an **[ASSUMPTION]** 0.5% dispute rate: ≈$0.33 expected value — **but the distribution is the danger, not the average**: one chargeback on a small book costs $65 against a $9.65 town-pot share per sale | rate **[ASSUMPTION]**; fee **[UNSOURCED]** |
| Crypto rails | no provider chargeback mechanism reaches a wallet-signed transfer — the buyer's own signature moves the funds, and a return is a new payment by the town (policy draft §7.3); exposure is mistaken-return costs only | a property of the rail design as the policy draft states it; the rail is **not activated** (Q6), so this is a modelling input, not an operational claim |

## §6 — TAXES AND THE LISTING'S OWN CREATION COST

**Taxes — [CLEARANCE-CHECK], carried symbolically (t), excluded from all totals.** Whether the pilot fee carries sales tax / VAT / any indirect tax in the jurisdictions the town sells into, and how the founder's 80% is taxed as income, are Q1 clearance questions. Any tax owed on a transaction is a cost of that transaction and, under the No-Loss mechanics, would come off the top before the split in the live design. **Every total below is therefore before tax and optimistic by exactly that amount.**

**Creation cost of the listing itself, amortized.** The Mint listing's film was house-measured at **20 credits** (Veo 3.1 Fast, Google Flow, Plus tier; on Ultra a film is 10 credits) — **SOURCED** (partner-desk BRIEF, house-measured 2026-11-22). The dollar value of a credit is **[UNSOURCED — verify before use]** (it rides on the founder's Google subscription, a founder cost outside this model's per-transaction frame). The crew time to build the listing — frame slicing, page, callouts, grading — is **[ASSUMPTION]** ≈6 h one-time. Amortization denominator: the service's own caps bound volume (2 starts/month → at most 24 launches in a year; SOURCED, Listing Standard §1.6). Spread over a first-year maximum of 24 launches: ≈**15 minutes of creation time per transaction** (≈$6 at the illustrative shadow rate) plus a per-launch film-credit share of under 1 credit. Small — but named, because the partner's point was that unnamed costs are how "no-loss" claims lie.

**Total time per transaction (full-cost view):** delivery 4.2 h + support 0.6 h + creation share 0.25 h ≈ **5.05 h ≈ $126 at $25/h [UNSOURCED rate]**.

## §7 — THE NET POSITION, PER RAIL, BOTH VIEWS

**Cash view** (provider/network/conversion costs + refund-dispute expected value; labor and creation time at $0; before tax):

| Case | Net receipts | Less exposure EV | **Cash net** | Verdict |
|---|---|---|---|---|
| Card $50 | $48.25 | ≈$0.33 | **≈ +$47.92** | positive |
| PayPal $50 | $47.76 | ≈$0.33 | **≈ +$47.43** | positive |
| SOL $50 | ≈$49.74 | ≈$0.10 | **≈ +$49.64** | positive |
| PROVADIA $40 | ≈$39.80 | ≈$0.10 + price movement | **≈ +$39.70 before movement** | positive, with an unpriced market exposure the other rails do not carry |

**Full-cost view** (cash view less ≈$126 of time at the illustrative $25/h shadow rate; before tax):

| Case | **Full-cost net** | Verdict |
|---|---|---|
| Card $50 | **≈ −$78** | **NEGATIVE** |
| PayPal $50 | **≈ −$79** | **NEGATIVE** |
| SOL $50 | **≈ −$76** | **NEGATIVE** |
| PROVADIA $40 | **≈ −$86** (before any price movement) | **NEGATIVE — the worst case: least revenue, same labor** |

## §8 — THE FINDING, STATED PLAINLY, AND WHAT WOULD HAVE TO CHANGE

**Finding.** The founder's No-Loss amendment proves what it was written to prove at the transaction layer: with costs off the top, **no rail loses cash on fees**. But on the full cost of actually delivering the service — the layer the partner ordered into the model — **the $50 pilot loses money on every rail, and the $40 PROVADIA case loses most.** The gap is not in the rails (the widest rail spread above is ≈$2) and not in the split. **The gap is labor: ~5 hours of guided human-judgment work priced at $50.** No rail choice fixes that; only price, scope, or a founder ruling about the time itself does:

1. **Price.** At the stated assumptions (card rail; time ≈5.05 h), break-even solves price − provider fee − time − exposure = 0, with the provider fee computed on the solved price: at the $25/h shadow rate, P − (2.9% of P + $0.30) − $126.25 − $0.33 = 0 → **break-even ≈ $131 per completed launch**; at a $15/h shadow rate, P − (2.9% of P + $0.30) − $75.75 − $0.33 = 0 → **≈ $79**. Either figure is a different product than a $50 pilot — and the founder's high-ticket direction ($100/$200/$500/$1,000 tools and offers, ruled 2026-11-15; Listing Standard §8.4) already points at that class. **[The break-even arithmetic is only as good as its ASSUMPTION and UNSOURCED inputs; the rehearsal replaces them. The workings are printed because the critic required the figure to carry its derivation.]**
2. **Scope.** The pilot's delivered scope could be narrowed to fewer guided hours (e.g. assessment + rehearsal + launch-day guidance, with the full eight-step white-glove form as the standard/higher-ticket offer). At ≈2¼ hours of **total** town time per launch (delivery narrowed, support and creation shares shrunk with it — a time line of ≈$56 at $25/h), the same equation gives break-even ≈ **$59** — near the current price. What the pilot includes is a founder scope decision; the Listing Standard currently describes the pilot against the full service, so narrowing it means amending the standard, not quietly delivering less.
3. **A ruling on the time itself.** The founder may rule that pilot delivery time is the house's own crew capacity spent deliberately — the pilot as the town's proof-of-work and front door — and that the No-Loss Rule governs **cash on transactions**, with labor governed separately (e.g. by the caps, which already bound the total hours the house can be bled: at most 2 starts a month). That ruling is honest if made in the open; what the house may not do is leave the time unnamed and call the transaction no-loss. **This paper makes no recommendation among the three; it hands the founder the numbers his ruling needs.**

**What the Step 2 rehearsal must measure (this paper's [ASSUMPTION] and [UNSOURCED] register):** minutes actually spent per delivery step (replaces §3) · support contacts per house in the window (replaces §4) · the real provider fees and dispute fees from the executed provider terms at Q1 clearance (replaces §2/§5 marks) · actual conversion cost and receipt-to-conversion movement on the crypto rails (replaces §2 marks) · the tax treatment (clears the [CLEARANCE-CHECK]) · the dollar value the founder assigns to crew time, or his ruling under option 3 (replaces the shadow rate). Until those land, every figure downstream of a mark is a placeholder wearing a label, and the workability verdict of step 2 must be read that way.

---

*Relay record (Relay Law): BUILDER — the captain's drafting seat (Muse), from the Mint Listing Standard (§§1.3, 1.6, 4, 7.1, 8.4), the founder's decisions log (Q3 · Q6 · Q12 · Q13 + the No-Loss amendment), the Refund Policy Draft (2026-11-23), THE WHOLE HOUSE §6, and the partner-desk BRIEF's house-measured film figures · CRITIC — **seat substitution, recorded openly**: the named critic kimi-k3 (Moonshot) could not sit for this deliverable — its first run died on a transport failure and the finisher's re-run returned HTTP 402 (the Ollama bench's usage credits are exhausted; topping up is the founder's step and was not improvised). The seat was filled by **deepseek-v4-pro** (DeepSeek — a different family from the builder — fresh context, the same five axes), and the substitution stands in this record permanently; the captain may re-run kimi-k3 over this paper when the bench is funded, and any new sustained finding amends it · the substitute critic returned 20 findings (several duplicates of one another): **3 claimed CRITICAL "inventions," all resolved by production of the record the critic's compressed fact sheet omitted — NOT SUSTAINED**: (F-1/F-13/F-16) the founder's high-ticket direction is attested at Listing Standard §8.4 ("the higher-ticket class the founder's standing direction names — $100/$200/$500/$1,000 tools and offers, ruled 2026-11-15") · (F-2/F-19) "Google Flow" is attested at partner-desk BRIEF.md ("Google Flow (our film studio)… the Coin Mint film cost exactly 20 credits (Veo 3.1 Fast…)") · (F-15) the paper's mandate is attested verbatim in the partner's review of 2026-11-23 ("A full cost model is needed before anyone can claim a transaction cannot lose money") — the captain's adjudication notes, however, that all three were *findable* only outside the critic's sheet, and the citations are the paper's to carry: §8 now cites §8.4 expressly · **1 SUSTAINED and fixed** — (F-10) the break-even figure did not carry its derivation, and on re-solving, two figures were wrong or unexplained: break-even is now solved with the provider fee computed on the solved price and the workings printed (**≈$131** at $25/h, not ≈$130; **≈$79** at $15/h, not ≈$82), and the scope option's break-even is restated on a stated total-time basis (**≈$59** at ≈2¼ h total, not "≈$55–60" at an unstated basis) · **1 SUSTAINED IN PART and fixed** — (F-12) the crypto row's "no chargeback mechanism exists… SOURCED" asserted more than its citation holds: the row now states the property as the policy draft states it (the buyer's own signature moves the funds; a return is a new payment by the town — policy draft §7.3) and flags the rail as not activated, a modelling input rather than an operational claim · **2 NEEDS-CHECK, resolved by production of the record — NOT SUSTAINED**: (F-3) the Whole House §6 conversion language is attested verbatim (THE WHOLE HOUSE §6; Listing Standard §5.1) · (F-6) the Refund Policy Draft §§2–4 state exactly the treatment §5 relies on (no fee charged before completion → $0 of fee returned in cancellation, refusal, and STOPPED cases) · **the remaining findings (F-4, F-5, F-7, F-8, F-9, F-11, F-14, F-17, F-18, F-20) were graded NOT SUSTAINED by the critic itself** — the provider-fee formulas are correctly marked [UNSOURCED], the tax line correctly [CLEARANCE-CHECK], the $40 split follows the No-Loss amendment, and no sentence directs the house to run a transaction in the red. Full critic output filed beside this document in the relay folder (critic_out_d4.md, with the seat-substitution note at its head).*
