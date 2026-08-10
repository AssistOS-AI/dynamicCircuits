# DS-020 — Teste de conformitate și benchmark-uri

## 1. Principiu

Testarea trebuie să separe:

- conformitatea limbajului/runtime-ului;
- corectitudinea mecanismului de assurance;
- validitatea unui KB de domeniu;
- performanța.

Un test juridic simplu nu dovedește generalitatea sistemului.

## 2. Parser suite

Positive fixtures:

- comments;
- strings escape;
- define blocks;
- call continuation;
- multiple outputs;
- empty input list;
- multiple goals/invariants.

Negative fixtures:

- bare argument;
- unclosed string;
- invalid wire;
- duplicate formal;
- indentation error;
- unknown directive.

## 3. Binding suite

- exact command args;
- missing command arg -> undefined;
- too many command args;
- exact circuit inputs;
- missing circuit input;
- output arity mismatch;
- formal order;
- no named parameters;
- literals remain strings.

## 4. SSA suite

- single producer;
- redefinition;
- free wire;
- passthrough output;
- nested instances;
- two child instances with same internal names;
- dead nodes;
- cycle.

## 5. JavaScript ABI suite

- async/await;
- run success;
- check success/fail;
- ctx.reject;
- exception;
- capability denial;
- frozen inputs;
- hidden nondeterminism warning;
- undefined output policy.

## 6. Package suite

- path mapping;
- index.sop;
- duplicate package;
- package lock;
- hash mismatch;
- local/qualified command;
- interface version.

## 7. Matching suite

- publish/select;
- join completeness;
- filter all candidates;
- tuple arity;
- handle validity;
- stable ordering;
- duplicate publication;
- delta/full equivalence;
- no oracle in matcher.

## 8. Closure suite

- one round;
- cascade;
- dedup;
- target refusal;
- matcher failure;
- final audit missing instance;
- budget inconclusive;
- stratification;
- incremental update.

## 9. Assurance suite

- invariant coverage;
- goal coverage;
- constant-true fake verifier;
- self-check vs independent;
- trusted hash;
- output ungrounded;
- conflict blocking/nonblocking;
- receipt missing;
- trust downgrade attempt.

## 10. Cache suite

- pure hit;
- code change;
- helper change;
- checker change;
- source change;
- profile change;
- oracle materialization;
- snapshot read;
- tamper.

## 11. Security suite

- filesystem;
- network;
- process;
- timeout;
- memory;
- prompt injection;
- package mutation;
- secret leak;
- matcher capability escalation.

## 12. Property-based tests

Properties:

- topological output independent de source line order;
- alias does not duplicate mandatory instance;
- final expected set equals recomputed matcher output;
- accepted output has complete slice receipts;
- cache reuse preserves output/receipt;
- adding irrelevant dead node does not alter outputs;
- renaming local wire does not alter semantic output hash, dacă source maps excluse.

## 13. Metamorphic tests

- reorder facts;
- split/merge package without semantic change;
- duplicate publication;
- add contradictory fact;
- remove required source;
- change KB version;
- replace planner output with omitted rule.

## 14. Adversarial planner tests

Planner intentionally:

- omits mandatory rule;
- chooses false but locally checked rule;
- generates validator constant true;
- hides claim in renderer;
- uses stale package;
- tries to edit profile;
- produces circular support.

Runtime must reject or expose inconclusive.

## 15. Domain benchmarks

### Legal

Rules, exceptions, priorities, dates, contradictions.

### Scientific

Units, universal claims, counterexamples, datasets, reproducibility.

### Long text

Cross-chapter references, terminology drift, timeline consistency.

### Software

Program analysis commands, symbolic execution, test generation.

## 16. Metrics

- acceptance false-positive;
- acceptance false-negative;
- mandatory match recall;
- matcher precision;
- closure rounds;
- node count;
- cache hit;
- incremental latency;
- receipt size;
- planner attempts;
- oracle cost.

## 17. Scale benchmarks

Tiers:

| Tier | Dimensiune |
|---|---|
| S | 100 templates, 1k wires |
| M | 10k templates, 100k wires |
| L | 1M templates simulated, 1M publications |
| Book | 100–500 sections |
| Corpus | multiple books/documents |

## 18. Reference oracle

Pentru mecanica runtime-ului, un reference interpreter simplu și lent este util.

Optimized implementation trebuie comparată cu reference pe random circuits.

## 19. Acceptance thresholds

Un milestone nu este „done” fără:

- zero failing conformance tests;
- documented unsupported cases;
- deterministic receipts;
- adversarial omission tests;
- performance baseline;
- reproducible commands.

## 20. Artefacte de test

Repository-ul SHOULD avea:

```text
tests/parser/
tests/compiler/
tests/runtime/
tests/matching/
tests/closure/
tests/assurance/
tests/cache/
tests/security/
benchmarks/
fixtures/
```
