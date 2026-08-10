import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

test("accepts the agent -kbdir/-workdir/-agent invocation form", async (context) => {
  const root = await mkdtemp(path.join(os.tmpdir(), "dc-cli-"));
  context.after(() => rm(root, { recursive: true, force: true }));
  const result = spawnSync(process.execPath, [
    path.join(repositoryRoot, "src", "cli.mjs"),
    "-kbdir", path.join(root, "kb"),
    "-workdir", path.join(root, "work"),
    "-agent", "codex",
    "--dry-run",
  ], { cwd: repositoryRoot, encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  const invocation = JSON.parse(result.stdout);
  assert.equal(invocation.command, "codex");
  assert.equal(invocation.cwd, path.join(root, "work"));
  assert.match(invocation.prompt, /Process all 0 files/);
});
