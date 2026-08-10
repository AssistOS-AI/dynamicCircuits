# DS-023 — Agent API și protocolul workspace-ului

## 1. Scop

Coding agents nu trebuie să opereze prin editarea arbitrară a stores interne. Runtime-ul expune un API stabil pentru compilare, execuție, template discovery, audit și attempts.

API-ul trebuie să fie utilizabil prin CLI și JSON-RPC/HTTP/MCP-like tool interface.

## 2. Principii

Agentul poate:

- citi sources autorizate;
- crea package-uri task-local;
- compila;
- executa attempts;
- căuta template-uri;
- analiza receipts;
- propune candidate templates;
- crea attempt nou.

Agentul nu poate:

- edita receipts;
- scrie cache entries trusted;
- modifica package lock în timpul execuției;
- modifica assurance profile activ;
- semna package-uri;
- promova singur candidate la mandatory.

## 3. Operații minime

### `workspace.create`

Inputs:

```text
taskId
sourceManifest
profileRef
packageLockRef
budgets
```

Output: workspace handle și epoch ID.

### `package.writeCandidate`

Inputs:

```text
workspace
relativePath
content
generatorMetadata
```

Scrie numai în task-local candidate/attempt area.

### `compile`

Inputs:

```text
workspace
rootPackage
```

Output:

```text
compiledPackageRef
diagnostics
graphSummary
```

### `run`

Inputs:

```text
workspace
compiledPackageRef
inputBindings
attemptId
```

Output:

```text
outcome
outputRefs
receiptRef
```

### `templates.search`

Inputs:

```text
semanticKeys
goalSummary
domain
trustFilter
limit
```

Output: candidates cu package refs; rezultatul este discovery, nu applicability.

### `templates.match`

Inputs:

```text
packageRef
indexRef
```

Output: matcher receipt și tuples.

### `receipt.explain`

Inputs:

```text
receiptRef
query
```

Queries standard:

- why output;
- first failure;
- missing mandatory;
- trust path;
- source support;
- invalidation impact.

### `attempt.create`

Inputs:

```text
workspace
parentAttempt
changeSummary
```

Output: new immutable attempt path.

### `attempt.diff`

Compară sources, packages, graph, outputs și outcomes.

### `audit.verify`

Recalculează hashes, final audit și trusted checks.

## 4. Structured diagnostics

Agent API nu returnează numai text.

Diagnostic:

```json
{
  "code": "FREE_WIRE",
  "severity": "error",
  "package": "tasks.x.attempt_001",
  "line": 23,
  "wire": "minimum",
  "message": "..."
}
```

Receipt explanation poate avea human-readable summary, dar raw structure rămâne disponibilă.

## 5. Attempt lifecycle

```text
DRAFT
  -> COMPILED
  -> EXECUTED
  -> REJECTED | INCONCLUSIVE | ERROR | ACCEPTED
```

Accepted attempt este immutable.

Un attempt nou poate avea parent ref.

## 6. Workspace locks

Package file edits sunt atomic.

Mai mulți agents pot crea branches.

Merge creează attempt nou și compilează.

Profile și lock manifests sunt read-only pentru agent.

## 7. Template candidate lifecycle

```text
task-local candidate
  -> tests
  -> review request
  -> optional registry
  -> mandatory review
  -> profile version
```

Agent API poate crea review request, nu poate decide promotion.

## 8. Context assembly pentru agent

Tooling-ul trebuie să ofere context focalizat:

- current task contract;
- relevant source spans;
- graph slice;
- failure receipt;
- candidate template docs;
- exact design specs relevante.

Nu se furnizează întregul repository dacă nu este necesar.

## 9. Idempotence

`compile` pe același package hash produce același IR hash.

`run` cu pure graph și același epoch produce același result.

API operations au request IDs și receipts.

## 10. Security

Agent credentials limitează:

- project;
- package roots;
- source access;
- oracle budget;
- write paths.

Source text nu poate cere extinderea permissions.

## 11. CLI map

```text
sop workspace create
sop package write
sop compile
sop run
sop templates search
sop templates match
sop explain
sop attempt new
sop attempt diff
sop audit verify
```

## 12. Acceptance criteria

Agent API este acceptabil dacă:

- un agent poate rezolva example task fără acces intern la DB;
- toate writes sunt task-local;
- receipts sunt immutable;
- profile mutation este refuzată;
- diagnostics sunt machine-readable;
- attempt lineage este păstrat;
- concurrency nu corupe package-uri.
