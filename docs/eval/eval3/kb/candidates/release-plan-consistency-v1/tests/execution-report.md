# Candidate Execution Report

## Environment and commands

Execution date: 2026-08-10. Node.js version: `v22.23.1`. The `agent` executable alias was not present in `PATH`, so commands used the repository CLI entry point `src/cli.mjs`, the same file declared as the `agent` package binary.

From the KB root, compilation used:

```sh
node ../../../../src/cli.mjs sop compile --root candidates/release-plan-consistency-v1/sop --package release_plan_consistency.review
```

The command exited 0 and returned package hash `sha256:d6fc683c520a3203247f12203798deb16cd458d8b058999f983faabf55fc8bdd`.

The complete vector suite used:

```sh
node candidates/release-plan-consistency-v1/tests/run-tests.mjs ../../../..
```

The runner loads the same reference runtime, executes every case in `tests/cases.json`, distinguishes runtime outcome from semantic verdict, asserts report evidence, and validates receipt and public output hash formats.

A representative successful CLI run used:

```sh
node ../../../../src/cli.mjs sop run --root candidates/release-plan-consistency-v1/sop --package release_plan_consistency.review --inputs '[{"planId":"cli-positive","chapters":[{"chapterId":"one","launchDate":{"assertionId":"d1","value":"Sep 1","dateKey":"2026-09-01","supersedes":[]},"definitions":[]}]}]'
```

It exited 0 and returned runtime `SUCCEEDED`, semantic verdict `CONSISTENT`, public output hash `sha256:179598b0a1fde4fcbdc3f2e7ac42089ec048a3c8c5a64240f47a310f31e264bd`, and receipt hash `sha256:4fbf3397f93bf518a5116e88721bf6db95193d630bab0c2ef78cc924aaf01b32`. All three executed nodes succeeded and the public invariant check was true.

A representative refusal CLI run used:

```sh
node ../../../../src/cli.mjs sop run --root candidates/release-plan-consistency-v1/sop --package release_plan_consistency.review --inputs '["not-a-plan"]'
```

It exited 2 and returned runtime `REFUSED`, refusal code `plan_must_be_an_object`, no outputs, no public output hashes, and receipt hash `sha256:08aa2aa7736426ffd6c5f0755983a0f35911fba9b3db947b297b8b5a484a8e4a`.

## Test outcomes

| Metric | Result |
|---|---:|
| Test vectors | 17 |
| Passed assertions | 17 |
| Failed assertions | 0 |
| Runtime `SUCCEEDED` | 11 |
| Runtime `REFUSED` | 6 |
| Runtime `REJECTED` | 0 |
| Runtime `ERROR` | 0 |
| Semantic `CONSISTENT` | 3 |
| Semantic `CONFLICT` | 5 |
| Semantic `UNKNOWN` | 3 |

Categories were one positive, two negative, two exception, three ambiguity, two boundary, one priority, two malformed-input, and four refusal vectors.

The suite covers uniform dates, multiple unsuperseded dates, complete and partial explicit supersession, incompatible known definition meanings, uncertainty retained alongside a known term conflict, unclassified differing definitions, identical definition text, a missing date, an empty plan, conflict priority with retained uncertainty, non-object input, duplicate chapter/assertion/within-chapter term identities, a future supersession target, and a missing meaning classification field.

Every successful run produced one public output hash and a receipt hash. Every refusal produced no output and no public output hash. These executions establish observed behavior and mechanical validity only; they do not establish source authority, semantic trust, automatic applicability, or promotion.
