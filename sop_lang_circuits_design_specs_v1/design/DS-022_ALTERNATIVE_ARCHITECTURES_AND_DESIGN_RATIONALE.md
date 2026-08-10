# DS-022 — Arhitecturi alternative și justificarea designului

## 1. Întrebarea fundamentală

Alternativa principală este traducerea tuturor problemelor într-un singur formalism cu semantică fixă.

SOP Lang Circuits alege un meta-IR eterogen: dataflow SSA + commands arbitrare + un Assurance Core restricționat.

## 2. Datalog

Datalog oferă facts, rules și fixpoint bine înțeles.

Avantaje:

- sound semantics;
- exhaustive evaluation;
- optimizations;
- provenance;
- incremental maintenance.

Limită:

- algorithms arbitrare și external tools necesită extensii.

Recomandare: mandatory matching și closure ar trebui să împrumute puternic din Datalog.

## 3. Constraint Handling Rules

CHR reprezintă state ca constraints și rules de simplificare/propagare.

Avantaje:

- natural pentru hooks;
- results despre confluence/termination;
- incremental.

Limită:

- open-ended JS/dataflow integration mai dificilă.

CHR este cea mai apropiată alternativă la mandatory hooks.

## 4. Attribute grammars

Attribute grammars calculează semantic values pe syntax trees.

Avantaje:

- dependency graphs;
- incremental evaluation;
- compositional semantics.

Limită:

- textul natural și cross-document rules nu au un singur parse tree stabil.

SOP Lang poate fi văzut ca generalizare de la attributed tree la package graph.

## 5. DRT și semantic parsing

Textul poate fi tradus în logical forms/DRS.

Avantaje:

- explicit semantics;
- quantification, negation, discourse;
- deterministic execution.

Limită:

- formalization bottleneck;
- specialized algorithms need foreign functions.

Recomandare: folosiți ca interpretation frontend, nu ca unic runtime.

## 6. Rewriting logic și K

State + rewrite rules oferă executable semantics.

Avantaje:

- rigorous transition model;
- analysis derived from semantics.

Limită:

- dataflow provenance și heterogeneous tools mai puțin naturale.

Potrivit când domeniul are operational semantics uniformă.

## 7. Proof assistants

Lean/Coq/Isabelle oferă garanții tari.

Avantaje:

- small trusted kernel;
- proof objects.

Limită:

- formalization cost;
- ambiguity and open domains.

Recomandare: backend pentru subcircuite critice și certificates.

## 8. Proof-carrying artifacts

Producer neîncrezut + certificate + checker mic.

Aceasta este inspirația principală pentru trust model.

SOP receipts sunt mai generale decât proofs formale, deci garanția poate fi mai slabă. Când există certificate, ele trebuie preferate.

## 9. E-graphs

Equality saturation păstrează forme echivalente.

Util pentru:

- circuit normalization;
- common subexpression;
- equivalent template composition;
- cost extraction.

Nu rezolvă singur adevărul sau mandatory coverage.

## 10. Traditional compilers/dataflow

SSA, topological scheduling și incremental build systems oferă credibilitate pentru execution mechanics.

Diferența este că payload-ul este semantic și commands pot fi agents/solvers.

## 11. Workflow engines

Workflow DAGs seamănă structural.

Diferența necesară:

- explicit semantic index;
- mandatory matcher closure;
- invariants/goals coverage;
- trust receipts;
- executable KB.

Fără acestea, SOP Lang ar fi doar un workflow syntax.

## 12. De ce hibrid

Un singur formalism oferă garanții mai uniforme, dar limitează domains.

JavaScript arbitrar oferă flexibilitate, dar nu oferă coverage sau soundness.

Hibridul:

```text
general SOP graph
  + restricted mandatory matching
  + trusted/certificate verifiers
  + external formal backends
```

păstrează extensibilitatea și creează un nucleu credibil de acceptare.

## 13. Decizii respinse

### Named parameters

Respinse pentru v1. Formals declarate + positional calls sunt suficiente.

### Implicit wire capture

Respinsă. Ascunde dependencies.

### Instance output namespace

Respins. Parent binds child outputs direct la local wires.

### Global `validate` command

Respins. Acceptance este property a runtime/profile.

### Arbitrary mandatory matcher JS

Respins. Nu poate garanta exhaustive matching.

### Wire type annotations obligatorii

Respins. Semantica rămâne în commands; runtime metadata este derivată.

## 14. Posibile extensii

- typed interfaces optional;
- effect system;
- rest parameters;
- explicit closures;
- higher-order circuit handles;
- verified matcher DSL;
- e-graph optimizer;
- proof assistant bridge;
- distributed closure.

Extensiile trebuie să păstreze dependențele explicite și receipt compatibility.

## 15. Concluzie

SOP Lang Circuits trebuie poziționat ca orchestration and assurance meta-IR, nu ca logică universală.

Credibilitatea vine din combinarea disciplinată a rezultatelor existente:

- SSA pentru dependencies;
- Datalog/CHR pentru closure;
- proof-carrying pentru trust;
- attribute grammars/build systems pentru incrementality;
- formal backends pentru subprobleme tari.

LLM-ul rămâne generator și planner, nu arbitru final.
