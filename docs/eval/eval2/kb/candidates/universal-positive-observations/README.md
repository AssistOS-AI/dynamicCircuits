# Universal Positive Observation Review Candidate

## Purpose and status

This candidate deterministically reviews the dataset-level claim that every supplied observation is strictly positive. It
is reviewable generated knowledge, not a trusted package. Compilation and the recorded tests establish mechanical behavior
only; promotion requires semantic and scientific-method review.

The candidate is source-independent at execution time. Callers supply a complete observation array, stable observation
identifiers, numeric values, and source locators. The result keeps the universal verdict separate from the arithmetic mean.

## Extracted knowledge inventory

- Definition: an observation is strictly positive exactly when its finite numeric value is greater than zero.
- Rule: any validated observation with a value less than or equal to zero refutes the universal claim.
- Evidence requirement: a refutation exposes a supplied observation identifier, value, source path, and locator.
- Aggregate claim: `meanIsStrictlyPositive` describes only the mean and never overrides the universal verdict.
- Unavailability rules: a missing dataset, non-array dataset, empty dataset, malformed record, missing value, non-numeric
  value, duplicate identifier, or missing source locator refuses execution instead of returning a negative verdict.
- Priority: complete input validation precedes both universal review and mean reporting. An invalid member makes the whole
  computation unavailable, even when another member would be a counterexample.
- Procedure: validate the complete set, compute a finite running mean, scan in input order, retain the first non-positive
  observation as a deterministic witness, and verify grounding with a blocking invariant.

The source provides no jurisdiction, unit, effective interval, supersession rule, or domain-specific exception. Those
dimensions remain caller context and must not be inferred by this package.

## Interface

The ordered input is `observations`, a non-empty array of records shaped as follows:

```json
{
  "id": "obs-17",
  "value": -2,
  "source": {
    "path": "input/observations.md",
    "locator": "table row obs-17"
  }
}
```

Identifiers must be unique non-empty strings. Values must be JavaScript finite numbers; numeric strings are not coerced.
Both source fields must be non-empty strings. Input array order determines which witness is returned if several values are
non-positive.

The ordered output is `review`:

- `claim`: stable identifier `all_observations_are_strictly_positive`;
- `verdict`: `SUPPORTED` when every validated value is greater than zero, otherwise `REFUTED`;
- `observationCount`: number of validated observations;
- `witness`: `null` for `SUPPORTED`, or the first grounded non-positive source observation for `REFUTED`;
- `aggregate.mean`: running arithmetic mean; and
- `aggregate.meanIsStrictlyPositive`: the independent aggregate classification.

`SUPPORTED` means the universal claim holds for the complete validated input array supplied to this execution. It is not a
claim that sampling was complete, sources were authentic, measurements were correct, or the proposition holds outside the
provided dataset.

## Applicability and non-applicability

Apply the package only to a finite, completely supplied set whose intended proposition is universal strict positivity.
The caller must decide that the array is the complete dataset in scope and that all values share whatever interpretation
and units the surrounding task requires.

Do not apply it to partial or streaming datasets, probabilistic positivity claims, confidence intervals, weighted means,
non-numeric ordinal values, claims using a threshold other than zero, or a request to establish population-level truth from
a sample. The package does not parse source documents, discover datasets, assess measurement quality, or adjudicate source
authority.

## Assumptions and policy choices

The source explicitly defines refutation but does not name the all-positive converse; this candidate uses `SUPPORTED` for
the validated no-counterexample result. It also chooses the first counterexample in input order because the source requires
at least one witness but gives no selection priority. Unique identifiers and source locators are candidate requirements
introduced to make witness provenance reviewable. Full-dataset invalidity takes priority over counterexample reporting.

The running-mean algorithm avoids ordinary same-sign overflow and returns a finite canonical number for finite inputs. It
does not provide arbitrary-precision or compensated statistical accuracy. Reviewers should decide whether a mean belongs in
the promoted reusable interface or in a separate statistics package.

## Effects, capabilities, and security

The circuit is pure. It requests no filesystem, process, network, clock, random, secret, or oracle capability and contains
no direct LLM integration. Inputs are data, including source-path strings; they are never interpreted as instructions or
used for file access. The JavaScript command runs within the reference runtime boundary, which is review-oriented rather
than production hostile-code isolation.

The test runner is separate development tooling. It imports only the repository's local compiler/runtime modules and is
not part of circuit execution or the candidate's capability contract.

## Overlap and compatibility

The prepared KB's `circuits/` directory contained zero files and therefore no trusted package overlap at extraction time.
The SOP uses only the implemented SOP v1 subset, one ordered input, one ordered output, local commands, immutable wires, and one invariant.
It does not claim automatic matching, mandatory closure, trust enforcement, caching, or certificates.

Compile and test from this candidate folder:

```text
node ../../../../../../src/cli.mjs sop compile --root sop --prefix candidate \
  --package candidate.universal_positive_review
node tests/run-tests.mjs ../../../../../..
```

The relative repository-root examples above assume this evaluation layout. A reviewer may instead pass an absolute
repository root as the test runner's first argument.

## Review checklist

1. Confirm that `SUPPORTED` is an acceptable positive classification for the source's unnamed converse.
2. Confirm that invalid observations should override an otherwise available counterexample.
3. Confirm the strict input schema, unique identifiers, and mandatory source locators.
4. Confirm deterministic first-witness selection or choose a different stated priority.
5. Review numerical accuracy expectations and whether mean reporting should remain bundled.
6. Re-run every case and inspect refusal codes, invariant checks, child-free receipts, and public output hashes.
7. Assign both a domain/scientific-method reviewer and an SOP/runtime reviewer before promotion.
