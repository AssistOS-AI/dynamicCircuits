# Circuit Runtime Result

> This is the authoritative result emitted by the Dynamic Circuits executor. It is rendered directly from the circuit public outputs and execution receipt; it is not a coding-agent interpretation.

## Execution identity

| Field | Observed value |
| --- | --- |
| Entrypoint | `task.analysis` |
| Outcome | **SUCCEEDED** |
| Package hash | `sha256:4f7fc5bdb1ba3445d2df0af701d291e4c0902052110c320e50a30d3c68f6594c` |
| Receipt hash | `sha256:c3bd01d3408d7efb7cbca0ae96f2bca8065e879be25b1c1cbc76704ca7d4aa3b` |
| Executed nodes in root receipt | 6 |
| Dead nodes in root receipt | 0 |

## Public outputs

### pilotAnswer

- **schemaVersion:** 1
- **status:** CONFLICT
- **query:**
  - **subject:** Nia
  - **predicate:** pilot
  - **polarity:** POSITIVE
- **opposite:**
  - **subject:** Nia
  - **predicate:** pilot
  - **polarity:** NEGATIVE
- **querySupport:**
  - **literal:**
    - **predicate:** pilot
    - **polarity:** POSITIVE
  - **supportMode:** DIRECT
  - **minimumDepth:** 0
  - **evidence:**
    1.
      - **type:** DIRECT
      - **locator:** input/context-and-questions.md:3
- **oppositeSupport:**
  - **literal:**
    - **predicate:** pilot
    - **polarity:** NEGATIVE
  - **supportMode:** DIRECT
  - **minimumDepth:** 0
  - **evidence:**
    1.
      - **type:** DIRECT
      - **locator:** input/context-and-questions.md:5
- **closure:**
  1.
    - **literal:**
      - **predicate:** pilot
      - **polarity:** NEGATIVE
    - **supportMode:** DIRECT
    - **minimumDepth:** 0
    - **evidence:**
      1.
        - **type:** DIRECT
        - **locator:** input/context-and-questions.md:5
  2.
    - **literal:**
      - **predicate:** pilot
      - **polarity:** POSITIVE
    - **supportMode:** DIRECT
    - **minimumDepth:** 0
    - **evidence:**
      1.
        - **type:** DIRECT
        - **locator:** input/context-and-questions.md:3
  3.
    - **literal:**
      - **predicate:** trained
      - **polarity:** POSITIVE
    - **supportMode:** DERIVED
    - **minimumDepth:** 1
    - **evidence:**
      1.
        - **type:** DERIVED
        - **locator:** input/context-and-questions.md:7
        - **from:**
          - **predicate:** pilot
          - **polarity:** POSITIVE
        - **depth:** 1
- **metrics:**
  - **inputFactCount:** 2
  - **factsForSubject:** 2
  - **inputRuleCount:** 1
  - **supportedLiteralCount:** 3
  - **iterations:** 2
  - **duplicateEvidenceSuppressed:** 0

Output hash: `sha256:9e84c76906364b7ec76281588428d937a6601e7f3ddf3047e971857f8946e68a`

### trainedAnswer

- **schemaVersion:** 1
- **status:** SUPPORTED
- **query:**
  - **subject:** Nia
  - **predicate:** trained
  - **polarity:** POSITIVE
- **opposite:**
  - **subject:** Nia
  - **predicate:** trained
  - **polarity:** NEGATIVE
- **querySupport:**
  - **literal:**
    - **predicate:** trained
    - **polarity:** POSITIVE
  - **supportMode:** DERIVED
  - **minimumDepth:** 1
  - **evidence:**
    1.
      - **type:** DERIVED
      - **locator:** input/context-and-questions.md:7
      - **from:**
        - **predicate:** pilot
        - **polarity:** POSITIVE
      - **depth:** 1
