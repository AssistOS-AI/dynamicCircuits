# Eval 1: Reusable Numeric Circuit

This case checks package loading from `kb/circuits/`, task-local composition, positional string parsing, nested execution, and a local invariant.

```bash
node ../../src/cli.mjs sop compile --kb-root ../../kb/circuits --root sop --prefix task --package task.analysis
node ../../src/cli.mjs sop run --kb-root ../../kb/circuits --root sop --prefix task --package task.analysis --inputs '["4","7"]'
```

The expected output is `11` with outcome `SUCCEEDED`.
