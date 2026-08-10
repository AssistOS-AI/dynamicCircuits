# DS-011 — Index semantic, matching și wiring automat

## 1. Motivare

Cu milioane de template-uri, plannerul nu poate scana toate package-urile și nu poate decide singur aplicabilitatea.

Sistemul separă:

- discovery, care optimizează recall și cost;
- matching, care decide bindings concrete;
- wiring, care instanțiază interfața circuitului.

## 2. Publicarea semantică

O valoare intră în semantic index numai explicit:

```text
@published publish $actual "fact.noticeDays"
```

`publish`:

- păstrează payload-ul;
- înregistrează canonical wire handle sub key;
- produce un alias wire;
- emite publication receipt.

Această operație evită inspectarea arbitrară a tuturor JS objects.

## 3. Index entry

O intrare conține:

```text
semanticKey
canonicalWireId
valueHash
package
epoch
provenanceRef
```

Payload-ul poate fi citit de matcher prin handle, conform capability.

Aceeași canonical wire publicată de două ori sub aceeași key este deduplicată.

## 4. Trigger index

Registry-ul mapează semantic keys la matcher packages.

Exemplu:

```text
fact.noticeDays
  -> kb.legal.notice.invalidity.matcher
```

Trigger-ul este condition de activare, nu applicability proof.

Un matcher cu două triggers poate fi activat când apare oricare key, dar rulează asupra indexului complet.

## 5. Matcher interface

Mandatory matcher file:

```text
@template mandatory
@trigger "fact.noticeDays" "fact.minimumNotice"
@apply kb.legal.notice.invalidity

@input index delta
@output matches
```

`matches` este o colecție finită de tuples ordonate de wire handles.

Tuple length trebuie să coincidă cu target `@input`.

## 6. Assurance Core

Mandatory matchers MUST utiliza un subset determinist.

Operațiile de bază:

- exhaustive select;
- finite join;
- project;
- filter cu predicate certificate;
- unify;
- distinct;
- stable sort;
- bounded group;
- comparisons;
- set difference.

Nu sunt permise:

- LLM calls;
- random;
- network;
- early termination dependent de heuristic;
- sampling;
- top-k fără declarație că regula este optional;
- hidden state.

## 7. Exemplu de matcher

```text
@template mandatory
@trigger "fact.noticeDays" "fact.minimumNotice"
@apply kb.legal.notice.invalidity

@input index delta
@output matches

@actuals select $index "fact.noticeDays"
@minimums select $index "fact.minimumNotice"

@pairs join
    $actuals
    $minimums
    "subject"
    "subject"

@matches filter
    $pairs
    "kb.legal.notice.invalidity.applicable"
```

`join` produce tuples `[actualHandle, minimumHandle]`.

`filter` invocă predicate circuit-ul în ordinea target inputs.

## 8. Structural compatibility

Runtime-ul verifică pentru fiecare match:

- tuple este array;
- length exact;
- fiecare element este registered wire handle;
- handle aparține epoch-ului;
- target package există;
- target input count coincide;
- package policy permite instanțierea.

Mandatory matches nu pot conține literal values inventate. Dacă o constantă este necesară, ea trebuie să fie wire publicat sau parte din target package code/version.

## 9. Semantic compatibility

Matcher-ul decide semantic compatibility.

Pentru regula de notificare:

- actual și minimum au același subject;
- units compatibile;
- actual < minimum;
- context relevant.

Predicate-ul trebuie să fie determinist și aprobat pentru mandatory use.

## 10. Discovery optional

Pentru optional templates:

1. planner formulează goal summary;
2. registry retrieval produce candidates;
3. LLM poate ordona;
4. matcher-ul candidate-ului produce matches;
5. runtime verifică structural;
6. agent generează static call într-un attempt sau runtime instanțiază speculative.

LLM ranking nu afectează mandatory coverage.

## 11. Matching completeness

Un mandatory matcher este exhaustiv relativ la:

- finite index snapshot;
- semantics of core operations;
- predicate circuit;
- declared triggers.

Receipt-ul trebuie să păstreze:

- index version;
- candidate count;
- join count;
- filter count;
- matches;
- predicate receipts.

## 12. Delta evaluation

Matcher-ul primește:

- `index`: state complet;
- `delta`: new publications since previous round.

Implementarea poate optimiza join-ul prin delta, dar output-ul cumulativ trebuie să fie echivalent cu evaluarea asupra indexului complet.

Final audit rerulează sau validează echivalența pe index final.

## 13. Avoiding combinatorial explosion

Matcher authors SHOULD:

- folosească selective triggers;
- join pe keys indexate;
- filtreze context înainte de cross-products;
- declare hard domain bounds;
- split rules;
- use aggregation templates.

Dacă mandatory matching depășește budget, taskul este INCONCLUSIVE, nu acceptat.

## 14. Criterii de conformitate

Testele MUST include:

- exhaustive select;
- join cu multiple matches;
- duplicate publication;
- tuple arity mismatch;
- invalid handle;
- delta vs full equivalence;
- optional ranking independent de mandatory;
- matcher budget exhaustion;
- false omission adversarial test.
