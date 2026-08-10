---
id: DS026
title: Agent API and Workspace Protocol
status: active
owner: repository
summary: Defines inferred CLI modes, filesystem authority, coding-agent adapters, run state, and a future programmatic Agent API.
---

# DS026 Agent API and Workspace Protocol

## Introduction

Coding agents are external collaborators around the deterministic SOP kernel. The filesystem is the present integration
protocol; a future API may expose the same operations without changing authority or provenance rules.

This specification connects CLI behavior in DS003, workspace safety in DS008, and execution attempts in DS013. The same
resolved directories, adapter identity, prompt digest, status, and generated artifacts must remain observable whether a
user invokes the CLI or a future programmatic API.

## Core Content

### Inferred modes

`agent -kbdir ./kb` with no `--workdir` means knowledge learning. The KB directory becomes the agent working directory;
source documents are read from `input/`, trusted circuits from `circuits/`, proposals are written to `candidates/`, and
learning reports to `results/`. `agent -kbdir ./kb -workdir ./work/task-001` means task analysis. The task directory becomes
the working directory; inputs come from `input/`, task circuits from `sop/`, and reports from `results/`; KB circuits are
read-only. The removed `--learn` switch is rejected with migration guidance because mode is derivable from `--workdir`.

Preparation installs a visible `circuitSkills` symlink and `.agents/skills/<name>` discovery links to the repository-owned
runtime skill catalog. It creates only missing managed paths, preserves user files and unrelated skill links, never modifies
the repository root `.agents/` catalog, and records mode and resolved paths in `.dynamic-circuits/workspace.json`.

### Adapter and run protocol

`--coding-agent codex` is the default; registry-based adapters allow future `opencode`, `claude-code`, and other agents.
The adapter builds an argument vector and runs the external process with the inferred workspace as current directory.
No shell interpolation or direct LLM API occurs. The generated prompt identifies allowed read/write zones, requested outputs,
skill discovery, circuit compilation/testing commands, and the requirement not to promote KB candidates.

`.dynamic-circuits/last-run.json` records adapter, mode, timestamps, exit status, signal, resolved workspace, and prompt
digest or safe summary. Logs and agent output may be retained under policy, but secrets and unrestricted environment values
must not be captured. Preparation and dry-run are non-destructive diagnostics.

### Future Agent API

A programmatic API may expose `prepare`, `inspect`, `compile`, `run`, `learn`, `propose`, `validate`, `promote`, `analyze`,
`resume`, `compareAttempts`, `audit`, and `exportReceipt`. Every mutating operation declares target workspace, authority,
epoch, profile, expected preconditions, and returned artifacts. Promotion remains a distinct privileged operation.

Operational example: an analysis run with `-kbdir ./kb -workdir ./work/case-17` writes task SOP and reports only under
`case-17`, reads reviewed packages from `./kb/circuits`, and records Codex plus the prompt digest in `last-run.json`. Replacing
Codex with a future OpenCode adapter changes process construction, not the workspace layout or write permissions.

## Decisions & Questions

### Question #1: Why infer learning from absence of `--workdir`?

Response: The two directory contracts are mutually exclusive and complete; eliminating a redundant flag prevents impossible
combinations and makes the common analysis form the obvious default.

### Question #2: Why use symlinks for project skills?

Response: Every prepared workspace discovers the single maintained catalog immediately, while repository-maintenance skills
remain untouched and user-owned workspace content is preserved.

## Conclusion

The workspace protocol gives multiple coding agents one stable, least-authority contract without embedding any model API in
the SOP runtime.
