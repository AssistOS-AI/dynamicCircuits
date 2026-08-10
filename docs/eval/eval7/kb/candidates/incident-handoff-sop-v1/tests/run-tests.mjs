import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { PackageRegistry, SopRuntime } from "../../../../../../../src/index.mjs";

const testDir = path.dirname(fileURLToPath(import.meta.url));
const sopRoot = path.resolve(testDir, "../sop");
const runtime = new SopRuntime(await PackageRegistry.fromRoots([{ path: sopRoot, prefix: "candidate" }]));

const baseBrief = {
  documentTitle: "Payments API SEV-1 Handoff",
  service: "Payments API",
  severity: "SEV-1",
  incidentCommanderRole: "Incident Commander",
  outgoingRole: "Primary On-call",
  incomingRole: "Relief On-call",
  acknowledgementMinutes: 5,
  escalationMinutes: 15,
  evidenceLocations: ["https://status.example/inc-42", "s3://incident-evidence/inc-42"],
  communicationChannel: "#inc-payments",
  prohibitedAction: "restart the ledger database",
  approvalRole: "Database Duty Manager",
};

const results = [];

async function exercise(id, packageName, inputs, expectedOutcome, inspect = () => {}) {
  const result = await runtime.execute(packageName, inputs);
  assert.equal(result.outcome, expectedOutcome, id);
  assert.match(result.receipt.receiptHash, /^sha256:[a-f0-9]{64}$/, `${id}: receipt hash`);
  if (expectedOutcome === "SUCCEEDED") {
    assert.equal(result.receipt.outputHashes.length, result.outputs.length, `${id}: output hashes`);
    assert.ok(result.receipt.outputHashes.every((value) => /^sha256:[a-f0-9]{64}$/.test(value)), `${id}: canonical output hashes`);
  } else {
    assert.deepEqual(result.outputs, [], `${id}: failed outcomes expose no outputs`);
    assert.deepEqual(result.receipt.outputHashes, [], `${id}: failed outcomes expose no output hashes`);
  }
  inspect(result);
  results.push({ id, package: packageName, outcome: result.outcome, receiptHash: result.receipt.receiptHash });
  return result;
}

const generated = await exercise("positive_generator", "candidate.generator", [baseBrief], "SUCCEEDED", (result) => {
  assert.equal(typeof result.outputs[0], "string");
  assert.match(result.outputs[0], /^# Payments API SEV-1 Handoff/m);
});
const markdown = generated.outputs[0];

await exercise("positive_verifier", "candidate.verifier", [baseBrief, markdown], "SUCCEEDED", (result) => {
  assert.equal(result.outputs[0].ok, true);
  assert.deepEqual(result.outputs[0].missing, []);
  assert.equal(result.outputs[0].checks.length, 12);
  assert.deepEqual(result.outputs[0].measuredCounts, {
    headingCount: 9,
    numberedStepCount: 7,
    expectedRoleCount: 4,
    presentRoleCount: 4,
    expectedEvidenceLocationCount: 2,
    presentEvidenceLocationCount: 2,
    completionChecklistItemCount: 5,
  });
});

await exercise("positive_composition", "candidate.analysis", [baseBrief], "SUCCEEDED", (result) => {
  assert.equal(result.outputs[1].ok, true);
  assert.equal(result.receipt.checks.length, 1);
  assert.equal(result.receipt.checks[0].ok, true);
  assert.equal(result.receipt.nodes.filter((node) => node.childReceipt).length, 2);
});

await exercise(
  "negative_missing_checklist",
  "candidate.verifier",
  [baseBrief, markdown.replace("- [ ] Incoming sign-off\n", "")],
  "SUCCEEDED",
  (result) => {
    assert.equal(result.outputs[0].ok, false);
    assert.deepEqual(result.outputs[0].missing, ["completionChecklist"]);
    assert.equal(result.outputs[0].measuredCounts.completionChecklistItemCount, 4);
  },
);

await exercise("negative_extra_heading", "candidate.verifier", [baseBrief, `${markdown}\n## Unexpected`], "SUCCEEDED", (result) => {
  assert.equal(result.outputs[0].ok, false);
  assert.ok(result.outputs[0].missing.includes("headingOrder"));
});

await exercise(
  "boundary_fractional_deadlines",
  "candidate.analysis",
  [{ ...baseBrief, acknowledgementMinutes: 0.5, escalationMinutes: 0.75 }],
  "SUCCEEDED",
  (result) => assert.equal(result.outputs[1].ok, true),
);

await exercise("exception_named_approval_only", "candidate.generator", [baseBrief], "SUCCEEDED", (result) => {
  assert.ok(result.outputs[0].includes("Only Database Duty Manager may approve an override to this MUST NOT rule."));
});

await exercise("malformed_non_object", "candidate.generator", ["not-an-object"], "REFUSED");
await exercise("malformed_evidence_member", "candidate.generator", [{ ...baseBrief, evidenceLocations: [42] }], "REFUSED");
await exercise("refusal_zero_ack", "candidate.generator", [{ ...baseBrief, acknowledgementMinutes: 0 }], "REFUSED");
await exercise("refusal_equal_deadlines", "candidate.generator", [{ ...baseBrief, escalationMinutes: 5 }], "REFUSED");
await exercise("refusal_multiline_value", "candidate.generator", [{ ...baseBrief, documentTitle: "Unsafe\n## Injected" }], "REFUSED");
await exercise("refusal_non_string_markdown", "candidate.verifier", [baseBrief, 17], "REFUSED");

const metrics = {
  total: results.length,
  succeeded: results.filter(({ outcome }) => outcome === "SUCCEEDED").length,
  refused: results.filter(({ outcome }) => outcome === "REFUSED").length,
  rejected: results.filter(({ outcome }) => outcome === "REJECTED").length,
  errors: results.filter(({ outcome }) => outcome === "ERROR").length,
};

process.stdout.write(`${JSON.stringify({ metrics, cases: results }, null, 2)}\n`);
