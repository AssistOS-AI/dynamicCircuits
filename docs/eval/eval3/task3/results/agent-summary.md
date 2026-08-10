# Agent provenance

## Input coverage

- Processed the sole manifest entry, `input/plan.md` (550 bytes).
- Verified SHA-256 `6dc2332a9869aa836e9c9d470581a50fde83ac615a487641a0f404505a1f7655` against `.dynamic-circuits/input-manifest.json`.
- Interpreted the Markdown input as supported text; no manifest entry was skipped or unsupported.
- Read workspace `AGENTS.md`; `.dynamic-circuits/AGENT_INSTRUCTIONS.md` was not present.

## Generated and reused circuits

- Generated `task.plan` at `sop/task/plan.sop` with no inputs and public `plan` and `sourceEvidence` outputs.
- Generated the fixed no-input root `task.analysis` at `sop/task/analysis.sop` with public `report` and `sourceEvidence` outputs.
- Reused the reviewed `kb.release_plan_consistency.review` package from the configured read-only KB circuits directory.
- Kept review policy in the KB package. The task package contains only normalized task facts, labels, and source locators.

## Compile and test attempts

- `task.plan` compiled successfully with package hash `sha256:f1aa69bd42e819a8305f179223ccea73fba626672b05747e4d8369efb5514eb7`.
- `task.analysis` compiled successfully with package hash `sha256:92bf8493c033d09e21976ed8f97e4be9e6a4644aede9ccc9ea732ba4df33811d`.
- Direct execution of `task.plan` succeeded.
- Direct execution of `task.analysis` with `[]` succeeded, exposed two public outputs, and passed its structural invariant. Receipt: `sha256:dea250d49b696fe6ee4a36c5ef9855f074369bada3611eb06e0a8bbfe1b8ca4e`.
- Exercised the reviewed package with the task-shaped explicit-supersession input, a distinct-unsuperseded-date fixture, an empty-plan boundary fixture, and malformed `null` input. The well-formed executions succeeded; malformed input was refused as expected by the package contract.
- Inspected root output hashes, invariant receipt, and nested receipts for both `task.plan` and `kb.release_plan_consistency.review`.

## Assumptions and limitations

- Used each source label verbatim as its chapter or assertion identifier.
- Used each ISO date string as both its displayed value and normalized comparison key.
- Assigned the same normalized meaning key to both `Node` definitions because their source text is identical.
- Source line locators are coding-agent-authored evidence metadata. The SOP runtime did not parse the Markdown input.
- The reviewed package owns a fixed policy-source locator in its report; task-specific locators are therefore exposed separately through `sourceEvidence`.
- The workspace executor remains responsible for the authoritative post-agent execution and `results/runtime-result.md`.

## Reusable discoveries

- The reviewed package interface is composable from a no-input task fact package when chapter, assertion, date-key, supersession, definition, and meaning-key fields are supplied explicitly.
- Keeping task evidence as a separate public output preserves current-input locators without changing or duplicating reviewed KB policy.
