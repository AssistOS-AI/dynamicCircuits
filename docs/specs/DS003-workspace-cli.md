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

Codex is the default adapter. A generic command adapter proves extensibility and the registry is the boundary for future
OpenCode, Claude Code, and other coding agents. `--dry-run` prints an argument-vector invocation and generated prompt. It
must not use a shell command string or direct model API.

## Decisions & Questions

### Question #1: Why inventory hashes instead of passing one concatenated prompt?

Response: A manifest scales to mixed and nested files, lets the coding agent inspect only necessary content, and establishes explicit coverage and provenance without duplicating potentially large inputs.

### Question #2: Why refuse nested KB and work directories?

Response: Separation prevents recursive input discovery, accidental report ingestion, and ambiguous write authority during learning runs.

### Question #3: Why are documentation links relative?

Response: The static site may be mounted below a prefix such as `/workspace-files/dynamicCircuits/docs/`. Relative
`specsLoader.html?spec=...` links preserve that prefix; root-relative links incorrectly jump to the server root.

## Conclusion

Workspace preparation is idempotent for managed artifacts, conservative toward user files, and explicit about every path where agents may read or write.
