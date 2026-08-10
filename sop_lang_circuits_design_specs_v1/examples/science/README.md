# Exemplu științific

Datasetul este `[3, 5, -2, 8]`, iar textul afirmă că toate valorile sunt pozitive.

Mandatory counterexample matcher trebuie să aplice rule circuit-ul și să găsească `-2`.

`attempt_001.sop` folosește regula greșită „media pozitivă implică toate valorile pozitive”. Un local check poate trece, dar profile-ul trebuie să respingă output-ul după contraexemplu.

`attempt_002.sop` folosește witness-ul.
