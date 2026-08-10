# Circuit Runtime Result

> This is the authoritative result emitted by the Dynamic Circuits executor. It is rendered directly from the circuit public outputs and execution receipt; it is not a coding-agent interpretation.

## Execution identity

| Field | Observed value |
| --- | --- |
| Entrypoint | `task.analysis` |
| Outcome | **SUCCEEDED** |
| Package hash | `sha256:b04c834471dd6b3a6cdff1223c866297416604a6c353f45b4fc25c9f568d3049` |
| Receipt hash | `sha256:b44e6ac9c071d0a5252b09c8f52aa98d83f068f1bc3ac033f4dba5b44925cb11` |
| Executed nodes in root receipt | 26 |
| Dead nodes in root receipt | 0 |

## Public outputs

### report

~~~text
# Data Release Governance Review

## Execution outcome

SUCCEEDED — task.analysis completed and produced all public outputs.

## Input coverage

- Manifest files processed: 1/1 (input/task.md)
- Release records reviewed: 10/10
- Rules retained per release: 10
- Total rule findings retained: 100/100

## Aggregate counts

- Passed rule findings: 90
- Failed rule findings: 10
- Compliant records: 1
- Non-compliant records: 9

## Per-release findings

### REL-01

- Source: input/task.md:16-35
- Record outcome: COMPLIANT
- Failed rule IDs: None
- Rule counts: 10 pass, 0 fail

| Rule | Status | Reason | Path |
|---|---|---|---|
| R01 | PASS | — | NOT_APPLICABLE |
| R02 | PASS | — | NOT_APPLICABLE |
| R03 | PASS | — | APPLICABLE |
| R04 | PASS | — | APPLICABLE |
| R05 | PASS | — | NOT_APPLICABLE |
| R06 | PASS | — | NOT_APPLICABLE |
| R07 | PASS | — | EU_DIRECT |
| R08 | PASS | — | NOT_APPLICABLE |
| R09 | PASS | — | APPLICABLE |
| R10 | PASS | — | APPLICABLE |

### REL-02

- Source: input/task.md:37-56
- Record outcome: NON-COMPLIANT
- Failed rule IDs: R01, R08
- Rule counts: 8 pass, 2 fail

| Rule | Status | Reason | Path |
|---|---|---|---|
| R01 | FAIL | personal_data_requires_documented_consent | APPLICABLE |
| R02 | PASS | — | APPLICABLE |
| R03 | PASS | — | APPLICABLE |
| R04 | PASS | — | APPLICABLE |
| R05 | PASS | — | APPLICABLE |
| R06 | PASS | — | NOT_APPLICABLE |
| R07 | PASS | — | EU_DIRECT |
| R08 | FAIL | personal_data_requires_anonymization | APPLICABLE |
| R09 | PASS | — | APPLICABLE |
| R10 | PASS | — | APPLICABLE |

### REL-03

- Source: input/task.md:58-77
- Record outcome: NON-COMPLIANT
- Failed rule IDs: R02
- Rule counts: 9 pass, 1 fail

| Rule | Status | Reason | Path |
|---|---|---|---|
| R01 | PASS | — | NOT_APPLICABLE |
| R02 | FAIL | sensitive_release_requires_encryption | APPLICABLE |
| R03 | PASS | — | APPLICABLE |
| R04 | PASS | — | APPLICABLE |
| R05 | PASS | — | APPLICABLE |
| R06 | PASS | — | NOT_APPLICABLE |
| R07 | PASS | — | EU_DIRECT |
| R08 | PASS | — | NOT_APPLICABLE |
| R09 | PASS | — | APPLICABLE |
| R10 | PASS | — | APPLICABLE |

### REL-04

- Source: input/task.md:79-98
- Record outcome: NON-COMPLIANT
- Failed rule IDs: R03
- Rule counts: 9 pass, 1 fail

| Rule | Status | Reason | Path |
|---|---|---|---|
| R01 | PASS | — | NOT_APPLICABLE |
| R02 | PASS | — | NOT_APPLICABLE |
| R03 | FAIL | retention_must_be_between_1_and_365_days | APPLICABLE |
| R04 | PASS | — | APPLICABLE |
| R05 | PASS | — | APPLICABLE |
| R06 | PASS | — | NOT_APPLICABLE |
| R07 | PASS | — | EU_DIRECT |
| R08 | PASS | — | NOT_APPLICABLE |
| R09 | PASS | — | APPLICABLE |
| R10 | PASS | — | APPLICABLE |

### REL-05

- Source: input/task.md:100-119
- Record outcome: NON-COMPLIANT
- Failed rule IDs: R04
- Rule counts: 9 pass, 1 fail

