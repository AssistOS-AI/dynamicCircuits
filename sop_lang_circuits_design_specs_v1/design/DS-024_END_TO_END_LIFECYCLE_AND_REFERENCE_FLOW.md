# DS-024 — Flux end-to-end de referință

## 1. Scop

Acest document leagă conceptele într-un flux complet. Nu introduce sintaxă nouă.

## 2. Faza A — Inițializarea taskului

Se fixează:

- source manifest;
- task contract;
- package lock;
- assurance profile;
- budgets;
- epoch.

Dacă aceste elemente se schimbă, se creează alt epoch.

## 3. Faza B — Interpretarea

Agentul creează interpretation circuits pe segmente.

Fiecare circuit:

- păstrează source spans;
- produce structured values;
- publică semantic keys;
- raportează ambiguity.

Interpretarea poate fi verificată independent.

## 4. Faza C — Planificarea

Agentul examinează:

- goals;
- semantic index;
- optional templates;
- prior receipts.

El creează root problem circuit și calls statice pentru components pe care dorește să le folosească.

Nu trebuie să includă manual mandatory templates pentru ca ele să fie aplicate, deși poate apela explicit același template dacă output-ul este necesar pentru răspuns.

## 5. Faza D — Compilarea

Compilerul:

- rezolvă packages;
- leagă arguments;
- verifică wires;
- construiește graph;
- verifică coverage;
- calculează slices.

Failure-ul produce diagnostics, nu runtime attempt.

## 6. Faza E — Execuția inițială

Executorul rulează:

- root outputs;
- local goals/invariants;
- publish nodes.

Semantic index primește facts/claims/outputs.

## 7. Faza F — Mandatory closure

Trigger-ele activează matchers.

Matches instanțiază rules/verifiers.

Outputs noi sunt publicate.

Closure continuă până la punct fix.

Final audit confirmă coverage.

## 8. Faza G — Assurance

Se colectează:

- local invariants;
- mandatory instance invariants;
- root goals;
- output slices;
- trust levels;
- receipts.

Un output textual este verificat de grounding templates.

## 9. Faza H — Outcome

### Accepted

Toate gates trec.

### Rejected

Există failure semantic/policy.

### Inconclusive

Budget/data/solver insuficient.

### Error

Defect tehnic.

## 10. Faza I — Repair

Agentul primește receipt.

Creează attempt nou.

Reutilizează cache.

Nu modifică profile.

## 11. Exemplu juridic condensat

Interpretarea publică:

```text
fact.noticeDays(T1,10)
fact.minimumNotice(T1,30)
support.positive(validTermination(T1))
```

Attempt 1 generează text „T1 este validă”.

Mandatory invalidity matcher produce inputs `(actual, minimum)`.

Rule produce support negativ.

Contradiction hook produce conflict.

Grounding hook leagă answer record cu conflict.

Grounding invariant este fals. Attempt respins.

Attempt 2 apelează explicit invalidity rule, construiește conflict și generează text care îl recunoaște.

Mandatory closure deduplicatează rule instance deja executată.

Grounding trece. Task acceptat.

## 12. Exemplu științific condensat

Interpretarea publică dataset și claim universal.

Attempt 1 calculează media pozitivă și afirmă toate valorile pozitive.

Mandatory counterexample rule găsește `-2`.

Conflict și grounding resping answer.

Attempt 2 folosește witness. Accepted.

## 13. Ce se păstrează între attempts

- source interpretation neschimbată;
- dataset;
- counterexample;
- rule receipts;
- conflict;
- verifier receipts.

Se recalculază renderer și grounding dependent.

## 14. Failure localizare

Receipt permite să distingă:

- wrong interpretation;
- missing template;
- matcher defect;
- rule refusal;
- verifier failure;
- output grounding failure;
- budget.

## 15. Guarantee statement

Final system statement trebuie să fie de forma:

„În epoch E, utilizând interpretation I, package lock K și assurance profile P, outputs O au satisfăcut goals G; toate mandatory instances identificate în starea finală au fost executate; invariants blocking au trecut. Limitările sunt L.”

## 16. Definition of successful implementation

Reference flow trebuie să fie executabil automat în integration tests, cu:

- attempt 1 rejection;
- attempt 2 acceptance;
- closure receipts;
- cache reuse;
- source-to-output trace.
