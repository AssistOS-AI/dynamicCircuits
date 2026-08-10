---
id: DS017
title: Goals, Invariants, Assurance Profiles, and Acceptance
status: active
owner: repository
summary: Defines local checks, blocking invariants, task goals, assurance profiles, and the complete acceptance gate sequence.
---

# DS017 Goals, Invariants, Assurance Profiles, and Acceptance

## Introduction

Technical execution and task acceptance are separate decisions. Checks validate local command output, invariants protect
circuit-wide conditions, goals state requested outcomes, and an assurance profile decides which evidence is sufficient.

This specification evaluates execution evidence from DS013 and closure evidence from DS016 under the trust model in DS018.
Its accepted or classified outcome becomes part of the final receipt specified by DS019.

## Core Content

### Obligations

A node `check` is a pure predicate over that node's outputs and rejects the node when false. An invariant is a named,
versioned predicate over declared wires or facts; blocking invariants prevent publication, while diagnostic invariants only
annotate receipts. A goal identifies a proposition or output, its verifier, required trust, evidence policy, and whether
unknown or conflicting evidence is permitted. Passing a check is not proof of a goal unless the goal explicitly cites it.

Profiles declare strictness, mandatory matcher sets, minimum trust per command class, permitted effects and capabilities,
resource budgets, cache/replay policy, conflict policy, required receipt level, oracle policy, and publication rules. The
profile is immutable for an attempt and its canonical hash appears in all assurance receipts.

### Acceptance gates

Acceptance requires all seven gates:

1. compilation and static validation succeed;
2. every required node and circuit completes without refusal, error, or blocked dependency;
3. mandatory closure reaches a verified fixed point;
4. all blocking checks and invariants pass;
5. every goal is verified by an allowed verifier;
6. trust, capability, budget, conflict, and profile policies pass; and
7. the final receipt is complete, canonical, and publishable.

Failure classification remains precise: malformed program is `ERROR`; unmet precondition is `REFUSED`; false check,
invariant, or goal is `REJECTED`; unresolved conflict, unknown matcher, or exhausted budget is `INCONCLUSIVE`. Only all-gate
success is `ACCEPTED`.

### Current subset

The current runtime supports local node checks, circuit invariants, typed result categories, receipts, and registry-relative
mandatory closure. It does not yet implement first-class profiles, goal verifier packages, trust policy, or final acceptance certificates. Eval cases
therefore report both technical runtime outcome and their explicit semantic verdict instead of overstating assurance.

### Operational example

A scientific circuit executes successfully and returns verdict `REFUTED`. Its local goal verifies that witness `-2` occurs
in the dataset and is non-positive. A future strict profile would additionally require complete observation coverage, a
trusted verifier package, permitted resources, and a complete final receipt before accepting the task result.

## Decisions & Questions

### Question #1: Why are goals not ordinary boolean outputs?

Response: A goal includes who verified the claim, under which policy, against which evidence and epoch. A bare boolean
cannot carry or enforce that contract.

### Question #2: May a diagnostic invariant block publication?

Response: Not by itself. Profiles may promote it to blocking status, but that decision must be explicit and receipt-bound.

## Conclusion

Acceptance is a policy-bound evidence judgment reached only after computation, closure, verification, trust, and receipt
gates have all succeeded.
