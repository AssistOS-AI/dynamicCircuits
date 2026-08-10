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
}

loadPartials().catch((error) => {
  document.body.dataset.partialError = error.message;
});
