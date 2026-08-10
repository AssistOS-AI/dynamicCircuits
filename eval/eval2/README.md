# Eval 2: Conflicting Document Claims

This coding-agent case asks the analyzer to cover both input files, identify the disagreement about the review period, create task-local SOP Lang under `sop/`, execute relevant circuits, and report grounded findings under `results/`.

Prepare or dry-run the case with:

```bash
node ../../src/cli.mjs prepare --kbdir ../../kb --workdir .
node ../../src/cli.mjs run --kbdir ../../kb --workdir . --agent codex --dry-run
```

The committed `results/` directory is intentionally empty until an agent evaluation runs.