| Rule | Status | Reason | Path |
|---|---|---|---|
| R01 | PASS | — | NOT_APPLICABLE |
| R02 | PASS | — | NOT_APPLICABLE |
| R03 | PASS | — | APPLICABLE |
| R04 | FAIL | deletion_owner_required | APPLICABLE |
| R05 | PASS | — | APPLICABLE |
| R06 | PASS | — | NOT_APPLICABLE |
| R07 | PASS | — | EU_DIRECT |
| R08 | PASS | — | NOT_APPLICABLE |
| R09 | PASS | — | APPLICABLE |
| R10 | PASS | — | APPLICABLE |

### REL-06

- Source: input/task.md:121-140
- Record outcome: NON-COMPLIANT
- Failed rule IDs: R05
- Rule counts: 9 pass, 1 fail

| Rule | Status | Reason | Path |
|---|---|---|---|
| R01 | PASS | — | NOT_APPLICABLE |
| R02 | PASS | — | NOT_APPLICABLE |
| R03 | PASS | — | APPLICABLE |
| R04 | PASS | — | APPLICABLE |
| R05 | FAIL | non_public_release_requires_access_logging | APPLICABLE |
| R06 | PASS | — | NOT_APPLICABLE |
| R07 | PASS | — | EU_DIRECT |
| R08 | PASS | — | NOT_APPLICABLE |
| R09 | PASS | — | APPLICABLE |
| R10 | PASS | — | APPLICABLE |

### REL-07

- Source: input/task.md:142-161
- Record outcome: NON-COMPLIANT
- Failed rule IDs: R06
- Rule counts: 9 pass, 1 fail

| Rule | Status | Reason | Path |
|---|---|---|---|
| R01 | PASS | — | NOT_APPLICABLE |
| R02 | PASS | — | APPLICABLE |
| R03 | PASS | — | APPLICABLE |
| R04 | PASS | — | APPLICABLE |
| R05 | PASS | — | APPLICABLE |
| R06 | FAIL | external_processor_requires_signed_dpa | APPLICABLE |
| R07 | PASS | — | EU_DIRECT |
| R08 | PASS | — | NOT_APPLICABLE |
| R09 | PASS | — | APPLICABLE |
| R10 | PASS | — | APPLICABLE |

### REL-08

- Source: input/task.md:163-182
- Record outcome: NON-COMPLIANT
- Failed rule IDs: R07
- Rule counts: 9 pass, 1 fail

| Rule | Status | Reason | Path |
|---|---|---|---|
| R01 | PASS | — | NOT_APPLICABLE |
| R02 | PASS | — | APPLICABLE |
| R03 | PASS | — | APPLICABLE |
| R04 | PASS | — | APPLICABLE |
| R05 | PASS | — | APPLICABLE |
| R06 | PASS | — | APPLICABLE |
| R07 | FAIL | non_eu_residency_requires_approval | NON_EU_OR_UNKNOWN |
| R08 | PASS | — | NOT_APPLICABLE |
| R09 | PASS | — | APPLICABLE |
| R10 | PASS | — | APPLICABLE |

### REL-09

- Source: input/task.md:184-203
- Record outcome: NON-COMPLIANT
- Failed rule IDs: R09
- Rule counts: 9 pass, 1 fail

| Rule | Status | Reason | Path |
|---|---|---|---|
| R01 | PASS | — | NOT_APPLICABLE |
| R02 | PASS | — | NOT_APPLICABLE |
| R03 | PASS | — | APPLICABLE |
| R04 | PASS | — | APPLICABLE |
| R05 | PASS | — | NOT_APPLICABLE |
| R06 | PASS | — | NOT_APPLICABLE |
| R07 | PASS | — | EU_DIRECT |
| R08 | PASS | — | NOT_APPLICABLE |
| R09 | FAIL | incident_owner_required | APPLICABLE |
| R10 | PASS | — | APPLICABLE |

### REL-10

- Source: input/task.md:205-224
- Record outcome: NON-COMPLIANT
- Failed rule IDs: R10
- Rule counts: 9 pass, 1 fail

| Rule | Status | Reason | Path |
|---|---|---|---|
| R01 | PASS | — | NOT_APPLICABLE |
| R02 | PASS | — | NOT_APPLICABLE |
| R03 | PASS | — | APPLICABLE |
| R04 | PASS | — | APPLICABLE |
| R05 | PASS | — | APPLICABLE |
| R06 | PASS | — | NOT_APPLICABLE |
| R07 | PASS | — | EU_DIRECT |
| R08 | PASS | — | NOT_APPLICABLE |
| R09 | PASS | — | APPLICABLE |
| R10 | FAIL | recognized_license_required | APPLICABLE |

## Reused reviewed circuits

- kb.data_release_governance.review
- kb.data_release_governance.r01
- kb.data_release_governance.r02
- kb.data_release_governance.r03
- kb.data_release_governance.r04
- kb.data_release_governance.r05
- kb.data_release_governance.r06
- kb.data_release_governance.r07
- kb.data_release_governance.r08
- kb.data_release_governance.r09
- kb.data_release_governance.r10

## Limitations

