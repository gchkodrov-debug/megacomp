# BUILD RECORD — NIGHT BRICK MEMO ANCHOR: PREPARATION + DEVNET REHEARSAL (2026-11-24)

**Plain words first.** The instrument that lets the founder stamp the Day-Book's fingerprint onto Solana is built, rehearsed end-to-end on devnet, attacked by a different-family critic, fixed, re-rehearsed, and blind-verified twice from the chain itself. It is **NOT deployed** and **NO mainnet transaction has been attempted**. The founder's half is already done: his dedicated ANCHOR account in Phantom (derived from his existing recovery phrase) holds 0.0691 SOL — at 5,000 lamports per anchor that is ≈13,800 anchors of float. What remains is deployment + his one signature (go-live checklist, §9).

**Relay (Relay Law):** builder (Claude seat) → improver (Claude seat, fresh eyes) → critic (Kimi K3, different family — verdict SHIP AFTER FIXES) → fix pass → blind verifier ×2 (fresh-context seats, chain-only evidence). Every seat's findings are in §8; the crew agrees on the variant recorded here.

---

## 1. Spec source

- **FVR-15 — THE NIGHT BRICK + THE DAILY MEMO ANCHOR** (`FOUNDATIONAL_VISION_REGISTER.md`): one Solana Memo anchor per day at the Night Brick close (21:00 UTC), from a pennies wallet, carrying the Day-Book root hash; empty days anchored too; build no custom program. Founded 2026-11-19/20 (WAR_BOOK.md Part 2 · the smart-contract study's adopted minimum, ≈5,000 lamports per anchor).
- **FVR-12 — THE FOUNDATION + THE VERIFIER**: the Memo anchor is the genuinely independent reference the Wall's seal and the Day-Book chain have been waiting for — until now every house proof lived on the founder's own server (see `BUILD_RECORD_WALL_DIGEST_CHECK_2026-11-23.md` §3).
- `BLOCKCHAIN_LEARNINGS_PLAN.md`: "one Solana Memo root hash per day (the Night Brick, 21:00 UTC) from a pennies wallet."

**No founding source fixes an exact memo text format.** The format in §3 is therefore **PROPOSED** (captain's proposal, improved in relay), and is ratified by the founder when he signs the first anchor with the text in front of him.

## 2. The root being anchored — verified, not trusted

Fetched live during this build (2026-11-24) from `https://provadiacoin.com/record/root.json` + `daybook.json`:

- **Root:** `79e375edd0f466d259366c002088eb666c8e1f55464e615882c202356ec6face`
- **Entries:** 7 · **root.json date:** 2026-11-23 · last entry #7 "The Wall takes its seal" (2026-11-23)
- **Derivation rule, independently recomputed three times** (coordinator + both blind verifiers): every entry's `prev` equals the previous entry's `hash` (entry 1 prev = 64 zeros), and **root = SHA-256 of the last entry's `hash`** (hex string, UTF-8): SHA-256(`4af3a7c96a5878d37cf2e95b6f2e8a00be46a87116cba42d3ca5bddccf272761`) = `79e375ed…ec6face` ✓. Local file copies (5–6 entries) are stale; the live site governs.

## 3. The memo — format v1 (PROPOSED)

```
PROVADIA · DAYBOOK ROOT v1 · MAINNET · 79e375edd0f466d259366c002088eb666c8e1f55464e615882c202356ec6face · 7 ENTRIES · 2026-11-23
```

**Byte spec (the canonical format, binding on all future anchors):** fields in the order above, joined by `U+0020 U+00B7 U+0020` (space · middle dot · space), UTF-8, no trailing whitespace, no trailing newline. This instance: 128 characters, **133 UTF-8 bytes**. Field rules: `v1` = format version (any format change bumps it and requires a new rehearsal) · `MAINNET` = chain marker (a devnet rehearsal of a mainnet memo is identifiable as such only by cluster + signer — see the verification rule in §7) · the date is **root.json's date** (the record's date, not the signing date), so all three memo fields byte-match root.json (root · entries · date) for third-party comparison. Canonical source file: `anchor-work/MEMO_TEXT.txt` — exactly these 133 bytes.

**Empty-day rule (decided in this record):** root.json's date is the last entry's date, so on an empty day root · entries · date are all unchanged and the day's memo is **byte-identical** to the previous anchor's. It is still sent (FVR-15: empty days anchored too) — the anchor's own block timestamp is the day marker, and the **first valid anchor at or after the day's 21:00 UTC close is that day's anchor of record**; later duplicates are void.

## 4. The instrument

All files in `~/workspace/newwave/next-build/anchor-work/` (nothing deployed):

| File | What it is |
|---|---|
| `anchor-tx.mjs` | The shared construction module (39 lines): `buildAnchorTransaction(web3, connection, feePayer, memoText)` → a legacy transaction with feePayer + fresh blockhash and **exactly one** Memo instruction. Fail-closed guards on payer/memo. |
| `anchor.html` | The signing page (346 lines, 18.9 KB; its own script ≈150 lines): town palette (Vault `#141210` · antique gold `#C9A227` · bone cream `#E9DDC6` · deep brown `#30251B`; reserved bright gold unused). Shows the memo **in full, in plain sight, before any signing**, the root, the entry count, the network ("Solana MAINNET-BETA — real SOL, a signed anchor is permanent"), and the exact fee. Connects Phantom (`window.phantom.solana`, or `window.solana` only if `isPhantom`), builds via the mirrored construction, `signAndSendTransaction`, then **verifies the landed transaction itself** (§6) before calling the day anchored. web3.js 1.99.0 from unpkg, pinned by version **and** SRI sha384 (verified, §8). CSP meta restricts the page to its inline code, unpkg, and the two Solana RPC hosts. |
| `rehearse.mjs` | The devnet rehearsal driver: SRI check → page-mirror checks → pre-send construction asserts → sign/send with the crew devnet keypair → landed decode checks. 25 checks in the final run. |
| `MEMO_TEXT.txt` | The canonical memo bytes (§3). |
| `evidence/` | `rehearsal-tx.json` (final run) · `critic-kimi-k3.txt` (the critic's full report). |

Design decisions that matter: the memo lives in the page as a **JS constant** — the display renders *from* it, signing builds *from* it, and the page asserts display == constant before signing (a mutated DOM can never change what is signed). An account change in Phantom **locks signing** until the founder explicitly reconnects — the fee payer can never be silently retargeted. Double-signing is impossible from the page (in-flight guard; Sign stays disabled after any submission; it re-enables only on a proven on-chain failure). A stale blockhash fails honestly and free ("nothing was sent and no fee was paid — click Sign again"). A returned signature is displayed as *submitted*, then polled, then *verified* — never dressed up as success early.

## 5. Devnet rehearsal — proof

Signed programmatically with the crew devnet buffer wallet `BMhv2yHk8m33eudSs3n7DkMgLDtVmRgrXWEURQ4P7V6R` (Genesis-rehearsal keypair, devnet only) through the **identical construction code path the page uses** (`anchor-tx.mjs`); the signer differs (keypair vs Phantom), the construction does not. State of the art claimed: construction proven on-chain; the Phantom path itself is a go-live gate (§9), not a claim of this record.

**Final run (evidence of record — post-fix bytes):**
- **Signature:** `37NzKkNJcMt6aByfsrfVHjJX14GcfkmZtbXEy8cDkwx79CoVgAXgpYJg3VXbxfBe6Qqfs6XF4PF4sXXQwZo5ccp2`
- **Solscan (devnet):** https://solscan.io/tx/37NzKkNJcMt6aByfsrfVHjJX14GcfkmZtbXEy8cDkwx79CoVgAXgpYJg3VXbxfBe6Qqfs6XF4PF4sXXQwZo5ccp2?cluster=devnet
- **Slot:** 525705548 · **Fee:** 5,000 lamports · **Checks:** 25/25 PASS (11 mirror incl. SRI + CSP + constant/account-lockout/post-landing-verification presence · 6 pre-send · 8 landed)
- Earlier landings of the same construction (pre-format-change bytes): `46JMhkMk…` (builder) and `4p3GZhGU…` (improver, blind-verified 5/5) — superseded as evidence by the final run, listed so the devnet history is complete.

## 6. Byte-level instruction audit (from the decoded final rehearsal tx)

Decoded independently by the final blind verifier from devnet RPC (own base58 decoder; json + raw parses agree):

- **Account keys (2, complete list):** [0] `BMhv2yHk8m33eudSs3n7DkMgLDtVmRgrXWEURQ4P7V6R` — fee payer, signer, writable · [1] `MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr` — the Memo program. **No other program appears anywhere in the transaction** — no System Program transfer, no Compute Budget (no priority fee), nothing else.
- **Instructions: exactly 1.** `programIdIndex` → [1] (Memo) · `accounts: []` (zero) · data = 182-char base58 → **133 bytes**, byte-for-byte equal to `MEMO_TEXT.txt`.
- **Data (base64):** `UFJPVkFESUEgwrcgREFZQk9PSyBST09UIHYxIMK3IE1BSU5ORVQgwrcgNzllMzc1ZWRkMGY0NjZkMjU5MzY2YzAwMjA4OGViNjY2YzhlMWY1NTQ2NGU2MTU4ODJjMjAyMzU2ZWM2ZmFjZSDCtyA3IEVOVFJJRVMgwrcgMjAyNi0xMS0yMw==`
- **Money movement:** fee payer 4,445,644,760 → 4,445,639,760 lamports (**−5,000, the fee, and nothing else**); Memo program account unchanged; `meta.err = null`; `meta.fee = 5000`.
- **Chain's own log:** `Program log: Memo (len 133): "PROVADIA · DAYBOOK ROOT v1 · MAINNET · 79e375edd0f466d259366c002088eb666c8e1f55464e615882c202356ec6face · 7 ENTRIES · 2026-11-23"`

## 7. Re-anchors + the third-party verification recipe

**Re-anchors:** each new Day-Book root gets its own memo from the same ANCHOR account, in the §3 format with that root's (root · entries · date). One anchor per daily close; first valid anchor at/after the close wins (§3). The page's memo constant is regenerated from the live root at each deployment/update of the instrument — the rehearsal's mirror checks fail the run if page, constant, and canonical text ever disagree.

**Verification recipe (any third party, no trust in us):** a memo counts as a PROVADIA anchor **iff all three hold**: (1) it landed on **mainnet-beta**; (2) its **fee payer / first signer is the published ANCHOR address** (captured and published at go-live, §9 — until it is published, no anchor is verifiable and none should be claimed); (3) its **memo bytes match** the canonical format carrying the (root · entries · date) shown on the Record page. Then: fetch the tx (any explorer or RPC) → read the Memo instruction's data as UTF-8 → compare against root.json → optionally recompute the root from daybook.json (chain links + SHA-256 of the last entry's hash). **What an anchor proves:** that this exact root existed and was fixed at the anchor's block time — a rewrite of Day-Book history after that moment changes the root and breaks the match. **What it does not prove:** that the underlying entries are *true* — their correctness rests on the public, re-checkable chain recomputation, not on the anchor. (A devnet transaction, or any wallet other than ANCHOR, carrying identical memo bytes is **not** an anchor — the rehearsal txs in §5 are exactly such non-anchors, by design.)

## 8. Relay record — what each seat found and what changed

- **Builder:** built the three files; rehearsal landed first try at the construction level (fee 5,000, memo byte-exact). Noted honestly: websocket confirmation hung through this VM's proxy → the script confirms by HTTP polling.
- **Improver (fresh eyes) — found real defects around the construction, none in it:** cluster shown nowhere before signing (fixed — a mainnet warning line); double-click could send **twice** (fixed — in-flight guard + stays disabled after submission); account change mid-flow was invisible and could retarget the payer (fixed — event listeners + pre-sign revalidation); "submitted" was displayed as success (fixed — poll + honest states); signature rendered via `innerHTML` from a wallet-supplied string (fixed — base58/length validation + DOM APIs); CDN pinned by version only (fixed — SRI); **the rehearsal claimed a `keys: []` proof it never actually performed** (fixed — landed accounts recorded and checked; fee-payer identity, `meta.err`, and all-non-payer-balances checks added; pre-send asserts added; page-mirror checks added and negative-tested — a tampered page memo fails the run and sends nothing). Re-ran: new signature, 18/18.
- **Critic (Kimi K3, different family) — SHIP AFTER FIXES.** Its construction attacks **failed** (REJECTED: no path to a second instruction, transfer, priority fee, or wrong payer in either code path; provider selection and CLUSTER constant held). Its confirmed findings, all fixed in the fix pass: no format version or chain marker (→ format v1, §3); memo bytes sourced from the mutable DOM at click time (→ JS constant, §4); accountChanged comment overstated the code's conservatism (→ reconnect lockout); SRI digest never verified out-of-band (→ rehearsal recomputes it every run — **matched**: `DjHoHg45N+L5RZPO5p+uK874TyHExfoonwFDUKKpozAERZGg+SY8y+ntxvWd672b`); no CSP (→ added); the page never verified the landed tx (→ §4 post-landing verification, unit-tested against good/bad fixtures); rehearsal ≠ page execution (→ go-live gate, §9); founder-card STOP rule didn't cover memo substitution (→ §10 card rewritten); anchor identity must be pinned by pubkey + cluster + bytes (→ §7 rule); duplicate-anchor semantics (→ §3 first-wins rule).
- **Blind verifier #1** (pre-fix bytes, sig `4p3GZhGU…`): **5/5 PASS** — derived everything from devnet RPC + the live site with its own parsers; corrected one term (the RPC json data field is base58, not base64; bytes exact either way).
- **Blind verifier #2** (final bytes, sig `37NzKkNJ…`): **4/4 PASS** — 1 instruction · Memo program · 0 accounts · 133 bytes byte-equal · fee exactly 5,000 and the only balance change · root re-derived from the live Day-Book and matched to the memo · memo log line quoted verbatim.

## 9. Go-live checklist (deployment + the founder's sign — the next, separate step)

1. ☐ **HARD GATE — execute the page once through real Phantom on devnet:** serve `anchor.html` with `CLUSTER` flipped to `'devnet'`, open it in Phantom (in-app browser or extension), connect a throwaway devnet account, sign, and confirm the page's own post-landing verdict reads MEMO VERIFIED ON-CHAIN. Flip `CLUSTER` back to `'mainnet-beta'` and re-run `rehearse.mjs` (its mirror check refuses to send unless the page says mainnet-beta). *This prep never ran the page itself — string mirrors + unit tests only. Do not skip this gate.*
2. ☐ Deploy `anchor.html` to the town site (merge-before-deploy law; curl-verify the live bytes' hash against the local file). Decide at deploy: keep the SRI-pinned unpkg script (verified) or self-host `index.iife.min.js` beside the page and re-pin — either way, re-run the SRI check against what is actually served.
3. ☐ Confirm on the live page, before the founder is called: network line reads MAINNET-BETA · memo text == §3 exactly · root == the then-current live root (if the Day-Book has gained entries since this record, regenerate `MEMO_TEXT.txt` + the page constant from the live root.json and re-run the devnet rehearsal on the new bytes first).
4. ☐ Founder connects his ANCHOR account → **record the ANCHOR pubkey from the page's connected-wallet line and publish it** (Day-Book entry + the Record page's anchor note) *before* he signs — §7's verification rule is meaningless until the pubkey is public.
5. ☐ Founder signs (the card, §10). Expected fee **5,000 lamports (0.000005 SOL ≈ $0.0004)**.
6. ☐ After landing: the page's verdict must read MEMO VERIFIED ON-CHAIN; the captain records the mainnet signature in a Day-Book entry (the anchor's own receipt), and the Record page gains the anchor link. First anchor closes Product #0 item 3 / FVR-15's open decision ("awaiting his word since 2026-11-20").

