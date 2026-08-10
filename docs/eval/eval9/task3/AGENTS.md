<!-- managed-by: dynamic-circuits -->
# Dynamic Circuits Analysis Workspace

Analyze every file listed in `.dynamic-circuits/input-manifest.json`. Read the applicable skills through the `circuitSkills` symbolic link before authoring or executing SOP Lang.

The semantic source boundary for this run is strict: read task evidence and requests from `input/`, executable reusable knowledge from the configured KB `circuits/`, and only the project skills/runtime documentation needed to author valid SOP. Do not inspect evaluation expectations, prior results, evaluation README or HTML pages, KB candidates, KB learning reports, or sibling task workspaces. If such content is encountered accidentally, do not use it to construct the circuit.

Load reviewed reusable circuits from "/home/salboaie/work/dynamicCircuits/docs/eval/eval9/kb/circuits". Treat the analysis as four explicit symbolic stages:

1. Translate the human-readable task sources into one or more task-local SOP packages under `sop/task/`. These packages represent the task request and current facts; they must not duplicate policy logic already supplied by KB circuits.
2. Inspect reviewed `kb.*` metadata. For every applicable `@template mandatory` matcher, publish the current values under its exact `@trigger` semantic keys and do not call its `@apply` target manually. Explicitly invoke applicable optional or legacy packages that have no mandatory matcher.
3. Create the larger no-input root package `task.analysis` under `sop/task/analysis.sop`. It must obtain task values from those input packages and expose task outputs plus semantic publications as public outputs.
4. Compile and test `task.analysis`, including the mandatory closure section. After the coding agent exits, the CLI executes this fixed entrypoint and writes `results/runtime-result.md` directly from runtime outputs and receipts.

SOP files are executable intermediate artifacts, not the user-facing report. Do not create `result.json`, and do not write a semantic result report. The coding agent may write `results/agent-summary.md` only as a provenance journal covering input coverage, generated packages, compile/test attempts, assumptions, and limitations. It is not an analysis result and must not restate or reinterpret the circuit verdict. The executor-owned `runtime-result.md` is the only authoritative run result.

Treat the knowledge base as read-only. Keep every generated artifact in this workspace. Record reusable discoveries in the report; do not write KB candidates during a task analysis.

Report unsupported inputs, ambiguity, refusal, and execution errors explicitly. Never claim that a circuit ran when it only exists as source, and never substitute a hand-written report for a failed or skipped circuit execution.
