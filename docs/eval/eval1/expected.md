# Eval 1 expectation and comparison

## Source-derived expectation

Before comparing executor output, the rule and case table imply: A uses the 30-day minimum and fails; B qualifies for the
10-day exception and passes; C uses the 30-day minimum and passes. Expected totals are three cases, two compliant, one
non-compliant, one exception use, and complete A/B/C coverage.

## Comparison with the observed runtime result

`task/results/runtime-result.md` matches every expected case classification, threshold, exception state, aggregate count,
and coverage condition. The root outcome is `SUCCEEDED`; both its consistency invariant and coverage goal passed. No
expectation was changed after observing the run.

This file is evaluation material, not KB or task input. The coding agent is explicitly forbidden to read it during analysis.
