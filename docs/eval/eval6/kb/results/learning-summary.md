# Knowledge learning summary

## Outcome

All manifest-listed input was processed and one focused candidate family was created under
`candidates/constrained-literary-vignette/`. It contains separate deterministic generator and independent verifier SOP
packages, an explicit composition package, contracts, applicability boundaries, provenance, examples, automated tests, and
recorded compilation/runtime evidence. Nothing under trusted `circuits/` was modified or promoted.

Promotion recommendation: **hold for semantic review**. The candidate is mechanically valid and exercised, but the source
leaves interface, tokenization, Markdown-edge, and overlength-brief policy choices unresolved.

## Input coverage

| Manifest entry | Readability | Bytes | SHA-256 verification | Semantic coverage |
| --- | --- | ---: | --- | --- |
| `input/literary-generation-rules.md` | UTF-8 Markdown, fully readable | 2162/2162 | matched `7f5b738c2620ef5496935f3d730dca8346201ef59c0a9786a18c7a795e95200a` | lines 1–33, complete |

Coverage is 1/1 files, 2162/2162 bytes, with zero unreadable or unsupported inputs. No evaluation expectations, prior
results, evaluation README/HTML, sibling KB candidates, or sibling task workspaces were inspected. Runtime/project
documentation was used only to implement valid SOP and was not treated as domain evidence.

The trusted `circuits/` directory contained zero files. Consequently, overlap count is zero; no duplicate, weaker variant,
version conflict, or reusable trusted dependency was found.

## Extracted knowledge inventory

| Category | Extracted content | Candidate treatment |
| --- | --- | --- |
| Definitions | explicit brief, generated Markdown vignette, independent structured verification, three assigned motifs | object interface and separate package contracts |
| Facts/claims | source is a normative generation/verification contract; it contains no story-instance facts | represented as review-required reusable semantics, not accepted truth |
| Structural rules | one H1 title; `Arrival`, `Pressure`, `Choice`, `Consequence` in order; four body sections; one non-empty paragraph each | fixed generator template and independent structure checks |
| Content rules | every brief field verbatim; motifs in sections 2–4; consequence ends with motif 3 and closing image; fixed connective text only | section placement, occurrence, final-position, and exact approved-content checks |
| Exceptions/refusals | missing, empty, non-string fields; motif count not three; title newline | stable first-failure refusal codes with details |
| Priorities | refuse malformed inputs before assembly; never repair a failed document; generator self-check cannot replace verifier | validation order, visible `ok: false`, separate packages and nested receipts |
| Numeric boundaries | exactly 3 motifs, exactly 4 body sections, exactly 1 paragraph each, 90–220 words inclusive | explicit counts and 89/90/220/221 tests |
| Context/applicability | deterministic constrained vignette generation from an already mapped brief | explicit invocation only; no similarity matcher or mandatory template metadata |
| Procedure | validate brief → assemble fixed Markdown → independently verify original brief and Markdown → expose both outputs | `literary.composition` graph |
| Verification method | heading order, sections, paragraphs, verbatim content, motif placement, closing position, extra headings, word range | ten stable checks, missing requirements, unexpected conditions, and counts |
| Jurisdiction/effective interval | none supplied | none invented |
| External units/authorities | none supplied beyond structural and word counts | none invented |

No matcher candidate was created. The source specifies an exact data contract but supplies no deterministic evidence for
mapping arbitrary documents to that contract; converting similarity or agent confidence into mandatory applicability would
exceed the evidence.

## Candidate artifacts

- `literary.generator(brief) -> markdown` validates and assembles one LF-delimited fixed document.
- `literary.verifier(brief, markdown) -> verification` independently reconstructs the allowed template and reports rather
  than repairs semantic failures.
- `literary.composition(brief) -> markdown, verification` explicitly invokes both packages and uses an invariant covering
  both public wires to validate only composition shape.
- `manifest.json`, `contract.md`, `applicability.md`, and `provenance.md` record interfaces, refusal conditions, assumptions,
  effects/capabilities, source spans, overlap, review boundaries, and promotion requirements.
- `tests/candidate.test.mjs` and `evidence/test-report.md` provide executable cases, exact commands, outcomes, package hashes,
  nested receipt hashes, and public output hashes.

The packages contain no direct LLM integration and request no filesystem, process, network, clock, random, oracle, secret,
or other external capability.

## Compilation and execution metrics

