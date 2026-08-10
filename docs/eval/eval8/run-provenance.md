# Eval 8 run provenance

## Recorded coding-agent processes

Both stages used Codex CLI 0.147.0 with reported model `gpt-5.6-sol`. Exit code 0 means the external process completed; it
does not replace circuit compilation or execution evidence.

| Stage | Repository-relative command | Started | Finished | Prompt SHA-256 | Exit |
| --- | --- | --- | --- | --- | --- |
| KB learning | `node src/cli.mjs -kbdir ./docs/eval/eval8/kb -agent codex` | `2026-08-10T13:32:22.440Z` | `2026-08-10T13:44:04.654Z` | `d78441951fac299a38ca402bf76ecc59c045d3e3b9a0b7fcb6fe00b7966fe988` | 0 |
| Task analysis | `node src/cli.mjs -kbdir ./docs/eval/eval8/kb -workdir ./docs/eval/eval8/task -agent codex` | `2026-08-10T13:45:00.746Z` | `2026-08-10T13:50:05.005Z` | `91c2f2030daff49f271e1185f25f362fd01451b835b62c258ad4d5d527c434aa` | 0 |

The learning stage wrote only candidates and a learning summary; promotion was a separate review operation. The analysis
stage wrote task SOP and a non-authoritative provenance journal. It was explicitly forbidden to inspect expectations,
prior results, presentation pages, learning candidates, or sibling workspaces as semantic sources.

## Executor evidence

After the task agent exited, the CLI executed `task.analysis`. The committed authoritative report is
`task/results/runtime-result.md`; its receipt hash is `sha256:604118e1b540a91048529e1b6bd45cb0307702591d341530fd6714e55bd3cd42`. The report was rendered from public outputs and receipt
fields by local runtime code. It was not generated or summarized by Codex.

Machine-local workspace manifests and `.dynamic-circuits/last-run.json` retain additional paths and timestamps during a live
run. This repository-facing record uses relative paths so it remains readable through the static documentation server.

## Additional real task runs

| Run | Codex interval (UTC) | Agent exit | Executor outcome | Receipt |
| --- | --- | --- | --- | --- |
| `task2` | `14:04:16–14:09:37` | 0 | `SUCCEEDED` | `sha256:e6bea23c…d4e8` |
| `task3` | `14:09:57–14:13:18` | 0 | `SUCCEEDED` | `sha256:33da71a3…8a3d9` |

Commands used `-kbdir ./docs/eval/eval8/kb -workdir ./docs/eval/eval8/taskN -agent codex`. Full notices and independent
verification are executor public outputs; agent summaries record only authoring provenance.
