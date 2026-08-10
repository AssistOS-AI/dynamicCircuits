---
id: DS003
title: Workspace and CLI Contract
status: active
owner: repository
summary: Specifies inferred KB learning and workdir analysis modes, input discovery, result placement, skill links, and CLI behavior.
---

# DS003 Workspace and CLI Contract

## Introduction

The CLI prepares a persistent knowledge-base directory and, when supplied, a separate directory for one analysis task. Each
directory has explicit read/write locations, manifests, coding-agent instructions, and skill-discovery links.

This specification is the filesystem boundary between user inputs, the external coding agent in DS002, the reusable KB in
DS006, and the circuit compiler/runtime in DS005. DS008 defines the security limits of that boundary.

## Core Content

The primary invocation accepts requested single-dash and conventional double-dash options. `agent -kbdir ./kb` infers
learning because no task workspace exists. It prepares `input/`, `circuits/`, `candidates/`, `results/`, and
`.dynamic-circuits/` inside the KB. `agent -kbdir ./kb -workdir ./work/task-001` infers analysis and prepares `input/`,
`results/`, `sop/`, and `.dynamic-circuits/` inside the workdir plus trusted/candidate KB directories. In analysis mode the
KB and workdir must be distinct and must not contain one another.

The work directory must contain a `circuitSkills` symbolic link targeting the project-owned skill catalog. It must also expose the same catalog through `.agents/skills` for native coding-agent discovery. When `.agents/skills` is an existing local directory, preparation must add one safe link per project skill and preserve unrelated entries. Existing links are accepted only when they resolve to expected targets; conflicting files or links must produce a structured failure.

Preparation recursively inventories every regular file in the active workspace's `input/` without following symbolic links.
`.dynamic-circuits/input-manifest.json` records normalized relative paths, byte sizes, and SHA-256 hashes.
`.dynamic-circuits/workspace.json` records schema version, inferred mode, resolved roots, and relative managed paths. User
examples use relative paths so they remain valid from the current directory rather than suggesting machine-specific roots.

The CLI may create or refresh a managed `AGENTS.md`. It must not overwrite a user-owned `AGENTS.md`; in that case it must place generated instructions at `.dynamic-circuits/AGENT_INSTRUCTIONS.md`. `prepare` and `--prepare-only` must not invoke an agent. `--dry-run` must expose the process invocation and prompt without spawning it.

Analysis instructs the coding agent to keep KB content read-only and write only within the workdir. Learning uses the KB as
the agent working directory but authorizes generated knowledge only under `candidates/` and reports under `results/`; it may
read but not edit `circuits/`. The explicit `--learn` option is obsolete and rejected with migration guidance. Agent
completion state is recorded in the active workspace's `.dynamic-circuits/last-run.json`.

An analysis run uses four visible stages. First, the coding agent translates the task documents into task-local packages
under `sop/task/` without copying reusable KB policy. Second, it authors the no-input root `task.analysis` at
`sop/task/analysis.sop`; this root obtains current values from task packages, explicitly invokes applicable optional or
legacy `kb.*` packages, and publishes current values under exact trigger keys for applicable reviewed mandatory matchers.
Third, after the coding-agent process exits, the CLI compiles the complete registry, executes the root, and automatically
closes mandatory matcher instances to a fixed point. Fourth, it writes `results/runtime-result.md` directly from root
values, automatically applied target outputs, and receipts. The CLI does not create a JSON result artifact.

`runtime-result.md` is the authoritative result. A coding agent may write `results/agent-summary.md` only as a provenance
journal covering input coverage, generated packages, compile/test attempts, assumptions, limitations, and reusable
discoveries. That journal must not restate or interpret the semantic verdict. Before a live analysis, the CLI removes an old
managed runtime report so an agent or runtime failure cannot leave stale output looking current. `.dynamic-circuits/last-run.json`
records both the coding-agent completion state and the executor entrypoint, outcome, hashes, and report path.

