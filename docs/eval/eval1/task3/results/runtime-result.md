# Circuit Runtime Result

> This is the authoritative result emitted by the Dynamic Circuits executor. It is rendered directly from the circuit public outputs and execution receipt; it is not a coding-agent interpretation.

## Execution identity

| Field | Observed value |
| --- | --- |
| Entrypoint | `task.analysis` |
| Outcome | **SUCCEEDED** |
| Package hash | `sha256:047f6809e774bc0f9496bed5085bf0ac89794752647985c93c7b80086052a373` |
| Receipt hash | `sha256:79f2f507fd9000f7355c7fbb3a4b7083e61d4da512683180c69edcb534e17737` |
| Executed nodes in root receipt | 18 |
| Dead nodes in root receipt | 0 |

## Public outputs

### findings

1.
  - **caseId:** G
  - **sourceLocator:** input/cases-and-request.md:8
  - **noticeProvidedDays:** 45
  - **applicableMinimumDays:** 30
  - **exceptionUsed:** false
  - **reviewPath:** ORDINARY_MINIMUM
  - **compliance:** COMPLIANT
  - **reason:** null
  - **evidence:**
    - **expedited:** false
    - **explicitRequest:** false
    - **writtenConsent:** false
    - **writtenConsentState:** NOT_RECORDED
  - **reviewedRuleSourceLocator:** input/rule.md:3
2.
  - **caseId:** H
  - **sourceLocator:** input/cases-and-request.md:9
  - **noticeProvidedDays:** 10
  - **applicableMinimumDays:** 10
  - **exceptionUsed:** true
  - **reviewPath:** EXPEDITED_EXCEPTION
  - **compliance:** COMPLIANT
  - **reason:** null
  - **evidence:**
    - **expedited:** true
    - **explicitRequest:** true
    - **writtenConsent:** true
    - **writtenConsentState:** RECORDED
  - **reviewedRuleSourceLocator:** input/rule.md:3
3.
  - **caseId:** I
  - **sourceLocator:** input/cases-and-request.md:10
  - **noticeProvidedDays:** 10
  - **applicableMinimumDays:** 30
  - **exceptionUsed:** false
  - **reviewPath:** ORDINARY_MINIMUM
  - **compliance:** NON_COMPLIANT
  - **reason:** notice_below_applicable_minimum
  - **evidence:**
    - **expedited:** true
    - **explicitRequest:** true
    - **writtenConsent:** false
    - **writtenConsentState:** NOT_RECORDED
  - **reviewedRuleSourceLocator:** input/rule.md:3
4.
  - **caseId:** J
  - **sourceLocator:** input/cases-and-request.md:11
  - **noticeProvidedDays:** 30
  - **applicableMinimumDays:** 30
  - **exceptionUsed:** false
  - **reviewPath:** ORDINARY_MINIMUM
  - **compliance:** COMPLIANT
  - **reason:** null
  - **evidence:**
    - **expedited:** false
    - **explicitRequest:** false
    - **writtenConsent:** false
    - **writtenConsentState:** NOT_RECORDED
  - **reviewedRuleSourceLocator:** input/rule.md:3

Output hash: `sha256:b876962d2d1c3a3627de2481d41b4b9460570f3543d34a27eabf28195ab7525e`

### totals

- **total:** 4
- **compliant:** 3
- **nonCompliant:** 1
- **exceptionUsed:** 1
- **ordinaryMinimum:** 3
- **expeditedException:** 1

Output hash: `sha256:74e280d3618a1bc69731b7358b9daf1803105c5e7e1595280c0dd97ed7c0d835`

### coverage

- **inputSource:** input/cases-and-request.md
- **inputSha256:** 68884e9f38ea46783f626e0dd1d0ee651afaf608d70dff76b8c261e9167ae495
- **requestLocator:** input/cases-and-request.md:3-4
- **evidenceBoundaryLocator:** input/cases-and-request.md:13
- **rowSourceLocators:**
  1. input/cases-and-request.md:8
  2. input/cases-and-request.md:9
  3. input/cases-and-request.md:10
  4. input/cases-and-request.md:11
- **requestedOutputs:**
  1. applicableMinimum
  2. exceptionUse
  3. compliance
  4. reason
  5. totals
  6. coverageEvidence
- **requestedCaseIds:**
  1. G
  2. H
  3. I
  4. J
- **evaluatedCaseIds:**
  1. G
  2. H
  3. I
  4. J
- **requestedCaseCount:** 4
- **evaluatedCaseCount:** 4
- **allRequestedCasesEvaluated:** true
- **reviewedCircuit:** kb.notice_review.evaluate
- **reviewedRuleSourceLocators:**
  1. input/rule.md:3
- **normalization:**
  - **sourceField:** Expedited requested
  - **targetFields:**
    1. expedited
    2. subjectExplicitlyRequestedExpedited
  - **method:** The single supplied yes/no value is mapped to both reviewed-circuit request flags.
  - **sourceLocator:** input/cases-and-request.md:6
- **totalsAgreeWithEvaluatedCount:** true

Output hash: `sha256:e11228b9c99582c85af405419487bba01c3e0efebe2143d91b6c7a93fa66b04a`

## Assurance checks

| Kind | Wire | Passed | Value hash |
| --- | --- | --- | --- |
| goal | `analysisComplete` | yes | `sha256:432fff3d7c620e885d0edfc0b36eae5ff7d1197270e2acd9cc93c6d075ce40c4` |

## Receipt summary

| Node | Callee | Status | Child receipt |
| --- | --- | --- | --- |
| `n0001` | `task.cases` | SUCCEEDED | `sha256:68d2058caa5f8e15e36b0b512fce392441f8e1c52a4d92b0ccea3bb981cd980e` |
| `n0002` | `get` | SUCCEEDED | - |
| `n0003` | `get` | SUCCEEDED | - |
| `n0004` | `get` | SUCCEEDED | - |
| `n0005` | `get` | SUCCEEDED | - |
| `n0006` | `get` | SUCCEEDED | - |
| `n0007` | `get` | SUCCEEDED | - |
| `n0008` | `get` | SUCCEEDED | - |
| `n0009` | `get` | SUCCEEDED | - |
| `n0010` | `kb.notice_review.evaluate` | SUCCEEDED | `sha256:10e7dac086d2fca57863e1e68d9c3f174490cc3afdbd953de9a58e744749ee3b` |
| `n0011` | `kb.notice_review.evaluate` | SUCCEEDED | `sha256:6d08d0423a085ef9bbb38e52dd2e8a044db0003df17d0614fe632119a4823f29` |
| `n0012` | `kb.notice_review.evaluate` | SUCCEEDED | `sha256:d421b7369c9e20f90ee1f9452de189273f6c4803c015325f8b9e78ce9d86880d` |
| `n0013` | `kb.notice_review.evaluate` | SUCCEEDED | `sha256:5ba012c534a4ef21964a7bb6b29045e8ee535794efab54ee2f29f1b0adc772c5` |
| `n0014` | `assembleFindings` | SUCCEEDED | - |
| `n0015` | `summarize` | SUCCEEDED | - |
| `n0016` | `buildCoverage` | SUCCEEDED | - |
| `n0017` | `validateAnalysis` | SUCCEEDED | - |
| `n0018` | `assertInvariant` | SUCCEEDED | - |

