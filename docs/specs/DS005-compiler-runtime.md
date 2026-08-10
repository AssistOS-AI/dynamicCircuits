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
applicable. Circuit outcomes distinguish `SUCCEEDED`, `REFUSED`, `REJECTED`, and `ERROR`; planned `INCONCLUSIVE`, caching,
and cancellation are specified by DS013. A rejected or failed circuit exposes no successful public outputs. Receipts include
package and instance identity, node states, source lines, input/output hashes, checks, child receipts, dead nodes, and a
deterministic receipt hash.

Nested calls are ordinary graph nodes: their input arity equals child ports, their output arity equals child outputs, and
their receipt is embedded or hash-linked. Resolution never depends on discovery order. Runtime iteration follows the
compiler's topological order, so independent-node source reordering cannot change pure results or receipt semantics.

The `vm` boundary is a reference-development guard, not a production security sandbox. Asynchronous resource limits, worker isolation, persistent caching, effects, semantic indexes, mandatory closure, and trust-profile enforcement remain unsupported.

## Decisions & Questions

### Question #1: Why execute only relevant slices?

Response: Dead-node elimination follows the historical SSA model, limits unintended effects, and makes receipts correspond to the obligations that produced observable results.

### Question #2: Why explicitly narrow the sandbox guarantee?

Response: Node `vm` can remove ambient globals and bound synchronous evaluation, but production-grade hostile-code isolation also requires workers or processes, memory budgets, and asynchronous cancellation that are not implemented yet.

## Conclusion

The kernel provides deterministic reference semantics and structured diagnostics for the implemented milestone without claiming the assurance and isolation guarantees reserved for later work.
