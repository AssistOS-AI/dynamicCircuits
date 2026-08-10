# Learning Summary

## Outcome

The learning run processed every manifest entry and produced one focused, reviewable candidate:
`candidates/notice-review-v1/`. Package `notice_review.evaluate` implements the source-bounded 30-calendar-day notice rule,
the conditioned 10-day expedited exception, threshold compliance, and the prohibition against inferring missing consent.
Nothing was written to or promoted into `circuits/`.

## Input coverage

| Measure | Result |
|---|---|
| Manifest files | 1 declared, 1 read, 0 unreadable, 0 unsupported, 0 omitted |
| Bytes | 345 declared, 345 observed, 345 covered |
| Lines | 3 total, 3 read |
| Hash verification | `input/rule.md` matched SHA-256 `45044b3cb7a68d06b1dd366586e4436dfb61648537f47208b2683d5b2dd5e142` |
| Additional agent guidance | `.dynamic-circuits/AGENT_INSTRUCTIONS.md` was not present |
| Trusted KB overlap | `circuits/` contained 0 files; overlap `none` |

The source yielded one notice-period definition/context, a 30-day base rule, a 10-day exception, three exception
conditions, one threshold-compliance rule, one missing-evidence prohibition, a base-over-exception priority relationship,
and the calendar-day unit. It supplied no effective interval, jurisdiction, authority, counting convention, external
verification procedure, remedy, supersession rule, or broader conflict hierarchy.

## Candidate artifacts

- `README.md`: contract, applicability boundary, priority, assumptions, refusals, capabilities, examples, commands, and
  review checklist.
- `inventory.md`: complete extraction of definitions, claims, facts, rules, exception, priority, context, procedure, unit,
  absences, and ten ambiguity/review items.
- `provenance.json`: input hash and small line/sentence locators for each transformed semantic.
- `sop/notice_review/evaluate.sop`: one deterministic package with explicit positional ports and a source-grounded output.
- `tests/cases.json` and `tests/run-tests.mjs`: independent positive, negative, boundary, exception, malformed-input,
  refusal, and interface vectors.
- `manifest.json` and `tests/execution-report.md`: package identity, hash, metrics, exact commands, and representative receipts.

No corpus-only fact was promoted into an automatic matcher. The candidate has no matcher metadata and makes no claim of
semantic discovery, mandatory closure, external evidence verification, trust enforcement, caching, or certification.

## Compilation and exercise metrics

| Measure | Result |
|---|---|
| Packages compiled | 1 attempted, 1 succeeded, 0 failed |
| Package hash | `sha256:4eac315a0c17edfc384aa2261e697c2c5e8a726591cebe557e832c0c30d34914` |
| Test vectors | 21 total, 21 passed, 0 failed |
| Runtime outcomes | 12 `SUCCEEDED`, 8 `REFUSED` |
| Pre-execution interface outcomes | 1 `INVOCATION_ERROR` (`CIRCUIT_ARITY_MISMATCH`) |
| Semantic verdicts | 6 `COMPLIANT`, 6 `NON_COMPLIANT` |
| Test categories | 2 positive, 5 negative, 3 boundary, 2 exception, 6 malformed-input, 3 refusal/interface |

Every successful execution exposed one public output hash, one receipt hash, and a passing invariant. Every runtime refusal
exposed no public output and retained a stable refusal code. The interface-arity error occurred before execution and had no
receipt. Compilation and execution demonstrate mechanics and the encoded behavior, not semantic trust.

## Assumptions and policy choices

The candidate assumes a plain `notice` object and a nonnegative whole-number `reviewDays` field. Optional evidence values
must be Boolean when present; absence means the fact is not established. The expedited exception requires the expedited
flag as well as explicit request and written consent. If any of these is absent or false, the candidate falls back to the
30-day minimum rather than declaring the notice categorically invalid.

The output term `COMPLIANT` is narrowly scoped to this period rule. Inputs about consent and request are assertions; the
candidate cannot establish that a writing exists, is authentic, covers the notice, remains effective, or was made by the
subject. No applicability decision is made from document similarity or agent confidence.

## Gaps and ambiguity

Promotion review must resolve whether calendar days must be whole and nonnegative, whether request and consent are
sufficient or merely necessary for the exception, whether the expedited flag is independently required, and whether a
failed exception should fall back to 30 days. The source also leaves calendar counting, start and end instants, time zone,
holidays, consent form and revocation, governing jurisdiction, authority, effective date, applicability scope, remedies,
and conflicts with other policies unspecified.

There is no independent source or real notice fixture in this learning corpus. Consequently, the tests compare the
candidate against the supplied rule and constructed examples; they cannot corroborate the policy, verify evidence, or prove
fitness for a specific legal or organizational setting.

## Security considerations

The SOP uses only explicit canonical inputs and deterministic local computation. It has no filesystem, process, network,
clock, randomness, oracle, persistent-cache, or direct-LLM capability. It does not fetch or inspect consent records. The
reference runtime's Node `vm` boundary is not production isolation, so untrusted promotion still requires code review and
appropriate deployment controls.

## Promotion recommendation

Recommendation: **hold for semantic and policy review; do not promote yet**. The candidate is mechanically ready for
review because compilation and all 21 tests pass, provenance is complete, the missing-consent prohibition is exercised,
and there is no trusted overlap. Promotion should occur only after the notice-policy owner and legal/compliance owner resolve
the interpretation choices, a records/evidence owner approves the evidence model, and a SOP runtime maintainer independently
reproduces the compile and test commands.

If approved, promotion should be a separate governed action that preserves this candidate's provenance and version, selects
an appropriate trusted namespace, and does not imply automatic applicability beyond the reviewed context.
