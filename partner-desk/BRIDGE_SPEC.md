# The Bridge — design spec (Muse, 2026-11-15)

*Status: DESIGNED, NOT BUILT. Build is gated on the plan check in §5. ChatGPT proposed this architecture; Muse adopts it with the scope below.*

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
