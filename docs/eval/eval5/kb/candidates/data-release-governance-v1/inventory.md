# Source Inventory and Interpretation

## Input coverage

The manifest lists one supported UTF-8 Markdown file: `input/knowledge-base.md`, 7,098 bytes, SHA-256 `86019bae0a8c3f0b9f26a99a6bcf71682d41021b1b778c8bb42bb5dbfaea0fcf`. The observed file size and hash match the manifest. All 108 lines were read. There were no unreadable or unsupported inputs.

## Definitions and corpus facts

- The source defines a governed release record with an identifier and 15 named policy fields (lines 10-13).
- It defines exactly ten independent release-governance rules, R01 through R10 (lines 5-8 and headings at lines 15, 25, 34, 42, 51, 60, 69, 77, 85, and 94).
- Each rule returns PASS or FAIL, no rule silently overrides another, and a complete review retains every finding even after an earlier failure (lines 7-13).
- The required composite output has the release identifier, ten findings, failed identifiers, pass and fail counts, and a compliant flag (lines 103-108).
- These statements describe this source and fixture. They are not generalized claims about all release-governance regimes.

## Rules, exceptions, priorities, contexts, and units

| Rule | Reusable semantic | Exception or alternate path | Failure reason | Source |
|---|---|---|---|---|
| R01 | Personal data requires consent basis exactly `documented`. | Non-personal releases pass without a consent document. Encryption and anonymization do not substitute. | `personal_data_requires_documented_consent` | lines 15-23 |
| R02 | Confidential and restricted releases require encryption at rest equal to true. | Public and internal pass this rule without mandatory encryption. | `sensitive_release_requires_encryption` | lines 25-32 |
| R03 | Retention must be an integer from 1 through 365 days inclusive. | None; all sensitivity classes are covered. | `retention_must_be_between_1_and_365_days` | lines 34-40 |
| R04 | Deletion owner must be non-empty text after trimming and cannot be literal `missing`. | Incident ownership cannot substitute. | `deletion_owner_required` | lines 42-49 |
| R05 | Internal, confidential, and restricted releases require access logging equal to true. | Public releases pass without controlled-access logging. The record, not title, supplies classification. | `non_public_release_requires_access_logging` | lines 51-58 |
| R06 | Use of external processors requires DPA status exactly `signed`. | No external processor passes without an agreement. Technical safeguards and reputation do not substitute. | `external_processor_requires_signed_dpa` | lines 60-67 |
| R07 | EU residency passes; US or mixed residency requires approval equal to true; unknown residency fails. | Recorded approval is the explicit US/mixed exception. Encryption and a signed DPA do not substitute. | `non_eu_residency_requires_approval` | lines 69-75 |
| R08 | Personal data requires anonymized equal to true. | Non-personal releases pass without anonymization. Consent does not substitute. | `personal_data_requires_anonymization` | lines 77-83 |
| R09 | Incident owner must be non-empty text after trimming and cannot be literal `missing`. | No public-data exception; deletion ownership cannot substitute. | `incident_owner_required` | lines 85-92 |
| R10 | License must be exactly one of `CC-BY-4.0`, `ODC-BY-1.0`, or `internal-only`. | None. The set is fixture vocabulary, not a claim about real-world license validity. | `recognized_license_required` | lines 94-101 |

The only numeric unit is whole days in R03. Its inclusive lower and upper boundaries are 1 and 365. EU, US, and mixed are residency vocabulary, not a declared governing jurisdiction. No effective dates or policy version intervals are supplied.

The priority rule is non-override rather than precedence: all ten findings have equal retention in a review. The source explicitly distinguishes paired controls (R01/R08 and R04/R09) and identifies several non-substitution constraints. No conflict-resolution hierarchy is defined because the obligations are independent.

## Procedures and verification methods

The reusable procedure is deterministic field evaluation followed by stable-order composition:

1. Evaluate R01 through R10 independently against one release record.
2. Retain each PASS or FAIL finding and its rule identifier.
3. Preserve R01-to-R10 order regardless of failures.
4. Collect identifiers whose findings are FAIL.
5. Count PASS and FAIL findings.
6. Set compliant to true only when the FAIL count is zero.

Source examples provide branch examples but no documentary or technical verification method. The candidate therefore verifies record assertions, types, vocabulary, boundaries, output structure, and composition only. It cannot verify whether consent is actually documented, encryption is enabled, logging is complete, a DPA is valid, approval exists, anonymization is sufficient, named owners exist, or a license governs the artifact.

## Claims and source-specific observations

- The source says it is the complete reusable policy source supplied for this learning task. That completeness claim is bounded to this corpus.
- R10 expressly limits its accepted-license statement to the evaluation fixture and disclaims a broader conclusion about real-world licenses.
- Examples illustrate expected branches but are not additional rules and are not copied into executable constants beyond the stated vocabulary and bounds.

## Ambiguity and policy choices requiring review

1. The source names fields but gives no complete data schema. It does not say whether missing or string-valued trigger booleans mean false, FAIL, or malformed input. The candidate refuses invalid `containsPersonalData` and `externalProcessors` triggers.
2. Unknown sensitivity is not assigned a result in R02 or R05. The candidate refuses it, while R07 explicitly assigns unknown residency a FAIL.
3. Case sensitivity is not stated. The candidate uses exact case-sensitive vocabulary and treats only the lowercase exact marker `missing` as the owner marker.
4. Only owner rules explicitly require trimming. The candidate does not trim consent, DPA, residency, sensitivity, or license vocabulary.
5. The source says the record contains an identifier but gives no type, non-empty constraint, uniqueness rule, or normalization. The review requires property presence only.
6. `DPA` is not expanded, and no validity, signatory, scope, or effective-date criteria are given.
7. Technical terms such as encryption at rest, access logging, anonymization, entirely in EU, and recorded approval have no evidence standard.
8. No policy effective date, issuing authority, jurisdiction, source version, supersession rule, or conflict process is supplied.
9. Boolean obligation fields inside applicable branches pass only on exact true. The source does not explicitly distinguish false from missing for every such field, although its “require true” language supports treating both as not satisfied.
10. The composite `compliant` definition is implied but not spelled out. The candidate defines it as zero FAIL findings; refusals produce no review report rather than a noncompliant report with fewer than ten findings.

## Trusted overlap and version compatibility

`circuits/` contains no files, so there is no trusted package overlap to compare and no weaker duplicate to avoid. The candidate targets the implemented SOP subset documented by `author-sop-circuit`; all 11 packages compiled with the current reference compiler. This establishes syntax and package-graph compatibility only.
