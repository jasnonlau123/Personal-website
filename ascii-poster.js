const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d", { alpha: false });
const sourceImage = document.getElementById("source-image");
const cameraVideo = document.getElementById("camera-video");
const posterCard = document.getElementById("poster-card");
const stage = document.getElementById("poster-stage");
const particleSize = document.getElementById("particle-size");
const particleValue = document.getElementById("particle-value");
const particleColor = document.getElementById("particle-color");
const colorValue = document.getElementById("color-value");
const sizePreset = document.getElementById("size-preset");
const customSize = document.getElementById("custom-size");
const customWidth = document.getElementById("custom-width");
const customHeight = document.getElementById("custom-height");
const stageDimensions = document.getElementById("stage-dimensions");
const exportMeta = document.getElementById("export-meta");
const exportButton = document.getElementById("export-button");
const imageUpload = document.getElementById("image-upload");
const cameraStart = document.getElementById("camera-start");
const cameraCapture = document.getElementById("camera-capture");
const cameraStatus = document.getElementById("camera-status");
const stageStatus = document.getElementById("stage-status");
const toast = document.getElementById("toast");

const sampler = document.createElement("canvas");
const samplerCtx = sampler.getContext("2d", { willReadFrequently: true });
const frozenFrame = document.createElement("canvas");
const frozenCtx = frozenFrame.getContext("2d");
const characters = "@%#*+=-:.";

let activeSource = sourceImage;
let selectedColor = "#1d1d1d";
let selectedFormat = "png";
let stream = null;
let frozen = false;
let pointer = { x: .5, y: .5, active: false };
let lastDraw = 0;
let toastTimer;

function containRect(sourceWidth, sourceHeight, targetWidth, targetHeight) {
  const scale = Math.min(targetWidth / sourceWidth, targetHeight / sourceHeight);
  const width = sourceWidth * scale;
  const height = sourceHeight * scale;
  return { x: (targetWidth - width) / 2, y: (targetHeight - height) / 2, width, height };
}

function getSourceDimensions(source) {
  if (source === cameraVideo) return { width: source.videoWidth, height: source.videoHeight };
  if (source === frozenFrame) return { width: frozenFrame.width, height: frozenFrame.height };
  return { width: source.naturalWidth, height: source.naturalHeight };
}

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

