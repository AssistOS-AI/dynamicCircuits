# Contractual breach-notice generation and verification

## Scope and caution

Generate a fact-bounded contractual breach notice from an explicit brief. This is a document-assembly fixture, not legal
advice and not a determination that a breach occurred. The output must distinguish supplied facts, contractual references,
requested cure, reservations, and missing legal conclusions. It must not invent statutes, damages, admissions, dates,
delivery methods, or factual allegations.

## Required brief fields

The brief supplies sender, recipient, agreement title, agreement date, notice date, contract clause, supplied event statement,
cure action, cure deadline date, permitted delivery method, reservation text, governing-law statement, and factual exhibits.
Every field is required and non-empty. Exhibits must be a non-empty ordered list. Dates are treated as supplied strings; the
circuit does not calculate legal deadlines.

## Generated document

The generator returns Markdown with one title and these exact ordered headings: `## Parties and Agreement`, `## Notice
Purpose`, `## Supplied Facts`, `## Contract Reference`, `## Requested Cure`, `## Delivery`, `## Reservation of Rights`,
`## Exhibits`, and `## Limitations`.

The notice must reproduce every supplied field verbatim. The Supplied Facts section must label the event statement as
`Supplied factual statement:`. The Contract Reference must say that the notice cites, but does not independently interpret,
the supplied clause. Requested Cure must state both cure action and supplied deadline without calculating a new date.
Limitations must state: `This generated document is not legal advice and does not independently determine breach, liability,
damages, or enforceability.` The document must contain no currency symbol and no words `statutory penalty` unless those exact
terms occur in the brief.

## Independent verifier

A separate verifier receives brief and generated Markdown. It checks exact heading order, presence of all supplied values,
ordered exhibits, factual-label language, clause caution, unchanged deadline, delivery method, reservation text, governing-law
statement, exact limitations sentence, absence of unsupported currency/penalty language, and one occurrence of each party
name in the Parties section. It returns `ok`, per-check results, missing items, prohibited additions, and measured counts.
It does not repair the notice. The composed goal passes only when all checks pass.
