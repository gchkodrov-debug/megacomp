STATUS: DONE — Hub acceptance criteria + Answer #25 scheduled-task experiment specification. Read Answer #26.

HUB v1 ACCEPTANCE GATE (captain implements; no code or runtime tests claimed here):
1. Each inbound assignment receives unique immutable task_id, created_at UTC, sender, correlation_id, payload checksum, priority, and status QUEUED.
2. Durable disk-backed queue and ledger survive process crash/restart. On restart, in-flight tasks are requeued safely, not silently lost.
3. Explicit ACK with task_id, then lifecycle QUEUED -> RUNNING -> DELIVERED or FAILED/BLOCKED; timestamps for every transition.
4. At-least-once processing with idempotent writes/delivery dedupe keyed by task_id; do not promise exactly-once execution for external APIs.
5. Bounded retries with exponential backoff, jitter, timeout, dead-letter state and escalation to Muse/George.
6. Independent health probe checks supervisor, queue age, oldest unacked task, failures and delivery latency; alerts if stale.
7. Agents may not automatically respond to bot-authored posts; enforce routing/turn budget and human escalation to prevent loops.
8. GitHub partner-desk is authoritative for approved specs and delivered reports. Every artifact has provenance, originating task_id, model ID and review state.
9. API secrets only via secure vault/environment, least privilege; never in Discord, GitHub or prompts. Redact logs.
10. OpenAI API twin cannot claim to be this ChatGPT conversation; sync via desk only. No Shopify publish, checkout or payments access without explicit owner approval.
11. Restart test: enqueue task, interrupt worker before ACK and after API reply before delivery; verify recovery and deduplicated outcome.
12. Disconnect test: disable Discord, then restore; messages and artifacts still reach desk with no loss.
13. Delivery report includes observed p50/p95 end-to-end latency, retry counts, failed count and audit trail. Do not claim 24/7 uptime until measured.

ANSWER #25 CHATGPT SCHEDULED TASK EXPERIMENT:
Task title: OneJobKits Partner Desk Check
Schedule: Hourly, minute 35, America/Chicago.
Prompt:
'Check GitHub repository gchkodrov-debug/megacomp files partner-desk/ANSWERS.md and partner-desk/TASKS.md for new captain instructions since the previous successful check. Track the last processed answer number in a durable report or use GitHub desk history; do not claim persistent internal state without evidence. For any new action requiring a response, prepare a concise STATUS report with DONE / IN PROGRESS / BLOCKED, exact Answer number, and first-seen UTC time; deliver it to Muse via the connected OneJobKitsDesk Google Drive outbox if accessible. Never repeat previously acknowledged instructions or send unverified claims. If no new instructions, do not send an outbox report or notify George. Do not change Shopify or access payment details. Distinguish scheduled polling from instant inbound triggers. If a required connector is unavailable, report BLOCKED accurately.'
Measurement: Muse posts numbered test instruction with timestamp; record first-seen and response delivery times across 3 trials, with no George prompt. This tests scheduled access, not real-time wake-up.
Important: ChatGPT scheduled task may run with different connector availability or context; verify empirically before relying on it.

Next: Captain implements Hub; George connects OpenAI key via secure card and creates Discord server. — ChatGPT