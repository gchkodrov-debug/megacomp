/* ============================================================
   ENGINE COMPONENT · RESERVATION BOOK (M12/M14, Phase 3)
   Donated by Project 9; shared, in place, by its accessible
   alternative (M14) — one validator, one book, two doors.

   A launch that takes reservations needs three things to be
   exactly the same on every surface that offers them:
     · the edition facts (the caller's object, never copied);
     · the validation (name, email shape, the per-person cap,
       and any consent the surface requires);
     · the numbering (a sequence, printed from the book's
       own count — Rule 14).

   validate(values) is pure. record(values) validates and,
   only when clean, appends and returns the numbered
   confirmation line built from the edition's own figures.
   DOM-free; unit-testable in Node (the M16 harness does).
   ============================================================ */

export function createReserveBook({ edition } = {}) {
  if (!edition || typeof edition.perPersonCap !== 'number') {
    throw new TypeError('reserve-book: an edition with a perPersonCap is required');
  }
  const entries = [];

  function validate(values) {
    const errors = {};
    const name = String((values && values.name) ?? '').trim();
    const email = String((values && values.email) ?? '').trim();
    const pieces = Number(values && values.pieces);
    if (name.length < 2) errors.name = 'Please give your name (at least two characters).';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      errors.email = 'Please give an email address in the usual shape — name@host.domain.';
    }
    if (!Number.isInteger(pieces) || pieces < 1 || pieces > edition.perPersonCap) {
      errors.pieces = `Pieces must be a whole number from 1 to ${edition.perPersonCap} (the per-person cap).`;
    }
    if (!values || values.consent !== true) {
      errors.consent = 'Please tick the understanding box — it is the honest heart of this page.';
    }
    return { ok: Object.keys(errors).length === 0, errors };
  }

  function record(values) {
    const { ok, errors } = validate(values);
    if (!ok) return { ok: false, errors };
    const entry = {
      number: entries.length + 1,
      name: String(values.name).trim(),
      pieces: Number(values.pieces),
    };
    entries.push(entry);
    return {
      ok: true,
      number: entry.number,
      confirmation: `Reservation № ${entry.number} — ${entry.name}, ${entry.pieces} piece${entry.pieces > 1 ? 's' : ''} of the ${edition.pieces}, at $${edition.price.toLocaleString('en-US')} each, as the fiction prices them.`,
    };
  }

  return {
    validate,
    record,
    count: () => entries.length,
    edition,
  };
}
