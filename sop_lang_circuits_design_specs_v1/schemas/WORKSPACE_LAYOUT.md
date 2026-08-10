# Structura recomandată a workspace-ului

```text
project/
  sop.lock
  profiles/
  kb/
  tasks/
    task-id/
      source/
      interpretation/
      problem/
      attempts/
        0001/
        0002/
      generated/
        candidate-templates/
      receipts/
      artifacts/
      cache/
```

## Reguli

- sources sunt content-addressed;
- attempts sunt immutable;
- accepted attempt este marcat prin manifest, nu mutat;
- candidate templates nu intră în trusted KB;
- receipts nu sunt editate manual;
- cache poate fi șters fără pierderea semnificației, dar nu fără pierderea performanței;
- package lock este versionat.
