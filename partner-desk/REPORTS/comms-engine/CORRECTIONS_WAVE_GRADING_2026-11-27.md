# CORRECTIONS WAVE — CAPTAIN GRADING (DRAFT)

**Status: DRAFT — every verdict below is a draft for the captain's adjudication. Nothing here is final until the captain rules.**
Prepared: 2026-11-27 · Coordinator grading pass over the five correction answers (PCN-20261127-0043 / 0045 / 0047 / 0049 / 0051).

**Extraction verification (all five):** each answer body was extracted verbatim from `comms-engine/data/messages.jsonl` and confirmed present character-for-character in its desk file; body lengths match the log exactly —
GLIB_FIX_001 3,196 ✓ · SCROLLS_QA_001 6,041 ✓ · HEART_VERIFY_001 3,073 ✓ · REFASSETS_FIX_001 10,297 ✓ · REG_RECON_002 16,613 ✓.
Desk files: `partner-desk/REPORTS/comms-engine/<NAME>_ANSWER_2026-11-27.md`.

---

## 1. GLIB-FIX-001 — mimo-v2.6-pro (answer PCN-20261127-0043)

Brief test: correct exactly the 3 flagged defects; return ONLY the corrected sections, each change marked; nothing else rewritten.

**Check 1 — Beat count (Defect 1): PASS.**
Evidence: corrected mobile line — *"Mobile behavior: all nine beats (Beat 0–Beat 8) step by tap to 390px."* Corrected individuality line — *"same nine-slot mechanism as the Mint, new personality."* The seat also answered the brief's sweep instruction: *"No other line in the deliverable states or implies the beat count."* Count now agrees with the enumerated Beat 0–8 sequence everywhere the answer reaches.

**Check 2 — Beat 0 unseen-film assertion (Defect 2): PASS.**
Evidence: *"Beat 0 — DESIGN INTENT for the page (what the page is designed to do; not a claim about the film's content, which has not been seen)"*. The assertion is relabelled exactly as the brief's second option required. Sweep statement included: *"All other references to the Keeper scroll-assembly film assert only its existence, not its content; no further relabelling was required."*

**Check 3 — "First person singular" rule (Defect 3): PASS.**
Evidence: *"PROPOSED — first person singular where the product speaks. Candidate rule awaiting the captain's adoption; not established by the brief or by the Mint prototype description."* Marked PROPOSED in the shared-engine column, as the brief allowed.

**Check 4 — Format discipline: PASS.** The return contains only the three defect sections, each with "CHANGE MARKED" stating what was wrong and what it now reads. No new content, no unrelated rewrites.

**DRAFT VERDICT: ACCEPT.**
Application consequence (draft): fold the three corrected sections back into the GLIB-KEEPER-001 deliverable to form the corrected Keeper build spec. The voice rule stays PROPOSED — it enters the engine only on the captain's explicit adoption, not by this correction.

---

## 2. SCROLLS-QA-001 — glm-5.3-flash (answer PCN-20261127-0045)

Brief test: grade each of the 7 beats CONFIRMED / NEEDS-DEEPENING / REJECTED with a one-line reason; judge beat 5's "worked example" plainly; name every thin/generic/off-canon place; return an executable punch list; NO rewriting.

**Check 1 — Per-beat grades, all 7, with reasons: PASS.**
Evidence (grade lines): *"1. ARRIVAL — CONFIRMED"*, *"2. SHELVES — CONFIRMED"*, *"3. THE CHOOSING — NEEDS-DEEPENING — …three consecutive transactional lines with no keeper warmth"*, *"4. THE UNFURLING — CONFIRMED"*, *"5. THE LIVING PARCHMENT — REJECTED"*, *"6. THE HAND-OFF — CONFIRMED — Doctrine exact"*, *"7. THE RETURN — CONFIRMED"*. Distribution: 5 CONFIRMED · 1 NEEDS-DEEPENING · 1 REJECTED — differentiated, not uniform.

**Check 2 — The worked-example judgement, stated plainly: PASS.**
Evidence: *"Plain finding, as commissioned to state: what stands at beat (5) is a **template, not a worked example**. Nothing is worked — every value is a bracket token."* This confirms the captain's wave-1 extractor flag in the QA seat's own words.

**Check 3 — Thin/generic/off-canon sweep + canon guard: PASS.**
Evidence: *"Complete list of thin/generic/off-canon places: LIVING-EXAMPLE-01–06…, THE-CHOOSING-01–03 (thin run), THE-CHOOSING-03 ∩ SHELVES-03 (echo), ARRIVAL-03 and SHELVES-02 (the only stock lines in the set), THE-HAND-OFF-01/02 (redundant naming). No off-canon content found."* Guard sweep is explicit and subtle where it matters: *"RETURN-06 'Goodbye for now' concerns the visit, not product returns — checked and clean"*; no invented prices/products/availability; store not rebuilt; no separate checkout.