function renderParticles(targetCtx, width, height, source, time = 0, exportScale = 1) {
  const sourceDimensions = getSourceDimensions(source);
  targetCtx.fillStyle = "#fbfaf6";
  targetCtx.fillRect(0, 0, width, height);
  if (!sourceDimensions.width || !sourceDimensions.height) return;

  const step = Math.max(3, Number(particleSize.value) * exportScale);
  const cols = Math.ceil(width / step);
  const rows = Math.ceil(height / step);
  sampler.width = cols;
  sampler.height = rows;
  samplerCtx.clearRect(0, 0, cols, rows);
  const rect = containRect(sourceDimensions.width, sourceDimensions.height, cols * .84, rows * .84);
  samplerCtx.drawImage(source, rect.x + cols * .08, rect.y + rows * .06, rect.width, rect.height);
  const pixels = samplerCtx.getImageData(0, 0, cols, rows).data;
  const rgb = hexToRgb(selectedColor);
  const breathe = Math.sin(time * .0013) * .2 + .8;

  targetCtx.textAlign = "center";
  targetCtx.textBaseline = "middle";
  targetCtx.font = `${Math.max(4, step * .92)}px ui-monospace, SFMono-Regular, Menlo, monospace`;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const index = (row * cols + col) * 4;
      const alpha = pixels[index + 3] / 255;
      if (alpha < .08) continue;
      const luminance = (pixels[index] * .2126 + pixels[index + 1] * .7152 + pixels[index + 2] * .0722) / 255;
      const density = (1 - luminance) * alpha;
      if (density < .1) continue;
      const charIndex = Math.min(characters.length - 1, Math.floor((1 - density) * characters.length));
      const dx = pointer.active ? (pointer.x - .5) * Math.sin(row * .22 + time * .001) * step * .8 : 0;
      const dy = Math.sin(col * .17 + time * .0016) * step * .16 * breathe;
      const opacity = Math.min(.92, .2 + density * .78);
      targetCtx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${opacity})`;
      targetCtx.fillText(characters[charIndex], col * step + step / 2 + dx, row * step + step / 2 + dy);
    }
  }
}

function draw(time = 0) {
  if (time - lastDraw > 48) {
    const rect = canvas.getBoundingClientRect();
    const density = Math.min(window.devicePixelRatio || 1, 1.6);
    const width = Math.max(320, Math.round(rect.width * density));
    const height = Math.max(320, Math.round(rect.height * density));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    renderParticles(ctx, canvas.width, canvas.height, activeSource, time, density);
    lastDraw = time;
  }
  requestAnimationFrame(draw);
}

function selectedDimensions() {
  if (sizePreset.value === "custom") {
    return {
      width: Math.max(320, Math.min(6000, Number(customWidth.value) || 1080)),
      height: Math.max(320, Math.min(6000, Number(customHeight.value) || 1350)),
    };
  }
  const [width, height] = sizePreset.value.split("x").map(Number);
  return { width, height };
}

function updateOutputUI() {
  const { width, height } = selectedDimensions();
  posterCard.style.setProperty("--poster-ratio", width / height);
  document.documentElement.style.setProperty("--poster-ratio", width / height);
  stageDimensions.textContent = `${width} × ${height} PX`;
  exportMeta.textContent = `${selectedFormat.toUpperCase()} · ${width} × ${height}`;
  lastDraw = 0;
}

function setColor(color) {
  selectedColor = color.toLowerCase();
  particleColor.value = selectedColor;
  colorValue.textContent = selectedColor.toUpperCase();
  document.querySelectorAll(".swatch").forEach((swatch) => {
    swatch.classList.toggle("is-selected", swatch.dataset.color === selectedColor);
  });
  lastDraw = 0;
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

async function startCamera() {
  if (!navigator.mediaDevices?.getUserMedia) {
    cameraStatus.textContent = "当前浏览器不支持摄像头访问";
    return;
  }
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 1280 } }, audio: false });
    cameraVideo.srcObject = stream;
    await cameraVideo.play();
    activeSource = cameraVideo;
    frozen = false;
    cameraCapture.disabled = false;
    cameraCapture.textContent = "定格当前画面";
    cameraStart.textContent = "摄像头已开启";
    cameraStatus.textContent = "实时画面处理中 · 不会上传";
    stageStatus.textContent = "CAMERA LIVE";
    lastDraw = 0;
  } catch (error) {
    cameraStatus.textContent = error.name === "NotAllowedError" ? "未获得摄像头权限，可改用上传图片" : "无法启动摄像头，请检查设备状态";
  }
}

function captureCamera() {
  if (!stream) return;
  if (!frozen) {
    frozenFrame.width = cameraVideo.videoWidth;
    frozenFrame.height = cameraVideo.videoHeight;
    frozenCtx.drawImage(cameraVideo, 0, 0);
    activeSource = frozenFrame;
    frozen = true;
    cameraCapture.textContent = "恢复实时画面";
    cameraStatus.textContent = "画面已定格，可继续调整与导出";
    stageStatus.textContent = "FRAME CAPTURED";
  } else {
    activeSource = cameraVideo;
    frozen = false;
    cameraCapture.textContent = "定格当前画面";
    cameraStatus.textContent = "实时画面处理中 · 不会上传";
    stageStatus.textContent = "CAMERA LIVE";
  }
  lastDraw = 0;
}

function loadUpload(file) {
  if (!file) return;
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.onload = () => {
    activeSource = image;
    cameraStatus.textContent = `正在使用：${file.name}`;
    stageStatus.textContent = "IMAGE READY";
    cameraCapture.disabled = true;
    lastDraw = 0;
    URL.revokeObjectURL(url);
  };
  image.onerror = () => showToast("这张图片无法读取，请换一张试试");
  image.src = url;
}

function drawPosterForExport(exportCanvas, width, height) {
  const exportCtx = exportCanvas.getContext("2d");
  exportCtx.fillStyle = "#fbfaf6";
  exportCtx.fillRect(0, 0, width, height);
  const artX = width * .06;
  const artY = height * .08;
  const artWidth = width * .88;
  const artHeight = height * .70;
  exportCtx.save();
  exportCtx.translate(artX, artY);
  renderParticles(exportCtx, artWidth, artHeight, activeSource, performance.now(), Math.max(1, width / 900));
  exportCtx.restore();

  exportCtx.fillStyle = "#151515";
  exportCtx.font = `700 ${Math.max(11, width * .011)}px ui-monospace, SFMono-Regular, Menlo, monospace`;
  exportCtx.fillText("LYK — VISUAL EXPERIMENT 01", width * .045, height * .045);
  exportCtx.fillRect(width * .94, height * .037, width * .012, width * .012);

  exportCtx.font = `800 ${Math.max(11, width * .012)}px ui-monospace, SFMono-Regular, Menlo, monospace`;
  exportCtx.fillText("TURN ANY IMAGE INTO", width * .045, height * .82);
  exportCtx.font = `950 ${Math.max(42, width * .085)}px Inter, Arial, sans-serif`;
  exportCtx.fillText("ASCII", width * .045, height * .88);
  exportCtx.fillText("MEMORY", width * .045, height * .95);

  const infoX = width * .58;
  exportCtx.fillRect(infoX, height * .82, width * .375, Math.max(1, width * .0013));
  exportCtx.font = `650 ${Math.max(10, width * .010)}px ui-monospace, SFMono-Regular, Menlo, monospace`;
  exportCtx.fillText("IMAGE BECOMES TEXTURE.", infoX, height * .855);
  exportCtx.fillText("TEXTURE BECOMES MEMORY.", infoX, height * .878);
  exportCtx.textAlign = "right";
  exportCtx.fillText("GENERATIVE POSTER", width * .955, height * .93);
  exportCtx.fillText("JINAN · 2026", width * .955, height * .952);
}

function exportPoster() {
  const { width, height } = selectedDimensions();
  const exportCanvas = document.createElement("canvas");
  exportCanvas.width = width;
  exportCanvas.height = height;
  drawPosterForExport(exportCanvas, width, height);
  const mime = selectedFormat === "jpg" ? "image/jpeg" : "image/png";
  const extension = selectedFormat;
  exportCanvas.toBlob((blob) => {
    if (!blob) return;
    const link = document.createElement("a");
    link.download = `ascii-memory-${width}x${height}.${extension}`;
    link.href = URL.createObjectURL(blob);
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    showToast(`已生成 ${width} × ${height} ${extension.toUpperCase()} 海报`);
  }, mime, selectedFormat === "jpg" ? .94 : undefined);
}

particleSize.addEventListener("input", () => {
  particleValue.textContent = `${particleSize.value} PX`;
  lastDraw = 0;
});

document.querySelectorAll(".swatch").forEach((swatch) => swatch.addEventListener("click", () => setColor(swatch.dataset.color)));
particleColor.addEventListener("input", () => setColor(particleColor.value));

document.querySelectorAll(".format-option").forEach((option) => option.addEventListener("click", () => {
  selectedFormat = option.dataset.format;
  document.querySelectorAll(".format-option").forEach((item) => {
    const selected = item === option;
    item.classList.toggle("is-selected", selected);
    item.setAttribute("aria-checked", String(selected));
  });
  updateOutputUI();
}));

sizePreset.addEventListener("change", () => {
  customSize.hidden = sizePreset.value !== "custom";
  updateOutputUI();
});
customWidth.addEventListener("input", updateOutputUI);
customHeight.addEventListener("input", updateOutputUI);
imageUpload.addEventListener("change", () => loadUpload(imageUpload.files[0]));
cameraStart.addEventListener("click", startCamera);
cameraCapture.addEventListener("click", captureCamera);
exportButton.addEventListener("click", exportPoster);

stage.addEventListener("pointermove", (event) => {
  const rect = stage.getBoundingClientRect();
  pointer = { x: (event.clientX - rect.left) / rect.width, y: (event.clientY - rect.top) / rect.height, active: true };
});
stage.addEventListener("pointerleave", () => { pointer.active = false; });

sourceImage.addEventListener("load", () => { activeSource = sourceImage; lastDraw = 0; });
window.addEventListener("beforeunload", () => stream?.getTracks().forEach((track) => track.stop()));
updateOutputUI();
requestAnimationFrame(draw);
