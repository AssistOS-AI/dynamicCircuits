# DS-013 — Goals, invariants și acceptarea rezultatului

## 1. De ce nu este suficientă execuția

Un circuit poate executa fără erori și totuși să rezolve greșit taskul. Poate calcula o proprietate irelevantă, poate omite o excepție sau poate genera un text care introduce afirmații nesusținute.

Acceptarea este o relație între:

- contractul taskului;
- outputs;
- goals;
- invariants;
- mandatory closure;
- trust policy;
- receipts.

## 2. Assurance Result

Un invariant sau goal produce o valoare standard:

```text
{
  ok: true | false,
  code: string,
  evidence: value,
  issues: array,
  confidenceClass: string
}
```

Runtime-ul MAY accepta boolean simplu pentru prototip, dar producția SHOULD utiliza record.

`confidenceClass` este descriptiv. Autoritatea blocking/nonblocking aparține profile-ului, nu valorii produse.

## 3. Invariant local

```text
@invariant proofValid covers proof witness
```

Semnificație:

- wire `proofValid` trebuie produs;
- valoarea trebuie să fie pass;
- slice-ul lui trebuie să includă `proof` și `witness`;
- producer/verifier trebuie să satisfacă trust policy.

Un invariant local se evaluează pentru fiecare circuit instance.

## 4. Invariant global

Un invariant global este de regulă implementat prin mandatory template:

- no unhandled contradiction;
- all units compatible;
- output claims grounded;
- all source spans valid;
- no unsupported universal claim;
- all legal exceptions considered.

El produce publications sau Assurance Results care intră în root task.

## 5. Goal

```text
@goal answerGrounded covers answer
```

Goal-ul exprimă o condiție de succes a taskului.

Un goal MUST fi evaluat pozitiv pentru ACCEPTED.

Goal-ul poate acoperi mai multe outputs:

```text
@goal reportComplete covers report evidence conflicts
```

## 6. Contractul root taskului

Root problem circuit SHOULD avea:

- `@input` pentru sources/handles;
- `@output` pentru deliverables;
- cel puțin un `@goal`;
- publications pentru mandatory checks;
- un task manifest cu profile și package lock.

Un output fără goal coverage nu poate fi final în profile stricte.

## 7. Coverage

Coverage are două niveluri.

### Syntactic dependency coverage

Compilerul verifică reachability.

### Semantic assurance coverage

Profile-ul verifică dacă producerul goal-ului/invariantului este acceptabil și dacă tipul de verification este suficient.

Un `constantTrue` care consumă output-ul formal poate totuși fi semantic inutil. De aceea trusted verifier hash sau certificate checker este necesar.

## 8. Acceptance gates

Acceptarea root taskului trece prin gates ordonate.

### Gate 1 — Compilation

Fără diagnostics blocking.

### Gate 2 — Execution

Toate outputs, goals și blocking invariants au values; niciun dependency node nu este REFUSED/ERROR.

### Gate 3 — Local assurance

Node checks și circuit invariants cerute trec.

### Gate 4 — Mandatory closure

Final audit confirmă expected instances = executed instances și nicio mandatory instance blocking nu a eșuat.

### Gate 5 — Goal satisfaction

Toate goals trec și acoperă outputs declarate.

### Gate 6 — Trust admissibility

Dependency slices respectă nivelul minim de trust.

### Gate 7 — Receipt completeness

Versions, hashes și external evidence sunt suficiente pentru profile.

Numai după Gate 7 outcome este ACCEPTED.

## 9. Rejection taxonomy

| Code | Cauză |
|---|---|
| STRUCTURAL_REJECTION | circuit invalid |
| EXECUTION_REFUSAL | node/circuit a refuzat |
| CHECK_REJECTION | check local a eșuat |
| INVARIANT_REJECTION | invariant fals |
| CLOSURE_REJECTION | mandatory instance lipsă/eșuată |
| GOAL_REJECTION | goal fals |
| TRUST_REJECTION | output depinde de surse neadmise |
| RECEIPT_REJECTION | audit data incompletă |

## 10. Inconclusive

Inconclusive apare la:

- budget exhausted;
- solver unknown;
- unavailable source;
- timeout;
- unresolved ambiguity cerută de profile;
- nonterminating closure prevenit de limită.

Inconclusive nu este rejection semantic, dar nici acceptance.

## 11. Output grounding

Pentru text generat:

1. renderer produce draft;
2. interpretation circuit extrage claims din draft;
3. grounding matcher leagă claims la supports;
4. unsupported claims devin issues;
5. conflicts trebuie recunoscute conform profile;
6. goal `answerGrounded` trece numai dacă issues blocking sunt zero.

Un LLM nu poate valida singur propria reformulare în profile stricte; extractor și verifier trebuie să fie separate sau auditate.

## 12. Contradicții

Profile-ul definește politica:

- diagnostic: conflict este output;
- strict decision: conflict blocking;
- narrative: conflict permis dacă atribuit perspectivei;
- scientific review: conflict trebuie raportat, nu ignorat.

Runtime-ul nu aplică explosion logic.

## 13. Correctness envelope

Final receipt trebuie să poată formula:

- relative to source versions;
- relative to interpretation packages;
- relative to KB/profile versions;
- all mandatory matches executed;
- goals and invariants passed;
- outputs covered at assurance level X.

Aceasta este formula credibilă, nu „rezultatul este absolut corect”.

## 14. Criterii de conformitate

Testele MUST include:

- output fără goal;
- false coverage;
- untrusted verifier;
- mandatory rule omis de planner;
- local check pass, global invariant fail;
- conflict policy variants;
- grounded vs hallucinated generated text;
- inconclusive budget;
- complete acceptance receipt.
