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

The KB source corpus and the current task are different contracts. `KB/input/` contains durable source knowledge intended
for reuse or candidate extraction. `WORK/input/` contains the current dataset, cases, source documents, questions, and
requested deliverable. Analysis may read reviewed KB circuits but may write only task SOP and a provenance journal; the CLI
executor owns the authoritative task result. A discovery made
during analysis must be reported for later learning and review; it must not move current task facts into the trusted KB or
edit a reviewed package in place.

The project must ship `circuitSkills/analyze-task`, `circuitSkills/author-sop-circuit`, and `circuitSkills/circuit-learner`. Each skill must contain valid concise frontmatter, imperative workflows, and only resources required for its task. `author-sop-circuit` must document the implemented subset and must warn agents not to claim future runtime capabilities.

Workspace preparation links the entire `circuitSkills` directory rather than copying it. The visible `circuitSkills` link
and `.agents/skills` discovery links resolve to that same catalog; an existing local discovery directory receives project
skill links without losing unrelated entries. This keeps one maintained skill version across normal workspaces and the
`kb/`, `task/`, `task2/`, and `task3/` directories inside `docs/eval/evalN` cases. Repository-maintenance skills under the root `.agents/` are read-only guidance for project work and
are never modified or repurposed as runtime circuit skills.

The three maintained skills consolidate the six historical roles. `author-sop-circuit` covers kernel implementation
constraints plus template/matcher authoring; `circuit-learner` covers source inventory, rule extraction, candidate packaging,
provenance, tests, ambiguity, and assurance review preparation; `analyze-task` covers problem solving, receipt-guided
debugging, coverage, task-root construction, and reusable-discovery reporting. Agents must read only the skill needed for their
task and must distinguish implemented exact-key matching and closure from planned richer discovery, profiles, and proof features.

The executor report must distinguish successful execution from refusal or failure. Agent provenance journals must distinguish
reused trusted circuits, generated task-local circuits, unexecuted source, and proposed KB candidates without restating a
semantic result. Learning artifacts must retain input hashes or paths and review-relevant source spans without copying unnecessary document bodies.

Candidate packages include a manifest, source provenance, applicability, inputs/outputs, effects/capabilities, assumptions,
exceptions and priorities, refusal codes, positive/negative/boundary examples, test commands, expected receipts, overlap and
version notes, and review checklist. Compilation is necessary but never sufficient for semantic promotion.

A candidate mandatory matcher may be promoted only after reviewers approve its exact dotted triggers, apply target,
interface, exhaustive positive/no-match/multi-record cases, duplicate behavior, and semantic source provenance. The matcher
contains no local JavaScript and uses only the restricted matching Core. Task analysis may publish values for reviewed
matchers, but it must never create a task-local mandatory matcher that silently enlarges KB policy.

### Operational example

A policy learner extracts a notice-period rule into `candidates/legal-notice/`, records the source paragraph and policy
assumptions, adds ordinary, exception, and missing-consent cases, and compiles the package. The reviewed `circuits/` tree
remains unchanged until a separate promotion decision.

## Decisions & Questions

### Question #1: Why use a symbolic link for skills?

Response: Workspaces receive current, discoverable instructions without duplicated skill trees drifting across tasks and evaluation cases.

### Question #2: Why are candidates separate from trusted circuits?

Response: Coding-agent extraction can be useful but remains an interpretation. Compilation and tests establish mechanical validity; semantic review is still required before reuse as trusted knowledge.

### Question #3: Why must current task facts stay outside the KB?

Response: Their authority and lifetime are limited to one request. Keeping them in the workdir prevents later analyses from
mistaking an observation, question, or exceptional case for reviewed reusable knowledge.

### Question #4: Why is mandatory metadata held to a stronger promotion standard?

Response: A false positive forces a rule into every matching run, while a false negative can omit an obligation. Review must
therefore cover both applicability directions, target binding, registry interaction, and closure behavior rather than only
whether the target circuit compiles.

## Conclusion

The KB is reusable and governed, the workdir is disposable and task-local, and project skills make the distinction operational for coding agents.
