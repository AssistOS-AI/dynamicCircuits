import { createHash } from "node:crypto";
import { lstat, mkdir, readFile, readdir, readlink, realpath, symlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { SopError } from "./sop/errors.mjs";

const MANAGED_MARKER = "<!-- managed-by: dynamic-circuits -->";

function isInside(parent, candidate) {
  const relative = path.relative(parent, candidate);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

async function ensureSymlink(linkPath, targetPath) {
  const existing = await lstat(linkPath).catch(() => null);
  const relativeTarget = path.relative(path.dirname(linkPath), targetPath) || ".";
  if (!existing) {
    await symlink(relativeTarget, linkPath, "dir");
    return;
  }
  if (!existing.isSymbolicLink()) {
    throw new SopError("WORKSPACE_CONFLICT", `${linkPath} exists and is not a symbolic link`);
  }
  const current = await readlink(linkPath);
  const resolved = path.resolve(path.dirname(linkPath), current);
  if (resolved !== targetPath) {
    throw new SopError("WORKSPACE_CONFLICT", `${linkPath} points to an unexpected target`, {
      expected: targetPath,
      actual: resolved,
    });
  }
}

async function ensureAgentSkillDiscovery(workDir, skillsDir) {
  const agentDir = path.join(workDir, ".agents");
  const agentDirEntry = await lstat(agentDir).catch(() => null);
  if (!agentDirEntry) await mkdir(agentDir);
  else if (!agentDirEntry.isDirectory() || agentDirEntry.isSymbolicLink()) {
    throw new SopError("WORKSPACE_CONFLICT", `${agentDir} must be a local directory`);
  }

  const discoveryPath = path.join(agentDir, "skills");
  const discoveryEntry = await lstat(discoveryPath).catch(() => null);
  if (!discoveryEntry || discoveryEntry.isSymbolicLink()) {
    await ensureSymlink(discoveryPath, skillsDir);
    return;
  }
  if (!discoveryEntry.isDirectory()) {
    throw new SopError("WORKSPACE_CONFLICT", `${discoveryPath} must be a directory or symbolic link`);
  }
  const skills = await readdir(skillsDir, { withFileTypes: true });
  for (const skill of skills.filter((entry) => entry.isDirectory())) {
    await ensureSymlink(path.join(discoveryPath, skill.name), path.join(skillsDir, skill.name));
  }
}

async function walkInput(directory, root, files) {
  const entries = await readdir(directory, { withFileTypes: true });
  entries.sort((left, right) => left.name.localeCompare(right.name));
  for (const entry of entries) {
    const target = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) continue;
    if (entry.isDirectory()) await walkInput(target, root, files);
    else if (entry.isFile()) {
      const bytes = await readFile(target);
      files.push({
        path: path.relative(root, target).split(path.sep).join("/"),
        bytes: bytes.length,
        sha256: createHash("sha256").update(bytes).digest("hex"),
      });
    }
  }
}

export async function collectInputManifest(inputDir) {
  const files = [];
  await walkInput(inputDir, inputDir, files);
  return { schemaVersion: 1, files };
}

function analysisInstructions(kbDir) {
  return `${MANAGED_MARKER}
# Dynamic Circuits Analysis Workspace

Analyze every file listed in \`.dynamic-circuits/input-manifest.json\`. Read the applicable skills through the \`circuitSkills\` symbolic link before authoring or executing SOP Lang.

The semantic source boundary for this run is strict: read task evidence and requests from \`input/\`, executable reusable knowledge from the configured KB \`circuits/\`, and only the project skills/runtime documentation needed to author valid SOP. Do not inspect evaluation expectations, prior results, evaluation README or HTML pages, KB candidates, KB learning reports, or sibling task workspaces. If such content is encountered accidentally, do not use it to construct the circuit.

Load reviewed reusable circuits from ${JSON.stringify(path.join(kbDir, "circuits"))}. Treat the analysis as three explicit symbolic stages:

1. Translate the human-readable task sources into one or more task-local SOP packages under \`sop/task/\`. These packages represent the task request and current facts; they must not duplicate policy logic already supplied by KB circuits.
2. Create the larger root package \`task.analysis\` under \`sop/task/analysis.sop\`. It must obtain the task values from those input packages, invoke the applicable reviewed \`kb.*\` packages, require no external inputs, and expose the complete analysis result through public outputs.
3. Compile and test \`task.analysis\`. After the coding agent exits, the CLI executes this fixed entrypoint and writes \`results/runtime-result.md\` directly from runtime outputs and the receipt.

SOP files are executable intermediate artifacts, not the user-facing report. Do not create \`result.json\`, and do not write a semantic result report. The coding agent may write \`results/agent-summary.md\` only as a provenance journal covering input coverage, generated packages, compile/test attempts, assumptions, and limitations. It is not an analysis result and must not restate or reinterpret the circuit verdict. The executor-owned \`runtime-result.md\` is the only authoritative run result.

Treat the knowledge base as read-only. Keep every generated artifact in this workspace. Record reusable discoveries in the report; do not write KB candidates during a task analysis.

Report unsupported inputs, ambiguity, refusal, and execution errors explicitly. Never claim that a circuit ran when it only exists as source, and never substitute a hand-written report for a failed or skipped circuit execution.
`;
}

function learningInstructions(kbDir) {
  return `${MANAGED_MARKER}
# Dynamic Circuits Knowledge Learning Workspace

Learn reusable executable knowledge from every file listed in \`.dynamic-circuits/input-manifest.json\`. Read \`circuit-learner\` and \`author-sop-circuit\` through the linked skill catalog before creating artifacts.

Read source documents only from \`input/\` and existing trusted packages from \`circuits/\`. Write new rule, matcher, verifier, interpretation, test, provenance, and manifest artifacts only under \`candidates/\`. Write learning reports under \`results/\`.

The semantic source boundary is strict. Do not inspect evaluation expectations, prior results, evaluation README or HTML pages, candidates from sibling KBs, or sibling task workspaces. Project skills and compiler/runtime documentation may be read only to implement valid SOP; they are not domain evidence.

Do not overwrite or promote packages in \`circuits/\`. Compilation proves mechanical validity, not semantic trust. Preserve source paths, spans, assumptions, ambiguity, negative cases, and review requirements for every candidate.

The active knowledge base is ${JSON.stringify(kbDir)}. Do not use direct LLM API integrations from generated code.
`;
}

async function installInstructions(rootDir, content) {
  const agentsPath = path.join(rootDir, "AGENTS.md");
  const existingInstructions = await readFile(agentsPath, "utf8").catch(() => null);
  if (existingInstructions === null || existingInstructions.startsWith(MANAGED_MARKER)) {
    await writeFile(agentsPath, content, "utf8");
  } else {
    await writeFile(path.join(rootDir, ".dynamic-circuits", "AGENT_INSTRUCTIONS.md"), content, "utf8");
  }
}

async function installSkills(rootDir, skillsDir) {
  const canonicalSkillsDir = await realpath(skillsDir);
  await ensureSymlink(path.join(rootDir, "circuitSkills"), canonicalSkillsDir);
  await ensureAgentSkillDiscovery(rootDir, canonicalSkillsDir);
  return canonicalSkillsDir;
}

async function writeManifest(rootDir, manifest) {
  await writeFile(
    path.join(rootDir, ".dynamic-circuits", "input-manifest.json"),
    `${JSON.stringify(manifest.inputManifest, null, 2)}\n`,
    "utf8",
  );
  await writeFile(
    path.join(rootDir, ".dynamic-circuits", "workspace.json"),
    `${JSON.stringify(manifest.workspaceManifest, null, 2)}\n`,
    "utf8",
  );
}

export async function prepareWorkspace(options) {
  const kbDir = path.resolve(options.kbDir);
  const workDir = path.resolve(options.workDir);
  const skillsDir = path.resolve(options.skillsDir);
  if (kbDir === workDir || isInside(kbDir, workDir) || isInside(workDir, kbDir)) {
    throw new SopError("INVALID_WORKSPACE_LAYOUT", "KB and work directories must not contain one another");
  }
  const skillsStat = await lstat(skillsDir).catch(() => null);
  if (!skillsStat?.isDirectory()) throw new SopError("SKILLS_MISSING", `Circuit skills directory is missing: ${skillsDir}`);
  await mkdir(path.join(kbDir, "circuits"), { recursive: true });
  await mkdir(path.join(kbDir, "candidates"), { recursive: true });
  for (const directory of ["input", "results", "sop", ".dynamic-circuits"]) {
    await mkdir(path.join(workDir, directory), { recursive: true });
  }
  const canonicalSkillsDir = await installSkills(workDir, skillsDir);
  await installInstructions(workDir, analysisInstructions(kbDir));

  const inputManifest = await collectInputManifest(path.join(workDir, "input"));
  const workspaceManifest = {
    schemaVersion: 1,
    kbDir,
    workDir,
    mode: "analyze",
    paths: {
      input: "input",
      results: "results",
      sop: "sop",
      skills: "circuitSkills",
      agentSkillDiscovery: ".agents/skills",
    },
  };
  await writeManifest(workDir, { inputManifest, workspaceManifest });
  return { mode: "analyze", kbDir, workDir, agentWorkDir: workDir, skillsDir: canonicalSkillsDir, inputManifest, workspaceManifest };
}

export async function prepareKnowledgeBase(options) {
  const kbDir = path.resolve(options.kbDir);
  const skillsDir = path.resolve(options.skillsDir);
  const skillsStat = await lstat(skillsDir).catch(() => null);
  if (!skillsStat?.isDirectory()) {
    throw new SopError("SKILLS_MISSING", `Circuit skills directory is missing: ${skillsDir}`);
  }
  for (const directory of ["input", "circuits", "candidates", "results", ".dynamic-circuits"]) {
    await mkdir(path.join(kbDir, directory), { recursive: true });
  }
  const canonicalSkillsDir = await installSkills(kbDir, skillsDir);
  await installInstructions(kbDir, learningInstructions(kbDir));
  const inputManifest = await collectInputManifest(path.join(kbDir, "input"));
  const workspaceManifest = {
    schemaVersion: 1,
    kbDir,
    workDir: null,
    mode: "learn",
    paths: {
      input: "input",
      trustedCircuits: "circuits",
      candidates: "candidates",
      results: "results",
      skills: "circuitSkills",
      agentSkillDiscovery: ".agents/skills",
    },
  };
  await writeManifest(kbDir, { inputManifest, workspaceManifest });
  return { mode: "learn", kbDir, workDir: null, agentWorkDir: kbDir, skillsDir: canonicalSkillsDir, inputManifest, workspaceManifest };
}

export function buildAnalysisPrompt(workspace) {
  const count = workspace.inputManifest.files.length;
  return [
    "Use the linked circuitSkills to analyze this workspace.",
    "Read AGENTS.md and, when present, .dynamic-circuits/AGENT_INSTRUCTIONS.md.",
    `Process all ${count} files in .dynamic-circuits/input-manifest.json.`,
    `Inspect relevant reusable circuits in ${workspace.kbDir}/circuits.`,
    "Use only task input/ and reviewed KB circuits as semantic sources. Do not inspect expected outcomes, prior results, evaluation README/HTML, KB candidates or learning reports, or sibling workspaces.",
    "Encode the task request and current facts as task-local SOP packages under sop/task/ without copying KB policy logic.",
    "Author the no-input root package task.analysis at sop/task/analysis.sop; it must consume those packages, invoke reviewed kb.* circuits, and expose the complete result as public outputs.",
    "Compile and test task.analysis. The CLI will execute it after you exit and will generate results/runtime-result.md itself.",
    "Never create result.json or a semantic result report. Do not edit or pre-create results/runtime-result.md.",
    "You may write results/agent-summary.md only as a provenance journal: input coverage, generated/reused circuits, compile/test attempts, assumptions, limitations, and reusable discoveries.",
    "Do not put verdicts or interpretations of circuit output in that journal. Do not use direct LLM API integrations.",
  ].join(" ");
}

export function buildLearningPrompt(workspace) {
  const count = workspace.inputManifest.files.length;
  return [
    "Use $circuit-learner and $author-sop-circuit to extend this executable knowledge base.",
    "Read AGENTS.md and, when present, .dynamic-circuits/AGENT_INSTRUCTIONS.md.",
    `Process all ${count} files in .dynamic-circuits/input-manifest.json.`,
    "Extract facts, definitions, rules, exceptions, priorities, contexts, procedures, claims, and ambiguity.",
    "Use only this KB input/ and trusted circuits/ as semantic sources. Do not inspect evaluation expectations, prior results, evaluation README/HTML, or sibling workspaces.",
    "Write reviewable SOP packages, tests, provenance, and manifests only under candidates/.",
    "Compile and exercise candidates, but never modify or promote trusted circuits/.",
    "Write results/learning-summary.md with coverage, metrics, assumptions, gaps, and promotion recommendations.",
    "Do not use direct LLM API integrations from generated code.",
  ].join(" ");
}
