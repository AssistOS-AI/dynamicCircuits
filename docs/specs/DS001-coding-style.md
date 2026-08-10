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

Production code must use Node.js ECMAScript modules under `src/` and must support Node.js 20 or newer. Runtime code must avoid external package dependencies. Modules must have explicit responsibilities: `src/sop/` contains language mechanics, `src/agents/` contains coding-agent adapters, `src/workspace.mjs` owns workspace preparation, `src/incremental.mjs` owns analysis invalidation, `src/runtime-report.mjs` owns fixed-root execution and report rendering, and `src/cli.mjs` owns argument handling and process orchestration.

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

The primary site navigation must have one maintained source under `docs/partials/`. Reader pages at every nesting level,
including evaluation catalogs and individual evaluation browsers, must load that partial through the shared loader instead
of copying header markup. The top-level navigation must group related destinations into compact submenus with three or four
vertical choices where the available pages permit it. The loader must resolve partial links from the documentation root so
the same source works beneath an arbitrary static mount prefix.

Each durable HTML page must restate enough project context to be understandable without an earlier page, define local terms,
give at least one concrete file or execution example, and link to the relevant runnable guide and normative DS. Every diagram
must have a reader-facing title and subtitle, be centered, contain no more than five focused nodes, and be followed by prose
that explains every node and relationship. Long explanatory prose uses justified alignment through the shared stylesheet.
Entry pages must route readers toward input guidance, a runnable tutorial, implementation details, evaluations, and DS files.

`docs/tutorial.html` is the maintained manual verification path. Any change to CLI modes, generated workspace structure,
agent invocation, supported SOP commands, evaluation fixtures, or expected outputs must update the corresponding tutorial
step and expected observation in the same change.

AchillesAgentLib is authorized but is not installed for the current external-agent architecture. A future in-process integration must route every LLM interaction through `LLMAgent`, use runtime configuration and environment variables, permit explicit code-level configuration overrides, and attach metadata tags for documentation, specification, orchestration, bootstrap, and testing work.

### Operational example

A change to cross-realm canonicalization belongs in `src/sop/canonical.mjs`, receives a focused runtime regression test,
updates DS005 and the runtime HTML page, and passes `npm run check` plus `fileSizesCheck.sh` before completion.

## Decisions & Questions

### Question #1: Why use dependency-free `.mjs` modules?

Response: The historical roadmap selected Node.js `.mjs` without dependencies for the reference interpreter. This keeps the executable semantics inspectable and avoids introducing dependencies without approval.

### Question #2: How are large modules handled?

Response: File size is a review signal rather than an invitation to mechanical fragmentation. Split along parser, compiler, runtime, workspace, and adapter contracts, and verify repository limits with `fileSizesCheck.sh`.

### Question #3: Why is navigation loaded from one partial?

Response: A single source keeps new pages discoverable across overview, tutorial, specification, and nested evaluation
views. Mount-aware link resolution avoids maintaining a different copied menu for each directory depth.

## Conclusion

Code is acceptable when its module boundary is explicit, observable behavior is covered by focused tests, structured errors remain stable, and current docs describe the implemented behavior.
