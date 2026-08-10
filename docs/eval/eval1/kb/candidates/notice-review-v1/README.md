# Notice Review Candidate v1

## Status and scope

This is a review-required candidate extracted from `input/rule.md`. It is not trusted, promoted, or automatically
applicable. It evaluates only the notice-period rule stated in that source. Mechanical compilation and passing tests do not
establish source interpretation, legal correctness, evidentiary truth, or semantic trust.

## Package contract

The SOP root is `sop/`; package `notice_review.evaluate` has the complete positional interface:

```text
@input notice
@output finding
```

`notice` is a plain object. `reviewDays` is required and, as a candidate policy choice, must be a nonnegative integer.
Optional `expedited`, `subjectExplicitlyRequestedExpedited`, and `writtenConsentRecorded` values must be Booleans when
supplied. Missing optional evidence means that fact is not established.

A successful output includes `status`, `reason`, `reviewDays`, `applicableMinimumDays`, `reviewPath`,
`exceptionEligible`, explicit evidence states, and `sourceLocator`. `COMPLIANT` means only that this one period rule is
satisfied. Runtime `REFUSED` is distinct from semantic `NON_COMPLIANT`.

## Applicability, non-applicability, and priority

The candidate may be called only after a reviewer or task circuit has established that `input/rule.md` governs the notice.
It contains no executable matcher metadata and claims no automatic discovery or mandatory closure.

The 30-day minimum is the base rule. The 10-day exception has priority only when all three conditions are explicit:

- the review is flagged expedited;
- the subject explicitly requested expedited treatment; and
- written consent is recorded.

If any condition is false or absent, the base 30-day minimum remains applicable. In particular, an expedited flag never
supplies missing consent. A notice at or above the selected minimum is compliant under this rule; one below it is
non-compliant. No other notice obligations are evaluated.

## Refusal conditions

The package refuses with stable codes when:

- `notice` is null, scalar, or an array (`notice_must_be_an_object`);
- `reviewDays` is absent (`review_days_required`);
- `reviewDays` is not a nonnegative integer (`review_days_must_be_a_nonnegative_integer`); or
- a supplied evidence flag is not Boolean (`notice_evidence_flag_must_be_boolean`, with the field in details).

Missing request or consent is not refused because the source gives missing consent a substantive meaning: the expedited
exception cannot be established.

Omitting the positional `notice` input is rejected before circuit execution with `CIRCUIT_ARITY_MISMATCH`; it is an
invocation error, not a circuit refusal, and has no runtime receipt.

## Effects, capabilities, and security

The SOP command is deterministic and consumes only its explicit positional input. It returns canonical data and receives no
filesystem, process, network, clock, randomness, oracle, cache, external evidence, or direct-LLM capability. It does not
verify the authenticity of requests or consent. The Node `vm` execution boundary is a development guard rather than a
production hostile-code sandbox.

## Examples

| Case | Result |
|---|---|
| 30 ordinary days | `COMPLIANT`, minimum 30 |
| 29 ordinary days | `NON_COMPLIANT`, minimum 30 |
| 10 expedited days with explicit request and recorded consent | `COMPLIANT`, minimum 10 |
| 10 expedited days with missing consent | `NON_COMPLIANT`, minimum 30, consent state `MISSING` |
| String day count | Runtime `REFUSED`; no public output |

The complete positive, negative, boundary, exception, malformed-input, and refusal vectors are in `tests/cases.json`.

## Verification commands and expected evidence

The installed `agent` alias is not present in this workspace, so the repository entry point is the executable equivalent.
From the KB root:

```sh
node ../../../../src/cli.mjs sop compile \
  --root candidates/notice-review-v1/sop \
  --package notice_review.evaluate

node ../../../../src/cli.mjs sop run \
  --root candidates/notice-review-v1/sop \
  --package notice_review.evaluate \
  --inputs '[{"reviewDays":10,"expedited":true,"subjectExplicitlyRequestedExpedited":true,"writtenConsentRecorded":true}]'

node candidates/notice-review-v1/tests/run-tests.mjs ../../../..
```

The package-binary compile form is:

```sh
agent sop compile --root candidates/notice-review-v1/sop --package notice_review.evaluate
```

Compilation should exit zero and emit a package hash. Successful runs should have one public output hash, a receipt hash,
and passed check/invariant evidence. Refusals should expose no public output and retain the refusal code in the node receipt.
The arity-error test should fail before a receipt exists. Exact observed metrics and representative hashes are recorded in
`tests/execution-report.md` after execution.

## Overlap, versioning, and promotion review

The trusted `circuits/` tree was empty during extraction, so overlap is `none`. The package targets the implemented SOP v1
subset and version `1.0.0-candidate`; compatibility does not imply trust.

Before promotion, reviewers must:

- confirm the 30-day base and 10-day exception interpretation against the source owner’s intent;
- decide every ambiguity in `inventory.md`, especially whole-day validation and fallback to 30 days;
- confirm that the three Boolean fields accurately represent acceptable evidence;
- independently reproduce compilation and all tests and inspect output and refusal receipts;
- review security and applicability limits; and
- obtain approval from the notice-policy owner, legal/compliance owner, records/evidence owner, and SOP runtime maintainer.
