# DS-005 — Declararea commands-urilor și ABI-ul JavaScript

## 1. Scop

Commands-urile sunt extensia principală a sistemului. Limbajul rămâne mic deoarece un command poate implementa procesare arbitrară: parsing, reasoning, simulare, acces la KB, solver calls, LLM calls sau generare de artefacte.

Libertatea command-ului nu trebuie confundată cu încrederea. ABI-ul separă execuția, verificarea locală, capabilities și receipts.

## 2. Declarația formală

```text
@commandName define formal1 formal2 formal3
    ...
```

Lista formală:

- definește ordinea binding-ului;
- definește cheile obiectului `inputs`;
- permite completarea cu `undefined`;
- intră în hash-ul command-ului;
- este verificată pentru duplicate și reserved names.

Formals nu sunt wires. Nu au `$`.

## 3. Blocul JavaScript

Blocul trebuie să returneze un descriptor:

```javascript
return { run, check }
```

`run` este obligatoriu.

`check` este opțional.

Descriptorul MAY include proprietăți suplimentare standard:

```javascript
return {
  run,
  check,
  effects: ["network"],
  cache: "materialize",
  timeoutMs: 30000
}
```

Aceste proprietăți sunt metadata de execuție a command-ului, nu adnotări semantice ale firelor.

## 4. ABI-ul `run`

Runtime-ul apelează:

```javascript
await run(inputs, ctx)
```

`inputs` este un obiect frozen ale cărui chei sunt formals. Binding-ul este pozițional la nivel SOP Lang, dar obiectul JavaScript permite cod lizibil:

```javascript
async function run({ actual, minimum }, ctx) {
  ...
}
```

Parametrii lipsă au valoarea `undefined`.

`ctx` oferă numai capabilitățile autorizate.

## 5. ABI-ul `check`

Dacă există, runtime-ul apelează:

```javascript
await check(inputs, output, ctx)
```

Rezultatul poate fi:

```javascript
true
false
```

sau:

```javascript
{
  ok: true,
  evidence: {...}
}
```

Un rezultat fals produce `CHECK_FAILED`.

`check` demonstrează numai relația locală implementată. El nu acordă automat un nivel global de încredere.

## 6. Refuzul controlat

Command-ul refuză prin:

```javascript
return ctx.reject("missing_input", {
  parameter: "minimum"
})
```

Refuzul este un rezultat de control, nu excepție.

Receipt-ul de refuz include code, details, command hash și input hashes.

Exemple de refuz:

- regula nu este aplicabilă;
- inputul necesar lipsește;
- formatul valorii nu este acceptat;
- solver-ul a răspuns `unknown`;
- politica interzice operația.

## 7. Excepții

O excepție aruncată indică `ERROR`, nu refusal.

Runtime-ul MUST captura excepția, stack-ul sanitizat și environment fingerprint.

Retry-ul automat este permis numai pentru errors marcate tranzitorii de o politică externă. Nu se repetă silencios commands deterministe care au eșuat.

## 8. `ctx`

Contextul minim SHOULD oferi:

```javascript
ctx.reject(code, details)
ctx.log(level, message, details)
ctx.signal
ctx.artifacts.read(handle)
ctx.artifacts.write(bytes, metadata)
ctx.clock.now()
ctx.random.bytes(n)
ctx.network.fetch(request)
ctx.oracle.call(request)
ctx.receipt.note(key, value)
```

Accesul la `clock`, `random`, `network` și `oracle` depinde de capabilities.

Un command fără capability nu poate folosi direct Node globals pentru a ocoli policy.

## 9. Efecte și cache

Descriptorul poate declara:

| Valoare | Semnificație |
|---|---|
| `pure` | output determinat de inputs și code hash |
| `read` | citește un snapshot extern identificabil |
| `write` | produce efecte externe |
| `oracle` | folosește model sau serviciu nedeterminist |
| `unknown` | default conservator |

Un command `pure` poate fi memoizat.

Un command `read` este cacheable numai dacă receipt-ul fixează snapshot-ul.

Un command `oracle` poate fi materializat și replayed, dar rerularea produce o execuție nouă.

Un command `write` trebuie să fie idempotent sau tranzacțional și nu se execută în speculative attempts fără policy explicit.

## 10. Capturi și imports

Blocul `define` nu are acces lexical la wire store.

Orice identifier JavaScript care începe cu `$` este doar JavaScript și SHOULD produce linter warning.

Valorile runtime din circuitul curent sau din alte circuite MUST fi parametri expliciți.

Helpers statici pot fi furnizați prin sandbox modules autorizate. Hash-urile lor intră în command code identity.

## 11. Determinism

Pentru commands pure, runtime-ul SHOULD testa în development mode că aceeași intrare produce același output și check receipt.

Nondeterminismul ascuns este defect.

Date, locale, timezone, random seed și environment variables trebuie fie interzise, fie incluse explicit în environment fingerprint.

## 12. Exemple

### Command care acceptă parametru lipsă

```text
@normalize define value policy
    async function run({ value, policy }, ctx) {
      const activePolicy = policy ?? { trim: true }
      return activePolicy.trim ? String(value).trim() : String(value)
    }

    return { run, effects: ["pure"] }
```

### Command care refuză

```text
@deriveInvalid define actual minimum
    async function run({ actual, minimum }, ctx) {
      if (minimum === undefined) {
        return ctx.reject("missing_minimum")
      }

      if (actual.subject !== minimum.subject) {
        return ctx.reject("different_subjects")
      }

      const a = Number(actual.value)
      const m = Number(minimum.value)

      if (!(a < m)) {
        return ctx.reject("rule_not_applicable")
      }

      return {
        subject: actual.subject,
        conclusion: "notValid",
        witness: { actual: a, minimum: m }
      }
    }

    return { run, effects: ["pure"] }
```

## 13. Criterii de conformitate

O implementare conformă MUST testa:

- binding pozițional;
- completarea cu `undefined`;
- respingerea argumentelor suplimentare;
- izolarea wire store-ului;
- refuz vs exception;
- check pass/fail;
- capability denial;
- cache invalidation la schimbarea code hash;
- receipts pentru external effects.
