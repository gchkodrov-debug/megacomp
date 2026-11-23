/* ============================================================
   ENGINE COMPONENT · LAUNCH PACING (M12, Phase 3)
   Donated by Project 9 (the luxury product-launch site).

   A launch page reveals itself in acts. The pacing is a
   published schedule — steps with ids and times — executed
   by this component and by nothing else:

     · start() arms the schedule; each step fires once, in
       schedule order for timed steps;
     · reveal(id) fires one pending step early (the visitor
       scrolled to it — pacing must never gate content);
     · skip() fires every remaining step at once, in order,
       and remembers that it was a skip;
     · under reduced motion, start() fires everything at
       once: the end state is the only state;
     · state() reports what has fired — readouts and
       harnesses read the component, never a parallel flag
       (Rules 12 + 14).

   DOM-free: the page's onStep paints. Unit-testable in Node
   (the M16 harness does exactly that).
   ============================================================ */

export function createPacing({ steps, reducedMotion = false, onStep = null, onDone = null } = {}) {
  if (!Array.isArray(steps) || steps.length === 0) {
    throw new TypeError('pacing: steps (a non-empty array) are required');
  }
  const seen = new Set();
  for (const s of steps) {
    if (!s || typeof s.id !== 'string' || typeof s.at !== 'number' || s.at < 0) {
      throw new TypeError('pacing: each step needs a string id and a time at >= 0');
    }
    if (seen.has(s.id)) throw new TypeError(`pacing: duplicate step id "${s.id}"`);
    seen.add(s.id);
  }
  const fired = [];
  const firedSet = new Set();
  let started = false;
  let skipped = false;
  let timers = [];

  function fire(step) {
    if (firedSet.has(step.id)) return false;
    firedSet.add(step.id);
    fired.push(step.id);
    if (onStep) onStep(step.id);
    if (firedSet.size === steps.length) {
      timers.forEach(clearTimeout);
      timers = [];
      if (onDone) onDone();
    }
    return true;
  }

  return {
    start() {
      if (started) return false;
      started = true;
      if (reducedMotion) {
        /* The end state is the only state. Not a "skip" —
           the visitor never asked; the schedule collapsed
           itself, and state() says exactly that much. */
        for (const s of steps) fire(s);
        return true;
      }
      for (const s of steps) {
        if (s.at <= 0) fire(s);
        else timers.push(setTimeout(() => fire(s), s.at));
      }
      return true;
    },
    reveal(id) {
      const step = steps.find((s) => s.id === id);
      return step ? fire(step) : false;
    },
    skip() {
      if (!started || firedSet.size === steps.length) return false;
      skipped = true;
      for (const s of steps) fire(s);
      return true;
    },
    state() {
      return {
        started,
        done: firedSet.size === steps.length,
        skipped,
        fired: [...fired],
        pending: steps.filter((s) => !firedSet.has(s.id)).map((s) => s.id),
      };
    },
  };
}
