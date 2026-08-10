# Learning Summary: Data Release Governance

## Outcome

The learning run processed the complete manifest and produced one focused reviewable candidate folder, `candidates/data-release-governance-v1/`. It contains ten independent rule packages (`data_release_governance.r01` through `.r10`) and one stable-order composition package (`data_release_governance.review`), plus a contract, inventory, provenance, manifest, explicit test vectors, an executable test runner, and an execution report.

Nothing in `circuits/` was created, changed, overwritten, or promoted. Compilation and execution results establish mechanical validity and observed behavior only; the candidate remains `review-required`.

## Input coverage

| Metric | Result |
|---|---:|
| Manifest entries | 1 |
| Files read | 1 |
| Files matched by size and SHA-256 | 1 |
| Unreadable files | 0 |
| Unsupported files | 0 |
| Source lines inspected | 108 of 108 |
| Source bytes inspected | 7,098 of 7,098 |

`input/knowledge-base.md` matched manifest SHA-256 `86019bae0a8c3f0b9f26a99a6bcf71682d41021b1b778c8bb42bb5dbfaea0fcf`. Coverage includes the corpus purpose and record definition (lines 3-13), every rule chapter and example (lines 15-101), and required composition (lines 103-108). `.dynamic-circuits/AGENT_INSTRUCTIONS.md` was not present; `AGENTS.md` and `.dynamic-circuits/workspace.json` were read.

## Extracted knowledge

- Definitions: one governed release record, one identifier, 15 policy fields, PASS/FAIL rule outcomes, and the required review shape.
- Facts and claims: exactly ten independent fixture rules; all findings must be retained; the R10 license set is fixture vocabulary and does not invalidate other real-world licenses.
- Rules: all R01-R10 obligations, exact failure reasons, supported vocabulary, and the inclusive 1-to-365-day retention bound.
- Exceptions and non-applicability: non-personal R01/R08 paths, public/internal R02 path, public R05 path, no-processor R06 path, EU direct R07 path, and approved US/mixed R07 path.
- Priorities: no rule overrides another; stable ordering and complete finding retention replace short-circuit precedence.
- Contexts: personal data, sensitivity classes, processor use, residency, and universal rules. No policy jurisdiction is declared.
- Procedures: independently evaluate R01-R10, retain findings, derive failed identifiers and counts, and set compliance from the absence of failures.
- Units and intervals: integer days, inclusive interval 1-365. No effective dates or version intervals are supplied.
- Verification limits: the source provides examples but no method for authenticating documentary or technical claims.
- Ambiguity: trigger typing, unknown sensitivity, case sensitivity, normalization, identifier format, evidence standards, policy authority/effective date, and refusal-versus-FAIL behavior are explicitly recorded in the candidate inventory.

Corpus-specific observations were not generalized beyond the fixture. Reusable semantics are expressed only through explicit record inputs, canonical outputs, applicability, bypasses, refusals, provenance, and tests.

## Candidate metrics

| Metric | Result |
|---|---:|
| Candidate folders | 1 |
| SOP packages | 11 |
| Focused rule packages | 10 |
| Composition packages | 1 |
| Compile successes | 11 |
| Compile failures | 0 |
| Test vectors | 55 |
| Passed assertions | 55 |
| Failed assertions | 0 |
| Runtime `SUCCEEDED` outcomes | 47 |
| Runtime `REFUSED` outcomes | 8 |
| Runtime `REJECTED` outcomes | 0 |
| Runtime `ERROR` outcomes | 0 |

Test coverage includes positive, negative, boundary, malformed-input, exception, refusal, and composition cases. It covers every rule's PASS and FAIL behavior, all explicit bypass paths, R03 endpoints and adjacent failures, owner trimming and marker behavior, all three R10 accepted identifiers, unsupported sensitivity, malformed trigger flags, missing identifier, non-object input, child-refusal propagation, a ten-PASS review, a ten-FAIL review, and an all-bypass review.

