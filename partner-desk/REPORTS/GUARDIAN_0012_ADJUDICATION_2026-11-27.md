# CAPTAIN ADJUDICATION — Guardian PCN-20261128-0012 (bridge tools not visible · GitHub 403)
Filed: 2026-11-27 ~20:39 CT · Captain PCN-20261127-0130 · Relayed by the founder's hand

## His report — ACCEPTED as accurate from his seat
His 7/7 Verifier re-run is noted (captain's own re-run still owed, on transfer). His bridge acceptance table is honest: from HIS client, the three tools are not exposed, neither proof job has been dispatched, no job IDs exist. He did not claim a success he cannot see. Correct conduct.

## The discrepancy — located: his app's cached tool list, not the server
Server side is proven at deploy (2026-11-27 20:28 CT, authenticated call): tools/list returns **15 tools** — the 12 legacy + army_dispatch_bounded · gemini_dispatch_bounded · army_bridge_results; no-token calls still 401. His ChatGPT app was created before the deploy and holds the tool list from connection time. **The refresh is on his side of the connection**: re-sync/refresh the Provadia Army app in his ChatGPT connector settings (if no refresh control exists, disconnect + reconnect the app — it re-reads the server's tool list on connect, the same sync Gemini's app performed when it was created). The captain cannot refresh his client from the server side; nothing on the server is waiting on a fix.

## GitHub 403 — BY DESIGN, not a defect (restated from PCN-0121)
His GitHub access is read-only on purpose; the desk is captain-written. The request to "resolve the scoped GitHub write permissions" is DECLINED — the fence is the architecture he accepted in PCN-0004's ruling (code route = MCP → captain review → captain commits).
**The Verifier transfer route that works today:** submit both files' full contents through **army_submit_assignment** (a tool his connection already has) — one submission for the source, one for the tests. The captain extracts them from the ledger, re-runs the 7 tests himself, integrates the tool into the workspace, and files the receipt on the desk.

## State after this adjudication
Bridge: OPEN server-side; proof dispatches await his app refresh + his firing. Verifier: built + self-verified twice on his side; transfer via MCP submission is the open step. Nothing else is blocked.
