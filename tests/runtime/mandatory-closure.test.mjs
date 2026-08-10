import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  executeWithMandatoryClosure,
  PackageRegistry,
  SopRuntime,
} from "../../src/index.mjs";

async function closureRuntime(context, files) {
  const root = await mkdtemp(path.join(os.tmpdir(), "dc-closure-"));
  context.after(() => rm(root, { recursive: true, force: true }));
  for (const [name, source] of Object.entries(files)) {
    const target = path.join(root, name);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, source);
  }
  const registry = await PackageRegistry.fromRoots([{ path: root, prefix: "kb" }]);
  return new SopRuntime(registry);
}

const oneKeyMatcher = (key, target = "kb.rule") => `@template mandatory
@trigger "${key}"
@apply ${target}
@input index delta
@output matches
@entries select $index "${key}"
@matches bind $entries
`;

test("discovers every mandatory instance independently of explicit task calls", async (context) => {
  const runtime = await closureRuntime(context, {
    "task.sop": `@input first second
@output firstPublication secondPublication
@firstPublication publish $first "case.notice" "task.md#first"
@secondPublication publish $second "case.notice" "task.md#second"
`,
    "rule.sop": `@input item
@output finding
@evaluate define item
    function run({ item }) { return { id: item.id, reviewed: true } }
    return { run }
@finding evaluate $item
`,
    "matcher.sop": oneKeyMatcher("case.notice"),
  });
  const result = await executeWithMandatoryClosure(runtime, "kb.task", [{ id: "A" }, { id: "B" }]);
  assert.equal(result.outcome, "SUCCEEDED");
  assert.equal(result.receipt.closure.status, "CLOSED");
  assert.equal(result.receipt.closure.expectedInstances.length, 2);
  assert.equal(result.receipt.closure.executedInstances.length, 2);
  assert.deepEqual(result.mandatoryResults.map(({ outputs }) => outputs[0].id).sort(), ["A", "B"]);
});

test("joins semantic publications exhaustively and does not invent a match", async (context) => {
  const runtime = await closureRuntime(context, {
    "task.sop": `@input event policy
@output eventPublication policyPublication
@eventPublication publish $event "event.notice" "events.md"
@policyPublication publish $policy "policy.notice" "policy.md"
`,
    "rule.sop": `@input event policy
@output finding
@evaluate define event policy
    function run({ event, policy }) { return { event: event.id, policy: policy.id, matched: true } }
    return { run }
@finding evaluate $event $policy
`,
    "matcher.sop": `@template mandatory
@trigger "event.notice" "policy.notice"
@apply kb.rule
@input index delta
@output matches
@events select $index "event.notice"
@policies select $index "policy.notice"
@matches join $events $policies "/subject" "/subject"
`,
  });
  const match = await executeWithMandatoryClosure(runtime, "kb.task", [
    { id: "E1", subject: "contract-7" },
    { id: "P1", subject: "contract-7" },
  ]);
  assert.equal(match.mandatoryResults.length, 1);
  const noMatch = await executeWithMandatoryClosure(runtime, "kb.task", [
    { id: "E2", subject: "contract-7" },
    { id: "P2", subject: "contract-8" },
  ]);
  assert.equal(noMatch.outcome, "SUCCEEDED");
  assert.equal(noMatch.mandatoryResults.length, 0);
  assert.deepEqual(noMatch.receipt.closure.expectedInstances, []);
});

test("reaches a multi-round fixed point when a mandatory rule publishes a new fact", async (context) => {
  const runtime = await closureRuntime(context, {
    "task.sop": "@input order\n@output publication\n@publication publish $order \"order.raw\" \"orders.md\"\n",
    "normalize.sop": `@input order
@output normalized publication
@normalize define order
    function run({ order }) { return { id: order.id, amount: Number(order.amount) } }
    return { run }
@normalized normalize $order
@publication publish $normalized "order.normalized" "kb.normalize"
`,
    "verify.sop": `@input order
@output finding
@verify define order
    function run({ order }) { return { id: order.id, valid: Number.isFinite(order.amount) } }
    return { run }
@finding verify $order
`,
    "normalize_matcher.sop": oneKeyMatcher("order.raw", "kb.normalize"),
    "verify_matcher.sop": oneKeyMatcher("order.normalized", "kb.verify"),
  });
  const result = await executeWithMandatoryClosure(runtime, "kb.task", [{ id: "O1", amount: "42" }]);
  assert.equal(result.outcome, "SUCCEEDED");
  assert.equal(result.receipt.closure.status, "CLOSED");
  assert.equal(result.receipt.closure.executedInstances.length, 2);
  assert.ok(result.receipt.closure.rounds.length >= 2);
  assert.deepEqual(result.mandatoryResults.at(-1).outputs, [{ id: "O1", valid: true }]);
});

test("blocks the result when an applicable mandatory rule refuses", async (context) => {
  const runtime = await closureRuntime(context, {
    "task.sop": "@input value\n@output publication\n@publication publish $value \"number.required\" \"task.md\"\n",
    "rule.sop": "@input value\n@output number\n@number parseNumber $value\n",
    "matcher.sop": oneKeyMatcher("number.required"),
  });
  const result = await executeWithMandatoryClosure(runtime, "kb.task", ["not-a-number"]);
  assert.equal(result.outcome, "REJECTED");
  assert.deepEqual(result.outputs, []);
  assert.equal(result.receipt.closure.status, "FAILED");
  assert.equal(result.receipt.closure.failure.code, "mandatory_instance_failed");
  assert.equal(result.receipt.closure.failure.outcome, "REFUSED");
});

test("returns inconclusive instead of claiming closure when the instance budget is exhausted", async (context) => {
  const runtime = await closureRuntime(context, {
    "task.sop": "@input value\n@output publication\n@publication publish $value \"case.item\" \"task.md\"\n",
    "rule.sop": "@input value\n@output result\n@result alias $value\n",
    "matcher.sop": oneKeyMatcher("case.item"),
  });
  const result = await executeWithMandatoryClosure(runtime, "kb.task", ["A"], { maxInstances: 0 });
  assert.equal(result.outcome, "INCONCLUSIVE");
  assert.equal(result.receipt.closure.failure.code, "mandatory_instance_budget_exhausted");
});
