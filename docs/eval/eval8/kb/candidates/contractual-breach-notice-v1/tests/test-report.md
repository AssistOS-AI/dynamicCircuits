# Test execution report

## Commands

The `agent` alias was not installed on `PATH`; the repository CLI entry point declared for that alias was invoked
directly. Commands were run from the KB root:

```sh
node /home/salboaie/work/dynamicCircuits/src/cli.mjs sop compile --root candidates/contractual-breach-notice-v1/sop --package breach_notice.brief
node /home/salboaie/work/dynamicCircuits/src/cli.mjs sop compile --root candidates/contractual-breach-notice-v1/sop --package breach_notice.verify
node /home/salboaie/work/dynamicCircuits/src/cli.mjs sop compile --root candidates/contractual-breach-notice-v1/sop --package breach_notice.generate
node candidates/contractual-breach-notice-v1/tests/run-cases.mjs /home/salboaie/work/dynamicCircuits/src/cli.mjs
```

A direct `sop run` of `breach_notice.generate` was also executed with the standard synthetic brief encoded as the sole
item in `--inputs`. It returned `SUCCEEDED`, both public outputs, nested successful receipts, and a passing composed goal.

## Compilation

- `breach_notice.brief`: compiled, `sha256:d80449a48b45b767124590f7178c019d6dae00e944db5533bfe4eb1eb40fdb51`
- `breach_notice.verify`: compiled, `sha256:ae0df9e8407b1875c1e09ca62e489b81590a6d0dbb99e52962edd46ae867f1a8`
- `breach_notice.generate`: compiled, `sha256:fc454c6a272b9190b20bf68eb0b6e5760e97a2df2dacf3a6656fd1b12ff8a43e`

Compilation proves mechanical validity only.

## Results

All 13 asserted cases passed; no unexpected runtime error occurred.

| Case | Category | Runtime outcome | Semantic result | Receipt hash suffix |
|---|---|---|---|---|
| positive standard generation | positive | `SUCCEEDED` | `ok: true` | `...40289` |
| independent verification | positive | `SUCCEEDED` | `ok: true` | `...34666d` |
| missing factual label | negative | `SUCCEEDED` | `ok: false` | `...532a3` |
| unsupported additions | negative | `SUCCEEDED` | `ok: false` | `...7cbc8` |
| changed deadline | negative | `SUCCEEDED` | `ok: false` | `...54d01` |
| reordered exhibits | negative | `SUCCEEDED` | `ok: false` | `...40359` |
| one-character values | boundary | `SUCCEEDED` | `ok: true` | `...c0100` |
| brief-supplied exception terms | exception | `SUCCEEDED` | `ok: true` | `...1661f` |
| missing required field | malformed/refusal | `REFUSED` | `INVALID_BRIEF` | `...bc5c2` |
| empty exhibit list | malformed/refusal | `REFUSED` | `INVALID_BRIEF` | `...c317a` |
| non-string notice | malformed/refusal | `REFUSED` | `INVALID_NOTICE_TYPE` | `...3012` |
| heading injection | exception/rejection | `REJECTED` | goal false | `...c962` |
| overlapping party names | boundary/rejection | `REJECTED` | goal false | `...ba5a` |

The standard generated notice output hash is
`sha256:b7edf33668dcf077e7340562fc00950bc9179f74aedf21919db69c8a11b2766b`; its report output hash is
`sha256:d388a3665044e1129aefbaef71b44ff1c962c46b93645ed39126a0699265ee00`; the public receipt hash is
`sha256:788742e5e1095ca430687607871b02f4f4e447c7398190ad60660eec1bc40289`.

The first attempted execution correctly exposed a cross-canonicalization identity comparison in the brief assurance.
That assurance was changed to structural JSON equality, after which all packages were recompiled and all 13 cases passed.
