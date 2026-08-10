---
name: analyze-task
description: Analyze all files in a Dynamic Circuits workdir, reuse KB circuits, create task-local SOP Lang, execute relevant circuits, and produce grounded reports. Use when a prepared workspace contains input files that must be examined comprehensively.
---

# Analyze Task

## Workflow

1. Read `AGENTS.md` and `.dynamic-circuits/input-manifest.json`.
2. Account for every manifest entry. Record files that cannot be interpreted rather than silently skipping them.
3. Inspect the KB circuit directory named in `.dynamic-circuits/workspace.json`. Reuse a circuit only after checking its interface and semantics.
4. Create analysis-specific circuits only under `sop/`. Use `$author-sop-circuit` for syntax and execution rules.
5. Compile and run each circuit that supports a conclusion. Distinguish source creation, successful execution, refusal, rejection, and runtime error.
6. Write reports only under `results/`. Ground claims with input paths, source spans when practical, and circuit receipt data.
7. Finish `results/agent-summary.md` with input coverage, generated and reused circuits, execution outcomes, limitations, and candidate reusable knowledge.

Do not call an LLM API from generated code. The coding-agent process performs interpretation and authoring.
