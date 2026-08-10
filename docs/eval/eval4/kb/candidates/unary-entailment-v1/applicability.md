# Applicability, policy choices, and ambiguity

## Reusable semantics

The reusable procedure validates the entire context, seeds support from matching-subject facts, repeatedly applies universal unary implications to a fixed point, computes the explicit opposite, and returns a four-way open-world verdict with evidence.

## Source-bound and absent categories

The input contains no corpus-specific subject/predicate facts. It defines no exceptions, rule priority, dates, jurisdiction, units, effects, side-effecting procedure, confidence threshold, or mandatory matcher. No such semantics were invented.

## Explicit candidate policy choices

- Negation is represented as the signed polarity `NEGATIVE`; it is never inferred from absence.
- Rules may connect either polarity, because an explicit opposite must be representable and the source does not forbid signed antecedents or consequents.
- Subject and predicate comparison is exact and case-sensitive; normalization is outside scope.
- Extra fields are refused because they may encode unsupported logical structure.
- Multiple source locators for the same literal are preserved; exact same-locator repeats are duplicates.
- All applicable rule applications are retained as evidence, while minimum depth identifies a shortest derivation.
- Facts about other subjects are validated but do not enter the queried subject's closure.

## Ambiguity and required review

The source does not define a serialization, proof-object format, treatment of duplicate text at different locators, or resource limit. A semantic reviewer should confirm the signed-literal model and `CONFLICT` precedence. A runtime/security reviewer should assess resource exhaustion for very large finite arrays. A provenance reviewer should confirm that opaque locator strings are sufficient for downstream use.
