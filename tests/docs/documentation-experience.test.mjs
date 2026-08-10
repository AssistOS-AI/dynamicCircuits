import assert from "node:assert/strict";
import { readdir, readFile, realpath, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const docsRoot = path.join(repositoryRoot, "docs");
const evalRoot = path.join(docsRoot, "eval");
const readerPages = [
  "index.html",
  "getting-started.html",
  "architecture.html",
  "cli.html",
  "workspace-conventions.html",
  "tutorial.html",
  "input-guide.html",
  "sop-runtime.html",
  "concepts.html",
  "assurance.html",
  "operations.html",
  "lifecycle.html",
  "evaluation.html",
];

async function filesBelow(root, predicate) {
  const entries = await readdir(root, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(root, entry.name);
    if (entry.isDirectory()) {
      files.push(...await filesBelow(fullPath, predicate));
    } else if (entry.isFile() && predicate(fullPath)) {
      files.push(fullPath);
    }
  }
  return files;
}

test("documentation diagrams stay small, titled, centered, and explained", async () => {
  const htmlFiles = await filesBelow(docsRoot, (file) => file.endsWith(".html"));
  let diagramCount = 0;

  for (const htmlFile of htmlFiles) {
    const html = await readFile(htmlFile, "utf8");
    const diagrams = [...html.matchAll(/<pre class="mermaid">([\s\S]*?)<\/pre>/g)];
    for (const diagram of diagrams) {
      diagramCount += 1;
      const nodeIds = new Set([...diagram[1].matchAll(/\b([A-Z][A-Z0-9_]*)\s*[\[({]/g)].map((match) => match[1]));
      assert.ok(nodeIds.size <= 5, `${path.relative(repositoryRoot, htmlFile)} has ${nodeIds.size} diagram nodes`);
      const degrees = new Map([...nodeIds].map((node) => [node, { incoming: 0, outgoing: 0 }]));
      for (const edge of diagram[1].matchAll(/^\s*([A-Z][A-Z0-9_]*)[^\n]*?-->\s*(?:\|[^|]+\|\s*)?([A-Z][A-Z0-9_]*)/gm)) {
        degrees.get(edge[1]).outgoing += 1;
        degrees.get(edge[2]).incoming += 1;
      }
      assert.ok([...degrees.values()].some(({ incoming, outgoing }) => incoming > 1 || outgoing > 1),
        `${path.relative(repositoryRoot, htmlFile)} diagram must show a real branch or convergence`);
      const before = html.slice(Math.max(0, diagram.index - 300), diagram.index);
      assert.match(before, /<figure class="diagram">[\s\S]*<figcaption>/,
        `${path.relative(repositoryRoot, htmlFile)} must title and center each diagram`);
      const following = html.slice(diagram.index + diagram[0].length).trimStart();
      assert.match(following, /^<\/figure>\s*<p>/,
        `${path.relative(repositoryRoot, htmlFile)} must explain each diagram immediately`);
    }
  }

  assert.ok(diagramCount >= 6, "the documentation should retain several focused diagrams");
});

test("reader pages provide standalone context, examples, and onward navigation", async () => {
  for (const page of readerPages) {
    const html = await readFile(path.join(docsRoot, page), "utf8");
    const visibleText = html
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<style[\s\S]*?<\/style>/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const internalLinks = [...html.matchAll(/href="(?!https?:|mailto:|#)([^"]+)"/g)];
    const headings = [...html.matchAll(/<h[12][^>]*>([^<]+)<\/h[12]>/g)].map((match) => match[1]);

    assert.match(html, /<p class="lead">/, `${page} needs a direct page summary`);
    assert.ok(visibleText.split(" ").length >= 500, `${page} needs enough standalone explanation`);
    assert.ok(internalLinks.length >= 3, `${page} needs useful onward links`);
    assert.match(html, /specsLoader\.html\?spec=/, `${page} must connect explanation to a normative DS`);
    assert.ok(headings.every((heading) => heading.length <= 64), `${page} has a heading that is too long`);
    assert.doesNotMatch(html, /The problem is not merely|Task Calculus|Authority boundaries|Algorithms in core/i);

    for (const table of html.matchAll(/<\/table>/g)) {
      const following = html.slice(table.index + table[0].length).trimStart();
      assert.match(following, /^<p>/, `${page} must explain each table immediately`);
    }
  }
});

test("each evaluation uses the shared hierarchical file tree with valid targets", async () => {
  const evalDirectories = (await readdir(evalRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory() && /^eval\d+$/.test(entry.name));
  assert.ok(evalDirectories.length >= 3);
  const catalog = await readFile(path.join(evalRoot, "index.html"), "utf8");

  const manifestSource = await readFile(path.join(evalRoot, "eval-manifests.js"), "utf8");
  const treeSource = await readFile(path.join(evalRoot, "eval-file-tree.js"), "utf8");
  assert.match(treeSource, /customElements\.define\("eval-file-tree", EvalFileTree\)/);
  assert.match(treeSource, /button\.title = item\.file/,
    "file leaves must expose the complete relative path as a tooltip");
  assert.doesNotMatch(treeSource, /path\.textContent = item\.file/,
    "file leaves must not render complete paths into the narrow tree pane");
  for (const entry of evalDirectories) {
    assert.match(catalog, new RegExp(`href="${entry.name}/index\\.html"`),
      `evaluation catalog must link ${entry.name}`);
    const caseRoot = path.join(evalRoot, entry.name);
    const indexPath = path.join(caseRoot, "index.html");
    const html = await readFile(indexPath, "utf8");
    assert.match(html, /Evaluation files/);
    assert.match(html, /<eval-file-tree id="eval-file-tree"><\/eval-file-tree>/);
    assert.match(html, /\.\.\/eval-file-tree\.js/);
    assert.match(html, /\.\.\/eval-browser\.js/);
    assert.match(html, /\.\.\/eval-manifests\.js/);
    assert.doesNotMatch(html, /window\.evalPage\s*=/, `${entry.name} duplicates the shared file manifest`);

    const context = { window: { evalCaseId: entry.name } };
    vm.runInNewContext(manifestSource, context, { filename: "eval-manifests.js" });
    const config = context.window.evalPage;
    assert.equal(config.tree.length, 5, `${entry.name} must expose the evaluation, KB, and three task roots`);
    assert.deepEqual(
      Array.from(config.tree, ({ label }) => label),
      ["Evaluation record", "Knowledge base", "Task 1", "Task 2", "Task 3"],
      `${entry.name} has an unexpected file-tree root order`,
    );
    assert.deepEqual(
      Array.from(config.tree[1].children, ({ label }) => label),
      ["Source documents", "Reviewed SOP circuits"],
      `${entry.name} must separate KB prose from reviewed circuits`,
    );
    for (const task of config.tree.slice(2)) {
      assert.deepEqual(
        Array.from(task.children, ({ label }) => label),
        ["Input documents", "Generated SOP circuits", "Executor result", "Evaluation evidence"],
        `${entry.name}/${task.label} has an unexpected role tree`,
      );
    }
    const flattenFiles = (nodes) => nodes.flatMap((node) => [
      ...(node.files ?? []),
      ...flattenFiles(node.children ?? []),
    ]);
    const targets = flattenFiles(config.tree).map(({ file }) => file);
    assert.ok(targets.length >= 15, `${entry.name} should expose all three complete fixtures`);
    for (const target of targets) {
      const targetPath = path.resolve(caseRoot, target);
      assert.ok(targetPath.startsWith(`${caseRoot}${path.sep}`), `${entry.name} browser target escapes its case`);
      assert.ok((await stat(targetPath)).isFile(), `${entry.name} browser target is missing: ${target}`);
    }
  }
});

test("evaluation fixtures separate reusable KB artifacts from current task artifacts", async () => {
  const evalDirectories = (await readdir(evalRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory() && /^eval\d+$/.test(entry.name));
  const expectedDirectories = [
    "kb/input", "kb/circuits",
    "task/input", "task/sop", "task/results",
    "task2/input", "task2/sop", "task2/results",
    "task3/input", "task3/sop", "task3/results",
  ];
  const skillsRoot = await realpath(path.join(repositoryRoot, "circuitSkills"));

  for (const entry of evalDirectories) {
    const caseRoot = path.join(evalRoot, entry.name);
    for (const relativeDirectory of expectedDirectories) {
      assert.ok((await stat(path.join(caseRoot, relativeDirectory))).isDirectory(),
        `${entry.name} is missing ${relativeDirectory}`);
    }
    for (const obsoleteDirectory of ["input", "sop", "results"]) {
      await assert.rejects(stat(path.join(caseRoot, obsoleteDirectory)),
        `${entry.name}/${obsoleteDirectory} must not merge KB and task roles`);
    }
    for (const workspace of ["kb", "task", "task2", "task3"]) {
      for (const link of ["circuitSkills", ".agents/skills"]) {
        assert.equal(await realpath(path.join(caseRoot, workspace, link)), skillsRoot,
          `${entry.name}/${workspace}/${link} must resolve to the project skill catalog`);
      }
    }
  }
});

test("all reader pages load one grouped, mount-aware navigation source", async () => {
  const header = await readFile(path.join(docsRoot, "partials/header.html"), "utf8");
  const groups = [...header.matchAll(/<details class="nav-group">([\s\S]*?)<\/details>/g)];
  assert.equal(groups.length, 4, "the top menu should remain compact and grouped");
  for (const group of groups) {
    const links = [...group[1].matchAll(/<a href=/g)];
    assert.ok(links.length >= 3 && links.length <= 4, "each submenu should contain three or four vertical choices");
  }

  const htmlFiles = await filesBelow(docsRoot, (file) => file.endsWith(".html") && !file.includes(`${path.sep}partials${path.sep}`));
  for (const htmlFile of htmlFiles) {
    const html = await readFile(htmlFile, "utf8");
    assert.match(html, /data-include="partials\/header\.html"/,
      `${path.relative(repositoryRoot, htmlFile)} must load the shared header`);
    assert.doesNotMatch(html, /<header class="site-header">/,
      `${path.relative(repositoryRoot, htmlFile)} duplicates the shared navigation`);
  }

  const loader = await readFile(path.join(docsRoot, "partials-loader.js"), "utf8");
  assert.match(loader, /new URL\("\.\/", loaderUrl\)/);
  assert.match(loader, /group\.addEventListener\("toggle"/,
    "opening one navigation group must close its siblings");
  assert.match(loader, /document\.addEventListener\("pointerdown"/,
    "clicking outside the primary navigation must close open groups");
  assert.match(loader, /event\.key !== "Escape"/,
    "Escape must close open navigation groups");
  assert.match(loader, /new URL\(href, docsRoot\)/);
});

test("evaluation sources are readable documents and generated SOP does not parse hidden JSON input", async () => {
  const inputFiles = await filesBelow(evalRoot, (file) => file.includes(`${path.sep}input${path.sep}`));
  assert.ok(inputFiles.length > 0);
  for (const inputFile of inputFiles) {
    assert.match(inputFile, /\.(?:md|txt|csv)$/i, `source input must be a readable document: ${inputFile}`);
  }

  const sopFiles = await filesBelow(evalRoot, (file) => file.endsWith(".sop"));
  for (const sopFile of sopFiles) {
    assert.doesNotMatch(await readFile(sopFile, "utf8"), /JSON\.parse\s*\(/, `${sopFile} parses hidden JSON input`);
  }
});

test("eval5 gives each coding-agent stage one large readable source", async () => {
  const caseRoot = path.join(evalRoot, "eval5");
  const rulePages = (await readdir(path.join(caseRoot, "kb", "input"))).filter((name) => name.endsWith(".md"));
  const taskPages = (await readdir(path.join(caseRoot, "task", "input"))).filter((name) => name.endsWith(".md"));
  const ruleCircuits = (await readdir(path.join(caseRoot, "kb", "circuits", "data_release_governance")))
    .filter((name) => /^r\d{2}\.sop$/.test(name));
  const knowledgeSource = await readFile(path.join(caseRoot, "kb", "input", "knowledge-base.md"), "utf8");
  const taskSource = await readFile(path.join(caseRoot, "task", "input", "task.md"), "utf8");

  assert.deepEqual(rulePages, ["knowledge-base.md"]);
  assert.deepEqual(taskPages, ["task.md"]);
  assert.equal(ruleCircuits.length, 10);
  assert.equal([...knowledgeSource.matchAll(/^## Rule R\d{2}/gm)].length, 10);
  assert.equal([...taskSource.matchAll(/^## Record REL-\d{2}/gm)].length, 10);
  assert.match(await readFile(path.join(caseRoot, "kb", "circuits", "README.md"), "utf8"), /Codex learning run/);
  await assert.rejects(stat(path.join(caseRoot, "task", "results", "result.json")),
    "eval5 must use the coding-agent Markdown report instead of a JSON result fixture");

  for (const name of ruleCircuits) {
    const candidate = await readFile(path.join(
      caseRoot, "kb", "candidates", "data-release-governance-v1", "sop", "data_release_governance", name,
    ), "utf8");
    const promoted = await readFile(path.join(caseRoot, "kb", "circuits", "data_release_governance", name), "utf8");
    assert.equal(promoted, candidate, `${name} must preserve the Codex-generated candidate bytes`);
  }
  const candidateReview = await readFile(path.join(
    caseRoot, "kb", "candidates", "data-release-governance-v1", "sop", "data_release_governance", "review.sop",
  ), "utf8");
  const promotedReview = await readFile(path.join(
    caseRoot, "kb", "circuits", "data_release_governance", "review.sop",
  ), "utf8");
  assert.equal(promotedReview.replaceAll("kb.data_release_governance.", "data_release_governance."), candidateReview,
    "promotion may only add the runtime KB namespace to nested calls");
});

test("analysis skill requires task SOP, a fixed KB-composing root, and executor-owned results", async () => {
  const skill = await readFile(path.join(repositoryRoot, "circuitSkills", "analyze-task", "SKILL.md"), "utf8");
  assert.match(skill, /Create task-input SOP packages/);
  assert.match(skill, /root package `task\.analysis`/);
  assert.match(skill, /must not duplicate reusable policy logic/);
  assert.match(skill, /Never create `result\.json`/);
  assert.match(skill, /CLI writes `runtime-result\.md` deterministically/);
});

test("the maintained tutorial covers deterministic, prepared, live, and learning tests", async () => {
  const tutorial = await readFile(path.join(docsRoot, "tutorial.html"), "utf8");
  assert.match(tutorial, /sop compile/);
  assert.match(tutorial, /sop run/);
  assert.match(tutorial, /--dry-run/);
  assert.match(tutorial, /-workdir/);
  assert.match(tutorial, /KB learning|Learn a KB rule/);
  assert.match(tutorial, /Input types|Useful inputs/);
});
