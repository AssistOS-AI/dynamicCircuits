# Circuit Runtime Result

> This is the authoritative result emitted by the Dynamic Circuits executor. It is rendered directly from the circuit public outputs and execution receipt; it is not a coding-agent interpretation.

## Execution identity

| Field | Observed value |
| --- | --- |
| Entrypoint | `task.analysis` |
| Outcome | **SUCCEEDED** |
| Package hash | `sha256:fb44d6f0f95b106f2dee964f5ed5bd3b69a781e563435c44155a66b0d81bfcdb` |
| Receipt hash | `sha256:1f0b1a1856010c63df07fc3f6d8fb30ca24c3825810b55d4f9b19f4812b1535b` |
| Executed nodes in root receipt | 9 |
| Dead nodes in root receipt | 0 |

## Public outputs

### analysis

- **findings:**
  1.
    - **caseId:** A
    - **noticeProvidedDays:** 10
    - **applicableMinimumDays:** 30
    - **exceptionUsed:** false
    - **compliant:** false
    - **status:** NON_COMPLIANT
    - **reason:** Notice is below the applicable minimum and the expedited exception was not eligible.
    - **ruleReasonCode:** notice_below_applicable_minimum
    - **reviewPath:** ORDINARY_MINIMUM
    - **evidence:**
      - **expedited:** false
      - **explicitRequest:** false
      - **writtenConsent:** false
      - **writtenConsentState:** NOT_RECORDED
    - **sourceLocators:**
      - **case:** input/cases.md:8
      - **rule:** input/rule.md:3
      - **request:** input/task.md:3
  2.
    - **caseId:** B
    - **noticeProvidedDays:** 10
    - **applicableMinimumDays:** 10
    - **exceptionUsed:** true
    - **compliant:** true
    - **status:** COMPLIANT
    - **reason:** Notice meets the applicable minimum through the expedited exception.
    - **ruleReasonCode:** null
    - **reviewPath:** EXPEDITED_EXCEPTION
    - **evidence:**
      - **expedited:** true
      - **explicitRequest:** true
      - **writtenConsent:** true
      - **writtenConsentState:** RECORDED
    - **sourceLocators:**
      - **case:** input/cases.md:9
      - **rule:** input/rule.md:3
      - **request:** input/task.md:3
  3.
    - **caseId:** C
    - **noticeProvidedDays:** 30
    - **applicableMinimumDays:** 30
    - **exceptionUsed:** false
    - **compliant:** true
    - **status:** COMPLIANT
    - **reason:** Notice meets the applicable ordinary minimum.
    - **ruleReasonCode:** null
    - **reviewPath:** ORDINARY_MINIMUM
    - **evidence:**
      - **expedited:** false
      - **explicitRequest:** false
      - **writtenConsent:** false
      - **writtenConsentState:** NOT_RECORDED
    - **sourceLocators:**
      - **case:** input/cases.md:10
      - **rule:** input/rule.md:3
      - **request:** input/task.md:3
- **counts:**
  - **total:** 3
  - **compliant:** 2
  - **nonCompliant:** 1
  - **exceptionUsed:** 1
- **coverage:**
  - **expectedCaseIds:**
    1. A
    2. B
    3. C
  - **evaluatedCaseIds:**
    1. A
    2. B
    3. C
  - **missingCaseIds:**
(empty list)
  - **unexpectedCaseIds:**
(empty list)
  - **allCasesCovered:** true
  - **expectedCount:** 3
  - **evaluatedCount:** 3
- **requestSourceLocator:** input/task.md:3

Output hash: `sha256:f790f7221fa2c1eba09bb050c5881c8d7e67e6a290a6926b9431d3c11fecd540`

### coverage

- **expectedCaseIds:**
  1. A
  2. B
  3. C
- **evaluatedCaseIds:**
  1. A
  2. B
  3. C
- **missingCaseIds:**
(empty list)
- **unexpectedCaseIds:**
(empty list)
- **allCasesCovered:** true
- **expectedCount:** 3
- **evaluatedCount:** 3

Output hash: `sha256:deabab7d9de1baddec6426e6cc476ce4faad26a6d3995c7f8d5d1bd201da336e`

## Assurance checks

| Kind | Wire | Passed | Value hash |
| --- | --- | --- | --- |
| invariant | `analysisConsistent` | yes | `sha256:b5bea41b6c623f7c09f1bf24dcae58ebab3c0cdd90ad966bc43a45b44867e12b` |
| goal | `coverageGoal` | yes | `sha256:b5bea41b6c623f7c09f1bf24dcae58ebab3c0cdd90ad966bc43a45b44867e12b` |

## Receipt summary

| Node | Callee | Status | Child receipt |
| --- | --- | --- | --- |
| `n0001` | `task.cases` | SUCCEEDED | `sha256:96578284ba5bd1040f0f579188c9c051eacb5f4cc70d43f453de3bfdbcb4c123` |
| `n0002` | `task.request` | SUCCEEDED | `sha256:e0800c6c21f04e134228226daf88b764a086267425e0eff30709e78f285b24de` |
| `n0003` | `kb.notice_review.evaluate` | SUCCEEDED | `sha256:87230202315d6a7436601c0dd8882e9ac2e1aa58dd8bbfc845d2937b18165c94` |
| `n0004` | `kb.notice_review.evaluate` | SUCCEEDED | `sha256:85391f3121ee24febf1e46706f723a40536c96d7f0d2b5c28bfeede5899f7099` |
| `n0005` | `kb.notice_review.evaluate` | SUCCEEDED | `sha256:a2b5d8a082d04545d814c67b31a57bf49db97088d6daa1536711d475217a570c` |
| `n0006` | `buildCoverage` | SUCCEEDED | - |
| `n0007` | `buildAnalysis` | SUCCEEDED | - |
| `n0008` | `coverageSatisfied` | SUCCEEDED | - |
| `n0009` | `validateAnalysis` | SUCCEEDED | - |

