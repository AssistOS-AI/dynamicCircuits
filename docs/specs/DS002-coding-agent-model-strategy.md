---
id: DS002
title: Coding-Agent and Model Strategy
status: active
owner: repository
summary: Defines external coding-agent selection, Codex defaults, future adapters, and the prohibition on direct LLM API calls.
---

# DS002 Coding-Agent and Model Strategy

## Introduction

An external coding-agent process performs document interpretation and circuit authoring. The SOP runtime receives circuit
files and input values and therefore remains independent from model APIs and model credentials.

## Core Content

The CLI must expose an `--agent` parameter. `codex` is the built-in default and must be invoked non-interactively in the work directory with workspace-write sandboxing, no interactive approvals, an ephemeral session, and the prompt supplied through standard input. `--model` may forward an explicit model choice without embedding a repository-wide model name.

The adapter registry must own process-specific arguments. A `generic` adapter must accept an explicit executable through `--agent-command` and deliver the task prompt over standard input. New OpenCode, Claude Code, or other adapters may be added as separate registry implementations once their invocation contracts are verified; workspace and SOP modules must not contain product-specific branches.

Normal analysis starts the agent in the task workdir and must not grant a writable KB root. Inferred learning starts the
agent in the KB because no workdir exists, but generated instructions restrict knowledge writes to `candidates/` and report
writes to `results/`. That candidate-only restriction is instructional in the current Codex sandbox and is documented as a
security limitation; trusted circuit promotion remains outside agent authority.

No runtime command, workspace module, or adapter may call an LLM HTTP API directly in this release. If a future embedded model path is approved, AchillesAgentLib and `LLMAgent` become mandatory, with environment defaults, manual runtime overrides, and tagged routing metadata.

## Decisions & Questions

### Question #1: Why does the generic adapter exist before named third-party adapters?

Response: It proves that adapter selection is not hard-coded to Codex while avoiding unverified command-line flags for tools whose interfaces may change. A verified adapter can later replace generic invocation without changing workspace contracts.

### Question #2: Is a fixed model tier required?

Response: No. The external agent's configuration is authoritative by default. Users may pass `--model` for Codex, and future policy may select tiers through adapter configuration rather than SOP circuits.

## Conclusion

Coding-agent choice is a process boundary with Codex as the verified default, not an LLM SDK dependency or a semantic feature of the circuit runtime.
