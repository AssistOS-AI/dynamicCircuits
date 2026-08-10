import assert from "node:assert/strict";
import { lstat, mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { prepareKnowledgeBase, prepareWorkspace } from "../../src/index.mjs";

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
  assert.equal((await lstat(path.join(workDir, ".agents", "skills"))).isSymbolicLink(), true);
  const guidance = await readFile(path.join(workDir, "AGENTS.md"), "utf8");
  assert.match(guidance, /Treat the knowledge base as read-only/);
  assert.match(guidance, /Translate the human-readable task sources/);
  assert.match(guidance, /larger no-input root package `task\.analysis`/);
  assert.match(guidance, /@template mandatory/);
  assert.match(guidance, /mandatory closure section/);
  assert.match(guidance, /Do not create `result\.json`/);
  assert.match(guidance, /executor-owned `runtime-result\.md` is the only authoritative run result/);
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
  assert.match(await readFile(path.join(workDir, ".dynamic-circuits", "AGENT_INSTRUCTIONS.md"), "utf8"), /Dynamic Circuits Analysis Workspace/);
});

test("rejects overlapping KB and work roots", async (context) => {
  const root = await mkdtemp(path.join(os.tmpdir(), "dc-workspace-"));
  context.after(() => rm(root, { recursive: true, force: true }));
  await assert.rejects(
    prepareWorkspace({
      kbDir: root,
      workDir: path.join(root, "work"),
      skillsDir: path.join(root, "skills"),
    }),
    (error) => error.code === "INVALID_WORKSPACE_LAYOUT",
  );
});

test("adds project skill links to an existing discovery directory", async (context) => {
  const root = await mkdtemp(path.join(os.tmpdir(), "dc-workspace-"));
  context.after(() => rm(root, { recursive: true, force: true }));
  const workDir = path.join(root, "work");
  const skillsDir = path.join(root, "project-skills");
  await mkdir(path.join(workDir, ".agents", "skills"), { recursive: true });
  await mkdir(path.join(skillsDir, "one-skill"), { recursive: true });
  await writeFile(path.join(workDir, ".agents", "skills", "user-skill.txt"), "preserve");
  await prepareWorkspace({ kbDir: path.join(root, "kb"), workDir, skillsDir });
  assert.equal(await readFile(path.join(workDir, ".agents", "skills", "user-skill.txt"), "utf8"), "preserve");
  assert.equal((await lstat(path.join(workDir, ".agents", "skills", "one-skill"))).isSymbolicLink(), true);
});

test("prepares inferred KB learning without a task workdir", async (context) => {
  const root = await mkdtemp(path.join(os.tmpdir(), "dc-learning-"));
  context.after(() => rm(root, { recursive: true, force: true }));
  const kbDir = path.join(root, "kb");
  const skillsDir = path.join(root, "skills");
  await mkdir(path.join(kbDir, "input"), { recursive: true });
  await mkdir(skillsDir);
  await writeFile(path.join(kbDir, "input", "rules.txt"), "A reusable rule");
  const workspace = await prepareKnowledgeBase({ kbDir, skillsDir });
  assert.equal(workspace.mode, "learn");
  assert.equal(workspace.workDir, null);
  assert.equal(workspace.agentWorkDir, kbDir);
  assert.deepEqual(workspace.inputManifest.files.map(({ path: file }) => file), ["rules.txt"]);
  assert.match(await readFile(path.join(kbDir, "AGENTS.md"), "utf8"), /only under `candidates\/`/);
});
