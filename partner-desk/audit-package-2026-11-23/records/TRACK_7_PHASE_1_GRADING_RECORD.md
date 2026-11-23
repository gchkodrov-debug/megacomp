# TRACK 7 · PHASE 1 GRADING RECORD

*Graded blind, 2026-11-23, under the Two-Axis Independent
Review: a Promise axis and a House axis, each a fresh-context
reviewer given the artifacts and its own axis only, plus a
different-family critic (kimi-k3, Ollama bench) seated over
the filed evidence. Fixable blockers were fixed in-loop and
re-verified by FRESH re-reviewers on the axis that failed —
the way Phase 0 ran. No bar was lowered; no number was
invented. The run's own record is `TRACK_7_PHASE_1_RUN.md`.*

## §1 · Per-module verdicts

**M2 — Storyboarding & Interaction Design: PASS.**
Every scene, transition, interaction, responsive and
reduced-motion adaptation, and error-recovery behaviour is
specified in buildable text; the boards are drawn from the
film itself (the drawn sheet's frames are byte-identical to
the sliced film frames; the arc table matches the
frame-stepped contact sheet). One self-contradiction
(F-M2-1: the responsive prose described a small-screen layout
the mandated component does not implement) was corrected
in-loop under a dated note — the machinery clause governs;
the boards are unchanged. Re-review: RESOLVED.

**M4 / Project 2 — GSAP Animation Engineering: PASS.**
Blind runs: scene scrubs forward (14 distinct states) and
reverses to 0%, panels verifiably swap, transitions complete
and refuse a rapid-click burst, timing inside budget on every
run (filed as the cross-run envelope 0.1–2.5 ms), destroy()
leaves zero ScrollTriggers and is idempotent, reduced motion
creates nothing and loses nothing. The animation system
entered the Engine as the module the page itself imports.
The harness was hardened in-loop (state-polling; stagger,
panel-swap, and re-init-after-destroy checks added): 15/15.

