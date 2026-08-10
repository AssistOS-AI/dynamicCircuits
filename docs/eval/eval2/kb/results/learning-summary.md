# Knowledge Learning Summary

## Outcome

The learning run processed the complete declared corpus and produced one focused candidate package:
`candidates/universal-positive-observations/`. The candidate compiles and all 12 executable cases pass. No trusted circuit
was created, modified, copied, or promoted.

Compilation establishes mechanical validity only. The candidate remains `review_required` because its positive verdict
label, strict provenance schema, invalid-input priority, witness-selection policy, and bundled mean calculation go beyond
details explicitly settled by the source.

## Input coverage

| Manifest entry | Workspace source | Bytes | SHA-256 | Read status | Coverage |
| --- | --- | ---: | --- | --- | ---: |
| `rule.md` | `input/rule.md` | 423 | `f370ceb2bcd7ca0a7d3723c1616a70fc502d5dcb960083ae99990ab927b4573c` | Complete UTF-8 Markdown | 100% |

Coverage is 1 of 1 files, 423 of 423 declared bytes, and 100% of manifest entries. The observed byte count and SHA-256
match `.dynamic-circuits/input-manifest.json`. No file was unreadable, unsupported, omitted, or followed through a symbolic
link. `.dynamic-circuits/AGENT_INSTRUCTIONS.md` was absent; the workspace-owned `AGENTS.md` supplied the active local
guidance.

Provenance is recorded in `candidates/universal-positive-observations/provenance.json` using the source path, verified hash,
and small spans from lines 3–6. The source contains reusable review semantics and no task observation records, so no corpus
fact was embedded in the executable package.

## Extracted knowledge

The source supports the following inventory:

- Definition: strict positivity uses the boundary `value > 0`; zero is not strictly positive.
- Context: the universal claim concerns finite observations.
- Rule: one finite observation with `value <= 0` refutes the universal claim.
- Evidence obligation: refutation exposes at least one source observation as a witness.
- Claim boundary: a positive mean establishes an aggregate property only and does not establish universal positivity.
- Unavailability conditions: empty data, a missing value, or a non-numeric value makes computation unavailable rather than
  false.
- Procedure implied by those requirements: validate the complete dataset, evaluate observations individually, preserve a
  witness, and report aggregate arithmetic separately.

The source supplies no jurisdiction, effective interval, units, supersession rule, domain exception, explicit priority,
observation schema, identifier convention, source-locator syntax, or named positive verdict. Those absences are preserved
as review questions rather than silently presented as source facts.

## Candidate package

`candidate.universal_positive_review` has one ordered input, `observations`, and one ordered output, `review`. Each input
record must contain a unique identifier, finite numeric value, and non-empty source path and locator. The output contains a
dataset-scoped `SUPPORTED` or `REFUTED` verdict, observation count, one deterministic witness or `null`, and a separately
classified arithmetic mean.

The package validates every member before producing a verdict. It returns the first non-positive observation in input order
as the witness. A local command check recomputes the result, while a separate blocking invariant verifies that a refutation
witness matches a supplied source-located observation and that a supported result has no non-positive members. Both graph
nodes are live; the invariant structurally covers the public review and the observations input.

Package artifacts are:

- `README.md`: contract, applicability, non-applicability, assumptions, ambiguity, effects, overlap, and review checklist;
- `manifest.json`: positional interface, refusal codes, compatibility, artifact inventory, and required reviewers;
- `provenance.json`: verified input identity and small supporting spans;
- `sop/universal_positive_review.sop`: executable candidate;
- `tests/cases.json`: independent positive, negative, boundary, aggregate-separation, malformed, ambiguity, provenance, and
  refusal fixtures;
- `tests/run-tests.mjs`: deterministic compiler/runtime assertions; and
- `tests/execution-results.json`: exact commands, classifications, public output hashes, and receipt hashes.

## Trusted overlap and compatibility

The prepared KB's `circuits/` directory contained zero files and therefore zero trusted packages to compare. No weaker
duplicate was copied and no version conflict was found. The candidate uses only the implemented SOP v1 subset: ordered ports, local
JavaScript command descriptors, explicit immutable wires, and one invariant. It has no qualified package dependencies, so a
reviewed namespace-only move could later expose it as `kb.universal_positive_review` without changing its internal calls.

The candidate does not implement or claim template matching, semantic indexing, automatic wiring, mandatory closure,
persistent caching, trust profiles, certificates, or source-document parsing.

## Compilation and execution evidence

The public CLI compilation command was:

```text
node /home/salboaie/work/dynamicCircuits/src/cli.mjs sop compile \
  --root candidates/universal-positive-observations/sop \
  --prefix candidate \
  --package candidate.universal_positive_review
```

