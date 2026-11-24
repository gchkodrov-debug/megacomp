# BUILD RECORD — THE GOLDEN WALL DIGEST CHECK (2026-11-23)

**Status: DEPLOYED LIVE + crew-verified — blind verifier PASS (5/5 tests, 3/3 derivations), §8.**
Relay: builder (captain) → critic round 1 → critic round 2 → delta critic (Glass Machinery) → blind verifier. Every seat's verdict is recorded below; the crew agreed before deploy.

**Finding of record** (`SENTINEL_FOUNDED_ASSETS_AUDIT_2026-11-23.md` §1): `/data/golden-wall.json` carried a SHA-256 digest (`signature.digest`) that NO code verified — its only consumer, `wall.js`, rendered the file's numbers unchecked. Under the town's honesty standard (FVR-12 discipline: a figure that cannot be reconciled renders NOTHING), an unverified digest on the Wall's own data file was a hole in the standard. This build closes it.

---

## 1. THE DIGEST DEFINITION — ESTABLISHED FROM THE EVIDENCE

From the original build record (`BUILD_RECORD_WALL_NEXUS_ACCOUNT_2026-11-23.md`: "the counter is rendered by wall.js in the browser from the signed /data/golden-wall.json — SHA-256 digest over the canonical body") and the file's own `signature.scope` ("all fields except signature"):

> **digest = SHA-256, hex lowercase, over the canonical JSON of every field of the ledger except `signature`. Canonical JSON = object keys sorted lexicographically at every depth, arrays in order, compact separators (`,` and `:`), UTF-8, no trailing newline.**

Recomputed independently in Python AND Node over the live file: `86011a778d4dd33ca9b031e8329a1c223e2ee244d11b98a86d2cb5c4f01d99c8` — **matches the file's stated digest exactly.** The ledger file itself was never modified (live sha256 `2a771193…` before and after; facts unchanged: 0 grams · 0 of 47 · AWAITING_BRICK_1).

One implementation law the check enforces (critic round 1, CONFIRMED with a constructed counterexample): the digest preimage is built on a **null-prototype object** (`Object.create(null)`). On a plain `{}`, a top-level `"__proto__"` ledger field would be swallowed by the prototype setter and silently dropped from the preimage — JS and independent verifiers would disagree about what the seal covers. With the fix, every field except `signature` enters the preimage, literally. (Test: true ledger + an added `"__proto__":{"x":1}` field → independent digest `0be9d99c…` ≠ reference → fail-closed, proven in the mirror.)

**Note for the future ledger writer (critic round 1):** integral floats canonicalize differently across implementations (JS prints `1`, Python `json` prints `1.0`) — a cross-language divergence that can only fail CLOSED here, never open. When Brick #1 is receipted, seal the new ledger with JS canonicalization semantics (the same semantics wall.js checks with).

## 2. THE CHECK (v2 — the upgraded design)

`wall.js` `verifyLedger()`: before anything renders from the ledger, it recomputes the digest (WebCrypto `crypto.subtle`, canonical JSON as defined above) and requires **BOTH** the recomputed digest **AND** the file's stated digest to equal the reference. Any failure — mismatch, missing/malformed digest, missing crypto, fetch/parse failure — renders only the founded face: the hardcoded zero book (0 GRAMS · 0 OF 47 BRICKS LAID), registry/sockets unlit, countdown never started, the receipt detent dark, and an explanatory note. This supersedes the v1 check deployed earlier the same night (commit `e4fa96c256c8bc9bfff1c59c0bd84cbebd243863`), which compared recomputed vs stated digest only — consistency, not authenticity.

## 3. THE INDEPENDENT REFERENCE — CHOICE + PLAIN INDEPENDENCE STATEMENT

**Chosen reference:** the expected digest `86011a77…d99c8` pinned as the constant `EXPECTED_DIGEST` in `wall.js` — a separate, git-committed file the ledger cannot rewrite — **and** anchored in the Day-Book as entry **#7, "The Wall takes its seal"** (2026-11-23), whose text states the full digest and whose hash chains into the book (`4af3a7c9…`; new root `79e375ed…` over 7 entries, `record/root.json`). The Day-Book's own chain is recomputed by every visitor's browser on /record/ (record.js — untouched by this build), so the anchor is publicly checkable there. wall.js does NOT fetch the Day-Book at runtime; pin↔anchor consistency is verified by a human on /record/, not by code — stated plainly in the wall.js comment.

