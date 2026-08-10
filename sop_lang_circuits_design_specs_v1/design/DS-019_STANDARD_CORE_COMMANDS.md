# DS-019 — Core commands și Assurance Core

## 1. Delimitare

Core commands sunt implementate de runtime și au semantică stabilă. Ele nu trebuie confundate cu commands de domeniu.

Core-ul general oferă operații mici pentru valori, artifacts și assurance.

Assurance Core oferă operații deterministe pentru mandatory matching.

Un implementator poate adăuga commands, dar nu trebuie să modifice semantica celor standard fără schimbare de versiune.

## 2. Convenția de documentare

Fiecare command are:

- formal parameters, în ordine;
- output;
- refusal conditions;
- effects;
- determinism;
- receipt requirements.

## 3. `value`

Declarație conceptuală:

```text
@value define source
```

Utilizare:

```text
@threshold value "30"
@copy value $existing
```

Semantica: produce valoarea argumentului.

Efect: pure.

Nu parsează stringul.

## 4. `absent`

```text
@missing absent
```

Nu are parametri.

Produce sentinel-ul runtime `undefined-intentional`.

Acesta este convertit la `undefined` când este transmis unui command, dar are identitate și receipt.

Efect: pure.

## 5. `alias`

```text
@copy alias $source
```

Produce aceeași valoare și păstrează canonical source identity.

Este util când un output trebuie redenumit sau când publication trebuie separată.

Efect: pure.

## 6. `get`

Formals:

```text
value path
```

Utilizare:

```text
@witness get $proof "witness"
```

`path` folosește JSON Pointer simplificat sau dot path stabilit de runtime. Recomandare v1: JSON Pointer.

Refuză dacă path inexistent.

`getOptional` MAY fi oferit pentru output `undefined-intentional`.

## 7. `hash`

Formals:

```text
value
```

Produce hash canonical.

Efect: pure.

## 8. `equal`

Formals:

```text
left right
```

Produce boolean equality pe canonical values.

## 9. `compare`

Formals:

```text
left operator right
```

Operator este literal:

```text
"lt" "le" "eq" "ne" "ge" "gt"
```

Produce Assurance Result sau boolean conform API.

Conversia numerică nu este implicită în profile strict; valorile trebuie să fie numbers canonice sau să existe parse command.

## 10. `parseNumber`

Formals:

```text
value
```

Acceptă string numeric și produce number canonical.

Refuză pentru format invalid, NaN, Infinity dacă profile nu permite.

## 11. `publish`

Formals:

```text
value semanticKey
```

Utilizare:

```text
@published publish $fact "fact.noticeDays"
```

Output-ul este aliasul valorii.

Side effect intern: semantic index registration.

Determinism: da, relativ la index/epoch.

Receipt: key, canonical wire ID, dedup status.

Un command JS de domeniu nu poate scrie direct în index.

## 12. `assertInvariant`

Formals:

```text
condition code
```

Utilizare:

```text
@proofValid assertInvariant $condition "legal.notice.proof"
```

Produce:

```text
{ ok, code, evidence }
```

`condition` trebuie să fie boolean sau Assurance Result.

`assertInvariant` nu transformă un calcul neîncrezut într-un verifier trusted. Trust-ul vine din dependency slice și profile.

## 13. Collection helpers

### `emptyList`

Fără parametri. Produce array frozen gol.

### `append`

Formals:

```text
list item
```

Produce list nou.

### `concat`

Formals:

```text
left right
```

Produce list nou.

Acestea evită introducerea variadic syntax în v1.

## 14. Artifact commands

### `artifactRead`

Formals:

```text
handle
```

Cere capability read.

### `artifactWrite`

Formals:

```text
content metadata
```

Cere capability write și produce content-addressed handle.

Nu este permis în mandatory matchers.

## 15. Assurance Core: `select`

Formals:

```text
index key
```

Output: list stabil ordonată de wire handles publicate sub key.

Semantica MUST fi exhaustivă.

## 16. Assurance Core: `join`

Formals:

```text
left right leftPath rightPath
```

Input lists conțin handles sau tuples de handles.

Pentru fiecare pereche, runtime citește câmpurile indicate din payload-uri.

Output: concatenarea tuple-urilor pentru toate egalitățile.

Ordine stabilă lexicografic după canonical handle IDs.

Nu are top-k.

## 17. Assurance Core: `filter`

Formals:

```text
items predicatePackage
```

Pentru fiecare tuple, instanțiază predicate circuit-ul cu tuple elements ca inputs.

Predicate circuit-ul trebuie:

- să fie package aprobat;
- să aibă un output;
- să fie pure/determinist;
- să nu publice valori;
- să returneze boolean/Assurance Result.

Output: toate tuples acceptate.

Receipt: candidate count, pass/fail per tuple.

## 18. Assurance Core: `distinct`

Formals:

```text
items
```

Deduplică după canonical tuple identity.

## 19. Assurance Core: `union`

Formals:

```text
left right
```

Set union stabil.

## 20. Assurance Core: `difference`

Formals:

```text
left right
```

Set difference.

Pentru mandatory monotone matching, `difference` nu se folosește pentru absența facts decât într-un strat sealed.

## 21. Assurance Core: `project`

Formals:

```text
items projection
```

`projection` este literal precum `"0,2"`.

Output: tuples cu pozițiile selectate.

Runtime validează indices.

## 22. Assurance Core: `unify`

Formals:

```text
left right
```

Aplică unificare asupra termenilor canonici sau domain adapter aprobat.

Output: substitution sau refusal.

Unification semantics trebuie versionată.

## 23. `source`

Implementările MAY oferi core command pentru binding de source handles, dar external inputs SHOULD fi furnizate prin `@input`, nu hardcodate în circuit.

## 24. Ce nu intră în core

Nu intră:

- `fact`;
- `rule`;
- `legalNotice`;
- `allPositive`;
- `validate`;
- `solve`;
- `generateAnswer`.

Acestea sunt domain/application commands.

## 25. Criterii de conformitate

Fiecare core command trebuie să aibă:

- reference tests;
- canonical receipts;
- deterministic ordering;
- error/refusal tests;
- security policy;
- schema version.
