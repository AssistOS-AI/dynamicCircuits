import { readdir, readFile, realpath, stat } from "node:fs/promises";
import path from "node:path";
import { parseSop } from "./parser.mjs";
import { hashText } from "./canonical.mjs";
import { fail } from "./errors.mjs";

function packageNameFor(relativeFile, prefix = "") {
  const parsed = path.parse(relativeFile);
  const directory = parsed.dir.split(path.sep).filter(Boolean);
  const parts = parsed.name === "index" ? directory : [...directory, parsed.name];
  if (prefix) parts.unshift(...prefix.split("."));
  if (!parts.length || parts.some((part) => !/^[A-Za-z_][A-Za-z0-9_]*$/.test(part))) {
    fail("PARSE_ERROR", `Path cannot be mapped to a package: ${relativeFile}`);
  }
  return parts.join(".");
}

async function walkSopFiles(root) {
  const files = [];
  async function visit(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    entries.sort((left, right) => left.name.localeCompare(right.name));
    for (const entry of entries) {
      const target = path.join(directory, entry.name);
      if (entry.isSymbolicLink()) continue;
      if (entry.isDirectory()) await visit(target);
      else if (entry.isFile() && entry.name.endsWith(".sop")) files.push(target);
    }
  }
  await visit(root);
  return files;
}

export class PackageRegistry {
  constructor(packages, roots) {
    this.packages = packages;
    this.roots = roots;
    Object.freeze(this.roots);
  }

  static async fromRoots(roots) {
    if (!Array.isArray(roots) || roots.length === 0) fail("PACKAGE_ROOT_REQUIRED", "At least one package root is required");
    const packages = new Map();
    const normalizedRoots = [];
    for (const rootEntry of roots) {
      const rootPath = path.resolve(typeof rootEntry === "string" ? rootEntry : rootEntry.path);
      const prefix = typeof rootEntry === "string" ? "" : (rootEntry.prefix ?? "");
      const rootStat = await stat(rootPath).catch(() => null);
      if (!rootStat?.isDirectory()) fail("PACKAGE_ROOT_MISSING", `Package root is not a directory: ${rootPath}`);
      const canonicalRoot = await realpath(rootPath);
      normalizedRoots.push({ path: canonicalRoot, prefix });
      for (const filePath of await walkSopFiles(canonicalRoot)) {
        const relativeFile = path.relative(canonicalRoot, filePath);
        const packageName = packageNameFor(relativeFile, prefix);
        if (packages.has(packageName)) {
          fail("PACKAGE_COLLISION", `Package ${packageName} is defined by multiple files`, {
            files: [packages.get(packageName).filePath, filePath],
          });
        }
        const source = await readFile(filePath, "utf8");
        packages.set(packageName, {
          packageName,
          packageHash: hashText(source),
          filePath,
          source,
          ast: parseSop(source, { filePath }),
        });
      }
    }
    return new PackageRegistry(packages, normalizedRoots);
  }

  get(name) {
    return this.packages.get(name);
  }

  has(name) {
    return this.packages.has(name);
  }

  names() {
    return [...this.packages.keys()].sort();
  }
}

export { packageNameFor };
