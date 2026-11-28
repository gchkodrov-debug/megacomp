# GEMINI #140/#142 INTERFACE CONTRACT — LOCKED 2026-11-27 22:21 CT (his reply, captain's desk copy)

Delivered by Gemini in his wake-up chat after receiving verify.py + asset_selection.py in full. This is the acceptance contract the captain tests #140 against on arrival.

- Normalized manifest record (feeds asset_selection.select()): deterministic permanent id (PROV-VID-... / PROV-IMG-...); status in {accepted, pending, rejected, unverified} — only accepted passes; path; sha256 = lowercase 64-char hex computed from the physical file via hashlib.sha256 — a missing file forces sha256:'' and blocks eligibility; kind strictly film|image; legacy fields preserved.
- sound_state in {passed, fixed, whisper-unfixed, unknown}; sound_gate mapping: passed->passed; fixed->passed ONLY if sound.fixed is true AND sound.mean_db is the verified post-fix measurement within gate bounds, else failed; whisper-unfixed->failed; unknown/missing->unknown (blocks placement).
- meta.consumer_policy: index_all: true, render_eligible_only: true.
- Component-register schema defined for verify.verify() consumption.
- #142 provadia_qc.py v2 will wrap/extend asset_selection.select() + physical disk verification (re-hash path vs sha256; bytes == os.path.getsize(path); sound-gate proof rules; verify.verify()).
- His closing line: 'Building #140 (Master Register v1.1 + deterministic Manifest Refresh builder + executable tests) now for delivery well ahead of the 10:10 CT deadline.'
