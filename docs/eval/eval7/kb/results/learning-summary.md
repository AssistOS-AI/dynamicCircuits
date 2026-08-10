# Learning summary

## Outcome

One focused, review-required executable knowledge candidate was created at `candidates/incident-handoff-sop-v1/`. It contains deterministic SOP generation, separate structural verification, a composed all-check goal, explicit contracts and applicability, source-span provenance, examples, a 13-case test suite, and exact compilation/runtime evidence. No trusted circuit was modified or promoted.

## Input coverage

| Manifest input | Bytes | Manifest digest verified | Readability | Coverage |
| --- | ---: | --- | --- | --- |
| `input/operational-sop-generation-rules.md` | 2,190 | SHA-256 `65126021101525255727dd0912ecbe40d498099d200b3cd9a617a9a6951143f4` matched | readable Markdown | complete: lines 1–41 inventoried |

Coverage is 1/1 manifest files, 2,190/2,190 bytes, with no unreadable or unsupported input. `.dynamic-circuits/AGENT_INSTRUCTIONS.md` was not present. Semantic review was limited to the manifest-listed input and the local trusted `circuits/` tree. The trusted tree contained no files. No evaluation expectation, prior result, evaluation README/HTML, sibling candidate, or sibling task workspace was inspected.

## Extracted knowledge

The source defines an incident-handoff Markdown document generator, a separate non-repairing verifier, and a composed goal. The reusable knowledge includes:

- a 12-field brief contract with positive minute deadlines and strict escalation-after-acknowledgement order;
- nine exact ordered headings including the level-one title;
- seven exact ordered procedure concepts;
- verbatim inclusion of roles, deadlines, evidence locations, and communication channel;
- a `MUST NOT` prohibited action with only the supplied approval role named for an override;
- an explicit statement that generation performs no operational action;
- five completion checklist fields, including a UTC timestamp;
- independent per-check evidence, missing-item reporting, measured counts, and no repair; and
- an all-verifier-check pass condition for composed analysis.

Source-specific content remains provenance and template policy. The reusable executable part is the deterministic validation, generation, verification, and goal composition procedure.

## Candidate inventory

| Package | Function | Inputs | Outputs |
| --- | --- | --- | --- |
| `candidate.generator` | validate a brief and generate exact Markdown | `brief` | `markdown` |
| `candidate.verifier` | independently measure and check supplied Markdown without repair | `brief`, `markdown` | `report` |
| `candidate.analysis` | compose generation and verification behind a structural goal | `brief` | `markdown`, `verification` |

The verifier emits 12 named checks with evidence and seven measured counts. A deficient document returns a successful runtime result with `ok: false`; malformed inputs refuse and expose no outputs. Command blocks have no filesystem, process, network, clock, randomness, direct LLM, or hidden global-state access.

## Mechanical validation and metrics

All 3/3 packages compiled with the implemented SOP v1 subset. Compilation found 0 dead nodes. The analysis resolved 2 nested circuit calls and one goal structurally covering both public outputs.

The test suite passed 13/13 cases:

- 3 positive cases;
- 2 negative document cases returning `ok: false` without repair;
- 1 fractional-deadline boundary case;
- 1 named approval-role exception case;
- 2 malformed-input cases; and
- 4 refusal cases.

Runtime totals were 7 `SUCCEEDED`, 6 `REFUSED`, 0 `REJECTED`, and 0 `ERROR`. Public and nested receipts and output hashes were inspected. A direct CLI success, semantic-negative verifier result, and deadline-order refusal were also exercised. Exact commands, package hashes, receipt hashes, and outcomes are recorded in `candidates/incident-handoff-sop-v1/tests/execution-report.md`.

Compilation and passing tests prove mechanical validity and the recorded interpretation only. They do not make the package trusted or automatically applicable.

## Assumptions and policy choices

- All 12 named fields are treated as required, and missing/empty/malformed refusal applies to all of them. The source grammar could be read as attaching those refusal adjectives only to deadline fields.
- Evidence locations are modeled as a non-empty JSON array of non-empty strings. The source gives neither representation nor minimum cardinality.
- Text values must be single-line so verbatim insertion cannot inject headings or numbered steps through a line break. Other Markdown punctuation is retained verbatim.
- Deadline values may be fractional finite positive numbers because the source does not require integers.
- “Every role” includes incident commander, outgoing, incoming, and approval roles.
- Service and severity are generated and verified as completeness fields even though the verifier paragraph does not list them separately.
- The approval clause is document text only. It does not perform approval, define evidence of approval, permit delegation, or grant operational authority.
- Verbatim presence is measured by exact substring. Duplicate or identical role/evidence values are retained in requested counts rather than semantically deduplicated.

No jurisdiction, effective interval, maximum deadline, localization rule, or external verification method is stated by the source.

## Gaps and security considerations

- There are no source-provided examples or counterexamples against which to validate the chosen field schema and exact prose.
- “Malformed,” evidence cardinality, fractional deadlines, duplicate values, and approval workflow semantics require domain decisions.
- Verbatim single-line values may still contain Markdown punctuation. The newline refusal protects line structure but is not a general Markdown-sanitization policy.
- Presence checks are exact substrings and can be satisfied outside the semantically ideal section. Heading order and procedure lines are section-aware, but role, evidence, channel, and policy presence are global.
- No maximum input length, evidence-item count, or deadline magnitude is specified. Runtime limits are therefore the only resource bound.
- The verifier and generator separately encode the same procedure interpretation. This supports separate execution but creates review-sensitive duplication if the template changes.
- The test suite does not intentionally trigger runtime `ERROR`; its absence is a test result, not a proof that all runtime errors are impossible.
- The package performs no effects and cannot obtain a UTC time. It only requires a future completion record to contain a UTC timestamp field.

## Overlap and conflicts

The trusted `circuits/` tree was empty, so no overlap, weaker duplicate, version conflict, or reusable trusted dependency was found. The sole source contains no internal conflicting rules. Its ambiguities were preserved as explicit candidate policy choices rather than silently asserted as source facts.

## Promotion recommendation

Do not promote automatically. Recommend promotion only after:

1. an incident-operations reviewer confirms the 12-field JSON schema, required non-empty evidence list, and exact seven-step wording;
2. a policy owner confirms how the approval-role override must be phrased and evidenced;
3. a security reviewer accepts verbatim Markdown handling, substring-based presence checks, and resource bounds or requires stronger section-aware validation;
4. reviewers decide integer versus fractional deadlines, duplicate handling, and maximum values;
5. the package references in `analysis.sop` are rewritten from `candidate.*` to the selected trusted-root prefix; and
6. all three promoted packages are recompiled and the full suite is rerun against the promoted paths.

Until then, retain the package under `candidates/` with status `review-required`.
