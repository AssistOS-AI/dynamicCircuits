# Data Release Governance Knowledge Base

## Corpus purpose

This document is the complete reusable policy source supplied to the KB-learning coding agent. It defines ten independent
release-governance rules. The agent must identify their boundaries, preserve the stated exceptions, create focused SOP
packages, and retain source references to the chapter headings. A rule result is `PASS` or `FAIL`; no rule may silently
override another rule.

The governed release record contains an identifier plus these fields: `containsPersonalData`, `consentBasis`,
`sensitivity`, `encryptionAtRest`, `retentionDays`, `deletionOwner`, `accessLogging`, `externalProcessors`, `dpaStatus`,
`residency`, `residencyApproval`, `anonymized`, `incidentOwner`, and `license`. Each rule below evaluates one obligation. A
complete release review retains all ten findings even when an earlier finding fails.

## Rule R01 — Documented consent basis

This rule applies whenever `containsPersonalData` is true. A personal-data release passes only when `consentBasis` is
`documented`. Values such as `missing`, `not-required`, or an unknown value fail with reason
`personal_data_requires_documented_consent`. A release without personal data passes this rule without a consent document.
Encryption and anonymization do not substitute for the consent basis; they are separate controls.

Example: a participant survey with documented consent passes R01. The same survey with missing consent fails even when its
storage is encrypted. A non-personal statistical aggregate passes R01 through the non-personal path.

## Rule R02 — Encryption for sensitive releases

Releases classified as `confidential` or `restricted` require `encryptionAtRest: true`. Either sensitive classification
paired with false fails with reason `sensitive_release_requires_encryption`. Public and internal classifications pass this
specific rule without mandatory encryption, although other rules still apply.

Example: a restricted clinical extract encrypted at rest passes R02. An unencrypted restricted extract fails. A public
aggregate passes R02, but that result says nothing about its retention, ownership, or license.

## Rule R03 — Bounded retention period

Every release must declare `retentionDays` as an integer from 1 through 365, inclusive. Zero, negative, fractional,
nonnumeric, missing, or values above 365 fail with reason `retention_must_be_between_1_and_365_days`. The limit applies to
every sensitivity class and remains independent of whether a deletion owner is named.

Example: 30 and 365 days pass. A two-year value of 730 days fails even when a lifecycle team is responsible for deletion.

## Rule R04 — Named deletion owner

Every release must name the person or team responsible for scheduled deletion. `deletionOwner` passes when it contains
non-empty text after surrounding whitespace is removed. A missing value, null, empty string, whitespace-only value, or the
literal source marker `missing` fails with reason `deletion_owner_required`. An incident owner does not implicitly satisfy
this obligation because scheduled deletion and incident response are different duties.

Example: `Data Lifecycle Team` passes. A blank owner fails even when retention is only seven days.

## Rule R05 — Access logging for non-public data

Internal, confidential, and restricted releases require `accessLogging: true`. A non-public release with logging disabled
fails with reason `non_public_release_requires_access_logging`. A public release passes this rule without controlled-access
logging because public access is intentional. The classification must come from the release record rather than its title.

Example: an internal engineering corpus with audit logging passes. The same corpus without logging fails. A public
statistical table passes R05 but can still fail another policy.

## Rule R06 — Agreement for external processors

When `externalProcessors` is true, `dpaStatus` must be `signed`. A processor relationship paired with `missing`,
`not-required`, or another status fails with reason `external_processor_requires_signed_dpa`. A release that uses no
external processor passes without an agreement. Technical safeguards and vendor reputation cannot substitute for the
agreement status supplied in the record.

Example: a cloud transformation vendor with a signed agreement passes. The same arrangement with a missing agreement fails.

## Rule R07 — Approval for non-EU residency

A release stored entirely in `EU` passes directly. Residency of `US` or `mixed` requires `residencyApproval: true`; otherwise
it fails with reason `non_eu_residency_requires_approval`. An unknown residency also fails because it establishes neither the
EU direct path nor an approved exception. Encryption and a signed processor agreement do not replace residency approval.

Example: an EU-only store passes. A mixed-region backup with recorded approval passes. US hosting without approval fails.

## Rule R08 — Anonymization of personal data

When `containsPersonalData` is true, `anonymized` must be true. A personal-data release without anonymization fails with
reason `personal_data_requires_anonymization`. A release without personal data passes without an anonymization step.
Documented consent does not replace anonymization; R01 and R08 must both be evaluated for personal data.

Example: a participant dataset with consent and anonymization passes. The same dataset without anonymization fails R08.

## Rule R09 — Named incident-response owner

Every release must provide non-empty `incidentOwner` text. A missing value, null, empty string, whitespace-only value, or the
literal marker `missing` fails with reason `incident_owner_required`. This applies to public and non-public releases because
integrity, licensing, privacy, and accidental-disclosure incidents can affect either class. A deletion owner is not an
implicit incident owner.

Example: `Security Operations` passes. A missing owner fails even for a public aggregate.

## Rule R10 — Recognized release license

Every release must state one recognized license. This policy accepts exactly `CC-BY-4.0`, `ODC-BY-1.0`, and `internal-only`.
The literal `missing`, an empty value, or another identifier fails with reason `recognized_license_required`. This accepted
set is the vocabulary of the evaluation fixture, not a claim that other real-world licenses are invalid.

Example: a public aggregate under `CC-BY-4.0` passes. An internal package under `internal-only` passes. A release with no
license fails even when all privacy and security controls pass.

## Required reusable composition

The learned KB should expose focused rule packages and a reusable review package that applies R01 through R10 to one release
record in stable order. The review output should contain the release identifier, all ten findings, failed rule identifiers,
pass and fail counts, and a compliant flag. Candidate artifacts require provenance, tests for every pass and fail branch,
and an explicit statement that compilation alone does not promote them into trusted circuits.
