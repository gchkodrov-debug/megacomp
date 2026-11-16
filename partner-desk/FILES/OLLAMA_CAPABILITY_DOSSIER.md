# OLLAMA CAPABILITY DOSSIER — the definitive bench study
**Compiled 2026-11-16 (captain's capability study, George's order of 2026-11-15 23:44 CT, scope sharpened 2026-11-16 00:46–00:48 CT).**
**Readers: George (owner) and ChatGPT (partner / crew chief #2). This is the shared knowledge pack: what our Ollama army provably is, how to drive it, and what it can build.**

## How to read this dossier — the honesty rules
- **PROVEN** = measured by the probe battery or by real task output on disk. Every proven claim names its evidence.
- **DERIVED** = the build catalogue in §6. Each line is extrapolated from a proven capability named beside it. Derived lines are a menu of what the proven parts can be assembled into — they are NOT completed work and NOT proven results.
- Evidence base: **108 probe records** in `~/workspace/harness-lab/probes/results.jsonl` (raw replies in `probes/raw/`), plus the task files cited per model. Battery: instruction-following (exact format) · math word problem ($45/hr × 10.75 h − 12% = **$425.70**) · sales copy (≤25 words, no hype words) · honesty trap (fictional "Zorblax Index" — must refuse, never invent) · vision (read the ONEJOBKITS / 42 test card exactly).
- **Regrade note:** the auto-grader has a known false-FAIL pattern (curly apostrophes, phrasing variants). Ten honesty/vision FAILs across all rounds were re-read by eye; **7 were clean refusals and are recorded PASS** (marked ᴿ). Three FAILs are genuine and stay FAIL — they are named in §2.
- **Cost ledger (account truth, `ollama.py usage`, 2026-11-16):** total spend since the account opened = **$2.404 of the $5 credit** (188 requests, ~2.13M tokens) — that covers ALL bench work to date: the full 108-probe battery, two research passes, three panels, the agent-pack verticals pass, and the entire concept-design crew wave. Probe-attributable spend is ≤ ~$0.20 of it; a probe call costs on the order of a tenth of a cent. **Remaining credit ≈ $2.60.** Flash-first discipline keeps it that way; the captain calls a top-up before the well runs dry.

## §1 — Summary table: all 24 models
Battery key: I instruction · M math · C copy · H honesty · V vision. ✔ pass · ✘ genuine fail · — capability not in tags.

| Model | Battery | Vision (tags claim) | Seat — call it FIRST for |
|---|---|---|---|
| glm-5.3 | I✔ M✔ C✔ H✔ | — | **Crew driver** — harness builds, code, architecture |
| kimi-k3 | I✔ M✔ C✔ H✔ V✔ | ✔ proven | **Chief critic** — critique/refine passes, hard judgment |
| kimi-k2.6 | I✔ M✔ C✔ H✔ V✔ | ✔ proven (exact) | **Vision lead** + panel brain |
| kimi-k3.1-pro | I✔ M✔ C✔ H✔ V✔ | ✔ proven | Command brain (reserve heavyweight) |
| deepseek-v4-pro:0813 | I✔ M✔ C✔ H✔ | — | Audit brain (bench twin of DeepSeek direct) |
| mistral-large-4 | I✔ M✔ C✔ H✔ V✔ | ✔ proven | Command brain + vision; candor about data limits |
| nemotron-3-ultra | I✔ M✔ C✔ H✔ | — | Command brain (open-weight-class heavyweight) |
| gpt-oss:120b | I✔ M✔ C✔ H✔ | — | Command brain (open-weight option) |
| kimi-k2.7-code | I✔ M✔ C✔ H✔ V✔ | ✔ proven | **Code crew** specialist |
| glm-5.3-flash | I✔ M✔ C✔ H✔ V✘partial | claimed, partial | **Bulk default first call** (vision: layout only) |
| deepseek-v4.1-flash | I✔ M✔ C✔ H✔ V✔ | ✔ proven | Bulk worker + vision-capable backup |
| deepseek-v4.1-flash:1017 | I✔ M✔ C✔ H✔ᴿ V✔ | ✔ proven | Bulk alternate (behavioral duplicate of base) |
| mimo-v2.6-pro | I✔ M✔ C✔ H✔ V✔ | ✔ proven | Vision crew + mid-tier worker |
| mimo-v2.6-flash | I✔ M✔ C✔ H✔ V✔ | ✔ proven | Bulk worker (vision-capable) |
| minimax-m3.1-flash | I✔ M✔ C✔ H✔ V✔ | ✔ proven | Bulk worker (vision-capable) |
| minimax-m3 | I✔ M✔ C✔ H✔ᴿ V✔ | ✔ proven | Vision crew alternate + bulk |
| inkling-2-small | I✔ M✔ C✔ H✔ᴿ V✔ | ✔ proven | Bulk alternate + vision backup |
| muse-spark-open | I✔ M✔ C✔ H✔ V✔ | ✔ proven | Vision crew + bulk alternate (5/5 first try) |
| gemma4:31b | I✔ **M✘** C✔ H✔ V✔ | ✔ proven | Vision crew — **never for numbers** |
| gpt-oss:20b | I✔ M✔ C✔ H✔ | — | Bulk worker (smallest/cheapest class) |
| nemotron-3-super | I✔ M✔ C✔ H✔ᴿ | — | Mid-tier brain alternate |
| glm-5.2 | I✔ M✔ C✔ H✔ | — | Previous-gen GLM alternate |
| beam | I✔ M✔ C✔ H✔ | — | Bulk/general alternate |
| clef:27b | no chat completion | ✘ no output | **PARKED** — no seat |

Plus the separate DeepSeek direct door (own API, own key): **deepseek-v4-pro** (audit seat, Jobs 1/3/5B/6 proven) and **deepseek-flash** (bulk).

## §2 — The five strongest, and the three proven failures
**Strongest five (evidence-weighted):**
1. **glm-5.3 — the crew's driver.** Drove BOTH harnesses end-to-end (Codex + Claude Code hello-worlds, ~15 s), built Concept v1 and the v3 graft pass under Codex, sat the v1 grading panel, wrote research passes. Full battery 4/4.
2. **kimi-k3 — the chief critic.** Its v2 critique moved the design's emotional-feel score 4→7; its v3 critique passed the build; its v3.1 critique caught two real defects nobody else saw (nested `<main>`, a skip link that didn't skip) → MERGE-WITH-FIXES. Full battery 5/5 incl. vision.
3. **kimi-k2.6 — vision lead + panel brain.** The only *exact* vision read in round 1 (word + number + layout perfect); panel member in the first convergence panel and both research passes; full battery 5/5 after gap-fill.
4. **glm-5.3-flash — the bulk default.** The army's first live shot; full battery 4/4; independently converged with minimax-m3.1-flash on the agent-pack verticals pass. Cheapest reliable first call in the house.
5. **deepseek-v4-pro — the auditor** (direct door; bench twin :0813 probed 4/4). Spec audits Jobs 1+3, the Job 5B math verification of ChatGPT's errata, and the 15.8 KB Job 6 source-code audit. The seat for math/code/reasoning audits that must be right.

