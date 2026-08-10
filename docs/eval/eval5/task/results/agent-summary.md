# Agent Provenance Journal

## Input coverage

- Processed the sole manifest entry: `input/task.md`.
- Verified 6,570 bytes and SHA-256 `92565b8c65c071560b6be7bb3a5f5490e3d7bc690ea135d546cdc85eac4b216a` against `.dynamic-circuits/input-manifest.json`.
- Encoded all ten source records, their explicit values, and their source line locators.
- Read `AGENTS.md`; `.dynamic-circuits/AGENT_INSTRUCTIONS.md` was not present.

## Generated and reused circuits

- Generated `task.request` in `sop/task/request.sop` for the source-supported request and coverage contract.
- Generated `task.records` in `sop/task/records.sop` for the ten current records.
- Generated the no-input root `task.analysis` in `sop/task/analysis.sop`.
- Reused `kb.data_release_governance.review`, which invokes the reviewed `kb.data_release_governance.r01` through `kb.data_release_governance.r10` packages.
- Kept the KB read-only and did not duplicate its governance conditions in task-local code.

## Compile and test attempts

- The first compile attempt exposed invalid bare numeric call arguments in ten `get` calls; corrected them to SOP JSON string literals.
- The second compile attempt exposed assurance names without producer wires; bound each goal to its corresponding produced `assertInvariant` wire.
- Compiled `task.request`, `task.records`, and `task.analysis` successfully after those corrections.
- Executed both supporting task packages with no inputs and observed successful runtime and assurance receipts.
- Executed `task.analysis` with no inputs and verified its public-output shape, complete finding coverage, stable R01-through-R10 order, report sections, nested receipt topology, and passing root assurance.
- Exercised the no-input boundary with an unexpected argument and observed the expected `CIRCUIT_ARITY_MISMATCH` rejection.

## Assumptions and limitations

- Tabular values in `input/task.md` were treated as the canonical current facts; literal `missing` values were preserved rather than inferred or replaced.
- Natural-language record descriptions were retained through source locators but were not treated as additional policy fields.
- Runtime execution evaluates the authored canonical values and reviewed circuits; it does not parse unrestricted Markdown or verify external evidence.
- This journal is not a semantic result. The workspace executor will create `results/runtime-result.md` from the fixed root package after the coding-agent process exits.

## Reusable discoveries

- The reviewed one-record composer supports repeated task-local invocation while retaining independent, ordered rule findings.
- No new reusable policy circuit was needed; aggregation and human-readable rendering remain task-specific.
