# PROVADIA PRODUCTION ORCHESTRATOR v1 — CHIEF CRITIC EXAMINATION

**Commission:** founder directive 2026-11-28 00:41 CT, 10 requirements.
**Object examined:** orchestrator.py (sole source provided). External components referenced in the docstring (desk / engine / bridge watches, captain-side enqueuing, the six production line definitions, the Ollama bench contents) are **not in brief** and are graded only as they appear in this source.

---

## REQUIREMENT-BY-REQUIREMENT GRADES

### 1. 60-second checks for completions, free agents, blocked jobs, pending work — **MET (with operational caveats)**
Mechanism: `main()` → `daemon` mode loops `tick()` with `time.sleep(60)`, and `tick()` runs `reap(q)` (completed/failed processes), `prepare_packets(q)` (queued packet work), `dispatch_idle(q)` (computes `busy_seats` from `running_jobs`), then `render_register(q)` (status counts + FLAGS, i.e. blocked/parked visibility). All four check classes are mechanically touched each cycle. Caveats: the period is 60s **plus tick duration** (sleep follows work, so cadence drifts); a poisoned `queue.json` raises inside `load_queue()` on every tick, leaving the daemon alive but checking nothing (defect M4); `KILL` halts checks by design and logs once. The mechanism is real; grade MET, caveats filed as defects.

### 2. Immediate assignment to available agents within authorized capacity — **MET**
Mechanism: `dispatch_idle()` scans the queue each tick, dispatches any `kind == "army"`, `status == "queued"` job whose seat is not in `busy_seats`, and stops at `MAX_PARALLEL`. Examinations enqueued by `reap()` in the same tick are picked up in the same tick, so freed capacity is refilled within one cycle — "immediate" under the directive's own 60s cadence. Per-seat exclusivity (`busy_seats.add`) is enforced. Caveats (filed below): the crash window between `dispatch()` and `save_queue()` can double-assign (C2), and "availability" is inferred only from this process's own running set — no seat-health registry exists.

### 3. Automatic delivery of completed work to the appropriate partner for examination, testing, integration — **PARTIALLY MET**
What exists: `reap()` marks finished jobs `delivered` and calls `route_examination()`, which writes a fresh brief and enqueues an examination job on a different-family seat (`family_of(examiner) != fam`), then moves the parent to `in_examination`; on exam delivery the parent becomes `examined`. Delivery-to-examiner is genuinely automatic and Relay-Law-compliant.
What is absent: (a) **no testing mechanism at all** — nothing executes, builds, or validates deliverables; (b) **no integration mechanism** — no merge, handoff, or downstream routing; (c) the examiner's `VERDICT:` line is **never parsed** — `parent["verdict"]` is set to a pointer string (`"examination delivered: {id} -> {path}"`), so the examination has zero operational effect and every work item dead-ends at `examined` pending a human reader; (d) delivery to actual partners (ChatGPT/Gemini) is only `prepare_packets()` writing a file to `PACKETS_DIR` — nothing sends it.

### 4. Connects ChatGPT, Gemini and Muse through supported channels — **NOT MET**
The only execution/communication channel implemented is `subprocess.Popen(["python3", str(OLLAMA), "chat", ...])` against a local bench script. ChatGPT and Gemini appear only as the `seat` string on `kind == "packet"` jobs, for which `prepare_packets()` writes an .md file into `PACKETS_DIR` and sets `awaiting_partner` — a status nothing in this source ever reads, transmits, times out, or transitions (see H3). Partner return via "desk / engine / bridge" is asserted in the docstring but **not in this source and not in brief**. **Muse does not appear anywhere in the code except as `muse-spark` in `FAMILY` (a bench seat name), and no Muse channel exists.** No supported channel to any external partner is present.

### 5. All six production lines operating in parallel — **NOT MET**
Structural contradiction: `MAX_PARALLEL = 4` — six lines can never be simultaneously active. Nothing in the scheduler is line-aware: `dispatch_idle()` is global FIFO with seat exclusion; a queued batch on lines 1–3 can starve lines 4–6 indefinitely. `route_examination()` hardcodes `line=5` for every examination regardless of parent line. `line` is an inert integer carried on job records; no mechanism senses an idle line, sources work for it, or keeps it "operating." The requirement is unmet by construction, not merely by tuning.

