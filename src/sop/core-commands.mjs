import { canonicalize, hashValue } from "./canonical.mjs";
import { createPublication, isSemanticKey } from "./semantic-index.mjs";

const refusal = (code, details = {}) => ({ __sopRefusal: true, code, details });

function pointerGet(value, pointer) {
  if (pointer === "") return value;
  const segments = pointer.startsWith("/")
    ? pointer.slice(1).split("/").map((part) => part.replace(/~1/g, "/").replace(/~0/g, "~"))
    : pointer.split(".");
  let current = value;
  for (const segment of segments) {
    if (current === null || current === undefined || !Object.prototype.hasOwnProperty.call(Object(current), segment)) {
      return refusal("path_not_found", { pointer });
    }
    current = current[segment];
  }
  return current;
}

function isIndexEntry(value) {
  return value !== null && typeof value === "object" && typeof value.handle === "string"
    && isSemanticKey(value.semanticKey) && Object.hasOwn(value, "value");
}

function sortedEntries(value) {
  if (!Array.isArray(value) || value.some((entry) => !isIndexEntry(entry))) return null;
  return [...value].sort((left, right) => left.handle.localeCompare(right.handle));
}

function comparableAt(entry, pointer) {
  const selected = pointerGet(entry.value, String(pointer));
  return selected?.__sopRefusal ? { found: false } : { found: true, value: selected };
}

export const coreCommands = Object.freeze({
  value: { formals: ["source"], run: ({ source }) => source },
  absent: { formals: [], run: () => undefined, acceptsUndefined: true },
  alias: { formals: ["source"], run: ({ source }) => source, acceptsUndefined: true },
  get: { formals: ["value", "path"], run: ({ value, path }) => pointerGet(value, String(path)) },
  hash: { formals: ["value"], run: ({ value }) => hashValue(value) },
  equal: { formals: ["left", "right"], run: ({ left, right }) => canonicalize(left) === canonicalize(right) },
  compare: {
    formals: ["left", "operator", "right"],
    run: ({ left, operator, right }) => {
      const operations = {
        lt: () => left < right,
        le: () => left <= right,
        eq: () => canonicalize(left) === canonicalize(right),
        ne: () => canonicalize(left) !== canonicalize(right),
        ge: () => left >= right,
        gt: () => left > right,
      };
      return operations[operator]?.() ?? refusal("invalid_comparison_operator", { operator });
    },
  },
  parseNumber: {
    formals: ["value"],
    run: ({ value }) => {
      if (typeof value !== "string" || !/^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(value)) {
        return refusal("invalid_number", { value });
      }
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : refusal("invalid_number", { value });
    },
  },
  assertInvariant: {
    formals: ["condition", "code"],
    run: ({ condition, code }) => ({ ok: condition?.ok === true || condition === true, code }),
  },
  emptyList: { formals: [], run: () => [] },
  append: {
    formals: ["list", "item"],
    run: ({ list, item }) => Array.isArray(list) ? [...list, item] : refusal("list_required"),
  },
  concat: {
    formals: ["left", "right"],
    run: ({ left, right }) => Array.isArray(left) && Array.isArray(right)
      ? [...left, ...right]
      : refusal("lists_required"),
  },
  publish: {
    formals: ["value", "semanticKey", "provenance"],
    run: ({ value, semanticKey, provenance }) => {
      if (!isSemanticKey(semanticKey)) return refusal("invalid_semantic_key", { semanticKey });
      return createPublication(value, semanticKey, provenance ?? null);
    },
  },
  select: {
    formals: ["index", "semanticKey"],
    run: ({ index, semanticKey }) => {
      const entries = sortedEntries(index);
      if (!entries) return refusal("semantic_index_required");
      if (!isSemanticKey(semanticKey)) return refusal("invalid_semantic_key", { semanticKey });
      return entries.filter((entry) => entry.semanticKey === semanticKey);
    },
  },
  bind: {
    formals: ["entries"],
    run: ({ entries }) => {
      const sorted = sortedEntries(entries);
      return sorted ? sorted.map(({ handle }) => [handle]) : refusal("semantic_entries_required");
    },
  },
  join: {
    formals: ["left", "right", "leftPath", "rightPath"],
    run: ({ left, right, leftPath, rightPath }) => {
      const leftEntries = sortedEntries(left);
      const rightEntries = sortedEntries(right);
      if (!leftEntries || !rightEntries) return refusal("semantic_entries_required");
      const matches = [];
      for (const leftEntry of leftEntries) {
        const leftValue = comparableAt(leftEntry, leftPath);
        if (!leftValue.found) continue;
        for (const rightEntry of rightEntries) {
          const rightValue = comparableAt(rightEntry, rightPath);
          if (rightValue.found && canonicalize(leftValue.value) === canonicalize(rightValue.value)) {
            matches.push([leftEntry.handle, rightEntry.handle]);
          }
        }
      }
      return matches;
    },
  },
  distinct: {
    formals: ["tuples"],
    run: ({ tuples }) => {
      if (!Array.isArray(tuples) || tuples.some((tuple) => !Array.isArray(tuple))) {
        return refusal("match_tuples_required");
      }
      const unique = new Map(tuples.map((tuple) => [canonicalize(tuple), tuple]));
      return [...unique.entries()].sort(([left], [right]) => left.localeCompare(right)).map(([, tuple]) => tuple);
    },
  },
});
