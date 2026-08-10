# Eval 2: Universal Scientific Claim and Counterexample

## Evaluation target

This case evaluates the distinction between a positive aggregate statistic and a universal claim. The mean of the supplied observations is positive, but one observation is negative. The rule document requires a single non-positive witness to refute the universal statement.

## Inputs and task

- `input/rule.md` defines refutation, malformed-data, and uncertainty behavior.
- `input/dataset.json` contains eight finite observations including `-2`.
- `input/claim.md` states both a mean claim and an incorrect universal claim.
- `input/task.md` asks for a grounded verdict and counterexample.

## Circuits

`sop/counterexample.sop` parses the dataset, computes the mean, searches every observation, and returns an explicit witness. `sop/analysis.sop` verifies that a refuted verdict contains a valid witness drawn from the dataset.

## Result

The run returned `REFUTED`, witness `-2`, positive mean `5.25`, and a passing grounding goal. The result demonstrates why average evidence cannot support a universal statement. See `results/result.json` and `results/report.md`.

## Reproduction

```bash
node ../../../src/cli.mjs sop run \
  --root sop --prefix eval2 --package eval2.analysis \
  --inputs '["[3,7,8,-2,5,6,9,6]"]'
```

Complexity: four input documents, two circuit packages, exhaustive scan of eight observations, three public outputs, one witness-grounding goal, and explicit refusal for invalid JSON or non-finite values.
