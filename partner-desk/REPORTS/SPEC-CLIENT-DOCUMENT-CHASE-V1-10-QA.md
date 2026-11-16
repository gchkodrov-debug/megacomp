# OneJobKits — Client Document Chase & Onboarding Control Kit
SPEC v1.0 · 2026-11-16 · Owner: ChatGPT (spec); Captain Muse (implementation, QA, publication)
STATUS: SPEC DELIVERED / BUILD NOT YET EXECUTED OR TESTED
Source mandate: Answer #42 (ADOPT), Answer #43 (priority unchanged). House rules: original, offline-first, no client confidential documents embedded, no legal advice or income claims, no store changes.

## 1. Buyer, job, promise, boundaries
Buyer: small service agency, freelance operator, bookkeeper, virtual assistant, property manager, or consultant onboarding multiple clients who repeatedly fail to supply required documents.
Job-to-be-done: Know exactly which documents are missing, from whom, since when, when to remind, who owns the chase, and when onboarding is ready.
Honest promise: a reusable client intake and missing-document tracking workbook plus editable email scripts. It DOES NOT fetch files, send email, store sensitive client files, or integrate with a CRM automatically.
Deliverables: (A) Excel .xlsx with formula-based dashboard, (B) Google Sheets-compatible version with equivalent logic, (C) PDF quick-start + accessibility instructions, (D) .docx and .txt reminder templates, (E) sanitized sample workbook, (F) test evidence/compatibility checklist, (G) changelog and licence. No macros, scripts, external network calls, embedded personal data or automatic messaging.

## 2. Data architecture
Six tabs:
1. START_HERE: 5-step setup, legend, privacy warning, data dictionary, version, date as-of setting, how to duplicate templates and reset samples.
2. CLIENTS: ClientID (required unique stable text), DisplayName (pseudonym allowed), PrimaryContactAlias, AccountOwner, OnboardingStartDate, TargetReadyDate, Notes (non-sensitive), ActiveFlag, readiness summary (derived), LastActivity (derived). One row/client. Contact addresses should be kept in user's existing secure CRM, not workbook.
3. REQUIREMENTS: RequirementID (unique), ClientID (foreign key), DocumentType (user-configurable), Required? Y/N, RequestDate, DueDate, Status (Not Requested / Requested / Received / Accepted / Rejected / Waived), ReceivedDate, AcceptedDate, AssignedOwner, ReminderIntervalDays (default 3, configurable), LastReminderDate, NextReminderDate (formula), Missing? (formula), Overdue? (formula), AgeDays (formula), Notes (non-sensitive), LinkRef (optional non-sensitive internal reference only, no share links with tokens).
4. ACTIVITY_LOG: EventID, ClientID, RequirementID (optional), EventDate, Type (Request / Reminder / Receipt / Review / Waiver / Note), Operator, Outcome (non-sensitive). Append-only guidance, no automation; no emails copied here.
5. DASHBOARD: selected AsOfDate (defaults TODAY(), override for reproducible tests), ActiveClients, RequiredOpen, Overdue, DueSoon (next 3 days), WaitingReview, ReadyClients, StaleChases (last reminder >= 7 days for requested items), grouped by AccountOwner and ClientID. Filterable table with human-readable statuses; no macros.
6. TEMPLATES: list of request/reminder/receipt/rejection/closeout messages with placeholders; copy/paste only. Include guidance for tone and privacy.

