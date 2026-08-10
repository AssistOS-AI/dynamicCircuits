#!/usr/bin/env node
import assert from "node:assert/strict"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const cliPath = process.argv[2]
if (!cliPath) throw new Error("Usage: node tests/run-cases.mjs PATH_TO_DYNAMIC_CIRCUITS_CLI")

const sopRoot = fileURLToPath(new URL("../sop", import.meta.url))
const runtimeSource = path.join(path.dirname(path.resolve(cliPath)), "sop")
const { PackageRegistry } = await import(pathToFileURL(path.join(runtimeSource, "registry.mjs")))
const { compilePackage } = await import(pathToFileURL(path.join(runtimeSource, "compiler.mjs")))
const { SopRuntime } = await import(pathToFileURL(path.join(runtimeSource, "runtime.mjs")))
const registry = await PackageRegistry.fromRoots([{ path: sopRoot, prefix: "" }])
const runtime = new SopRuntime(registry)
const baseBrief = {
  sender: "Northwind Services Ltd.",
  recipient: "Blue Harbor Retail LLC",
  agreementTitle: "Managed Support Agreement",
  agreementDate: "2026-01-15",
  noticeDate: "2026-08-10",
  contractClause: "Section 7.2 (Service Availability)",
  eventStatement: "The July uptime report records 97.8% availability.",
  cureAction: "Provide the remediation plan described in the agreement.",
  cureDeadlineDate: "2026-08-24",
  permittedDeliveryMethod: "Registered email to notices@blueharbor.example",
  reservationText: "Northwind reserves all rights stated in the agreement.",
  governingLawStatement: "The agreement states that the law of Example State governs.",
  factualExhibits: ["July uptime report", "Support ticket export"]
}

function compile(packageName) {
  const result = compilePackage(registry, packageName)
  assert.equal(result.packageName, packageName)
  return result.packageHash
}

async function run(packageName, inputs) {
  return runtime.execute(packageName, inputs)
}

const packageHashes = {
  brief: compile("breach_notice.brief"),
  verify: compile("breach_notice.verify"),
  generate: compile("breach_notice.generate")
}

const results = []
function record(name, category, result, inspect) {
  inspect(result)
  results.push({
    name,
    category,
    outcome: result.outcome,
    receiptHash: result.receipt.receiptHash,
    outputHashes: result.receipt.outputHashes,
    reportOk: result.outcome === "SUCCEEDED" && result.outputs.at(-1)?.ok,
    failedChecks: result.outcome === "SUCCEEDED" && result.outputs.at(-1)?.checks
      ? Object.entries(result.outputs.at(-1).checks).filter(([, ok]) => !ok).map(([name]) => name)
      : []
  })
}

const positive = await run("breach_notice.generate", [baseBrief])
record("positive_standard_generation", "positive", positive, (result) => {
  assert.equal(result.outcome, "SUCCEEDED")
  assert.equal(result.outputs[1].ok, true)
})
const generatedNotice = positive.outputs[0]

record("positive_independent_verification", "positive", await run("breach_notice.verify", [baseBrief, generatedNotice]), (result) => {
  assert.equal(result.outcome, "SUCCEEDED")
  assert.equal(result.outputs[0].ok, true)
})

const missingLabel = generatedNotice.replace("Supplied factual statement:", "Factual statement:")
record("negative_missing_factual_label", "negative", await run("breach_notice.verify", [baseBrief, missingLabel]), (result) => {
  assert.equal(result.outcome, "SUCCEEDED")
  assert.equal(result.outputs[0].ok, false)
  assert.ok(result.outputs[0].missingItems.includes("factualLabelPresent"))
})

const unsupportedAdditions = generatedNotice.replace(
  "## Notice Purpose\n",
  "## Notice Purpose\n$ statutory penalty\n"
)
record("negative_unsupported_additions", "negative", await run("breach_notice.verify", [baseBrief, unsupportedAdditions]), (result) => {
  assert.equal(result.outcome, "SUCCEEDED")
  assert.equal(result.outputs[0].ok, false)
  assert.deepEqual(result.outputs[0].prohibitedAdditions, ["currency_symbol:$", "phrase:statutory penalty"])
})