It passed with package hash
`sha256:3880135211c7db486c756c826f5b655fe97e69baff9f881bc99d999d00bf615d`, two live nodes, one invariant,
and zero dead nodes. The exhaustive command was `node tests/run-tests.mjs` from the candidate folder. The test runner imports
the same dependency-free compiler/runtime modules directly because this workspace sandbox blocks nested process creation.
Three representative cases were also run individually through the public CLI; their exact commands are recorded in
`tests/execution-results.json`.

| Metric | Result |
| --- | ---: |
| Cases executed | 12 |
| Assertions/cases passed | 12 |
| Failed cases | 0 |
| Runtime `SUCCEEDED` | 5 |
| Runtime `REFUSED` | 7 |
| Runtime `REJECTED` | 0 |
| Runtime `ERROR` | 0 |
| Semantic `SUPPORTED` outputs | 2 |
| Semantic `REFUTED` outputs | 3 |

Coverage includes all-positive input, negative values, zero at the strict boundary, the smallest positive finite number, a
positive mean with a negative witness, empty input, missing value, numeric-string refusal, malformed top-level input,
missing provenance, duplicate identifiers, and a priority case where invalidity overrides an available counterexample.

Successful receipts contain one passing invariant and one public output hash. Refused receipts expose the expected stable
code, no successful public outputs, no invariant claim, and no public output hashes. The CLI's exit code `2` for a controlled
`REFUSED` outcome is recorded as semantic refusal rather than test failure. The positive-mean case returned mean `4`,
`meanIsStrictlyPositive: true`, semantic verdict `REFUTED`, and a source-located `-2` witness.

## Assumptions and policy choices

1. The caller supplies the complete finite dataset in scope; the package does not discover or prove completeness.
2. `SUPPORTED` names the valid all-positive result even though the source explicitly names only refutation.
3. Full-dataset validity has priority over counterexample availability. A missing or non-numeric member refuses the whole
   computation even if another valid member is non-positive.
4. Input order is meaningful only for deterministic first-witness selection; the source requires at least one witness but
   states no witness priority.
5. Unique non-empty identifiers and source path/locator strings are required to make witness provenance unambiguous.
6. Numeric strings are not coerced. Values use finite JavaScript-number semantics and the mean is not arbitrary precision.
7. `SUPPORTED` is scoped to the supplied dataset, not source authenticity, measurement validity, sample adequacy, or a
   population-level proposition.

## Gaps and residual ambiguity

- The source does not say whether every counterexample or only one preferred counterexample should be returned.
- The source does not specify behavior for duplicate identifiers, absent source locators, malformed records, or partial
  datasets; the candidate refuses these cases conservatively.
- The source does not define an observation identifier or locator schema, units, weighting, ordering, or dataset authority.
- The source separates positive mean from universal support but does not require the mean to be calculated by this reusable
  package. Bundling it is reviewable and may be split into a statistics package.
- The running mean is deterministic for input order but is not a compensated or arbitrary-precision statistic.
- Non-finite values cannot be represented by the CLI's JSON input and are outside the runtime's canonical value model; the
  candidate's explicit finite-number check remains a defensive semantic guard.
- Both the command check and invariant live in the same candidate package. They detect internal inconsistency but are not an
  independent high-assurance verifier.
- The test examples are independent of the source document's absent dataset, but they do not establish scientific validity
  for every domain or measurement process.

## Security considerations

The circuit is pure and uses no filesystem, process, network, clock, random, secret, oracle, or direct LLM API integration.
All runtime values enter through the declared input. Source path and locator values are copied as canonical strings and are
never dereferenced. The candidate does not interpret input text as agent authority.

The reference Node `vm` boundary is suitable for reviewable code, not hostile multi-tenant isolation. Promotion review must
still inspect the JavaScript lexical islands. The local test runner reads fixtures and repository modules as development
tooling; those host operations are not SOP command capabilities.

## Promotion recommendation

Do not promote automatically. The candidate is mechanically sound and suitable for human review. Promotion is recommended
only after a domain or scientific-method reviewer and an SOP/runtime reviewer agree on all of the following:

1. `SUPPORTED` is the correct positive classification and remains explicitly dataset-scoped.
2. Invalid-member priority, unique identifiers, mandatory locators, and first-witness ordering match intended policy.
3. Mean reporting belongs in this interface and its numeric accuracy is sufficient, or it is split into a separate package.
4. The applicability limits exclude partial streams, population inference, weighted claims, and thresholds other than zero.
5. All 12 cases are rerun from a clean review checkout and artifact/source hashes are reverified.

If approved, promotion should be a separate governed operation that copies the reviewed package into `circuits/`, assigns
the `kb.universal_positive_review` namespace, records reviewer identities and decisions, and reruns compilation and tests.
This learning run intentionally performed none of those actions.
