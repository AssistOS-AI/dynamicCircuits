import { hashValue } from "./canonical.mjs";
import { SemanticIndex } from "./semantic-index.mjs";

function mandatoryMatchers(runtime) {
  return [...runtime.packages.values()]
    .filter((pkg) => pkg.packageName.startsWith("kb.") && pkg.templateMetadata?.mode === "mandatory")
    .sort((left, right) => left.packageName.localeCompare(right.packageName));
}

function activeMatchers(matchers, semanticKeys) {
  return matchers.filter(({ templateMetadata }) => templateMetadata.trigger.some((key) => semanticKeys.has(key)));
}

function validateTuples(matches, target, index) {
  if (!Array.isArray(matches)) return { error: "matcher output is not a tuple list" };
  const tuples = [];
  for (const tuple of matches) {
    if (!Array.isArray(tuple) || tuple.length !== target.inputs.length) {
      return { error: `match tuple arity does not equal ${target.inputs.length}` };
    }
    if (tuple.some((handle) => typeof handle !== "string" || !index.get(handle))) {
      return { error: "match tuple contains an unregistered publication handle" };
    }
    tuples.push(tuple);
  }
  const unique = new Map(tuples.map((tuple) => [hashValue(tuple), tuple]));
  return { tuples: [...unique.entries()].sort(([left], [right]) => left.localeCompare(right)).map(([, tuple]) => tuple) };
}

function combinedResult(root, outcome, closure, mandatoryResults) {
  const { receiptHash: rootReceiptHash, ...rootReceipt } = root.receipt;
  const receipt = {
    ...rootReceipt,
    outcome,
    rootReceiptHash,
    closure,
    outputHashes: outcome === "SUCCEEDED" ? root.receipt.outputHashes : [],
  };
  receipt.receiptHash = hashValue(receipt);
  return {
    outcome,
    outputs: outcome === "SUCCEEDED" ? root.outputs : [],
    receipt,
    mandatoryResults,
  };
}

function closureReceipt(state, status, failure = null) {
  const receipt = {
    schemaVersion: 1,
    status,
    registryHash: state.registryHash,
    matcherCount: state.matchers.length,
    publicationCount: state.index.snapshot().length,
    semanticKeys: [...state.index.keys()].sort(),
    rounds: state.rounds,
    expectedInstances: [...state.expected].sort(),
    executedInstances: [...state.executed].sort(),
    missingInstances: [...state.expected].filter((key) => !state.executed.has(key)).sort(),
    failure,
  };
  receipt.receiptHash = hashValue(receipt);
  return receipt;
}

async function evaluateMatcher(runtime, matcher, index, delta) {
  const result = await runtime.execute(matcher.packageName, [index.snapshot(), delta]);
  return { matcher, result };
}

function instanceKey(matcher, tuple) {
  return hashValue({ matcher: matcher.packageName, target: matcher.templateMetadata.apply, bindings: tuple });
}

