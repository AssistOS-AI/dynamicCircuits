# Eval 9 / Task 3 expectation comparison

## Source-derived expectation

The four rows publish R04, R06, R09, and R10 facts. R04 and R09 should be non-compliant, while R06 and R10 should be
compliant. All four target executions should still succeed and closure should contain no missing obligation.

## Observed executor result

`results/runtime-result.md` records `SUCCEEDED`, closure `CLOSED`, four expected and four executed instances, and zero
missing instances. The actual outputs report false compliance for R04/R09 and true compliance for R06/R10. The observed
result matches the expectation.
