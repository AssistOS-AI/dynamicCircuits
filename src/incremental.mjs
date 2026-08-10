import { lstat, readdir } from "node:fs/promises";
import path from "node:path";

async function collectRegularFiles(directory, files) {
  const entries = await readdir(directory, { withFileTypes: true }).catch((error) => {
    if (error.code === "ENOENT") return [];
    throw error;
  });
  entries.sort((left, right) => left.name.localeCompare(right.name));
  for (const entry of entries) {
    const target = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) continue;
    if (entry.isDirectory()) await collectRegularFiles(target, files);
    else if (entry.isFile()) {
      const stat = await lstat(target);
      files.push({ path: target, mtimeMs: stat.mtimeMs });
    }
  }
}

async function newestFile(roots) {
  const files = [];
  for (const root of roots) await collectRegularFiles(root, files);
  return files.reduce((newest, file) => (!newest || file.mtimeMs > newest.mtimeMs ? file : newest), null);
}

/**
 * Decide which analysis stages are stale without treating generated reports,
 * evaluation expectations, or presentation files as semantic dependencies.
 */
export async function planAnalysisRun({ kbDir, workDir }) {
  const reportPath = path.join(workDir, "results", "runtime-result.md");
  const reportStat = await lstat(reportPath).catch((error) => {
    if (error.code === "ENOENT") return null;
    throw error;
  });
  if (!reportStat?.isFile()) {
    return { action: "agent-and-executor", reason: "runtime result is missing", reportPath };
  }

  const agentDependency = await newestFile([
    path.join(workDir, "input"),
    path.join(kbDir, "circuits"),
  ]);
  if (agentDependency && agentDependency.mtimeMs > reportStat.mtimeMs) {
    return {
      action: "agent-and-executor",
      reason: "task input or reviewed KB circuit is newer than the runtime result",
      reportPath,
      dependencyPath: agentDependency.path,
    };
  }

  const executorDependency = await newestFile([path.join(workDir, "sop")]);
  if (executorDependency && executorDependency.mtimeMs > reportStat.mtimeMs) {
    return {
      action: "executor-only",
      reason: "generated task SOP is newer than the runtime result",
      reportPath,
      dependencyPath: executorDependency.path,
    };
  }

  return {
    action: "skip",
    reason: "runtime result is newer than task input, reviewed KB circuits, and generated task SOP",
    reportPath,
  };
}
