---
id: DS007
title: Evaluation and Testing
status: active
owner: repository
summary: Defines modular unit suites, reproducible eval workspaces, verification commands, and historical integrity checks.
---

# DS007 Evaluation and Testing

## Introduction

Deterministic unit tests verify parser, compiler, runtime, CLI, workspace, adapter, documentation, and integrity contracts.
Committed evaluation workspaces exercise complete SOP tasks with source documents, circuits, checked results, and reports.

This specification verifies the CLI, skills, and runtime contracts defined by DS001–DS006 and provides executable reference
flows for the larger lifecycle in DS027. DS023 defines future conformance and scale coverage beyond the current suite.

## Core Content

`npm test` must execute modular unit suites for parser syntax, compiler graph validation, runtime outcomes and nesting, workspace preparation and non-destructive behavior, coding-agent invocation construction, the public CLI argument form, and historical-package integrity. Tests must cover successful and failing paths, including bare arguments, free wires, arity mismatch, dead nodes, refusal, failed checks, exceptions, false invariants, symlink creation, user-owned guidance, and generic adapter extension.

Every evaluation case lives under a contiguous `docs/eval/evalN/` directory so all artifacts are statically browsable using
relative URLs. It contains a detailed `README.md`, one `index.html`, one KB tree, and multiple explicit task-run trees. `kb/input/` contains
reusable rules or reference knowledge and `kb/circuits/` contains reviewed packages with the `kb.*` namespace.
`task/input/`, `task2/input/`, and `task3/input/` contain distinct current datasets or briefs. Each corresponding
`taskN/sop/task/` contains separately generated packages rooted at `task.analysis`, and each
`taskN/results/runtime-result.md` contains that run's executor-owned output. The KB and every task workspace expose the same project-owned skill catalog used
by production workspaces.

Files under evaluation `kb/input/` and every `taskN/input/` directory must be human-readable source documents for the coding
agent, not pre-interpreted JSON records. Reusable behavior must not be placed in task SOP merely to avoid loading the KB root,
and current observations or questions must not be placed in KB circuits. The generated SOP packages must contain the
executable interpretation used by the deterministic test. No `result.json` or `results.json` fixture is permitted under
task results. SOP eval code must not hide source interpretation behind JSON parsing when the evaluated workflow requires
the coding agent to translate source documents into circuits.

Each run may contain a separate `expected.md` outside its `input/`. It is evaluation material, never KB/task input, and records the
source-derived expectation plus an explicit comparison with `runtime-result.md`. If an expectation is adjusted because the
executor exposes an error in it, the document must retain the original expectation and explain the correction rather than
silently moving the target.

The README must state exactly what was evaluated, complexity, commands, observed outcome, limitations, and the distinction
between runtime success and semantic success. Deterministic reproduction commands and tests must register both
`kb/circuits/` with prefix `kb` and `task/sop/` with the case prefix before compiling or running the task root.

Each evaluation folder owns one `index.html`. That page must present the evaluation question and method and use the shared
evaluation tree component in its left pane. The tree has top-level branches for the evaluation record, the KB, and every
independent task. The KB branch separates source texts from reviewed KB SOP. Every task branch separates input, generated
SOP, executor result, and evaluation evidence. A source branch must never contain SOP, and a task branch must never contain
KB files. One shared manifest defines the hierarchy, file roles, and explanations; one shared tree component renders it in
all evaluation pages. File leaves display only the basename so long paths cannot cover the viewer, while the native tooltip
and accessible label expose the complete relative path. Selecting a leaf displays its file-specific explanation and content
in the right pane. The central `docs/eval/index.html` is a scalable catalog of evaluation folders; it must not merge every
case's file tree into one menu.

The current suite has eight non-trivial domains and three real task runs per domain. Eval 1 applies an ordinary legal notice period and an evidenced expedited
exception across compliant and violating cases. Eval 2 tests a universal scientific claim, finds a concrete counterexample,
and separately computes descriptive statistics. Eval 3 reconciles timelines and terminology across three documents and
retains rather than hides two conflicts. Eval 4 converts a short English context into direct facts, one unary implication,
and symbolic questions, then verifies direct support, derived support, and open-world unknown behavior. Eval 5 gives the
learning agent one large KB source document containing ten rule chapters and gives the analysis agent one large task
document containing ten current records. The real Codex learning run generates ten focused candidate rules plus a review
composer; a recorded review promotes them into `kb/circuits/`. A separate real Codex analysis run generates task-input SOP,
a larger root that uses the promoted KB family, and a Markdown report derived from the root execution. The root verifies 100
decisions and preserves per-rule and per-record attribution. Eval 6 generates and independently verifies a constrained
literary vignette. Eval 7 generates and independently verifies an operational incident-handoff SOP. Eval 8 generates and
independently verifies a fact-bounded contractual notice. The three text-generation cases publish both generated Markdown
and complete verifier findings. Additional runs exercise compliant, violating, boundary, conflict, unknown, explicit
supersession, generation, and independent-verification paths. Eval 5 includes a deliberate runtime refusal for an unsupported
task vocabulary value; the refusal report is retained instead of being rewritten as an agent conclusion. Unit tests execute every
committed circuit against its source data and compare exact outcomes; the HTML index exposes all inputs, circuits, results,
and READMEs.

