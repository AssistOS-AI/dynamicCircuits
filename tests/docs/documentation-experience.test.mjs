import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const docsRoot = path.join(repositoryRoot, "docs");
const evalRoot = path.join(docsRoot, "eval");

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

test("each evaluation has an independent grouped file browser with valid targets", async () => {
  const evalDirectories = (await readdir(evalRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory() && /^eval\d+$/.test(entry.name));
  assert.ok(evalDirectories.length >= 3);

  for (const entry of evalDirectories) {
    const caseRoot = path.join(evalRoot, entry.name);
    const indexPath = path.join(caseRoot, "index.html");
    const html = await readFile(indexPath, "utf8");
    assert.match(html, /Files by purpose/);
    assert.match(html, /\.\.\/eval-browser\.js/);
    assert.match(html, /title: "(?:Contract|Source|Policy|Task|Generated|Observed)/);

    const targets = [...html.matchAll(/file:\s*"([^"]+)"/g)].map((match) => match[1]);
    assert.ok(targets.length >= 6, `${entry.name} should expose its complete fixture`);
    for (const target of targets) {
      const targetPath = path.resolve(caseRoot, target);
      assert.ok(targetPath.startsWith(`${caseRoot}${path.sep}`), `${entry.name} browser target escapes its case`);
      assert.ok((await stat(targetPath)).isFile(), `${entry.name} browser target is missing: ${target}`);
    }
  }
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

test("the maintained tutorial covers deterministic, prepared, live, and learning tests", async () => {
  const tutorial = await readFile(path.join(docsRoot, "tutorial.html"), "utf8");
  assert.match(tutorial, /sop compile/);
  assert.match(tutorial, /sop run/);
  assert.match(tutorial, /--dry-run/);
  assert.match(tutorial, /-workdir/);
  assert.match(tutorial, /KB learning|Learn a KB rule/);
  assert.match(tutorial, /Input types|Useful inputs/);
});
