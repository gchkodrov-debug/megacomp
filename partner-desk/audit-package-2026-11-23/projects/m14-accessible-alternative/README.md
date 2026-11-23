# M14 — Accessible Alternative Experience

**The Meridian №1 launch, in plain form.** The complete
alternative to Project 9's cinematic page: the same words,
the same facts, the same reservation book — with no pacing,
no reveal, no motion, and nothing hidden. It is graded as a
full presentation in its own right, not as a fallback:
`WCAG_FILING.md` is its criterion-by-criterion record, and
`verify.mjs` (15/15) is the instrument that produced every
figure in it.

## How parity is kept honest

- **Facts by reference, not by copy**: the page's script
  imports the EDITION object from the cinematic page's own
  module and the reservation book from the Engine. The
  static text is checked against that object by the harness
  — edit the edition in one place and the gate catches the
  other page drifting.
- **Copy by transcription**: every substantive paragraph of
  the cinematic page is present verbatim (the harness
  compares them). The one thing that cannot be transcribed
  — the hero drawing — is described in full in "The watch,
  in words."
- **The same book**: identical validator, identical error
  words, identical numbering, reached by a plainer door.
  To share it, Project 9's validator moved into the Engine
  (`engine/launch/reserve-book.js`) during this module —
  the alternative is why the component exists.

## What the build itself taught

Three of the harness's first fifteen checks failed, and all
three failures were in the instrument, not the page:
`innerText` hides a `hidden` confirmation block that
`textContent` correctly counts as present; a checkbox's
real target is its label row, not its 24 px box; and an
"empty form" in a browser always has its select's default
value, so the expected error set must be computed from the
browser's actual values. Each is filed in the run record —
an accessibility harness that mis-measures teaches its
author to measure the experience, not the shortcut.
