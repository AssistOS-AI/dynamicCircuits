# Current orders A

Publish each row as `order.raw`. Do not call normalization or either assessment explicitly.

| id | amount | currency | approved | source |
| --- | ---: | --- | --- | --- |
| OA-1 | 2500 | eur | false | orders.md#OA-1 |
| OA-2 | 12500 | usd | true | orders.md#OA-2 |

The expected closure has six mandatory instances: two normalizations in the first productive round and four assessments in
the next productive round.
