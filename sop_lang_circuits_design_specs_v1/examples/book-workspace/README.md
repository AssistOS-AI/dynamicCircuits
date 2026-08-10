# Exemplu de workspace pentru o carte

```text
book-task/
  source/
    book.pdf.ref
    source-manifest.md
  interpretation/
    chapter-01/
      sections/
      aggregate.sop
    chapter-02/
      sections/
      aggregate.sop
  problem/
    cross_chapter_consistency.sop
    terminology_drift.sop
    final_report.sop
  attempts/
    0001/
    0002/
  assurance/
    profile.lock
  receipts/
  artifacts/
  cache/
```

Fiecare secțiune este interpretată separat. Chapter aggregate publică facts, definitions, claims și timeline events. Cross-chapter matchers găsesc contradicții, redefiniri și dependențe.

O modificare în capitolul 2 invalidează numai interpretarea sa, agregatul, matchers care consumă publications relevante și final report.

Coding agent-ul nu trebuie să trimită întreaga carte la LLM la fiecare attempt. El folosește semantic index și source spans.
