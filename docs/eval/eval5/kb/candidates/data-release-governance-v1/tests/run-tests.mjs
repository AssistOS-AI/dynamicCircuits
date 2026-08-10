#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

const projectRoot = process.argv[2];
if (!projectRoot) {
  throw new Error("Usage: node tests/run-tests.mjs PATH_TO_DYNAMIC_CIRCUITS_REPOSITORY");
}

const candidateRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const runtimeModule = await import(pathToFileURL(path.resolve(projectRoot, "src/index.mjs")));
const { PackageRegistry, SopRuntime } = runtimeModule;
const registry = await PackageRegistry.fromRoots([
  { path: path.join(candidateRoot, "sop"), prefix: "" },
]);
const runtime = new SopRuntime(registry);
const suite = JSON.parse(await readFile(path.join(candidateRoot, "tests/cases.json"), "utf8"));
const results = [];
const failures = [];

function checkExpectedOutput(testCase, output, receipt) {
  const expected = testCase.expect;
  if (testCase.package.endsWith(".review")) {
    assert.equal(output.findings.length, 10);
    assert.deepEqual(output.findings.map((finding) => finding.ruleId),
      ["R01", "R02", "R03", "R04", "R05", "R06", "R07", "R08", "R09", "R10"]);
    assert.ok(output.findings.every((finding) => finding.sourceLocator.startsWith("input/knowledge-base.md:")));
    for (const key of ["passCount", "failCount", "compliant", "failedRuleIdentifiers"]) {
      if (Object.hasOwn(expected, key)) assert.deepEqual(output[key], expected[key]);
    }
    const nestedNodes = receipt.nodes.filter((node) => node.callee.startsWith("data_release_governance.r"));
    assert.equal(nestedNodes.length, 10);
    assert.ok(nestedNodes.every((node) => node.status === "SUCCEEDED"));
    assert.ok(nestedNodes.every((node) => node.childReceipt?.outcome === "SUCCEEDED"));
    assert.ok(nestedNodes.every((node) => /^sha256:[0-9a-f]{64}$/.test(node.childReceipt?.receiptHash)));
    assert.ok(nestedNodes.every((node) => node.childReceipt?.outputHashes.length === 1));
    return;
  }
  assert.equal(output.sourceLocator.startsWith("input/knowledge-base.md:"), true);
  for (const key of ["ruleId", "status", "reason", "path"]) {
    if (Object.hasOwn(expected, key)) assert.deepEqual(output[key], expected[key]);
  }
}

for (const testCase of suite.cases) {
  try {
    const result = await runtime.execute(testCase.package, testCase.inputs);
    assert.equal(result.outcome, testCase.expect.outcome);
    assert.match(result.receipt.receiptHash, /^sha256:[0-9a-f]{64}$/);
    if (result.outcome === "SUCCEEDED") {
      assert.equal(result.outputs.length, 1);
      assert.match(result.receipt.outputHashes[0], /^sha256:[0-9a-f]{64}$/);
      checkExpectedOutput(testCase, result.outputs[0], result.receipt);
    } else {
      assert.deepEqual(result.outputs, []);
    }
    results.push({
      name: testCase.name,
      category: testCase.category,
      package: testCase.package,
      outcome: result.outcome,
      outputHash: result.receipt.outputHashes[0] ?? null,
      receiptHash: result.receipt.receiptHash,
    });
  } catch (error) {
    failures.push({ name: testCase.name, message: error.message });
  }
}

const byOutcome = results.reduce((counts, result) => {
  counts[result.outcome] = (counts[result.outcome] ?? 0) + 1;
  return counts;
}, {});
const byCategory = results.reduce((counts, result) => {
  counts[result.category] = (counts[result.category] ?? 0) + 1;
  return counts;
}, {});

process.stdout.write(`${JSON.stringify({
  schemaVersion: 1,
  total: suite.cases.length,
  passed: results.length,
  failed: failures.length,
  byOutcome,
  byCategory,
  failures,
  results,
}, null, 2)}\n`);

if (failures.length > 0) process.exitCode = 1;
