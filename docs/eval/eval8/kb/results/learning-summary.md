# Knowledge learning summary

## Outcome

One focused candidate, `candidates/contractual-breach-notice-v1/`, was created for fact-bounded contractual
breach-notice assembly and literal independent verification. It contains three SOP packages, a contract and semantic
inventory, applicability boundaries, examples, source-span provenance, a manifest with artifact hashes, an executable
test runner, and execution evidence. It remains `REVIEW_REQUIRED`; compilation and passing tests do not establish legal
or semantic trust.

## Input coverage

- Manifest files: 1 expected, 1 readable, 1 processed, 0 unreadable, 0 unsupported.
- Bytes: 2,473 expected and read; digest matched
  `f24be339d485bce52a9d35393dab9d0d48cc5611489dc80e18b5770d314f47c3`.
- Source coverage: all 36 lines of `input/legal-notice-generation-rules.md`.
- Extracted structure: 13 required brief properties, 9 ordered section headings plus one title, 12 reusable rules,
  one explicit permission exception family, 15 independent verification checks, and 10 recorded ambiguity/gap topics.
- Corpus facts were not generalized into legal conclusions: the governing-law statement, parties, dates, clause, event,
  cure, delivery method, reservation, and exhibits remain caller-supplied opaque values.

No evaluation expectations, prior results, evaluation README/HTML material, or sibling-workspace content was used as
semantic evidence. Project skill and runtime source were used only to implement and exercise valid SOP mechanics.

## Trusted-circuit overlap

The KB has no `circuits/` directory. Therefore 0 trusted packages were available for overlap or version comparison, no
trusted package was copied, and no trusted content was modified. The candidate targets the implemented SOP Lang v1
subset documented by `author-sop-circuit`.

## Candidate packages

- `breach_notice.brief(brief) -> validatedBrief`: exact-schema validation and explicit `INVALID_BRIEF` refusal.
- `breach_notice.verify(brief, notice) -> report`: independent, non-repairing verification. A conforming input type can
  succeed with `report.ok: false`, preserving the distinction between a semantic negative and runtime failure.
- `breach_notice.generate(brief) -> notice, report`: deterministic assembly followed by the independent verifier and a
  goal that is rejected unless all 15 checks pass.

The circuits use no declared effects or capabilities and contain no filesystem, process, network, clock, randomness,
oracle, hidden-state, or direct LLM/API access.

## Compilation and test metrics

All packages compiled successfully after final edits:

- `breach_notice.brief`: `sha256:d80449a48b45b767124590f7178c019d6dae00e944db5533bfe4eb1eb40fdb51`
- `breach_notice.verify`: `sha256:ae0df9e8407b1875c1e09ca62e489b81590a6d0dbb99e52962edd46ae867f1a8`
- `breach_notice.generate`: `sha256:fc454c6a272b9190b20bf68eb0b6e5760e97a2df2dacf3a6656fd1b12ff8a43e`

Tests: 13 executed, 13 passed, 0 failed, 0 unexpected runtime errors. Outcomes comprised 7 `SUCCEEDED` positive or
diagnostic executions, 3 explicit `REFUSED` executions, and 2 expected composed-goal `REJECTED` executions, plus one
additional successful negative diagnostic; in total, 8 were `SUCCEEDED`, 3 `REFUSED`, and 2 `REJECTED`. The successful
standard generation receipt was
`sha256:788742e5e1095ca430687607871b02f4f4e447c7398190ad60660eec1bc40289`, with public notice and report hashes
`sha256:b7edf33668dcf077e7340562fc00950bc9179f74aedf21919db69c8a11b2766b` and
`sha256:d388a3665044e1129aefbaef71b44ff1c962c46b93645ed39126a0699265ee00`.

Coverage includes standard generation, standalone positive verification, missing factual label, unsupported currency and
penalty additions, changed deadline, reordered exhibits, one-character values, the supplied-term exception, missing
field, empty exhibit list, non-string notice, Markdown heading injection, and overlapping party names. Exact commands
and receipt evidence are recorded in `candidates/contractual-breach-notice-v1/tests/test-report.md`.

An initial runtime exercise rejected structurally equal briefs because an assurance compared identity across canonical
value cloning. That mechanical defect was corrected to structural equality before the final compilation and full rerun.

## Assumptions and policy choices

- Required strings use length greater than zero; whitespace-only values are not rejected.
- Briefs with unknown properties are refused so no supplied property is silently omitted.
- Currency symbols are Unicode `Sc` code points and are allowed only when that exact symbol occurs in a brief value.
- `statutory penalty` matching is exact and case-sensitive.
- The selected title is `Contractual Breach Notice`; the source fixes title count but not title wording.
- Labels and field-to-section placement not fixed by the source use the mapping documented in the candidate contract.
- Party occurrence checks use literal substrings within the Parties section.
- Exhibits are rendered and checked as exact numbered single lines.
- Verbatim input is not Markdown-escaped; structural changes caused by raw headings are detected and reject the composed
  goal.

These are reviewable choices, not newly inferred legal rules or mandatory applicability signals.

## Gaps and conflicts

No source conflict was found because there is one source. The source does not resolve currency-set scope, phrase casing,
unknown properties, whitespace-only values, multi-line values, Markdown escaping, title wording, overlapping/equal party
names, or exact labels/placements. Literal verification cannot detect every invented allegation, admission, statute,
damages claim, delivery assertion, or calculated date; it detects specified structure/content and the enumerated
prohibitions only. It also does not validate real contracts, law, service, or factual truth.

The overlapping-party and heading-injection tests intentionally demonstrate current rejection boundaries. These are not
silently repaired because doing so would require policy beyond the source.

## Security and operational considerations

Circuit command blocks are pure and capability-free. Inputs are preserved verbatim, so downstream Markdown renderers
must treat generated content as untrusted and apply their own HTML/script sanitization. Receipts expose hashes rather
than raw values, while public outputs deliberately contain the supplied brief content. Callers are responsible for
confidentiality, retention, and transport. No automatic matcher metadata is declared or executed.

## Promotion recommendation

Do not promote yet. Request review by a domain owner and an SOP/runtime reviewer. Promotion should require explicit
decisions on the five blocking areas in `manifest.json`: currency/case scope, unknown-property handling,
Markdown/newline behavior, overlapping/equal party-name semantics, and multi-line exhibits. Reviewers should also add
independent examples for each decided policy and confirm that literal verification is sufficient for the intended
fixture. If approved, promote the package without weakening refusals or checks, rerun the recorded suite in the target
KB, and update hashes. Compilation alone is not a trust certificate.
