# Candidate execution report

Validation date: 2026-08-10. Runtime: dependency-free Dynamic Circuits reference CLI under `/home/salboaie/work/dynamicCircuits`; Node.js v22.23.1.

## Compile

Exact command:

```text
node /home/salboaie/work/dynamicCircuits/src/cli.mjs sop compile --root candidates/unary-entailment-v1/sop --package unary_entailment.evaluate
```

Outcome: exit 0. Package `unary_entailment.evaluate` compiled with inputs `context`, `query`, output `result`, two command nodes, and one invariant. Compiler package hash: `sha256:5e2aa67c3fa74ad73cb1dc50fa19a9240637f680c1c5cc4cfbdb364d36750a60`.

## Automated case matrix

Exact command:

```text
node candidates/unary-entailment-v1/tests/run-tests.mjs /home/salboaie/work/dynamicCircuits
```

Outcome: exit 0; 12 passed, 0 failed.

| Category | Cases | Observed outcome/verdict |
|---|---:|---|
| Positive | 2 | direct `SUPPORTED`; reversed-rule-order multi-step `SUPPORTED` at depth 2 |
| Negative | 2 | explicit `CONTRADICTED`; open-world `UNKNOWN` |
| Exception | 1 | simultaneous support produced `CONFLICT` |
| Boundary | 3 | cycle terminated; duplicates suppressed; empty context returned `UNKNOWN` |
| Malformed | 2 | controlled `REFUSED` for invalid facts container and missing locator |
| Unsupported/refusal | 2 | controlled `REFUSED` for conjunction and binary fact |

Successful semantic totals: `SUPPORTED` 4, `CONTRADICTED` 1, `CONFLICT` 1, `UNKNOWN` 2. Runtime totals: `SUCCEEDED` 8, `REFUSED` 4, `REJECTED` 0, `ERROR` 0. A `REJECTED` or `ERROR` result is not an alternate semantic verdict and would indicate a failed assurance or implementation/runtime defect for these cases.

## Receipt and public-output audit

Exact audit command:

```text
node /home/salboaie/work/dynamicCircuits/src/cli.mjs sop run --root candidates/unary-entailment-v1/sop --package unary_entailment.evaluate --inputs '[{"facts":[{"kind":"fact","subject":"A","predicate":"p","polarity":"POSITIVE","locator":"audit:seed"}],"rules":[{"kind":"implication","antecedent":{"predicate":"p","polarity":"POSITIVE"},"consequent":{"predicate":"q","polarity":"POSITIVE"},"locator":"audit:rule"}]},{"kind":"proposition","subject":"A","predicate":"q","polarity":"POSITIVE"}]'
```

Outcome: `SUCCEEDED` with semantic status `SUPPORTED`. The evaluator and verifier nodes both succeeded. The `resultWellFormed` invariant passed. Public output hash: `sha256:4a1e357897436aecb8821a32313ef98c86091b65d98529381974a47dd09fca7c`; invariant value hash: `sha256:b5bea41b6c623f7c09f1bf24dcae58ebab3c0cdd90ad966bc43a45b44867e12b`; receipt hash: `sha256:e83cf306695e398481545303e4f5009332ff0a470a92bab2fa50c91f39ab95ed`.

The package has no nested circuit calls, so there are no child receipts. Node-level receipts were inspected. A malformed-input audit produced `REFUSED`, no public outputs, an empty public-output hash list, and node refusal code `facts_must_be_an_array`.

## Static artifact checks

`node --check tests/run-tests.mjs` succeeded. Both JSON artifacts parsed successfully. Candidate SOP SHA-256 (also the compiler package hash payload) is `5e2aa67c3fa74ad73cb1dc50fa19a9240637f680c1c5cc4cfbdb364d36750a60`; test cases SHA-256 is `5b9470939e0828d2f9912d41ddcd7f713609cf0187fe57c698901cb6252415df`.

Compilation and passing tests demonstrate mechanical validity and the recorded examples only. They do not establish semantic trust, mandatory applicability, or promotion.
