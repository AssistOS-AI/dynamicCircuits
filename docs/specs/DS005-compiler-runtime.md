---
id: DS005
title: Compiler and Runtime
status: active
owner: repository
summary: Specifies compilation phases, graph validation, sandboxed command execution, outcomes, and deterministic receipts.
---

# DS005 Compiler and Runtime

## Introduction

The reference kernel converts SOP packages into an explicit graph and executes only the dependency slices required by public outputs and assurance declarations.

This specification consumes the syntax, wire, command, and package contracts from DS004 and DS010–DS012. Its outputs feed
runtime receipts in DS019 and the higher-level acceptance process in DS017.

## Core Content

The registry must discover `.sop` files deterministically, skip symbolic links, derive package names, parse sources, and reject collisions. Compilation must resolve local commands, core commands, qualified commands, and circuit packages. It must validate single assignment, free wires, command and circuit arity, declared outputs, coverage reachability, and graph acyclicity.

Compilation phases are discovery, parse, declaration collection, name resolution, wire binding, arity and interface checks,
dependency construction, cycle detection, obligation reachability, relevant-slice marking, normalization, and hashing. A
failure stops before execution and uses a stable classification and source location. Compiled packages expose stable package
hashes, ordered ports, command descriptors, topologically ordered nodes, resolved callee records, canonical arguments,
goals, invariants, template metadata, and dead-node markers. Nodes outside all output, goal, and invariant slices do not run.

The runtime binds inputs by order, validates canonical types, deep-freezes values, executes nested circuits with separate
instance identities, and prevents failed child outputs from reaching a parent. Values created in a VM realm are copied into
host-owned canonical arrays or prototype-safe objects before freezing and hashing; non-finite numbers, cycles, unsupported
types, getters, symbols, and exotic prototypes are rejected. JavaScript definitions and calls run in a Node `vm` context
with string and WebAssembly code generation disabled and a synchronous timeout. No process, module loader, filesystem,
network, clock, random, or oracle capability is supplied.

A command may succeed, return a structured core refusal, refuse through `ctx.reject`, fail its `check`, or raise an error.
The scheduler records `PENDING`, `RUNNING`, `SUCCEEDED`, `REFUSED`, `REJECTED`, `ERROR`, `BLOCKED`, and dead-node evidence as
applicable. Base-circuit outcomes distinguish `SUCCEEDED`, `REFUSED`, `REJECTED`, and `ERROR`; the mandatory-closure wrapper
also returns `INCONCLUSIVE` when a matcher or configured closure budget prevents a completeness claim. Caching and
cancellation are specified by DS013. A rejected or failed circuit exposes no successful public outputs. Receipts include
package and instance identity, node states, source lines, input/output hashes, checks, child receipts, dead nodes, and a
deterministic receipt hash.

Nested calls are ordinary graph nodes: their input arity equals child ports, their output arity equals child outputs, and
their receipt is embedded or hash-linked. Resolution never depends on discovery order. Runtime iteration follows the
compiler's topological order, so independent-node source reordering cannot change pure results or receipt semantics.

The `vm` boundary is a reference-development guard, not a production security sandbox. Asynchronous resource limits,
worker isolation, runtime memoization, content-addressed cross-machine caching, effects, persistent semantic indexes,
richer matcher predicates, and trust-profile enforcement remain unsupported. The implemented in-memory index and bounded
mandatory closure operate over explicit publications and loaded reviewed matchers. DS003's timestamp-based workspace invalidation is a CLI orchestration
optimization: it skips whole agent/executor stages when the existing report is newer than their file dependencies. It does
not cache nodes, values, or receipts inside the runtime.

For workspace analysis, the CLI registers `KB/circuits` with prefix `kb`, registers `WORK/sop` without a prefix, compiles
the fixed no-input package `task.analysis`, executes it, closes every loaded mandatory matcher instance, and renders
`WORK/results/runtime-result.md`. The renderer copies public output values, output hashes, goal and invariant checks,
root-node statuses, child receipt hashes, package hash, and receipt hash. When closure is active it also copies matcher
count, rounds, publications, expected/executed/missing instance sets, the closure receipt hash, and the actual outputs of
every automatically applied target. It performs no semantic summarization. Multiline string outputs are preserved as text blocks. An unsuccessful
runtime still yields its available executor report before the CLI returns a classified analysis failure.

### Operational example

If output `report` depends on nodes `parse`, `applyRule`, and `format`, those nodes execute in topological order. An unrelated
debug node is marked `DEAD`. If `applyRule` refuses, `format` does not run, no public report is returned, and the receipt
preserves the refusal and completed predecessor evidence.

## Decisions & Questions

### Question #1: Why execute only relevant slices?

Response: Dead-node elimination follows the historical SSA model, limits unintended effects, and makes receipts correspond to the obligations that produced observable results.

### Question #2: Why explicitly narrow the sandbox guarantee?

Response: Node `vm` can remove ambient globals and bound synchronous evaluation, but production-grade hostile-code isolation also requires workers or processes, memory budgets, and asynchronous cancellation that are not implemented yet.

### Question #3: Why render Markdown instead of committing a runtime JSON fixture?

Response: Canonical values and receipt hashes remain the executor evidence; Markdown makes those exact values statically
browsable without introducing a hand-authored or agent-authored result object. Machine consumers can invoke `sop run`
directly, while evaluation documentation compares a separate expectation document with the executor-owned report.

### Question #4: What does a closed mandatory receipt prove?

Response: It proves equality between expected and executed instances for the compiled reviewed matcher registry and
semantic publications in that run. It does not prove that the registry contains every real-world rule or that an external
trust profile accepts those packages.

## Conclusion

The kernel provides deterministic reference semantics and structured diagnostics for the implemented milestone without claiming the assurance and isolation guarantees reserved for later work.
