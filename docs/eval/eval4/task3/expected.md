# Task 3 expectation and observed comparison

The positive and negative pilot facts should make the pilot query `CONFLICT`. The positive pilot fact should still derive
trained support through the supplied implication. Sailor should remain `UNKNOWN`.

The executor produced `SUCCEEDED` with `CONFLICT`, `SUPPORTED`, and `UNKNOWN`, plus receipt
`sha256:c3bd01d3408d7efb7cbca0ae96f2bca8065e879be25b1c1cbc76704ca7d4aa3b`. The expectation matches the observed result.
