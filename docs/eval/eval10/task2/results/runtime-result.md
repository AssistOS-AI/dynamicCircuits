# Circuit Runtime Result

> This is the authoritative result emitted by the Dynamic Circuits executor. It is rendered directly from the circuit public outputs and execution receipt; it is not a coding-agent interpretation.

## Execution identity

| Field | Observed value |
| --- | --- |
| Entrypoint | `task.analysis` |
| Outcome | **SUCCEEDED** |
| Package hash | `sha256:b6c85c81c07afb5a9a11f025b1151080e290cba6f117f71c58ad97b73e18e5ec` |
| Receipt hash | `sha256:bd9a729ff53ce73a15e19cd54f4f64f7cce55847b6f92f92b07f4891cfc903d2` |
| Executed nodes in root receipt | 1 |
| Dead nodes in root receipt | 0 |

## Public outputs

### order

- **id:** OB-1
- **amount:** 18000
- **currency:** ron
- **approved:** false
- **source:** orders.md#OB-1

Output hash: `sha256:ec9e81f2ca4cbaa2a4539a25cb8cd9f84258dc0c41c639d4d10501811718006a`

### request

- **approvalCompliant:** false
- **normalizationMustSucceed:** true
- **currencyMustSucceed:** true
- **expectedMandatoryInstances:** 3
- **source:** orders.md#current-orders-b

Output hash: `sha256:4067dd322c76a07c913ad15b46591a6b92929fc96bb4bae27d6d61f1eff29c9b`

### rawPublication

- **$sop:** sop.semantic-publication.v1
- **semanticKey:** order.raw
- **value:**
  - **id:** OB-1
  - **amount:** 18000
  - **currency:** ron
  - **approved:** false
  - **source:** orders.md#OB-1
- **provenance:** orders.md#OB-1

Output hash: `sha256:df29978ecb6f7508c728f8a1ffd6c70227bfbf80f1f37a760b94b61e0c25ef0b`

## Assurance checks

The root circuit declares no goals or invariants.

## Mandatory closure

| Field | Observed value |
| --- | --- |
| Status | **CLOSED** |
| Registered mandatory matchers | 3 |
| Closure rounds | 3 |
| Indexed publications | 2 |
| Expected mandatory instances | 3 |
| Executed mandatory instances | 3 |
| Missing mandatory instances | 0 |
| Closure receipt | `sha256:cf9b2cdc6356b1c9656af491b96f5c5d34c37c9fe9b6112b75a9c2e9ac370707` |

### Automatically applied rules

#### kb.order.normalize

Matcher: `kb.matchers.normalize`  
Instance: `sha256:5c0ad0cbd756da07bb77cc8e55bdfa236cee5fe53c0b884ee7ea99c3d1ba7f08`  
Outcome: **SUCCEEDED**

**normalized**

- **id:** OB-1
- **amount:** 18000
- **currency:** RON
- **approved:** false
- **source:** orders.md#OB-1

**publication**

- **$sop:** sop.semantic-publication.v1
- **semanticKey:** order.normalized
- **value:**
  - **id:** OB-1
  - **amount:** 18000
  - **currency:** RON
  - **approved:** false
  - **source:** orders.md#OB-1
- **provenance:** kb.order.normalize

#### kb.order.approval

Matcher: `kb.matchers.approval`  
Instance: `sha256:295eb318b7f3a083a88cb3c59d8a16978349249037d3de5629888441f3531f4e`  
Outcome: **SUCCEEDED**

**finding**

- **id:** OB-1
- **check:** approval
- **compliant:** false
- **approvalRequired:** true
- **approved:** false
- **source:** orders.md#OB-1

#### kb.order.currency

Matcher: `kb.matchers.currency`  
Instance: `sha256:ae27f434eddeb39e588c2df726d9ab8cad51688284a8cb9617435c2abc8e0f5d`  
Outcome: **SUCCEEDED**

**finding**

- **id:** OB-1
- **check:** currency
- **compliant:** true
- **currency:** RON
- **source:** orders.md#OB-1

## Receipt summary

| Node | Callee | Status | Child receipt |
| --- | --- | --- | --- |
| `n0001` | `task.orders` | SUCCEEDED | `sha256:b19ccc7aa24919f0a4ffd76bacd5636268aa9ef0a61ba951b23bfc844fec3528` |