**Plain statement: no genuinely off-server reference exists yet.** The pin, the anchor, the ledger, and root.json are all served from the same GitHub Pages deployment under one account; a repo/deploy-level attacker could rewrite all of them consistently and recompute the whole chain. What this design genuinely defeats — proven by test (e) below — is single-file tampering, silent ledger edits, and self-consistent ledger forgery (data + digest rewritten together): tamper-*evidence* across separately-committed files, not independence. Two further tamper-evident attestations exist in house assets (critic round 2): the git history itself (commit-chained; the v1 wall.js sits at commit `e4fa96c2`), and this build's predecessor record, which printed the digest before v2 existed. Neither is browser-checkable and neither leaves the founder's trust domain. **The eventual genuinely-independent reference is the Day-Book's Memo anchor (FVR-15)** — the on-chain anchor that lands with the founder's pennies-wallet step; when it lands, the wall's seal gains a reference no house server can rewrite.

**Rejected as references:** `root.json` and the /record/-displayed root — same origin, purely derived values an attacker recomputes for free.

## 4. UPDATE PROTOCOL (written into the wall.js header comment)

The ledger's facts may only change when **all four** coupled artifacts land in one deploy: (1) the ledger with its new `signature.digest`, (2) the new `EXPECTED_DIGEST` pin in wall.js, (3) a new Day-Book entry whose text states the new digest, (4) `root.json` updated to the new entry's root with the new entry count. Any partial combination fails closed or breaks loudly, never silently wrong: ledger-only or pin-only → the Wall fails closed to the 0-face with the seal note; entry-without-root → /record/ shows CHAIN BROKEN. Transient cache skew during Pages propagation fails closed (understates) and self-heals.

## 5. THE GLASS MACHINERY — THE CHECK IS SHOWN (founder's law, 2026-11-23 23:48 CT)

A silent background check does not satisfy the law, so the verification **renders visibly** on the face. wall.js injects a **"The Seal"** row into every Covenant Ledger block (both ledger blocks, both pages), in the ledger's own `wall-fact` grammar (named part, then its reading), styled only with the house palette (antique gold `#C9A227` verdict). The visitor watches it work, in order:

1. **RECOMPUTING THE SEAL — SHA-256 OVER THE LEDGER'S FIELDS…** (while the ledger is read and hashed)
2. **RECOMPUTED · 86011a778d4dd33c…** beside **REFERENCE · 86011a778d4dd33c… — PINNED IN THIS SCRIPT · ANCHORED IN THE DAY-BOOK, ENTRY #7**
3. The verdict lands in plain words at the moment the check completes — **✓ SEAL HOLDS — THE FIGURES HERE ARE RENDERED FROM THE RECONCILED LEDGER** — and only then do the figures render (same synchronous step, verdict first; delta critic traced every render call site: no path renders a ledger figure before or without the verdict). On any failure: **✗ SEAL DOES NOT HOLD — NO FIGURE IS RENDERED FROM AN UNRECONCILED LEDGER**, and the numbers stay dark. Under `prefers-reduced-motion` the completed readout stands at once, no staging delay. On fetch failure the row reads "THE LEDGER COULD NOT BE READ FROM HERE" + the ✗ verdict.

**Stills (mirror, live bytes, /wall/ Covenant Ledger):** `digest-work/stills/seal-frameA-check-in-progress.png` (ledger delayed server-side — the genuine in-flight state: RECOMPUTING…, verdict empty) · `seal-frameB-verdict-holds.png` (✓ SEAL HOLDS, recomputed = reference, countdown ticking) · `seal-frameC-verdict-broken-compromised.png` (✗ SEAL DOES NOT HOLD, recomputed `67a1adab…` ≠ reference, countdown static, numbers at the founded face). The captain eyeballed B and C; the delta critic confirmed the ordering by code trace + the frame-A still.

## 6. THE FIVE TESTS (founder-endorsed upgrade, from ChatGPT's strategic review)

Run by the builder in the local mirror (live HTML + candidate wall.js + the new Day-Book, both pages, zero wall errors in every run; proofs `digest-work/proofs/v5-*.json`), graded by three critic seats, and re-run independently by the blind verifier against the deployed files (§8).

