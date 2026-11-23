# TRACK 7 · PHASE 0 — FLOOR-CHECK RECORDS

*Opened 2026-11-23 in the Phase 0 opening run. The instrument is
the A-to-Z program's floor (A_TO_Z_FOUNDATIONS_AND_GAPS.md Ch. 1–2),
adopted for Track 7 Phase 0 per the launch package's precedent rule:
the package's Phase 0 names M0+M1; the A-to-Z Phase 0 names the floor
checks that make "the floor has never been examined" false. Both
stand; the ambiguity and the working treatment are flagged in
`TRACK_7_PHASE_0_RUN.md`.*

**Honesty rule for this file:** a check that was not run is recorded
as NOT RUN. Tracks 1–6 graduation is **not** a floor check and is
never counted as one. A self-administered coursework check is
labelled as such — it is evidence of work, not a blind grade.

---

## THE INSTRUMENT

**Check F1 — Foundations Ch. 1 reproduce (per seat).** Given a page
the seat has never seen, write one sentence each for ten of the
twenty Level-0 concepts as they appear on that page. Checked against
the page, not against the chapter text.

**Check F2 — Foundations Ch. 2 reproduce assignments (per seat).**
1. *The no-AI page:* a complete responsive page (header, three
   sections, a form that validates), written without generated
   code; checked at three widths; the form refuses bad input with
   a readable message. (Track 7 reading, flagged for the captain:
   for an AI crew, "without generated code" is administered as
   *written from fundamentals — no framework, no code-generation
   pipeline, no copied template.* The assignment's git clause
   cannot be satisfied in this folder — it is not a git
   repository, verified in the opening run — so the artifact is
   filed here instead, and the gap is recorded, not hidden.)
2. *The honest fetch:* a script that prints the status before the
   body and handles success / 404 / network-down as three named
   outcomes; all three paths actually run, on record.
3. *The state file:* the seen-set pattern on 10,000 IDs across two
   runs; the second run provably processes zero already-seen IDs.

---

## PER-SEAT RECORDS

Seats are the roster's transmissions and the principal bench seats
named in A_TO_Z_SPECIALIST_ROSTER.md. The opening run administered
the instrument to **one seat — its own**. Every other seat is
scheduled as its chair's Phase 0 objective runs (A-to-Z weekly
shape: one objective per chair per week, blind grade at week's end).

| Seat | F1 (Ch. 1 reproduce) | F2-1 (no-AI page) | F2-2 (honest fetch) | F2-3 (state file) |
|---|---|---|---|---|
| **Opening seat — captain's crew (Muse), this run** | ✅ RUN — self-administered coursework, checked against the fetched page (evidence §A below) | ✅ RUN — the M0 explainer page is the artifact (from-fundamentals reading; verification §B) | ✅ RUN — all three paths, outputs §B | ✅ RUN — 10,000 → 0, outputs §B |
| Claude Code (transmission) | ❌ RUN — FAIL: trap concept "Programming" asserted as taught; "source code" missing (§C) | ✅ RUN — pass | ✅ RUN — pass | ✅ RUN — pass |
| Pi (transmission) | ✅ RUN — pass, 10/10 | ✅ RUN — pass | ✅ RUN — pass | ✅ RUN — pass |
| Codex (transmission) | ❌ RUN — FAIL: trap "Programming" asserted; "source code" missing (§C) | ❌ RUN — FAIL: email pattern double-escaped in the delivered file, valid addresses refused (§C) | ✅ RUN — pass | ✅ RUN — pass |
| OpenCode (transmission) | ✅ RUN — pass, 10/10 | ✅ RUN — pass | ✅ RUN — pass | ✅ RUN — pass |
| OpenClaw (transmission) | ✅ RUN — pass, 10/10 | ✅ RUN — pass | ✅ RUN — pass | ✅ RUN — pass |
| Hermes (transmission, half strength) | ❌ RUN — FAIL: trap "Programming" asserted; "a programming language" missing (§C) | ❌ RUN — FAIL: malformed email never reaches #form-error (native validation intercepts, no novalidate) (§C) | ✅ RUN — pass | ✅ RUN — pass |
| kimi-k2.7-code (bench) | ✅ RUN — pass, 10/10 | ✅ RUN — pass | ✅ RUN — pass | ❌ RUN — FAIL: state script builds its temp path wrong (`/tmp/tmp/…`), crashes ENOENT (§C) |
| glm-5.3 (bench) | ✅ RUN — pass, 10/10 | ✅ RUN — pass | ✅ RUN — pass | ✅ RUN — pass |
| kimi-k3 (bench) | ✅ RUN — pass, 10/10 | ✅ RUN — pass | ✅ RUN — pass | ✅ RUN — pass |
| kimi-k2.6 (bench) | ✅ RUN — pass, 10/10 | ✅ RUN — pass | ✅ RUN — pass | ✅ RUN — pass |
| deepseek-v4-pro (direct) | ✅ RUN — pass, 9/10 with a noted format deviation (§C) | ❌ RUN — FAIL: reply truncated mid-script at 6,674 bytes, page incomplete as delivered (§C) | ✅ RUN — pass | ✅ RUN — pass |
| minimax-m3 (bench) | ❌ RUN — FAIL: trap "Programming" asserted as taught (§C) | ✅ RUN — pass | ✅ RUN — pass | ✅ RUN — pass |
| mistral-large-4 (bench) | ✅ RUN — pass, 10/10 | ✅ RUN — pass | ✅ RUN — pass (on re-ask; first attempt died as a door error, `HTTP 0`) | ✅ RUN — pass |
| GPT flagship (OpenAI door) | ✅ RUN — pass, 10/10 | ✅ RUN — pass | ✅ RUN — pass | ✅ RUN — pass |
| Grok (xAI door) | ❌ RUN — FAIL: trap "Programming" asserted as taught (§C) | ❌ RUN — FAIL: malformed email never reaches #form-error (required + type=email, no novalidate) (§C) | ✅ RUN — pass | ✅ RUN — pass |
| Gemini free tier (fenced: research drafts only) | NOT RUN — fenced: the router limits the free tier to research drafts; a floor check is not a research draft. Recorded as fenced, not failed. | NOT RUN — fenced | NOT RUN — fenced | NOT RUN — fenced |