- The SOP runtime evaluates canonical values encoded from input/task.md; it does not parse unrestricted Markdown at runtime.
- The reviewed KB circuits evaluate supplied values only and do not verify external evidence or access files, processes, or networks.
- Coverage is limited to the ten supplied release records and reviewed rules R01 through R10.
- Source values written as missing are preserved verbatim and are not replaced with favorable defaults.
~~~

Output hash: `sha256:0ae4e7d4bd80f715e0e1334a55b1eab65408e8f823219a47b3beb3c3e8f39e2e`

### analysis

- **executionOutcome:** SUCCEEDED
- **inputCoverage:**
  - **manifestFilesExpected:** 1
  - **manifestFilesProcessed:** 1
  - **processedInputs:**
    1.
      - **path:** input/task.md
      - **sha256:** 92565b8c65c071560b6be7bb3a5f5490e3d7bc690ea135d546cdc85eac4b216a
      - **status:** PROCESSED
  - **expectedRecordCount:** 10
  - **reviewedRecordCount:** 10
  - **expectedRuleCountPerRecord:** 10
  - **retainedFindingCount:** 100
  - **expectedFindingCount:** 100
- **aggregateCounts:**
  - **passCount:** 90
  - **failCount:** 10
  - **compliantRecordCount:** 1
  - **nonCompliantRecordCount:** 9
- **releases:**
  1.
    - **releaseIdentifier:** REL-01
    - **sourceLocator:** input/task.md:16-35
    - **findings:**
      1.
        - **ruleId:** R01
        - **status:** PASS
        - **reason:** null
        - **path:** NOT_APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:15
      2.
        - **ruleId:** R02
        - **status:** PASS
        - **reason:** null
        - **path:** NOT_APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:25
      3.
        - **ruleId:** R03
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:34
      4.
        - **ruleId:** R04
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:42
      5.
        - **ruleId:** R05
        - **status:** PASS
        - **reason:** null
        - **path:** NOT_APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:51
      6.
        - **ruleId:** R06
        - **status:** PASS
        - **reason:** null
        - **path:** NOT_APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:60
      7.
        - **ruleId:** R07
        - **status:** PASS
        - **reason:** null
        - **path:** EU_DIRECT
        - **sourceLocator:** input/knowledge-base.md:69
      8.
        - **ruleId:** R08
        - **status:** PASS
        - **reason:** null
        - **path:** NOT_APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:77
      9.
        - **ruleId:** R09
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:85
      10.
        - **ruleId:** R10
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:94
    - **failedRuleIdentifiers:**
(empty list)
    - **failureReasons:**
