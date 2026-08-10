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

### Decision ledger

| Historical decision | Maintained authority |
|---|---|
| D-001 positional calls; D-002 quoted literals; D-003 explicit formals; D-004 omitted trailing command parameters | DS004, DS011 |
| D-005 strict circuit arity; D-006 no implicit capture; D-007 local wires; D-009 multi-output circuit calls | DS010, DS005 |
| D-008 path-derived package namespaces | DS012 |
| D-010 matching separate from rule execution; D-011 restricted mandatory matchers | DS015, DS016, DS025 |
| D-012 external acceptance | DS017, DS018 |
| D-013 content-addressed receipts | DS019 |
| D-014 immutable attempts and epochs | DS013, DS020 |

### Schemas, checklists, skills, and templates

| Auxiliary source family | Maintained authority and adaptation |
|---|---|
| Assurance profile schema and template | DS017 profile fields, seven gates, conflict/trust/budget policy; DS018 trust model |
| IR schema | DS012 package, command, node, circuit-call, assurance declarations, and IR invariants |
| Receipt schema | DS019 node, circuit, closure, and final records plus canonical/privacy/replay rules |
| Workspace layout and problem template | DS003 and DS026 inferred directory modes; DS013 planned immutable attempts |
| Kernel review checklist | DS001, DS004, DS005, DS007, DS008, DS011, DS012, and DS023 |
| Template review checklist | DS014–DS016 and the candidate contract in DS006 |
| Problem acceptance checklist | DS017–DS019, DS023, and executable eval reports under `docs/eval/` |
| Kernel implementer role | DS001, DS004, DS005, DS007, DS008; repository-maintenance guidance remains read-only |
| Circuit learner role | `circuitSkills/circuit-learner`, DS006, DS014, DS026 |
| Problem solver and circuit debugger roles | `circuitSkills/analyze-task`, DS006, DS013, DS017, DS026 |
| Template/matcher author and assurance reviewer roles | `circuitSkills/author-sop-circuit`, DS014–DS018, with planned-only features labeled |
| Circuit, command, matcher, profile, and workspace templates | DS004, DS011, DS014–DS017, DS026, and current eval fixtures |
| Agent invocation templates | Relative CLI examples in README/HTML, external adapter contract in DS002/DS026 |

- The historical skill-selection rule, minimal-context rule, and stop condition are retained through concise triggering
  descriptions, progressive references, explicit workspace outcomes, and the maintained three-skill catalog.
- Templates and invocation examples are adapted into relative-path CLI examples, eval workspaces, DS004, DS014–DS017, and
  DS027. Machine-specific placeholder paths and the obsolete explicit learning switch are intentionally not preserved;
  maintained examples use paths such as `./kb` and `./work/task-001` relative to the current directory.
- The historical manifest, inventory, validation reports, and linter remain integrity evidence and are not regenerated.

The generated [specification matrix](specsLoader.html?spec=matrix.md) is the current catalog. Its links are relative so the
documentation works both at a domain root and below prefixes such as `/workspace-files/dynamicCircuits/docs/`.
