# Eval 9 / Task 1 expectation comparison

## Source-derived expectation

The four input rows publish `control.r01`, `control.r03`, `control.r07`, and `control.r10`. The ten-matcher registry should
therefore create exactly four instances. A-03 should be non-compliant because `required: true` differs from `observed:
false`; A-01, A-07, and A-10 should be compliant. The other six matchers should create no instance.

## Observed executor result

`task/results/runtime-result.md` records `SUCCEEDED`, closure `CLOSED`, ten registered matchers, four indexed publications,
four expected instances, four executed instances, and zero missing instances. Its automatically applied outputs contain the
four expected case IDs and only A-03 has `compliant: false`. The observed result matches the expectation.