(empty list)
    - **passCount:** 10
    - **failCount:** 0
    - **compliant:** true
  2.
    - **releaseIdentifier:** REL-02
    - **sourceLocator:** input/task.md:37-56
    - **findings:**
      1.
        - **ruleId:** R01
        - **status:** FAIL
        - **reason:** personal_data_requires_documented_consent
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:15
      2.
        - **ruleId:** R02
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:25
      3.
        - **ruleId:** R03
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:34
      4.
        - **ruleId:** R04
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:42
      5.
        - **ruleId:** R05
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:51
      6.
        - **ruleId:** R06
        - **status:** PASS
        - **reason:** null
        - **path:** NOT_APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:60
      7.
        - **ruleId:** R07
        - **status:** PASS
        - **reason:** null
        - **path:** EU_DIRECT
        - **sourceLocator:** input/knowledge-base.md:69
      8.
        - **ruleId:** R08
        - **status:** FAIL
        - **reason:** personal_data_requires_anonymization
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:77
      9.
        - **ruleId:** R09
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:85
      10.
        - **ruleId:** R10
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:94
    - **failedRuleIdentifiers:**
      1. R01
      2. R08
    - **failureReasons:**
      1.
        - **ruleId:** R01
        - **reason:** personal_data_requires_documented_consent
        - **ruleSourceLocator:** input/knowledge-base.md:15
      2.
        - **ruleId:** R08
        - **reason:** personal_data_requires_anonymization
        - **ruleSourceLocator:** input/knowledge-base.md:77
    - **passCount:** 8
    - **failCount:** 2
    - **compliant:** false
  3.
    - **releaseIdentifier:** REL-03
    - **sourceLocator:** input/task.md:58-77
    - **findings:**
      1.
        - **ruleId:** R01
        - **status:** PASS
        - **reason:** null
        - **path:** NOT_APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:15
      2.
        - **ruleId:** R02
        - **status:** FAIL
        - **reason:** sensitive_release_requires_encryption
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:25
      3.
        - **ruleId:** R03
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:34
      4.
        - **ruleId:** R04
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:42
      5.
        - **ruleId:** R05
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:51
      6.
        - **ruleId:** R06
        - **status:** PASS
        - **reason:** null
        - **path:** NOT_APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:60
      7.
        - **ruleId:** R07
        - **status:** PASS
        - **reason:** null
        - **path:** EU_DIRECT
        - **sourceLocator:** input/knowledge-base.md:69
      8.
        - **ruleId:** R08
        - **status:** PASS
        - **reason:** null
        - **path:** NOT_APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:77
      9.
        - **ruleId:** R09
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:85
      10.
        - **ruleId:** R10
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:94
    - **failedRuleIdentifiers:**
      1. R02
    - **failureReasons:**
      1.
        - **ruleId:** R02
        - **reason:** sensitive_release_requires_encryption
        - **ruleSourceLocator:** input/knowledge-base.md:25
    - **passCount:** 9
    - **failCount:** 1
    - **compliant:** false
  4.
    - **releaseIdentifier:** REL-04
    - **sourceLocator:** input/task.md:79-98
    - **findings:**
      1.
        - **ruleId:** R01
        - **status:** PASS
        - **reason:** null
        - **path:** NOT_APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:15
      2.
        - **ruleId:** R02
        - **status:** PASS
        - **reason:** null
        - **path:** NOT_APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:25
      3.
        - **ruleId:** R03
        - **status:** FAIL
        - **reason:** retention_must_be_between_1_and_365_days
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:34
      4.
        - **ruleId:** R04
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:42
      5.
        - **ruleId:** R05
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:51
      6.
        - **ruleId:** R06
        - **status:** PASS
        - **reason:** null
        - **path:** NOT_APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:60
      7.
        - **ruleId:** R07
        - **status:** PASS
        - **reason:** null
        - **path:** EU_DIRECT
        - **sourceLocator:** input/knowledge-base.md:69
      8.
        - **ruleId:** R08
        - **status:** PASS
        - **reason:** null
        - **path:** NOT_APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:77
      9.
        - **ruleId:** R09
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:85
      10.
        - **ruleId:** R10
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:94
    - **failedRuleIdentifiers:**
      1. R03
    - **failureReasons:**
      1.
        - **ruleId:** R03
        - **reason:** retention_must_be_between_1_and_365_days
        - **ruleSourceLocator:** input/knowledge-base.md:34
    - **passCount:** 9
    - **failCount:** 1
    - **compliant:** false
  5.
    - **releaseIdentifier:** REL-05
    - **sourceLocator:** input/task.md:100-119
    - **findings:**
      1.
        - **ruleId:** R01
        - **status:** PASS
        - **reason:** null
        - **path:** NOT_APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:15
      2.
        - **ruleId:** R02
        - **status:** PASS
        - **reason:** null
        - **path:** NOT_APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:25
      3.
        - **ruleId:** R03
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:34
      4.
        - **ruleId:** R04
        - **status:** FAIL
        - **reason:** deletion_owner_required
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:42
      5.
        - **ruleId:** R05
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:51
      6.
        - **ruleId:** R06
        - **status:** PASS
        - **reason:** null
        - **path:** NOT_APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:60
      7.
        - **ruleId:** R07
        - **status:** PASS
        - **reason:** null
        - **path:** EU_DIRECT
        - **sourceLocator:** input/knowledge-base.md:69
      8.
        - **ruleId:** R08
        - **status:** PASS
        - **reason:** null
        - **path:** NOT_APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:77
      9.
        - **ruleId:** R09
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:85
      10.
        - **ruleId:** R10
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:94
    - **failedRuleIdentifiers:**
      1. R04
    - **failureReasons:**
      1.
        - **ruleId:** R04
        - **reason:** deletion_owner_required
        - **ruleSourceLocator:** input/knowledge-base.md:42
    - **passCount:** 9
    - **failCount:** 1
    - **compliant:** false
  6.
    - **releaseIdentifier:** REL-06
    - **sourceLocator:** input/task.md:121-140
    - **findings:**
      1.
        - **ruleId:** R01
        - **status:** PASS
        - **reason:** null
        - **path:** NOT_APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:15
      2.
        - **ruleId:** R02
        - **status:** PASS
        - **reason:** null
        - **path:** NOT_APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:25
      3.
        - **ruleId:** R03
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:34
      4.
        - **ruleId:** R04
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:42
      5.
        - **ruleId:** R05
        - **status:** FAIL
        - **reason:** non_public_release_requires_access_logging
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:51
      6.
        - **ruleId:** R06
        - **status:** PASS
        - **reason:** null
        - **path:** NOT_APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:60
      7.
        - **ruleId:** R07
        - **status:** PASS
        - **reason:** null
        - **path:** EU_DIRECT
        - **sourceLocator:** input/knowledge-base.md:69
      8.
        - **ruleId:** R08
        - **status:** PASS
        - **reason:** null
        - **path:** NOT_APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:77
      9.
        - **ruleId:** R09
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:85
      10.
        - **ruleId:** R10
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:94
    - **failedRuleIdentifiers:**
      1. R05
    - **failureReasons:**
      1.
        - **ruleId:** R05
        - **reason:** non_public_release_requires_access_logging
        - **ruleSourceLocator:** input/knowledge-base.md:51
    - **passCount:** 9
    - **failCount:** 1
    - **compliant:** false
  7.
    - **releaseIdentifier:** REL-07
    - **sourceLocator:** input/task.md:142-161
    - **findings:**
      1.
        - **ruleId:** R01
        - **status:** PASS
        - **reason:** null
        - **path:** NOT_APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:15
      2.
        - **ruleId:** R02
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:25
      3.
        - **ruleId:** R03
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:34
      4.
        - **ruleId:** R04
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:42
      5.
        - **ruleId:** R05
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:51
      6.
        - **ruleId:** R06
        - **status:** FAIL
        - **reason:** external_processor_requires_signed_dpa
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:60
      7.
        - **ruleId:** R07
        - **status:** PASS
        - **reason:** null
        - **path:** EU_DIRECT
        - **sourceLocator:** input/knowledge-base.md:69
      8.
        - **ruleId:** R08
        - **status:** PASS
        - **reason:** null
        - **path:** NOT_APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:77
      9.
        - **ruleId:** R09
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:85
      10.
        - **ruleId:** R10
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:94
    - **failedRuleIdentifiers:**
      1. R06
    - **failureReasons:**
      1.
        - **ruleId:** R06
        - **reason:** external_processor_requires_signed_dpa
        - **ruleSourceLocator:** input/knowledge-base.md:60
    - **passCount:** 9
    - **failCount:** 1
    - **compliant:** false
  8.
    - **releaseIdentifier:** REL-08
    - **sourceLocator:** input/task.md:163-182
    - **findings:**
      1.
        - **ruleId:** R01
        - **status:** PASS
        - **reason:** null
        - **path:** NOT_APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:15
      2.
        - **ruleId:** R02
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:25
      3.
        - **ruleId:** R03
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:34
      4.
        - **ruleId:** R04
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:42
      5.
        - **ruleId:** R05
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:51
      6.
        - **ruleId:** R06
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:60
      7.
        - **ruleId:** R07
        - **status:** FAIL
        - **reason:** non_eu_residency_requires_approval
        - **path:** NON_EU_OR_UNKNOWN
        - **sourceLocator:** input/knowledge-base.md:69
      8.
        - **ruleId:** R08
        - **status:** PASS
        - **reason:** null
        - **path:** NOT_APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:77
      9.
        - **ruleId:** R09
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:85
      10.
        - **ruleId:** R10
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:94
    - **failedRuleIdentifiers:**
      1. R07
    - **failureReasons:**
      1.
        - **ruleId:** R07
        - **reason:** non_eu_residency_requires_approval
        - **ruleSourceLocator:** input/knowledge-base.md:69
    - **passCount:** 9
    - **failCount:** 1
    - **compliant:** false
  9.
    - **releaseIdentifier:** REL-09
    - **sourceLocator:** input/task.md:184-203
    - **findings:**
      1.
        - **ruleId:** R01
        - **status:** PASS
        - **reason:** null
        - **path:** NOT_APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:15
      2.
        - **ruleId:** R02
        - **status:** PASS
        - **reason:** null
        - **path:** NOT_APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:25
      3.
        - **ruleId:** R03
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:34
      4.
        - **ruleId:** R04
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:42
      5.
        - **ruleId:** R05
        - **status:** PASS
        - **reason:** null
        - **path:** NOT_APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:51
      6.
        - **ruleId:** R06
        - **status:** PASS
        - **reason:** null
        - **path:** NOT_APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:60
      7.
        - **ruleId:** R07
        - **status:** PASS
        - **reason:** null
        - **path:** EU_DIRECT
        - **sourceLocator:** input/knowledge-base.md:69
      8.
        - **ruleId:** R08
        - **status:** PASS
        - **reason:** null
        - **path:** NOT_APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:77
      9.
        - **ruleId:** R09
        - **status:** FAIL
        - **reason:** incident_owner_required
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:85
      10.
        - **ruleId:** R10
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:94
    - **failedRuleIdentifiers:**
      1. R09
    - **failureReasons:**
      1.
        - **ruleId:** R09
        - **reason:** incident_owner_required
        - **ruleSourceLocator:** input/knowledge-base.md:85
    - **passCount:** 9
    - **failCount:** 1
    - **compliant:** false
  10.
    - **releaseIdentifier:** REL-10
    - **sourceLocator:** input/task.md:205-224
    - **findings:**
      1.
        - **ruleId:** R01
        - **status:** PASS
        - **reason:** null
        - **path:** NOT_APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:15
      2.
        - **ruleId:** R02
        - **status:** PASS
        - **reason:** null
        - **path:** NOT_APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:25
      3.
        - **ruleId:** R03
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:34
      4.
        - **ruleId:** R04
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:42
      5.
        - **ruleId:** R05
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:51
      6.
        - **ruleId:** R06
        - **status:** PASS
        - **reason:** null
        - **path:** NOT_APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:60
      7.
        - **ruleId:** R07
        - **status:** PASS
        - **reason:** null
        - **path:** EU_DIRECT
        - **sourceLocator:** input/knowledge-base.md:69
      8.
        - **ruleId:** R08
        - **status:** PASS
        - **reason:** null
        - **path:** NOT_APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:77
      9.
        - **ruleId:** R09
        - **status:** PASS
        - **reason:** null
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:85
      10.
        - **ruleId:** R10
        - **status:** FAIL
        - **reason:** recognized_license_required
        - **path:** APPLICABLE
        - **sourceLocator:** input/knowledge-base.md:94
    - **failedRuleIdentifiers:**
      1. R10
    - **failureReasons:**
      1.
        - **ruleId:** R10
        - **reason:** recognized_license_required
        - **ruleSourceLocator:** input/knowledge-base.md:94
    - **passCount:** 9
    - **failCount:** 1
    - **compliant:** false
