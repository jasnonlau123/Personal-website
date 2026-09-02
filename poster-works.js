const container = document.getElementById("card-swap");
const cards = Array.from(container.querySelectorAll(".card"));

const cardDistance = 60;
const verticalDistance = 70;
const delay = 5000;
const skewAmount = 6;
const order = cards.map((_, index) => index);

let isAnimating = false;

function makeSlot(index, total) {
  return {
    x: index * cardDistance,
    y: -index * verticalDistance,
    z: -index * cardDistance * 1.5,
    zIndex: total - index,
  };
}

function makeTransform(slot, skew = skewAmount) {
  return `translate(-50%, -50%) translate3d(${slot.x}px, ${slot.y}px, ${slot.z}px) skewY(${skew}deg)`;
}

function placeCard(card, slot, animate = false) {
  card.style.zIndex = String(slot.zIndex);
  card.classList.toggle("is-front", slot.zIndex === cards.length);

  if (!animate) card.style.transition = "none";
  card.style.transform = makeTransform(slot);
  card.style.opacity = String(Math.max(0.42, 1 - (cards.length - slot.zIndex) * 0.18));

  if (!animate) {
    card.offsetHeight;
    card.style.transition = "";
  }
}

function placeAll() {
  order.forEach((cardIndex, slotIndex) => {
    placeCard(cards[cardIndex], makeSlot(slotIndex, cards.length), false);
  });
}

function moveCard(card, slot, duration = 800) {
  return new Promise((resolve) => {
    card.style.transition = `transform ${duration}ms cubic-bezier(0.16, 1.28, 0.3, 1), opacity ${duration}ms ease`;
    placeCard(card, slot, true);
    window.setTimeout(resolve, duration);
  });
}

async function swap() {
  if (isAnimating || order.length < 2) return;
  isAnimating = true;

  const [front, ...rest] = order;
  const frontCard = cards[front];
  const frontSlot = makeSlot(0, cards.length);
  const dropSlot = { ...frontSlot, y: frontSlot.y + 500, z: frontSlot.z + 40, zIndex: cards.length + 1 };

  frontCard.style.zIndex = String(dropSlot.zIndex);
  await moveCard(frontCard, dropSlot, 2000);

  await Promise.all(
    rest.map(
      (cardIndex, slotIndex) =>
        new Promise((resolve) => {
          window.setTimeout(() => {
            moveCard(cards[cardIndex], makeSlot(slotIndex, cards.length), 2000).then(resolve);
          }, slotIndex * 150);
        })
    )
  );

  const backSlot = makeSlot(cards.length - 1, cards.length);
  frontCard.style.zIndex = String(backSlot.zIndex);
  await new Promise((resolve) => window.setTimeout(resolve, 100));
  await moveCard(frontCard, backSlot, 2000);

  order.splice(0, order.length, ...rest, front);
  placeAll();
  isAnimating = false;
}

cards.forEach((card) => {
  card.addEventListener("click", () => {
    if (card.classList.contains("is-front") && card.dataset.url) {
      window.location.href = card.dataset.url;
      return;
    }
    swap();
  });
});

placeAll();
window.setInterval(swap, delay);
window.setTimeout(swap, 400);
