# Eval 1: Notice-Period Rule with an Exception

## Evaluation target

This case evaluates whether a circuit can apply a legal-style minimum-period rule without losing an explicit exception. The source rule requires 30 calendar days by default and permits 10 days only when expedited treatment has written consent. Three cases exercise violation, exception, and ordinary compliance paths.

## Inputs and task

- `input/rule.md` is the normative prose rule.
- `input/cases.md` is the human-readable table of three review cases.
- `input/task.md` fixes the requested outputs and requires a classification for every case.

All coding-agent inputs are text documents. The generated SOP files are the reviewable executable interpretation: the rule
is implemented in `policy.sop`, and each row from `cases.md` becomes an explicit task-local circuit call in `analysis.sop`.

## Circuits

`sop/policy.sop` implements the reusable rule for one case through scalar inputs. `sop/analysis.sop` encodes the three
interpreted cases, calls the policy circuit once per case, aggregates findings, computes statistics, and verifies coverage.

## Result

The deterministic run classified case A as a violation, case B as compliant through the written-consent exception, and case C as ordinarily compliant. All three inputs were classified, the goal passed, and the circuit outcome was `SUCCEEDED`. See `results/result.json` and `results/report.md`.

## Reproduction

```bash
node ../../../src/cli.mjs sop run \
  --root sop --prefix eval1 --package eval1.analysis
```

Complexity: three source documents, two SOP packages, three nested policy instances, two public outputs, one coverage goal,
three semantic paths, and a receipt tree covering the root and all child instances.
