# Current review A

Publish the following current control records and let the reviewed mandatory matcher registry decide which rules apply.
Do not call `kb.mandatory_controls.evaluate` explicitly.

| caseId | controlId | semantic key | required | observed | source |
| --- | --- | --- | --- | --- | --- |
| A-01 | R01 | control.r01 | true | true | review.md#A-01 |
| A-03 | R03 | control.r03 | true | false | review.md#A-03 |
| A-07 | R07 | control.r07 | false | false | review.md#A-07 |
| A-10 | R10 | control.r10 | true | true | review.md#A-10 |

The executor report must show four automatically applied mandatory instances. The six registry rules without a matching
semantic publication must remain inactive.
