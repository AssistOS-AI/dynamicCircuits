# Circuit Runtime Result

> This is the authoritative result emitted by the Dynamic Circuits executor. It is rendered directly from the circuit public outputs and execution receipt; it is not a coding-agent interpretation.

## Execution identity

| Field | Observed value |
| --- | --- |
| Entrypoint | `task.analysis` |
| Outcome | **SUCCEEDED** |
| Package hash | `sha256:25170442c46db6471d7d4c08b20ee3775bbd2e564cb31e59e53518e9eeb3b5a8` |
| Receipt hash | `sha256:e6bea23c67b8ca7842c57218f51e3bd7911e883cb3c4e384fd7b64d17426d4e8` |
| Executed nodes in root receipt | 4 |
| Dead nodes in root receipt | 0 |

## Public outputs

### notice

~~~text
# Contractual Breach Notice

## Parties and Agreement
Sender: Alpine Records GmbH
Recipient: Delta Conversion SA
Agreement title: Archive Conversion Agreement
Agreement date: 2 March 2026
Notice date: 11 August 2026

## Notice Purpose
This notice communicates supplied facts and a requested cure under the cited agreement; it does not independently determine that a breach occurred.

## Supplied Facts
Supplied factual statement: Batch 44 contained 312 files whose checksums did not match the delivery manifest.

## Contract Reference
Contract clause: Clause 5.2, Delivery Integrity
Governing-law statement: The Agreement states that Austrian law governs.
This notice cites, but does not independently interpret, the supplied clause.

## Requested Cure
Requested cure action: repeat conversion and provide a signed checksum manifest
Supplied cure deadline (not calculated): 20 August 2026

## Delivery
Permitted delivery method: registered electronic notice through the contract portal

## Reservation of Rights
Alpine Records reserves the rights stated in the Agreement.

## Exhibits
1. Exhibit A — checksum comparison
2. Exhibit B — Batch 44 manifest

## Limitations
This generated document is not legal advice and does not independently determine breach, liability, damages, or enforceability.
~~~

Output hash: `sha256:7432ce70f00f7d5c517f23d6de5b040f3f64f92f25570741fb442ef724415352`

### verification

- **ok:** true
- **checks:**
  - **oneTitle:** true
  - **exactHeadingOrder:** true
  - **allSuppliedValuesPresent:** true
  - **orderedExhibits:** true
  - **factualLabelPresent:** true
  - **clauseCautionPresent:** true
  - **deadlineUnchanged:** true
  - **deliveryMethodPresent:** true
  - **reservationTextPresent:** true
  - **governingLawStatementPresent:** true
  - **exactLimitations:** true
  - **noUnsupportedCurrency:** true
  - **noUnsupportedPenaltyLanguage:** true
  - **senderOnceInParties:** true
  - **recipientOnceInParties:** true
- **missingItems:**
(empty list)
- **prohibitedAdditions:**
(empty list)
- **measuredCounts:**
  - **titleCount:** 1
  - **sectionHeadingCount:** 9
  - **allHeadingCount:** 10
  - **expectedHeadingCount:** 10
  - **suppliedValueCount:** 14
  - **exhibitCount:** 2
  - **expectedExhibitCount:** 2
  - **senderPartiesOccurrences:** 1
  - **recipientPartiesOccurrences:** 1
  - **unsupportedCurrencyCount:** 0
  - **unsupportedPenaltyCount:** 0

Output hash: `sha256:d388a3665044e1129aefbaef71b44ff1c962c46b93645ed39126a0699265ee00`

### sourceContext

- **sourceLocator:** input/brief.md
- **sourceSha256:** d1d6852f64808cb09d2558db9f9cd1a830ec9a5dfebe8d1e45155cdca5a80861
- **support:** direct
- **requestedOutputs:**
  1. notice
  2. independent verification
- **constraints:**
  1. do not add legal conclusions
  2. do not add unsupported facts

Output hash: `sha256:31591fdf4fe84e9094507e0ff4022a931f1bd4677769bc5dc2166bc3a14deb30`

## Assurance checks

| Kind | Wire | Passed | Value hash |
| --- | --- | --- | --- |
| goal | `analysisComplete` | yes | `sha256:b5bea41b6c623f7c09f1bf24dcae58ebab3c0cdd90ad966bc43a45b44867e12b` |

## Receipt summary

| Node | Callee | Status | Child receipt |
| --- | --- | --- | --- |
| `n0001` | `task.brief` | SUCCEEDED | `sha256:de75d6e2ba034115f60bd69217a4841cb5a85449c0a577d152e0e180a7de5076` |
| `n0002` | `kb.breach_notice.generate` | SUCCEEDED | `sha256:4c6ca425430827e0c8ecc110496de372caba34481b1ca445d2bce26c9848238b` |
| `n0003` | `kb.breach_notice.verify` | SUCCEEDED | `sha256:2a3e6cd5e4fea09163a663844fe866d8e62e9f22704725200b64a4f0aea0f70e` |
| `n0004` | `assureComplete` | SUCCEEDED | - |

