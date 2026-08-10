# Agent provenance journal

## Input coverage

- Accounted for the sole manifest entry, `input/context-and-questions.md` (231 bytes).
- Verified its SHA-256 against `.dynamic-circuits/input-manifest.json`: `eabd0a7080f2f70939fe2687e411215282c6f6a456954bbd4cca1ebac774f4cc`.
- Normalized the source's one named-subject fact, two unary implications, three positive proposition questions, completeness statement, and open-world statement. Source line locators are retained in the task package.
- No manifested file was skipped or unsupported.

## Generated and reused circuits

- Generated `task.context_and_questions` at `sop/task/context_and_questions.sop`. It is a no-input package exposing source metadata, normalized context, and the three queries.
- Generated the required no-input root `task.analysis` at `sop/task/analysis.sop`. It exposes eight public outputs: source metadata, normalized context, each query, and each corresponding evaluator result.
- Reused reviewed package `kb.unary_entailment.evaluate` from `kb/circuits/unary_entailment/evaluate.sop` through three explicit calls. Its checked interface is `context query -> result`; its supported representation matches the task's unary facts, explicit-polarity implications, and proposition queries.
- The reviewed KB remained read-only, and no KB policy logic was copied into task-local SOP.

## Compile and test attempts

- Final compile of `task.context_and_questions` succeeded with package hash `sha256:3c1502b65717e789143dbe4627121177ac810679a6fec65a621d5d866abb6f9f`.
- Final compile of `task.analysis` succeeded with package hash `sha256:fb729abb8bc2a5f933fe730d3d49bb3b0d5e246d021e604662a703809e69c58e`.
- An auxiliary first run of the supporting package omitted `--kb-root`; registry resolution encountered the root package's `kb.*` calls and stopped with `UNKNOWN_CALLEE`. The invocation was corrected without a semantic source change.
- The corrected supporting-package run succeeded with receipt `sha256:591a9a432289ad157c63f46c64b59fb097da8b8c9e20b90f233ccd9cf179b369`.
- The final `task.analysis` run with empty inputs and the reviewed KB root succeeded with receipt `sha256:3e0ea545a2093a17bdfcd7a7393d238f6c4b536ae1f2451f544d9e084090bb0b`. All root and nested circuit nodes completed successfully.

## Assumptions and limitations

- The natural-language universal statements were normalized as unary predicate implications, matching the reviewed circuit's documented input form.
- The coding agent performed the source normalization; the SOP runtime did not parse unrestricted natural language.
- No malformed-input or refusal test was applicable to the task-local packages because their required interface is explicitly no-input. The source questions cover direct-evidence, multi-step, and neither-polarity-present paths in the reviewed evaluator.
- The executor-owned post-agent run remains authoritative and will create `results/runtime-result.md`; this journal does not substitute for that artifact.

## Reusable discoveries

- No new semantic KB candidate was needed: the reviewed unary-entailment circuit covered the manifested task without modification.
