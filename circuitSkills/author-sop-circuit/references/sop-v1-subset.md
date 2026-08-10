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

The compiler validates package resolution, arity, single assignment, free wires, cycles, and declared coverage. The runtime
executes only output and assurance dependency slices, supports nested circuits, normalizes cross-realm arrays and plain
objects, freezes canonical values, and emits receipts. Runtime values must be strings, booleans, finite numbers, null,
arrays, plain string-keyed objects, or the deliberately accepted undefined sentinel; functions, cycles, exotic prototypes,
and non-finite numbers fail canonicalization.

Semantic publication and mandatory matcher commands are also available:

```text
@published publish $case "case.notice" "task.md#case-A"
@items select $index "case.notice"
@matches bind $items
@pairs join $events $policies "/subject" "/subject"
@unique distinct $pairs
```

`publish` registers an explicit canonical value under a dotted semantic key. `select` exhaustively reads one key from the
finite index. `bind` creates one-input handle tuples. `join` creates two-input tuples whose JSON-pointer values are equal.
`distinct` removes only exact duplicate tuples. `concat` and `emptyList` may combine finite matcher results.

`@template mandatory`, `@trigger "..."`, and `@apply qualified.package` form one mandatory matcher contract. An executable
mandatory matcher has exactly `@input index delta` and `@output matches`, defines no JavaScript, uses only the restricted
commands above, and selects exactly its declared trigger keys. During CLI execution every reviewed `kb.*` mandatory matcher
whose trigger key exists is evaluated; all returned handle tuples instantiate the target circuit until no new publication
or instance appears. The receipt compares expected and executed instance keys. Target refusal or failure blocks closure;
budget exhaustion or matcher uncertainty returns `INCONCLUSIVE`.

This local milestone provides exact-key discovery, one-key binding, two-key equality joins, deterministic deduplication,
bounded closure, and a completeness audit relative to the loaded registry. Optional ranking, richer predicates, version
solving, trust profiles, effect capabilities, persistent closure state, and final acceptance certificates remain planned.
