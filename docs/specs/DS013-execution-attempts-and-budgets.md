---
id: DS013
title: Execution, Scheduling, Attempts, and Budgets
status: active
owner: repository
summary: Defines relevant-slice scheduling, node and circuit states, refusal propagation, immutable attempts, retries, and budgets.
---

# DS013 Execution, Scheduling, Attempts, and Budgets

## Introduction

Execution evaluates the required slice of a compiled graph and returns a classified technical outcome. Assurance evaluates
semantic acceptance separately. Immutable attempts record repairs, while budgets bound time, resources, instances, and
external work.

## Core Content

### Root set and scheduling

The execution root set comprises root outputs, goals, blocking invariants, mandatory publications, and mandatory instance
obligations. Only their dependency slices execute. Nodes become ready after all dependencies succeed or are valid cache
hits. Independent pure nodes may run in parallel; effectful nodes require capability-aware serialization.

The complete state model includes `PENDING`, `READY`, `RUNNING`, `SUCCEEDED`, `CACHED`, `REFUSED`, `CHECK_FAILED`, `ERROR`,
`BLOCKED`, and `CANCELLED`. Circuit outcomes distinguish `SUCCEEDED`, `REFUSED`, `REJECTED`, `INCONCLUSIVE`, and `ERROR`.
The reference runtime implements topological relevant-slice execution and success, refusal, rejection, error, and dead-node
receipts; parallel scheduling, cached nodes, cancellation, and inconclusive budgets are planned.

Refusal blocks all dependent nodes and public outputs. Receipts must preserve the refusal code, details, source span, and
blocked obligations. Check or invariant failure is semantic rejection; an exception is technical error. Partial child
values may aid diagnostics but cannot be exposed as successful parent outputs.

### Attempts and repair

An attempt is immutable after execution, especially after acceptance. Repair creates a child attempt with parent reference,
changed packages, and a change summary. An agent classifies parse/wiring, refusal, missing rule, failed check, failed
invariant, closure, goal, trust, receipt, conflict, or budget failure; applies the minimum semantic change; recompiles; and
compares receipts. It must not edit the active assurance profile or prior receipts.

The current file-based CLI does not yet implement attempt directories or lineage operations. The planned workspace model
retains source, interpretation, problem packages, immutable numbered attempts, receipts, generated candidates, artifacts,
and cache separately.

### Budgets, retry, checkpoint, and cancellation

Profiles may bound nodes, closure rounds, instances, wall time, memory, outputs, logs, oracle calls, external bytes, and
cost. Exhaustion yields `INCONCLUSIVE`, never acceptance or boolean false. Optional work may execute speculatively only
when policy permits its packages and forbids unsafe writes.

Long tasks should checkpoint completed receipts, semantic index, closure queue, instance set, and budget counters inside
one epoch. Retry must be explicit: transient broker failures may retry with receipts; deterministic exceptions, refusals,
and assurance failures require a new attempt; a larger budget creates a new epoch. Cancellation must preserve safe pure
receipts and handle effectful work transactionally.

## Decisions & Questions

### Question #1: Why are rejected attempts immutable?

Response: Immutability makes diagnosis reproducible, prevents evidence rewriting, and lets later attempts reuse unaffected
interpretations, rule results, and verifier receipts.

### Question #2: Why is budget exhaustion inconclusive?

Response: A limit says the computation did not finish under the active policy. It establishes neither the proposition nor
its negation and therefore cannot be translated into acceptance or rejection.

## Conclusion

Execution provides classified evidence for one immutable attempt; later assurance determines whether that evidence is
sufficient for the task contract.
