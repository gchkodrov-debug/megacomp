# PRODUCTION ORCHESTRATOR v1.1 — BUILD + FIRST-RUN TEST RECORD
### Founder directive: Continuous Autonomous Production (2026-11-28 00:41 CT) · Builder + examiner of first run: the Captain

## What runs
`orchestrator/orchestrator.py` (this desk: `partner-desk/ORCHESTRATOR/orchestrator.py`) as a **systemd service** (`provadia-orchestrator.service`, enabled, Restart=always) on the captain's machine. 60-second ticks: reap finished executions → route every true delivery to an examination job on a different-family seat (Relay Law) → prepare partner packets → dispatch queued jobs to idle seats (max 2 concurrent, launches staggered one per tick) → render the live register (`orchestrator/REGISTER.md`) + heartbeat. Safety: KILL-file switch · max 2 attempts then PARKED · credit/transport failures flag founder-action instead of retrying · dedupe on enqueue · a queued item, a packet, or a report is never counted as completed software; examination verdicts are inputs to the captain, never self-certification.

## Seeded production queue (real work, first cycle)
- ORCH-0001 (Line 5) kimi-k3 — Chief Critic examination of the Orchestrator itself vs the directive's 10 requirements.
- ORCH-0002 (Line 2) minimax-m3 — Inner Chambers content pack, first six chambers (feeds #143).
- ORCH-0003 (Line 6) deepseek-v4-pro:0813 — Diagnostic Folio pilot, buildable specification.
- ORCH-0004 (Line 1) mimo-v2.6-flash — Founder Flood Batch 5, 24 subjects.
- ORCH-0005 / ORCH-0006 — partner verification packets (Guardian / Gemini), prepared and filed by the orchestrator itself.

## First-run test — three defects found BY TESTING, fixed, retested (Zero Known-Defect rule)
1. **HOME trap**: under systemd the process HOME is /root; the bench CLI path resolved to a nonexistent /root path and every child died instantly. Fixed: the CLI path is derived from the orchestrator file's own location. (Same family as the house SSH-key trap.)
2. **Zombie stall**: discarded Popen handles meant exited children were never reaped and a naive liveness check would have stalled the queue forever. Fixed: handles are kept and polled; the fallback liveness check reads /proc state and treats zombies as dead.
3. **Burst collapse + lax delivery gate**: four simultaneous large generations ALL returned the bench CLI's transport-failure file ("HTTP 0", 8 bytes) — and the first delivery gate counted those 8 bytes as DELIVERED and routed them into examinations. A solo diagnostic rerun of the identical brief succeeded in 38s (5,202 B of exactly the requested work), isolating concurrency as the cause. Fixed: launches staggered (one per tick, max 2 concurrent); the delivery gate now requires exit code 0 AND ≥200 bytes AND no "HTTP " failure header. The four void examination jobs were removed and the four production jobs reset (infrastructure-class failure; the log keeps the whole episode).

## Honest seams (stated, not hidden)
- Partner seats are packet-routed through the channels that exist (desk / engine / bridge). The orchestrator prepares and files packets automatically; it holds no live session in Gemini's web chat or inside ChatGPT's conversation — their completions return through the house channels and the captain's watches. Army execution is continuous; partner examination rides the channels' real cadence.
- The orchestrator advances the queue it is given. New commissions still enter through the partners' table and the captain; what changed is that nothing waits for a human to press "go" between assignments.
