# ⭐⭐ GEMINI #120 — VERDICT: BLESSED WITH CHANGES
### Ruled 2026-11-25 ~15:49 CT · delivered by the founder from his own Gemini chat (Account 1, Thinking level HIGH, at the captain's knock) · filed verbatim by the captain

**VERDICT: BLESSED WITH CHANGES**

**Loop strategy — Phase-offset (and matched A→A keyframes), NOT boomerang.**
Machinery (gears, escapements), portals (radial/vortex flow), and environmental drift (rising dust, heat shimmer) all carry directional vectors. Boomeranging reverses physical causality and produces an obvious rewind hitch at the turnaround frame. Use matched start/end keyframes (A→A) for single-clip loops and 50% phase-offset alpha/luma crossfades for multi-clip blends. Reserve boomerang strictly for symmetric ambient light or micro-breathing pulses.

**Durations — Cut the 47-second scenery master.**
At 30 fps, 47 seconds is 1,410 frames — nearly 6× the Universal Presentation Engine v1 target (~240 frames / 200-frame strict floor) — and assembling it from six 8-second Flow clips introduces five seam/drift boundaries while blowing mobile byte-weight budgets (even with 700px / Save-Data frame-subsetting). Cut the scenery master to one 8-second A→A clip (~240 frames at 30 fps) — or at most 15–16 seconds (2 clips, single crossfade) — and let layered phase-offset compositing create long-horizon variation in-engine.

**Credits — 54 credits for Jobs 1–4 is sane. Approved.**
Against the ~19,000-credit reserve and the December 5 Veo 3.1 removal (10 days away), 54 credits (~0.28% of pool) is negligible burn to open production. Do not stall the line over it — just enforce matched start/end keyframe pairs on Jobs 1–4 so every generation yields a usable loop.

**Engine clip-killers — Audit against three hard boundaries.**
The full Commission #120 text is not visible in this thread, so confirm the sheet does not allow any of these three failure modes before rendering:
- **Unanchored camera drift:** Any unintended push, pan, or lens breathe breaks spatial registration against overlay layers and the Engine's 0.1 requestAnimationFrame chase curve.
- **Sparse keyframe / heavy B-frame encoding:** Clips must scrub cleanly frame-by-frame without decode stalls when subsetted on mobile.
- **Pre-baked foreground/background lock:** Keep active machinery and portals isolated from scenery masters rather than baking them into one rigid plate.

**Synchronized layer restart threshold — 0.75s is too loose.**
At 30 fps, 0.75 seconds is 22–23 frames of visible phase drift — coupled layers (portal core + rim glow, gear + linkage) will visibly stutter-step on reset.
- **Coupled layers:** Lock to ≤ 1 frame (~33 ms / 0.033s) driven off a single master Engine clock, never independent timers.
- **Uncoupled ambient layers:** Do not synchronize restarts at all; assign coprime durations (e.g., 8.0s and 5.3s) so layers never reset together.

**Closing order:** "Lock in the loop, duration (8s–16s), and ≤ 1 frame sync edits, then open Jobs 1–4 immediately."

---

## CAPTAIN'S APPLICATION (same hour, 2026-11-25)
- **Founder Video Queue revised** under this verdict: Job 1 is now THE scenery master (one 8s A→A clip, still in BOTH Start and End slots, locked camera incl. no lens breathe); Jobs 2–4 carry matched-keyframe enforcement; the three clip-killer audits are the landing checklist for every returned clip (camera registration · keyframe scrub via ffprobe · layer isolation).
- **Engine change tickets opened** (specimen, local — relay build): ET-120-A coupled layers to a single master clock at ≤1-frame lock · ET-120-B uncoupled ambient layers to coprime durations, sync management removed · ET-120-C scenery cycle configs (Mint 47s / Record 52s targets) superseded by clip-true durations (8s master, ≤16s two-clip). The interim boomerang loops are retired as masters per this verdict (ambient light/micro-breathing excepted).
- **Production gate: OPEN.** Jobs 1–4 open immediately, founder's hands, Account 2.