Documentation verification regenerates `docs/specs/matrix.md`, requires contiguous DS numbers, validates local links, and
checks Mermaid availability on every HTML page. Matrix links must remain relative to preserve arbitrary static mount prefixes.
`npm run check` combines unit tests and documentation checks. Skill folders must pass the skill-creator validator.

The complete hash of files under `sop_lang_circuits_design_specs_v1/` must remain unchanged across initialization work. The integrity suite must compare the deterministic aggregate against the captured initial hash on every test run.

### Operational example

Eval 2 supplies a Markdown observation table to the coding-agent workflow. The generated `dataset.sop` stores its executable
interpretation, the counterexample circuit scans the resulting values, and the test compares public outputs with the
committed result summary. Runtime outcome is `SUCCEEDED`; semantic verdict is `REFUTED` because `-2` is a grounded witness.

Eval 4 demonstrates the natural-language boundary: a coding agent converts `Socrate is a man` and `Every man is mortal` into
`knowledge.sop`; the reusable reasoner derives `mortal(Socrate)`. The runtime does not claim to parse unrestricted English.

Eval 5 demonstrates both coding-agent transformations and deterministic scale without semantic-discovery overclaiming. One
KB document becomes `kb.data_release_governance.r01` through `.r10` plus `.review`. One task document becomes task-local data
packages and a root package that calls `.review` once for each record. The root goal checks the complete 10 × 10 product. The
fixture proves agent-authored source interpretation, reviewed promotion, explicit cross-root composition, and runtime
coverage; it does not claim automatic selection of applicable packages from prose.

## Decisions & Questions

### Question #1: Why do eval cases not replace unit tests?

Response: Coding-agent outputs may depend on agent versions and user configuration, while parser, compiler, and runtime semantics require deterministic, fast regression tests.

### Question #2: Does a `SUCCEEDED` runtime outcome prove the domain conclusion?

Response: No. It proves the explicit circuit executed successfully. Each eval separately states the semantic verdict and the
rules and evidence under which that verdict is valid; future Assurance Core would enforce the stronger acceptance gates.

### Question #3: Why does each evaluation contain both `kb/` and `task/`?

Response: An evaluation should test the same authority boundary used by a real analysis. The nested KB proves reuse and
cross-root package resolution; each nested task proves that current data, generated adaptation, and results remain local to
one run. Keeping all task runs below `evalN/` makes the complete reproduction statically browsable without merging their roles.

### Question #4: Why is the large-KB evaluation wired explicitly?

Response: The implemented runtime resolves package calls and executes graphs but does not yet perform semantic registry
search or mandatory applicability closure. Explicitly calling all ten rule packages gives a defensible 100-decision scale
test while keeping automatic discovery correctly assigned to the planned assurance contracts.

### Question #5: Who generated Eval 5's SOP and report artifacts?

Response: Codex generated the candidate KB SOP family from the single KB source during a recorded learning invocation. After
review and a namespace-only promotion adjustment, separate recorded Codex invocations generated each task-local SOP family
and its larger composition circuit. The CLI executor generated every Markdown runtime report. The repository tests rerun the
generated circuits directly; no JSON result file or agent-authored semantic report stands in for that execution.

### Question #6: Why require three task runs and one shared browser tree?

Response: Multiple inputs reveal boundaries, refusals, and conflicts that one happy-path fixture cannot. Separate workspaces
prove that generated task SOP and results do not leak across runs. One shared manifest keeps the role taxonomy identical in
all eight pages, while one Web Component gives them identical tree interaction without copied markup or rendering logic.
The hierarchy communicates ownership before selection: KB and task branches cannot visually collapse into one flat list.

## Conclusion

The project is verifiable at the deterministic kernel layer and prepared for repeatable agent-level evaluations using the same workspace topology as real tasks.
