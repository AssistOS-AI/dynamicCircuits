---
id: DS015
title: Semantic Index, Matching, and Automatic Wiring
status: active
owner: repository
summary: Defines searchable semantic facts, deterministic matcher outcomes, candidate ranking, and auditable automatic wiring.
---

# DS015 Semantic Index, Matching, and Automatic Wiring

## Introduction

Automatic reuse requires two distinct operations: high-recall discovery of plausible templates and strict verification
that a selected template is applicable. The semantic index supports discovery; executable matchers authorize wiring.

This specification consumes interpreted facts defined by DS009 and reviewed templates defined by DS014. Its created
instances feed mandatory closure under DS016 and appear in receipts under DS019.

## Core Content

### Semantic index

Interpretation commands publish canonical facts such as entities, claims, quantities, units, dates, jurisdictions,
citations, document spans, and relationships. Every fact carries provenance back to source artifact, locator, command,
package version, and epoch. Index entries are additive within an epoch; corrections create superseding facts rather than
rewriting evidence invisibly.

The implemented in-memory index supports dotted exact keys, immutable canonical values, provenance labels, stable
content-derived handles, deduplication, deterministic snapshots, and selection by key. Planned extensions add structured
filters, dependency and capability constraints, persistent epochs, and optional approximate search over descriptions or
embeddings. Approximate search may rank candidates but never establish mandatory applicability.

### Matchers and outcomes

A matcher is a pure, versioned executable predicate over facts and profile context. The current subset returns a complete
list of publication-handle tuples: each tuple is a match and an empty list is no match. Matcher execution failure makes
closure inconclusive; it is never converted to no match. The broader model will add explicit `MATCH`, `NO_MATCH`, and
`UNKNOWN` evidence records. Every matcher must declare the template it
can instantiate, the fact families it consumes, exclusivity or priority rules, and its cost class. Matcher failures are
diagnostics, not negative evidence.

Bindings use stable fact identifiers and validated values. Candidate ordering is deterministic: mandatory class, explicit
priority, specificity, template identity/version, then canonical binding hash. Ambiguous mutually exclusive matches cause
rejection or policy-directed adjudication; arbitrary first-match behavior is forbidden.

### Automatic wiring

For each accepted match, the compiler creates a uniquely named circuit instance, wires bound facts and artifacts to its
inputs, and records matcher evidence. It then re-indexes outputs because they may enable additional matches. Duplicates are
suppressed by a key over matcher, template version, canonical bindings, epoch, and assurance profile.

Candidate discovery may be approximate for optional work. Mandatory discovery must be complete under the declared
registry snapshot. The current runtime automatically wires only reviewed `kb.*` mandatory matchers whose exact trigger keys
are published. One-key binding and equality joins over two selected fact families are implemented. Candidate ranking,
ontology expansion, version solving, profile filtering, and general tri-state predicates remain planned.

### Operational example

Facts identify a notice case, policy jurisdiction, event date, and written-consent artifact. Registry search finds ordinary
and expedited notice templates. The ordinary matcher binds every case; the exception matcher returns `MATCH` only for the
case whose consent fact satisfies its predicate. Both matcher outcomes and bindings enter the wiring receipt.

## Decisions & Questions

### Question #1: Why can an embedding search not trigger a mandatory circuit by itself?

Response: Similarity is a recall mechanism with unstable thresholds. A mandatory obligation needs a deterministic matcher
whose inputs and reasons can be replayed and audited.

### Question #2: What prevents duplicate instances across closure rounds?

Response: A canonical instance key and monotone registry state make the same matcher-template-binding tuple idempotent.

### Question #3: What does “every applicable rule” mean in the current implementation?

Response: Every unique binding returned by every loaded reviewed mandatory matcher over the explicit publication index.
The claim is registry-relative and does not imply that unencoded prose or an absent matcher was discovered.

## Conclusion

The index finds possibilities, matchers prove applicability, and the wiring record explains exactly why each reusable
circuit entered the task graph.