**Check 4 — Executable punch list, no rewriting: PASS.**
Evidence: 2 REQUIRED items + 3 POLISH items, each naming the line(s), what is wrong, and the quality the fix must reach — e.g. item 1 requires the replacement example to be *"flagged illustrative / not-for-screen… (d) omits at least one field, demonstrating the omit-never-guess rule in action"*. No replacement copy lines are supplied anywhere; the answer closes: *"Grades only — no replacement lines supplied."*

**DRAFT VERDICT: ACCEPT.**
Application consequence (draft): the deepening pass goes back to the copy seat (minimax-m3.1-flash) with punch items 1–2 as REQUIRED (real worked example as a flagged-illustrative parchment with one field omitted; warm the Choosing, resolve the SHELVES-03 echo) and items 3–5 as optional polish. LIVING-PATTERN-01–03 and LIVING-RULE-01 are frozen — the QA's "DO NOT TOUCH" list stands.

---

## 3. HEART-VERIFY-001 — gemma4:31b, blind (answer PCN-20261127-0047)

Brief test: four rulings — (a) do the amendments resolve N1/N3/N4? (b) Item 3's "verified with the Heart service stopped" vs the T11 record: supported or overstated? (c) the self-granted re-verification exemption vs the house rule? (d) N_E5 = 10 as a proposal? Each graded, evidence cited.

**Check (a) — N1/N3/N4 resolution: CONFIRMED by the verifier, amendment-level evidence. PASS.**
Evidence: N1 — *"Amendment 1a establishes §6.2 as the governing law (precedence clause), and Amendment 1b explicitly transforms T9… (10 accepted, 90 rejected). This aligns perfectly with the evidence in (B) where `accepted=10 quota-rejected=90`."* N3 — *"Amendment 2a creates a rigorous definition of 'beat'… and explicitly excludes the 'resting glow'."* N4 — *"Amendment 3a elevates shell independence from a test observation to an architectural requirement (ARCH-1). Amendment 3b… explicitly closes the 'cache-luck' loophole."* All three findings ruled resolved, each tied to a named amendment and to the test record.

**Check (b) — Item 3 certainty line: REJECTED by the verifier (the delta overstates). PASS — matches the captain's own flag.**
Evidence: *"the `TEST_RESULTS.md` extract (B) for T11 states: 'the rendered pixel state is a captain visual check — see README.' The automated evidence only confirms that the shell is reachable (HTTP 200)… Therefore, the delta's claim that this is 'verified'… overstates the evidence."* The blind seat independently reached the same conclusion the captain flagged at harvest, from the record itself.

**Check (c) — Self-granted exemption: ruled UNSOUND. PASS in substance; one vocabulary note.**
Evidence: *"Under House law, any modification to the specification re-opens the affected gates for re-verification… The decision to waive re-verification is a captain's prerogative, not a seat's prerogative."* Note for the captain: the brief's header asked for CONFIRMED / NEEDS-CHECK / REJECTED, but item (c)'s own text asked "sound, unsound, or sound only in part?" — the seat answered in the item's vocabulary (UNSOUND) and ruled the claim unsound wholesale rather than splitting a sound part (it does not separately address the delta's softer close, "re-run the spec-consistency review only"). Substance is complete; the split-the-difference analysis the brief permitted was not performed because the seat found no sound part to split.

**Check (d) — N_E5 = 10: ruled UNDECIDABLE on this evidence. PASS.**
Evidence: *"the test record (B) for T12 states only that the test was `OUT-OF-SCOPE`… There is no data in the provided evidence regarding registry capacity, intended scale, or the hardware/software limits… It is a pure proposal by the reasoning seat without a supporting evidence base."* The brief expressly offered "undecidable on this evidence" as a legitimate ruling for (d); the seat took it with reasoning and substituted no number of its own.

**DRAFT VERDICT: ACCEPT-WITH-NOTES.**
Notes: (i) verdict vocabulary on (c)/(d) follows the brief's per-item wording rather than its header scale — no re-dispatch warranted; (ii) the verifier's (b) ruling means the delta sheet may NOT be applied as-is — Item 3's certainty language must be corrected to the record ("shell reachable with the service stopped; rendered offline state confirmed by captain visual check, not automated proof") as part of the v0.3 application.
Application consequence (draft): apply the v0.3 amendments for N1/N3/N4 (CONFIRMED) with the Item 3 wording correction; the exemption is void — the captain re-opens the affected gates, with prototype re-verification scoped at minimum to T9-as-amended (quota law), the DEF-1 terminology sweep, and T11/ARCH-1; exact scope is the captain's call. N_E5 = 10 remains a labelled PROPOSAL, undecidable on current evidence — it must not enter v0.3 as a settled value; it waits for the E5 infrastructure work (roadmap G3), where T12 can actually run.

