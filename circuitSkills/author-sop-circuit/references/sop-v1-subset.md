# Implemented SOP Lang Subset

## Surface syntax

Files are UTF-8. Comments begin with `#` outside JSON strings. Simple names match `[A-Za-z_][A-Za-z0-9_]*`; qualified package names join simple names with dots.

Declare ordered ports:

```text
@input source policy
@output report receipt
```

Define a JavaScript command with bare positional formals and an indented body:

```text
@analyze define source policy
    async function run({ source, policy }, ctx) {
      if (source === undefined) return ctx.reject("missing_source")
      return { source, policy }
    }
    async function check(inputs, output) {
      return output.source === inputs.source
    }
    return { run, check }
```

A call declares output wires first. Arguments are wire references or JSON strings:

```text
@analysis analyze $source "strict"
@proof @witness kb.domain.rule $analysis
```

Commands have one output and may omit trailing arguments, which bind to `undefined`. Circuit calls must match both input and output arity exactly.

Declare structural checks:

```text
@invariant proofValid covers proof witness
@goal answerGrounded covers answer
```

## Implemented core commands

`value`, `absent`, `alias`, `get`, `hash`, `equal`, `compare`, `parseNumber`, `assertInvariant`, `emptyList`, `append`, and `concat` are available without declarations.

## Runtime boundaries

The compiler validates package resolution, arity, single assignment, free wires, cycles, and declared coverage. The runtime executes only output and assurance dependency slices, supports nested circuits, freezes canonical values, and emits receipts. Mandatory matching, closure, persistent cache, effect capabilities, and trust-profile enforcement are later milestones and must not be claimed as implemented.