- **reusedCircuits:**
  1. kb.data_release_governance.review
  2. kb.data_release_governance.r01
  3. kb.data_release_governance.r02
  4. kb.data_release_governance.r03
  5. kb.data_release_governance.r04
  6. kb.data_release_governance.r05
  7. kb.data_release_governance.r06
  8. kb.data_release_governance.r07
  9. kb.data_release_governance.r08
  10. kb.data_release_governance.r09
  11. kb.data_release_governance.r10
- **limitations:**
  1. The SOP runtime evaluates canonical values encoded from input/task.md; it does not parse unrestricted Markdown at runtime.
  2. The reviewed KB circuits evaluate supplied values only and do not verify external evidence or access files, processes, or networks.
  3. Coverage is limited to the ten supplied release records and reviewed rules R01 through R10.
  4. Source values written as missing are preserved verbatim and are not replaced with favorable defaults.
- **humanReadableReport:**
~~~text
# Data Release Governance Review

## Execution outcome

SUCCEEDED — task.analysis completed and produced all public outputs.

## Input coverage

- Manifest files processed: 1/1 (input/task.md)
- Release records reviewed: 10/10
- Rules retained per release: 10
- Total rule findings retained: 100/100

## Aggregate counts

- Passed rule findings: 90
- Failed rule findings: 10
- Compliant records: 1
- Non-compliant records: 9