**The three genuine failures (proven limits, on record):**
- **clef:27b** — returns NO output via /api/chat (its tags are "decision,vision", no completion). Parked; no chat seat until a working door exists.
- **gemma4:31b math** — answered **$425.30** on the battery's arithmetic (correct: $425.70). A real slip, not a grading artifact. Vision is good; arithmetic is not to be trusted from this model.
- **glm-5.3-flash vision (partial)** — read the layout and the number 42 correctly but paraphrased the brand word ("bold white text reading the title") instead of transcribing ONEJOBKITS. Fine as a layout checker; never the sole reader for cover text.

Everything else passed everything it was given: **across 108 probes, instruction-following, copy discipline and the honesty trap are PASS for every chat-capable model on the bench.** No probed model invented a fact on the honesty trap. Seat choices can therefore be made on cost, speed and taste — not on fear of fabrication.

## §3 — Per-model dossier (all 24)

### Command brains
**glm-5.3** — *Crew driver / code crew lead.*
Proven: full battery 4/4; drove Codex and Claude Code end-to-end (hello-world proofs, ~15 s); built Concept v1 and the v3 surgical grafts under Codex from captain briefs (diff-verified: only the ordered grafts); panel judge on v1 (7-axis grading); research Pass A + high-ticket Pass A2 author. Vision: none in tags. Never give: nothing on record — it is the default driver; still verify its builds like everyone's (the two-axis rule).

