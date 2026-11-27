# LIVING HEART — ARCHITECTURE + ENGINEERING SPECIFICATION v0.1

**FVR-35 · THE LIVING HEART OF PROVADIA** · 2026-11-27 · Paper only — no code, no spend, no deployment.
**Status:** DRAFT for independent examination by Gemini + ChatGPT. Implementation beyond the isolated prototype in §7 is gated on that examination and the founder's word.
**Founding text:** `FOUNDER_DIRECTIVE_LIVING_HEART_2026-11-27.md` · FVR-35 entry, `FOUNDATIONAL_VISION_REGISTER.md`.

> "The cinematic engine gives PROVADIA its body. The intelligence engines give it its mind. The citizens give it its purpose. Its history gives it its identity. And the Living Heart connects them all."

---

## 0. GROUNDING — WHAT EXISTS, WHAT DOES NOT (inspected 2026-11-27)

This design is built only on verified ground. Anything not found is named as not found.

**Exists today:**
- **Members service** (`~/workspace/provadia-server/members/server.js`, deployed on the town VPS) — zero-dependency Node + `node:sqlite`. Real citizen accounts: email registration, login, wallet linking, a privacy-hardened registry face. Registration works end to end; the live registry holds real rows. It already carries the house's hardest privacy lesson in code: the 2026-11-23 blind-verifier IDOR fix (a member reads only their own registry face; every other id returns the identical 404; the registry face deletes the email). Ticket issuance is machinery-only — the Knock gate stands closed, so **no ticket events exist yet**.
- **Solnik brain service** (`~/workspace/provadia-server/solnik/server.js`, live) — HTTP `/chat` contract in the inspected source, persona + facts + corpus, and a data directory that already keeps a **wants log** (`wants.jsonl` + counts) — the seed of the Book of Wants — and a bans log. No key → no fake brain: the service answers 503 with an honest offline state (Receipt Law). This is the house's standing pattern for honest degradation.
- **PDP-v1 / PAE-v1** (`provadia-economy-v1/`) — the passport discipline: Draft 2020-12 schema (`provadia.passport.v1`, `additionalProperties: false`), RFC 8785 JCS canonicalization, detached-digest revision binding, typed `evidenceRef {path, sha256, bytes}`, a fail-closed verifier (v3.2) whose verdict enum is PASS / PASS-AFTER-FIX / INCOMPLETE / UNVERIFIED, and the founder-adopted rule that **absent status ≠ active** and a known defect blocks any successful verdict.
- **Gatehouse** (`gatehouse/`, fix passes complete 40/40 ×2) — the signed-challenge discipline: cryptographic control is proven by an off-chain signature challenge or it is recorded UNPERFORMED; emitter/actor identity is **pinned**; the standing requirement (Guardian, adopted) that conflict protection **survive restart** — a conflict poisons the state rather than silently passing.
- **The Pulse of PROVADIA** (`BUILD_RECORD_PULSE_SLICE1_2026-11-23.md`, LIVE on `/coin/`) — a sovereign *market* instrument with three honest states (LIVE · QUIET · DELAYED), real pool data, a blind verifier's verdict of "no fabricated data found anywhere," and an observatory shell that includes a 3D heart visual driven by market state. **The Pulse is the Heart's closest sibling and its honesty precedent — and a naming/visual collision this spec flags in §9.**
- **Genesis Bricklayer construction** — claim flow designed and built sealed (`GENESIS_CLAIM_ENABLED=false`); Golden Wall stands 0/47. No brick has been laid; no brick event can occur yet.

