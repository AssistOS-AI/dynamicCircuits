---
id: DS023
title: Conformance Tests and Benchmarks
status: active
owner: repository
summary: Defines language, runtime, assurance, security, agent, domain, and scale conformance plus representative benchmarks.
---

# DS023 Conformance Tests and Benchmarks

## Introduction

Conformance tests exercise observable language, runtime, workspace, assurance, and security contracts. Benchmarks report
execution throughput together with provenance, closure, receipt, storage, and verification costs.

This specification extends the implemented repository suite defined by DS007. DS007 records tests and evals that must pass
now; this document defines the additional methods and measurements required as semantic matching, closure, persistent
evidence, and distributed execution become executable.

## Core Content

### Conformance layers

The suite covers lexical/parser rules, declarations and directives, SSA and arity validation, resolution, normalized IR,
topological execution, refusal/error/block propagation, nested circuits, checks and invariants, canonicalization, receipts,
workspace safety, agent adapter construction, and CLI mode inference. Historical-source integrity and documentation links
are repository conformance requirements.

Current matching conformance covers dotted-key validation, metadata completeness, restricted matcher commands, trigger/select
agreement, duplicate suppression, multi-record enumeration, equality joins, no-match behavior, multi-round fixed points,
target failure, closure budgets, and expected-versus-executed audits. Future Assurance Core conformance adds explicit
matcher tri-state behavior, deterministic ranking, goals, profiles, trust/revocation, conflicts, cache invalidation, epoch replay,
capability enforcement, signed artifacts, budget-driven inconclusive outcomes, and final certificates.

Test methods include example vectors, parser and canonicalization fuzzing, property tests over graph transformations,
metamorphic tests such as independent-node reordering, differential implementations for critical commands, mutation tests,
adversarial packages and documents, and failure injection at every receipt boundary. Security cases cover traversal,
symlink escape, prototype pollution, prompt injection, capability escalation, oversized outputs, regex denial of service,
secret exposure, cache poisoning, and forged receipts.

### Domain evals and benchmarks

Evaluation cases must include more than arithmetic smoke tests: legal exception application, scientific claim falsification,
cross-document temporal or terminology consistency, incomplete evidence, conflicting authorities, and refusal paths. Each
publishes exact inputs, rules, circuits, expected semantic verdict, actual deterministic result, and limitations.

Benchmarks report graph size, compile time, relevant-slice ratio, runtime, critical path, memory, receipt bytes, cache hit
rate, invalidated fraction, registry candidates, closure rounds, matcher coverage, artifact bytes, and cost. Suggested scales
range from hundreds of nodes and facts through book-sized corpora and million-entry registries. Approximate and strict modes
must be reported separately.

Current repository coverage and eval results are specified in DS007 and `docs/eval/`; planned cases here are not counted as
implemented until automated.

Operational example: a graph-order metamorphic test swaps two independent nodes and requires identical public outputs and
canonical receipt meaning. A closure benchmark for a future release must additionally report candidate count, matcher
coverage, fixed-point rounds, and receipt bytes; reporting only wall-clock time would hide the cost of completeness.

## Decisions & Questions

### Question #1: Why benchmark receipt size and closure work?

Response: Assurance is part of the product cost. Ignoring its storage and computation would optimize an incomplete system.

### Question #2: Why require adversarial domain documents?

Response: Clean happy paths do not expose ambiguity, missing prerequisites, conflicting claims, or instruction injection—the
conditions where an assurance design matters most.

## Conclusion

Conformance protects portable meaning; benchmarks reveal the explicit performance price and scaling behavior of evidence.
