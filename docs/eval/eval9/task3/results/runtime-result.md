# Circuit Runtime Result

> This is the authoritative result emitted by the Dynamic Circuits executor. It is rendered directly from the circuit public outputs and execution receipt; it is not a coding-agent interpretation.

## Execution identity

| Field | Observed value |
| --- | --- |
| Entrypoint | `task.analysis` |
| Outcome | **SUCCEEDED** |
| Package hash | `sha256:50c1d4d63852ea8347148c1d9030e05ee235b919a97107340c6daa88e45fb248` |
| Receipt hash | `sha256:b41eabf88b0f9f01e3b8271f6e82da27242db5eb994f33d4632156f96e6ef821` |
| Executed nodes in root receipt | 5 |
| Dead nodes in root receipt | 0 |

## Public outputs

### r04

- **caseId:** C-04
- **controlId:** R04
- **required:** false
- **observed:** true
- **source:** review.md#C-04

Output hash: `sha256:d0ab6e89ea23a9a9ff42e72a535120af012cca0b0eac7b562b29798f2a11356d`

### r06

- **caseId:** C-06
- **controlId:** R06
- **required:** true
- **observed:** true
- **source:** review.md#C-06

Output hash: `sha256:2b50edfcb42a0c131bb96453b39a012a74e0a2a6ec3e133d82b8de842504db9f`

### r09

- **caseId:** C-09
- **controlId:** R09
- **required:** true
- **observed:** false
- **source:** review.md#C-09

Output hash: `sha256:04ebfedca6802fc96ad9b29afae359815f23e8b1245d6dfb9f32b10962a4d228`

### r10

- **caseId:** C-10
- **controlId:** R10
- **required:** false
- **observed:** false
- **source:** review.md#C-10

Output hash: `sha256:4571c28022962ffbd445e501d9516e0d68f7d9b9eb9458dc200159e664bf2696`

### publicationR04

- **$sop:** sop.semantic-publication.v1
- **semanticKey:** control.r04
- **value:**
  - **caseId:** C-04
  - **controlId:** R04
  - **required:** false
  - **observed:** true
  - **source:** review.md#C-04
- **provenance:** review.md#C-04

Output hash: `sha256:fbe5c8fde7a753ec0e52d621b4187c7c5fa1cb22a4ebbce14ddaa5b8a61311e8`

### publicationR06

- **$sop:** sop.semantic-publication.v1
- **semanticKey:** control.r06
- **value:**
  - **caseId:** C-06
  - **controlId:** R06
  - **required:** true
  - **observed:** true
  - **source:** review.md#C-06
- **provenance:** review.md#C-06

Output hash: `sha256:b959d5f75c23359f5558660ce632f0f200ddb8ba7582cdf44e01dd7fdfb09b90`

### publicationR09

- **$sop:** sop.semantic-publication.v1
- **semanticKey:** control.r09
- **value:**
  - **caseId:** C-09
  - **controlId:** R09
  - **required:** true
  - **observed:** false
  - **source:** review.md#C-09
- **provenance:** review.md#C-09

Output hash: `sha256:3327467aa2d8c0374d5ae7725d95ec8e23b1f13028f038c94b6c99f7ce26bcd4`

### publicationR10

- **$sop:** sop.semantic-publication.v1
- **semanticKey:** control.r10
- **value:**
  - **caseId:** C-10
  - **controlId:** R10
  - **required:** false
  - **observed:** false
  - **source:** review.md#C-10
- **provenance:** review.md#C-10

Output hash: `sha256:136c35a587a879a37323d9996f622651c90e3d8032451221f676b86e381c6821`

## Assurance checks

The root circuit declares no goals or invariants.

## Mandatory closure

| Field | Observed value |
| --- | --- |
| Status | **CLOSED** |
| Registered mandatory matchers | 10 |
| Closure rounds | 2 |
| Indexed publications | 4 |
| Expected mandatory instances | 4 |
| Executed mandatory instances | 4 |
| Missing mandatory instances | 0 |
| Closure receipt | `sha256:dbbe37e691b0e3b9a4fc59bb6459e16463a71d7399595cffc5ba8a01b17de195` |

### Automatically applied rules

#### kb.mandatory_controls.evaluate

Matcher: `kb.matchers.r04`  
Instance: `sha256:f8ae5a3ca4d3f9027af5ebf19a0706a69df7fbba19c898300346c48fe5263b6a`  
Outcome: **SUCCEEDED**

**finding**

- **caseId:** C-04
- **controlId:** R04
- **compliant:** false
- **required:** false
- **observed:** true
- **source:** review.md#C-04

#### kb.mandatory_controls.evaluate

Matcher: `kb.matchers.r06`  
Instance: `sha256:240477ae1e413ca523faa20fee59ffad93fd7455c7a83c6d92a9fb40e8f5b6f6`  
Outcome: **SUCCEEDED**

**finding**

- **caseId:** C-06
- **controlId:** R06
- **compliant:** true
- **required:** true
- **observed:** true
- **source:** review.md#C-06

#### kb.mandatory_controls.evaluate

Matcher: `kb.matchers.r09`  
Instance: `sha256:695c73d9222113ca8c2dcd328a2dff562d8eea716b8469063eb9ebe7fe1e3d88`  
Outcome: **SUCCEEDED**

**finding**

- **caseId:** C-09
- **controlId:** R09
- **compliant:** false
- **required:** true
- **observed:** false
- **source:** review.md#C-09

#### kb.mandatory_controls.evaluate

Matcher: `kb.matchers.r10`  
Instance: `sha256:63981119ace84bc8e8778c15b8e6c2ced21d75089c6febd837d444dc38765f11`  
Outcome: **SUCCEEDED**

**finding**

- **caseId:** C-10
- **controlId:** R10
- **compliant:** true
- **required:** false
- **observed:** false
- **source:** review.md#C-10

## Receipt summary

| Node | Callee | Status | Child receipt |
| --- | --- | --- | --- |
| `n0001` | `task.review` | SUCCEEDED | `sha256:bc0f611e98a38f7cbcc22e14705a0d7484e9f6adf4dcb7f4f886b62ed45a21c6` |
| `n0002` | `publish` | SUCCEEDED | - |
| `n0003` | `publish` | SUCCEEDED | - |
| `n0004` | `publish` | SUCCEEDED | - |
| `n0005` | `publish` | SUCCEEDED | - |

