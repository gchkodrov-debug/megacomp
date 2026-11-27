# ARMY BRIDGE — BUILD REPORT
**Seat:** Relay Law builder seat · **Date:** 2026-11-27 · **Order:** the founder's "PROVADIA — Connect the Entire AI Army" (founder + ChatGPT Guardian, relayed by the captain)
**Fixed point under build:** `comms-engine/engine.py` + `test_engine.py` (11/11 PASS at handover) · `OPERATING.md` · roster of record `army-tags-snapshot-2026-11-27.json` (25 models)
**Fences honored:** sandbox only — no live sends, no live Ollama chat calls, no desk-filing, no spending, no credentials handled; the live `data/` directory was checksum-verified untouched before and after the build (md5 match on all four files).

---

## 1. What was built

### 1.1 The army route in `engine.py`
- **Recipient form:** `army:<model-name>` (e.g. `army:kimi-k3`). `_routes_for()` resolves it to the single route `army`; partner recipients resolve exactly as before.
- **Transport:** `default_army_transport()` — a subprocess call to the registered helper's non-interactive chat (`python3 ~/workspace/custom-connectors/custom.ollama/bin/ollama.py chat <model> <system_file> <user_file>`). The helper takes files, so the engine writes the system prompt (`ARMY_SYSTEM_PROMPT`) and the assignment prompt to a temp directory that dies with the call. The credential stays inside the registered connection; the helper carries only its surrogate. Injectable via the `army_transport` constructor parameter, like the Gemini API transport.
- **Idempotency, end-to-end:** the assignment prompt header carries `[PCN message <id> · Idempotency-Key: <id> · from … · priority … · class …]`, the subject and body, and the assignment-discipline line: *if you have already executed this Idempotency-Key, do NOT execute it twice — reply that it is a duplicate and cite the key; otherwise do the work and return the finished result as your reply, citing the message id.*
- **Synchronous answer:** the model's reply returns with the dispatch; on success the message walks QUEUED → SENDING → SENT-UNCONFIRMED → **ANSWERED** in one dispatch, the reply stored as an inbound record (`route: army`, `authority: none` — work product for the captain, never a command). An **empty reply is a DELIVERY-ERROR hold**, not an answer (this matters: the connector record notes clef:27b returns empty replies on chat).
- **Roster fence (fail-closed):** before `SENDING` is persisted, the model name is checked against the tags snapshot (`PCN_ARMY_SNAPSHOT`). Unknown name → **FAILED-HELD / UNKNOWN-MODEL**, zero transport calls, never a silent substitution. A name containing `tts` / `speech` / `voice` → **FAILED-HELD / FENCE** before the roster check (the Solnik fence binds the army route). An unreadable snapshot yields an empty roster — every army send holds rather than guesses.
- **Army quota — its own counter:** min **5 s** spacing, max **200 calls/day** (`PCN_ARMY_MIN_INTERVAL_SEC` / `PCN_ARMY_DAILY_MAX`), persisted as `army_call` log events + in `state.json`, reported by `health` as `army quota`. Fully separate from the Gemini API counter (proven in test n: API counter stays 0). Quota blocks → WAITING-ROUTE with the standard backoff. **The Solnik voice lock does NOT block the army route** (different provider, no shared budget); `army_usage()` records `voice_lock_blocks_army: false` so the distinction is on record.
- **No failover, either direction:** partner routes never spill to the army; an army failure never falls back to a Gemini route (test p, both directions).
- **Reconciliation:** `reconcile()` has an explicit `army` branch returning `unknown` — a chat call leaves no queryable trace, so a crash mid-delivery is **FAILED-HELD / UNRESOLVABLE-AMBIGUOUS, never blind-resent** (test o). All pre-existing machinery (dedupe, backoff, thread cap, per-pair hourly cap, auto-reply fence, duplicate-order detection) applies to army traffic unchanged — during testing, the duplicate-order gate correctly caught an early draft of test m itself before the fence case could run; the test data was fixed, the gate was not touched.

### 1.2 The Command Center — `army_register.py` + `army/`
- `army/assignments.json` — the hand-maintained recorded seats: **kimi-k3** = Chief Critic (verification teams) · **deepseek-v4-pro:0813** = Code & Reasoning seat · **deepseek-v4.1-flash:1017** = Bulk Copy/QA seat · **kimi-k2.7-code** = Code seat · **glm-5.3** = Reasoning seat. Every other model: `UNASSIGNED — idle capacity`.
- `army_register.py` generates **`army/ARMY_REGISTER.md`** + **`army/army.json`** from the snapshot + assignments. Each model row: name · capabilities (from the snapshot) · specialization (recorded, or `general — unverified specialization`) · assignment · status **LISTED-REACHABLE (tags snapshot 2026-11-27)** · **PROVEN** flag only for deepseek-v4.1-flash:1017 and kimi-k3 (live chats on the house record); all others **NOT-YET-PROVEN** · cost line on every row: *Ollama Cloud subscription — included; exact rate limits UNKNOWN (not published to us)*.
- **Departments section:** the founder's ten mobilization areas, each mapped to PROPOSED seats drawn **only** from the 25 verified models, each marked `PROPOSED — captain allocates`. The generator hard-fails if a department ever names a model outside the roster. Machine-checked after generation: 25 unique models, all 25 appear in at least one department proposal, PROVEN set exactly the two recorded models. Notes carried in the register: the Magical Solnik fence (no army model touches the voice) and the clef:27b flag (decision+vision only, no completion capability, parked for chat — decision-check experiments only).
- Register totals: **25 models · 2 PROVEN · 5 seated · 20 idle**.

