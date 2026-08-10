# DS-006 — Circuit files, interfețe și apeluri

## 1. Circuit file ca unitate de compoziție

Un circuit file este un package executabil cu:

- inputs;
- outputs;
- commands locale;
- call statements;
- invariants;
- goals, dacă este root problem circuit;
- template directives, dacă este matcher.

Fișierul este unitatea minimă reutilizabilă pentru wiring automat.

## 2. Interfața

```text
@input actual minimum
@output proof witness
```

Ordinea numelor este normativă.

`@input` definește ordinea argumentelor la apel.

`@output` definește ordinea firelor rezultate la apel.

Porturile nu au namespace vizibil la apelant. Apelantul alege nume locale.

## 3. Apelul unui circuit

```text
@negativeProof @noticeWitness kb.legal.notice.invalidity
    $actual
    $minimum
```

Runtime-ul rezolvă package-ul, verifică:

- două inputs declarate și două arguments;
- două outputs declarate și două output wires;
- lipsa coliziunilor de wire;
- policy pentru package.

Apoi creează o instanță internă și leagă:

```text
child.actual  <- parent.actual
child.minimum <- parent.minimum

parent.negativeProof <- child.proof
parent.noticeWitness <- child.witness
```

Numele `child.*` sunt descriere conceptuală internă; nu sunt sintaxă SOP Lang.

## 4. Outputs multiple

Un command produce o singură valoare.

Dacă o operație internă produce un record cu mai multe rezultate, circuitul îl poate descompune:

```text
@bundle analyze $input
@proof get $bundle "proof"
@witness get $bundle "witness"

@output proof witness
```

Această regulă simplifică ABI-ul commands-urilor și păstrează outputs multiple la nivel de circuit.

## 5. Arity

Command call:

- poate furniza mai puține arguments;
- nu poate furniza mai multe decât formals;
- are exact un output wire.

Circuit call:

- MUST furniza exact numărul de inputs;
- MUST declara exact numărul de output wires;
- poate transmite un wire a cărui valoare este `undefined`.

Pentru absență explicită:

```text
@missing absent
@result package.with.optional.port $value $missing
```

## 6. Passthrough outputs

Un input poate fi publicat direct:

```text
@input value
@output value
```

Inputul este deja un producer valid.

Dacă este necesară o identitate distinctă în provenance, se folosește:

```text
@copy alias $value
@output copy
```

## 7. Invariants

```text
@invariant proofValid covers proof witness
```

`proofValid` trebuie să fie wire local.

Compilerul verifică reachability de la `proofValid` către `proof` și `witness`.

Runtime-ul verifică valoarea Assurance Result și trust policy a producerului.

## 8. Goals

Root problem circuit-ul poate declara:

```text
@goal answerGrounded covers answer
@goal noBlockingConflicts covers answer conflictReport
```

Un circuit reutilizabil SHOULD utiliza invariants, nu goals. Goals descriu contractul taskului.

## 9. Refuzul unei instanțe

Dacă un node necesar refuză, instanța circuitului refuză.

Outputs-urile nu sunt produse parțial ca succes.

Receipt-ul poate păstra outputs intermediare pentru diagnostic, dar apelantul nu le poate consuma ca outputs acceptate.

Pentru analize parțiale se definește explicit un output care reprezintă starea parțială, nu se bazează pe failure leakage.

## 10. Nested circuits și flattening

Compilerul MAY păstra IR ierarhic.

Executorul MAY flatten graful pentru scheduling.

Receipts MUST păstra ambele perspective:

- package/circuit instance;
- nodes concrete și wires.

Aceasta permite audit modular și optimizare globală.

## 11. Cicluri

Apelurile statice dintre package-uri nu pot forma cicluri în slice-ul executat.

Dependency graph-ul package-urilor poate conține referințe reciproce numai dacă nu sunt instanțiate într-un ciclu concret sau dacă un backend explicit de fixpoint le gestionează.

V1 SHOULD respinge recursia directă între circuit files.

## 12. Compatibilitate de versiune

Ordinea `@input` și `@output` este parte din API.

Adăugarea unui input la final este breaking în v1 deoarece circuit calls au aritate strictă.

Redenumirea unui port fără schimbarea ordinii nu schimbă wiring-ul pozițional, dar schimbă documentația și matcher compatibility. SHOULD fi tratată ca breaking pentru claritate.

Package-urile publice SHOULD folosi semantic versioning.

## 13. Criterii de conformitate

Testele MUST acoperi:

- zero, unu și mai multe inputs;
- unu și mai multe outputs;
- passthrough;
- alias;
- circuit nested;
- arity mismatch;
- output collision;
- free wire;
- invariant coverage;
- refusal propagation;
- package version mismatch.
