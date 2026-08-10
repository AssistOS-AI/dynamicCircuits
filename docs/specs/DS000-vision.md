---
id: DS000
title: Vision and Scope
status: active
owner: repository
summary: Defines inferred learning and analysis workspaces, external coding-agent orchestration, executable circuits, and the reference boundary.
---

# DS000 Vision and Scope

## Introduction

Dynamic Circuits turns documents and reusable rules into explicit, executable analysis graphs. A coding agent interprets
documents and authors circuits; a deterministic kernel validates and runs those circuits; receipts preserve what actually
happened. The original v1 design remains immutable history while the current DS set preserves its full theory and labels
the narrower implementation-backed subset honestly.

## Core Content

The problem is not merely running scripts. Document analysis needs traceable sources, reusable rules with exceptions and
priorities, explicit intermediate values, deterministic composition, classified failure, completeness obligations, and a
way to distinguish source claims from verified or accepted conclusions. The long-term design covers legal, scientific,
policy, technical, financial, compliance, and large-document analysis without embedding domain truth in the kernel.

The primary product is a CLI with two inferred modes. `-kbdir ./kb` learns reviewable candidate circuits from `./kb/input`.
Adding `-workdir ./work/task-001` performs the default task analysis over `input/`, writes reports to `results/`, creates
task-local SOP Lang under `sop/`, and reads trusted KB circuits without modifying them. Both workspaces expose the maintained
`circuitSkills` catalog by symbolic links.

The CLI must delegate interpretation and circuit authoring to an external coding agent. It must not integrate directly with an LLM API in this release. Codex is the included adapter, while adapter selection must remain explicit and extensible.

The source tree includes a dependency-free Node.js reference implementation for the supported SOP Lang subset and tests for
parser, compiler, runtime, agent invocation, workspace behavior, documentation, eval circuits, and historical integrity.
The current milestone includes explicit ports, immutable local wires, positional calls, JavaScript command descriptors,
static graph checks, relevant-slice and nested execution, local checks/invariants, canonical values, and structured receipts.

Non-goals for this release are direct LLM API integration, autonomous promotion of learned knowledge, natural-language
truth guarantees, general-purpose programming syntax, mandatory semantic closure, persistent caches, formal proofs, trust
profiles, distributed execution, and production multi-tenant isolation. These are either deliberately external or specified
as future layers in DS014–DS027.

Success has three levels: today, a user can prepare either workspace, invoke a selected coding-agent adapter, compile and
run supported circuits, inspect receipts, and reproduce serious evals; next, the system can govern and reuse candidates;
ultimately, it can issue conditional acceptance certificates after exhaustive declared obligations and trust gates.

## Decisions & Questions

### Question #1: Why is the original design package retained separately?

Response: `sop_lang_circuits_design_specs_v1/` records the first comprehensive design and must remain byte-for-byte historical. Current DS files are intentionally organized around verified code so future work can advance without rewriting history.

### Question #2: Why is the coding agent external to the runtime?

Response: External invocation satisfies the present requirement to use coding agents without shipping credentials, SDK dependencies, or direct LLM calls inside circuits. It also keeps interpretation separate from deterministic circuit execution.

## Conclusion

The project succeeds by making analysis more reusable and auditable without disguising agent judgment as deterministic proof
or future assurance architecture as already implemented software.
