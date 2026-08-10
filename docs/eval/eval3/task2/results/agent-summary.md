# Agent provenance journal

## Input coverage

- Processed the sole manifest entry, `input/plan.md` (518 bytes; SHA-256 `6903e7339be4217975ca8d96b6d0fe6f2d525c89764bacc09e93bd07535def31`). The observed size and hash matched `.dynamic-circuits/input-manifest.json`.
- Read `AGENTS.md`. `.dynamic-circuits/AGENT_INSTRUCTIONS.md` was not present.
- No manifest entry was skipped or unsupported.

## Generated and reused circuits

- Generated `sop/task/release_plan.sop` as the no-input task evidence package. It exposes the normalized plan and separately exposed provenance, request, scope, and source-locator evidence.
- Generated `sop/task/analysis.sop` as the no-input root package. Its public outputs are `review` and `evidence`, and its grounding goal structurally covers both.
- Reused the read-only reviewed package `kb.release_plan_consistency.review` from the configured KB circuit directory. No KB files or candidates were written.

## Compile and test attempts

- The first supporting-package compile exposed a misplaced constructor declaration (`PARSE_ERROR`); the declaration was corrected locally.
- A supporting-package run without the configured KB root caused registry resolution to reject the root package's `kb.*` reference; all subsequent compile and run commands used the configured reviewed circuit root.
- Final compilation succeeded for `task.release_plan` and `task.analysis`.
- Final no-input execution succeeded for `task.release_plan` and `task.analysis`. The `analysisGrounded` goal passed. The final root package hash was `sha256:0804b4d2edf21b7e8ad7df7a810b052d732fd4c2857d118a3852e0a81bf69490`; the final observed root receipt hash was `sha256:320f85be66900181085049b4a2dd0cc330083df7bbe43faf5edafdf29b6f6d17`.
- A malformed root invocation with one unexpected input was rejected with `CIRCUIT_ARITY_MISMATCH`, confirming the required zero-input interface.

## Assumptions and limitations

- The two identical date strings were normalized to the same date key while retaining independent assertion identifiers and chapter locators.
- The two identical definition texts were normalized to the same meaning key while retaining independent chapter locators.
- Chapter completeness and absence of supersession were treated as direct facts from `input/plan.md:14`.
- Natural-language interpretation was performed by the coding agent and encoded as task-local canonical values; the SOP runtime did not parse unrestricted natural language.
- Testing was proportional to a fixed no-input task package: current evidence, package composition, grounding coverage, and rejection of unexpected external input were exercised. No alternate task evidence was introduced into the task-local source.

## Reusable discoveries

- The reviewed release-plan consistency circuit's existing interface accepted the task's independently identified chapter assertions and definitions without task-local duplication of its policy logic.
- No new reusable rule was identified for a separate KB candidate.