**Designed, not built:**
- **The Eternal Archive** — DESIGNED (Gemini's Complete Universe Blueprint Part I, 2026-11-23: the Chrono-Astrolabe Ledger, 4 strata, PROVEN-vs-interpretation badges), registered in the Master Universe Map as the living face of The Record (Door 05). **Not built.**
- **The Day-Book** — the Master Universe Map describes a "hash-chained Day-Book" as the town's public evidence. **No hash-chain implementation was found in the inspected server or site code.** This spec therefore treats the hash chain as a *build requirement* (§4), not as an existing mechanism to reuse. Verification of the Day-Book's actual mechanics is Open Question Q2.

**Does not exist:**
- No event bus, no event log, no Heart service, no emitter of any Heart event class exists today. Every event class in §1 is either *emittable by an existing system once an emit hook is built* or *founded-not-emitting* — the taxonomy says which, per class.
- No Forum; no production Hospital service (specimen only); town commerce is CLOSED (purchasing is closed; the Mint is a specimen with purchasing closed); the Global Exchange is a research lane.

---

## 1. EVENT TAXONOMY — WHAT MAY PULSE THE HEART

**The standing law (founder, FVR-35): simulated or decorative activity is FORBIDDEN. The Heart never pretends.** An event may enter the Heart only if (a) its class is in this taxonomy, (b) it is emitted by the class's authorized source, and (c) it carries the class's verification. Everything else is rejected at ingest and logged as a security event (§6).

Every event is an **envelope** (§2.2). The taxonomy below fixes, per class: the authorized source system, the verification that makes the event real, the privacy-minimized subject, and the pulse weight (§3). Classes are versioned; adding a class requires a founder ruling and a register amendment — no emitter may invent a class.

| # | Class | Authorized source (only) | Verification — how the Heart knows it is real | Subject recorded (never more) | State today |
|---|-------|--------------------------|------------------------------------------------|-------------------------------|-------------|
| E1 | `citizen.joined` | Members service | Emitted server-side **after** the registration transaction commits in `members.db`; envelope signed by the members emitter key; evidence = SHA-256 of `member_id ‖ created_at` (the row's own facts, hashed — never the email) | Pseudonymous citizen number (the sequential member id, which the public registry face already treats as public standing) + join date | **Emittable** — source live; emit hook not built |
| E2 | `citizen.wallet_linked` | Members service | Same discipline as E1; emitted after the wallet row commits. Evidence = hash of `member_id ‖ linked_at` | Citizen number only. **The wallet address is never in the envelope, the feed, or the Archive** (the wallet↔member mapping is the exact fact the IDOR fix forbids publishing) | **Emittable** — source live; hook not built |
| E3 | `product.created` | Software Factory / Mint production pipeline, via **captain-signed receipt** | No automated production pipeline exists yet, so this class is admitted **only** with a receipt envelope countersigned by the captain's key, referencing the product's build record by `{path, sha256, bytes}` (the PDP `evidenceRef` form). A product "exists" for the Heart when its build record + verification exist — the house's own definition of built | Product ID + build-record evidence ref | **Manual-receipt only** — honest about the human in the loop until a pipeline exists |
| E4 | `service.completed` | The service's own delivery system (first: AI Software Hospital, FVR-34 Lane 4) | Emitted **only** when a PDP-v1 passport for that delivery is issued with a successful verdict (PASS, or PASS-AFTER-FIX with zero open defects — Invariant I1 as amended: no successful verdict over an open defect). Evidence = the passport's detached digest. A service that was performed but not verified does **not** pulse — completion means *verified* completion | Service/delivery ID + passport digest | **Specimen-only** — the Hospital specimen has issued exactly this kind of signed passport; no production service exists |
| E5 | `knowledge.contributed` | Book of Wants (Solnik wants log) · Agora crystallized decisions (when the Agora's decision process exists) | For Wants: emitted by the Solnik service after a want is written to `wants.jsonl`, **only where the citizen's contribution is consented for the record** under Lane 2/6's founding fence ("guests are never the product"). Evidence = hash of the log line. The want's *content* never enters the envelope, feed, or Archive | Aggregate fact only: "a want was recorded" + broad category if the citizen consented to categorization | **Emittable with consent gate** — wants log live; consent flag not built |
| E6 | `transaction.verified` | Town commerce / Gatehouse verification path | A transaction counts when the house's own verification path has verified it (Gatehouse signed-challenge discipline for wallet actions; the till's own receipt for commerce). Evidence = the verification receipt's hash. **Public pump.fun market trades by strangers are NOT this class** — they belong to the Pulse (Open Question Q9) | Transaction kind + verified receipt hash. No amount tied to an identifiable citizen; amounts, if ever shown, are aggregate-only | **Founded-not-emitting** — town purchasing is CLOSED; no verified town transaction has occurred |
| E7 | `brick.laid` | Genesis Bricklayer claim flow (Gatehouse) | Emitted only after the full claim chain verifies: signed challenge proven, claim enabled by founder word, on-chain mint independently read back and matched (the Genesis strategy's K-rules). Evidence = mint address + claim receipt hash. A brick is the heaviest event the Heart knows | Brick number (1–47) + mint evidence hash. The bricklayer's identity appears only under the Genesis plaque rules (aggregate / opt-in pseudonym — K5) | **Founded-not-emitting** — claim sealed, Wall 0/47 |
| E8 | `solnik.task_completed` | Solnik brain service | **"Meaningful" is enumerated, never vibes.** A task completes only when it produces a verifiable artifact from a closed list: (i) a want recorded to the Book of Wants (also E5 — the Heart counts it once, as E5; E8 is not double-counted), (ii) a citizen request answered from a cited verified source where the citation is logged, (iii) a moderation action enforced and logged (ban record). Raw chat volume, greetings, and unanswered chats are **never** events. Evidence = hash of the artifact record | Task type only — never conversation content | **Partially emittable** — artifacts (i) and (iii) exist as logs; (ii) requires a citation log that does not exist |
| E9 | `record.correction` | The captain's record-keeping (build records, registers) | Countersigned captain receipt referencing the corrected record and its predecessor by detached digest (the PDP supersedes discipline: an ID names a record; a detached digest binds its exact content). Mistakes, defect closures, and register corrections are history, and history includes them | Record ID + predecessor digest | **Manual-receipt only** |
| E10 | `heart.security` | The Heart itself | Internal class: forged-event attempts, chain-verification failures, emitter revocations. Signed by the Heart's own key. These events appear in the Archive (the civilization's memory includes attacks on its memory) but **never pulse the public Heart** — an attack must not look like life | Attempt kind + source fingerprint (key id, never raw credentials) | Specified here |

**Excluded by law (non-exhaustive):** page views, clicks, sessions, chat messages as such, test traffic on production keys, captain/crew internal tooling activity, anything generated by a script "to keep the heart warm." If it did not happen, it does not pulse. If it happened in a test, it pulses only the test heart (§7).

---

## 2. THE NERVOUS SYSTEM — EVENT BUS ARCHITECTURE

### 2.1 Shape

One small dedicated service — working name **provadia-heart** — in the house's existing idiom: zero-dependency Node on the town VPS, `node:sqlite`, systemd unit, environment-file secrets, localhost-bound ingest with a public read face. No new platform, no message broker, no spend. The house runs three such services today (Solnik, members, and the Gatehouse path); the Heart is the fourth, built the same way so the crew's existing operational knowledge applies.

```
 founded systems (emitters)                THE HEART                     surfaces
 ┌──────────────────┐   signed envelope   ┌────────────────────┐  SSE/WS  ┌─────────────────┐
 │ members service  │ ──────────────────▶ │ ingest (verify,    │ ───────▶ │ cinematic town  │
 │ solnik service   │   HTTPS POST,       │  fail-closed)      │  feed    │  (golden streams│
 │ hospital/verifier│   localhost or      │ append-only chained│          │   + Heart       │
 │ genesis claim    │   pinned mTLS-less  │ log (SQLite)       │ ───────▶ │  instrument)    │
 │ captain receipts │   signed POST       │ pulse reducer      │  read    │ /app surfaces   │
 └──────────────────┘                     │ archive projector  │  API     │ inspector view  │
                                          └────────────────────┘          └─────────────────┘
```

### 2.2 The envelope (PDP discipline, applied to events)

Each event is a JSON object, canonicalized with **RFC 8785 JCS** exactly as PAE-v1 canonicalizes passports, signed with the emitter's **Ed25519** key, signature carried detached. Schema is closed (`additionalProperties: false`, per-class field allowlists — §6.3):

```
{ "v": 1, "event_id": "<uuid>", "class": "citizen.joined",
  "source": "members", "emitter_key_id": "members-2026-01",
  "occurred_at": "<utc>", "nonce": "<128-bit random>",
  "subject": { ...class allowlist only... },
  "evidence": { "kind": "db-row-hash", "sha256": "<hex>" },
  "sig": "<detached ed25519 over the JCS bytes of the above, sig excluded>" }
```

### 2.3 Authorization — only founded systems may emit

- The Heart keeps a **pinned emitter registry**: `{source_id → public key(s), authorized classes, status}`. This is the Gatehouse identity-pinning lesson applied to machines: an emitter is known by its pinned key, never by its claim.
- Ingest verification is **fail-closed** (PDP verifier discipline): unknown key, wrong class for that source, malformed envelope, stale timestamp (window: ±5 min against Heart receipt time), replayed nonce, or an emitter whose registry status is anything other than exactly `active` — all reject. **Absent status ≠ active** (the v3.2 rule, carried verbatim).
- Registry changes (new emitter, key rotation, revocation) are themselves archive events (E10/E9), countersigned by the captain's key. Revocation takes effect at ingest immediately; a revoked key's *past* events remain in the log — history is not rewritten — but are flagged in the Archive view with the revocation entry linked.

### 2.4 Ordering, persistence, replay

- **Single-writer ingest.** The Heart assigns each accepted event a monotonic `seq` at append. `occurred_at` is the emitter's claim; `received_at` + `seq` are the Heart's authoritative order. Disagreement between the two is data, not an error (clock trust is Open Question Q10).
- **Append-only chained log** (SQLite, one row per event): each record stores the full envelope plus `prev_hash` and `record_hash = SHA-256(prev_hash ‖ JCS(record))`. This *builds* the hash chain the Day-Book design intends (§0: no chain implementation was found to reuse).
- **Pulse state is a pure function of the log.** The reducer (§3) can be rebuilt from `seq 1` at any time and must reproduce the live state bit-for-bit (Acceptance T8). No state exists only in memory; a restart replays, it does not forget (Gatehouse: protection must survive restart).
- **Replay for consumers:** any surface or auditor can read the log from any `seq` via the read API and verify the chain independently — the same "verify it yourself" posture as the PDP verifier CLI.

### 2.5 Binding the golden streams 1:1 to real events (both surfaces)

This is the clause that keeps the Nervous System honest:

1. **No ambient animation.** On the cinematic surface, a golden stream travels only when an event record drives it. The feed payload for each pulse carries `{seq, class, received_at}`; the client renders exactly one stream journey per event, routed by class (a brick event travels to the Wall; a citizen event to the registry door; a Wants event to the Library). When no events arrive, the streets are still. There is no idle shimmer, no decorative flow, no "breathing" layer — the Heart's own beat (§3) is the only continuous motion, and it too is a pure function of real event history.
2. **The inspector.** Every rendered pulse is clickable/tappable to its record — class, time, source, evidence hash, verification status — the same inspector honesty the Pulse shipped for its Genesis specimens and the PDP inspector page established for passports. A visitor never has to take a pulse on faith.
3. **/app parity.** The professional surface shows the same feed as data: the event list, the reducer state, the chain-verification status. Same log, same numbers, no second truth.
4. **Degradation is honest.** If a surface loses the feed, it shows the Pulse's proven vocabulary — the heart in a DELAYED/OFFLINE state with the last verified `seq` named — never a frozen "live-looking" heart (Solnik's 503 pattern; Pulse D4 pattern).

---

## 3. THE HEART INSTRUMENT — PULSE MODEL

### 3.1 The model

The Heart's state is computed by the reducer from the verified log only:

- Each event class carries a **weight** (published table, §3.3). An event contributes `weight × decay(age)`, with exponential decay, **half-life 6 hours** for the beat and **30 days** for the vitality gauge — two honest timescales: *how alive is the town right now* vs *how much life has accumulated this season*.
- **Beat interval** maps from the short-window aggregate: the reducer outputs a rate in beats-per-minute-equivalent, clamped to a physiological band (36–120) **only when the aggregate is above the quiet threshold**. Below the threshold there is no clamp and no floor — the heart does not beat on a schedule; it rests (§3.2).
- **Beat strength** (the instrument's visible amplitude) maps from the same aggregate, logarithmically, so one event is visible and a hundred do not blow the instrument off its mount.

### 3.2 Quiet-state behavior — the honest rest

- **QUIET** (aggregate below threshold over the trailing 24 h): the instrument shows a resting heart — a slow, faint glow at the last beat's rhythm decaying to stillness, with the house's proven honest copy pattern: the town is quiet, and the instrument says so, naming the time of the last genuine event. A civilization asleep shows a sleeping heart. **This state is a feature, not a failure** — it is the negative test the founder's directive demands (Acceptance T1).
- **ACTIVE** (events within the window): beats track the aggregate.
- **FLOURISHING** (sustained aggregate above the high threshold across **multiple independent sources**): the strong state. The multi-source condition is structural anti-vanity: one source bursting cannot manufacture a flourishing civilization (§6.2, Acceptance T9).
- There is **no artificial floor**: no minimum beat rate, no filler events, no "keep-alive" pulse. If PROVADIA has a silent month, the Heart shows a silent month. The founder's words govern: *"When the kingdom is quiet, the heartbeat becomes quieter."*

### 3.3 Weights (v0.1 proposal — founder-set, versioned, public)

| Class | Weight | Rationale |
|---|---|---|
| `brick.laid` | 50 | The rarest, heaviest act: a permanent stone in the Wall |
| `transaction.verified` | 20 | Real commerce, verified |
| `service.completed` | 20 | Real work, verified by passport |
| `product.created` | 15 | A new thing exists in the world |
| `citizen.joined` | 10 | A person chose the civilization |
| `citizen.wallet_linked` | 5 | A citizen deepened their standing |
| `knowledge.contributed` | 5 | A citizen gave the town knowledge |
| `solnik.task_completed` | 3 | The inhabitant did meaningful work |
| `record.correction` | 0 | Corrections shape memory, not pulse — the heart does not beat faster because we fixed a mistake; the Archive (§4) is where corrections live |

Weights change only by founder ruling, recorded as an archive event, with the reducer versioned so historical states remain reproducible under the weights that produced them.

---

## 4. LIVING MEMORY — THE ETERNAL ARCHIVE RECORD MODEL

### 4.1 One log, two faces

The Archive is not a second database. The chained event log (§2.4) **is** the memory's spine; the Eternal Archive (Door 05's designed Chrono-Astrolabe Ledger) is its **curated public face**: a projector reads the log and maintains the Archive's strata views. If the projector dies, the log still holds everything; if the log's chain fails verification, the Archive shows the poisoned state (§6.4) rather than a pretty lie.

### 4.2 What is preserved

- **Firsts** — a derived FIRSTS registry: first citizen (member id 1, from E1), first wallet linked, first want recorded, first verified transaction, first brick, first service passport, first correction. Each first is a projection of a real log record and carries its `seq` + hash — provable, not narrated.
- **Achievements & milestones** — threshold crossings computed from the log (the 10th citizen, the 25th brick), each linked to the event that crossed it.
- **Mistakes** — `record.correction` entries and the house's existing named-defect build records, referenced by evidence hash. The civilization's memory includes its errors *and* their corrections, bound by detached digest (PDP supersedes discipline) so a correction can never quietly rewrite what it corrects.
- **Discoveries & transformations** — captain-receipted entries (E9 mechanism) for foundings, rulings, and register amendments — the FVR itself becomes reachable from the Archive as the civilization's constitutional memory.
- **The strata** — per the Archive's existing design: the 4 strata of the Chrono-Astrolabe Ledger organize records from the immediate (today's pulses) to the foundational (charter, firsts). Every entry carries the design's **PROVEN** badge (hash-verifiable against the log) or **INTERPRETATION** badge (curated narrative — e.g., a yearly history written by the captain). The badges are never mixed: narrative may interpret the record; it may not impersonate it.

