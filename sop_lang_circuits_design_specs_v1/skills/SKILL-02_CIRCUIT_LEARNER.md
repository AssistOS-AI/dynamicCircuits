# SKILL-02 — Învățarea circuitelor din texte, reguli și exemple

## Scop

Acest skill este folosit când un coding agent trebuie să transforme un corpus într-un executable KB: interpretation circuits, rule templates, matchers și verifier-e.

„Învățarea” nu înseamnă antrenarea unui model. Înseamnă extragerea, implementarea, testarea și versionarea unor circuite reutilizabile.

## Inputs

- source documents;
- domain context;
- existing ontology/KB;
- target assurance level;
- representative tasks;
- expert notes;
- package root.

## Outputs

- source manifest;
- interpretation packages;
- rule circuits;
- matcher circuits;
- verifier circuits;
- tests;
- registry metadata;
- limitations;
- promotion proposal.

## Workflow

### 1. Segmentează sursa

Segmentează după structura naturală: secțiuni, clauze, definiții, experimente.

Fiecare segment primește source ID și span.

### 2. Extrage candidate semantic units

Clasifică:

- facts;
- definitions;
- rules;
- exceptions;
- priorities;
- temporal/context conditions;
- procedures;
- claims;
- outputs;
- ambiguity.

Nu comprima sursa într-un singur prompt summary.

### 3. Construiește interpretation circuit

Pentru fiecare unitate:

- produce structured value;
- păstrează source reference;
- publică semantic key numai dacă mapping-ul este justificat;
- marchează ambiguity în value/receipt.

### 4. Decide template boundaries

O regulă devine template separat dacă:

- este reutilizabilă;
- are inputs clare;
- are applicability distinctă;
- poate fi testată independent.

### 5. Scrie rule circuit

Declară exact `@input/@output`.

Commands refuză când regula nu este aplicabilă.

Nu ascunde contextul în globals.

### 6. Scrie verifier

Preferă package separat.

Verifier-ul recalculează witness sau folosește alt algoritm.

### 7. Scrie matcher

Pentru optional candidate, matcher poate fi experimental.

Pentru mandatory proposal:

- Assurance Core only;
- triggers selective;
- exhaustive operations;
- no LLM;
- no early stop;
- tuple order exact.

### 8. Construiește tests

Minimum:

- positive applicability;
- negative applicability;
- boundary;
- exception;
- conflicting rule;
- malformed input;
- property/random tests dacă domeniul permite.

### 9. Rulează corpus sweep

Măsoară:

- trigger activations;
- matches;
- false positives;
- suspected false negatives;
- refusal rate;
- cost.

### 10. Documentează assumptions

Scrie explicit:

- contexts;
- source scope;
- unresolved ambiguity;
- unsupported cases;
- expected failure modes.

### 11. Promotion

Candidate -> optional tested -> reviewed -> mandatory.

Agentul nu promovează direct la mandatory fără assurance review.

## Reguli de calitate

Un rule circuit nu trebuie să combine matching și conclusion dacă aceasta împiedică auditul.

Matcher-ul nu inventează values; returnează handles.

Verifier-ul trebuie să consume outputs declarate.

Source interpretation și domain truth sunt separate.

## Când să creezi commands noi

Creează command nou dacă:

- operația nu poate fi compusă clar din core;
- algoritmul are valoare reutilizabilă;
- testele pot defini behavior.

Nu crea command pentru simpla redenumire.

## Când să folosești backend formal

Folosește SMT/proof assistant/model checker când:

- property este decidabilă/encodable;
- risk este mare;
- witness/certificate este disponibil;
- JS check ar fi fragil.

## Deliverable report

Raportul final include:

- packages create;
- sources covered;
- tests;
- metrics;
- trust proposal;
- known gaps;
- recommended assurance hooks.

## Interdicții

- Nu declara un LLM extraction drept fact fără provenance.
- Nu folosi top-k într-un mandatory matcher.
- Nu hardcode-ui task-specific entity într-un template general.
- Nu ascunde unități/jurisdicție/time.
- Nu face verifier constant true.
- Nu modifica source pentru a face rule să treacă.
