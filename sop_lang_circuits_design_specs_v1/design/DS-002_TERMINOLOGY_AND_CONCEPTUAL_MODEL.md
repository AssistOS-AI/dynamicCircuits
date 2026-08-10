# DS-002 — Terminologie și model conceptual

## 1. Entitățile principale

### Source

Un source este un artefact extern: text, document, dataset, bază de date, rezultat de experiment sau alt circuit acceptat. Source-ul are identitate, versiune și, când este posibil, hash de conținut.

### Interpretation circuit

Un interpretation circuit transformă sources în valori semantice utilizabile. Poate fi construit de un parser, LLM, coding agent sau combinație de metode. El nu este adevărul textului; este formalizarea concretă asupra căreia rulează restul sistemului.

### Wire

Un wire este o legătură locală, imuabilă, între producătorul unei valori și consumatorii săi. Sintactic, definiția folosește `@name`, iar citirea folosește `$name`.

### Value

Value este payload-ul transportat de un wire. Kernelul v1 acceptă valori canonice și handles înregistrate. Tipurile semantice nu sunt declarate obligatoriu pe fire; commands-urile și matcher-ele interpretează valorile.

### Command

Un command este o operație JavaScript declarată prin `@name define param1 ...`. Primește un obiect cu parametrii formali legați pozițional și un context controlat. Produce o valoare, refuză sau eșuează.

### Circuit file

Un circuit file este un fișier `.sop` cu interfață explicită și corp executabil. El este simultan unitate de compilare, package și componentă reutilizabilă.

### Circuit instance

O circuit instance este o execuție concretă a unui circuit file asupra unor fire de input. Identitatea ei este internă runtime-ului și nu devine namespace vizibil în SOP Lang.

### Template circuit

Un template circuit este un circuit reutilizabil stocat într-un executable knowledge base. El poate reprezenta o regulă, o transformare, o analiză sau un verifier.

### Matcher circuit

Un matcher circuit examinează indexul semantic și produce tuples de handles compatibile cu `@input` al unui template. Matching-ul obligatoriu folosește Assurance Core, nu JavaScript arbitrar.

### Mandatory hook

Un mandatory hook este un matcher fixat de assurance profile. Toate matches-urile sale trebuie instanțiate până la closure.

### Problem circuit

Problem circuit-ul este root package-ul taskului curent și package-urile auxiliare create pentru acel task. El declară outputs și goals.

### Attempt

Un attempt este o versiune imuabilă a problem circuit-ului. Un attempt respins nu este reparat în loc; un coding agent produce un attempt nou.

### Goal

Un goal este o obligație a taskului, exprimată printr-un wire și, opțional, prin outputs-urile pe care trebuie să le acopere.

### Invariant

Un invariant este o obligație locală sau globală care verifică proprietăți ale unor wires. Invariantul produce un Assurance Result și trebuie să depindă efectiv de wires declarate ca fiind acoperite.

### Assurance profile

Assurance profile-ul selectează mandatory hooks, trusted verifier packages, nivelurile minime de asigurare, bugetele și politicile de acceptare. Este fixat înaintea attempt-ului.

### Receipt

Receipt-ul este reprezentarea content-addressed a execuției: inputs, nodes, outputs, checks, matches, closure, goals, invariants și decizia finală.

### Epoch

Un epoch este o versiune coerentă a sources, packages, profile-ului și environment-ului. O modificare relevantă creează un epoch nou.

## 2. Relația dintre concepte

```text
Sources
   │
   ▼
Interpretation circuits
   │
   ▼
Problem circuit ─────► optional template circuits
   │
   ▼
Semantic publications
   │
   ▼
Mandatory matchers ──► mandatory template instances
   │                         │
   └───────────────◄─────────┘
             closure
                │
                ▼
Goals + invariants + output coverage
                │
                ▼
Acceptance receipt
```

Problem circuit-ul și template instances formează împreună graful executat. Distincția este de origine și politică, nu de mecanică: ambele sunt package-uri SOP Lang.

## 3. Distincții care nu trebuie confundate

Un command nu este un circuit. Command-ul are o singură valoare de output; circuitul poate avea mai multe outputs și invarianți.

Un package namespace nu este un wire namespace. Package-ul rezolvă numele componentelor; wire-urile rămân locale fișierului.

Un checker local nu este un assurance profile. Checker-ul confirmă o relație locală; profile-ul stabilește ce verificări sunt obligatorii global.

Un matcher nu este un planner. Matcher-ul decide aplicabilitatea exactă pentru o familie; plannerul caută euristic circuite opționale.

Un refusal nu este `false`. Refusal înseamnă că command-ul sau circuitul nu poate opera pe inputs-urile concrete. Un rezultat boolean fals poate fi o valoare validă.

`Unknown` nu este negație. Dacă nu s-a găsit o demonstrație sau s-a epuizat bugetul, runtime-ul raportează inconcludență.

## 4. Stările de încredere

Sistemul SHOULD distinge cel puțin următoarele niveluri:

| Nivel | Semnificație |
|---|---|
| Unchecked | Valoare produsă fără check sau invariant acceptat |
| Self-checked | `run` și `check` aparțin aceluiași command/package |
| Independently checked | Verifier-ul aparține altui package aprobat |
| Certificate-checked | Output-ul conține un certificat validat de un checker restrâns |
| Externally attested | Un serviciu sau o autoritate externă furnizează o atestare verificabilă |

Nivelul unui output nu trebuie stocat ca adnotare sintactică pe wire. El este calculat din receipt și dependency slice.

## 5. Modelul de adevăr

SOP Lang Circuits nu impune o singură logică. Un domain package poate folosi logică clasică, paraconsistentă, probabilistică, temporală sau o combinație.

Kernelul trebuie totuși să păstreze separat:

- suportul pozitiv;
- suportul negativ;
- conflictele;
- necunoscutul;
- refuzul execuției;
- eșecul tehnic.

Această separare previne confundarea contradicției cu eroarea și a lipsei de cunoaștere cu falsitatea.
