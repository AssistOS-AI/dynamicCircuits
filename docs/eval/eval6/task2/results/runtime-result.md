# Circuit Runtime Result

> This is the authoritative result emitted by the Dynamic Circuits executor. It is rendered directly from the circuit public outputs and execution receipt; it is not a coding-agent interpretation.

## Execution identity

| Field | Observed value |
| --- | --- |
| Entrypoint | `task.analysis` |
| Outcome | **SUCCEEDED** |
| Package hash | `sha256:986260acd9b45c62a4801f3bd471234f702f0150870afa6c76041ffc40ab6533` |
| Receipt hash | `sha256:d5d990effccf85f56d327180e6553a36288744bc3922d65330dafa18388a3c93` |
| Executed nodes in root receipt | 4 |
| Dead nodes in root receipt | 0 |

## Public outputs

### markdown

~~~text
# The Quiet Ferry

## Arrival
Ilie is present in a river crossing at dawn. The concrete object is a sealed blue letter, and the immediate goal is reach the opposite bank before sunrise. These supplied details define the arrival: the protagonist, setting, object, and purpose remain together, while the opening adds no name, fact, quotation, or event beyond the brief.

## Pressure
The obstacle is the ferryman refuses payment. Under that pressure, the first motif recurs: bell rope. The obstacle stands against the immediate goal, and the assigned motif marks that pressure without introducing another decision, consequence, person, place, object, or event.

## Choice
The supplied choice is Ilie offers the letter as collateral. The second motif accompanies it: cold coin. This is the decisive turn named by the brief; the paragraph holds to that choice, lets the assigned motif echo beside it, and adds no alternative action or outcome.

## Consequence
The supplied consequence is the ferry departs while the letter remains unopened. The third motif remains with its aftermath: white heron. No further event follows; the consequence settles into the required final image, and the vignette closes exactly there: reeds drawing silver lines across the water
~~~

Output hash: `sha256:fd15e7d70a9c53e4dcf1738fa7f869105c40ca53dcc9c1e31cc914d6f2a63fd1`

### verification

- **ok:** true
- **checks:**
  1.
    - **id:** exact-heading-order
    - **ok:** true
  2.
    - **id:** exactly-four-body-sections
    - **ok:** true
  3.
    - **id:** one-non-empty-paragraph-per-section
    - **ok:** true
  4.
    - **id:** all-brief-fields-present-verbatim
    - **ok:** true
  5.
    - **id:** motifs-in-assigned-sections
    - **ok:** true
  6.
    - **id:** narrative-fields-in-assigned-sections
    - **ok:** true
  7.
    - **id:** closing-image-at-end
    - **ok:** true
  8.
    - **id:** no-extra-headings
    - **ok:** true
  9.
    - **id:** word-count-90-through-220
    - **ok:** true
  10.
    - **id:** approved-fixed-content-only
    - **ok:** true
- **missingRequirements:**
(empty list)
- **unexpectedStructuralConditions:**
(empty list)
- **counts:**
  - **headings:** 5
  - **levelOneHeadings:** 1
  - **levelTwoHeadings:** 4
  - **bodySections:** 4
  - **paragraphsBySection:**
    - **Arrival:** 1
    - **Pressure:** 1
    - **Choice:** 1
    - **Consequence:** 1
  - **words:** 194
  - **fieldOccurrences:**
    - **title:** 1
    - **protagonist:** 2
    - **setting:** 1
    - **object:** 1
    - **immediateGoal:** 1
    - **obstacle:** 1
    - **choice:** 1
    - **consequence:** 1
    - **closingImage:** 1
  - **motifOccurrences:**
    1. 1
    2. 1
    3. 1

Output hash: `sha256:a2ce4ac5a95825d1698db65e489bcd2dbe53baa8887a0da33d2614f9cd64ef9c`

## Assurance checks

| Kind | Wire | Passed | Value hash |
| --- | --- | --- | --- |
| invariant | `requestedDeliverablesPresent` | yes | `sha256:b5bea41b6c623f7c09f1bf24dcae58ebab3c0cdd90ad966bc43a45b44867e12b` |

## Receipt summary

| Node | Callee | Status | Child receipt |
| --- | --- | --- | --- |
| `n0001` | `task.brief` | SUCCEEDED | `sha256:be8ff95db015c3b9a9aa50e8403f43eaf5826d78d2d07c138a1bd5e227c0acfb` |
| `n0002` | `task.request` | SUCCEEDED | `sha256:be3670e31b581a63b905bbf1d0ddb7de1dca7c5b29b0f3aac8b16570d3d6f8fb` |
| `n0003` | `kb.literary.composition` | SUCCEEDED | `sha256:7066ac633b81894630732132e55b8f8b28807606e495fd7f8fe188aa4dcbac28` |
| `n0004` | `validateRequestedDeliverables` | SUCCEEDED | - |

