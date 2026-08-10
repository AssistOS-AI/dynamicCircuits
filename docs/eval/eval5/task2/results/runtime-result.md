# Circuit Runtime Result

> This is the authoritative result emitted by the Dynamic Circuits executor. It is rendered directly from the circuit public outputs and execution receipt; it is not a coding-agent interpretation.

## Execution identity

| Field | Observed value |
| --- | --- |
| Entrypoint | `task.analysis` |
| Outcome | **REFUSED** |
| Package hash | `sha256:73f5633f7ab4d1effcde592a93b7da32ed1da38a2932cc3ad3558cb89715b4f7` |
| Receipt hash | `sha256:13970d69051bd29be91a14cfb8c6677330a3a093cc2bcd09f79e510c89f1163b` |
| Executed nodes in root receipt | 4 |
| Dead nodes in root receipt | 0 |

## Public outputs

The circuit did not succeed, so the runtime exposed no public output values.

## Assurance checks

The root circuit declares no goals or invariants.

## Receipt summary

| Node | Callee | Status | Child receipt |
| --- | --- | --- | --- |
| `n0001` | `task.records` | SUCCEEDED | `sha256:17fea186f363aa7544d42c3449196b95970cd951e506d97ae52f19498d88e14f` |
| `n0002` | `task.request` | SUCCEEDED | `sha256:d59e9d051e8d3141ae7c6f2c34c38448c324967c03fcae989dd3093ac8218ab6` |
| `n0003` | `kb.data_release_governance.review` | SUCCEEDED | `sha256:a6b9aca844bb99779147ec64786828eb759ebea318bac377b87337dcad98152c` |
| `n0004` | `kb.data_release_governance.review` | REFUSED | `sha256:b7c0d09f401a5a96a8106c423fa62a62d3f02d815a38e4c99b91cda7bb514dee` |

