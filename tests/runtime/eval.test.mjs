import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { PackageRegistry, SopRuntime } from "../../src/index.mjs";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const evalRoot = path.join(repositoryRoot, "docs", "eval");

async function evalRuntime(caseName) {
  const registry = await PackageRegistry.fromRoots([
    { path: path.join(evalRoot, caseName, "sop"), prefix: caseName },
  ]);
  return new SopRuntime(registry);
}

async function expectedResult(caseName) {
  return JSON.parse(await readFile(path.join(evalRoot, caseName, "results", "result.json"), "utf8"));
}

test("executes eval1 notice-period rule and exception paths", async () => {
  const runtime = await evalRuntime("eval1");
  const policy = await readFile(path.join(evalRoot, "eval1", "input", "policy.json"), "utf8");
  const cases = await readFile(path.join(evalRoot, "eval1", "input", "cases.json"), "utf8");
  const result = await runtime.execute("eval1.analysis", [policy, cases]);
  const expected = await expectedResult("eval1");
  assert.equal(result.outcome, "SUCCEEDED");
  assert.equal(result.outcome, expected.outcome);
  assert.deepEqual(result.outputs, [expected.findings, expected.stats]);
});

test("executes eval2 counterexample search without confusing mean and universal claim", async () => {
  const runtime = await evalRuntime("eval2");
  const dataset = await readFile(path.join(evalRoot, "eval2", "input", "dataset.json"), "utf8");
  const result = await runtime.execute("eval2.analysis", [dataset]);
  const expected = await expectedResult("eval2");
  assert.equal(result.outcome, expected.outcome);
  assert.deepEqual(result.outputs, [expected.verdict, expected.witness, expected.mean]);
});

test("executes eval3 repeated interpretation and cross-document conflict analysis", async () => {
  const runtime = await evalRuntime("eval3");
  const chapters = await Promise.all(["chapter-01.md", "chapter-02.md", "chapter-03.md"].map((name) => (
    readFile(path.join(evalRoot, "eval3", "input", name), "utf8")
  )));
  const result = await runtime.execute("eval3.root", chapters);
  const expected = await expectedResult("eval3");
  assert.equal(result.outcome, expected.outcome);
  assert.deepEqual(result.outputs[0], expected.report);
});
