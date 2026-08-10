# Eval 2 run provenance

## Recorded coding-agent processes

Both stages used Codex CLI 0.147.0 with reported model `gpt-5.6-sol`. Exit code 0 means the external process completed; it
does not replace circuit compilation or execution evidence.

| Stage | Repository-relative command | Started | Finished | Prompt SHA-256 | Exit |
| --- | --- | --- | --- | --- | --- |
| KB learning | `node src/cli.mjs -kbdir ./docs/eval/eval2/kb -agent codex` | `2026-08-10T13:11:10.103Z` | `2026-08-10T13:22:57.140Z` | `ac95b729c9ea2d5417b7f75ca804bcec36d1da275a494e5eb1076d8a438899eb` | 0 |
| Task analysis | `node src/cli.mjs -kbdir ./docs/eval/eval2/kb -workdir ./docs/eval/eval2/task -agent codex` | `2026-08-10T13:32:44.202Z` | `2026-08-10T13:38:08.567Z` | `31be078fff9784314973d4aabcc5bef2d79b8f12d63816d63cfc26a3edf13f58` | 0 |

The learning stage wrote only candidates and a learning summary; promotion was a separate review operation. The analysis
stage wrote task SOP and a non-authoritative provenance journal. It was explicitly forbidden to inspect expectations,
prior results, presentation pages, learning candidates, or sibling workspaces as semantic sources.

## Executor evidence

After the task agent exited, the CLI executed `task.analysis`. The committed authoritative report is
`task/results/runtime-result.md`; its receipt hash is `sha256:18f78c3776bcb7ade0e271c6171daddf334bb47cf2aabd451855262832ac181f`. The report was rendered from public outputs and receipt
fields by local runtime code. It was not generated or summarized by Codex.

Machine-local workspace manifests and `.dynamic-circuits/last-run.json` retain additional paths and timestamps during a live
run. This repository-facing record uses relative paths so it remains readable through the static documentation server.