| Metric | Result |
| --- | ---: |
| SOP packages compiled | 3/3 |
| Top-level automated tests | 6/6 passed |
| Root runtime executions in tests | 18 |
| Runtime `SUCCEEDED` | 8 |
| Runtime `REFUSED` | 10 |
| Runtime `REJECTED` | 0 |
| Runtime `ERROR` | 0 |
| Positive composition verifier checks | 10/10 true |
| Positive composition visible words | 192 |
| Word boundaries exercised | 89, 90, 220, 221 |
| Distinct malformed/refusal cases | 10 |
| Manifest inputs covered | 1/1 |

The positive CLI run was `SUCCEEDED`, returned verification `ok: true`, embedded successful generator and verifier child
receipts, and exposed two SHA-256 public output hashes. The tampered-document case also had runtime `SUCCEEDED` but semantic
`ok: false`, preserving failed checks without repair. Malformed inputs were `REFUSED` with no public output. No ordinary
case was mislabeled `REJECTED` or `ERROR`. Exact commands and hashes are recorded in the candidate's
`evidence/test-report.md`.

Compilation confirms supported syntax, arity, local-wire binding, package resolution, dependency coverage, and graph
validity. It does not establish semantic trust, mandatory applicability, literary merit, absence of all implied facts, or
promotion readiness.

## Assumptions and policy choices

- The brief uses candidate-defined camelCase keys, including `immediateGoal` and `closingImage`.
- Whitespace-only strings count as empty; otherwise strings are emitted verbatim.
- Words are whitespace-delimited visible tokens after removing Markdown heading markers at line starts.
- Verbatim matching is case-sensitive substring matching.
- Motif 3 appears in `Consequence`; the closing image is the final non-whitespace document content.
- The verifier accepts only the generator's exact fixed connective template, not alternate prose satisfying the same broad
  structure.
- Unknown brief keys are ignored.
- Structural parsing normalizes CRLF/bare CR, while approved generated output is exact LF text.
- Domain invalidity remains visible data (`SUCCEEDED` plus `ok: false`); only malformed inputs are runtime refusals.

These choices are documented and tested, not silently elevated to source facts.

## Ambiguity, gaps, and negative cases

The source does not define key spelling, a word tokenizer, punctuation handling, whole-word versus substring presence,
duplicate/overlapping values, whitespace emptiness, or all Markdown heading/paragraph edge cases. “Ending with the closing
image and motif 3” does not explicitly state their final order. It also does not specify whether the verifier must accept
alternative implementation-defined connective prose.

Two material internal tensions remain:

1. Every valid field must be preserved verbatim, but arbitrary-length fields can force the document above 220 words. The
   candidate neither truncates nor adds an undocumented length refusal; the composition exposes verifier `ok: false`.
2. Only title newlines are an explicit refusal, while a newline or heading token inside another verbatim field can violate
   the one-paragraph/no-extra-heading rules. The generator preserves the value and the verifier exposes the conflict.

Negative coverage includes a changed section heading, missing/replaced motif, altered unapproved content, 89 and 221 words,
null brief, missing/non-string/whitespace scalar, non-array/wrong-count/non-string/empty motifs, title newline, non-string
Markdown, and a valid but oversized brief. Literary quality and semantic detection of subtle implied events remain
unverifiable by this deterministic package.

## Security considerations

Inputs are treated only as data. Command blocks are pure, use no ambient I/O or direct LLM API, return canonical values, and
contain no hidden global state. Simple bounded regular expressions and occurrence scans are used; each scan advances by a
validated non-empty needle. Very large strings can still consume memory and CPU because the current Node VM guard is not a
production hostile-code sandbox and no explicit input-size budget exists. Prompt-injection text in field values is emitted
verbatim as data and may also break structure, which the verifier reports.

## Promotion recommendation

Keep the family under `candidates/` until reviewers:

1. approve the field schema, refusal priority, fixed prose, and exact-template verifier policy;
2. resolve overlength valid briefs and non-title newline/heading injection;
3. approve word counting, substring semantics, motif/closing order, and whitespace policy;
4. review the JavaScript commands and input-size risk;
5. rerun all three compile commands and the six-test suite on the promotion target; and
6. confirm whether version `0.1.0` should remain explicit or be replaced by the KB's package-version convention.

After those decisions, promote through a separate human-governed process. This learning run did not modify `circuits/` and
does not claim trust, automatic matching, closure, cache, certificate, or acceptance-profile behavior.
