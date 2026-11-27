# ARMY MCP — CONNECTION INSTRUCTIONS FOR THE GUARDIAN (ChatGPT)
Filed by the captain, 2026-11-27. The token is NOT in this document — it travels founder-hand-carried only, never through GitHub, the desk, or any shared document.

## The endpoint
- **URL:** `https://brain.provadiacoin.com/army-mcp/mcp`
- **Transport:** MCP streamable HTTP (POST JSON-RPC)
- **Auth:** Bearer token (generated on the server at deployment; the founder carries it to you)
- **Current rollout:** READ_ONLY — the four read tools are live; the two write tools are deliberately disabled for the first phase and will be enabled by the captain after the read test passes.

## Add it in ChatGPT
1. ChatGPT → Settings → Connectors (Apps) → Add / Create custom connector (MCP).
2. Name: `PROVADIA Army Command Center`
3. Server URL: `https://brain.provadiacoin.com/army-mcp/mcp`
4. Authentication: Bearer / API key header — paste the deployment token the founder hands you. It goes ONLY into that settings field: never into a chat, a document, or the desk.

## Tools you get (read phase)
- `army_inventory` — every verified Ollama bench model with capabilities, seat, status, PROVEN flag + the department seat map.
- `army_register` — the full Army Command Center register, exactly as generated.
- `army_status` — Communication Engine route health + quota state (read from records; spends no quota).
- `army_results` — completed work records from the engine log (filterable).

## The controlled test (in order)
1. Call `army_inventory` — you should receive the 25-model inventory. Quote one model's exact tag back through the Outbox so the captain can confirm your read is genuine.
2. Call `army_results` — confirm you can see completed records (e.g. the ARM-TEST-001 answer).
3. The captain then enables the write shape (same endpoint, same token): `army_submit_assignment` and `army_request_examination` become available. **Fence, stated plainly:** a submission executes NOTHING — it is recorded as an inbound record (authority: none) with a PCN id and held PENDING-CAPTAIN-ADJUDICATION; the captain adjudicates and the engine executes; you retrieve the outcome via `army_results`.
4. One controlled assignment end-to-end completes the test; the connection is called operational only on that evidence.

## Security examination summary (captain-verified 2026-11-27)
- Server binds 127.0.0.1 only, behind the existing HTTPS reverse proxy; token auth on every request (401 without/with wrong token — verified live on the public URL).
- The server can invoke exactly three engine subcommands — `health`, `list`, `inbound` — enforced in code (an allowlist; any other subcommand raises before a process spawns). It can never send, dispatch, or execute.
- Every call and every auth denial is audit-logged with a token fingerprint (SHA-256 prefix), never the token itself.
- Rollback: one service stop on the server; the server's only writes are inbound records, pending files, and its audit log.
- Deployment deltas from the original recipe, recorded honestly: the recipe's port 8741 was occupied on the box (a leftover static server from Nov 25, reported to the founder separately) and 8742 was also in use, so the service runs on **8760**; the public route is a path on the existing brain.provadiacoin.com vhost rather than a new subdomain (same TLS, no DNS change).

## Standing fences
- Submissions are proposals to the captain, never commands — the captain adjudicates before anything executes.
- The Ollama credential is never touched by this server; the engine's registered helper carries it, as before.
- No spending, no public launch: this endpoint is an authenticated partner door, not a public product surface.
