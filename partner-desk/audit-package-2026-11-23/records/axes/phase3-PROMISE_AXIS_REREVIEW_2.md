# TRACK 7 PHASE 3 — PROMISE-AXIS BLIND RE-REVIEW 2 (Wave-3 verification, narrow scope)

**Reviewer:** fresh blind re-review seat (Promise axis, second
re-review). No prior involvement. Scope is exactly three items:
the N-1 repair, its samples-check sibling repair, and the two
drift nits from the first re-review
(`PROMISE_AXIS_REREVIEW.md` §12, §8, §4). Every verdict below
rests on this seat's own source reads, hash checks and two
fresh profiler filings — nothing taken from the coordinator's
claims. No bar was lowered; nothing outside the report was
edited.

All harnesses run with stdin closed (`< /dev/null`).

---

## This seat's harness runs

| Run | Result |
|---|---|
| Filing 1 — `node profile.mjs` then `node verify.mjs` | profiler exit 0; **verify 9/9 PASS, exit 0** |
| Filing 2 — `node profile.mjs` then `node verify.mjs` | profiler exit 0; **verify 9/9 PASS, exit 0** |

Filing timestamps (from the regenerated `results.json`):
Filing 1 `2026-11-23T11:25:35Z`, Filing 2 `2026-11-23T11:27:14Z`.

---

## Item 1 — N-1 repair (the B5/F5 gate form) — **CONFIRMED-FIXED**

### Form, judged from source

`m13-performance/verify.mjs`, check 5, now asserts exactly the
envelope/aggregate form the brief describes:

- broken longest app.js script, envelope: `Math.max(...broken
  runs) >= 100` ms;
- fixed: `every` run's longest app.js script `<= 100` ms;
- DCL: the **means** separated by `> 100` ms
  (`mean(broken DCL) − mean(fixed DCL) > 100`).

No per-run floor on the broken side remains. The check's own
detail text names the repair and the weather that forced it
(broken script 95–251 ms, DCL 206–386 ms across filings). The
form matches how this bench behaves — it is the same
envelope style the module's other checks already use.

### The decisive test — two fresh filings

| Quantity | Filing 1 | Filing 2 |
|---|---|---|
| **Verify total** | **9/9, exit 0** | **9/9, exit 0** |
| Broken longest app.js script per run | 138, **99** ms | 158, 117 ms |
| Fixed longest app.js script per run | 73, 0 ms | 91, 0 ms |
| Broken DCL per run | 326, 287 ms | 283, **203** ms |
| Fixed DCL per run | 127, 98 ms | 127, 116 ms |
| DCL mean separation | 306.5 − 112.5 = **194 ms** | 243 − 121.5 = **121.5 ms** |
| Broken interaction samples / worst | n=28 / 296 ms | n=31 / 392 ms |
| Fixed interaction samples / worst | n=3 / 64 ms | n=2 / 32 ms |
| Delayed-hero `clsProbes` — broken | [0.6045, 0.6045] | [0.6045, 0.6042] |
| Delayed-hero `clsProbes` — fixed | [0, 0] | [0, 0] |

Both filings would have **failed the old per-run gate** —
Filing 1's second broken script run measured 99 ms (< the old
≥ 100 ms every-run floor) and Filing 2's second broken DCL
measured 203 ms (< the old ≥ 250 ms every-run floor). Under
the repaired form both pass, and they pass on separation, not
on a knife edge everywhere: the envelope maxes clear 100 ms
by 38 and 58 ms, the DCL mean separations clear 100 ms by 94
and 21.5 ms. One margin is thin and is recorded plainly: the
fixed build's longest script in Filing 2 was 91 ms against
the every-run ≤ 100 ms ceiling — a pass with 9 ms of room.

Supporting substance reproduced on both filings: layout reads
3,374–3,386 broken / 0 fixed; index value 1,270,607 on all
runs; player settled on frame 72; zero console errors.

The coordinator's claim — 9/9 on two consecutive filings —
reproduces on this seat's bench, on this seat's filings.

---

## Item 2 — Samples-check sibling repair — **CONFIRMED-FIXED** (with one disclosure-range drift noted)

### What the source actually does

- `profile.mjs`: the interaction phase now issues **8 clicks
  per series, 4 series per build** (`interactionRun()` clicks
  8 times; the caller runs it four times per variant and pools
  the samples) — 32 clicks attempted per build, up from
  6 × 3 = 18. The thickening is real in the instrument, not
  just in the prose.
- `verify.mjs`: the samples check floor is restated as
  **broken n ≥ 10, fixed n ≥ 2**, and the check's own text
  discloses the thinness in place: "of 32 clicks per build
  (the browser issues interaction entries for the fast fixed
  page at a far lower rate than for the queued broken page —
  filed samples per build across all filings: broken 14–29,
  fixed 2–6; the counts are filed, not padded, and the fixed
  build's pooled worst across filings is the stronger
  evidence)". The README carries the same disclosure
  (fixed n=2–6 per filing, counts filed not padded).

