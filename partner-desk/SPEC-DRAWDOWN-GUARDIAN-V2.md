# DRAWDOWN GUARDIAN CALCULATOR — SPEC v2.1 (captain, 2026-11-15)

Supersedes v1. Changes fold in DeepSeek's Job 1 audit (4 blockers, 2 should-fixes, 3 notes — all accepted by the captain after spot-check) and the v2.1 amendments from DeepSeek's Job 3 confirmation audit (all 9 Job 1 findings verified RESOLVED; 2 new should-fixes N-1/N-2 folded into the low-room rule). The builder (ChatGPT, via Codex) builds to THIS spec. DeepSeek audits the built prototype's math on delivery.

## Product home
- Family: Kit #1 Prop Firm Challenge Tracker (Standard $39 / Pro $69) + the FREE flagship manual "Drawdown Guardian — The Funded Trader's Records Field Manual" (live: Shopify + Gumroad /l/jkrux).
- The manual's core teaching: there are TWO limits (daily and total) "and the smaller room is your real room." The calculator computes the rooms. Records/organisation only — NOT financial advice, NOT a strategy, NO promise about any challenge outcome, NO firm-specific compliance claims. Rule models are generic and user-configured from the user's own firm documents.

## Inputs (all user-entered, nothing collected, nothing leaves the page)
1. Account size / starting balance S (USD, > 0)
2. Current balance B
3. Current equity E (optional in Free; see equity rule below)
4. Peak balance P (highest balance since start; used only by trailing models; if blank, P = max(S, B))
5. Daily loss limit: value + unit (% or fixed $)
6. Daily limit SIZE basis: [starting balance S | the daily floor basis value] — default S
7. Daily limit FLOOR basis: [starting balance S | balance at day start D | equity] — default D when D is provided, else S
8. Balance at day start D (required when the daily floor basis = day start)
9. Total loss limit: value + unit (% or fixed $)
10. Total limit SIZE basis: [starting balance S | the total floor basis value] — default S (the industry norm: size fixed at purchase)
11. Total limit FLOOR model: [static off S | trailing on peak balance P | trailing on peak equity]
12. Open-P&L counting: [intraday (equity counts now) | end-of-day (balance only)]

## The two-question rule (Job 1, Blocker 1 — the heart of v2)
For EVERY limit, size and floor are INDEPENDENT choices:
- `limit_size = fixed $` if the user entered a $ amount; else `% × S` if size basis = S; else `% × basis_value` if size basis = basis.
- `F_daily = daily_basis_value − daily_limit_size`, where daily_basis_value is S, D, or E per the floor basis.
- `F_total = S − total_limit_size` (static) or `P − total_limit_size` (trailing; P = peak balance or peak equity per the floor model).

## Calculations
- Working value W = E if intraday counting, else B.
- Total room: R_total = W − F_total. Daily room: R_daily = W − F_daily.
- REAL ROOM: R = min(R_daily, R_total). The manual's headline number.
- Room used % (Job 1, Blocker 2): ALWAYS computed, never conditioned, never clamped:
  - daily_used% = (daily_basis_value − W) / daily_limit_size × 100
  - total_used% = (total_basis_value − W) / total_limit_size × 100, where total_basis_value is the ACTIVE floor basis (S static, P trailing — Job 1, Blocker 4).
  - Negative = in profit. 0 = at basis. >100% = breached. Display: one decimal place, round half-up, computed from unrounded values (Job 1, Note 7).

## Status (descriptive arithmetic only — no advice wording; "you should stop" is banned)
- Breach attribution (Job 1, Blocker 3) — min() never names the culprit; the status does:
  - R_daily <= 0 AND R_total <= 0 → "BREACHED — both daily and total floors exceeded."
  - R_daily <= 0 only → "BREACHED — daily floor exceeded."
  - R_total <= 0 only → "BREACHED — total floor exceeded."
- Low-room state: "the smaller limit size" means `min(daily_limit_size, total_limit_size)` AFTER both limits are resolved to dollars (v2.1 amendment, DeepSeek Job 3 N-1). When not breached and R <= 25% of the smaller limit size, show the low-room label WITH the number AND the binding limit named (v2.1 amendment, Job 3 N-2 — the % is R ÷ smaller limit size, a third quantity distinct from either room-used%): "Real room is X% of the smaller limit — the daily limit ($5,000)." (or "the total limit", as applies).
  - ⚠️ LABEL TEXT IS GEORGE'S OPEN RULING (Job 1, Note 9): candidates "LOW ROOM" (DeepSeek's neutral recommendation) vs "CAUTION" (v1). Build the label as ONE named constant, default "LOW ROOM"; the captain swaps it if George rules otherwise. Do not hard-code it in more than one place.
- Otherwise: "WITHIN LIMITS."

## Edge cases that must behave sanely
- Reject at input, with plain messages: S <= 0; any limit whose resulting limit_size <= 0 → "Limit must be greater than zero." (Job 1, Blocker 2B — this also kills the division-by-zero.)
- Limit >= 100%: allowed, with the arithmetic note shown — for daily: "Daily floor is $0 — any loss from basis is a breach." (Job 1, Note 8.)
- Trailing with P < S (Job 1, Blocker 4): floor uses P as given. If P < total_limit_size then F_total < 0: the account is in breach — SHOW it. Display R_total as computed and add the plain note "Trailing floor is below zero: $X." Never clamp, never silently substitute S for P.
- Equity blank (Job 1, Should-fix 5): W defaults to B, but the page shows the visible note "Equity not entered — using balance. Open trades may reduce real room." In Pro tier with intraday counting selected, E is REQUIRED (no silent default).
- B or E at/below a floor: breach state; negative rooms shown as negative, never clamped.
- Rounding: money to cents, round half-up; floors and rooms computed from unrounded intermediates, displayed rounded.
- New-day button (Job 1, Should-fix 6): sets D = B (balance at that moment), recomputes F_daily = D − daily_limit_size, resets daily room-used% to 0. It must NOT touch total floor, total room, or total room-used%. No clock magic in v2.

## Build shape (ChatGPT builds the prototype to this spec)
- One self-contained offline HTML file. No network calls, no analytics, no data collection. Optional localStorage for the user's own inputs on their own device (Pro tier).
- OneJobKits branding: deep green #004C3F primary, accent #95BF47, clean sans.
- Free tier: one account, static + trailing total, daily room, real room, status, equity note.
- Pro tier (ships with Kit #1 Pro $69): multiple saved profiles/phases, intraday vs EOD switch with required-equity rule, printable daily sheet.
- QA cases to ship WITH the prototype (from DeepSeek's audit): (a) size-basis S vs basis on the same numbers giving different floors; (b) W above basis → negative used%; (c) both floors crossed → both named; (d) trailing P < limit_size → negative floor shown with note; (e) limit 0 rejected; (f) equity blank → note visible; (g) new-day leaves total untouched.

— Muse, captain · 2026-11-15 · v2 folds DeepSeek Job 1 in full; George's label ruling pending.
