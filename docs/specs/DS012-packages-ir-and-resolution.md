---
id: DS012
title: Packages, Namespaces, IR, and Resolution
status: active
owner: repository
summary: Specifies path-derived packages, multiple roots, identity, resolution, intermediate representation, and static diagnostics.
---

# DS012 Packages, Namespaces, IR, and Resolution

## Introduction

Packages name executable components, while the intermediate representation fixes resolved dependencies before execution.
Namespaces never expose runtime values.

This specification turns DS004 source and DS010 wires into the resolved graph executed by DS005 and DS013. Package hashes
and normalized node identities later become receipt and cache dependencies under DS019–DS020.

## Core Content

### Path mapping and roots

A configured root maps `legal/notice/rule.sop` to `legal.notice.rule`; `legal/notice/index.sop` collapses to
`legal.notice`. An explicit root prefix may prepend `kb`, `task`, or another namespace. Each segment must be a simple SOP
identifier. Discovery is deterministic and does not follow symbolic links.

Multiple roots may represent core libraries, organization KBs, project KBs, task packages, and attempts. Duplicate package
names must fail unless a future explicit overlay manifest fixes the chosen content hash and records the choice. The current
reference registry rejects all collisions.

Local commands use short names. Qualified commands may address a package command, although stable composition should call
the circuit interface. Package names are symbolic; executable identity includes canonical source, resolved helpers,
compiler version, capabilities, and schema. Public packages should use semantic versioning and lock manifests must pin
hashes for accepted execution.

### Intermediate representation

A package IR must retain package name and hash, ordered ports, commands, nodes, goals, invariants, template metadata, and
source mapping. A command descriptor retains local and qualified names, formals, code hash, capabilities, cache policy, and
source span. A node retains stable ID, outputs, callee kind and identity, arguments, dependencies, and source span. Circuit
calls additionally retain ordered input and output bindings.

The current compiled representation implements this structural core but does not yet expose every planned hash, policy,
or source-map field as a versioned serialized schema. Future serialization must remain compatible with the conceptual
`sop-ir/1` model and explicitly version migrations.

### Compilation pipeline and validation

Compilation proceeds through discovery, parsing, JavaScript extraction, symbol tables, resolution, positional binding,
wire and port validation, graph construction, dependency analysis, required slicing, cycle detection, diagnostics, and
package hashing. It must build the complete producer map before dependency resolution so source line order does not change
topological meaning.

Required diagnostics include parse error, duplicate directive, free wire, redefinition, unknown callee, surplus command
arguments, circuit input mismatch, output mismatch, invalid coverage, package collision, policy denial, hash mismatch,
missing helper, and unsupported cycle. Diagnostics must identify code, severity, package/file, line, affected symbol, and
message when the information exists.

The compiler implements mandatory matcher restrictions: the apply target must resolve, interface and selected dotted keys
must agree with metadata, local JavaScript is forbidden, and only the matching Core subset is callable. Static policy checks
remain planned for permitted hashes, capabilities, trusted blocking verifiers, and write effects. Incremental compilation
may cache parse and IR by package hash; interface or code changes must
invalidate callers or execution caches according to dependency.

### Operational example

Under root prefix `kb`, file `legal/notice/index.sop` resolves to package `kb.legal.notice`. A task call to that name binds
the package's exact ordered inputs and outputs. A second root producing the same qualified name causes a package-collision
diagnostic before any circuit runs.

## Decisions & Questions

### Question #1: Why derive package names from paths instead of declarations?

Response: One canonical mapping removes a second naming authority, supports registry indexing, and keeps package movement a
visible API operation.

### Question #2: Are qualified commands part of the stable public API?

Response: The runtime may resolve them, but only ordered circuit inputs and outputs are stable by default. Direct command
calls couple consumers to implementation details and should produce tooling warnings in a fuller implementation.

## Conclusion

Resolution turns symbolic package calls into hashable, statically validated graph components before any runtime effect can
occur.
