# PI NEXT HACKATHON 2026 — FEASIBILITY ASSESSMENT

**Commissioned:** 2026-11-24 00:06 CT (founder) · **Assessed:** 2026-11-24 · **Spend:** $0 · **No signup, no account, no submission made — assessment only.**
**Deadline in question:** Tuesday, January 5, 2027, 11:59 PM PST (Jan 6, 07:59 UTC / 01:59 AM CST) — **42 days from today.**

## VERDICT: **FEASIBLE-ONLY-IF**

Enter **only** with the Living Knowledge Engine learning app, only under the conditions in §5. The OneJobKits commerce entry is **NOT FEASIBLE** (Pi's own listing rules break its commercial logic). The Guardian entry is feasible only in its SoloHost shape and only as an optional second entry. The cash expected value does **not** justify entering; the only honest justification is strategic — first-hand Pi-platform competence and ecosystem presence feeding the founder's Pi case study and the proposed Living Citizenship Engine.

---

## 0. THE FIGURES, VERIFIED

| Claim | Verdict | Source |
|---|---|---|
| $200,000 USDT total pool | ✅ Confirmed | Official Pi Next page, minepi.com/pi-next |
| 1st place judges' prize $25,000 | ✅ Confirmed (Judges' Pick pool is $50,000 total: 25K / 15K / 10K) | Official Pi Next page |
| Community Engagement Awards $150,000 | ✅ Confirmed — awarded to **up to 2 teams**; **per-team split is NOT specified anywhere public** | Official Pi Next page; rules summary |
| Up to 20M Pi marketing support | ✅ Confirmed with a correction: it is the **App Growth Initiative** — Pi Foundation pays **Pi rewards to eligible users** for using/inviting others to new apps. It is **not cash or Pi paid to the developer**. At ~$0.0526/Pi (Nov 22, 2026) the entire 20M Pi budget across all eligible apps is ≈ $1.05M nominal, in a token ~98% below its Feb 2025 peak | Official Pi Next page; founder's price figures |
| Up to 3 applications per entrant | ✅ Confirmed (Mainnet Pi Apps and/or SoloHost Apps) | Official developers.minepi.com register page; rules summary |
| Deadline Jan 5, 2027 | ✅ Confirmed — 11:59 PM **PST** | Official Pi Next page |
| Theme | Open-ended; the edition is explicitly framed as **"Build Apps on Pi With AI Agents"** — AI-agent-built apps are courted, not merely tolerated | Official Pi Next page headline |

**Source limitation, stated plainly:** the full 22-clause rules text is only shown inside the registration flow (agreed to in the Developer Web Console). This assessment relies on (1) the official Pi Next page, (2) official Pi Docs (Mainnet Listing Requirements, Build an App), and (3) OrbitWatch's clause-by-clause plain-language summary of the full rules (an independent Pi-ecosystem observatory that read the rules at registration). IP/prize clauses below are therefore **summarized, not verbatim**; before any actual entry, the founder should read the in-console rules himself.

---

## 1. ELIGIBILITY — could we enter as we are?

**Yes, with one structural fact and one founder-step dependency.**

