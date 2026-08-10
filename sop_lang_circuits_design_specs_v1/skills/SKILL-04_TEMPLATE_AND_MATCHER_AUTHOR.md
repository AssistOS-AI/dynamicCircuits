# SKILL-04 — Autorarea template-urilor și matcher-elor

## Scop

Skill specializat pentru a crea o componentă reutilizabilă și matching verificabil.

## Deliverables

```text
rule.sop
matcher.sop
verifier.sop
README.md
tests/
manifest.md
```

## 1. Definește semantica înainte de cod

Scrie propoziția:

„Pentru inputs X, dacă applicability A, circuitul produce outputs Y și witness W.”

Documentează contextul.

## 2. Interface design

Inputs minime, explicite, stabile.

Outputs relevante, nu implementation details.

Ordinea este API.

## 3. Rule circuit

Rule circuit presupune că matcher-ul a selectat inputs compatibile, dar tot trebuie să refuze la invalid shape.

Produce witness când posibil.

Publică derived values explicit.

## 4. Verifier

Verifier-ul:

- consumă inputs + outputs;
- recalculează;
- produce Assurance Result;
- este separat pentru trust;
- are negative tests.

## 5. Matcher

Matcher-ul declară:

```text
@template mandatory|optional
@trigger "key"
@apply package.target
```

Produce tuples în ordinea target inputs.

Nu produce domain outputs.

## 6. Trigger design

Trigger trebuie să maximizeze recall pentru rule family, dar să limiteze activation.

Un trigger lipsă poate produce false omission.

Testează fiecare semantic key.

## 7. Join design

Join conditions trebuie să includă context:

- subject;
- time;
- jurisdiction;
- version;
- scope.

Nu lega doar după nume textual dacă entity identity există.

## 8. Predicate

Predicate-ul de applicability trebuie să fie:

- deterministic;
- total asupra candidate tuple;
- side-effect-free;
- testat;
- approved dacă mandatory.

Return false, nu refusal, pentru candidate neaplicabil; refusal indică input defect/inconclusive.

## 9. Exhaustiveness

Pentru mandatory:

- select exhaustiv;
- join exhaustiv;
- filter toate tuples;
- distinct only exact duplicates;
- no top-k;
- no LLM.

## 10. Dedup și identity

Asigură că aceeași semantic application produce same tuple identities.

Alias handles trebuie canonicalized.

## 11. Test matrix

| Caz | Așteptare |
|---|---|
| exact match | instance |
| no relevant key | no activation |
| key but context mismatch | no match |
| multiple valid pairs | all instances |
| duplicate publication | one instance |
| missing field | false/refusal documented |
| boundary | correct |
| exception | resolver path |

## 12. Performance

Măsoară candidate count și join size.

Adaugă indices, nu heuristics incomplete.

## 13. Documentation

README trebuie să includă:

- rule statement;
- source;
- assumptions;
- interface;
- examples;
- refusal codes;
- matcher completeness argument;
- verifier independence;
- trust proposal;
- limitations.

## 14. Mandatory promotion checklist

- semantic expert review;
- code review;
- matcher property tests;
- corpus evaluation;
- verifier approved;
- package signed/locked;
- rollback plan;
- profile version update.

## Interdicții

- matcher și rule într-un singur opaque JS;
- invented input values;
- dependency on absence in unsealed stratum;
- approximate retrieval marked mandatory;
- self-declared trust;
- mutable external state.