Analysis is dependency-aware. `task/input/` and reviewed `kb/circuits/` are coding-agent dependencies. Generated
`task/sop/` is an executor dependency. When `runtime-result.md` is newer than all three sets, the CLI preserves it and skips
both Codex and the executor. When only generated SOP is newer, the CLI skips Codex and reruns the executor. When task input
or a reviewed KB circuit is newer, or when `runtime-result.md` is absent, the CLI removes any stale result, invokes the
coding agent, and then invokes the executor. Deleting `runtime-result.md` is therefore the explicit force-rerun mechanism.
Evaluation expectations, READMEs, HTML, prior results, KB candidates, and learning reports are not dependencies because
they are outside the analysis semantic-source boundary. KB learning remains an explicit run because it has no executor-owned
canonical result target in the current implementation.

The analysis semantic-source boundary includes manifest-listed task input and reviewed KB circuits. Evaluation expectations,
prior results, evaluation presentation pages, KB candidates, learning reports, and sibling workspaces are excluded. Project
skills and compiler/runtime documentation may be read only to author mechanically valid SOP. Learning applies the analogous
boundary to the active KB's `input/` and `circuits/`.

Source placement follows intended lifetime. Reusable policies, interpretation rules, glossaries, and reference material
belong under `KB/input/`; reviewed reusable SOP belongs under `KB/circuits/`. Current cases, observations, documents,
questions, requested outputs, and task-local constraints belong under `WORK/input/`; their executable adaptation belongs
under `WORK/sop/`, and outputs belong under `WORK/results/`. Mixed documents should be split when doing so preserves their
meaning. A rule that is explicitly limited to one request may remain task-local. Repetition across tasks may justify a KB
candidate, but never automatic promotion.

Codex is the default adapter. A generic command adapter proves extensibility and the registry is the boundary for future
OpenCode, Claude Code, and other coding agents. `--dry-run` prints an argument-vector invocation and generated prompt. It
must not use a shell command string or direct model API.

### Operational example

With `-kbdir ./kb -workdir ./work/case-a`, the CLI hashes files under `./work/case-a/input`, prepares `sop/` and `results/`,
links `circuitSkills`, records mode `analyze`, and starts the selected agent with `./work/case-a` as its current directory.

## Decisions & Questions

### Question #1: Why inventory hashes instead of passing one concatenated prompt?

Response: A manifest scales to mixed and nested files, lets the coding agent inspect only necessary content, and establishes explicit coverage and provenance without duplicating potentially large inputs.

### Question #2: Why refuse nested KB and work directories?

Response: Separation prevents recursive input discovery, accidental report ingestion, and ambiguous write authority during learning runs.

### Question #3: Why are documentation links relative?

Response: The static site may be mounted below a prefix such as `/workspace-files/dynamicCircuits/docs/`. Relative
`specsLoader.html?spec=...` links preserve that prefix; root-relative links incorrectly jump to the server root.

### Question #4: Why classify files by lifetime instead of file type?

Response: A Markdown policy and a Markdown case table have the same format but different authority and reuse. Lifetime-based
placement keeps durable rules available to later tasks without allowing one task's observations or requests to become
implicit global knowledge.

### Question #5: Why generate SOP for both the KB and the task input?

Response: The two SOP families have different authority. KB SOP packages encode reviewed reusable rules learned from durable
sources. Task SOP packages encode only the current request and facts. The task root makes their connection explicit, so the
runtime can verify the actual composition and the report can cite an observed result instead of relying on agent prose.

### Question #6: Who owns the official analysis result?

Response: The SOP executor owns it. Codex authors executable source and may record provenance, but only the CLI's deterministic
rendering of the runtime public outputs and receipt is an official result. This prevents post-execution prose from silently
changing, omitting, or embellishing circuit output.

### Question #7: Why are Codex and executor invalidation separate?

Response: Editing generated SOP does not require another natural-language interpretation, while editing task input or a
reviewed KB circuit can change that interpretation. Separate dependency sets avoid an expensive agent call when a direct
SOP correction only needs deterministic re-execution. The report timestamp remains the visible cache boundary, and deleting
the report intentionally requests a complete rerun.

### Question #8: Must the coding agent call every mandatory KB rule?

Response: No. It publishes task values under reviewed semantic keys. The executor, not agent memory, enumerates the loaded
mandatory matcher registry, validates every returned binding, executes each apply target, and audits expected versus
executed instances.

## Conclusion

Workspace preparation is idempotent for managed artifacts, conservative toward user files, and explicit about every path where agents may read or write.
