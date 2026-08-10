import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { PackageRegistry, SopRuntime } from "../../../../../../../src/index.mjs";

const sopRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../sop");

async function runtime() {
  const registry = await PackageRegistry.fromRoots([{ path: sopRoot, prefix: "" }]);
  return new SopRuntime(registry);
}

function validBrief(overrides = {}) {
  return {
    title: "The Last Lantern",
    protagonist: "Mara",
    setting: "the winter station",
    object: "a brass key",
    immediateGoal: "board the final train",
    obstacle: "the platform gate is locked",
    choice: "Mara gives the key to the stranded porter",
    consequence: "the porter opens the gate for everyone",
    closingImage: "snow whitening the silent rails",
    motifs: ["a dim lantern", "the station clock", "a red thread"],
    ...overrides,
  };
}

function checkById(verification, id) {
  return verification.checks.find((check) => check.id === id);
}

function boundaryBrief() {
  return {
    title: "TitleToken",
    protagonist: "ProtagonistToken",
    setting: "SettingToken",
    object: "ObjectToken",
    immediateGoal: "GoalToken",
    obstacle: "ObstacleToken",
    choice: "ChoiceToken",
    consequence: "ConsequenceToken",
    closingImage: "ClosingToken",
    motifs: ["MotifOneToken", "MotifTwoToken", "MotifThreeToken"],
  };
}

function visibleWords(markdown) {
  const visible = markdown.replace(/^#{1,6}\s+/gm, "").trim();
  return visible.length === 0 ? 0 : visible.split(/\s+/).length;
}

function markdownWithWordCount(target) {
  const base = [
    "# TitleToken",
    "",
    "## Arrival",
    "ProtagonistToken SettingToken ObjectToken GoalToken",
    "",
    "## Pressure",
    "ObstacleToken MotifOneToken",
    "",
    "## Choice",
    "ChoiceToken MotifTwoToken",
    "",
    "## Consequence",
    "ConsequenceToken MotifThreeToken ClosingToken",
  ];
  const baseCount = visibleWords(base.join("\n"));
  const padding = Array.from({ length: target - baseCount }, () => "filler").join(" ");
  base[3] = `${base[3]} ${padding}`.trim();
  const markdown = base.join("\n");
  assert.equal(visibleWords(markdown), target);
  return markdown;
}

test("composition generates and independently verifies a valid deterministic vignette", async () => {
  const result = await (await runtime()).execute("literary.composition", [validBrief()]);
  assert.equal(result.outcome, "SUCCEEDED");
  assert.equal(result.outputs[1].ok, true);
  assert.equal(result.outputs[1].counts.words, 192);
  assert.deepEqual(result.outputs[1].missingRequirements, []);
  assert.deepEqual(result.outputs[1].unexpectedStructuralConditions, []);
  assert.equal(result.receipt.nodes[0].childReceipt.package, "literary.generator");
  assert.equal(result.receipt.nodes[1].childReceipt.package, "literary.verifier");
  assert.match(result.receipt.outputHashes[0], /^sha256:/);
  assert.match(result.receipt.outputHashes[1], /^sha256:/);
});

test("verifier reports a tampered document without repairing or rejecting the result", async () => {
  const engine = await runtime();
  const generated = await engine.execute("literary.generator", [validBrief()]);
  const tampered = generated.outputs[0]
    .replace("## Pressure", "## Strain")
    .replace("a dim lantern", "an unprovided signal");
  const result = await engine.execute("literary.verifier", [validBrief(), tampered]);
  assert.equal(result.outcome, "SUCCEEDED");
  assert.equal(result.outputs[0].ok, false);
  assert.ok(result.outputs[0].missingRequirements.includes("motif:1"));
  assert.ok(result.outputs[0].unexpectedStructuralConditions.includes("HEADING_ORDER_MISMATCH"));
  assert.ok(result.outputs[0].unexpectedStructuralConditions.includes("UNAPPROVED_OR_ALTERED_CONTENT"));
  assert.equal(result.outputs[0].counts.levelTwoHeadings, 4);
});

test("word-count check accepts inclusive boundaries and rejects adjacent values", async () => {
  const engine = await runtime();
  for (const [count, expected] of [[89, false], [90, true], [220, true], [221, false]]) {
    const result = await engine.execute("literary.verifier", [boundaryBrief(), markdownWithWordCount(count)]);
    assert.equal(result.outcome, "SUCCEEDED");
    assert.equal(result.outputs[0].counts.words, count);
    assert.equal(checkById(result.outputs[0], "word-count-90-through-220").ok, expected);
    assert.equal(result.outputs[0].ok, false, "boundary fixture is not the approved generator template");
  }
});

test("generator uses distinct stable refusals for malformed briefs and source exceptions", async () => {
  const cases = [
    [null, "BRIEF_NOT_OBJECT"],
    [validBrief({ obstacle: undefined }), "MISSING_FIELD"],
    [validBrief({ obstacle: 7 }), "NON_STRING_FIELD"],
    [validBrief({ obstacle: "   " }), "EMPTY_FIELD"],
    [validBrief({ motifs: "not-an-array" }), "MOTIFS_NOT_ARRAY"],
    [validBrief({ motifs: ["one", "two"] }), "INVALID_MOTIF_COUNT"],
    [validBrief({ motifs: ["one", 2, "three"] }), "NON_STRING_MOTIF"],
    [validBrief({ motifs: ["one", " ", "three"] }), "EMPTY_MOTIF"],
    [validBrief({ title: "Line one\nLine two" }), "TITLE_CONTAINS_NEWLINE"],
  ];
  const engine = await runtime();
  for (const [brief, expectedCode] of cases) {
    const result = await engine.execute("literary.generator", [brief]);
    assert.equal(result.outcome, "REFUSED");
    assert.equal(result.outputs.length, 0);
    assert.equal(result.receipt.nodes[0].refusal.code, expectedCode);
  }
});

test("verifier refuses a non-string document instead of inventing a repair", async () => {
  const result = await (await runtime()).execute("literary.verifier", [validBrief(), { markdown: "wrong type" }]);
  assert.equal(result.outcome, "REFUSED");
  assert.equal(result.receipt.nodes[0].refusal.code, "MARKDOWN_NOT_STRING");
});

test("a valid but oversized brief remains visible as a semantic verification failure", async () => {
  const longGoal = Array.from({ length: 40 }, (_, index) => `goal${index}`).join(" ");
  const result = await (await runtime()).execute("literary.composition", [validBrief({ immediateGoal: longGoal })]);
  assert.equal(result.outcome, "SUCCEEDED");
  assert.equal(result.outputs[1].ok, false);
  assert.ok(result.outputs[1].counts.words > 220);
  assert.ok(result.outputs[1].missingRequirements.includes("word-count:90..220"));
});
