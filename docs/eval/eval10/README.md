# Eval 10: Multi-round mandatory closure

## Purpose

This evaluation checks that a mandatory result can publish a new semantic fact and thereby activate every dependent rule in
a later round. It uses three reviewed matchers: raw-order normalization, normalized-order approval, and normalized-order
currency assessment.

## Inputs and circuit roles

`kb/input/order-closure.md` states the reusable obligations. The three target circuits live under `kb/circuits/order/`; the
three small mandatory matchers live separately under `kb/circuits/matchers/`. Every task has one human-readable
`input/orders.md`. A real Codex run generated `orders.sop` and `analysis.sop`, publishing only `order.raw`. It did not copy or
call the KB target logic.

## Three evaluated runs

| Workspace | Raw orders | Expected/executed | Non-compliant findings | Runtime result |
| --- | ---: | ---: | --- | --- |
| `task/` | 2 | 6 / 6 | none | `SUCCEEDED`, `CLOSED` |
| `task2/` | 1 | 3 / 3 | OB-1 approval | `SUCCEEDED`, `CLOSED` |
| `task3/` | 2 | 6 / 6 | OC-1 currency; OC-2 approval | `SUCCEEDED`, `CLOSED` |

Every run has three recorded closure rounds: normalization produces new facts, approval/currency consume them, and a final
settling round proves that no new publication or instance remains. All missing-instance counts are zero.

## Reproduction

Delete the selected executor report to force both stages, then run from the repository root:

```text
node src/cli.mjs -kbdir ./docs/eval/eval10/kb -workdir ./docs/eval/eval10/task -agent codex
```

Use `task2` or `task3` for the other inputs. The deterministic regression is
`node --test tests/runtime/eval.test.mjs tests/runtime/mandatory-closure.test.mjs`.

## Limits

This fixture covers additive facts, exact trigger keys, one-value bindings, branching, duplicate suppression, and bounded
closure. It does not cover retraction, negation, persistence, registry version solving, profile selection, or trust
certification.