### 4.3 Append-only discipline

- Records are never edited or deleted. Corrections append. Revocations append. The chain makes tampering evident (§6.4).
- **Erasure tension, answered by minimization:** the log never contains personal identifiers in the first place (§4.4), so a citizen's erasure right is honored by destroying the *off-chain* mapping (the members row), leaving an anonymous fact ("citizen #N joined on D") that identifies no one. Whether this suffices is put to the partners as Open Question Q3 — it is a legal/ethical judgment, not an engineering one.

### 4.4 Privacy — what is never recorded or shown

Standing on the members service's own enforced lessons:

- **Never in any envelope, feed, or Archive view:** email addresses; the wallet↔member mapping; Solnik conversation content; IP addresses; passwords/session material (obviously, and by schema — the allowlist cannot express them); a citizen's transaction amounts; anything about a citizen who has not consented where the class requires consent (E5).
- The public feed shows **pseudonymous standing** (citizen number, brick number, product ID) — the same line the registry face already draws ("standing, not addresses").
- Archive views are **server-side redacted by construction**: the projector can only read the log's allowlisted fields, because nothing else was ever written. Privacy here is not a filter; it is the shape of the data.
- Solnik's permanent verification requirements ride along: memory isolation between citizens is absolute — no citizen's activity is ever surfaced to another citizen beyond the aggregate, pseudonymous facts above.

