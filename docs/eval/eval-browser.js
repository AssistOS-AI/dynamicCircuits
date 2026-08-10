function createButton(caseRoot, file, role, explanation, activeFile, selectFile) {
  const item = document.createElement("li");
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = file;
  button.dataset.file = file;
  button.setAttribute("aria-current", String(file === activeFile));
  button.addEventListener("click", () => selectFile(caseRoot, file, role, explanation));
  item.append(button);
  return item;
}

function renderMenu(config, activeFile, selectFile) {
  const menu = document.getElementById("eval-menu");
  menu.replaceChildren();
  for (const group of config.groups) {
    const section = document.createElement("section");
    const heading = document.createElement("h3");
    const list = document.createElement("ul");
    heading.textContent = group.title;
    for (const item of group.files) {
      list.append(createButton(config.caseRoot, item.file, item.role, item.explanation, activeFile, selectFile));
    }
    section.append(heading, list);
    menu.append(section);
  }
}

async function startBrowser() {
  const config = window.evalPage;
  const allowed = new Map(config.groups.flatMap((group) => group.files.map((item) => [item.file, item])));
  const requested = new URLSearchParams(window.location.search).get("file");
  let activeFile = allowed.has(requested) ? requested : config.defaultFile;

  async function selectFile(caseRoot, file, role, explanation) {
    activeFile = file;
    renderMenu(config, activeFile, selectFile);
    document.getElementById("file-title").textContent = file;
    document.getElementById("file-role").textContent = role;
    document.getElementById("file-explanation").textContent = explanation;
    document.getElementById("file-content").textContent = "Loading…";
    history.replaceState(null, "", `?file=${encodeURIComponent(file)}`);
    try {
      const target = file.split("/").map(encodeURIComponent).join("/");
      const response = await fetch(target);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      let content = await response.text();
      if (file.endsWith(".json")) content = JSON.stringify(JSON.parse(content), null, 2);
      document.getElementById("file-content").textContent = content;
    } catch (error) {
      document.getElementById("file-content").textContent = `Cannot load ${caseRoot}/${file}: ${error.message}`;
    }
  }

  const initial = allowed.get(activeFile);
  await selectFile(config.caseRoot, activeFile, initial.role, initial.explanation);
}

startBrowser();
