# Circuit Runtime Result

> This is the authoritative result emitted by the Dynamic Circuits executor. It is rendered directly from the circuit public outputs and execution receipt; it is not a coding-agent interpretation.

## Execution identity

| Field | Observed value |
| --- | --- |
| Entrypoint | `task.analysis` |
| Outcome | **SUCCEEDED** |
| Package hash | `sha256:d7f3ccd53b44e0460824fe6624ebd2149e755a168c7d4b606c529c49c74006a7` |
| Receipt hash | `sha256:60ad88c3b52cd2ae29509724996858f5aca527a25e38c22aaa3764305ded1701` |
| Executed nodes in root receipt | 3 |
| Dead nodes in root receipt | 0 |

## Public outputs

### markdown

~~~text
# Orders Database SEV-2 Handoff

## Scope
Service: Orders PostgreSQL Cluster
Severity: SEV-2
This generated SOP is a document only; generating it performs no operational action.

## Roles
- Incident commander: Database Incident Lead
- Outgoing role: EU Database On-Call
- Incoming role: US Database On-Call
- Approval role: Database Incident Lead

## Preconditions
- Communication channel: #inc-orders-db
- Evidence locations:
  - replication dashboard
  - slow-query capture
  - failover timeline

## Handoff Procedure
1. Declare handoff: EU Database On-Call declares the handoff to US Database On-Call in #inc-orders-db.
2. Freeze the timeline snapshot: EU Database On-Call freezes the current incident timeline.
3. Identify open risks: EU Database On-Call identifies all open risks for US Database On-Call.
4. Transfer evidence links: EU Database On-Call transfers every evidence location to US Database On-Call.
5. Incoming acknowledgement: US Database On-Call acknowledges the handoff within 3 minutes.
6. Commander confirmation: Database Incident Lead confirms the transfer before the 9 minutes escalation deadline.
7. Completion record: US Database On-Call records completion with all required sign-offs and the UTC timestamp.

## Verification
- Confirm US Database On-Call acknowledged within 3 minutes.
- Confirm Database Incident Lead approved completion.
- Confirm all evidence locations were transferred in #inc-orders-db.

## Escalation
If acknowledgement is not received within 3 minutes, escalate in #inc-orders-db no later than 9 minutes to Database Incident Lead.

## Prohibited Actions
- MUST NOT force a primary failover during handoff
- Only Database Incident Lead may approve an override to this MUST NOT rule.

## Record of Completion
- [ ] Incident ID
- [ ] Outgoing sign-off
- [ ] Incoming sign-off
- [ ] Commander sign-off
- [ ] UTC timestamp

~~~

Output hash: `sha256:783a9d459bfcaeaa1d72c39eb7f8dc407a6d83386b5d242bf848b35b24fa2cbe`

### verification

- **ok:** true
- **checks:**
  1.
    - **name:** headingOrder
    - **ok:** true
    - **evidence:**
      - **expected:**
        1. # Orders Database SEV-2 Handoff
        2. ## Scope
        3. ## Roles
        4. ## Preconditions
        5. ## Handoff Procedure
        6. ## Verification
        7. ## Escalation
        8. ## Prohibited Actions
        9. ## Record of Completion
      - **observed:**
        1. # Orders Database SEV-2 Handoff
        2. ## Scope
        3. ## Roles
        4. ## Preconditions
        5. ## Handoff Procedure
        6. ## Verification
        7. ## Escalation
        8. ## Prohibited Actions
        9. ## Record of Completion
  2.
    - **name:** procedureSteps
    - **ok:** true
    - **evidence:**
      - **expected:**
        1. 1. Declare handoff: EU Database On-Call declares the handoff to US Database On-Call in #inc-orders-db.
        2. 2. Freeze the timeline snapshot: EU Database On-Call freezes the current incident timeline.
        3. 3. Identify open risks: EU Database On-Call identifies all open risks for US Database On-Call.
        4. 4. Transfer evidence links: EU Database On-Call transfers every evidence location to US Database On-Call.
        5. 5. Incoming acknowledgement: US Database On-Call acknowledges the handoff within 3 minutes.
        6. 6. Commander confirmation: Database Incident Lead confirms the transfer before the 9 minutes escalation deadline.
        7. 7. Completion record: US Database On-Call records completion with all required sign-offs and the UTC timestamp.
      - **observed:**
        1. 1. Declare handoff: EU Database On-Call declares the handoff to US Database On-Call in #inc-orders-db.
        2. 2. Freeze the timeline snapshot: EU Database On-Call freezes the current incident timeline.
        3. 3. Identify open risks: EU Database On-Call identifies all open risks for US Database On-Call.
        4. 4. Transfer evidence links: EU Database On-Call transfers every evidence location to US Database On-Call.
        5. 5. Incoming acknowledgement: US Database On-Call acknowledges the handoff within 3 minutes.
        6. 6. Commander confirmation: Database Incident Lead confirms the transfer before the 9 minutes escalation deadline.
        7. 7. Completion record: US Database On-Call records completion with all required sign-offs and the UTC timestamp.
  3.
    - **name:** scopeFields
    - **ok:** true
    - **evidence:**
      - **service:** Orders PostgreSQL Cluster
      - **severity:** SEV-2
  4.
    - **name:** rolePresence
    - **ok:** true
    - **evidence:**
      - **required:**
        1. Database Incident Lead
        2. EU Database On-Call
        3. US Database On-Call
        4. Database Incident Lead
      - **missing:**
