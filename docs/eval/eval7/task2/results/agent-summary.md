# Agent provenance journal

## Input coverage

- Processed the sole manifest entry, `input/brief.md` (618 bytes).
- Verified SHA-256 `a2ea388aaf57086011d3a43f32c43d5d7e939f24df98f52039f30ba906e40c87`
  against `.dynamic-circuits/input-manifest.json`.
- Encoded every labeled brief field. The semicolon-delimited evidence locations were preserved as an ordered three-item
  list, and the minute values were encoded as finite numbers.

## Generated and reused circuits

- Generated `task.brief` at `sop/task/brief.sop` with zero inputs and public `brief` and `source` outputs.
- Generated the fixed root `task.analysis` at `sop/task/analysis.sop` with zero inputs and public `markdown`,
  `verification`, and `source` outputs.
- Reused reviewed `kb.analysis`, which explicitly composes reviewed `kb.generator` and `kb.verifier`.
- The KB directory remained read-only; no candidates or learning reports were created.

## Compile and test attempts

- An initial compile invocation using `--prefix task` returned `UNKNOWN_PACKAGE` because the source files already reside
  under the `task/` package path. The corrected invocations omitted `--prefix`.
- Corrected compilation of `task.brief` and `task.analysis` exited 0. Both compiled graphs reported no dead nodes.
- Zero-input execution of `task.brief` and `task.analysis` exited 0 with runtime classification `SUCCEEDED`.
- An unexpected-input test of the no-input root exited 1 with `CIRCUIT_ARITY_MISMATCH`.
- A malformed-brief test of `kb.verifier` exited 2 with runtime classification `REFUSED` and code
  `brief_not_object`.
- An equal-deadline boundary test of `kb.generator` exited 2 with runtime classification `REFUSED` and code
  `deadline_order_invalid`.

## Assumptions and limitations

- `input/brief.md` is the only task-semantic source. The reviewed KB circuits are the only reusable semantic source.
- Package applicability was selected explicitly after interface and validation review; automatic semantic discovery or
  completeness is not claimed.
- Natural-language interpretation occurred during task-package authoring. The SOP runtime consumes the normalized values;
  it does not parse the Markdown brief.
- Commands were document-generation and verification runs only. No operational incident action was performed.
- This journal records provenance and execution classifications only. It does not restate or interpret runtime outputs;
  the executor-owned `results/runtime-result.md` will be authoritative after agent exit.

## Reusable discoveries

- The reviewed composition accepts a structured incident-handoff brief with roles, ordered deadlines, evidence locations,
  a channel, a prohibited action, and an approval role. No new reusable policy was identified for a KB candidate.