- **Who may enter:** developers, teams, **businesses and startups**, worldwide. Individuals or teams; no maximum team size. Participants must be **18+** at registration. Organizer (Pi Community Company / Pi Foundation) insiders and their households are excluded. Previously *winning* projects cannot be resubmitted as the same project. [Official register page; rules summary]
- **Geography:** no published country exclusion list. The rules put the burden on the participant to confirm participation is legal under their **local laws**. Nothing public bars a US entrant. [Rules summary]
- **The structural fact:** every registration is tied to a **personal Pi account** — "Sign in with Pi" through Pi Browser — and **every team member must register individually**; one account per person, and multi-accounting means disqualification plus indefinite termination. Our crew is AI; AI agents cannot hold Pi accounts or register. **The entrant of record is therefore George personally, effectively a solo entry whose software is AI-built** — which this hackathon unusually welcomes (its headline is building with AI agents; the Developer Console supports AI coding agents via MCP; the SoloHost packaging skill officially targets Claude Code, Cursor and Codex). [Official Pi Next page; rules summary; official Pi blog]
- **The KYC gate (the real eligibility hurdle):** the hackathon rules themselves do **not** mention KYC. But judging criterion #1 is alignment with the **Mainnet Listing Guidelines**, and the official Mainnet Listing Requirements state: **"Developers must complete KYC to verify their identity before submitting an application to list."** A Mainnet entry therefore needs George's Pi KYC completed — his identity documents, his hands only, elapsed time in Pi's validator queue and outside our control. George appears to already hold a Pi account (his own app screenshots accompany this commission); his **KYC status is unknown** and is the first thing to establish. Winners must also provide documents within **14 days** of the organizer's request or risk disqualification — a payout-stage identity/tax step, again George's hands. [Official Mainnet Listing Requirements, developers.minepi.com; rules summary]
- **Ambiguity flagged:** whether an entry must be fully **listed** in the Mainnet Ecosystem Interface by Jan 5, or registered/deployed as a Mainnet app and submitted through the console, is not spelled out on the public page. The 2025 precedent cuts toward substance: Pi described that field as "over 215 completed Mainnet apps submitted" that "met ecosystem requirements." Listing review timing sits with the Pi Core Team — **this is the single largest execution risk** (see §5 kill-conditions). [Official Pi Next page; Pi 2025 year-end blog]

---

## 2. TECHNICAL REQUIREMENTS — what an entry must BE, and what each candidate costs

There are **two build paths**. Both submit through the Developer Web Console by the same deadline.

