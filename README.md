# Dynamic Circuits

Dynamic Circuits is a Node.js CLI that prepares document-analysis workspaces for coding agents and provides a reference implementation of the currently supported SOP Lang circuit subset. It uses an external coding-agent process—Codex by default—and contains no direct LLM API integration.

```bash
npm test
node src/cli.mjs prepare -kbdir ./kb -workdir /tmp/dynamic-task
node src/cli.mjs -kbdir ./kb -workdir /tmp/dynamic-task -agent codex --dry-run
node src/cli.mjs sop compile --root ./eval/eval1/sop --prefix eval --package eval.analysis
node src/cli.mjs sop run --root ./eval/eval1/sop --prefix eval --package eval.analysis --inputs '["4","7"]'
```

A prepared workdir contains `input/`, `results/`, `sop/`, `.dynamic-circuits/`, and a `circuitSkills` symbolic link. Normal analysis treats the KB as read-only. `--learn` permits Codex to write reviewable material under `KB/candidates/`; it does not authorize promotion into trusted `KB/circuits/`.

See [the HTML documentation](docs/index.html) and [the current specification matrix](docs/specs/matrix.md). The Romanian `sop_lang_circuits_design_specs_v1/` package is retained unchanged as the historical first design version; it does not overstate the implemented milestone.
