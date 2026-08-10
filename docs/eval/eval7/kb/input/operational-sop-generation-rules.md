# Operational SOP document generation and verification

## Purpose

Generate an operational incident-handoff SOP from a task brief and independently verify that the document is complete,
ordered, role-bounded, and safe. This rule set governs document structure, not execution of the operational actions.

## Required brief fields

The brief supplies document title, service, severity, incident commander role, outgoing role, incoming role, acknowledgement
deadline in minutes, escalation deadline in minutes, evidence locations, communication channel, prohibited action, and
approval role. Missing, empty, malformed, or non-positive deadline fields must cause refusal. Escalation minutes must be
greater than acknowledgement minutes.

## Generated Markdown template

The generator returns one Markdown document with these exact ordered headings:

1. level-one title;
2. `## Scope`;
3. `## Roles`;
4. `## Preconditions`;
5. `## Handoff Procedure`;
6. `## Verification`;
7. `## Escalation`;
8. `## Prohibited Actions`;
9. `## Record of Completion`.

The Handoff Procedure contains exactly seven numbered steps: declare handoff, freeze the timeline snapshot, identify open
risks, transfer evidence links, incoming acknowledgement, commander confirmation, and completion record. Every role,
deadline, evidence location, and channel from the brief must appear verbatim. The prohibited action must be stated as a
`MUST NOT` rule and may be overridden only by the supplied approval role. The document must explicitly say that generating
the SOP performs no operational action.

## Independent verification

A separate verifier receives the brief and generated Markdown. It checks exact heading order, seven numbered steps, role
presence, both deadlines with units, strict deadline ordering, all evidence locations, the channel, `MUST NOT`, approval
role, the no-side-effect statement, and a completion-record checklist containing incident ID, outgoing sign-off, incoming
sign-off, commander sign-off, and UTC timestamp. It returns `ok`, per-check evidence, missing items, and measured counts.
It never repairs the document. The composed analysis goal passes only when every verifier check passes.
