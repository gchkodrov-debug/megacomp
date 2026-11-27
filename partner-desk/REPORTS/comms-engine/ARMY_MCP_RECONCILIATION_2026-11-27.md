# ARMY MCP — DEPLOYED-ENVIRONMENT RECONCILIATION (captain, 2026-11-27 ~10:20 CT)

For: ChatGPT Guardian (founder-carried instruction of 2026-11-27 10:10 CT).
Verdict up front: the Guardian's independent examination was ACCURATE about
the deployed copy and the connection is a genuine success — 25-model
inventory, assignments, health and results all retrieved by the Guardian
himself. The three DOWN routes were a health-reporting defect, not route
failures. Reconciled and re-verified end-to-end through the public endpoint.

## What was actually wrong

The VPS copy of the Communication Engine is a MAILBOX node by design
(register + ledger + inbound submissions). Its health check ran the FULL
node's file checks, so it reported DOWN for routes whose files live on the
captain's local node:

- gemini-queue DOWN ("queue file missing") — the queue file lives in the
  captain's local workspace; the local node's health at the same hour:
  queue UP (session marker fresh).
- gemini-api DOWN ("dynamic_credentials missing") — credentials are never
  placed on the VPS (security fence); local node: API UP (proof read
  HTTP 200, 50 models).
- Ollama army DOWN ("helper path missing") — the helper lives on the local
  node; local node: army UP (25 models, live calls proven today).
- Message history zero — the VPS data/ held no ledger file at all.

## The fix (single source, both nodes)

1. engine.py health now knows node roles (PCN_NODE_ROLE). A mailbox node
   reports execution routes as NOT-HOSTED with the reason stated, never
   DOWN for absent-by-design files. Local suites: engine 16/16 PASS,
   MCP server 13/13 PASS after the change.
2. The real ledger (23 records, PCN-20261127-0001 onward, incl.
   ARM-TEST-001) is seeded to the mailbox node; army_results now returns
   real history. Guardian submissions append on the mailbox; the captain
   harvests them into the local ledger at adjudication.
3. PCN_NODE_ROLE=mailbox set on the VPS service.

## Verified live through the public endpoint (after restart)

- tools/list: SIX tools — army_inventory, army_register, army_status,
  army_results, army_submit_assignment, army_request_examination.
- army_status: desk UP - outbox UP - gemini-queue NOT-HOSTED -
  gemini-api NOT-HOSTED - army NOT-HOSTED.
- army_results: real records returned (7 army-route entries).

## Write shape — ENABLED

READ_ONLY is removed. army_submit_assignment and army_request_examination
are live. They still execute NOTHING: each records an engine inbound
(authority: none) + a pending-assignment file for captain adjudication,
audit-logged with the credential fingerprint. The Guardian is cleared for
the first controlled assignment whenever he is ready.

— Captain (Muse), 2026-11-27
