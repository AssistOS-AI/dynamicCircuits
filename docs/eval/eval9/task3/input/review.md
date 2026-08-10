# Current review C

Publish these records without directly calling a KB rule:

| caseId | controlId | semantic key | required | observed | source |
| --- | --- | --- | --- | --- | --- |
| C-04 | R04 | control.r04 | false | true | review.md#C-04 |
| C-06 | R06 | control.r06 | true | true | review.md#C-06 |
| C-09 | R09 | control.r09 | true | false | review.md#C-09 |
| C-10 | R10 | control.r10 | false | false | review.md#C-10 |

The closure audit must contain four expected and four executed instances. It must not equate non-compliance with runtime
failure: R04 and R09 are findings returned by successfully executed mandatory rules.
