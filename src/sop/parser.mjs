import { fail } from "./errors.mjs";

const IDENTIFIER = /^[A-Za-z_][A-Za-z0-9_]*$/;
const QUALIFIED = /^[A-Za-z_][A-Za-z0-9_]*(\.[A-Za-z_][A-Za-z0-9_]*)*$/;
const UNIQUE_DIRECTIVES = new Set(["input", "output", "template", "trigger", "apply"]);

function location(filePath, line) {
  return { file: filePath, line };
}

function stripComment(line) {
  let quoted = false;
  let escaped = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (escaped) {
      escaped = false;
    } else if (quoted && char === "\\") {
      escaped = true;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "#" && !quoted) {
      return line.slice(0, index);
    }
  }
  return line;
}

function tokenize(text, filePath, line) {
  const tokens = [];
  let index = 0;
  while (index < text.length) {
    while (/\s/.test(text[index] ?? "")) index += 1;
    if (index >= text.length) break;
    if (text[index] === '"') {
      const start = index;
      index += 1;
      let escaped = false;
      while (index < text.length) {
        const char = text[index];
        index += 1;
        if (escaped) escaped = false;
        else if (char === "\\") escaped = true;
        else if (char === '"') break;
      }
      const raw = text.slice(start, index);
      if (!raw.endsWith('"')) fail("PARSE_ERROR", "Unclosed string literal", location(filePath, line));
      try {
        tokens.push({ kind: "literal", value: JSON.parse(raw), raw });
      } catch {
        fail("PARSE_ERROR", "Invalid JSON string literal", location(filePath, line));
      }
      continue;
    }
    const start = index;
    while (index < text.length && !/\s/.test(text[index])) index += 1;
    const raw = text.slice(start, index);
    tokens.push({ kind: "word", value: raw, raw });
  }
  return tokens;
}

function assertIdentifier(name, filePath, line, label = "identifier") {
  if (!IDENTIFIER.test(name)) {
    fail("PARSE_ERROR", `Invalid ${label}: ${name}`, location(filePath, line));
  }
}

function parseNameList(tokens, filePath, line, label) {
  return tokens.map((token) => {
    if (token.kind !== "word") fail("PARSE_ERROR", `${label} must use bare names`, location(filePath, line));
    assertIdentifier(token.value, filePath, line, label);
    return token.value;
  });
}

function parseCoverage(tokens, filePath, line, kind) {
  if (tokens.length < 2) fail("PARSE_ERROR", `@${kind} requires a wire`, location(filePath, line));
  const wire = tokens[1].value;
  assertIdentifier(wire, filePath, line, `${kind} wire`);
  if (tokens.length === 2) return { wire, covers: [], line };
  if (tokens[2].value !== "covers") {
    fail("PARSE_ERROR", `@${kind} only accepts the covers clause`, location(filePath, line));
  }
  return { wire, covers: parseNameList(tokens.slice(3), filePath, line, "covered wire"), line };
}

function commonIndent(lines) {
  const indents = lines
    .filter((line) => line.trim())
    .map((line) => line.match(/^[ \t]*/)[0].length);
  return indents.length ? Math.min(...indents) : 0;
}

function parseCall(tokens, filePath, line) {
  let index = 0;
  const outputs = [];
  while (tokens[index]?.kind === "word" && tokens[index].value.startsWith("@")) {
    const name = tokens[index].value.slice(1);
    assertIdentifier(name, filePath, line, "output wire");
    outputs.push(name);
    index += 1;
  }
  if (!outputs.length) fail("PARSE_ERROR", "A call must declare at least one output wire", location(filePath, line));
  if (new Set(outputs).size !== outputs.length) {
    fail("WIRE_REDEFINITION", "A call declares the same output wire twice", location(filePath, line));
  }
  const callee = tokens[index]?.value;
  if (!callee || tokens[index].kind !== "word" || !QUALIFIED.test(callee)) {
    fail("PARSE_ERROR", "A call requires a valid command or package name", location(filePath, line));
  }
  const args = tokens.slice(index + 1).map((token) => {
    if (token.kind === "literal") return { kind: "literal", value: token.value };
    if (token.kind === "word" && token.value.startsWith("$") && IDENTIFIER.test(token.value.slice(1))) {
      return { kind: "wire", name: token.value.slice(1) };
    }
    fail("PARSE_ERROR", `Invalid call argument: ${token.raw}`, location(filePath, line));
  });
  return { outputs, callee, args, line };
}

