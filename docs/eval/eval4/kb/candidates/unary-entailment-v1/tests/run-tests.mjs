import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const here = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(process.argv[2] ?? path.join(here, "../../../../../.."))
const [{ PackageRegistry }, { SopRuntime }] = await Promise.all([
  import(pathToFileURL(path.join(projectRoot, "src/sop/registry.mjs"))),
  import(pathToFileURL(path.join(projectRoot, "src/sop/runtime.mjs"))),
])
const cases = JSON.parse(await readFile(path.join(here, "cases.json"), "utf8"))
const sopRoot = path.resolve(here, "../sop")
const registry = await PackageRegistry.fromRoots([{ path: sopRoot, prefix: "" }])
const runtime = new SopRuntime(registry)
const summaries = []

for (const testCase of cases) {
  const actual = await runtime.execute("unary_entailment.evaluate", testCase.inputs)
  assert.equal(actual.outcome, testCase.expected.outcome, `${testCase.id}: runtime outcome`)
  if (actual.outcome === "SUCCEEDED") {
    const result = actual.outputs[0]
    assert.equal(result.status, testCase.expected.status, `${testCase.id}: semantic status`)
    if (testCase.expected.queryMode) assert.equal(result.querySupport?.supportMode, testCase.expected.queryMode, `${testCase.id}: query support mode`)
    if (testCase.expected.oppositeMode) assert.equal(result.oppositeSupport?.supportMode, testCase.expected.oppositeMode, `${testCase.id}: opposite support mode`)
    if (testCase.expected.minimumDepth !== undefined) assert.equal(result.querySupport?.minimumDepth, testCase.expected.minimumDepth, `${testCase.id}: minimum depth`)
    if (testCase.expected.closureCount !== undefined) assert.equal(result.closure.length, testCase.expected.closureCount, `${testCase.id}: closure count`)
    if (testCase.expected.duplicateEvidenceSuppressed !== undefined) assert.equal(result.metrics.duplicateEvidenceSuppressed, testCase.expected.duplicateEvidenceSuppressed, `${testCase.id}: duplicates suppressed`)
    summaries.push({ id: testCase.id, category: testCase.category, outcome: actual.outcome, status: result.status, receiptHash: actual.receipt.receiptHash })
  } else {
    const refusedNode = actual.receipt.nodes.find((node) => node.status === "REFUSED")
    assert.equal(refusedNode?.refusal?.code, testCase.expected.code, `${testCase.id}: refusal code`)
    summaries.push({ id: testCase.id, category: testCase.category, outcome: actual.outcome, code: refusedNode?.refusal?.code, receiptHash: actual.receipt.receiptHash })
  }
}

process.stdout.write(`${JSON.stringify({ package: "unary_entailment.evaluate", passed: summaries.length, failed: 0, cases: summaries }, null, 2)}\n`)
