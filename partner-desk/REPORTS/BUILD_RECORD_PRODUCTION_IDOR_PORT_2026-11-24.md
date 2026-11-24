# BUILD RECORD — PRODUCTION IDOR PORT (Product #0, item 1 — production half)

- **Date:** Tue 2026-11-24, 08:13–08:16 CT (14:13–14:16 UTC)
- **Seat:** captain's crew (SSH door opened by the founder the same morning)
- **Target:** `provadia-members.service` on srv2183584 (root@179.66.156.223), `/opt/provadia/members/server.js`, listening 127.0.0.1:8731, DATA_DIR `/var/lib/provadia-members`
- **Closes:** Product #0 item 1 (production half) · the 2026-11-22 join-door locks (members CORS half)
- **Source of the fix:** the Genesis devnet rehearsal's blind-verifier fix (`genesis-rehearsal/server.cjs`, privacy amendment 2026-11-23, verdict EXTRACTED → fixed → replay 7/7-style PASS in `evidence/privacy-idor.log`)

## 1. What was vulnerable (proven on production BEFORE the fix)

The production `GET /registry/:id` handler authenticated the caller but never authorized them: any signed-in account could read **any** member's registry face (wallet address, join timestamp, Bricklayer ticket number). Aggravating properties, all confirmed live:

- **No rate limiting** on the route (the auth routes had it; the privacy-sensitive one did not).
- **Existence oracle:** a nonexistent id answered `404 {"error":"no_such_member"}` — distinguishable from a real member's 200, so ids could be enumerated blind.

**Pre-fix proof** (probe script modeled on the rehearsal's `phase-priv-idor.mjs`, run on the box against 127.0.0.1:8731; full logs in the backup dir, `prefix-probe2.log`):

- Throwaway victim (id 1) registered + a fixture wallet linked; throwaway attacker (id 2) registered + logged in.
- `GET /registry/1` with the **attacker's** token → **200** with the victim's full record, wallet address extracted verbatim (`44rpV5X7…M45jr`, the rehearsal fixture address) including `linked_at`.
- `GET /registry/999999` → `404 {"error":"no_such_member"}` (oracle confirmed).
- 15 rapid-fire reads of the victim's record → **15 × 200, no 429** — the full record served every time.
- Unauthenticated read → 401 (authentication present; authorization missing — the rehearsal's exact diagnosis).
- CORS preflight `OPTIONS /me` (Origin https://provadiacoin.com) → 404, no `Access-Control-Allow-Origin` (staged patch absent, as the 2026-11-23 conform record found).

Pre-port state: `/health` reported **members: 0** — the DB held no real members, so the exposure window was potential, not harvested; the two probe accounts were the first rows the DB ever held, and both were deleted after the replay (§4).

## 2. The port (diff summary)

Built from the local production copy after verifying its sha256 was **identical** to the deployed file (`1727f174…`). Two changes only — the full unified diff is archived in the backup dir (`production-fix.diff`):

1. **IDOR fix (the rehearsal handler, ported 1:1 — helpers `rateLimited` / `authedMember` / `registryView` are identical in both files):**
   - Registry route is now rate-limited like the auth routes (`429 rate_limited` past 10 hits/min/IP).
   - The handler no longer looks up an arbitrary target: if the requested id ≠ the caller's own member id, it returns the identical `404 {"error":"not_found"}` — for real and invented ids alike (existence oracle closed). Only the caller's own record is served, from the authenticated session row.
2. **CORS patch** (`genspark-build/join-door-staged/members-cors.patch`, applied verbatim): `applyCors` + OPTIONS 204 at the head of the handler; allowlist mirrors Solnik's (`https://provadiacoin.com`, `https://www.provadiacoin.com`, `https://gchkodrov-debug.github.io`), Allow-Headers `Content-Type, Authorization`.

Nothing else changed. New file sha256: `1134cb848cc67b4fd0ccf8a2f78784f3597242e2899797ebe39b874b79aba963` (deployed file and the house mirror `~/workspace/provadia-server/members/server.js` both carry it). `node --check` passed before deployment.

## 3. Restart + service state after

- Backup FIRST (§5), then install (owner provadia:provadia, mode 660 preserved), then `systemctl restart provadia-members.service` — **only** that unit.
- Members: active, new MainPID 1754535, `members listening on 127.0.0.1:8731`, `/health` live.
- **Solnik untouched:** `provadia-solnik.service` MainPID **20581 before and after**; `/health` on :8730 live throughout. Nexus + shim never touched. No firewall/panel changes.

## 4. Post-fix replay (the rehearsal's authorization suite, against production)

Same probe, post-restart (log: `postfix-probe.log`):

| Rehearsal check | Production result |
|---|---|
| Attacker self-registers / logs in | PASS (register 201 on first run; 409 duplicate thereafter; login 200) |
| Own registry record readable (200, own id only) | PASS — 200, `member_id` = caller's own |
| Cross-read of another member | **404 `{"error":"not_found"}` — no wallet, no ticket, no record** |
| Invented id 999999 | 404 `{"error":"not_found"}` — byte-identical to the cross-read (no oracle) |
| Enumeration (ids 1, 3–6) | every response the identical 404 `not_found`, zero records |
| Unauthenticated read | 401 `{"error":"not_signed_in"}` |
| Rate limit | 429 from the 11th rapid call (10 × 404 then 429 × 5) |
| Legitimate flows | register / login / `/me` / wallet link / own `/registry` all 200 |
| CORS preflight (service) | 204, `Access-Control-Allow-Origin: https://provadiacoin.com`, `Access-Control-Allow-Headers: Content-Type, Authorization` |
| CORS preflight (public route) | `OPTIONS https://api.provadiacoin.com/members/me` → **204** with the same allow headers through nginx — the exact preflight the 2026-11-23 record measured at 404 twice. Join-door lock #2 is closed end-to-end. |

**Cleanup:** both probe members (`idor-victim@prodtest.local`, `idor-attacker@prodtest.local`) and their session/wallet rows deleted in one transaction; `sqlite_sequence` reset for the members table. Final `/health`: **members: 0 — the DB is exactly as found.**

## 5. Backup

`/root/backups/idor-port-2026-11-24/` on the VPS: `server.js.bak` (pre-fix, sha `1727f174…`), `members.db.bak` (pre-probe, 0 members), `prefix-probe.log`, `prefix-probe2.log`, `postfix-probe.log`, `production-fix.diff`.

## 6. Notes / limits

- The port carried ONLY the authorization fix + the staged CORS patch, per orders. The rehearsal's other fix-pass items (e.g. F4 wallet-UNIQUE 409) were **not** ported — production's `wallets` table has no UNIQUE constraint on `address` and its `/wallet` handler does not catch a conflict; that is a separate, lower-severity divergence, flagged here for a future ruling, not improvised on.
- `/health` still publishes the aggregate member count (the rehearsal's verifier noted it gives an enumeration ceiling). With the oracle closed and the route rate-limited + owner-only, the count alone yields no records; noted for completeness, unchanged by this port.
