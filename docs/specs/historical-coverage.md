# Historical Design Coverage

This index maps every immutable design document in `sop_lang_circuits_design_specs_v1/` to its maintained specification.
The historical folder remains unchanged and is verified by aggregate hash. Current documents adapt terminology to the
implemented CLI and clearly mark planned behavior; a mapping does not imply that every planned feature is implemented.

| Historical source | Maintained authority | Coverage note |
|---|---|---|
| DS-001 Vision, scope, non-goals | DS000 | Product boundary, guarantees, domains, success criteria |
| DS-002 Terminology | DS009 | Full conceptual vocabulary and distinctions |
| DS-003 Surface syntax | DS004 | Lexical grammar, declarations, directives, diagnostics |
| DS-004 Wires/values/SSA | DS010 | Canonical values, identity, binding, composition |
| DS-005 Command ABI | DS011 | ABI, effects, capabilities, refusal and errors |
| DS-006 Circuit files/calls | DS010, DS005 | Interfaces, instances, nesting, relevant slice |
| DS-007 Packages/resolution | DS012 | Package identity, imports, resolution and cycles |
| DS-008 Compiler IR | DS012, DS005 | Normalized IR and static validation |
| DS-009 Execution/attempts | DS013 | States, scheduling, repair, budget, checkpoint |
| DS-010 Templates/KB | DS014, DS006 | Executable KB, metadata, promotion, versioning |
| DS-011 Semantic matching | DS015 | Fact index, tri-state matchers, deterministic wiring |
| DS-012 Mandatory closure | DS016 | Fixed point, monotonicity, completeness audit |
| DS-013 Goals/acceptance | DS017 | Checks, invariants, profiles and seven gates |
| DS-014 Correctness/trust | DS018 | Conditional claims, TCB, trust states, residual risk |
| DS-015 Receipts/audit | DS019 | Receipt hierarchy, provenance, replay, privacy |
| DS-016 Cache/epochs | DS020 | Semantic keys, invalidation, incremental closure |
| DS-017 Scale/large docs | DS021 | Registry layers, sharding, section synthesis |
| DS-018 Security | DS008, DS011, DS018 | Sandbox, effects, brokers, injection and trust |
| DS-019 Core commands | DS022 | Implemented Core and planned Assurance Core |
| DS-020 Conformance | DS007, DS023 | Deterministic tests, evals, adversarial and scale suites |
| DS-021 Roadmap/modules | DS024 | Eleven milestones and module boundaries |
| DS-022 Alternatives | DS025 | Compared paradigms, hybrid rationale, rejected choices |
| DS-023 Agent API | DS003, DS026 | Filesystem protocol, inferred modes, future operations |
| DS-024 Lifecycle | DS027 | Phases A–I and reference legal/scientific flows |

Auxiliary historical sources are covered as follows:

- `DECISIONS.md` decisions D001–D014 are distributed across DS004, DS005, DS009–DS020, and DS025.
- Assurance, IR, receipt, and workspace schemas are represented by DS017, DS012, DS019, DS003, and DS026.
- Kernel, template, and acceptance checklists inform DS007, DS014, DS017, DS018, and DS023.
- Six historical agent roles map to the maintained `circuitSkills` catalog through DS006 and DS026.
- Templates and invocation examples are adapted into relative-path CLI examples, eval workspaces, DS004, DS014–DS017, and
  DS027. Literal `/path/to/...` placeholders and the obsolete explicit learn switch are intentionally not preserved.
- The historical manifest, inventory, validation reports, and linter remain integrity evidence and are not regenerated.

The generated [specification matrix](specsLoader.html?spec=matrix.md) is the current catalog. Its links are relative so the
documentation works both at a domain root and below prefixes such as `/workspace-files/dynamicCircuits/docs/`.
