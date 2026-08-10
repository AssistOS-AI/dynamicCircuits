# Applicability, priorities, and ambiguity

## Applicability rule

Apply only when the requested artifact is a Markdown operational incident-handoff SOP and the caller can supply the complete contract-shaped brief. A caller or task agent must select this circuit explicitly; similarity and confidence are not mandatory matching signals.

## Rule priorities and exceptions

1. Input refusal rules precede generation and verification.
2. Strict escalation-after-acknowledgement ordering precedes document generation.
3. Exact heading and procedure order takes precedence over stylistic variation.
4. The prohibited action remains a `MUST NOT` rule. Only the supplied approval role is named as able to approve an override.
5. Independent verification never repairs a deficient document.
6. The composed goal passes only if every verifier check passes.

The approval-role clause is a documented policy exception inside the generated text, not a capability to grant or execute approval.

## Interpretation choices requiring review

- The source calls all brief fields required but explicitly attaches “missing, empty, malformed, or non-positive” to deadline fields. This candidate applies missing/empty/malformed refusal to every required field.
- `evidence locations` has no declared representation or minimum count. This candidate requires a non-empty JSON array of single-line strings.
- “Malformed” is undefined. This candidate rejects line breaks in all verbatim textual values to protect exact Markdown structure; it does not otherwise sanitize or escape Markdown punctuation.
- Deadline values are finite positive numbers, including fractions. The source does not say they must be integers.
- “Every role” is interpreted to include incident commander, outgoing, incoming, and approval roles.
- Required service and severity values are included and verified even though the independent-verification paragraph does not list them explicitly.
- Presence checks use exact substring presence. Identical role names or evidence locations are not deduplicated in requested counts.
- The required override wording does not define an approval workflow, evidence of approval, or whether approval can be delegated. The candidate states only the named-role restriction.

## Jurisdiction, intervals, and units

No jurisdiction or effective interval is supplied. Deadline units are minutes. The completion checklist requires a UTC timestamp but the candidate never reads a clock or creates that timestamp.
