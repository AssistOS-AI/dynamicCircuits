# Current orders B

Publish this row as `order.raw`. Do not call a KB target explicitly.

| id | amount | currency | approved | source |
| --- | ---: | --- | --- | --- |
| OB-1 | 18000 | ron | false | orders.md#OB-1 |

The approval rule must return a non-compliant finding. The normalization and currency rules must still execute successfully,
so closure contains three expected and three executed instances.
