#!/usr/bin/env node
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildAgentInvocation } from "./agents/registry.mjs";
import { compilePackage } from "./sop/compiler.mjs";
import { SopError } from "./sop/errors.mjs";
import { PackageRegistry } from "./sop/registry.mjs";
import { SopRuntime } from "./sop/runtime.mjs";
import {
  buildAnalysisPrompt,
  buildLearningPrompt,
  prepareKnowledgeBase,
  prepareWorkspace,
} from "./workspace.mjs";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function usage() {
  return `Usage:
  agent -kbdir PATH [-agent codex|generic]
  agent -kbdir PATH -workdir PATH [-agent codex|generic]
  agent prepare -kbdir PATH [-workdir PATH]
  agent sop compile --root PATH --package NAME [--prefix NAME] [--kb-root PATH]
  agent sop run --root PATH --package NAME [--inputs JSON] [--prefix NAME] [--kb-root PATH]

Options accept both the requested single-dash form (-kbdir) and conventional long form (--kbdir).
Without --workdir the agent learns candidate circuits from KB/input. With --workdir it analyzes
WORK/input and writes WORK/sop and WORK/results while treating the KB as read-only.
The generic adapter also requires --agent-command PATH. Installed aliases are agent, dc-agent,
and dynamic-circuits.`;
}

function parseArgs(argv) {
  const args = [...argv];
  let command = "run";
  let sopCommand = null;
  if (["run", "prepare", "sop", "help"].includes(args[0])) command = args.shift();
  if (command === "sop") sopCommand = args.shift();
  const options = {};
  const booleanOptions = new Set(["learn", "prepare-only", "dry-run", "help"]);
  while (args.length) {
    const raw = args.shift();
    if (!raw.startsWith("-")) throw new SopError("CLI_ARGUMENT", `Unexpected positional argument: ${raw}`);
    const key = raw.replace(/^-+/, "");
    if (booleanOptions.has(key)) options[key] = true;
    else {
      if (!args.length || args[0].startsWith("-")) throw new SopError("CLI_ARGUMENT", `Missing value for ${raw}`);
      options[key] = args.shift();
    }
  }
  return { command, sopCommand, options };
}

function requireOption(options, name) {
  if (!options[name]) throw new SopError("CLI_ARGUMENT", `--${name} is required`);
  return options[name];
}

async function runChild(invocation, prompt) {
  return new Promise((resolve, reject) => {
    const child = spawn(invocation.command, invocation.args, { cwd: invocation.cwd, stdio: ["pipe", "inherit", "inherit"] });
    child.on("error", reject);
    child.on("exit", (code, signal) => resolve({ code, signal }));
    child.stdin.on("error", (error) => {
      if (error.code !== "EPIPE") reject(error);
    });
    child.stdin.end(prompt);
  });
}

async function handleWorkspace(command, options) {
  if (options.learn) {
    throw new SopError(
      "CLI_ARGUMENT",
      "--learn was removed: omit --workdir for KB learning, or provide --workdir for task analysis",
    );
  }
  const common = {
    kbDir: requireOption(options, "kbdir"),
    skillsDir: path.join(projectRoot, "circuitSkills"),
  };
  const workspace = options.workdir
    ? await prepareWorkspace({ ...common, workDir: options.workdir })
    : await prepareKnowledgeBase(common);
  if (command === "prepare" || options["prepare-only"]) {
    process.stdout.write(`${JSON.stringify(workspace.workspaceManifest, null, 2)}\n`);
    return;
  }
  const invocation = buildAgentInvocation({
    agent: options.agent ?? "codex",
    agentCommand: options["agent-command"],
    workDir: workspace.agentWorkDir,
    model: options.model,
  });
  const prompt = workspace.mode === "learn"
    ? buildLearningPrompt(workspace)
    : buildAnalysisPrompt(workspace);
  if (options["dry-run"]) {
    process.stdout.write(`${JSON.stringify({ ...invocation, prompt }, null, 2)}\n`);
    return;
  }
  const startedAt = new Date().toISOString();
  const result = await runChild(invocation, prompt);
  const finishedAt = new Date().toISOString();
  await writeFile(path.join(workspace.agentWorkDir, ".dynamic-circuits", "last-run.json"), `${JSON.stringify({
    schemaVersion: 1,
    agent: options.agent ?? "codex",
    mode: workspace.mode,
    command: invocation.command,
    cwd: invocation.cwd,
    promptSha256: createHash("sha256").update(prompt).digest("hex"),
    startedAt,
    finishedAt,
    exitCode: result.code,
    signal: result.signal,
  }, null, 2)}\n`, "utf8");
  if (result.code !== 0) throw new SopError("AGENT_FAILED", `Coding agent exited with code ${result.code}`, result);
}

async function handleSop(sopCommand, options) {
  if (!["compile", "run"].includes(sopCommand)) throw new SopError("CLI_ARGUMENT", "sop requires compile or run");
  const roots = [];
  if (options["kb-root"]) roots.push({ path: options["kb-root"], prefix: "kb" });
  roots.push({ path: requireOption(options, "root"), prefix: options.prefix ?? "" });
  const registry = await PackageRegistry.fromRoots(roots);
  const packageName = requireOption(options, "package");
  if (sopCommand === "compile") {
    const compiled = compilePackage(registry, packageName);
    process.stdout.write(`${JSON.stringify(compiled, null, 2)}\n`);
    return;
  }
  let inputs = [];
  if (options.inputs) {
    try { inputs = JSON.parse(options.inputs); }
    catch { throw new SopError("CLI_ARGUMENT", "--inputs must be valid JSON"); }
  }
  const result = await new SopRuntime(registry).execute(packageName, inputs);
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  if (result.outcome !== "SUCCEEDED") process.exitCode = 2;
}

async function main() {
  const { command, sopCommand, options } = parseArgs(process.argv.slice(2));
  if (command === "help" || options.help) {
    process.stdout.write(`${usage()}\n`);
    return;
  }
  if (command === "sop") await handleSop(sopCommand, options);
  else await handleWorkspace(command, options);
}

main().catch((error) => {
  const body = error instanceof SopError ? error.toJSON() : { code: "UNEXPECTED", message: error.message };
  process.stderr.write(`${JSON.stringify(body, null, 2)}\n`);
  process.exitCode = 1;
});
