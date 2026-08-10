function collectFiles(nodes) {
  return nodes.flatMap((node) => [
    ...(node.files ?? []),
    ...collectFiles(node.children ?? []),
  ]);
}

async function startBrowser() {
  const config = window.evalPage;
  const tree = document.getElementById("eval-file-tree");
  const allowed = new Map(collectFiles(config.tree).map((item) => [item.file, item]));
  const requested = new URLSearchParams(window.location.search).get("file");
  let activeFile = allowed.has(requested) ? requested : config.defaultFile;

  async function selectFile(item) {
    activeFile = item.file;
    tree.setActive(activeFile);
    document.getElementById("file-title").textContent = item.file;
    document.getElementById("file-role").textContent = item.role;
    document.getElementById("file-explanation").textContent = item.explanation;
    document.getElementById("file-content").textContent = "Loading…";
    history.replaceState(null, "", `?file=${encodeURIComponent(item.file)}`);
    try {
      const target = item.file.split("/").map(encodeURIComponent).join("/");
      const response = await fetch(target);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      document.getElementById("file-content").textContent = await response.text();
    } catch (error) {
      document.getElementById("file-content").textContent = `Cannot load ${config.caseRoot}/${item.file}: ${error.message}`;
    }
  }

  const initial = allowed.get(activeFile);
  tree.configure({ nodes: config.tree, activeFile, onSelect: selectFile });
  await selectFile(initial);
}

startBrowser();
