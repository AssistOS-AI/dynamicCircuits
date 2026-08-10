# Source Inventory and Interpretation

## Input coverage

The input manifest lists one supported UTF-8 Markdown file: `input/rule.md`, 345 bytes, SHA-256
`45044b3cb7a68d06b1dd366586e4436dfb61648537f47208b2683d5b2dd5e142`. The observed size and hash match the manifest.
All three lines were read. There were no unreadable, omitted, or unsupported files. No
`.dynamic-circuits/AGENT_INSTRUCTIONS.md` file was present.

## Extracted knowledge

| Kind | Extraction | Source |
|---|---|---|
| Definition | A notice supplies a review period measured in calendar days. | line 3 |
| Base rule | The ordinary minimum is 30 calendar days. | line 3, sentence 1 |
| Exception | A 10-calendar-day minimum is available for an expedited review only with an explicit subject request and recorded written consent. | line 3, sentence 2 |
| Compliance rule | A notice below its applicable minimum is non-compliant; a notice at or above the minimum is compliant under this rule. | line 3, sentences 1-3 |
| Evidence prohibition | The expedited flag cannot stand in for missing written consent. | line 3, sentence 4 |
| Priority | The 30-day base rule governs unless every expedited-exception condition is established. | interpretation of sentences 1-2 and 4 |
| Unit | Calendar days; the source supplies thresholds 30 and 10 but no counting convention. | line 3 |

The source provides no effective interval, issuing authority, jurisdiction, notice-delivery rule, calendar-counting method,
holiday adjustment, documentary verification procedure, remedy, appeal process, or conflict hierarchy beyond the base-rule
and exception relationship. It makes a source-bounded compliance claim, not a verified claim about any external legal regime.

## Reusable procedure

1. Validate that the input is a notice record with a usable calendar-day count.
2. Treat supplied evidence flags as true only when they are JSON Boolean `true`.
3. Establish the expedited exception only when the review is flagged expedited, the subject explicitly requested it, and
   written consent is recorded.
4. Select 10 days for an established exception; otherwise select 30 days.
5. Compare the supplied review days to the selected threshold and return `COMPLIANT` or `NON_COMPLIANT` with the evidence
   path and source locator.

The candidate verifies only explicit input assertions. It does not examine a notice, calendar, request, signature, consent
record, delivery event, or external system.

## Corpus facts versus reusable semantics

The exact prose, its title, and the source hash are corpus facts retained as provenance. The threshold-selection and
comparison procedure is the reusable candidate. The source does not state that this rule applies to every type of notice,
organization, jurisdiction, or time period, so automatic applicability is not encoded.

## Ambiguity and interpretation choices requiring review

1. The source does not define an input schema. The candidate uses one `notice` object with `reviewDays`, `expedited`,
   `subjectExplicitlyRequestedExpedited`, and `writtenConsentRecorded` fields.
2. The candidate requires `reviewDays` to be a nonnegative integer. The source says calendar days but does not explicitly
   reject fractions, negative values, strings, or alternative duration representations.
3. Missing optional evidence is treated as not established, not as a malformed record. A supplied non-Boolean evidence
   value is refused rather than silently coerced.
4. The 10-day branch requires the expedited flag in addition to request and consent. The phrase “an expedited review” and
   the later reference to “the expedited flag” support that choice, but the source does not define the flag itself.
5. When an expedited flag lacks either prerequisite, the candidate applies the 30-day minimum. The source does not say
   whether such a record should instead fail categorically even when it provides 30 days.
6. “Only when” clearly states necessary conditions but may not establish that they are sufficient in a larger policy. The
   candidate treats the three explicit conditions as sufficient within this one-document corpus.
7. “Written consent is recorded” does not define acceptable form, signatory, scope, timestamp, revocation, retention, or
   verification method. The Boolean input is an assertion, not proof.
8. Calendar-day counting is unspecified: the source supplies no start instant, inclusion/exclusion convention, time zone,
   deadline hour, or holiday handling.
9. The source has no identifier, jurisdiction, effective date, supersession rule, remedy, or priority against other rules.
10. `COMPLIANT` means compliant only with this notice-period rule; it is not a whole-notice or legal-compliance conclusion.

## Trusted overlap and compatibility

`circuits/` contains no files, so there is no trusted semantic or package-name overlap and no version conflict to resolve.
The candidate targets the implemented SOP v1 subset and uses one local deterministic command plus core validation commands.
Compilation establishes mechanical compatibility only.
