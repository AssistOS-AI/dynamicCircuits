# Decision Log v1

## D-001 — Apeluri poziționale

Commands și circuits sunt apelate pozițional. Named parameters nu fac parte din v1.

## D-002 — Literali ghilimați

În call arguments, o valoare este fie `$wire`, fie `"literal"`.

## D-003 — Command formals expliciți

```text
@name define p1 p2
```

Formals nu au `$`.

## D-004 — Parametri command lipsă

Sunt completați cu `undefined`. Surplusul este compile error.

## D-005 — Circuit arity strictă

Circuit calls furnizează exact toate inputs și leagă exact toate outputs.

## D-006 — No implicit capture

Commands și circuits primesc runtime values numai explicit.

## D-007 — Wires locale

Nu există cross-file wire reference și nu există instance output namespace.

## D-008 — Package namespace din cale

Package-ul, nu wire-ul, are namespace.

## D-009 — Multi-output circuit calls

```text
@out1 @out2 package.name $in1 $in2
```

## D-010 — Matching separat de rule execution

Matcher-ul produce tuples de handles; target rule execută.

## D-011 — Mandatory matchers restricționate

Assurance Core determinist, fără LLM/network/random.

## D-012 — Acceptance externă

Problem circuit-ul execută evidence, dar profile/runtime decid acceptarea.

## D-013 — Receipts content-addressed

Accepted output fără receipt complet nu este valid în profile strict.

## D-014 — Attempts și epochs imuabile

Repair creează versiune nouă.
