# Semantic inventory

## Source boundary and coverage

This inventory uses only manifest entry `input/legal-notice-generation-rules.md` (SHA-256
`f24be339d485bce52a9d35393dab9d0d48cc5611489dc80e18b5770d314f47c3`). The 2,473-byte Markdown file was readable,
its size and digest matched the manifest, and all lines 1–36 were reviewed. The workspace has no trusted `circuits/`
directory, so there is no trusted-package overlap to compare. No outside legal rule is asserted.

## Definitions and source-bound claims

- A fact-bounded contractual breach notice is assembled from an explicit brief and separates supplied facts,
  contractual references, requested cure, reservations, and absent legal conclusions (lines 5–8).
- The fixture is document assembly, not legal advice and not a determination that a breach occurred (lines 5–8).
- Dates are supplied strings; this process does not calculate legal deadlines (lines 14–15).
- The verifier is independent in the sense that it receives both the brief and Markdown, reports results, and does not
  repair the document (lines 30–36).
- A successful composed goal means all verification checks passed. It does not establish breach, liability, damages,
  enforceability, legal sufficiency, or valid delivery.

## Facts and required data

The brief has 12 required non-empty string fields: sender, recipient, agreement title, agreement date, notice date,
contract clause, supplied event statement, cure action, cure deadline date, permitted delivery method, reservation text,
and governing-law statement. `factualExhibits` is a thirteenth required field and is a non-empty ordered list whose
members this candidate requires to be non-empty strings.

No fixed jurisdiction, governing law, effective interval, monetary unit, damages figure, statute, delivery event, or
breach finding is supplied. Governing law and delivery method are per-brief strings, not reusable legal rules.

## Reusable rules

1. Refuse a brief that is not an object, omits a required field, supplies a non-string or empty required string, or
   supplies a missing, non-list, empty, or invalid exhibit list.
2. Reproduce the 12 strings and every exhibit verbatim; do not normalize dates or calculate a new deadline.
3. Emit one Markdown title followed by the nine required level-two headings in exact source order.
4. Label the event statement `Supplied factual statement:`.
5. State that the supplied clause is cited but not independently interpreted.
6. State the requested cure action and supplied deadline, marking that deadline as not calculated.
7. Include the delivery method, reservation, governing-law statement, and exhibits in source order.
8. Make the Limitations section equal to the required limitations sentence.
9. Do not add a Unicode currency symbol absent from the brief and do not add the exact case-sensitive phrase
   `statutory penalty` when it is absent from the brief.
10. Count each party name exactly once within the Parties and Agreement section.
11. Return an independent diagnostic object containing `ok`, 15 named check results, `missingItems`,
    `prohibitedAdditions`, and measured counts; do not repair the supplied Markdown.
12. Let `breach_notice.verify` succeed with `ok: false` for a well-typed but nonconforming notice. Let the composed
    `breach_notice.generate` goal pass only when that report has `ok: true`.

## Exceptions, priorities, and procedure

The source explicitly permits currency/penalty content when the exact content occurs in the brief. This candidate
implements the exception independently for each Unicode currency symbol and for the exact lowercase phrase. It does
not infer synonymous terms.

No conflict-priority system is explicit. The implementation uses this procedural order: validate the complete brief,
assemble without external data, independently verify, then apply the composed goal. Fact preservation and explicit
limitations are treated as constraints on assembly, not as evidence of legal conclusions.

## Ambiguity and review questions

- “Currency symbol” has no enumerated set. The candidate uses Unicode category `Sc`; reviewers should confirm this.
- “Those exact terms occur in the brief” is case-sensitive here and applies symbol-by-symbol. Case folding and a rule
  for currency words are unspecified.
- The title text is unspecified. The candidate chooses `# Contractual Breach Notice` while enforcing only one H1.
- Placement and label text are unspecified for most fields. The chosen locations are documented in `contract.md`.
- “Every supplied field” may or may not permit extra properties. The candidate refuses unknown properties so it cannot
  silently omit them.
- “Non-empty” is interpreted as length greater than zero; whitespace-only strings remain accepted.
- Raw verbatim values may contain Markdown headings or line breaks. The generator preserves them, and the composed goal
  rejects output whose structure is thereby altered. Escaping would violate literal verbatim reproduction.
- Literal substring counts make overlapping party names (for example, `Acme` and `Acme Holdings`) unable to satisfy the
  one-occurrence rule in the generated Parties section. Equal names and repeated names inside a party value also need
  policy clarification.
- Exact exhibit-line comparison assumes each exhibit occupies one line. Multi-line exhibit values are preserved but do
  not pass the ordered-exhibit check.
- The verifier proves literal structure and inclusion only. It cannot identify invented non-currency facts, recognize a
  calculated date that appears elsewhere, determine whether delivery occurred, or assess legal correctness.

Required promotion reviewers: a domain owner for the legal-fixture boundary and terminology, and an SOP/runtime reviewer
for refusal, assurance, Unicode, and canonical-output behavior.