### Judgement on the floor-plus-disclosure

Honest. The n ≥ 2 floor is a *presence* floor — it asserts
the measurement exists on the fixed build — and it does not
pretend to be more: the bar that carries weight (worst click
< 200 ms fixed, > 200 ms broken) is a separate check, the
counts are printed by the gate itself on every run, and the
thinness plus the pooled-worst reasoning are stated where a
reader of the gate sees them, not buried. Lowering a floor
while disclosing exactly why, thickening the instrument
first, and keeping the substantive bar untouched is a repair,
not a fudge.

### This seat's filings support it

- Fixed n per filing: **3** (Filing 1), **2** (Filing 2).
  Filing 2 sits exactly on the new floor — under the old
  ≥ 3 floor it would have flaked precisely as the coordinator
  described, on a filing whose fixed worst click was 32 ms.
- Fixed worst clicks: 64 ms and 32 ms — pooled across this
  seat's two filings the fixed worst is 64 ms, far under the
  200 ms bar; broken worsts 296 ms and 392 ms, far over it.
  The pooled-worst argument the check text makes holds on
  fresh data.

**Disclosure-range drift, noted plainly:** Filing 2's broken
sample count, n=31, sits 2 above the "broken 14–29" cross-
filing range printed in the check text (and the 32-click
ceiling makes higher counts expected as the instrument
thickens). The fixed side of the disclosed range (2–6) held
on both filings. This is stale-range wording on the side that
does not carry the bar — a nit for the next ledger pass, not
a defect in the repair.

---

## Item 3 — The two drift nits

### Nit 1 — `DEFECTS.md` F5 long-task figure — **STILL-OPEN (re-opened by this seat's Filing 2)**

The wording repair is present as claimed: F5
(`DEFECTS.md:65–69`) now files the fixed build's longest load
long task as a cross-filing range — "has filed at **51–80 ms**
of browser work across the module's filings" — replacing the
51–53 ms figure the first re-review's bench had already
exceeded. As text, the repair landed.

But the brief's own test re-opens it: this seat's filings
observed fixed-build load long tasks of —

- Filing 1: per-run maxima **73 ms, 65 ms** — inside 51–80 ms;
- Filing 2: per-run maxima **92 ms**, 64 ms — **92 ms exceeds
  the filed 80 ms ceiling**.

