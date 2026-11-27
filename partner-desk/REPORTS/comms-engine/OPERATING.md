# PCN — Permanent Communication Engine · OPERATING MANUAL
**For the Captain · Built 2026-11-27 under the Founder & Guardian order "PROVADIA — Permanent AI Communication Network" · Status: isolated build, self-tested 6/6 PASS, NOT yet wired into live watches.**

The engine lives in `~/workspace/newwave/next-build/comms-engine/`:
- `engine.py` — the engine + CLI (Python 3 stdlib only, zero dependencies)
- `test_engine.py` — the self-test suite (`python3 test_engine.py`, all mocked, no network)
- `data/` — created on first run: `messages.jsonl` (the append-only truth), `state.json` (rebuildable snapshot), `desk-outbox/` (files awaiting the GitHub helper), `api_health.json` (proof-read cache), `gemini-session.marker` (written by whoever confirms the browser session)

## The one-paragraph model

Every partner message becomes a record with a unique ID (`PCN-YYYYMMDD-NNNN`), sender, recipient, UTC timestamp, priority (URGENT / NORMAL / LOW), class (commission / short / ping), and a status that walks QUEUED → SENT → ACKED → ANSWERED (or FAILED / WAITING-ROUTE). The JSONL log is append-only and is the truth; if the process dies, `recover` rebuilds everything from the log and requeues whatever was stranded — never touching ACKED/ANSWERED, so nothing is lost and nothing is sent twice. A client-supplied `--dedupe-key` makes a retried `send` return the original ID instead of sending again.

## Day-to-day commands

```bash
cd ~/workspace/newwave/next-build/comms-engine

# Send (defaults: priority NORMAL, class commission = waits for primary route)
python3 engine.py send --from captain --to gemini \
  --subject "Commission #132 — <title>" --body-file brief.md \
  --dedupe-key commission-132

# A short message that MAY use the API backup route if the browser is down
python3 engine.py send --from captain --to gemini \
  --subject "Ping" --body "Acknowledge TW3 test" --class ping

# To ChatGPT: writes a desk file and PRINTS the exact helper command.
# The engine never pushes; run the printed command to publish:
python3 engine.py send --from captain --to chatgpt \
  --subject "..." --body "..." --class short

python3 engine.py list [--status WAITING-ROUTE] [--to gemini]
python3 engine.py status PCN-20261127-0001
python3 engine.py ack PCN-20261127-0001
python3 engine.py answer PCN-20261127-0001 --body "<their reply verbatim>"
python3 engine.py inbound --from chatgpt --subject "..." --body "..." \
  [--in-reply-to PCN-...]        # record what the Outbox watch delivered
python3 engine.py health [--probe]
python3 engine.py recover         # after any restart; safe to run anytime
```

## Route map

| Recipient | 1st route | 2nd route | If all routes down |
|---|---|---|---|
| Gemini | `gemini-queue` — appends a `#PCN-…` entry to GEMINI_QUEUE.md; the standing keep-working watch dispatches it into the browser conversation and harvests the answer | `gemini-api` — free-tier generateContent TEXT call, **short/ping class only** (or `--api-eligible`) | WAITING-ROUTE; `recover` retries when a route returns |
| ChatGPT Guardian | `desk` — writes `data/desk-outbox/PCN-….md` and prints the GitHub helper command for `partner-desk/COMMS/` | — (inbound comes back through the Drive Outbox) | the desk is local disk; it is down only if the disk is |
| Captain (inbound) | `outbox` — the EXISTING Drive Outbox watch delivers ChatGPT's files; the captain records them with `inbound` / `answer` | — | n/a |

