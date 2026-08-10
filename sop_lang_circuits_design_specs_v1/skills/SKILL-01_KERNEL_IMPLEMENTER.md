# SKILL-01 — SOP Lang Circuits Kernel Implementer

## Scop

Acest skill este folosit de un coding agent care implementează sau modifică parserul, compilatorul, runtime-ul, semantic index-ul, closure engine-ul ori assurance engine-ul.

## Surse obligatorii

Agentul trebuie să citească înainte de cod:

- DS-003;
- DS-004;
- DS-005;
- DS-006;
- DS-008;
- documentul specific modulului modificat;
- DS-020 pentru teste.

Nu trebuie să deducă sintaxa din exemple izolate.

## Reguli fixe

Agentul nu modifică fără design decision explicit:

- apeluri poziționale;
- literali ghilimați;
- command formals pe linia `define`;
- completarea parametrilor command lipsă cu `undefined`;
- circuit arity strictă;
- no implicit capture;
- wires locale;
- multi-output direct binding;
- no named arguments;
- mandatory matchers restricted;
- external assurance profile.

## Workflow

### 1. Definește contractul modulului

Scrie:

- inputs;
- outputs;
- errors;
- deterministic behavior;
- state;
- schema version.

### 2. Creează fixtures

Înainte de implementare, adaugă:

- minimum positive fixture;
- negative fixture;
- edge case;
- regression fixture.

### 3. Implementează reference behavior

Preferă o implementare simplă și deterministă.

Nu optimizează înainte de conformance.

### 4. Emite structured diagnostics

Fiecare error are code, package, line și details.

### 5. Păstrează immutability

IR și receipts nu sunt mutate după publicare.

### 6. Testează cross-module invariants

Exemplu: parser formals order trebuie să coincidă cu executor binding.

### 7. Rulează adversarial tests

În special:

- hidden wire capture;
- too many args;
- fake verifier;
- omitted mandatory rule;
- tampered cache.

### 8. Actualizează docs

Orice semantic change necesită:

- design decision;
- schema version;
- migration note;
- tests.

## Module-specific guidance

### Parser

Tratează JS define body ca lexical island.

Nu tokenizează JavaScript cu parser SOP.

### Compiler

Construiește producer map înainte de graph.

Păstrează source maps.

### Executor

Nu amesteca refusal și exception.

Nu expune partial child outputs.

### Matcher runtime

Nu permite early stop pentru mandatory.

Ordinea output trebuie stabilă.

### Closure engine

Păstrează expected și executed sets distincte.

Rulează final audit.

### Assurance engine

Nu accepta package trust declarat de problem circuit.

Verifică covers prin graph reachability.

### Cache

Cheia include checker și environment.

Nu promova trust din cache.

## Output-urile agentului

Agentul livrează:

- code;
- unit tests;
- conformance tests;
- fixtures;
- sample receipt;
- change note;
- performance delta;
- security note.

## Interdicții

Agentul nu trebuie:

- să introducă named parameters pentru comoditate;
- să citească wire store din JS;
- să folosească `eval` în production fără sandbox;
- să transforme timeout în false;
- să accepte incomplete closure;
- să ignore diagnostics pentru dead nodes fără documentare;
- să declare milestone complete fără tests.

## Checklist final

- Semantica respectă DS?
- Toate errors au cod?
- Hashing este deterministic?
- Tests negative există?
- Receipt-ul este suficient?
- Security boundary este păstrat?
- Reference and optimized behavior coincide?
