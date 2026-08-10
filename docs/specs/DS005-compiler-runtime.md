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

Compiled packages must expose stable package hashes, ordered ports, command descriptors, topologically ordered nodes, goals, invariants, template metadata, and dead-node markers. Nodes outside all output, goal, and invariant slices must not execute.

The runtime must bind inputs by order, deep-freeze canonical values, execute nested circuits with separate instance identities, and prevent failed child outputs from reaching a parent. JavaScript definitions and calls must run in a Node `vm` context with string and WebAssembly code generation disabled and a synchronous timeout. No process, module loader, filesystem, network, clock, random, or oracle capability is supplied.

A command may succeed, refuse through `ctx.reject`, fail its `check`, or raise an error. Circuit outcomes must distinguish `SUCCEEDED`, `REFUSED`, `REJECTED`, and `ERROR`. A rejected or failed circuit must expose no successful public outputs. Receipts must include package and instance identity, node statuses, input and output hashes, assurance checks, child receipts, and a deterministic receipt hash.

The `vm` boundary is a reference-development guard, not a production security sandbox. Asynchronous resource limits, worker isolation, persistent caching, effects, semantic indexes, mandatory closure, and trust-profile enforcement remain unsupported.

## Decisions & Questions

### Question #1: Why execute only relevant slices?

Response: Dead-node elimination follows the historical SSA model, limits unintended effects, and makes receipts correspond to the obligations that produced observable results.

### Question #2: Why explicitly narrow the sandbox guarantee?

Response: Node `vm` can remove ambient globals and bound synchronous evaluation, but production-grade hostile-code isolation also requires workers or processes, memory budgets, and asynchronous cancellation that are not implemented yet.

## Conclusion

The kernel provides deterministic reference semantics and structured diagnostics for the implemented milestone without claiming the assurance and isolation guarantees reserved for later work.
