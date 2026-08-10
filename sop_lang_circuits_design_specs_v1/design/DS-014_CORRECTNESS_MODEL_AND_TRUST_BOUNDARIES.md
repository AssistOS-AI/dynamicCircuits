# DS-014 — Modelul corectitudinii și granițele încrederii

## 1. Corectitudinea ca proprietate stratificată

SOP Lang Circuits nu poate reduce corectitudinea la un boolean generic. Sistemul separă:

1. corectitudinea reprezentării;
2. corectitudinea structurală;
3. corectitudinea locală a nodes;
4. completitudinea aplicării regulilor obligatorii;
5. satisfacerea goals;
6. fidelitatea output-ului;
7. reproducibilitatea.

Fiecare strat are ipoteze diferite.

## 2. Corectitudinea interpretării

Interpretation circuit-ul trebuie să păstreze:

- source identity;
- source spans;
- extraction method;
- alternative interpretations;
- assumptions.

Runtime-ul poate demonstra că un fact provine dintr-un span. Nu poate demonstra singur că interpretarea este cea intenționată de autor.

Pentru profile critice se cer:

- parser controlat;
- human approval;
- independent extractors;
- adjudication circuit;
- confidence threshold cu unresolved cases blocking.

## 3. Corectitudinea structurală

Compilatorul poate demonstra mecanic:

- no free wires;
- SSA;
- exact circuit arity;
- acyclic relevant graph;
- package lock;
- coverage reachability.

Aceasta este partea cea mai tare și cu TCB redus.

## 4. Soundness locală

Pentru un node:

- inputs sunt acceptate;
- run produce output;
- check/certificate confirmă relația.

Dacă checker-ul este sound, output-ul respectă relația command-ului.

Aceasta se compune topologic: dacă toate nodes din slice sunt sound și sources acceptate, output-ul respectă compoziția relațiilor.

## 5. Limita self-check-ului

`run` și `check` din același package pot partaja aceeași eroare.

Self-check este util pentru bug-uri de implementare, nu este suficient pentru validare semantică critică.

Profilele pot cere:

- verifier independent;
- dual implementation;
- witness;
- formal certificate;
- metamorphic tests;
- counterexample search.

## 6. Mandatory coverage

Closure theorem este condițional pe matcher exhaustiveness.

El demonstrează că plannerul nu a omis matches cunoscute, nu că KB-ul este complet.

Coverage risk trebuie raportat separat:

- registry completeness;
- trigger completeness;
- matcher false-negative risk;
- profile scope.

## 7. Goal adequacy

Chiar dacă goals sunt satisfăcute, taskul poate fi slab formulat.

Task authoring trebuie să includă review al goals.

Pentru agent-generated goals, profile-ul poate impune canonical domain goals.

## 8. Trusted Computing Base

TCB minim:

- parser/compiler;
- package/hash resolver;
- graph builder;
- topological executor;
- canonical serializer;
- semantic index;
- Assurance Core operations;
- closure engine;
- acceptance evaluator;
- trusted certificate checkers;
- profile manifest verifier.

LLM-uri, generated commands și optional templates nu sunt în TCB.

## 9. Trust levels

Profile-ul clasifică package-uri:

| Nivel | Utilizare |
|---|---|
| Experimental | numai exploratory branches |
| Tested | outputs intermediare cu invariants suplimentare |
| Reviewed | allowed în accepted slices pentru low-risk tasks |
| Trusted verifier | allowed pentru blocking invariants |
| Kernel checker | TCB restrâns, certificate validation |

Trust-ul este fixat prin hash și review record.

## 10. Compositional assurance claim

Pentru un accepted output `O`, dacă:

- source interpretations sunt acceptate;
- toate nodes din slice au relații sound;
- mandatory matchers sunt exhaustive;
- closure este complet;
- goals sunt adecvate;
- trusted verifiers sunt sound;

atunci `O` satisface task contract relativ la aceste artefacte.

Aceasta este o teoremă condițională, nu o promisiune absolută.

## 11. Independence requirements

Verifier independence poate însemna:

- package diferit;
- autor diferit;
- algoritm diferit;
- backend diferit;
- source code lineage diferită.

Package diferit singur nu garantează independență. Receipt-ul SHOULD păstra lineage metadata.

## 12. Certificates

Când este posibil, preferința este:

```text
untrusted producer
  -> result + certificate
  -> small trusted checker
```

Exemple:

- SAT assignment;
- SMT proof;
- counterexample witness;
- Merkle inclusion proof;
- arithmetic trace;
- model-checking counterexample;
- proof assistant term.

## 13. Probabilistic verification

Unele checks sunt statistice.

Profile-ul trebuie să declare:

- error bounds;
- sample method;
- seed;
- confidence;
- whether acceptance is probabilistic.

Nu se etichetează ca formal guarantee.

## 14. LLM oracles

LLM-ul poate:

- propose interpretation;
- rank optional templates;
- generate commands;
- create problem circuits;
- explain failures.

LLM output poate intra în accepted slice numai dacă downstream assurance îl verifică la nivelul cerut.

## 15. Threat model semantic

Sistemul trebuie să reziste la:

- planner care omite rules;
- generated validator constant true;
- matcher care returnează subset;
- command care ascunde network state;
- cache poisoning;
- stale KB version;
- source substitution;
- output text cu claims noi;
- circular support;
- evidence laundering prin aliases.

## 16. Criterii de review

Un reviewer trebuie să poată identifica:

- ce este demonstrat de runtime;
- ce este presupus despre domain;
- ce package-uri sunt trusted;
- unde poate apărea incompletitudinea;
- ce failure produce fiecare assumption violation;
- dacă claim-ul de corectitudine este proporțional cu evidence.