(empty list)
  5.
    - **name:** deadlinePresence
    - **ok:** true
    - **evidence:**
      - **required:**
        1. 3 minutes
        2. 9 minutes
      - **missing:**
(empty list)
  6.
    - **name:** deadlineOrdering
    - **ok:** true
    - **evidence:**
      - **acknowledgementMinutes:** 3
      - **escalationMinutes:** 9
  7.
    - **name:** evidenceLocations
    - **ok:** true
    - **evidence:**
      - **required:**
        1. replication dashboard
        2. slow-query capture
        3. failover timeline
      - **missing:**
(empty list)
  8.
    - **name:** communicationChannel
    - **ok:** true
    - **evidence:**
      - **required:** #inc-orders-db
  9.
    - **name:** prohibitedMustNot
    - **ok:** true
    - **evidence:**
      - **required:** MUST NOT force a primary failover during handoff
  10.
    - **name:** approvalOverride
    - **ok:** true
    - **evidence:**
      - **required:** Only Database Incident Lead may approve an override to this MUST NOT rule.
  11.
    - **name:** noOperationalSideEffect
    - **ok:** true
    - **evidence:**
      - **required:** This generated SOP is a document only; generating it performs no operational action.
  12.
    - **name:** completionChecklist
    - **ok:** true
    - **evidence:**
      - **required:**
        1. - [ ] Incident ID
        2. - [ ] Outgoing sign-off
        3. - [ ] Incoming sign-off
        4. - [ ] Commander sign-off
        5. - [ ] UTC timestamp
      - **missing:**
(empty list)
- **missing:**
(empty list)
- **measuredCounts:**
  - **headingCount:** 9
  - **numberedStepCount:** 7
  - **expectedRoleCount:** 4
  - **presentRoleCount:** 4
  - **expectedEvidenceLocationCount:** 3
  - **presentEvidenceLocationCount:** 3
  - **completionChecklistItemCount:** 5

Output hash: `sha256:503ef20215e17e6a976321cb63a886e23ee8026b16f98fe0e9dbc6b6e684a181`

### source

input/brief.md

Output hash: `sha256:8dab7733e3ef7cf7bc62c803983620eaf78d7bf8d7d4f402ec46b991eb3bd405`

## Assurance checks

| Kind | Wire | Passed | Value hash |
| --- | --- | --- | --- |
| goal | `resultGrounded` | yes | `sha256:b5bea41b6c623f7c09f1bf24dcae58ebab3c0cdd90ad966bc43a45b44867e12b` |

## Receipt summary

| Node | Callee | Status | Child receipt |
| --- | --- | --- | --- |
| `n0001` | `task.brief` | SUCCEEDED | `sha256:48ec199b066002d560d5cd2b6d280e6e59f03c12247d4d7baa04492de6568e1e` |
| `n0002` | `kb.analysis` | SUCCEEDED | `sha256:e5c59508b59a0b199ee1fe038973cc668bc171e24ffd9da75be3d7e6ca6402d0` |
| `n0003` | `checkGrounding` | SUCCEEDED | - |

