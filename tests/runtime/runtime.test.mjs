import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { PackageRegistry, SopRuntime } from "../../src/index.mjs";

async function runtimeFor(context, files) {
  const root = await mkdtemp(path.join(os.tmpdir(), "dc-runtime-"));
  context.after(() => rm(root, { recursive: true, force: true }));
  for (const [name, source] of Object.entries(files)) {
    const target = path.join(root, name);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, source);
  }
  return new SopRuntime(await PackageRegistry.fromRoots([{ path: root, prefix: "test" }]));
}

test("executes commands, missing positional parameters, checks, and nested circuits", async (context) => {
  const runtime = await runtimeFor(context, {
    "double.sop": `@input value
@output doubled
@double define value optional
    async function run({ value, optional }) {
      if (optional !== undefined) throw new Error("unexpected optional")
      return value * 2
    }
    async function check({ value }, output) { return output === value * 2 }
    return { run, check }
@doubled double $value
`,
    "main.sop": `@input raw
@output result
@number parseNumber $raw
@result test.double $number
`,
  });
  const result = await runtime.execute("test.main", ["21"]);
  assert.equal(result.outcome, "SUCCEEDED");
  assert.deepEqual(result.outputs, [42]);
  assert.match(result.receipt.receiptHash, /^sha256:/);
});

test("distinguishes refusal, check failure, and exception", async (context) => {
  const runtime = await runtimeFor(context, {
    "refusal.sop": "@input raw\n@output number\n@number parseNumber $raw\n",
    "check.sop": `@output value
@broken define
    function run() { return 1 }
    function check() { return false }
    return { run, check }
@value broken
`,
    "error.sop": `@output value
@broken define
    function run() { throw new Error("boom") }
    return { run }
@value broken
`,
  });
  assert.equal((await runtime.execute("test.refusal", ["NaN"])).outcome, "REFUSED");
  assert.equal((await runtime.execute("test.check")).outcome, "REJECTED");
  assert.equal((await runtime.execute("test.error")).outcome, "ERROR");
});

test("rejects a false invariant and does not expose outputs", async (context) => {
  const runtime = await runtimeFor(context, {
    "main.sop": `@output result
@invariant valid covers result
@result value "answer"
@condition equal $result "different"
@valid assertInvariant $condition "must-match"
`,
  });
  const result = await runtime.execute("test.main");
  assert.equal(result.outcome, "REJECTED");
  assert.deepEqual(result.outputs, []);
});

test("turns invalid core inputs into refusals and command initialization timeouts into errors", async (context) => {
  const runtime = await runtimeFor(context, {
    "core_error.sop": "@input raw\n@output result\n@result append $raw \"item\"\n",
    "timeout.sop": `@output result
@hang define
    while (true) {}
    return { run() { return true } }
@result hang
`,
  });
  runtime.timeoutMs = 20;
  assert.equal((await runtime.execute("test.core_error", [{}])).outcome, "REFUSED");
  assert.equal((await runtime.execute("test.timeout")).outcome, "ERROR");
});

test("propagates child refusal and rejection without exposing child outputs", async (context) => {
  const runtime = await runtimeFor(context, {
    "refusing.sop": "@input raw\n@output number\n@number parseNumber $raw\n",
    "parent_refusal.sop": "@input raw\n@output number\n@number test.refusing $raw\n",
    "rejecting.sop": `@output result
@invariant valid covers result
@result value "answer"
@same equal $result "different"
@valid assertInvariant $same "same"
`,
    "parent_rejection.sop": "@output result\n@result test.rejecting\n",
  });
  const refusal = await runtime.execute("test.parent_refusal", ["invalid"]);
  assert.equal(refusal.outcome, "REFUSED");
  assert.deepEqual(refusal.outputs, []);
  const rejection = await runtime.execute("test.parent_rejection");
  assert.equal(rejection.outcome, "REJECTED");
  assert.deepEqual(rejection.outputs, []);
});
