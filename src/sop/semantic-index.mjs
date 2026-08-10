import { hashValue } from "./canonical.mjs";

export const PUBLICATION_MARKER = "sop.semantic-publication.v1";
export const SEMANTIC_KEY_PATTERN = /^[A-Za-z][A-Za-z0-9_-]*(?:\.[A-Za-z][A-Za-z0-9_-]*)+$/;

export function isSemanticKey(value) {
  return typeof value === "string" && SEMANTIC_KEY_PATTERN.test(value);
}

export function createPublication(value, semanticKey, provenance = null) {
  if (!isSemanticKey(semanticKey)) throw new TypeError(`Invalid semantic key: ${semanticKey}`);
  return { $sop: PUBLICATION_MARKER, semanticKey, value, provenance };
}

export function isPublication(value) {
  return value !== null && typeof value === "object" && value.$sop === PUBLICATION_MARKER
    && isSemanticKey(value.semanticKey) && Object.hasOwn(value, "value");
}

function visitPublications(value, found) {
  if (isPublication(value)) {
    found.push(value);
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) visitPublications(item, found);
    return;
  }
  if (value !== null && typeof value === "object") {
    for (const item of Object.values(value)) visitPublications(item, found);
  }
}

export function collectPublications(values) {
  const found = [];
  visitPublications(values, found);
  return found;
}

export class SemanticIndex {
  constructor() {
    this.entries = new Map();
  }

  add(publication, origin) {
    if (!isPublication(publication)) throw new TypeError("Semantic index accepts only publish() values");
    const identity = {
      semanticKey: publication.semanticKey,
      value: publication.value,
      provenance: publication.provenance,
    };
    const handle = `publication:${hashValue(identity).slice("sha256:".length)}`;
    if (this.entries.has(handle)) return null;
    const entry = Object.freeze({
      handle,
      semanticKey: publication.semanticKey,
      value: publication.value,
      valueHash: hashValue(publication.value),
      provenance: publication.provenance,
      origin,
    });
    this.entries.set(handle, entry);
    return entry;
  }

  addOutputs(outputs, origin) {
    return collectPublications(outputs)
      .map((publication) => this.add(publication, origin))
      .filter(Boolean);
  }

  get(handle) {
    return this.entries.get(handle);
  }

  keys() {
    return new Set([...this.entries.values()].map(({ semanticKey }) => semanticKey));
  }

  snapshot() {
    return [...this.entries.values()].sort((left, right) => left.handle.localeCompare(right.handle));
  }
}
