# Current review B

Publish these records without directly calling a KB rule:

| caseId | controlId | semantic key | required | observed | source |
| --- | --- | --- | --- | --- | --- |
| B-02 | R02 | control.r02 | true | false | review.md#B-02 |
| B-05 | R05 | control.r05 | true | true | review.md#B-05 |
| B-08 | R08 | control.r08 | true | true | review.md#B-08 |

The mandatory registry must discover exactly three applicable instances and retain the failed R02 finding as a successful
rule output whose `compliant` field is false.
