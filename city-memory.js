const galleryItems = Array.from({ length: 26 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  return {
    image: `assets/城市文字记忆/${number}.png`,
    title: `城市文字样本 ${number}`,
    date: "待补充拍摄时间",
    location: "待补充拍摄地点",
    background: "记录城市文字与日常环境的关系。后续可补充招牌来源、街区故事与个人观察。",
  };
});

const stage = document.getElementById("memory-stage");
const gallery = document.getElementById("circular-gallery");
const detailDialog = document.getElementById("memory-detail-dialog");
const detailClose = document.getElementById("memory-dialog-close");
const detailImage = document.getElementById("memory-detail-image");
const detailTitle = document.getElementById("memory-detail-title");
const detailDate = document.getElementById("memory-detail-date");
const detailLocation = document.getElementById("memory-detail-location");
const detailBackground = document.getElementById("memory-detail-background");

let scroll = {
  current: 0,
  target: 0,
  last: 0,
  ease: 0.075,
};
let isDown = false;
let startX = 0;
let startTarget = 0;
let activeIndex = 0;
let rafId = null;
let lastFocusedCard = null;

const cards = [];
const itemGap = 360;
const bend = 150;
const itemTotal = galleryItems.length;

function lerp(from, to, amount) {
  return from + (to - from) * amount;
}

function wrapIndex(index) {
  return ((index % itemTotal) + itemTotal) % itemTotal;
}

function renderCards() {
  const track = document.createElement("div");
  track.className = "gallery-track";
  gallery.append(track);

  galleryItems.concat(galleryItems).forEach((item, index) => {
    const card = document.createElement("button");
    card.className = "gallery-card";
    card.type = "button";
    card.dataset.index = String(index % itemTotal);
    card.dataset.rawIndex = String(index);
    card.setAttribute("aria-label", `查看${item.title}的详细信息`);
    card.innerHTML = `
      <img src="${item.image}" alt="" draggable="false" />
    `;
    card.addEventListener("click", () => {
      const rawIndex = Number(card.dataset.rawIndex);
      const isCentered = Math.abs(rawIndex * itemGap - scroll.current) < itemGap * 0.45;

      if (!isCentered) {
        scroll.target = rawIndex * itemGap;
        return;
      }

      openImageDetail(item, card);
    });
    track.append(card);
    cards.push(card);
  });
}

function openImageDetail(item, card) {
  lastFocusedCard = card;
  detailImage.src = item.image;
  detailImage.alt = item.title;
  detailTitle.textContent = item.title;
  detailDate.textContent = item.date;
  detailLocation.textContent = item.location;
  detailBackground.textContent = item.background;
  detailDialog.showModal();
  detailClose.focus({ preventScroll: true });
}

function updateCards() {
  const stageWidth = stage.clientWidth || 1280;
  const centerOffset = stageWidth / 2;
  const totalWidth = itemGap * itemTotal;

  scroll.current = lerp(scroll.current, scroll.target, scroll.ease);
  const direction = scroll.current > scroll.last ? 1 : -1;
  activeIndex = wrapIndex(Math.round(scroll.current / itemGap));

  cards.forEach((card, index) => {
    let x = index * itemGap - scroll.current;

    if (direction > 0 && x < -centerOffset - itemGap) x += totalWidth * 2;
    if (direction < 0 && x > centerOffset + totalWidth) x -= totalWidth * 2;

    const normalized = x / centerOffset;
    const curveY = Math.abs(normalized) * Math.abs(normalized) * bend;
    const rotate = normalized * -13;
    const scale = Math.max(0.66, 1 - Math.abs(normalized) * 0.16);
    const opacity = Math.max(0.22, 1 - Math.abs(normalized) * 0.22);
    const blur = Math.max(0, Math.abs(normalized) - 0.92) * 4;
    const zIndex = Math.round(100 - Math.abs(normalized) * 10);

    card.style.transform = `
      translate(-50%, -50%)
      translate3d(${x}px, ${curveY}px, 0)
      rotateZ(${rotate}deg)
      scale(${scale})
    `;
    card.style.opacity = opacity.toFixed(3);
    card.style.filter = `blur(${blur}px)`;
    card.style.zIndex = String(zIndex);
    card.classList.toggle("is-active", Number(card.dataset.index) === activeIndex);
  });

  scroll.last = scroll.current;
  rafId = window.requestAnimationFrame(updateCards);
}

function snapToNearest() {
  scroll.target = Math.round(scroll.target / itemGap) * itemGap;
}

function onPointerDown(event) {
  isDown = true;
  startX = event.clientX;
  startTarget = scroll.target;
  stage.setPointerCapture(event.pointerId);
}

function onPointerMove(event) {
  if (!isDown) return;
  scroll.target = startTarget + (startX - event.clientX) * 1.15;
}

function onPointerUp(event) {
  if (!isDown) return;
  isDown = false;
  stage.releasePointerCapture(event.pointerId);
  snapToNearest();
}

function onWheel(event) {
  event.preventDefault();
  scroll.target += (event.deltaY || event.deltaX) * 0.65;
  window.clearTimeout(onWheel.timer);
  onWheel.timer = window.setTimeout(snapToNearest, 160);
}

renderCards();
stage.addEventListener("pointerdown", onPointerDown);
stage.addEventListener("pointermove", onPointerMove);
stage.addEventListener("pointerup", onPointerUp);
stage.addEventListener("pointercancel", onPointerUp);
stage.addEventListener("wheel", onWheel, { passive: false });
updateCards();

detailClose.addEventListener("click", () => detailDialog.close());
detailDialog.addEventListener("click", (event) => {
  if (event.target === detailDialog) detailDialog.close();
});
detailDialog.addEventListener("close", () => {
  lastFocusedCard?.focus({ preventScroll: true });
});

window.addEventListener("beforeunload", () => {
  if (rafId) window.cancelAnimationFrame(rafId);
});
