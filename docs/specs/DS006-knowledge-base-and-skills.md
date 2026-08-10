---
id: DS006
title: Knowledge Base and Circuit Skills
status: active
owner: repository
summary: Defines KB circuits, candidates, and the analyze-task, author-sop-circuit, and circuit-learner skills.
---

# DS006 Knowledge Base and Circuit Skills

## Introduction

Reusable executable knowledge and one analysis attempt have different lifecycles. The repository's skill catalog teaches coding agents to preserve that boundary.

## Core Content

Trusted reusable `.sop` packages must live under `KB/circuits/`. New learning output must begin under `KB/candidates/` with its contract, provenance, examples, and tests. A coding agent must not promote candidates or overwrite trusted circuits. Task-specific circuits must remain under `WORK/sop/`.

The project must ship `circuitSkills/analyze-task`, `circuitSkills/author-sop-circuit`, and `circuitSkills/circuit-learner`. Each skill must contain valid concise frontmatter, imperative workflows, and only resources required for its task. `author-sop-circuit` must document the implemented subset and must warn agents not to claim future runtime capabilities.

Workspace preparation must link the entire `circuitSkills` directory rather than copy it. This keeps one maintained skill version across normal workspaces and `eval/evalN` cases. Imported repository-maintenance skills under `.agents/` are read-only guidance and are not runtime circuit skills.

Analysis reports must distinguish reused trusted circuits, generated task-local circuits, unexecuted source, successful execution, and proposed KB candidates. Learning artifacts must retain input hashes or paths and review-relevant source spans without copying unnecessary document bodies.

## Decisions & Questions

### Question #1: Why use a symbolic link for skills?

Response: Workspaces receive current, discoverable instructions without duplicated skill trees drifting across tasks and evaluation cases.

### Question #2: Why are candidates separate from trusted circuits?

Response: Coding-agent extraction can be useful but remains an interpretation. Compilation and tests establish mechanical validity; semantic review is still required before reuse as trusted knowledge.

## Conclusion

The KB is reusable and governed, the workdir is disposable and task-local, and project skills make the distinction operational for coding agents.
