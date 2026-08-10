# Manifestul pachetului

## Documente de design

| ID | Document |
|---|---|
| DS-001 | Viziune, scop și non-goals |
| DS-002 | Terminologie și model conceptual |
| DS-003 | Lexic, gramatică și sintaxă de suprafață |
| DS-004 | Fire, valori și semantica SSA |
| DS-005 | Declararea commands-urilor și ABI-ul JavaScript |
| DS-006 | Circuit files, interfețe și apeluri |
| DS-007 | Package-uri, namespace-uri și rezoluție |
| DS-008 | Compilator, IR și validare statică |
| DS-009 | Execuție, scheduling, refuz și attempts |
| DS-010 | Template circuits și knowledge base executabil |
| DS-011 | Index semantic, matching și wiring automat |
| DS-012 | Mandatory hooks și closure până la punct fix |
| DS-013 | Goals, invariants și acceptarea rezultatului |
| DS-014 | Modelul corectitudinii și granițele încrederii |
| DS-015 | Receipts, provenance și audit |
| DS-016 | Cache, execuție incrementală și epochs |
| DS-017 | Scalabilitate, registry și documente mari |
| DS-018 | Securitate, sandbox, effects și LLM oracles |
| DS-019 | Core commands și Assurance Core |
| DS-020 | Teste de conformitate și benchmark-uri |
| DS-021 | Roadmap de implementare și module |
| DS-022 | Arhitecturi alternative și justificarea designului |
| DS-023 | Agent API și protocolul workspace-ului |
| DS-024 | Flux end-to-end de referință |

## Skill-uri pentru coding agents

| Skill | Rol |
|---|---|
| SKILL-01 | Implementarea kernelului |
| SKILL-02 | Învățarea circuitelor din texte și reguli |
| SKILL-03 | Rezolvarea unei probleme prin problem circuits |
| SKILL-04 | Autorarea template-urilor și matcher-elor |
| SKILL-05 | Proiectarea și auditarea assurance profile-urilor |
| SKILL-06 | Diagnosticarea circuitelor și repararea attempts |

## Artefacte auxiliare

Folderul `examples/` conține exemple SOP Lang juridice, științifice și o structură pentru procesarea unei cărți. Folderul `templates/` conține șabloane. Folderul `schemas/` descrie IR-ul și receipts. Folderul `checklists/` conține criterii scurte pentru review.

## Stabilitatea deciziilor

Deciziile următoare sunt considerate stabile pentru v1 și nu trebuie schimbate accidental de un coding agent:

- apelurile commands-urilor și circuitelor sunt poziționale;
- literalii din apeluri sunt între ghilimele;
- parametrii formali ai commands-urilor sunt nume bare pe linia `define`;
- commands-urile nu capturează implicit fire;
- `@input` declară toate variabilele externe ale unui circuit;
- `@output` declară ordinea porturilor publice;
- firele sunt locale fișierului;
- namespace-urile provin din căi, nu din instanțe;
- mandatory matchers folosesc un subset determinist și exhaustiv;
- problema curentă nu poate modifica assurance profile-ul care o evaluează;
- acceptarea este condițională și produce un receipt verificabil.
