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

This specification extends matching from DS015 into an exhaustive obligation process. Its closure receipt feeds the
acceptance gates in DS017 and the final provenance hierarchy in DS019.

## Core Content

### Closure algorithm

The closure engine snapshots the compiled mandatory matcher registry and hashes each matcher plus its apply target. It
indexes initial semantic publications, enumerates every mandatory matcher applicable to present trigger keys, evaluates them, creates
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
The implemented receipt commits to a registry hash, matcher count, semantic keys, publication count, rounds, expected and
executed instance identities, missing identities, failure evidence, and a closure hash. A future assurance profile will add
its own hash so later policy changes cannot alter what “all mandatory rules” meant.

The current runtime implements this algorithm for additive exact-key publications, reviewed filesystem `kb.*` matchers,
one-key bindings, two-key equality joins, deterministic deduplication, and configurable round and instance limits. It does
not implement persistent epochs, retraction, explicit unknown matcher outcomes, profile-selected registries, trust gates,
parallel closure, or final acceptance certificates.

### Operational example

Round 1 matches an ordinary policy rule and publishes a computed deadline. That deadline enables a lateness matcher in round
2, which creates a violation instance and publishes a finding. Round 3 adds nothing. Acceptance proceeds only after the audit
confirms that every expected ordinary-rule and lateness instance executed.

## Decisions & Questions

### Question #1: Why is an expected-versus-executed comparison necessary?

Response: A list of successful executions cannot reveal an obligation that discovery omitted. Comparing both sets makes
completeness independently checkable.

### Question #2: Can closure accept after reaching a configured limit?

Response: No. A limit is operational evidence of incomplete computation and therefore produces `INCONCLUSIVE`.

### Question #3: Does a non-compliant finding fail closure?

Response: No. Closure checks whether every mandatory circuit instance executed successfully, not whether its domain finding
is positive. A target that successfully returns `compliant: false` is executed evidence; refusal, rejection, error, or a
missing instance blocks closure.

## Conclusion

Mandatory closure is the bridge from “some useful circuits ran” to the auditable claim that every declared applicable
obligation was discovered and discharged.
