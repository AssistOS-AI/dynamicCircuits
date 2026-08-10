import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const testsDir = path.dirname(fileURLToPath(import.meta.url));
const candidateRoot = path.dirname(testsDir);
const repositoryRoot = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.resolve(candidateRoot, "../../../../../..");
const sopRoot = path.join(candidateRoot, "sop");
const packageName = "candidate.universal_positive_review";
const fixture = JSON.parse(readFileSync(path.join(testsDir, "cases.json"), "utf8"));
const runtimeModule = await import(pathToFileURL(path.join(repositoryRoot, "src", "index.mjs")));
const { compileRegistry, PackageRegistry, SopRuntime } = runtimeModule;

const registry = await PackageRegistry.fromRoots([{ path: sopRoot, prefix: "candidate" }]);
const compiled = compileRegistry(registry).get(packageName);
assert.ok(compiled);
assert.equal(compiled.packageName, packageName);
assert.deepEqual(compiled.inputs, ["observations"]);
assert.deepEqual(compiled.outputs, ["review"]);
const runtime = new SopRuntime(registry);

const recorded = [];
for (const testCase of fixture.cases) {
  const result = await runtime.execute(packageName, [testCase.observations]);
  assert.equal(result.outcome, testCase.expectedOutcome, testCase.id);
  assert.match(result.receipt.receiptHash, /^sha256:/, testCase.id);

  if (result.outcome === "SUCCEEDED") {
    assert.deepEqual(result.outputs, [testCase.expectedOutput], testCase.id);
    assert.equal(result.receipt.checks.length, 1, testCase.id);
    assert.equal(result.receipt.checks[0].kind, "invariant", testCase.id);
    assert.equal(result.receipt.checks[0].ok, true, testCase.id);
    assert.equal(result.receipt.outputHashes.length, 1, testCase.id);
    assert.match(result.receipt.outputHashes[0], /^sha256:/, testCase.id);
  } else {
    assert.deepEqual(result.outputs, [], testCase.id);
    assert.deepEqual(result.receipt.outputHashes, [], testCase.id);
    const refusal = result.receipt.nodes.find((node) => node.status === "REFUSED")?.refusal;
    assert.equal(refusal?.code, testCase.expectedRefusalCode, testCase.id);
  }

  recorded.push({
    id: testCase.id,
    category: testCase.category,
    outcome: result.outcome,
    refusalCode: result.receipt.nodes.find((node) => node.status === "REFUSED")?.refusal?.code ?? null,
    publicOutputHash: result.receipt.outputHashes[0] ?? null,
    receiptHash: result.receipt.receiptHash,
  });
}

process.stdout.write(`${JSON.stringify({
  packageName,
  packageHash: compiled.packageHash,
  compile: "passed",
  cases: recorded,
  passed: recorded.length,
  failed: 0,
}, null, 2)}\n`);
