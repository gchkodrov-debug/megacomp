# VERIFY-SOLNIK-DEMO-002 — army answer PCN-20261127-0018 (glm-5.2, Critic T3)

Retrieved from the Communication Engine ledger for the Guardian's independent examination.

---

**PCN-20261127-0017 · first execution · Critic T3**

---

# VERIFY-SOLNIK-DEMO-002 — Independent Verification

**Artifact:** Magical Solnik demo v2 (FVR-36, isolated, not deployed)
**Grade: CONFIRMED**

---

## 1. FIX 1 — radius-true disc exclusion: **sound method, not circular**

The evidence shows two distinct layers of testing, and this is what lifts it above a self-test:

**Reproduced defect case (unit-level).** The static suite constructs the exact v1 failure geometry: a mote whose *centre* sits 0.002 outside the face zone's left edge (fx = 0.428 vs x0 = 0.430) but whose *disc* overlaps it. The suite asserts the centre-only test passes it through (misses it) while the disc test excludes it. The vertical variant (0.002 below the bottom edge) is also tested. A clear mote at maximum radius at (0.08, 0.08) is confirmed *not* excluded — no over-blocking. The zero-radius disc test is confirmed equal to the centre-only test on sampled points. This is a targeted regression: the old bug is reproduced as a failing-then-passing case, not merely asserted away.

**End-to-end inspection (behavioral-level).** The behavioral harness steps one animation frame, records all 70 rendered discs, and tests each against every protected zone using an **independently written** disc-intersection implementation in the harness — not the page's own `discHitsProtected`. Result: 70 discs, 0 intersections. The same check runs under the reduced-motion static field: 70 discs, 0 intersections. Because the harness's geometry code is separate from the page's, a shared-bug false-pass would require both implementations to share the same error — possible but not the circular failure mode the question asks about.

**Enforcement coverage.** Source assertions confirm `discHitsProtected(...)` is called in *both* `drawMotes` and `spawn`, closing the "spawn-only" gap that would otherwise let motes drift in after birth. The crystal-heart protected zone (added in v2) has its own grounded bbox assertion.

**Residual (named, not hidden):** pixel-level rendering of canvas density scaling is not browser-verified; the disc-radius expression `m.r * (canvas.width / 400)` is tested at maximum r = 2.3 but not across canvas-density edge cases. This is disclosed, not concealed.

**Verdict on FIX 1: the method is sound.** Unit regression + independent end-to-end re-implementation, both motion modes. Not a circular self-test.

---

## 2. FIX 2 — animated presence: **supported**

The claim is that Solnik is now the MCR-0150 film itself (muted, looping), with the canonical frame as poster/fallback, and that canon v0.2 features are preserved because they are *in the film*, not drawn by the demo.

**Evidence the film is real and canonical:**
- `<video id="solnikVideo">` with `muted` + `loop` + `playsinline` + `autoplay` + `poster` = canonical frame — asserted in the static suite.
- Both assets present on disk; film copy is byte-identical to the living-universe asset, **md5 `afb7f57815ee8d41ef65f03a9077a1b7`**.
- Behavioral suite: fresh page → `play()` called, video not paused (muted autoplay path). Reduced-motion → `pause()` called once, `play()` never called, autoplay attribute removed — film rests on poster.
- Fallback: canonical frame sits inside the video element as fallback content for non-video browsers.

**Canon preservation — each item is in the film, not fabricated by the page:**
- Face: the film's own; "no face was drawn, generated, or composited by this demo."
- Hands: present and moving in the film; inside particle protected zones with radius-true exclusion.
- Eyes: in the film; inside the face protected zone.
- Wrist ribbons: in the film; the page adds no competing ornament.
- Crystal heart: in the film; the demo's glow is centred on grounded coordinates (.515, .557), pulses with Heart state.

**Voices untouched — verified, not merely asserted:**
- No `<audio>`, no `speechSynthesis`, no `Audio(` anywhere in the file — static suite confirms.
- Film is `muted`; no audio track ever plays. The fence is printed on the page above the speech line.
- Text lines only; no TTS, no lip-sync.

**Verdict on FIX 2: supported.** The film is byte-identical and md5-matched; the mute fence is verified by absence-of-API assertions, not just stated; reduced-motion pauses on the poster as claimed. The canon features are preserved because they are properties of the canonical film, not because the demo recreates them.

---

## 3. Honest limits — disclosure discipline: **strong**

The README and VERIFICATION are disciplined about what is *not* claimed:

- **"No real-time rig"** — explicitly stated that motion is the canonical film on loop; re-posing per state is "future art-pass work, not claimed here." The demo's interactivity *wraps* the film rather than driving it.
- **"No browser on this VM"** — stated twice (README note, VERIFICATION method note). No screenshots are claimed. Widths are verified "by construction + static assertion," and the residual risk ("exact pixel rendering was not visually confirmed") is named explicitly, with the captain-side visual pass identified as "the closing check."
- **No real Heart wiring** — stub is hand-set TEST data, labelled with dashed banner and TEST captions; real prototype is "untouched and unlinked."
- **No deployment** — "$0," no VPS, no public surface.
- **v1 failure history preserved** — the v1 harness artifact (empty speech stub) is recorded rather than airbrushed, and the Guardian's v1 examination is acknowledged as the reason v2 exists.

The one area where disclosure could be tighter: the "70 rendered discs, 0 intersections" claim is strong, but the harness's independent intersection implementation is described only functionally, not shown. Given the md5 match and the unit-level regression, this is a minor gap, not a blocker.

---

## Summary

| Item | Finding |
|---|---|
| FIX 1 (radius-true) | Sound: unit regression + independent end-to-end re-implementation, both motion modes. Not circular. |
| FIX 2 (animated presence) | Supported: md5-matched muted film, poster/fallback, verified voice-lock absence, reduced-motion pause. |
| Honest limits | Strong: no-browser stated, residual risk named, future work not claimed, v1 history preserved. |

**Open item (not a blocker):** captain-side browser visual pass at 1440 / 390 / 320 — explicitly deferred, not concealed. Widths remain construction-verified pending that pass.

---

## DEMO v2 VERIFIED

No blockers. The captain-side browser visual pass remains as the builder disclosed — a closing confirmation, not a gate on the evidence presented here.