export async function executeWithMandatoryClosure(runtime, packageName, inputValues = [], options = {}) {
  const root = await runtime.execute(packageName, inputValues);
  if (root.outcome !== "SUCCEEDED") return root;
  const matchers = mandatoryMatchers(runtime);
  if (!matchers.length) return root;

  const index = new SemanticIndex();
  let delta = index.addOutputs(root.outputs, { package: packageName, receipt: root.receipt.receiptHash });
  const state = {
    index,
    matchers,
    registryHash: hashValue(matchers.map((matcher) => ({
      matcher: matcher.packageName,
      matcherHash: matcher.packageHash,
      target: matcher.templateMetadata.apply,
      targetHash: runtime.packages.get(matcher.templateMetadata.apply)?.packageHash,
    }))),
    rounds: [],
    expected: new Set(),
    executed: new Set(),
  };
  const mandatoryResults = [];
  const maxRounds = options.maxRounds ?? 16;
  const maxInstances = options.maxInstances ?? 1_000;

  for (let roundNumber = 1; roundNumber <= maxRounds; roundNumber += 1) {
    const round = { round: roundNumber, deltaHandles: delta.map(({ handle }) => handle), matchers: [], newInstances: [] };
    const newlyPublished = [];
    for (const matcher of activeMatchers(matchers, index.keys())) {
      const evaluation = await evaluateMatcher(runtime, matcher, index, delta);
      const matcherRecord = {
        matcher: matcher.packageName,
        target: matcher.templateMetadata.apply,
        outcome: evaluation.result.outcome,
        receiptHash: evaluation.result.receipt.receiptHash,
        matchCount: 0,
      };
      round.matchers.push(matcherRecord);
      if (evaluation.result.outcome !== "SUCCEEDED") {
        state.rounds.push(round);
        const closure = closureReceipt(state, "INCONCLUSIVE", {
          code: "mandatory_matcher_failed",
          matcher: matcher.packageName,
          outcome: evaluation.result.outcome,
        });
        return combinedResult(root, "INCONCLUSIVE", closure, mandatoryResults);
      }
      const target = runtime.packages.get(matcher.templateMetadata.apply);
      const validated = validateTuples(evaluation.result.outputs[0], target, index);
      if (validated.error) {
        state.rounds.push(round);
        const closure = closureReceipt(state, "FAILED", {
          code: "invalid_mandatory_match",
          matcher: matcher.packageName,
          reason: validated.error,
        });
        return combinedResult(root, "REJECTED", closure, mandatoryResults);
      }
      matcherRecord.matchCount = validated.tuples.length;
      for (const tuple of validated.tuples) {
        const key = instanceKey(matcher, tuple);
        state.expected.add(key);
        if (state.executed.has(key)) continue;
        if (state.executed.size >= maxInstances) {
          state.rounds.push(round);
          const closure = closureReceipt(state, "INCONCLUSIVE", {
            code: "mandatory_instance_budget_exhausted",
            maxInstances,
          });
          return combinedResult(root, "INCONCLUSIVE", closure, mandatoryResults);
        }
        const values = tuple.map((handle) => index.get(handle).value);
        const applied = await runtime.execute(matcher.templateMetadata.apply, values);
        const record = {
          instanceKey: key,
          matcher: matcher.packageName,
          target: matcher.templateMetadata.apply,
          bindings: tuple,
          outcome: applied.outcome,
          receiptHash: applied.receipt.receiptHash,
          outputNames: target.outputs,
          outputs: applied.outputs,
        };
        mandatoryResults.push(record);
        round.newInstances.push(key);
        if (applied.outcome !== "SUCCEEDED") {
          state.rounds.push(round);
          const closure = closureReceipt(state, "FAILED", {
            code: "mandatory_instance_failed",
            instanceKey: key,
            target: matcher.templateMetadata.apply,
            outcome: applied.outcome,
          });
          return combinedResult(root, "REJECTED", closure, mandatoryResults);
        }
        state.executed.add(key);
        newlyPublished.push(...index.addOutputs(applied.outputs, {
          package: matcher.templateMetadata.apply,
          receipt: applied.receipt.receiptHash,
          instanceKey: key,
        }));
      }
    }
    state.rounds.push(round);
    if (!newlyPublished.length && !round.newInstances.length) {
      const finalExpected = new Set();
      for (const matcher of activeMatchers(matchers, index.keys())) {
        const evaluation = await evaluateMatcher(runtime, matcher, index, []);
        if (evaluation.result.outcome !== "SUCCEEDED") {
          const closure = closureReceipt(state, "INCONCLUSIVE", {
            code: "mandatory_final_audit_failed",
            matcher: matcher.packageName,
          });
          return combinedResult(root, "INCONCLUSIVE", closure, mandatoryResults);
        }
        const target = runtime.packages.get(matcher.templateMetadata.apply);
        const validated = validateTuples(evaluation.result.outputs[0], target, index);
        if (validated.error) {
          const closure = closureReceipt(state, "FAILED", {
            code: "invalid_final_audit_match",
            matcher: matcher.packageName,
            reason: validated.error,
          });
          return combinedResult(root, "REJECTED", closure, mandatoryResults);
        }
        for (const tuple of validated.tuples) finalExpected.add(instanceKey(matcher, tuple));
      }
      state.expected = finalExpected;
      const missing = [...state.expected].filter((key) => !state.executed.has(key));
      const status = missing.length ? "FAILED" : "CLOSED";
      const closure = closureReceipt(state, status, missing.length ? { code: "mandatory_instances_missing" } : null);
      return combinedResult(root, missing.length ? "REJECTED" : "SUCCEEDED", closure, mandatoryResults);
    }
    delta = newlyPublished;
  }

  const closure = closureReceipt(state, "INCONCLUSIVE", {
    code: "mandatory_round_budget_exhausted",
    maxRounds,
  });
  return combinedResult(root, "INCONCLUSIVE", closure, mandatoryResults);
}
