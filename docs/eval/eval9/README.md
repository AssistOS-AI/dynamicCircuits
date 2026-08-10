# Eval 9: Mandatory registry coverage

## Purpose

This evaluation checks whether task execution depends on the registry rather than on a coding agent remembering direct KB
calls. The KB has ten reviewed mandatory matcher packages and one generic control evaluator. Each of three independent task
workspaces publishes a different subset of control facts.

## Inputs and executable knowledge

`kb/input/mandatory-controls.md` is the single human-readable reusable source. `kb/circuits/matchers/r01.sop` through
`r10.sop` are reviewed applicability circuits; `kb/circuits/mandatory_controls/evaluate.sop` is their common apply target.
Each task contains one `input/review.md`. Real Codex runs generated `review.sop` plus the no-input `analysis.sop`; the latter
publishes facts and contains no direct call to the common evaluator.

## Three evaluated runs

| Workspace | Published controls | Expected/executed | Domain findings | Runtime result |
| --- | --- | ---: | --- | --- |
| `task/` | R01, R03, R07, R10 | 4 / 4 | A-03 non-compliant | `SUCCEEDED`, `CLOSED` |
| `task2/` | R02, R05, R08 | 3 / 3 | B-02 non-compliant | `SUCCEEDED`, `CLOSED` |
| `task3/` | R04, R06, R09, R10 | 4 / 4 | C-04 and C-09 non-compliant | `SUCCEEDED`, `CLOSED` |

All runs record zero missing instances. Non-compliance is data returned by a successfully executed policy circuit; it does
not mean the circuit refused or the closure failed.

## Reproduction

From the repository root, delete a task's `results/runtime-result.md` to force its real Codex and executor stages, then run:

```text
node src/cli.mjs -kbdir ./docs/eval/eval9/kb -workdir ./docs/eval/eval9/task -agent codex
```

Replace `task` with `task2` or `task3` for the other runs. `node --test tests/runtime/eval.test.mjs` deterministically reruns
all generated circuits and checks case IDs plus closure counts.

## Limits

This evaluation proves exhaustive bindings relative to the ten compiled matchers and explicit publications. It does not
prove that a missing real-world policy has a matcher, that unrestricted prose was interpreted completely, or that a trust
profile approves the registry.
