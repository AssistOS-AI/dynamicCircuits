---
id: DS018
title: Correctness Model and Trust Boundaries
status: active
owner: repository
summary: Defines conditional correctness, trust states, the trusted computing base, independent verification, and residual risk.
---

# DS018 Correctness Model and Trust Boundaries

## Introduction

Dynamic Circuits cannot guarantee real-world truth merely because a program ran. It can make a narrower, valuable claim:
given identified sources, code, rules, profile, and environment, the accepted result followed the declared contracts.

## Core Content

### Conditional correctness

An acceptance certificate means that parsing and wiring were valid, executed commands satisfied their checks, mandatory
obligations were closed, goals and invariants passed, policy constraints held, and receipts commit to all relevant inputs.
It is conditional on source authenticity and completeness, command semantics, matcher completeness, verifier validity,
runtime integrity, oracle behavior, and the selected assurance profile.

The system distinguishes factual truth, source assertion, interpreted fact, derived value, verified proposition, and
accepted task outcome. These must never collapse into one `true` flag. Conflicting evidence is retained and resolved only by
declared policy; absence of evidence is not evidence of absence.

### Trust states and TCB

Packages and evidence may be `UNTRUSTED`, `CANDIDATE`, `REVIEWED`, `VERIFIED`, or `REVOKED`. Trust is scoped by version,
hash, capability class, domain, reviewer or verifier, and effective interval. Revocation prevents new acceptance but does
not erase the historical meaning of old receipts.

The trusted computing base includes parser, compiler, scheduler, canonicalizer and hash logic, capability enforcement,
Assurance Core, selected command implementations and verifiers, profile resolver, and trusted oracle adapters. Coding
agents, prose explanations, approximate retrieval, candidate circuits, and self-reported command confidence are outside the
TCB unless separately verified.

### Independent verification and limits

A component cannot establish its own correctness merely by returning a successful check. High-assurance profiles require
independent verifiers, redundant implementations, proof or certificate checkers, signed data, property tests, or external
audits according to risk. Receipts expose rather than eliminate residual risks: bad sources, shared implementation bugs,
incomplete rules, compromised infrastructure, undecidable properties, and policy mistakes.

The current runtime offers deterministic execution, isolation via `node:vm`, checks, invariants, canonical output, and
receipts, but not a hardened sandbox, signature verification, trust registry, or formal certificate checker.

## Decisions & Questions

### Question #1: Why is command self-checking insufficient?

Response: The command and its check may share the same misunderstanding or defect. Independence reduces correlated failure
and makes the assurance claim stronger.

### Question #2: Does a revoked package invalidate an old receipt?

Response: It changes present trust interpretation, not historical bytes. Auditors can reproduce what was accepted then and
apply current revocation policy separately.

## Conclusion

Correctness is explicit, conditional, and scoped. The design strengthens evidence while keeping trust assumptions and
unresolved real-world risk visible.
