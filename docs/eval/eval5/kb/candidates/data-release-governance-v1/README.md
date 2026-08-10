# Data Release Governance Candidate v1

## Status

This folder is a reviewable candidate extracted from `input/knowledge-base.md`. It is not trusted, promoted, or automatically applicable. Compilation demonstrates only that the package graph is mechanically valid. Policy owners must approve the interpretation choices in this document before any separate promotion step.

## Packages and interfaces

The SOP root is `sop/`. Every focused rule package has the same complete positional interface:

```text
@input release
@output finding
```

Packages `data_release_governance.r01` through `data_release_governance.r10` each evaluate one obligation. Package `data_release_governance.review` accepts the same release object and returns one report. The review calls all rule packages in R01-to-R10 order and does not stop after a FAIL.

A successful focused-rule output is:

```json
{
  "ruleId": "R01",
  "status": "PASS",
  "reason": null,
  "path": "APPLICABLE",
  "sourceLocator": "input/knowledge-base.md:15"
}
```

`status` is always `PASS` or `FAIL`. `reason` is `null` on PASS and is the source-defined failure reason on FAIL. `path` distinguishes applicable and explicit bypass paths without changing PASS/FAIL semantics. `sourceLocator` retains the source heading line.

The review output contains `releaseIdentifier`, all ten findings, `failedRuleIdentifiers`, `passCount`, `failCount`, and `compliant`. `compliant` is true exactly when `failCount` is zero.

## Applicability and non-applicability

| Package | Applicability | Explicit non-applicability or alternate path |
|---|---|---|
| R01 | `containsPersonalData === true` | Boolean false passes without consent evidence. |
| R02 | `confidential` or `restricted` | `public` and `internal` pass without mandatory encryption under this rule. |
| R03 | Every release | None. |
| R04 | Every release | None. |
| R05 | `internal`, `confidential`, or `restricted` | `public` passes without controlled-access logging under this rule. |
| R06 | `externalProcessors === true` | Boolean false passes without a DPA status. |
| R07 | Every release | EU is a direct PASS path; US or mixed needs approval; unknown residency fails. |
| R08 | `containsPersonalData === true` | Boolean false passes without anonymization. |
| R09 | Every release | None. |
| R10 | Every release | None. |

No finding overrides any other. Consent and anonymization, deletion and incident ownership, encryption and residency approval, and technical safeguards and agreements remain separate controls.

## Assumptions and refusal conditions

- A release must be a plain runtime object. Null, arrays, scalars, and missing positional input are refused.
- R01 and R08 require `containsPersonalData` to be a JSON boolean; R06 requires `externalProcessors` to be a JSON boolean. Missing or string-like trigger flags are refused instead of being interpreted as false.
- R02 and R05 accept only `public`, `internal`, `confidential`, and `restricted`. Other sensitivity values are refused because the source does not define their policy result.
- R07 follows the source's different rule: an unknown residency is a FAIL, not a refusal.
- Required booleans inside an applicable branch pass only on JSON `true`; false, missing, and other canonical values do not satisfy the obligation.
- Vocabulary comparison is exact and case-sensitive. Only owner fields are trimmed because only R04 and R09 specify whitespace removal.
- The review requires the `identifier` property to exist but does not impose a source-unstated identifier format.
- All runtime inputs must already be canonical SOP values. The candidate performs no schema migration, coercion, evidence collection, or external verification.

These are candidate interpretation choices. In particular, policy reviewers must decide whether malformed trigger fields and unknown sensitivity should instead produce FAIL findings so a complete review can always retain ten semantic results.

## Effects, capabilities, and security boundary

The SOP commands are deterministic and operate only on explicit positional input. They return canonical data and have no filesystem, process, network, clock, random, oracle, persistent-cache, or direct LLM access. They do not inspect encryption systems, consent records, agreements, logging infrastructure, residency evidence, anonymization quality, owner identities, or license texts; they evaluate only supplied record fields.

The candidate has no matcher metadata and makes no claim of mandatory applicability, semantic indexing, automatic wiring, trust enforcement, or promotion.

## Verification

The installed `agent` alias was not available in this workspace, so compilation and CLI examples used the repository's exact Node.js entry point. From the KB root:

```sh
node ../../../../src/cli.mjs sop compile --root candidates/data-release-governance-v1/sop --package data_release_governance.r01
node ../../../../src/cli.mjs sop compile --root candidates/data-release-governance-v1/sop --package data_release_governance.review
node ../../../../src/cli.mjs sop run --root candidates/data-release-governance-v1/sop --package data_release_governance.r01 --inputs '[{"containsPersonalData":true,"consentBasis":"documented"}]'
node candidates/data-release-governance-v1/tests/run-tests.mjs ../../../..
```

When the package binary is installed, the equivalent compile form is:

```sh
agent sop compile --root candidates/data-release-governance-v1/sop --package data_release_governance.review
```

Test vectors are in `tests/cases.json`. The runner requires an explicit repository root so it can import the reference runtime; it does not use environment-derived hidden state.

## Review requirements

Promotion requires review by the data-release policy owner, privacy/legal owners for R01, R06, R07, R08, and R10, security owners for R02, R05, and R09, records-management owners for R03 and R04, and a SOP runtime maintainer. Reviewers should resolve the ambiguities in `inventory.md`, confirm the exact fixture vocabulary and case sensitivity, and independently reproduce the test report.
