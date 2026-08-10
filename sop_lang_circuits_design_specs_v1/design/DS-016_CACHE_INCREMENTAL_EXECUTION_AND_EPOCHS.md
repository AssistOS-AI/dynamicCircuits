# DS-016 — Cache, execuție incrementală și epochs

## 1. Obiectiv

Sistemul trebuie să proceseze corpusuri mari și attempts succesive fără regenerarea întregului circuit.

Cache-ul nu este doar optimizare. El este o bază materializată de rezultate verificate.

## 2. Epoch

Un epoch fixează:

- source manifest;
- package lock;
- assurance profile;
- runtime/compiler versions;
- environment fingerprint relevant.

Orice schimbare semantic relevantă creează epoch nou.

## 3. Node cache key

Pentru command pure:

```text
runtimeVersion
commandCodeHash
formalList
canonicalInputValueHashes
capabilityEnvironmentHash
```

Pentru circuit instance:

```text
targetPackageHash
canonicalInputWireIds/valueHashes
profileRelevantContext
```

Pentru verifier, checker hash intră obligatoriu.

## 4. Cache entry

```text
cacheKey
outputValue
outputHash
nodeReceipt
checkReceipt
createdEpoch
trustLevel
externalSnapshotRefs
```

Output-ul fără check receipt nu poate fi reutilizat la un nivel mai înalt decât original.

## 5. Invalidation

Schimbarea:

- command code -> invalidează node;
- verifier code -> invalidează assurance și dependent acceptance;
- source value -> invalidează descendants;
- package interface -> invalidează callers;
- profile -> poate invalida closure/acceptance fără recalcularea tuturor pure nodes;
- external snapshot -> invalidează reads dependente.

## 6. Dependency index

Runtime-ul păstrează reverse edges:

```text
wire/node -> consumers
source -> descendants
package -> instances
matcher -> matches/instances
```

Aceasta permite invalidare precisă.

## 7. Attempts și reuse

Attempt 2 poate reutiliza:

- interpretation packages neschimbate;
- prior rule results;
- mandatory closure instances neschimbate;
- verifier receipts;
- source indices.

El recalculază numai branches noi sau invalide.

## 8. LLM outputs

LLM commands sunt nondeterministe.

Cache mode recomandat este `materialize`:

- output concret este păstrat;
- replay îl reutilizează în același epoch;
- fresh call produce node/epoch nou;
- verifier poate fi rerulat independent.

## 9. External databases

Un query este cacheable dacă este legat de:

- snapshot ID;
- transaction ID;
- ETag;
- database version;
- signed response.

„Latest” fără snapshot nu este reproducibil și produce environment-dependent receipt.

## 10. Semantic index incremental

Publications au dependencies.

La invalidare:

- entries dependente sunt retrase în epoch nou;
- mandatory instance IDs dependente sunt invalidate;
- closure rulează pe delta additions/removals.

V1 poate recomputa affected matcher strata dacă full deletion support este complex.

## 11. Book-scale decomposition

O carte se împarte:

```text
chapter package
  -> section interpretation packages
  -> chapter aggregate
  -> cross-chapter rules
  -> book goals
```

Editarea unei secțiuni invalidează:

- section descendants;
- chapter aggregate;
- cross-chapter analyses care consumă acea secțiune.

Alte capitole rămân cache.

## 12. Cache poisoning defenses

Cache entry este acceptată numai dacă:

- key recalculat coincide;
- receipt hash valid;
- package/profile hashes permise;
- trust level suficient;
- external snapshots available;
- serializer version compatibilă.

Un agent nu poate scrie direct entries „trusted”.

## 13. Garbage collection

Cache GC poate șterge values nefolosite, dar SHOULD păstra:

- accepted receipts;
- source manifests;
- package locks;
- hashes;
- audit summaries.

Large artifacts pot fi content-addressed într-un store separat.

## 14. Performance metrics

Runtime-ul raportează:

- cache hit rate;
- nodes avoided;
- closure instances reused;
- invalidation fanout;
- bytes read/written;
- oracle calls avoided;
- wall time.

## 15. Criterii de conformitate

Testele MUST include:

- same input/code hit;
- code change miss;
- checker change invalidates acceptance;
- source edit localized;
- profile change reuses computation but reruns assurance;
- materialized oracle replay;
- external snapshot drift;
- cache tamper rejection.
