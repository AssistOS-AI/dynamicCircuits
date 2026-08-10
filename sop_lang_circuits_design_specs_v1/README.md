# SOP Lang Circuits — Design Specifications Package

**Versiune:** 1.0.0-draft  
**Statut:** bază normativă pentru prototipare și implementare  
**Scop:** specificarea unui kernel pentru Dynamic Semantic Circuits implementate ca package-uri SOP Lang

Acest pachet transformă concluziile de design într-o suită de specificații suficient de precise pentru a fi folosite de coding agents, implementatori de runtime, autori de template circuits și evaluatori ai mecanismelor de validare.

SOP Lang Circuits este un model în care textele, datele, regulile și procedurile de verificare sunt compilate în grafuri SSA executabile. LLM-urile și coding agents pot interpreta surse, pot selecta componente și pot genera tentative de soluție, dar acceptarea rezultatului depinde de execuția circuitului, de invarianți, de mandatory hooks și de un assurance profile fixat independent de tentativa curentă.

## Deciziile sintactice fixate

Apelurile sunt exclusiv poziționale:

```text
@proof deriveInvalid $actual $minimum
```

Literalii apar întotdeauna între ghilimele:

```text
@threshold parseNumber "30"
```

Parametrii formali ai unui command se declară pe linia `define`, fără `$` și fără ghilimele:

```text
@deriveInvalid define actual minimum
    ...
```

Dacă lipsesc argumente la apelul unui command, parametrii rămași primesc `undefined`. Command-ul poate accepta situația sau poate refuza controlat execuția. Argumentele suplimentare sunt eroare de compilare.

Interfața unui circuit file este declarată explicit:

```text
@input actual minimum
@output proof witness
```

Un circuit cu mai multe outputs este apelat prin declararea mai multor fire locale înaintea numelui package-ului:

```text
@negativeProof @noticeWitness kb.legal.notice.invalidity $actual $minimum
```

Nu există referințe de forma `$instance.output` și nu există acces direct la fire din alte fișiere. Namespace-ul vizibil este exclusiv namespace-ul package-ului, derivat din calea fișierului. Valorile externe intră numai prin `@input`, iar dependențele dintre circuite apar numai prin apeluri explicite.

## Cum se citește pachetul

Pentru implementarea kernelului, ordinea recomandată este:

1. `DS-001`–`DS-008`: modelul, limbajul, interfețele și compilarea;
2. `DS-009`–`DS-013`: execuția, template-urile, matching-ul, closure-ul și acceptarea;
3. `DS-014`–`DS-018`: corectitudine, provenance, cache, scalabilitate și securitate;
4. `DS-019`–`DS-024`: standard library, testare, roadmap, alternative, Agent API și fluxul end-to-end;
5. folderul `skills/`: proceduri operaționale pentru coding agents;
6. folderul `examples/`: exemple coerente de circuite și workspace-uri;
7. folderul `templates/`: fișiere de pornire pentru implementatori și autori.

## Convenții normative

Termenii **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT** și **MAY** sunt normativi. Într-o traducere ulterioară, ei trebuie păstrați ca termeni RFC sau echivalenți fără ambiguitate.

Un document este normativ pentru aspectul indicat în titlu. Când două documente par să intre în conflict, documentul mai specific prevalează. `DS-001` conține non-goals; `DS-022` conține alternative, nu cerințe normative.

## Rezultatul urmărit

Un implementator care respectă aceste specificații trebuie să poată construi:

- parserul și compilatorul SOP Lang;
- un runtime topologic pentru fire imuabile;
- un sistem de package-uri și circuit interfaces;
- un registry scalabil de template circuits;
- un motor de matching controlat prin SOP Lang;
- mandatory hook closure până la punct fix;
- un mecanism de goals, invariants și acceptance receipts;
- cache incremental și attempts imuabile;
- un API pentru coding agents care învață circuite și rezolvă probleme;
- suite de conformitate care separă clar mecanica runtime-ului de validitatea cunoașterii de domeniu.

Acest pachet nu afirmă că orice text poate fi formalizat perfect. El specifică o mașină care poate face explicită, executabilă și auditabilă o interpretare, poate aplica sistematic regulile cunoscute și poate produce o garanție condițională, precis delimitată.