## Per-release findings

### REL-01

- Source: input/task.md:16-35
- Record outcome: COMPLIANT
- Failed rule IDs: None
- Rule counts: 10 pass, 0 fail

| Rule | Status | Reason | Path |
|---|---|---|---|
| R01 | PASS | — | NOT_APPLICABLE |
| R02 | PASS | — | NOT_APPLICABLE |
| R03 | PASS | — | APPLICABLE |
| R04 | PASS | — | APPLICABLE |
| R05 | PASS | — | NOT_APPLICABLE |
| R06 | PASS | — | NOT_APPLICABLE |
| R07 | PASS | — | EU_DIRECT |
| R08 | PASS | — | NOT_APPLICABLE |
| R09 | PASS | — | APPLICABLE |
| R10 | PASS | — | APPLICABLE |

### REL-02

- Source: input/task.md:37-56
- Record outcome: NON-COMPLIANT
- Failed rule IDs: R01, R08
- Rule counts: 8 pass, 2 fail

| Rule | Status | Reason | Path |
|---|---|---|---|
| R01 | FAIL | personal_data_requires_documented_consent | APPLICABLE |
| R02 | PASS | — | APPLICABLE |
| R03 | PASS | — | APPLICABLE |
| R04 | PASS | — | APPLICABLE |
| R05 | PASS | — | APPLICABLE |
| R06 | PASS | — | NOT_APPLICABLE |
| R07 | PASS | — | EU_DIRECT |
| R08 | FAIL | personal_data_requires_anonymization | APPLICABLE |
| R09 | PASS | — | APPLICABLE |
| R10 | PASS | — | APPLICABLE |

### REL-03

- Source: input/task.md:58-77
- Record outcome: NON-COMPLIANT
- Failed rule IDs: R02
- Rule counts: 9 pass, 1 fail

| Rule | Status | Reason | Path |
|---|---|---|---|
| R01 | PASS | — | NOT_APPLICABLE |
| R02 | FAIL | sensitive_release_requires_encryption | APPLICABLE |
| R03 | PASS | — | APPLICABLE |
| R04 | PASS | — | APPLICABLE |
| R05 | PASS | — | APPLICABLE |
| R06 | PASS | — | NOT_APPLICABLE |
| R07 | PASS | — | EU_DIRECT |
| R08 | PASS | — | NOT_APPLICABLE |
| R09 | PASS | — | APPLICABLE |
| R10 | PASS | — | APPLICABLE |

### REL-04

- Source: input/task.md:79-98
- Record outcome: NON-COMPLIANT
- Failed rule IDs: R03
- Rule counts: 9 pass, 1 fail

