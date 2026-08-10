# Agent provenance journal

## Input coverage

- Processed 1 of 1 entries from `.dynamic-circuits/input-manifest.json`.
- Read `input/cases-and-request.md`; its SHA-256 matched the manifest value `45edec2d71091bf9f22787b7ef5e90cf2213bd0d4accdba282f9c3fd01fea748`.
- Normalized all three manifest-listed case rows, the requested output categories, the declared complete case set, and their source locators.
- No manifest entry was skipped or unsupported.

## Generated and reused circuits

- Generated `task.input` at `sop/task/input.sop` for task facts, request metadata, completeness metadata, and source locators.
- Generated the no-input root `task.analysis` at `sop/task/analysis.sop`; it exposes `findings`, `counts`, and `coverage` as public outputs.
- Reused the reviewed `kb.notice_review.evaluate` package from the configured read-only KB. Its observed package hash was `sha256:4eac315a0c17edfc384aa2261e697c2c5e8a726591cebe557e832c0c30d34914`.
- The KB circuit was not modified and its policy logic was not copied into task-local SOP.

## Compile and test attempts

- `task.input` compiled successfully and executed with outcome `SUCCEEDED`.
- `task.analysis` compiled successfully with no public inputs, three explicit KB calls, and a completeness goal covering all three public outputs.
- `task.analysis` executed with outcome `SUCCEEDED`; its local test receipt hash was `sha256:32afe33a23ca66090b76b739f14e4788d87b9ad14dee463e0f297fd0f66e6872`.
- Direct KB boundary checks at the expedited and ordinary thresholds executed with outcome `SUCCEEDED`.
- Direct KB malformed-input checks for absent review days and a non-boolean evidence flag executed with outcome `REFUSED` and explicit refusal codes.

## Assumptions and limitations

- The input column `Expedited requested` was mapped to both `expedited` and `subjectExplicitlyRequestedExpedited`, because the reviewed KB interface requires both flags for the expedited path and the source describes the request as an independent assertion from consent.
- The reviewed KB package contains no explicit version metadata; applicability was pinned during this run by package name and package hash.
- The KB-provided rule source locator is retained inside each nested policy finding; task row locators are added separately by the root package.
- The executor-owned post-agent run remains authoritative and may produce a different receipt hash because instance identifiers are execution-local.

## Reusable discoveries

- No new reusable policy circuit was identified. The case-set assembly, aggregate counting, and coverage proof are specific to this request and remain task-local.
