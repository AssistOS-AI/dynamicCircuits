# Knowledge Inventory

## Source inventory

The complete source is one Markdown heading and one paragraph at `input/review-rules.md:1-3`. The reusable normative content is line 3.

| Category | Extracted content | Candidate treatment |
|---|---|---|
| Context | Chapters within one release plan | One `plan` with an ordered `chapters` array |
| Rule | Chapters use one launch date | Compare active caller-canonicalized date keys |
| Exception | A later chapter may explicitly supersede an earlier date | Accept only explicit references from a later chapter to an earlier assertion |
| Conflict rule | Report multiple unsuperseded dates | `CONFLICT` when more than one active date key remains |
| Definition rule | A defined term retains one meaning across chapters | Group exact caller-canonicalized term keys |
| Conflict rule | Report incompatible definitions with source chapters | Multiple known meaning keys yield `CONFLICT`; retain all entries and chapter IDs |
| Procedure/claim | Preserve uncertainty and do not silently choose | Emit `UNKNOWN` and never emit a preferred date or definition |
| Priority | Explicit later supersession overrides the named earlier date assertion | Apply only to explicitly referenced earlier assertions |
| Priority | Known conflict determines the overall verdict while uncertainty remains visible | `reviewVerdict` is `CONFLICT`; detailed unknown findings remain |

## Definitions and facts

The source uses but does not formally define “release plan,” “chapter,” “launch date,” “defined term,” “meaning,” “incompatible,” “explicitly supersedes,” or “preferred version.” No corpus-specific plan, chapter, date, or term facts are provided. The candidate therefore defines only a machine interface and does not create factual release-plan content.

## Intervals, jurisdictions, and units

No effective interval, policy jurisdiction, date format, timezone, calendar, or unit is specified. Chapter sequence is represented by array position, not calendar time. Date values remain opaque source strings.

## Procedures and verification

The reusable procedure is: validate a complete representation; identify explicit supersession edges; retain unsuperseded assertions; compare their canonical keys; group definitions by canonical term identity; compare known meaning identities; preserve unresolved cases; and report evidence without choosing a version.

Verification is limited to structural input validation, deterministic comparison, invariant checks, execution receipts, and test vectors. The circuit cannot verify whether the representation is exhaustive, whether a supersession statement truly exists in a source, or whether caller-provided identity keys are semantically correct.

## Ambiguity and negative cases

- “One launch date” may mean identical text, identical instant, or a policy-specific canonical date; the candidate requires `dateKey`.
- The scope and transitivity of supersession are unstated. The candidate uses named assertion edges and does not restore an older assertion when its superseder is superseded.
- The source does not say how to handle a chapter with no date, so the candidate returns `UNKNOWN`.
- “Incompatible” requires semantic judgment unavailable to deterministic string comparison; the candidate requires reviewed `meaningKey` values and preserves unclassified differences even when a known conflict also exists.
- Alias terms, case folding, whitespace, localization, and definition-text normalization are unspecified and not inferred.
- No rule authorizes a definition override merely because it appears later.
- Multiple definitions for the same canonical term within one chapter are outside the stated across-chapter rule and are refused.
- Multiple plans, partial chapter inventories, extracted-document confidence, invalid dates, and external policy precedence are outside scope.
- Malformed objects and invalid references are refused rather than converted into policy conflicts.

## Trusted overlap

`circuits/` contained zero files during learning. There is no trusted overlap, alternative package version, or weaker duplicate to compare. The package targets the implemented SOP v1 subset.
