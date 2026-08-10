# DS-003 — Lexic, gramatică și sintaxă de suprafață

## 1. Obiectiv

Sintaxa v1 trebuie să rămână redusă. Puterea sistemului se află în commands, compoziția circuitelor și assurance mechanisms, nu într-o multitudine de construcții sintactice.

Un fișier SOP Lang conține directives, command definitions și call statements.

## 2. Convenții lexicale

Encoding-ul MUST fi UTF-8.

Newline-ul logic poate fi LF sau CRLF.

Comentariile încep cu `#` în afara unui string și continuă până la sfârșitul liniei.

Numele simple respectă forma:

```text
[A-Za-z_][A-Za-z0-9_]*
```

Numele calificate de package respectă forma:

```text
segment.segment.segment
```

Fiecare segment respectă regula numelui simplu.

Un wire definition este `@` urmat de un nume simplu. Un wire reference este `$` urmat de un nume simplu.

Un literal este un string JSON între ghilimele duble. În v1 nu există numere, booleene sau valori bare în poziția de argument. Conversia semantică este responsabilitatea command-ului.

Exemple valide:

```text
"30"
"true"
"RO"
"text cu spații"
"fact.noticeDays"
```

Exemple invalide în poziția de argument:

```text
30
true
RO
fact.noticeDays
```

Aceste tokenuri pot apărea ca nume de directive sau package-uri, dar nu ca valori ale unui apel.

## 3. Directives

### Circuit interface

```text
@input actual minimum
@output proof witness
```

Fiecare directivă poate apărea cel mult o dată într-un file. Lista poate fi goală numai pentru `@input`.

### Invariants și goals

```text
@invariant proofValid covers proof witness
@goal answerGrounded covers answer
```

`covers` este un keyword. Numele din stânga este wire-ul care produce Assurance Result. Numele de după `covers` sunt wires locale care trebuie să apară în dependency slice-ul său.

Mai multe directives `@invariant` și `@goal` sunt permise.

### Template metadata

```text
@template mandatory
@trigger "fact.noticeDays" "fact.minimumNotice"
@apply kb.legal.notice.invalidity
```

`@template` acceptă `mandatory` sau `optional`.

`@trigger` acceptă unul sau mai multe string literals.

`@apply` acceptă exact un package name calificat.

Aceste directives sunt valide numai în matcher circuits.

## 4. Command definition

Forma este:

```text
@commandName define formal1 formal2 formal3
    JavaScript body
```

Parametrii formali sunt nume simple, fără `$` și fără ghilimele.

Blocul JavaScript începe pe următoarea linie indentată și se termină înaintea următoarei linii neindentate, goale sau comentate conform regulilor parserului. Indentarea comună este eliminată înainte de compilarea JavaScript.

Exemplu:

```text
@lessThan define left right
    async function run({ left, right }, ctx) {
      if (left === undefined || right === undefined) {
        return ctx.reject("missing_operand")
      }
      return Number(left) < Number(right)
    }

    async function check({ left, right }, output) {
      return output === (Number(left) < Number(right))
    }

    return { run, check }
```

Command definitions sunt top-level. Ele nu pot fi imbricate în call statements.

## 5. Call statement

Forma generală este:

```text
@out1 @out2 package.or.command $wire1 "literal" $wire2
```

Primul grup conține unul sau mai multe output wires.

Urmează un command name local, un command name calificat sau un circuit package name.

Urmează zero sau mai multe arguments. Fiecare argument este exclusiv `$wire` sau `"literal"`.

Pentru un command call, numărul outputs-urilor MUST fi unu.

Pentru un circuit call, numărul outputs-urilor MUST coincide cu `@output` al circuitului apelat.

Call statement-ul poate continua pe linii indentate:

```text
@proof @witness kb.legal.notice.invalidity
    $actual
    $minimum
```

Toate tokenurile de pe liniile de continuare fac parte din același apel.

## 6. Binding-ul argumentelor

Command calls sunt poziționale. Lista formală este definită de linia `define`.

Dacă sunt furnizate mai puține arguments decât formals, parametrii rămași primesc `undefined`.

Dacă sunt furnizate mai multe arguments decât formals, compilarea MUST eșua.

Circuit calls au aritate strictă. Numărul inputs-urilor furnizate MUST coincide cu `@input`. Absența deliberată trebuie reprezentată printr-un wire produs de core command-ul `absent`.

## 7. Gramatică EBNF orientativă

```text
file              = { blank | comment | directive | definition | statement } ;

directive         = input-directive
                  | output-directive
                  | invariant-directive
                  | goal-directive
                  | template-directive
                  | trigger-directive
                  | apply-directive ;

input-directive   = "@input", { identifier } ;
output-directive  = "@output", identifier, { identifier } ;

invariant-directive =
                    "@invariant", identifier, [ "covers", identifier, { identifier } ] ;

goal-directive    =
                    "@goal", identifier, [ "covers", identifier, { identifier } ] ;

definition        =
                    "@", identifier, "define", { identifier }, newline, js-block ;

statement         =
                    output-wire, { output-wire }, callable, { argument } ;

output-wire       = "@", identifier ;
argument          = wire-reference | string-literal ;
wire-reference    = "$", identifier ;
callable          = identifier | qualified-name ;
```

EBNF-ul nu descrie în detaliu indentation și JavaScript lexical islands; parserul trebuie să trateze blocul `define` ca text brut indentat.

## 8. Erori obligatorii

Parserul sau compilatorul MUST respinge:

- stringuri neînchise;
- output wires duplicate în același apel;
- redefinirea unui wire;
- referințe `$wire` invalide;
- argumente bare;
- command definitions cu formals duplicate;
- directives duplicate incompatibile;
- `@apply` către package inexistent;
- continuation lines fără statement părinte;
- bloc JavaScript gol;
- un call statement fără output wire.

## 9. Compatibilitate viitoare

V1 rezervă, dar nu implementează:

- rest parameters;
- keyword arguments;
- closures explicite;
- imports SOP Lang;
- branching syntax;
- loops sintactice;
- pattern matching în limbajul general.

Aceste extensii nu trebuie simulate prin euristici în parser.
