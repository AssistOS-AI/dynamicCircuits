# Agent Provenance Journal

## Input coverage

- Accounted for the sole manifest entry, `input/brief.md` (735 bytes).
- Confirmed its SHA-256 digest as
  `5ef6a27817a22ee8a221c6f17acb091ce7f07851cf2799da58a9c18459920867`, matching the manifest.
- Interpreted the UTF-8 Markdown fields and explicit request into task-local symbolic values.
- No manifest input was unsupported or skipped.

## Generated and reused packages

- Generated `task.source` at `sop/task/source.sop` with no external inputs and public `brief` and `request` outputs.
- Generated the fixed no-input root `task.analysis` at `sop/task/analysis.sop` with public `markdown` and
  `verification` outputs.
- Reused reviewed `kb.analysis`, which explicitly composes reviewed `kb.generator` and `kb.verifier`.
- Kept the reviewed KB directory read-only and did not copy its generation or verification policy into task-local SOP.

## Compile and test attempts

- The first compile attempt used an unnecessary `--prefix task` while the package already lived beneath `sop/task/`;
  the compiler rejected it with `UNKNOWN_PACKAGE`. The invocation was corrected without changing package semantics.
- Compiled `task.analysis` successfully with the workspace `sop/` root and the reviewed KB circuit root.
- Compiled and executed the supporting `task.source` package successfully.
- Executed `task.analysis` with `[]`; execution completed with outcome `SUCCEEDED` and receipt hash
  `sha256:beafba7833f44028b3e5b2038f10f8fb9e52370af75137753448b36279ecb363`.
- Confirmed that a supplied root input is rejected with `CIRCUIT_ARITY_MISMATCH`, preserving the fixed no-input interface.
- Exercised reviewed-package negative paths: malformed briefs were classified as `REFUSED`; equal acknowledgement and
  escalation deadlines were refused with `deadline_order_invalid`; and a tampered Markdown fixture completed as a
  verifier test case without a runtime error.

## Assumptions and limitations

- The coding agent normalized the human-readable brief into explicit SOP values; the runtime did not parse unrestricted
  natural language.
- KB applicability was established by reviewing the three packages and wiring the applicable composition explicitly.
  Automatic semantic discovery or exhaustive KB closure is not claimed.
- `input/brief.md` is the source locator for both the normalized facts and request. The brief supplies no incident ID or
  actual completion evidence, so none was added to the task-value package.
- Circuit execution has no filesystem, process, network, clock, random, oracle, or incident-management capabilities.

## Reusable discoveries

- The reviewed generator/verifier family is applicable to a structured incident-handoff brief containing roles, ordered
  positive deadlines, evidence locations, a communication channel, a prohibited action, and an approval role.
- A task-local request goal can make public deliverables structurally depend on document-only and verification requirements
  without duplicating reusable generation or verification rules.
