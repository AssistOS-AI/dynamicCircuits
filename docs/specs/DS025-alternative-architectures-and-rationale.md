---
id: DS025
title: Alternative Architectures and Design Rationale
status: active
owner: repository
summary: Compares logic, rule, grammar, rewriting, proof, dataflow, and workflow approaches and records adopted and rejected choices.
---

# DS025 Alternative Architectures and Design Rationale

## Introduction

SOP Lang is a hybrid because no single established architecture simultaneously provides approachable circuit syntax,
deterministic dataflow, extensible executable knowledge, exhaustive obligations, and evidence-first operation.

## Core Content

### Compared approaches

Datalog offers declarative facts, fixed points, and query optimization, but effects, rich artifacts, ordered transformations,
and user-facing package interfaces need extra machinery. Constraint Handling Rules excel at monotone propagation but are
less direct for explicit pipelines. Attribute grammars elegantly compute document properties but couple rules to syntax
trees. Discourse representation and semantic parsing model natural-language meaning yet do not provide an execution and
capability substrate.

Term rewriting and K-style semantics provide rigorous transition systems but are specialized and can make ordinary task
authoring heavy. Proof assistants and proof-carrying computation provide the strongest checked guarantees, but formalizing
all sources and domain rules is costly; their certificate checkers are better integrated selectively. E-graphs efficiently
explore equivalent expressions but do not solve source provenance or mandatory real-world rule application. Compiler/dataflow
IR supplies SSA, scheduling, and optimization; workflow engines supply effects, retries, and operations; neither alone
defines semantic matching, closure completeness, or correctness evidence.

The adopted hybrid therefore uses compiler-style packages and SSA graphs, rule-style semantic matching and fixed points,
workflow-style capability mediation and attempts, and proof/evidence-style receipts and optional certificates.

### Rejected or deferred surface choices

The design rejects implicit wire mutation, ambient global validation, dynamic capture of caller wires, resolution-order
shadowing, arbitrary JavaScript mandatory matchers, and unreceipted effects. Named arguments, instance namespaces, richer
types, pattern syntax, conditionals, loops, generics, modules beyond filesystem packages, and proof annotations are possible
extensions but must preserve deterministic resolution and normalized IR. Current positional calls and explicit circuit
interfaces keep the initial language small.

Agent-generated prose is not the execution architecture. Coding agents author and analyze files; the deterministic kernel
parses, compiles, and runs circuits. Direct LLM APIs are intentionally absent from this version.

## Decisions & Questions

### Question #1: Why not build the entire system as Datalog?

Response: Datalog is a strong candidate for the future closure sub-engine, but explicit transformations, artifacts, effects,
package APIs, and familiar stepwise circuits benefit from a dataflow host.

### Question #2: Why retain receipts if proof certificates are added?

Response: A proof may establish one proposition; receipts also bind sources, versions, capabilities, closure coverage,
attempts, and operational provenance.

## Conclusion

The hybrid selects each paradigm where its guarantees are strongest and keeps the seams explicit enough to audit or replace.
