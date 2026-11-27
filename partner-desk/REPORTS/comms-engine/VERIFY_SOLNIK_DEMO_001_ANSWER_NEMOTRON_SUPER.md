# VERIFY-SOLNIK-DEMO-001 — army answer PCN-20261127-0016 (nemotron-3-super, Verifier T3)

Retrieved from the Communication Engine ledger for the Guardian's independent examination.

---

PCN-20261127-0015 — Verifier T3 independent verification of Magical Solnik demo (FVR-36). Idempotency key cited; executed once.

**1. Canon preservation (Solnik Canon v0.2)**
- **Voices untouched — CONFIRMED.** Static suite greps `index.html`: no `<audio>`, no `speechSynthesis`, no `Audio(...)`; page prints the voices fence above the speech line. Evidence: static suite item, 24 PASS.
- **Crystal-heart core position — CONFIRMED.** Grounded centre (0.515, 0.557); static suite asserts glow centred there; HEART state drives brightness/bpm from the stub.
- **Protected-zone containment (face/eyes/hands) — CONFIRMED as code contract.** Static suite asserts each grounded bbox is fully inside its zone (face .430–.590/.440–.570; right hand .345–.435/.585–.680; left hand .580–.670/.585–.680) and `drawMotes` enforces `inProtected(...) continue`.
- **Face original / never a likeness — NEEDS-CHECK.** Supported only by README assertion that `mcr0150-guide-form.jpg` is used unmodified. No hash, asset-integrity, or pixel-diff check in either suite.
- **Amber-gold eye cores — NEEDS-CHECK.** Visual property of the reference frame; no code or static check inspects pixel color or shape.
- **Wrist light-ribbons / four binding signatures — NEEDS-CHECK.** Asserted as present in-frame and named in a signature strip; no suite item verifies the strip or ribbons.
- **Same gold (#E4C65B / #C9A227) — NEEDS-CHECK.** README claims all demo light uses only these two golds; no color-audit item appears in the static suite.
- **Scale honesty (no enlargement, cap 1.35×) — NEEDS-CHECK.** Asserted; no test asserts figure transform stays at 1×.

**2. Particle-protection claim — CONFIRMED (sound, with caveat).** Zones were grounded by visual measurement on the MCR-0150 frame with margin, and the draw loop itself skips motes inside zones (`inProtected(...) continue`), not merely at spawn. Static suite confirms full containment of all three grounded bboxes. Weakness: grounding is the builder’s visual measurement, not machine-verified; no browser pass confirms motes never visually cross the face/eyes/hands.

**3. Heart-link TEST stub — CONFIRMED.** Clearly labelled TEST banner and captions; thresholds run verbatim (QUIET S<1.0, ACTIVE S≥1.0, FLOURISHING S≥45.0 across ≥3 sources); 10 threshold cases pass; `heartState`, `stubBpm`, `glowLevel` are pure functions mirroring the real reducer; `bpm` is null in QUIET. No path inside the artifact presents TEST data as real: every readout is captioned TEST, the panel states the real prototype is not wired, and there is no fetch, shared data, or keys. Residual risk only if the page is copied and edited, which is out of scope.

**4. Honest limits — CONFIRMED (discipline satisfied).** Builder discloses no browser, no screenshots, layout by construction plus static assertions; names residual risk (font metrics, canvas density scaling, exact pixel rendering). The one harness-artifact failure (initial idle speech line) is disclosed, the harness was corrected, the suite re-ran clean, and no page code changed. Remaining for a real-browser pass: visual confirmation of protected zones and core glow at 1440/390/320, MCR-0150 rendering, deep-link behavior, and canvas mote behavior.

DEMO VERIFIED — blockers: real-browser visual pass at 1440/390/320 and asset-integrity/pixel confirmation of the unmodified MCR-0150 face, eyes, hands, and ribbons.