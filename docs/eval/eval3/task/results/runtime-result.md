# Circuit Runtime Result

> This is the authoritative result emitted by the Dynamic Circuits executor. It is rendered directly from the circuit public outputs and execution receipt; it is not a coding-agent interpretation.

## Execution identity

| Field | Observed value |
| --- | --- |
| Entrypoint | `task.analysis` |
| Outcome | **SUCCEEDED** |
| Package hash | `sha256:b27b0a63d64b82555ac69ce4b900b381086893c7c965d04e1533e5466c981005` |
| Receipt hash | `sha256:67c0cf1cd0630682d007dc14a0f87abc2ff7650db9f42aabe0f49c5d3f0eeffb` |
| Executed nodes in root receipt | 9 |
| Dead nodes in root receipt | 0 |

## Public outputs

### report

- **planId:** task-release-plan
- **reviewVerdict:** CONFLICT
- **launchDateFinding:**
  - **status:** CONFLICT
  - **reason:** multiple_unsuperseded_launch_dates
  - **dateAssertions:**
    1.
      - **assertionId:** chapter-01.launch-date
      - **chapterId:** chapter-01
      - **chapterIndex:** 0
      - **dateValue:** 2026-06-15
      - **dateKey:** 2026-06-15
      - **supersedes:**
(empty list)
    2.
      - **assertionId:** chapter-02.launch-date
      - **chapterId:** chapter-02
      - **chapterIndex:** 1
      - **dateValue:** 2026-07-01
      - **dateKey:** 2026-07-01
      - **supersedes:**
(empty list)
  - **activeAssertions:**
    1.
      - **assertionId:** chapter-01.launch-date
      - **chapterId:** chapter-01
      - **chapterIndex:** 0
      - **dateValue:** 2026-06-15
      - **dateKey:** 2026-06-15
    2.
      - **assertionId:** chapter-02.launch-date
      - **chapterId:** chapter-02
      - **chapterIndex:** 1
      - **dateValue:** 2026-07-01
      - **dateKey:** 2026-07-01
  - **distinctActiveDateKeys:**
    1. 2026-06-15
    2. 2026-07-01
  - **chaptersWithoutDate:**
    1. chapter-03
  - **supersessions:**
(empty list)
- **termFindings:**
  1.
    - **termKey:** node
    - **status:** CONFLICT
    - **reason:** incompatible_definition_meanings
    - **sourceChapters:**
      1. chapter-01
      2. chapter-03
    - **knownMeaningKeys:**
      1. executable-semantic-circuit-package-with-explicit-ports
      2. single-mutable-database-row-in-operational-registry
    - **uncertaintyPresent:** false
    - **entries:**
      1.
        - **chapterId:** chapter-01
        - **chapterIndex:** 0
        - **term:** Node
        - **termKey:** node
        - **definitionText:** an executable semantic circuit package with explicit input and output ports
        - **meaningKey:** executable-semantic-circuit-package-with-explicit-ports
      2.
        - **chapterId:** chapter-03
        - **chapterIndex:** 2
        - **term:** Node
        - **termKey:** node
        - **definitionText:** a single mutable database row in the operational registry
        - **meaningKey:** single-mutable-database-row-in-operational-registry
- **conflictingTermKeys:**
  1. node
- **unknownTermKeys:**
(empty list)
- **uncertaintyPreserved:** false
- **preferredLaunchDate:** null
- **preferredDefinitions:**
(empty list)
- **sourceLocators:**
  1. input/review-rules.md:3

Output hash: `sha256:6511a5ddcc650608d29f3670f47111ae409204c75c40793255a05f2d57faa722`

### sourceContext

- **request:**
  - **requestId:** release-plan-cross-chapter-review
  - **sourceLocator:** input/task.md:3
  - **interpretationScope:** each_chapter_independently
  - **comparisons:**
    1. launch_dates
    2. definitions
  - **conflictReporting:** every_conflict_with_source_labels
  - **resolutionRule:** explicit_supersession_required
- **chapters:**
  1.
    - **chapterId:** chapter-01
    - **sourceLocator:** input/chapter-01.md:3
    - **launchDate:**
      - **assertionId:** chapter-01.launch-date
      - **value:** 2026-06-15
      - **dateKey:** 2026-06-15
      - **supersedes:**
(empty list)
      - **sourceLocator:** input/chapter-01.md:3
    - **definitions:**
      1.
        - **term:** Node
        - **termKey:** node
        - **text:** an executable semantic circuit package with explicit input and output ports
        - **meaningKey:** executable-semantic-circuit-package-with-explicit-ports
        - **sourceLocator:** input/chapter-01.md:3
  2.
    - **chapterId:** chapter-02
    - **sourceLocator:** input/chapter-02.md:3
    - **launchDate:**
      - **assertionId:** chapter-02.launch-date
      - **value:** 2026-07-01
      - **dateKey:** 2026-07-01
      - **supersedes:**
(empty list)
      - **sourceLocator:** input/chapter-02.md:3
    - **definitions:**
(empty list)
  3.
    - **chapterId:** chapter-03
    - **sourceLocator:** input/chapter-03.md:3
    - **launchDate:** null
    - **definitions:**
      1.
        - **term:** Node
        - **termKey:** node
        - **text:** a single mutable database row in the operational registry
        - **meaningKey:** single-mutable-database-row-in-operational-registry
        - **sourceLocator:** input/chapter-03.md:3

Output hash: `sha256:085bf391cb061582c4814f9c1e38eef80607426e59e1b963c5931cc0181262c1`

## Assurance checks

| Kind | Wire | Passed | Value hash |
| --- | --- | --- | --- |
| goal | `analysisComplete` | yes | `sha256:ba7dda9ad19cdcb42448bddd041fe7e40ddc1fa884b30dd98dfa81d37123c759` |

## Receipt summary

| Node | Callee | Status | Child receipt |
| --- | --- | --- | --- |
| `n0001` | `task.chapter_01` | SUCCEEDED | `sha256:75afc4e7c034c9e6b637a400e12a75e86a0116ef6ff545533bf5a6f10eb62083` |
| `n0002` | `task.chapter_02` | SUCCEEDED | `sha256:272d95c02ed0bda1cd9af7e17970a811e31fb83ca7b309ac294934c17461bea7` |
| `n0003` | `task.chapter_03` | SUCCEEDED | `sha256:8fca66a8e55ea1e9604c509b6e81fd8703141e6c6a5ecfc7a75e9f1cf654da1e` |
| `n0004` | `task.request` | SUCCEEDED | `sha256:6a5b4848f1fd445a1731bda8cd41f40a4481abe6742127226dde67e040214fb8` |
| `n0005` | `assemble` | SUCCEEDED | - |
| `n0006` | `kb.release_plan_consistency.review` | SUCCEEDED | `sha256:e6857f0343e1ab035d2dc87a0da8427069f7de9040baa0d690fc8da24dd2ed32` |
| `n0007` | `get` | SUCCEEDED | - |
| `n0008` | `validate` | SUCCEEDED | - |
| `n0009` | `assertInvariant` | SUCCEEDED | - |