| Test | Result |
|---|---|
| **(a) Authentic data → renders** | **PASS.** Counter "0 GRAMS · 0 OF 47 BRICKS LAID" rendered from the ledger, countdown ticking, detent "RECEIPT LOCKED — AWAITING BRICK #1", Seal verdict "✓ SEAL HOLDS…" with recomputed = reference = `86011a778d4dd33c…`; /record/ "CHAIN INTACT" over the 7-entry book. |
| **(b) Modified data (digest untouched) → fail-closed** | **PASS.** gramsTotal 0→9 (exactly one byte), digest untouched: recomputed `67a1adab…` ≠ reference → ✗ verdict on the face, counter stays at the founded 0-face, countdown never starts, note explains. The tampered 9 appears nowhere. |
| **(c) Missing digest → fail-closed** | **PASS.** Digest field removed: early return in verifyLedger → ✗ verdict ("RECOMPUTED · —"), founded face, no figures. |
| **(d) Stale data → stated behavior** | **DETECTABLE — fails closed.** The stale variant (a pre-schema-era body, its own digest `c84eb15c…` correctly computed over that body — the v1 logic would have rendered it) fails the pin: ✗ verdict, founded face, countdown dark. **Honest statement:** staleness is detectable under this design precisely because the reference is pinned to the CURRENT ledger — any older true version reads as a broken seal. The failure direction understates to the founded face (tonight the cost is zero: the stale body's figures are also 0/47; after Brick #1 the same failure would visibly understate a real brick, with the note saying why). The update protocol (§4) is the price of freshness. |
| **(e) Compromised source (data + digest rewritten consistently) → must FAIL** | **PASS — the test the upgrade exists for.** gramsTotal 9 + digest recomputed consistently (`67a1adab…`): passes the v1 consistency logic, **fails the pin** → ✗ verdict, founded face, no figures. A file that vouches for itself is no longer believed. |

## 7. DEPLOY (merge-before-deploy)

All live bytes were fetched and hashed before any edit; the patch touches only wall.js's seal logic + comments and appends one Day-Book entry — no parallel insertions existed to preserve in the touched files, and the pages' HTML (which carries the Nexus instrument) is untouched. Deployed 2026-11-24 ~00:0x CT via the GitHub helper, three files, one deploy:

| File | Served sha256 (verified live) |
|---|---|
| `wall.js` | `9be584d3b73e735103f8f83f66caf631c4ae83761459573091e1207b5833b7a9` == candidate |
| `record/daybook.json` | `6def52c449c594911075c4a32e95cdb18483cfd9c28ef3df233d139155ca3855` == candidate (7 entries) |
| `record/root.json` | `86a14d7030e8e2870e44085d49b2f9ff6b6a3539926986be13eee7a3d6dcd058` == candidate (root `79e375ed…`, entries 7) |

Collateral, re-fetched after deploy, **unchanged**: `data/golden-wall.json` `2a771193…` · `/wall/` HTML `bf192b0b…` · `/record/` HTML `4f6d3e5c…` · `sections/record/record.js` `e397046a…` (the honors-fixed file — untouched; its verifyDaybook behavior is byte-identical because the file is byte-identical). Live re-probe from the served bytes: both pages render, Seal verdict ✓ HOLDS, /record/ CHAIN INTACT, zero errors. Work trees synced: `wall-nexus-work/build/wall.js` and `wall-nexus-work/staging/wall.js` both at `9be584d3…`.

**Fences held:** palette unchanged (the Seal row reuses the ledger's own classes; one inline antique-gold verdict) · the Wall's facts unchanged (0 GRAMS · 0 OF 47 · INSPECT RECEIPT dark — Brick #1 is not bought) · no other page's behavior changes (wall.js loads only on /wall/ and /record/, the only pages with `[data-wall-root]`) · record.js untouched.

## 8. CREW VERDICTS

- **Critic round 1** (graded v1, then v2 mid-review): digest definition CONFIRMED (incl. hypothetical brick entry, unicode, floats) · fail-closed completeness CONFIRMED · behavioral equivalence CONFIRMED · blast radius CONFIRMED · **one required fix: the `__proto__` preimage hole** — applied (null-prototype body) and proven (proto variant fail-closed). Its "diff clean" aside was wrong on one line; the captain re-verified the diff firsthand — the patch is exactly the intended edits.
- **Critic round 2** (graded the v2 pin + Day-Book append): **SHIP AFTER FIXES** — append CONFIRMED (all 7 entry hashes + root + vaults anchor `9306b2c2…` recomputed independently) · pin CONFIRMED, no bypass path (hand-traced all five variants) · independence honesty CONFIRMED with one NEEDS-CHECK nuance (git history + predecessor record as unnamed tamper-evident attestations — now named in §3; the anchor is a human cross-check, not a runtime gate — now stated in §3 and in the code comment) · staleness framing CONFIRMED · **one fix: the UPDATE PROTOCOL comment must name root.json + the entry-carries-the-digest requirement** — applied verbatim in substance (§4). Its probe worry (6 daybook elements counted vs 7 entries) was explained as a probe selector artifact in ledger-astrolabe mode and REJECTED as a defect — the authoritative signal, CHAIN INTACT, mathematically covers entry #7 (root = SHA-256 of entry #7's hash).
- **Delta critic** (graded the final candidate `9be584d3…`: proto fix + protocol comment + Glass Machinery): **SHIP.** Ordering CONFIRMED by adversarial trace — verdict is the first statement of the staged callback on the sealed path, `showSealUnreachable()` the first statement of the catch; no pre-verdict render path exists; verdict and figures commit in the same synchronous task. Truthfulness CONFIRMED with two staging caveats recorded, neither false: "RECOMPUTING…" also covers the fetch wait (it labels the check as a whole), and "RECOMPUTED · —" appears when no hash was ever produced (the em-dash signals no digest; the ✗ verdict carries the truth). Regression CONFIRMED (v5 proofs diffed field-by-field against v2/v3 — all six variants match on both pages). The 600 ms stage CONFIRMED (absolute deadline math; exactly one interval; reduced-motion collapses to 0 ms). Palette/copy CONFIRMED.
- **Blind verifier (fresh context, own derivations, live artifacts): PASS — 5/5 tests, 3/3 derivations.** It recomputed the digest in Python from the live file (match), confirmed the pin in live wall.js equals its own recomputation and that the failure paths are fail-closed in code, and recomputed the full Day-Book chain to live root.json (entry #7 anchors the same digest). The five tests, run in its own harness against the deployed files: **(a) PASS** (renders; countdown ticking; verdict "✓ SEAL HOLDS — THE FIGURES HERE ARE RENDERED FROM THE RECONCILED LEDGER"; recomputed = reference on the face) · **(b) PASS** (fail-closed; recomputed `67a1adab…` ≠ reference; "✗ SEAL DOES NOT HOLD…" on the face; the tampered 9 nowhere) · **(c) PASS** (fail-closed; "RECOMPUTED · —" vs the reference; ✗ verdict) · **(d) PASS with a caveat, recorded verbatim in substance:** the design has no version/freshness check of its own — staleness is detectable indirectly because the pin freezes one exact ledger body; any body differing from the pinned snapshot fails, stale or forged alike; the one undetectable case is a rollback to the byte-identical previously-pinned body, which would pass being indistinguishable from current truth (it is, by definition, the pinned truth — §6's statement stands for every other older version) · **(e) PASS** (the self-consistent forgery failed against the pin — the central claim holds under direct attack). PLUS: /record/ shows CHAIN INTACT with the displayed root equal to the verifier's computed root, and entry #7's title "The Wall takes its seal" is present in the rendered DOM text. One observation, not a failure: entry #7's full digest text sits behind the entry's collapsed proof/detail view on /record/ rather than in the always-visible text — the title + INTACT verdict carry the public check; the digest itself is in the served daybook.json for anyone who opens the entry.

## 9. FOLLOW-UPS NAMED, NOT BURIED

1. **The genuinely independent reference** arrives with the FVR-15 Memo anchor (founder's pennies-wallet step). When it lands, anchor the wall digest on-chain the same way.
2. **Seal the Brick #1 ledger with JS canonicalization semantics** (§1 float note) and land all four coupled artifacts in one deploy (§4).
3. The probe's `daybookEntries` metric undercounts in ledger-astrolabe mode (selector artifact, both critics) — rename/fix in a later pass; the CHAIN INTACT verdict is the authoritative signal.
