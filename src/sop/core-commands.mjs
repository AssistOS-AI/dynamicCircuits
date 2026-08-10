import { canonicalize, hashValue } from "./canonical.mjs";

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
});
