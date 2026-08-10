# Circuit Runtime Result

> This is the authoritative result emitted by the Dynamic Circuits executor. It is rendered directly from the circuit public outputs and execution receipt; it is not a coding-agent interpretation.

## Execution identity

| Field | Observed value |
| --- | --- |
| Entrypoint | `task.analysis` |
| Outcome | **SUCCEEDED** |
| Package hash | `sha256:840445949b238a6bc448bc25bb07dac715945da8c8b773b3d404c0095dc33847` |
| Receipt hash | `sha256:ae75ed2864459af0dbbe684066c9e70acf528cc48fadba989c8fcf3a00eca925` |
| Executed nodes in root receipt | 3 |
| Dead nodes in root receipt | 0 |

## Public outputs

### order1

- **id:** OC-1
- **amount:** 9999.5
- **currency:** gbp
- **approved:** false
- **source:** orders.md#OC-1

Output hash: `sha256:0ce53007e5d0685483ce5e266cc2b42cf26a05f3cca0033cbe6d73208fb74472`

### order2

- **id:** OC-2
- **amount:** 10000
- **currency:** EUR
- **approved:** false
- **source:** orders.md#OC-2

Output hash: `sha256:4eccccc597e79ff2de6ae71515ad272c4a562565f7e89b683cec9ea04cd01b7c`

### request

- **publishKey:** order.raw
- **explicitKbTargetsAllowed:** false
- **expectedMandatoryInstances:** 6
- **expectedClosureStatus:** CLOSED
- **expectedFindings:**
  1.
    - **id:** OC-1
    - **check:** currency
    - **compliant:** false
  2.
    - **id:** OC-2
    - **check:** approval
    - **compliant:** false
    - **threshold:** exact
- **source:** orders.md

Output hash: `sha256:9d3b3f0b99122143dbd4e9716b742cfe2759cd4f939d371785e7f12cd09753fd`

### rawPublication1

- **$sop:** sop.semantic-publication.v1
- **semanticKey:** order.raw
- **value:**
  - **id:** OC-1
  - **amount:** 9999.5
  - **currency:** gbp
  - **approved:** false
  - **source:** orders.md#OC-1
- **provenance:** orders.md#OC-1

Output hash: `sha256:04b0ed42522386d99067186f06419a839fe8612b4e8b791d0bc8e21a9dd9a5aa`

### rawPublication2

- **$sop:** sop.semantic-publication.v1
- **semanticKey:** order.raw
- **value:**
  - **id:** OC-2
  - **amount:** 10000
  - **currency:** EUR
  - **approved:** false
  - **source:** orders.md#OC-2
- **provenance:** orders.md#OC-2

Output hash: `sha256:93fc5525af256e963fd521c39439d968f8b8dccad95e9a9e8348003d237724de`

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
| Closure receipt | `sha256:25a5b6fcf2fdb8863e89857fad0a4ea2ff7d09ecafa44f18477ebad48647291b` |

### Automatically applied rules

#### kb.order.normalize

Matcher: `kb.matchers.normalize`  
Instance: `sha256:5edcb3a93ef14b4183190c866b2e9c96121ded41dedfa5597d39ca37abb12562`  
Outcome: **SUCCEEDED**

**normalized**

- **id:** OC-1
- **amount:** 9999.5
- **currency:** GBP
- **approved:** false
- **source:** orders.md#OC-1

**publication**

- **$sop:** sop.semantic-publication.v1
- **semanticKey:** order.normalized
- **value:**
  - **id:** OC-1
  - **amount:** 9999.5
  - **currency:** GBP
  - **approved:** false
  - **source:** orders.md#OC-1
- **provenance:** kb.order.normalize

#### kb.order.normalize

Matcher: `kb.matchers.normalize`  
Instance: `sha256:72d8673ea369a553cc0a0d966790e5c16b89f76b9163c3d80ed6a4e0c38858f3`  
Outcome: **SUCCEEDED**

**normalized**

- **id:** OC-2
- **amount:** 10000
- **currency:** EUR
- **approved:** false
- **source:** orders.md#OC-2

**publication**

- **$sop:** sop.semantic-publication.v1
- **semanticKey:** order.normalized
- **value:**
  - **id:** OC-2
  - **amount:** 10000
  - **currency:** EUR
  - **approved:** false
  - **source:** orders.md#OC-2
- **provenance:** kb.order.normalize

#### kb.order.approval

Matcher: `kb.matchers.approval`  
Instance: `sha256:f9663ad1149afd9442f3aa389959d5610aa2b337c467e03d42abb8912e753aa0`  
Outcome: **SUCCEEDED**

**finding**

- **id:** OC-1
- **check:** approval
- **compliant:** true
- **approvalRequired:** false
- **approved:** false
- **source:** orders.md#OC-1

#### kb.order.approval

Matcher: `kb.matchers.approval`  
Instance: `sha256:cb92d6b0e58fe623054932d5bbb90827e7de732b5502340b20be73dbfb3d8a07`  
Outcome: **SUCCEEDED**

**finding**

- **id:** OC-2
- **check:** approval
- **compliant:** false
- **approvalRequired:** true
- **approved:** false
- **source:** orders.md#OC-2

#### kb.order.currency

Matcher: `kb.matchers.currency`  
Instance: `sha256:83ac78dd2bf80be1b44f4d6a4a9294d182b649b2eba275b68252960af2ee05e6`  
Outcome: **SUCCEEDED**

**finding**

- **id:** OC-1
- **check:** currency
- **compliant:** false
- **currency:** GBP
- **source:** orders.md#OC-1

#### kb.order.currency

Matcher: `kb.matchers.currency`  
Instance: `sha256:9e4c3d1be59d8e98d1e1b56134fcd6f5d307baaf070a121116f6e8151d4c6352`  
Outcome: **SUCCEEDED**

**finding**

- **id:** OC-2
- **check:** currency
- **compliant:** true
- **currency:** EUR
- **source:** orders.md#OC-2

## Receipt summary

| Node | Callee | Status | Child receipt |
| --- | --- | --- | --- |
| `n0001` | `task.orders` | SUCCEEDED | `sha256:c3e50e8af023b5028af2f49d9cf4d9e29c749dbfbaefca5d34f9695571ad5cb8` |
| `n0002` | `publish` | SUCCEEDED | - |
| `n0003` | `publish` | SUCCEEDED | - |