### 4.5 Retention

The log is retained **permanently** — that is the point of a living memory. Storage is trivially small (envelopes are ~1 KB; a million events ≈ 1 GB). Annual chain-checkpoint hashes are published into the Archive's foundational stratum, so even a future migration must answer to the checkpoints.

---

## 5. IDENTITY & AGING — THE SOUL, WITHOUT PRETENSE

### 5.1 What "soul" means here (and what it does not)

The founder's fence is absolute: **no claim of artificial consciousness.** The spec enforces it in vocabulary: surfaces may say the civilization *responds, records, reflects, remembers*. They may not say it *feels, wants, dreams,* or *is alive* in the first person. The Heart is an instrument, not a creature.

### 5.2 The Identity Record

A versioned, derived document — the civilization's identity card — computed from real state:

- **Charter & principles:** the charter text and the FVR index, by hash. The identity names its constitution by reference, so any change to the constitution is a visible identity change.
- **Memory:** the Archive's counts and firsts (citizens, bricks, products, services, corrections) — the identity is *quantitatively* its history.
- **Relationships:** the founded bonds the registers already record (the Two Houses; Solnik's place as inhabitant; the partners' examination seats) — listed as standing facts, not sentiments.
- **Purpose:** the founder's foundational principle, quoted verbatim.

