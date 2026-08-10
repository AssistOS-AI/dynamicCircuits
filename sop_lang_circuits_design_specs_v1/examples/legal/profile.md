# Profil conceptual pentru exemplul juridic

Mandatory matchers:

- `examples.legal.invalidity_matcher`
- `examples.assurance.contradiction_matcher`
- `examples.assurance.grounding_matcher`

Trusted verifier packages:

- `examples.legal.invalidity_verifier`
- `examples.assurance.contradiction_verifier`
- `examples.assurance.grounding_verifier`

Politică:

- orice invariant fals dintr-o mandatory instance este blocking;
- closure incomplet este blocking;
- output-ul root trebuie să aibă goal local pozitiv;
- rezultatul este ACCEPTED numai dacă grounding assurance trece.
