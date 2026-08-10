---
id: DS024
title: Implementation Roadmap and Module Boundaries
status: active
owner: repository
summary: Defines staged delivery from deterministic kernel to assurance, scale, and hardened operation without collapsing module boundaries.
---

# DS024 Implementation Roadmap and Module Boundaries

## Introduction

The roadmap delivers the parser, compiler, runtime, agent workspaces, persistent evidence, semantic registry, assurance
engine, security isolation, and distributed processing as separate milestones. Every milestone has explicit module
boundaries and testable exit requirements.

This specification orders the contracts in DS004 through DS023. It prevents a planned feature from being documented as
current behavior and prevents one implementation shortcut from merging parser, runtime, agent orchestration, or assurance
policy into an interface that later milestones cannot replace.

## Core Content

### Module boundaries

The lexical/parser layer produces source-spanned AST; the compiler resolves packages and emits normalized graph IR; the
runtime schedules only the relevant slice and emits node/circuit receipts; the standard library supplies deterministic
commands; workspace and agent adapters prepare external coding-agent runs; documentation and evals expose contracts. Future
modules add artifact storage, semantic index, registry, matcher engine, closure engine, profiles/goals, trust, cache/epochs,
final receipt service, and capability brokers. No layer may reach backward into mutable internals of another.

### Milestones

The inherited roadmap is preserved as eleven incremental milestones:

0. freeze terminology, syntax, schemas, examples, and conformance expectations;
1. implement lexer, parser, diagnostics, and formatter-ready AST;
2. implement packages, resolution, SSA, normalized IR, and static validation;
3. implement deterministic graph runtime, refusal, checks, invariants, nested circuits, and receipts;
4. provide Core commands and filesystem package discovery;
5. prepare safe KB/workdir topology and coding-agent adapters;
6. add artifacts, persistent receipts, attempts, replay, and semantic cache;
7. add template metadata, registry, semantic facts, matchers, and automatic wiring;
8. add mandatory closure, assurance profiles, goals, trust, conflicts, and acceptance certificates;
9. add capability isolation, brokers, hardened workers, signatures, redaction, and operational controls; and
10. add sharding, distributed execution, large-document pipelines, scale benchmarks, and governance tooling.

Milestones 1–5 have useful implemented subsets in this repository; none is declared complete merely by its presence. Each
milestone exits only with public contracts, negative tests, receipt behavior, migration notes, documentation, and a threat
review proportionate to its authority.

### Compatibility and governance

Source, IR, receipt, profile, and package schemas evolve independently with declared versions. Breaking semantic changes
require explicit migration or rejection. Generated files remain reproducible. Historical `sop_lang_circuits_design_specs_v1/`
is immutable evidence; current DS files are the maintained authority.

Operational example: semantic matching is a milestone-7 feature. Adding matcher metadata to the parser is not enough to
declare it implemented. The registry query, deterministic tri-state matcher, automatic circuit wiring, receipts, negative
tests, documentation, and migration behavior must all exist at their declared module boundaries before the milestone can
be presented as executable.

## Decisions & Questions

### Question #1: Why implement coding-agent orchestration before full Assurance Core?

Response: It enables practical document analysis and circuit learning around a deterministic kernel while keeping agents
outside the runtime and all stronger assurance claims visibly planned.

### Question #2: What is the exit condition for a milestone?

Response: Observable conformance, documentation, failure behavior, and migration boundaries—not feature code alone.

## Conclusion

The roadmap grows capability in auditable layers and prevents aspirational design from being mistaken for shipped behavior.
