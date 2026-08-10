---
id: DS000
title: Vision and Scope
status: active
owner: repository
summary: Defines inferred learning and analysis workspaces, external coding-agent orchestration, executable circuits, and the reference boundary.
---

# DS000 Vision and Scope

## Introduction

Dynamic Circuits processes document folders through two components. An external coding agent interprets the documents and
authors SOP circuits. A deterministic local kernel validates those circuits, executes their dependency graphs, and emits
outputs and receipts. The current DS set defines both the implemented subset and the planned assurance components; the
original v1 design remains immutable historical input.

This is the entry specification for the project. It connects the CLI and coding-agent boundary in DS002–DS003, the
implemented SOP kernel in DS004–DS005, the KB workflow in DS006, and the planned assurance architecture in DS009–DS027.

## Core Content

Document analysis combines source files, interpreted facts, reusable rules, exceptions, priorities, intermediate values,
and conclusions. The system must identify every source, preserve provenance from outputs to source spans, represent reusable
rules as executable packages, classify execution failures, and keep source assertions separate from verified propositions
and accepted outcomes. The architecture supports legal, scientific, policy, technical, financial, compliance, and
large-document analysis through domain packages rather than domain-specific kernel code.

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

### Operational example

Given policy documents under `./work/task-001/input`, the CLI prepares the workdir, Codex authors a task circuit under
`sop/`, the runtime executes it against explicit values, and the agent writes a report under `results/` that cites the
runtime outcome and source files.

## Decisions & Questions

### Question #1: Why is the original design package retained separately?

Response: `sop_lang_circuits_design_specs_v1/` records the first comprehensive design and must remain byte-for-byte historical. Current DS files are intentionally organized around verified code so future work can advance without rewriting history.

### Question #2: Why is the coding agent external to the runtime?

Response: External invocation satisfies the present requirement to use coding agents without shipping credentials, SDK dependencies, or direct LLM calls inside circuits. It also keeps interpretation separate from deterministic circuit execution.

## Conclusion

The implemented release prepares both workspace modes, invokes a selected coding-agent adapter, compiles and executes the
supported SOP subset, emits receipts, and reproduces the committed evaluation cases. Later DS files define the additional
components required for mandatory closure and conditional acceptance certificates.
