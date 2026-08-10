# Circuit Runtime Result

> This is the authoritative result emitted by the Dynamic Circuits executor. It is rendered directly from the circuit public outputs and execution receipt; it is not a coding-agent interpretation.

## Execution identity

| Field | Observed value |
| --- | --- |
| Entrypoint | `task.analysis` |
| Outcome | **SUCCEEDED** |
| Package hash | `sha256:3feceb71f9770ccbaefba2022b6a7466e2ba2680512f116ecd8534ee6e17a7b8` |
| Receipt hash | `sha256:604118e1b540a91048529e1b6bd45cb0307702591d341530fd6714e55bd3cd42` |
| Executed nodes in root receipt | 5 |
| Dead nodes in root receipt | 0 |

## Public outputs

### notice

~~~text
# Contractual Breach Notice

## Parties and Agreement
Sender: Northbridge Archive Services SRL
Recipient: Meridian Indexing Ltd
Agreement title: Digital Preservation Services Agreement
Agreement date: 14 February 2026
Notice date: 10 August 2026

## Notice Purpose
This notice communicates supplied facts and a requested cure under the cited agreement; it does not independently determine that a breach occurred.

## Supplied Facts
Supplied factual statement: The indexing endpoint was unavailable from 08:20 UTC to 11:05 UTC on 8 August 2026.

## Contract Reference
Contract clause: Section 7.3, Service Continuity
Governing-law statement: The Agreement states that Romanian law governs.
This notice cites, but does not independently interpret, the supplied clause.

## Requested Cure
Requested cure action: provide the incident report and continuity remediation plan
Supplied cure deadline (not calculated): 17 August 2026

## Delivery
Permitted delivery method: encrypted email to the contractual notice addresses

## Reservation of Rights
Northbridge reserves all rights and remedies available under the Agreement.

## Exhibits
1. Exhibit A — availability export
2. Exhibit B — request failure log
3. Exhibit C — correspondence index

## Limitations
This generated document is not legal advice and does not independently determine breach, liability, damages, or enforceability.
~~~

Output hash: `sha256:a62f3441883a4e371c7336cb1a5afa1299755dcab85bdade9f543833cda75d42`

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
  - **suppliedValueCount:** 15
  - **exhibitCount:** 3
  - **expectedExhibitCount:** 3
  - **senderPartiesOccurrences:** 1
  - **recipientPartiesOccurrences:** 1
  - **unsupportedCurrencyCount:** 0
  - **unsupportedPenaltyCount:** 0

Output hash: `sha256:bccd452f68eb66ea7af1ba07ffdecb5bc50f35f8feb4fe48b83349cdb6cbabca`

## Assurance checks

| Kind | Wire | Passed | Value hash |
| --- | --- | --- | --- |
| goal | `requestSatisfied` | yes | `sha256:b4fd3da452540bf083d496bf78c7c373b2c7ea05b453c257564c667e8e7dc138` |

## Receipt summary

| Node | Callee | Status | Child receipt |
| --- | --- | --- | --- |
| `n0001` | `task.notice_input` | SUCCEEDED | `sha256:87db34015bf36fce0ea0ea7208a4f49a983e0e74bc674c7a2575f19ef4e202bb` |
| `n0002` | `kb.breach_notice.brief` | SUCCEEDED | `sha256:de5a0ccb0648769abfa857eb3ad9ec30530679908edb29593a83a5dedbc582c0` |
| `n0003` | `kb.breach_notice.generate` | SUCCEEDED | `sha256:3721e4e2e01df9f14da4bd7ca97a0023f4037ef7034c61f8a03e7d456db208a5` |
| `n0004` | `kb.breach_notice.verify` | SUCCEEDED | `sha256:2f1b8bae2cc35db0ecd9e8331ed3ef41d496583893de55e526c810a11c81a17b` |
| `n0005` | `confirmRequestedAnalysis` | SUCCEEDED | - |