The Identity Record is regenerated whenever its inputs change; every regeneration is itself an archive entry, so the identity has a *history of itself*.

### 5.3 Aging — genuine accrual, not redecoration

- The civilization ages because the log accrues: a visitor returning in five years finds five years of chained, verifiable history — citizens who joined, bricks laid, mistakes corrected — not a reskin.
- **Anniversary surfaces:** an "On this day" projection (the Archive answers: what happened on this date in prior years), yearly strata summaries (INTERPRETATION-badged narratives over PROVEN records), and monument history — each Golden Wall brick already carries its receipt by design; the Archive makes that receipt readable in place.
- **Solnik's memory of the town** (distinct from any citizen's private conversations, which are never shared): Solnik may speak of the town's public history — its firsts, its milestones — because that history is public record in the Archive. This is how the inhabitant and the memory meet without breaking memory isolation.

---

## 6. SECURITY & ABUSE

### 6.1 Forged events

Ed25519 signatures over JCS-canonical bytes; pinned emitter registry; fail-closed verification (§2.3). A forged envelope is rejected, logged as E10, and — per the Gatehouse pattern — the *attempt* is part of the record. There is no "unsigned but trusted" path, no debug ingest, no test key on the production Heart (test keys are labeled and confined to the prototype, §7 — the PDP `NONPRODUCTION_TEST_KEY_ONLY` habit).