const changedDeadline = generatedNotice.replace(baseBrief.cureDeadlineDate, "2026-08-25")
record("negative_changed_deadline", "negative", await run("breach_notice.verify", [baseBrief, changedDeadline]), (result) => {
  assert.equal(result.outcome, "SUCCEEDED")
  assert.equal(result.outputs[0].checks.deadlineUnchanged, false)
  assert.equal(result.outputs[0].checks.allSuppliedValuesPresent, false)
})

const reversedExhibits = generatedNotice.replace(
  "1. July uptime report\n2. Support ticket export",
  "1. Support ticket export\n2. July uptime report"
)
record("negative_reordered_exhibits", "negative", await run("breach_notice.verify", [baseBrief, reversedExhibits]), (result) => {
  assert.equal(result.outcome, "SUCCEEDED")
  assert.equal(result.outputs[0].checks.orderedExhibits, false)
})

const minimalBrief = {
  sender: "Ω",
  recipient: "Ж",
  agreementTitle: "a",
  agreementDate: "b",
  noticeDate: "c",
  contractClause: "d",
  eventStatement: "e",
  cureAction: "f",
  cureDeadlineDate: "g",
  permittedDeliveryMethod: "h",
  reservationText: "i",
  governingLawStatement: "j",
  factualExhibits: ["k"]
}
record("boundary_one_character_values", "boundary", await run("breach_notice.generate", [minimalBrief]), (result) => {
  assert.equal(result.outcome, "SUCCEEDED")
  assert.equal(result.outputs[1].ok, true)
})

const allowedTermsBrief = {
  ...baseBrief,
  eventStatement: `${baseBrief.eventStatement} The supplied report uses $ and the exact phrase statutory penalty.`
}
record("exception_terms_supplied_by_brief", "exception", await run("breach_notice.generate", [allowedTermsBrief]), (result) => {
  assert.equal(result.outcome, "SUCCEEDED")
  assert.equal(result.outputs[1].checks.noUnsupportedCurrency, true)
  assert.equal(result.outputs[1].checks.noUnsupportedPenaltyLanguage, true)
})

const missingSender = { ...baseBrief }
delete missingSender.sender
record("refusal_missing_required_field", "malformed/refusal", await run("breach_notice.generate", [missingSender]), (result) => {
  assert.equal(result.outcome, "REFUSED")
  assert.equal(result.receipt.nodes[0].childReceipt.nodes[0].refusal.code, "INVALID_BRIEF")
})

record("refusal_empty_exhibit_list", "malformed/refusal", await run("breach_notice.generate", [{ ...baseBrief, factualExhibits: [] }]), (result) => {
  assert.equal(result.outcome, "REFUSED")
})

record("refusal_non_string_notice", "malformed/refusal", await run("breach_notice.verify", [baseBrief, 42]), (result) => {
  assert.equal(result.outcome, "REFUSED")
  assert.equal(result.receipt.nodes[1].refusal.code, "INVALID_NOTICE_TYPE")
})

const headingInjectionBrief = {
  ...baseBrief,
  eventStatement: `${baseBrief.eventStatement}\n## Unrequested Heading`
}
record("rejection_heading_injection", "exception/rejection", await run("breach_notice.generate", [headingInjectionBrief]), (result) => {
  assert.equal(result.outcome, "REJECTED")
  assert.equal(result.receipt.checks[0].ok, false)
})

const overlappingPartyBrief = {
  ...baseBrief,
  sender: "Acme",
  recipient: "Acme Holdings"
}
record("rejection_overlapping_party_names", "boundary/rejection", await run("breach_notice.generate", [overlappingPartyBrief]), (result) => {
  assert.equal(result.outcome, "REJECTED")
  assert.equal(result.receipt.checks[0].ok, false)
})

process.stdout.write(`${JSON.stringify({ packageHashes, passed: results.length, failed: 0, results }, null, 2)}\n`)
