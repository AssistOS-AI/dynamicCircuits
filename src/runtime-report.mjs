import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { compilePackage } from "./sop/compiler.mjs";
import { SopError } from "./sop/errors.mjs";
import { PackageRegistry } from "./sop/registry.mjs";
import { SopRuntime } from "./sop/runtime.mjs";
import { executeWithMandatoryClosure } from "./sop/mandatory-closure.mjs";

export const TASK_ENTRYPOINT = "task.analysis";

function scalar(value) {
  if (value === null) return "null";
  if (typeof value === "string") return value.length ? value : "(empty string)";
  if (typeof value === "boolean" || typeof value === "number") return String(value);
  return null;
}

function safeText(value) {
  return String(value).replaceAll("|", "\\|").replaceAll("\n", "<br>");
}

function renderValue(value, depth = 0) {
  if (typeof value === "string" && value.includes("\n")) {
    return `~~~text\n${value}\n~~~`;
  }
  const direct = scalar(value);
  if (direct !== null) return safeText(direct);
  if (Array.isArray(value)) {
    if (value.length === 0) return "(empty list)";
    return value.map((item, index) => {
      const rendered = renderValue(item, depth + 1);
      const indent = "  ".repeat(depth);
      if ((item === null || typeof item !== "object") && !rendered.includes("\n")) {
        return `${indent}${index + 1}. ${rendered}`;
      }
      return `${indent}${index + 1}.\n${rendered}`;
    }).join("\n");
  }
  const entries = Object.entries(value);
  if (entries.length === 0) return "(empty object)";
  return entries.map(([key, item]) => {
    const rendered = renderValue(item, depth + 1);
    const indent = "  ".repeat(depth);
    if ((item === null || typeof item !== "object") && !rendered.includes("\n")) {
      return `${indent}- **${safeText(key)}:** ${rendered}`;
    }
    return `${indent}- **${safeText(key)}:**\n${rendered}`;
  }).join("\n");
}

export function renderRuntimeReport({ packageName, outputNames, result }) {
  const lines = [
    "# Circuit Runtime Result",
    "",
    "> This is the authoritative result emitted by the Dynamic Circuits executor. It is rendered directly from the circuit public outputs and execution receipt; it is not a coding-agent interpretation.",
    "",
    "## Execution identity",
    "",
    "| Field | Observed value |",
    "| --- | --- |",
    `| Entrypoint | \`${safeText(packageName)}\` |`,
    `| Outcome | **${safeText(result.outcome)}** |`,
    `| Package hash | \`${safeText(result.receipt.packageHash)}\` |`,
    `| Receipt hash | \`${safeText(result.receipt.receiptHash)}\` |`,
    `| Executed nodes in root receipt | ${result.receipt.nodes.filter(({ status }) => status !== "DEAD").length} |`,
    `| Dead nodes in root receipt | ${result.receipt.nodes.filter(({ status }) => status === "DEAD").length} |`,
    "",
    "## Public outputs",
    "",
  ];

  if (result.outcome !== "SUCCEEDED") {
    lines.push("The circuit did not succeed, so the runtime exposed no public output values.", "");
  } else if (result.outputs.length === 0) {
    lines.push("The circuit succeeded and declares no public outputs.", "");
  } else {
    result.outputs.forEach((value, index) => {
      const name = outputNames[index] ?? `output-${index + 1}`;
      lines.push(`### ${safeText(name)}`, "", renderValue(value), "", `Output hash: \`${safeText(result.receipt.outputHashes[index])}\``, "");
    });
  }

  lines.push("## Assurance checks", "");
  if (result.receipt.checks.length === 0) {
    lines.push("The root circuit declares no goals or invariants.", "");
  } else {
    lines.push("| Kind | Wire | Passed | Value hash |", "| --- | --- | --- | --- |");
    for (const check of result.receipt.checks) {
      lines.push(`| ${safeText(check.kind)} | \`${safeText(check.wire)}\` | ${check.ok ? "yes" : "no"} | \`${safeText(check.valueHash)}\` |`);
    }
    lines.push("");
  }

  if (result.receipt.closure) {
    const closure = result.receipt.closure;
    lines.push(
      "## Mandatory closure",
      "",
      "| Field | Observed value |",
      "| --- | --- |",
      `| Status | **${safeText(closure.status)}** |`,
      `| Registered mandatory matchers | ${closure.matcherCount} |`,
      `| Closure rounds | ${closure.rounds.length} |`,
      `| Indexed publications | ${closure.publicationCount} |`,
      `| Expected mandatory instances | ${closure.expectedInstances.length} |`,
      `| Executed mandatory instances | ${closure.executedInstances.length} |`,
      `| Missing mandatory instances | ${closure.missingInstances.length} |`,
      `| Closure receipt | \`${safeText(closure.receiptHash)}\` |`,
      "",
    );
    if (closure.failure) lines.push("### Blocking closure evidence", "", renderValue(closure.failure), "");
    if (result.mandatoryResults?.length) {
      lines.push("### Automatically applied rules", "");
      for (const instance of result.mandatoryResults) {
        lines.push(
          `#### ${safeText(instance.target)}`,
          "",
          `Matcher: \`${safeText(instance.matcher)}\`  `,
          `Instance: \`${safeText(instance.instanceKey)}\`  `,
          `Outcome: **${safeText(instance.outcome)}**`,
          "",
        );
        instance.outputs.forEach((value, index) => {
          lines.push(`**${safeText(instance.outputNames[index] ?? `output-${index + 1}`)}**`, "", renderValue(value), "");
        });
      }
    }
  }

  lines.push(
    "## Receipt summary",
    "",
    "| Node | Callee | Status | Child receipt |",
    "| --- | --- | --- | --- |",
  );
  for (const node of result.receipt.nodes) {
    lines.push(`| \`${safeText(node.nodeId)}\` | \`${safeText(node.callee ?? "-")}\` | ${safeText(node.status)} | ${node.childReceipt ? `\`${safeText(node.childReceipt.receiptHash)}\`` : "-"} |`);
  }
  lines.push("");
  return `${lines.join("\n")}\n`;
}

export async function executeWorkspaceCircuit({ kbDir, workDir, packageName = TASK_ENTRYPOINT }) {
  const registry = await PackageRegistry.fromRoots([
    { path: path.join(kbDir, "circuits"), prefix: "kb" },
    { path: path.join(workDir, "sop"), prefix: "" },
  ]);
  const compiled = compilePackage(registry, packageName);
  const runtime = new SopRuntime(registry);
  const result = await executeWithMandatoryClosure(runtime, packageName, []);
  const report = renderRuntimeReport({ packageName, outputNames: compiled.outputs, result });
  const resultsDir = path.join(workDir, "results");
  await mkdir(resultsDir, { recursive: true });
  const reportPath = path.join(resultsDir, "runtime-result.md");
  await writeFile(reportPath, report, "utf8");
  if (result.outcome !== "SUCCEEDED") {
    throw new SopError("ANALYSIS_RUNTIME_FAILED", `Task circuit ${packageName} ended with ${result.outcome}`, {
      reportPath,
      receiptHash: result.receipt.receiptHash,
    });
  }
  return { packageName, outputNames: compiled.outputs, result, reportPath };
}
