---
id: DS022
title: Standard Core and Assurance Commands
status: active
owner: repository
summary: Defines the portable command families, their behavioral contracts, and the boundary between implemented Core and planned Assurance Core.
---

# DS022 Standard Core and Assurance Commands

## Introduction

A small standard library gives circuits portable primitives while keeping domain knowledge in versioned packages. Core
commands implement deterministic graph mechanics; Assurance Core implements policy and evidence mechanics.

## Core Content

### Implemented Core

The reference runtime currently provides `identity`, `const`, `concat`, `equals`, `not`, `and`, `or`, `add`, `subtract`,
`multiply`, `divide`, `length`, `get`, `array`, `object`, `mapGet`, and `assert`. Implementations validate arity and value
shape, return canonical data, refuse invalid division or failed assertions with structured codes, and emit receipts. User
commands cannot shadow these names.

Core contracts require deterministic behavior, no ambient I/O, explicit refusal for unmet preconditions, finite canonical
numbers, prototype-safe object handling, stable error classifications, and conformance vectors. Object and array values
crossing the VM boundary are normalized into host canonical values before freezing and hashing.

### Planned Core families

Portable additions include artifact read/write through handles, structured parsing, selectors, collection transform/filter/
reduce, sorting and grouping, set operations, string and regex operations with limits, date/time and unit normalization,
decimal arithmetic, comparison with tolerance, hashing, provenance attachment, and deterministic report assembly. Unsafe
filesystem, network, process, clock, randomness, and environment access are never ordinary Core commands.

### Planned Assurance Core

Assurance commands manage semantic fact publication and query, candidate retrieval, matcher evaluation, instance
registration, mandatory closure, goal and invariant verification, trust lookup, conflict adjudication, receipt finalization,
signature or certificate verification, cache validation, artifact commitments, and acceptance decisions. Their inputs always
include or inherit the immutable epoch and profile; their outputs are evidence records, not unqualified booleans.

Standard-library evolution is versioned. New commands need positive, negative, refusal, boundary, determinism, canonical,
security, and receipt tests; semantic changes require a new version rather than silent replacement.

## Decisions & Questions

### Question #1: Why keep the implemented library small?

Response: A compact deterministic kernel is easier to audit and test; specialized semantics belong in discoverable,
versioned circuit packages.

### Question #2: Why may user code not shadow Core names?

Response: Shadowing would make source meaning resolution-order dependent and could replace trusted primitives invisibly.

## Conclusion

Core is the portable deterministic substrate; Assurance Core is the planned policy substrate that turns executions into
qualified acceptance evidence.
