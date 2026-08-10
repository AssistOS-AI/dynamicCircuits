# DS-007 — Package-uri, namespace-uri și rezoluție

## 1. Principiu

Namespace-ul rezolvă componente, nu valori.

Package names provin din calea fișierului și sunt folosite pentru:

- circuit calls;
- command calls calificate;
- registry entries;
- profile manifests;
- receipts;
- cache identity.

Wire-urile rămân locale fișierului și nu primesc package path în sintaxa SOP Lang.

## 2. Mapping-ul căii

Un root de proiect este configurat explicit.

Exemple:

```text
kb/legal/notice/invalidity.sop
```

devine:

```text
kb.legal.notice.invalidity
```

```text
kb/legal/notice/invalidity/index.sop
```

devine același package:

```text
kb.legal.notice.invalidity
```

```text
kb/legal/notice/invalidity/verifier.sop
```

devine:

```text
kb.legal.notice.invalidity.verifier
```

`index.sop` este singura regulă specială de colapsare a filename-ului.

## 3. Package roots

Runtime-ul poate avea mai multe roots:

- standard library;
- organization KB;
- project-local KB;
- task workspace;
- generated attempts.

Rezoluția implicită nu trebuie să aleagă arbitrar între duplicate.

Dacă două roots definesc același package name, compilarea MUST eșua, cu excepția unui overlay declarat explicit într-un manifest.

Overlay-ul trebuie să fixeze package hash-ul ales și să apară în receipt.

## 4. Nume locale și calificate

În același fișier, un command declarat local poate fi apelat prin numele scurt:

```text
@proof deriveInvalid $actual $minimum
```

Un command poate fi adresat extern prin:

```text
@proof kb.legal.notice.invalidity.deriveInvalid $actual $minimum
```

Totuși, compoziția externă SHOULD apela circuit interface-ul, nu commands interne. Apelul direct al unui command leagă consumatorul de implementarea package-ului.

## 5. Export policy

V1 poate adopta una dintre două politici:

- toate commands-urile sunt adresabile, dar tooling-ul avertizează;
- numai circuit interface-ul este public.

Recomandarea normativă este: runtime-ul MAY rezolva commands calificate, dar registry-ul public și semantic versioning-ul tratează numai `@input/@output` drept API stabil.

## 6. Wire hygiene

La instanțiere, runtime-ul creează identificatori interni pentru wire-urile copilului. Exemplu conceptual:

```text
instance-7::proof
instance-7::witness
```

Acești identificatori nu apar în source și nu pot fi referiți manual.

Outputs-urile copilului sunt legate la fire locale ale părintelui prin alias edges.

Această igienă permite:

- instanțiere repetată;
- execuție paralelă;
- provenance;
- cache;
- avoidance of collisions.

## 7. Package identity

Identitatea executabilă a unui package include:

- canonical source;
- resolved helper dependencies;
- compiler version;
- declared capability policy;
- schema version.

Un package name fără hash este un nume simbolic. Receipts și profiles MUST fixa hash-uri.

## 8. Registry metadata

Registry-ul poate păstra metadata pentru discovery:

- package name;
- package hash;
- interface arity;
- triggers;
- template mode;
- domain tags;
- version;
- cost estimate;
- trust status;
- documentation location.

Metadata de discovery nu trebuie să decidă singură aplicabilitatea. Matcher-ul o decide.

## 9. Importuri și helper code

V1 nu introduce syntax `import` SOP Lang.

Circuitele se compun prin calls calificate.

JavaScript helpers sunt furnizați de sandbox module registry sau sunt încorporați în blocul `define`.

Orice helper extern intră în package hash.

## 10. Version resolution

Problem workspace-ul SHOULD avea un lock manifest:

```text
packages:
  kb.legal.notice.invalidity: sha256:...
  kb.assurance.contradiction: sha256:...
```

LLM-ul poate sugera upgrade, dar o execuție nu schimbă package versions în timpul attempt-ului.

Upgrade-ul creează epoch și attempt nou.

## 11. Erori

Compilerul MUST raporta:

- package inexistent;
- duplicate package name;
- hash mismatch;
- call către package fără `@output`;
- target matcher incompatibil;
- helper dependency absent;
- cycle de rezoluție nepermis.

## 12. Criterii de conformitate

Testele trebuie să includă:

- mapping pentru fișier normal și `index.sop`;
- roots multiple;
- duplicate package;
- lock manifest;
- commands locale și calificate;
- două instanțe cu wire names interne identice;
- cache identity la schimbarea source-ului;
- overlay explicit.
