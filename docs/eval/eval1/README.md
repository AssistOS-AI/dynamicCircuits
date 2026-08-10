# Eval 1: Notice-Period Rule with an Exception

## Evaluation target

This case evaluates whether a circuit can apply a legal-style minimum-period rule without losing an explicit exception. The source rule requires 30 calendar days by default and permits 10 days only when expedited treatment has written consent. Three cases exercise violation, exception, and ordinary compliance paths.

## Inputs and task

- `input/rule.md` is the normative prose rule.
- `input/policy.json` is the explicit structured interpretation used by the circuit.
- `input/cases.json` contains three review cases.
- `input/task.md` fixes the requested outputs and requires a classification for every case.

The coding-agent interpretation boundary is visible: the Markdown rule remains the source, while `policy.json` is the reviewable interpretation passed to the executable circuit.

## Circuits

`sop/policy.sop` implements rule application and produces per-case witnesses plus aggregate statistics. `sop/analysis.sop` composes the policy circuit, checks that all cases were classified, and exposes findings and statistics.

## Result

The deterministic run classified case A as a violation, case B as compliant through the written-consent exception, and case C as ordinarily compliant. All three inputs were classified, the goal passed, and the circuit outcome was `SUCCEEDED`. See `results/result.json` and `results/report.md`.

## Reproduction

```bash
node ../../../src/cli.mjs sop run \
  --root sop --prefix eval1 --package eval1.analysis \
  --inputs '["{\"minimumDays\":30,\"expeditedDays\":10,\"requiresWrittenConsent\":true}","[{\"id\":\"A\",\"noticeDays\":10,\"expedited\":false,\"writtenConsent\":false},{\"id\":\"B\",\"noticeDays\":10,\"expedited\":true,\"writtenConsent\":true},{\"id\":\"C\",\"noticeDays\":30,\"expedited\":false,\"writtenConsent\":false}]"]'
```

Complexity: four input artifacts, two SOP packages, two public outputs, one nested circuit call, one goal, three semantic branches, and a receipt tree covering both packages.