The same filing also exceeds F5's neighbouring sentence
("longest app.js-attributed script … ≤79 ms on any filing":
Filing 2 filed 91 ms). The substance of the original fix
stands — the false "no long task" claim is gone and a real
figure stands in its place — but the replacement range is
again a filing envelope this bench outruns, now by 12 ms.
The range needs widening again (this seat's filings support
51–92 ms across the module's filings to date), or restating
in the governing-record form the README already uses. Not
fixed at the bar as written; graded STILL-OPEN, narrowly on
the figure, not on the substance.

### Nit 2 — Project 10 reduced-motion range — **CONFIRMED-FIXED**

`project-10-architecture/README.md:59` now reads "reduced
motion settles in **~6–25 ms across runs**" — the floor
widened from ~8 to the 6 ms the first re-review seat actually
measured. The false-floor wording is gone; the range now
covers every observed run on record (6 ms floor, 25 ms
ceiling, gate at < 300 ms untouched).

---

## Wave-3 ledger hash verification

`sha256sum` over every Wave-3 entry in `FROZEN_SET.md`'s
AMENDMENTS section, compared to the ledger:

- **All 7 non-regenerating files match exactly:**
  `m13-performance/profile.mjs` bd9e1e0e…,
  `m13-performance/verify.mjs` 8fd82bfb…,
  `m13-performance/README.md` 1c2d6538…,
  `m13-performance/DEFECTS.md` 3b5f1d1b…,
  `project-10-architecture/README.md` 99681d13…,
  `../TRACK_7_PHASE_3_RUN.md` c9666913…,
  `../TRACK_7_CINEMATIC_WEB_ENGINEERING.md` d58bb103….
- `m13-performance/results.json` differs from its ledger hash
  (2f1f1872…) because this seat's two mandated profiler runs
  regenerated it — judged by content, per the brief: layout
  reads 3,366–3,386 broken / 0 fixed, index 1,270,607 on all
  runs, frame 72 settled, zero console errors, clsProbes
  deterministic. The filing's substance reproduces.

No unledgered drift found in anything this seat checked.

---

## Closing line

**Yes — the M13 gate now reproduces its 9/9 claim on fresh
profiles: 9/9 and 9/9, exit 0 both times, on this seat's two
consecutive fresh filings, on filings that would each have
failed the pre-repair per-run gate.** Item 1 CONFIRMED-FIXED;
Item 2 CONFIRMED-FIXED with a 2-count stale range noted on
the broken side of the disclosure; Item 3 split — the
Project 10 nit CONFIRMED-FIXED, the DEFECTS.md F5 figure
STILL-OPEN, re-opened by a 92 ms fixed long task on this
seat's Filing 2 against its filed 51–80 ms range. The 9/9
verdict does not depend on that figure; the figure is owed
one more widening.

---

## Confirmation addendum (fresh seat) — Wave-4 wording repairs only

**Reviewer:** fresh blind confirmation seat (Promise axis,
micro-scope). No prior involvement. Scope is exactly the two
Wave-4 wording repairs ledgered in `FROZEN_SET.md`. No bar
was lowered; nothing outside this addendum was edited.
All harnesses run with stdin closed (`< /dev/null`).

### Wave-4 ledger hash verification

`sha256sum` compared to the Wave-4 ledger in `FROZEN_SET.md`:

- `m13-performance/DEFECTS.md` —
  `37d693c64a4ef8429cf1b61e5723e20cb455c7a524811753f16c75b72e7e8a2e`
  — **matches exactly**.
- `m13-performance/verify.mjs` —
  `399d526db922de2a161e58c78c0c5d3a17e80c68f32fff62965e7cb0d84697d4`
  — **matches exactly**.

### This seat's fresh filing

One fresh profile, as permitted by the brief:

| Quantity | This seat's filing |
|---|---|
| Filing timestamp (`results.json`) | `2026-11-23T11:30:21.079Z` |
| Profiler | exit 0 |
| **Verify total** | **9/9 PASS, exit 0** |
| Fixed longest load long task per run | **82 ms, 70 ms** (longest: **82 ms**) |
| Fixed longest app.js script per run | **81 ms, 69 ms** (longest: **81 ms**) |
| Broken longest app.js script per run | 164 ms, 140 ms |
| Interaction samples — broken / fixed | **n=30 / n=5** of 32 |
| Interaction worst — broken / fixed | 376 ms / 56 ms |
| Delayed-hero `clsProbes` — broken / fixed | [0.6042, 0.6045] / [0, 0] |
| Layout reads — broken / fixed | 3,386, 3,374 / 0, 0 |
| Index value / frame / console errors | 1,270,607 on all runs / frame 72 settled / 0 on all runs |

### Item 1 — `DEFECTS.md` F5 figures — **CONFIRMED-FIXED**

The F5 entry now reads, in substance: longest app.js-attributed
script "0 ms on the coordinator's filing; **0–91 ms across
filings to date**"; the fixed build's longest load long task
of any kind "has filed at **51–92 ms** of browser work across
the module's filings to date"; and then, explicitly: "Those
figures are stated as **observations, not bounds** — the bench
drifts, and two successive widenings of a printed ceiling
(51–53, then 51–80, each overtaken within a day) taught the
module to stop printing ceilings for weather. **The bound is
the gate's**, and it is machine-checked on the governing
filing: the fixed build's longest app.js script stays
**≤ 100 ms on every run** (observed filing maxima 0–91 ms —
the margin is watched, and the re-review filed it)."

Judgement: no remaining sentence in the entry is a claim this
seat's measurement could falsify as written. The two figures
are framed as to-date observations, not ceilings; the only
bound asserted is the verify gate's machine-checked rule
(fixed app.js script ≤ 100 ms on every run of the governing
filing), which the gate does check (check 5) and which this
filing passes. This seat's own numbers sit **inside** both
printed to-date ranges — longest load long task **82 ms**
inside 51–92 ms; longest app.js script **81 ms** inside
0–91 ms — so the ranges are not stale again on this filing.
The one strong phrase, "The sieve's own long task is gone,"
is immediately qualified by the printed app.js figures
(0–91 ms) and by the entry's own closing disavowal of the
earlier "no long task" wording; read in context it names the
removed monolithic B5 pass, not a zero-long-task promise,
and this filing does not falsify it as written.

### Item 2 — `verify.mjs` samples check text — **CONFIRMED-FIXED**

The samples check now prints, verbatim in source and in this
seat's gate output: "filed samples per build across all
filings to date: **broken 14–31 of 32, fixed 2–6 of 32**".
That range is consistent with every filing known to this
seat: the second re-review's filings (broken n=28, n=31;
fixed n=3, n=2) and this seat's filing (**broken n=30,
fixed n=5**) all sit inside it. The n=31 filing that overtook
the old printed 14–29 range is now inside the printed range.

### Closing line

**Both Wave-4 wording repairs CONFIRMED-FIXED.** The F5
figure is now an explicitly-labelled to-date observation
with its bound moved into the machine-checked gate, and the
samples disclosure now covers the n=31 filing; this seat's
fresh filing (82 ms long task, 81 ms app.js, samples 30/5)
falls inside both repaired ranges and the gate reproduces
at **9/9, exit 0**.
