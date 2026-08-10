# Circuit Runtime Result

> This is the authoritative result emitted by the Dynamic Circuits executor. It is rendered directly from the circuit public outputs and execution receipt; it is not a coding-agent interpretation.

## Execution identity

| Field | Observed value |
| --- | --- |
| Entrypoint | `task.analysis` |
| Outcome | **SUCCEEDED** |
| Package hash | `sha256:f3d8b9ee62e3bbecada78d9f3a137cc2178e8b7ff6f81582850a93670254c8df` |
| Receipt hash | `sha256:f08a8f188cefbdbbe0a17c65c1103d42fb6b59b6b8824d3bf371a9c231cd5217` |
| Executed nodes in root receipt | 3 |
| Dead nodes in root receipt | 0 |

## Public outputs

### markdown

~~~text
# Orchard Signal

## Arrival
Lea is present in an empty orchard after harvest. The concrete object is a cracked field radio, and the immediate goal is send one final weather warning. These supplied details define the arrival: the protagonist, setting, object, and purpose remain together, while the opening adds no name, fact, quotation, or event beyond the brief.

## Pressure
The obstacle is the battery can power either the radio or the frost lamps. Under that pressure, the first motif recurs: copper leaf. The obstacle stands against the immediate goal, and the assigned motif marks that pressure without introducing another decision, consequence, person, place, object, or event.

## Choice
The supplied choice is Lea turns off the lamps and transmits the warning. The second motif accompanies it: static rain. This is the decisive turn named by the brief; the paragraph holds to that choice, lets the assigned motif echo beside it, and adds no alternative action or outcome.

## Consequence
The supplied consequence is distant farms answer while her own trees darken. The third motif remains with its aftermath: borrowed fire. No further event follows; the consequence settles into the required final image, and the vignette closes exactly there: one green frequency bar above the black branches
~~~

Output hash: `sha256:68114199a2e6dd1dea32dad3744c680557b467e77b0d0508cf92d4fdb13a5ce2`

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
  - **words:** 203
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

Output hash: `sha256:d9edacad54920648939768a53ee2f2df6ca8d6948ef1b2e4bb404117b5aa409d`

## Assurance checks

| Kind | Wire | Passed | Value hash |
| --- | --- | --- | --- |
| invariant | `resultComplete` | yes | `sha256:b5bea41b6c623f7c09f1bf24dcae58ebab3c0cdd90ad966bc43a45b44867e12b` |

## Receipt summary

| Node | Callee | Status | Child receipt |
| --- | --- | --- | --- |
| `n0001` | `task.brief` | SUCCEEDED | `sha256:e704067da6fc85ec82c9f05e28c3452c0ac101fde2d7ba635760a54477eed4a4` |
| `n0002` | `kb.literary.composition` | SUCCEEDED | `sha256:546f8605c09cab549ea27c1aa77af3e476225773a878dc5931f794322bb6b6e4` |
| `n0003` | `validateResult` | SUCCEEDED | - |

