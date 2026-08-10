import assert from "node:assert/strict";
import test from "node:test";
import { parseSop, SopError } from "../../src/index.mjs";

test("parses directives, JavaScript islands, comments, and continued calls", () => {
  const ast = parseSop(`@input source
@output result
@goal valid covers result

@build define value optional
    async function run({ value, optional }) {
      return { value, optional, marker: "# retained" }
    }

    return { run }

@result build
  $source
  "literal" # ignored
@valid assertInvariant "true" "goal"
`);
  assert.deepEqual(ast.inputs, ["source"]);
  assert.deepEqual(ast.outputs, ["result"]);
  assert.equal(ast.commands[0].formals[1], "optional");
  assert.match(ast.commands[0].code, /# retained/);
  assert.deepEqual(ast.nodes[0].args, [
    { kind: "wire", name: "source" },
    { kind: "literal", value: "literal" },
  ]);
});

test("rejects bare arguments", () => {
  assert.throws(
    () => parseSop("@output out\n@out value bare\n"),
    (error) => error instanceof SopError && error.code === "PARSE_ERROR",
  );
});

test("rejects duplicate command formals", () => {
  assert.throws(
    () => parseSop("@output out\n@x define a a\n  return { run() { return true } }\n@out x\n"),
    (error) => error.code === "PARSE_ERROR",
  );
});

test("rejects duplicate ports and literal coverage wire names", () => {
  assert.throws(
    () => parseSop("@input same same\n@output same\n"),
    (error) => error.code === "WIRE_REDEFINITION",
  );
  assert.throws(
    () => parseSop("@output result\n@goal \"result\"\n@result value \"x\"\n"),
    (error) => error.code === "PARSE_ERROR",
  );
});

test("requires unique dotted semantic keys for matcher triggers", () => {
  assert.throws(
    () => parseSop("@template mandatory\n@trigger \"notice\"\n@apply kb.rule\n@input index delta\n@output matches\n@matches emptyList\n"),
    (error) => error.code === "PARSE_ERROR",
  );
  assert.throws(
    () => parseSop("@template mandatory\n@trigger \"case.notice\" \"case.notice\"\n@apply kb.rule\n@input index delta\n@output matches\n@matches emptyList\n"),
    (error) => error.code === "PARSE_ERROR",
  );
});
