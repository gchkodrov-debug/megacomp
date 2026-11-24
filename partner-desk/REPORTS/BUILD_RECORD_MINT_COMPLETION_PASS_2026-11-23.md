# BUILD RECORD — THE MINT COMPLETION PASS

**Date:** 2026-11-23 (founder ruling 23:35 CT: "Start the town products now — Mint completion pass first")
**Page:** `/listings/mint.html` (The Living Mint), repo `gchkodrov-debug/provadia`, branch `main`
**Before:** sha256 `260cdae33aee45ce44f0302e2feaada2556b3b16629ef8b803543705649b7d68` (58,502 B)
**After (live, verified):** sha256 `46868702942c3af9b13de7fe29696dad2892d4407f5c4b178bd6833bce1096b3` (60,221 B)
**Scope of the pass:** bring the page to the FVR-07 FULL READY standard (full listing + Surfer system + pictures + film + working delivery), fixing the two defects the earlier blind full-standard verdict failed on: (1) leader lines / tip dots missing from the product presentation, (2) the mobile breach.
**Coordinator:** the captain's subagent. **Relay:** builder → improver → critic (two-axis) → blind verifier, per Relay Law.

---

## 0. THE GLASS MACHINERY LAW — NOTED AS APPLIED (founder addendum, 2026-11-23 23:48 CT)

The founder ruled mid-pass: every blockchain build carries the Surfer architecture so a visitor knows exactly what is happening, and for machinery the visitor sees INSIDE the operation ("the surgery") — the service's machinery (idea → design → contract → mint → launch, plus the intake → concept-hash → handover path) is presented AS THE OPERATION ITSELF, each working part named by its bullet at its scroll moment, not merely described in listing copy.