---

## §A — F1 EVIDENCE (opening seat)

**The unseen page:** https://threejs.org — fetched fresh in this
run (crawl 2026-11-23 05:26 UTC) and checked against the fetched
page itself. Ten of the twenty concepts, one sentence each:

1. **Software (#2)** — The page's whole cargo is three.js r187: pure
   software, a body of instructions other programs include and run.
2. **A website (#4)** — This homepage is files — a document plus
   hundreds of project images under `threejs.org/files/projects/` —
   that my browser assembled into the page I read.
3. **The internet (#5)** — Every thumbnail and link is an address;
   loading the page was my machine asking other machines for files,
   by address, and being answered.
4. **A browser (#6)** — The page links a "devtools" extension and a
   browser-based editor: both exist because the browser is the
   program that runs pages and inspects them.
5. **A domain / hosting (#8)** — The gallery's projects live under
   `*.github.io`, `*.vercel.app`, and `*.netlify.app` addresses —
   shared names pointing at hosting shelves the projects rent.
6. **Files and folders (#9)** — The gallery images sit in one folder
   path, `/files/projects/`, under numbered file names: state kept
   as files, exactly as this university keeps its books.
7. **Source code (#10)** — The version label "r187" links straight
   to github.com: the human-readable source is where the product
   lives.
8. **A programming language (#11)** — The page's title names it:
   this is a *JavaScript* 3D library — one language, and an
   ecosystem of work written in it.
9. **An API (#13)** — The "documentation" link is the library's
   published contract: the named functions other programs are
   allowed to call, and how.
10. **2D vs 3D graphics (#14)** — Every gallery thumbnail is a flat
    2D JPG — pixels — standing in for the real-time 3D scene it
    links to: a picture of a world is not the world.

*Status: self-administered coursework check, performed and checked
against the fetched page in this run. It is NOT a blind grade; the
blind floor grade is a separate relay event under the captain.*

## §B — F2 EVIDENCE (opening seat)

Artifacts in `track7-artifacts/floor-checks/`; the M0 page in
`track7-artifacts/m0-how-the-web-works/`. All outputs below are
verbatim from the run (2026-11-23).

**F2-2 — honest fetch** (`honest-fetch.mjs`, Node 24, local server
on the artifact itself):
- Success: `STATUS 200 OK` printed before the body → `OUTCOME OK`,
  exit 0.
- 404: `STATUS 404 File not found` → `OUTCOME NOT_FOUND — the
  server answered; the thing is not there`, exit 2.
- Network down (dead port): `OUTCOME NETWORK_DOWN — no answer at
  all (ECONNREFUSED)`, exit 3.

**F2-3 — state file** (`state-file.mjs`, atomic temp + rename):
- Run 1: `processed=10000 already_seen=0 state_size=10000`
- Run 2: `processed=0 already_seen=10000 state_size=10000` — the
  second run provably processed zero already-seen IDs.

**F2-1 — the no-AI page (from-fundamentals reading):** the M0
explainer page — semantic HTML, one hand-written stylesheet,
hand-written JavaScript; no framework, no template, no
code-generation pipeline. (Its form-equivalent interactive check
is the teach-back quiz, which validates answers and answers back
with explanations; the page's own render verification — three
widths is a *responsive* claim checked at 1280px in the opening
run's headless render, with the CSS grid collapsing to one column
below 760px by construction — is recorded in
`TRACK_7_PHASE_0_RUN.md`. The three-width render check and the
form-validation clause in their exact A-to-Z form remain open
items, recorded in the run note, not silently approximated.)

---

## §C — GRADING-ROUND EVIDENCE (2026-11-23, the captain's grading run)

The 16 remaining seats were administered in the Phase 0 grading
run. Full record: `TRACK_7_PHASE_0_GRADING_RECORD.md`. Raw replies,
produced files, and per-seat machine grades live in
`track7-artifacts/grading-phase0/seats/<seat>/` (`raw-*.txt` for the
API seats, `work/` for the transmissions, `grade.json` +
`f1-grade.json` for every seat).

**The instrument as administered.** One unseen page for every seat:
MDN's "How the web works" (fetched fresh 2026-11-23 06:40 UTC,
filed at `grading-phase0/prompts/f1-unseen-page.txt`). The captain's
answer key, written from the page before any seat ran: exactly ten
of the twenty concepts genuinely appear — #1 computer, #2
software/hardware, #4 website, #5 internet, #6 browser, #7 server,
#8 domain/hosting, #9 files/folders, #10 source code, #11 a
programming language. The near-duplicate pair #3 "programming" /
#11 "a programming language" is the check's sharpest edge: the page
teaches the languages, never "programming" as a thing. **Five seats
took the trap** (Claude Code, Codex, Hermes, minimax-m3, Grok) —
each folded the languages into an entry headed "Programming" and
asserted it as taught. F2 checks were graded by running the
delivered artifacts (`grading-phase0/grade-seats.mjs`): F2-2
against a local server (200 / 404 / dead port), F2-3 across two
real runs of 10,000 IDs, F2-1 by rendering the delivered page in
headless Chrome (structure, three widths, a bad submit and a good
submit through the uniform interface: form#signup, #name, #email,
#form-error, #form-success).

**Failure mechanisms, on record (each verified, none assumed):**
- *F2-1, native-validation family (Grok, Hermes):* with a
  `type=email` field and no `novalidate`, a malformed email is
  stopped by the browser's own validation before the submit event
  fires — the custom message never lands in `#form-error`, which
  the uniform interface requires. Verified with real button clicks,
  not only `requestSubmit()`.
- *F2-1, Codex:* the delivered page's email regex is double-escaped
  (`\\s`, `\\.` in the file), so it demands a literal backslash and
  refuses valid addresses.
- *F2-1, deepseek-v4-pro:* the reply itself is truncated mid-script
  (6,674 bytes, fence never closed) — the page as delivered is
  incomplete.
- *F2-3, kimi-k2.7-code:* the state script composes its temp path
  as `<dir>/tmp/<file>.tmp` and crashes with ENOENT on any state
  path; both graded runs produced no output.
- *F1, deepseek-v4-pro (pass with note):* nine concepts correct; a
  tenth entry names the trap "database" only to state truthfully
  that the page does not mention it; concept #2 missed. The
  discrimination the check tests was demonstrated.

**Transmission seat history (apparatus, kept honest):** every
transmission first failed under its default configuration (Claude
Code "not logged in", Pi a 401 on a placeholder key, Codex a missing
`BENCH_API_KEY` then a read-only sandbox, OpenClaw a bench route
timeout, OpenCode a provider error on the direct route, Hermes the
only one that ran first try). All six were then run through the
house routes in ARMY_ROUTER.md (isolated HOMEs, `run_with_bench.py`,
the bench bridge on :11435, Codex with `--sandbox workspace-write`)
and produced the graded artifacts. Pi and Claude Code sessions were
killed at the 900s window after writing all four files; the files
are what was graded. OpenCode's graded files come from its third
attempt (bench-bridge config); its first attempt timed out at 600s
after also writing files.

---

*Records continue as each chair's Phase 0 objective runs. A row
changes only when its check has actually been run and its evidence
filed here.*
