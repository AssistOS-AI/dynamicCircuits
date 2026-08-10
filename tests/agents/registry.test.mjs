import assert from "node:assert/strict";
import test from "node:test";
import { buildAgentInvocation } from "../../src/index.mjs";

test("builds a non-interactive Codex invocation without a direct API", () => {
  const invocation = buildAgentInvocation({ agent: "codex", workDir: "/tmp/work", model: "test-model" });
  assert.equal(invocation.command, "codex");
  assert.deepEqual(invocation.args.slice(0, 2), ["exec", "--ephemeral"]);
  assert.ok(!invocation.args.includes("--add-dir"));
  assert.ok(invocation.args.includes("--approve-for-me"));
  assert.ok(!invocation.args.includes("--ask-for-approval"));
  assert.ok(!invocation.args.includes("--sandbox"));
  assert.ok(invocation.args.includes("test-model"));
  assert.equal(invocation.args.at(-1), "-");
});

test("supports an extensible generic coding-agent adapter", () => {
  const invocation = buildAgentInvocation({ agent: "generic", agentCommand: "future-agent", workDir: "/tmp/work" });
  assert.equal(invocation.command, "future-agent");
  assert.deepEqual(invocation.args, []);
});
