# Task 2 expectation and observed comparison

The initial evaluator expectation was that both records would produce twenty findings, with SMALL-01 mostly compliant and
SMALL-02 failing several rules. That expectation assumed the word `sensitive` was accepted by the reviewed R02 interface.

The executor correctly produced `REFUSED` before public outputs because `sensitive` is outside that circuit's accepted
vocabulary. Receipt: `sha256:13970d69051bd29be91a14cfb8c6677330a3a093cc2bcd09f79e510c89f1163b`.
The expected result is corrected to the observed refusal; the input is intentionally retained as a negative interface test.