---

## 4. REFASSETS-FIX-001 — deepseek-v4.1-flash:1017 (answer PCN-20261127-0049)

Brief test: exclusions at top with reasons; 18 rows MCR-0157–0174, each with its own plate set differentiated by film type (with the difference stated) AND by the product's world; credit totals restated for 18 films on the standing basis.

**Check 1 — Exclusions named at top, with reasons: PASS.**
Evidence: *"MCR-0155 Per-Scroll Living Presentation (per store product) — excluded: MECHANISM row, not a product film."* / *"MCR-0156 Film 13 — OJK Fleet Install — excluded: ALREADY LANDED (Shoot Book), not an unfilmed slot."* / *"No plate sets or manufactured filenames are issued for MCR-0155 or MCR-0156."*

**Check 2 — All 18 rows present, correctly typed: PASS.** Rows run MCR-0157→0174 in register order, alternating Product Film / Surfer Separation Film, and the product names match the captain's verified register rows (0157/58 Modular Cyberpunk City · 0159/60 Medieval Kingdom · 0161/62 Ancient Underground Mine · 0163/64 Sci-Fi Space Station · 0165/66 Fantasy Village Builder · 0167/68 Post-Apocalyptic City · 0169/70 Tropical Island · 0171/72 Underground Dungeon · 0173/74 Virtual Museum & Gallery).

**Check 3 — Differentiation by film type, difference stated: PASS.**
Evidence: *"Product Film set requires: `HERO`, `MACRO-A`, `MACRO-B`, `WORLD`, `SCALE`, `END`."* / *"Surfer Separation Film set requires: `LAYER-01`… `CALLOUT-01`… `PRODUCT-CENTRE`, `SOLNIK-BESIDE`, `WORLD-CONTEXT`, `END`."* / *"The sets differ because the Surfer treatment presents the product **layer by layer with callouts, product centred, and Solnik beside it**."* The why is stated, not just the lists.

**Check 4 — Differentiation by each product's world: PASS.** Every row's WORLD / WORLD-CONTEXT plate and its MACRO/LAYER subjects are world-specific — e.g. MCR-0157 *"MACRO-B_neon-signage-and-connectors"* in *"WORLD_cyberpunk-city"* vs MCR-0171 *"MACRO-B_torch-and-iron-detail"* in *"WORLD_underground-dungeon"*. No row carries another product's world.

**Check 5 — Credit math restated for 18 films: PASS (arithmetic independently re-checked in this grading).**
Evidence: *"| Standard | Veo 3.1 Lite | 5 cr/film | 90 cr | 8,356 − 90 = **8,266 cr** |"* and *"| Premium | Omni 1.2 Flash | 24 cr/film | 432 cr | 8,356 − 432 = **7,924 cr** |"*, on the stated basis *"one film = one generation, no retries"*. 18 × 5 = 90 ✓ · 18 × 24 = 432 ✓ · remainders correct ✓.

**Two production notes (not defects):** (i) In every SSF row the CALLOUT-0n plates reuse the exact subject slug of the matching LAYER-0n plate (filenames stay unique via the CALLOUT prefix) — the list never states whether a callout plate is a distinct render or an annotated variant of its layer plate; the Genspark pipeline needs that one-line ruling before generation. (ii) The SSF END plate is a generic slug (`_SSF_END_separation-lockup.png`) in all 9 SSF rows, while every PF END carries the product name (`…-kit-lockup.png`) — a small naming asymmetry against the list's own per-product discipline.

**DRAFT VERDICT: ACCEPT-WITH-NOTES.**
Application consequence (draft): the needs list is v2-ready for the Genspark pipeline once the captain rules note (i) (callout = distinct render vs annotated variant) and either fixes or accepts note (ii). Plate framework, naming convention, and credit basis stand as previously verified.

---

## 5. REG-RECON-002 — kimi-k3.1-pro (answer PCN-20261127-0051)

Brief test: a DIFFERENTIATED verdict per each of the 14 components — MAPS-TO with the covered function named, or NEW-MECHANISM-REQUIRED with the specific gap the prose proves; adjacency never counted as mapping; template repetition across rows = failure.

**Check 1 — All 14 components verdicted: PASS.** CIV-002, 052, 063, 090, 102 (the urgent five) and CIV-051, 053, 054, 055, 072, 075, 084, 086, 089 (the high-risk nine) each carry their own section, verdict, adjacent-entry analysis, and a named "Specific gap".

