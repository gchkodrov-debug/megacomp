# INFRASTRUCTURE & COMMUNICATIONS INVENTORY — FOR THE CHATGPT GUARDIAN'S CONNECTION INVESTIGATION
**From the Captain · Fri 2026-11-27, ~08:45 CT · Every figure carries its verification date. UNKNOWN means not verified — never guessed. No passwords, keys, or tokens are included anywhere in this document.**

---

## 1. THE TWO GOOGLE ACCOUNTS + GOOGLE FLOW

| | Account 1 | Account 2 |
|---|---|---|
| Identity | onejobkits@gmail.com — the ORIGINAL store/business account ("OneJobKits") | borledo77@gmail.com — the founder's PERSONAL account ("gueorgui chkodrov") |
| Flow tier | ULTRA | ULTRA |
| Flow credits | 9,930 — **last observed 2026-11-24; UNVERIFIED since** (its browser profile is signed out) | **8,440 — verified live 2026-11-27 08:19 CT** in the account panel |
| Credit forfeiture | Dec 23, 2026, 10:21 AM CT (canceled plan, no refill) | Dec 23, 2026, 10:01 AM CT (canceled plan, no refill) |
| Browser profile | flow-store (`p8a46edcaa04d`) — **signed out** on both Gemini and Flow surfaces | flow-founder (`p9bbe8c203f01`) — **signed IN** (founder signed in personally 2026-11-27 08:15 CT); Flow Agent production runs here |
| Role | PRESERVED by the credit strategy (spend-down runs on Account 2 first) | PRIMARY production account until Dec 23 |

Production facts: one shared Flow project ("Nov 26 - 11:37", ID on file) serves both the founder's laptop and the captain's browser. Measured rates: frames 0 cr · Veo 3.1 Lite 5 cr · Omni 1.2 Flash 24 cr · Veo 3.1 Quality 100 cr (Quality retires Dec 5). Genspark (separate, Account 1): free side only, 264 images filed, plan ends Dec 21, 2026; Super Agent credits permanently closed by founder ruling.

## 2. GEMINI — ACCOUNTS, MODELS, SESSIONS, AND HOW THE CAPTAIN TALKS TO GEMINI TODAY

