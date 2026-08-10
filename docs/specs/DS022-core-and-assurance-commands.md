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

This specification supplies the commands used by the language in DS004 and the runtime in DS005. Domain rules such as a
30-day notice policy remain generated or reviewed SOP packages; Core supplies only reusable mechanics such as parsing a
finite number, comparing two values, building a list, and reporting a failed invariant.

## Core Content

### Implemented Core

The reference runtime currently provides `value`, `absent`, `alias`, `get`, `hash`, `equal`, `compare`, `parseNumber`,
`assertInvariant`, `emptyList`, `append`, `concat`, `publish`, `select`, `bind`, `join`, and `distinct`. The first family
covers literal/wire forwarding, explicit absence, JSON Pointer or dot-path lookup, canonical hashing/equality, six
comparison operators, strict finite-number parsing, invariant result construction, and immutable lists. The matching family
creates semantic publication records, selects index entries by exact dotted key, converts entries to handle tuples, joins
two entry sets by equal JSON-pointer values, and removes duplicate tuples. Invalid operands return structured refusals.
User commands cannot shadow Core names.

Core contracts require deterministic behavior, no ambient I/O, explicit refusal for unmet preconditions, finite canonical
numbers, prototype-safe object handling, stable error classifications, and conformance vectors. Object and array values
crossing the VM boundary are normalized into host canonical values before freezing and hashing.

### Planned Core families

Portable additions include artifact read/write through handles, structured parsing, selectors, collection transform/filter/
reduce, sorting and grouping, set operations, string and regex operations with limits, date/time and unit normalization,
decimal arithmetic, comparison with tolerance, hashing, provenance attachment, and deterministic report assembly. Unsafe
filesystem, network, process, clock, randomness, and environment access are never ordinary Core commands.

### Implemented matching substrate and planned Assurance Core

Semantic publication, exact query, binding, equality join, instance registration, and mandatory closure are implemented by
the matching Core plus the closure engine. Broader Assurance commands manage candidate retrieval, richer matcher evaluation,
goal and invariant verification, trust lookup, conflict adjudication, receipt finalization,
signature or certificate verification, cache validation, artifact commitments, and acceptance decisions. Their inputs always
include or inherit the immutable epoch and profile; their outputs are evidence records, not unqualified booleans.

Standard-library evolution is versioned. New commands need positive, negative, refusal, boundary, determinism, canonical,
security, and receipt tests; semantic changes require a new version rather than silent replacement.

Operational example: a notice circuit passes the source string `"30"` to `parseNumber`, compares the parsed value with the
observed days, and appends the finding to a result list. Core defines the exact parsing, comparison, and list behavior. The
notice circuit—not Core—defines why 30 is required and when an exception applies.

## Decisions & Questions

### Question #1: Why keep the implemented library small?

Response: A compact deterministic kernel is easier to audit and test; specialized semantics belong in discoverable,
versioned circuit packages.

### Question #2: Why may user code not shadow Core names?

Response: Shadowing would make source meaning resolution-order dependent and could replace trusted primitives invisibly.

## Conclusion

Core is the portable deterministic substrate. Its implemented matching primitives support registry-relative mandatory
closure; planned Assurance Core adds the policy and trust gates needed for qualified acceptance evidence.
