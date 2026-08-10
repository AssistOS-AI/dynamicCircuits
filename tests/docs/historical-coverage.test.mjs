import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

test("maps every historical design specification and auxiliary contract family", async () => {
  const coverage = await readFile(path.join(repositoryRoot, "docs", "specs", "historical-coverage.md"), "utf8");
  for (let index = 1; index <= 24; index += 1) {
    const historicalId = `DS-${String(index).padStart(3, "0")}`;
    assert.match(coverage, new RegExp(`\\| ${historicalId.replace("-", "-")} `), `${historicalId} is not mapped`);
  }
  for (const family of ["Assurance profile schema", "IR schema", "Receipt schema", "Workspace layout", "Kernel review checklist"] ) {
    assert.match(coverage, new RegExp(family, "i"), `${family} is not mapped`);
  }
});
