# Candidate contract

## Identity and status

- Candidate: `contractual-breach-notice-v1`
- SOP subset: implemented SOP Lang v1 subset
- Status: reviewable candidate; not trusted, promoted, automatically matched, or legal advice
- Semantic source: `input/legal-notice-generation-rules.md`

## Positional interfaces

`breach_notice.brief(brief) -> (validatedBrief)` validates and returns the input value. It refuses malformed or unsupported
briefs with code `INVALID_BRIEF`.

`breach_notice.verify(brief, notice) -> (report)` validates the brief, refuses a non-string notice with
`INVALID_NOTICE_TYPE`, and otherwise returns a diagnostic report. A nonconforming string is a successful runtime result
whose `report.ok` is false, not a refusal or runtime error.

`breach_notice.generate(brief) -> (notice, report)` validates, assembles, independently verifies, and applies a goal. A
well-typed assembled notice that fails a check produces runtime outcome `REJECTED` and no public outputs.

## Brief schema

The JSON property names are `sender`, `recipient`, `agreementTitle`, `agreementDate`, `noticeDate`, `contractClause`,
`eventStatement`, `cureAction`, `cureDeadlineDate`, `permittedDeliveryMethod`, `reservationText`,
`governingLawStatement`, and `factualExhibits`. The first 12 values must be strings with length at least one.
`factualExhibits` must be a list with at least one string member, and each member must have length at least one. Unknown
properties are refused as a conservative policy choice.

Strings are opaque. The circuits do not parse dates, resolve parties, interpret clauses, validate delivery methods,
select governing law, calculate deadlines, or normalize whitespace.

## Assembly mapping

- Parties and Agreement: sender, recipient, agreement title/date, and notice date.
- Notice Purpose: fixed fact-bounded purpose and no independent breach determination.
- Supplied Facts: the verbatim event statement after the required factual label.
- Contract Reference: clause, governing-law statement, and fixed non-interpretation caution.
- Requested Cure: cure action and supplied deadline explicitly marked as not calculated.
- Delivery and Reservation of Rights: their corresponding verbatim strings.
- Exhibits: numbered in input order, without sorting or deduplication.
- Limitations: only the exact source-required sentence.

## Verification output

`report.checks` contains 15 booleans: one title, exact heading order, all values present, ordered exhibits, factual label,
clause caution, unchanged deadline, delivery method, reservation, governing law, exact limitations, no unsupported
currency, no unsupported penalty language, and one Parties-section occurrence for each party. `missingItems` lists failed
non-prohibition check names. `prohibitedAdditions` lists unsupported symbols/phrase. `measuredCounts` exposes heading,
value, exhibit, party-occurrence, and prohibition counts.

## Applicability and non-applicability

Apply only to deterministic assembly or literal verification of the specified contractual breach-notice fixture when all
facts are supplied in the exact schema. Do not apply it to legal analysis, breach determination, remedy advice, deadline
calculation, statute selection, damages, service proof, factual investigation, arbitrary notice formats, or semantic
equivalence checking.

No mandatory matcher metadata is declared. Selection remains a reviewer or caller decision.

## Effects, capabilities, and security

The packages are pure: no filesystem, process, network, clock, randomness, oracle, direct LLM/API, or hidden global-state
access. They return canonical strings/objects or explicit refusals. Verbatim untrusted strings are not rendered or sent;
callers that render Markdown must apply their own content-security controls. The generator may be rejected when verbatim
content changes Markdown structure, as recorded in the test suite.