| Rule | Status | Reason | Path |
|---|---|---|---|
| R01 | PASS | — | NOT_APPLICABLE |
| R02 | PASS | — | NOT_APPLICABLE |
| R03 | FAIL | retention_must_be_between_1_and_365_days | APPLICABLE |
| R04 | PASS | — | APPLICABLE |
| R05 | PASS | — | APPLICABLE |
| R06 | PASS | — | NOT_APPLICABLE |
| R07 | PASS | — | EU_DIRECT |
| R08 | PASS | — | NOT_APPLICABLE |
| R09 | PASS | — | APPLICABLE |
| R10 | PASS | — | APPLICABLE |

### REL-05

- Source: input/task.md:100-119
- Record outcome: NON-COMPLIANT
- Failed rule IDs: R04
- Rule counts: 9 pass, 1 fail

| Rule | Status | Reason | Path |
|---|---|---|---|
| R01 | PASS | — | NOT_APPLICABLE |
| R02 | PASS | — | NOT_APPLICABLE |
| R03 | PASS | — | APPLICABLE |
| R04 | FAIL | deletion_owner_required | APPLICABLE |
| R05 | PASS | — | APPLICABLE |
| R06 | PASS | — | NOT_APPLICABLE |
| R07 | PASS | — | EU_DIRECT |
| R08 | PASS | — | NOT_APPLICABLE |
| R09 | PASS | — | APPLICABLE |
| R10 | PASS | — | APPLICABLE |

### REL-06

- Source: input/task.md:121-140
- Record outcome: NON-COMPLIANT
- Failed rule IDs: R05
- Rule counts: 9 pass, 1 fail

| Rule | Status | Reason | Path |
|---|---|---|---|
| R01 | PASS | — | NOT_APPLICABLE |
| R02 | PASS | — | NOT_APPLICABLE |
| R03 | PASS | — | APPLICABLE |
| R04 | PASS | — | APPLICABLE |
| R05 | FAIL | non_public_release_requires_access_logging | APPLICABLE |
| R06 | PASS | — | NOT_APPLICABLE |
| R07 | PASS | — | EU_DIRECT |
| R08 | PASS | — | NOT_APPLICABLE |
| R09 | PASS | — | APPLICABLE |
| R10 | PASS | — | APPLICABLE |

### REL-07

- Source: input/task.md:142-161
- Record outcome: NON-COMPLIANT
- Failed rule IDs: R06
- Rule counts: 9 pass, 1 fail

| Rule | Status | Reason | Path |
|---|---|---|---|
| R01 | PASS | — | NOT_APPLICABLE |
| R02 | PASS | — | APPLICABLE |
| R03 | PASS | — | APPLICABLE |
| R04 | PASS | — | APPLICABLE |
| R05 | PASS | — | APPLICABLE |
| R06 | FAIL | external_processor_requires_signed_dpa | APPLICABLE |
| R07 | PASS | — | EU_DIRECT |
| R08 | PASS | — | NOT_APPLICABLE |
| R09 | PASS | — | APPLICABLE |
| R10 | PASS | — | APPLICABLE |

### REL-08

- Source: input/task.md:163-182
- Record outcome: NON-COMPLIANT
- Failed rule IDs: R07
- Rule counts: 9 pass, 1 fail

| Rule | Status | Reason | Path |
|---|---|---|---|
| R01 | PASS | — | NOT_APPLICABLE |
| R02 | PASS | — | APPLICABLE |
| R03 | PASS | — | APPLICABLE |
| R04 | PASS | — | APPLICABLE |
| R05 | PASS | — | APPLICABLE |
| R06 | PASS | — | APPLICABLE |
| R07 | FAIL | non_eu_residency_requires_approval | NON_EU_OR_UNKNOWN |
| R08 | PASS | — | NOT_APPLICABLE |
| R09 | PASS | — | APPLICABLE |
| R10 | PASS | — | APPLICABLE |

### REL-09

- Source: input/task.md:184-203
- Record outcome: NON-COMPLIANT
- Failed rule IDs: R09
- Rule counts: 9 pass, 1 fail

| Rule | Status | Reason | Path |
|---|---|---|---|
| R01 | PASS | — | NOT_APPLICABLE |
| R02 | PASS | — | NOT_APPLICABLE |
| R03 | PASS | — | APPLICABLE |
| R04 | PASS | — | APPLICABLE |
| R05 | PASS | — | NOT_APPLICABLE |
| R06 | PASS | — | NOT_APPLICABLE |
| R07 | PASS | — | EU_DIRECT |
| R08 | PASS | — | NOT_APPLICABLE |
| R09 | FAIL | incident_owner_required | APPLICABLE |
| R10 | PASS | — | APPLICABLE |

### REL-10

- Source: input/task.md:205-224
- Record outcome: NON-COMPLIANT
- Failed rule IDs: R10
- Rule counts: 9 pass, 1 fail

