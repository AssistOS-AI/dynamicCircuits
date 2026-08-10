# Circuit Runtime Result

> This is the authoritative result emitted by the Dynamic Circuits executor. It is rendered directly from the circuit public outputs and execution receipt; it is not a coding-agent interpretation.

## Execution identity

| Field | Observed value |
| --- | --- |
| Entrypoint | `task.analysis` |
| Outcome | **SUCCEEDED** |
| Package hash | `sha256:5b2daeaa1dcb2c1bc5d421dbabeb4b65df73aa6510e679a884f2ddf3543803f7` |
| Receipt hash | `sha256:e348d1dee092a8e3b627336bd3bfc1be960a673733d27453d0de237a40613187` |
| Executed nodes in root receipt | 5 |
| Dead nodes in root receipt | 0 |

## Public outputs

### inputCoverage

- **manifestEntries:** 1
- **processedEntries:** 1
- **path:** review.md
- **bytes:** 712
- **sha256:** 5b7ebd90bee50ebab33817082812e163ba47856eba53cfe4c4bbfcfeecc43b99

Output hash: `sha256:953c82bfc12698d921c331f82b8fbb3bc45f0109b88a4fc7253dc2684cdf964f`

### expectedAutomaticInstances

4

Output hash: `sha256:4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a`

### inactiveSemanticKeys

1. control.r02
2. control.r04
3. control.r05
4. control.r06
5. control.r08
6. control.r09

Output hash: `sha256:db3201dd365f14cf03cfb03f9a113933f7fef374e8b1116ac2376b08914a9b50`

### publishedR01

- **$sop:** sop.semantic-publication.v1
- **semanticKey:** control.r01
- **value:**
  - **caseId:** A-01
  - **controlId:** R01
  - **required:** true
  - **observed:** true
  - **source:** review.md#A-01
- **provenance:** review.md#A-01

Output hash: `sha256:0abe90124a0649b99b4a62ec7490aa1eb30613074aa7a8dac84abe737ea09a0e`

### publishedR03

- **$sop:** sop.semantic-publication.v1
- **semanticKey:** control.r03
- **value:**
  - **caseId:** A-03
  - **controlId:** R03
  - **required:** true
  - **observed:** false
  - **source:** review.md#A-03
- **provenance:** review.md#A-03

Output hash: `sha256:e61692063be8c3de144e22bb3593d68832f5867f1101bc0a69f4c6ac628ae4d3`

### publishedR07

- **$sop:** sop.semantic-publication.v1
- **semanticKey:** control.r07
- **value:**
  - **caseId:** A-07
  - **controlId:** R07
  - **required:** false
  - **observed:** false
  - **source:** review.md#A-07
- **provenance:** review.md#A-07

Output hash: `sha256:c0b71551df6b75b63b92f8796ef8b1c1b2d604c56771ea5a2a7728eef253d2b7`

### publishedR10

- **$sop:** sop.semantic-publication.v1
- **semanticKey:** control.r10
- **value:**
  - **caseId:** A-10
  - **controlId:** R10
  - **required:** true
  - **observed:** true
  - **source:** review.md#A-10
- **provenance:** review.md#A-10

Output hash: `sha256:7d9e76dde2679b957ce766ddd0539a835bef9280b7b7d26850151bd2d548d74f`

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
| Closure receipt | `sha256:d1c6b3f68a53349201dd1316aafbe12125f8d881ad49568bbb7b0080397cecd9` |

### Automatically applied rules

#### kb.mandatory_controls.evaluate

Matcher: `kb.matchers.r01`  
Instance: `sha256:dd2ae912b7dfca9edc71164119271feaab840a3ed5d47556a54280f455b81536`  
Outcome: **SUCCEEDED**

**finding**

- **caseId:** A-01
- **controlId:** R01
- **compliant:** true
- **required:** true
- **observed:** true
- **source:** review.md#A-01

#### kb.mandatory_controls.evaluate

Matcher: `kb.matchers.r03`  
Instance: `sha256:2f7bfafc5e2c9bfea2e35cbe8b98d0240892f7d48aee161438cbb9ddc010ab0a`  
Outcome: **SUCCEEDED**

**finding**

- **caseId:** A-03
- **controlId:** R03
- **compliant:** false
- **required:** true
- **observed:** false
- **source:** review.md#A-03

#### kb.mandatory_controls.evaluate

Matcher: `kb.matchers.r07`  
Instance: `sha256:b7a78174ce56e2ebdd58f0b6a7c9ff92dacfc8cbeb54ac0655b383d2b2bcaf45`  
Outcome: **SUCCEEDED**

**finding**

- **caseId:** A-07
- **controlId:** R07
- **compliant:** true
- **required:** false
- **observed:** false
- **source:** review.md#A-07

#### kb.mandatory_controls.evaluate

Matcher: `kb.matchers.r10`  
Instance: `sha256:2a2610d1d68d1ffa37a021df3b71cd016222f4d4a037726521641c3c686a7cb2`  
Outcome: **SUCCEEDED**

**finding**

- **caseId:** A-10
- **controlId:** R10
- **compliant:** true
- **required:** true
- **observed:** true
- **source:** review.md#A-10

## Receipt summary

| Node | Callee | Status | Child receipt |
| --- | --- | --- | --- |
| `n0001` | `task.review` | SUCCEEDED | `sha256:86151e14a59be36dede749337a4593b37c53ee2535cb63e107eb48bbbfac402a` |
| `n0002` | `publish` | SUCCEEDED | - |
| `n0003` | `publish` | SUCCEEDED | - |
| `n0004` | `publish` | SUCCEEDED | - |
| `n0005` | `publish` | SUCCEEDED | - |