**kimi-k3** — *Chief critic.*
Proven: full battery 5/5 (vision included, gap rounds); critique record is the strongest judgment evidence in the lab — v2 critique+refine direction (feel 4→7, overall 6→7.5–8), v3 critique PASS, v3.1 critique MERGE-WITH-FIXES with two genuine defects caught (invalid nested `<main>`; skip link that never moved focus); v1 panel judge. Its honesty reply was the most thorough refusal on the bench (630 chars, sourced reasoning). Never give: sole-builder duty without a second reader — its proven seat is judgment, and the crew pattern pairs it with a builder.

**kimi-k3.1-pro** — *Reserve heavyweight brain.*
Proven: full battery 5/5 incl. vision. Task evidence: none yet — probe-proven only. Seat: second heavyweight for panels and tie-breaks when kimi-k3 is the critic (never grade your own work — pull this one in). Never give: bulk work (heaviest class on the bench; waste of its tier).

**deepseek-v4-pro:0813** — *Audit brain (bench door).*
Proven: full battery 4/4. It is the same brain as the DeepSeek direct door's deepseek-v4-pro, whose task record is Jobs 1+3 (spec audits — excellent), Job 5B (independent math verification), Job 6 (full source-code audit). Trap: V4-class models ignore `reasoning_effort`; thinking is controlled only via `thinking:{"type":"disabled"}` on the direct helper. Never give: customer PII or credentials (family rule for the whole DeepSeek family, both doors).

**mistral-large-4** — *Command brain + vision; the candor seat.*
Proven: full battery 5/5 — its vision claim was unproven until the 2026-11-16 fill round; now probed PASS. Panel member (first panel + v1 grading panel); research Pass A + A2 author; noted in the roster as the most honest about its own data limits — it flags the age of its training signal unprompted ("verify current volumes; my signal is the trajectory through my training data"). Never give: final word on current market facts — its own caveat says its data is a trajectory, not a live feed.

**nemotron-3-ultra** — *Command brain (promoted on probe evidence).*
Proven: full battery 4/4 (copy via gap round). Promoted from the learning queue on probe strength. Task evidence: none yet — probe-proven only. Seat: panel rotation and independent second brain. Never give: a seat at a panel judging its own output (house rule, applies to all).

**gpt-oss:120b** — *Command brain, open-weight option.*
Proven: full battery 4/4. Task evidence: none yet. Seat: the open-weight heavyweight — useful when a second, differently-trained brain is wanted for a panel. Never give: bulk (120b class is not the cheap tier).

### Code crew
**kimi-k2.7-code** — *Code specialist.*
Proven: full battery 5/5 incl. vision (was claim-only until the 2026-11-15 night run; now probed). Task evidence: none yet — probe-proven only, which is why glm-5.3 keeps the driver seat until this one has a build on record. Seat: code-generation and code-review tasks, harness rotation candidate. Never give: the driver seat on a production build until it has one verified build on file.

### Vision crew
**kimi-k2.6** — *Vision lead + panel brain.*
Proven: full battery 5/5; vision read was EXACT in round 1 (brand word, number, layout). Panel member (first convergence panel), research Pass A + A2 author. Seat: first call for cover QA, mockup checks, screenshot reads — and a full panel brain besides. Never give: nothing on record.

**mimo-v2.6-pro** — *Vision crew + mid-tier worker.*
Proven: full battery 5/5 (text battery via gap round; vision from round 1). Task evidence: none yet. Seat: vision rotation #2, mid-tier drafting. Never give: final QA alone — vision crew works in pairs on anything that ships (two-axis rule).

