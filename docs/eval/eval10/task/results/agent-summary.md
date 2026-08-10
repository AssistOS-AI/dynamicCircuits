# Agent Provenance Journal

## Input coverage

- Processed `input/orders.md`, the only entry in `.dynamic-circuits/input-manifest.json`.
- Verified 438 bytes and SHA-256
  `a858cc25b530f531dedc6c6e83f0ae75075c51b63cfa71c31c17711a08f06b6b` against the manifest.
- Interpreted the UTF-8 Markdown table as two current order records with row-level source locators.
- Recorded the source request and its stated closure expectation as task metadata.
- No manifest entry was unsupported or skipped.

## Generated task circuits

- `sop/task/orders.sop` defines the source request, the two raw order records, and their locators without embedding KB
  normalization or assessment logic.
- `sop/task/analysis.sop` is the no-input `task.analysis` root. It consumes `task.orders`, exposes task data, and publishes
  both records under the exact `order.raw` semantic key.
- The root contains no explicit call to a reviewed normalization, approval, or currency package.

## Reviewed KB circuits reused

- `kb.matchers.normalize` declares mandatory trigger `order.raw` and applies `kb.order.normalize`.
- `kb.matchers.approval` declares mandatory trigger `order.normalized` and applies `kb.order.approval`.
- `kb.matchers.currency` declares mandatory trigger `order.normalized` and applies `kb.order.currency`.
- All reviewed KB files remained read-only. No optional or legacy package without a mandatory matcher was present.

## Compile and test attempts

- `task.orders` compiled with package hash
  `sha256:572d5494b25f0256db1103c5ee5922f4c299ef8a5cbfd6f1e9d4ddef749bafe7`.
- `task.analysis` compiled with package hash
  `sha256:3a62163cfb69cd80e7655f4b97b21f476523af32330a593693a9066c926735e8`.
- `task.orders` was run with `[]`; the command exited zero and produced receipt hash
  `sha256:3cbb13188070d5f96cae77109f584d383e7dbe576d4decb187db56e4fec82277`.
- `task.analysis` was run with `[]`; the command exited zero. The root receipt and mandatory-closure section were
  inspected, including rounds, publications, expected and executed instance sets, missing instances, and failure state.
- No direct LLM API, filesystem, process, network, clock, randomness, or oracle capability was added to SOP command code.

## Assumptions and limitations

- Markdown numeric amounts were preserved as numbers, booleans as booleans, and currency text exactly as supplied in the
  task package.
- Each table row's `source` value is also used as publication provenance.
- The source's expected closure shape is retained as request metadata; runtime receipts remain the execution authority.
- The analysis is bounded to the manifest-listed input and reviewed KB circuits. Evaluation expectations, earlier results,
  KB candidates, learning reports, and sibling workspaces were not used as semantic sources.

## Reusable discoveries

- No new reusable policy was discovered. No KB candidate was created.
