import vm from "node:vm";
import { compileRegistry } from "./compiler.mjs";
import { coreCommands } from "./core-commands.mjs";
import { deepFreeze, hashValue } from "./canonical.mjs";
import { SopError, fail } from "./errors.mjs";

function isRefusal(value) {
  return value && typeof value === "object" && value.__sopRefusal === true;
}

function assurancePasses(value) {
  return value === true || (value && typeof value === "object" && value.ok === true);
}

function sanitizedError(error) {
  return {
    name: error?.name ?? "Error",
    message: error?.message ?? String(error),
  };
}

export class SopRuntime {
  constructor(registry, options = {}) {
    this.registry = registry;
    this.packages = compileRegistry(registry);
    this.timeoutMs = options.timeoutMs ?? 1_000;
    this.commandContexts = new Map();
  }

  commandContext(packageName, commandName) {
    const key = `${packageName}.${commandName}`;
    if (this.commandContexts.has(key)) return this.commandContexts.get(key);
    const definition = this.packages.get(packageName)?.commands.find(({ name }) => name === commandName);
    if (!definition) fail("UNKNOWN_CALLEE", `Unknown command: ${key}`);
    const sandbox = Object.create(null);
    const context = vm.createContext(sandbox, {
      name: `sop:${key}`,
      codeGeneration: { strings: false, wasm: false },
    });
    try {
      new vm.Script(`__descriptor = (function () { "use strict";\n${definition.code}\n})()`, {
        filename: this.packages.get(packageName).filePath,
        lineOffset: definition.line,
      }).runInContext(context, { timeout: this.timeoutMs });
    } catch (error) {
      throw new SopError("COMMAND_DEFINITION_ERROR", `Cannot initialize command ${key}: ${error.message}`, {
        package: packageName,
        line: definition.line,
      });
    }
    const descriptor = context.__descriptor;
    if (!descriptor || typeof descriptor.run !== "function") {
      fail("COMMAND_DEFINITION_ERROR", `Command ${key} must return a descriptor with run()`);
    }
    context.__descriptor = descriptor;
    const compiled = { context, descriptor, definition };
    this.commandContexts.set(key, compiled);
    return compiled;
  }

  async invokeCommand(node, inputs) {
    if (node.resolved.kind === "core") {
      try {
        const descriptor = coreCommands[node.resolved.commandName];
        const output = await descriptor.run(inputs);
        if (output === undefined && !descriptor.acceptsUndefined) {
          return { status: "ERROR", error: { name: "UndefinedOutput", message: "Command returned undefined" } };
        }
        return isRefusal(output)
          ? { status: "REFUSED", refusal: { code: output.code, details: output.details ?? {} } }
          : { status: "SUCCEEDED", output: deepFreeze(output) };
      } catch (error) {
        return { status: "ERROR", error: sanitizedError(error) };
      }
    }

    let compiled;
    try {
      compiled = this.commandContext(node.resolved.packageName, node.resolved.commandName);
    } catch (error) {
      return { status: "ERROR", error: sanitizedError(error) };
    }
    const notes = [];
    const ctx = deepFreeze({
      reject: (code, details = {}) => ({ __sopRefusal: true, code, details }),
      log: (level, message, details = {}) => notes.push({ level, message, details }),
      receipt: { note: (key, value) => notes.push({ key, value }) },
      signal: null,
    });
    compiled.context.__inputs = deepFreeze({ ...inputs });
    compiled.context.__ctx = ctx;
    try {
      const output = await new vm.Script("__descriptor.run(__inputs, __ctx)").runInContext(compiled.context, {
        timeout: this.timeoutMs,
      });
      if (isRefusal(output)) return { status: "REFUSED", refusal: { code: output.code, details: output.details ?? {} }, notes };
      if (output === undefined && compiled.descriptor.acceptUndefined !== true) {
        return { status: "ERROR", error: { name: "UndefinedOutput", message: "Command returned undefined" }, notes };
      }
      if (typeof compiled.descriptor.check === "function") {
        compiled.context.__output = deepFreeze(output);
        const check = await new vm.Script("__descriptor.check(__inputs, __output, __ctx)").runInContext(compiled.context, {
          timeout: this.timeoutMs,
        });
        const ok = check === true || (check && check.ok === true);
        if (!ok) return { status: "CHECK_FAILED", check, notes };
      }
      return { status: "SUCCEEDED", output: deepFreeze(output), notes };
    } catch (error) {
      return { status: "ERROR", error: sanitizedError(error), notes };
    } finally {
      delete compiled.context.__inputs;
      delete compiled.context.__ctx;
      delete compiled.context.__output;
    }
  }

