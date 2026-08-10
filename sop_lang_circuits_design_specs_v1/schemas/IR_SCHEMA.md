# Schema conceptuală a IR-ului

## PackageIR

```json
{
  "schema": "sop-ir/1",
  "packageName": "kb.legal.notice.invalidity",
  "packageHash": "sha256:...",
  "inputs": ["actual", "minimum"],
  "outputs": ["proof", "witness"],
  "commands": [],
  "nodes": [],
  "invariants": [],
  "goals": [],
  "template": null,
  "sourceMap": {}
}
```

## CommandIR

```json
{
  "name": "deriveInvalid",
  "qualifiedName": "kb.legal.notice.invalidity.deriveInvalid",
  "formals": ["actual", "minimum"],
  "codeHash": "sha256:...",
  "effects": ["pure"],
  "cache": "memoize",
  "sourceSpan": {"startLine": 5, "endLine": 30}
}
```

## NodeIR

```json
{
  "nodeId": "node:...",
  "outputs": ["proof"],
  "callee": {
    "kind": "command",
    "name": "deriveInvalid",
    "hash": "sha256:..."
  },
  "arguments": [
    {"kind": "wire", "name": "actual"},
    {"kind": "wire", "name": "minimum"}
  ],
  "dependencies": ["wire:actual", "wire:minimum"],
  "sourceSpan": {"line": 32}
}
```

## CircuitCallIR

```json
{
  "nodeId": "node:...",
  "outputs": ["negativeProof", "noticeWitness"],
  "callee": {
    "kind": "circuit",
    "package": "kb.legal.notice.invalidity",
    "hash": "sha256:..."
  },
  "inputBindings": [
    {"port": "actual", "wire": "actual"},
    {"port": "minimum", "wire": "minimum"}
  ],
  "outputBindings": [
    {"port": "proof", "wire": "negativeProof"},
    {"port": "witness", "wire": "noticeWitness"}
  ]
}
```

## Assurance declaration

```json
{
  "kind": "invariant",
  "wire": "proofValid",
  "covers": ["proof", "witness"],
  "sourceSpan": {"line": 3}
}
```

## Invariante ale IR-ului

- wire producer unic;
- input bindings în ordine;
- output bindings în ordine;
- hash-uri fixate;
- source maps complete;
- graph aciclic pentru slices obligatorii;
- no hidden dependencies.