The ten-FAIL review returned every finding and failed identifier in R01-to-R10 order. This directly exercises the non-override and no-short-circuit requirement. Successful runs produced public output hashes and receipt hashes; refusals produced no public outputs. Each successful composition case also verified ten nested child receipts, their outcomes, receipt hashes, and public output hashes. Exact commands, package hashes, and representative receipt hashes are recorded in `candidates/data-release-governance-v1/tests/execution-report.md`.

## Trusted overlap and compatibility

The trusted `circuits/` directory contains zero files. Therefore no overlapping trusted package, alternative version, or weaker duplicate exists. The candidate compiles with the current dependency-free SOP reference runtime and uses only explicit positional inputs, local immutable wires, nested circuit calls, core commands, and deterministic JavaScript command blocks.

The `agent` executable alias was unavailable in the shell. Compilation and CLI execution used the repository's `src/cli.mjs` entry point directly, which is the file declared as the `agent` binary in `package.json`. This limitation is documented rather than misreported as an `agent` alias execution.

## Assumptions and interpretation choices

1. Malformed or missing `containsPersonalData` and `externalProcessors` triggers are refusals, not inferred false values.
2. Unsupported sensitivity values are refusals because R02 and R05 do not define their result. Unknown residency remains a semantic FAIL because R07 explicitly says so.
3. Values are compared exactly and case-sensitively. Only deletion and incident owner text is trimmed.
4. Applicable boolean controls pass only on JSON true. Missing and false do not satisfy a requirement.
5. The review requires identifier property presence but imposes no additional identifier format.
6. A compliant report means ten findings and zero FAIL results. A refusal yields no partial report.
7. The supplied fields are assertions. The candidate does not verify underlying evidence or control operation.

These choices are visible in the contract, inventory, tests, and refusal behavior. They are not claims of source certainty.

## Gaps and review risks

- The source lacks a full field schema, issuing authority, effective date, policy version, jurisdiction, supersession rule, and conflict procedure.
- Evidence standards are absent for consent, encryption, logging, DPA validity, residency approval, anonymization quality, owner identity, and license applicability.
- The source does not resolve whether a malformed but object-shaped record should receive ten FAIL findings or a refusal. Current refusals protect against false bypasses but prevent a complete ten-finding review.
- The exact meaning and case behavior of `missing` outside the explicitly named values is not fully defined.
- R07's `NON_EU_OR_UNKNOWN` output path groups distinct inputs while preserving the same source-defined FAIL reason. Reviewers may prefer more granular path evidence.
- Examples validate branches but do not constitute independent external policy evidence.
- No trusted-circuit comparison was possible because the trusted directory is empty.

## Security and capability review

SOP command blocks have no filesystem, process, network, clock, random, oracle, hidden-global, or direct LLM access. The candidate declares no effects or capabilities and performs no external actions. Runtime records and receipts may reveal governance metadata and should be handled according to the host's data classification. Input size and nesting limits remain the host runtime's responsibility; the candidate itself does no unbounded iteration or recursion.

No direct LLM API integration was added to generated code.

## Promotion recommendation

Do not promote automatically. Promote the 11 packages only as one reviewed family after all of the following are complete:

1. A data-release policy owner confirms the rule transcription, stable order, and zero-failure definition of compliance.
2. Privacy/legal, security, and records-management reviewers approve their respective rule interpretations and exact vocabularies.
3. Reviewers decide refusal versus FAIL behavior for missing trigger fields and unknown sensitivity, and decide whether complete reviews must always return ten findings for malformed object-shaped records.
4. Owners document evidence standards or explicitly accept that the packages validate record assertions only.
5. A SOP runtime maintainer independently recompiles all packages, reruns the 55 vectors, inspects nested receipts and public output hashes, and confirms version compatibility.
6. Promotion, if approved, is performed by a separate authorized process that preserves this candidate and provenance unchanged for audit.

If any interpretation changes, update the affected focused package, provenance/contract, relevant boundary and refusal vectors, composition expectations, and this summary before reconsidering promotion.
