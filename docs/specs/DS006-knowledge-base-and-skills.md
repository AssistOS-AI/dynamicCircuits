---
id: DS006
title: Knowledge Base and Circuit Skills
status: active
owner: repository
summary: Defines KB circuits, candidates, and the analyze-task, author-sop-circuit, and circuit-learner skills.
---

# DS006 Knowledge Base and Circuit Skills

## Introduction

Reviewed reusable circuits persist in the knowledge base. Task-specific circuits and reports remain in one workdir. The
runtime skill catalog gives coding agents separate workflows for analysis, SOP authoring, and KB candidate extraction.

This specification connects inferred learning mode from DS003 to reviewed templates in DS014 and to the three runtime
skills linked into every prepared KB, workdir, and evaluation workspace.

## Core Content

Trusted reusable `.sop` packages must live under `KB/circuits/`. New learning output must begin under `KB/candidates/` with its contract, provenance, examples, and tests. A coding agent must not promote candidates or overwrite trusted circuits. Task-specific circuits must remain under `WORK/sop/`.

The project must ship `circuitSkills/analyze-task`, `circuitSkills/author-sop-circuit`, and `circuitSkills/circuit-learner`. Each skill must contain valid concise frontmatter, imperative workflows, and only resources required for its task. `author-sop-circuit` must document the implemented subset and must warn agents not to claim future runtime capabilities.

Workspace preparation links the entire `circuitSkills` directory rather than copying it. The visible `circuitSkills` link
and `.agents/skills` discovery links resolve to that same catalog; an existing local discovery directory receives project
skill links without losing unrelated entries. This keeps one maintained skill version across normal workspaces and
`docs/eval/evalN` cases. Repository-maintenance skills under the root `.agents/` are read-only guidance for project work and
are never modified or repurposed as runtime circuit skills.

The three maintained skills consolidate the six historical roles. `author-sop-circuit` covers kernel implementation
constraints plus template/matcher authoring; `circuit-learner` covers source inventory, rule extraction, candidate packaging,
provenance, tests, ambiguity, and assurance review preparation; `analyze-task` covers problem solving, receipt-guided
debugging, coverage, report publication, and reusable-discovery reporting. Agents must read only the skill needed for their
task and must distinguish implemented syntax from planned matching, closure, profiles, and proof features.

Analysis reports must distinguish reused trusted circuits, generated task-local circuits, unexecuted source, successful execution, and proposed KB candidates. Learning artifacts must retain input hashes or paths and review-relevant source spans without copying unnecessary document bodies.

Candidate packages include a manifest, source provenance, applicability, inputs/outputs, effects/capabilities, assumptions,
exceptions and priorities, refusal codes, positive/negative/boundary examples, test commands, expected receipts, overlap and
version notes, and review checklist. Compilation is necessary but never sufficient for semantic promotion.

### Operational example

A policy learner extracts a notice-period rule into `candidates/legal-notice/`, records the source paragraph and policy
assumptions, adds ordinary, exception, and missing-consent cases, and compiles the package. The reviewed `circuits/` tree
remains unchanged until a separate promotion decision.

## Decisions & Questions

### Question #1: Why use a symbolic link for skills?

Response: Workspaces receive current, discoverable instructions without duplicated skill trees drifting across tasks and evaluation cases.

### Question #2: Why are candidates separate from trusted circuits?

Response: Coding-agent extraction can be useful but remains an interpretation. Compilation and tests establish mechanical validity; semantic review is still required before reuse as trusted knowledge.

## Conclusion

The KB is reusable and governed, the workdir is disposable and task-local, and project skills make the distinction operational for coding agents.
