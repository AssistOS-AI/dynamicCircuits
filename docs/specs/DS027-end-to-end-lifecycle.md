---
id: DS027
title: End-to-End Lifecycle and Reference Flows
status: active
owner: repository
summary: Defines the complete source-to-certificate lifecycle and legal, scientific, cross-document, and contextual reasoning reference flows.
---

# DS027 End-to-End Lifecycle and Reference Flows

## Introduction

The lifecycle connects source ingestion, interpretation, reusable knowledge, execution, assurance, repair, and publication.
It also states where the current CLI stops and where planned Assurance Core behavior begins.

This specification integrates the preceding contracts into one source-to-result flow. Workspace and agent behavior comes
from DS003 and DS026, executable graph behavior from DS004–DS005, and the planned discovery-to-certificate stages from
DS014–DS021. It must never hide the boundary between agent-authored interpretation and runtime-verified execution.

## Core Content

### Phases A–I

**A. Ingest:** capture immutable source artifacts, media types, locators, digests, origin, access policy, and epoch. **B.
Interpret:** run source-specific circuits that publish canonical facts and claims with span provenance and uncertainty.
**C. Discover:** query the registry for candidate templates, then execute deterministic matchers. **D. Wire:** instantiate
selected templates with explicit bindings and compile the combined SSA graph.

**E. Execute:** schedule the relevant dependency slice, enforce effects and budgets, and emit node/circuit receipts.
**F. Close:** repeat mandatory matching and execution to a verified fixed point. **G. Assure:** evaluate checks, invariants,
goals, trust, conflicts, capabilities, and profile gates. **H. Repair:** if refused, rejected, inconclusive, or erroneous,
diagnose from receipts and create an immutable child attempt with the smallest semantic change. **I. Publish:** on acceptance,
emit reports, artifacts, and a final receipt/certificate; otherwise publish the classified failure without pretending success.

The present version automates workspace preparation, external coding-agent invocation, explicit circuit compilation and
execution, local checks/invariants, and runtime receipts. Agents currently perform document interpretation and report
assembly in files. Registry discovery, automatic wiring, closure, profiles, attempts, and certificates remain planned.

### Reference flows

In a legal notice-period task, sources publish event dates and policy text; a rule circuit computes the ordinary deadline;
an exception matcher detects an accepted expedited request; the exception circuit changes the applicable period; checks
validate dates; the goal verifier classifies each case; receipts retain both base rule and exception evidence. Missing
acceptance proof must refuse or remain inconclusive, not assume the exception.

In a scientific universal-claim task, interpretation publishes observations and claim scope; a counterexample circuit
searches every observation; one non-positive value refutes “all values are positive”; aggregation may still report a mean
but cannot rescue the universal claim. Provenance identifies the witness observation and dataset digest.

In a cross-document review, section circuits publish launch dates and definitions; synthesis groups claims by subject;
comparison circuits expose incompatible values; the outcome reports conflicts rather than choosing an arbitrary chapter.

In a short contextual-reasoning task, a coding agent interprets English facts, unary implications, and questions into an
explicit SOP knowledge package. A reusable reasoner computes fixed-point closure, distinguishes direct from derived support,
and keeps absent propositions `UNKNOWN`. The runtime verifies the generated symbolic representation; it does not parse
unrestricted English itself. A fifth flow applies ten reviewed KB rule packages to ten current records and verifies the
explicit 100-decision cross-product. In that fifth flow, one large KB document is transformed by a real learning-agent run
into focused candidate SOP packages, reviewed packages are promoted into the KB, and one large task document is transformed
by a separate analysis-agent run into task-data SOP plus a larger composition circuit. The coding agent writes the Markdown
report only after executing that circuit. These five flows are executable current evals under `docs/eval/`, with stronger future
assurance gates labeled as such.

Operational example: Eval 3 starts with three Markdown chapters. The committed interpreter circuit extracts each chapter's
launch date and term definition, the synthesis circuit compares those values, and the result reports both conflicts with
source labels. Current execution proves that this explicit comparison graph ran. A future strict run must additionally prove
that every chapter in the epoch and every mandatory consistency matcher was covered before issuing acceptance.

## Decisions & Questions

### Question #1: Why keep failed attempts in the lifecycle?

Response: They contain evidence about missing rules, bad assumptions, and changed logic and are essential for reproducible
repair and comparison.

### Question #2: When may the system publish a partial report?

Response: When policy permits a clearly labeled non-accepted artifact that preserves refusals, conflicts, and incomplete
obligations; it must never carry an acceptance certificate.

## Conclusion

The lifecycle makes every transition—from source bytes to a qualified result—explicit, receipt-bearing, and honest about
which assurance stages are implemented today.
