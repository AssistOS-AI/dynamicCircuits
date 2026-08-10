# Dynamic Circuits

Dynamic Circuits is a Node.js CLI that prepares document-analysis workspaces for coding agents and provides a reference implementation of the currently supported SOP Lang circuit subset. It uses an external coding-agent process—Codex by default—and contains no direct LLM API integration.

```bash
npm test
agent prepare -kbdir ./kb
agent -kbdir ./kb -agent codex --dry-run
agent prepare -kbdir ./kb -workdir ./work/task-001
agent -kbdir ./kb -workdir ./work/task-001 -agent codex --dry-run
node src/cli.mjs sop compile --kb-root ./docs/eval/eval1/kb/circuits --root ./docs/eval/eval1/task/sop --package task.analysis
node src/cli.mjs sop run --kb-root ./docs/eval/eval2/kb/circuits --root ./docs/eval/eval2/task/sop --package task.analysis
node src/cli.mjs sop run --kb-root ./docs/eval/eval4/kb/circuits --root ./docs/eval/eval4/task/sop --package task.analysis
node src/cli.mjs sop run --kb-root ./docs/eval/eval5/kb/circuits --root ./docs/eval/eval5/task/sop --package task.analysis
```

The package also installs `dc-agent` and `dynamic-circuits` aliases. During repository development, replace `agent`
with `node src/cli.mjs` when the package has not been linked or installed.

With only `-kbdir`, the CLI infers knowledge learning: documents go in `./kb/input`, trusted circuits stay in
`./kb/circuits`, proposals go to `./kb/candidates`, and reports go to `./kb/results`. Adding `-workdir` infers task analysis:
the workdir contains `input/`, `results/`, `sop/`, `.dynamic-circuits/`, a visible `circuitSkills` symbolic link, and
`.agents/skills` links for coding-agent discovery. Analysis treats the KB as read-only; learning never promotes candidates
into trusted circuits. During analysis the coding agent first generates SOP for the current request and facts, then a larger
root circuit that composes those packages with reviewed KB SOP. After the coding agent exits, the CLI executes the fixed
`task.analysis` entrypoint and writes `results/runtime-result.md` directly from public outputs and the receipt. Codex may
write a separate provenance journal, but it cannot author or reinterpret the official result. The CLI never creates a JSON
result artifact.

Analysis runs are incremental. If `results/runtime-result.md` is newer than task input, reviewed KB circuits, and generated
task SOP, the CLI skips both Codex and the executor. If only SOP is newer, it runs only the executor. Changed task input or
reviewed KB circuits trigger Codex plus execution. Deleting `runtime-result.md` explicitly forces the complete rerun.

The committed evaluation suite contains eight domain KBs and 24 independent task runs. Each eval page uses one shared file
manifest to keep KB source, reviewed KB SOP, each task's source, each task's generated SOP, executor output, expectation, and
provenance in separate menu groups.

See [the current capability dashboard](docs/index.html), [the architecture reference](docs/architecture.html),
[the KB/task directory convention](docs/workspace-conventions.html), [the manual CLI tutorial](docs/tutorial.html), [the evaluation
catalog](docs/eval/index.html), and [the current specification matrix](docs/specs/matrix.md). The Romanian
`sop_lang_circuits_design_specs_v1/` package is retained unchanged as the
historical first design version; [historical coverage](docs/specs/historical-coverage.md) maps every original DS into the
maintained documentation without overstating the implemented milestone.
