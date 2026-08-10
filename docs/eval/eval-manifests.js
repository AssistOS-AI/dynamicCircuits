const evaluationFiles = {
  eval1: {
    kbSource: ["kb/input/rule.md"],
    kbSop: ["kb/circuits/notice_review/evaluate.sop"],
    tasks: [
      { root: "task", input: ["cases.md", "task.md"], sop: ["cases.sop", "request.sop", "analysis.sop"], expected: "expected.md" },
      { root: "task2", input: ["cases-and-request.md"], sop: ["input.sop", "analysis.sop"] },
      { root: "task3", input: ["cases-and-request.md"], sop: ["cases.sop", "analysis.sop"] },
    ],
  },
  eval2: {
    kbSource: ["kb/input/rule.md"],
    kbSop: ["kb/circuits/universal_positive_review.sop"],
    tasks: [
      { root: "task", input: ["claim.md", "dataset.md", "task.md"], sop: ["claim.sop", "dataset.sop", "request.sop", "analysis.sop"], expected: "expected.md" },
      { root: "task2", input: ["study.md"], sop: ["study.sop", "analysis.sop"] },
      { root: "task3", input: ["study.md"], sop: ["study.sop", "analysis.sop"] },
    ],
  },
  eval3: {
    kbSource: ["kb/input/review-rules.md"],
    kbSop: ["kb/circuits/release_plan_consistency/review.sop"],
    tasks: [
      { root: "task", input: ["chapter-01.md", "chapter-02.md", "chapter-03.md", "task.md"], sop: ["chapter_01.sop", "chapter_02.sop", "chapter_03.sop", "request.sop", "analysis.sop"], expected: "expected.md" },
      { root: "task2", input: ["plan.md"], sop: ["release_plan.sop", "analysis.sop"] },
      { root: "task3", input: ["plan.md"], sop: ["plan.sop", "analysis.sop"] },
    ],
  },
  eval4: {
    kbSource: ["kb/input/context.md"],
    kbSop: ["kb/circuits/unary_entailment/evaluate.sop"],
    tasks: [
      { root: "task", input: ["context.md", "task.md"], sop: ["context.sop", "request.sop", "analysis.sop"], expected: "expected.md" },
      { root: "task2", input: ["context-and-questions.md"], sop: ["context_and_questions.sop", "analysis.sop"] },
      { root: "task3", input: ["context-and-questions.md"], sop: ["context.sop", "request.sop", "analysis.sop"] },
    ],
  },
  eval5: {
    kbSource: ["kb/input/knowledge-base.md"],
    kbSop: ["kb/circuits/README.md", ...["r01", "r02", "r03", "r04", "r05", "r06", "r07", "r08", "r09", "r10", "review"].map((name) => `kb/circuits/data_release_governance/${name}.sop`)],
    tasks: [
      { root: "task", input: ["task.md"], sop: ["records.sop", "request.sop", "analysis.sop"], expected: "expected.md" },
      { root: "task2", input: ["task.md"], sop: ["records.sop", "request.sop", "analysis.sop"] },
      { root: "task3", input: ["task.md"], sop: ["records.sop", "request.sop", "analysis.sop"] },
    ],
  },
  eval6: {
    kbSource: ["kb/input/literary-generation-rules.md"],
    kbSop: ["kb/circuits/literary/generator.sop", "kb/circuits/literary/verifier.sop", "kb/circuits/literary/composition.sop"],
    tasks: [
      { root: "task", input: ["brief.md"], sop: ["brief.sop", "analysis.sop"], expected: "expected.md" },
      { root: "task2", input: ["brief.md"], sop: ["brief.sop", "request.sop", "analysis.sop"] },
      { root: "task3", input: ["brief.md"], sop: ["brief.sop", "analysis.sop"] },
    ],
  },
  eval7: {
    kbSource: ["kb/input/operational-sop-generation-rules.md"],
    kbSop: ["kb/circuits/generator.sop", "kb/circuits/verifier.sop", "kb/circuits/analysis.sop"],
    tasks: [
      { root: "task", input: ["brief.md"], sop: ["source.sop", "analysis.sop"], expected: "expected.md" },
      { root: "task2", input: ["brief.md"], sop: ["brief.sop", "analysis.sop"] },
      { root: "task3", input: ["brief.md"], sop: ["brief.sop", "analysis.sop"] },
    ],
  },
  eval8: {
    kbSource: ["kb/input/legal-notice-generation-rules.md"],
    kbSop: ["kb/circuits/breach_notice/brief.sop", "kb/circuits/breach_notice/generate.sop", "kb/circuits/breach_notice/verify.sop"],
    tasks: [
      { root: "task", input: ["brief.md"], sop: ["notice_input.sop", "analysis.sop"], expected: "expected.md" },
      { root: "task2", input: ["brief.md"], sop: ["brief.sop", "analysis.sop"] },
      { root: "task3", input: ["brief.md"], sop: ["brief.sop", "analysis.sop"] },
    ],
  },
};

