#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

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

function assertExpected(output, expected) {
  if (Object.hasOwn(expected, "reviewVerdict")) assert.equal(output.reviewVerdict, expected.reviewVerdict);
  if (Object.hasOwn(expected, "launchDateStatus")) assert.equal(output.launchDateFinding.status, expected.launchDateStatus);
  if (Object.hasOwn(expected, "launchDateReason")) assert.equal(output.launchDateFinding.reason, expected.launchDateReason);
  if (Object.hasOwn(expected, "conflictingTermKeys")) assert.deepEqual(output.conflictingTermKeys, expected.conflictingTermKeys);
  if (Object.hasOwn(expected, "unknownTermKeys")) assert.deepEqual(output.unknownTermKeys, expected.unknownTermKeys);
  if (Object.hasOwn(expected, "activeDateKeys")) assert.deepEqual(output.launchDateFinding.distinctActiveDateKeys, expected.activeDateKeys);
  if (Object.hasOwn(expected, "chaptersWithoutDate")) assert.deepEqual(output.launchDateFinding.chaptersWithoutDate, expected.chaptersWithoutDate);
  if (Object.hasOwn(expected, "supersessionCount")) assert.equal(output.launchDateFinding.supersessions.length, expected.supersessionCount);
  if (Object.hasOwn(expected, "uncertaintyPreserved")) assert.equal(output.uncertaintyPreserved, expected.uncertaintyPreserved);
  if (Object.hasOwn(expected, "termSources")) {
    const finding = output.termFindings.find((item) => item.termKey === expected.termSources.termKey);
    assert.ok(finding);
    assert.deepEqual(finding.sourceChapters, expected.termSources.sourceChapters);
  }
  assert.equal(output.preferredLaunchDate, null);
  assert.deepEqual(output.preferredDefinitions, []);
  assert.deepEqual(output.sourceLocators, ["input/review-rules.md:3"]);
}

for (const testCase of suite.cases) {
  try {
    const result = await runtime.execute("release_plan_consistency.review", testCase.inputs);
    assert.equal(result.outcome, testCase.expect.outcome);
    assert.match(result.receipt.receiptHash, /^sha256:[0-9a-f]{64}$/);
    if (result.outcome === "SUCCEEDED") {
      assert.equal(result.outputs.length, 1);
      assert.match(result.receipt.outputHashes[0], /^sha256:[0-9a-f]{64}$/);
      assertExpected(result.outputs[0], testCase.expect);
    } else {
      assert.deepEqual(result.outputs, []);
      assert.deepEqual(result.receipt.outputHashes, []);
    }
    results.push({
      name: testCase.name,
      category: testCase.category,
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