### 6. Automatic advancement to the next assignment after successful completion — **PARTIALLY MET**
Present: continuous drain — `reap()` frees seats, `dispatch_idle()` assigns the next queued job on every tick; failed jobs requeue automatically for one retry. Absent: "successful completion" is never computed. The verdict text is never read, `examined` is terminal, and no successor assignment is enqueued on success, no rework on `VERDICT: FAIL`. There is no assignment graph or dependency concept — advancement is "whatever is queued next, regardless of whether the prior item passed." The loop advances; it does not advance **on success**.

### 7. Live register: who, what, when started, what delivered — **MET**
Mechanism: `render_register()` rewrites `register.json` (full job records: seat, title, status, `started_at`, `finished_at`, `output` path, `verdict` pointer, pid) and `REGISTER.md` (table: Job/Line/Seat/Status/Title/Started/Delivered) plus `heartbeat.json` every tick. This is a real, complete, live register. Defects filed, not grade-breaking: the REGISTER.md "Delivered" column prints `finished_at`, which `reap()` sets even for **parked/failed** jobs — failed work displays a delivery timestamp (M1); times are sliced `[11:19]` (HH:MM:SS, no date); if a tick dies, the register and heartbeat go stale together (detectable via `alive_at`, but nothing internal alarms).

### 8. Recovers failed routes without duplicate execution, uncontrolled retries, unauthorized spending — **PARTIALLY MET**
Genuinely implemented: bounded retries (`MAX_ATTEMPTS = 2` then `parked`), credit/resource park-not-retry with FOUNDER-ACTION flag, no spend beyond the local bench by construction (no network, no browser, no credentials — enforced by there being no such code paths), kill switch.
Failed: **duplicate execution is not excluded** — no single-instance lock (C1), a non-atomic dispatch→save window (C2), non-idempotent re-routing (C3), pid-reuse blindness (C4). Retry bounding is itself defeated by the same window: `attempts` increments live only in memory, so each crash resets the on-disk count and a flapping job can exceed 2 attempts — i.e., **uncontrolled retries through the back door**. "Route recovery" is one blind retry on the same seat; there is no failover seat or route-health tracking.

### 9. Founder intervention only for genuine authorization/security/sign-in/resource problems — **PARTIALLY MET**
Present: autonomous routine operation; explicit FOUNDER-ACTION flag only on the credit/resource path; register FLAGS section. Violations: the detector is `"402" in err_text or "credit" in err_text.lower()` — substring匹配 over all of stderr, matching "1402", "4024", hashes, "credited", "accreditation" — so **healthy jobs can be PARKED with a false resource alarm** (and their valid output discarded, since the check runs before output validation), i.e., non-genuine founder demands. Separately, the silent-stall paths (examiner parked → parent stuck `in_examination` forever, H2; `awaiting_partner` limbo, H3; poison-tick no-op daemon, M4) all eventually require founder/captain intervention for operational reasons the directive says should never escalate. No alert channel exists beyond files the founder must happen to open.

### 10. Never confuses queued items, papers, or reports with completed software — **PARTIALLY MET**
Engineered protection: a strict status taxonomy (`queued/running/delivered/in_examination/examined/parked/awaiting_partner`); `kind == "packet"` jobs can never reach `delivered` because `reap()` only touches `running` jobs; nothing is ever labeled "completed software"; the docstring rule is honored in code paths.
Residual confusion vectors: (a) `delivered` means only "pid died, stdout non-empty, stderr doesn't *start with* 'Traceback'" — **exit status is never checked** (C5), so a crashed seat's partial chatter is logged and registered as DELIVERED; (b) REGISTER.md prints a Delivered timestamp for parked failures (M1); (c) since verdicts are never parsed, FAILed and PASSed work render identically as `examined` — the register cannot distinguish them; (d) there is no deliverable-type field, so a research paper produced by an army seat flows through `delivered`/`examined` indistinguishably from software.

**Tally: MET ×3 (1, 2, 7) · PARTIALLY MET ×5 (3, 6, 8, 9, 10) · NOT MET ×2 (4, 5).**

---

## DEFECTS BY SEVERITY

### CRITICAL

