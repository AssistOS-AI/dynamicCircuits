---
id: DS010
title: Values, Wires, SSA, and Circuit Composition
status: active
owner: repository
summary: Specifies canonical values, registered handles, immutable local wires, slices, interfaces, nesting, and composition.
---

# DS010 Values, Wires, SSA, and Circuit Composition

## Introduction

The executable graph uses static single assignment (SSA) to make dependencies complete, scheduling deterministic, and
provenance traversable across nested circuit instances.

This specification connects surface calls from DS004 to compiler dependency analysis in DS012 and runtime scheduling in
DS013. Canonical values also provide the identity inputs used by receipts and caches in DS019–DS020.

## Core Content

### Wire production and scope

A wire may be produced by an `@input`, a command call, a circuit call, a core operation, or a child-output alias. It must
have at most one producer and may never be reassigned. Every `$wire` must resolve to a local producer or ordered input.
There are no cross-file wire references, implicit captures, globals, `$package.wire`, or `$instance.output` expressions.

Inputs are controlled free variables and are immutable for an instance. A different input value creates a different
instance or epoch. A parent supplies every child input explicitly and receives only the child's declared outputs. The
runtime creates hygienic internal identities so repeated child instances may reuse the same local source names safely.

### Value model

Canonical values comprise strings, booleans, finite numbers, null, arrays, plain string-keyed objects, artifact references,
and internal wire handles. Canonical serialization must sort object keys, represent intentional undefined explicitly,
normalize numbers, and reject functions, open streams, sockets, or unstable identities.

Registered handles represent large or external objects such as files, datasets, database snapshots, solver sessions, or
packages. A handle must carry kind, stable identity, version or content hash, capability policy, and a receipt encoder.
Handle-backed behavior is planned; the present runtime implements canonical values and rejects non-canonical outputs.

Values exposed to consumers must be immutable. The reference runtime normalizes plain objects and arrays across JavaScript
realms and deep-freezes them. A production implementation may use copy-on-write or process isolation while preserving the
same observable immutability.

### Graphs, slices, and dead nodes

Each call is a node and wires are dependency edges. Required output, goal, invariant, and mandatory-publication slices must
be acyclic. Semantic repetition belongs inside a fixpoint command, mandatory closure, or a later attempt rather than a raw
wire cycle.

The dependency slice of a wire is the minimum set of inputs and nodes required to produce it. The runtime must be able to
derive slices for outputs, assurance declarations, publications, and diagnostics. Nodes outside every required slice are
dead and must not execute implicitly; tooling should report them.

### Interfaces and calls

`@input` and `@output` order are public API. Command calls have one output, may omit trailing formals, and reject surplus
arguments. Circuit calls bind exactly all ordered inputs and exactly all ordered outputs. A circuit can expose multiple
outputs; a command that produces a record can be decomposed with `get`. Inputs may pass through directly as outputs or be
renamed with `alias` when distinct provenance is useful.

Child refusal, rejection, or error must block public child outputs. Receipts may retain internal diagnostics but callers
must never consume a partial failed result. Direct and mutual recursion are unsupported unless a future explicit fixpoint
backend defines their semantics.

### Operational example

A parent circuit passes wire `policy` into two child instances. Each child uses its own local wire names and returns only its
declared outputs. Reassigning `policy` or reading a child's internal `deadline` wire is invalid; the parent must receive the
deadline through an ordered child output.

## Decisions & Questions

### Question #1: Why keep wires local when internal identities are global?

Response: Local names keep source readable; package hash, instance identity, producer node, and epoch supply collision-free
runtime identity without exposing fragile child internals.

### Question #2: Is adding a trailing circuit input backward compatible?

Response: No. Circuit arity is strict and positional, so ordered port changes require a new interface version. Renaming a
port without reordering preserves mechanical binding but should still be treated as a documented breaking semantic change.

## Conclusion

Explicit immutable wiring is the foundation for deterministic compilation, safe nesting, precise invalidation, and
source-to-output audit.
