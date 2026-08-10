# Agent provenance journal

## Input coverage

- Processed the sole manifest entry, `input/task.md` (1,008 bytes).
- Verified SHA-256 `f87c74e922e8faa17c92cff80e83197fa4a083bc96c08e1e507a7b6c076cad1a` against `.dynamic-circuits/input-manifest.json`.
- Encoded the request at `input/task.md:1-3`, SMALL-01 at `input/task.md:5-22`, and SMALL-02 at `input/task.md:24-41`.

## Generated and reused circuits

- Generated `task.records` in `sop/task/records.sop` for the two source records and their locators.
- Generated `task.request` in `sop/task/request.sop` for the requested records, R01-R10 coverage, finding retention, aggregate data, and coverage data.
- Generated the no-input root `task.analysis` in `sop/task/analysis.sop`.
- Reused `kb.data_release_governance.review` once per record; that reviewed composer explicitly invokes `kb.data_release_governance.r01` through `kb.data_release_governance.r10`.
- The KB remained read-only. No KB candidate or learning report was created.

## Compile and test attempts

- Compiled `task.records` successfully with package hash `sha256:191568e6d2cd8677d7582c02af9813586febaf9641b811548b2c4c50be60357f`.
- Compiled `task.request` successfully with package hash `sha256:f70beb82921e800c9dbf9b5da705c6c4db16b00ec05e55959d1ec92193b4ac62`.
- Compiled `task.analysis` successfully with package hash `sha256:73f5633f7ab4d1effcde592a93b7da32ed1da38a2932cc3ad3558cb89715b4f7`.
- Ran `task.records` with `[]`; runtime outcome was `SUCCEEDED` and its invariant passed.
- Ran `task.request` with `[]`; runtime outcome was `SUCCEEDED` and its invariant passed.
- Ran `task.analysis` with `[]`; runtime outcome was `REFUSED` with no public outputs. The nested receipt identifies `unsupported_sensitivity` in `kb.data_release_governance.r02` for SMALL-02's literal `sensitive` value. The root was executed; this was not a source-only or skipped run.

## Assumptions and limitations

- Preserved all source values literally, including the sentinel string `missing` and the SMALL-02 sensitivity value `sensitive`.
- Did not infer a mapping from `sensitive` to any accepted KB sensitivity token because neither the manifested task input nor the reviewed KB circuits supplies such a mapping.
- Because the reviewed nested circuit refused that value, the root assembly could not expose record reports, aggregate data, or coverage data during the coding-agent test run.
- The workspace executor remains responsible for executing `task.analysis` after agent exit and writing `results/runtime-result.md` from its outputs and receipt.

## Reusable discoveries

- A separately reviewed vocabulary-compatibility or normalization circuit could make unsupported task tokens explicit before governance review, provided its mapping rules come from an authorized semantic source.
