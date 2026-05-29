const archiveItems = [
  "assets/城市文字记忆/ChatGPT Image 2026年5月29日 10_04_57 (1)-02.png",
  "assets/城市文字记忆/ChatGPT Image 2026年5月29日 10_04_57 (1)-03.png",
  "assets/城市文字记忆/ChatGPT Image 2026年5月29日 10_04_57 (1)-04.png",
  "assets/城市文字记忆/ChatGPT Image 2026年5月29日 10_04_57 (1)-05.png",
  "assets/城市文字记忆/ChatGPT Image 2026年5月29日 10_04_57 (1)-06.png",
  "assets/城市文字记忆/ChatGPT Image 2026年5月29日 10_04_57 (1)-07.png",
  "assets/城市文字记忆/ChatGPT Image 2026年5月29日 10_04_57 (1)-08.png",
  "assets/城市文字记忆/ChatGPT Image 2026年5月29日 10_04_57 (1)-09.png",
  "assets/城市文字记忆/ChatGPT Image 2026年5月29日 10_04_57 (1)-10.png",
  "assets/城市文字记忆/ChatGPT Image 2026年5月29日 10_04_57 (1)-11.png",
  "assets/城市文字记忆/ChatGPT Image 2026年5月29日 10_04_57 (1)-12.png",
  "assets/城市文字记忆/ChatGPT Image 2026年5月29日 10_04_57 (1)-13.png",
  "assets/城市文字记忆/ChatGPT Image 2026年5月29日 10_04_57 (1)-14.png",
  "assets/城市文字记忆/ChatGPT Image 2026年5月29日 10_04_57 (1)-15.png",
  "assets/城市文字记忆/ChatGPT Image 2026年5月29日 10_04_57 (1)-16.png",
  "assets/城市文字记忆/ChatGPT Image 2026年5月29日 10_04_57 (1)-17.png",
  "assets/城市文字记忆/ChatGPT Image 2026年5月29日 10_04_57 (1)-18.png",
  "assets/城市文字记忆/ChatGPT Image 2026年5月29日 10_04_57 (1)-19.png",
  "assets/城市文字记忆/ChatGPT Image 2026年5月29日 10_04_57 (1)-20.png",
  "assets/城市文字记忆/ChatGPT Image 2026年5月29日 10_04_57 (1)-21.png",
  "assets/城市文字记忆/ChatGPT Image 2026年5月29日 10_04_57 (1)-22.png",
  "assets/城市文字记忆/ChatGPT Image 2026年5月29日 10_04_57 (1)-23.png",
  "assets/城市文字记忆/ChatGPT Image 2026年5月29日 10_04_57 (1)-24.png",
  "assets/城市文字记忆/ChatGPT Image 2026年5月29日 10_04_57 (1)-25.png",
  "assets/城市文字记忆/ChatGPT Image 2026年5月29日 10_04_57 (1)-26.png",
  "assets/城市文字记忆/ChatGPT Image 2026年5月29日 10_04_57 (1)_画板 1.png",
].map((src, index) => ({
  src,
  label: `样本 ${String(index + 1).padStart(2, "0")}`,
  caption: `文字样本 ${String(index + 1).padStart(2, "0")}`,
}));

const app = document.getElementById("memory-app");
const fallback = document.getElementById("memory-fallback");
const stage = document.getElementById("memory-stage");
const nav = document.getElementById("side-nav");
const caption = document.getElementById("archive-caption");
const timeEl = document.getElementById("time-box");
const shuffleButton = document.getElementById("shuffle-image");

function getStageSize() {
  const rect = stage.getBoundingClientRect();
  return {
    width: Math.max(1, Math.round(app.clientWidth || rect.width || window.innerWidth || 1280)),
    height: Math.max(1, Math.round(app.clientHeight || rect.height || window.innerHeight || 720)),
  };
}

let { width, height } = getStageSize();
let activeIndex = 0;
let opened = false;
let seconds = 0;
let loadedTextureCount = 0;

