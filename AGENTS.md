# Dynamic Circuits Agent Guidance

## Scope

This repository implements a coding-agent-driven CLI and a dependency-free Node.js reference runtime for SOP Lang circuits. The immutable `sop_lang_circuits_design_specs_v1/` directory is historical input and must never be modified. Current behavior is governed by `docs/specs/`.

## Mandatory Reading Order

1. Read `docs/index.html` for the implemented system boundary.
2. Read `docs/specs/DS000-vision.md` and the specifications relevant to the change.
3. Read `docs/specs/DS001-coding-style.md` before changing source layout, style, or tests.
4. Read the applicable skill under `circuitSkills/` before changing coding-agent workflows or SOP files.
5. Consult `sop_lang_circuits_design_specs_v1/` only as immutable historical design input.

The current DS specifications are the source of truth. If source code changes behavior, interfaces, architecture, workflows, or constraints, update both the affected DS files and HTML documentation in the same change.

## Current Skill Catalog

Project runtime skills are `analyze-task`, `author-sop-circuit`, and `circuit-learner` under `circuitSkills/`. Workspaces receive a symbolic link to this directory during preparation.

Repository guidance skills available under the read-only `.agents/skills/` tree are `gamp-specs`, `achilles-specs`, `review-specs`, and `article-build`. They guide repository work but are not runtime skills and must not be copied into the host documentation as standalone skill DS files.

Update this catalog whenever a project skill folder is added or removed. Update `gamp-specs` at its owning source when new skill families, coding-style rules, or bootstrap rules are introduced; do not modify the read-only imported copy here.

## Repository Rules

All documentation, specifications, source comments, diagnostics, and durable generated guidance must be written in English.
DS numbering must remain contiguous. Ordinary DS files must contain `Introduction`, `Core Content`,
`Decisions & Questions`, and `Conclusion`; questions must be consecutive numbered subchapters and use `Response:`
or `Options:`. Architectural rationale belongs in the affected DS file, not a separate decision log.

Keep imported-skill DS files and standalone imported-skill pages out of this downstream project's `docs/`. Preserve the historical v1 package byte-for-byte. Use `apply_patch` for source edits and keep generated work products out of `input/`.

AchillesAgentLib is authorized for future orchestrated runtime integration. It is not a current dependency. If
in-process LLM access is added later, all such interactions must go through AchillesAgentLib's `LLMAgent`, runtime
configuration must support explicit code-level overrides in addition to environment defaults, and routing-sensitive
work must carry task metadata tags. The current release invokes external coding-agent CLIs and must not call LLM APIs
directly.

## Runtime Defaults

The default coding-agent adapter is `codex`. Workspace preparation is non-destructive toward user-owned `AGENTS.md`
files, KB trusted circuits are read-only during normal analysis, and learning writes only reviewable candidates. SOP
commands execute without filesystem, process, network, clock, random, or oracle capabilities. Node.js 20 or newer is
required and production code has no external package dependency.

## Key Paths

- HTML documentation: `docs/index.html`
- Specification matrix: `docs/specs/matrix.md`
- Specifications: `docs/specs/`
- Coding-style authority: `docs/specs/DS001-coding-style.md`
- Runtime source: `src/`
- Modular tests: `tests/`
- Coding-agent skills: `circuitSkills/`
- Evaluation workspaces and static evidence: `docs/eval/eval1/`, `docs/eval/eval2/`, `docs/eval/eval3/`
- Historical design package: `sop_lang_circuits_design_specs_v1/`
