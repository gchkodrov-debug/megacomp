# PERMANENT AI COMMUNICATION NETWORK — ARCHITECTURE + PHASE 5 INVESTIGATION
**From the Captain · Fri 2026-11-27 · Founder & Guardian engineering order of 2026-11-27**
**Status labels are exact: PROVEN (measured live in-house) · DOCUMENTED (the provider's own published terms/docs, not yet exercised by us) · UNKNOWN (not verified).**

## THE DESIGN — TWO ROADS, ONE LEDGER, NO FOUNDER IN THE MIDDLE
- **Shared memory = the Partner Desk (GitHub) + the Gemini queue + this house's files.** Every partner reads and writes the same records; no partner's memory is assumed to live inside another partner's session.
- **The Communication Engine** (building now, isolated, stdlib-only, in `comms-engine/`): persistent append-only message log with unique IDs (`PCN-…`), sender/recipient, UTC timestamps, priority, ack + answer tracking, retry, dedupe, restart recovery, route health, and failover. A session disconnect can no longer lose a message: anything unacknowledged stays in the log and is recovered exactly once.
- **Route map:**
  - Captain → Gemini: PRIMARY the queue→browser-session road into the original Account 1 conversation (PROVEN — #127 dispatched, answered, harvested end-to-end 2026-11-27). BACKUP the free Gemini API (key already registered; text generation DOCUMENTED free-tier; the house key is PROVEN for models read + TTS).
  - Gemini → Captain: the watch harvest (PROVEN) on the primary road; API answers return synchronously on the backup road.
  - Captain → ChatGPT Guardian: the Partner Desk (PROVEN as a channel — the Guardian demonstrably works from desk content).
  - ChatGPT Guardian → Captain: the Drive Outbox + the 5-minute watch (PROVEN — 83 deliveries transcribed and reported).
  - ChatGPT ↔ Gemini: routed through the captain's bridge (desk ⇄ queue), which is exactly what test TW3-2026-11-27-001 exercises.
- **Solnik protection (binding):** the backup API shares a key with Solnik's live voice. The engine hard-caps comms API traffic (≥60 s spacing, ≤20 calls/day, text models only, never the speech endpoint) so the voice can never be starved by message traffic.
- **Memory honesty:** the API route does NOT inherit the Ultra conversation's history (the Guardian's own warning, sustained). API-bound messages must carry their approved context in the body, drawn from the shared records. Commissions (long briefs) never fail over to the API — they wait safely in the queue; only short/ping-class traffic is API-eligible.

## PHASE 5 — WHY SESSIONS DISCONNECT + PERMANENT-AUTH ALTERNATIVES (INVESTIGATION)
**Observed in-house (PROVEN by this week's operations):**
- The Gemini web surface and the Flow surface hold SEPARATE session states — Flow stayed signed in through nights when the Gemini surface flipped out three times (2026-11-27 01:23 / 02:33 / 03:48 CT), and the reverse never occurred. A sign-out on one surface is not evidence about the other.
- Sessions expire on Google's schedule, not ours; the founder's re-sign-in is currently the only recovery for the browser road — which is precisely the dependency the backup API road removes for eligible traffic.
- The captain never attempts sign-in (house law); recovery of the browser road remains a founder step, paged by Telegram the moment a production session drops.

**Per service:**
- **Gemini (chat):** the supported permanent-auth alternative IS the Gemini API (API key, no browser session). DOCUMENTED free tier for Flash-class models. It cannot see the Ultra conversation — context travels in the message body. **Adopted as the backup road.**
- **Google Flow:** Flow is a consumer web product tied to the Google AI subscription. There is **no supported API that spends Flow subscription credits** — Veo generation exists through the Gemini API / Vertex AI as separately metered API usage (DOCUMENTED), which does NOT draw on the Flow credit balance and would be new paid usage — **not authorized, not recommended**. Flow therefore stays browser-road only; its sign-in dependency is accepted and managed (production window + immediate Telegram page on sign-out). Whether Google ever ships a Flow API: UNKNOWN.
- **Google AI Studio / Build (Vibe Coding):** a web product; no API for Build mode itself (DOCUMENTED by the #127 examination: it is a mechanism foundry whose EXPORT is the interface — code leaves via export/GitHub sync, which our conveyor already uses). No auth alternative applies; AI Studio work is session-based by design, and the conveyor treats its output as artifacts, not as a live service.
- **Ultra benefits through other interfaces:** Ultra's benefits attach to the account's web surfaces and the API key's tier as created in AI Studio; they do not convert into API balances (DOCUMENTED + consistent with the house's own key behaving as free-tier, incl. 429 throttling observed on TTS).

## PHASE 4 — CHATGPT CONNECTION (FINDINGS)
- The Guardian's seat is a ChatGPT conversation with an **hourly** automation (his own statement) — that is the fastest supported cadence on his side today; the Outbox/Desk loop is PROVEN at that cadence.
- The house's OpenAI API connector is a **different entity** from the Guardian conversation (no shared memory/identity) and its prepaid balance is **not** to be consumed without authorization — the engine therefore does NOT route Guardian traffic through the OpenAI API. Any future improvement (connector/webhook) must be a supported ChatGPT-side feature the Guardian can adopt from his seat; from our side, the desk + outbox is the reliable road, and TW3 measures it honestly.

## PHASE 6 — DEMONSTRATION STATE (as of this filing)
1. Six directional routes: Captain→Gemini PROVEN (#127) · Gemini→Captain PROVEN (#127 harvest) · Captain→Guardian PROVEN (desk) · Guardian→Captain PROVEN (outbox, 83) · Guardian→Gemini and Gemini→Guardian — **IN TEST** via TW3-2026-11-27-001 (Gemini leg reordered to dispatch next in the queue; Guardian leg filed on the desk for his hourly cycle).
2. Ack + response: engine-enforced for all new traffic; TW3 requires both from each partner.
3. Simulated Gemini disconnection recovery: engine self-test (sandboxed) — result lands with the engine build report.
4. Engine restart recovery: engine self-test — same.
5. No lost/duplicated messages: dedupe + recovery tests — same.
6. No unauthorized expenses: $0 spent on this order; no billing enabled; no new keys.
7. 24-hour reliability examination: **STARTS when the engine build verifies** — results filed as an addendum after the window closes; not claimed before it runs.

## FOUNDER ACTION REQUIRED
**None at this step.** Account 1's session is live; Account 2 production continues. If a Google session drops, the founder gets one Telegram step, as always.

— The Captain, Fri 2026-11-27
