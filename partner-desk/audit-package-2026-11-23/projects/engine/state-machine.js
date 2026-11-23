/* ============================================================
   ENGINE COMPONENT · INTERACTION STATE MACHINE (M12, Phase 3)
   Donated by Projects 8 + 10; used by both, in place.

   Why this exists: interactive presentations fail in the
   seams — a visitor clicks during a transition, reverses a
   drag, opens a panel while another is closing. Ad-hoc pages
   handle those with flags and hope. This component makes the
   interaction an explicit machine instead:

     · every state is named; every event is named;
     · a transition is a table entry or a function
       (context, payload) -> { state?, context?, veto? } — a
       function vetoes by returning { veto: true } (handled=
       false); returning nothing is a handled no-op;
     · an event with no entry in the current state is refused
       (handled=false), never queued, never thrown;
     · interruption is therefore ordinary: a retarget event
       is simply an entry in the 'moving' state as well as in
       'settled', and the machine cannot be left between
       states, because there is no between — the machine is
       always IN a state, and the rendering layer chases the
       machine's context (the Phase 0 chase, applied to
       interaction: the display closes on the target; a new
       target just moves the goal).

   Contract:
     createStateMachine({
       initial: 'settled',
       context: { ... },                       // owned, mutable-by-machine
       states: {
         settled: { on: { GOTO: (ctx, p) => ({ state: 'moving', context: { target: p } }) } },
         moving:  { on: { GOTO: (ctx, p) => ({ context: { target: p } }),
                          SETTLE: () => ({ state: 'settled' }) } },
       },
       onTransition: (from, to, event, context) => {},  // optional observer
     }) -> { state(), context(), send(event, payload) -> bool, can(event) -> bool }

   State is inspectable (Rule 12): state() and context()
   return the machine's own values — readouts print these,
   never a parallel copy (Rule 14).
   ============================================================ */

export function createStateMachine(def) {
  if (!def || typeof def !== 'object') throw new TypeError('state-machine: a definition object is required');
  if (!def.states || typeof def.states !== 'object') throw new TypeError('state-machine: states are required');
  if (!def.states[def.initial]) throw new TypeError(`state-machine: initial state "${def.initial}" is not in states`);
  let state = def.initial;
  const context = { ...(def.context || {}) };
  const onTransition = typeof def.onTransition === 'function' ? def.onTransition : null;

  function send(event, payload) {
    const node = def.states[state];
    const fn = node && node.on ? node.on[event] : undefined;
    if (typeof fn !== 'function') return false;
    const out = fn(context, payload) || {};
    if (out.veto) return false;
    const from = state;
    if (out.context) Object.assign(context, out.context);
    if (out.state) {
      if (!def.states[out.state]) throw new TypeError(`state-machine: transition to unknown state "${out.state}"`);
      state = out.state;
    }
    if (onTransition) onTransition(from, state, event, context);
    return true;
  }

  return {
    send,
    can: (event) => {
      const node = def.states[state];
      return !!(node && node.on && typeof node.on[event] === 'function');
    },
    state: () => state,
    context: () => context,
  };
}
