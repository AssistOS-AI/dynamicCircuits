# Dynamic Circuits

Dynamic Circuits is a Node.js CLI that prepares document-analysis workspaces for coding agents and provides a reference implementation of the currently supported SOP Lang circuit subset. It uses an external coding-agent process—Codex by default—and contains no direct LLM API integration.

```bash
npm test
agent prepare -kbdir ./kb
agent -kbdir ./kb -agent codex --dry-run
agent prepare -kbdir ./kb -workdir ./work/task-001
agent -kbdir ./kb -workdir ./work/task-001 -agent codex --dry-run
node src/cli.mjs sop compile --kb-root ./kb/circuits --root ./docs/eval/eval1/sop --prefix eval --package eval.analysis
node src/cli.mjs sop run --root ./docs/eval/eval2/sop --prefix eval2 --package eval2.analysis --inputs '["[3,7,8,-2,5,6,9,6]"]'
```

The package also installs `dc-agent` and `dynamic-circuits` aliases. During repository development, replace `agent`
with `node src/cli.mjs` when the package has not been linked or installed.

With only `-kbdir`, the CLI infers knowledge learning: documents go in `./kb/input`, trusted circuits stay in
`./kb/circuits`, proposals go to `./kb/candidates`, and reports go to `./kb/results`. Adding `-workdir` infers task analysis:
the workdir contains `input/`, `results/`, `sop/`, `.dynamic-circuits/`, a visible `circuitSkills` symbolic link, and
`.agents/skills` links for coding-agent discovery. Analysis treats the KB as read-only; learning never promotes candidates
into trusted circuits.

See [the HTML documentation](docs/index.html), [the evaluation catalog](docs/eval/index.html), and [the current specification
matrix](docs/specs/matrix.md). The Romanian `sop_lang_circuits_design_specs_v1/` package is retained unchanged as the
historical first design version; [historical coverage](docs/specs/historical-coverage.md) maps every original DS into the
maintained documentation without overstating the implemented milestone.
