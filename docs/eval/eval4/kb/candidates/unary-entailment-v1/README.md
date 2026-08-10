# Unary entailment v1 candidate

This review-only candidate implements finite, open-world closure for unary signed facts and universal unary implications. Its public package is `unary_entailment.evaluate` with positional inputs `context`, `query` and output `result`.

Review `contract.md` for the schema and refusal boundary, `applicability.md` for explicit policy choices and ambiguity, and `provenance.md` for the source mapping. Run the test matrix with:

```text
node candidates/unary-entailment-v1/tests/run-tests.mjs /home/salboaie/work/dynamicCircuits
```

The package is a candidate only. It has not been copied to or promoted into trusted `circuits/`.
