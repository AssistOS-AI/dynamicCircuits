# DS-017 — Scalabilitate, registry și documente mari

## 1. Ținte

Arhitectura trebuie să aibă o cale realistă către:

- milioane de template circuits;
- cărți întregi și colecții;
- mii de mandatory instances;
- attempts incrementale;
- mai mulți coding agents.

V1 nu trebuie să atingă toate țintele, dar nu trebuie să blocheze designul.

## 2. Registry stratificat

Registry-ul are niveluri:

1. package identity store;
2. trigger index;
3. interface index;
4. semantic documentation index;
5. trust/profile index;
6. cost/statistics index.

Mandatory lookup folosește trigger index și matchers.

Optional discovery poate folosi semantic index.

## 3. Două faze pentru optional selection

### Recall

Search/LLM produce un set relativ larg.

### Verification

Compilerul și matcher-ele confirmă:

- package existent;
- interface;
- applicability;
- policy;
- cost.

Niciun candidate nu intră în accepted graph doar pe similarity.

## 4. Trigger selectivity

Mandatory template author trebuie să aleagă keys care evită activarea inutilă.

Registry-ul colectează:

- activation count;
- match count;
- selectivity;
- execution cost;
- refusal rate.

Template-uri costisitoare pot fi reorganizate.

## 5. Sharding

Registry-ul poate fi shard-uit după:

- domain;
- organization;
- language;
- jurisdiction;
- time;
- ontology version;
- trust profile.

Root task manifest selectează shards.

## 6. Large text ingestion

Pipeline recomandat:

1. content-address source;
2. structural segmentation;
3. section-level interpretation circuits;
4. local publications;
5. hierarchical aggregation;
6. cross-section matching;
7. root goals.

Chunk boundaries sunt artifacts explicite, nu detalii ascunse în prompt.

## 7. Context windows

LLM-ul nu trebuie să primească întreaga carte pentru fiecare step.

Coding agent folosește:

- source map;
- semantic index;
- dependency graph;
- targeted excerpts;
- prior receipts.

## 8. Parallelism

Independent section circuits pot rula în paralel.

Mandatory closure poate procesa disjoint trigger partitions în paralel, apoi merge index/delta determinist.

Canonical instance ID previne duplicate.

## 9. Distributed execution

Un task bundle pentru worker include:

- package hashes;
- input handles;
- capabilities;
- expected outputs;
- receipt schema.

Worker returnează output artifacts și receipts.

Coordinator verifică hashes și checks.

## 10. Storage

Se separă:

- source/artifact store;
- package store;
- receipt store;
- cache store;
- semantic index;
- registry metadata.

Toate legate prin hashes.

## 11. Cost control

Profile-ul poate limita:

- templates per trigger;
- matches per matcher;
- total instances;
- LLM calls;
- external reads;
- artifact size.

Top-k este permis pentru optional discovery, nu pentru mandatory exhaustiveness.

## 12. Approximation

Dacă matching exhaustiv este prea costisitor:

- rule nu poate fi numită mandatory în profile strict;
- se declară approximate assurance;
- receipt raportează coverage estimate;
- task nu primește strong acceptance.

## 13. Multi-agent collaboration

Workspace locks operează la package level.

Agenții lucrează pe branches/attempts.

Merge-ul cere recompilare și profile validation.

Receipts identifică generator agent/model.

## 14. Benchmarks de scală

Trebuie măsurate:

- registry lookup latency;
- matcher throughput;
- closure rounds;
- instance dedup;
- cache hit;
- memory per wire/node;
- incremental edit latency;
- receipt size.

## 15. Criterii de conformitate

Un prototip advanced ar trebui să demonstreze:

- 100k registry entries simulated;
- trigger lookup sublinear;
- book cu 100+ sections;
- incremental edit;
- parallel section execution;
- closure dedup;
- distributed receipt verification.
