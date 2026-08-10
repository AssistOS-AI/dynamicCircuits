# Circuit Runtime Result

> This is the authoritative result emitted by the Dynamic Circuits executor. It is rendered directly from the circuit public outputs and execution receipt; it is not a coding-agent interpretation.

## Execution identity

| Field | Observed value |
| --- | --- |
| Entrypoint | `task.analysis` |
| Outcome | **SUCCEEDED** |
| Package hash | `sha256:f4741e58b2b7db2681dbef1e1a942f0181fcb4ed6f61e54576152a4d2519a844` |
| Receipt hash | `sha256:96f48c7558accab64a0767e15a1f831edbada40d0b5ee52caeaf78fb469a5ebd` |
| Executed nodes in root receipt | 7 |
| Dead nodes in root receipt | 0 |

## Public outputs

### analysis

- **schemaVersion:** 1
- **sourceConstraint:** Use only context.md
- **sourceConstraintLocator:** task.md:3
- **contextCompletenessLocator:** context.md:9
- **openWorld:** true
- **requestedLabels:**
  1. SUPPORTED
  2. UNKNOWN
- **includeEvidenceForSupported:** true
- **requirementsLocator:** task.md:9-10
- **answers:**
  1.
    - **questionId:** 1
    - **questionLocator:** task.md:5
    - **result:**
      - **schemaVersion:** 1
      - **status:** SUPPORTED
      - **query:**
        - **subject:** Socrate
        - **predicate:** man
        - **polarity:** POSITIVE
      - **opposite:**
        - **subject:** Socrate
        - **predicate:** man
        - **polarity:** NEGATIVE
      - **querySupport:**
        - **literal:**
          - **predicate:** man
          - **polarity:** POSITIVE
        - **supportMode:** DIRECT
        - **minimumDepth:** 0
        - **evidence:**
          1.
            - **type:** DIRECT
            - **locator:** context.md:3
      - **oppositeSupport:** null
      - **closure:**
        1.
          - **literal:**
            - **predicate:** man
            - **polarity:** POSITIVE
          - **supportMode:** DIRECT
          - **minimumDepth:** 0
          - **evidence:**
            1.
              - **type:** DIRECT
              - **locator:** context.md:3
        2.
          - **literal:**
            - **predicate:** mortal
            - **polarity:** POSITIVE
          - **supportMode:** DERIVED
          - **minimumDepth:** 1
          - **evidence:**
            1.
              - **type:** DERIVED
              - **locator:** context.md:5
              - **from:**
                - **predicate:** man
                - **polarity:** POSITIVE
              - **depth:** 1
      - **metrics:**
        - **inputFactCount:** 2
        - **factsForSubject:** 1
        - **inputRuleCount:** 1
        - **supportedLiteralCount:** 2
        - **iterations:** 2
        - **duplicateEvidenceSuppressed:** 0
  2.
    - **questionId:** 2
    - **questionLocator:** task.md:6
    - **result:**
      - **schemaVersion:** 1
      - **status:** SUPPORTED
      - **query:**
        - **subject:** Socrate
        - **predicate:** mortal
        - **polarity:** POSITIVE
      - **opposite:**
        - **subject:** Socrate
        - **predicate:** mortal
        - **polarity:** NEGATIVE
      - **querySupport:**
        - **literal:**
          - **predicate:** mortal
          - **polarity:** POSITIVE
        - **supportMode:** DERIVED
        - **minimumDepth:** 1
        - **evidence:**
          1.
            - **type:** DERIVED
            - **locator:** context.md:5
            - **from:**
              - **predicate:** man
              - **polarity:** POSITIVE
            - **depth:** 1
      - **oppositeSupport:** null
      - **closure:**
        1.
          - **literal:**
            - **predicate:** man
            - **polarity:** POSITIVE
          - **supportMode:** DIRECT
          - **minimumDepth:** 0
          - **evidence:**
            1.
              - **type:** DIRECT
              - **locator:** context.md:3
        2.
          - **literal:**
            - **predicate:** mortal
            - **polarity:** POSITIVE
          - **supportMode:** DERIVED
          - **minimumDepth:** 1
          - **evidence:**
            1.
              - **type:** DERIVED
              - **locator:** context.md:5
              - **from:**
                - **predicate:** man
                - **polarity:** POSITIVE
              - **depth:** 1
      - **metrics:**
        - **inputFactCount:** 2
        - **factsForSubject:** 1
        - **inputRuleCount:** 1
        - **supportedLiteralCount:** 2
        - **iterations:** 2
        - **duplicateEvidenceSuppressed:** 0
  3.
    - **questionId:** 3
    - **questionLocator:** task.md:7
    - **result:**
      - **schemaVersion:** 1
      - **status:** UNKNOWN
      - **query:**
        - **subject:** Socrate
        - **predicate:** philosopher
        - **polarity:** POSITIVE
      - **opposite:**
        - **subject:** Socrate
        - **predicate:** philosopher
        - **polarity:** NEGATIVE
      - **querySupport:** null
      - **oppositeSupport:** null
      - **closure:**
        1.
          - **literal:**
            - **predicate:** man
            - **polarity:** POSITIVE
          - **supportMode:** DIRECT
          - **minimumDepth:** 0
          - **evidence:**
            1.
              - **type:** DIRECT
              - **locator:** context.md:3
        2.
          - **literal:**
            - **predicate:** mortal
            - **polarity:** POSITIVE
          - **supportMode:** DERIVED
          - **minimumDepth:** 1
          - **evidence:**
            1.
              - **type:** DERIVED
              - **locator:** context.md:5
              - **from:**
                - **predicate:** man
                - **polarity:** POSITIVE
              - **depth:** 1
      - **metrics:**
        - **inputFactCount:** 2
        - **factsForSubject:** 1
        - **inputRuleCount:** 1
        - **supportedLiteralCount:** 2
        - **iterations:** 2
        - **duplicateEvidenceSuppressed:** 0

Output hash: `sha256:11b6579f51b6c87a31c74300aa874d8d77a26d194ffa0355b746652aef71cca5`

## Assurance checks

| Kind | Wire | Passed | Value hash |
| --- | --- | --- | --- |
| goal | `completeAnalysis` | yes | `sha256:b5bea41b6c623f7c09f1bf24dcae58ebab3c0cdd90ad966bc43a45b44867e12b` |

## Receipt summary

| Node | Callee | Status | Child receipt |
| --- | --- | --- | --- |
| `n0001` | `task.context` | SUCCEEDED | `sha256:d3e2755c1f0bb613a653a26d6d6cd92b3ee73ed04521cfdd26def9b5e19f881f` |
| `n0002` | `task.request` | SUCCEEDED | `sha256:4d90f7bcd69782402f336becbe6f32f18f70e17fba428cdabcb0554af624e51e` |
| `n0003` | `kb.unary_entailment.evaluate` | SUCCEEDED | `sha256:6bb8b1e50314c9746db93517e8ab0a8d0da7dd20637fdb73e0a4d25b8a5e103e` |
| `n0004` | `kb.unary_entailment.evaluate` | SUCCEEDED | `sha256:0a8393f9e35c510c0d786fc7c1f3205feded87901d7d2595f997bb16a372a8e6` |
| `n0005` | `kb.unary_entailment.evaluate` | SUCCEEDED | `sha256:d247483dfa266b9ce80a4e834fef2f80839e7f32c3aabc06d5507019550588da` |
| `n0006` | `assemble` | SUCCEEDED | - |
| `n0007` | `verifyAnalysis` | SUCCEEDED | - |

