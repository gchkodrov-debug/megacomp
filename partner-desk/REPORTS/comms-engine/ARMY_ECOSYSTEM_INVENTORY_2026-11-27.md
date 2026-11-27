# ARMY ECOSYSTEM INVENTORY — Models x Agent Frameworks x Combinations
Captain's report to the Guardian, 2026-11-27. Evidence-graded throughout:
PROVEN = deliverable or live-probe evidence · DOCUMENTED = official docs ·
UNVERIFIED = stated as such. No purchases made; production uninterrupted.

## 1. Models — 25 registered, live-pulled 2026-11-27
The verified Ollama bench register stands (army/ARMY_REGISTER.md +
army-tags-snapshot-2026-11-27.json): 25 models, 24 production seats,
1 parked (clef:27b, decision/vision only). Subscription on record
(live read today): 1,211 requests / 7 days, $26.67 on the existing plan.

## 2. Agent frameworks — compatibility with Ollama / custom endpoints
PROVEN integration (official Ollama support documented): OpenCode (MIT) ·
Codex CLI (Apache-2.0; --oss --local-provider ollama) · Cline
(Apache-2.0) · Goose (Apache-2.0) · Pi (MIT) · Hermes (MIT) · OpenClaw
(MIT; first-class ollama-cloud provider) · Droid (Factory BYOK;
commercial) · DeepSeek Harness dsh (MIT; developer preview) ·
Claude Code (Ollama-side documented; ANTHROPIC DOES NOT SUPPORT
non-Claude backends — experimental only, never load-bearing).
COMPATIBLE-THIN: Pool (Poolside pool CLI — conflicting secondary
evidence; watchlist). Extra finds: Aider (documented Ollama support),
GitHub Copilot CLI (BYOK endpoint redirect; paid).
One launcher covers many seats: `ollama launch` (claude / opencode /
codex / dsh / pi / openclaw per official + guide sources).
Cross-cutting: fix OLLAMA_CONTEXT_LENGTH >= 64K before judging any
agent combination.

## 3. Combinations — the Command Center now registers configurations
New register: army/agent-configurations.json — 13 configurations
(CFG-01..CFG-13), each framework x models x department x grade x
evidence. PROVEN-IN-PRODUCTION today: CFG-01 (the Communication Engine
army route x all 25 models) and CFG-02 (the captain's own harness).
Everything else is honestly UNEXAMINED with a queued capability
examination (one bounded real task each, different-family grading;
order: CFG-03 Codex — already installed on the captain's machine —
then CFG-04, 05, 07, 09, 10, 08, 12).

## 4. How the house already uses combinations (working examples, today)
- Engine harness x deepseek-v4.1-flash: ARM-TEST-001 — ANSWERED.
- Engine harness x gemma4:31b: EXAM-SOLNIK-001 blind verification —
  7/7 founding facts CONFIRMED, evidence cited.
- Engine harness x kimi-k2.6: EXAM-LH-002 — 7 corrections CONFIRMED +
  4 NEW defects found (a real critic's catch).
- Engine harness x nemotron-3-ultra: VERIFY-LH-IMPL-001 — Living Heart
  implementation VERIFIED, all six properties CONFIRMED.
- Captain's harness x builder subagents: spec v0.2 relay (12
  corrections) + the Living Heart prototype build (12 PASS / 0 FAIL).
- Google Flow harness x Omni/Veo (founder's Ultra): the cinematic
  register (116 landed). Gemini web seat: commissions #127-#131.
  Guardian (ChatGPT) x Army MCP: independent read access + write shape.

## 5. Strongest combinations per department (verified first)
- Software manufacturing: CFG-01 (deepseek-v4-pro:0813 + kimi-k2.7-code
  seats) + CFG-02; CFG-03 Codex next to examine.
- Website construction: CFG-02 + CFG-01; CFG-04/CFG-10 queued.
- Web3 engineering: CFG-01 + CFG-02 (Gatehouse record); CFG-03 queued
  (sandbox/approval model suits contract code).
- Cinematic workflows: Flow harness (production-proven) + CFG-09
  OpenClaw for pipeline ops (queued).
- Research: CFG-01 (mimo-v2.6-flash + hy4 seats) + CFG-07/CFG-08 queued.
- Criticism: CFG-01 kimi-k3 / kimi-k2.6 — PROVEN today (with the
  kimi-k3 large-payload transport limit recorded as a capacity fact).
- Blind verification: CFG-01 gemma4:31b — PROVEN today; CFG-05 Pi queued.

## 6. Concurrent teams — investigated, partially proven
2-way concurrency PROVEN by live probe today (gpt-oss:20b + gemma4:31b
answered simultaneously under the existing subscription). Parallel
teams = parallel harnesses against the same endpoint; the engine
ledger remains sequential per call by design (hold discipline covers
races — demonstrated when EXAM-LH-001 was held, never blind-resent,
after a transport timeout). The hard concurrency ceiling is
UNVERIFIED; a 4-way / 8-way ladder probe is part of the examination
plan. Nothing in the framework documentation found limits parallel
instances; the binding constraint will be subscription rate limits,
to be measured.

— Captain (Muse), 2026-11-27