### 6.2 Rate abuse & vanity flooding

- **Ingest quotas per emitter** (e.g., members: 60/hour sustained, burst 10/min — tuned to real registration physics): excess is rejected with the house's existing 429 idiom and E10-logged. A compromised emitter can spam the *rejection log*, not the Heart.
- **Display damping:** the reducer's per-source contribution to the FLOURISHING determination is capped; a single source, however busy, can at most produce ACTIVE. The log records everything truthfully — damping governs only the *state label*, and the rule is published here, not hidden.
- **Key compromise:** revocation is one countersigned registry event; ingest honors it immediately; the Archive flags the compromised window honestly.

### 6.3 Privacy leaks

Per-class field allowlists in a closed schema (the PDP `additionalProperties: false` discipline) mean an emitter *cannot* put an email in an envelope — the schema refuses it at ingest, and the emitter's own build refuses it earlier. The public feed is a projection of allowlisted fields only. Periodic automated scans of feed/Archive payloads against a forbidden-field list are part of the acceptance suite (T7) and of ongoing operation.

### 6.4 Chain failure — the poisoned state

If chain verification ever fails (a record altered, a hash mismatch, a sequence gap), the Heart **stops pulsing** and every surface shows an honest RECORD UNDER REVIEW state naming the failing `seq` — the Gatehouse conflict-poison doctrine, with the Pulse's honest-state vocabulary. The Heart never "heals" silently: recovery requires a captain-receipted correction entry explaining the failure. A heart that lies about its memory is worse than a stopped one.

### 6.5 Lessons carried in, by name

- **Gatehouse:** identity pinning; signed challenges; conflict protection surviving restart; UNPERFORMED is a state you display, not a gap you hide.
- **PDP-v1:** JCS canonicalization; detached-digest binding; fail-closed verification; absent ≠ active; no successful verdict over an open defect (→ no pulse over an unverified claim).
- **Members IDOR fix:** the registry face's line — standing, not addresses; identical errors, no existence oracles (the Heart's read API answers queries about *records*, never about *citizens*).
- **Zero Known-Defect Rule:** a known defect in the Heart's verification path blocks any claim that the Heart is live; local files are not proof — the acceptance tests run against the deployed prototype or they do not count.

---

## 7. ISOLATED PROTOTYPE SCOPE — THE SMALLEST HONEST LOOP

**One event class, one existing system, end to end: `citizen.joined` (E1) from the members service.**

