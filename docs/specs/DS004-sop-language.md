---
id: DS004
title: Supported SOP Lang Surface
status: active
owner: repository
summary: Defines the implemented syntax, positional interfaces, command ABI, core commands, and deliberate language limits.
---

# DS004 Supported SOP Lang Surface

## Introduction

This specification extracts the implemented language contract from the broader historical v1 design. The historical package remains informative for future milestones but does not expand current runtime guarantees.

## Core Content

SOP files must be UTF-8 text. Simple identifiers must match `[A-Za-z_][A-Za-z0-9_]*`; package names must be dot-qualified simple identifiers. Comments begin with `#` outside JSON strings. Calls accept only `$wire` references and double-quoted JSON string literals.

`@input` and `@output` define ordered circuit ports. Circuit calls must match both arities exactly. Commands are declared as `@name define formal...` followed by an indented JavaScript block returning a descriptor with `run` and optional `check`. Command calls produce exactly one wire, bind positionally, fill omitted trailing formals with `undefined`, and reject surplus arguments.

Wires must be local and single-assignment. Inputs are the only external wire values. Multiple output wires before a qualified package name bind a nested circuit's ordered outputs. `@invariant` and `@goal` may declare `covers`; the compiler must verify actual dependency reachability.

The implemented core commands are `value`, `absent`, `alias`, `get`, `hash`, `equal`, `compare`, `parseNumber`, `assertInvariant`, `emptyList`, `append`, and `concat`. Package names derive from `.sop` paths, with `index.sop` collapsing to its containing directory. Multiple roots may use explicit prefixes, and duplicate package names must fail.

Template metadata directives are parsed as an atomic `@template`, `@trigger`, and `@apply` set, but mandatory matching and closure are not executed in this milestone.

## Decisions & Questions

### Question #1: Which v1 syntax decisions are preserved?

Response: Positional calls, quoted literals, bare command formals, explicit ordered ports, local wires, multi-output circuit binding, and path-derived package namespaces are preserved.

### Question #2: Why are template directives parsed before matching exists?

Response: Parsing preserves forward-compatible source validation and package metadata while the runtime clearly reports that matching and closure remain unsupported.

## Conclusion

The supported surface is intentionally small, statically checkable, and sufficient for unit-tested task-local computation and nested reusable circuits.
