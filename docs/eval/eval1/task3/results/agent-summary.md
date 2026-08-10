# Agent provenance journal

## Input coverage

- Accounted for the sole manifest entry, `input/cases-and-request.md` (462 bytes; SHA-256 `68884e9f38ea46783f626e0dd1d0ee651afaf608d70dff76b8c261e9167ae495`).
- Encoded all four manifested rows, the requested output categories, exact row/request locators, and the stated evidence boundary.
- No unsupported input formats or unreadable manifest entries were encountered.

## Generated and reused circuits

- Generated `sop/task/cases.sop` as the no-input task-evidence package `task.cases`.
- Generated `sop/task/analysis.sop` as the no-input root package `task.analysis`, with public outputs `findings`, `totals`, and `coverage`.
- Reused the reviewed, read-only package `kb.notice_review.evaluate` once for each task row. No KB files were modified and no KB policy logic was copied into task-local packages.

## Compile and test attempts

- The installed `agent` executable was not on `PATH`; used its documented repository equivalent, `node /home/salboaie/work/dynamicCircuits/src/cli.mjs`.
- `task.cases` compiled successfully with package hash `sha256:0eec57b3f1dca2cb84006f621e9adaa1e63322d2c74872e1c0f74480b33fdd3d` and executed with outcome `SUCCEEDED`.
- `task.analysis` compiled successfully with package hash `sha256:047f6809e774bc0f9496bed5085bf0ac89794752647985c93c7b80086052a373` and executed with outcome `SUCCEEDED`; its local execution receipt hash was `sha256:79f2f507fd9000f7355c7fbb3a4b7083e61d4da512683180c69edcb534e17737`.
- The current rows exercise ordinary above-boundary, expedited boundary, expedited-request-without-consent, and ordinary boundary inputs through the root graph.
- A separate malformed `{}` call to `kb.notice_review.evaluate` exercised the refusal boundary and returned `REFUSED` with code `review_days_required`.

## Assumptions and limitations

- The task source supplies one `Expedited requested` field, while the reviewed circuit accepts both `expedited` and `subjectExplicitlyRequestedExpedited`. The supplied yes/no value was mapped to both interface flags. This normalization is disclosed in the root package's coverage output with its source locator.
- `No evidence beyond these fields is supplied` was honored by encoding the explicit yes/no cells only; no additional evidence was inferred.
- Local execution is verification only. The workspace CLI remains responsible for the authoritative post-agent execution and for creating `results/runtime-result.md`.

## Reusable discoveries

- A future separately reviewed adapter circuit could standardize the mapping from a single human-readable expedited-request field to the reviewed notice circuit's two request-related flags. No KB candidate was written during this task.