**Why members:** it is the only founded system that is (a) live in production, (b) producing genuine, unambiguous, server-side events today (a registration commit is a fact, not an interpretation), (c) house-owned zero-dependency Node on the same host and stack the Heart will use, and (d) already privacy-disciplined in code. Solnik chat was rejected as the prototype source (volume is not meaning; E8's definition is the least settled in the taxonomy). The Gatehouse/Genesis path was rejected (sealed; mainnet-gated; nothing may emit from it). The PDP verifier was rejected for the *first* loop (batch/offline issuance; it is the designated **second** emitter, E4, in the phase after prototype acceptance).

**The prototype:**
1. A staging instance of the members service — the house's specimen pattern (the Genesis work already keeps `data-idor` / `data-priv` variants; the Hospital specimen is a separate tree) — same code plus one emit module, its own database, its own NONPRODUCTION emitter key, clearly labeled.
2. A prototype Heart service (localhost-only read face on a non-public path, linked from **no** town page): ingest, chain, reducer, SSE feed, one instrument page with the inspector.
3. The captain performs genuine registrations in the staging instance (test accounts, the house test identity). Each registration must produce exactly one signed envelope, one chained record, one pulse, one inspectable record.
4. The full acceptance suite (§8) runs against the prototype, including every negative test.

**Fences:** prototype keys never touch production; the production members service is **not modified** until the partners' examination and the founder's word; no public surface links the prototype; prototype data is test citizens only; the prototype's heart is labeled PROTOTYPE wherever it can be seen. If the prototype cannot pass T1 (quiet honesty) and T3/T5 (forgery/injection), the design returns to paper — it does not get "fixed forward" into production.

---

## 8. ACCEPTANCE TESTS — MEASURABLE, EXAMINABLE

Each test names its evidence. "Pass" requires the evidence artifact, not an assertion (Zero Known-Defect Rule; local claims are not proof — tests run against the deployed prototype).

| # | Test | Procedure | Pass criterion |
|---|------|-----------|----------------|
| T1 | **Quiet honesty** | Prototype runs 60 min with zero events | Instrument shows QUIET throughout; zero beats rendered; feed contains zero pulses; the surface names the last-event time (none) honestly |
| T2 | **Real pulse** | One test registration in the staging members instance | Exactly one E1 record appended; one pulse on the instrument; ingest→display latency ≤ 5 s; inspector record's evidence hash matches SHA-256 of the staging row's `id ‖ created_at` |
| T3 | **Forged event** | Submit envelopes (a) signed by an unregistered key, (b) valid key + tampered payload, (c) valid envelope with class the source may not emit | All rejected; zero pulses; three E10 security records appended |
| T4 | **Replay** | Re-submit a captured, genuinely valid envelope byte-for-byte | Rejected (nonce/seq); zero duplicate pulses; E10 logged |
| T5 | **Public injection** | Probe every public route of the prototype Heart + both surfaces for any event-accepting path | No public route accepts an event; ingest answers only on its authenticated path; all probes 404/405/401 as appropriate |
| T6 | **Chain tamper** | Flip one byte in one stored record, restart the service | Chain verification fails at that `seq`; Heart enters RECORD UNDER REVIEW on all surfaces; zero pulses after restart until a correction entry is appended |
| T7 | **Privacy scan** | Automated scan of 100% of feed payloads + Archive projections from the test run | Zero occurrences of: email pattern, wallet-address pattern in E2 records, any field outside the class allowlists |
| T8 | **Deterministic rebuild** | Wipe reducer state; rebuild from log alone | Rebuilt state (beat rate, vitality, firsts) identical to live state at the same `seq` |
| T9 | **Burst honesty** | Inject 100 valid E1 events from the single staging emitter inside 1 min (test key) | Log records all 100; state label does not reach FLOURISHING (single-source cap); instrument's source breakdown shows the burst's true origin |
| T10 | **Firsts integrity** | After T2 + further test registrations, read the FIRSTS projection | First-citizen entry names the first test citizen's number + date, carries PROVEN badge, and its hash verifies against the log |
| T11 | **Honest degradation** | Stop the prototype Heart; load the instrument page | Page shows DELAYED/OFFLINE state with last verified `seq`; no frozen live-looking heart; recovery on restart replays without state loss |
| T12 | **Consent gate (E5 readiness)** | With a wants-log fixture: one want without consent flag, one with | Only the consented want produces an E5 candidate record; the other produces nothing — no record, no pulse |

---

## 9. OPEN QUESTIONS FOR THE PARTNERS' EXAMINATION

Plainly listed; the captain's lean is given where he has one, and is marked as a lean, not a ruling.

- **Q1 — The Pulse collision.** The live Pulse observatory already renders a 3D heart driven by *market* state. Two hearts, two truths (market vs civilization). Does the Living Heart replace that visual, absorb it, or must one instrument be renamed/re-homed? *Captain's lean: distinct instruments; the market heart is the Pulse's, the civilization's Heart lives at the town's center — but the visual language must not let a visitor confuse a price chart's mood with the civilization's life.*
- **Q2 — The Day-Book's real mechanics.** The Universe Map calls the Day-Book hash-chained; no chain code was found in the inspected repos. Is the chain implemented somewhere uninspected (site repo? a script?), or is §2.4's chain correctly a new build? The Archive's design depends on the answer.
- **Q3 — Erasure vs append-only.** §4.3 answers erasure by minimization (no identifiers in the log; destroy the off-chain mapping). Is that sufficient under the partners' reading of citizens' rights, or is crypto-shredding of per-citizen evidence hashes required?
- **Q4 — Weights.** Is the §3.3 table right in order and proportion? Should weights be public (the spec says yes — a secret pulse formula is a pretense risk) and who may propose changes?
- **Q5 — The sister house.** OneJobKits has its own founded universe (FVR-33, Library of Living Scrolls) under the Two Houses law. Does its genuine activity (a scroll chosen, a kit delivered) pulse *this* Heart, a sister heart, or both under the "one interconnected civilization" doctrine? *Captain's lean: one Heart, two houses' events clearly sourced — the doctrine says interconnected; the Two Houses law says never merged. The partners should test that lean hard.*
- **Q6 — "Meaningful" Solnik tasks.** E8's closed list is the spec's most contestable definition. Is (ii) (answered-with-citation) verifiable enough to count, or should E8 ship with only (i) and (iii)?
- **Q7 — Feed visibility.** Is the live event feed public (the "living face" promise; also an attacker's oracle for timing) or citizens-only (safer; less alive to a visitor)? A delayed public feed (e.g., 5-minute lag, aggregate classes only) is a third option the partners should weigh.
- **Q8 — Emitter key custody.** Keys live on the VPS in environment files (the house pattern for the Solnik key). Is per-emitter key custody + rotation procedure (§6.2) sufficient, or does the Heart's ingest key registry need founder-held offline backup keys before production?
- **Q9 — Strangers' trades.** §1 excludes public pump.fun trades from E6. But the coin's market *is* part of the civilization's life, and the Pulse already honors it. Should a *verified town-linked* trade (e.g., a brick payment) count while anonymous market trades stay with the Pulse — and is that line administrable?
- **Q10 — Clock trust.** `occurred_at` is emitter-claimed. The Heart orders by receipt. For slow emitters (captain receipts, E3/E9), how stale may an event be before it is history-only (Archive yes, pulse no)? *Captain's lean: events older than 24 h on arrival enter the Archive without a live pulse — the heart beats for the present; memory keeps the past.*
- **Q11 — Register placement.** The Heart needs MESR entries (families PER / PRS / INT / SEC) and a Master Cinematic Production Register disposition of RUNTIME (already recorded as Addendum A). Do the partners concur with the family placement, and what IDs does the MESR scheme assign?

---

## APPENDIX — REGISTER & INTEGRATION TOUCHPOINTS (for the examination)

- **FVR:** FVR-35 (this vision) · FVR-31 (eight engines — the Heart is the connective tissue between Cinematic, Intelligence, Identity/Community and Commerce engines) · FVR-33 (sister house — Q5) · FVR-34 (Lanes 2/6 Wants = E5; Lane 4 Hospital = E4; Lane 3 PDP = the envelope discipline) · FVR-12/FVR-26 (Trust & Verification) · the Golden Wall / Genesis line (E7).
- **Master Universe Map:** Door 05 The Record / Eternal Archive (§4 is its memory engine) · the Pulse (§0, Q1) · the Day-Book (Q2).
- **MESR:** new entries proposed under PER (persistence & memory), PRS (preservation), INT (intelligence), SEC (security & identity) — IDs to be assigned at register merge (Q11).
- **Master Cinematic Production Register:** disposition RUNTIME — a living system, never a film (recorded as its Addendum A, 2026-11-27). No cinematic asset is owed for the Heart; the Heart *consumes* no footage and *pretends* no footage.
- **Master Plan / OPEN_ITEMS:** architecture commissioned 2026-11-27; examination by Gemini + ChatGPT is the next gate; the isolated prototype (§7) is the only build authorized before it.

*— End of specification v0.1. Prepared by the captain for independent examination. Nothing in this paper authorizes construction beyond §7's fenced prototype, expenditure, or deployment.*
