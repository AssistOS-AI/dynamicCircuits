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
  if (Object.getPrototypeOf(value) === Object.prototype) {
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

export function deepFreeze(value, seen = new WeakSet()) {
  if (value === null || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const child of Object.values(value)) deepFreeze(child, seen);
  return Object.freeze(value);
}
