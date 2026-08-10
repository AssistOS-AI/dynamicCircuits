import { createHash } from "node:crypto";

export function canonicalize(value) {
  if (value === undefined) return '{"$sop":"undefined"}';
  if (value === null || typeof value === "boolean" || typeof value === "string") {
    return JSON.stringify(value);
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new TypeError("Only finite numbers are canonical");
    return Object.is(value, -0) ? "0" : JSON.stringify(value);
  }
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(",")}]`;
  const prototype = Object.getPrototypeOf(value);
  const isPlainObject = prototype === null || prototype === Object.prototype || prototype?.constructor?.name === "Object";
  if (isPlainObject) {
    const fields = Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${canonicalize(value[key])}`);
    return `{${fields.join(",")}}`;
  }
  throw new TypeError("Value is not canonically serializable");
}

export function hashValue(value) {
  return `sha256:${createHash("sha256").update(canonicalize(value)).digest("hex")}`;
}

export function hashText(value) {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

export function normalizeCanonical(value) {
  if (value === undefined || value === null || typeof value === "boolean" || typeof value === "string") return value;
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new TypeError("Only finite numbers are canonical");
    return Object.is(value, -0) ? 0 : value;
  }
  if (Array.isArray(value)) return Array.from(value, normalizeCanonical);
  if (typeof value === "object") {
    const prototype = Object.getPrototypeOf(value);
    const isPlainObject = prototype === null || prototype === Object.prototype || prototype?.constructor?.name === "Object";
    if (isPlainObject) {
      return Object.fromEntries(Object.keys(value).map((key) => [key, normalizeCanonical(value[key])]));
    }
  }
  throw new TypeError("Value is not canonically serializable");
}

export function deepFreeze(value, seen = new WeakSet()) {
  if (value === null || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const child of Object.values(value)) deepFreeze(child, seen);
  return Object.freeze(value);
}
