# Release Plan Consistency Candidate v1

## Status and purpose

This is a reviewable candidate extracted from `input/review-rules.md`. It is not trusted, promoted, or automatically applicable. It deterministically checks one represented release plan for unsuperseded launch-date conflicts and incompatible definitions. Compilation and successful tests demonstrate observed mechanical behavior only.

## Package and interface

The SOP root is `sop/`; the package is `release_plan_consistency.review`.

```text
@input plan
@output report
```

`plan` must be an object with a non-empty `planId` and a complete, ordered `chapters` array. Each chapter must contain:

- a unique, non-empty `chapterId`;
- `launchDate`, either `null` when no date is stated or an object containing unique `assertionId`, source `value`, caller-supplied canonical `dateKey`, and a `supersedes` array of earlier assertion IDs; and
- a complete `definitions` array. Each definition contains source `term`, caller-supplied canonical `termKey`, source `text`, and either a caller-reviewed `meaningKey` or `null` when compatibility is not classified.

Array order defines chapter order. A supersession is accepted only when a later chapter explicitly names an existing earlier assertion. Supersession is never inferred from chronology, wording, or date values. Inputs are assertions supplied by the caller; the circuit does not inspect documents or authenticate them.

## Verdicts

Runtime outcome and semantic verdict are distinct. A valid input produces `SUCCEEDED` with one of:

- `CONFLICT`: multiple distinct active `dateKey` values remain, or a term has multiple explicit known `meaningKey` values;
- `UNKNOWN`: no known conflict exists, but launch-date evidence is incomplete or differing definition text lacks compatibility classification; or
- `CONSISTENT`: the represented evidence contains neither a known conflict nor unresolved uncertainty.

Known conflict has priority over uncertainty in `reviewVerdict`, while `uncertaintyPreserved` and the individual `UNKNOWN` findings remain in the report. Malformed structure, duplicate identifiers, and invalid supersession references produce runtime `REFUSED`, not a semantic verdict.

The report returns all date assertions, all active assertions, distinct active date keys, chapters without dates, explicit supersession edges, every grouped term definition with source chapters, conflict and uncertain term keys, and the source rule locator. A term can be both a known conflict and uncertain when explicit incompatible meanings coexist with unclassified differing text. The report always returns `preferredLaunchDate: null` and `preferredDefinitions: []`; it never silently selects a version.

## Applicability and non-applicability

Apply only when a caller can provide one plan, exhaustive ordered chapters, explicit date assertions/supersession links, stable canonical identity keys, and source-grounded definition entries. Do not apply as a semantic similarity engine, date parser, document extractor, policy authority, or cross-plan comparator. Do not infer that missing input means the source chapter has no content.

## Assumptions and review requirements

1. Exact `dateKey`, `termKey`, and `meaningKey` equality represents caller-reviewed identity; the circuit does not normalize them.
2. A direct explicit supersession deactivates the named earlier assertion even if its superseder is later superseded. The source does not define transitive restoration.
3. Multiple later assertions may supersede the same earlier assertion; all explicit edges are retained.
4. Differing source text with a shared non-null `meaningKey` is compatible. Differing text with any `null` classification is `UNKNOWN`, not automatically incompatible.
5. Identical definition text is treated as compatible unless explicit meaning keys conflict.
6. No definition supersession or priority is inferred because the source states none.
7. An empty plan or any chapter with `launchDate: null` makes launch-date review `UNKNOWN`, unless an independently known conflict already determines the overall conflict verdict.
8. Dates are opaque strings plus canonical identity keys. The source supplies no format, timezone, precision, or equivalence rule.
9. One definition per canonical term is accepted in each chapter. Duplicate `termKey` values within one chapter are refused because the source only specifies comparison across chapters.

Required reviewers are the release-plan owner, terminology/domain owner, source-document owner, and SOP runtime maintainer.

## Capabilities and effects

The package uses deterministic in-memory computation only. It has no filesystem, process, network, clock, randomness, oracle, hidden-global, or direct LLM capability and declares no effects.
