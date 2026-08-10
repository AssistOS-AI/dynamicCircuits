---
id: DS019
title: Receipts, Provenance, and Audit
status: active
owner: repository
summary: Defines canonical node, circuit, closure, and final receipts; provenance chains; replay; privacy; and audit queries.
---

# DS019 Receipts, Provenance, and Audit

## Introduction

Receipts are machine-verifiable execution evidence. They explain what ran, on which exact inputs and code, under which
policy and epoch, and why the outcome was accepted, rejected, refused, inconclusive, or erroneous.

## Core Content

### Receipt hierarchy

A node receipt records attempt, epoch, node and command identity, package version and digest, canonical input and output
digests, source spans, start/end or duration, state, refusal or error classification, check evidence, effects, capabilities,
artifacts, oracle calls, cache origin, and parent dependencies. A circuit receipt adds interface bindings, relevant slice,
node receipt hashes, outputs, invariants, child instances, and outcome.

A closure receipt commits to registry, matcher, template, profile, and semantic-index snapshots; each round's considered
matchers and outcomes; expected and executed instance sets; limits; and fixed-point result. A final receipt binds sources,
interpretations, attempt lineage, root circuit, goals, trust decisions, conflicts, budgets, closure, acceptance gates, and
publication artifacts.

### Canonical form and provenance

Canonical serialization uses UTF-8, stable object-key ordering, normalized arrays and numbers, explicit content digests,
and no ambient paths or unstable timestamps inside identity hashes. Large values are content-addressed artifacts with MIME
type, size, digest, locator, and redaction metadata. Every derived value traces through node inputs to source artifacts and
locators; cached values cite the original receipt.

Receipts may be signed or transparency-logged. Redaction replaces sensitive fields with commitments while retaining a
separately controlled disclosure mapping. Secrets, raw credentials, and unrestricted environment snapshots must never be
embedded. Retention and access policy are profile-controlled.

### Replay and audit

Exact replay requires identical digests, versions, profile, epoch inputs, capabilities, and deterministic oracle records.
Verified replay may rerun only validators against stored values; explanatory replay reconstructs the graph without claiming
fresh execution. Auditors must be able to query which source supported an output, why a template matched, which mandatory
instances ran or did not run, where a value was produced, what changed between attempts, and whether a cache entry was valid.

The current runtime emits deterministic in-memory receipts for nodes, circuits, dead nodes, checks, invariants, and errors.
Persistent schemas, closure/final receipts, signing, artifact storage, lineage, and replay commands are planned.

## Decisions & Questions

### Question #1: Why hash canonical content rather than filesystem paths?

Response: Paths vary across machines and can be rebound. Content digests identify the evidence that actually participated.

### Question #2: Can redacted evidence still be audited?

Response: Commitments preserve integrity and selective disclosure can reveal authorized fields, but a verifier that needs
hidden semantics must report insufficient evidence rather than assume them.

## Conclusion

Receipts turn a transient run into a durable, replayable evidence graph while preserving explicit privacy and trust limits.