function renderFallback() {
  const stackTop = archiveItems
    .slice(0, 42)
    .map((item, index) => {
      const x = index * 8.2;
      const y = index * 1.15;
      return `<span class="fallback-slice" style="left:${x}px;top:${y}px;transform:translateZ(${
        index * 4
      }px) rotateY(16deg)"><img src="${item.src}" alt="${item.caption}" /></span>`;
    })
    .join("");
  const stackBottom = archiveItems
    .concat(archiveItems)
    .slice(0, 54)
    .map((item, index) => {
      const x = index * 8.8;
      const y = index * 1.2;
      return `<span class="fallback-slice" style="left:${x}px;top:${y}px;transform:translateZ(${
        index * 4.5
      }px) rotateY(16deg)"><img src="${item.src}" alt="${item.caption}" /></span>`;
    })
    .join("");

  fallback.innerHTML = `
    <div class="fallback-stack fallback-top">${stackTop}</div>
    <div class="fallback-stack fallback-bottom">${stackBottom}</div>
    <figure class="fallback-focus"><img src="${archiveItems[activeIndex].src}" alt="${archiveItems[activeIndex].caption}" /></figure>
  `;
  stage.classList.add("show-fallback");
}

renderFallback();

if (!window.THREE) {
  app.innerHTML = '<p style="padding:2rem;font-weight:900;">Three.js 未加载，请检查网络后刷新页面。</p>';
  throw new Error("Three.js is required for city memory archive.");
}

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xececec);

const camera = new THREE.PerspectiveCamera(28, width / height, 0.1, 4000);
camera.position.set(0, 0, 1350);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: false,
});

renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
app.appendChild(renderer.domElement);

const loader = new THREE.TextureLoader();

function loadTexture(item) {
  const texture = loader.load(encodeURI(item.src), () => {
    loadedTextureCount += 1;
    if (loadedTextureCount >= 1) stage.classList.remove("show-fallback");
    renderer.render(scene, camera);
  });
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

const textures = archiveItems.map(loadTexture);

const root = new THREE.Group();
const topStack = new THREE.Group();
const bottomStack = new THREE.Group();
const focusGroup = new THREE.Group();

scene.add(root);
root.add(topStack);
root.add(bottomStack);
root.add(focusGroup);

function makePlane(texture, w = 210, h = 138, opacity = 1) {
  const geometry = new THREE.PlaneGeometry(w, h);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    color: 0xffffff,
    transparent: true,
    opacity,
    side: THREE.DoubleSide,
  });

  return new THREE.Mesh(geometry, material);
}

function buildStack(group, config) {
  const { count, x, y, z, stepX, stepY, stepZ, rotX, rotY, rotZ, scale, offset = 0 } = config;

  group.clear();

  for (let i = 0; i < count; i += 1) {
    const texture = textures[(i + offset) % textures.length];
    const plane = makePlane(texture, 225, 148, 1);

    plane.position.set(x + i * stepX, y + i * stepY, z + i * stepZ);
    plane.rotation.set(rotX, rotY, rotZ);
    plane.scale.setScalar(scale);
    group.add(plane);
  }
}

function rebuildStacks(offset = 0) {
  buildStack(bottomStack, {
    count: 82,
    x: -560,
    y: -340,
    z: -80,
    stepX: 8.5,
    stepY: 3.2,
    stepZ: -3.2,
    rotX: THREE.MathUtils.degToRad(-17),
    rotY: THREE.MathUtils.degToRad(-62),
    rotZ: 0,
    scale: 1.15,
    offset,
  });

  buildStack(topStack, {
    count: 78,
    x: 370,
    y: 315,
    z: -160,
    stepX: 7.3,
    stepY: 2.7,
    stepZ: -3.2,
    rotX: THREE.MathUtils.degToRad(-17),
    rotY: THREE.MathUtils.degToRad(-62),
    rotZ: 0,
    scale: 1.02,
    offset: offset + 6,
  });
}

rebuildStacks();

const focus = makePlane(textures[activeIndex], 285, 185, 1);
focus.position.set(0, 5, 40);
focus.rotation.y = THREE.MathUtils.degToRad(-25);
focusGroup.add(focus);

let targetFocus = {
  x: 0,
  y: 5,
  z: 40,
  ry: THREE.MathUtils.degToRad(-25),
  w: 1,
  h: 1,
};

