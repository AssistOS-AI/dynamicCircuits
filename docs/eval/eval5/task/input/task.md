# Large Data Release Review Task

## Requested analysis

Review all ten current release records below against every applicable rule in the supplied data-release governance KB. Use
the reviewed KB circuits rather than recreating policy logic in task code. Retain one finding for each of R01 through R10 for
every record, even when another rule already failed. Produce a human-readable report with per-release failed rule IDs,
reasons, aggregate pass and fail counts, compliant and non-compliant record counts, input coverage, reused circuits,
execution outcome, and limitations.

The expected coverage shape is ten records multiplied by ten rules. Missing or malformed required fields must remain visible
as a refusal or failure; they must not be silently replaced with favorable defaults. The output intended for the user is the
report under `results/`. Task-local SOP files may be created as internal symbolic execution artifacts when needed to compile
and verify the report.

## Record REL-01 — Public mobility aggregate

This non-personal public aggregate is the all-pass control record.

| Field | Value |
|---|---|
| containsPersonalData | false |
| consentBasis | not-required |
| sensitivity | public |
| encryptionAtRest | false |
| retentionDays | 180 |
| deletionOwner | Data Lifecycle Team |
| accessLogging | false |
| externalProcessors | false |
| dpaStatus | not-required |
| residency | EU |
| residencyApproval | false |
| anonymized | false |
| incidentOwner | Security Operations |
| license | CC-BY-4.0 |

## Record REL-02 — Participant survey extract

This personal-data release deliberately lacks documented consent and anonymization.

| Field | Value |
|---|---|
| containsPersonalData | true |
| consentBasis | missing |
| sensitivity | confidential |
| encryptionAtRest | true |
| retentionDays | 90 |
| deletionOwner | Research Data Team |
| accessLogging | true |
| externalProcessors | false |
| dpaStatus | not-required |
| residency | EU |
| residencyApproval | false |
| anonymized | false |
| incidentOwner | Privacy Response Team |
| license | internal-only |

## Record REL-03 — Restricted clinical extract

This restricted release deliberately records encryption at rest as disabled.

| Field | Value |
|---|---|
| containsPersonalData | false |
| consentBasis | not-required |
| sensitivity | restricted |
| encryptionAtRest | false |
| retentionDays | 120 |
| deletionOwner | Clinical Data Team |
| accessLogging | true |
| externalProcessors | false |
| dpaStatus | not-required |
| residency | EU |
| residencyApproval | false |
| anonymized | false |
| incidentOwner | Clinical Security Team |
| license | internal-only |

## Record REL-04 — Long-term sensor archive

This internal archive deliberately declares 730 retention days.

| Field | Value |
|---|---|
| containsPersonalData | false |
| consentBasis | not-required |
| sensitivity | internal |
| encryptionAtRest | true |
| retentionDays | 730 |
| deletionOwner | Archive Operations |
| accessLogging | true |
| externalProcessors | false |
| dpaStatus | not-required |
| residency | EU |
| residencyApproval | false |
| anonymized | false |
| incidentOwner | Platform Security |
| license | internal-only |

## Record REL-05 — Temporary quality dataset

This short-lived internal release deliberately omits the deletion owner.

| Field | Value |
|---|---|
| containsPersonalData | false |
| consentBasis | not-required |
| sensitivity | internal |
| encryptionAtRest | true |
| retentionDays | 30 |
| deletionOwner | missing |
| accessLogging | true |
| externalProcessors | false |
| dpaStatus | not-required |
| residency | EU |
| residencyApproval | false |
| anonymized | false |
| incidentOwner | Quality Security Lead |
| license | internal-only |

## Record REL-06 — Internal engineering corpus

This internal release deliberately disables access logging.

| Field | Value |
|---|---|
| containsPersonalData | false |
| consentBasis | not-required |
| sensitivity | internal |
| encryptionAtRest | true |
| retentionDays | 60 |
| deletionOwner | Engineering Operations |
| accessLogging | false |
| externalProcessors | false |
| dpaStatus | not-required |
| residency | EU |
| residencyApproval | false |
| anonymized | false |
| incidentOwner | Product Security |
| license | internal-only |

## Record REL-07 — Externally transformed indicators

This confidential release uses an external processor but deliberately records no signed agreement.

| Field | Value |
|---|---|
| containsPersonalData | false |
| consentBasis | not-required |
| sensitivity | confidential |
| encryptionAtRest | true |
| retentionDays | 45 |
| deletionOwner | Analytics Operations |
| accessLogging | true |
| externalProcessors | true |
| dpaStatus | missing |
| residency | EU |
| residencyApproval | false |
| anonymized | false |
| incidentOwner | Vendor Security Lead |
| license | internal-only |

## Record REL-08 — US-hosted benchmark data

This confidential release has a signed processor agreement but deliberately lacks US residency approval.

| Field | Value |
|---|---|
| containsPersonalData | false |
| consentBasis | not-required |
| sensitivity | confidential |
| encryptionAtRest | true |
| retentionDays | 75 |
| deletionOwner | Benchmark Operations |
| accessLogging | true |
| externalProcessors | true |
| dpaStatus | signed |
| residency | US |
| residencyApproval | false |
| anonymized | false |
| incidentOwner | Cloud Security Lead |
| license | internal-only |

## Record REL-09 — Public environmental indicators

This public release deliberately omits an incident-response owner.

| Field | Value |
|---|---|
| containsPersonalData | false |
| consentBasis | not-required |
| sensitivity | public |
| encryptionAtRest | false |
| retentionDays | 365 |
| deletionOwner | Open Data Team |
| accessLogging | false |
| externalProcessors | false |
| dpaStatus | not-required |
| residency | EU |
| residencyApproval | false |
| anonymized | false |
| incidentOwner | missing |
| license | ODC-BY-1.0 |

## Record REL-10 — Internal model telemetry

This internal release deliberately has no recognized license.

| Field | Value |
|---|---|
| containsPersonalData | false |
| consentBasis | not-required |
| sensitivity | internal |
| encryptionAtRest | true |
| retentionDays | 120 |
| deletionOwner | Model Operations |
| accessLogging | true |
| externalProcessors | false |
| dpaStatus | not-required |
| residency | EU |
| residencyApproval | false |
| anonymized | false |
| incidentOwner | AI Security Team |
| license | missing |
