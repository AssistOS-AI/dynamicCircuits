# Circuit Runtime Result

> This is the authoritative result emitted by the Dynamic Circuits executor. It is rendered directly from the circuit public outputs and execution receipt; it is not a coding-agent interpretation.

## Execution identity

| Field | Observed value |
| --- | --- |
| Entrypoint | `task.analysis` |
| Outcome | **SUCCEEDED** |
| Package hash | `sha256:fb729abb8bc2a5f933fe730d3d49bb3b0d5e246d021e604662a703809e69c58e` |
| Receipt hash | `sha256:3e0ea545a2093a17bdfcd7a7393d238f6c4b536ae1f2451f544d9e084090bb0b` |
| Executed nodes in root receipt | 4 |
| Dead nodes in root receipt | 0 |

## Public outputs

### source

- **path:** input/context-and-questions.md
- **manifestSha256:** eabd0a7080f2f70939fe2687e411215282c6f6a456954bbd4cca1ebac774f4cc
- **completeness:** COMPLETE_CONTEXT
- **negationSemantics:** OPEN_WORLD
- **requestLocator:** input/context-and-questions.md:11

Output hash: `sha256:fb862e80f46a972539ea45515205e7c18bf631151a7dbb1703e762839587e270`

### context

- **facts:**
  1.
    - **kind:** fact
    - **subject:** Ada
    - **predicate:** scholar
    - **polarity:** POSITIVE
    - **locator:** input/context-and-questions.md:3
- **rules:**
  1.
    - **kind:** implication
    - **antecedent:**
      - **predicate:** scholar
      - **polarity:** POSITIVE
    - **consequent:**
      - **predicate:** reader
      - **polarity:** POSITIVE
    - **locator:** input/context-and-questions.md:5
  2.
    - **kind:** implication
    - **antecedent:**
      - **predicate:** reader
      - **polarity:** POSITIVE
    - **consequent:**
      - **predicate:** curious
      - **polarity:** POSITIVE
    - **locator:** input/context-and-questions.md:7

Output hash: `sha256:d0cf26aa5296229b4ae06fe792ffd7a375b8c4ec05389f728b942af074b9e512`

### scholar_query

- **kind:** proposition
- **subject:** Ada
- **predicate:** scholar
- **polarity:** POSITIVE

Output hash: `sha256:50e0e024ee7ddb3d9e7756065bdd77060f269a4342ccfe77f751a9e6ca71b2cd`

### scholar_result

- **schemaVersion:** 1
- **status:** SUPPORTED
- **query:**
  - **subject:** Ada
  - **predicate:** scholar
  - **polarity:** POSITIVE
- **opposite:**
  - **subject:** Ada
  - **predicate:** scholar
  - **polarity:** NEGATIVE
- **querySupport:**
  - **literal:**
    - **predicate:** scholar
    - **polarity:** POSITIVE
  - **supportMode:** DIRECT
  - **minimumDepth:** 0
  - **evidence:**
    1.
      - **type:** DIRECT
      - **locator:** input/context-and-questions.md:3
- **oppositeSupport:** null
- **closure:**
  1.
    - **literal:**
      - **predicate:** curious
      - **polarity:** POSITIVE
    - **supportMode:** DERIVED
    - **minimumDepth:** 2
    - **evidence:**
      1.
        - **type:** DERIVED
        - **locator:** input/context-and-questions.md:7
        - **from:**
          - **predicate:** reader
          - **polarity:** POSITIVE
        - **depth:** 2
  2.
    - **literal:**
      - **predicate:** reader
      - **polarity:** POSITIVE
    - **supportMode:** DERIVED
    - **minimumDepth:** 1
    - **evidence:**
      1.
        - **type:** DERIVED
        - **locator:** input/context-and-questions.md:5
        - **from:**
          - **predicate:** scholar
          - **polarity:** POSITIVE
        - **depth:** 1
  3.
    - **literal:**
      - **predicate:** scholar
      - **polarity:** POSITIVE
    - **supportMode:** DIRECT
    - **minimumDepth:** 0
    - **evidence:**
      1.
        - **type:** DIRECT
        - **locator:** input/context-and-questions.md:3
- **metrics:**
  - **inputFactCount:** 1
  - **factsForSubject:** 1
  - **inputRuleCount:** 2
  - **supportedLiteralCount:** 3
  - **iterations:** 2
  - **duplicateEvidenceSuppressed:** 0

Output hash: `sha256:881f16da5e15996e8c74829ce0638738a66e26402bfde4ccc08c7fc196ca65e2`

### curious_query

- **kind:** proposition
- **subject:** Ada
- **predicate:** curious
- **polarity:** POSITIVE

Output hash: `sha256:6d652b51802583d60f337195109ce5a2c2b809fd0a7507b2aae9ab7457bac856`

### curious_result

- **schemaVersion:** 1
- **status:** SUPPORTED
- **query:**
  - **subject:** Ada
  - **predicate:** curious
  - **polarity:** POSITIVE
- **opposite:**
  - **subject:** Ada
  - **predicate:** curious
  - **polarity:** NEGATIVE
