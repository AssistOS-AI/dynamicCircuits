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

function checkSuccessfulResult(testCase, result) {
  assert.equal(result.outputs.length, 1);
  assert.match(result.receipt.outputHashes[0], /^sha256:[0-9a-f]{64}$/);
  const output = result.outputs[0];
  const expected = testCase.expect;
  assert.equal(output.sourceLocator, "input/rule.md:3");
  for (const key of ["status", "reason", "applicableMinimumDays", "reviewPath", "exceptionEligible"]) {
    if (Object.hasOwn(expected, key)) assert.deepEqual(output[key], expected[key]);
  }
  if (Object.hasOwn(expected, "writtenConsentState")) {
    assert.equal(output.evidence.writtenConsentState, expected.writtenConsentState);
  }
  assert.equal(output.exceptionEligible, output.reviewPath === "EXPEDITED_EXCEPTION");
  if (output.evidence.writtenConsentState === "MISSING") {
    assert.equal(output.evidence.writtenConsent, false);
    assert.equal(output.exceptionEligible, false);
  }
  assert.ok(result.receipt.checks.every((check) => check.ok === true));
}

function checkRefusedResult(testCase, result) {
  assert.deepEqual(result.outputs, []);
  assert.deepEqual(result.receipt.outputHashes, []);
  const refusedNode = result.receipt.nodes.find((node) => node.status === "REFUSED");
  assert.ok(refusedNode);
  assert.equal(refusedNode.refusal.code, testCase.expect.refusalCode);
  if (Object.hasOwn(testCase.expect, "refusalField")) {
    assert.equal(refusedNode.refusal.details.field, testCase.expect.refusalField);
  }
}

for (const testCase of suite.cases) {
  try {
    const result = await runtime.execute(suite.package, testCase.inputs);
    assert.notEqual(testCase.expect.outcome, "INVOCATION_ERROR");
    assert.equal(result.outcome, testCase.expect.outcome);
    assert.match(result.receipt.receiptHash, /^sha256:[0-9a-f]{64}$/);
    if (result.outcome === "SUCCEEDED") {
      checkSuccessfulResult(testCase, result);
    } else if (result.outcome === "REFUSED") {
      checkRefusedResult(testCase, result);
    } else {
      assert.fail(`Unexpected tested outcome: ${result.outcome}`);
    }
    results.push({
      name: testCase.name,
      category: testCase.category,
      outcome: result.outcome,
      semanticStatus: result.outputs[0]?.status ?? null,
      outputHash: result.receipt.outputHashes[0] ?? null,
      receiptHash: result.receipt.receiptHash,
    });
  } catch (error) {
    if (testCase.expect.outcome === "INVOCATION_ERROR") {
      try {
        assert.equal(error.code, testCase.expect.errorCode);
        results.push({
          name: testCase.name,
          category: testCase.category,
          outcome: "INVOCATION_ERROR",
          semanticStatus: null,
          outputHash: null,
          receiptHash: null,
        });
      } catch (assertionError) {
        failures.push({ name: testCase.name, message: assertionError.message });
      }
    } else {
      failures.push({ name: testCase.name, message: error.message });
    }
  }
}

function countBy(field) {
  return results.reduce((counts, result) => {
    const value = result[field];
    counts[value] = (counts[value] ?? 0) + 1;
    return counts;
  }, {});
}

process.stdout.write(`${JSON.stringify({
  schemaVersion: 1,
  total: suite.cases.length,
  passed: results.length,
  failed: failures.length,
  byOutcome: countBy("outcome"),
  bySemanticStatus: countBy("semanticStatus"),
  byCategory: countBy("category"),
  failures,
  results,
}, null, 2)}\n`);

if (failures.length > 0) process.exitCode = 1;