### 1.3 `OPERATING.md`
New section **"The Army route — the Ollama bench"** (route form, transport, idempotency, roster fence, quota, no-failover wall, reconciliation, register regeneration command, the captain-allocation rule, Guardian visibility via the Partner Desk), plus: army row in the route map, army health evidence, an army `send` example, an army row in the reconciliation table, three new env knobs, and an honest-limits entry stating the route is live-unproven. Header updated: 16/16 PASS, army route not yet live-exercised.

---

## 2. Test results — full suite 16/16 PASS

Run: `python3 test_engine.py` in `comms-engine/` — twice, deterministic, exit 0. All transports faked; temp homes only; zero network.

| # | Test | Result |
|---|---|---|
| a | send→ack→answer lifecycle (desk route) | PASS (unchanged) |
| b | dedupe | PASS (unchanged) |
| c | failover — ping reroutes to API, commission WAITS | PASS (unchanged) |
| d | restart recovery — reconciled, not resent | PASS (unchanged) |
| e | Gemini API quota guard (60 s / 20 per day) | PASS (unchanged) |
| f | Solnik fence — TTS model refused | PASS (unchanged) |
| g | reconciliation — 4 crash scenarios | PASS (unchanged) |
| h | exponential backoff | PASS (unchanged) |
| i | loop + abuse caps | PASS (unchanged) |
| j | duplicate-order hold | PASS (unchanged) |
| k | Solnik voice-priority lock | PASS (unchanged) |
| l | **army assignment lifecycle** — send→ANSWERED in one dispatch; prompt carries the PCN idempotency key + do-not-execute-twice; answer recorded from `army:kimi-k3` with `authority: none` | PASS |
| m | **unknown model held** — `army:no-such-model-9000` → FAILED-HELD / UNKNOWN-MODEL, zero transport calls; `army:acme-tts-9000` → FAILED-HELD / FENCE, zero calls | PASS |
| n | **army quota** — 5 s spacing blocks pre-transport; own daily cap (test max 3) blocks the 4th; Gemini API counter stays 0; count persists across restart | PASS |
| o | **crash after army call** — SENDING visible after reload → FAILED-HELD / UNRESOLVABLE-AMBIGUOUS; transport calls stay at 1 (never resent) | PASS |
| p | **no cross-failover** — Gemini commission with both Gemini routes down WAITS (army untouched); ChatGPT rides desk only; army transport failure HOLDs with the Gemini queue provably untouched | PASS |

Also verified outside the suite: `army_register.py` output machine-checked (above); an in-process health smoke (mocked proof read) shows all five routes with `army UP — 25 models in the verified tags snapshot`; the real `data/` directory is byte-identical to its pre-build checksums.

---

## 3. What remains unproven without live runs — stated plainly

1. **No live Ollama chat has ever been run through the engine.** The transport mirrors the connector helper's documented interface exactly, but the subprocess path (temp files, helper exit codes, reply extraction) is exercised only against fakes. LISTED-REACHABLE rests on the 2026-11-27 tags snapshot.
2. **The account credit gate is unresolved.** The connector record (verified 2026-11-15) says generation returns **HTTP 402 until the account holds usage credits or a plan**, and the account was connected with zero credits. Whether credits/a plan have since been added is NOT known to this seat. The first live call may therefore fail with 402 — that outcome is a billing state, not a code defect, and topping up is the founder's step. Step 0 of the protocol below settles it with read-only calls.
3. **23 of 25 models are NOT-YET-PROVEN for live chat** (only deepseek-v4.1-flash:1017 and kimi-k3 have live chats on record, from prior house work — not through this engine). clef:27b is expected to return empty replies on chat per the connector record; the engine will hold such a delivery as DELIVERY-ERROR, by design.
4. **Exact Ollama rate limits are UNKNOWN** (not published to us). The engine's 5 s / 200-per-day guard is a conservative house cap, not a measured provider limit; a provider-side 429 mid-assignment surfaces as a DELIVERY-ERROR hold for the captain, not a retry storm.
5. **Nothing is wired live:** no watch calls the engine, the Guardian has not yet submitted a real assignment through it, and the register has not been desk-filed (the captain does that after his own verification). The 24-hour reliability window from the original network order has not started.
6. **Residual risk (not hidden):** the same microsecond crash window the hardened engine already discloses applies to the army route — a crash between the provider executing a chat and the engine persisting `SENDING` defeats any file-based reconciliation. The army route narrows it the same way (SENDING persisted before the call) and holds every unresolvable outcome; it does not claim the window is zero.

