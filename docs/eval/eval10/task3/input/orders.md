# Current orders C

Publish each row as `order.raw`. Do not call a KB target explicitly.

| id | amount | currency | approved | source |
| --- | ---: | --- | --- | --- |
| OC-1 | 9999.50 | gbp | false | orders.md#OC-1 |
| OC-2 | 10000 | EUR | false | orders.md#OC-2 |

The currency rule must flag OC-1, while the approval rule must flag OC-2 at the exact threshold. All six mandatory instances
must nevertheless execute and the closure audit must be closed.
