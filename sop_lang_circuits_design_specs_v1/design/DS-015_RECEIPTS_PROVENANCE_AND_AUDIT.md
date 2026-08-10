# DS-015 — Receipts, provenance și audit

## 1. Scop

Receipt-ul face execuția inspectabilă și reproducibilă. El nu este log textual, ci artefact structurat și content-addressed.

## 2. Node receipt

Câmpuri minime:

```text
nodeId
packageName
packageHash
calleeName
calleeHash
sourceSpan
inputBindings
inputValueHashes
outputWireId
outputValueHash
status
runMetadata
checkMetadata
effectReceipts
start/end
environmentFingerprint
```

Pentru REFUSED:

```text
refusalCode
refusalDetails
blockedConsumers
```

Pentru ERROR:

```text
errorClass
message
sanitizedStack
retryClassification
```

## 3. Circuit receipt

```text
circuitInstanceId
packageHash
inputWireBindings
outputWireBindings
invariants
goals
nodeReceiptRefs
dependencySlices
outcome
```

## 4. Closure receipt

```text
profileHash
registryVersion
rounds
triggerActivations
matcherRuns
matches
expectedInstanceIds
executedInstanceIds
refusedInstanceIds
finalAudit
closureOutcome
```

## 5. Final acceptance receipt

```text
taskId
epochId
rootPackageHash
sourceManifest
packageLock
profileHash
outputs
goals
invariants
closureReceipt
trustAssessment
outcome
assumptions
limitations
```

## 6. Provenance graph

Receipt refs formează un DAG.

Pentru orice output final trebuie să poată fi traversat:

```text
output
  -> producer
  -> inputs
  -> source/derived values
  -> interpretations
  -> source spans
```

Multiple derivations pot coexista.

## 7. Source spans

Interpretation values SHOULD include source references:

```text
sourceId
version
start/end
quoteHash
```

Quote text poate fi separat pentru copyright/privacy. Hash-ul permite detectarea drift-ului.

## 8. Canonical serialization

Hashing-ul necesită serializare canonică:

- object keys sorted;
- explicit undefined sentinel;
- normalized numbers;
- stable handle encoding;
- no nondeterministic map order;
- UTF-8 NFC policy documentată.

Serializerul este TCB.

## 9. Privacy

Receipts pot conține date sensibile.

Profile-ul trebuie să permită:

- hashes în loc de raw values;
- encrypted evidence;
- access control;
- redacted logs;
- separated secret store;
- selective disclosure proofs.

Auditability nu înseamnă publicarea tuturor datelor.

## 10. External calls

Receipt-ul pentru network/oracle include:

- provider identity;
- endpoint class;
- request hash;
- response hash;
- model/version;
- parameters;
- timestamp;
- snapshot/ETag dacă există;
- cost;
- policy.

Raw prompt/response poate fi securizat separat.

## 11. Reproduction modes

### Exact replay

Folosește materialized outputs pentru nondeterministic calls.

### Fresh rerun

Reexecută oracles/external reads și creează epoch nou.

### Verification-only replay

Nu rerulează producerul; rerulează checks/certificate verifiers.

## 12. Audit queries

Runtime/tooling trebuie să răspundă:

- de ce există acest output?
- ce source spans îl susțin?
- ce rules au fost aplicate?
- ce mandatory rules erau așteptate?
- ce nodes sunt untrusted?
- ce checks au eșuat?
- ce s-ar invalida dacă source X se schimbă?
- ce output claims nu sunt grounded?

## 13. Receipt integrity

Receipts MUST fi immutable.

Manifestul poate fi semnat.

Cache entries trebuie să refere receipt hash.

Un output fără receipt compatibil nu poate fi promovat într-un accepted slice strict.

## 14. Retention

Workspace policy definește:

- cât timp se păstrează attempts;
- dacă se păstrează raw outputs;
- cum se șterg secrets;
- cum se păstrează hashes pentru audit;
- cum se migrează schema receipts.

## 15. Schema versioning

Fiecare receipt are schema version.

Migrările nu pot altera semantic fields fără audit record.

## 16. Criterii de conformitate

Testele trebuie să demonstreze:

- deterministic hash;
- source trace;
- closure audit;
- redaction;
- exact replay;
- verification-only replay;
- tamper detection;
- receipt schema migration.