**C1 — No single-instance lock on the daemon.** `main() → daemon` acquires nothing (no flock, no pidfile). Two daemons (restart overlap, cron + manual launch, reboot with a lingering process) both run `load_queue → mutate → save_queue`: the same queued job is dispatched by both (**duplicate execution**: two pids, two bench processes, same output file truncated under both writers), and last-writer-wins on `queue.json` silently **loses** the other daemon's enqueued examination jobs — orphaning parents into permanent `in_examination` (**silent stall**). `heartbeat.json` carries no daemon identity, so the condition is undetectable from outside. *Fix: `fcntl.flock` on `orchestrator.lock` at daemon start, non-blocking, exit if held; record holder pid in heartbeat.*

**C2 — Dispatch is not crash-atomic with state persistence.** `tick()` mutates in memory and saves only at the end. Any exception after `dispatch()` — a `Popen` `FileNotFoundError` (missing `OLLAMA` binary), an I/O error in `prepare_packets` — aborts `tick` before `save_queue(q)`. Consequences, all live: on-disk jobs revert to `queued` while their processes **keep running untracked**; next tick redispatches them (**duplicate execution**, two writers racing truncation on one `.out.md`, corrupt output that can still pass the non-empty check as `delivered`); on-disk `attempts` undercounts real attempts, defeating `MAX_ATTEMPTS` (**uncontrolled retries**); orphan outputs from never-saved job records are **lost work**. *Fix: `save_queue()` inside `dispatch()` immediately after pid assignment, and after every `reap()` transition; wrap each job's dispatch in its own try/except so one bad seat cannot abort the tick.*

**C3 — `reap()`/`route_examination()` are not idempotent, and exam dedupe is disabled by design.** `enqueue()` skips its duplicate check for any job with a `parent` (`and not parent`). Combined with C2, a parent re-reaped from stale disk state is re-delivered and re-routed, enqueuing a second examination for the same work; both run (bench cost doubled) and the verdict guard `parent["status"] == "in_examination"` only masks the second write. *Fix: dedupe examinations on `parent` regardless of the flag; make `reap()` transition only jobs whose on-disk status is still `running`.*

**C4 — Pid-reuse / restart blindness.** `pid_alive()` is `os.kill(pid, 0)` with no start-time or boot-token check. After an orchestrator restart, a persisted `running` job's pid may belong to an unrelated process → the orchestrator waits on it forever → that seat and one of the four slots are **permanently occupied** (silent stall); if the pid is dead, the stale partial output file passes the size check → false `delivered` (feeds C5's consequence without any run having occurred). *Fix: persist child start-time/token (e.g., `/proc/<pid>` start time or a wrapper-written sentinel with exit code) at dispatch and verify on reap.*

**C5 — Child exit status is never captured.** Completion equals "pid gone + non-empty stdout + stderr not starting with 'Traceback'". A seat that exits non-zero after writing partial output, or fails with a non-Traceback error ("model not found", connection refused, OOM-kill), is marked **DELIVERED**, logged as such, registered as such, and routed to examination as finished work — the system's primary **false-claim-of-completion** vector, and it poisons the examiner's input too. *Fix: spawn via a wrapper that records the exit code (`...; echo $? > job.exitccode`) and gate `delivered` on `exit == 0`.*

### HIGH

**H1 — Verdicts are never consumed.** Examiner stdout is written to a file and pointed at; the `VERDICT:` line is never parsed, so PASS does not advance, FAIL does not requeue or spawn a fix job, and `examined` is terminal. Every production line's output silently dead-ends here. This defeats requirements 3 and 6 in operation even though the routing machinery works. ("Never certifies" is a defensible design stance **for certification**; it is not a defensible stance for **doing nothing with the verdict**.)

**H2 — Examiner failure strands parents forever.** If the examination job itself parks (bad model name in `EXAMINERS`, bench fault, two failed attempts), nothing updates the parent: it sits in `in_examination` indefinitely, unflagged. No timeout exists on any state anywhere in the system. *Fix: on exam park, flag the parent FOUNDER-ACTION or reroute to the next examiner; add a tick-level sweeper that flags any job in a non-terminal status older than a threshold.*

