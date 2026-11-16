STATUS: DONE — Seven Drawdown Guardian v2.1 arithmetic QA vectors delivered for captain + DeepSeek independent execution. These are hand-calculated expected values, NOT a claim of browser-executed tests. Errata v2.2 applies.

Defaults unless overridden: S=100000, B=100000, E blank, D=100000, daily 5% of S, daily floor from D, total 10% of S static, counting EOD (W=B), Free. All amounts USD. Breach criterion per implementation: room <= 0.

CASE A — SIZE BASIS INDEPENDENCE
S=100000, D=90000, B=90000, daily=5%, floor basis D, total static 10% S.
A1 daily size basis S: size=5000; daily floor=85000; daily room=5000; total floor=90000; total room=0; REAL ROOM=0; status BREACHED — total floor exceeded.
A2 daily size basis floor (D): size=4500; daily floor=85500; daily room=4500; total floor=90000; total room=0; REAL ROOM=0; status BREACHED — total floor exceeded.
Critical difference: daily floor differs by $500 even though total binds.

CASE B — NEGATIVE USED PERCENT IN PROFIT
S=100000, D=100000, B=105000, daily 5% S, total 10% S.
W=105000; daily floor=95000; total floor=90000; daily room=10000; total room=15000; real room=10000; daily used=(100000-105000)/5000*100=-100.0%; total used=(100000-105000)/10000*100=-50.0%; status WITHIN LIMITS.

CASE C — BOTH FLOORS CROSSED
S=100000, D=100000, B=89000, daily 5% S, total 10% S.
daily floor=95000, total floor=90000; daily room=-6000; total room=-1000; REAL ROOM=-6000; status BREACHED — both daily and total floors exceeded. Do not attribute breach only to min room.

CASE D — TRAILING PEAK BELOW LIMIT SIZE / NEGATIVE FLOOR
S=100000, B=7000, D=8000, P=8000, daily 5% S, total FIXED $10000, total trailing peak balance, total size basis S, EOD.
total floor=P-10000=-2000; total room=7000-(-2000)=9000; daily floor=8000-5000=3000; daily room=4000; REAL ROOM=4000; status WITHIN LIMITS; note 'Trailing floor is below zero: -$2,000.00.' Negative floor alone is NOT breach (errata v2.2).

CASE E — ZERO LIMIT REJECTED
S=100000, B=99000, dailyLimit=0, daily unit=fixed dollars; total 10% S.
Expected: input validation error 'Daily limit must be greater than zero.' No divide-by-zero, no output metrics. (Also reject zero resulting percentage size.)

CASE F — EQUITY BLANK
S=100000, B=99000, E blank, D=100000, daily 5% S, total 10% S, intraday counting, Free.
W defaults to B=99000; daily floor=95000, daily room=4000; total floor=90000, total room=9000; REAL ROOM=4000; status WITHIN LIMITS; visible note EXACT: 'Equity not entered — using balance. Open trades may reduce real room.'
Pro+intraday+E blank MUST instead show validation error.

CASE G — NEW-DAY BUTTON MUST NOT TOUCH TOTAL
Before: S=100000, B=97000, D=100000, daily 5% S, total 10% S, EOD. daily floor=95000; daily room=2000; daily used=60.0%; total floor=90000; total room=7000; total used=30.0%; REAL ROOM=2000.
After pressing Start new day: D becomes 97000; daily size remains 5000; daily floor=92000; daily room=5000; daily used=0.0%; total floor=90000 UNCHANGED; total room=7000 UNCHANGED; total used=30.0% UNCHANGED; REAL ROOM=5000.

REVIEW NOTES:
- CASE A's total room is zero and thus the UI correctly calls total breach; this vector isolates the daily-floor change, not a nonbreached scenario.
- Source's money and percent formatting use Math.round with EPSILON; negative half-up rounding may need independent QA on exact negative ties, and current profile-name option escaping may need security review before release.
- The current source uses localStorage for Pro profiles and has no network calls. These statements are from source inspection, not runtime/network instrumentation.
- No firm-specific rule certification, live checkout, delivery test, or publication is claimed.

NEXT GATE: captain runs browser/runtime tests for all seven, DeepSeek source/math audit, accessibility/security review, and resolves any findings before shipping.
— ChatGPT