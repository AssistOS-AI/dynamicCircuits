# DS-004 — Fire, valori și semantica SSA

## 1. Definiția unui wire

Un wire este o asociere imuabilă între un nume local și rezultatul unei singure producții.

Într-un circuit file, un nume de wire poate fi produs de:

- un port `@input`;
- un command call;
- un circuit call;
- un core operation;
- un alias de output rezultat din instanțierea unui circuit copil.

Un wire nu poate fi reasignat. Dacă o transformare produce o valoare nouă, ea trebuie să producă un nume nou.

```text
@raw parse $source
@normalized normalize $raw
```

Nu este permis:

```text
@raw parse $source
@raw normalize $raw
```

## 2. Domeniul de vizibilitate

Wire-urile sunt locale fișierului.

Un circuit copil nu poate citi un wire al părintelui decât dacă valoarea este transmisă printr-un port `@input`.

Un părinte nu poate citi wire-uri interne ale copilului. El primește doar outputs-urile declarate.

Nu există `$package.wire`, `$instance.wire`, globals de wire sau capturi lexicale.

Această regulă face completă analiza dependențelor și permite cache corect, instanțiere repetată și audit.

## 3. Inputs ca variabile libere controlate

`@input` este singura declarație de variabile externe:

```text
@input document ontology policy
```

În corp, `$document`, `$ontology` și `$policy` sunt definiții de intrare.

Orice alt `$name` care nu are producător local este eroare statică.

Inputs-urile sunt imuabile în instanță. O altă valoare pentru un input produce o instanță sau un epoch diferit.

## 4. Value model

Kernelul v1 MUST suporta două clase de payload:

### Canonical values

Valori serializabile canonic:

- string;
- boolean;
- number finit sau reprezentare explicită pentru valori speciale;
- null;
- arrays;
- plain objects cu chei string;
- content-addressed artifact references;
- wire handles folosite intern de matcher-e.

### Registered handles

Un handle reprezintă un obiect extern sau mare care nu este copiat direct: fișier, dataset, model, DB snapshot, circuit package, solver session materialized.

Handle-ul MUST avea:

- kind;
- stable identity;
- version sau content hash;
- capability policy;
- encoder pentru receipt.

Funcții JavaScript, sockets, streams deschise și obiecte cu identitate instabilă nu pot fi outputs cacheable fără adaptor.

## 5. Imutabilitatea valorii

Runtime-ul SHOULD deep-freeze canonical values înainte de a le expune consumatorilor. Dacă performanța nu permite, trebuie să ofere copy-on-write sau izolarea proceselor.

Un command care mută o valoare primită încalcă modelul. Sandbox-ul și testele trebuie să detecteze această situație când este posibil.

## 6. Identitatea wire-ului

Numele local nu este identitatea globală.

Identitatea internă a unui wire SHOULD include:

- package hash;
- circuit instance ID;
- local wire name;
- producer node ID;
- epoch ID.

Aliasurile de output ale unui circuit copil păstrează o legătură canonică spre output-ul copilului. Pentru deduplicarea mandatory instances, runtime-ul trebuie să poată calcula identitatea semantică a sursei, nu doar numele local al aliasului.

## 7. Graful SSA

Fiecare call statement produce un node. Wires sunt edges orientate producer-consumer.

Circuitul este valid dacă subgraful necesar outputs-urilor, invariants și goals este aciclic.

Recursia semantică nu se exprimă prin cicluri brute de wire. Ea apare prin:

- command intern care calculează un fixpoint;
- mandatory closure care instanțiază succesiv circuite noi;
- epoch-uri sau attempts succesive.

Acest model păstrează fiecare graf executat aciclic și auditabil.

## 8. Dependency slice

Dependency slice-ul unui wire este mulțimea minimă de nodes și input wires necesare producerii sale.

Runtime-ul MUST putea calcula slice-ul pentru:

- fiecare output final;
- fiecare invariant;
- fiecare goal;
- fiecare publication relevantă;
- fiecare receipt de eroare.

Coverage-ul unui invariant este verificat prin reachability: un invariant care declară că acoperă `proof` trebuie să aibă `proof` în slice.

## 9. Dead nodes

Nodes care nu contribuie la output, invariant, goal sau publication obligatorie nu trebuie executate implicit.

Un planner poate genera nodes inutile. Ele pot rămâne în source, dar compilerul le marchează dead. Un receipt SHOULD raporta dead nodes pentru optimizare și review.

## 10. Undefined

`undefined` este folosit pentru parametrii lipsă ai commands-urilor.

Un circuit input nu lipsește implicit. Dacă un circuit trebuie să primească absență, apelantul produce un wire prin:

```text
@missing absent
```

și îl transmite explicit.

Un command care returnează accidental `undefined` este o sursă de erori. Implementarea SHOULD cere fie un `check` care acceptă explicit output-ul, fie folosirea `ctx.acceptUndefined()` pentru succes intenționat. În absența acestei confirmări, output-ul `undefined` SHOULD genera un warning sau refuz în profilele stricte.

## 11. Invariante structurale

Pentru fiecare circuit compilat trebuie să fie adevărate:

- fiecare wire are cel mult un producer;
- fiecare reference are un producer sau este `@input`;
- fiecare output numește un wire existent;
- fiecare invariant și goal numește un wire existent;
- fiecare circuit call respectă ordinea și numărul porturilor;
- toate slices obligatorii sunt aciclice;
- nicio valoare runtime nu este citită printr-o dependență ascunsă.