- **querySupport:**
  - **literal:**
    - **predicate:** curious
    - **polarity:** POSITIVE
  - **supportMode:** DERIVED
  - **minimumDepth:** 2
  - **evidence:**
    1.
      - **type:** DERIVED
      - **locator:** input/context-and-questions.md:7
      - **from:**
        - **predicate:** reader
        - **polarity:** POSITIVE
      - **depth:** 2
- **oppositeSupport:** null
- **closure:**
  1.
    - **literal:**
      - **predicate:** curious
      - **polarity:** POSITIVE
    - **supportMode:** DERIVED
    - **minimumDepth:** 2
    - **evidence:**
      1.
        - **type:** DERIVED
        - **locator:** input/context-and-questions.md:7
        - **from:**
          - **predicate:** reader
          - **polarity:** POSITIVE
        - **depth:** 2
  2.
    - **literal:**
      - **predicate:** reader
      - **polarity:** POSITIVE
    - **supportMode:** DERIVED
    - **minimumDepth:** 1
    - **evidence:**
      1.
        - **type:** DERIVED
        - **locator:** input/context-and-questions.md:5
        - **from:**
          - **predicate:** scholar
          - **polarity:** POSITIVE
        - **depth:** 1
  3.
    - **literal:**
      - **predicate:** scholar
      - **polarity:** POSITIVE
    - **supportMode:** DIRECT
    - **minimumDepth:** 0
    - **evidence:**
      1.
        - **type:** DIRECT
        - **locator:** input/context-and-questions.md:3
- **metrics:**
  - **inputFactCount:** 1
  - **factsForSubject:** 1
  - **inputRuleCount:** 2
  - **supportedLiteralCount:** 3
  - **iterations:** 2
  - **duplicateEvidenceSuppressed:** 0

Output hash: `sha256:ae2c91d506f80ac896cbfc7a7dd4cb41a288d360ca9059fca378295a2c19b897`

### patient_query

- **kind:** proposition
- **subject:** Ada
- **predicate:** patient
- **polarity:** POSITIVE

Output hash: `sha256:c3baa4489417afe934dae1e5c61cbd5d44e8708122555ad0a01aa3f3b2198a93`

### patient_result

- **schemaVersion:** 1
- **status:** UNKNOWN
- **query:**
  - **subject:** Ada
  - **predicate:** patient
  - **polarity:** POSITIVE
- **opposite:**
  - **subject:** Ada
  - **predicate:** patient
  - **polarity:** NEGATIVE
- **querySupport:** null
- **oppositeSupport:** null
- **closure:**
  1.
    - **literal:**
      - **predicate:** curious
      - **polarity:** POSITIVE
    - **supportMode:** DERIVED
    - **minimumDepth:** 2
    - **evidence:**
      1.
        - **type:** DERIVED
        - **locator:** input/context-and-questions.md:7
        - **from:**
          - **predicate:** reader
          - **polarity:** POSITIVE
        - **depth:** 2
  2.
    - **literal:**
      - **predicate:** reader
      - **polarity:** POSITIVE
    - **supportMode:** DERIVED
    - **minimumDepth:** 1
    - **evidence:**
      1.
        - **type:** DERIVED
        - **locator:** input/context-and-questions.md:5
        - **from:**
          - **predicate:** scholar
          - **polarity:** POSITIVE
        - **depth:** 1
  3.
    - **literal:**
      - **predicate:** scholar
      - **polarity:** POSITIVE
    - **supportMode:** DIRECT
    - **minimumDepth:** 0
    - **evidence:**
      1.
        - **type:** DIRECT
        - **locator:** input/context-and-questions.md:3
- **metrics:**
  - **inputFactCount:** 1
  - **factsForSubject:** 1
  - **inputRuleCount:** 2
  - **supportedLiteralCount:** 3
  - **iterations:** 2
  - **duplicateEvidenceSuppressed:** 0

Output hash: `sha256:5bbd05bb7e366af6bd5a7db6f619592f9ce9ac7f9b10e68fe5a68a87e11af218`

## Assurance checks

The root circuit declares no goals or invariants.

## Receipt summary

| Node | Callee | Status | Child receipt |
| --- | --- | --- | --- |
| `n0001` | `task.context_and_questions` | SUCCEEDED | `sha256:caa5a2ce543400e97a9268a6c37c4c8349c809c97a25cc40212799dcd3dc9568` |
| `n0002` | `kb.unary_entailment.evaluate` | SUCCEEDED | `sha256:0f2e1c6900b5b6660931240c738af25bf7e751656c5b5fbb9b1308f0200fa866` |
| `n0003` | `kb.unary_entailment.evaluate` | SUCCEEDED | `sha256:54c2bfa95095db2cf0e63f5007ba81338f05393330245b2bdfebea962bc13035` |
| `n0004` | `kb.unary_entailment.evaluate` | SUCCEEDED | `sha256:750aeca70f6a80a3e116a8078143a5c5d23479c89d49dce2bac609ec1b0174d0` |