## 10. The founder's one-step card

**Your one action:** open the anchor page in Phantom's browser → **Connect** (choose the **ANCHOR** account) → read the memo on the page → **Sign the Night Brick** → approve in Phantom. That's all. The page then confirms and verifies itself and shows "MEMO VERIFIED ON-CHAIN."

**What Phantom will show you (no surprises — corrected by Addenda 6–7, 2026-11-24, from real Phantom 26.43 screens on a direct-egress host):** the site asking to sign · the **ANCHOR** account as the signer · a simulation section that **does populate**, reading "No balance changes found. Please proceed only if you trust this site." — nothing moves for this transaction, and if that section ever shows anything else, it is a stop (below) · a **Network Fee line reading 0.00008 SOL** — that is NOT this instrument's fee: Phantom 26.43 adds its own priority fee (375,000 µL/CU × 200,000 CU = 75,000 lamports on top of the 5,000-lamport base) to any transaction that carries no ComputeBudget instructions of its own, and its window discloses the augmented total. The memo text is **not** on the main approval screen, but it IS inspectable before you confirm: open **Advanced → createMemo** in the approval window and the full memo text is shown with a Copy button — cross-check it there; and read it on the page, in full, before you sign. Afterwards anyone can read it forever via the Solscan link. Phantom may take a few seconds to simulate — that alone is not a stop; the checks below are.

**What the page may show you after Confirm (Addendum 7):** the current page has Phantom sign only, then broadcasts itself — and it **refuses to broadcast any transaction Phantom augmented**. If Phantom returns the transaction with its ComputeBudget pair prepended, the page stops with "refusing to broadcast an augmented transaction. Nothing was sent." — nothing reached the chain, no fee was paid, and the day is NOT anchored. That refusal is the instrument protecting the standard, not a malfunction: do not retry around it — tell the captain.

**STOP and do not sign if any of these is true:**
- Phantom shows **any** token or SOL amount moving, or **any** approval/permission — this transaction must move nothing but the fee.
- The signing account is **not** the ANCHOR account.
- The memo on the page does not match the root on the Record page — check `provadiacoin.com/record/` on a fresh fetch (second device is best): root `79e375ed…ec6face`, 7 entries, date 2026-11-23. A wrong memo is permanent and Phantom will *not* catch it — this check is yours.
- The fee shown is anything other than the two known values: **0.000005 SOL** (the instrument's own fee) or **0.00008 SOL** (Phantom 26.43's disclosed augmentation — Addenda 6–7). Any third number means something else is in the transaction: stop.

**Before you sign:** glance at the ANCHOR account's recent activity — if today's anchor already landed (first one wins), don't sign a duplicate. **If a signing attempt seems to hang:** don't sign again — wait ~2 minutes and check the account on Solscan first; a retry after a mere timeout is how duplicates happen. **Cost:** 5,000 lamports = 0.000005 SOL ≈ **$0.0004** (at ~$72/SOL) — your 0.0691 SOL float covers ≈13,800 nightly anchors.

---

*Prepared 2026-11-24 under the captain's commission (00:34 CT). Founder's funding step completed the same night (ANCHOR account, 0.0691 SOL, from his Phantom screenshots). Instrument NOT deployed; no mainnet transaction attempted; the only mainnet-value statement in this record is the fee estimate, marked as such. Files: `~/workspace/newwave/next-build/anchor-work/` · this record: `~/workspace/newwave/next-build/BUILD_RECORD_NIGHT_BRICK_ANCHOR_PREP_2026-11-24.md`.*

