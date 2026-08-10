# Circuit Runtime Result

> This is the authoritative result emitted by the Dynamic Circuits executor. It is rendered directly from the circuit public outputs and execution receipt; it is not a coding-agent interpretation.

## Execution identity

| Field | Observed value |
| --- | --- |
| Entrypoint | `task.analysis` |
| Outcome | **SUCCEEDED** |
| Package hash | `sha256:3a62163cfb69cd80e7655f4b97b21f476523af32330a593693a9066c926735e8` |
| Receipt hash | `sha256:f093b9305878b2eec15cf7736b4f928647f4c96a8c4fe1771e8e4283af3e0d22` |
| Executed nodes in root receipt | 3 |
| Dead nodes in root receipt | 0 |

## Public outputs

### request

- **action:** publish_each_row
- **semanticKey:** order.raw
- **explicitAssessmentCalls:** false
- **explicitNormalizationCalls:** false
- **expectedMandatoryInstances:** 6
- **expectedProductiveRounds:**
  1.
    - **kind:** normalization
    - **instances:** 2
  2.
    - **kind:** assessment
    - **instances:** 4
- **source:** orders.md

Output hash: `sha256:87642bbfad6b98c36ea161c08167e1212d4aa30c841c931e9c03ddf873211ec6`

### orders

1.
  - **id:** OA-1
  - **amount:** 2500
  - **currency:** eur
  - **approved:** false
  - **source:** orders.md#OA-1
2.
  - **id:** OA-2
  - **amount:** 12500
  - **currency:** usd
  - **approved:** true
  - **source:** orders.md#OA-2

Output hash: `sha256:bdc4b97e118ae79aaaae599aaf3b4dc09466ad9b67ab4430411cbb2332e86dad`

### firstRawPublication

- **$sop:** sop.semantic-publication.v1
- **semanticKey:** order.raw
- **value:**
  - **id:** OA-1
  - **amount:** 2500
  - **currency:** eur
  - **approved:** false
  - **source:** orders.md#OA-1
- **provenance:** orders.md#OA-1

Output hash: `sha256:4b19a4762bf299a7b870d4d282c53b1f69dc44fce4abfcc28adbdc6bf7ddb655`

### secondRawPublication

- **$sop:** sop.semantic-publication.v1
- **semanticKey:** order.raw
- **value:**
  - **id:** OA-2
  - **amount:** 12500
  - **currency:** usd
  - **approved:** true
  - **source:** orders.md#OA-2
- **provenance:** orders.md#OA-2

Output hash: `sha256:bc5da20365721438f5feb1206c41528a19dbaca3c3564d75e931d6afe7c666a8`

## Assurance checks

The root circuit declares no goals or invariants.

## Mandatory closure

| Field | Observed value |
| --- | --- |
| Status | **CLOSED** |
| Registered mandatory matchers | 3 |
| Closure rounds | 3 |
| Indexed publications | 4 |
| Expected mandatory instances | 6 |
| Executed mandatory instances | 6 |
| Missing mandatory instances | 0 |
| Closure receipt | `sha256:4ac29317166cc87e972332af79848ab0e108309f6c194bbe68b1fc463105ea83` |

### Automatically applied rules

#### kb.order.normalize

Matcher: `kb.matchers.normalize`  
Instance: `sha256:18e5ecb3cb5ae8a43fad549765bdbc9d7f784c6ce20c6a533c6462df4da2c030`  
Outcome: **SUCCEEDED**

**normalized**

- **id:** OA-2
- **amount:** 12500
- **currency:** USD
- **approved:** true
- **source:** orders.md#OA-2

**publication**

- **$sop:** sop.semantic-publication.v1
- **semanticKey:** order.normalized
- **value:**
  - **id:** OA-2
  - **amount:** 12500
  - **currency:** USD
  - **approved:** true
  - **source:** orders.md#OA-2
- **provenance:** kb.order.normalize

#### kb.order.normalize

Matcher: `kb.matchers.normalize`  
Instance: `sha256:761af8a93c471753cac24e1106e6c3f5352923593e0dff69a25e0d6f309b937c`  
Outcome: **SUCCEEDED**

**normalized**

- **id:** OA-1
- **amount:** 2500
- **currency:** EUR
- **approved:** false
- **source:** orders.md#OA-1

**publication**

- **$sop:** sop.semantic-publication.v1
- **semanticKey:** order.normalized
- **value:**
  - **id:** OA-1
  - **amount:** 2500
  - **currency:** EUR
  - **approved:** false
  - **source:** orders.md#OA-1
- **provenance:** kb.order.normalize

#### kb.order.approval

Matcher: `kb.matchers.approval`  
Instance: `sha256:93b27d53bb682ef7edd2bc0caaaa8177364e1c2378433a62ac2f3c1fea7d934e`  
Outcome: **SUCCEEDED**

**finding**

- **id:** OA-1
- **check:** approval
- **compliant:** true
- **approvalRequired:** false
- **approved:** false
- **source:** orders.md#OA-1

#### kb.order.approval

Matcher: `kb.matchers.approval`  
Instance: `sha256:51d5bdf12bc172da5a179055624b8a657cdf5bd051fa56c27f1bcadf987336a5`  
Outcome: **SUCCEEDED**

**finding**

- **id:** OA-2
- **check:** approval
- **compliant:** true
- **approvalRequired:** true
- **approved:** true
- **source:** orders.md#OA-2

#### kb.order.currency

Matcher: `kb.matchers.currency`  
Instance: `sha256:663f37f29140247bfa2134ef41c80bbdac6c0d9dbf940cad1c7141d000ac769b`  
Outcome: **SUCCEEDED**

**finding**

- **id:** OA-1
- **check:** currency
- **compliant:** true
- **currency:** EUR
- **source:** orders.md#OA-1

#### kb.order.currency

Matcher: `kb.matchers.currency`  
Instance: `sha256:eb0a67ed8866e0c47fb3c3f09605f6faa203e8d4eac6e2fa1566cb20923f8117`  
Outcome: **SUCCEEDED**

**finding**

- **id:** OA-2
- **check:** currency
- **compliant:** true
- **currency:** USD
- **source:** orders.md#OA-2

## Receipt summary

| Node | Callee | Status | Child receipt |
| --- | --- | --- | --- |
| `n0001` | `task.orders` | SUCCEEDED | `sha256:87a21e896075d89966fd6323ef38830da8347de55bd38382f1e9b3dc1dda9914` |
| `n0002` | `publish` | SUCCEEDED | - |
| `n0003` | `publish` | SUCCEEDED | - |

