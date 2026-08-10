# Candidate compilation and exercise report

## Environment

- Node.js: `v22.23.1` (candidate contract requires Node.js 20 or newer)
- CLI entry point: `/home/salboaie/work/dynamicCircuits/src/cli.mjs`
- The documented `agent` alias was not installed on `PATH`; the repository-local CLI entry point was used directly.

## Exact compile commands and outcomes

```sh
node /home/salboaie/work/dynamicCircuits/src/cli.mjs sop compile --root candidates/constrained-literary-vignette/sop --package literary.generator
node /home/salboaie/work/dynamicCircuits/src/cli.mjs sop compile --root candidates/constrained-literary-vignette/sop --package literary.verifier
node /home/salboaie/work/dynamicCircuits/src/cli.mjs sop compile --root candidates/constrained-literary-vignette/sop --package literary.composition
```

All three commands exited 0. Compiler evidence:

| Package | Inputs → outputs | Nodes | Invariants | Package hash |
| --- | --- | ---: | ---: | --- |
| `literary.generator` | `brief` → `markdown` | 1 | 0 | `sha256:ab0d20b7f7654e93bdf37a1d0223090124b01da28f6b412bfb5f9ab44d2f44b0` |
| `literary.verifier` | `brief, markdown` → `verification` | 1 | 0 | `sha256:111125917bc168264d7be679c2ee1dda22d72baa5801d1f4b4523e6e39a5c7ce` |
| `literary.composition` | `brief` → `markdown, verification` | 3 | 1 | `sha256:398832ea7681626f486c67afe5ca80d5c1f5b563958d43f0c795eb65b0535e82` |

Compilation proves mechanical validity only.

## Exact positive run command and outcome

```sh
node /home/salboaie/work/dynamicCircuits/src/cli.mjs sop run --root candidates/constrained-literary-vignette/sop --package literary.composition --inputs '[{"title":"The Last Lantern","protagonist":"Mara","setting":"the winter station","object":"a brass key","immediateGoal":"board the final train","obstacle":"the platform gate is locked","choice":"Mara gives the key to the stranded porter","consequence":"the porter opens the gate for everyone","closingImage":"snow whitening the silent rails","motifs":["a dim lantern","the station clock","a red thread"]}]'
```

The command exited 0 with runtime outcome `SUCCEEDED`, semantic verification `ok: true`, 10/10 checks true, and 192
visible words. Both child packages were `SUCCEEDED`. Evidence hashes:

- generator receipt: `sha256:ab3b85971bcf1b70a9630607cfe83746f2fe8d752c32c9d5fce7c56f11286afc`
- verifier receipt: `sha256:526ec88a897e390f3bf06fa59f43addc571f7656c7f097345a8d632d6aaa89c3`
- Markdown output: `sha256:31b8184ab9daeeabee24f6f9bfafd12827bdbafe46c4a98cf5f8a7d9376f1f68`
- verification output: `sha256:d1d70338e41cb5241fd65b5f806a46a954c23c0dd47d16074555afb1c039d918`
- composition receipt: `sha256:d6967036c07bbc7fbe96c3b0adbfd628a4890cc0e3efcb1137714ca3a8ea5619`

## Exact automated test command and outcomes

```sh
node candidates/constrained-literary-vignette/tests/candidate.test.mjs
```

TAP outcome: 6 tests passed, 0 failed, 0 skipped, 0 cancelled. The suite made 18 root runtime executions: 8
`SUCCEEDED`, 10 `REFUSED`, 0 `REJECTED`, and 0 `ERROR`.

| Category | Cases | Expected and observed distinction |
| --- | ---: | --- |
| Positive | 1 | composition `SUCCEEDED`; verifier `ok: true`; nested receipts and public output hashes present |
| Negative/tampered | 1 verifier plus 1 setup generator | runtime `SUCCEEDED`; verifier `ok: false`; missing motif and structural/unapproved-content failures remain visible; no repair |
| Boundary | 4 | 90 and 220 word checks true; 89 and 221 false; fixtures remain overall false because they are not approved generator text |
| Malformed and refusal | 10 | nine generator briefs plus one non-string verifier document all `REFUSED`, with no public outputs |
| Explicit exceptions | included above | invalid motif count and title newline use `INVALID_MOTIF_COUNT` and `TITLE_CONTAINS_NEWLINE` |
| Contract-conflict boundary | 1 | oversized but otherwise valid brief: composition `SUCCEEDED`, verifier `ok: false`, word count above 220 visible |

`REJECTED` is reserved for a failed command check or circuit assurance declaration. Ordinary document invalidity is returned
as structured semantic data, while malformed input is `REFUSED`; neither case is mislabeled as runtime `ERROR`.

## Promotion interpretation

The tests establish deterministic execution for the candidate's declared choices. They do not validate literary quality,
prove that its fixed prose contains no implied event, resolve source ambiguity, establish mandatory applicability, or make
the packages trusted.
