# Eval 5 expectation and comparison

## Source-derived expectation

Ten records evaluated against ten rules produce 100 findings. REL-01 should pass all rules. REL-02 should fail R01 and R08;
REL-03 through REL-10 should each fail the single rule R02, R03, R04, R05, R06, R07, R09, and R10 respectively. Expected
totals are 90 PASS, 10 FAIL, one compliant record, and nine non-compliant records.

## Comparison with the observed runtime result

`task/results/runtime-result.md` contains the generated Markdown report and the full structured analysis. Both return exactly
the expected per-record failures and aggregate totals. The root retained 100 findings, its coverage goal passed, and its
receipt links all ten KB review calls. No expectation was changed after observing the run.

This file is evaluation material, not KB or task input.
