const defaultWorks = [
  {
    slug: "core-visual",
    title: "品牌核心视觉",
    type: "Logo / Key Visual",
    image: "assets/hero-cultural-lab.png",
    description: "用于展示文化机构主标志、核心图形和整体视觉气质，可替换为你的真实品牌主视觉。",
  },
  {
    slug: "portrait-communication",
    title: "人物与传播形象",
    type: "Portrait / Communication",
    image: "assets/profile-liu-yongkai.png",
    description: "适合放置项目负责人形象、传播海报或活动视觉，用来建立可信的公共沟通语境。",
  },
  {
    slug: "typography-system",
    title: "标准字体系统",
    type: "Typography",
    image: "assets/hero-cultural-lab.png",
    description: "记录标题、正文、导视和社交媒体用字的层级关系，保持视觉表达的一致性。",
  },
  {
    slug: "color-layout",
    title: "色彩与版式规范",
    type: "Color / Layout",
    image: "assets/profile-liu-yongkai.png",
    description: "展示主色、辅助色、灰阶系统和页面版式规则，方便后续扩展到更多物料。",
  },
  {
    slug: "exhibition-material",
    title: "展览物料应用",
    type: "Exhibition Material",
    image: "assets/hero-cultural-lab.png",
    description: "可放入展签、导览册、活动海报、空间导视等线下应用效果。",
  },
  {
    slug: "social-extension",
    title: "社交媒体延展",
    type: "Social Media",
    image: "assets/profile-liu-yongkai.png",
    description: "适合整理公众号封面、短视频封面、活动推文长图和社群传播素材。",
  },
];

const works = window.galleryWorks || defaultWorks;

const gallery = document.getElementById("dome-gallery");
const root = document.getElementById("sphere-root");
const main = document.getElementById("sphere-main");
const sphere = document.getElementById("dome-sphere");
const viewer = document.getElementById("gallery-viewer");
const frame = document.getElementById("gallery-frame");
const scrim = document.getElementById("gallery-scrim");

const settings = {
  fit: 0.8,
  minRadius: 600,
  maxRadius: Number.POSITIVE_INFINITY,
  padFactor: 0.25,
  overlayBlurColor: "#fff",
  maxVerticalRotationDeg: 0,
  dragSensitivity: 20,
  enlargeTransitionMs: 300,
  segments: 34,
  dragDampening: 2,
  openedImageWidth: "250px",
  openedImageHeight: "350px",
  imageBorderRadius: "30px",
  openedImageBorderRadius: "30px",
  grayscale: false,
  detailPage: window.galleryDetailPage || "work-detail.html",
  returnPage: window.galleryReturnPage || window.location.pathname.split("/").pop() || "brand-identity.html",
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const normalizeAngle = (degree) => ((degree % 360) + 360) % 360;
const wrapAngleSigned = (degree) => {
  const angle = (((degree + 180) % 360) + 360) % 360;
  return angle - 180;
};

let rotation = { x: 0, y: 0 };
let startRotation = { x: 0, y: 0 };
let startPosition = null;
let isDragging = false;
let hasMoved = false;
let inertiaFrame = null;
let focusedImage = null;
let focusedWork = null;
let originalTileRect = null;
let opening = false;
let lastDragEndAt = 0;

function buildItems(pool, segments) {
  const xColumns = Array.from({ length: segments }, (_, index) => -37 + index * 2);
  const evenRows = [-4, -2, 0, 2, 4];
  const oddRows = [-3, -1, 1, 3, 5];
  const coordinates = xColumns.flatMap((x, column) => {
    const rows = column % 2 === 0 ? evenRows : oddRows;
    return rows.map((y) => ({ x, y, sizeX: 2, sizeY: 2 }));
  });

  if (!pool.length) return [];
  const repeatedWorks = Array.from({ length: coordinates.length }, (_, index) => pool[index % pool.length]);
  return coordinates.map((coordinate, index) => ({
    ...coordinate,
    work: repeatedWorks[index],
  }));
}

function computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY) {
  const unit = 360 / settings.segments / 2;
  return {
    rotateX: unit * (offsetY - (sizeY - 1) / 2),
    rotateY: unit * (offsetX + (sizeX - 1) / 2),
  };
}

