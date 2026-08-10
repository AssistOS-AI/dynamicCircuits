---
id: DS007
title: Evaluation and Testing
status: active
owner: repository
summary: Defines modular unit suites, reproducible eval workspaces, verification commands, and historical integrity checks.
---

# DS007 Evaluation and Testing

## Introduction

Dynamic Circuits separates deterministic implementation tests from end-to-end coding-agent evaluations. Both use the same public workspace and circuit contracts.

## Core Content

`npm test` must execute modular unit suites for parser syntax, compiler graph validation, runtime outcomes and nesting, workspace preparation and non-destructive behavior, coding-agent invocation construction, the public CLI argument form, and historical-package integrity. Tests must cover successful and failing paths, including bare arguments, free wires, arity mismatch, dead nodes, refusal, failed checks, exceptions, false invariants, symlink creation, user-owned guidance, and generic adapter extension.

Every evaluation case lives under a contiguous `docs/eval/evalN/` directory so all artifacts are statically browsable using
relative URLs. It contains `input/`, `results/`, `sop/`, a detailed `README.md`, an `index.html`, and the same skill links as
a production workspace. Inputs, governing rules, circuits, expected semantic verdicts, and deterministic results are
committed and linked; the README states exactly what was evaluated, complexity, commands, observed outcome, limitations,
and the distinction between runtime success and semantic success.

The current suite has three non-trivial cases. Eval 1 applies an ordinary legal notice period and an evidenced expedited
exception across compliant and violating cases. Eval 2 tests a universal scientific claim, finds a concrete counterexample,
and separately computes descriptive statistics. Eval 3 reconciles timelines and terminology across three documents and
retains rather than hides two conflicts. Unit tests execute every committed circuit against its source data and compare exact
outcomes; the HTML index exposes all inputs, circuits, results, and READMEs.

Documentation verification regenerates `docs/specs/matrix.md`, requires contiguous DS numbers, validates local links, and
checks Mermaid availability on every HTML page. Matrix links must remain relative to preserve arbitrary static mount prefixes.
`npm run check` combines unit tests and documentation checks. Skill folders must pass the skill-creator validator.

The complete hash of files under `sop_lang_circuits_design_specs_v1/` must remain unchanged across initialization work. The integrity suite must compare the deterministic aggregate against the captured initial hash on every test run.

## Decisions & Questions

### Question #1: Why do eval cases not replace unit tests?

Response: Coding-agent outputs may depend on agent versions and user configuration, while parser, compiler, and runtime semantics require deterministic, fast regression tests.

### Question #2: Does a `SUCCEEDED` runtime outcome prove the domain conclusion?

Response: No. It proves the explicit circuit executed successfully. Each eval separately states the semantic verdict and the
rules and evidence under which that verdict is valid; future Assurance Core would enforce the stronger acceptance gates.

## Conclusion

The project is verifiable at the deterministic kernel layer and prepared for repeatable agent-level evaluations using the same workspace topology as real tasks.
