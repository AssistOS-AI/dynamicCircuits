# Learning summary

## Input coverage

The manifest declared 1 file and 780 bytes. `input/context.md` was read completely and was supported. Its observed SHA-256, `6be1713157fa8459942ffbadbc075dda54e1a88a218573485d2d0fb34bd7fd02`, matched `.dynamic-circuits/input-manifest.json`. Coverage is 1/1 files, 780/780 bytes, and all 8 substantive source lines (`L3-L10`). There were no unreadable, missing, hash-mismatched, or unsupported manifest entries.

The semantic inventory found:

- Definitions/forms: unary facts, unary implications, requested proposition, and explicit opposite.
- Rules/procedure: finite fixed-point closure for the queried subject; direct or derived support; four-way verdict classification.
- Exceptions/negative requirements: absence is not negation; cycles must terminate; duplicate derivations must be suppressed; unsupported logical forms must be refused.
- Provenance/verification: preserve source locators and distinguish direct from derived evidence.
- Priorities, intervals, jurisdictions, units, domain facts, effects, and external verification methods: none stated.
- Claim boundary: the source normatively requests an evaluator; it provides no corpus-specific facts to promote.

## Extracted candidate

One focused package was created at `candidates/unary-entailment-v1/`, exposing `unary_entailment.evaluate`. It accepts explicit finite arrays of signed unary facts and signed unary implications plus a unary query. It returns `SUPPORTED`, `CONTRADICTED`, `CONFLICT`, or open-world `UNKNOWN`, closure evidence, shortest depth, source locators, and duplicate/iteration metrics.

The package strictly refuses non-unary or extra logical structure. It has an explicit structural invariant depending on both inputs and the public result. It uses no filesystem, process, network, clock, randomness, oracle, hidden global state, or direct LLM API integration.

## Trusted overlap and compatibility

`circuits/` was inspected read-only. Its `unary_entailment/` directory contained no files and no compilable package, so there was no trusted semantic or version overlap to reuse. Nothing under `circuits/` was modified, copied, or promoted. The candidate targets the implemented SOP subset and compiled under the current reference runtime.

## Validation metrics

- Compile: 1/1 package successful; package hash `sha256:5e2aa67c3fa74ad73cb1dc50fa19a9240637f680c1c5cc4cfbdb364d36750a60`.
- Automated cases: 12/12 passed, 0 failed.
- Categories: positive 2, negative 2, exception 1, boundary 3, malformed 2, unsupported/refusal 2.
- Runtime outcomes: `SUCCEEDED` 8, `REFUSED` 4, `REJECTED` 0, `ERROR` 0.
- Semantic verdicts among successes: `SUPPORTED` 4, `CONTRADICTED` 1, `CONFLICT` 1, `UNKNOWN` 2.
- Required entailment scenarios: direct, multi-step derived, unknown, cyclic, conflicting, and unsupported forms all covered; explicit contradiction and duplicate suppression also covered.
- Receipt audit: both command nodes succeeded, invariant passed, public output hash and receipt hash were present; refused execution exposed no output hashes.

Exact commands, case expectations, refusal codes, and audited hashes are recorded in `candidates/unary-entailment-v1/tests/execution-report.md`.

## Assumptions and explicit policy choices

- Explicit opposites use `POSITIVE`/`NEGATIVE` signed literals; absence remains `UNKNOWN`.
- Signed antecedents and consequents are supported so explicit negative knowledge can participate in closure.
- Subjects and predicates use exact case-sensitive string identity; no lexical normalization or synonym expansion occurs.
- Rules are universal over subjects, while only matching-subject facts seed the requested closure.
- Different locators preserve distinct evidence; an identical locator on an identical semantic application is a duplicate.
- `CONFLICT` takes precedence when both query polarities are supported; there is no unstated priority resolution.
- Extra fields are refused because they may carry unsupported semantics.

These are reviewable representation choices where the source does not define serialization details.

## Gaps and ambiguity

The source does not specify a wire format, locator grammar/trust model, Unicode/case normalization, proof-tree serialization, duplicate policy across different locators, input size limit, resource budget, or whether negative rule antecedents/consequents were intended. It also provides no independent external oracle. The tests compare the extracted rules against small independent synthetic examples, not domain truth.

The reference VM bounds synchronous execution time but is not a production isolation boundary. Very large finite fact/rule arrays can consume substantial CPU or memory. No asynchronous execution, persistent cache, semantic matcher, automatic closure, trust enforcement, or certificate behavior is claimed.

## Promotion recommendation

Recommendation: **do not promote yet; promote after review if the stated data model is accepted**.

Before copying any package into trusted `circuits/`, require:

1. Semantic review of signed literals, negative implications, exact-string identity, and `CONFLICT` precedence.
2. Provenance review of opaque locator adequacy and duplicate-evidence behavior.
3. Runtime/security review with agreed input-size or execution-budget limits for production use.
4. Re-run of the recorded compile and 12-case suite against the target runtime version.

Mechanical compilation and test success support candidacy only; they do not establish trust or mandatory applicability.