export function parseSop(source, options = {}) {
  const filePath = options.filePath ?? "<memory>";
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const result = {
    filePath,
    inputs: [],
    outputs: [],
    commands: [],
    nodes: [],
    invariants: [],
    goals: [],
    template: null,
    trigger: null,
    apply: null,
  };
  const seenDirectives = new Set();

  for (let index = 0; index < lines.length; index += 1) {
    const rawLine = lines[index];
    const lineNumber = index + 1;
    if (!rawLine.trim() || rawLine.trimStart().startsWith("#")) continue;
    if (/^[ \t]/.test(rawLine)) {
      fail("PARSE_ERROR", "Continuation line has no parent statement", location(filePath, lineNumber));
    }
    const topTokens = tokenize(stripComment(rawLine), filePath, lineNumber);
    if (!topTokens.length) continue;

    const definitionMatch = topTokens[0]?.value.match(/^@([A-Za-z_][A-Za-z0-9_]*)$/);
    if (definitionMatch && topTokens[1]?.value === "define") {
      const name = definitionMatch[1];
      const formals = parseNameList(topTokens.slice(2), filePath, lineNumber, "formal parameter");
      if (new Set(formals).size !== formals.length) {
        fail("PARSE_ERROR", `Command ${name} has duplicate formal parameters`, location(filePath, lineNumber));
      }
      const block = [];
      let cursor = index + 1;
      for (; cursor < lines.length; cursor += 1) {
        const candidate = lines[cursor];
        if (candidate.trim() && !/^[ \t]/.test(candidate)) break;
        block.push(candidate);
      }
      const indent = commonIndent(block);
      const code = block.map((line) => (line.trim() ? line.slice(indent) : "")).join("\n").trimEnd();
      if (!code.trim()) fail("PARSE_ERROR", `Command ${name} has an empty JavaScript block`, location(filePath, lineNumber));
      result.commands.push({ name, formals, code, line: lineNumber });
      index = cursor - 1;
      continue;
    }

    if (["@input", "@output", "@invariant", "@goal", "@template", "@trigger", "@apply"].includes(topTokens[0].value)) {
      const directive = topTokens[0].value.slice(1);
      if (UNIQUE_DIRECTIVES.has(directive) && seenDirectives.has(directive)) {
        fail("DUPLICATE_DIRECTIVE", `@${directive} may appear only once`, location(filePath, lineNumber));
      }
      seenDirectives.add(directive);
      if (directive === "input" || directive === "output") {
        const names = parseNameList(topTokens.slice(1), filePath, lineNumber, `${directive} port`);
        if (directive === "output" && !names.length) fail("PARSE_ERROR", "@output cannot be empty", location(filePath, lineNumber));
        result[`${directive}s`] = names;
      } else if (directive === "invariant" || directive === "goal") {
        result[`${directive}s`].push(parseCoverage(topTokens, filePath, lineNumber, directive));
      } else if (directive === "template") {
        if (topTokens.length !== 2 || !["mandatory", "optional"].includes(topTokens[1].value)) {
          fail("PARSE_ERROR", "@template requires mandatory or optional", location(filePath, lineNumber));
        }
        result.template = topTokens[1].value;
      } else if (directive === "trigger") {
        if (topTokens.length < 2 || topTokens.slice(1).some((token) => token.kind !== "literal")) {
          fail("PARSE_ERROR", "@trigger requires one or more string literals", location(filePath, lineNumber));
        }
        result.trigger = topTokens.slice(1).map((token) => token.value);
      } else if (directive === "apply") {
        if (topTokens.length !== 2 || topTokens[1].kind !== "word" || !QUALIFIED.test(topTokens[1].value)) {
          fail("PARSE_ERROR", "@apply requires one qualified package name", location(filePath, lineNumber));
        }
        result.apply = topTokens[1].value;
      }
      continue;
    }

    const statementLines = [stripComment(rawLine)];
    let cursor = index + 1;
    while (cursor < lines.length && /^[ \t]/.test(lines[cursor]) && lines[cursor].trim()) {
      statementLines.push(stripComment(lines[cursor]));
      cursor += 1;
    }
    const callTokens = tokenize(statementLines.join(" "), filePath, lineNumber);
    result.nodes.push(parseCall(callTokens, filePath, lineNumber));
    index = cursor - 1;
  }

  const commandNames = result.commands.map(({ name }) => name);
  if (new Set(commandNames).size !== commandNames.length) {
    fail("PARSE_ERROR", "A command name is defined more than once", { file: filePath });
  }
  if ((result.template || result.trigger || result.apply) && !(result.template && result.trigger && result.apply)) {
    fail("PARSE_ERROR", "Matcher metadata requires @template, @trigger, and @apply together", { file: filePath });
  }
  return result;
}
