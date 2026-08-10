# Candidate test plan

The executable runner compiles all three packages, then exercises 13 cases across positive, negative, boundary,
exception, malformed-input, refusal, and composed-goal rejection behavior. It deliberately distinguishes a verifier
that succeeds with `report.ok: false` from a runtime refusal and from a composed circuit whose goal is rejected.

Run from the KB root:

```sh
node candidates/contractual-breach-notice-v1/tests/run-cases.mjs /home/salboaie/work/dynamicCircuits/src/cli.mjs
```

The test data is synthetic and is not semantic evidence. Expected behavior is asserted in the runner. The generated
notice from the first case is reused to exercise independent verification and controlled mutations without maintaining
a second hand-written policy implementation.
