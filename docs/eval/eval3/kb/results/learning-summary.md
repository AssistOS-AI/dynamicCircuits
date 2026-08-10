# Learning Summary: Release Plan Consistency

## Outcome

The learning run processed the complete input manifest and produced one focused reviewable candidate at `candidates/release-plan-consistency-v1/`. Its `release_plan_consistency.review` SOP package checks explicitly represented launch-date supersession and definition compatibility while preserving unresolved evidence as `UNKNOWN` and never selecting a preferred version.

Nothing in `circuits/` was created, changed, overwritten, or promoted. The candidate remains `review-required`; compilation and execution prove mechanical validity and observed test behavior only.

## Input coverage

| Metric | Result |
|---|---:|
| Manifest entries | 1 |
| Files read | 1 |
| Files matching manifest byte count and SHA-256 | 1 |
| Unreadable files | 0 |
| Unsupported files | 0 |
| Source lines inspected | 3 of 3 |
| Source bytes inspected | 422 of 422 |

`input/review-rules.md` matched the manifest byte count and SHA-256 `d37915155d2ffd2065714f525bcd3107112ca71941c8b5f89b4face55e6c100a`. Coverage includes the title at line 1 and all normative content at line 3. `AGENTS.md`, `.dynamic-circuits/workspace.json`, both required skills, and the implemented SOP v1 subset reference were read. `.dynamic-circuits/AGENT_INSTRUCTIONS.md` was not present.

## Extracted knowledge

- Facts and claims: the source asserts one launch date across a release plan, one meaning for a defined term across chapters, conflict reporting for remaining date or definition inconsistency, and uncertainty preservation without silent preference.
- Definitions: the source names release plans, chapters, launch dates, defined terms, meanings, incompatibility, supersession, uncertainty, and preferred versions but formally defines none of them.
- Rules: distinct unsuperseded launch dates must be reported; incompatible definitions must be reported with their source chapters.
- Exception and priority: an explicit statement in a later chapter can supersede an earlier launch-date assertion. No equivalent definition supersession rule exists. A known conflict controls the aggregate verdict while detailed uncertainty remains visible.
- Context: the rules apply within one release plan and across its chapters. They do not state applicability across plans.
- Procedure: order chapters, validate explicit evidence, resolve only named earlier-date supersession edges, compare remaining canonical date identities, group canonical term identities, compare reviewed meaning identities, and return all conflicts and uncertainty without choosing.
- Intervals, jurisdictions, and units: none are specified. In particular, no effective date, date format, timezone, precision, calendar, locale, jurisdiction, or issuing authority is given.
- Verification methods: the candidate provides structural validation, deterministic comparison, explicit evidence retention, an invariant, compilation, tests, receipts, and output hashes. The source provides no method to verify extraction completeness, supersession authenticity, date equivalence, or semantic compatibility.

Corpus-specific observations were kept in provenance and documentation. The source contains no actual plan, chapter, date, or definition facts to encode. Reusable semantics are exposed only through an explicit interface with applicability, non-applicability, assumptions, refusals, outputs, capabilities, and provenance.

## Candidate and test metrics

| Metric | Result |
|---|---:|
| Candidate folders | 1 |
| SOP packages | 1 |
| Compile successes | 1 |
| Compile failures | 0 |
| Test vectors | 17 |
| Passed assertions | 17 |
| Failed assertions | 0 |
| Runtime `SUCCEEDED` | 11 |
| Runtime `REFUSED` | 6 |
| Runtime `REJECTED` | 0 |
| Runtime `ERROR` | 0 |
| Semantic `CONSISTENT` | 3 |
| Semantic `CONFLICT` | 5 |
| Semantic `UNKNOWN` | 3 |

Coverage includes positive, negative, exception, ambiguity, boundary, priority, malformed-input, and refusal behavior. All successful cases exposed one public output hash plus a receipt hash; refusals exposed neither semantic output nor public output hash. Exact commands, package hash, representative receipt hashes, and case coverage are in `candidates/release-plan-consistency-v1/tests/execution-report.md`.

