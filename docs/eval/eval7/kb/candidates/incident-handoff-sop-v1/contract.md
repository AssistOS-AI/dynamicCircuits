# Incident handoff SOP candidate contract

## Purpose and boundary

This candidate deterministically generates an incident-handoff Markdown document, independently verifies a supplied document, and composes both operations behind a passing verification goal. It governs document structure only. It has no filesystem, process, network, clock, random, operational-action, repair, or direct-LLM capability.

## Positional interfaces

- `candidate.generator(brief) -> markdown`
- `candidate.verifier(brief, markdown) -> report`
- `candidate.analysis(brief) -> markdown, verification`

`brief` is a plain JSON object with these exact fields:

| Field | Candidate type and constraint |
| --- | --- |
| `documentTitle` | non-empty, single-line string |
| `service` | non-empty, single-line string |
| `severity` | non-empty, single-line string |
| `incidentCommanderRole` | non-empty, single-line string |
| `outgoingRole` | non-empty, single-line string |
| `incomingRole` | non-empty, single-line string |
| `acknowledgementMinutes` | finite number greater than zero |
| `escalationMinutes` | finite number greater than `acknowledgementMinutes` |
| `evidenceLocations` | non-empty array of non-empty, single-line strings |
| `communicationChannel` | non-empty, single-line string |
| `prohibitedAction` | non-empty, single-line string |
| `approvalRole` | non-empty, single-line string |

Extra object fields are ignored. Numbers may be fractional because the source specifies minutes but does not require integers.

## Results

The generator returns one Markdown string. The verifier returns `{ ok, checks, missing, measuredCounts }`. Each check has a stable name, a Boolean verdict, and check-specific evidence. A structurally deficient document is a successful verifier execution with `ok: false`; it is not a runtime rejection, refusal, or repaired result. The composed analysis succeeds only when generation succeeds and every verifier check passes.

## Refusal conditions

All packages refuse non-object or malformed briefs. The generator and verifier refuse missing, empty, multi-line, or wrong-typed required values, empty or malformed evidence lists, non-finite or non-positive deadlines, and non-strict deadline order. The verifier also refuses a non-string Markdown argument. Refusals expose no public output.

## Non-applicability

Do not apply this candidate to executing an incident handoff, changing incident systems, transmitting messages, authorizing prohibited actions, repairing arbitrary Markdown, general SOP formats, briefs that require multiline verbatim values, or policies whose deadline unit is not minutes.

## Assurance and review status

The verifier is separate from the generator and performs per-requirement checks rather than comparing the entire document to generator output. The analysis goal structurally covers both public outputs. Compilation and tests demonstrate mechanical behavior only; this package remains untrusted until reviewed and promoted.
