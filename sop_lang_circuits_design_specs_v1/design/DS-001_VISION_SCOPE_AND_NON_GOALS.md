# DS-001 — Viziune, scop și non-goals

## 1. Problema urmărită

Textele juridice, științifice, tehnice și literare conțin reguli și relații care nu sunt direct executabile. Un LLM poate interpreta aceste texte și poate propune răspunsuri, dar un răspuns textual nu păstrează obligatoriu dependențele, regulile omise, ipotezele, rezultatele intermediare și verificările efectuate.

SOP Lang Circuits urmărește construirea unui nivel intermediar între limbajul natural și sistemele formale specializate. Textul este tradus într-un graf executabil. Graful poate integra reguli reutilizabile, algoritmi arbitrari, baze de date, solvers și LLM oracles. Rezultatul este acceptat numai când graful executat satisface contractul taskului și obligațiile impuse de un assurance profile extern tentativei.

Obiectivul central nu este imitarea internă a unui LLM. Obiectivul este producerea unei infrastructuri simbolice în care un LLM poate construi și repara programe semantice, iar runtime-ul poate verifica explicit ce s-a calculat și ce obligații au fost acoperite.

## 2. Teza de design

Unitatea principală nu este promptul și nici propoziția logică izolată, ci circuitul semantic executabil.

Un circuit:

- primește valori prin porturi explicite;
- produce valori prin fire imuabile;
- își expune outputs-urile în ordine declarată;
- poate apela alte circuite prin interfețele lor;
- poate declara goals și invariants;
- poate publica valori într-un index semantic;
- poate fi instanțiat automat de mandatory hooks;
- produce receipts suficiente pentru audit și reexecutare.

LLM-ul poate decide cum să interpreteze, ce template-uri opționale să încerce și cum să repare o tentativă. Runtime-ul decide dacă încercarea este structural validă, dacă mandatory closure este complet, dacă invarianții trec și dacă outputs-urile finale sunt acoperite de goals aprobate.

## 3. Domeniul v1

V1 trebuie să poată procesa taskuri finite și modularizabile, inclusiv:

- verificarea consistenței interne a unui document;
- interogarea unei interpretări executabile;
- aplicarea regulilor dintr-un KB extern;
- căutarea unor contraexemple;
- generarea unui text fundamentat în results și evidence;
- agregarea incrementală a analizelor pe capitole sau secțiuni;
- execuția repetată a attempts generate de coding agents;
- folosirea unui LLM ca interpret, planner, generator de code sau selector euristic.

V1 trebuie să fie suficient de general încât commands-urile să poată integra motoare Datalog, SMT, symbolic execution, abstract interpretation sau alte instrumente. Kernelul nu trebuie să implementeze nativ toate aceste metode.

## 4. Proprietăți obligatorii

Implementarea MUST asigura dependențe explicite. Nicio valoare runtime provenită din alt circuit nu poate fi citită prin captură implicită.

Implementarea MUST separa planificarea de acceptare. Un LLM nu poate modifica în aceeași tentativă profilele și verifier-ele care decid acceptarea sa.

Implementarea MUST diferenția succesul, refuzul, eroarea și starea inconcludentă. Lipsa unei demonstrații nu înseamnă falsitate.

Implementarea MUST păstra provenance și versions pentru toate outputs-urile acceptate.

Implementarea MUST permite cache incremental fără a schimba sensul rezultatelor.

Implementarea MUST avea o cale de audit pentru întrebarea: „ce reguli obligatorii erau aplicabile, care au fost executate și ce outputs au produs?”

## 5. Non-goals

SOP Lang Circuits v1 nu garantează traducerea perfectă a limbajului natural. Interpretarea este un artefact explicit și poate fi greșită.

V1 nu definește o logică universală pentru toate domeniile. Semantica domeniului se află în template circuits, commands și verifier-e.

V1 nu încearcă să demonstreze automat corectitudinea arbitrarului cod JavaScript. Codul poate fi verificat prin testare, implementări independente, certificate sau backends formale.

V1 nu permite ca un rezultat să devină „corect” doar pentru că un command numit `validate` întoarce `true`.

V1 nu presupune că un knowledge base este complet. Mandatory closure garantează acoperirea regulilor declarate și potrivite, nu existența tuturor regulilor relevante.

V1 nu expune firele interne ale unui package prin namespace. Nu există `$package.wire` și nu există `$instance.output`.

V1 nu definește încă un limbaj de control complex cu bucle, excepții sau fallback-uri sintactice. Repetiția logică apare prin closure, commands sau attempts succesive.

## 6. Criterii de succes

Un prototip este credibil dacă poate demonstra, prin teste reproductibile, că:

- un plan LLM care omite o regulă obligatorie este completat sau respins;
- un command local bine verificat, dar bazat pe o regulă semantică falsă, poate fi contrazis de un mandatory verifier independent;
- modificarea unei surse invalidează numai subgraful dependent;
- același template poate fi instanțiat de multe ori fără coliziuni de fire;
- output-ul final poate fi urmărit până la surse, rules, commands, checkers și profile;
- un coding agent poate primi un receipt de refuz și poate construi o tentativă nouă fără regenerarea întregului proiect.
