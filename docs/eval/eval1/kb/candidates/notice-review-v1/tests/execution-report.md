# Candidate Execution Report

## Environment and commands

Execution date: 2026-08-10. Node.js `v22.23.1` executed the repository reference implementation. The installed `agent`
alias was unavailable, so the equivalent repository entry point was used from the KB root:

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

All commands were run without filesystem, process, network, clock, random, oracle, or direct-LLM access inside the SOP
command. The test runner reads the candidate fixtures and imports the local reference runtime; it is not circuit code.

## Compilation result

| Package | Result | Package hash |
|---|---|---|
| `notice_review.evaluate` | success | `sha256:4eac315a0c17edfc384aa2261e697c2c5e8a726591cebe557e832c0c30d34914` |

The compiled graph has one input, one output, three live nodes, no dead nodes, and one invariant whose declared coverage
reaches the public finding. Compilation proves mechanical validity only.

## Test metrics

- Vectors: 21 total, 21 passed, 0 failed.
- Runtime outcomes: 12 `SUCCEEDED`, 8 `REFUSED`, and 1 pre-execution `INVOCATION_ERROR`.
- Semantic statuses among successful runs: 6 `COMPLIANT` and 6 `NON_COMPLIANT`.
- Categories: 2 positive, 5 negative, 3 boundary, 2 exception, 6 malformed-input, and 3 refusal/interface cases.
- Every successful result had one public output hash, a receipt hash, and a passing invariant.
- Every circuit refusal exposed no public output and retained its stable refusal code in the node receipt.
- The missing-positional-input case produced `CIRCUIT_ARITY_MISMATCH` before execution and therefore had no receipt.

## Representative evidence

| Case | Outcome and semantic result | Public output hash | Receipt hash |
|---|---|---|---|
| 30 ordinary days | `SUCCEEDED`, `COMPLIANT`, minimum 30 | `sha256:d6b0e854b79566ab31f1de0b4ac1fafbe941b8b865fc86ebf5a8c9a5e0fca99e` | `sha256:cd25eab034946e71078a074dafe7307a04f4ae57ad64faae157deb2ed515a622` |
| 29 ordinary days | `SUCCEEDED`, `NON_COMPLIANT`, minimum 30 | `sha256:889221a60e167ffd12af0d6cca9abce71ef66f0cdc56e22a3691eb5e116d490a` | `sha256:d73e82928a80fc948df7bc1442f12c8d076f84b3be60ffbaeb64cbe7c03e9171` |
| Eligible expedited 10 days | `SUCCEEDED`, `COMPLIANT`, minimum 10 | `sha256:6d51dff438f525b304008c3809a2047351affb50dbb1355c4f9941db6793ef55` | `sha256:065f60dbcdeaa64dd610a31b08c34776145e7d410dbaf112ac9c0908e0a33ef9` |
| Expedited 10 days, consent missing | `SUCCEEDED`, `NON_COMPLIANT`, minimum 30 | `sha256:71d7d1c52d6805d1b15135043ce4730280b17fe6678008a265728b3942ae02cb` | `sha256:0fadba0613beb8cd685b84e748f93697d44af07a69e635a3d6df670e239988bb` |
| String review days | `REFUSED`, no semantic verdict | none | `sha256:1686de651a08e0bb3fe05983f2fa899e74d05a6d1b02b49c3ce7f54969dd4764` |

The missing-consent output explicitly retained `writtenConsentState: "MISSING"`, selected `ORDINARY_MINIMUM`, and set
`exceptionEligible: false`. This demonstrates the source prohibition against inferring consent from the expedited flag.
These results do not establish legal validity, applicability, external evidence truth, semantic trust, or promotion.
