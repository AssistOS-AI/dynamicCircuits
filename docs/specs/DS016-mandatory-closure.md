---
id: DS016
title: Mandatory Hooks and Fixpoint Closure
status: active
owner: repository
summary: Defines exhaustive mandatory matching, monotone closure, expected-versus-executed audits, and termination controls.
---

# DS016 Mandatory Hooks and Fixpoint Closure

## Introduction

Mandatory closure evaluates every declared mandatory matcher against the semantic facts in one epoch. It creates applicable
circuit instances, indexes their outputs, repeats until no facts or instances are added, and audits the expected instance set
against the executed set.

## Core Content

### Closure algorithm

The Assurance Core snapshots the active profile, package registry, template versions, matcher set, and source epoch. It
indexes initial facts, enumerates every mandatory matcher applicable to the changed fact families, evaluates them, creates
all new instance keys for `MATCH` outcomes, executes their relevant slices, indexes their outputs, and repeats until a round
adds neither facts nor instances.

Closure state is monotone: facts and instance keys may be added, never silently withdrawn, inside an epoch. If negation or
retraction is needed, rules must be stratified and the affected stratum recomputed in a new epoch. Matcher/template pairs
must declare boundedness or a well-founded measure. Profiles cap rounds, instances, facts, and cost; exhausting a cap yields
`INCONCLUSIVE`, not success.

### Completeness audit

At each round the engine records candidate matchers considered, outcomes, bindings, created instances, deduplicated
instances, refusals, errors, and new facts. Before acceptance it recomputes or verifies the expected mandatory instance set
against the executed set. Missing, extra-unexplained, failed, blocked, or unknown mandatory instances fail closure.

The audit distinguishes discovery completeness from successful execution. A matcher timeout cannot be treated as
`NO_MATCH`; an unresolved prerequisite remains `UNKNOWN`; optional templates cannot satisfy mandatory obligations unless
the profile explicitly upgrades them.

### Operational consequences

Closure may be incremental by dependency keys, but strict acceptance must be equivalent to exhaustive evaluation for the
same snapshot. Parallel rounds are valid only when deterministic merge and duplicate suppression preserve that result.
Receipts commit to registry and profile hashes so later changes cannot retroactively alter what “all mandatory rules” meant.

The current runtime executes an explicit finite graph and has no matcher registry or closure engine. This document is the
normative target for the planned Assurance Core, not a claim about current implementation.

## Decisions & Questions

### Question #1: Why is an expected-versus-executed comparison necessary?

Response: A list of successful executions cannot reveal an obligation that discovery omitted. Comparing both sets makes
completeness independently checkable.

### Question #2: Can closure accept after reaching a configured limit?

Response: No. A limit is operational evidence of incomplete computation and therefore produces `INCONCLUSIVE`.

## Conclusion

Mandatory closure is the bridge from “some useful circuits ran” to the auditable claim that every declared applicable
obligation was discovered and discharged.
