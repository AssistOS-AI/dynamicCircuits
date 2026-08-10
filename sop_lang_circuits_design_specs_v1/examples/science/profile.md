# Profil conceptual pentru exemplul științific

Mandatory matchers:

- `examples.science.counterexample_matcher`
- `examples.assurance.contradiction_matcher`
- `examples.assurance.grounding_matcher`

Trusted verifier packages:

- `examples.science.counterexample_verifier`
- `examples.assurance.contradiction_verifier`
- `examples.assurance.grounding_verifier`

Politică:

- claims universale cu dataset compatibil declanșează counterexample search;
- conflicts trebuie recunoscute în output;
- closure incomplet sau budget exhaustion produce INCONCLUSIVE;
- self-check-ul `badRule` nu este suficient pentru acceptare.
