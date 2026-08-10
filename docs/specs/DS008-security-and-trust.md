---
id: DS008
title: Security and Trust Boundaries
status: active
owner: repository
summary: Defines path safety, agent write authority, JavaScript execution limits, and non-goals for the reference release.
---

# DS008 Security and Trust Boundaries

## Introduction

Dynamic Circuits executes agent-authored JavaScript and launches external coding-agent processes. The security contract
defines each writable directory, the capabilities absent from command contexts, the limits of Node `vm`, and the additional
isolation required for hostile code.

This specification applies across workspace preparation in DS003, coding-agent invocation in DS002, command execution in
DS011, trust policy in DS018, receipts in DS019, and future capability brokers described by DS021.

## Core Content

Workspace preparation must reject overlapping KB and work roots, must not follow input or package symbolic links during inventory and discovery, and must refuse a pre-existing `circuitSkills` path unless it is the expected link. User-owned `AGENTS.md` content must not be overwritten.

The Codex adapter uses workspace-write sandboxing and automatic approval review so non-interactive runs do not wait for a
human prompt. Analysis starts in the workdir and
does not add the KB as a writable root. Learning starts in the KB, so candidate-only authority is currently a generated
instruction rather than an operating-system-enforced subdirectory boundary. The CLI cannot replace the coding agent's own
sandbox enforcement and records its invocation result. Future learning should stage candidates in an isolated workspace
and admit them through a validating promotion broker.

SOP command contexts omit ambient process and I/O capabilities and disable dynamic string or WebAssembly code generation.
Inputs and canonical outputs are normalized and frozen; cross-realm objects cannot retain hostile prototypes. Exceptions are
sanitized in receipts. The Node `vm` boundary is intended for trusted or reviewable analysis code; it is not safe for
adversarial multi-tenant execution because asynchronous timeouts, memory isolation, operating-system containment, syscall
filtering, and transactional effects are absent.

The full design uses declared effects (`pure`, artifact read/write, network, oracle, clock, randomness, secret, process),
least-authority capabilities, isolated workers, resource quotas, and host brokers. Filesystem access uses opaque artifact
handles rather than paths; network uses allowlisted request schemas; time/randomness are injected values; external oracles
return signed or receipt-bound evidence. Every grant and effect appears in receipts. Package signatures, dependency locks,
SBOMs, revocation, tenant isolation, log redaction, and audit retention are required before production trust claims.

Inputs may contain prompt injection. Coding-agent skills must treat source text as data rather than authority and must follow workspace guidance. Trusted KB promotion, assurance-profile changes, package signing, and receipt editing are outside agent authority.

Threat tests include traversal and symlink escape, malicious package names, prototype pollution, generated-code escape,
prompt injection inside source documents, secret exfiltration, dependency confusion, cache poisoning, receipt forgery,
oversized artifacts/logs, catastrophic regexes, infinite loops, recursion, closure explosion, and oracle replay. Failure must
default to refusal, error, or inconclusive—not relaxed policy.

### Operational example

A task input may contain text instructing the agent to overwrite the KB. The agent guidance treats that text as document
data, analysis mode supplies no writable KB root, and trusted circuit promotion remains outside agent authority. A command
that tries to access `process` receives no such global in its VM context.

## Decisions & Questions

### Question #1: Can learning mode enforce candidate-only writes by itself?

Response: Learning runs with the KB as its current workspace, so candidate-only behavior is an instruction-level boundary.
A future release should launch learning through a staging directory and promote files through a validated host operation.

### Question #2: Is Node `vm` a security sandbox?

Response: Not for hostile multi-tenant code. It is used here to remove accidental ambient capabilities and apply synchronous time limits while keeping the reference runtime dependency-free.

## Conclusion

The current release provides explicit least-authority defaults and honest limitations. Strong isolation and mediated KB promotion remain required before executing untrusted circuits in production.