## 3. Core business rules (single source of truth)
Required item: Required?=Y. Waived counts complete ONLY if explicitly set Waived and recorded in ACTIVITY_LOG; Received is NOT complete until Accepted. Accepted counts complete. Optional items never block readiness.
Open required item = Required=Y AND Status NOT IN {Accepted, Waived}.
Missing = Required=Y AND Status IN {Not Requested, Requested, Rejected}; Received is pending review, not 'missing from client'.
Overdue = Open required AND DueDate valid AND DueDate < AsOfDate. Due today is NOT overdue. Overdue Received is still overdue for readiness, but categorized WaitingReview, not Missing.
DueSoon = Open required AND valid DueDate >= AsOfDate AND <= AsOfDate+3.
WaitingReview = Required=Y AND Status=Received.
Ready = Active client AND at least one required item AND zero open required items. If client has zero required items, status SETUP INCOMPLETE, not Ready. Inactive clients excluded from active KPI.
AgeDays = MAX(0, AsOfDate - RequestDate) when RequestDate present; otherwise blank. Invalid dates should raise data-validation warnings, not silently calculate.
NextReminderDate: only for Missing items with Status=Requested or Rejected, using valid LastReminderDate + interval; if LastReminderDate empty use RequestDate + interval; if neither exists blank. No automatic sending. If item Received/Accepted/Waived or optional, blank.
StaleChase: Missing required item with Status Requested/Rejected and valid last reminder date <= AsOfDate-7; no reminder history => flagged 'Never reminded' separately rather than silently stale.
Every COUNT is keyed to unique RequirementID; duplicate IDs and orphan ClientIDs flagged, not counted as trustworthy.
Data validation: unique nonempty ClientID and RequirementID; valid status vocabulary; valid date values; reminder interval positive integer 1..90; due date before request date is flagged; AcceptedDate without Accepted status flagged; ReceivedDate without Received/Accepted status flagged; Waived requires log entry and reason (non-sensitive). Cross-tab references should survive row sorting and inserting new rows.
No volatile formulas except TODAY for live AsOfDate; provide manual override to freeze QA. No Excel-only formulas that silently break Google Sheets; if formula compatibility differs, ship platform-specific workbook and document difference.

## 4. Dashboard visual hierarchy
Top: AsOfDate and 7 KPI tiles (Active, Open, Overdue, Due Soon, Waiting Review, Ready, Stale).
Middle: per-client status table: Client alias, Owner, open/overdue/pending, readiness, next follow-up, latest activity.
Bottom: prioritized chase queue sorted Overdue -> Due Soon -> Missing -> Pending Review; user filters, not automatic email.
Colors never sole status indicator. Plain labels + accessible contrast, frozen headers, protected formula cells (without passwords that prevent user editing), visible formula notes, print-ready summary. Keyboard navigable. Avoid PII on example screen.

## 5. Communication templates
Request: 'Subject: Items needed to begin [project]. Hello [name], to proceed we still need [item list] by [date]. Please upload through our existing secure channel [secure-channel name]. Reply if anything is unavailable. Thank you, [owner].'
Reminder: polite, dated, no invented consequences.
Received: acknowledge receipt, distinguish from approval.
Rejected: explain what is incomplete without sensitive content.
Closeout: confirm all required items accepted/waived, note next onboarding step.
Never instruct recipients to email passports, bank records, IDs, medical records or other sensitive documents unencrypted. No auto-sending claims.

## 6. Worked example (entirely fictitious)
AsOfDate=2026-11-16.
Clients: C-101 'Sample Studio' active owner Alex; C-102 'Example Agency' active owner Dana; C-103 'Demo Closed' inactive owner Alex.
Requirements:
R-01 C-101 'Service brief' required Y Requested request 11/10 due 11/14 reminder 11/12 interval3 => open1 missing1 overdue1 next reminder 11/15.
R-02 C-101 'Brand preferences' required Y Received request 11/10 due 11/18 received 11/15 => open1 pending1 dueSoon1 next reminder blank.
R-03 C-101 'Optional inspiration' required N Not Requested due 11/12 => does not block.
R-04 C-102 'Scope approval' required Y Accepted request 11/08 due 11/12 accepted 11/13 => complete.
R-05 C-102 'Project questionnaire' required Y Waived due 11/15; log has waiver reason 'not applicable' => complete.
R-06 C-103 'Legacy item' required Y Requested due 11/01 => excluded from active KPIs.
Expected active dashboard: ActiveClients=2; RequiredOpen=2; Overdue=1; DueSoon=1; WaitingReview=1; ReadyClients=1 (C-102); StaleChases=0 (R-01 last reminder 4 days ago); C-101 Not Ready, C-102 Ready. Inactive C-103 excluded. R-01 next reminder 11/15 (past due) is an action item, not proof message was sent.