**M5 — Media Engineering: PASS.**
Every filed number was independently reproduced by the
Promise axis (bytes exact; PSNR 46.256 vs filed 46.26; SSIM
0.96637 vs filed 0.9664; audio −25.1/−2.6 dB exact; faststart
verified — moov at byte 36; poster SSIM 0.9915 against the
master's 4.9 s frame; captions cover 0–8 s). One
wording/behaviour inconsistency (F-M5-1, "presentation
default" vs the AV1-first ladder) fixed in the record, the
page, and the book. Re-review: RESOLVED. Harness: 8/8.

**M6 / Project 4 — Flow & AI Cinematic Production: NOT MET.**
Breadth ✓ (a second product, end to end) · consistency and
reject-at-the-still ✓ (the rejected v1 is on file; v2's crest
matches; the contact sheet holds identity, no invented text)
· flaw log ✓ · integration ✓ (harness 4/4). Two of the exam's
stated bars fail on the production record's own disclosure:
**F-P4-1** — the required output is footage "produced in
Flow"; the film was produced through the house media
pipeline, and the record states it is "not verifiably a
Flow/Veo production". **F-P4-2** — the bar requires credits
per finished film measured and filed; the pipeline exposes
no per-call credit price, the ledger counts calls, and no
credit figure exists that could be filed without inventing
one. The disclosure is explicit, prominent, and complete —
and it concedes the bars. See §2.

**M7 / Project 3 — Performance, Accessibility & Product
Engineering: PASS (after in-loop fix).**
The ≥240-frame core passed outright on first grading (240/240
frames, budgets, chase, priority preload, error recovery
demonstrated, mobile set, reduced-motion path — all measured;
the components byte-identical to Phase 0's). The bar also
requires the storyboard's callouts, and there the first build
failed blind (F-P3-1, §3). Fixed in-loop and re-verified
fresh: the page's eight boards now match STORYBOARD.md
field-by-field (both re-reviewers diffed them independently),
and the harness parses its expectations from the storyboard
itself — 19/19, six leader tips at 0.0 px. One NEEDS-CHECK
carries to the captain (F-P3-2, §4).

## §2 · The coordinator's M6 ruling (restated for the record)

Flow is a signed-in browser surface on the founder's Google
account; the Mint film was made in a live captain-and-founder
session. This crew run had no route to that surface; the
house's only programmatic door to Google's video generation
is fenced free-tier-only by the Army Router, which does not
serve video generation; no Gemini connector exists in the
house. The film was therefore produced through the house
media pipeline with provenance disclosed, never relabelled.
**The unblock** (either suffices): a captain-run Flow session
on the founder's account producing one film for a Phase 1
product brief, or a founder-approved paid Gemini arrangement
that lifts the free-tier fence for this purpose. Until one
exists, M6's Flow bar cannot be sat by the crew — this is a
route fact, not an effort gap.

## §3 · The fix round (all items re-reviewed fresh)

| Finding | Axis | Disposition |
|---|---|---|
| F-P3-1 listing copy/sides/tip diverged from the boards on all 8 boards; README claimed "exactly"; harness hard-coded the page's titles | Promise (major) + House Rule 4 | Boards transcribed verbatim; tip restored; harness rewritten to parse the contract (19/19). Re-reviews: RESOLVED (both axes, independent diffs 8/8) |
| House Rule 2: P4 + M5 pages carried no on-page honesty fence | House | Fences added to both pages; harnesses re-run green. Re-review: RESOLVED |
| F-M2-1 storyboard responsive prose vs the mandated component | Promise | Corrected under a dated note; boards unchanged. Re-review: RESOLVED (one non-blocking wording residue — the 700–760px band — tightened after re-review) |
| F-M5-1 "presentation default" vs the AV1-first ladder | Promise | Words aligned in record, page, book. Re-review: RESOLVED |
| F-P2-2 / CWV ranges: filed ranges tighter than independent runs reproduce | Promise + House | Envelopes filed across all independent runs, methods named (P2 README; P3 README; book). Re-reviews: RESOLVED |
| Prices provenance (NEEDS-CHECK) | House | Citation filed in the storyboard; re-review verified the named live listing carries the tagline and both ranges verbatim. RESOLVED |
| Stills provenance named by class (NEEDS-CHECK) | House | Record now claims only what the sidecar receipts carry (snapshot id, no model name). Re-review verified against all sidecars. RESOLVED |

Defects D-P1-1/D-P1-2 (the missing scroll kick; the misplaced
`step` key) were found by the builder's own harness work
before grading and are recorded in the run record; Rules
15–18 were earned from this phase and filed as instalment 3
of `crew-skills/cinematic-web-engineering-rules.md`.

## §4 · Carried NEEDS-CHECK (to the captain)

**F-P3-2 — the CWV filing method.** The package's standing
bar files CWV the specimen's way (live PageSpeed + trace).
Project 3's artifact is undeployed — the phase's fences
forbid production work — so a local lab trace was filed,
honestly labelled, inside every bar on four independent runs
(desktop LCP 0.18–0.50 s · CLS 0.003 · interactions 16–64 ms;
mobile LCP 0.12–0.27 s · CLS 0.007 · interactions 24–96 ms).
The question — does a labelled lab trace satisfy the filing
bar for an undeployed study artifact, or does the bar wait
for a deployment the fences currently forbid? — is the
captain's ruling to make; the coordinator does not grade its
own evidence on a point of law. Recommendation on file: the
lab trace + labelling is the only fence-compliant route, and
the PageSpeed filing can be made the day the listing is
deployed in a later phase.

## §5 · The different-family critic (kimi-k3)

The critic refused to sign the exit gate, on the same two
grounds this record rules on (Project 4's bars; passes that
were, at filing, builder-run harnesses — a ground the blind
axes' independent runs have since answered for Projects 2, 3
and the M5 set). Of its eighteen attacks: the evidence-shape
ones that held were adopted (stagger and re-init checks added
to Project 2's harness; envelope filing, Rule 18; the
components' silent-ignore config behaviour carried as an
Engine improvement candidate); several were answered by the
artifacts themselves (the poster and streaming structure it
found unmentioned are in the delivery set and record, and
the Promise axis verified both by measurement); its
0.0 px "formula against formula" attack is noted — the tips
are grounded in the storyboard's measurements on the film's
frames, and the contract test now binds page → storyboard →
film in one chain. Its verdict and this record's agree on the
gate.

## §6 · PHASE 1 EXIT GATE — RULING: **FAIL**

The package's gate (§5): *"Projects 2, 3, and 4 passed blind;
the sequence player, callout system, and frame pipeline enter
the Engine as proven components."*

- **Component entry: SATISFIED.** The animation system and
  the frame pipeline entered the Engine from this phase
  (`track7-artifacts/engine/`), and the Phase 0 player +
  callout system drove Project 3 from configuration alone,
  byte-unmodified.
- **Blind pass: NOT SATISFIED.** Project 2 passed blind.
  Project 3 passed blind after the in-loop fix and fresh
  re-review. **Project 4 did not pass**: two of M6's stated
  bars (Flow provenance; measured credits) are unmet on its
  own record, and no action available to this run could meet
  them (§2).

**The gate therefore FAILS, on Project 4 alone.** Stated
plainly, what this ruling does and does not claim: Phase 1's
study is complete — all five modules produced their required
outputs, and M2, M4, M5 and M7 stand passed blind (M7 with
§4's NEEDS-CHECK carried). The phase does not exit until a
Flow-produced film for a Phase 1 brief passes M6 blind; the
unblock is named in §2 and is outside the crew's power to
execute. No bar was lowered to reach a prettier ruling, and
the one that failed is failed in the open.

*Phase 0 floor-check re-sits were not touched by this phase
and are not its gate, per the package. H-15 rides to M13;
M9's keyboard orbit remains owed by Phase 2's viewer, as
carried.*

---

## CAPTAIN'S RULING on the carried NEEDS-CHECK F-P3-2 (2026-11-23 02:28 CT)

The labelled local lab trace STANDS as the filing for an undeployed study artifact. Four independent runs, all inside the bars, method named on the face of the filing — that is honest evidence, not a dressed-up number. The specimen's way (live PageSpeed on the deployed page) remains the required filing for any page that is LIVE. The two methods are never to be mixed or confused in any record.
