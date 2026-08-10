# Candidate Execution Report

## Environment and commands

Execution date: 2026-08-10. The `agent` executable alias was not present, so the repository CLI entry point was invoked directly. This is the same `src/cli.mjs` declared as the `agent` package binary.

From the KB root, each package was compiled with this command shape:

```sh
node ../../../../src/cli.mjs sop compile --root candidates/data-release-governance-v1/sop --package data_release_governance.PACKAGE
```

`PACKAGE` was each of `r01`, `r02`, `r03`, `r04`, `r05`, `r06`, `r07`, `r08`, `r09`, `r10`, and `review`. All 11 compile invocations exited 0.

The complete test suite was run with:

```sh
node candidates/data-release-governance-v1/tests/run-tests.mjs ../../../..
```

## Compilation receipts

| Package | Compile result | Package hash |
|---|---|---|
| `data_release_governance.r01` | success | `sha256:cb3342cbbe8590bdbf0cb5241ca62a86c0bc09dac6b6d7cf3ab3289c86c642ca` |
| `data_release_governance.r02` | success | `sha256:f33e7591880defb46a9c7c88f7034b4c4428fc505be2ec0ea35bf218016c8163` |
| `data_release_governance.r03` | success | `sha256:000c08719c93c3f5201ae5dc854cea0d1bc4f210d0773cf5fe598532531248ad` |
| `data_release_governance.r04` | success | `sha256:f8f2c68583b83e09dc9d0f6e607bc7d367ebc1ab8154d899c8e3d9a7406cb509` |
| `data_release_governance.r05` | success | `sha256:643d4e475ee3add1e6528ceb77ac1193c2a03c07a6014297d201d35dc899b9b0` |
| `data_release_governance.r06` | success | `sha256:0ee40ecaef9f25fea1d634f768e08e5efcd42be560f564b2f5ef94a9ca42ddaa` |
| `data_release_governance.r07` | success | `sha256:4cd91558e3789362b5a1900576d2dc37c545288566c28554b5a2db3c523851ab` |
| `data_release_governance.r08` | success | `sha256:6c0bca9af9695993d2f8d76ae2e299453815353197f64950a00878b258883f5b` |
| `data_release_governance.r09` | success | `sha256:aa81f0c947c53ee34e2eb26fbfc548b57276d094455074e676a7b24c415bc084` |
| `data_release_governance.r10` | success | `sha256:a6a72fe828f9f91c108fd826ecfb8c085f9d1f3c2c04dd1ba8bbb02ea2619643` |
| `data_release_governance.review` | success | `sha256:c331c5dd94406fabfc26000df9d82d4dec9df79d8f5f8ca4af914c858fffa197` |

## Test outcomes

- Test vectors: 55
- Passed assertions: 55
- Failed assertions: 0
- Runtime outcomes: 47 `SUCCEEDED`, 8 `REFUSED`, 0 `REJECTED`, 0 `ERROR`
- Categories: 11 positive, 15 negative, 8 exception, 7 refusal, 6 boundary, 5 malformed-input, and 3 composition cases
- Every successful run exposed one public output hash and a receipt hash.
- Every refusal exposed no public output.
- Each successful review receipt contained ten successful child receipts, one for every focused rule package; each child receipt had its own receipt hash and one public output hash.

Representative composition evidence:

| Case | Semantic result | Public output hash | Receipt hash |
|---|---|---|---|
| All obligations pass | 10 PASS, 0 FAIL, compliant true | `sha256:74d759db6b2bedeaa290b662565e5b0e799f7246eb98bbc96b03ec8a1450b689` | `sha256:1798dc99daf1e4e67c49c1d2059138d711446c2298f8ce966f8f6a262124a9fe` |
| All obligations fail | 0 PASS, 10 FAIL, compliant false | `sha256:36f8d13c867e4706460a50506ac83ac4a30537114d41f06e46d2b32eda7620f3` | `sha256:9bb026cba9891a48515b150d2d01b9e44ca781fe4fa559fcdcd27da5f8f0867f` |
| All defined bypasses | 10 PASS, 0 FAIL, compliant true | `sha256:a06faa345cdcc139e596213540e1b094519eb5950595ad8c8fbf5f53f86868ac` | `sha256:3144ce3021a168a44878b8112c8cf0d64c3a4b9dc3056aef8bfb52f318bc1b42` |

The all-fail review returned identifiers R01 through R10 in source order, demonstrating that semantic failure does not short-circuit later obligations. Refusal cases remained distinct from PASS/FAIL verdicts. Compilation and these tests do not establish semantic trust or promote the candidate.
