# SETTLING CHECK — Gatehouse Amendment 8 (blind-verification settling seat)

Runner: settling-check subagent (independent seat; no builder/improver/fix/critic/verifier reports read).
Skill followed: `~/workspace/newwave/tools/crew-skills/verify_status_before_reporting/SKILL.md`.
All times UTC (VM clock); local Chicago time = UTC−6.

## Frozen-file identity — CONFIRMED before running, re-confirmed after

| File | Expected SHA-256 | Observed SHA-256 | Match |
|---|---|---|---|
| gatehouse.mjs | c4010ed628ccd21f21d15ee0899b30b108d426878b329283a1daae688f86d07f | c4010ed628ccd21f21d15ee0899b30b108d426878b329283a1daae688f86d07f | YES |
| anchor-v6.html | 900323c367a6af95500eba1edf198e7ff4497867388d3732cebfbea72644d4ba | 900323c367a6af95500eba1edf198e7ff4497867388d3732cebfbea72644d4ba | YES |
| anchor-devnet.html | 40eb08b46744f9f307790837c53907e160fdc7a5ecab9fed306e40e974f13887 | 40eb08b46744f9f307790837c53907e160fdc7a5ecab9fed306e40e974f13887 | YES |

Hashes re-checked at 2026-11-25T04:27:45Z after all runs: unchanged.

## Evidence harness attempts (`node gatehouse-evidence.mjs`) — 3 of 3 allowed attempts used

### Attempt 1 — started 2026-11-25T04:19:08Z — CRASHED in Part B
- Part A (mainnet-pinned local candidate gate): **completed, 12/12 PASS** (A1–A12 all PASS; A5 wallet fence: anchor wallet signature count = 1, unchanged; A10: unsigned send refused, mainnet anchor record stayed null).
- Part B (devnet rehearsal): pre-check passed (devnet twin anchor record null), then the devnet gate's upstream calls hit repeated egress-proxy tunnel timeouts ("Connection to establish proxy tunnel timed out after 3500ms"); the gate failed closed with 502 "gatehouse: all upstreams unavailable (fail closed)"; the harness then crashed uncaught at `buildAnchorTransaction` → `Connection.getLatestBlockhash` → `Error: failed to get recent blockhash: Error: 502 Bad Gateway` (gatehouse-evidence.mjs line 271, partB). Devnet payer balance read also returned `undefined` under the same tunnel failure.
- Error class: **network weather — egress-proxy tunnel timeout / 502 fail-closed** (the known failure mode; the gate under test behaved correctly, failing closed).

### Attempt 2 — started 2026-11-25T04:22:39Z (after ~3 min wait) — CRASHED in Part B
- Part A: **completed, 12/12 PASS** (A1–A12 all PASS; same wallet-fence signature count = 1; anchor record null).
- Part B: identical crash — devnet payer balance `undefined`, then uncaught `Error: failed to get recent blockhash: Error: 502 Bad Gateway … "gatehouse: all upstreams unavailable (fail closed)"` at the same stack (anchor-tx.mjs:37 → gatehouse-evidence.mjs:271). Process exit code 1.
- Error class: **network weather — egress-proxy tunnel timeout / 502 fail-closed**.

### Attempt 3 — started 2026-11-25T04:27:12Z (after ~4 min wait) — CRASHED in Part B
- Part A: **completed, 12/12 PASS** (A1–A12 all PASS; wallet-fence signature count = 1; anchor record null).
- Part B: identical crash — same 502 fail-closed blockhash failure at the same stack. Process exit code 1.
- Error class: **network weather — egress-proxy tunnel timeout / 502 fail-closed**.

## Per-part totals (graded per the verify-status skill)

- **Part A: VERIFIED — 12/12 PASS, observed identically in all 3 attempts** (36/36 Part A checks passed across the three runs).
- **Part B: UNVERIFIED by this seat** — never completed; all three runs crashed at the devnet blockhash fetch on egress-proxy tunnel timeouts before any Part B check could report. No Part B PASS or FAIL was observed.
- **Part C: UNVERIFIED by this seat** — never reached.
- **Part D: UNVERIFIED by this seat** — never reached.
- **Complete run: NONE.** No attempt produced results for all four parts A/B/C/D, so there is no complete-run total to report. The three-attempt budget is exhausted; no further attempts were made.

## Regression suite

**Not run.** My instructions allowed `node gatehouse-regression.mjs` only if the evidence harness completed; it never did.

## Safety observations

- No mainnet transaction was sent or attempted by any run: Part A's only send-shaped probes were refused by the gate (A7 wrong memo 403, A8 wrong fee payer 403, A10 unsigned send refused at signature verification 403), and the mainnet anchor record read `null` before and after in every attempt (A12). Everything else observed was reads/refusals, as designed.
- Cleanup: after the final attempt, no listeners on ports 18743/18745/18746/18770/18771 and no stray `node gatehouse` processes remain (checked 2026-11-25T04:27:45Z).

## What would settle it

A window when this VM's egress proxy can hold tunnels to the devnet upstreams long enough for Part B's rehearsal flow (the mainnet-pinned Part A traffic succeeded in all three attempts; the devnet leg did not survive the tunnel timeouts). Re-running the harness in such a window — by whichever seat the captain assigns — is the settling check for Parts B/C/D.