### Path A — Pi App (web app in Pi Browser)
- A standard web app (any framework) hosted on **our own public HTTPS URL**, loaded in the Pi Browser WebView. [Official Pi developer guide; Pi Docs]
- **Pi JS SDK mandatory** (`sdk.minepi.com/pi-sdk.js`, `Pi.init`), with **Pi Authentication** for login. Server-side identity verification via the Platform API with a Server API Key. [Pi Docs, "Build an App"]
- **Pi payments**, if the app transacts: frontend `Pi.createPayment` → **server-side approval** → user signs in Pi Wallet → **server-side completion**. A real backend is required; there is no frontend-only payment path. Subscription smart contracts exist **only on Testnet** today. [Pi Docs; official Pi Next page]
- The app's network (Mainnet/Testnet) is chosen **at registration and cannot be changed**. [Pi developer guide]
- **Mainnet Listing Requirements (judging criterion #1)** — the constraints that decide our candidates:
  - **Pi Authentication ONLY** — email or third-party logins are **prohibited**.
  - **Pi-ONLY transactions** — "All transactions must be conducted in Pi, with **no support for non-Pi Tokens or fiat currencies**."
  - **No funnels / no external redirection** — the Ecosystem "prioritizes apps that contribute meaningfully… **not simply acting as funnels to external platforms**"; redirecting users to external sites/services is prohibited outside case-by-case necessity.
  - Domain/URL must **not start with "pi"**; Pi trademark guidelines govern the logo; **minimal data collection** only; fully functional app with a professional UI. [Official Mainnet Listing Requirements]
- **Every submission must also include:** English name, trademark-compliant logo, accurate English description, preview images, **PiNet integration** (PiNet exposes part of the app on the regular web — the one sanctioned bridge out of the walled garden), a **privacy policy**, team-member list, and a **public demo video ≤ 3 minutes** covering the app, its users, the problem, and how Pi is part of the experience. An optional **midpoint submission** (date not public; emailed to registrants) offers feedback and visibility. [Official Pi Next page]

### Path B — SoloHost App (self-hosted desktop app)
- Package an existing app as a **public Docker image**; Pi's official AI skill generates and validates the two config files (`docker-compose.yml`, `config_options.yml`); publish through **SoloHost on Pi Desktop**; users discover, install and run it **on their own computers**. Permissionless publisher flow with structural checks rather than a full pre-publish review. **No Pi spend or holding is required to prepare a package.** Reach: **420,000+ Pi Nodes** / Pi Desktop users. [Official Pi blog, developer updates Oct 29, 2026]
- SoloHost apps "must meet the same standards of quality, functionality, and utility as Pi apps, but are subject to **different listing requirements**" — the Pi-only-transactions / Pi-Auth-only listing rules above are Mainnet Ecosystem Interface rules; the public material does not state that they bind SoloHost in the same way. Flagged as **ambiguous**, leaning favorable. Submission still goes through the Developer Web Console with the SoloHost App ID. [Official Pi Next page]

### Cost per candidate (crew-days, build only; excludes George's KYC elapsed time)

| Candidate | Shape | Estimate | Notes |
|---|---|---|---|
| **(a) Guardian-class wallet-health tool** | As a **Pi App**: must be reframed as a *Pi-ecosystem* wallet-safety checker (public Pi blockchain/explorer data, read-only) + Pi Auth + PiNet + assets + video | **6–10 crew-days** | Technically easy; **judging fit is the problem** (§3). A Solana/PROVADIA-shaped Guardian has near-zero "Pi utility" alignment, a named judging criterion. |
| | As a **SoloHost** package: the read-only checker as a local Docker service + SoloHost packaging | **4–7 crew-days** | Best technical fit for a self-hosted security tool; audience is desktop node operators, not the 60M mobile crowd. |
| **(b) Living Knowledge Engine learning app** | Pi App: web learning app, Pi Auth login, progress/achievements, return-visit lesson mechanics; optional Pi payments for a premium tier (server approval/completion flow) | **10–15 crew-days** | Content and designs already exist in-house (LKE v1.0 design landed). Strongest judging fit: education + retention is exactly what the criteria reward, and Pi's own summit showcased AI/education. |
| **(c) OneJobKits commerce app** | Pi App: a **Pi-only** storefront subset — catalogue, Pi-payments checkout, in-app digital delivery (no external redirects allowed), its own backend | **12–20 crew-days** | **Disqualified on rules, not effort** — see §3. |

Common groundwork for any Pi App: console registration, SDK learning curve, hosting/domain setup, PiNet, privacy policy, demo video, listing assets ≈ **2–3 crew-days**, shared across candidates. Pi App Studio's no-code path exists (51,800 Pioneers created apps in 2025; 13,400 chatbot + 24,400 custom apps published) — it lowers the floor for everyone, which raises the quality bar at the top; we would build custom regardless. [Pi 2025 year-end blog]

---

## 3. RULES + RIGHTS — and where they collide with house law

- **Judging criteria (Judges' Pick):** alignment with the Mainnet Listing Guidelines · Pi utility and alignment with community/ecosystem needs · technical completeness and innovation · UI/UX, accessibility, ease of navigation · long-term utility on Pi Mainnet · uniqueness. **Community Engagement Awards:** judges' evaluation + **real user engagement, retention, and community traction**. [Official Pi Next page]
- **IP:** "Participants **retain all rights** to their winning applications." The **PiOS license is "strongly encouraged" but not mandatory**. Entrants grant the organizer/Pi Foundation an **unrestricted license for the purpose of verifying and judging** the submission, **waive infringement claims** against the organizer for its own similar existing/future projects, and declare the work contains no third-party IP/trade secrets and is unencumbered by employer claims (with an indemnity to the organizer). The organizer may **publicly display** names, submissions, descriptions, images and demo videos, and use winners' **name, address and likeness for promotion without compensation**. [Rules summary — summarized, not verbatim, per §0]
- **Prizes:** paid in **USDT only** (no fiat). Winners announced through official Pi channels **after the hackathon concludes — no announcement or payment date is published**. The organizer may decide **no winners** are selected, and may **modify or cancel the hackathon, or change deadlines, with or without cause and with or without notice**; judging is final and binding. OrbitWatch also flags an internal inconsistency in the rules (Clause 17 says prizes in USDT; Clause 16 carries leftover "on a Pi basis / in any given month" language) — precedence is **ambiguous on the public record**. [Rules summary]
- **Conflicts with house law:**
  1. **Commerce candidate vs Pi-only transactions + anti-funnel rules — FATAL.** A OneJobKits app inside Pi cannot charge USD, cannot accept or reference PROVADIA, and cannot send users to onejobkits.com. It would be a severed Pi-only satellite whose revenue arrives in a ~$0.05 token — commercially incoherent with the store, the till architecture, and the two-houses design. **Candidate (c) is out on Pi's rules alone.**
  2. **Guardian's cross-chain shape vs "Pi utility" judging — SERIOUS.** Guardian as founded (FVR-26, PROPOSED) is a Solana/PROVADIA instrument. Entered as-is it scores near zero on a named criterion. Only a genuinely Pi-native reframing (or the SoloHost path) is honest. Note also Guardian itself is **not yet founded** — its reconciliation (captain's matrix landed; Gemini's + ChatGPT's challenge outstanding) has not reached the founder. Building a hackathon entry on an unruled division would invert the house sequence.
  3. **No-custody law — COMPATIBLE.** Pi payments are signed by the user in Pi Wallet; the app never touches keys or seed phrases. Pi Auth yields a username, not identity documents. Nothing in any candidate requires custody. ✅
  4. **PROVADIA's independence — COMPATIBLE if kept separate.** Nothing in the rules demands exclusivity or binds our own coin; the entry would be a Pi-ecosystem app under George's name, walled off from PROVADIA by Pi's own anti-funnel rules. The same wall that kills candidate (c) protects the separation here.
  5. **Honesty rules — TWO CAUTIONS.** (i) Pi's "60+ million Engaged Users" is Pi-reported (18M+ KYC-verified, also Pi-reported); any house document quoting reach must label it as such. (ii) The organizer's rights to cancel, pick no winners, and change rules without notice mean **no prize may ever be presented internally as expected revenue**.

---

## 4. EXPECTED VALUE, COLD

**The field.** The closest precedent, **Pi Hackathon 2025** (the first post-Open-Network, mainnet-apps edition): **215+ completed Mainnet app submissions**, 2,100+ developers from 100+ countries, 3 winners + 5 honorable mentions, prize pool up to 160,000 Pi. The 2023 Q1 edition drew 6,700+ participants and ~360 accepted submissions (~600 projects). Pi Next offers **$200,000 in USDT** (far more salient than 160K Pi), a brand-new Developer Console, and an explicit AI-agents theme in a year when 51,800 Pioneers already created apps with Pi's own AI tooling. **Expect a field at least as large as 2025's, plausibly 300–600+ submissions.** [Pi 2025 year-end blog; BSC News; Pi Q1 2023 hackathon blog]

**Judges' Pick ($50K pool).** A polished, genuinely useful entry from a professional crew is not a random ticket — but top-3 of several hundred, judged partly on ecosystem alignment where incumbents speak the culture natively, is realistically a **low-single-digit probability (~1–3%)** for a cold-start outsider. EV ≈ **$170–$500**. The 2025 podium (a KYC-gated social app, a merchant loyalty system, a Pi-economy game) shows what wins: Pi embedded in the core mechanic, not bolted on.

**Community Engagement Awards ($150K, ≤2 teams).** These reward **real engagement and retention** — against 300+ existing Mainnet apps with live Pioneer user bases, in a ~6-week window, starting from **zero Pi presence, zero Pi community to mobilize** (developers may even stake Pi or rally community to boost directory rank — we have neither the stake position nor the community). Probability for us: **well under 1%**. EV ≈ negligible. Treat this pool as **not contestable by us in this edition**, whatever the headline number says.

**What a non-winning entry still yields:** a Mainnet-listed (or SoloHost-published) app in the Ecosystem Directory / Pi Desktop catalogue, a PiNet web presence, possible App Growth Initiative user incentives (Pi paid to *users*, driving some trial), a public demo video, and — the durable item — **first-hand Pi platform competence**: SDK, payments, listing review, directory mechanics. That is precisely the primary-source material the founder's Pi case study and the proposed Living Citizenship Engine need, and it cannot be gotten from screenshots. Value: real, but **strategic, not cash** — and the directory is crowded (300+ Mainnet apps), so passive discovery should be assumed to be small.

**Opportunity cost — what slips.** December is the densest month on the standing calendar: **Grand Opening Fri Nov 27** (pass/fail criteria filed) · WarriorPlus catch-all Nov 28 · **Field Command Top 25 due Tue Dec 2** · **Sentinel Days 1–15** (the founder-ruled first build, running to ~Dec 8–15) · SB 553 hard bar Dec 17 · the all-394 march to Jan 28 behind them. A 10–15 crew-day LKE build in December is taken directly out of the store conveyor's December wave and Sentinel's first fortnight — the two founder-ruled priorities of the season. Named plainly: **what slips is Field Command depth (products ~11–25 polish) and/or Sentinel's interview and mock-delivery cadence.** A 4–7 crew-day SoloHost entry slips roughly a third as much but buys the weakest judging position.

---

## 5. RECOMMENDATION

**ENTER ONLY IF** all of the following hold — otherwise **DO NOT ENTER**:

- **Candidate:** the **Living Knowledge Engine learning app** (Pi App path) — the only candidate that is simultaneously rule-compliant, judging-aligned (education, retention, Pi-in-the-mechanic), custody-clean, and built on designs the house already owns. **No commerce entry at any date. No Pi-App Guardian entry.** A SoloHost Guardian package may be added as a second entry **only if** the LKE entry is feature-complete and submitted first, and only after Guardian's own reconciliation has been ruled on.
- **Condition 1 — KYC first:** George confirms his Pi account status and completes **Pi KYC** (his hands) **this week**. If KYC is not approved by **Dec 15**, the entry is dead — kill it without debate; the listing risk is no longer ours to manage.
- **Condition 2 — fenced scope:** one polished learning app, Pi Auth + progress + return-visit mechanics, premium tier in Pi only if the payment flow is complete and tested; no PROVADIA branding, no external funnels, no promises to Pi users beyond the app itself. Registering early (to receive the midpoint-submission details) is part of the entry decision, not a pre-step.
- **Condition 3 — calendar fence:** the build is capped at **15 crew-days** and may not displace the Grand Opening (Nov 27), the Top-25 date (Dec 2), or Sentinel's Days 1–15 gates. If a conflict forces a choice, the hackathon yields — automatically, without re-asking.
- **Last responsible start dates** (working back from Jan 5, 11:59 PM PST; submission package + video need the final ~3 days; app feature-complete by ~Dec 30):
  - Registration + KYC initiation: **immediately** (elapsed time is Pi's, not ours).
  - LKE build start: **no later than Dec 12–14**.
  - SoloHost Guardian (if added): no later than **Dec 21**.
- **Kill-conditions (any one aborts the entry):** KYC unapproved by Dec 15 · Pi changes the rules/deadline materially · the midpoint feedback or listing review signals the app cannot be listed in time · Sentinel or Field Command slips against its own gates because of this build · any term surfacing in the full in-console rules that conflicts with house law (custody, honesty, coin independence).

**If the founder's purpose is the prize money: do not enter** — the expected cash value is a few hundred dollars against 10–15 crew-days in the house's most congested month. **If the purpose is what the founder actually stated** — understanding from the inside how Pi built a returning community, as primary research for the Living Citizenship Engine, with a listed app as the by-product — then the LKE entry under the fences above is a legitimate, bounded way to buy that knowledge, and Jan 5 is close enough that the decision cannot wait past this week.

---

### Sources
- Official Pi Next page — minepi.com/pi-next (prizes, criteria, build/submission instructions, deadline) — crawled 2026-11-24.
- Official Pi Developers register page — developers.minepi.com (who can enter, up to 3 apps, dates).
- Official Pi Docs — Mainnet Listing Requirements (developer KYC; Pi-Auth-only; Pi-only transactions; anti-funnel; data limits) and Build an App (SDK, Platform API, payment flow) — developers.minepi.com.
- Pi Next Hackathon 2026 Rules (22 clauses) — clause-by-clause summary by OrbitWatch (independent Pi ecosystem observatory), compiled from the official rules agreed at registration: eligibility, IP retention, USDT prizes, organizer reserved rights, unspecified items.
- Official Pi blog — Developer Tools and Product Updates, Oct 29, 2026 (SoloHost AI packaging skill, 420,000+ Nodes, no Pi spend to package).
- Pi 2025 year-end blog (minepi.com) + BSC News — Pi Hackathon 2025: 215+ Mainnet submissions, 2,100+ developers, winners; 51,800 Pioneers created apps in 2025.
- Pi Q1 2023 Hackathon blog — 6,700+ participants, ~360 accepted submissions.
- CoinGabbar / Coinranking / BSC News launch coverage (Nov 19–24, 2026) — corroboration of pool structure, submission package requirements, USDT payment form.
