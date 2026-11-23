# M14 — WCAG filing for the accessible alternative

**Subject:** `m14-accessible-alternative/index.html` — the
plain-form alternative to Project 9's cinematic launch page.
**Method:** the module's own harness (`verify.mjs`, headless
Chrome, local lab) — every figure below is that run's output,
re-runnable. This is a study filing, not a certification;
no external auditor has seen this page, and the filing does
not claim one has.

## Criterion by criterion

| Criterion | Bar | Evidence (harness) | Result |
|---|---|---|---|
| 1.1.1 Non-text content | the drawing has a full text equivalent | "The watch, in words" — a complete verbal description of the hero SVG (case, strap, dial, hands at ten past ten, subdial, crown) | PASS |
| 1.3.1 Info & relationships | structure in markup, not in looks | one banner / main / contentinfo / labelled nav (counted); specs as real tables with `scope="row"` headers and captions; form fields with real `<label>`s | PASS |
| 1.3.2 / 2.4.3 Meaningful sequence & focus order | DOM order is the reading order | the Tab walk: skip link → 5 act links → name → email → pieces → consent → submit, exactly the visual order | PASS |
| 1.4.3 Contrast (minimum) | 4.5:1 text | computed by the WCAG formula from the declared palette: body 16.24 · muted 8.74 · accent 5.89 · button label 6.30 · error 7.28 | PASS |
| 1.4.11 Non-text contrast | 3:1 for UI boundaries | control borders 5.84:1 | PASS |
| 1.4.4 Resize text | 200% without loss | 590 CSS px at 2× device scale (≈200% zoom): zero horizontal overflow, all content reachable | PASS |
| 2.1.1 Keyboard | everything operable | the full journey — navigation, form, submission — driven by Tab/Enter/Space alone in the harness | PASS |
| 2.2 / 2.3 Timing & motion | nothing timed, nothing flashes | the alternative contains no pacing, no transitions (computed duration 0s on sampled elements), no auto-updating content | PASS |
| 2.4.1 Bypass blocks | a skip link that works | first focusable element; Enter lands focus on `<main>` (verified) | PASS |
| 2.4.6 Headings & labels | descriptive, sequential | one h1; heading levels never skip (machine-checked); every act's heading names its act | PASS |
| 2.4.7 Focus visible | a visible indicator on every stop | all 11 stops of the walk computed `solid / 3px` outlines | PASS |
| 2.5.8 Target size (house bar: stricter) | ≥ 44 px controls | 10 controls measured (a checkbox's target measured as its label row, text included); smallest = 48 px | PASS |
| 3.3.1 Error identification | errors named, fields marked | empty submit: summary in a `role="alert"` region takes focus, lists the validator's own messages, fields carry `aria-invalid` | PASS |
| 4.1.3 Status messages | confirmations announced | the confirmation lives in a `role="status"` region | PASS |

## The reduced-motion path, exercised

Two halves, both run in this module's harness:

1. **The alternative itself is a reduced-motion path** —
   it has no motion to reduce (transitions measured at 0s).
2. **The cinematic page under the browser's
   `prefers-reduced-motion` emulation**: all five acts
   revealed immediately, no element left `inert`, the pacing
   component reporting done without calling it a skip.

Scope honesty: the emulation is the browser's own media
feature, exercised in a headless lab. The house rule stands
that motion verdicts on pages George ships are confirmed on
a real device; for this study artifact the emulated setting
plus the alternative's total absence of motion is the filed
evidence, labelled as such.

## Parity, the exam's other half

The alternative is not a summary. Its harness proves:
every substantive paragraph of the cinematic page is
present (6 of 6, including the confirmation fence); the
edition facts equal the cinematic module's own EDITION
object (300 · $12,400 · cap 3); the form speaks the shared
validator's messages verbatim and takes № 1 from the same
book component. The watch's drawing is the one thing that
cannot be transcribed — so it is *described*, in full, in
"The watch, in words."
