# Dynamic Circuits

Dynamic Circuits is a Node.js CLI that prepares document-analysis workspaces for coding agents and provides a reference implementation of the currently supported SOP Lang circuit subset. It uses an external coding-agent process—Codex by default—and contains no direct LLM API integration.

```bash
npm test
agent prepare -kbdir ./kb -workdir ./work/task-001
agent -kbdir ./kb -workdir ./work/task-001 -agent codex --dry-run
node src/cli.mjs sop compile --kb-root ./kb/circuits --root ./docs/eval/eval1/sop --prefix eval --package eval.analysis
node src/cli.mjs sop run --kb-root ./kb/circuits --root ./docs/eval/eval1/sop --prefix eval --package eval.analysis --inputs '["4","7"]'
```

The package also installs `dc-agent` and `dynamic-circuits` aliases. During repository development, replace `agent`
with `node src/cli.mjs` when the package has not been linked or installed.

A prepared workdir contains `input/`, `results/`, `sop/`, `.dynamic-circuits/`, a visible `circuitSkills` symbolic link, and `.agents/skills` links for coding-agent discovery. Normal analysis treats the KB as read-only. `--learn` permits Codex to write reviewable material under `KB/candidates/`; it does not authorize promotion into trusted `KB/circuits/`.

See [the HTML documentation](docs/index.html) and [the current specification matrix](docs/specs/matrix.md). The Romanian `sop_lang_circuits_design_specs_v1/` package is retained unchanged as the historical first design version; it does not overstate the implemented milestone.
