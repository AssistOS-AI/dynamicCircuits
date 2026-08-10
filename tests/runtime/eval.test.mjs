import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { PackageRegistry, SopRuntime } from "../../src/index.mjs";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

test("executes eval1 with a reusable KB circuit", async () => {
  const registry = await PackageRegistry.fromRoots([
    { path: path.join(repositoryRoot, "kb", "circuits"), prefix: "kb" },
    { path: path.join(repositoryRoot, "eval", "eval1", "sop"), prefix: "task" },
  ]);
  const result = await new SopRuntime(registry).execute("task.analysis", ["4", "7"]);
  assert.equal(result.outcome, "SUCCEEDED");
  assert.deepEqual(result.outputs, [11]);
});
