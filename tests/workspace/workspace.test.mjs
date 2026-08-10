import assert from "node:assert/strict";
import { lstat, mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { prepareWorkspace } from "../../src/index.mjs";

test("prepares isolated KB/work directories and inventories every regular input file", async (context) => {
  const root = await mkdtemp(path.join(os.tmpdir(), "dc-workspace-"));
  context.after(() => rm(root, { recursive: true, force: true }));
  const kbDir = path.join(root, "kb");
  const workDir = path.join(root, "work");
  const skillsDir = path.join(root, "skills");
  await mkdir(path.join(workDir, "input", "nested"), { recursive: true });
  await mkdir(skillsDir);
  await writeFile(path.join(workDir, "input", "a.txt"), "alpha");
  await writeFile(path.join(workDir, "input", "nested", "b.txt"), "beta");
  const workspace = await prepareWorkspace({ kbDir, workDir, skillsDir });
  assert.deepEqual(workspace.inputManifest.files.map(({ path: file }) => file), ["a.txt", "nested/b.txt"]);
  assert.equal((await lstat(path.join(workDir, "circuitSkills"))).isSymbolicLink(), true);
  assert.match(await readFile(path.join(workDir, "AGENTS.md"), "utf8"), /Treat the knowledge base as read-only/);
});

test("does not overwrite a user-owned AGENTS.md", async (context) => {
  const root = await mkdtemp(path.join(os.tmpdir(), "dc-workspace-"));
  context.after(() => rm(root, { recursive: true, force: true }));
  const workDir = path.join(root, "work");
  const skillsDir = path.join(root, "skills");
  await mkdir(workDir);
  await mkdir(skillsDir);
  await writeFile(path.join(workDir, "AGENTS.md"), "user rules\n");
  await prepareWorkspace({ kbDir: path.join(root, "kb"), workDir, skillsDir });
  assert.equal(await readFile(path.join(workDir, "AGENTS.md"), "utf8"), "user rules\n");
  assert.match(await readFile(path.join(workDir, ".dynamic-circuits", "AGENT_INSTRUCTIONS.md"), "utf8"), /Dynamic Circuits Workspace/);
});