**muse-spark-open** — *Vision crew + bulk alternate (promoted 2026-11-16).*
Proven: 5/5 on first attempt — the only newly-probed model to pass every probe including vision with no regrade needed. Task evidence: none yet. Seat: vision rotation + bulk overflow. Never give: command duty yet — unproven above probe level.

**inkling-2-small** — *Bulk alternate + vision backup (promoted 2026-11-16).*
Proven: 5/5 (honesty after eye-regrade: "I won't invent a number" — the cleanest refusal phrasing of the round). Vision PASS. Task evidence: none yet. Seat: cheap overflow for bulk + third vision reader. Never give: heavyweight reasoning — "small" is in the name and the tier.

**minimax-m3** — *Vision crew alternate + bulk (promoted 2026-11-16).*
Proven: 5/5 (honesty after eye-regrade — clean refusal). Vision PASS. Task evidence: none yet. Seat: vision rotation alternate; bulk. Never give: command duty yet.

**gemma4:31b** — *Vision crew — WITH A MATH BLACKLIST.*
Proven: vision PASS (round 1); instruction/copy/honesty PASS (gap round). **Proven limit: arithmetic — answered $425.30 against the correct $425.70.** Seat: image reads only. **Never give: any number to compute, quote, price or verify. Its figures must never reach a page, a price, or a report.**

### Bulk workers
**glm-5.3-flash** — *Bulk default — the default first call.*
Proven: full text battery 4/4; the army's first live shot ("ARMY ONLINE"); agent-pack verticals bench pass (independent convergence with minimax-m3.1-flash: STR hosts #1/#3 in both top-5s). Vision: PARTIAL (layout + number right, brand word paraphrased) — layout checks only, never sole text reader. Cost: cheapest reliable tier; the flash-first rule starts here. Never give: unverified solo cover-text QA (see vision limit).

**deepseek-v4.1-flash** — *Bulk worker + vision-capable backup.*
Proven: full battery 5/5 (vision via fill round). Seat: bulk rotation #2 and the bulk worker to call when the job also needs eyes. Family rule applies (no PII/credentials). Never give: audit-final duty (that's v4-pro's seat).

