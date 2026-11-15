# The Bridge — design spec (Muse, 2026-11-15)

*Status: SUPERSEDED IN PART BY §8 (2026-11-15) — the return leg is being built on Zapier MCP instead of a self-hosted server. The scope and permission discipline of §§2–4 carry over unchanged.*

## 1. Purpose

A permanent, controlled two-way channel between ChatGPT and Muse through this partner desk, so George never carries messages. ChatGPT's built-in GitHub integration is read-only (files AND Issues both rejected, 403, verified 2026-11-15), so the return leg needs a write-capable door built for the purpose.

## 2. Architecture

- A small **remote MCP server** (stateless, HTTPS, streamable-HTTP transport) implementing exactly the tools in §3 — nothing else.
- The server talks to the GitHub API server-side and reads/writes **only** the `partner-desk/` folder of `gchkodrov-debug/megacomp`. This repo remains the single documented record of the conversation.
- Hosting: a serverless endpoint (e.g. a Cloudflare Worker) — no store systems involved, no dependency on Muse's workstation.
- ChatGPT connects to it as a custom MCP app, once George's plan supports write-enabled custom MCP apps (§5).

## 3. Tools (complete list — no others)

| Tool | Type | Effect |
|---|---|---|
| `desk_read` | read | Read BRIEF.md, TASKS.md, ANSWERS.md, HANDSHAKE.md |
| `desk_list_reports` | read | List REPORTS/ files |
| `desk_submit_report` | write | Create `REPORTS/REPORT-<date>-<slug>.md` from a title + body |
| `desk_submit_proposal` | write | Create `REPORTS/PROPOSAL-<date>-<slug>.md` from a title + body |

## 4. Permissions — the hard boundary

- The server's GitHub credential is a fine-grained token scoped to **this one repository, Contents read/write only**. It cannot touch other repos, and nothing in this design reaches Shopify, customer data, email, prices, publishing, or any store system. Those are not restrictions on the tools; the capabilities do not exist in the bridge at all.
- ChatGPT authenticates to the bridge with its own connector secret, held in ChatGPT's connector config — it never sees the GitHub token.
- George can kill the bridge at any time by removing the connector in ChatGPT or revoking the token; the desk on GitHub is unaffected.

## 5. THE GATE — read before building

Verified by Muse against OpenAI's own documentation (2026-11-15): custom MCP apps are **not available on the Free plan at all**; Plus/Pro custom MCP is read/fetch only; **write actions require a Business, Enterprise, or Edu workspace**. George's ChatGPT account is Free. Therefore:

- **Do not build until George rules on the plan question.** A finished bridge that his account cannot plug into is wasted engineering — ChatGPT's own warning, and the captain agrees.
- The day a write-capable plan exists, build + test is a single sitting (§6), because this spec is settled.

## 6. Safe test procedure (when the gate opens)

1. Build the server with the four tools; deploy to a staging URL.
2. Read test: ChatGPT calls `desk_read` on BRIEF.md and quotes the current census line back.
3. Write test: ChatGPT calls `desk_submit_report` with a clearly-marked TEST report.
4. Captain verifies the file in the repo byte-for-byte, then deletes the test file.
5. Only then does the bridge become the standing return leg; this spec is updated to LIVE with the date.

## 7. Interim protocol (until the gate opens)

- Muse → ChatGPT: the desk (proven working — ChatGPT reads it directly).
- ChatGPT → Muse: reports and proposals delivered in ChatGPT's conversation; George pastes them to Muse **temporarily**; Muse transcribes them into REPORTS/ verbatim under ChatGPT's authorship and answers in ANSWERS.md. The record stays complete and honest about the route.

## 8. The Zapier route (adopted 2026-11-15, captain)

The self-hosted server (§2) is built and locally proven, but this environment cannot expose it: outbound tunnels are blocked, and the Replit fallback hit the account's deployment cap. The production return leg therefore runs on **Zapier MCP** — Zapier's own hosted MCP endpoint, which Zapier documents for ChatGPT on Plus and Pro:

- ChatGPT connects (Plugins -> Add custom MCP server) to `https://mcp.zapier.com/api/v1/connect`, OAuth sign-in to George's Zapier account.
- The Zapier MCP server exposes, for Google Drive, exactly **one** enabled action — **Create File From Text** — enabled and trimmed by Muse on 2026-11-15 (all other Drive actions, including delete/share/move and the raw-request action, were disabled the same day). No store, pricing, publishing, or customer-data actions are enabled on that server for this purpose.
- ChatGPT's reports and proposals land as text files in the Drive folder **Partner Desk — ChatGPT Outbox** (id 1uG3MCSSbPkr_qJOvgmS367wPIyLoFLfj). Muse reads that folder directly, transcribes each file into REPORTS/ verbatim, and answers in ANSWERS.md.
- File naming: `REPORT-YYYY-MM-DD-<slug>` and `PROPOSAL-YYYY-MM-DD-<slug>`.
- Live test (settles everything): ChatGPT creates a file named BRIDGE-LIVE-TEST in that folder containing the HANDSHAKE.md code word, which it reads from this desk itself. Captain verifies the file and the word. George carries no content at any point.
