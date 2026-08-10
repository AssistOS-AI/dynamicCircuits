import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { PackageRegistry, SopRuntime } from "../../src/index.mjs";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const evalRoot = path.join(repositoryRoot, "docs", "eval");

async function evalRuntime(caseName) {
  const registry = await PackageRegistry.fromRoots([
    { path: path.join(evalRoot, caseName, "kb", "circuits"), prefix: "kb" },
    { path: path.join(evalRoot, caseName, "task", "sop"), prefix: "" },
  ]);
  return new SopRuntime(registry);
}

test("executes eval1 notice-period rule and exception paths", async () => {
  const runtime = await evalRuntime("eval1");
  const result = await runtime.execute("task.analysis", []);
  assert.equal(result.outcome, "SUCCEEDED");
  const [analysis, coverage] = result.outputs;
  assert.deepEqual(analysis.findings.map(({ caseId, applicableMinimumDays, exceptionUsed, compliant }) => ({ caseId, applicableMinimumDays, exceptionUsed, compliant })), [
    { caseId: "A", applicableMinimumDays: 30, exceptionUsed: false, compliant: false },
    { caseId: "B", applicableMinimumDays: 10, exceptionUsed: true, compliant: true },
    { caseId: "C", applicableMinimumDays: 30, exceptionUsed: false, compliant: true },
  ]);
  assert.deepEqual(analysis.counts, { total: 3, compliant: 2, nonCompliant: 1, exceptionUsed: 1 });
  assert.equal(coverage.allCasesCovered, true);
});

test("executes eval2 counterexample search without confusing mean and universal claim", async () => {
  const runtime = await evalRuntime("eval2");
  const result = await runtime.execute("task.analysis", []);
  const [review, observations] = result.outputs;
  assert.equal(result.outcome, "SUCCEEDED");
  assert.equal(review.verdict, "REFUTED");
  assert.equal(review.aggregate.mean, 5.25);
  assert.deepEqual(review.witness, { id: "observation-4", value: -2, source: { path: "dataset.md", locator: "Observation table: Position 4" } });
  assert.equal(observations.length, 8);
});

test("executes eval3 repeated interpretation and cross-document conflict analysis", async () => {
  const runtime = await evalRuntime("eval3");
  const result = await runtime.execute("task.analysis", []);
  const [report] = result.outputs;
  assert.equal(result.outcome, "SUCCEEDED");
  assert.equal(report.reviewVerdict, "CONFLICT");
  assert.equal(report.launchDateFinding.status, "CONFLICT");
  assert.deepEqual(report.launchDateFinding.distinctActiveDateKeys, ["2026-06-15", "2026-07-01"]);
  assert.deepEqual(report.conflictingTermKeys, ["node"]);
  assert.equal(report.preferredLaunchDate, null);
  assert.deepEqual(report.preferredDefinitions, []);
});

test("executes eval4 direct, derived, and unknown context questions", async () => {
  const runtime = await evalRuntime("eval4");
  const result = await runtime.execute("task.analysis", []);
  assert.equal(result.outcome, "SUCCEEDED");
  const statuses = result.outputs[0].answers.map(({ result: answer }) => answer.status);
  assert.deepEqual(statuses, ["SUPPORTED", "SUPPORTED", "UNKNOWN"]);
  assert.equal(result.outputs[0].answers[0].result.querySupport.supportMode, "DIRECT");
  assert.equal(result.outputs[0].answers[1].result.querySupport.supportMode, "DERIVED");
});

test("executes eval5 ten-rule by ten-record coverage", async () => {
  const runtime = await evalRuntime("eval5");
  const result = await runtime.execute("task.analysis", []);
  const [report, analysis] = result.outputs;

  assert.equal(result.outcome, "SUCCEEDED");
  assert.match(report, /# Data Release Governance Review/);
  assert.deepEqual(analysis.aggregateCounts, { passCount: 90, failCount: 10, compliantRecordCount: 1, nonCompliantRecordCount: 9 });
  assert.equal(analysis.inputCoverage.retainedFindingCount, 100);
  assert.equal(analysis.releases.length, 10);
  assert.ok(analysis.releases.every((review) => review.findings.length === 10));
  assert.deepEqual(
    analysis.releases.map(({ releaseIdentifier, failedRuleIdentifiers }) => ({
      releaseIdentifier,
      failedRuleIdentifiers,
    })),
    [
      { releaseIdentifier: "REL-01", failedRuleIdentifiers: [] },
      { releaseIdentifier: "REL-02", failedRuleIdentifiers: ["R01", "R08"] },
      { releaseIdentifier: "REL-03", failedRuleIdentifiers: ["R02"] },
      { releaseIdentifier: "REL-04", failedRuleIdentifiers: ["R03"] },
      { releaseIdentifier: "REL-05", failedRuleIdentifiers: ["R04"] },
      { releaseIdentifier: "REL-06", failedRuleIdentifiers: ["R05"] },
      { releaseIdentifier: "REL-07", failedRuleIdentifiers: ["R06"] },
      { releaseIdentifier: "REL-08", failedRuleIdentifiers: ["R07"] },
      { releaseIdentifier: "REL-09", failedRuleIdentifiers: ["R09"] },
      { releaseIdentifier: "REL-10", failedRuleIdentifiers: ["R10"] },
    ],
  );
  assert.match(result.receipt.receiptHash, /^sha256:[a-f0-9]{64}$/);
});

test("executes eval6 literary generation and preserves the verifier failure", async () => {
  const result = await (await evalRuntime("eval6")).execute("task.analysis", []);
  const [markdown, verification] = result.outputs;
  assert.equal(result.outcome, "SUCCEEDED");
  assert.match(markdown, /^# The Brass Observatory/m);
  assert.match(markdown, /snow settling inside the open dome like a new map$/);
  assert.equal(verification.ok, false);
  assert.equal(verification.counts.words, 226);
  assert.deepEqual(verification.missingRequirements, ["word-count:90..220"]);
  assert.equal(verification.checks.filter(({ ok }) => !ok).length, 1);
});

test("executes eval7 SOP generation and independent verification", async () => {
  const result = await (await evalRuntime("eval7")).execute("task.analysis", []);
  const [markdown, verification] = result.outputs;
  assert.equal(result.outcome, "SUCCEEDED");
  assert.match(markdown, /^# Payment API SEV-1 Shift Handoff/m);
  assert.match(markdown, /MUST NOT deploy or roll back production changes during handoff/);
  assert.equal(verification.ok, true);
  assert.ok(verification.checks.every(({ ok }) => ok));
  assert.equal(verification.measuredCounts.numberedStepCount, 7);
  assert.equal(verification.measuredCounts.completionChecklistItemCount, 5);
});

test("executes eval8 legal-notice generation and independent verification", async () => {
  const result = await (await evalRuntime("eval8")).execute("task.analysis", []);
  const [notice, verification] = result.outputs;
  assert.equal(result.outcome, "SUCCEEDED");
  assert.match(notice, /^# Contractual Breach Notice/m);
  assert.match(notice, /This generated document is not legal advice/);
  assert.equal(verification.ok, true);
  assert.ok(Object.values(verification.checks).every(Boolean));
  assert.deepEqual(verification.missingItems, []);
  assert.deepEqual(verification.prohibitedAdditions, []);
});
