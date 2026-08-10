---
id: DS008
title: Security and Trust Boundaries
status: active
owner: repository
summary: Defines path safety, agent write authority, JavaScript execution limits, and non-goals for the reference release.
---

# DS008 Security and Trust Boundaries

## Introduction

Dynamic Circuits executes agent-authored JavaScript and launches external coding agents. Its first release must make authority explicit and avoid presenting development guards as complete isolation.

## Core Content

Workspace preparation must reject overlapping KB and work roots, must not follow input or package symbolic links during inventory and discovery, and must refuse a pre-existing `circuitSkills` path unless it is the expected link. User-owned `AGENTS.md` content must not be overwritten.

The Codex adapter must use workspace-write sandboxing and no interactive approval prompts. Normal analysis must not add the KB as an extra writable directory. Learning mode may do so only with instructions limiting writes to candidate content. The CLI cannot technically replace the coding agent's own sandbox enforcement and must record its invocation result.

SOP command contexts must omit ambient process and I/O capabilities and disable dynamic string or WebAssembly code generation. Inputs and canonical outputs must be frozen. Exceptions must be sanitized in receipts. This boundary is intended for trusted or reviewable analysis code; it is not safe for adversarial multi-tenant execution because asynchronous timeouts, memory isolation, and operating-system containment are absent.

Inputs may contain prompt injection. Coding-agent skills must treat source text as data rather than authority and must follow workspace guidance. Trusted KB promotion, assurance-profile changes, package signing, and receipt editing are outside agent authority.

## Decisions & Questions

### Question #1: Can learning mode enforce candidate-only writes by itself?

Response: The current Codex process receives the KB as an additional writable root, so candidate-only behavior is an instruction-level boundary. A future release should launch learning through a staging directory and promote files through a validated host operation.

### Question #2: Is Node `vm` a security sandbox?

Response: Not for hostile multi-tenant code. It is used here to remove accidental ambient capabilities and apply synchronous time limits while keeping the reference runtime dependency-free.

## Conclusion

The current release provides explicit least-authority defaults and honest limitations. Strong isolation and mediated KB promotion remain required before executing untrusted circuits in production.
