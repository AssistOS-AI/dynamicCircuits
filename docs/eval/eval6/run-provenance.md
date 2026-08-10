# Eval 6 run provenance

## Recorded coding-agent processes

Both stages used Codex CLI 0.147.0 with reported model `gpt-5.6-sol`. Exit code 0 means the external process completed; it
does not replace circuit compilation or execution evidence.

| Stage | Repository-relative command | Started | Finished | Prompt SHA-256 | Exit |
| --- | --- | --- | --- | --- | --- |
| KB learning | `node src/cli.mjs -kbdir ./docs/eval/eval6/kb -agent codex` | `2026-08-10T13:32:22.433Z` | `2026-08-10T13:44:19.382Z` | `d78441951fac299a38ca402bf76ecc59c045d3e3b9a0b7fcb6fe00b7966fe988` | 0 |
| Task analysis | `node src/cli.mjs -kbdir ./docs/eval/eval6/kb -workdir ./docs/eval/eval6/task -agent codex` | `2026-08-10T13:45:28.829Z` | `2026-08-10T13:49:16.070Z` | `2016d366e1a2e5aeecd572479c4a7f7f70f1a2dc90eddf36b945495cf88c1c43` | 0 |

The learning stage wrote only candidates and a learning summary; promotion was a separate review operation. The analysis
stage wrote task SOP and a non-authoritative provenance journal. It was explicitly forbidden to inspect expectations,
prior results, presentation pages, learning candidates, or sibling workspaces as semantic sources.

## Executor evidence

After the task agent exited, the CLI executed `task.analysis`. The committed authoritative report is
`task/results/runtime-result.md`; its receipt hash is `sha256:6e80ec89a9db811440e97a9bce50c0452f965743072de4486ac7a163cbb4cb38`. The report was rendered from public outputs and receipt
fields by local runtime code. It was not generated or summarized by Codex.

Machine-local workspace manifests and `.dynamic-circuits/last-run.json` retain additional paths and timestamps during a live
run. This repository-facing record uses relative paths so it remains readable through the static documentation server.
