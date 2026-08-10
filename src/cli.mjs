#!/usr/bin/env node
import { spawn } from "node:child_process";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildAgentInvocation } from "./agents/registry.mjs";
import { compilePackage } from "./sop/compiler.mjs";
import { SopError } from "./sop/errors.mjs";
import { PackageRegistry } from "./sop/registry.mjs";
import { SopRuntime } from "./sop/runtime.mjs";
import { buildAnalysisPrompt, prepareWorkspace } from "./workspace.mjs";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function usage() {
  return `Usage:
  dc-agent [-kbdir PATH] [-workdir PATH] [-agent codex] [--learn] [--prepare-only]
  dc-agent run --kbdir PATH --workdir PATH [--agent codex|generic]
  dc-agent prepare --kbdir PATH --workdir PATH
  dc-agent sop compile --root PATH --package NAME [--prefix NAME] [--kb-root PATH]
  dc-agent sop run --root PATH --package NAME [--inputs JSON] [--prefix NAME] [--kb-root PATH]

Options accept both the requested single-dash form (-kbdir) and conventional long form (--kbdir).
The generic adapter also requires --agent-command PATH.`;
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
    child.stdin.end(prompt);
  });
}

async function handleWorkspace(command, options) {
  const workspace = await prepareWorkspace({
    kbDir: requireOption(options, "kbdir"),
    workDir: requireOption(options, "workdir"),
    skillsDir: path.join(projectRoot, "circuitSkills"),
    learn: options.learn === true,
  });
  if (command === "prepare" || options["prepare-only"]) {
    process.stdout.write(`${JSON.stringify(workspace.workspaceManifest, null, 2)}\n`);
    return;
  }
  const invocation = buildAgentInvocation({
    agent: options.agent ?? "codex",
    agentCommand: options["agent-command"],
    kbDir: workspace.kbDir,
    workDir: workspace.workDir,
    learn: options.learn === true,
    model: options.model,
  });
  const prompt = buildAnalysisPrompt(workspace);
  if (options["dry-run"]) {
    process.stdout.write(`${JSON.stringify({ ...invocation, prompt }, null, 2)}\n`);
    return;
  }
  const result = await runChild(invocation, prompt);
  await writeFile(path.join(workspace.workDir, ".dynamic-circuits", "last-run.json"), `${JSON.stringify({
    schemaVersion: 1,
    agent: options.agent ?? "codex",
    command: invocation.command,
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
