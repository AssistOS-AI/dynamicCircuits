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
4. For symbolic context reasoning, pass facts, rules, and questions explicitly; preserve source locators; suppress duplicate derivations; bound non-monotone or unsupported forms; distinguish direct support, derived support, contradiction, and open-world `UNKNOWN`.
5. Make goals and invariants depend structurally on every wire named in `covers`.
6. Publish a value for automatic mandatory matching only with `publish value "domain.key" provenance`. Semantic keys use at
   least two dotted segments. The provenance value should identify the source locator or deterministic derivation.
7. Mark mandatory applicability on a reviewed KB matcher, never on task code or on the target rule alone. The matcher must
   declare `@template mandatory`, every exact activation key in `@trigger`, and its target package in `@apply`. It must use
   `@input index delta`, `@output matches`, no local JavaScript, and only the restricted exhaustive commands `select`,
   `bind`, `join`, `distinct`, `concat`, and `emptyList`. Every selected semantic key must appear exactly once in `@trigger`.
8. Compile with `agent sop compile --root sop --package PACKAGE`.
9. Run with `agent sop run --root sop --package PACKAGE --inputs '[]'` and inspect explicit execution plus the mandatory
   closure section. A closed mandatory set is not a trust certificate or a claim that the KB contains every real-world rule.
10. Exercise positive, negative, boundary, multiple-match, duplicate-publication, join-mismatch, malformed-input, mandatory
   refusal, and multi-round cases appropriate to the circuit. Inspect instance keys, closure rounds, expected/executed sets,
   nested receipts, and public output hashes.
11. Treat runtime success, semantic verdict, refusal, rejection, `INCONCLUSIVE`, and error as distinct. Do not describe a
   source-only circuit as executed or claim unimplemented trust, effect, cache, or final-certificate behavior.

Keep direct LLM calls, process access, filesystem access, network access, clocks, randomness, and hidden global state out of command blocks.
