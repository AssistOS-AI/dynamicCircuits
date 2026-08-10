# Eval 2 expectation and comparison

## Source-derived expectation

The eight supplied values sum to 42, so the expected mean is 5.25. The universal claim is expected to be `REFUTED` because
the fourth observation is -2, the first source-ordered value that is not strictly positive. The positive mean must remain a
descriptive aggregate and must not override the grounded counterexample.

## Comparison with the observed runtime result

`task/results/runtime-result.md` returns mean 5.25, verdict `REFUTED`, witness `observation-4` with value -2, all eight
source-ordered observations, and a passing composition goal. The executor result matches the expectation exactly. No
expectation was changed after observing the run.

This file is evaluation material, not KB or task input. The coding agent is explicitly forbidden to read it during analysis.