## 7. Ten explicit QA cases (fresh isolated workbook per case)
QA01 Basic missing: AsOf 11/16, active C1, required R1 Requested due 11/20, last reminder 11/14, interval3. Expect Open1, Missing1, Overdue0, DueSoon0, NextReminder11/17, Ready0.
QA02 Overdue boundary: AsOf 11/16, two required Requested due 11/15 and 11/16. Expect Open2, Overdue1, DueSoon1 (today), not Overdue2.
QA03 Received vs accepted: active C1, required R1 Received due 11/15. Expect Open1, WaitingReview1, Missing0, Overdue1, Ready0, NextReminder blank.
QA04 Optional excluded: active C1, required R1 Accepted and optional R2 Requested due 11/01. Expect Open0, Overdue0, Ready1; optional never blocks.
QA05 Waiver log required: active C1, required R1 Waived and valid waiver activity record. Expect Ready1. Remove waiver activity record => QA warning 'waiver unsubstantiated', readiness not trusted / Ready0 until corrected (implementation must enforce).
QA06 Zero requirements: active C1 with no required requirements. Expect Ready0, Setup Incomplete1, no division-by-zero, no false 100% readiness.
QA07 Inactive exclusion: C1 inactive, required R1 Requested due 11/01. Expect ActiveClients0, Open0, Overdue0; historical row retained, not erased.
QA08 Reminder schedule: AsOf 11/16, required Requested R1 request 11/10, last reminder blank, interval3 => NextReminder11/13. Change status to Accepted => NextReminder blank. No messages sent.
QA09 Duplicate and orphan: two rows with RequirementID R1, and one row R2 pointing to unknown ClientID C999. Expect visible duplicate-ID and orphan warnings; no misleading KPI totals; release gate FAIL until data corrected.
QA10 Date/locale and platform parity: AsOf 2026-11-16; request 2026-11-10 due 2026-11-15, last reminder 2026-11-12 interval3 => Overdue1, NextReminder2026-11-15, AgeDays6; test Excel and Google Sheets under US and UK date display locales, dates remain 2026-11-15 not 2026-15-11; same counts and values. Test 500 clients / 5,000 requirements for responsive recalculation (measure, don't assert speed).

## 8. Acceptance gates
A. All 10 cases run on both Excel and Sheets, expected vs actual evidence captured with version, date, environment and screenshots/exports; 10/10 mandatory, no silent differences.
B. Formulas audited for duplicate IDs, orphan rows, empty dates, zero required items, optional rows, inactive clients, date boundaries, and sorting.
C. Workbook is genuinely editable, sample can be reset, all deliverables open, no #REF!/#VALUE!/#DIV0!, no external links, scripts, hidden credentials or private data.
D. PDF guide contains precise installation, how to make a copy, privacy caveats, usage examples, troubleshooting, accessibility guidance and limitations.
E. Copy tested for clarity: Received != Accepted, no automatic email or secure document storage implied.
F. Commercial page only describes tested features; owner/captain decide price; verify actual download and customer-facing delivery before release.
G. Version metadata and support escalation documented. Localisation requires independent currency/date/privacy review; don't advertise legal compliance.
H. No customer PII in marketing screenshots or samples. Workbook is a tracking index, not a secure document repository.

## 9. Build handoff / open decisions for Muse
Decide: (1) whether waiver requires reason and activity log (recommended YES), (2) whether client contact details should remain alias-only (recommended YES), (3) Excel and Sheets separate optimized editions (recommended YES), (4) maximum supported rows after performance test, (5) whether manual AsOfDate default TODAY or fixed on first open (recommend live TODAY plus override).
Potential scope creep to reject v1: CRM integrations, file uploads, AI extraction, outbound email, automatic reminders, multiuser permissions, legal compliance certification.
Price bands in Answer #42 are planning hypotheses only; George/Muse decide final pricing.

## 10. Research honesty
Product demand signal was anecdotal small-business friction, not verified transaction volume. No claim of proven $149/$299 willingness to pay. Market validation needed before expensive build: interview 5–10 operators, compare competing tools and test prototype utility. This document is a SPECIFICATION and hand-calculated QA vectors, NOT a tested product.
