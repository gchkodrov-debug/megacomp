# DEBUGGING CASEBOOK — §26, the debugging ability

*Two defects were planted in a copy of the demonstration
storefront (`exam/broken-demo/`): realistic shapes, both
drawn from this degree's own incident history. The
diagnosis below was made with instruments
(`exam/diagnose.mjs`, raw output in `exam/diagnosis.json`)
before either cause was confirmed in the code. The fixes
stand in `exam/fixed-demo/`; every number below is from
the instrument's run against the three pages — broken,
fixed, shipped.*

## Case 1 — the journey that never moves (animation)

**Symptom.** The storefront loads cleanly — no console
errors, all 120 frames load — but scrolling the sequence
journey changes nothing: the lamp stays whole.

**Instrument.** The player's own state, read before and
after a full scroll to the document's end:

| page | frames loaded | frame before scroll | frame after scroll |
|---|---|---|---|
| broken | 120 | 1 | **1** |
| fixed | 120 | 1 | 120 |
| shipped | 120 | 1 | 120 |

The progress source moves (the scroll happened; the
frames are loaded; the player is not reduced-motion) —
the displayed frame simply never follows. That pattern
isolates the fault to the player's *drive*: the chase
loop runs only when kicked, and nothing was kicking it.

**Cause.** The page's scroll listener — the one line that
calls `player.kick()` on scroll — was missing from the
copy's `app.js`. The initial `kick()` at load still ran,
which is why frame 1 drew correctly and the page looked
healthy. (Rule 15's shape, planted deliberately: a
scroll-driven component does not poll; whoever removes
its kick removes its motion, silently.)

**Fix.** Restore the listener. One line, in
`fixed-demo/app.js`.

**Verification.** The fixed page answers the same
instrument 1 → 120, matching the shipped page exactly.

## Case 2 — the brass that went dull (rendering)

**Symptom.** The live lamp renders, orbits, and inspects
normally — the viewer's own state reads 4,108 model
triangles and 8 draw calls, identical to the shipped
page — but the brass looks flat and dull, its reflections
gone.

**Instrument — and an instrument lesson.** The first
measure tried was mean luminance over the lamp's region
of the canvas. It tied exactly: **23.2 vs 23.2**. The
average lied, and the casebook keeps the lie on record:
direct lights still shade the lamp when its environment
dies, so the *amount* of light barely moves while its
*character* — the reflections — vanishes. The measures
that see it are distributional:

| page | bright warm pixels in the lamp region | canvas pixel diff vs shipped |
|---|---|---|
| broken | **0.03%** | **4.61% of pixels (12,275 strongly)** |
| fixed | 0.31% | 0.00% |
| shipped | 0.31% | — |

**Cause.** The copy loads a "compatibility shim"
(`pmrem-shim.js`, slipped in between Three.js and the
viewer) that replaces `PMREMGenerator.fromScene` with a
1×1 near-black texture — so the viewer's softbox
environment is generated, filed, and *black*. A metal
reflects its environment; given a black room, the brass
reflects black, and only the direct lights remain. The
component was never broken — the page's own wiring
poisoned its input. (Rule 19's shape: the defect lives
upstream of the component that shows the symptom.)

**Fix.** Remove the shim and its script tag
(`fixed-demo/index.html`).

**Verification.** The fixed page's canvas is
pixel-identical to the shipped page's under the same
instrument (0.00% diff), and its bright-warm share
matches the shipped page's 0.31%.

## What the casebook teaches

1. **A state readout that agrees with the healthy page
   does not clear the page** — both defects shipped with
   perfect readouts (frames loaded, triangles counted).
   The symptom lives in behaviour over time (Case 1) and
   in distributions, not totals (Case 2).
2. **An average is a claim about a distribution it may
   not survive.** When a measure ties exactly on a page
   that visibly differs, distrust the measure before the
   page — and reach for a diff.
3. **The component is the last suspect, not the first.**
   Both faults were in the page's own wiring — a missing
   line and an extra one — around components that graded
   clean in their own phases.

---

## AMENDMENT — filed by the Phase 5 completion grading (2026-11-23)

*Entered in the amendments ledger in
`track7-artifacts/grading-phase5/FROZEN_SET.md`.*

The mean-luminance tie (23.2 vs 23.2) quoted in Case 2
is **reported, not filed**: `diagnosis.json` carries no
luminance field — the figure appears in `diagnose.mjs`'s
header comment and in the casebook above, but not in the
instrument's raw output. The lesson drawn from it stands
as the casebook's teaching; the distributional measures
that replaced it (bright-warm share, canvas pixel diff)
are filed in `diagnosis.json` and verify exactly. No
verdict in the examination rests on the tie.
