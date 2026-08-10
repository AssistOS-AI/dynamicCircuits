---
id: DS011
title: Command ABI, Effects, and Capabilities
status: active
owner: repository
summary: Defines positional JavaScript commands, run/check/refusal behavior, effect metadata, determinism, and capability policy.
---

# DS011 Command ABI, Effects, and Capabilities

## Introduction

Commands provide open-ended computation while the ABI keeps inputs explicit, failures classified, and effects subject to
policy. Flexibility does not imply trust.

This specification connects JavaScript bodies parsed under DS004 to value semantics in DS010, runtime invocation in DS005,
security policy in DS008, and the future capability brokers and receipts in DS019–DS021.

## Core Content

### Declaration and descriptor

A command declaration uses `@name define formal1 formal2`. Formals are bare unique names whose order defines SOP binding
and whose names define the frozen JavaScript input object. Missing trailing arguments bind to `undefined`; surplus
arguments fail compilation. Formals and code participate in command identity.

The indented JavaScript lexical island must return a descriptor with mandatory `run` and optional `check`. Planned metadata
includes effects, cache mode, timeout, required capabilities, and helper dependency hashes. The parser must preserve the
body as JavaScript text rather than tokenizing it as SOP.

### Runtime ABI and outcomes

The runtime calls `await run(inputs, ctx)`. When present, it then calls `await check(inputs, output, ctx)`. A check passes on
`true` or an `{ok: true, evidence}` record and otherwise yields `CHECK_FAILED`. A self-check only establishes the relation
implemented by that package and never grants global trust.

`ctx.reject(code, details)` creates a controlled refusal for non-applicability, missing or malformed input, solver unknown,
or policy denial. An exception is `ERROR`, must be sanitized in the receipt, and must not be silently retried. Returning
undefined accidentally is an error unless a descriptor explicitly accepts it or the core `absent` sentinel represents it.

### Context and effects

The complete design admits mediated context operations for logging, cancellation, artifact reads/writes, clock, random,
network, oracle calls, and receipt notes. Every operation must be capability-gated. The reference runtime intentionally
provides only rejection, local notes, and a null signal; filesystem, process, module loading, network, clock, random, secret,
subprocess, and oracle capabilities are absent.

Effect classes are `pure`, snapshot-bound `read`, transactional or idempotent `write`, nondeterministic `oracle`, and
conservative `unknown`. Pure commands may be memoized; reads require a fixed snapshot; oracle results may be materialized
and replayed; writes are forbidden in speculative execution unless explicit policy authorizes them.

### Determinism and isolation

Pure commands must not depend on hidden time, locale, timezone, random values, environment variables, or mutable closure
state. Authorized nondeterminism must enter the environment fingerprint and receipt. Runtime values may only enter through
formals; JavaScript has no wire-store access.

Static helpers may be provided only through a sandbox module registry and their hashes must enter package identity. The
present `vm` boundary disables string and WebAssembly code generation and bounds synchronous work; production execution of
untrusted commands requires worker, process, container, or WASM isolation with CPU, wall-time, memory, output, and log
budgets.

### Operational example

A `calculateDeadline` command receives explicit date and duration values through declared formals, returns a canonical date,
and calls `ctx.reject("invalid_date")` for a malformed date. A thrown implementation exception is recorded as `ERROR`;
returning false is an ordinary domain value and remains distinct from both outcomes.

## Decisions & Questions

### Question #1: Why retain both `run` and `check`?

Response: `run` separates production from local verification and supports witnesses or alternative checkers. Their shared
lineage means a high-risk profile should still require an independent package, algorithm, or certificate checker.

### Question #2: Why is refusal separate from false?

Response: False may be a valid domain value. Refusal means the command could not establish a result for the supplied inputs
and must block dependent outputs rather than masquerade as a negative conclusion.

## Conclusion

The command ABI makes arbitrary algorithms composable while preserving explicit data dependencies, controlled failure,
future effect mediation, and auditable trust boundaries.
