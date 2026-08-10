# Unary entailment candidate contract

## Applicability

Use `unary_entailment.evaluate` only for a finite context of unary signed facts and unary signed implications, and one unary proposition about a named subject. All facts and rules are validated before evaluation. Rules are universal over subjects, while closure is computed only for the queried subject.

The circuit is not applicable to binary or higher-arity relations, conjunction, disjunction, quantifiers other than the encoded universal unary implication, variables inside facts, defeasible rules, priorities, temporal or jurisdictional constraints, probabilistic claims, or implicit negation. Such forms are refused as `unsupported_logical_form` or a more specific polarity/form refusal.

## Positional interface

`@input context query` and `@output result` are ordered public ports.

`context` must have exactly these fields:

```json
{
  "facts": [
    {
      "kind": "fact",
      "subject": "Ada",
      "predicate": "engineer",
      "polarity": "POSITIVE",
      "locator": "source.md#L12"
    }
  ],
  "rules": [
    {
      "kind": "implication",
      "antecedent": { "predicate": "engineer", "polarity": "POSITIVE" },
      "consequent": { "predicate": "professional", "polarity": "POSITIVE" },
      "locator": "source.md#L20-L21"
    }
  ]
}
```

`query` must have exactly `kind`, `subject`, `predicate`, and `polarity`, with `kind: "proposition"`. Predicates and subjects are non-empty, case-sensitive strings. Polarity is exactly `POSITIVE` or `NEGATIVE`.

## Output and verdicts

The successful result contains the normalized query and its explicit opposite, the four-way `status`, support records for each side, the complete supported-literal closure for the queried subject, and execution metrics.

- `SUPPORTED`: the requested signed literal has direct or derived support and its opposite does not.
- `CONTRADICTED`: only the explicit opposite has support.
- `CONFLICT`: both sides have support; no priority rule resolves the inconsistency.
- `UNKNOWN`: neither side has support. Absence never creates negative support.

Each closure entry distinguishes `DIRECT` from `DERIVED` support, records minimum derivation depth, and preserves source locators. A direct fact with the same literal and locator is suppressed as duplicate. A derived application with the same rule locator and antecedent literal is also suppressed. Cycles terminate because the supported signed-literal set is finite and grows monotonically.

## Refusal conditions

Missing or malformed container/field values produce controlled runtime refusal. Any unrecognized kind, extra logical field, unsupported polarity, or non-unary literal is refused rather than approximated. Runtime refusal is not a semantic `UNKNOWN` verdict.

## Effects and assumptions

The command has no filesystem, process, network, clock, random, oracle, or LLM capability. It assumes exact string identity for subjects and predicates, explicit signed polarity, and trusted accuracy of source locators. It does not establish source truth or package trust.
