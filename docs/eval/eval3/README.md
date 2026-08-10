# Eval 3: Cross-Document Timeline and Terminology Consistency

## Evaluation target

This case evaluates section-level interpretation and cross-document consistency. Three release-plan chapters contain two different launch dates and incompatible definitions of the term “Node.” The task requires both conflict families to be reported with source attribution.

## Inputs and task

- `input/review-rules.md` defines timeline and terminology obligations.
- `input/chapter-01.md`, `chapter-02.md`, and `chapter-03.md` are independently interpretable sections.
- `input/task.md` requires a consolidated report without silently selecting one version.

## Circuits

`sop/interpretation.sop` extracts launch dates and Node definitions from one section while preserving a source label. `sop/consistency.sop` compares three interpretations and reports distinct values and their sources. `sop/root.sop` composes three interpretation instances, performs cross-section analysis, and verifies that both expected conflict classes are present.

## Result

The run found launch dates `2026-06-15` and `2026-07-01`, plus two definitions of Node. Both timeline and terminology conflicts were reported and the completeness goal passed. See `results/result.json` and `results/report.md`.

## Reproduction

The automated case reads the three chapter files without lossy shell quoting and compares the public output with the
committed result summary:

```bash
node --test --test-name-pattern "eval3" ../../../tests/runtime/eval.test.mjs
```

Complexity: five input documents, three SOP packages, three repeated child instances with hygienic local wires, cross-document aggregation, two conflict classes, source attribution, and a root goal covering the final report.
