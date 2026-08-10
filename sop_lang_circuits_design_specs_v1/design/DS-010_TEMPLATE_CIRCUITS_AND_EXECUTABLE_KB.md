# DS-010 — Template circuits și knowledge base executabil

## 1. Definiție

Un executable KB nu este doar o colecție de facts. El conține package-uri executabile:

- rule circuits;
- matcher circuits;
- verifier circuits;
- renderers;
- converters;
- domain adapters;
- registry metadata;
- tests și provenance.

Template circuit-ul este unitatea reutilizabilă.

## 2. Tipuri de template

### Rule template

Aplică o regulă unei combinații de inputs.

### Analysis template

Execută un algoritm: statistică, symbolic execution, model checking, search.

### Adapter template

Convertește între reprezentări, unități, ontologii sau contexts.

### Verifier template

Verifică un output, witness sau certificat.

### Renderer template

Produce text sau artefact, de regulă urmat de grounding verification.

### Aggregator template

Combină rezultate din package-uri multiple.

## 3. Structura recomandată

```text
kb/domain/concept/
  rule.sop
  matcher.sop
  verifier.sop
  tests/
  README.md
  manifest.md
```

`rule.sop` are `@input/@output`.

`matcher.sop` are `@template`, `@trigger`, `@apply`.

`verifier.sop` este package separat când se urmărește independența.

## 4. Template contract

Un template public trebuie să documenteze:

- intended semantics;
- input order;
- output order;
- applicability;
- failure/refusal conditions;
- invariants;
- semantic publications;
- assumptions;
- cost;
- trust status;
- version;
- counterexamples and tests.

Aceste informații pot fi în Markdown și registry metadata. Semantica executată rămâne în circuit.

## 5. Creation by LLM/coding agent

Un agent poate crea template candidate.

Candidate-ul intră inițial în quarantine registry.

Pentru promovare la optional trusted:

- compilează;
- trece unit tests;
- trece property tests;
- are verifier sau witness;
- are review semantic.

Pentru promovare la mandatory:

- matcher-ul este în Assurance Core;
- exhaustiveness-ul său este testat;
- false-positive/false-negative risk este documentat;
- target rule are verifier adecvat;
- package hash este fixat într-un profile version.

## 6. Template semantics și context

Regulile reale pot depinde de:

- jurisdicție;
- timp;
- document version;
- experiment;
- narrator;
- assumptions;
- ontology version.

Aceste elemente trebuie să fie inputs explicite sau parte din source values.

Nu se ascund în globals.

## 7. Rule conflict și priority

KB-ul poate conține rules incompatibile.

Runtime-ul nu decide automat priority.

Domain templates trebuie să producă supports, exceptions și priority relations, apoi un resolver circuit aplică politica.

Contradicțiile pot rămâne outputs diagnostice.

## 8. Template identity

Instance ID se calculează din:

- target package hash;
- canonical input wire identities;
- relevant policy parameters;
- epoch.

Aceeași instanță nu se execută de două ori în același closure.

## 9. Template discovery

Discovery optional poate folosi:

- semantic search pe documentație;
- embeddings;
- tags;
- output intent;
- prior usage;
- cost estimates.

Discovery produce candidate packages, nu applicability proof.

Fiecare candidate trebuie să treacă interface și matcher checks.

## 10. Mandatory vs optional

Optional template:

- poate fi ales de planner;
- omission nu invalidează structural taskul;
- poate deveni relevant prin goal coverage.

Mandatory template:

- este activat de profile;
- matcher-ul este executat sistematic;
- toate matches trebuie instanțiate;
- refusal/failure este blocking conform profile-ului.

## 11. Evolution

KB versions sunt immutable.

O regulă corectată produce package hash nou.

Profile-ul nou poate selecta noua versiune.

Receipts vechi rămân interpretabile prin lock manifests.

## 12. Scalability obligation

Fiecare template public trebuie să aibă:

- trigger keys suficiente pentru indexare;
- matcher cu cost estimat;
- limits pentru combinatorics;
- canonical instance identity;
- incremental behavior, dacă este mandatory.

Un template fără trigger poate exista optional, dar nu poate fi mandatory la scară mare.

## 13. Criterii de acceptare

Un executable KB minim trebuie să demonstreze:

- rule/matcher separation;
- exact input wiring;
- multiple template instances;
- dedup;
- version lock;
- conflict handling;
- optional discovery;
- mandatory promotion workflow;
- reproducible tests.
