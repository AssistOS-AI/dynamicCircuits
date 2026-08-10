# Agent provenance journal

## Input coverage

- Processed the sole manifest entry, `input/review.md` (536 bytes).
- Verified SHA-256 `8fbe04da7ec6dd66f7fae14a5b499a1fcdcf3b74f807dfc11efc96c137555cf6` against `.dynamic-circuits/input-manifest.json`.
- No unsupported manifest inputs were encountered. `.dynamic-circuits/AGENT_INSTRUCTIONS.md` was not present.

## Generated and reused circuits

- Generated `sop/task/review.sop` as the no-input task-evidence package, preserving the request, three control records, and their source locators.
- Generated `sop/task/analysis.sop` as the no-input root package. It consumes `task.review`, exposes normalized task values, and publishes the three applicable exact semantic keys.
- Inspected the reviewed KB evaluator `kb.mandatory_controls.evaluate` and all ten mandatory matcher packages `kb.matchers.r01` through `kb.matchers.r10`.
- Reused the applicable reviewed matchers through semantic publication and mandatory closure only; task-local SOP contains no direct `kb.*` calls.

## Compile and test attempts

- Compiled `task.review` with the workspace SOP root and reviewed KB root.
- Compiled `task.analysis` with the workspace SOP root and reviewed KB root.
- Executed `task.analysis` with its required empty input list and inspected the root receipt and mandatory-closure section.
- Repeated the execution through a focused assertion harness covering the exact matcher set, expected/executed instance-set equality, missing-instance accounting, mandatory target execution status, and the source-requested shape of the distinguished finding.

## Assumptions and limitations

- The manifest table values were treated as direct facts, while its prose requirements were preserved as task-request metadata rather than reimplemented as policy.
- The source-specific task packages are intentionally no-input and fixed to this manifest revision.
- Testing covered the declared task case. Altered or malformed control records were not substituted for the manifest evidence.

## Reusable discoveries

- A compact pattern for this reviewed KB family is to keep control records in a task-evidence package, extract them in the root, and publish each record under the matcher's exact key with the record locator as provenance.
- Exact-key mandatory binders allow the root to remain free of direct policy calls while closure receipts account for discovered and executed instances.
