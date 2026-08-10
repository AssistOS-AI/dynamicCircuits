async function loadPartials() {
  const loaderUrl = new URL(document.currentScript.src, document.baseURI);
  const docsRoot = new URL("./", loaderUrl);
  const targets = [...document.querySelectorAll("[data-include]")];
  await Promise.all(targets.map(async (target) => {
    const partialUrl = new URL(target.dataset.include, docsRoot);
    const response = await fetch(partialUrl);
    if (!response.ok) throw new Error(`Cannot load ${target.dataset.include}: ${response.status}`);
    target.innerHTML = await response.text();
    for (const link of target.querySelectorAll("[href]")) {
      const href = link.getAttribute("href");
      if (href && !href.startsWith("#") && !/^[a-z][a-z\d+.-]*:/i.test(href)) {
        link.href = new URL(href, docsRoot).href;
      }
    }
  }));

  const navigation = document.querySelector(".site-nav");
  const groups = [...document.querySelectorAll(".nav-group")];
  for (const group of groups) {
    group.addEventListener("toggle", () => {
      if (!group.open) return;
      for (const other of groups) if (other !== group) other.open = false;
    });
  }
  document.addEventListener("pointerdown", (event) => {
    if (navigation?.contains(event.target)) return;
    for (const group of groups) group.open = false;
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    for (const group of groups) group.open = false;
  });
}

loadPartials().catch((error) => {
  document.body.dataset.partialError = error.message;
});
