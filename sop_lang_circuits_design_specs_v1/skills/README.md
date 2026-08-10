# Skill-uri pentru coding agents

## Selectarea skill-ului

| Situație | Skill |
|---|---|
| implementez parser/runtime | SKILL-01 |
| transform surse în KB executabil | SKILL-02 |
| rezolv un task concret | SKILL-03 |
| creez rule/matcher/verifier | SKILL-04 |
| proiectez profile și audit | SKILL-05 |
| repar un failure | SKILL-06 |

Pentru taskuri complexe, agentul poate combina skill-uri, dar trebuie să păstreze rolurile separate. Autorul unui attempt nu trebuie să își acorde singur trust de verifier.

## Context minim

Orice invocare trebuie să includă:

- task;
- package root;
- profile/lock;
- specs relevante;
- allowed writes;
- expected deliverables;
- acceptance tests.

## Regula de oprire

Agentul se oprește cu outcome explicit:

- deliverable complete;
- rejected with receipt;
- inconclusive with missing requirements;
- error with reproducible diagnostic.

Nu declară succes doar pentru că scriptul rulează.
