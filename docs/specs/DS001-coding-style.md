---
id: DS001
title: Coding Style and Test Organization
status: active
owner: repository
summary: Establishes the source layout, deterministic JavaScript conventions, file-size checks, and modular test rules.
---

# DS001 Coding Style and Test Organization

## Introduction

This specification is the coding-style authority for Dynamic Circuits. It applies to production source, tests, scripts, skills, and durable documentation.

It connects repository structure to verification: module boundaries determine test placement, and documentation rules keep
the HTML pages and DS contracts synchronized with observable implementation behavior.

## Core Content

Production code must use Node.js ECMAScript modules under `src/` and must support Node.js 20 or newer. Runtime code must avoid external package dependencies. Modules must have explicit responsibilities: `src/sop/` contains language mechanics, `src/agents/` contains coding-agent adapters, `src/workspace.mjs` owns workspace preparation, and `src/cli.mjs` owns argument handling and process orchestration.

Functions should remain deterministic unless their boundary explicitly represents an effect. Errors crossing module or CLI boundaries must use stable codes and structured details. Canonical data must not contain non-finite numbers, functions, or unstable object identities. Code must not use hidden globals to transfer runtime values.

Tests must use `node:test` and mirror responsibility under `tests/parser/`, `tests/compiler/`, `tests/runtime/`,
`tests/workspace/`, `tests/agents/`, `tests/cli/`, `tests/docs/`, and `tests/integrity/`. Every defect fix must add or
strengthen a focused test. Temporary test data must be created outside repository fixtures and cleaned after the test.
Evaluation cases under `docs/eval/` are statically browsable reproducible examples and do not replace unit tests.

Source files should remain reviewable in one sitting. Run `fileSizesCheck.sh` after substantial changes; a file exceeding its configured limits should be split by responsibility unless cohesion provides a documented reason. Prefer lines that remain readable without horizontal scrolling, generally below 120 characters, while preserving commands and machine-readable fixtures when wrapping would reduce clarity.

HTML documentation must use the available viewport width for prose, tables, diagrams, and code. The shared shell must use
compact page spacing and headings; the specification loader must suppress the duplicate Markdown H1 because its shell
already displays the active DS title. Documentation prose must begin with the component, input, operation, or result being
explained. Slogans, rhetorical contrasts, and claims framed mainly as what the system is not should be replaced with direct
operational descriptions.

AchillesAgentLib is authorized but is not installed for the current external-agent architecture. A future in-process integration must route every LLM interaction through `LLMAgent`, use runtime configuration and environment variables, permit explicit code-level configuration overrides, and attach metadata tags for documentation, specification, orchestration, bootstrap, and testing work.

### Operational example

A change to cross-realm canonicalization belongs in `src/sop/canonical.mjs`, receives a focused runtime regression test,
updates DS005 and the runtime HTML page, and passes `npm run check` plus `fileSizesCheck.sh` before completion.

## Decisions & Questions

### Question #1: Why use dependency-free `.mjs` modules?

Response: The historical roadmap selected Node.js `.mjs` without dependencies for the reference interpreter. This keeps the executable semantics inspectable and avoids introducing dependencies without approval.

### Question #2: How are large modules handled?

Response: File size is a review signal rather than an invitation to mechanical fragmentation. Split along parser, compiler, runtime, workspace, and adapter contracts, and verify repository limits with `fileSizesCheck.sh`.

## Conclusion

Code is acceptable when its module boundary is explicit, observable behavior is covered by focused tests, structured errors remain stable, and current docs describe the implemented behavior.
