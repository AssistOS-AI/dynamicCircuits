# Eval 10 / Task 2 expectation comparison

## Source-derived expectation

One raw order should create one normalization, one approval assessment, and one currency assessment. The RON currency is
supported. The amount is above the 10,000 threshold and approval is false, so the approval finding should be non-compliant.

## Observed executor result

`results/runtime-result.md` records `SUCCEEDED`, closure `CLOSED`, three expected and three executed instances, and zero
missing instances. Approval is false and currency is true in the actual applied outputs. The observed result matches the
expectation.