**Check 2 — Differentiation (the wave-1 failure mode): PASS — the reasoning is genuinely per-component.** The verdict *label* is uniform (all 14 NEW-MECHANISM-REQUIRED), but unlike wave 1's template triage, each row is decided by different prose and a different gap. Evidence samples:
- CIV-002: *"the ordered assembly of the **Minimum Viable Record**… with the express rule that **'nothing leapfrogs the receipt'**"* — gap: *"the composite, receipt-ordered Pour mechanism."*
- CIV-052: *"the dedicated house relayer capped at **≤ 0.25 SOL** with distribution authority only"* — gap: *"enforcement that collectible transfer never transfers citizenship."*
- CIV-090: *"the travelling astrolabe, six satellites, purpose-made payloads, the honest 14-platform matrix"* — gap: *"the Nexus instrument itself and its visitor-owned sharing safeguards."*
- CIV-075: *"the **$10/day hard spend circuit breaker → OFF WATCH**, and human-gated promotion"* — gap: *"the society-level orchestration and control system."*
- CIV-084: *"a linter-enforced manifest under which every card carries a **sourceReceipt**"* — gap: *"the LKE knowledge-object anatomy, interactive rendering lifecycle, and card-level provenance linter."*
- CIV-089: *"image-to-3D using the adopted TRELLIS.2 path"* vs MES-ANM-001 as *"downstream consumption of a body or rig."*
Sibling rows are explicitly distinguished from each other (CIV-051 vs CIV-055: *"distinct from CIV-055's missing factory-scale production service"*; CIV-053 vs CIV-054: *"a narrower and more specific gap"*; CIV-102 vs CIV-052: *"not merely a repetition of CIV-052's program-level minting requirements"*). No repeated reason text across rows was found.

**Check 3 — Adjacency never promoted to mapping: PASS.**
Evidence: the seat states its standard up front — *"a mechanism maps only when its supplied text specifies the component's defining function… a live or verified adjacent service does not map a component merely because it could support it."* Partial coverage is named as partial and withheld: on CIV-002, *"MES-PER-004 supplies only a partial correspondence for the Day-Book… Crediting MES-PER-004 with a Day-Book relationship would still leave the Pour as a whole uncovered."* Honesty marker on CIV-055: *"No coverage is inferred from **MES-ECO-005**, because its entry text was not supplied."* Zero MAPS-TO verdicts were issued — permissible under the brief, and each non-mapping is justified from the prose rather than asserted.

**Check 4 — Register consequence stated: PASS.**
Evidence: *"The Flag-A classifications remain valid at the **registered-component level**. The supplied MESR relationships should be retained only as the partial support, downstream consumption, data discipline, record destination, or identity adjacency actually stated above."* Plus the CIV-063 clarification the register needs: *"'new mechanism required' means a new **MESR mechanism specification/register entry** is needed; it does not deny that its pre-MESR production instruments already run."*

**DRAFT VERDICT: ACCEPT.**
Application consequence (draft): Register v1.1 can be applied on this basis — Flag A stands for all 14 at the component level (now prose-confirmed, no longer INPUT-LIMITED); the partial/adjacent relationships are recorded as partial, never as coverage; the 14 gaps become the authoring queue for new MESR mechanism specifications (the seat asserted no new MESR IDs — numbering is the captain's). The uniform outcome is evidence-driven, not a template relapse: the differentiation the brief demanded is in the reasoning, which is where wave 1 failed.

---

## SUMMARY OF DRAFT VERDICTS (all DRAFT — captain adjudicates)

| Answer | Seat | Draft verdict | Application on acceptance |
|---|---|---|---|
| GLIB-FIX-001 | mimo-v2.6-pro | **ACCEPT** | Fold 3 corrected sections into the Keeper build spec; voice rule stays PROPOSED |
| SCROLLS-QA-001 | glm-5.3-flash | **ACCEPT** | Deepening pass to copy seat: punch items 1–2 REQUIRED, 3–5 polish; pattern/rule lines frozen |
| HEART-VERIFY-001 | gemma4:31b | **ACCEPT-WITH-NOTES** | Apply v0.3 (N1/N3/N4) with Item 3 wording corrected; exemption void — captain scopes prototype re-verification; N_E5 = 10 stays an unconfirmed proposal |
| REFASSETS-FIX-001 | deepseek-v4.1-flash:1017 | **ACCEPT-WITH-NOTES** | Needs list v2 Genspark-ready after the captain's callout-plate ruling (+ END-slug note) |
| REG-RECON-002 | kimi-k3.1-pro | **ACCEPT** | Register v1.1: Flag A prose-confirmed for all 14; partials recorded as partial; 14 MESR spec gaps enter the authoring queue |

No answer is drafted RETURN. No known defect remains unflagged in any of the five: the one substantive defect the wave surfaced — the Heart delta's Item 3 overstatement — is caught, evidenced, and carried into the v0.3 application conditions above.
