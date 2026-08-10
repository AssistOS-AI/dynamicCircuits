# Provenance

## Source inventory

The sole semantic source is `input/operational-sop-generation-rules.md`, 2,190 bytes, SHA-256 `65126021101525255727dd0912ecbe40d498099d200b3cd9a617a9a6951143f4`. The observed size and digest match `.dynamic-circuits/input-manifest.json`.

Small review spans:

- Lines 5–6: generate and independently verify an operational incident-handoff SOP; document structure only, with no execution of operational actions.
- Lines 10–13: required brief values, refusal expectations, minute units, and strict deadline ordering.
- Lines 17–27: exact ordered heading structure.
- Lines 29–33: seven-step procedure, verbatim values, `MUST NOT`, approval-role override, and no-action statement.
- Lines 37–41: independent verifier checks, report fields, no repair, and all-checks composed goal.

## Extracted semantic inventory

- Definitions: operational incident-handoff SOP; generator; separate verifier; composed analysis goal.
- Facts and claims: generation performs no operational action; verifier does not repair; completion record has five named checklist fields.
- Rules: complete brief, exact headings, exactly seven ordered steps, verbatim brief values, explicit units, strict deadline ordering, prohibited-action rule, approval-role exception, per-check verification evidence, and all-check pass criterion.
- Priority: refuse invalid input before producing a document; structural safety rules override stylistic freedom.
- Context: incident handoff documents expressed as Markdown.
- Units: acknowledgement and escalation deadlines in minutes; completion timestamp in UTC.
- Procedures: generate the template, verify independently, and allow the composed goal only on total verification success.
- Exceptions: only the supplied approval role may override the prohibited-action rule.
- Ambiguity: brief schema representation, meaning of malformed for non-deadline fields, evidence-list cardinality, integer versus fractional minutes, duplicate values, exact wording beyond headings and step concepts, and approval workflow semantics.

## Trusted-circuit comparison

The local `circuits/` tree contains no files, so there is no trusted semantic overlap or version conflict to resolve. No sibling workspace, sibling candidate, prior result, evaluation expectation, or evaluation README/HTML was inspected.