const sourceFile = (file) => ({
  file,
  role: "Human-readable source",
  explanation: "Text supplied to the coding agent. It contains domain knowledge or current task facts, not generated SOP.",
});
const sopFile = (file, role) => ({
  file,
  role,
  explanation: role === "Reviewed KB circuit"
    ? "Reviewed reusable executable knowledge. It is separate from both KB source prose and every current task."
    : "Coding-agent executable interpretation for this run. It is generated from that run's input and may call reviewed kb.* packages.",
});

function taskTree(task, index) {
  const label = `Task ${index + 1}`;
  const expected = task.expected ?? `${task.root}/expected.md`;
  return {
    label,
    path: `${task.root}/`,
    kind: "task",
    description: `Independent run ${index + 1}: current input, its generated circuit, and the executor-owned result stay below ${task.root}/.`,
    children: [
    {
      label: "Input documents",
      path: `${task.root}/input/`,
      kind: "source",
      files: task.input.map((name) => sourceFile(`${task.root}/input/${name}`)),
    },
    {
      label: "Generated SOP circuits",
      path: `${task.root}/sop/task/`,
      kind: "circuit",
      files: task.sop.map((name) => sopFile(`${task.root}/sop/task/${name}`, "Generated task circuit")),
    },
    {
      label: "Executor result",
      path: `${task.root}/results/`,
      kind: "result",
      files: [{
        file: `${task.root}/results/runtime-result.md`,
        role: "Authoritative executor result",
        explanation: "CLI-rendered public outputs, assurance checks, and receipt. Codex did not author this semantic result.",
      }],
    },
    {
      label: "Evaluation evidence",
      path: "outside semantic input",
      kind: "evidence",
      files: [
        {
          file: expected,
          role: "Post-run expectation comparison",
          explanation: "Evaluator material kept outside input. It states the source-derived expectation and compares it with the observed executor output.",
        },
        {
          file: `${task.root}/results/agent-summary.md`,
          role: "Coding-agent provenance only",
          explanation: "Records coverage, generated packages, and test attempts. It is not a semantic result and cannot override the executor report.",
        },
      ],
    },
  ],
  };
}

const caseId = window.evalCaseId;
const files = evaluationFiles[caseId];
if (!files) throw new Error(`Unknown evaluation case: ${caseId}`);
window.evalPage = {
  caseRoot: caseId,
  defaultFile: "task/results/runtime-result.md",
  tree: [
    {
      label: "Evaluation record",
      path: `${caseId}/`,
      kind: "record",
      description: "Human-authored explanation of the case and the recorded coding-agent/executor provenance.",
      files: [
        { file: "README.md", role: "Evaluation walkthrough", explanation: "Explains the domain, three task runs, observed outcomes, reproduction commands, and limitations." },
        { file: "run-provenance.md", role: "Recorded agent and executor process", explanation: "Records real coding-agent invocations and executor receipt identities separately from semantic inputs." },
      ],
    },
    {
      label: "Knowledge base",
      path: "kb/",
      kind: "kb",
      description: "Reusable domain knowledge. Human source documents and reviewed executable circuits remain separate.",
      children: [
        {
          label: "Source documents",
          path: "kb/input/",
          kind: "source",
          files: files.kbSource.map(sourceFile),
        },
        {
          label: "Reviewed SOP circuits",
          path: "kb/circuits/",
          kind: "circuit",
          files: files.kbSop.map((file) => sopFile(file, "Reviewed KB circuit")),
        },
      ],
    },
    ...files.tasks.map(taskTree),
  ],
};
