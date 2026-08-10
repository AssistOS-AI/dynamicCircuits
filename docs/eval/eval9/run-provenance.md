# Eval 9 run provenance

All three task workspaces were executed through the public CLI with `-agent codex` on 2026-08-10. Codex ran with each task as
its working directory, authored task SOP and a provenance journal, then exited. The CLI separately executed
`task.analysis` and wrote the authoritative report.

| Workspace | Codex UTC interval | Agent exit | Package hash | Executor receipt |
| --- | --- | ---: | --- | --- |
| `task` | 15:04:05–15:07:35 | 0 | `sha256:5b2daeaa1dcb2c1bc5d421dbabeb4b65df73aa6510e679a884f2ddf3543803f7` | `sha256:e348d1dee092a8e3b627336bd3bfc1be960a673733d27453d0de237a40613187` |
| `task2` | 15:08:01–15:11:06 | 0 | `sha256:2bb224a64ced62c216b9d63df75fea7d9c387e3d008bee36749bc421ecabdd8d` | `sha256:0af351286e7f116341223fc3ec3961388cd61af5a88061c0b578f2f02eda4091` |
| `task3` | 15:08:01–15:10:57 | 0 | `sha256:50c1d4d63852ea8347148c1d9030e05ee235b919a97107340c6daa88e45fb248` | `sha256:b41eabf88b0f9f01e3b8271f6e82da27242db5eb994f33d4632156f96e6ef821` |

The machine-readable invocation metadata remains in each task's `.dynamic-circuits/last-run.json`. It is provenance, not
semantic input.
