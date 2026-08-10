# Eval 6 expectation and comparison

## Original source-derived expectation

The initial expectation was that the generator would preserve every brief field, produce the five required headings and four
paragraphs, place all motifs correctly, end on the closing image, remain within 90–220 words, and therefore receive
`verification.ok: true`.

## Observed runtime result

`task/results/runtime-result.md` shows that nine checks passed, including structure, verbatim fields, motif placement,
closing position, and approved fixed content. The independent verifier measured 226 words, failed only
`word-count-90-through-220`, and returned `ok: false`. The executor itself succeeded because semantic document invalidity is
published as data rather than hidden as a runtime error.

## Expectation correction

The verifier is correct and the original expectation was wrong. The generated text is six words over the explicit limit.
The evaluation target is therefore corrected to: successful circuit execution, generated Markdown retained, independent
verification false, exactly one missing requirement (`word-count:90..220`), and measured count 226. The generator requires a
future reviewed KB revision if this brief must pass; this eval does not edit the result or weaken the rule after execution.

This file is evaluation material, not KB or task input.
