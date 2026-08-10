# Exemplu juridic

Textul spune:

1. T1 necesită minimum 30 de zile de notificare.
2. T1 a primit 10 zile.
3. T1 este validă.

Exemplul conține:

- `source.sop`: interpretare simplificată și publications;
- `invalidity_rule.sop`: rule circuit;
- `invalidity_applicable.sop`: predicate;
- `invalidity_matcher.sop`: mandatory matcher;
- `invalidity_verifier.sop`: verifier independent;
- `attempt_001.sop`: răspuns care repetă afirmația și trebuie respins de profile;
- `attempt_002.sop`: răspuns care folosește proof și conflict.

Exemplul este sintactic și arhitectural. Un runtime complet trebuie să mai încarce hooks de contradiction și grounding din KB-ul de assurance.
