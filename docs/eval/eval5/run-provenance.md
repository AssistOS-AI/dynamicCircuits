# Eval 5 run provenance

## Recorded coding-agent processes

Both stages used Codex CLI 0.147.0 with reported model `gpt-5.6-sol`. Exit code 0 means the external process completed; it
does not replace circuit compilation or execution evidence.

| Stage | Repository-relative command | Started | Finished | Prompt SHA-256 | Exit |
| --- | --- | --- | --- | --- | --- |
| KB learning | `node src/cli.mjs -kbdir ./docs/eval/eval5/kb -agent codex` | `2026-08-10T12:31:55.825Z` | `2026-08-10T12:45:40.688Z` | `ac95b729c9ea2d5417b7f75ca804bcec36d1da275a494e5eb1076d8a438899eb` | 0 |
| Task analysis | `node src/cli.mjs -kbdir ./docs/eval/eval5/kb -workdir ./docs/eval/eval5/task -agent codex` | `2026-08-10T13:39:07.688Z` | `2026-08-10T13:44:46.538Z` | `fc8f9616abc81ff76902c07590b49b3e06ab052c6156acc98f317201e8ad2440` | 0 |

The learning stage wrote only candidates and a learning summary; promotion was a separate review operation. The analysis
stage wrote task SOP and a non-authoritative provenance journal. It was explicitly forbidden to inspect expectations,
prior results, presentation pages, learning candidates, or sibling workspaces as semantic sources.

## Executor evidence

After the task agent exited, the CLI executed `task.analysis`. The committed authoritative report is
`task/results/runtime-result.md`; its receipt hash is `sha256:b44e6ac9c071d0a5252b09c8f52aa98d83f068f1bc3ac033f4dba5b44925cb11`. The report was rendered from public outputs and receipt
fields by local runtime code. It was not generated or summarized by Codex.

Machine-local workspace manifests and `.dynamic-circuits/last-run.json` retain additional paths and timestamps during a live
run. This repository-facing record uses relative paths so it remains readable through the static documentation server.
