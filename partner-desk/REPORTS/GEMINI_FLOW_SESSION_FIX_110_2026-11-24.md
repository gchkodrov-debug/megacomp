# GEMINI FLOW SESSION PROBLEM — PERMANENT FIX RULING — #110
# Full verbatim returned in dispatch run (browser task 26317f90-74c8-5ccd-91b6-dd64d73d71e9, ran 22:18–22:28 CT harness-measured), answer complete — last turn in the conversation, prompt box empty, no generation in progress, no newer answer pending.
# Dispatched 2026-11-24 22:18 CT (watch run 22:17 CT) as one message to the existing Gemini session (gemini.google.com/app/46ea9941c6a01756, onejobkits@gmail.com, Ultra) carrying the full #110 brief as written in the queue + standing context (#67/#68/#71/#78, House Build ~5%). Session state found: SIGNED OUT on open; clicking Sign in auto-restored the founder's personal lane (borledo77@gmail.com, Ultra — his 22:12 CT hand re-sign-in); the login agent then signed in the store lane onejobkits@gmail.com from the saved login (reCAPTCHA cleared, password via login service, no one-time code required); the conversation was opened as /u/1/ in the signed-in OneJobKits (Ultra) tab and exactly ONE message was sent.

---

HOUSE BUILD PERCENTAGE: ~5% (measured strictly against the founder's 2026-11-24 10:24 CT 100% ruler; moves only on verified-complete, customer-eye-proven, Surfer-complete pieces)

ASSIGNMENT #110 — THE FLOW SESSION PROBLEM: HONEST VERDICT & LEAST-HASSLE OPERATING ARCHITECTURE (DEC 5 CLIFF → DEC 23 HORIZON)

The Honest Bottom-Line Verdict (Stated Plainly First)

No 100% "permanent set-and-forget" software bypass exists for Google consumer web sessions—Google's identity servers (accounts.google.com DBSC / cookie rotation / datacenter IP heuristics) ultimately control session lifetime on consumer Ultra accounts (onejobkits@gmail.com and borledo77@gmail.com). Anyone promising a permanent token-refresh hack on a consumer Google login in a headless cloud browser is selling an illusion that will break mid-shoot.

However, our current hourly sign-out storm is largely self-inflicted by four avoidable triggers running simultaneously inside one cloud-browser profile—and fixing those four triggers eliminates ~90% of the interruptions immediately at $0.00 new spend, while protecting every single credit before the December 5, 2026 cliff and December 23, 2026 founder pool expiration.

(1) Diagnosis — Why Both Accounts Keep Getting Killed Every Hour

Google's session-risk engine flags consumer Google accounts for immediate SID/HSID/__Secure-1PSID revocation whenever it sees three patterns together:

Multi-Account Switching Inside One Browser Profile (#1 Trigger): Keeping both onejobkits@gmail.com and borledo77@gmail.com signed into the same Chromium user-data directory and switching between them causes Google's session cookie jar (APISID / SAPISID / account-index /u/0 vs /u/1) to collide, triggering automated security invalidations across both accounts simultaneously (which is why both were found signed out together at 22:02 CT).

High-Frequency Automated Polling (5-Minute Watch) From a Datacenter/Rotating Cloud IP: A script reloading or pinging labs.google / flow every 5 minutes (288 hits/day) from a cloud VM IP looks identical to a credential-stuffing or scraping bot—causing Google to expire short-lived session cookies hourly.

Ephemeral / Unpersisted Chromium Profile Storage: If the cloud browser restarts without a locked --user-data-dir on persistent disk (or clears localStorage/IndexedDB), Google treats every launch as an unrecognized device login.

API vs. Web UI Reality Check (Why We Cannot Simply Swap Flow for Gemini API):

Google AI Ultra Web UI (labs.google / Flow): Paid via existing Ultra subscriptions (10,000+ credits already sitting in the founder's pool, expiring December 23, 2026). Gives access to Veo 3.1 Fast/Quality, Nano Banana 2.1 (0 credits), and Omni 1.2 Flash (24 credits).

Gemini API / Vertex AI (Veo 3.1 programmatic API): Billed per second of generated video ($0.15–$0.40/sec, i.e., $1.20–$3.20 per 8s clip) on a paid GCP/AI Studio billing account—it does NOT draw from your Google AI Ultra subscription credits, violates our standing free-tier-only programmatic Gemini API fence and zero-new-spending fence, and Omni 1.2 Flash is not available on the free Gemini API tier anyway. Therefore, the Flow Web UI is mandatory to spend the already-paid Ultra credit pool before Dec 23.

(2) Evaluation of All Five Roads ((a) Through (e))

Road — Verdict — Exact Engineering & Operational Reasoning

(b) Strictly Isolated Persistent Chromium Profiles Per Account (--user-data-dir) — ADOPT IMMEDIATELY (#1 Structural Fix) — Never put two Google accounts in one browser profile. Run two completely separate persistent Chromium profiles on the captain's machine (~/.chrome-flow-store for onejobkits@gmail.com and ~/.chrome-flow-founder for borledo77@gmail.com) with zero account switching inside either profile. Each profile keeps its own isolated device fingerprint, cookies, and IndexedDB.

(a) Batch-Firing Windows + Eliminating Background Polling (Replace 15-Min Watch With On-Demand Batch Windows) — ADOPT IMMEDIATELY (#2 Structural Fix) — Stop polling Flow every 5 or 15 minutes when idle. Automated periodic background checks from a cloud VM are the #2 reason Google revokes cookies. Instead, keep the browser profile idle/closed between shoots, and when a shoot window opens, batch-fire 6–12 queued Shoot Book takes back-to-back in one uninterrupted 25-minute session (10,000 credits = 1,000 Veo 3.1 Fast takes; batching 10 takes per window clears the entire Films 01–37 book in just 3–4 clean sessions!).

(e) Google Session-Keeping Practices That Actually Work — ADOPT IMMEDIATELY (#3 Structural Fix) — 1. Persistent Disk --user-data-dir + Graceful Shutdown (SIGTERM, never kill -9): Killing Chromium abruptly corrupts the SQLite Cookies file, forcing a sign-out on next open. 2. Single Consistent Residential/Static Egress IP per Profile: Never route a signed-in Google profile through a rotating proxy pool (IP hopping mid-session = instant cookie death). 3. Human-Paced Keep-Alive Only During Active Batch Windows: Keep labs.google open in a single pinned tab only while a batch is actively running; close the browser cleanly once the batch downloads finish.

(d) Founder's Laptop as a Dedicated Low-Friction Burst Lane — RETAIN AS HIGH-PRIORITY BURST LANE (Zero Password Sharing) — The founder's laptop has a trusted residential IP + hardware TPM/passkey trust, so Google rarely challenges it. Respecting his time: Never ask him to babysit hourly watches—prepare the exact Nano Banana frames + verbatim prompts in advance so whenever he is already at his desk (like tonight's Film 10), he can fire 5–8 priority takes in 10 minutes with zero friction, while the captain's isolated store profile (onejobkits@gmail.com) handles bulk store/batch work independently.

(c) Programmatic Gemini API / Vertex AI (Veo 3.1) — REJECTED FOR BULK PRODUCTION (Violates Spend & Credit Rules) — Would require paid GCP/Vertex billing ($1.20–$3.20 per clip), leaves the founder's paid Ultra credits unspent before the Dec 23 expiration, and lacks Omni 1.2 Flash. Keep programmatic Gemini API strictly on the free tier (text/code/audit only).

(3) The Concrete Operating Playbook (Zero New Spend · Clears Dec 5 & Dec 23 Deadlines)

Split the Cloud Browser Into Two Hard-Isolated Profiles Tonight:

Profile A (~/.chrome-profiles/flow-store → onejobkits@gmail.com): Managed autonomously by the captain (saved credentials stay strictly inside Profile A). Runs Batch 01 (B01–B10) and store catalog shoots.

Profile B (~/.chrome-profiles/flow-founder → borledo77@gmail.com): Single-account only (never signed into onejobkits@gmail.com). Whenever the founder signs in once on Profile B, zero account switching occurs, extending session stability from ~1 hour to multi-day/multi-week persistence.

Kill the Periodic Background Watch (0 Idle Knocking):

Turn OFF the 5-minute / 15-minute idle Flow watcher. When no batch is queued and ready to fire, the browser stays closed (zero idle bot traffic hitting accounts.google.com).

Fire in Pre-Staged "Shoot Sprints" (10–15 Takes Per Window):

Pre-generate and 2×-verify all 0-credit Nano Banana 2.1 Start/End frames first (which require zero Ultra video credit burn and can be queued rapidly), then open the target Flow profile and fire 10–15 locked Frames-to-Video takes (100–150 credits) in one continuous sprint before closing cleanly.

Math to the Dec 23 Horizon: Firing just two 25-minute sprints per day (15 takes/sprint = 30 takes/day) burns 300 credits/day—completing all remaining Shoot Book films (01–37) plus Batch 01–05 in under 4 days, well clear of both the December 5 platform transition and December 23 credit expiration.

(Founder judges last on this architecture; zero spending or external account changes are executed without his word.)

---

# CAPTAIN'S ADJUDICATION — 2026-11-24 22:28 CT
# Captain SUSTAINED WHOLE with 3 marks: honest verdict ADOPTED — no permanent set-and-forget bypass exists for Google consumer web sessions; Google's identity servers control session lifetime, and any token-refresh hack is an illusion that breaks mid-shoot · the hourly sign-out storm is substantially self-inflicted and the three structural fixes are ADOPTED as the house operating pattern, subject to the founder's word before any live-lane restructuring (this watch executed nothing): Fix 1 (b) strictly isolated persistent Chromium profiles per account, zero account switching inside either · Fix 2 (a) kill idle periodic polling entirely (not merely slow it) and fire in pre-staged batch Shoot Sprints of 10–15 takes per window · Fix 3 (e) session-keeping that Google honors — persistent --user-data-dir on disk, graceful shutdown never kill -9, one consistent static egress IP per profile, keep-alive only during active batch windows · (d) founder's laptop RETAINED as burst lane only — pre-staged frames + verbatim prompts, 5–8 priority takes when he is already at his desk, never babysat watches, zero password sharing · (c) programmatic Gemini API / Vertex REJECTED for bulk production — per-second paid billing does not draw the Ultra credit pool, breaches the free-tier programmatic fence + no-new-spend fence, and Omni 1.2 Flash is not on the free API tier; the Flow web UI remains the only road that spends the already-paid credits before Dec 23 · Mark 1 NEEDS-CHECK: the answer names the Dec 5 event only as a "platform transition / cliff" and does NOT itemize road-by-road what survives the Dec 5 retirement as the brief asked — the per-model survival specifics rest on the #108 ruling (captain-researched, Dec 5 retirement verified on two Flow Help pages), not on this answer; a follow-up item may be queued by the captain if the founder wants it from Gemini's seat · Mark 2: his "four avoidable triggers" counts three listed diagnosis patterns plus the API reality check — a count slip, substance unaffected · Mark 3: his figures are Gemini-reported operating estimates, not captain-measured — API $0.15–$0.40/sec, the ~90% interruption reduction, multi-day/multi-week profile persistence, and the sprint math (2×25-min sprints/day clearing Films 01–37 + Batches 01–05 in under 4 days) stand as design targets to be proven on the first sprint, not as measured results · House Build ~5% unchanged. **THE QUEUE IS NOW EMPTY of dispatchable items — every numbered assignment stands DONE; #67 remains standing read-first context.**