| Rule | Status | Reason | Path |
|---|---|---|---|
| R01 | PASS | — | NOT_APPLICABLE |
| R02 | PASS | — | NOT_APPLICABLE |
| R03 | PASS | — | APPLICABLE |
| R04 | PASS | — | APPLICABLE |
| R05 | PASS | — | APPLICABLE |
| R06 | PASS | — | NOT_APPLICABLE |
| R07 | PASS | — | EU_DIRECT |
| R08 | PASS | — | NOT_APPLICABLE |
| R09 | PASS | — | APPLICABLE |
| R10 | FAIL | recognized_license_required | APPLICABLE |

## Reused reviewed circuits

- kb.data_release_governance.review
- kb.data_release_governance.r01
- kb.data_release_governance.r02
- kb.data_release_governance.r03
- kb.data_release_governance.r04
- kb.data_release_governance.r05
- kb.data_release_governance.r06
- kb.data_release_governance.r07
- kb.data_release_governance.r08
- kb.data_release_governance.r09
- kb.data_release_governance.r10

## Limitations

- The SOP runtime evaluates canonical values encoded from input/task.md; it does not parse unrestricted Markdown at runtime.
- The reviewed KB circuits evaluate supplied values only and do not verify external evidence or access files, processes, or networks.
- Coverage is limited to the ten supplied release records and reviewed rules R01 through R10.
- Source values written as missing are preserved verbatim and are not replaced with favorable defaults.
~~~

Output hash: `sha256:dfef6d2ad2798d57d567c4166e0cae131cb05c7db22f781ebeee4fc1ae46735d`

## Assurance checks

| Kind | Wire | Passed | Value hash |
| --- | --- | --- | --- |
| goal | `analysisAccepted` | yes | `sha256:e14ed7c7b326ebf11b2cf48c6ab98d8d57d9235c680e1245a8df0b9046402fec` |

## Receipt summary

| Node | Callee | Status | Child receipt |
| --- | --- | --- | --- |
| `n0001` | `task.request` | SUCCEEDED | `sha256:443846db790dd89504184985add13b759074351d4444a3b332bf9c7aaaf233b5` |
| `n0002` | `task.records` | SUCCEEDED | `sha256:4f4037d2b8185e38fd271664e9ecbd53c29a71bf8a1debc7b72f11f6d04c268a` |
| `n0003` | `get` | SUCCEEDED | - |
| `n0004` | `get` | SUCCEEDED | - |
| `n0005` | `get` | SUCCEEDED | - |
| `n0006` | `get` | SUCCEEDED | - |
| `n0007` | `get` | SUCCEEDED | - |
| `n0008` | `get` | SUCCEEDED | - |
| `n0009` | `get` | SUCCEEDED | - |
| `n0010` | `get` | SUCCEEDED | - |
| `n0011` | `get` | SUCCEEDED | - |
| `n0012` | `get` | SUCCEEDED | - |
| `n0013` | `kb.data_release_governance.review` | SUCCEEDED | `sha256:6d9cf01735152ec9b2da49b2eff82a0b31488be62fa1b6e715661354e5793fc0` |
| `n0014` | `kb.data_release_governance.review` | SUCCEEDED | `sha256:7ccc7ea26feb7d6512e5488df038e7c721fa61425a32e03cab014c32670cdc0e` |
| `n0015` | `kb.data_release_governance.review` | SUCCEEDED | `sha256:b20acd0428ed4d6410c4aaafaa8e770d2d26d5a7b8efd145e3f676e3490c78f8` |
| `n0016` | `kb.data_release_governance.review` | SUCCEEDED | `sha256:5716151886bcdb882b3fe74ee03e803f4f9b7154fdaf05d3822940fe8a3d88cf` |
| `n0017` | `kb.data_release_governance.review` | SUCCEEDED | `sha256:5a5d44033f7fa3e8f5b989fb1de66fc09399cc1c81c7f4792cbc4b1cc6c0c612` |
| `n0018` | `kb.data_release_governance.review` | SUCCEEDED | `sha256:7a4307289820448e326ddb1755ea551e4cd00b9ab8e46ecc84ce6726e73f4218` |
| `n0019` | `kb.data_release_governance.review` | SUCCEEDED | `sha256:d0ac1917852a8165e963c1e90cd50915aae8b96a6c25f6a5eb45385d20a8f3d1` |
| `n0020` | `kb.data_release_governance.review` | SUCCEEDED | `sha256:9d88021c100bb99b764067abfd99bd5ba9996e121e76b824a94541375547521f` |
| `n0021` | `kb.data_release_governance.review` | SUCCEEDED | `sha256:9ce6131729a4e88474f913be2cdabf555a336e3e960fa72414c5d910deec62d8` |
| `n0022` | `kb.data_release_governance.review` | SUCCEEDED | `sha256:4b55d85b338673944f0dd138239a2bbf81f205691a684f0e17bc1deb1d1fa167` |
| `n0023` | `aggregate` | SUCCEEDED | - |
| `n0024` | `get` | SUCCEEDED | - |
| `n0025` | `validateAnalysis` | SUCCEEDED | - |
| `n0026` | `assertInvariant` | SUCCEEDED | - |

