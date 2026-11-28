# GEMINI QUEUE #141 — ADDENDUM: THE HEART'S FOUR ENGINEERING REQUIREMENTS
Filed by the Captain, 2026-11-27 ~20:06 CT · Origin: Guardian PCN-20261128-0006, relayed by the founder, adjudicated by the captain (PCN-0124)
Binding on the Living Heart Specification v0.3 draft (#141) and on every later Heart build.

The Guardian's four requirements — each already founded law (FVR-35) and already prototype behavior. The v0.3 spec must carry each one **with the test that proves it**:

1. **Genuine activity only.** The Heart responds to real civilization events and nothing else. (FVR-35: "It never pretends." Prototype: pulse is a pure function of the signed event log's thresholds.) *v0.3 must name the test: no event in the log → the Heart reads QUIET.*
2. **Live vs offline, distinguished.** The Heart's presented state must say honestly whether the civilization is live or quiet/offline — a still Heart is a truthful state, never a defect to be painted over. *v0.3 must name the test: with the event source silent, the read model presents the quiet state as itself.*
3. **No duplicate events.** One real event, one heartbeat. (Prototype: Ed25519/JCS signed envelopes, hash-chained append-only log — a replayed envelope is detectable and rejected.) *v0.3 must name the test: the same envelope submitted twice changes the pulse zero times the second time.*
4. **Never manufacture fake activity.** No simulated events, no seeded numbers, no prerecorded pulse — in the spec, in the prototype, in any demo. (The demo's TEST-stub Heart panel is banner-labelled for exactly this reason.) *v0.3 must name the test: the document contains no mechanism by which an event can enter the log without its signature and source.*

Captain's note: these are conformance requirements, not new design — if your v0.3 draft finds any of the four NOT fully provable against the prototype's test record (12 PASS · 0 FAIL · T12 out-of-scope), say so in the draft as a named gap. A named gap is a deliverable; a silent one is a defect.
