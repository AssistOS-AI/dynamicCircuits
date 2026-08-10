import { coreCommands } from "./core-commands.mjs";
import { fail } from "./errors.mjs";

function resolveCallee(registry, owner, node) {
  if (owner.ast.commands.some((command) => command.name === node.callee)) {
    return { kind: "command", packageName: owner.packageName, commandName: node.callee };
  }
  if (coreCommands[node.callee]) return { kind: "core", commandName: node.callee };
  if (registry.has(node.callee)) return { kind: "circuit", packageName: node.callee };
  const packageNames = registry.names().filter((name) => node.callee.startsWith(`${name}.`));
  packageNames.sort((left, right) => right.length - left.length);
  for (const packageName of packageNames) {
    const commandName = node.callee.slice(packageName.length + 1);
    if (registry.get(packageName).ast.commands.some((command) => command.name === commandName)) {
      return { kind: "command", packageName, commandName };
    }
  }
  fail("UNKNOWN_CALLEE", `Unknown command or circuit: ${node.callee}`, {
    file: owner.filePath,
    line: node.line,
  });
}

function dependenciesFor(node, producers, owner) {
  return [...new Set(node.args.filter((arg) => arg.kind === "wire").map((arg) => {
    if (!producers.has(arg.name)) {
      fail("FREE_WIRE", `Wire $${arg.name} has no input or producer`, {
        file: owner.filePath,
        line: node.line,
        wire: arg.name,
      });
    }
    return producers.get(arg.name);
  }).filter((producer) => producer !== null))];
}

function topologicalOrder(nodes, owner) {
  const byId = new Map(nodes.map((node) => [node.nodeId, node]));
  const remaining = new Map(nodes.map((node) => [node.nodeId, new Set(node.dependencies)]));
  const ready = nodes.filter((node) => !remaining.get(node.nodeId).size).map((node) => node.nodeId).sort();
  const order = [];
  while (ready.length) {
    const current = ready.shift();
    order.push(current);
    for (const node of nodes) {
      const dependencies = remaining.get(node.nodeId);
      if (dependencies.delete(current) && dependencies.size === 0 && !order.includes(node.nodeId) && !ready.includes(node.nodeId)) {
        ready.push(node.nodeId);
        ready.sort();
      }
    }
  }
  if (order.length !== nodes.length) {
    fail("CYCLE_NOT_SUPPORTED", `Package ${owner.packageName} contains a dependency cycle`, { file: owner.filePath });
  }
  return order.map((id) => byId.get(id));
}

function ancestorWires(wire, producers, nodeById, memo = new Map()) {
  if (memo.has(wire)) return memo.get(wire);
  const result = new Set([wire]);
  const producerId = producers.get(wire);
  if (producerId) {
    const producer = nodeById.get(producerId);
    for (const arg of producer.args.filter((candidate) => candidate.kind === "wire")) {
      for (const ancestor of ancestorWires(arg.name, producers, nodeById, memo)) result.add(ancestor);
    }
  }
  memo.set(wire, result);
  return result;
}

function relevantNodeIds(rootWires, producers, nodeById) {
  const relevant = new Set();
  function visit(wire) {
    const producer = producers.get(wire);
    if (!producer || relevant.has(producer)) return;
    relevant.add(producer);
    for (const arg of nodeById.get(producer).args) if (arg.kind === "wire") visit(arg.name);
  }
  for (const wire of rootWires) visit(wire);
  return relevant;
}