How this page carries it, as built and verified:
- **The journey is the minting operation, presented:** the coin opens into the service's eight stages (Conversation → Honest Question → Rehearsal → Covenant → Mark → Launch → Record → Handover), each named by its bullet (leader line + tip dot) at its measured scroll lock, then reassembles whole.
- **The chamber is the intake operation, performed:** the visitor performs intake → concept → explode (the coin separates into the eight production stages — Original Idea · Coin Identity & Artistic Design · Token Specifications · Blockchain Contract Preparation · Technical Verification · Minting · Launch Preparation · Final Delivery — with leader lines and dots) → concept hash → handover by mail. The machinery is not described to the visitor; the visitor runs it.
- **The listing now mirrors the machinery in the same names** (the eight stages as What's Inside), so copy, presentation and operation agree.

One scope question on this law was raised by the critic seat and is carried open to the founder/Gemini — see §5.3. The facts are not in dispute between the seats; the question is whether the law's "in the Surfer journey" binds the journey alone or the page's composed presentation (journey + chamber).

---

## 1. WHAT WAS ACTUALLY WRONG (baseline, measured — not assumed)

Baseline method: byte-exact local mirror of the live page (sha `260cdae3…`, real CSS/JS/fonts, the certified frame set from disk), headless-Chrome probe at 1440×900, 390×844, 375×812, 375×667. An early mirror lacked shared CSS and produced false overflow readings; those were discarded and the mirror completed before any conclusion was drawn.

**Wrong, and fixed by this pass:**
1. **The listing block contradicted the service's ruled terms.** The description called the fee structure "scope-dependent" ("Supplied price ranges are scope-dependent") against the fixed ruled price ($245 / $196), and stated "no schedule or ongoing support is implied" against the ruled 30-day support window. It described a brief-making exercise, not the full-service mint.
2. **What's Inside named no genuine parts.** Four generic items, each suffixed "— proposed scope item" (Clarify the launch purpose · Review founder-supplied material · Outline the intended audience · Prepare an agreed asset checklist). The at-a-glance bullets were the same generic process list. The listing heading carried no full title.
3. **Two gallery captions pointed the wrong way.** "…named in the scroll below" / "…named in the scroll presentation below" — the scroll presentation sits ABOVE the listing block. (Caught by the improver seat; see §5.2.)
4. **Leader lines / tip dots were fine-weight.** Present and measurably exact (below), but drawn at 1px line / r=5 dot / r=11 halo — light enough that a visual verdict read them as missing. Weight strengthened (dot r 5→6.5, halo r 11→14, line 1→1.5px, dot outline 1→2px); anchors untouched.

**Measured NOT wrong (the earlier verdict's framing, corrected by evidence):**
- **Tip geometry was already exact.** All 8 locks on their designed frames at every viewport (desktop pixel difference vs the certified frame files = 0); tip-dot error ≤0.07% of stage size; dots inside the stage at every lock; shelves above callouts. The defect was legibility weight, not placement.
- **No horizontal overflow existed** at 375/390/1440 once the true CSS was applied (document width == viewport width, 0 offenders, including page bottom).
- **Reduced-motion leaders are `display:none` by the design of record**; the static stack carries all callout facts at full opacity — facts parity holds. Not a defect; unchanged.
- **Gallery still-2** ("It turns.") is a genuine film frame; an early black appearance was lazy-load timing in the probe, not the asset.

---

## 2. WHAT WAS BUILT (the change, confined)

One file changed: `listings/mint.html`. Full diff: 32 lines (`mint-completion-work/relay/full-diff.txt`). Contents:

1. **Listing heading:** eyebrow → "Services / pilot offer"; full title added — "The Mint — Full-Service Coin Creation" (page-local `.listing-title` rule mirroring the shell's h1 metrics); proposal label → "pilot · gate closed — scope and availability confirmed with the Keeper before booking". Lead unchanged.
2. **Description rewritten** to the true service: the eight stages walked in order; the arc "Idea, design, contract, mint, launch"; fixed fee $245 / $196 in PROVADIA; completion-only charging with the handover-test definition; the 30-day support window with no response-time guarantee; the gate's closed state; the chamber open for concept work; holding never required.
3. **What's Inside = the eight genuine stages**, each "Name — what it does", conformed to the journey's fixed callout texts (five written viability checks and the written refusal restored to stage 2; scope/rules/completion criteria restored to stage 4; every completed step — not only the launch — restored to stage 7). Intro ties the list to the journey and the chamber in the same names.
4. **At-a-glance bullets** replaced with the ruled facts: eight stages/one Keeper · fixed fee · completion-only/handover test · 30-day window · Record entry · gate closed/chamber open.
5. **Caption direction fixed** in both places ("below" → "above").
6. **Leader weight** as in §1.4 — the only journey change; presentation weight only.

**Untouched, verified byte-identical to the pre-change page:** the 379-frame film and frame set (no frame file changed; desktop MAD 0 at all locks after deploy), the ANCH table, all 8 `data-gx-tip` values, the mirror joint (frame 379 ≡ frame 1, sha `584e952b…`), the boundary section, the scope panel's price line / price-note / checkout-note / Request-scope link, the chamber, the entrance, `mint-living.css`, `mint-living.js`, and the Presentation Engine's Mint manifest (QUARANTINED per Gemini #46 — not touched; conformance remains separate captain work).

**Fences held in the deployed bytes:** `data-purchase-enabled="false"` · `data-film-state="not-run"` exactly 2× (Flow is down; no film faked; the certified scroll film is the film leg) · the only dollar amounts on the page are $245 and $196 · no store-green hexes · town palette only.

---

## 3. MEASUREMENTS — DEPLOYED PAGE (probe of record)

Probe: `mint-completion-work/probe-completion.mjs` + `dry-run.mjs`, run against a byte-exact mirror of the deployed bytes (served sha == candidate sha == `46868702…`). Reports: `probe-report-deployed.json`, `dry-run-deployed.json`. Stills: 124 files in `mint-completion-work/shots/` (baseline / candidate / deployed × arrival, locks, closing, chamber, listing sections, reduced).

| Check | Result |
|---|---|
| Journey locks, desktop 1440×900 | 8/8 exact frames (81/91/97/106/121/137/153/169); MAD 0 at every lock |
| Journey locks, 375×667 / 375×812 / 390×844 | 8/8 designed frames (worst deviation 1 frame at one lock, stride-2 set — same as baseline) |
| Tip-dot error vs anchors | ≤0.07% of stage size, all viewports; dots inside stage at every lock; dot r now 6.5, halo 14, line 1.5px |
| Horizontal overflow | 0 offenders at 375 / 390 / 1440, journey and page bottom |
| Arrival / closing | frame 1 at rest; frame 379 at close; mirror joint intact |
| Reduced motion | static hero + 8 callouts stacked, full text, opacity 1 (design of record) |
| Script errors | none on any viewport |
| Transfer, 375px | 1,596,768 B initial · 1,704,014 B full journey (baseline 1,702,295 B; +1,719 B of copy) |
| Frame-set budgets | mobile set 913,424 B ≤ 1,572,864 B cap · desktop set within its 4.72 MB cap |

**Weight note (stated plainly, not buried):** the page's total transfer exceeds a 1.5 MB line if that line is applied to total page weight. Composition: fonts 370,868 B are the site's two shared fonts (every town page carries them — not this page's to change); the frame preload is the ruled design (Defect Library #008) and the frame sets sit inside the Presentation Standard's own budgets. No Mint-owned trim exists that does not touch the locked film or the shared shell. Recorded as a class question for the founder/Gemini, not silently passed: the blind verifier graded L6 on the standard's explicit frame-set budget (PASS) with the font fact quoted.

---

## 4. WORKING DELIVERY — DRY-RUN RECEIPTS

Run on the baseline, the candidate, and the deployed page (embedded probe + standalone script; desktop + 375px; fictitious data only — "Completion Pass Test Coin" / CPTC / dryrun@example.invalid):

- Step 1–2 inputs accepted; Step 3 preview paints (720×720 canvas, mean 156.3, sd 141.5) with the badge visible: "CONCEPT PREVIEW — NOT FINISHED ARTWORK · DOES NOT MINT OR DEPLOY".
- Explode view: button flips to "[ REASSEMBLE CONCEPT ]" (aria-pressed=true), canvas repaints (mean 125.7), caption names the eight production stages.
- Submit: concept hash **6D775366** — identical across every run, viewport and generation (deterministic). Mailto captured: to `support@provadiacoin.com`, subject "Catalogue scope: The Mint — Creation Chamber", body carrying all fields + design choices in words + "Concept reference #6D775366" + "Gate closed — scope request for founder review. No payment taken."
- Status line after submit: "Nothing was charged; the gate stays closed until the founder opens it…" with the direct-address fallback. The intake mailbox behind the address is receipted house-wide (Cloudflare routing → the watched Workspace mailbox, proven 2026-11-23 21:35 CT).
- Zero script errors in all dry runs.

---

## 5. THE RELAY — POSITIONS AND ADJUDICATIONS

### 5.1 BUILDER — Claude front-end seat (subagent)
Built the candidate exactly to spec (log: `relay/builder-log.md`; diff: `relay/builder-diff.txt`). Self-checks all passed (diff confinement, tip/ANCH identity, fence census, HTML parse). Two discrepancy notes, both sound: the brief said the dot outline was 1.5px — the actual original was 1px; the builder set the intended final value 2px. The `.listing-title` metrics follow the brief's explicit values, which differ slightly from `listing.css`'s h1 rule — coordinator ruling: the brief's values stand (the listing title must not rival the page's hero h1).

### 5.2 IMPROVER — DeepSeek v4-pro (reply: `relay/improver-deepseek.md`)
Twenty items: fourteen confirmations, six FIXes, one missing-fact note. Adjudications:
- **Gallery caption direction ("below" → "above") — ACCEPTED, applied** (both occurrences).
- **Stage 2 / 4 / 7 fidelity to the fixed callout texts — ACCEPTED, applied** (adapted wording, §2.3).
- **Stage 6 "contract prepared and verified beforehand" — ADAPTED.** The improver lacked the chamber's fixed stage list, which names "Blockchain Contract Preparation" and "Technical Verification" as stages 04–05 of the service's own machinery; the claim is page-true. Kept, tightened to the fixed Launch language ("the controlled live release of the coin into the open world, its contract prepared and verified beforehand").
- **Bullet 5 naming ("town's Record") — REJECTED with reason.** "The Record" is the stage's proper name, used consistently across the journey, the description and the bullet; the improver's own hedge covered this case. Kept on record per two-axis discipline.
- **Missing fact (service duration) — NOTED, not stateable.** No duration is ruled; the copy stays silent. A founder-owable fact, carried in §6.

### 5.3 CRITIC — Grok (grok-4.20-reasoning), two-axis, two fresh calls (replies: `relay/critic-grok-promise.md`, `relay/critic-grok-house.md`)
A first non-reasoning run returned a bare PASS list with no evidence; it was discarded as method-insufficient (`critic-grok-promise-nonreasoning-discarded.md`) and both axes re-run on the reasoning model with the skill's evidence format mandated.

**Promise axis:** P-1…P-6 PASS, each with quoted evidence and a tested-and-REJECTED suspicion. **P-7 (Glass Machinery) — CONFIRMED defect on the journey-only reading**, verbatim: "concept-hash, Blockchain Contract Preparation, Technical Verification and Minting presented only outside Surfer or via inconsistent naming." Counts as reported by the seat: 1 CONFIRMED, 6 REJECTED, 0 NEEDS-CHECK.

**House axis:** H-1…H-7 HELD, each with quoted evidence and a tested-and-REJECTED suspicion. **H-8 — CONFIRMED breach as the seat read the rule**, verbatim worst item: invented terms "gold fees", "Day-Book", "hash-chained", "80% founder / 20% website & community". Counts as reported by the seat: 7 REJECTED, 4 CONFIRMED (the seat's count line is internally inconsistent with its own text — seven rules held, one rule breached on four exhibits; quoted as delivered).

**Coordinator adjudications:**
- **H-8 is REJECTED as a breach of this change.** Three of its four exhibits ("gold fees", "80% founder / 20% website & community", "source rights / operational work / acceptance terms") sit in the boundary section, which is byte-identical to the pre-change page and is itself ruled text (the founder's 80/20 share law; the charges-live conformance paragraph) — the same report's H-6 confirms that section byte-identical and HELD. The axis rule as briefed ("the copy may state only the ruled terms") was drafted over-broadly by the coordinator; a rule that convicts unchanged ruled text is mis-scoped, and the error is the coordinator's, recorded here. The fourth exhibit ("Day-Book", "hash-chained", stage 7) names real house mechanisms: the Day-Book is the town record's name across the site, and its entries are hash-chained (FVR-15; the T4-B record build; Day-Book entry hashes on file). Not invented terms.
- **P-7 stands as a scope question, escalated — see §0 and §6.** The critic graded the law's "in the Surfer journey" against the journey alone; on that reading its facts are correct (the technical stage names and the concept hash live in the chamber). The blind verifier graded the composed page and passed the same law (§5.4). The seats agree on every fact; they disagree on the law's scope. A journey-stage rebuild is outside this pass's fences (the journey's film and callout texts are certified and locked) and outside its brief; if the founder rules the strict reading, the remedy is a separate journey production. The disagreement is NOT resolved inside this record — it goes to the founder's judgment and Gemini's ratification (#70) with both verdicts verbatim.

### 5.4 BLIND VERIFIER — Kimi K3 (fresh context; evidence pack only: the standard, deployed-page measurements, the dry-run receipt, the deployed listing copy; no screenshots, no relay history) (reply: `relay/verifier-kimi.md`)

Per-line verdicts, verbatim: **L1 FULL LISTING — PASS · L2 THE SURFER SYSTEM — PASS · L3 PICTURES — PASS · L4 FILM — PASS · L5 WORKING DELIVERY — PASS · L6 MOBILE PROVEN — PASS · L7 THE GLASS MACHINERY LAW — PASS · FENCES — PASS (all four, verified in the deployed bytes).**

Overall verdict, verbatim: "Every line passes on machine-verified evidence from the deployed bytes. Under FVR-07's own words — a product is READY only when every line passes — **"The Mint" (/listings/mint.html, sha256 468687029…1096b3) is READY.**"

The verifier's L7 reasoning, in substance: the journey presents the operation opening into its working parts with MAD-0 locks; the intake → concept-hash → handover path "is presented and functions as the operation itself in the Creation Chamber"; the copy cross-references the machinery rather than substituting for it.

### 5.5 Crew agreement statement
The crew agrees on: the listing is complete and ruled-true; the Surfer system is measurably whole with legible bullets; pictures and film legs stand; delivery works end-to-end; mobile is proven; all fences held. The crew does NOT unanimously agree on the Glass Machinery law's scope (critic: journey-only reading, CONFIRMED; verifier: composed-page reading, PASS). That single disagreement is carried open, by name, to the founder and to Gemini's ratification — it is not papered over, and this record does not declare the question settled.

---

## 6. NOT RUN / OPEN ITEMS

- **Gemini ratification** — queue #70; fires on this record. The founder's live judgment closes the re-sit. This record claims nothing beyond the seats' verdicts above.
- **P-7 scope question** — founder/Gemini to rule: does the Glass Machinery law bind the journey alone (→ a separate journey production, breaking no fence of this pass) or the composed page (→ satisfied as built)?
- **Flow films** — NOT RUN: Google Flow remains down; both ambient slots stay empty and honestly labeled `data-film-state="not-run"`. No film was faked; the certified scroll film + the gallery assembly film are the film legs.
- **Presentation Engine Mint manifest** — NOT TOUCHED (quarantined, Gemini #46 Option (a)); conformance remains separate captain work.
- **Till step 2** (prove purchase-to-delivery with real rails) — NOT RUN, unauthorized; the till stays off.
- **Production LCP** — not measured (Defect Library #009 stays open, site-wide).
- **Motion judgment** — cloud stills prove layout/static only (house law); the journey's motion is the founder's screen to judge.
- **Service duration** — not stated anywhere on the page; no duration is ruled (improver item 19). Founder-owable if he wants one stated.
- **Weight class question** — total transfer 1.70 MB vs a 1.5 MB line, as laid out in §3: a founder/Gemini class ruling, not a defect this pass could repair inside its fences.

## 7. DEPLOY PROOF (merge-before-deploy)

1. Live bytes fetched and verified sha == `260cdae3…` immediately before deploy (no parallel movement; nothing to merge).
2. Candidate built only from those bytes; diff confined as §2.
3. `github.py put-file gchkodrov-debug provadia main listings/mint.html` — commit landed.
4. Served bytes polled until sha == candidate sha `46868702…` (matched on the third poll).
5. Full probe + dry run re-run against the deployed generation (§3, §4) — all green.
6. Pre-change bytes preserved at `mint-completion-work/mint-260cdae3-original.html`; full relay archive at `mint-completion-work/relay/`.
