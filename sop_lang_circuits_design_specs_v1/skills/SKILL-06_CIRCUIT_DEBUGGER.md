# SKILL-06 — Diagnosticarea circuitelor și repararea attempts

## Scop

Skill pentru analiza unui failure receipt și producerea unei remedieri minimale.

## Input

- attempt source;
- compiler diagnostics;
- runtime receipt;
- closure receipt;
- profile;
- prior attempts.

## Failure tree

### Parse/compile

Rezolvă direct line/code.

### Free wire

Determină dacă trebuie:

- adăugat `@input`;
- conectat producer;
- transmis circuit output.

Nu introduce global.

### Arity

Verifică formals și `@input/@output`.

Nu adăuga named parameters.

### Refusal

Citește code/details.

Verifică dacă:

- input lipsă;
- wrong template;
- actual non-applicability;
- source incomplete.

### Check failure

Compară run output și relation.

Poate fi bug în run sau check.

### Invariant failure

Examinează dependency slice.

Verifică source, output și verifier.

### Closure failure

Compară expected/executed.

Cauze:

- trigger;
- matcher;
- instance refusal;
- budget;
- dedup bug.

### Goal failure

Task solution incomplete/incorrect.

### Trust failure

Output depinde de untrusted package.

Adaugă independent verification, nu schimbă profile.

### Receipt failure

External snapshot, hash sau evidence lipsă.

## Repair protocol

1. reproduce failure;
2. isolate minimum subgraph;
3. write regression test;
4. modify one package;
5. create new attempt;
6. rerun affected slices;
7. compare receipts;
8. document why fix is semantic, not cosmetic.

## Useful audit queries

- ancestors of failed goal;
- first refused node;
- all mandatory matches for key;
- why instance ID deduped;
- which output lacks trusted invariant;
- source changes between attempts;
- cache entries reused.

## Anti-patterns

- catch exception and return false;
- replace refusal with default;
- remove goal;
- remove mandatory publication;
- edit profile;
- mark verifier trusted;
- regenerate whole project without root cause.

## Output

- diagnosis;
- regression test;
- patch;
- new attempt;
- diff of outcomes;
- remaining uncertainty.
