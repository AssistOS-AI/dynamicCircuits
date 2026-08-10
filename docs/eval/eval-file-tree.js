function containsFile(node, file) {
  if (node.files?.some((item) => item.file === file)) return true;
  return node.children?.some((child) => containsFile(child, file)) ?? false;
}

function fileName(file) {
  return file.split("/").at(-1);
}

class EvalFileTree extends HTMLElement {
  configure({ nodes, activeFile, onSelect }) {
    this.nodes = nodes;
    this.activeFile = activeFile;
    this.onSelect = onSelect;
    this.render();
  }

  setActive(file) {
    this.activeFile = file;
    for (const button of this.querySelectorAll("button[data-file]")) {
      const active = button.dataset.file === file;
      button.setAttribute("aria-current", active ? "page" : "false");
      if (active) {
        let parent = button.parentElement;
        while (parent && parent !== this) {
          if (parent instanceof HTMLDetailsElement) parent.open = true;
          parent = parent.parentElement;
        }
      }
    }
  }

  renderFile(item) {
    const row = document.createElement("li");
    row.className = "eval-tree__file";
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.file = item.file;
    button.title = item.file;
    button.setAttribute("aria-label", `${fileName(item.file)} — ${item.file}`);

    const name = document.createElement("span");
    name.className = "eval-tree__filename";
    name.textContent = fileName(item.file);
    button.append(name);
    button.addEventListener("click", () => this.onSelect(item));
    row.append(button);
    return row;
  }

  renderBranch(node, depth) {
    const row = document.createElement("li");
    row.className = "eval-tree__node";
    row.dataset.kind = node.kind ?? "branch";
    const details = document.createElement("details");
    details.className = "eval-tree__branch";
    details.open = containsFile(node, this.activeFile);
    const summary = document.createElement("summary");

    const text = document.createElement("span");
    text.className = "eval-tree__label";
    text.textContent = node.label;
    const path = document.createElement("small");
    path.textContent = node.path;
    summary.append(text, path);
    if (node.description) summary.title = node.description;

    const children = document.createElement("ul");
    children.className = "eval-tree__children";
    children.dataset.depth = String(depth + 1);
    for (const child of node.children ?? []) children.append(this.renderBranch(child, depth + 1));
    for (const file of node.files ?? []) children.append(this.renderFile(file));
    details.append(summary, children);
    row.append(details);
    return row;
  }

  render() {
    this.replaceChildren();
    this.classList.add("eval-tree");
    const roots = document.createElement("ul");
    roots.className = "eval-tree__roots";
    for (const node of this.nodes ?? []) roots.append(this.renderBranch(node, 0));
    this.append(roots);
    this.setActive(this.activeFile);
  }
}

customElements.define("eval-file-tree", EvalFileTree);
