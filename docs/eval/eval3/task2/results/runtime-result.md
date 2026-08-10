# Circuit Runtime Result

> This is the authoritative result emitted by the Dynamic Circuits executor. It is rendered directly from the circuit public outputs and execution receipt; it is not a coding-agent interpretation.

## Execution identity

| Field | Observed value |
| --- | --- |
| Entrypoint | `task.analysis` |
| Outcome | **SUCCEEDED** |
| Package hash | `sha256:0804b4d2edf21b7e8ad7df7a810b052d732fd4c2857d118a3852e0a81bf69490` |
| Receipt hash | `sha256:320f85be66900181085049b4a2dd0cc330083df7bbe43faf5edafdf29b6f6d17` |
| Executed nodes in root receipt | 3 |
| Dead nodes in root receipt | 0 |

## Public outputs

### review

- **planId:** consistent-release-plan
- **reviewVerdict:** CONSISTENT
- **launchDateFinding:**
  - **status:** CONSISTENT
  - **reason:** null
  - **dateAssertions:**
    1.
      - **assertionId:** chapter-a-production-launch-date
      - **chapterId:** chapter-a
      - **chapterIndex:** 0
      - **dateValue:** 2026-09-01
      - **dateKey:** 2026-09-01
      - **supersedes:**
(empty list)
    2.
      - **assertionId:** chapter-b-production-launch-date
      - **chapterId:** chapter-b
      - **chapterIndex:** 1
      - **dateValue:** 2026-09-01
      - **dateKey:** 2026-09-01
      - **supersedes:**
(empty list)
  - **activeAssertions:**
    1.
      - **assertionId:** chapter-a-production-launch-date
      - **chapterId:** chapter-a
      - **chapterIndex:** 0
      - **dateValue:** 2026-09-01
      - **dateKey:** 2026-09-01
    2.
      - **assertionId:** chapter-b-production-launch-date
      - **chapterId:** chapter-b
      - **chapterIndex:** 1
      - **dateValue:** 2026-09-01
      - **dateKey:** 2026-09-01
  - **distinctActiveDateKeys:**
    1. 2026-09-01
  - **chaptersWithoutDate:**
(empty list)
  - **supersessions:**
(empty list)
- **termFindings:**
  1.
    - **termKey:** node
    - **status:** CONSISTENT
    - **reason:** null
    - **sourceChapters:**
      1. chapter-a
      2. chapter-b
    - **knownMeaningKeys:**
      1. executable-semantic-circuit-package-with-explicit-ports
    - **uncertaintyPresent:** false
    - **entries:**
      1.
        - **chapterId:** chapter-a
        - **chapterIndex:** 0
        - **term:** Node
        - **termKey:** node
        - **definitionText:** an executable semantic circuit package with explicit ports
        - **meaningKey:** executable-semantic-circuit-package-with-explicit-ports
      2.
        - **chapterId:** chapter-b
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

Output hash: `sha256:310d48cb0b5f65ef50dbe4b97e7fb41cf78418ddce06fb0540b503de64378225`

### evidence

- **taskRequest:**
  - **interpretChaptersIndependently:** true
  - **compareDates:** true
  - **compareDefinitions:** true
  - **reportConflicts:** true
  - **reportUncertainty:** true
  - **preferredValueAuthorized:** false
  - **sourceLocator:** input/plan.md:3-4
- **scopeFacts:**
  - **chaptersComplete:** true
  - **supersessionRelationship:** NONE
  - **sourceLocator:** input/plan.md:14
- **factSources:**
  1.
    - **factId:** chapter-a-production-launch-date
    - **support:** DIRECT
    - **sourceLocator:** input/plan.md:8
  2.
    - **factId:** chapter-a-node-definition
    - **support:** DIRECT
    - **sourceLocator:** input/plan.md:8
  3.
    - **factId:** chapter-b-production-launch-date
    - **support:** DIRECT
    - **sourceLocator:** input/plan.md:12
  4.
    - **factId:** chapter-b-node-definition
    - **support:** DIRECT
    - **sourceLocator:** input/plan.md:12
  5.
    - **factId:** chapter-completeness-and-non-supersession
    - **support:** DIRECT
    - **sourceLocator:** input/plan.md:14
- **sourceDocument:** input/plan.md
- **sourceManifestEntry:**
  - **bytes:** 518
  - **sha256:** 6903e7339be4217975ca8d96b6d0fe6f2d525c89764bacc09e93bd07535def31
- **normalizationMethod:** coding-agent-authored task facts from manifest-listed natural-language evidence

Output hash: `sha256:4b345a1665bccd75ca3e7939bf2bb4073a892f69bcafddf978e5cb2569784de1`

## Assurance checks

| Kind | Wire | Passed | Value hash |
| --- | --- | --- | --- |
| goal | `analysisGrounded` | yes | `sha256:b5bea41b6c623f7c09f1bf24dcae58ebab3c0cdd90ad966bc43a45b44867e12b` |

## Receipt summary

| Node | Callee | Status | Child receipt |
| --- | --- | --- | --- |
| `n0001` | `task.release_plan` | SUCCEEDED | `sha256:1b518f28acf86623c9e264a9777ce17853b54298d3d1c35a8012bd3222629fe2` |
| `n0002` | `kb.release_plan_consistency.review` | SUCCEEDED | `sha256:8ee5ffc6ab4dbf9bf77c4476ac8a6c69ef30a4a2d9cd55feee6a0b5d4738b4ab` |
| `n0003` | `ground` | SUCCEEDED | - |

