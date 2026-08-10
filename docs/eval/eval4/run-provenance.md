# Eval 4 run provenance

## Recorded coding-agent processes

Both stages used Codex CLI 0.147.0 with reported model `gpt-5.6-sol`. Exit code 0 means the external process completed; it
does not replace circuit compilation or execution evidence.

| Stage | Repository-relative command | Started | Finished | Prompt SHA-256 | Exit |
| --- | --- | --- | --- | --- | --- |
| KB learning | `node src/cli.mjs -kbdir ./docs/eval/eval4/kb -agent codex` | `2026-08-10T13:30:29.526Z` | `2026-08-10T13:38:08.105Z` | `d78441951fac299a38ca402bf76ecc59c045d3e3b9a0b7fcb6fe00b7966fe988` | 0 |
| Task analysis | `node src/cli.mjs -kbdir ./docs/eval/eval4/kb -workdir ./docs/eval/eval4/task -agent codex` | `2026-08-10T13:38:49.043Z` | `2026-08-10T13:44:02.836Z` | `8df55aadac0edb2883d4db55d917b84a26ec347d97ec91997699212ce5bcdbe3` | 0 |

The learning stage wrote only candidates and a learning summary; promotion was a separate review operation. The analysis
stage wrote task SOP and a non-authoritative provenance journal. It was explicitly forbidden to inspect expectations,
prior results, presentation pages, learning candidates, or sibling workspaces as semantic sources.

## Executor evidence

After the task agent exited, the CLI executed `task.analysis`. The committed authoritative report is
`task/results/runtime-result.md`; its receipt hash is `sha256:96f48c7558accab64a0767e15a1f831edbada40d0b5ee52caeaf78fb469a5ebd`. The report was rendered from public outputs and receipt
fields by local runtime code. It was not generated or summarized by Codex.

Machine-local workspace manifests and `.dynamic-circuits/last-run.json` retain additional paths and timestamps during a live
run. This repository-facing record uses relative paths so it remains readable through the static documentation server.

## Additional real task runs

| Run | Codex interval (UTC) | Agent exit | Executor outcome | Receipt |
| --- | --- | --- | --- | --- |
| `task2` | `13:59:51–14:03:49` | 0 | `SUCCEEDED` | `sha256:3e0ea545…bb0b` |
| `task3` | `14:04:16–14:09:46` | 0 | `SUCCEEDED` | `sha256:c3bd01d3…aa3b` |

Commands used `-kbdir ./docs/eval/eval4/kb -workdir ./docs/eval/eval4/taskN -agent codex`. Each run normalized only its
own English context before executor evaluation.
