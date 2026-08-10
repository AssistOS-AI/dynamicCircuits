#!/usr/bin/env node
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildAgentInvocation } from "./agents/registry.mjs";
import { compilePackage, compileRegistry } from "./sop/compiler.mjs";
import { SopError } from "./sop/errors.mjs";
import { PackageRegistry } from "./sop/registry.mjs";
import { SopRuntime } from "./sop/runtime.mjs";
import { executeWithMandatoryClosure } from "./sop/mandatory-closure.mjs";
import { executeWorkspaceCircuit } from "./runtime-report.mjs";
import { planAnalysisRun } from "./incremental.mjs";
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
An analysis is incremental: a fresh runtime-result.md skips both stages; newer generated SOP
runs only the executor; changed task input, changed reviewed KB circuits, or a deleted result
runs the coding agent and executor again.
SOP run and workspace analysis automatically execute reviewed kb.* mandatory matchers whose
semantic triggers are published by the root or by another mandatory rule.
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
  const incrementalPlan = workspace.mode === "analyze"
    ? await planAnalysisRun(workspace)
    : { action: "agent-and-executor", reason: "KB learning is explicitly requested" };
  if (incrementalPlan.action === "skip" && !options["dry-run"]) {
    process.stdout.write(`Up to date: ${incrementalPlan.reportPath}\nCoding agent and executor skipped.\n`);
    return;
  }
  if (incrementalPlan.action === "executor-only" && !options["dry-run"]) {
    await unlink(incrementalPlan.reportPath).catch((error) => {
      if (error.code !== "ENOENT") throw error;
    });
    const startedAt = new Date().toISOString();
    const execution = await executeWorkspaceCircuit(workspace);
    const finishedAt = new Date().toISOString();
    await writeFile(path.join(workspace.agentWorkDir, ".dynamic-circuits", "last-run.json"), `${JSON.stringify({
      schemaVersion: 3,
      agent: options.agent ?? "codex",
      mode: workspace.mode,
      command: null,
      cwd: workspace.agentWorkDir,
      promptSha256: null,
      startedAt,
      finishedAt,
      exitCode: null,
      signal: null,
      incremental: {
        action: incrementalPlan.action,
        reason: incrementalPlan.reason,
        dependency: incrementalPlan.dependencyPath,
        codingAgentSkipped: true,
      },
      runtime: {
        entrypoint: execution.packageName,
        outcome: execution.result.outcome,
        packageHash: execution.result.receipt.packageHash,
        receiptHash: execution.result.receipt.receiptHash,
        report: path.relative(workspace.workDir, execution.reportPath).split(path.sep).join("/"),
      },
    }, null, 2)}\n`, "utf8");
    process.stdout.write(`Generated SOP changed; coding agent skipped.\nRuntime result: ${execution.reportPath}\n`);
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
    process.stdout.write(`${JSON.stringify({ ...invocation, prompt, incrementalPlan }, null, 2)}\n`);
    return;
  }
  if (workspace.mode === "analyze") {
    await unlink(path.join(workspace.workDir, "results", "runtime-result.md")).catch((error) => {
      if (error.code !== "ENOENT") throw error;
    });
  }
  const startedAt = new Date().toISOString();
  const result = await runChild(invocation, prompt);
  const finishedAt = new Date().toISOString();
  let execution = null;
  let executionError = null;
  if (result.code === 0 && workspace.mode === "analyze") {
    try {
      execution = await executeWorkspaceCircuit(workspace);
    } catch (error) {
      executionError = error;
    }
  }
  await writeFile(path.join(workspace.agentWorkDir, ".dynamic-circuits", "last-run.json"), `${JSON.stringify({
    schemaVersion: 3,
    agent: options.agent ?? "codex",
    mode: workspace.mode,
    command: invocation.command,
    cwd: invocation.cwd,
    promptSha256: createHash("sha256").update(prompt).digest("hex"),
    startedAt,
    finishedAt,
    exitCode: result.code,
    signal: result.signal,
    incremental: {
      action: incrementalPlan.action,
      reason: incrementalPlan.reason,
      dependency: incrementalPlan.dependencyPath ?? null,
      codingAgentSkipped: false,
    },
    runtime: workspace.mode === "analyze" ? (execution ? {
      entrypoint: execution.packageName,
      outcome: execution.result.outcome,
      packageHash: execution.result.receipt.packageHash,
      receiptHash: execution.result.receipt.receiptHash,
      report: path.relative(workspace.workDir, execution.reportPath).split(path.sep).join("/"),
    } : {
      outcome: "NOT_COMPLETED",
      error: executionError ? {
        code: executionError.code ?? "UNEXPECTED",
        message: executionError.message,
      } : null,
    }) : null,
  }, null, 2)}\n`, "utf8");
  if (result.code !== 0) throw new SopError("AGENT_FAILED", `Coding agent exited with code ${result.code}`, result);
  if (executionError) throw executionError;
  if (execution) process.stdout.write(`Runtime result: ${execution.reportPath}\n`);
}

async function handleSop(sopCommand, options) {
  if (!["compile", "run"].includes(sopCommand)) throw new SopError("CLI_ARGUMENT", "sop requires compile or run");
  const roots = [];
  if (options["kb-root"]) roots.push({ path: options["kb-root"], prefix: "kb" });
  roots.push({ path: requireOption(options, "root"), prefix: options.prefix ?? "" });
  const registry = await PackageRegistry.fromRoots(roots);
  const packageName = requireOption(options, "package");
  if (sopCommand === "compile") {
    compileRegistry(registry);
    const compiled = compilePackage(registry, packageName);
    process.stdout.write(`${JSON.stringify(compiled, null, 2)}\n`);
    return;
  }
  let inputs = [];
  if (options.inputs) {
    try { inputs = JSON.parse(options.inputs); }
    catch { throw new SopError("CLI_ARGUMENT", "--inputs must be valid JSON"); }
  }
  const runtime = new SopRuntime(registry);
  const result = await executeWithMandatoryClosure(runtime, packageName, inputs);
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
