import assert from "node:assert/strict";
import { chmod, mkdtemp, mkdir, readFile, rm, unlink, utimes, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { renderRuntimeReport } from "../../src/runtime-report.mjs";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

test("renders executor outputs and receipt without a JSON result artifact", () => {
  const report = renderRuntimeReport({
    packageName: "task.analysis",
    outputNames: ["verdict"],
    result: {
      outcome: "SUCCEEDED",
      outputs: [{ status: "SUPPORTED", evidence: ["fact-1"] }],
      receipt: {
        packageHash: "sha256:package",
        receiptHash: "sha256:receipt",
        outputHashes: ["sha256:output"],
        checks: [{ kind: "goal", wire: "complete", ok: true, valueHash: "sha256:check" }],
        nodes: [{ nodeId: "n0001", callee: "kb.reason", status: "SUCCEEDED", childReceipt: { receiptHash: "sha256:child" } }],
      },
    },
  });

  assert.match(report, /authoritative result emitted by the Dynamic Circuits executor/);
  assert.match(report, /### verdict/);
  assert.match(report, /\*\*status:\*\* SUPPORTED/);
  assert.match(report, /sha256:receipt/);
  assert.match(report, /kb\.reason/);
  assert.doesNotMatch(report, /```json/);
});

test("analysis CLI executes task.analysis and owns runtime-result.md", async (context) => {
  const root = await mkdtemp(path.join(os.tmpdir(), "dc-runtime-report-"));
  context.after(() => rm(root, { recursive: true, force: true }));
  const kbDir = path.join(root, "kb");
  const workDir = path.join(root, "task");
  const mockAgent = path.join(root, "mock-agent.sh");
  await mkdir(path.join(workDir, "input"), { recursive: true });
  await writeFile(path.join(workDir, "input", "task.md"), "Return the observed value.\n", "utf8");
  await writeFile(mockAgent, `#!/bin/sh
mkdir -p sop/task results
printf '%s\n' '@input' '@output verdict' '' '@make define' '    function run() { return { status: "OBSERVED", count: 2 } }' '    return { run }' '' '@verdict make' > sop/task/analysis.sop
printf '%s\n' '# Agent provenance' '' 'Generated task.analysis and compiled it.' > results/agent-summary.md
`, "utf8");
  await chmod(mockAgent, 0o755);

  const result = spawnSync(process.execPath, [
    path.join(repositoryRoot, "src", "cli.mjs"),
    "-kbdir", kbDir,
    "-workdir", workDir,
    "-agent", "generic",
    "--agent-command", mockAgent,
  ], { cwd: repositoryRoot, encoding: "utf8" });

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Runtime result:/);
  const report = await readFile(path.join(workDir, "results", "runtime-result.md"), "utf8");
  assert.match(report, /\*\*status:\*\* OBSERVED/);
  assert.match(report, /\*\*count:\*\* 2/);
  await assert.rejects(readFile(path.join(workDir, "results", "result.json"), "utf8"));
});

test("analysis CLI skips fresh work, reruns only stale stages, and deletion forces Codex", async (context) => {
  const root = await mkdtemp(path.join(os.tmpdir(), "dc-incremental-"));
  context.after(() => rm(root, { recursive: true, force: true }));
  const kbDir = path.join(root, "kb");
  const workDir = path.join(root, "task");
  const inputPath = path.join(workDir, "input", "task.md");
  const sopPath = path.join(workDir, "sop", "task", "analysis.sop");
  const reportPath = path.join(workDir, "results", "runtime-result.md");
  const countPath = path.join(root, "agent-count.txt");
  const mockAgent = path.join(root, "mock-agent.sh");
  await mkdir(path.dirname(inputPath), { recursive: true });
  await writeFile(inputPath, "Return the observed value.\n", "utf8");
  await writeFile(mockAgent, `#!/bin/sh
mkdir -p sop/task results
printf 'run\\n' >> ${JSON.stringify(countPath)}
printf '%s\\n' '@input' '@output verdict' '' '@make define' '    function run() { return { status: "OBSERVED", count: 2 } }' '    return { run }' '' '@verdict make' > sop/task/analysis.sop
`, "utf8");
  await chmod(mockAgent, 0o755);
  const args = [
    path.join(repositoryRoot, "src", "cli.mjs"),
    "-kbdir", kbDir,
    "-workdir", workDir,
    "-agent", "generic",
    "--agent-command", mockAgent,
  ];
  const run = () => spawnSync(process.execPath, args, { cwd: repositoryRoot, encoding: "utf8" });

  const first = run();
  assert.equal(first.status, 0, first.stderr);
  assert.equal((await readFile(countPath, "utf8")).trim().split("\n").length, 1);

  const cached = run();
  assert.equal(cached.status, 0, cached.stderr);
  assert.match(cached.stdout, /Coding agent and executor skipped/);
  assert.equal((await readFile(countPath, "utf8")).trim().split("\n").length, 1);

  const newer = new Date(Date.now() + 2_000);
  await utimes(sopPath, newer, newer);
  const executorOnly = run();
  assert.equal(executorOnly.status, 0, executorOnly.stderr);
  assert.match(executorOnly.stdout, /coding agent skipped/i);
  assert.equal((await readFile(countPath, "utf8")).trim().split("\n").length, 1);

  await utimes(inputPath, new Date(Date.now() + 4_000), new Date(Date.now() + 4_000));
  const staleInput = run();
  assert.equal(staleInput.status, 0, staleInput.stderr);
  assert.equal((await readFile(countPath, "utf8")).trim().split("\n").length, 2);

  await unlink(reportPath);
  const forced = run();
  assert.equal(forced.status, 0, forced.stderr);
  assert.equal((await readFile(countPath, "utf8")).trim().split("\n").length, 3);
});
