# Source provenance

## Coverage

The input manifest contains one file, and that file was read completely. Its observed byte count and SHA-256 digest match
the manifest exactly.

| Source | Manifest bytes | Observed bytes | Manifest/observed SHA-256 | Coverage |
| --- | ---: | ---: | --- | --- |
| `input/literary-generation-rules.md` | 2162 | 2162 | `7f5b738c2620ef5496935f3d730dca8346201ef59c0a9786a18c7a795e95200a` | lines 1–33 |

No other file contributes domain semantics. Project skills and runtime specifications were consulted only for valid SOP
authoring. The trusted `circuits/` directory contained zero files, so there was no overlap or version conflict.

## Review locators and transformations

| Lines | Small source cue | Candidate transformation |
| --- | --- | --- |
| 1–7 | “short literary vignette” and “must not invent” | Candidate purpose; deterministic fixed-content assembly and exact-template verifier check |
| 9–12 | brief fields and exactly three motifs | camelCase `brief` interface and validation |
| 12–18 | title plus four ordered sections | generator template, structural verifier, assigned-field placement |
| 20–22 | verbatim fields, assigned motifs, refusal cases | occurrence checks, motif placement, generator refusal codes |
| 24–30 | independent structured verifier and required checks | separate verifier package; ten visible checks, missing/unexpected lists, counts |
| 32–33 | separate packages; pure; no filesystem or LLM | generator/verifier split, optional composition, empty capability list |

## Source-bound claims and reusable semantics

The document contains no instance-specific protagonist, setting, event, or quotation. All its substantive statements are a
generation/verification contract and were treated as candidate reusable semantics. The source's claims about independence,
purity, exact structure, and refusal behavior remain unverified policy statements until reviewer promotion; compilation and
tests show only that this interpretation executes as recorded.

## Gaps not silently resolved

The source does not define object key spelling, word tokenization, substring boundaries, closing-image punctuation,
whitespace emptiness, duplicate field values, non-title newlines, permitted Markdown edge cases, or a resolution for valid
briefs whose verbatim fields alone exceed 220 words. Candidate choices are documented in `contract.md` and require review.
