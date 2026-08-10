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

`npm test` must execute modular unit suites for parser syntax, compiler graph validation, runtime outcomes and nesting, workspace preparation and non-destructive behavior, and coding-agent invocation construction. Tests must cover successful and failing paths, including bare arguments, free wires, arity mismatch, dead nodes, refusal, failed checks, exceptions, false invariants, symlink creation, user-owned guidance, and generic adapter extension.

Every evaluation case must live under a contiguous `eval/evalN/` directory and contain `input/`, `results/`, and `sop/` plus the same `circuitSkills` link created for production workspaces. Eval inputs and circuits must be committed; generated result reports may remain empty until a coding-agent evaluation is executed. Each case must state its purpose and reproducible compile or run command.

Documentation verification must regenerate `docs/specs/matrix.md`, require contiguous DS numbers, validate local links, and check Mermaid availability on every HTML page. `npm run check` must combine unit tests and documentation checks. Skill folders must pass the skill-creator validator.

The complete hash of files under `sop_lang_circuits_design_specs_v1/` must remain unchanged across initialization work. Future CI should persist the expected aggregate hash as an integrity assertion.

## Decisions & Questions

### Question #1: Why do eval cases not replace unit tests?

Response: Coding-agent outputs may depend on agent versions and user configuration, while parser, compiler, and runtime semantics require deterministic, fast regression tests.

### Question #2: What does an empty eval results directory mean?

Response: It means the reproducible case is prepared but has not been run by a coding agent. Committed expected behavior belongs in the case contract, not in fabricated agent reports.

## Conclusion

The project is verifiable at the deterministic kernel layer and prepared for repeatable agent-level evaluations using the same workspace topology as real tasks.
