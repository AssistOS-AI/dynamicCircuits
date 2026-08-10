# Eval 10 run provenance

All three task workspaces were executed through the public CLI with `-agent codex` on 2026-08-10. The three Codex processes
ran independently and generated task SOP. After each agent exited, the CLI executor produced its runtime report from circuit
outputs and closure receipts.

| Workspace | Codex UTC interval | Agent exit | Package hash | Executor receipt |
| --- | --- | ---: | --- | --- |
| `task` | 15:11:20–15:14:51 | 0 | `sha256:3a62163cfb69cd80e7655f4b97b21f476523af32330a593693a9066c926735e8` | `sha256:f093b9305878b2eec15cf7736b4f928647f4c96a8c4fe1771e8e4283af3e0d22` |
| `task2` | 15:11:20–15:14:00 | 0 | `sha256:b6c85c81c07afb5a9a11f025b1151080e290cba6f117f71c58ad97b73e18e5ec` | `sha256:bd9a729ff53ce73a15e19cd54f4f64f7cce55847b6f92f92b07f4891cfc903d2` |
| `task3` | 15:11:20–15:14:40 | 0 | `sha256:840445949b238a6bc448bc25bb07dac715945da8c8b773b3d404c0095dc33847` | `sha256:ae75ed2864459af0dbbe684066c9e70acf528cc48fadba989c8fcf3a00eca925` |

The machine-readable invocation metadata remains in each task's `.dynamic-circuits/last-run.json`. It is provenance, not
semantic input.
