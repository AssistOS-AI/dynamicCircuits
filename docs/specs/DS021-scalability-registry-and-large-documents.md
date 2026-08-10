---
id: DS021
title: Scalability, Registry, and Large Documents
status: active
owner: repository
summary: Defines layered discovery, sharding, section pipelines, parallel execution, budgets, and strict versus approximate modes.
---

# DS021 Scalability, Registry, and Large Documents

## Introduction

Large knowledge bases use layered catalogs, metadata indexes, registry shards, and content-addressed stores. Large documents
use stable sections, per-section interpretation circuits, provenance-linked summaries, and cross-section synthesis circuits.

This specification extends the semantic discovery contract in DS015, the closure contract in DS016, and the cache/epoch
contract in DS020. It does not change current local execution: it defines how those same identities and receipts must remain
complete when a future registry or document no longer fits in one process.

## Core Content

### Layered registry

The registry has a compact catalog of identities and versions, structured metadata indexes, optional approximate retrieval,
full package manifests, and content-addressed source/IR/artifact stores. Queries first narrow by domain, inputs, outputs,
effects, capabilities, trust, jurisdiction, language, and version; semantic similarity may then improve recall; executable
matchers finally verify applicability. Strict mandatory mode enumerates all candidates in its declared shard snapshot.

Shards may follow domain, tenant, jurisdiction, effective time, language, trust class, or package prefix. Cross-shard rules
declare dependencies explicitly. Registry snapshots and shard hashes are receipt-bound, and distributed nodes cannot claim
closure until their complete shard results are merged deterministically.

### Large-document pipeline

Documents are ingested as immutable artifacts, segmented with stable locators, normalized, and interpreted per section.
Section circuits publish facts, claims, terminology, citations, local summaries, and unresolved questions. Cross-section
circuits then reconcile definitions, timelines, entities, contradictions, and global goals. Hierarchical reduction keeps
raw text out of later stages while provenance links every summary fact back to exact spans.

Independent sections and pure nodes can run in parallel. Scheduling should consider dependency depth, matcher cost, memory,
artifact locality, trust boundary, and budget. Distributed work uses leased immutable tasks, idempotent publication, signed
or verified receipts, and deterministic aggregation.

### Accuracy and cost modes

Profiles distinguish exploratory approximate retrieval from strict assurance. Approximate mode may cap candidates and label
recall uncertainty; it cannot assert exhaustive closure. Strict mode records registry coverage and may be slower or return
`INCONCLUSIVE`. Metrics include indexed facts, candidates per matcher, closure rounds, cache reuse, critical path, bytes,
oracle calls, cost, and unresolved obligations.

The current implementation is a local single-process graph runtime; registry layers, artifact sharding, distributed
scheduling, and document segmentation are planned.

Operational example: a 500-chapter corpus is split at stable chapter locators. One interpretation circuit publishes dates
and named entities for each chapter. When chapter 208 changes, its digest and dependent synthesis work are invalidated, while
unchanged chapter interpretations remain reusable. A strict cross-chapter timeline report may be published only after every
chapter shard in the receipt-bound snapshot has contributed its result.

## Decisions & Questions

### Question #1: Why summarize sections before global analysis?

Response: Structured, provenance-linked summaries reduce context and computation while preserving the ability to inspect
the exact source spans behind a global conclusion.

### Question #2: Can approximate retrieval satisfy a strict profile?

Response: No. It can propose candidates, but strict completeness needs enumerable coverage or an explicit inconclusive result.

## Conclusion

Scalability comes from layered, immutable, independently verifiable work—not from weakening assurance claims silently.
