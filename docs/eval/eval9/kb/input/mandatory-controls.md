# Mandatory control registry

This knowledge source defines ten independent review controls. A control is mandatory whenever a current task publishes a
record under that control's semantic key. Controls that have no published record are outside the current task and must not
be invented or executed.

Every control record contains a stable `caseId`, the `controlId`, the boolean value `required`, the boolean value `observed`,
and a source locator. The reusable evaluator reports compliance when `observed` equals `required`; it retains both supplied
values and the source locator.

| Control | Semantic key | Reusable requirement |
| --- | --- | --- |
| R01 | `control.r01` | Review the supplied identity-verification requirement. |
| R02 | `control.r02` | Review the supplied consent-recording requirement. |
| R03 | `control.r03` | Review the supplied retention-limit requirement. |
| R04 | `control.r04` | Review the supplied deletion-approval requirement. |
| R05 | `control.r05` | Review the supplied access-logging requirement. |
| R06 | `control.r06` | Review the supplied encryption requirement. |
| R07 | `control.r07` | Review the supplied transfer-authorization requirement. |
| R08 | `control.r08` | Review the supplied incident-notification requirement. |
| R09 | `control.r09` | Review the supplied backup-testing requirement. |
| R10 | `control.r10` | Review the supplied audit-evidence requirement. |

The word mandatory applies to the matcher for each semantic key. The generic evaluation circuit is not globally mandatory
on its own; it becomes an obligation through the reviewed matcher that names it with `@apply`.
