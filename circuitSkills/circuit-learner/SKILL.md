---
name: circuit-learner
description: Extract reusable rules, transformations, checks, and applicability evidence from KB input documents into reviewable candidate circuits. Use when Dynamic Circuits runs with a KB directory and no task workdir.
---

# Circuit Learner

## Workflow

1. Read `AGENTS.md`, `.dynamic-circuits/workspace.json`, and every entry in `.dynamic-circuits/input-manifest.json`. Account for unreadable or unsupported files explicitly.
2. Inventory definitions, facts, claims, rules, exceptions, priorities, effective intervals, jurisdictions, units, procedures, verification methods, and ambiguity. Separate source-specific observations from reusable semantics.
3. Inspect trusted `circuits/` for overlap and version compatibility. Treat it as read-only and never copy a weaker duplicate merely because naming differs.
4. Express a reusable rule only when inputs, outputs, applicability, non-applicability, assumptions, refusal conditions, effects, capabilities, and provenance are explicit. Do not turn similarity or agent confidence into a mandatory matcher.
5. Create one focused folder under `candidates/` with the `.sop` package, contract/manifest, source paths and small relevant spans, applicability notes, examples, and tests. Never overwrite or promote `circuits/` content.
6. Use `$author-sop-circuit`; compile the candidate and run positive, negative, boundary, exception, malformed-input, and refusal cases. Record exact commands and outcomes.
7. Compare the candidate against source rules and independent examples. Mark conflicting sources, policy choices, unverifiable claims, missing coverage, and required reviewers rather than resolving them silently.
8. Write `results/learning-summary.md` with complete input coverage, extracted candidates, test metrics, overlaps, assumptions, gaps, security considerations, and promotion recommendations.

Compilation establishes mechanical validity, not semantic trust, mandatory applicability, or correctness. Avoid copying large
document passages into the KB; preserve hashes, relative paths, and small source spans sufficient for review.
