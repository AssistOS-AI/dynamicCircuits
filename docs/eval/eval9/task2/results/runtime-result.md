# Circuit Runtime Result

> This is the authoritative result emitted by the Dynamic Circuits executor. It is rendered directly from the circuit public outputs and execution receipt; it is not a coding-agent interpretation.

## Execution identity

| Field | Observed value |
| --- | --- |
| Entrypoint | `task.analysis` |
| Outcome | **SUCCEEDED** |
| Package hash | `sha256:2bb224a64ced62c216b9d63df75fea7d9c387e3d008bee36749bc421ecabdd8d` |
| Receipt hash | `sha256:0af351286e7f116341223fc3ec3961388cd61af5a88061c0b578f2f02eda4091` |
| Executed nodes in root receipt | 7 |
| Dead nodes in root receipt | 0 |

## Public outputs

### review

- **sourceFile:** review.md
- **request:**
  - **publishWithoutDirectKbRuleCalls:** true
  - **expectedMandatoryInstances:** 3
  - **retainNoncompliantFindingAsSuccessfulOutput:** true
- **controls:**
  1.
    - **caseId:** B-02
    - **controlId:** R02
    - **required:** true
    - **observed:** false
    - **source:** review.md#B-02
  2.
    - **caseId:** B-05
    - **controlId:** R05
    - **required:** true
    - **observed:** true
    - **source:** review.md#B-05
  3.
    - **caseId:** B-08
    - **controlId:** R08
    - **required:** true
    - **observed:** true
    - **source:** review.md#B-08

Output hash: `sha256:26c98106eae2c8c94c23fc8004085a23032e8cf446a07d23467e484f74fd801a`

### controlR02

- **caseId:** B-02
- **controlId:** R02
- **required:** true
- **observed:** false
- **source:** review.md#B-02

Output hash: `sha256:9338ff6bd4d76748abc4baf26d1249f702014c23bec146ac84cd6cd9a07c8b4b`

### controlR05

- **caseId:** B-05
- **controlId:** R05
- **required:** true
- **observed:** true
- **source:** review.md#B-05

Output hash: `sha256:c21fb134e5ffb92ebf49ad9bf9a4a5db88349c83d3b60b5205486dbae612fea0`

### controlR08

- **caseId:** B-08
- **controlId:** R08
- **required:** true
- **observed:** true
- **source:** review.md#B-08

Output hash: `sha256:c7f400674e72d80fad0e52d87163e2fdf87e79694df6327107347c0031f7cb90`

### publicationR02

- **$sop:** sop.semantic-publication.v1
- **semanticKey:** control.r02
- **value:**
  - **caseId:** B-02
  - **controlId:** R02
  - **required:** true
  - **observed:** false
  - **source:** review.md#B-02
- **provenance:** review.md#B-02

Output hash: `sha256:21840c6c355abae5128e76a179cf19807e84f9d3d0ac094bae73368f52256839`

### publicationR05

- **$sop:** sop.semantic-publication.v1
- **semanticKey:** control.r05
- **value:**
  - **caseId:** B-05
  - **controlId:** R05
  - **required:** true
  - **observed:** true
  - **source:** review.md#B-05
- **provenance:** review.md#B-05

Output hash: `sha256:cd33b7849848dcd6d672da2850c85d5efa664dd7a01927021d8ff262a06137a8`

### publicationR08

- **$sop:** sop.semantic-publication.v1
- **semanticKey:** control.r08
- **value:**
  - **caseId:** B-08
  - **controlId:** R08
  - **required:** true
  - **observed:** true
  - **source:** review.md#B-08
- **provenance:** review.md#B-08

Output hash: `sha256:a482a646d316a8c7baa8cffee3d32cf3bf59612e0bcca482aa6c8c012c59914f`

## Assurance checks

The root circuit declares no goals or invariants.

## Mandatory closure

| Field | Observed value |
| --- | --- |
| Status | **CLOSED** |
| Registered mandatory matchers | 10 |
| Closure rounds | 2 |
| Indexed publications | 3 |
| Expected mandatory instances | 3 |
| Executed mandatory instances | 3 |
| Missing mandatory instances | 0 |
| Closure receipt | `sha256:e2012c784ad75053d90a7996ce88eb5cf30d35c42b2ab857b024830b2909fe4b` |

### Automatically applied rules

#### kb.mandatory_controls.evaluate

Matcher: `kb.matchers.r02`  
Instance: `sha256:140a86b99bc7c7891d9f798c013a31e873270edc41cc2e76d012fb4a652dfea3`  
Outcome: **SUCCEEDED**

**finding**

- **caseId:** B-02
- **controlId:** R02
- **compliant:** false
- **required:** true
- **observed:** false
- **source:** review.md#B-02

#### kb.mandatory_controls.evaluate

Matcher: `kb.matchers.r05`  
Instance: `sha256:1b190197eeeb7af70be49702c65753505d5b28784f5e755da39aa7137730c406`  
Outcome: **SUCCEEDED**

**finding**

- **caseId:** B-05
- **controlId:** R05
- **compliant:** true
- **required:** true
- **observed:** true
- **source:** review.md#B-05

#### kb.mandatory_controls.evaluate

Matcher: `kb.matchers.r08`  
Instance: `sha256:f5a3a7fc4c651fae184efa6c0c0ad3b038f9c3680d4f39df91f14bf6cd089203`  
Outcome: **SUCCEEDED**

**finding**

- **caseId:** B-08
- **controlId:** R08
- **compliant:** true
- **required:** true
- **observed:** true
- **source:** review.md#B-08

## Receipt summary

| Node | Callee | Status | Child receipt |
| --- | --- | --- | --- |
| `n0001` | `task.review` | SUCCEEDED | `sha256:d38468a61829eb5f897cd1d332745570a6b1a4e265d3c2bf7d71d22f3ae6b05b` |
| `n0002` | `get` | SUCCEEDED | - |
| `n0003` | `get` | SUCCEEDED | - |
| `n0004` | `get` | SUCCEEDED | - |
| `n0005` | `publish` | SUCCEEDED | - |
| `n0006` | `publish` | SUCCEEDED | - |
| `n0007` | `publish` | SUCCEEDED | - |