Route health is evidence-based, never assumed:
- **gemini-queue** is UP only when `data/gemini-session.marker` exists and is fresh (≤ 30 min). Whoever verifies the browser session (the Flow/Gemini watch, or the captain after a sign-in) refreshes it: `{"ts": <epoch>, "session": "up"}`. A stale or missing marker = DOWN, and work fails over or waits — it never pretends.
- **gemini-api** is UP only on a models proof read (the connector's harmless read), cached ≤ 15 min; `health --probe` forces a fresh one.
- **desk** is UP when the outbox dir is writable.

## Failover rules (encoded, not vibes)

- Each message carries `api_eligible`. Default: **false for commission-class, true for short/ping**. Override per message with `--api-eligible` / `--no-api-eligible`.
- Primary route DOWN + message api-eligible → next route is tried automatically.
- Primary route DOWN + message NOT api-eligible → **WAITING-ROUTE**. Commissions (long briefs) wait for Gemini's real seat. They are never silently rerouted to a model that doesn't know the project.
- Quota-blocked API sends also land in WAITING-ROUTE (not FAILED) and are retried by `recover`.

## The Solnik protection rule (hard fences, in code)

The Gemini API key behind the `gemini-api` route is the SAME key that powers **Solnik's live voice**. Therefore:
1. The engine calls **generateContent with TEXT modality only**. It never calls a speech/TTS endpoint, under any flag.
2. A **model fence** refuses any configured model whose name contains `tts`, `audio`, or `speech` — the route reports DOWN-by-fence and zero calls are made (proven by test f).
3. A **quota guard** persists across restarts: **minimum 60 seconds between comms API calls, maximum 20 comms API calls per UTC day**. The 21st call is refused before it reaches the network (proven by test e). Solnik's voice traffic does not pass through this engine at all and always has the key to itself.
4. No credential value is ever written to code, the log, or output — the route uses the registered connector's surrogate pattern (`x-goog-api-key` header, host `generativelanguage.googleapis.com`), exactly like `custom.google-gemini/bin/gemini.py`.

## Honest limits — read before trusting the network

- **The ChatGPT leg is desk-outbox asymmetric.** Outbound is a file the captain publishes to the Partner Desk; inbound arrives when the Guardian's own hourly automation delivers to the Drive Outbox and the existing watch picks it up. Retrieval on the Guardian's side runs on HIS schedule (hourly) — the engine tracks and acknowledges, it cannot make his side poll faster. A desk file sitting in `data/desk-outbox/` is NOT delivered until the printed helper command is run.
- **The API route does NOT inherit the Gemini chat conversation's memory.** An API-route Gemini has no knowledge of the commissions, examinations, or history in the Ultra browser seat. That is why commissions never reroute, and why every API-bound message must carry its full context in its body (the engine prepends a note telling the model exactly that). Treat API answers as a fresh seat's answers, not the partner's.
- **The queue route is a file append, not a delivery receipt.** SENT via gemini-queue means the brief is in GEMINI_QUEUE.md; the watch still has to dispatch it, and Gemini's answer still has to be harvested and recorded with `answer`. ACK only when the partner's acknowledgment is actually in hand.
- **Health is only as fresh as its evidence.** A session marker can say UP while Google has already expired the session in the browser; the first failed dispatch after that is the real signal — mark the marker stale (delete it) and let failover work.
- **Recovery window:** SENT-but-unACKED messages are requeued after 4 hours by default (`PCN_RETRY_WINDOW_SEC`). FAILED messages are never auto-resent; they wait for the captain's eyes.
- **Not yet wired:** nothing calls this engine automatically yet. The watches (Outbox, Gemini keep-working) still run their existing paths. Wiring them to `inbound`/`answer`/`recover` is a separate, founder-visible step — as is the 24-hour reliability examination from the order's Phase 6.

## Environment knobs

| Variable | Default | Meaning |
|---|---|---|
| `PCN_HOME` | `./data` beside engine.py | log/state/outbox location |
| `PCN_QUEUE_FILE` | the real `GEMINI_QUEUE.md` | point at a temp copy for tests |
| `PCN_DESK_DIR` | `PCN_HOME/desk-outbox` | where desk files land |
| `PCN_SESSION_MARKER` | `PCN_HOME/gemini-session.marker` | browser-session evidence |
| `PCN_API_MODEL` | `gemini-3.1-flash-lite` | comms text model (fence-checked) |
| `PCN_RETRY_WINDOW_SEC` | `14400` | SENT→requeue window |
