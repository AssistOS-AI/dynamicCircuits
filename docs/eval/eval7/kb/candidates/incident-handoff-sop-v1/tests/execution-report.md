# Candidate execution report

## Environment and command substitution

Executed from `/home/salboaie/work/dynamicCircuits/docs/eval/eval7/kb` on 2026-08-10. The installed-package command `agent` was not available on `PATH`. Repository documentation identifies `node src/cli.mjs` as the development equivalent, so the absolute repository CLI path below was used. No network, direct LLM API, operational action, or trusted-circuit write occurred.

## Compilation

Commands:

```sh
node /home/salboaie/work/dynamicCircuits/src/cli.mjs sop compile --root candidates/incident-handoff-sop-v1/sop --prefix candidate --package candidate.generator
node /home/salboaie/work/dynamicCircuits/src/cli.mjs sop compile --root candidates/incident-handoff-sop-v1/sop --prefix candidate --package candidate.verifier
node /home/salboaie/work/dynamicCircuits/src/cli.mjs sop compile --root candidates/incident-handoff-sop-v1/sop --prefix candidate --package candidate.analysis
```

All commands exited 0. Compiled package hashes:

| Package | Package hash | Live nodes | Goals |
| --- | --- | ---: | ---: |
| `candidate.generator` | `sha256:7a76dcaf5add7d4a3b1c87bbc302555216e0be9a89f6e44a2c08ee06dacf9b04` | 1 | 0 |
| `candidate.verifier` | `sha256:7fa0ffb157b828f069cf9ce39e7bb49c0d7e8bc8bd3a8ef7c68e3632afaa9c60` | 1 | 0 |
| `candidate.analysis` | `sha256:69e77eaa24d1ca2f1cfbb2652b00591e3f0d6058aa4dadfdeccc34983cfc8095` | 3 | 1 |

The analysis compilation resolved two nested circuit calls, found no dead node, and confirmed that goal `verified` structurally covers public wires `markdown` and `verification`.

## Automated case suite

Command:

```sh
node candidates/incident-handoff-sop-v1/tests/run-tests.mjs
```

Exit status was 0. All 13 cases passed their assertions:

| Category | Cases | Observed runtime outcomes |
| --- | ---: | --- |
| Positive | 3 | 3 `SUCCEEDED`; verifier `ok: true`; analysis goal passed |
| Negative | 2 | 2 `SUCCEEDED` with verifier `ok: false`; no repair |
| Boundary | 1 | fractional positive strictly ordered deadlines `SUCCEEDED` |
| Exception | 1 | generated named approval-only override text; `SUCCEEDED` |
| Malformed | 2 | 2 `REFUSED` with no public output |
| Refusal | 4 | 4 `REFUSED` with no public output |

Aggregate runtime outcomes were 7 `SUCCEEDED`, 6 `REFUSED`, 0 `REJECTED`, and 0 `ERROR`. Every execution had a canonical SHA-256 receipt hash. Successful executions had one public output hash per public output; refused executions had no outputs or output hashes. The composed success receipt contained both child receipts and a passing goal receipt.

The negative cases are semantic failures, not runtime failures: removing the incoming sign-off or adding an extra heading leaves the verifier runtime `SUCCEEDED` while returning `ok: false` and the applicable missing check names.

## Representative direct CLI runs

The successful composition was run with a complete short brief using:

```sh
node /home/salboaie/work/dynamicCircuits/src/cli.mjs sop run --root candidates/incident-handoff-sop-v1/sop --prefix candidate --package candidate.analysis --inputs '[{"documentTitle":"Handoff","service":"S","severity":"SEV-1","incidentCommanderRole":"Commander","outgoingRole":"Outgoing","incomingRole":"Incoming","acknowledgementMinutes":1,"escalationMinutes":2,"evidenceLocations":["E"],"communicationChannel":"Channel","prohibitedAction":"restart","approvalRole":"Approver"}]'
```

Observed: exit 0, runtime `SUCCEEDED`, verifier `ok: true`, goal `ok: true`, 9 headings, 7 steps, 4/4 roles, 1/1 evidence locations, 5 checklist items, two public output hashes, nested generator and verifier receipts, and root receipt `sha256:7cadc615253ce3f12c6f06610f3bd81ba3c2ec6a20f40ed7fefc18f3931d609b`.

The verifier was separately run on the same brief and only `# Handoff` as Markdown. Observed: exit 0 and runtime `SUCCEEDED`, but semantic `ok: false`; 11 of 12 checks failed, `deadlineOrdering` alone passed, no repair was returned, and receipt hash was `sha256:f90eaee7c57f143e422a13ee775b181683240dff9ffe6c5aec9f82b83356c446`.

The generator was separately run with equal one-minute deadlines. Observed: CLI exit 2, runtime `REFUSED`, refusal code `deadline_order_invalid`, no outputs or output hashes, and receipt hash `sha256:4a20b11aea2d756059c9377f8ab13e2e6c22a4ca7936232a1537a053ca713eef`.

## Interpretation limit

These receipts establish compilation and the recorded deterministic behavior. They do not establish semantic trust, automatic matching, promotion, operational correctness, or authority to execute an incident action.
