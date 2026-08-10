---
id: DS009
title: Terminology and Conceptual Model
status: active
owner: repository
summary: Defines the entities, trust states, truth distinctions, and boundaries of the Dynamic Circuits model.
---

# DS009 Terminology and Conceptual Model

## Introduction

Dynamic Circuits represents a document analysis as source artifacts, interpreted facts, executable commands and circuits,
reusable templates, task attempts, assurance obligations, and receipts. Separate terms identify what the source states,
what a circuit derives, what a verifier checks, and what an assurance profile accepts.

This vocabulary is shared by DS010–DS020. It prevents the parser, agent, matcher, assurance engine, and auditor from using
one term such as “result” for source text, derived data, verification evidence, and final acceptance.

## Core Content

### Sources, interpretations, and values

A **source** is an external document, dataset, database snapshot, experiment, or accepted circuit output with identity,
version, and preferably a content hash. An **interpretation circuit** converts a source into explicit semantic values and
must preserve source references, assumptions, alternatives, and ambiguity. It is a concrete formalization, not the source's
absolute truth.

A **value** is a canonical payload or a registered handle. A **wire** is an immutable local dependency between exactly one
producer and its consumers. The source name of a wire is not its global identity; runtime identity also depends on package,
instance, producer, and epoch.

### Commands, circuits, and packages

A **command** is one JavaScript operation with positional formals and one output. A **circuit file** is a `.sop` compilation
unit and package with ordered inputs, ordered outputs, local commands, calls, and optional assurance declarations. A
**circuit instance** is one runtime application of that package. Instance identity is internal and never becomes a wire
namespace visible in source.

A **template circuit** is reusable executable knowledge. A **matcher circuit** returns ordered tuples of wire handles that
fit a template interface. A **mandatory hook** is a matcher selected by an external assurance profile and evaluated
systematically. A **problem circuit** is the task root and its task-local packages.

### Attempts, goals, profiles, receipts, and epochs

An **attempt** is an immutable version of a problem solution. A **goal** states a task success obligation; an **invariant**
states a local or global property over dependency slices. An **assurance profile** fixes mandatory hooks, trusted verifiers,
minimum assurance, budgets, and conflict policy independently of the attempt.

A **receipt** is structured, content-addressed execution and audit evidence. An **epoch** fixes source versions, packages,
profile, runtime/compiler versions, and relevant environment. A semantic change creates a new epoch.

### Required distinctions

A command is not a circuit; package namespaces resolve components, not values; a local checker is not an assurance profile;
a matcher establishes applicability while a planner only proposes work. Refusal is not boolean false, an exception is not
refusal, unknown is not negation, and contradiction is not a technical error.

### Operational example

A document sentence is a source assertion. An interpretation circuit may publish it as a claim with a source span. A rule
circuit derives a value from that claim. A verifier checks a goal over the value. An assurance profile decides whether that
verifier and evidence are sufficient for an accepted outcome.

Trust must remain derived from receipts and policy. The model distinguishes unchecked, self-checked, independently checked,
certificate-checked, and externally attested outputs. Support for a proposition, support for its negation, conflict,
unknown, refusal, and error must remain separate even when a domain adopts classical, paraconsistent, probabilistic, or
temporal reasoning.

## Decisions & Questions

### Question #1: Why is the interpretation circuit a first-class artifact?

Response: Natural-language interpretation is fallible and reviewable. Making it explicit preserves provenance and allows a
later agent, parser, domain expert, or independent extractor to challenge it without changing execution mechanics.

### Question #2: Why is trust not stored as a wire annotation?

Response: Trust depends on the complete dependency slice, verifier lineage, package hashes, source versions, and active
profile. A local label would permit evidence laundering through aliases.

## Conclusion

The conceptual model prevents category errors: agents propose interpretations and programs; the compiler validates
structure; execution produces evidence; an external profile and assurance machinery decide acceptance.
