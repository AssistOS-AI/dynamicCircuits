# Circuit Runtime Result

> This is the authoritative result emitted by the Dynamic Circuits executor. It is rendered directly from the circuit public outputs and execution receipt; it is not a coding-agent interpretation.

## Execution identity

| Field | Observed value |
| --- | --- |
| Entrypoint | `task.analysis` |
| Outcome | **SUCCEEDED** |
| Package hash | `sha256:92bf8493c033d09e21976ed8f97e4be9e6a4644aede9ccc9ea732ba4df33811d` |
| Receipt hash | `sha256:dea250d49b696fe6ee4a36c5ef9855f074369bada3611eb06e0a8bbfe1b8ca4e` |
| Executed nodes in root receipt | 4 |
| Dead nodes in root receipt | 0 |

## Public outputs

### report

- **planId:** explicit-supersession-plan
- **reviewVerdict:** CONSISTENT
- **launchDateFinding:**
  - **status:** CONSISTENT
  - **reason:** null
  - **dateAssertions:**
    1.
      - **assertionId:** Launch-date assertion A
      - **chapterId:** Chapter A
      - **chapterIndex:** 0
      - **dateValue:** 2026-10-10
      - **dateKey:** 2026-10-10
      - **supersedes:**
(empty list)
    2.
      - **assertionId:** Launch-date assertion B
      - **chapterId:** Chapter B
      - **chapterIndex:** 1
      - **dateValue:** 2026-10-17
      - **dateKey:** 2026-10-17
      - **supersedes:**
        1. Launch-date assertion A
  - **activeAssertions:**
    1.
      - **assertionId:** Launch-date assertion B
      - **chapterId:** Chapter B
      - **chapterIndex:** 1
      - **dateValue:** 2026-10-17
      - **dateKey:** 2026-10-17
  - **distinctActiveDateKeys:**
    1. 2026-10-17
  - **chaptersWithoutDate:**
(empty list)
  - **supersessions:**
    1.
      - **targetAssertionId:** Launch-date assertion A
      - **targetChapterId:** Chapter A
      - **supersededByAssertionId:** Launch-date assertion B
      - **supersedingChapterId:** Chapter B
- **termFindings:**
  1.
    - **termKey:** node
    - **status:** CONSISTENT
    - **reason:** null
    - **sourceChapters:**
      1. Chapter A
      2. Chapter B
    - **knownMeaningKeys:**
      1. executable-semantic-circuit-package-with-explicit-ports
    - **uncertaintyPresent:** false
    - **entries:**
      1.
        - **chapterId:** Chapter A
        - **chapterIndex:** 0
        - **term:** Node
        - **termKey:** node
        - **definitionText:** an executable semantic circuit package with explicit ports
        - **meaningKey:** executable-semantic-circuit-package-with-explicit-ports
      2.
        - **chapterId:** Chapter B
        - **chapterIndex:** 1
        - **term:** Node
        - **termKey:** node
        - **definitionText:** an executable semantic circuit package with explicit ports
        - **meaningKey:** executable-semantic-circuit-package-with-explicit-ports
- **conflictingTermKeys:**
(empty list)
- **unknownTermKeys:**
(empty list)
- **uncertaintyPreserved:** false
- **preferredLaunchDate:** null
- **preferredDefinitions:**
(empty list)
- **sourceLocators:**
  1. input/review-rules.md:3

Output hash: `sha256:0908e077cf87e8d2836c4e77e597d616f68bd648041eacb168f2b1030044e242`

### sourceEvidence

- **manifestPath:** .dynamic-circuits/input-manifest.json
- **inputPath:** input/plan.md
- **requestLocators:**
  1. input/plan.md:3
  2. input/plan.md:4
- **completenessLocator:** input/plan.md:15
- **chapters:**
  1.
    - **chapterId:** Chapter A
    - **headingLocator:** input/plan.md:6
    - **assertionLocator:** input/plan.md:8
    - **definitionLocator:** input/plan.md:8
  2.
    - **chapterId:** Chapter B
    - **headingLocator:** input/plan.md:10
    - **assertionLocators:**
      1. input/plan.md:12
      2. input/plan.md:13
    - **definitionLocators:**
      1. input/plan.md:12
      2. input/plan.md:13

Output hash: `sha256:ab5f0fb09a37dbfa88b5d6830d39e7c6ae5a29ff8483e50b5b18d15aaae93aa5`

## Assurance checks

| Kind | Wire | Passed | Value hash |
| --- | --- | --- | --- |
| invariant | `analysisComplete` | yes | `sha256:fec3f2157dfae7fc4cb358d8ceebeb0c1545df2560bf2e0052b85455b96c076c` |

## Receipt summary

| Node | Callee | Status | Child receipt |
| --- | --- | --- | --- |
| `n0001` | `task.plan` | SUCCEEDED | `sha256:6fe227d55aa3b582dc52e0f34e5ddda63b84ea44acaa879bb96fe3fbc85ff039` |
| `n0002` | `kb.release_plan_consistency.review` | SUCCEEDED | `sha256:5a6a7a41e6c56392d6378a2662b1ab454b83f19e7dfcafa70572baca536de3dc` |
| `n0003` | `validateAnalysis` | SUCCEEDED | - |
| `n0004` | `assertInvariant` | SUCCEEDED | - |

