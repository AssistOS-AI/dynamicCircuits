import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

test("specification matrix links preserve a static-server mount prefix", async () => {
  const matrix = await readFile(path.join(repositoryRoot, "docs", "specs", "matrix.md"), "utf8");
  const links = [...matrix.matchAll(/\]\((specsLoader\.html\?spec=DS\d{3}-[^)]+)\)/g)].map((match) => match[1]);
  assert.ok(links.length > 0, "the generated matrix must contain DS links");
  assert.doesNotMatch(matrix, /\]\(\/specsLoader\.html\?spec=/);
  const mountedMatrix = "http://localhost:8080/workspace-files/dynamicCircuits/docs/specsLoader.html?spec=matrix.md";
  const resolved = new URL(links[0], mountedMatrix);
  assert.equal(resolved.pathname, "/workspace-files/dynamicCircuits/docs/specsLoader.html");
});