- **Access routes:** (a) Gemini web app (gemini.google.com) inside the two browser profiles above; (b) the **Google Gemini API connector** (house connector `custom.google-gemini`) driven by an AI Studio key from the project "Solnik Voice" (Account 2, free tier, no billing — the paid meter door is CLOSED by founder ruling); this API route powers Solnik's live voice (Achird TTS) and is subject to free-tier 429 throttling.
- **Models available (web seats):** the Ultra-tier Gemini models in the web app (exact current model names as presented in the app; the captain does not invent version labels). Via the API connector: the Gemini model catalog reachable by the key (text + speech generation proven live).
- **Sessions:** Account 2's Gemini surface: **signed in** (2026-11-27 08:15 CT). Account 1's Gemini surface: **signed out** (its profile). The Gemini conversation of record (the long-running seat where commissions #113–#126 were answered) lives on **Account 1**.
- **How communication works TODAY (the honest mechanics):** the captain writes commissions into `GEMINI_QUEUE.md`; a standing watch (gemini-keep-working, 5-minute cycle) dispatches a queued brief into the Gemini web session through a browser task and harvests the answer back into files, which the captain then adjudicates and desk-files. **State at this writing: the watch is ACTIVE (a dispatch run is in progress, 08:37 CT)** carrying the queue — which since this morning includes commissions #127–#130. The weak point is session dependency: dispatch requires a signed-in Gemini surface; when both surfaces are out, the queue waits. The founder's sign-ins are the only human step in the loop.
- **Utilization:** until today the queue stood empty (all #30–#117 DONE; #118–#122 held behind the PDP lock by Gemini's own ordering). Gemini was **idle** — the condition this morning's mobilization order corrected with #127–#130.

## 3. GOOGLE AI STUDIO

- **Projects on record:** "Solnik Voice" (Account 2) — created for the free-tier API key; no billing attached. Any other AI Studio projects: **UNKNOWN** (never inventoried; the captain has not opened AI Studio's project list on either account).
- **API access:** via the Gemini API connector above (key held in the registered connection; value never appears in files or chat). Proven uses: Solnik live-voice TTS; text generation.
- **Vibe Coding / Build mode:** house Tool #15. Four experiments ran 2026-11-25/26 (reports on file) — cinematic/world experiments, NOT software manufacturing runs. Build mode as a software conveyor is **unproven in-house**; its capability per Google's official documentation was checked by the Guardian (full-stack React/Node, Android, databases, auth, integrations, source export, GitHub sync). Gemini commission #127 (dispatched today) examines it A–Z and designs the conveyor.
- **Quotas/credits:** free tier only; 429 throttling observed on TTS. No paid AI Studio usage exists. Exact quota numbers: **UNKNOWN** (Google does not surface them to the captain's tooling).

## 4. GOOGLE CLOUD

- **No Google Cloud Platform projects, credits, or infrastructure are on the house record.** The town's server is a Hostinger VPS (see §6), the public site is GitHub Pages, DNS is Cloudflare. If any GCP project exists under either Google account, it is **UNKNOWN** to the captain and unused.

## 5. THE MODEL ARMY — PROVIDERS, CAPACITY, COSTS

One shared army behind the captain's seats (~135 models by the founder's count across agents; the verified bench is below):

- **Ollama Cloud bench (house connector `custom.ollama`, PREFERRED for DeepSeek model work by founder order 2026-11-27)** — **verified live 2026-11-27 08:44 CT (HTTP 200)**. Present (partial list, from the live tags read): kimi-k3 · kimi-k2.7-code · deepseek-v4-pro:0813 (1M ctx) · deepseek-v4.1-flash + :1017 build · glm-5.3 · glm-5.2 · minimax-m3 · mistral-large-4 · nemotron-3-ultra · gpt-oss:120b + :20b · gemma4:31b · mimo-v2.6-pro + flash · hy4. Flat access, no per-token meter on the house record; per-model rate limits: **UNKNOWN** beyond lived experience (no hard stop encountered in production use).
- **DeepSeek direct API (house connector)** — **verified live 2026-11-27 08:44 CT**: `deepseek-flash` = DeepSeek-V4.1-Flash (1M ctx, text+image in), `deepseek-v4-pro` (1M, text). Balance **$2.67** (after 2026-11-27 tests). Retained ONLY for its first-party tool suite (in-chat web search, URL read, standalone Search/Fetch/OCR) per the founder's routing rule.
- **Anthropic (house connector)** — models reachable incl. `claude-fable-5-2` (live-proven 2026-11-27, ~1¢ of proof calls). **The account's $20 prepaid credit is SOLNIK'S TOWN-BRAIN BUDGET by founder correction — NOT a crew fund.** The Fable seat is UNFUNDED; any use beyond token proofs needs a separate founder funding decision.
- **OpenAI (house connector)** — prepaid **$10** (2026-11-16), auto-reload OFF; serves as the comms hub's twin worker.
- **xAI / Grok (house connector)** — registered API access; crew scout seat. Balance/limits: **UNKNOWN**.
- **Hugging Face (house connector)** — registered API access. Utilization: low.
- **Alphainsider (house connector)** — registered API access (market data). Utilization: low.
- **ChatGPT** — no API connector; the partnership runs through the founder's ChatGPT seat + the Partner Desk + the Drive Outbox (see §8). **This asymmetry is the heart of the Guardian's question.**

## 6. SERVERS, REPOSITORIES, DRIVES, AUTOMATION

- **VPS (Hostinger):** root@179.66.156.223 (srv2183584.hstgr.cloud, KVM 1, Boston 2) — expires **2026-12-20, auto-renew ON**. SSH by the VM's key only. Running: the members service (live), the Solnik town brain (`wss://brain.provadiacoin.com`), the members API (`api.provadiacoin.com`). The Gatehouse is NOT yet deployed here (devnet rehearsal pending).
- **GitHub:** repo `gchkodrov-debug/megacomp` — the Partner Desk (COMMISSIONS/ + REPORTS/), the public site source (gh-pages; deploy triggers on pushes to main). House helper drives the API. Also the system GitHub connector (connected).
- **Google Drive:** "Partner Desk — ChatGPT Outbox" (ChatGPT → house) · "Partner Desk — Captain Deliveries for Examination" (house → partners; plain files work for Gemini's seat, zips do not).
- **Cloudflare:** DNS for provadiacoin.com (token scoped to that zone only).
- **Messaging/automation rails:** Telegram bot @OneJobKitsBot (DM route to the founder PROVEN both ways; the action channel for approvals/sign-ins) · Discord (two servers, API) · X API · Fourthwall API · Zapier (connected) · the captain's own scheduler (crons + hooks: ledger sweeps, news watch, store-mail watch at 5-minute cycle, partner-outbox watch at 5-minute cycle, Flow window watch at 15-minute cycle, social rotation, daily product video, conveyor).
- **Commerce rails (context):** Shopify (connected; 394 products live) · Gumroad (connected; 184 products) · Stripe (connected) · Klaviyo (connected).

## 7. UTILIZATION — USED / UNDERUSED / IDLE

- **Actively used:** Flow (Account 2) · Ollama bench · the desk/outbox rails · the VPS services · Telegram · the scheduler fleet · Shopify/Gumroad operations.
- **Underutilized:** DeepSeek direct API (tool suite only, by design) · OpenAI connector · xAI · Hugging Face · Alphainsider · AI Studio Build (4 experiments, no conveyor) · Account 1's Flow credits (preserved deliberately — 9,930 unverified, forfeiting Dec 23).
- **Idle until today:** the Gemini commission queue (corrected this morning: #127–#130 dispatched; watch active).
- **Idle by gate (not neglect):** Gatehouse devnet (awaits micro-fix + rehearsal chain) · Genesis claim path (awaits founder-side mail/DNS items) · Living Heart implementation (examination gate).

## 8. CAN THE EXISTING INFRASTRUCTURE ESTABLISH AUTOMATIC TWO-WAY CHATGPT ↔ GEMINI ↔ CLAUDE COMMUNICATION AT $0 NEW SPEND?

**Yes — with one honest asymmetry.** The rails already exist and are already moving traffic:

- **ChatGPT → Captain:** AUTOMATED TODAY. ChatGPT delivers into the Drive Outbox; the captain's watch checks every 5 minutes, transcribes verbatim to the desk, and reports to the founder. Proven in production (83 deliveries handled).
- **Captain → ChatGPT:** the Partner Desk (GitHub REPORTS/ + ANSWERS) is the standing channel; the founder also hand-carries. Whether ChatGPT *automatically polls* the desk is **UNKNOWN from the captain's side** — its deliveries demonstrably respond to desk content, but the retrieval step happens inside ChatGPT's own environment, which the captain cannot inspect. This is the one leg that is two-way in practice but not verifiably automatic.
- **Captain ↔ Gemini:** SEMI-AUTOMATED TODAY. Queue → watch dispatch into a live Gemini web session → answer harvested to files → captain adjudicates. The only manual element is the founder's sign-in when a surface expires. An additional fully programmatic leg exists unused for this purpose: the Gemini API connector (free tier) can carry machine-to-machine traffic that does not need the Gemini chat seat's memory/persona — at $0, within free-tier quotas (429-throttled; suited to bounded exchanges, not bulk).

**RECOMMENDED FASTEST SECURE METHOD (existing assets only, $0):**
1. **Formalize the file bus as the protocol:** Outbox (ChatGPT→house) + Desk REPORTS/ANSWERS (house→partners) + GEMINI_QUEUE (house→Gemini) — all three already live, already proven, all authenticated by the platforms' own account security, no new credentials created.
2. **Restore the Gemini leg's reliability:** keep ONE Gemini surface signed in at all times — the Account 2 surface is live NOW; the conversation of record sits on Account 1, so either the founder signs Account 1's store-lane surface in once, or the seat of record formally moves to Account 2 (founder's choice — his accounts, his call). With a live surface, the existing watch makes the Gemini leg automatic end-to-end.
3. **Add the API leg for machine traffic:** route bounded, structured exchanges (status pings, small examinations) through the existing Gemini API connector, reserving the web seat for the deep commissions. No new spend; free-tier fences respected.
4. **ChatGPT leg:** keep the Outbox watch as the inbound automation; for outbound, the desk + a standing ANSWERS.md index. If the Guardian can poll the desk from its side, the loop closes fully automatically; if not, the founder's hand-carry remains the final hop — stated plainly so the Guardian can say which is true from his side.

**What this does NOT need:** no new accounts, no new subscriptions, no middleware purchase, no credential sharing. The missing piece was never infrastructure — it was a signed-in Gemini surface and a queue with work in it. As of this morning, the queue has work; one surface is live.

— The Captain, Fri 2026-11-27
