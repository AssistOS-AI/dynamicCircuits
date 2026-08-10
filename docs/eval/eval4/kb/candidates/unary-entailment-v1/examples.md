# Examples

## Multi-step support

A positive fact `A is p`, plus `p -> q` and `q -> r`, supports the positive query `A is r`. The query support is `DERIVED`, minimum depth is 2, and evidence retains the locator of `q -> r`; the closure also retains the earlier fact and rule locator.

## Explicit contradiction

A negative fact `A is not p` contradicts the positive query `A is p`. A context without either polarity returns `UNKNOWN`; it does not infer the negative fact.

## Conflict

Direct positive support and derived negative support for the same predicate return `CONFLICT`. Both support records are retained rather than selecting one.

## Cycle and refusal

Rules `p -> q` and `q -> p` terminate after the finite set is reached. A rule with two antecedents or a binary relation is outside the declared schema and is refused, not partially evaluated.