function applyTransform(xDegree = rotation.x, yDegree = rotation.y) {
  sphere.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDegree}deg) rotateY(${yDegree}deg)`;
}

function updateResponsiveRadius() {
  const rect = root.getBoundingClientRect();
  const width = Math.max(1, rect.width);
  const height = Math.max(1, rect.height);
  const minDimension = Math.min(width, height);
  const maxDimension = Math.max(width, height);
  const basis = width / height >= 1.3 ? width : minDimension;
  let radius = basis * settings.fit;
  radius = Math.min(radius, height * 1.35);
  radius = clamp(radius, settings.minRadius, settings.maxRadius);

  root.style.setProperty("--segments-x", settings.segments);
  root.style.setProperty("--segments-y", settings.segments);
  root.style.setProperty("--radius", `${Math.round(radius)}px`);
  root.style.setProperty("--viewer-pad", `${Math.max(8, Math.round(minDimension * settings.padFactor))}px`);
  root.style.setProperty("--overlay-blur-color", settings.overlayBlurColor);
  root.style.setProperty("--tile-radius", settings.imageBorderRadius);
  root.style.setProperty("--enlarge-radius", settings.openedImageBorderRadius);
  root.style.setProperty("--image-filter", settings.grayscale ? "grayscale(1)" : "none");
  applyTransform();
}

function renderGallery() {
  sphere.innerHTML = "";
  buildItems(works, settings.segments).forEach((item, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "item";
    wrapper.dataset.offsetX = item.x;
    wrapper.dataset.offsetY = item.y;
    wrapper.dataset.sizeX = item.sizeX;
    wrapper.dataset.sizeY = item.sizeY;
    wrapper.style.setProperty("--offset-x", item.x);
    wrapper.style.setProperty("--offset-y", item.y);
    wrapper.style.setProperty("--item-size-x", item.sizeX);
    wrapper.style.setProperty("--item-size-y", item.sizeY);

    const button = document.createElement("button");
    button.className = "item__image";
    button.type = "button";
    button.setAttribute("aria-label", item.work.title || "打开项目图片");
    button.dataset.workSlug = item.work.slug;
    button.innerHTML = `<img src="${item.work.image}" alt="${item.work.title}" draggable="false" />`;
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (isDragging || hasMoved || performance.now() - lastDragEndAt < 80 || opening) return;
      openItem(button, item.work, index);
    });

    wrapper.append(button);
    sphere.append(wrapper);
  });
}

function stopInertia() {
  if (!inertiaFrame) return;
  cancelAnimationFrame(inertiaFrame);
  inertiaFrame = null;
}

function startInertia(velocityX, velocityY) {
  const maxVelocity = 1.4;
  let vX = clamp(velocityX, -maxVelocity, maxVelocity) * 80;
  let vY = clamp(velocityY, -maxVelocity, maxVelocity) * 80;
  let frames = 0;
  const damping = clamp(settings.dragDampening, 0, 1);
  const friction = 0.94 + 0.055 * damping;
  const stopThreshold = 0.015 - 0.01 * damping;
  const maxFrames = Math.round(90 + 270 * damping);

  function step() {
    vX *= friction;
    vY *= friction;
    if ((Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) || frames > maxFrames) {
      inertiaFrame = null;
      return;
    }

    frames += 1;
    rotation = {
      x: clamp(rotation.x - vY / 200, -settings.maxVerticalRotationDeg, settings.maxVerticalRotationDeg),
      y: wrapAngleSigned(rotation.y + vX / 200),
    };
    applyTransform();
    inertiaFrame = requestAnimationFrame(step);
  }

  stopInertia();
  inertiaFrame = requestAnimationFrame(step);
}

function openItem(imageButton, work) {
  opening = true;
  focusedImage = imageButton;
  focusedWork = work;
  root.setAttribute("data-enlarging", "true");
  document.body.style.overflow = "hidden";

  const item = imageButton.parentElement;
  const offsetX = Number(item.dataset.offsetX || 0);
  const offsetY = Number(item.dataset.offsetY || 0);
  const sizeX = Number(item.dataset.sizeX || 2);
  const sizeY = Number(item.dataset.sizeY || 2);
  const baseRotation = computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY);
  const parentY = normalizeAngle(baseRotation.rotateY);
  const globalY = normalizeAngle(rotation.y);
  let rotateYDelta = -(parentY + globalY) % 360;
  if (rotateYDelta < -180) rotateYDelta += 360;
  const rotateXDelta = -baseRotation.rotateX - rotation.x;
  item.style.setProperty("--rot-y-delta", `${rotateYDelta}deg`);
  item.style.setProperty("--rot-x-delta", `${rotateXDelta}deg`);

  const reference = document.createElement("div");
  reference.className = "item__image item__image--reference";
  reference.style.opacity = "0";
  reference.style.transform = `rotateX(${-baseRotation.rotateX}deg) rotateY(${-baseRotation.rotateY}deg)`;
  item.append(reference);

  const tileRect = reference.getBoundingClientRect();
  const mainRect = main.getBoundingClientRect();
  const frameRect = frame.getBoundingClientRect();
  originalTileRect = tileRect;
  imageButton.style.visibility = "hidden";

  const overlay = document.createElement("button");
  overlay.className = "enlarge";
  overlay.type = "button";
  overlay.dataset.workSlug = work.slug;
  overlay.setAttribute("aria-label", `${work.title}，进入项目介绍`);
  overlay.style.left = `${frameRect.left - mainRect.left}px`;
  overlay.style.top = `${frameRect.top - mainRect.top}px`;
  overlay.style.width = `${frameRect.width}px`;
  overlay.style.height = `${frameRect.height}px`;
  overlay.style.opacity = "0";
  overlay.style.transform = `translate(${tileRect.left - frameRect.left}px, ${tileRect.top - frameRect.top}px) scale(${tileRect.width / frameRect.width}, ${tileRect.height / frameRect.height})`;
  overlay.innerHTML = `<img src="${work.image}" alt="${work.title}" draggable="false" />`;
  overlay.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const target = new URL(settings.detailPage, window.location.href);
    target.searchParams.set("work", work.slug);
    target.searchParams.set("from", settings.returnPage);
    window.location.href = target.href;
  });
  viewer.append(overlay);

  requestAnimationFrame(() => {
    overlay.style.opacity = "1";
    overlay.style.transform = "translate(0, 0) scale(1, 1)";
  });

  window.setTimeout(() => {
    const tempWidth = settings.openedImageWidth;
    const tempHeight = settings.openedImageHeight;
    overlay.style.transition = `left ${settings.enlargeTransitionMs}ms ease, top ${settings.enlargeTransitionMs}ms ease, width ${settings.enlargeTransitionMs}ms ease, height ${settings.enlargeTransitionMs}ms ease`;
    overlay.style.width = tempWidth;
    overlay.style.height = tempHeight;
    overlay.style.left = `${frameRect.left - mainRect.left + (frameRect.width - overlay.offsetWidth) / 2}px`;
    overlay.style.top = `${frameRect.top - mainRect.top + (frameRect.height - overlay.offsetHeight) / 2}px`;
    opening = false;
  }, settings.enlargeTransitionMs);
}

function closeItem() {
  const overlay = viewer.querySelector(".enlarge");
  if (!overlay || !focusedImage || !originalTileRect) return;

  const rootRect = root.getBoundingClientRect();
  const overlayRect = overlay.getBoundingClientRect();
  const closing = document.createElement("div");
  closing.className = "enlarge-closing";
  closing.style.cssText = `position:absolute;left:${overlayRect.left - rootRect.left}px;top:${overlayRect.top - rootRect.top}px;width:${overlayRect.width}px;height:${overlayRect.height}px;z-index:9999;border-radius:var(--enlarge-radius, 32px);overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.18);transition:all ${settings.enlargeTransitionMs}ms ease-out;pointer-events:none;`;
  closing.innerHTML = `<img src="${focusedWork.image}" alt="" />`;
  root.append(closing);
  overlay.remove();

  requestAnimationFrame(() => {
    closing.style.left = `${originalTileRect.left - rootRect.left}px`;
    closing.style.top = `${originalTileRect.top - rootRect.top}px`;
    closing.style.width = `${originalTileRect.width}px`;
    closing.style.height = `${originalTileRect.height}px`;
    closing.style.opacity = "0";
  });

  window.setTimeout(() => {
    closing.remove();
    document.querySelectorAll(".item__image--reference").forEach((item) => item.remove());
    document.querySelectorAll(".item").forEach((item) => {
      item.style.setProperty("--rot-y-delta", "0deg");
      item.style.setProperty("--rot-x-delta", "0deg");
    });
    focusedImage.style.visibility = "";
    focusedImage = null;
    focusedWork = null;
    originalTileRect = null;
    root.removeAttribute("data-enlarging");
    document.body.style.overflow = "";
  }, settings.enlargeTransitionMs + 30);
}

main.addEventListener("pointerdown", (event) => {
  if (focusedImage) return;
  stopInertia();
  isDragging = true;
  hasMoved = false;
  gallery.classList.add("is-dragging");
  main.setPointerCapture(event.pointerId);
  startPosition = { x: event.clientX, y: event.clientY, time: performance.now() };
  startRotation = { ...rotation };
});

main.addEventListener("pointermove", (event) => {
  if (!isDragging || !startPosition || focusedImage) return;
  const deltaX = event.clientX - startPosition.x;
  const deltaY = event.clientY - startPosition.y;
  if (deltaX * deltaX + deltaY * deltaY > 16) hasMoved = true;
  rotation = {
    x: clamp(startRotation.x - deltaY / settings.dragSensitivity, -settings.maxVerticalRotationDeg, settings.maxVerticalRotationDeg),
    y: wrapAngleSigned(startRotation.y + deltaX / settings.dragSensitivity),
  };
  applyTransform();
});

main.addEventListener("pointerup", (event) => {
  if (!isDragging || !startPosition) return;
  isDragging = false;
  gallery.classList.remove("is-dragging");
  main.releasePointerCapture(event.pointerId);

  const elapsed = Math.max(16, performance.now() - startPosition.time);
  const velocityX = ((event.clientX - startPosition.x) / elapsed) * 16;
  const velocityY = ((event.clientY - startPosition.y) / elapsed) * 16;
  if (hasMoved) {
    lastDragEndAt = performance.now();
    startInertia(velocityX, velocityY);
  }
  window.setTimeout(() => {
    hasMoved = false;
  }, 0);
});

main.addEventListener("pointercancel", () => {
  isDragging = false;
  hasMoved = false;
  gallery.classList.remove("is-dragging");
});

scrim.addEventListener("click", closeItem);

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && focusedImage) {
    closeItem();
  }
});

const observer = new ResizeObserver(updateResponsiveRadius);
observer.observe(root);
renderGallery();
updateResponsiveRadius();
applyTransform();
