---
id: DS003
title: Workspace and CLI Contract
status: active
owner: repository
summary: Specifies KB/workdir separation, input discovery, result placement, skill links, learning mode, and CLI behavior.
---

# DS003 Workspace and CLI Contract

## Introduction

The CLI translates two user-controlled paths into a predictable analysis environment without conflating durable reusable knowledge with one task's artifacts.

## Core Content

The primary invocation must accept both `-kbdir PATH -workdir PATH` and conventional double-dash forms. The KB and work directories must be distinct and must not contain one another. Preparation must create `KB/circuits/`, `KB/candidates/`, `WORK/input/`, `WORK/results/`, `WORK/sop/`, and `WORK/.dynamic-circuits/` as needed.

The work directory must contain a `circuitSkills` symbolic link targeting the project-owned skill catalog. An existing link is accepted only when it resolves to the expected directory; a conflicting file, directory, or link must produce a structured failure.

Preparation must recursively inventory every regular input file without following symbolic links. `.dynamic-circuits/input-manifest.json` must record normalized relative paths, byte sizes, and SHA-256 hashes. `.dynamic-circuits/workspace.json` must record the path contract and analysis mode.

The CLI may create or refresh a managed `AGENTS.md`. It must not overwrite a user-owned `AGENTS.md`; in that case it must place generated instructions at `.dynamic-circuits/AGENT_INSTRUCTIONS.md`. `prepare` and `--prepare-only` must not invoke an agent. `--dry-run` must expose the process invocation and prompt without spawning it.

Normal mode must instruct the coding agent to keep KB content read-only. `--learn` may authorize candidate creation under `KB/candidates/` but must not authorize edits or promotion under `KB/circuits/`. Agent completion state must be recorded in `.dynamic-circuits/last-run.json`.

## Decisions & Questions

### Question #1: Why inventory hashes instead of passing one concatenated prompt?

Response: A manifest scales to mixed and nested files, lets the coding agent inspect only necessary content, and establishes explicit coverage and provenance without duplicating potentially large inputs.

### Question #2: Why refuse nested KB and work directories?

Response: Separation prevents recursive input discovery, accidental report ingestion, and ambiguous write authority during learning runs.

## Conclusion

Workspace preparation is idempotent for managed artifacts, conservative toward user files, and explicit about every path where agents may read or write.