---

## 4. The ONE live test protocol — the Guardian's controlled assignment test (captain-run)

Run once, by the captain only, at a quiet moment. This is the founder's order §5 proof: *Guardian submits → captain routes → an Ollama model executes → the result returns to the Guardian for examination*, with unique assignment IDs and persistent records throughout.

**Step 0 — settle the credit gate with reads only (no generation):**
```bash
python3 ~/workspace/custom-connectors/custom.ollama/bin/ollama.py usage
python3 ~/workspace/custom-connectors/custom.ollama/bin/ollama.py tags
```
- If `tags` differs from `army-tags-snapshot-2026-11-27.json`, save the fresh tags output as the new snapshot, point `PCN_ARMY_SNAPSHOT` at it (and update the register's source), and regenerate the register (`python3 army_register.py`) BEFORE any send.
- `usage` shows the account's credit/plan state. If it shows no credits and no plan, STOP: the first chat will 402. Report to the founder — topping up is his step; do not proceed on hope.

**Step 1 — the Guardian submits the assignment.** The Guardian files a desk message (Partner Desk `partner-desk/COMMS/`, or via his Drive Outbox road) addressed to a PROVEN seat, with a unique assignment ID in the subject. Suggested test assignment, deliberately small and checkable:
- To: `army:deepseek-v4.1-flash:1017`
- Subject: `ARM-TEST-001 — Guardian controlled assignment test`
- Body: a short text the Guardian supplies (e.g. one paragraph from any house document) + the instruction: *"Summarize this paragraph in exactly two sentences, then state the assignment ID ARM-TEST-001."* (The ID in the output proves the right assignment was executed; the two-sentence constraint makes the result examinable at a glance.)

**Step 2 — the captain routes it through the engine (the ONE authorized live army send):**
```bash
cd ~/workspace/newwave/next-build/comms-engine
python3 engine.py send --from chatgpt --to army:deepseek-v4.1-flash:1017 \
  --class commission \
  --subject "ARM-TEST-001 — Guardian controlled assignment test" \
  --body-file <the Guardian's assignment text> \
  --dedupe-key arm-test-001
```
`--from chatgpt` records the Guardian as the requesting partner; the captain's hand on the command IS the allocation step. The dedupe key makes any accidental re-run return the original PCN id instead of executing twice.

**Step 3 — verify the record (all must hold):**
```bash
python3 engine.py status <PCN-id>     # route=army, status=ANSWERED,
                                      # route_detail.model=deepseek-v4.1-flash:1017,
                                      # route_detail.reply present, answer_id set
python3 engine.py health              # army quota calls_today incremented by exactly 1;
                                      # api quota calls_today unchanged (0 new)
```
- The answer record (`answer_id`) holds the model's reply verbatim, sender `army:deepseek-v4.1-flash:1017`, `authority: none`.
- The reply must quote `ARM-TEST-001` and be two sentences. Anything else = the test FAILS on content; file it as-is, do not quietly re-run.

**Step 4 — negative checks in the same session (no live calls are made by either):**
```bash
python3 engine.py send --from captain --to army:no-such-model-9000 \
  --class commission --subject "ARM-TEST-002 — negative check" --body "n/a" \
  --dedupe-key arm-test-002
# Expect: FAILED-HELD / UNKNOWN-MODEL, and army quota calls_today UNCHANGED.
```

**Step 5 — return the result to the Guardian for examination.** The captain desk-files: this build report, the regenerated register (`army/ARMY_REGISTER.md` + `army/army.json`), the ARM-TEST-001 `status` JSON verbatim, and the model's reply verbatim. The Guardian grades the reply against his submitted text and confirms receipt. Only on his confirmation is the connection **proven**; the captain then updates the model's PROVEN flag in `army_register.py` (its live chat is now on record through the engine) and regenerates the register.

**Failure handling:** a 402 from the helper surfaces as FAILED-HELD / DELIVERY-ERROR with the helper's output in the record — report it as the credit gate (Step 0's warning), never retry in a loop, never top up (founder's step). Any duplicate execution, missing record, or quota-counter mismatch = FAIL: stop, preserve the log, report before any further live army sends.

**After a PASS:** the captain may begin allocating real assignments from the register's PROPOSED department map, one department at a time, and the Guardian's standing assignment road (desk message → captain `send --from chatgpt`) becomes the normal path. The 24-hour reliability window from the original network order remains a separate, later gate.
