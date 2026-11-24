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

**What Phantom will show you (no surprises):** the site asking to sign · the **ANCHOR** account as the signer · an estimated **network fee of ~0.000005 SOL** · a simulation summary with **nothing in it** — no SOL or tokens leaving, nothing arriving, no approvals granted — because the transaction does exactly one thing: it writes the memo. **Phantom does not display the memo text itself** — the page is where you read it, in full, before you sign; afterwards anyone can read it forever via the Solscan link. Phantom may take a few seconds to simulate, and may occasionally say it could not simulate — that alone is not a stop; the checks below are.

**STOP and do not sign if any of these is true:**
- Phantom shows **any** token or SOL amount moving, or **any** approval/permission — this transaction must move nothing but the fee.
- The signing account is **not** the ANCHOR account.
- The memo on the page does not match the root on the Record page — check `provadiacoin.com/record/` on a fresh fetch (second device is best): root `79e375ed…ec6face`, 7 entries, date 2026-11-23. A wrong memo is permanent and Phantom will *not* catch it — this check is yours.
- The fee shown is anything far above 0.000005 SOL.

**Before you sign:** glance at the ANCHOR account's recent activity — if today's anchor already landed (first one wins), don't sign a duplicate. **If a signing attempt seems to hang:** don't sign again — wait ~2 minutes and check the account on Solscan first; a retry after a mere timeout is how duplicates happen. **Cost:** 5,000 lamports = 0.000005 SOL ≈ **$0.0004** (at ~$72/SOL) — your 0.0691 SOL float covers ≈13,800 nightly anchors.

---

*Prepared 2026-11-24 under the captain's commission (00:34 CT). Founder's funding step completed the same night (ANCHOR account, 0.0691 SOL, from his Phantom screenshots). Instrument NOT deployed; no mainnet transaction attempted; the only mainnet-value statement in this record is the fee estimate, marked as such. Files: `~/workspace/newwave/next-build/anchor-work/` · this record: `~/workspace/newwave/next-build/BUILD_RECORD_NIGHT_BRICK_ANCHOR_PREP_2026-11-24.md`.*
