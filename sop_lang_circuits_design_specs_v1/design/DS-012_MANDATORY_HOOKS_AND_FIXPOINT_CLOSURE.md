# DS-012 — Mandatory hooks și closure până la punct fix

## 1. Scop

Mandatory Hook Closure rezolvă problema omisiunii. Un planner poate produce un argument local coerent și totuși să nu aplice o regulă obligatorie. Closure-ul face aplicarea independentă de plan.

## 2. Precondiții

Înainte de closure:

- assurance profile este fixat;
- package hashes sunt locked;
- mandatory matcher packages sunt validate;
- problem circuit inițial a produs publications;
- semantic index este finit pentru round-ul curent.

## 3. Starea closure engine-ului

Engine-ul păstrează:

- semantic index;
- delta queue;
- active matcher set;
- expected instance set;
- executed instance set;
- refused/failed instance set;
- round counter;
- budgets;
- closure receipt builder.

## 4. Activare

Când o publication nouă apare, trigger index-ul activează matcher-ele asociate semantic key.

Matcher-ul rulează asupra index/delta.

Un matcher rămâne activ pentru final audit.

## 5. Instance generation

Pentru fiecare match tuple:

1. target package este rezolvat;
2. structural compatibility este verificată;
3. instance ID este calculat;
4. dacă ID este deja executed, se deduplicatează;
5. dacă este nou, target circuit este instanțiat;
6. outputs și invariants sunt executate;
7. publications noi intră în delta.

## 6. Punct fix

O rundă se încheie când toate matcher-ele activate de delta au fost procesate.

Closure este atins când:

- delta este gol;
- nicio instanță nouă nu a fost adăugată;
- niciun matcher pending nu există.

Dacă budget-ul se epuizează, outcome este INCONCLUSIVE.

## 7. Final completeness audit

După aparentul punct fix:

- toate matcher-ele activate sunt evaluate pe indexul final;
- se construiește expected instance set;
- se compară cu executed instance set.

Dacă există expected minus executed, closure este incomplet și attempt-ul nu poate fi acceptat.

Dacă există executed minus expected, receipt-ul raportează instanțe istorice; acestea pot rămâne valide dacă provin din rounds anterioare și matcher-ul este monotone. Dacă matcher-ul nu este monotone, mandatory use este interzis în v1.

## 8. Monotonicitate

Mandatory matchers v1 MUST fi monotone:

- adăugarea de index entries nu retrage matches existente;
- predicate-ul nu depinde de absența unui fact, decât prin stratificare explicită într-o fază ulterioară.

Reguli bazate pe negation-as-failure necesită stratification:

1. closure pozitiv;
2. seal index stratum;
3. evaluate negative rules;
4. no feedback către strata anterioare.

V1 poate amâna negation-as-failure și folosi negație explicită.

## 9. Refusal mandatory

Matcher-ul ar trebui să emită numai bindings aplicabile.

Dacă target mandatory circuit refuză:

- instance status este REFUSED;
- closure nu este complet acceptabil;
- attempt este REJECTED sau INCONCLUSIVE conform refusal code;
- planner primește receipt.

Refusal nu este ignorat ca „rule did not apply”, deoarece matcher-ul a declarat aplicabilitatea.

## 10. Failure mandatory

Exception sau check failure într-o mandatory instance este blocking.

Profile-ul nu poate downgrade silencios un verifier failure.

## 11. Cascades

Un rule circuit poate publica:

- derived support;
- conflict;
- obligation;
- candidate fix.

Aceste publications activează alte hooks.

Exemplu:

```text
notice facts
  -> invalidity rule
  -> negative support
  -> contradiction hook
  -> conflict
  -> grounding hook
  -> answer assurance
```

## 12. Termination

Closure termină dacă:

- index domain este finit;
- matchers monotone;
- instance identity deduplicatează;
- fiecare instance produce finit publications;
- budgets sunt finite.

Pentru domains infinite, template-ul trebuie să introducă abstraction, bounds sau internal fixpoint command.

## 13. Incremental closure

În epoch nou:

- invalidate publications dependente de changed sources;
- remove dependent instances din materialized state;
- re-evaluate delta;
- preserve unaffected instances.

Pentru simplificarea primului prototip, se poate recomputa closure din index materializat pe package-level, dar designul trebuie să păstreze dependencies.

## 14. Coverage theorem condițional

Dacă:

- trigger registry activează toate mandatory matcher-ele relevante;
- matcher operations sunt exhaustive;
- matchers sunt monotone;
- final audit se termină;
- expected = executed;

atunci nicio match instanță identificată de profile pe starea finală nu a fost omisă.

Aceasta este o garanție operațională precisă. Nu demonstrează completitudinea knowledge base-ului.

## 15. Criterii de conformitate

Suitele MUST demonstra:

- single-round closure;
- multi-round cascade;
- dedup;
- matcher reactivation;
- final audit;
- refusal mandatory;
- budget inconclusive;
- monotonicity violation detection;
- incremental update;
- adversarial planner omission.
