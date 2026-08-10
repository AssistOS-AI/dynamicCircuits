# DS-018 — Securitate, sandbox, effects și LLM oracles

## 1. Threat model

Commands JavaScript pot fi generate de agenți și sunt implicit neîncrezute.

Riscuri:

- filesystem access;
- network exfiltration;
- secret access;
- infinite loops;
- memory exhaustion;
- process escape;
- nondeterminism ascuns;
- false receipts;
- modification of assurance artifacts;
- prompt injection din sources.

## 2. Isolation boundary

Production runtime MUST executa commands neîncrezute în:

- process izolat;
- container;
- WASM sandbox;
- worker cu hard limits;
- alt mecanism cu capabilities reale.

`eval` în procesul principal este acceptabil numai pentru prototip local necritic.

## 3. Capability model

Command descriptor declară effects/capabilities.

Profile-ul acordă sau refuză:

- read artifact;
- write artifact;
- network;
- oracle;
- clock;
- random;
- subprocess;
- secret.

Deny by default.

## 4. Resource limits

Per command:

- CPU;
- wall time;
- memory;
- output size;
- log size;
- network bytes;
- oracle cost.

Limit breach produce INCONCLUSIVE sau ERROR, nu partial success.

## 5. Filesystem

Commands nu primesc raw filesystem path implicit.

Artifact store API folosește handles și scoped access.

Writes sunt content-addressed sau tranzacționale.

## 6. Network

Network requests trec prin broker.

Broker:

- allowlist domains;
- logs request/response hashes;
- strips secrets;
- rate limits;
- materializes response;
- returns receipt.

## 7. LLM oracle

Oracle call este command effect.

Receipt include:

- provider/model;
- model version când disponibilă;
- system/instruction hashes;
- input artifact hashes;
- parameters;
- response hash;
- safety/policy transforms.

LLM output este un candidate. Nu devine proof doar prin origine.

## 8. Planner security

Sources pot conține instrucțiuni malițioase.

Coding agent skill trebuie să trateze source text ca data, nu control.

Assurance profile și runtime policy nu pot fi modificate de source instructions.

## 9. Package integrity

Packages:

- content-addressed;
- optionally signed;
- locked;
- immutable în attempt.

Generated package intră în task-local quarantine.

## 10. Mandatory matcher restrictions

Mandatory matcher nu are:

- network;
- oracle;
- random;
- hidden state;
- unsafe JS.

Assurance Core este separat de general JS runtime.

## 11. Secrets

Secret values:

- nu apar în plain receipts;
- sunt handles;
- hash-urile pot fi salted;
- logs redacted;
- oracle prompts filtered.

## 12. Supply chain

JS helpers și runtime dependencies intră în SBOM și package hash.

No dependency installs during execution without new epoch/review.

## 13. Denial of service semantic

Un template poate produce match explosion.

Registry/profile impune:

- max matches;
- cost declaration;
- selective triggers;
- review pentru mandatory status.

Budget exhaustion este inconclusive.

## 14. Oracle isolation and validation

LLM may:

- propose circuit;
- propose matcher candidate;
- generate renderer;
- analyze receipt.

LLM may not:

- sign trusted profile;
- suppress mandatory instance;
- write trusted cache entry;
- override failed invariant;
- declare its own validator trusted.

## 15. Audit

Security receipt include:

- granted capabilities;
- denied attempts;
- sandbox identity;
- resource use;
- external endpoints;
- secrets access handles;
- policy hash.

## 16. Criterii de conformitate

Testele MUST include:

- filesystem escape attempt;
- network deny;
- infinite loop timeout;
- memory/output limit;
- package tamper;
- prompt injection attempt;
- oracle candidate rejected by verifier;
- mandatory matcher unable to call network;
- secret redaction.
