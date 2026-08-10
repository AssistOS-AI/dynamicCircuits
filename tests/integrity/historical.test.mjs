import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const historicalRoot = path.join(repositoryRoot, "sop_lang_circuits_design_specs_v1");
const expectedAggregateHash = "afac24ca0de77c5049ac752cbab393eb5944f41dd4f9bafa35273cce5b196113";

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? listFiles(target) : [target];
  }));
  return nested.flat();
}

test("keeps the first design specification package byte-for-byte immutable", async () => {
  const files = (await listFiles(historicalRoot)).sort();
  const lines = [];
  for (const filePath of files) {
    const fileHash = createHash("sha256").update(await readFile(filePath)).digest("hex");
    const relativePath = path.relative(repositoryRoot, filePath).split(path.sep).join("/");
    lines.push(`${fileHash}  ${relativePath}\n`);
  }
  const aggregateHash = createHash("sha256").update(lines.join("")).digest("hex");
  assert.equal(aggregateHash, expectedAggregateHash);
});
