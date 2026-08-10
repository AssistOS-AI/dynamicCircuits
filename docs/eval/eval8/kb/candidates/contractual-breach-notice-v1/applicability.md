# Applicability notes

## Positive applicability evidence

Use the candidate when the task explicitly requests the source-defined contractual breach-notice fixture, provides all
13 schema properties, requires literal fact preservation and the fixed nine-section Markdown structure, and accepts a
literal independent verifier. Suitable examples include assembling a notice from a completed brief and checking a
previously generated Markdown notice against the same brief.

## Non-applicability and refusal boundary

Do not use the candidate to decide whether conduct is a breach, provide legal advice, calculate a cure period, choose a
delivery method, infer missing facts, draft from free-form notes, or verify a different document genre. Missing/non-string
fields, empty strings, invalid/empty exhibits, and unknown properties cause `INVALID_BRIEF`. A non-string notice causes
`INVALID_NOTICE_TYPE`.

A string notice with missing or prohibited content is within verifier applicability: the verifier returns a negative
report. It is not a malformed-input refusal. Generated Markdown whose raw values introduce an extra heading is likewise
diagnosed, but the composed generator is rejected because its goal requires every check.

## Assumptions requiring review

The circuit assumes exact, case-sensitive matching; Unicode `Sc` for currency symbols; literal substring occurrence
counts for parties; exact line-based exhibit rendering; length-based non-emptiness; and rejection of extra brief keys.
None of these choices should become mandatory matching criteria without domain review.