---

## ADDENDUM — 2026-11-24 00:52 CT: GO-LIVE GATE (REAL-PHANTOM DEVNET RUN) — PREPARED, BROWSER RUN HANDED TO THE CAPTAIN'S BROWSER ROUTE

**Gate status: NOT YET PASSED — preparation complete, the Phantom run itself is handed off (see below). Nothing in this addendum claims the gate has been executed.**

What this seat (a generic subagent without browser control) completed, all verified from this VM:

1. **Devnet test copy built:** `anchor-work/anchor-devnet.html` — `diff` against `anchor.html` proves the ONLY differing line is the constant: `const CLUSTER = 'devnet';` (line 62). The canonical `anchor.html` was never modified — its CLUSTER still reads `'mainnet-beta'`, so §9's "flip back + re-run rehearse.mjs mirror check" risk is eliminated by construction rather than by procedure. Known cosmetic quirk, recorded so nobody mistakes it for a failure: the page's static display text (the Network line, the wallet line's hardcoded `(MAINNET)` suffix, and the memo's own `MAINNET` chain-marker) still says mainnet in the test copy — §9 prescribes flipping only the CLUSTER constant, and the functional cluster is the one the wallet line reports after Connect (`Cluster: devnet`) and the one the chain proof reads (devnet RPC).
2. **Throwaway account confirmed:** the Genesis-rehearsal devnet keypair (`genesis-rehearsal/keys/faucet-buffer.json`) derives pubkey `BMhv2yHk8m33eudSs3n7DkMgLDtVmRgrXWEURQ4P7V6R` and holds **4,445,639,760 lamports** on devnet (read live from `api.devnet.solana.com` at 00:52 CT) — ~889,000 anchor fees of float, devnet-only, no real value. Its base58 secret (for Phantom's Import Private Key) was derived locally and is carried in the browser brief held by the captain — it is NOT written into this record.
3. **Independent verifier written and proven:** `anchor-work/verify-gate.mjs <signature>` fetches a landed tx from the public devnet RPC and asserts, independently of the page and of `rehearse.mjs`: exactly 1 instruction · Memo program · 0 instruction accounts · memo bytes byte-equal to `MEMO_TEXT.txt` (133 bytes; the file has no trailing newline — `od` verified) · fee == 5,000 lamports · fee payer == `BMhv2yHk…` · `meta.err == null`. Dry-proven against the §5 programmatic rehearsal signature `37NzKk…`: **9/9 PASS** — the verifier judges correctly; that run was the programmatic path and does NOT satisfy this gate.
4. **Serve route for the test:** `python3 -m http.server 8741 --bind 127.0.0.1` from `anchor-work/`, page at `http://127.0.0.1:8741/anchor-devnet.html` — reachable by the VM's Chromium, where the Phantom extension (if present/installable) injects `window.phantom.solana`.

**What remains (the gate itself):** one human-path run of that page through a REAL Phantom — install/present check, import the throwaway account, enable Phantom's devnet/testnet mode if the build requires it, Connect, Sign, capture the approval screen, and return the signature for `verify-gate.mjs`. The full browser brief (steps, the memo text, the throwaway key, the founder-card claims to confirm-or-correct, and the stop rules) was delivered to the captain with this addendum. **If the cloud browser cannot install or run Phantom, the gate is FAIL-BLOCKED with that evidence — the programmatic sign is not a substitute and must not be presented as one.**

**Founder card (§10) — status of its Phantom-screen claims:** still UNVERIFIED against a real Phantom screen (they were written from research). The browser run must confirm or correct, from the actual approval screen: (a) Phantom shows the site + signing account + ~0.000005 SOL estimated fee; (b) the simulation summary is empty (nothing moves); (c) Phantom does NOT display the memo text; (d) whether a "could not simulate" state appears on devnet. The addendum will be completed with GATE PASS/FAIL, the devnet signature, the decoded-tx proof, and the corrected card text when the run's evidence returns.

## ADDENDUM 2 — 2026-11-24 ~02:50 CT: GO-LIVE GATE, SECOND ROUTE (LOCAL CHROMIUM + PHANTOM ON THIS VM) — **NOT PASSED: BLOCKED-BY-ENVIRONMENT**

The captain's second route was executed in full on this VM. The gate standard is unchanged and was not lowered: no programmatic sign was substituted, no mainnet was touched, the founder's wallets were never involved. **Verdict: the gate does NOT pass — `verify-gate.mjs` has no Phantom-path signature to check.** What follows is exactly how far the route got and the precise point where this environment stops it.

### What was built and proven working on this VM
- **Genuine Phantom extension, cryptographically verified:** CRX fetched from the official Chrome Web Store update service (`update.googleapis.com`), file `anchor-work/gate-run/phantom.crx`, 19,213,580 B, **sha256 `ead7273e79a57dc9e653e9a268c1b7ce2eb9efb3f3ad073909465c1125493a42`**. CRX3 header parsed: crx_id derives to `bfnaelmomeimhlpmgjnjophhpkkoljpa` from both RSA proofs; **openssl RSA signature over the package body: Verified OK**; manifest name "Phantom", **version 26.43.0** (matches the browser seat's verified version). Loaded unpacked into Chrome for Testing 157.0.8103.78 under Xvfb.
- **Throwaway Phantom wallet created** in the persisted test profile (`gate-run/profile/`); the gate account's keypair was verified in-script to derive **BMhv2yHk8m33eudSs3n7DkMgLDtVmRgrXWEURQ4P7V6R** and imported through Phantom's real UI as **"DEVNET GATE"** (Phantom's own import screen displayed the address); DEVNET GATE is the active account; devnet balance 4,445,639,760 lamports (valueless).
- **Testnet Mode ENABLED** (Settings → Developer Settings → Testnet Mode): wallet home carries the banner **"You are currently in Testnet Mode"**; selectable networks shown include Solana Testnet / Solana Devnet / Solana Localnet.
- **The page runs:** `anchor-devnet.html` served on `127.0.0.1:8741`; `window.solanaWeb3` loads and `window.phantom.solana` injects. (Plumbing, recorded for any re-run: this VM has no direct egress — Chrome cannot resolve the house proxy's internal IPv6 hostname, so a local CONNECT relay on `127.0.0.1:18080` forwards to the house egress proxy; `--ignore-certificate-errors` is required in the TEST browser only, because the house proxy is a TLS MITM whose CA Chrome-for-Testing does not carry. The page's SRI pin still enforced the web3.js bytes end-to-end. Page bytes were NEVER changed on this route — no page fixes, so no rehearsal re-run was triggered.)
- **One full CONNECT through Phantom's real connect window** (run of ~08:24–08:36 UTC): window rendered — verbatim: "Connect · 127.0.0.1:8741 · Confirming will allow this site to view balances and activity for the selected account. · Account · DEVNET GATE · Only connect to websites you trust · Cancel · Connect" — Connect was clicked in Phantom's UI and the page showed **"Connected: BMhv2yHk8m33eudSs3n7DkMgLDtVmRgrXWEURQ4P7V6R · Cluster: devnet (MAINNET) · Fee payer: BMhv2yHk… · Expected fee: 0.000005 SOL"**.
- **One full SIGN approval-window render** in the same run: verbatim text "DEVNET GATE · Confirm Transactions · 127.0.0.1:8741 · Balance changes are estimated. Amounts and assets involved are not guaranteed. · Cancel · Confirm" (screenshot `gate-run/shot-G13-approval-BEFORE.png`).

### The precise stopping point
In the approval window, **the transaction-simulation section never finishes loading**: the screenshot shows three skeleton placeholder rows where the balance-changes/fee summary belongs, and **the Confirm button stays disabled** while it loads. The Confirm click therefore had no effect; nothing was signed and nothing was broadcast. On-chain proof: `getSignaturesForAddress` for BMhv2yHk…, checked repeatedly through the final runs — the newest signature remains the programmatic rehearsal `37NzKkNJcMt6aByfsrfVHjJX14GcfkmZtbXEy8cDkwx79CoVgAXgpYJg3VXbxfBe6Qqfs6XF4PF4sXXQwZo5ccp2`; no Phantom-path transaction exists.

Root cause (evidenced, not guessed): Phantom's backend calls from Chrome on this VM stall indefinitely — the notification window's requests (`api.phantom.app/portal/v1/public-apps`, `currency_exchange/v1/rates`, `data.phantom.app/v1/batch`, `blowfish-blocklist-proxy.phantom.app`, `time.phantom.app`) remain pending ≥45 s (CDP capture, `gate-run/probe14.log`), extension-context fetches to the same hosts abort at 25 s timeouts, and connect windows frequently never get created at all (Phantom gates window creation on backend responses). The same hosts answer **curl in ~1 s through the same proxy path** — the stall is specific to Chrome's traffic through the house MITM egress, compounded by this VM's 1.5 shared CPUs (load repeatedly 1.8–2.2 during the runs). The cooperation is episodic: one run threaded connect + approval render inside a good window; the final engineered attempt (`gate-run/gate2b.mjs`, 2 × 240 s waits for the connect window) never saw a window. Devnet RPC from the page context, by contrast, answers in ~1.3 s when the episode is good (`gate-run/probe19.mjs`).

### §10 founder card — Phantom-screen findings (confirm / correct)
From the real renders captured above:
- (a) Signing account shown: **CONFIRMED** — "DEVNET GATE" heads both the connect and approval windows; the origin "127.0.0.1:8741" is shown on both. Fee shown: **NOT CONFIRMED — correct the card.** No fee figure appeared in any captured render; the fee/simulation rows never loaded in this environment. The card must not promise George a visible ~0.000005 SOL fee line in Phantom; the PAGE states the expected fee, and his STOP rule on an unexpected fee can only be applied if Phantom populates that section.
- (b) Simulation summary: **NOT CONFIRMED as an "empty" display** — it never populated (perpetual loading placeholders). Nothing in the captured renders showed any asset movement or approval — but the honest statement is "the simulation section did not finish loading here," not "the simulation showed nothing moves."
- (c) Memo text displayed in Phantom: **CONFIRMED ABSENT** — neither window's full text contains any part of the memo. The §10 position stands: George reads the memo on the PAGE, not in Phantom.
- (d) "Could not simulate" state on devnet: **not observed** — what appears instead, in this environment, is an endless simulation-loading state with Confirm disabled.
- Warning text verbatim (the only warning rendered): **"Balance changes are estimated. Amounts and assets involved are not guaranteed."** Connect window carried: **"Only connect to websites you trust."**

### Recommended fallback (gate standard untouched)
1. **Run the identical rig on any host with direct, unproxied internet** (e.g. the founder's laptop, where his Phantom already lives, or another crew machine): serve `anchor-devnet.html`, fresh throwaway Phantom, import the gate key, Testnet Mode on, Connect → Sign → `node verify-gate.mjs <signature>`. The whole route is packaged in `anchor-work/gate-run/` (drivers `gate.mjs` / `gate2b.mjs`, relay, helpers, probes, logs, screenshots).
2. **Or re-run on this VM in a quiet network window** — the route came within one simulation-load of passing; the rig is one command (`DISPLAY=:99 node gate2b.mjs`, with the page server and `relay.mjs` running) and the profile already holds the wallet, the imported DEVNET GATE account, and Testnet Mode ON.
3. Until a Phantom-path devnet signature passes `verify-gate.mjs` 9/9, **§9 item 1 stays open and the founder's mainnet sign does not proceed.**

*Route evidence lives in `~/workspace/newwave/next-build/anchor-work/gate-run/` (gate.log, gate2/gate2b logs + result JSONs, probe logs 5–19, screenshots `shot-G*` / `shot-H*` / `shot-P*`). The throwaway wallet is disposable devnet-only material; its seed sits in `gate-run/throwaway-seed.txt` (mode 600). The gate account's private key was handled in-script only and is recorded nowhere in this record.*

## ADDENDUM 3 — 2026-11-24 ~04:53 CT: GO-LIVE GATE, QUIET-WINDOW RETRY LOOP (ROUTE 2, RETRY) — **NOT PASSED: BLOCKED-BY-ENVIRONMENT (5/5 ATTEMPTS)**

The bounded retry loop commissioned after Addendum 2 ran in full: 5 attempts spaced ~20 minutes apart (one spacing exception, recorded below), each a fresh run of the packaged rig on this VM — page server on `127.0.0.1:8741` serving the untouched `anchor-devnet.html` (served-bytes sha256 re-verified equal to disk at every attempt start: `0a01d7e61a88bb61c7b01d245c810d0752b2d596612cf1f92aaa2148e49465cb`), CONNECT relay up, Chrome under Xvfb :99 with the persisted profile (throwaway wallet + imported DEVNET GATE account + Testnet Mode ON). **Verdict: the gate does NOT pass. No Phantom-path signature exists; `verify-gate.mjs` was never invoked, because no candidate signature was ever produced. The gate standard was not lowered, no substitute sign was used, no mainnet was touched, the founder's wallets were never involved, and the page bytes were never modified** (post-loop sha256: `anchor.html` `d26ab7b77d4d6ca915e3e4da26cea330c7fb53d6c842585723d7b3fa3a163287` · `anchor-devnet.html` `0a01d7e6…` — both identical to the pre-loop baseline).

**Driver note (tooling only, page untouched):** the loop ran a copy of the Addendum-2 driver as `gate-run/gate3.mjs` with two changes — (1) a simulation-aware Confirm loop (poll the approval window, record the Confirm button's DOM state and the window text, click only once the button is DOM-enabled AND the simulation content has arrived); it was never exercised, because no attempt reached the approval window. (2) After attempt 1's crash (below), navigation hardening: the dapp `goto` uses `domcontentloaded` + a 120 s timeout with the `window.solanaWeb3 && window.phantom.solana` readiness poll as the real gate, and the popup `goto` got a 90 s timeout + catch. Neither change alters what would be signed or how it is verified.

### Per-attempt log (times UTC; CT = UTC−6)

- **Attempt 1 — 08:48:16–08:49:16 UTC (02:48 CT). FAILED before the connect phase.** The driver crashed ~60 s in on an uncaught `TimeoutError: Navigation timeout of 30000 ms exceeded` at the dapp navigation (`waitUntil: 'load'`): the page's `load` event waits on the SRI-pinned unpkg web3.js script, which stalled through the house egress. Connect window: never requested. Approval render: no. Simulation load: n/a. (Driver hardened per the note above before attempt 2.)
- **Attempt 2 — 09:09:16–09:24:23 UTC (03:09 CT). FAILED at connect-window creation.** Wallet unlocked (3 unlock attempts), dapp loaded, "Connect Wallet" clicked in the page's real UI three times; **the Phantom connect window never appeared in any of the three 240 s waits** (connect tries at 09:12:19, 09:16:21, 09:20:22 UTC — all "no window"). Approval render: no. Simulation load: n/a. Driver exit 6 (connect phase exhausted).
- **Attempt 3 — 09:26:13–09:38:51 UTC (03:26 CT). FAILED at connect-window creation.** Same shape: 3 connect tries (09:26:47, 09:30:49, 09:34:49 UTC), all "no window". *Spacing exception, recorded honestly:* the first loop process was killed by a session teardown at ~09:25 UTC (it had been launched inside a shell that was torn down); the loop was relaunched detached (`setsid`, own session) resuming at attempt 3, which therefore started ~2 min after attempt 2 ended instead of after the usual ~20 min sleep. Attempts 4–5 kept the full spacing.
- **Attempt 4 — 09:58:51–10:14:02 UTC (03:58 CT). FAILED at connect-window creation.** 3 connect tries (10:01:58, 10:06:00, 10:10:01 UTC), all "no window". VM load was low throughout (0.31–0.75) — the CPU-contention factor from Addendum 2 was absent and the windows still never came.
- **Attempt 5 — 10:34:03–10:49:09 UTC (04:34 CT). FAILED at connect-window creation.** The wallet side was verified healthy this run: the popup home rendered **"D | DEVNET GATE | You are currently in Testnet Mode | Send | Swap | Receive | Buy | Tokens | Collectibles | More"** — correct active account, Testnet Mode ON. 3 connect tries (10:37:04, 10:41:06, 10:45:07 UTC), all "no window".

**Aggregate:** 12 connect tries across attempts 2–5, each waited out at 240 s — **zero connect windows created**. The flow never reached the approval window in this loop, so there are **no new Phantom approval-screen facts** to add: Addendum 2's captured renders (connect window + approval window with its disabled-Confirm simulation stall) remain the only real-Phantom screen evidence, and its §10 founder-card corrections stand unchanged. The failure sits one step earlier than Addendum 2's stopping point and has the same evidenced root cause: Phantom gates notification-window creation on backend responses, and those backend calls from Chrome through this VM's MITM egress stall (Addendum 2, CDP capture) — while the same hosts answer curl in ~1 s through the same proxy. This loop adds one new data point: with CPU contention removed, the stall persisted across a ~2-hour span (08:48–10:49 UTC), so on this VM the "quiet window" did not occur.

**On-chain proof (checked at loop end, 10:53 UTC):** `getSignaturesForAddress` for `BMhv2yHk8m33eudSs3n7DkMgLDtVmRgrXWEURQ4P7V6R` — the newest signature is still the programmatic rehearsal `37NzKkNJcMt6aByfsrfVHjJX14GcfkmZtbXEy8cDkwx79CoVgAXgpYJg3VXbxfBe6Qqfs6XF4PF4sXXQwZo5ccp2`; the account balance is unchanged at 4,445,639,760 lamports. Nothing was signed or broadcast in any attempt.

### Verdict and what stands

- **§9 item 1 remains OPEN.** The founder's mainnet sign must not proceed on this evidence.
- The gate standard is untouched: a Phantom-path devnet signature passing `verify-gate.mjs` 9/9 is still the only pass.
- **Fallback (unchanged from Addendum 2):** run the packaged rig (`anchor-work/gate-run/`, now including `gate3.mjs`, `gate3-loop.sh`, and this loop's logs/results `gate3-loop.log` · `gate3-driver.log` · `gate3-result-attempt1–5.json` · `GATE3_BLOCKED.txt`) on any host with direct, unproxied internet — e.g. the founder's laptop, where his Phantom already lives — or re-run here only if the egress behavior materially changes. The profile on this VM still holds the wallet, the imported DEVNET GATE account, and Testnet Mode ON, so a future re-run here remains one command (`DISPLAY=:99 node gate3.mjs` with the page server + `relay.mjs` up).

*Loop executed 2026-11-24 08:48–10:49 UTC (02:48–04:49 CT) under the captain's retry commission. Devnet only; the throwaway gate account only; founder wallets never involved.*

## ADDENDUM 4 — 2026-11-24 ~04:55 CT: FINAL EGRESS DIAGNOSIS + BYPASS ATTEMPT — **VM-ROUTE-EXHAUSTED: NO DIRECT EGRESS EXISTS ON THIS VM**

The last untested hypothesis from Addenda 2–3 was that the stall lives in the proxy path and that Chrome could be told to bypass the proxy for Phantom's backend hosts only (`--proxy-bypass-list` for `*.phantom.app` + the Blowfish proxy host), letting those connections go direct. That bypass has one precondition: a direct route off this VM must exist. This addendum tests that precondition read-only (curl only; no proxy settings, Chrome config, or system state were changed). **The precondition fails at every layer — DNS, IP, and port. The bypass attempt was therefore not run: there is nothing for a bypassed connection to travel on. Verdict: VM-ROUTE-EXHAUSTED.** No signing was attempted in this addendum; nothing was signed or broadcast; the gate standard is unchanged.

### How this VM reaches the internet (measured)

- **Shell/tool egress:** `http_proxy`/`https_proxy`/`all_proxy` (both cases) = `http://hatch-egress-proxy:3128` (with basic-auth credentials in the process environment; the unauthenticated form is in `/etc/environment`). The proxy resolves to IPv6 `fd8b:4f84:7d32:99::1`. CA bundle for the MITM: `/run/hatch/egress-tls/ca-bundle.pem`.
- **Chrome's path in the rig:** Chrome → local CONNECT relay `127.0.0.1:18080` (`relay.mjs`) → `hatch-egress-proxy:3128` → internet. The relay exists because Chrome cannot resolve the proxy's internal IPv6 hostname; Node can.
- **Routing:** default route via `198.19.0.1` dev `host0`; the VM's own address is `198.19.0.2/30`. Nameservers: `198.19.0.1` and `fd8b:4f84:7d32:99::1`.
- **DNS is fake-IP:** the system resolver maps every public hostname into `198.18.0.0/15` (e.g. `data.phantom.app` → `198.18.128.73`, `example.com` → `198.18.128.77`, `api.devnet.solana.com` → `198.18.128.78`). Those addresses exist only inside the proxy's view of the world; they are not routable destinations.

### Diagnosis numbers (2026-11-24 ~10:52–10:55 UTC)

**Baseline — via the house proxy (curl, env proxy):** all four Phantom backend hosts answer with real origin responses in ~1 s, confirming Addenda 2–3:
- `https://data.phantom.app/` — HTTP 403, total **1.30 s** (TLS 0.49 s)
- `https://api.phantom.app/` — HTTP 403, total **1.28 s** (TLS 0.49 s)
- `https://blowfish-blocklist-proxy.phantom.app/` — HTTP 500, total **0.98 s** (TLS 0.52 s)
- `https://time.phantom.app/` — HTTP 404, total **1.06 s** (TLS 0.52 s)

**Direct attempt 1 — `--noproxy '*'`, system DNS:** all six test URLs (`data.phantom.app`, `api.phantom.app`, `blowfish-blocklist-proxy.phantom.app`, `time.phantom.app`, `example.com`, `api.devnet.solana.com`) fail identically: TCP "connects" in ~0.001 s to remote `198.19.0.1` (the gateway, not any origin), TLS never starts, curl exit **35** (SSL connect error) at ~0.03 s total.

**Direct attempt 2 — real origin IPs, DNS bypassed:** real IPs were learned out-of-band via DNS-over-HTTPS through the proxy (Cloudflare DoH): `data.phantom.app` / `api.phantom.app` → `104.18.35.227`, `172.64.152.29` (Cloudflare). With `--noproxy '*' --resolve` pinning those IPs — and likewise `example.com` → `93.184.215.14` and a literal `https://1.1.1.1/` — every connection fails **identically**: curl reports `Connected to data.phantom.app (198.19.0.1) port 443` even when dialing `104.18.35.227`, and OpenSSL aborts with `error:0A00010B:SSL routines::wrong version number` — the gateway transparently intercepts **all** outbound TCP regardless of destination IP and answers in HTTP-proxy protocol, not TLS. Total time ~0.03 s, curl exit 35, in every case.

### Conclusion

- **There is no direct egress from this VM.** Every outbound TCP connection is intercepted at the gateway (`198.19.0.1`); the only sanctioned way out is an HTTP CONNECT through `hatch-egress-proxy:3128`. This is a property of the VM's network cell, not of Chrome, the relay, Phantom, or VM load.
- Consequently the Addendum 2–3 stall cannot be bypassed from inside this VM: a `--proxy-bypass-list` for Phantom's hosts would hand those connections to the same intercept, where TLS dies in ~0.03 s — strictly worse than the proxy path, which at least answers curl in ~1 s and episodically cooperates with Chrome. The bypass attempt (Step 2) was not run because its precondition is proven absent; running it could only have re-proven this section's numbers from inside Chrome.
- **§9 item 1 remains OPEN. The founder's mainnet sign must not proceed.** The gate still passes only on a Phantom-path devnet signature verifying `verify-gate.mjs` 9/9.
- **The VM route is exhausted.** The remaining path is the Addendum 2 fallback, now the sole recommendation: run the packaged rig in `anchor-work/gate-run/` on a host with direct, unproxied internet — e.g. the founder's laptop, where his Phantom already lives: serve `anchor-devnet.html`, fresh throwaway Phantom, import the gate key, Testnet Mode on, Connect → Sign → `node verify-gate.mjs <signature>`. Re-running on this VM is warranted only if the house egress behavior materially changes.

*Diagnosis executed 2026-11-24 ~10:52–10:55 UTC (04:52–04:55 CT) under the captain's final-egress commission. Read-only network probes (curl via proxy, curl direct, DoH lookup via proxy); no settings changed anywhere; devnet-only context; no wallet touched; nothing signed.*

---

## ADDENDUM 5 — ROUTE 3 (CLOUD BROWSER + PUBLIC TUNNEL) — 2026-11-24 ~10:56–11:08 UTC (04:56–05:08 CT)

**Route design:** the cloud browser runs on different infrastructure from this VM, so Phantom's backends may answer it normally (escaping the Addendum 2–4 egress wall). Route 1 failed because (a) the page was served on the VM's localhost, unreachable from the cloud browser, and (b) the Phantom Web Store install hung. Route 3 was commissioned to fix (a) with a cloudflared quick tunnel and retry (b).

**Verdict: ROUTE 3 NOT COMPLETED from this seat.** The tunnel sub-route is **proven impossible from this VM** (same egress wall, new door). The browser leg was **not executed by this seat** — a subagent has no `browser.browse` tool (the browser namespace available here exposes only search/open/find), so the cloud-browser run must be dispatched by the captain with the prepared brief (delivered with this addendum's report). No Phantom-path signature exists; `verify-gate.mjs` was not run; **§9 item 1 remains OPEN and the founder's mainnet sign must not proceed.**

### What was verified locally (all read-only)

- **Page server:** already running from the earlier rig — `python3 -m http.server 8741 --bind 127.0.0.1`, cwd = `anchor-work/`. Served `anchor-devnet.html` = **18,893 bytes, sha256 `0a01d7e61a88bb61c7b01d245c810d0752b2d596612cf1f92aaa2148e49465cb` — byte-identical to the file on disk.** Page bytes untouched throughout.
- **Page dependencies are public:** `anchor-devnet.html` loads web3.js from `https://unpkg.com/@solana/web3.js@1.99.0/…` (SRI-pinned) and talks to `https://api.devnet.solana.com` — no localhost dependencies, so any public HTTPS URL serving these identical bytes works for the cloud browser.
- **Key material located + verified:** the throwaway account's secret lives at `genesis-rehearsal/keys/faucet-buffer.json` (64-byte array, the same source every rig script uses). Its base58 form was computed in-memory and **verified to derive exactly `BMhv2yHk8m33eudSs3n7DkMgLDtVmRgrXWEURQ4P7V6R`**. The key value is not printed in this record (it travels only inside the captain's browser brief, per the desk secrets fence).
- **Known page quirk (for the browser brief):** the devnet copy's static text still says MAINNET (Network line + the memo's own marker); after Connect the page's functional line reads `Cluster: devnet`. Phantom must be in Testnet Mode (devnet) for the run; `verify-gate.mjs` reads only `api.devnet.solana.com`, and the account holds devnet funds only.

### The tunnel attempt — cloudflared cannot leave this VM

- Official binary downloaded through the proxy into `gate-run/`: **cloudflared 2026.11.2, 40,334,417 bytes** (GitHub release `cloudflared-linux-amd64`).
- Quick tunnel (`cloudflared tunnel --url http://127.0.0.1:8741`) fails immediately, twice identically: `failed to request quick Tunnel: Post "https://api.trycloudflare.com/tunnel": tls: first record does not look like a TLS handshake` — cloudflared's API call goes direct and dies at the gateway intercept, exactly the wall Addendum 4 measured.
- Independent confirmation that the proxy is no way out either: `curl -X POST https://api.trycloudflare.com/tunnel` **via the house proxy timed out at 20 s (http=000, no response)** — the tunnel API host joins the class of hosts that stall through this egress.
- An approval request attached to the diagnostics run timed out unanswered; the cloudflared launch was not retried after that. The impossibility verdict does not rest on the retried action: it rests on the two independent measurements above.
- No tunnel was ever established, so there is nothing to tear down. The pre-existing local server on 8741 remains as the earlier rig left it.

### Remaining viable shape (captain's move)

Serve the **identical bytes** (sha256 above) from any public HTTPS URL the cloud browser can reach — e.g. a temporary GitHub Pages location (GitHub API writes through the proxy are proven working; the desk filings used them all night) — then dispatch the cloud-browser task with the prepared brief (Phantom install from the Web Store, id `bfnaelmomeimhlpmgjnjophhpkkoljpa`; import the gate key as "DEVNET GATE"; Testnet Mode on; Connect → Sign; record the approval-screen facts; return the signature) and run `node verify-gate.mjs <signature>` here. PASS remains 9/9 on a Phantom-path signature only; the rehearsal signature `37NzKkN…` never counts.

*Route 3 executed 2026-11-24 ~10:56–11:08 UTC under the captain's route-3 commission. Devnet-only context; no wallet touched; nothing signed or broadcast; page bytes unmodified; no credentials other than the throwaway devnet key handled.*

---

## ADDENDUM 6 — 2026-11-24 ~14:22–14:50 UTC (08:22–08:50 CT): GO-LIVE GATE, ROUTE 4 (THE VPS — DIRECT EGRESS) — **NOT PASSED: THE PHANTOM PATH NOW COMPLETES END-TO-END, AND THE CHAIN PROOF FAILS ON PHANTOM'S OWN TRANSACTION AUGMENTATION**

**Verdict: the gate does NOT pass.** `verify-gate.mjs` against the Phantom-path signature scores **4 PASS / 5 FAIL**, and the page's own post-landing verdict reads **"MEMO VERIFIED" nowhere — it reads "MEMO VERIFICATION FAILED — expected exactly 1 instruction, found 3."** §9 item 1 remains OPEN and **the founder's mainnet sign must not proceed.** But this road went further than all three before it, and the stopping point is new, precise, and not an environment failure: **the Phantom path itself works on a direct-egress host — connect, approval window, simulation, Confirm, broadcast, landing all completed through the genuine Phantom — and what fails is the shape of what Phantom submits: Phantom prepends its own ComputeBudget priority-fee instructions to the page's transaction, so the landed transaction is not the instrument's transaction.** The memo instruction inside it is byte-exact. Detail below; the decision this forces (amend the instrument vs amend the standard) belongs to the captain and the founder, not to this seat.

### The rig on the VPS

- Host: `root@179.66.156.223` (srv2183584, Ubuntu 26.04, 1 CPU, 4 GB) via the new SSH key door. Work dir **`/root/anchor-gate/`** — `rig/` (drivers `gate4.mjs`/`gate5.mjs`/`gate6.mjs`/`gate7.mjs`, `helpers.mjs`, `probe-vps.mjs`, the unpacked verified extension `phantom-ext/`, the persisted profile `profile/` copied from this VM's rig, results + logs) and `serve/` (`anchor-devnet.html` + `MEMO_TEXT.txt`). Page served on the VPS's own `127.0.0.1:8741` (python http.server); served bytes re-verified sha256 `0a01d7e61a88bb61c7b01d245c810d0752b2d596612cf1f92aaa2148e49465cb` — identical to disk, page bytes never modified.
- Phantom CRX re-verified before use: sha256 `ead7273e79a57dc9e653e9a268c1b7ce2eb9efb3f3ad073909465c1125493a42`, manifest version **26.43.0** — the genuine article, same as Addenda 2–3.
- Chrome for Testing **157.0.8103.78** (the puppeteer-pinned build, identical to the VM rig) under Xvfb :99. (Setup note: the puppeteer installer failed repeatedly on this host; the browser was laid down manually from the official Chrome-for-Testing CDN zip into the puppeteer cache layout and verified running. The VM's local CONNECT relay and `--ignore-certificate-errors` were removed from the launch args — direct egress needs neither.)
- **Direct-egress proof, from inside Chrome** (`probe-vps.mjs`, service-worker context fetch): `api.phantom.app` **67 ms** · `data.phantom.app` **88 ms** · `time.phantom.app` **73 ms** — against ≥45 s stalls for the same hosts from Chrome on this VM (Addendum 2). The ingredient every failed road lacked is present here, and it is the difference.
- Production services untouched: Solnik :8730 and members :8731 were listening and answering HTTP 200 before the first run and after the last; all rig processes (Chrome, Xvfb, page server) were stopped at the end. Restart: `Xvfb :99` + page server in `serve/` + `DISPLAY=:99 node gate6.mjs` in `rig/`.
- Evidence copies (results, logs, screenshots) were pulled back into this VM's `anchor-work/gate-run/`: `gate5-result.json` · `gate6-result.json` · `gate7-result.json` · `probe-vps-result.json` · `gate5-run2.log` · `gate6-run3.log` · `gate7-run4.log` · `shot-X-approval-BEFORE.png` · `shot-X-dapp-final.png` · `shot-Y-approval-ADVANCED.png`. The decoder used below is `anchor-work/decode-gate-tx.mjs`.

### Attempts (4 of the 6-attempt cap used; 2 left unspent deliberately — see the end)

- **Attempt 1 (gate4 = the VM's gate3 driver, proxy args removed) — FAILED at connect, "no window" ×3.** Root cause found by the probe, and it is not egress: **the copied profile already carries Phantom's trust for origin `127.0.0.1:8741`**, granted through Phantom's real connect window in Addendum 2's one good VM run. On a trusted origin `connect()` resolves immediately with the public key and **no window is ever created** — the probe called `connect()` directly and it settled in <10 s with `BMhv2yHk8m33eudSs3n7DkMgLDtVmRgrXWEURQ4P7V6R`, zero new targets. The VM-era driver equates "no window" with failure and never checks the page, so it exhausted its connect phase in front of an already-connected wallet. (This also retro-explains nothing about Addenda 2–3: there the trust existed from the same single good run onward, but the windows were still needed — and failing — for the *sign* step, whose approval Phantom never pre-grants.)
- **Attempt 2 (gate5 = gate4 + a persisted-trust check: poll the page for the account string before waiting for a window) — CONNECTED, approval window reached, simulation resolved — then the driver crashed before Confirm.** Connect completed via the persisted trust (page showed the account). The approval window rendered and — first time on any route — **the simulation finished**: verbatim, "No balance changes found. Please proceed only if you trust this site. · Network · Solana · Network Fee · 0.00008 SOL". The crash was a bug in the crew's own driver, present since gate3 and never exercised because no VM run ever reached the confirm loop: `w.isClosed()` returns a boolean, not a promise, so `await w.isClosed().catch(...)` throws TypeError at the loop's first poll. Nothing was signed (chain-checked: newest signature remained the rehearsal `37NzKkN…`).
- **Attempt 3 (gate6 = gate5 + the isClosed fix) — THE PHANTOM PATH COMPLETED.** Home check first: "DEVNET GATE · You are currently in Testnet Mode" (Testnet Mode verified ON before any sign, as in every run). Connect via persisted trust. Sign click → real approval window (`chrome-extension://bfnaelmomeimhlpmgjnjophhpkkoljpa/notification.html`) → simulation arrived, Confirm DOM-enabled → **Confirm clicked once** → window closed → page captured the signature. Run time, launch to signature: **~54 seconds** (14:41:28–14:42:22 UTC).
- **Attempt 4 (gate7 = gate6 + a bounded Advanced-section exploration before any Confirm) — the one identified lever does not exist.** See below; the run Cancelled out of the approval window and signed nothing (chain-checked).

### The landed Phantom-path transaction — decoded independently

**Signature:** `1zSJeYFuAHLyuwNyEoGSArMzB3fX2bPD3kJ4HM2hEYruRPVG47zXGAice5NfZoWaofRPApMNiRTTxLzShDonxe8` · **slot 525823546** · Solscan: https://solscan.io/tx/1zSJeYFuAHLyuwNyEoGSArMzB3fX2bPD3kJ4HM2hEYruRPVG47zXGAice5NfZoWaofRPApMNiRTTxLzShDonxe8?cluster=devnet

Decoded from devnet RPC by `decode-gate-tx.mjs` (this seat, chain-only evidence):

- **Account keys (3):** payer `BMhv2yHk…` · `ComputeBudget111111111111111111111111111111` · `MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr`.
- **ix[0] — ComputeBudget `SetComputeUnitPrice`: 375,000 microLamports/CU** (data `03 d8b805…`).
- **ix[1] — ComputeBudget `SetComputeUnitLimit`: 200,000 CU** (data `02 400d0300`).
- **ix[2] — Memo: 133 bytes, byte-for-byte equal to `MEMO_TEXT.txt`** — "PROVADIA · DAYBOOK ROOT v1 · MAINNET · 79e375edd0f466d259366c002088eb666c8e1f55464e615882c202356ec6face · 7 ENTRIES · 2026-11-23" (the chain's own log line quotes it verbatim).
- **Fee: 80,000 lamports** = 5,000 base + 75,000 priority (375,000 µL × 200,000 CU ÷ 1,000,000). The **only** balance change is the payer's −80,000; no transfer, no approval, no other program.
- `meta.err = null`.

The two ComputeBudget instructions are **Phantom's own prepend** — the page's construction (proven byte-exact in §5–§6 through the identical module) contains neither; Phantom's approval screen disclosed the consequence in advance ("Network Fee 0.00008 SOL").

### verify-gate.mjs — the gate's own judge, unmodified

```
PASS — cluster is devnet
FAIL — instruction count == 1
FAIL — program == Memo
FAIL — instruction accounts == 0
FAIL — memo bytes byte-equal MEMO_TEXT.txt (compares the sole instruction; the memo at ix[2] is byte-exact per the decode above)
FAIL — fee == 5000 lamports (found 80000)
PASS — fee payer == throwaway devnet account BMhv2yHk…
PASS — meta.err == null
PASS — slot recorded: 525823546
→ GATE CHAIN-PROOF FAILED (exit 1)
```

The page agreed, in its own words, on its own screen: "Confirmed on-chain (devnet) but NOT verified — see the verification verdict below. The day is NOT anchored." + "MEMO VERIFICATION FAILED — expected exactly 1 instruction, found 3. Do NOT treat this day as anchored." The instrument's fail-closed design worked exactly as built — it refused to call an augmented transaction an anchor.

### Attempt 4's exploration — Phantom offers no lever to remove the prepend

The gate6 approval text contains an "Advanced" row. Gate7 opened it before any Confirm (and Cancelled without signing when no control appeared). What Advanced actually is in Phantom 26.43: **a read-only instruction inspector**. Verbatim from the expanded window (screenshot `shot-Y-approval-ADVANCED.png`):

```
Advanced
set_compute_unit_price · Program Compu...11111
set_compute_unit_limit · Program Compu...11111
createMemo · Program MemoS...mfcHr
memo · PROVADIA · DAYBOOK ROOT v1 · MAINNET · 79e375ed…ec6face · 7 ENTRIES · 2026-11-23 · Copy
```

No priority-fee control, no fee editor, nothing to set to none. The prepend is Phantom's fixed behavior for dapp-submitted transactions on this build; a user signing through this window cannot strip it. (Attempts 5–6 were not spent: a re-run of an identical flow against a deterministic wallet behavior has no expected value, and the brief's discipline is to document the stop point rather than loop.)

### §10 founder card — Phantom-screen facts, updated from this host (superseding Addendum 2's environment-bound findings)

- **Simulation summary: POPULATES on direct egress** — "No balance changes found. Please proceed only if you trust this site." Addendum 2's endless skeleton was the VM's egress, not Phantom. The founder's stop rule on unexpected movement is therefore usable as written: the section renders, and for this transaction it shows nothing moving.
- **A fee line DOES render — and it will not read 0.000005 SOL.** Phantom displays its own total: "Network Fee 0.00008 SOL", because Phantom itself adds the priority fee. The card's expectation ("estimated network fee of ~0.000005 SOL") and its stop rule ("fee far above 0.000005 SOL → stop") **cannot both survive contact with this Phantom build**: a founder following the card literally would stop a correct sign. The card must be rewritten before the mainnet step, in whichever direction the fork below is decided.
- **The memo IS inspectable in Phantom — under Advanced.** The main approval screen does not show it (Addendum 2 stands on that point), but Advanced → `createMemo` displays the full memo text with a Copy button. The card can offer this as the founder's in-Phantom cross-check.
- Signing account + origin shown: confirmed again ("DEVNET GATE · Confirm Transaction · 127.0.0.1:8741"). Warning text unchanged: "Balance changes are estimated. Amounts and assets involved are not guaranteed." + "Only confirm if you trust this website."

### The fork this leaves (captain/founder decision — not taken by this seat)

The Phantom path is proven workable end-to-end; the instrument's shape standard is what Phantom violates. Exactly two honest ways forward:

1. **Amend the instrument.** Change what the page submits so Phantom has nothing to prepend to or cannot prepend — e.g. the page pre-includes its own ComputeBudget instructions (then the construction, the rehearsal, and the verifier's shape all change together), or the page switches from `signAndSendTransaction` to `signTransaction` + self-broadcast **if** that path proves unaugmented on devnet. Either way: construction change → new devnet rehearsal → gate re-run. Unproven until run.
2. **Amend the standard.** Redefine a valid anchor as: memo instruction byte-exact (as the final instruction), preceded by at most the standard ComputeBudget pair, fee = 5,000 + the declared priority fee, payer = ANCHOR. The anchor's evidentiary content (root + timestamp + payer) is identical; what changes is the house's shape discipline, and §3/§7 + `verify-gate.mjs` + the page's verifier would all be rewritten to say so, in the open, before any mainnet sign.

Until one is chosen and executed: **§9 item 1 stays OPEN; the founder's mainnet sign must not proceed.** What this route settled permanently: the gate no longer waits on any environment. The VPS road is the road — one command re-runs the whole rig — and the remaining question is a house decision about Phantom's fee machinery, not a technical block.

*Route 4 executed 2026-11-24 14:22–14:50 UTC (08:22–08:50 CT) under the captain's VPS commission. Devnet only; Testnet Mode verified ON in the wallet before every sign; the throwaway gate account only; the founder's wallets never involved; no mainnet value moved anywhere (the landed fee is 80,000 devnet lamports, valueless). Page bytes unmodified — every change across gate4–gate7 was to the crew's driver scripts, never to what would be signed or how it is verified: `verify-gate.mjs` and the page's own verifier judged the result unmodified and both said no.*

## ADDENDUM 7 — 2026-11-24 ~14:52–15:10 UTC (08:52–09:10 CT): THE INSTRUMENT AMENDED (OPTION 1) AND RE-GATED — **NOT PASSED: PHANTOM AUGMENTS AT SIGN TIME IN BOTH PATHS; THE PAGE NOW REFUSES TO BROADCAST IT; THE ONLY PROVEN LEVER BELONGS TO THE STANDARD, SO THE FORK RETURNS TO THE CAPTAIN**

**Verdict: the gate does NOT pass.** The captain ruled Addendum 6's fork **Option 1 — amend the instrument, never the standard** — and the instrument was amended exactly as commissioned: the page no longer uses Phantom's combined sign-and-send call; Phantom **signs only** (`signTransaction`), the page **asserts the returned transaction is still exactly the instrument's transaction** (1 Memo instruction · 0 keys · the constant's bytes · this wallet as payer) and **broadcasts the raw bytes itself** (`connection.sendRawTransaction`). The amended page was re-rehearsed end-to-end (26/26) and re-gated on the VPS rig. The result falsifies the hypothesis the fix rested on: **Phantom 26.43 prepends its ComputeBudget pair during the SIGN step itself, in both provider paths** — `signTransaction` returned a 3-instruction transaction, the page's new assert caught it and **refused to broadcast**, and the chain sweep proves nothing landed. The standard was never violated on-chain by the amended page; it also cannot be satisfied through this Phantom build. The diagnostic the commission prescribed as step (B) was then run, and it proves the augmentation is **conditional**: a transaction that already carries its own ComputeBudget pair is signed exactly as submitted. That lever exists — but it is a construction change (a 3-instruction anchor), so it belongs to the standard, not the instrument. Per the commission ("if (A) failed and (B) is the only lever left, STOP and report the fork back"), **this seat stops here: no third path was improvised, the standard is untouched, §9 item 1 remains OPEN, and the founder's mainnet sign must not proceed.**

### The instrument change (Option 1, as commissioned)

- **Send path only; the construction module is untouched.** `anchor-tx.mjs` is byte-identical to before. In `anchor.html`'s sign handler, `provider.signAndSendTransaction(tx)` is replaced by: `provider.signTransaction(tx)` → a fail-closed pre-broadcast assert (instruction count == 1 · program == Memo · keys == 0 · data byte-equal to the `MEMO_TEXT` constant · feePayer == the connected wallet — any mismatch throws "refusing to broadcast … Nothing was sent.") → `signedTx.serialize()` → `connection.sendRawTransaction(rawTx, { skipPreflight: false })`. The stale "signAndSend" wording in the disconnect-handler comment was corrected. Everything else in the page — memo constant discipline, account-change lockout, confirmation polling, post-landing verification — is unchanged.
- **New rehearsal mirror check** (the drift guard): rehearse.mjs now refuses to send unless the page carries `provider.signTransaction(tx)` + the pre-broadcast assert + `connection.sendRawTransaction` and never calls `provider.signAndSendTransaction(`. If the page ever regresses to the augmenting path, the rehearsal fails before anything is sent.
- **New page bytes:** `anchor.html` sha256 `3488c36cf81f0656b686546e8c8a8654b74795552366772f35ee14e8e294db97` (was `d26ab7b7…`) · `anchor-devnet.html` regenerated as the CLUSTER-only diff of the new page (diff verified: line 62 only), sha256 `05ccc1741f41570e9011d0e6fb568b264c3382b07f3996dce25c990e27757b48` (was `0a01d7e6…`). Pre-change copies kept at `gate-run/anchor.html.pre-addendum7`, `gate-run/anchor-devnet.html.pre-addendum7`, `gate-run/rehearse.mjs.pre-addendum7`.
- **Rehearsal on the changed bytes — 26/26 PASS** (12 mirror incl. the new send-path check + the SRI recomputation · 6 pre-send · 8 landed): programmatic devnet signature `5k8f6i4tKPBuEYSDDmDxhxLVokKoJ9yDhnQctKFsmqyADT4murYobQUktQN4QRC8qibh2JqvrLQSCoPn2rLtoXuE`, fee exactly 5,000, memo byte-exact; `evidence/rehearsal-tx.json` now holds this run (the §5 signature `37NzKkN…` remains the rehearsal of record for the pre-amendment bytes).
- **Rig identity, re-verified for this gate:** the VPS's unpacked Phantom tree hashes (recursive sha256 manifest) to `b7b1923d5d435d37ee0196ff50739854a4b1c933ab72985b488fe61c3c2358a4` — byte-identical to this VM's tree unpacked from the CRX of sha256 `ead7273e79a57dc9e653e9a268c1b7ce2eb9efb3f3ad073909465c1125493a42`; manifest version **26.43.0**. Testnet Mode verified ON (popup banner "You are currently in Testnet Mode", active account DEVNET GATE) in every run below. Solnik :8730 and members :8731 answered HTTP 200 before the first run and after the last; all rig processes (Chrome, Xvfb, page server) were stopped at the end.

### Gate attempt 1 (driver gate8) — INVALID TEST: the rig executed a cached copy of the OLD page

The first re-run reproduced Addendum 6 **byte-for-byte**: approval window "Network Fee 0.00008 SOL", Confirm clicked, landed signature `5rYk5uFuuEpVcirrb4GduKhifkXoNP8hBUpqv2W2cPYz7LYM9C6fDDcy7rmNbD8j3AXmuR1yhsyBHZy49yQEKGT9` (slot 525826369) decoding to the same [SetComputeUnitPrice 375,000 · SetComputeUnitLimit 200,000 · Memo byte-exact], fee 80,000; `verify-gate.mjs` 4 PASS / 5 FAIL, same clauses as Addendum 6. **This was not a test of the amended page.** Evidence: (1) the amended page makes that landing impossible — its assert runs on the returned transaction before broadcast and throws on a 3-instruction return, and its broadcast path (`sendRawTransaction` of the asserted bytes) cannot acquire instructions; a landed augmented transaction therefore cannot have come from the amended page's code. (2) The served bytes were verified new (curl sha256 `05ccc174…` before the run), but Chrome in the **persisted profile** held the old page in its HTTP cache: the profile's `Cache_Data` contains the old page's `signAndSendTransaction` code and does **not** contain the new page's assert text; python's http.server sends no Cache-Control, so heuristic freshness (10% of the cached response's age) covered the re-run ~11 minutes after Addendum 6's fetch. The run is recorded as a third data point for the old sign-and-send path's augmentation — and as nothing else. It does not count for or against fix (A).

### Gate attempt 2 (driver gate9) — fix (A) tested, identity-proven: Phantom augments at sign time; the page refused; nothing landed

The driver was hardened before this run (cache-busting page URL `?v=addendum7`, plus a **page-identity assert**: before any sign, the driver reads the executed page's inline script and requires the amended page's markers — result `pageIdentity: "addendum7-sign-only"`; a stale or unknown page aborts the run unsigned, exit 8). With the amended page provably executing:

- Connect completed via persisted trust; the home check showed Testnet Mode ON.
- The approval window rendered and the simulation populated ("No balance changes found. Please proceed only if you trust this site.") — and, notable for the card, **the fee line read "Network Fee 0.00008 SOL" even for the sign-only request**: Phantom prices its augmentation into the display before signing, in both paths.
- Confirm clicked once; the window closed; Phantom returned the signed transaction — and the page stopped with its own words, captured verbatim from the page: **"Error: Wallet returned a transaction with 3 instructions (expected exactly 1) — refusing to broadcast an augmented transaction. Nothing was sent."**
- A second sign attempt was under way (Confirm clicked, verdict pending) when this seat stopped the driver, the behavior being deterministic; **the independent chain proof does not depend on the driver**: `getSignaturesForAddress` for the gate account, run from this VM after the run, shows the newest signature still `5rYk5uFuuEpV…` (the invalid gate8 landing) — **no gate9 attempt landed anything**, and the account balance was unchanged by gate9. The amended page's fail-closed design did on the sign path what its post-landing verifier did on the send path in Addendum 6: it refused to let an augmented transaction wear the instrument's name — this time before broadcast, so no fee was paid and nothing reached the chain.

**Conclusion on (A):** the hypothesis "Phantom augments only when IT sends" is **falsified** for Phantom 26.43. The augmentation happens when Phantom **signs**, in both provider methods. No page-side send-path change can obtain a clean signed transaction from this build.

### Diagnostic (B) (driver gate10) — the augmentation is conditional; the lever is real and belongs to the standard

Run exactly as commissioned — diagnostic only, on a throwaway copy (`anchor-diag-b.html`, sha256 `f2dcd5013dabde8362ae3e1725d287c6ac678cddeace4878835fedcac93392ef`, kept at `gate-run/anchor-diag-b.html`; the canonical pages were never given this construction): the diagnostic page pre-includes its own ComputeBudget pair — **SetComputeUnitPrice 0 µL/CU · SetComputeUnitLimit 210,000** (deliberately distinct from Phantom's 375,000 / 200,000) — ahead of the memo, replaces the assert with a report of the returned transaction, and broadcasts whatever Phantom returns. Page identity proven by the driver (`pageIdentity: "diag-b"`).

- **What Phantom returned, in the page's own report:** "DIAG-B returned tx: 3 instructions: ComputeBudget111 SetComputeUnitPrice=0 · ComputeBudget111 SetComputeUnitLimit=210000 · MemoSq4gqABAXKb9 memoBytes=133" — **our transaction, exactly as constructed: no prepend, no replacement, no modification.**
- **Approval window fee line this time: "Network Fee < 0.00001 SOL"** — Phantom's display follows the transaction's own ComputeBudget content; with a pair present it invents nothing.
- **Landed, decoded independently** — signature `bvYDksETCRNsuvBxjYGL6URabAY4nFNWSEfgv92crzU5k3mNyoZyY9zxUTxriTpGE4B3n9nNeDuLbsU59Uh6Uqq`, slot 525829447, Solscan: https://solscan.io/tx/bvYDksETCRNsuvBxjYGL6URabAY4nFNWSEfgv92crzU5k3mNyoZyY9zxUTxriTpGE4B3n9nNeDuLbsU59Uh6Uqq?cluster=devnet — ix[0] SetComputeUnitPrice **0** (data `030000000000000000`) · ix[1] SetComputeUnitLimit **210,000** (data `0250340300`) · ix[2] Memo **133 bytes, byte-for-byte equal to `MEMO_TEXT.txt`** · **fee exactly 5,000 lamports** · the only balance change is the payer's −5,000 · `meta.err = null`.
- **`verify-gate.mjs` against the diagnostic landing (unmodified judge): 5 PASS / 4 FAIL.** The passes: cluster · **fee == 5000** · payer == the throwaway account · `meta.err == null` · slot. The failures are exactly and only the shape clauses: instruction count == 1, and the three checks that compare instruction[0] (program / accounts / memo bytes — the memo-bytes failure is the verifier reading ix[0]'s ComputeBudget data; the decode above proves the memo byte-exact at ix[2]). A (B)-shaped anchor satisfies every economic and evidentiary clause of the standard and violates only its instruction-count shape.

**What (B) proves:** Phantom 26.43's prepend is a **default it applies only when the transaction carries no ComputeBudget instructions** — its priority-fee machinery fills a vacuum; it does not override a transaction that already speaks for itself. The mechanism is therefore fully understood, and there is exactly one proven way to make Phantom submit the page's transaction unchanged: **the construction itself must carry a ComputeBudget pair** (price 0 keeps the fee at exactly 5,000). That is a change to what an anchor transaction **is** — 3 instructions, not 1 — which is Addendum 6's Option 2 (amend the standard), expressly outside this commission. It is reported here as proven fact for the captain's and founder's decision, and it was **not** adopted: the canonical `anchor.html` / `anchor-devnet.html` remain the rehearsed (A) bytes above, and `anchor-tx.mjs`, `MEMO_TEXT.txt` and `verify-gate.mjs` are untouched.

### State after this addendum

- **Gate: NOT PASSED.** No Phantom-path signature scores the standard's full PASS set; `verify-gate.mjs` was never modified and no substitute sign was used. **§9 item 1 remains OPEN; the founder's mainnet sign must not proceed.** The temporary `/gate-devnet/` page is untouched (its removal is the captain's step after a PASS; there is no PASS).
- **The instrument's standing state** is the amended, fail-closed page: with Phantom 26.43 it cannot complete a sign (it refuses Phantom's augmented return before broadcast — nothing sent, no fee paid), and with any wallet that signs as-submitted it anchors exactly to the standard. The fork is no longer technical in any respect: it is the house's decision between (i) amending the standard to admit a construction-carried ComputeBudget pair at price 0 (proven here to land fee-exact, memo-exact, payer-exact — at the cost of the 1-instruction shape), (ii) a different signing path/wallet that signs as-submitted, or (iii) holding the standard and the gate closed.
- **§10 founder card — amended in place from this run's evidence** (the card now states): the simulation section populates and reads "No balance changes found…" · Phantom's fee line for this transaction reads **0.00008 SOL** because of Phantom's own augmentation (the instrument's fee remains 0.000005 SOL; the STOP rule now names both known values and stops on any third) · the memo is inspectable in Phantom under **Advanced → createMemo** · and after Confirm the page may show its refusal ("refusing to broadcast an augmented transaction. Nothing was sent.") — the instrument protecting the standard; nothing sent, no fee paid, not a malfunction, do not retry around it.
- **Evidence pulled back** to `anchor-work/gate-run/`: `gate8-result.json` · `gate8-run5.log` · `gate9-result.json` · `gate9-run6.log` · `gate10-result.json` · `gate10-run7.log` · `gate8.mjs` · `gate9.mjs` · `gate10.mjs` · `anchor-diag-b.html` · screenshots `shot-Z-*` (gate8) · `shot-Q-*` (gate9) · `shot-R-*` (gate10). The VPS rig (`/root/anchor-gate/`) is stopped; restart = page server in `serve/` + `Xvfb :99` + `DISPLAY=:99 node gate9.mjs` (identity-checked amended page) in `rig/`.

*Addendum 7 executed 2026-11-24 14:52–15:10 UTC under the captain's Option-1 commission. Devnet only; Testnet Mode verified ON before every sign; the throwaway gate account only; the founder's wallets never involved; nothing deployed to the live site; no mainnet value moved (landed fees on devnet: 80,000 in the invalid cached-page run, 5,000 in the diagnostic — both valueless). The standard was not amended and `verify-gate.mjs` judged every landing unmodified.*