  async execute(packageName, inputValues = []) {
    const instanceCounter = { value: 0 };
    return this.executeInstance(packageName, inputValues, instanceCounter);
  }

  async executeInstance(packageName, inputValues, instanceCounter) {
    const compiled = this.packages.get(packageName);
    if (!compiled) fail("UNKNOWN_PACKAGE", `Unknown package: ${packageName}`);
    if (!Array.isArray(inputValues) || inputValues.length !== compiled.inputs.length) {
      fail("CIRCUIT_ARITY_MISMATCH", `${packageName} expects ${compiled.inputs.length} input values`);
    }
    instanceCounter.value += 1;
    const instanceId = `${packageName}#${instanceCounter.value}`;
    const wires = new Map(compiled.inputs.map((wire, index) => [wire, deepFreeze(inputValues[index])]));
    const nodeReceipts = [];

    for (const node of compiled.nodes) {
      if (node.dead) {
        nodeReceipts.push({ nodeId: node.nodeId, status: "DEAD" });
        continue;
      }
      const args = node.args.map((arg) => arg.kind === "literal" ? arg.value : wires.get(arg.name));
      let result;
      if (node.resolved.kind === "circuit") {
        const child = await this.executeInstance(node.resolved.packageName, args, instanceCounter);
        if (child.outcome !== "SUCCEEDED") {
          const childStatus = child.outcome === "REFUSED"
            ? "REFUSED"
            : child.outcome === "REJECTED" ? "CHECK_FAILED" : "ERROR";
          result = { status: childStatus, childReceipt: child.receipt };
        } else {
          result = { status: "SUCCEEDED", outputs: child.outputs, childReceipt: child.receipt };
        }
      } else {
        const formals = node.formals;
        const inputs = Object.fromEntries(formals.map((formal, index) => [formal, args[index]]));
        result = await this.invokeCommand(node, deepFreeze(inputs));
      }

      const receipt = {
        nodeId: node.nodeId,
        callee: node.callee,
        status: result.status,
        inputHashes: args.map(hashValue),
      };
      if (result.notes?.length) receipt.notes = result.notes;
      if (result.refusal) receipt.refusal = result.refusal;
      if (result.error) receipt.error = result.error;
      if (result.check !== undefined) receipt.check = result.check;
      if (result.childReceipt) receipt.childReceipt = result.childReceipt;
      nodeReceipts.push(receipt);

      if (result.status !== "SUCCEEDED") {
        const outcome = result.status === "REFUSED" ? "REFUSED" : result.status === "CHECK_FAILED" ? "REJECTED" : "ERROR";
        return this.finalizeReceipt(compiled, instanceId, outcome, {}, nodeReceipts, []);
      }
      if (node.resolved.kind === "circuit") {
        node.outputs.forEach((wire, index) => wires.set(wire, result.outputs[index]));
      } else {
        wires.set(node.outputs[0], result.output);
      }
      receipt.outputHashes = node.outputs.map((wire) => hashValue(wires.get(wire)));
    }

    const checks = [];
    for (const declaration of [...compiled.invariants.map((item) => ({ ...item, kind: "invariant" })), ...compiled.goals.map((item) => ({ ...item, kind: "goal" }))]) {
      const value = wires.get(declaration.wire);
      checks.push({ kind: declaration.kind, wire: declaration.wire, ok: assurancePasses(value), valueHash: hashValue(value) });
    }
    const failedCheck = checks.some(({ ok }) => !ok);
    const outputs = Object.fromEntries(compiled.outputs.map((wire) => [wire, wires.get(wire)]));
    return this.finalizeReceipt(compiled, instanceId, failedCheck ? "REJECTED" : "SUCCEEDED", outputs, nodeReceipts, checks);
  }

  finalizeReceipt(compiled, instanceId, outcome, namedOutputs, nodes, checks) {
    const outputs = compiled.outputs.map((wire) => namedOutputs[wire]);
    const receipt = {
      schemaVersion: 1,
      package: compiled.packageName,
      packageHash: compiled.packageHash,
      instanceId,
      outcome,
      nodes,
      checks,
      outputHashes: outcome === "SUCCEEDED" ? outputs.map(hashValue) : [],
    };
    receipt.receiptHash = hashValue(receipt);
    return { outcome, outputs: outcome === "SUCCEEDED" ? outputs : [], receipt: deepFreeze(receipt) };
  }
}
