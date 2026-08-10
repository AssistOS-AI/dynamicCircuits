# Review examples

These examples are synthetic tests, not semantic sources or legal advice.

## Positive assembly

A complete brief with distinct party names and ordinary single-line strings produces Markdown beginning with
`# Contractual Breach Notice`, the nine required sections, and a report with `ok: true`. The exercised public notice hash
is `sha256:b7edf33668dcf077e7340562fc00950bc9179f74aedf21919db69c8a11b2766b`.

## Negative independent verification

Changing only `Supplied factual statement:` to `Factual statement:` leaves runtime outcome `SUCCEEDED`, but returns
`report.ok: false`, `checks.factualLabelPresent: false`, and `missingItems: ["factualLabelPresent"]`. This demonstrates
that a semantic negative is not conflated with runtime refusal.

Adding `$ statutory penalty` to a notice whose brief has neither returns both `currency_symbol:$` and
`phrase:statutory penalty` in `prohibitedAdditions`. Supplying the same symbol and exact phrase inside a brief is the
source-defined exception and passes.

## Refusal and rejection

A missing sender or empty exhibit list is refused as `INVALID_BRIEF`; a numeric notice is refused as
`INVALID_NOTICE_TYPE`. A verbatim event value containing `## Unrequested Heading` is assembled, diagnosed as violating
the heading contract, and causes the composed generator goal to be `REJECTED`.
