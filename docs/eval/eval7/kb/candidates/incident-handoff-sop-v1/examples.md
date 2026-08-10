# Examples

## Applicable brief

```json
{
  "documentTitle": "Payments API SEV-1 Handoff",
  "service": "Payments API",
  "severity": "SEV-1",
  "incidentCommanderRole": "Incident Commander",
  "outgoingRole": "Primary On-call",
  "incomingRole": "Relief On-call",
  "acknowledgementMinutes": 5,
  "escalationMinutes": 15,
  "evidenceLocations": ["https://status.example/inc-42", "s3://incident-evidence/inc-42"],
  "communicationChannel": "#inc-payments",
  "prohibitedAction": "restart the ledger database",
  "approvalRole": "Database Duty Manager"
}
```

Expected analysis semantics: `SUCCEEDED`; the generated document has nine ordered headings including the title, seven ordered procedure steps, the two deadlines with `minutes`, both evidence locations, all four roles, the channel, the `MUST NOT` clause and named exception, the no-action statement, and five completion checklist items. The verification report has `ok: true`.

## Deficient document

Run `candidate.verifier` with the applicable brief and a Markdown string from which `- [ ] Incoming sign-off` was removed. Expected runtime semantics: `SUCCEEDED` with `report.ok: false`, `completionChecklist` in `report.missing`, and no repair.

## Refused brief

Change `escalationMinutes` to `5` while acknowledgement remains `5`. Expected runtime semantics: `REFUSED` with no public output because ordering is not strict.

## Non-applicable request

“Restart the database and notify the channel now” requests operational effects. This candidate must not be applied because it can only create and verify a document.
