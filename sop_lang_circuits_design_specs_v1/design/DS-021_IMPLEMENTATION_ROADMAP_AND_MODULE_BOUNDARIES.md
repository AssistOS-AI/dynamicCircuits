# DS-021 — Roadmap de implementare și module

## 1. Principiu

Kernelul trebuie construit incremental. Matching și assurance nu se adaugă înainte ca parserul, graph-ul și receipts să fie stabile.

## 2. Module recomandate

```text
parser
compiler
package-registry
ir
graph
executor
sandbox
value-store
artifact-store
cache
receipt-store
semantic-index
matcher-runtime
closure-engine
assurance-engine
agent-api
cli
```

Fiecare modul are API testabil.

## 3. Milestone 0 — Semantics executable note

Livrabile:

- grammar;
- IR schema;
- status model;
- examples;
- conformance fixtures.

Nu se scrie runtime înainte de freeze-ul minim.

## 4. Milestone 1 — Parser și compiler

Implementare:

- directives;
- define JS blocks;
- positional calls;
- input/output;
- multi-output calls;
- package mapping;
- SSA/free wire;
- graph/slices.

Acceptance:

- parser/compiler suites;
- IR snapshots;
- diagnostics.

## 5. Milestone 2 — Local executor

Implementare:

- topological scheduler;
- command ABI;
- refusal/error/check;
- nested circuits;
- basic receipts;
- pure cache.

Acceptance:

- legal/science static examples fără closure;
- deterministic replay.

## 6. Milestone 3 — Sandbox și capabilities

Implementare:

- isolated worker;
- timeout/memory;
- artifact API;
- effect receipts;
- oracle broker stub.

Acceptance:

- security suite.

## 7. Milestone 4 — Semantic index

Implementare:

- publish;
- select;
- stable handles;
- trigger registry;
- index receipts.

Acceptance:

- indexing suite;
- incremental publications.

## 8. Milestone 5 — Assurance Core matchers

Implementare:

- join/filter/distinct;
- predicate circuits;
- matcher restrictions;
- tuple validation.

Acceptance:

- matcher completeness tests;
- no heuristic omission.

## 9. Milestone 6 — Closure engine

Implementare:

- rounds;
- instance identity;
- dedup;
- cascade;
- final audit;
- budgets.

Acceptance:

- mandatory omission adversarial tests.

## 10. Milestone 7 — Goals și acceptance

Implementare:

- invariant/goal declarations;
- covers reachability;
- trusted verifier lock;
- final acceptance receipt;
- rejection taxonomy.

Acceptance:

- fake validator rejected;
- output grounding example.

## 11. Milestone 8 — Incremental epochs

Implementare:

- dependency invalidation;
- materialized closure;
- attempt history;
- oracle replay.

Acceptance:

- book edit benchmark.

## 12. Milestone 9 — Agent tooling

CLI/API:

```text
sop compile
sop run
sop explain
sop diff-attempts
sop match
sop closure
sop audit
sop scaffold
```

Agent API returns structured JSON, not only logs.

## 13. Milestone 10 — Registry scale

Implementare:

- persistent registry;
- trigger shards;
- optional semantic search;
- statistics;
- package signing.

## 14. Reference language

Node.js `.mjs`, no dependencies, este potrivit pentru primul reference implementation.

Production may use Rust/Go/Java/etc, dar semantics trebuie comparate cu reference tests.

## 15. Module contracts

Parser nu execută.

Compiler nu accesează network.

Executor nu decide semantic applicability.

Matcher runtime nu acceptă arbitrary JS pentru mandatory.

Closure engine nu decide trust.

Assurance engine nu generează circuits.

Agent API nu poate modifica profile lock.

## 16. Observability

Fiecare module emite structured events cu correlation IDs.

Logs nu substituie receipts.

## 17. Coding standards

- deterministic functions;
- explicit error types;
- no hidden globals;
- immutable IR;
- schema validation;
- exhaustive tests;
- stable canonical serialization.

## 18. Definition of Done

Un milestone este complet când:

- code;
- tests;
- docs;
- fixtures;
- migration note;
- performance baseline;
- security considerations;
- receipt examples;

sunt prezente.

## 19. Riscuri de implementare

- parsing indentation/JS islands;
- sandboxing Node;
- canonical hashing;
- matcher completeness;
- deletion in incremental closure;
- receipt size;
- package version governance.

Fiecare risc trebuie prototipat separat înainte de optimizare.
