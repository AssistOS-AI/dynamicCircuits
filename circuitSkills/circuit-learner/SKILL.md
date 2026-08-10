---
name: circuit-learner
description: Extract reusable rules, transformations, and checks from workspace documents into reviewable KB candidate circuits. Use during Dynamic Circuits learning runs when task-local findings may generalize beyond the current analysis.
---

# Circuit Learner

## Workflow

1. Separate source-specific facts from reusable semantics. Keep source-specific values in the task workspace.
2. Express a reusable rule only when its inputs, outputs, applicability, refusal conditions, assumptions, and provenance are explicit.
3. Place new material under the configured KB `candidates/` directory. Never overwrite or promote trusted `circuits/` content.
4. Create a focused candidate folder containing the `.sop` circuit, a concise contract, provenance back to input files, and executable tests or examples.
5. Use `$author-sop-circuit` and compile every candidate. Run representative positive, negative, and refusal cases.
6. Mark ambiguity and domain-policy choices as review requirements. A coding agent may propose a candidate but must not declare it trusted or mandatory.

Avoid copying large document passages into the KB. Preserve hashes, paths, and small source spans sufficient for review.
