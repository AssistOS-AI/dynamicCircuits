# Reviewed KB Circuits

## What this folder contains

The Codex learning run generated the candidate family in
`../candidates/data-release-governance-v1/`. That candidate contains ten focused rule circuits and one review composer. The
candidate suite passed 55 of 55 executable cases before promotion.

This folder is the reviewed KB surface used by task analysis. Files `r01.sop` through `r10.sop` are byte-for-byte copies of
the Codex-generated candidate files. `review.sop` differs only in its nested package names: promoted KB packages receive the
runtime prefix `kb.`, so calls such as `data_release_governance.r01` became `kb.data_release_governance.r01`.

## Review performed for this evaluation

The promotion review checked that every rule remains independent, every source locator points into the single KB source,
R03 keeps its inclusive 1-to-365-day bound, explicit bypasses remain visible, and the review circuit retains R01 through R10
in stable order. It also re-ran the generated 55-case suite and compiled the promoted package graph with the `kb` prefix.

Promotion does not prove that the fixture represents a real policy. It means that this evaluation accepts the generated
interpretation as the reusable rule set for its task run. The circuits only evaluate supplied canonical values. They do not
read files, call processes or networks, verify external evidence, or invoke an LLM.

## Package names during task analysis

- `kb.data_release_governance.r01` through `kb.data_release_governance.r10` evaluate one rule against one release record.
- `kb.data_release_governance.review` composes all ten findings for one release record.

Task-local circuits should invoke these reviewed packages. They should not copy the governance conditions into task code.
