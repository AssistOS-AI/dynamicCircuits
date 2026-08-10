# Eval 4 expectation and comparison

## Source-derived expectation

The context directly supports `man(Socrate)`. The unary rule derives `mortal(Socrate)`. It contains neither
`philosopher(Socrate)` nor its negation, so the open-world result must be `UNKNOWN`. Evidence should distinguish direct and
derived support and retain the rule locator.

## Comparison with the observed runtime result

`task/results/runtime-result.md` returns `SUPPORTED` with direct evidence for man, `SUPPORTED` with depth-one derived
evidence for mortal, and `UNKNOWN` for philosopher. All three calls succeeded and the root completeness goal passed. The
executor result matches the expectation exactly. No expectation was changed after observing the run.

This file is evaluation material, not KB or task input.
