# #142 provadia_qc.py v2 — CAPTAIN VERIFICATION (2026-11-28 ~00:35 CT)

Gemini delivered provadia_qc.py v2 + test_provadia_qc_v2.py in his live chat (00:18 CT).
The captain dropped both into next-build/ verbatim and ran everything himself.

- His suite: 3/3 OK (before and after the adapter patches).
- REAL RUN vs assembly/manifest_v2.json + assembly/SOUND_REGISTER_2026-11-28.json, repo-root films/:
  checked 392 · accepted 389 · blocked 3 (PROV-VID-0161/0162/0163 = ecosystem-orrery-4layer-v1/v2/v3)
  · warnings 23 · errors 0 · exit 0 · passed=True. Every SHA-256 verified against live bytes.
- Adapter patches (captain-applied, his logic untouched, relay record):
  (a) sound-state normalizer — his ALLOWED set spoke ACCEPTED/FAILED-WHISPER; the locked
      #140/#142 contract vocabulary is passed/fixed/whisper-unfixed/unknown.
  (b) register rows key "rows" (he read "films"); clip field "clipping_risk" (he read "clip_risk").

## CLIP-RISK EXAMINATION (Guardian's requirement) — COMPLETE
Sample-level examination of all 24 flagged films (assembly/CLIP_RISK_EXAMINATION_2026-11-28.json):
19 clean · 4 hot-peaks-clean (one isolated ceiling sample each) · 1 TRUE CLIPPING:
entry-f2-take2 (15 consecutive samples at ceiling) — REPAIRED via ffmpeg adeclip (raw kept):
ceiling run 15 -> 0, mean -14.3 dB, max -0.4 dB; re-hashed; register + manifest_v2 updated
(its sound_state now fixed/accepted). All 24 clear for final cinematic acceptance.

## ORRERY RE-FIRE ROUTE
The 3 blocked Orrery takes re-fire on the Gemini-app benches (Omni, zero Flow credits)
in tonight's ~01:40 CT refill — standing production, no new authorization.
