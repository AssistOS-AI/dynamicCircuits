# Unary entailment policy

A complete context may contain unary facts of the form “subject has predicate” and unary implications of the form “every
antecedent is consequent.” A reusable evaluator must compute finite rule closure for the subject being asked about.

Return `SUPPORTED` when the requested proposition is present directly or can be derived through one or more unary
implications. Return `CONTRADICTED` when the explicit opposite is supported, `CONFLICT` when both sides are supported, and
`UNKNOWN` when neither side is supported. Absence is not negation. Preserve source locators, distinguish direct from derived
support, suppress duplicate derivations, terminate on cyclic rules, and refuse unsupported logical forms instead of silently
approximating them.
