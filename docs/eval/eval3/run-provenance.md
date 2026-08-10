# Eval 3 run provenance

## Recorded coding-agent processes

Both stages used Codex CLI 0.147.0 with reported model `gpt-5.6-sol`. Exit code 0 means the external process completed; it
does not replace circuit compilation or execution evidence.

| Stage | Repository-relative command | Started | Finished | Prompt SHA-256 | Exit |
| --- | --- | --- | --- | --- | --- |
| KB learning | `node src/cli.mjs -kbdir ./docs/eval/eval3/kb -agent codex` | `2026-08-10T13:11:10.108Z` | `2026-08-10T13:22:19.343Z` | `ac95b729c9ea2d5417b7f75ca804bcec36d1da275a494e5eb1076d8a438899eb` | 0 |
| Task analysis | `node src/cli.mjs -kbdir ./docs/eval/eval3/kb -workdir ./docs/eval/eval3/task -agent codex` | `2026-08-10T13:32:44.207Z` | `2026-08-10T13:37:20.985Z` | `258ba0c83108a4d86f3c6f25dcfc8fbdf3a04e0c6580fd7402ebb94656550328` | 0 |

The learning stage wrote only candidates and a learning summary; promotion was a separate review operation. The analysis
stage wrote task SOP and a non-authoritative provenance journal. It was explicitly forbidden to inspect expectations,
prior results, presentation pages, learning candidates, or sibling workspaces as semantic sources.

## Executor evidence

After the task agent exited, the CLI executed `task.analysis`. The committed authoritative report is
`task/results/runtime-result.md`; its receipt hash is `sha256:67c0cf1cd0630682d007dc14a0f87abc2ff7650db9f42aabe0f49c5d3f0eeffb`. The report was rendered from public outputs and receipt
fields by local runtime code. It was not generated or summarized by Codex.

Machine-local workspace manifests and `.dynamic-circuits/last-run.json` retain additional paths and timestamps during a live
run. This repository-facing record uses relative paths so it remains readable through the static documentation server.
