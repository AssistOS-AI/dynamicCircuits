# Eval 10 / Task 1 expectation comparison

## Source-derived expectation

Two `order.raw` publications should create two normalization instances. Their two `order.normalized` publications should
then create two approval plus two currency instances. Closure should therefore execute six instances over two productive
rounds, followed by a settling round. Both orders should pass both assessments.

## Observed executor result

`task/results/runtime-result.md` records `SUCCEEDED`, closure `CLOSED`, three closure rounds, six expected and six executed
instances, and zero missing instances. It contains two successful normalizations and four compliant assessment outputs. The
observed result matches the expectation.
