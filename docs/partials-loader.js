async function loadPartials() {
  const targets = [...document.querySelectorAll("[data-include]")];
  await Promise.all(targets.map(async (target) => {
    const response = await fetch(target.dataset.include);
    if (!response.ok) throw new Error(`Cannot load ${target.dataset.include}: ${response.status}`);
    target.innerHTML = await response.text();
  }));
}

loadPartials().catch((error) => {
  document.body.dataset.partialError = error.message;
});
