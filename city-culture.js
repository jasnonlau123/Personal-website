const stage = document.getElementById("editorial-stage");

if (stage) {
  const layers = stage.querySelectorAll("[data-depth]");

  const updateLayers = (clientX, clientY) => {
    const rect = stage.getBoundingClientRect();
    const relX = (clientX - rect.left) / rect.width - 0.5;
    const relY = (clientY - rect.top) / rect.height - 0.5;

    layers.forEach((layer) => {
      const depth = Number(layer.dataset.depth || 0);
      const moveX = relX * depth;
      const moveY = relY * depth * 0.68;
      layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });
  };

  stage.addEventListener("pointermove", (event) => {
    updateLayers(event.clientX, event.clientY);
  });

  stage.addEventListener("pointerleave", () => {
    layers.forEach((layer) => {
      layer.style.transform = "translate3d(0, 0, 0)";
    });
  });
}
