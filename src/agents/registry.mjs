import path from "node:path";
import { SopError } from "../sop/errors.mjs";

export const supportedAgents = Object.freeze(["codex", "generic"]);

export function buildAgentInvocation(options) {
  const agent = options.agent ?? "codex";
  const workDir = path.resolve(options.workDir);
  const kbDir = path.resolve(options.kbDir);
  if (agent === "codex") {
    const args = [
      "exec",
      "--ephemeral",
      "--skip-git-repo-check",
      "--sandbox", "workspace-write",
      "--ask-for-approval", "never",
      "--cd", workDir,
    ];
    if (options.learn) args.push("--add-dir", kbDir);
    if (options.model) args.push("--model", options.model);
    args.push("-");
    return { command: options.agentCommand ?? "codex", args, cwd: workDir, promptViaStdin: true };
  }
  if (agent === "generic") {
    if (!options.agentCommand) {
      throw new SopError("AGENT_COMMAND_REQUIRED", "--agent-command is required for the generic adapter");
    }
    return { command: options.agentCommand, args: [], cwd: workDir, promptViaStdin: true };
  }
  throw new SopError("UNKNOWN_AGENT", `Unknown coding-agent adapter: ${agent}`, {
    supported: supportedAgents,
  });
}
