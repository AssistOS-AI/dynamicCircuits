# DS-008 — Compilator, IR și validare statică

## 1. Pipeline-ul de compilare

Compilatorul SHOULD avea faze explicite:

1. descoperirea package-urilor;
2. parsarea directives și call statements;
3. extragerea blocurilor JavaScript;
4. construirea symbol tables;
5. rezoluția commands-urilor și circuitelor;
6. binding-ul argumentelor;
7. verificarea firelor și porturilor;
8. construirea IR-ului;
9. dependency analysis;
10. slicing pentru outputs, invariants, goals și publications;
11. acyclicity și topological planning;
12. emiterea diagnostics și compiled package hash.

Fiecare fază trebuie să poată produce diagnostics cu file, line și code.

## 2. IR-ul minimal

IR-ul unui package trebuie să conțină:

```text
PackageIR
  packageName
  packageHash
  inputs
  outputs
  commands
  nodes
  invariants
  goals
  templateMetadata
  sourceMap
```

Un command descriptor compilat conține:

```text
CommandIR
  localName
  qualifiedName
  formals
  codeHash
  capabilities
  cachePolicy
  sourceSpan
```

Un node conține:

```text
NodeIR
  nodeId
  outputWires
  calleeKind
  calleeIdentity
  arguments
  dependencies
  sourceSpan
```

Un argument este:

```text
WireRef(localWire)
Literal(string)
```

## 3. Circuit instance IR

Un circuit call poate rămâne ierarhic:

```text
CircuitCallIR
  targetPackage
  inputBindings
  outputBindings
```

La execuție, runtime-ul poate materializa child nodes.

Compilerul poate oferi și un flattened view cu instance-prefixed IDs.

## 4. Symbol tables

Pentru fiecare package:

- input symbols;
- wire producer map;
- command map;
- output list;
- invariant/goal declarations.

Un nume nu poate fi simultan input și produs de statement.

Un output poate numi input sau producer.

## 5. Binding commands

Pentru command call:

- arguments se leagă în ordine;
- lipsa produce literal intern `undefined`;
- surplusul este diagnostic;
- fiecare wire ref devine dependency.

String literal-ul rămâne string. Command-ul decide parsing-ul.

## 6. Binding circuits

Pentru circuit call:

- numărul arguments = numărul target inputs;
- numărul output wires = numărul target outputs;
- binding-ul este pozițional;
- target package hash este fixat înainte de execuție.

## 7. Free wire analysis

Pentru fiecare `$wire`:

- dacă apare în `@input`, este valid;
- dacă are producer statement, este valid;
- altfel, diagnostic `FREE_WIRE`.

Analiza nu inspectează JavaScript pentru wire refs, deoarece JS nu are acces la wire store.

## 8. SSA validation

Compilerul construiește producer map.

Dacă un wire are mai mult de un producer, diagnostic `WIRE_REDEFINITION`.

Inputs sunt producers virtuali.

Output aliases ale child circuits sunt producers în parent.

## 9. Coverage declarations

Pentru:

```text
@invariant inv covers proof witness
```

compilerul verifică existența wires.

După graph construction, verifică reachability.

Dacă `proof` nu este ancestor al `inv`, diagnostic `FALSE_COVERAGE_DECLARATION`.

Această verificare nu demonstrează că verifier-ul este semantic bun; demonstrează că output-ul intră efectiv în calcul.

## 10. Cycle detection

Compilerul calculează SCC pentru slice-ul relevant.

Un SCC cu mai mult de un node sau self-loop este diagnostic `CYCLE_NOT_SUPPORTED`.

Nodes dead pot avea erori structurale? Recomandarea este ca toate call statements să fie rezolvabile și wires valide, chiar dacă dead. Cycle detection poate fi limitată la relevant slice, dar linterul SHOULD raporta cycles dead.

## 11. Static policy checks

Compilerul integrează profile checks:

- package hash permis;
- capability permisă;
- mandatory matcher în Assurance Core;
- command extern permis;
- untrusted verifier interzis pentru blocking invariant;
- write effect interzis în speculative attempt.

## 12. Diagnostics taxonomy

Minimum:

| Code | Sens |
|---|---|
| PARSE_ERROR | sintaxă invalidă |
| DUPLICATE_DIRECTIVE | directivă unică repetată |
| FREE_WIRE | referință fără producer/input |
| WIRE_REDEFINITION | două producții |
| UNKNOWN_CALLEE | command/circuit inexistent |
| TOO_MANY_ARGUMENTS | surplus command args |
| CIRCUIT_ARITY_MISMATCH | mismatch circuit inputs |
| OUTPUT_ARITY_MISMATCH | mismatch outputs |
| INVALID_COVERAGE | covers fără reachability |
| PACKAGE_COLLISION | namespace duplicat |
| POLICY_DENIED | package/capability interzis |
| CYCLE_NOT_SUPPORTED | graf ciclic |

## 13. Source maps

IR nodes MUST păstra source spans.

Diagnostics și receipts trebuie să poată indica:

- package;
- file path;
- line range;
- statement text;
- generated-by metadata dacă source-ul a fost produs de agent.

## 14. Incremental compilation

Compilerul SHOULD cache-uiască parse și IR pe package hash.

O modificare într-un package invalidează:

- package-ul;
- callers care depind de interface sau code;
- profile lock dacă hash-ul era fixat.

Dacă implementation code se schimbă fără interface, callers pot păstra parse, dar execution cache se invalidează.

## 15. Acceptance criteria

Un compiler v1 este acceptabil dacă:

- compilează examples din pachet;
- produce aceleași node IDs pentru source identic;
- respinge toate negative fixtures;
- emite dependency graph inspectabil;
- calculează slices și coverage;
- separă diagnostics structurale de policy diagnostics;
- poate compila incremental cel puțin la nivel de package.
