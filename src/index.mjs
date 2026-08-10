export { parseSop } from "./sop/parser.mjs";
export { PackageRegistry, packageNameFor } from "./sop/registry.mjs";
export { compilePackage, compileRegistry } from "./sop/compiler.mjs";
export { SopRuntime } from "./sop/runtime.mjs";
export { SopError } from "./sop/errors.mjs";
export { canonicalize, hashText, hashValue, normalizeCanonical } from "./sop/canonical.mjs";
export {
  buildAnalysisPrompt,
  buildLearningPrompt,
  collectInputManifest,
  prepareKnowledgeBase,
  prepareWorkspace,
} from "./workspace.mjs";
export { buildAgentInvocation, supportedAgents } from "./agents/registry.mjs";
