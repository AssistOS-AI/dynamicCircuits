---
id: DS014
title: Template Circuits and the Executable Knowledge Base
status: active
owner: repository
summary: Defines reusable circuit templates, their metadata, review lifecycle, versioning, and separation from task instances.
---

# DS014 Template Circuits and the Executable Knowledge Base

## Introduction

The knowledge base stores reviewed, versioned circuit packages. A template circuit defines a recurring transformation,
reasoning rule, or verification pattern with explicit inputs, outputs, applicability metadata, provenance, and tests.

This specification connects KB candidate governance in DS006 to semantic discovery and matching in DS015. Mandatory use of
a reviewed template is governed by closure in DS016 and assurance profiles in DS017.

## Core Content

### Template contract

A template has a stable qualified identity, semantic version, typed inputs and outputs, implementation circuit, effects and
capabilities, trust requirements, applicability metadata, goals or invariants it discharges, cost hints, test references,
and provenance. Metadata should also state jurisdiction or domain, language, effective interval, confidence, deprecation,
replacement, and known exclusions when those dimensions matter.

Template parameters bind values or artifacts; they do not perform textual macro substitution. Instantiation creates a
normal circuit instance with a deterministic instance identifier derived from template version, bindings, epoch, and
profile. The compiled graph must retain the template origin and parameter mapping.

### Knowledge-base lifecycle

Trusted templates live under `KB/circuits/`. Learning without `--workdir` runs in the KB workspace, reads `KB/input/` and
trusted circuits, and may write proposals only to `KB/candidates/` plus reports to `KB/results/`. Promotion is a separate
human or policy-governed review step. Candidate review checks interface clarity, determinism, refusal behavior, effects,
capabilities, test vectors, negative cases, provenance, overlap with existing templates, and version compatibility.

Templates are immutable by version. Compatible refinements create a new minor version; changed meaning, acceptance, or
effects require a major version. Deprecation never erases receipts that cite an older version. A lock or receipt records the
exact selected version so replay does not silently resolve to a newer implementation.

### Applicability and limits

Reusable families include source normalization, legal-rule application, scientific claim testing, consistency checks,
aggregation, comparison, temporal reasoning, unit conversion, evidence grading, and report publication. A template must
refuse when prerequisites are absent rather than fabricate defaults. Broad applicability descriptions are candidate
generation aids; assurance depends on explicit matchers and closure as specified by DS015 and DS016.

The current runtime discovers and calls `.sop` packages from a filesystem KB, supports nested circuits, and automatically
registers reviewed `kb.*` packages with complete `mandatory` matcher metadata. It instantiates the target named by `@apply`
for every validated handle tuple. Rich domain metadata, version solving, autonomous promotion, optional candidate ranking,
and profile-selected registries remain planned.

### Operational example

A reviewed notice-period template declares policy and case inputs, findings and statistics outputs, refusal for malformed
cases, applicability to the relevant policy domain, positive and exception tests, provenance, and version. A task matcher
can bind case facts to this interface without copying its rule implementation.

## Decisions & Questions

### Question #1: Why separate candidates from trusted circuits?

Response: Coding agents are useful discovery tools but cannot silently expand the trusted computing or rule base. The
candidate boundary makes review, testing, provenance, and promotion visible.

### Question #2: Why are templates not textual macros?

Response: Value binding preserves SSA, type and arity checks, effects, provenance, and independent compilation; textual
expansion would obscure all five.

### Question #3: Where is the mandatory property declared?

Response: On a separate reviewed matcher package. The target remains a reusable transformation; the matcher states the
semantic keys and bindings that make that target obligatory in the loaded registry.

## Conclusion

The KB becomes durable only when learned patterns are reviewed, versioned executable contracts rather than untracked
instructions or copied task logic.
