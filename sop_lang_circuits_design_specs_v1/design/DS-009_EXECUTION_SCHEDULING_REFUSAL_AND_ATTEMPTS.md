# DS-009 — Execuție, scheduling, refuz și attempts

## 1. Modelul executorului

Executorul primește:

- compiled root package;
- input bindings;
- package lock;
- assurance profile;
- epoch;
- cache;
- capability broker.

El produce:

- wire values;
- node receipts;
- circuit receipts;
- closure receipts;
- final outcome.

## 2. Root set

Executorul nu rulează automat toate nodes.

Root set-ul include:

- `@output` ale root problem circuit;
- wires declarate prin `@goal`;
- blocking `@invariant`;
- semantic publications necesare mandatory closure;
- outputs/invariants ale mandatory template instances.

Dependency slices determină nodes executate.

## 3. Topological scheduling

Nodes READY sunt cele ale căror dependencies au status SUCCEEDED sau CACHED.

Executorul poate rula nodes independente în paralel.

Ordinea paralelă nu trebuie să schimbe rezultatul commands pure.

Commands effectful pot necesita serializare prin capability broker.

## 4. Statusuri de node

| Status | Semnificație |
|---|---|
| PENDING | node cunoscut, dependencies nefinalizate |
| READY | dependencies disponibile |
| RUNNING | execuție în curs |
| SUCCEEDED | output produs și check acceptat |
| CACHED | output și receipt reutilizate |
| REFUSED | command a refuzat inputs |
| CHECK_FAILED | run a produs output, check a eșuat |
| ERROR | excepție sau defect runtime |
| BLOCKED | dependency nu a reușit |
| CANCELLED | attempt oprit de policy/budget |

## 5. Statusuri de circuit

| Outcome | Semnificație |
|---|---|
| SUCCEEDED | outputs și local invariants disponibile |
| REFUSED | un node necesar a refuzat |
| REJECTED | circuit executabil, dar invariant/goal/closure a eșuat |
| INCONCLUSIVE | buget, timeout sau solver unknown |
| ERROR | defect tehnic |

`REJECTED` este rezultat semantic/policy. `ERROR` este defect de implementare/mediu.

## 6. Propagarea refuzului

Dacă node-ul `N` refuză, consumatorii din slice devin BLOCKED.

Circuitul produce receipt cu:

- refusal code;
- inputs;
- source span;
- blocked outputs;
- blocked invariants/goals.

Outputs parțiale nu sunt expuse ca succes.

## 7. Attempts

Un attempt este director sau package version imuabil.

Exemplu:

```text
attempts/0001/
attempts/0002/
```

Attempt nou poate:

- modifica problem circuit;
- adăuga commands;
- selecta alte optional templates;
- schimba interpretation candidate;
- adăuga evidence.

Nu poate modifica active assurance profile în aceeași linie de evaluare.

## 8. Agent repair loop

Runtime-ul produce machine-readable diagnostics.

Coding agent-ul:

1. clasifică failure-ul;
2. decide dacă problema este syntax, wiring, refusal, missing rule, failed invariant, conflict sau budget;
3. modifică minimum necessary package;
4. creează attempt nou;
5. rerulează incremental;
6. păstrează history.

Runtime-ul nu „repară” semantic circuitul fără un artefact nou.

## 9. Budgets

Profile-ul poate fixa:

- max nodes;
- max closure rounds;
- max template instances;
- max wall time;
- max oracle calls;
- max external cost.

Epuizarea bugetului produce INCONCLUSIVE, nu ACCEPTED și nu false.

## 10. Speculative execution

Optional template candidates pot fi executate în sandbox speculative.

Rezultatele lor nu intră în accepted graph până când:

- candidate package este permis;
- outputs contribuie la goal;
- invariants required trec;
- acceptance policy admite trust level.

Write effects sunt interzise în speculative execution.

## 11. Checkpointing

Pentru taskuri mari, executorul SHOULD checkpoint:

- completed node receipts;
- semantic index;
- closure queue;
- executed instance set;
- budget counters.

Checkpoint-ul este valid numai în același epoch și package lock.

## 12. Retry

Retry-ul trebuie să fie explicit.

Cazuri:

- transient network error: policy poate rerula;
- oracle rate limit: rerulare cu receipt;
- deterministic exception: fără retry automat;
- refusal: planner trebuie să creeze alt attempt;
- invariant failure: alt attempt;
- timeout: poate crește budget într-un epoch nou.

## 13. Cancellation

Un attempt poate fi oprit.

Node receipts complete rămân cacheable dacă effects și policy permit.

Node RUNNING effectful trebuie gestionat tranzacțional.

## 14. Criterii de conformitate

Testele trebuie să arate:

- topological order;
- parallel independent nodes;
- refusal propagation;
- distinction rejection/error/inconclusive;
- immutable attempts;
- incremental retry;
- budget exhaustion;
- cancellation safety;
- no output leakage from failed child circuits.