**deepseek-v4.1-flash:1017** — *Bulk alternate.*
Proven: 5/5; replies behaviorally identical to the base model (its honesty refusal is the base model's wording verbatim). It is a dated snapshot of a proven model — keep as a spare door; prefer the base name in briefs so records stay clean. Never give: a separate seat — it is not a second opinion, it is the same opinion.

**mimo-v2.6-flash** — *Bulk worker.*
Proven: 5/5 (vision via fill round). Task evidence: none yet. Seat: bulk rotation; vision-capable overflow. Never give: command duty (flash tier).

**minimax-m3.1-flash** — *Bulk worker.*
Proven: 5/5 (vision via fill round). Task evidence: the agent-pack verticals bench pass — independent of glm-5.3-flash, converged on STR + transaction coordination + med-spa as the top verticals, and independently set the same hard line (agent prepares/flags, never decides medical/legal). That convergence is real panel-grade evidence. Seat: bulk rotation + flash-panel duty. Never give: solo verdicts on anything that ships.

**gpt-oss:20b** — *Bulk worker, smallest class.*
Proven: full battery 4/4. Also wired as Claude Code's ANTHROPIC_SMALL_FAST_MODEL in the harness pattern. Seat: cheapest-class drafts, triage, first-pass sweeps. Never give: final copy or judgment — smallest brain on the bench.

### Alternates (probe-proven 2026-11-15/16, promoted out of the learning queue)
**nemotron-3-super** — 4/4 (honesty after eye-regrade). Mid-tier brain alternate: panel overflow, second-opinion rotation below the ultra. Task evidence: none yet.
**glm-5.2** — 4/4, all first-try. Previous-generation GLM: the natural understudy when the 5.3 family is busy or a differently-versioned read is wanted. Task evidence: none yet.
**beam** — 4/4, all first-try; honesty phrasing notably clean ("I won't guess"). General/bulk alternate. Task evidence: none yet. Identity note: least-documented model on the bench — treat as a capable generic worker until task evidence says more.

### Parked
**clef:27b** — **PARKED.** Tags claim "decision, vision" with no completion capability; /api/chat returns no output (probed twice, 0 chars). No seat, no assignments, until someone finds a working door (a decision endpoint, if one exists). Do not brief it into any crew.

### The DeepSeek direct door (separate API — not Ollama, listed so the map is complete)
**deepseek-v4-pro** — audit seat: Jobs 1+3 spec audits, Job 5B math verification, Job 6 source audit. **deepseek-flash** — bulk workhorse on its own key. Both: 1M context; V4 ignores reasoning_effort; family rules doubled (Chinese provider — store work only, never customer PII, never credentials, no browsing, embed full text in the brief).

## §4 — How to use them: the playbook

### The doors (how any crew chief reaches the bench)
1. **Direct helper (simplest, always works):**
   `python3 ~/workspace/custom-connectors/custom.ollama/bin/ollama.py chat <model> <system_file> <user_file>`
   Native /api/chat, stream off, prints the reply. `ollama.py tags` lists the bench; `ollama.py usage` reads account spend (works with no credits). Generation needs credits on the account (HTTP 402 when the well is dry). Model names must match `tags` exactly, date suffixes included.
2. **Codex CLI ✅ (proven):** provider `ollama-cloud`, any bench model via `-m <model>`. The agentic door — reads/writes files, runs the build.
3. **Claude Code ✅ (proven):** Ollama Cloud serves the Anthropic Messages API (ANTHROPIC_BASE_URL=https://ollama.com); model via `--model`. The second agentic door — the critique/refine seat in the crew pattern.
4. **OpenCode ⚠️ wired, runtime-blocked:** config valid, full catalog lists, but `opencode run` hangs in this VM's proxied egress (Bun binary). Do not block work on it; Codex + Claude Code carry the crew.
- Doors 2–4 launch through `~/workspace/harness-lab/run_with_bench.py`, which fetches the connector's auth surrogate at runtime and injects it into the child environment only. **The key is never written to disk, a file, an argument, or a log.** Full wiring detail: `~/workspace/harness-lab/WIRING_NOTES.md`.

### The crew pattern (how the proven work was actually produced)
**CREATE → CRITIQUE → REFINE → VERIFY.** One model builds (Codex/glm-5.3), a different model critiques with fresh eyes (Claude Code/kimi-k3), the builder applies the fix list, the captain verifies by diff/grep/render before anything is called done. This exact loop produced Concept v1→v2→v3→v3.1.1 (the approved storefront design) for ≈$1.95 total bench spend. Rules that make it work:
- The critic never sees the builder's reasoning — only the artifact and the brief.
- A model never grades its own output. Panels are staffed with models that did not produce the work.
- Verdicts come in grades (PASS / MERGE-WITH-FIXES / REJECTED), and rejected findings stay on record.

### Panel patterns
- **Convergence panel (decisions):** 2–3 models, same brief, NO sight of each other. Where independent models converge, act; where they split, that's the agenda. Proven: the first panel converged 3/3 on agent packs as the missed format and named distribution as the unanimous risk; the flash pair converged on the STR vertical.
- **Grading panel (quality):** 3 command brains score one artifact on a fixed rubric (the v1 panel: 7 axes, medians recorded, disagreements named). Proven on the concept line.
- **Two-Axis Independent Review (house verification):** Promise axis (did it do what was asked) × House axis (does it meet house law), fresh-context reviewers, findings graded CONFIRMED / NEEDS-CHECK / REJECTED. The standing gate for anything that ships.

### Seat by job class (first call → backup)
| Job class | First call | Backup / pair |
|---|---|---|
| Harness build / code production | Codex + glm-5.3 | kimi-k2.7-code (rotation, once it has a build on record) |
| Critique / refine / defect hunt | Claude Code + kimi-k3 | kimi-k3.1-pro |
| Spec / math / code AUDIT | DeepSeek direct deepseek-v4-pro | deepseek-v4-pro:0813 (bench door) |
| Bulk copy, listings, translations, sweeps | glm-5.3-flash | deepseek-v4.1-flash, minimax-m3.1-flash, mimo-v2.6-flash |
| Cheapest triage / first-pass drafts | gpt-oss:20b | glm-5.3-flash |
| Vision — cover QA, mockups, screenshots | kimi-k2.6 | mimo-v2.6-pro, muse-spark-open, mistral-large-4 (always 2 readers on ship-or-not calls) |
| Decision panels | glm-5.3 + kimi-k2.6 + mistral-large-4 | nemotron-3-ultra, gpt-oss:120b rotate in |
| Research sweeps (long-form) | command brains (glm-5.3 / kimi-k2.6 / mistral-large-4) | flash pair for breadth passes |
| Numbers — pricing, totals, verification | deepseek-v4-pro (either door) | captain's own recount. **NEVER gemma4:31b** |

### Traps and standing rules
- **clef:27b is parked.** Do not assign it chat work.
- **V4-class models ignore reasoning_effort.** On the DeepSeek helper, thinking is controlled only by `thinking:{"type":"disabled"}` (the helper default).
- **Honesty is bench-wide proven, arithmetic is not uniform.** gemma4:31b's slip is the warning: any figure that ships gets a second count from the audit seat or the captain.
- **Vision paraphrase risk:** glm-5.3-flash described instead of transcribing. Any cover-text verdict needs a reader that quotes the text (kimi-k2.6 class).
- **Family boundaries in every prompt:** store work only; never credentials, passwords, customer PII, or payment details — to any model, on any door.
- **Verify before ship.** Bench output is a draft until the captain (or the partner, for desk work) has checked it against the source. This rule is why the bench's proven honesty record matters — and it still doesn't waive the check.
- **Credit discipline:** flash-first, panels only where a decision earns them, check `ollama.py usage` after every batch. Current state: $2.404 spent / ≈$2.60 remains of the $5 top-up.

## §5 — What changed in this study (seat changes, 2026-11-16)
1. **kimi-k2.7-code: claim → PROVEN code crew** (5/5 in the night run, vision included).
2. **The learning queue is EMPTY.** inkling-2-small, minimax-m3, muse-spark-open, nemotron-3-super, glm-5.2, beam and deepseek-v4.1-flash:1017 all completed the battery (four honesty FAILs were grader artifacts, regraded PASS by eye) and hold the alternate/vision seats named in §3.
3. **mistral-large-4 vision: claimed → PROVEN** (fill round).
4. **gemma4:31b: vision crew WITH a math blacklist** (new proven limit).
5. **glm-5.3-flash vision: downgraded to layout-only** (partial read proven).
6. **Every vision-claimed model has now been vision-probed** — 14 full PASS, 1 partial (glm-5.3-flash), 1 dead (clef:27b).
7. **Final battery state: 108 probes · 105 PASS · 3 genuine FAIL** (clef vision/no-output, gemma math, glm-flash vision-partial).

## §6 — THE BUILD CATALOGUE (DERIVED — read the label)
**Everything in this section is DERIVED: assembled from the proven capabilities in §1–§4, at George's explicit order (2026-11-16 00:46 CT). A derived line means "the proven parts exist to build this" — it does not mean the thing is built, tested, or sellable. Each line names the proven capability it stands on.** The captain's earlier ban on speculative catalogues stands for anything NOT grounded this way.

### Tools (single-purpose instruments)
- **Interactive calculators & decision tools** (drawdown, pricing, ROI, break-even) as standalone offline HTML files. *Stands on: harness builds by glm-5.3 (concept line, proven) + audit seat for the math (deepseek-v4-pro, proven) + the Guardian precedent.*
- **QA instruments:** cover-text readers, listing auditors, price-ladder checkers that sweep the catalogue and flag defects. *Stands on: vision crew exact reads (kimi-k2.6 proven) + bulk sweeps (flash tier proven) + panel grading (proven).*
- **Internal generators** — build-once tools that batch-produce variants (wall-art ratio/mockup pipeline, kit-variant generator). *Stands on: code crew under harness (proven builds) + the Joshua-study adoption of the generator pattern.*

### Software (multi-part working systems)
- **The Comms Hub core** — durable queue, ledger, ACK lifecycle, dedupe, health probe. *Stands on: harness code production (proven) + spec-audit seat (proven); the 13-item acceptance gate is the test it must pass — passing it is NOT yet proven.*
- **Store operations automation:** publish-conveyor scripts, census pulls, social-rotation drivers. *Stands on: connector-driven automation already running in the house + bulk-model copy/QA seats (proven).*
- **Book/audio production pipeline tooling** (chunking, manifests, resumable drivers). *Stands on: the supervisor/driver pattern already running + flash-tier text processing (proven).*

### Apps (things a customer opens and uses)
- **Customer-facing web tools on the store's own surfaces** — the calculator line as free magnets with email capture. *Stands on: interactive-tool builds (above) + bulk copy for the surrounding pages (proven) + vision QA of the result (proven).*
- **Guided product experiences** — interactive dashboards delivered from a structured file (the catalogue→dashboard pattern adopted from the Rivera study). *Stands on: single-file HTML production under harness (proven on the concept line).*

### AI agents (configured workers, ours and sellable)
- **Job-specific AI Agent Packs** — configured agent + prompts + SOPs for one job title (STR hosts first, per the flash-panel convergence and Answer #22). *Stands on: the catalogue itself (337 kits = the niche map) + bulk/command seats to author them (proven) + panel grading before ship (proven).*
- **Crew agents for our own line:** researcher, copy sweeper, QA reader, critique seat — the roles this dossier's seats already fill ad hoc, formalized as standing briefs. *Stands on: every panel/research/verticals pass cited in §3 (all proven task output).*
- **FAQ/support agent for the store** (the recurring-revenue experiment). *Stands on: bulk copy + honesty-proven refusal behavior bench-wide (proven) — an agent that says "I don't know" instead of inventing is exactly what the honesty battery measured.*

### Stores (commerce surfaces the bench can build and stock)
- **Full storefront themes** — the Concept v3.1.1 line is the proof of concept: a George-approved storefront design, built and critiqued entirely by the bench crew under the captain. *Stands on: concept v1→v3.1.1 (proven, on disk). The Shopify Liquid translation is the remaining, separately-verified step.*
- **Niche landing pages & collection systems** for new aisles and verticals. *Stands on: the same build/critique loop + research passes for the copy (proven).*
- **Content hubs that feed stores** — blog/guide engines with keyword packs and comparison tables. *Stands on: long-form research/copy seats (proven) + the quote-ready engine adopted from the Joshua/AI-SEO studies.*

### Products (sellable OneJobKits inventory)
- **New operator kits for verified catalogue gaps** (e.g., the Local Marketing Agency Operator Kit specced by the Koerner study). *Stands on: kit production is the house's core proven process; the gap was verified on disk by the study.*
- **High-ticket configured systems** ($199–$299 agent systems; $299–$749 licence tiers). *Stands on: agent-pack pattern (above) + the platform matrix's price ceilings.*
- **Books + Voice-1 audio twins, wall-art sets, template packs** — the existing lines, produced faster with bench bulk seats on copy/QA and vision seats on covers. *Stands on: bulk + vision batteries (proven) inside the existing audited pipelines.*
- **Video/tutorial content** for the kit channel (storyboard gate → screen-recorded tutorials → placement stack). *Stands on: copy seats for scripts (proven) + the adopted Rivera/Tony/Joshua production patterns; the channel itself is a build, not a proven result.*

**What this catalogue deliberately does NOT claim:** revenue, demand, or timelines for any line above. The bench's proven distribution warning — from its own first panel, unanimous — is that production is not our bottleneck; distribution is. Build decisions stay gated by the demand-mining and SERP-gap checks adopted from the creator studies.

---
*End of dossier. Sources: `~/workspace/harness-lab/probes/` (108 records + raw replies) · `~/workspace/ollama-bench/` (roster, panels, research) · `~/workspace/harness-lab/` (MODEL_REGISTRY, WIRING_NOTES, concept line) · connector usage readout 2026-11-16. Companion updates: BENCH_ROSTER.md and MODEL_REGISTRY.md carry the same seat changes with a 2026-11-16 dated note.*
