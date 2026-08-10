# Schema conceptuală a receipts

## Node receipt

```json
{
  "schema": "sop-node-receipt/1",
  "nodeId": "node:...",
  "packageHash": "sha256:...",
  "calleeHash": "sha256:...",
  "inputs": [
    {"wireId": "wire:...", "valueHash": "sha256:..."}
  ],
  "output": {
    "wireId": "wire:...",
    "valueHash": "sha256:..."
  },
  "status": "SUCCEEDED",
  "check": {
    "status": "PASS",
    "receiptHash": "sha256:..."
  },
  "effects": [],
  "environment": "sha256:..."
}
```

## Closure receipt

```json
{
  "schema": "sop-closure-receipt/1",
  "profileHash": "sha256:...",
  "rounds": 3,
  "matcherRuns": [],
  "expectedInstances": [],
  "executedInstances": [],
  "refusedInstances": [],
  "finalAudit": {
    "complete": true
  }
}
```

## Final receipt

```json
{
  "schema": "sop-task-receipt/1",
  "taskId": "task:...",
  "epochId": "epoch:...",
  "outcome": "ACCEPTED",
  "sourceManifestHash": "sha256:...",
  "packageLockHash": "sha256:...",
  "profileHash": "sha256:...",
  "outputs": [],
  "goals": [],
  "invariants": [],
  "closureReceiptHash": "sha256:...",
  "assumptions": [],
  "limitations": []
}
```

## Reguli

- receipts sunt immutable;
- hashes se calculează canonic;
- raw secrets nu se includ;
- refs trebuie rezolvabile în audit context;
- schema migration este explicită.
