# AI STUDIO BUILD EXPERIMENT — CAPTAIN'S INDEPENDENT ACCEPTANCE
### 2026-11-28 ~00:41–01:05 CT · Artifact: provadia-sound-gate-viewer ("PROVADIA Manifest & Sound Gate Inspector")
### Builder: Gemini (prompt + plan) · Built in: Google AI Studio Build (Account 1) · Examiner: the Captain, from the exported artifact

## What was delivered
- AI Studio build completed from Gemini's exact prompt; preview demonstrated the fixture gate live (6 checked / 4 accepted / 2 blocked / 1 clip warning — matching the fixture's design).
- Export: ZIP (104,070 B) downloaded and unzipped captain-side to `next-build/tools/sound-gate-inspector/` — full Vite + React + TypeScript source, 21 files.

## The two flags from the build session — RESOLVED
1. **"A paid Gemini API key was selected" notice** — an AI Studio project-level warning. The application itself makes **zero API calls**: a full-source grep finds no `@google/genai` import, no `fetch(`, no API-key reference anywhere in `src/`. After hardening (below), the SDK is not even installed.
2. **metadata.json declared `MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API`** — template metadata, not code. The false claim was removed in hardening.

## Captain's hardening patches (named, per the export plan's own hardening step)
- (a) Stripped four unused template dependencies the export injected — `@google/genai`, `express`, `dotenv`, `motion` — plus `@types/express`. Remaining dependencies are exactly what the source imports.
- (b) `esbuild` pin `^0.25.0` → `^0.28.0`: the export AS SHIPPED did not install (`npm install` failed ERESOLVE — vite 8 requires esbuild ^0.27/^0.28 as its peer). Recorded as a defect of the raw export.
- (c) `package-lock.json` generated — `npm ci` is now reproducible. (The export carried only a `bun.lock`.)

## Acceptance runs (captain, from the artifact)
- `npm install` — 56 packages, clean (post-hardening).
- `npm run build` — PASS (dist produced).
- `npm run lint` (`tsc --noEmit`) — PASS, zero type errors.
- **Executable tests** — the export contained NO test suite (Gemini's plan named one as a hardening deliverable); the captain authored `tests/soundgate.test.ts` in that step. **10/10 PASS**, including the decisive parity check: the application's own normalizer, run against the REAL production files (`assembly/manifest_v2.json` + `assembly/SOUND_REGISTER_2026-11-28.json`), reproduces provadia_qc.py v2's verdict **exactly — 392 checked / 389 accepted / 3 blocked / 3 whispers / 23 clip-risk warnings**. The fixture also reproduces the demonstrated preview counts (6/4/2/1).

## Verdict vs the Guardian's five-point contract
1. Actual source code — **MET**. 2. Working functionality — **MET** (preview + build + real-data parity). 3. Reproducible installation — **MET AFTER HARDENING** (raw export failed install; the failure and the fix are both on this record). 4. Executable tests — **MET** (captain-authored in the plan's hardening step; 10/10). 5. Independent verification — **MET** (this run). No paid services in the artifact; no personal-data access; no hidden dependencies after the strip.

**ACCEPTED — the bounded experiment PASSES independent acceptance.** AI Studio Build is a proven manufacturing capability for this class of self-contained application, with two standing caveats: (1) every export passes the hardening step (strip template deps · fix pins · generate lockfile · add executable tests) before it counts; (2) per the Guardian's rule, a SECOND, more sophisticated build examination is required before this lane scales.
