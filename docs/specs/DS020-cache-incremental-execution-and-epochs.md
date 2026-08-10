---
id: DS020
title: Cache, Incremental Execution, and Epochs
status: active
owner: repository
summary: Defines semantic cache keys, invalidation, epoch snapshots, incremental closure, and tamper-resistant reuse.
---

# DS020 Cache, Incremental Execution, and Epochs

## Introduction

Caching is an assurance-sensitive reuse decision. A result is reusable only when every semantic dependency that could
change it is represented in the key and the stored receipt remains acceptable under the active profile.

This specification uses canonical identities from DS010–DS012 and receipt evidence from DS019. It supplies incremental
execution to the scheduler in DS013 and scalable document/registry processing in DS021.

## Core Content

### Cache identity

A pure node key includes command identity and code digest, package and dependency lock, canonical input digests,
configuration, relevant environment declaration, profile-sensitive semantics, interpreter/runtime version, and epoch-bound
oracle or registry inputs. Circuit keys add compiled IR digest, bindings, relevant slice, invariant versions, child instance
keys, and closure dependencies. Effectful commands are non-cacheable unless an explicit idempotency and replay contract
exists.

A hit must load value plus original receipt, verify digests and trust status, and emit a new receipt that cites the origin.
Cache entries are immutable content-addressed objects. Poisoned, unsigned where signatures are required, revoked, schema-
incompatible, or policy-inadequate entries are misses and audit events.

### Epochs and invalidation

An epoch snapshots sources, package registry, matcher/template sets, assurance profile, configuration, and external oracle
versions. Changes create a new epoch. The dependency graph invalidates only affected interpretations, facts, matches,
instances, nodes, goals, and receipts, while retaining safe predecessors for comparison or reuse.

Incremental closure starts from changed fact families and their dependent matchers but must converge to the same fixed point
as a full strict run for that snapshot. Deletion or non-monotone correction requires stratum recomputation. Book-scale work
uses artifact and section digests so unchanged chapters need not be reinterpreted; cross-section synthesis depends on their
published semantic summaries rather than hidden mutable state.

### Operational controls

Caches need quotas, garbage collection that respects receipt references, namespace separation between trust domains,
atomic writes, lock or compare-and-swap publication, checksum verification, and observability for hit, miss, invalidation,
and reuse decisions. Cache reuse never upgrades a prior trust level.

The current implementation computes deterministic canonical values but has no persistent cache or epoch manager.

### Operational example

Editing chapter 2 changes its source digest. The cache invalidates chapter 2 interpretation, facts depending on it, matcher
outcomes using those facts, cross-chapter synthesis, and the final receipt. Chapter 1 interpretation remains reusable when
its package, inputs, profile-sensitive dependencies, and trust status are unchanged.

## Decisions & Questions

### Question #1: Why can profile changes invalidate a pure numeric result?

Response: The arithmetic may remain equal, but acceptance, verifier, precision, implementation, or trust requirements can
alter whether that result is admissible evidence.

### Question #2: Is a cache hit equivalent to a fresh run?

Response: Only under a declared replay policy and verified semantic key; the new receipt must still disclose reuse.

## Conclusion

Epoch-scoped semantic keys make incremental work efficient without hiding the exact assumptions under which it was reused.
