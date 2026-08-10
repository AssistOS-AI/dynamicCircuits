# Task 3 expectation and observed comparison

EDGE-01 should pass all ten rules. EDGE-02 is at the 365-day retention boundary but uses an unrecognized license, so only
R10 should fail. EDGE-03 exceeds the retention boundary at 366 days, so only R03 should fail. Expected aggregate: 30
findings, 28 pass, 2 fail, 1 compliant record, 2 non-compliant records, and complete coverage.

The executor produced `SUCCEEDED` with exactly those findings and receipt
`sha256:0c414a5e6717b8b52fd266592bce11e1a6b8b8a33316c05c3d5aa7ac651093f9`. The expectation matches the observed result.
