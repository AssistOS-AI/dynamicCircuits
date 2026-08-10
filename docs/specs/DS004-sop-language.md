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

The implemented core commands are `value`, `absent`, `alias`, `get`, `hash`, `equal`, `compare`, `parseNumber`,
`assertInvariant`, `emptyList`, `append`, and `concat`. Their exact contracts are in DS022. Package names derive from `.sop`
paths, with `index.sop` collapsing to its containing directory. Multiple roots may use explicit prefixes, and duplicate
package names fail.

The surface grammar has four statement families: unique port directives; local command definitions with indented JavaScript
bodies; goal and invariant directives; and calls. A call begins with one or more `@outputWire` tokens, followed by a simple
command or qualified circuit name, then `$wire` or JSON string arguments. A continued call uses indentation; indentation
without a parent statement is an error. `#` starts a comment outside a quoted JSON string. CRLF is normalized to LF; string
escapes follow JSON. Diagnostics carry stable codes plus file and line.

`@input` may be empty; `@output` must name at least one distinct port. `@goal wire covers dep...` and `@invariant wire covers
dep...` name an already produced boolean-like wire and optional dependencies whose reachability the compiler verifies.
Local command definitions use `@name define formal...`; names and formals are unique. The JavaScript body evaluates to a
descriptor with `run(ctx)` and optional `check(output, ctx)` according to DS011.

Template metadata directives are parsed as an atomic `@template`, `@trigger`, and `@apply` set, but mandatory matching and closure are not executed in this milestone.

Reserved future syntax includes richer literals, types, named arguments, explicit imports/versions, effects, capabilities,
profiles, proof declarations, and structured template metadata. Implementations must reject rather than guess unknown
directives, malformed bare literals, empty definitions, duplicate ports or commands, partial matcher metadata, free wires,
and illegal redefinition.

## Decisions & Questions

### Question #1: Which v1 syntax decisions are preserved?

Response: Positional calls, quoted literals, bare command formals, explicit ordered ports, local wires, multi-output circuit binding, and path-derived package namespaces are preserved.

### Question #2: Why are template directives parsed before matching exists?

Response: Parsing preserves forward-compatible source validation and package metadata while the runtime clearly reports that matching and closure remain unsupported.

## Conclusion

The supported surface is intentionally small, statically checkable, and sufficient for unit-tested task-local computation and nested reusable circuits.