export function compilePackage(registry, packageName, cache = new Map(), stack = []) {
  if (cache.has(packageName)) return cache.get(packageName);
  const owner = registry.get(packageName);
  if (!owner) fail("UNKNOWN_PACKAGE", `Unknown package: ${packageName}`);
  if (stack.includes(packageName)) {
    fail("CYCLE_NOT_SUPPORTED", `Circuit call cycle: ${[...stack, packageName].join(" -> ")}`, { file: owner.filePath });
  }
  const commandNames = new Set(owner.ast.commands.map(({ name }) => name));
  for (const commandName of commandNames) {
    if (coreCommands[commandName]) fail("RESERVED_COMMAND", `Local command shadows core command: ${commandName}`, { file: owner.filePath });
  }
  const producers = new Map(owner.ast.inputs.map((wire) => [wire, null]));
  const rawNodes = owner.ast.nodes.map((node, index) => {
    for (const wire of node.outputs) {
      if (producers.has(wire)) {
        fail("WIRE_REDEFINITION", `Wire ${wire} has more than one producer`, { file: owner.filePath, line: node.line, wire });
      }
      producers.set(wire, `n${String(index + 1).padStart(4, "0")}`);
    }
    return { ...node, nodeId: `n${String(index + 1).padStart(4, "0")}` };
  });
  const nodes = rawNodes.map((node) => {
    const resolved = resolveCallee(registry, owner, node);
    let formals;
    if (resolved.kind === "circuit") {
      const child = compilePackage(registry, resolved.packageName, cache, [...stack, packageName]);
      if (node.args.length !== child.inputs.length) {
        fail("CIRCUIT_ARITY_MISMATCH", `${resolved.packageName} expects ${child.inputs.length} inputs`, { file: owner.filePath, line: node.line });
      }
      if (node.outputs.length !== child.outputs.length) {
        fail("OUTPUT_ARITY_MISMATCH", `${resolved.packageName} exposes ${child.outputs.length} outputs`, { file: owner.filePath, line: node.line });
      }
    } else {
      const commandOwner = resolved.kind === "core" ? null : registry.get(resolved.packageName);
      formals = resolved.kind === "core"
        ? coreCommands[resolved.commandName].formals
        : commandOwner.ast.commands.find(({ name }) => name === resolved.commandName).formals;
      if (node.outputs.length !== 1) {
        fail("OUTPUT_ARITY_MISMATCH", `Command ${node.callee} must have exactly one output`, { file: owner.filePath, line: node.line });
      }
      if (node.args.length > formals.length) {
        fail("TOO_MANY_ARGUMENTS", `Command ${node.callee} accepts at most ${formals.length} arguments`, { file: owner.filePath, line: node.line });
      }
    }
    return { ...node, resolved, formals, dependencies: dependenciesFor(node, producers, owner) };
  });
  const orderedNodes = topologicalOrder(nodes, owner);
  const nodeById = new Map(nodes.map((node) => [node.nodeId, node]));
  const declarations = [...owner.ast.outputs, ...owner.ast.invariants.flatMap((item) => [item.wire, ...item.covers]), ...owner.ast.goals.flatMap((item) => [item.wire, ...item.covers])];
  for (const wire of declarations) {
    if (!producers.has(wire)) fail("FREE_WIRE", `Declared wire ${wire} has no input or producer`, { file: owner.filePath, wire });
  }
  for (const declaration of [...owner.ast.invariants, ...owner.ast.goals]) {
    const ancestors = ancestorWires(declaration.wire, producers, nodeById);
    for (const covered of declaration.covers) {
      if (!ancestors.has(covered)) {
        fail("INVALID_COVERAGE", `${declaration.wire} does not depend on covered wire ${covered}`, { file: owner.filePath, line: declaration.line });
      }
    }
  }
  const roots = [...owner.ast.outputs, ...owner.ast.invariants.map(({ wire }) => wire), ...owner.ast.goals.map(({ wire }) => wire)];
  const relevant = relevantNodeIds(roots, producers, nodeById);
  const compiled = Object.freeze({
    packageName,
    packageHash: owner.packageHash,
    filePath: owner.filePath,
    inputs: Object.freeze([...owner.ast.inputs]),
    outputs: Object.freeze([...owner.ast.outputs]),
    commands: Object.freeze(owner.ast.commands.map((command) => Object.freeze({ ...command }))),
    nodes: Object.freeze(orderedNodes.map((node) => Object.freeze({ ...node, dead: !relevant.has(node.nodeId) }))),
    invariants: Object.freeze(owner.ast.invariants.map((item) => Object.freeze({ ...item }))),
    goals: Object.freeze(owner.ast.goals.map((item) => Object.freeze({ ...item }))),
    templateMetadata: owner.ast.template ? Object.freeze({ mode: owner.ast.template, trigger: owner.ast.trigger, apply: owner.ast.apply }) : null,
  });
  cache.set(packageName, compiled);
  return compiled;
}

export function compileRegistry(registry) {
  const packages = new Map();
  for (const name of registry.names()) compilePackage(registry, name, packages);
  return packages;
}
