---
name: author-sop-circuit
description: Author, compile, run, and diagnose SOP Lang circuit files for Dynamic Circuits workspaces and KB candidates. Use whenever creating or modifying `.sop` files or interpreting structured compiler and runtime receipts.
---

# Author SOP Circuit

Read [references/sop-v1-subset.md](references/sop-v1-subset.md) before editing a circuit.

## Workflow

1. Define the complete positional interface with `@input` and `@output`.
2. Keep wires local, immutable, and explicitly connected. Pass external values only through inputs.
3. Prefer core commands. Add a JavaScript `define` block only for task semantics that cannot be composed from the core; declare all values through formals and return only canonical data.
4. Make goals and invariants depend structurally on every wire named in `covers`.
5. Compile with `agent sop compile --root sop --package PACKAGE`.
6. Run with `agent sop run --root sop --package PACKAGE --inputs '[]'` and inspect the structured outcome and receipt.
7. Exercise positive, negative, boundary, malformed-input, exception, and refusal cases appropriate to the circuit. Inspect nested receipts and public output hashes.
8. Treat runtime success, semantic verdict, refusal, rejection, and error as distinct. Do not describe a source-only circuit as executed or claim planned matching, closure, trust, cache, or certificate behavior.

Keep direct LLM calls, process access, filesystem access, network access, clocks, randomness, and hidden global state out of command blocks.
