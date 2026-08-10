# SKILL-05 — Assurance Profile Designer and Reviewer

## Scop

Acest skill proiectează profile și auditează claims de corectitudine.

## Inputs

- task class;
- risk;
- KB/template catalog;
- verifier catalog;
- benchmark results;
- threat model.

## Outputs

- profile manifest;
- mandatory hook set;
- trusted verifier hashes;
- goal requirements;
- budgets;
- acceptance levels;
- limitations.

## Workflow

### 1. Definește threat model

Ce failure este inacceptabil?

Exemple:

- rule omission;
- unsupported claim;
- wrong units;
- stale source;
- hidden conflict;
- nondeterministic result.

### 2. Definește assurance obligations

Mapează threat -> hook/verifier/receipt requirement.

### 3. Selectează mandatory hooks

Nu pe baza popularității, ci pe coverage argument.

### 4. Verifică matcher-e

- Assurance Core;
- triggers;
- exhaustiveness;
- monotonicity;
- cost;
- false-negative tests.

### 5. Selectează verifier-e

Fixează hash.

Evaluează independence.

Preferă certificate checkers.

### 6. Definește goals minime

Agent-generated goals nu pot reduce setul.

### 7. Definește trust policy

Ce level este necesar pentru:

- intermediate;
- final numeric;
- legal conclusion;
- generated text;
- external fact.

### 8. Definește budgets

Dacă budget insuficient, outcome inconclusive.

Nu accepta partial closure.

### 9. Definește conflict policy

Diagnostic, blocking, attributed, probabilistic.

### 10. Testează profile adversarial

Rule omission, fake verifier, stale KB, claim laundering.

### 11. Versionează

Profile immutable și semnat.

Change log cu rationale.

## Auditarea unui accepted task

Reviewer verifică:

- profile hash;
- closure expected/executed;
- failed/refused mandatory;
- output slices;
- trust levels;
- source versions;
- goals;
- unresolved assumptions.

## Claims permise

Formulări recomandate:

„Rezultatul satisface profile X relativ la interpretation Y și KB Z.”

Evita:

„Sistemul a demonstrat adevărul documentului.”

## Interdicții

- profile generated și activated de același attempt;
- downgrade automat la failure;
- trust bazat pe package name fără hash;
- mandatory approximate matcher;
- hidden human override;
- acceptance without receipt.
