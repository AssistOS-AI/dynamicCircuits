# Applicability and review boundaries

## Applicable context

Apply this candidate only when a caller has already mapped a brief to the exact object contract and wants deterministic
Markdown assembly plus inspectable structural verification. The caller must explicitly invoke a package; no semantic
matcher, automatic wiring, mandatory closure, trust gate, or promotion behavior is claimed.

The generator is applicable when every required field is present and valid. The verifier is applicable when both that brief
and a Markdown string are present. The composition is applicable when both generation and independent verification are
wanted in one explicit graph.

## Non-applicability

Do not apply this candidate to free-form creative writing, briefs with a different section scheme, documents that permit
paraphrase instead of verbatim fields, multiple paragraphs per section, arbitrary motif counts, or prose whose word-count
policy differs. It is not a general Markdown validator, plagiarism detector, literary-quality evaluator, fact checker, or
semantic detector of invented events.

Do not infer applicability from textual similarity or agent confidence. A mapping from another schema, language, or genre
requires review outside this package.

## Effects and failure behavior

The only effect is returning canonical data. Invalid input produces runtime `REFUSED` with no public outputs. Valid string
input with unmet literary requirements produces runtime `SUCCEEDED` and verification `ok: false`; all failed checks remain
public. The composition invariant validates output shape, not semantic acceptance. No path intentionally produces runtime
`REJECTED` or `ERROR` for an ordinary domain failure.

## Review checklist

- Confirm the camelCase brief mapping and first-failure refusal priority.
- Approve or replace the fixed connective prose for literary tone and non-invention.
- Decide whether whitespace-only values are empty and whether non-title newlines need an added refusal.
- Approve the word-token algorithm, title/heading grammar, case-sensitive substring matching, and closing-image rule.
- Resolve the valid-but-oversized brief conflict before promotion.
- Confirm that exact-template verification is desired rather than accepting alternative fixed prose.
- Recompile all packages and rerun all candidate tests with Node.js 20 or newer.
- Review JavaScript command blocks under the project's current non-production VM security boundary.
