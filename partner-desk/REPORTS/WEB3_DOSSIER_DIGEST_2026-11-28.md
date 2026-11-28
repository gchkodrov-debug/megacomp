# GOOGLE WEB3 DOSSIER — CAPTAIN'S DIGEST + VERDICTS
### Source: independent dossier, official Google sources first, researched 2026-11-28 (full report: research_notes/google-web3-opportunity-dossier-20261128-0724/report.md)
### For: the three-partner reconciliation of the Web3 examination (army ORCH-0030/0031/0032 reconcile against THIS, not the pre-dossier claims)

## ⚠️ DECISION-CRITICAL: THE INFRASTRUCTURE IS BEING SWITCHED OFF
**Blockchain Node Engine AND Blockchain RPC shut down on 15 December 2026.** New nodes/endpoints have been disabled since 15 June 2026. Google's own migration target is **Quicknode** (a third party). Sources: docs.cloud.google.com/blockchain-node-engine release notes + migrate-to-quicknode (updated 2026-11-10). Google's /web3 marketing page still promotes Node Engine with no mention of the shutdown — marketing and docs diverge; the docs win.
- Blockchain RPC was **Ethereum-only** (Solana never supported). Its ~1M requests/day free Preview tier is real — and irrelevant: the service is deleted Dec 15 and has no paid tier beyond Preview. **REJECT any build on RPC/BNE.**

## THE GALLERY — MUCH SMALLER THAN THE SCREENSHOT IMPLIED
Exactly **3 apps** (verified live at cloud.google.com/application/web3/ai-playground): Ethereum Data Analytics Agent · Aptos Data Analytics Agent · Bitcoin Data Analytics Agent — all "AI agent that analyzes X blockchain data" chat demos. Fork/Try require AI Studio sign-in. **No Solana app. No wallet/DeFi app. No public GitHub repo found (NOT VERIFIED).** Verdict: **PARK** — pattern references for analytics-agent design, nothing to build on.

## SOLANA — WHAT SURVIVES
BigQuery **Solana dataset** (live, official Blockchain Analytics list) · a Google-run **validator** · the **PYUSD Solana Devnet faucet** (portal BETA faucet, 12 networks). BNE Solana nodes were only ever limited preview and die with BNE. The data layer is the real Solana asset.

## ADK / A2A / MCP — THE STRONGEST FINDING
ADK is **Apache 2.0 open source**, runs locally, and is **model-agnostic** (Gemini/Gemma native; Claude native class; OpenAI + 100+ via LiteLLM; **Ollama/vLLM local**) with first-class MCP (consume + expose) and A2A in both directions. **A2A was donated to the Linux Foundation (23 Jun 2025)** — a neutral standard, not a Google leash. This aligns directly with the intelligence-independence objective. No official Google Web3 ADK sample exists (community work only). Verdict: **TEST** — beside the orchestrator, per the preservation rule; the agents examination (ORCH-0031) grades the seams.

## STARTUP PROGRAM — THE $200K, READ CAREFULLY
- **Start:** up to $2,000 / 1 year (founded ≤24 months, MVP, no prior credits).
- **Scale:** up to $200,000 / 2 years for Cloud + Firebase — structured **Year 1: 100% up to $100k · Year 2: only 20% up to $100k**. Eligibility is venture-shaped: Pre-Seed/Seed within 5 years or Series A within 12 months, founded ≤5 years, ≤$4,000 prior credits. Token/NFT raises and blockchain-foundation grants DO qualify as funding. **Excluded: dev shops/agencies, mining, IPO'd/acquired, nonprofits.** Acceptance at Google's discretion; application requires a domain-matching business email + a billing ID.
- House read: PROVADIA's eligibility is **doubtful on the face of the criteria** (no venture raise of the named shapes) — examined only, **no application** (founder authorization required, and none given). A distinct general AI Scale track advertises up to $350,000 — same venture-shape caveat.

## AI STUDIO BUILD — OWNERSHIP GOOD, FREE HOSTING MOSTLY NOT FOR US
- IP: Google's terms state it **won't claim ownership** over generated content; full export (GitHub two-way sync / ZIP) is real. Software independence holds.
- The "2 free apps on Cloud Run, no billing account" Starter Tier is **real but ineligible** for accounts that are Workspace, have an active/prior paid Cloud billing account, or lack account activity — most established teams won't qualify. Do not plan on it.
- Privacy catch: on **Unpaid Services**, submitted content may be used to improve Google products and may be human-reviewed — never submit sensitive/confidential material in free-tier Build sessions (house practice already complies).

## GCUL (Google Cloud Universal Ledger)
Public docs exist (updated 2026-11-13); GA status and pricing **NOT VERIFIED**. Verdict: **PARK**.

## RECONCILED VERDICTS
- **BUILD ON:** BigQuery blockchain data (incl. Solana) · ADK/A2A/MCP (TEST-beside, Apache/neutral) · startup credits IF eligibility ever holds (no application authorized)
- **PARK:** the 3 gallery demos · GCUL · Artlist-class paid aggregators
- **REJECT:** any new build on Blockchain RPC / Blockchain Node Engine (shutting down Dec 15, 2026)
