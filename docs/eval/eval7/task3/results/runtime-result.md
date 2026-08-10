# Circuit Runtime Result

> This is the authoritative result emitted by the Dynamic Circuits executor. It is rendered directly from the circuit public outputs and execution receipt; it is not a coding-agent interpretation.

## Execution identity

| Field | Observed value |
| --- | --- |
| Entrypoint | `task.analysis` |
| Outcome | **SUCCEEDED** |
| Package hash | `sha256:95e490a2fd7bb58a0d5fb308c1175a094dd1dc58f0fcec6d95b627d0dd824cf6` |
| Receipt hash | `sha256:6ae252e7d40c6ce66926965086499814ff60b48f99b71fff01f08935dc5efc9e` |
| Executed nodes in root receipt | 2 |
| Dead nodes in root receipt | 0 |

## Public outputs

### markdown

~~~text
# Identity Gateway SEV-1 Handoff

## Scope
Service: Identity Gateway
Severity: SEV-1
This generated SOP is a document only; generating it performs no operational action.

## Roles
- Incident commander: Security Incident Commander
- Outgoing role: Authentication Primary
- Incoming role: Authentication Relief
- Approval role: Security Incident Commander

## Preconditions
- Communication channel: #inc-identity
- Evidence locations:
  - authentication error graph
  - token validation trace
  - customer-impact log
  - change audit

## Handoff Procedure
1. Declare handoff: Authentication Primary declares the handoff to Authentication Relief in #inc-identity.
2. Freeze the timeline snapshot: Authentication Primary freezes the current incident timeline.
3. Identify open risks: Authentication Primary identifies all open risks for Authentication Relief.
4. Transfer evidence links: Authentication Primary transfers every evidence location to Authentication Relief.
5. Incoming acknowledgement: Authentication Relief acknowledges the handoff within 1 minutes.
6. Commander confirmation: Security Incident Commander confirms the transfer before the 2 minutes escalation deadline.
7. Completion record: Authentication Relief records completion with all required sign-offs and the UTC timestamp.

## Verification
- Confirm Authentication Relief acknowledged within 1 minutes.
- Confirm Security Incident Commander approved completion.
- Confirm all evidence locations were transferred in #inc-identity.

## Escalation
If acknowledgement is not received within 1 minutes, escalate in #inc-identity no later than 2 minutes to Security Incident Commander.

## Prohibited Actions
- MUST NOT rotate signing keys during handoff
- Only Security Incident Commander may approve an override to this MUST NOT rule.

## Record of Completion
- [ ] Incident ID
- [ ] Outgoing sign-off
- [ ] Incoming sign-off
- [ ] Commander sign-off
- [ ] UTC timestamp

~~~

Output hash: `sha256:4f21162b3b4abb880034042e7284ffdb495ab342a073d28fd1a8fdbe5c551f2a`

### verification

- **ok:** true
- **checks:**
  1.
    - **name:** headingOrder
    - **ok:** true
    - **evidence:**
      - **expected:**
        1. # Identity Gateway SEV-1 Handoff
        2. ## Scope
        3. ## Roles
        4. ## Preconditions
        5. ## Handoff Procedure
        6. ## Verification
        7. ## Escalation
        8. ## Prohibited Actions
        9. ## Record of Completion
      - **observed:**
        1. # Identity Gateway SEV-1 Handoff
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
        1. 1. Declare handoff: Authentication Primary declares the handoff to Authentication Relief in #inc-identity.
        2. 2. Freeze the timeline snapshot: Authentication Primary freezes the current incident timeline.
        3. 3. Identify open risks: Authentication Primary identifies all open risks for Authentication Relief.
        4. 4. Transfer evidence links: Authentication Primary transfers every evidence location to Authentication Relief.
        5. 5. Incoming acknowledgement: Authentication Relief acknowledges the handoff within 1 minutes.
        6. 6. Commander confirmation: Security Incident Commander confirms the transfer before the 2 minutes escalation deadline.
        7. 7. Completion record: Authentication Relief records completion with all required sign-offs and the UTC timestamp.
      - **observed:**
        1. 1. Declare handoff: Authentication Primary declares the handoff to Authentication Relief in #inc-identity.
        2. 2. Freeze the timeline snapshot: Authentication Primary freezes the current incident timeline.
        3. 3. Identify open risks: Authentication Primary identifies all open risks for Authentication Relief.
        4. 4. Transfer evidence links: Authentication Primary transfers every evidence location to Authentication Relief.
        5. 5. Incoming acknowledgement: Authentication Relief acknowledges the handoff within 1 minutes.
        6. 6. Commander confirmation: Security Incident Commander confirms the transfer before the 2 minutes escalation deadline.
        7. 7. Completion record: Authentication Relief records completion with all required sign-offs and the UTC timestamp.
  3.
    - **name:** scopeFields
    - **ok:** true
    - **evidence:**
      - **service:** Identity Gateway
      - **severity:** SEV-1
  4.
    - **name:** rolePresence
    - **ok:** true
    - **evidence:**
      - **required:**
        1. Security Incident Commander
        2. Authentication Primary
        3. Authentication Relief
        4. Security Incident Commander
      - **missing:**
(empty list)
  5.
    - **name:** deadlinePresence
    - **ok:** true
    - **evidence:**
      - **required:**
        1. 1 minutes
        2. 2 minutes
      - **missing:**
(empty list)
  6.
    - **name:** deadlineOrdering
    - **ok:** true
    - **evidence:**
      - **acknowledgementMinutes:** 1
      - **escalationMinutes:** 2
  7.
    - **name:** evidenceLocations
    - **ok:** true
    - **evidence:**
      - **required:**
        1. authentication error graph
        2. token validation trace
        3. customer-impact log
        4. change audit
      - **missing:**
(empty list)
  8.
    - **name:** communicationChannel
    - **ok:** true
    - **evidence:**
      - **required:** #inc-identity
  9.
    - **name:** prohibitedMustNot
    - **ok:** true
    - **evidence:**
      - **required:** MUST NOT rotate signing keys during handoff
  10.
    - **name:** approvalOverride
    - **ok:** true
    - **evidence:**
      - **required:** Only Security Incident Commander may approve an override to this MUST NOT rule.
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
  - **expectedEvidenceLocationCount:** 4
  - **presentEvidenceLocationCount:** 4
  - **completionChecklistItemCount:** 5

Output hash: `sha256:52e9b1e5154731638965ae029980b4384a2c7e3ec86cf0c0b89b4349ade008e2`

## Assurance checks

The root circuit declares no goals or invariants.

## Receipt summary

| Node | Callee | Status | Child receipt |
| --- | --- | --- | --- |
| `n0001` | `task.brief` | SUCCEEDED | `sha256:6c0d872329cbd1645f3762dfb89c5bc85e9db0fabec627fa5c0ee33dcb299e3b` |
| `n0002` | `kb.analysis` | SUCCEEDED | `sha256:e628157b4ddbf0bc8f8ae8375f02be94ce6356d62a53c5c0525fb5ab09b2729e` |