topStack.userData.target = { x: 0, y: 0, z: 0 };
bottomStack.userData.target = { x: 0, y: 0, z: 0 };

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function renderNav() {
  const allButton = `<button type="button" class="active" data-index="all">all <sup>${archiveItems.length}</sup></button>`;
  const itemButtons = archiveItems
    .map((item, index) => `<button type="button" data-index="${index}">${item.label}</button>`)
    .join("");

  nav.innerHTML = allButton + itemButtons;
  nav.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      nav.querySelectorAll("button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      if (button.dataset.index === "all") {
        activeIndex = 0;
      } else {
        activeIndex = Number(button.dataset.index);
      }

      updateFocusTexture();
      rebuildStacks(activeIndex);
      closeDetail();
    });
  });
}

function updateCaption() {
  const item = archiveItems[activeIndex];
  caption.innerHTML = `
    <strong>Today, 06:34:24 ⇢</strong>
    ${item.caption}<br />
    待补充项目简介
    <span>↘ read more</span>
    <span>▣ save this picture</span>
  `;
}

function updateFocusTexture() {
  focus.material.map = textures[activeIndex];
  focus.material.needsUpdate = true;
  const fallbackFocus = fallback.querySelector(".fallback-focus img");
  if (fallbackFocus) {
    fallbackFocus.src = archiveItems[activeIndex].src;
    fallbackFocus.alt = archiveItems[activeIndex].caption;
  }
  updateCaption();
}

function openDetail() {
  opened = true;
  caption.classList.add("show");

  targetFocus = {
    x: 0,
    y: -10,
    z: 170,
    ry: 0,
    w: 3.25,
    h: 3.25,
  };

  topStack.userData.target = { x: 155, y: 62, z: -120 };
  bottomStack.userData.target = { x: -310, y: -110, z: -150 };
}

function closeDetail() {
  opened = false;
  caption.classList.remove("show");

  targetFocus = {
    x: 0,
    y: 5,
    z: 40,
    ry: THREE.MathUtils.degToRad(-25),
    w: 1,
    h: 1,
  };

  topStack.userData.target = { x: 0, y: 0, z: 0 };
  bottomStack.userData.target = { x: 0, y: 0, z: 0 };
}

renderer.domElement.addEventListener("click", (event) => {
  const rect = renderer.domElement.getBoundingClientRect();

  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObject(focus);

  if (hits.length) {
    if (opened) closeDetail();
    else openDetail();
  }
});

stage.addEventListener("mousemove", (event) => {
  if (opened) return;

  const rect = stage.getBoundingClientRect();
  const mx = (event.clientX - rect.left) / rect.width - 0.5;
  const my = (event.clientY - rect.top) / rect.height - 0.5;

  root.rotation.y = mx * 0.04;
  root.rotation.x = -my * 0.03;
});

shuffleButton.addEventListener("click", () => {
  activeIndex = (activeIndex + 1) % archiveItems.length;
  updateFocusTexture();
  rebuildStacks(activeIndex);
});

function updateTime() {
  const value = String(seconds).padStart(2, "0");
  timeEl.innerHTML = `May 29, 2026<br />13:52:${value}`;
  seconds = (seconds + 1) % 60;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function animate() {
  window.requestAnimationFrame(animate);

  focus.position.x = lerp(focus.position.x, targetFocus.x, 0.08);
  focus.position.y = lerp(focus.position.y, targetFocus.y, 0.08);
  focus.position.z = lerp(focus.position.z, targetFocus.z, 0.08);
  focus.rotation.y = lerp(focus.rotation.y, targetFocus.ry, 0.08);
  focus.scale.x = lerp(focus.scale.x, targetFocus.w, 0.08);
  focus.scale.y = lerp(focus.scale.y, targetFocus.h, 0.08);

  [topStack, bottomStack].forEach((group) => {
    const target = group.userData.target;
    group.position.x = lerp(group.position.x, target.x, 0.07);
    group.position.y = lerp(group.position.y, target.y, 0.07);
    group.position.z = lerp(group.position.z, target.z, 0.07);
  });

  renderer.render(scene, camera);
}

function resize() {
  const size = getStageSize();
  width = size.width;
  height = size.height;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

renderNav();
updateFocusTexture();
updateTime();
window.setInterval(updateTime, 1000);
window.addEventListener("resize", resize);
animate();