## Trusted overlap and compatibility

The trusted `circuits/` directory contained zero files. There was no package overlap, alternative version, or weaker duplicate to avoid. The candidate compiled against the current dependency-free reference runtime and the implemented SOP v1 subset. It uses explicit positional wiring, one deterministic JavaScript command, one validation command, and a core invariant. The unavailable `agent` shell alias was transparently replaced by the repository's declared `src/cli.mjs` binary entry point.

## Assumptions and policy choices

1. Chapter array position defines “later”; chapter IDs and date assertion IDs must be unique.
2. The caller provides exhaustive chapters and definitions plus reviewed `dateKey`, `termKey`, and `meaningKey` identity classifications. The circuit does not infer semantic identity.
3. Only an explicit reference from a later assertion to an earlier assertion supersedes it. Date chronology and wording never imply supersession.
4. A directly superseded assertion stays inactive even if its superseder is itself superseded; the source does not define transitive restoration.
5. Different known meaning keys are incompatible. Differing text with any absent meaning classification preserves uncertainty, including when another pair already establishes a conflict; identical text is compatible unless explicit meaning keys conflict.
6. Empty plans and chapters represented with `launchDate: null` yield launch-date `UNKNOWN`, not a fabricated date or automatic conflict.
7. Runtime refusal is reserved for malformed representations and invalid references. `CONFLICT` and `UNKNOWN` are successful semantic review outputs.
8. The aggregate verdict prioritizes a known conflict over unknown evidence but retains each unknown finding and sets `uncertaintyPreserved`.
9. A chapter may represent at most one definition per canonical term; duplicate within-chapter term keys are refused because the source only states an across-chapter comparison rule.

These choices are explicit in the contract, inventory, test vectors, and outputs; none is represented as certain source meaning.

## Gaps and review risks

- The source does not define date equality, valid formats, timezone handling, term identity, semantic incompatibility, or normalization.
- Supersession scope, syntax, transitivity, and behavior under multiple superseders are unspecified.
- The treatment of missing launch dates, empty plans, partial chapter inventories, multiple same-chapter definitions, aliases, case, whitespace, localization, and malformed extracted evidence is unspecified.
- No rule permits later chapters to supersede definitions or establishes priority among incompatible meanings.
- There is no source version, policy owner, effective interval, jurisdiction, conflict severity, remediation process, or evidence standard.
- Canonical keys are trusted caller assertions. Incorrect keys can hide conflicts or manufacture them; independent source review is required.
- The tests use independent synthetic examples because the source contains no examples or concrete plan facts.
- No comparison with trusted behavior was possible because `circuits/` is empty.

## Security and capability review

The SOP code has no filesystem, process, network, clock, random, oracle, hidden-global, or direct LLM access. It declares no effects or capabilities and performs deterministic bounded iteration over supplied arrays. No direct LLM API integration was added. Host controls remain responsible for input-size limits and for protecting potentially sensitive plan content in runtime outputs and receipts.

## Promotion recommendation

Do not promote automatically. Consider promotion only after:

1. A release-plan owner confirms the one-date rule, explicit supersession interpretation, missing-date behavior, and aggregate verdict priority.
2. A terminology or domain owner defines or approves term identity and meaning-compatibility classification, including treatment of aliases and textual variation.
3. A source-document owner confirms that input construction is exhaustive and preserves verifiable source chapters and supersession statements.
4. Reviewers decide transitive supersession, multiple-superseder behavior, date formats/equivalence, and whether definition supersession exists.
5. A SOP runtime maintainer independently recompiles package hash `sha256:d6fc683c520a3203247f12203798deb16cd458d8b058999f983faabf55fc8bdd`, reruns all 17 vectors, and inspects semantic verdicts, refusals, receipts, and public output hashes.
6. Any approved promotion is performed by a separate authorized process that leaves this candidate and its provenance unchanged for review.

If a policy choice changes, update the SOP, contract, inventory, provenance transformation notes, affected vectors, manifest hash, execution report, and this summary before reconsidering promotion.
