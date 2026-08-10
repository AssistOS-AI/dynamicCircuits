# Constrained literary vignette candidate contract

## Status and purpose

This folder is a reviewable candidate, not a trusted or automatically applicable package. It deterministically assembles a
short Markdown vignette from an explicit brief, independently verifies the document, and optionally composes those two
operations. It does not establish literary quality, factual truth, or semantic completeness.

## Extracted knowledge inventory

The source defines a **brief** as a title, protagonist, setting, concrete object, immediate goal, obstacle, choice,
consequence, closing image, and exactly three motifs. A **generated vignette** is one Markdown document with one level-one
title and the four ordered sections `Arrival`, `Pressure`, `Choice`, and `Consequence`. A **verification** is structured data
that preserves every failed check and never repairs the supplied Markdown.

The reusable rules are:

1. Refuse an invalid brief before generation: missing, non-string, or empty scalar fields; a motif list other than exactly
   three non-empty strings; or a title containing a newline.
2. Assemble exactly one paragraph under each required section. Place protagonist, setting, object, and immediate goal in
   `Arrival`; obstacle and motif 1 in `Pressure`; choice and motif 2 in `Choice`; and consequence, motif 3, and the final
   closing image in `Consequence`.
3. Preserve every supplied field verbatim. Add only the fixed connective text embedded in the generator.
4. Verify the original brief and Markdown as separate inputs. Report heading order, section count, paragraph count, verbatim
   fields, assigned placement, closing position, extra headings, visible word count, and conformance to the generator's
   fixed content.
5. Treat 90 and 220 visible words as inclusive. A semantic verification failure is returned as `ok: false`; it is not a
   runtime rejection and does not hide the failed checks.
6. Keep generator and verifier as separate packages. The composition calls both and checks only that their public output
   shapes are available.

No jurisdiction, effective interval, external authority hierarchy, or domain-specific units occur in the source. The only
numeric units are three motifs, four body sections, one paragraph per section, and 90 through 220 visible words.

## Positional interfaces

`literary.generator(brief) -> markdown`

`literary.verifier(brief, markdown) -> verification`

`literary.composition(brief) -> markdown, verification`

The candidate maps the prose fields to this camelCase object:

```json
{
  "title": "string",
  "protagonist": "string",
  "setting": "string",
  "object": "string",
  "immediateGoal": "string",
  "obstacle": "string",
  "choice": "string",
  "consequence": "string",
  "closingImage": "string",
  "motifs": ["string", "string", "string"]
}
```

Unknown object keys are ignored. Scalar and motif strings are preserved byte-for-byte in output, including leading or
trailing whitespace, after validation determines that `trim()` is not empty.

## Verification output

The verifier returns:

- `ok`: true only when all ten checks pass;
- `checks`: stable check identifiers and booleans;
- `missingRequirements`: missing field, motif, placement, closing-position, or word-range identifiers;
- `unexpectedStructuralConditions`: heading, section, paragraph, or unapproved-content identifiers; and
- `counts`: heading levels, body sections, per-section paragraphs, visible words, field occurrences, and motif occurrences.

`approved-fixed-content-only` independently reconstructs the generator's permitted template in the verifier package. It is
deliberately stricter than a prose-similarity judgment and prevents an otherwise well-formed document from adding invented
content.

## Refusal priority and exceptions

Validation stops at the first condition in this order: brief object shape, nine scalar fields in contract order, motif
presence/type/count/items, title newline, then verifier Markdown type. Stable refusal codes and field/index details are in
`manifest.json`. A structurally wrong string document is not refused: it produces a visible verification with `ok: false`.

The title-newline and three-motif rules are explicit source exceptions. Whitespace-only values are treated as empty by
candidate policy. Newlines in non-title strings are not refused because the source names only title newlines; they can make
the generated document fail structural verification.

## Assumptions and ambiguity retained for review

- The source does not specify field-key spelling; camelCase is a candidate interface decision.
- “Word” means a non-empty whitespace-delimited token after removing Markdown heading markers at line starts. Punctuation
  remains attached to its token.
- “Ending with the closing image and motif 3” is implemented by placing motif 3 in the final paragraph and making the
  closing image the last non-whitespace document content.
- Verbatim presence uses case-sensitive substring occurrence, including overlapping relationships between different
  supplied values.
- Markdown headings are recognized only for levels one through six followed by whitespace. CRLF and bare CR are normalized
  for structural parsing, but the approved generator output itself uses LF and must match exactly.
- The source allows arbitrary-length non-empty fields but also requires 90–220 words. A sufficiently verbose valid brief can
  force a generated result above 220 words. The candidate preserves this conflict as a visible `ok: false` result instead
  of inventing an undocumented length refusal or truncating verbatim fields.
- A non-title field containing blank lines or heading syntax can conflict with the required paragraph/heading structure.
  The candidate generates it verbatim and lets the independent verifier expose the failure.

## Security and effects

All packages are pure JavaScript command blocks under the runtime's current VM guard. They request no filesystem, process,
network, clock, random, oracle, secret, or LLM capability. Inputs are treated as data. Regular-expression work is bounded to
simple linear patterns; occurrence scans always advance by the non-empty needle length.
