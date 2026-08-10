# SKILL-03 — Rezolvarea unui task prin problem circuits

## Scop

Acest skill este folosit când un coding agent primește un task concret și trebuie să construiască un problem circuit acceptat.

## Inputs

- task description;
- sources;
- active package lock;
- assurance profile;
- registry access;
- budgets;
- prior attempts/receipts.

## Outputs

- root problem circuit;
- task-local interpretation;
- selected optional template calls;
- attempts;
- accepted outputs;
- final receipt;
- limitations.

## Workflow

### 1. Formulează contractul

Definește:

- requested outputs;
- sources;
- scope;
- goals;
- blocking unknowns;
- profile.

Goals nu trebuie să fie inventate doar după ce answer-ul este cunoscut.

### 2. Creează workspace

```text
task/
  source/
  interpretation/
  problem/
  attempts/
  receipts/
  artifacts/
```

### 3. Reutilizează interpretări

Caută packages/receipts existente.

Nu reinterpreta dacă source/hash și profile sunt compatibile.

### 4. Construiește root circuit minimal

Include:

- input handles;
- interpretation calls;
- publications;
- optional rules necesare;
- output renderer;
- goals.

Nu duplica mandatory hooks manual decât pentru claritate; closure le va instanția.

### 5. Compilează înainte de execuție

Rezolvă syntax/wiring diagnostics.

Nu cere LLM-ului să interpreteze runtime errors care sunt diagnostics precise.

### 6. Execută attempt

Păstrează receipt.

### 7. Clasifică outcome

#### Structural

Repară source.

#### Refusal

Verifică missing data, rule applicability, wrong circuit.

#### Mandatory closure rejection

Examinează instanța și evidence. Nu elimina hook-ul.

#### Invariant/goal failure

Modifică result circuit sau adaugă evidence.

#### Inconclusive

Decide dacă mărește budget, adaugă source sau raportează uncertainty.

#### Error

Repară command/sandbox.

### 8. Creează attempt nou

Nu muta receipt-ul anterior.

Aplică schimbarea minimă.

### 9. Verifică output text

Dacă output este text:

- extract claims;
- compare supports;
- handle conflicts;
- no unsupported additions;
- preserve uncertainty.

### 10. Finalizează

Accepted attempt trebuie să aibă:

- package lock;
- profile hash;
- source manifest;
- outputs;
- final receipt;
- human-readable explanation;
- limitations.

## Selectarea template-urilor

Optional discovery:

1. query registry după goal și publications;
2. cere recall larg;
3. verifică matcher;
4. estimează cost;
5. instanțiază numai candidates relevante.

Mandatory templates nu sunt selectate de agent.

## Relevanța circuitelor

Un optional circuit este relevant dacă output-ul său apare în slice-ul unui goal/output acceptat.

Agentul trebuie să elimine sau să raporteze nodes decorative.

## Strategia attempts

Începe cu circuit minimal.

Adaugă complexity când receipts indică obligație.

Nu genera 20 de variante fără a analiza failure-ul.

## Interdicții

- Nu edita assurance profile.
- Nu înlocui `unknown` cu presupunere.
- Nu ignora mandatory conflict.
- Nu crea verifier local și să-l declare trusted.
- Nu hardcode-ui output-ul dorit.
- Nu șterge prior attempts.
- Nu folosi un LLM answer direct ca final output fără grounding.

## Checklist final

- Outputs exacte?
- Goals predefinite?
- Closure complet?
- All blocking invariants pass?
- Output slices admissible?
- Receipts complete?
- Unknowns stated?
- Incremental reuse documented?
