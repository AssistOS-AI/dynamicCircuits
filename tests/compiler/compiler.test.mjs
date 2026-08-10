import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { compilePackage, compileRegistry, PackageRegistry } from "../../src/index.mjs";

async function fixture(files) {
  const root = await mkdtemp(path.join(os.tmpdir(), "dc-compiler-"));
  for (const [name, content] of Object.entries(files)) {
    const target = path.join(root, name);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, content);
  }
  return root;
}

test("maps index packages and compiles nested multi-output circuits", async (context) => {
  const root = await fixture({
    "child/index.sop": "@input source\n@output copy digest\n@copy alias $source\n@digest hash $copy\n",
    "main.sop": "@input source\n@output result digest\n@result @digest kb.child $source\n",
  });
  context.after(() => rm(root, { recursive: true, force: true }));
  const registry = await PackageRegistry.fromRoots([{ path: root, prefix: "kb" }]);
  assert.deepEqual(registry.names(), ["kb.child", "kb.main"]);
  const compiled = compilePackage(registry, "kb.main");
  assert.equal(compiled.nodes[0].resolved.kind, "circuit");
  assert.equal(compiled.nodes[0].dead, false);
});

test("rejects free wires and output arity mismatches", async (context) => {
  const freeRoot = await fixture({ "main.sop": "@output result\n@result alias $missing\n" });
  context.after(() => rm(freeRoot, { recursive: true, force: true }));
  const freeRegistry = await PackageRegistry.fromRoots([freeRoot]);
  assert.throws(() => compilePackage(freeRegistry, "main"), (error) => error.code === "FREE_WIRE");

  const arityRoot = await fixture({ "main.sop": "@output one two\n@one @two value \"x\"\n" });
  context.after(() => rm(arityRoot, { recursive: true, force: true }));
  const arityRegistry = await PackageRegistry.fromRoots([arityRoot]);
  assert.throws(() => compilePackage(arityRegistry, "main"), (error) => error.code === "OUTPUT_ARITY_MISMATCH");
});

test("marks nodes outside output and assurance slices as dead", async (context) => {
  const root = await fixture({
    "main.sop": "@output result\n@unused value \"dead\"\n@result value \"live\"\n",
  });
  context.after(() => rm(root, { recursive: true, force: true }));
  const registry = await PackageRegistry.fromRoots([root]);
  const compiled = compilePackage(registry, "main");
  assert.deepEqual(compiled.nodes.map(({ dead }) => dead), [true, false]);
});

test("validates mandatory matcher targets, interfaces, triggers, and restricted commands", async (context) => {
  const validRoot = await fixture({
    "rule.sop": "@input item\n@output result\n@result alias $item\n",
    "matcher.sop": `@template mandatory
@trigger "case.item"
@apply kb.rule
@input index delta
@output matches
@items select $index "case.item"
@matches bind $items
`,
  });
  context.after(() => rm(validRoot, { recursive: true, force: true }));
  const validRegistry = await PackageRegistry.fromRoots([{ path: validRoot, prefix: "kb" }]);
  assert.doesNotThrow(() => compileRegistry(validRegistry));

  const javascriptRoot = await fixture({
    "rule.sop": "@input item\n@output result\n@result alias $item\n",
    "matcher.sop": `@template mandatory
@trigger "case.item"
@apply kb.rule
@input index delta
@output matches
@unsafe define index
    return { run() { return [] } }
@matches unsafe $index
`,
  });
  context.after(() => rm(javascriptRoot, { recursive: true, force: true }));
  const javascriptRegistry = await PackageRegistry.fromRoots([{ path: javascriptRoot, prefix: "kb" }]);
  assert.throws(() => compileRegistry(javascriptRegistry), (error) => error.code === "INVALID_MANDATORY_MATCHER");

  const mismatchRoot = await fixture({
    "rule.sop": "@input item\n@output result\n@result alias $item\n",
    "matcher.sop": `@template mandatory
@trigger "case.declared"
@apply kb.rule
@input index delta
@output matches
@items select $index "case.selected"
@matches bind $items
`,
  });
  context.after(() => rm(mismatchRoot, { recursive: true, force: true }));
  const mismatchRegistry = await PackageRegistry.fromRoots([{ path: mismatchRoot, prefix: "kb" }]);
  assert.throws(() => compileRegistry(mismatchRegistry), (error) => error.code === "INVALID_MANDATORY_MATCHER");
});