**H3 — `awaiting_partner` is a write-only dead end.** No send, no reply ingestion, no timeout, no escalation. Partner packets accumulate as started-but-eternal jobs. If the captain-side watches described in the docstring do not exist (not in brief), requirement 4's entire mechanism is "a file in a folder," and this work is indistinguishable from progress while stalling silently.

**H4 — False-positive resource detection.** `"402" in err_text` / `"credit" in err_text.lower()` fire on benign stderr, park healthy jobs, discard good output (check precedes validation), and raise non-genuine FOUNDER-ACTION alarms. *Fix: match structured signals only (exit code, or a regex on `HTTP 402` / `insufficient.*credit` at line start).*

**H5 — Deterministic single examiner, no rotation.** `next((e for e in EXAMINERS if family_of(e) != fam))` always returns the first non-matching entry: every non-gemma builder is examined by `gemma4:31b`, every gemma builder by `nemotron-3-ultra`, always. No rotation (the comment claims one), no diversity across attempts, one examiner's failure halts all verdicts (compounds H2).

### MEDIUM

**M1 — REGISTER.md shows a "Delivered" timestamp for failed/parked jobs** (`finished_at` is set before status branching; column renders it unconditionally). The register itself displays false delivery. Also HH:MM:SS-only times; output path and verdict absent from the .md (present in register.json).

**M2 — Examination inputs are silently truncated** (brief `[:6000]`, work `[:12000]`) with no truncation notice to the examiner — a large deliverable can receive PASS on partial evidence. *Fix: append `[TRUNCATED: shown N of M bytes]`.*

**M3 — Six-line structurally impossible / no line-aware scheduling** (`MAX_PARALLEL = 4`; FIFO only; exams hardcoded `line=5`). See requirement 5.

**M4 — Poison-tick no-op daemon.** A corrupt `queue.json` (or persistent I/O fault) raises in `load_queue()` every tick; the daemon lives forever logging errors, doing zero work, heartbeat stale. Nothing escalates this to FOUNDER-ACTION. *Fix: quarantine-and-reinitialize a bad queue file (or refuse with a flag written to a state file that survives), and surface repeated tick exceptions into the register FLAGS.*

**M5 — Silent work-drop in `enqueue()`**. On dedupe refusal it returns `None` with only a log line; callers (including future route logic) receive no error, and briefs whose files are missing all hash identically (`brief_hash` of empty bytes), raising false-duplicate refusals — potential lost work at intake.

**M6 — Unbounded growth.** Terminal jobs are never archived; `q["jobs"]`, REGISTER.md, and per-tick cost grow forever.

### LOW

- L1: Cadence drift (sleep-after-work); KILL honored only between ticks (≤ ~60s latency — acceptable, undocumented).
- L2: Dead-code fallback `EXAMINERS[0]` in `route_examination()` (unreachable with current list).
- L3: `family_of()` prefix collision class (a seat named e.g. `mistral-7b` vs `mistral-large-4` is fine today; prefix matching is order-sensitive by luck, not design).
- L4: Parked jobs leave stale output files that can mislead human readers.

---

## THE SINGLE MOST IMPORTANT FIX

**Make every state transition crash-atomic: persist `queue.json` immediately after each individual transition — above all inside `dispatch()` the instant the pid is assigned, before any further work — and make `reap()`/`route_examination()` idempotent against that on-disk truth.**

This one change (C2 + C3) is the root-cause fix for the worst defect class in the system: duplicate execution and lost work arising from ordinary, operator-error-free events — a single bad seat, a transient I/O error, a restart. Today the in-memory-mutate-then-save-at-end design means any hiccup forks reality: processes the queue file denies exist run twice, write into shared output files, retry beyond `MAX_ATTEMPTS`, and their successful outputs vanish untracked; parents get double-routed to examination because dedupe is explicitly disabled for them. Until the queue file is the committed truth of every dispatch the moment it happens, none of the directive's guarantees in requirement 8 can hold regardless of how careful the rest of the logic is. This outranks C1 (single-instance lock — real, but requires an operator mistake the founder can be told not to make, and is one `flock` call to add alongside) and C5 (exit-code capture — severe, but corrupts only judgments about work; C2/C3 corrupt the work itself and the ledger simultaneously). Add the lock and exit-code capture in the same change set, in that order.