- **oppositeSupport:** null
- **closure:**
  1.
    - **literal:**
      - **predicate:** pilot
      - **polarity:** NEGATIVE
    - **supportMode:** DIRECT
    - **minimumDepth:** 0
    - **evidence:**
      1.
        - **type:** DIRECT
        - **locator:** input/context-and-questions.md:5
  2.
    - **literal:**
      - **predicate:** pilot
      - **polarity:** POSITIVE
    - **supportMode:** DIRECT
    - **minimumDepth:** 0
    - **evidence:**
      1.
        - **type:** DIRECT
        - **locator:** input/context-and-questions.md:3
  3.
    - **literal:**
      - **predicate:** trained
      - **polarity:** POSITIVE
    - **supportMode:** DERIVED
    - **minimumDepth:** 1
    - **evidence:**
      1.
        - **type:** DERIVED
        - **locator:** input/context-and-questions.md:7
        - **from:**
          - **predicate:** pilot
          - **polarity:** POSITIVE
        - **depth:** 1
- **metrics:**
  - **inputFactCount:** 2
  - **factsForSubject:** 2
  - **inputRuleCount:** 1
  - **supportedLiteralCount:** 3
  - **iterations:** 2
  - **duplicateEvidenceSuppressed:** 0

Output hash: `sha256:fea0f1000a5c01cf8adb4e0b3bac76d39348f82efafd4a190eaeafe9f4c7a947`

### sailorAnswer

- **schemaVersion:** 1
- **status:** UNKNOWN
- **query:**
  - **subject:** Nia
  - **predicate:** sailor
  - **polarity:** POSITIVE
- **opposite:**
  - **subject:** Nia
  - **predicate:** sailor
  - **polarity:** NEGATIVE
- **querySupport:** null
- **oppositeSupport:** null
- **closure:**
  1.
    - **literal:**
      - **predicate:** pilot
      - **polarity:** NEGATIVE
    - **supportMode:** DIRECT
    - **minimumDepth:** 0
    - **evidence:**
      1.
        - **type:** DIRECT
        - **locator:** input/context-and-questions.md:5
  2.
    - **literal:**
      - **predicate:** pilot
      - **polarity:** POSITIVE
    - **supportMode:** DIRECT
    - **minimumDepth:** 0
    - **evidence:**
      1.
        - **type:** DIRECT
        - **locator:** input/context-and-questions.md:3
  3.
    - **literal:**
      - **predicate:** trained
      - **polarity:** POSITIVE
    - **supportMode:** DERIVED
    - **minimumDepth:** 1
    - **evidence:**
      1.
        - **type:** DERIVED
        - **locator:** input/context-and-questions.md:7
        - **from:**
          - **predicate:** pilot
          - **polarity:** POSITIVE
        - **depth:** 1
- **metrics:**
  - **inputFactCount:** 2
  - **factsForSubject:** 2
  - **inputRuleCount:** 1
  - **supportedLiteralCount:** 3
  - **iterations:** 2
  - **duplicateEvidenceSuppressed:** 0

Output hash: `sha256:40c5f4f5c933ff2f8e8fe16143f61153cd45bef6f7f4addd010ae22fa09cef17`

## Assurance checks

| Kind | Wire | Passed | Value hash |
| --- | --- | --- | --- |
| goal | `analysisComplete` | yes | `sha256:b5bea41b6c623f7c09f1bf24dcae58ebab3c0cdd90ad966bc43a45b44867e12b` |

## Receipt summary

| Node | Callee | Status | Child receipt |
| --- | --- | --- | --- |
| `n0001` | `task.context` | SUCCEEDED | `sha256:7c4da99d7a6072be62603c08afe6bdd47b786df3a3afe19ec69687b701e3d48b` |
| `n0002` | `task.request` | SUCCEEDED | `sha256:96564e27d7d2d63e5d717af2196f0161d833c395b593e60b3777a47251527883` |
| `n0003` | `kb.unary_entailment.evaluate` | SUCCEEDED | `sha256:7517643a6b355cf06b7284180db2b8efb2d74c383153335f274e30fe5d86111a` |
| `n0004` | `kb.unary_entailment.evaluate` | SUCCEEDED | `sha256:d73b0fb7e17206e062604d08e25d8e23bf454301519890c0e1b6c5204421f1bb` |
| `n0005` | `kb.unary_entailment.evaluate` | SUCCEEDED | `sha256:0e342ab9b24c04f9a00d404682f3cfcfcf4df66747d94b5f990c6732bfd2b969` |
| `n0006` | `verify` | SUCCEEDED | - |

