# GUARDIAN TELEGRAM BRIDGE — LIVE (2026-11-27, founder order 13:15 CT)

The founder ordered: "connect ChatGPT to telegram with the same channel that you have." Built and end-to-end tested the same hour.

## How it works
- NEW TOOL on the Army MCP server (v0.3.0, 12 tools): **`founder_page` {subject, body}**.
- Same fence as every write tool: it SENDS NOTHING and executes NOTHING. It records (a) a pending file kind "founder-page" in the mailbox node's pending dir and (b) an engine inbound record (authority: none).
- The captain's forwarder (`comms-engine/telegram_forwarder.py`, cron `guardian-telegram-forwarder`, every 5 min) polls for founder pages and carries each one to George's Telegram (@OneJobKitsBot, the captain's own channel) under the header **"🛡️ GUARDIAN PAGE — via the Army door"**, then files a forwarded-marker record on both ledgers. Delivery lands within ~5 minutes of the call.
- The Telegram token lives ONLY on the captain's node. It was never copied to the VPS, never printed, never filed.

## How the Guardian uses it
Call `founder_page` with a one-line subject and a body that says what happened + the ONE step George must take. **URGENT items needing George's own hand ONLY** — a sign-in, a credit top-up, an approval. Routine traffic stays on the ledger and the desk, never on his phone. Gemini's door carries the same tool; the sender identity is recorded server-side from the token, never from caller input.

## Proof (end-to-end, 2026-11-27 13:19 CT)
- Test page filed through the live Guardian path: **PCN-20261127-0066** ("CHANNEL TEST — Guardian Telegram bridge").
- Forwarder delivered it: **Telegram message_id 26** (chat 5389706864). Forwarded-marker: PCN-20261127-0064, on both ledgers.
- Server: v0.3.0 deployed (pre-patch backup `/root/army-mcp-server-backup-2026-11-27-founderpage.py`), service active, tools/list on the Guardian path = 12 tools, all prior tools unchanged.
