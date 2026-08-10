# Circuit Runtime Result

> This is the authoritative result emitted by the Dynamic Circuits executor. It is rendered directly from the circuit public outputs and execution receipt; it is not a coding-agent interpretation.

## Execution identity

| Field | Observed value |
| --- | --- |
| Entrypoint | `task.analysis` |
| Outcome | **SUCCEEDED** |
| Package hash | `sha256:9157e4f147c0c48723242a0384d57157f76870b8bc6761b5a8b5377558d9c00f` |
| Receipt hash | `sha256:33da71a3ad72b93372e29a2ecb5ee260d7f8a48f6d055f3d7fd77b071ed8a3d9` |
| Executed nodes in root receipt | 3 |
| Dead nodes in root receipt | 0 |

## Public outputs

### notice

~~~text
# Contractual Breach Notice

## Parties and Agreement
Sender: Cedar Library Cooperative
Recipient: Bright Scan Services Ltd
Agreement title: Collection Digitization Agreement
Agreement date: 5 January 2026
Notice date: 12 August 2026

## Notice Purpose
This notice communicates supplied facts and a requested cure under the cited agreement; it does not independently determine that a breach occurred.

## Supplied Facts
Supplied factual statement: The handling report states that one bound volume was returned with a detached cover; the report lists a €0 replacement estimate and uses the phrase statutory penalty only as a disputed vendor annotation.

## Contract Reference
Contract clause: Section 9, Handling of Originals
Governing-law statement: The Agreement states that Irish law governs.
This notice cites, but does not independently interpret, the supplied clause.

## Requested Cure
Requested cure action: provide the conservation assessment and proposed handling correction
Supplied cure deadline (not calculated): 22 August 2026

## Delivery
Permitted delivery method: courier delivery to the contractual notice office

## Reservation of Rights
Cedar Library Cooperative reserves all rights stated in the Agreement.

## Exhibits
1. Exhibit A — handling report
2. Exhibit B — condition photographs

## Limitations
This generated document is not legal advice and does not independently determine breach, liability, damages, or enforceability.
~~~

Output hash: `sha256:360106ffed8b1fb541866e3afb512d955c248ada931a5e0f38d3945e21b0a9fd`

### generationReport

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

### independentVerification

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

## Assurance checks

The root circuit declares no goals or invariants.

## Receipt summary

| Node | Callee | Status | Child receipt |
| --- | --- | --- | --- |
| `n0001` | `task.brief` | SUCCEEDED | `sha256:93d5356e5ac1c77bf76a6b1523d4441db30731d1583daf7dfae6eed495a54689` |
| `n0002` | `kb.breach_notice.generate` | SUCCEEDED | `sha256:4b17f8af9d5d030b80c31b50c8d4c10c8c278b288ba658651700939f59a0e10b` |
| `n0003` | `kb.breach_notice.verify` | SUCCEEDED | `sha256:cbcd05089b81e6727905df2e789f8b142e3d3a608058c74229b286ff2786d5e5` |

