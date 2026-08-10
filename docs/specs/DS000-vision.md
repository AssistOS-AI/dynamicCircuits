---
id: DS000
title: Vision and Scope
status: active
owner: repository
summary: Defines a coding-agent-driven analysis CLI, an executable circuit workspace, and the boundary of the reference implementation.
---

# DS000 Vision and Scope

## Introduction

Dynamic Circuits turns a directory of task inputs into an auditable workspace where a coding agent may reuse knowledge-base circuits, author task-specific SOP Lang, execute circuits, and write reports. The project carries the original v1 design package as immutable history while maintaining a narrower, implementation-backed current contract.

## Core Content

The primary product must be a CLI accepting separate KB and work directories. A prepared work directory must contain `input/`, `results/`, `sop/`, `.dynamic-circuits/`, and a symbolic link named `circuitSkills`. Analysis must account for every regular file under `input/`; reports belong under `results/`, and task-local circuits belong under `sop/`.

The CLI must delegate interpretation and circuit authoring to an external coding agent. It must not integrate directly with an LLM API in this release. Codex is the included adapter, while adapter selection must remain explicit and extensible.

The source tree must include a dependency-free Node.js reference implementation for the supported SOP Lang subset and unit tests for parser, compiler, runtime, agent invocation, and workspace behavior. The current milestone includes explicit ports, immutable local wires, positional calls, JavaScript command descriptors, static graph checks, nested circuit execution, local assurance checks, and structured receipts. It does not claim mandatory closure, semantic matching, persistent caches, trust profiles, or production-grade isolation.

## Decisions & Questions

### Question #1: Why is the original design package retained separately?

Response: `sop_lang_circuits_design_specs_v1/` records the first comprehensive design and must remain byte-for-byte historical. Current DS files are intentionally organized around verified code so future work can advance without rewriting history.

### Question #2: Why is the coding agent external to the runtime?

Response: External invocation satisfies the present requirement to use coding agents without shipping credentials, SDK dependencies, or direct LLM calls inside circuits. It also keeps interpretation separate from deterministic circuit execution.

## Conclusion

The first release is successful when a user can prepare a reproducible workspace, invoke or dry-run a selected coding agent, compile and execute supported SOP circuits, and verify the behavior through repository tests.
