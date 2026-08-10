# Eval 7 run provenance

## Recorded coding-agent processes

Both stages used Codex CLI 0.147.0 with reported model `gpt-5.6-sol`. Exit code 0 means the external process completed; it
does not replace circuit compilation or execution evidence.

| Stage | Repository-relative command | Started | Finished | Prompt SHA-256 | Exit |
| --- | --- | --- | --- | --- | --- |
| KB learning | `node src/cli.mjs -kbdir ./docs/eval/eval7/kb -agent codex` | `2026-08-10T13:32:22.436Z` | `2026-08-10T13:40:17.192Z` | `d78441951fac299a38ca402bf76ecc59c045d3e3b9a0b7fcb6fe00b7966fe988` | 0 |
| Task analysis | `node src/cli.mjs -kbdir ./docs/eval/eval7/kb -workdir ./docs/eval/eval7/task -agent codex` | `2026-08-10T13:41:18.280Z` | `2026-08-10T13:46:36.365Z` | `3cbf6982c1cfb990b74ccb1f20fed05a6c6ac3ea355987d338434b12b0a91d65` | 0 |

The learning stage wrote only candidates and a learning summary; promotion was a separate review operation. The analysis
stage wrote task SOP and a non-authoritative provenance journal. It was explicitly forbidden to inspect expectations,
prior results, presentation pages, learning candidates, or sibling workspaces as semantic sources.

## Executor evidence

After the task agent exited, the CLI executed `task.analysis`. The committed authoritative report is
`task/results/runtime-result.md`; its receipt hash is `sha256:beafba7833f44028b3e5b2038f10f8fb9e52370af75137753448b36279ecb363`. The report was rendered from public outputs and receipt
fields by local runtime code. It was not generated or summarized by Codex.

Machine-local workspace manifests and `.dynamic-circuits/last-run.json` retain additional paths and timestamps during a live
run. This repository-facing record uses relative paths so it remains readable through the static documentation server.
