# Circuit Runtime Result

> This is the authoritative result emitted by the Dynamic Circuits executor. It is rendered directly from the circuit public outputs and execution receipt; it is not a coding-agent interpretation.

## Execution identity

| Field | Observed value |
| --- | --- |
| Entrypoint | `task.analysis` |
| Outcome | **SUCCEEDED** |
| Package hash | `sha256:f7369cd8eb49a70f985683ff7048cf9a3fbf27e2fefa31837751ce36ccfe5018` |
| Receipt hash | `sha256:32afe33a23ca66090b76b739f14e4788d87b9ad14dee463e0f297fd0f66e6872` |
| Executed nodes in root receipt | 10 |
| Dead nodes in root receipt | 0 |

## Public outputs

### findings

1.
  - **caseId:** D
  - **taskSourceLocator:** input/cases-and-request.md:8
  - **policyFinding:**
    - **status:** NON_COMPLIANT
    - **reason:** notice_below_applicable_minimum
    - **reviewDays:** 29
    - **applicableMinimumDays:** 30
    - **reviewPath:** ORDINARY_MINIMUM
    - **exceptionEligible:** false
    - **evidence:**
      - **expedited:** false
      - **explicitRequest:** false
      - **writtenConsent:** false
      - **writtenConsentState:** NOT_RECORDED
    - **sourceLocator:** input/rule.md:3
2.
  - **caseId:** E
  - **taskSourceLocator:** input/cases-and-request.md:9
  - **policyFinding:**
    - **status:** NON_COMPLIANT
    - **reason:** notice_below_applicable_minimum
    - **reviewDays:** 9
    - **applicableMinimumDays:** 10
    - **reviewPath:** EXPEDITED_EXCEPTION
    - **exceptionEligible:** true
    - **evidence:**
      - **expedited:** true
      - **explicitRequest:** true
      - **writtenConsent:** true
      - **writtenConsentState:** RECORDED
    - **sourceLocator:** input/rule.md:3
3.
  - **caseId:** F
  - **taskSourceLocator:** input/cases-and-request.md:10
  - **policyFinding:**
    - **status:** COMPLIANT
    - **reason:** null
    - **reviewDays:** 30
    - **applicableMinimumDays:** 30
    - **reviewPath:** ORDINARY_MINIMUM
    - **exceptionEligible:** false
    - **evidence:**
      - **expedited:** true
      - **explicitRequest:** true
      - **writtenConsent:** false
      - **writtenConsentState:** NOT_RECORDED
    - **sourceLocator:** input/rule.md:3

Output hash: `sha256:7f4a5ae032d3c18ca27a5f759f1c9c0a9664c431bccd5c73be34ae1a7049b338`

### counts

- **total:** 3
- **compliant:** 1
- **nonCompliant:** 2
- **byReviewPath:**
  - **ordinaryMinimum:** 2
  - **expeditedException:** 1

Output hash: `sha256:8a89599b8fc454f3ce505d259e454b9ae318972494badadbdb8e1ce45b84374d`

### coverage

- **complete:** true
- **expectedCount:** 3
- **evaluatedCount:** 3
- **expectedCaseIds:**
  1. D
  2. E
  3. F
- **evaluatedCaseIds:**
  1. D
  2. E
  3. F
- **missingCaseIds:**
(empty list)
- **unexpectedCaseIds:**
(empty list)
- **requestSourceLocator:** input/cases-and-request.md:3-4
- **completenessSourceLocator:** input/cases-and-request.md:12

Output hash: `sha256:5985d9b000cbbf998ed9da39322414a92bfdbd221dd30dd5901ea20fe5accd30`

## Assurance checks

| Kind | Wire | Passed | Value hash |
| --- | --- | --- | --- |
| goal | `completeAnalysis` | yes | `sha256:65e316ad1028341c96f22c53ceb3ec1075ed3c9a28d38827f7c71415e00463d8` |

## Receipt summary

| Node | Callee | Status | Child receipt |
| --- | --- | --- | --- |
| `n0001` | `task.input` | SUCCEEDED | `sha256:7aa6ab2c92baf2f6fe4fd9b388e12db6e2bc8a971bbca8267e1756f5c7dff49d` |
| `n0002` | `kb.notice_review.evaluate` | SUCCEEDED | `sha256:88988c1eb291eb136ed54b7cb76337611ed149d402d0f196020fcbae3300a498` |
| `n0003` | `kb.notice_review.evaluate` | SUCCEEDED | `sha256:a55a299439bd7d166a8f3594adb9586aeb4f5ceab6fce00773231097c4096d2c` |
| `n0004` | `kb.notice_review.evaluate` | SUCCEEDED | `sha256:ec30de062a9bc526bd0b677921ee3643d9baccc68e5093ede8f1821d96ea4e2a` |
| `n0005` | `assemble` | SUCCEEDED | - |
| `n0006` | `get` | SUCCEEDED | - |
| `n0007` | `get` | SUCCEEDED | - |
| `n0008` | `get` | SUCCEEDED | - |
| `n0009` | `validateCompleteAnalysis` | SUCCEEDED | - |
| `n0010` | `assertInvariant` | SUCCEEDED | - |

