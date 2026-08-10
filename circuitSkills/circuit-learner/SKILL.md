---
name: circuit-learner
description: Extract reusable rules, transformations, checks, and applicability evidence from KB input documents into reviewable candidate circuits. Use when Dynamic Circuits runs with a KB directory and no task workdir.
---

# Circuit Learner

## Workflow

1. Read `AGENTS.md`, `.dynamic-circuits/workspace.json`, and every entry in `.dynamic-circuits/input-manifest.json`. Account for unreadable or unsupported files explicitly. Treat only this KB's manifest-listed `input/` and reviewed `circuits/` as semantic sources. Do not inspect or use evaluation expectations, prior results, evaluation README/HTML, sibling candidates, or sibling task workspaces.
2. Inventory definitions, facts, claims, rules, exceptions, priorities, effective intervals, jurisdictions, units, procedures, verification methods, and ambiguity. Separate source-specific observations from reusable semantics.
3. Inspect trusted `circuits/` for overlap and version compatibility. Treat it as read-only and never copy a weaker duplicate merely because naming differs.
4. Express a reusable rule only when inputs, outputs, applicability, non-applicability, assumptions, refusal conditions, effects, capabilities, and provenance are explicit. Do not turn similarity or agent confidence into a mandatory matcher. Propose
   `@template mandatory` only when the authoritative source explicitly makes the rule unavoidable for every matching case,
   exact semantic activation keys can be stated, and exhaustive positive/negative applicability tests can be supplied.
5. Separate corpus facts from reusable reasoning. A statement such as `Socrate is a man` remains source-bound knowledge; a
   tested fixed-point procedure for unary implications may become a candidate. Preserve open-world `UNKNOWN`, direct and
   derived evidence, duplicate suppression, and explicit unsupported rule forms.
6. Create one focused folder under `candidates/` with the `.sop` package, contract/manifest, source paths and small relevant spans, applicability notes, examples, and tests. Never overwrite or promote `circuits/` content.
7. Use `$author-sop-circuit`; compile the candidate and run positive, negative, boundary, exception, malformed-input, and refusal cases. Mandatory candidates additionally require multiple-match, duplicate-publication, irrelevant-key, join-mismatch,
   target-refusal, and multi-round tests. Their matcher must contain no JavaScript and must keep matching separate from rule
   execution. For entailment candidates, include direct, multi-step derived, unknown, cyclic, conflicting, and unsupported-rule examples. Record exact commands and outcomes.
8. Compare the candidate against source rules and independent examples. Mark conflicting sources, policy choices, unverifiable claims, missing coverage, and required reviewers rather than resolving them silently.
9. Write `results/learning-summary.md` with complete input coverage, extracted candidates, test metrics, overlaps, assumptions, gaps, security considerations, and promotion recommendations.

Compilation and a closed receipt establish mechanical validity and complete execution only relative to the loaded registry,
published keys, and matcher semantics. They do not establish semantic trust, real-world KB completeness, or final acceptance.
Avoid copying large document passages into the KB; preserve hashes, relative paths, and small source spans sufficient for review.
