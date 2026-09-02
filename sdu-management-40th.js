(() => {
  const track = document.querySelector('.gallery-track');
  const cards = Array.from(document.querySelectorAll('.gallery-card'));
  const previous = document.querySelector('[data-gallery-prev]');
  const next = document.querySelector('[data-gallery-next]');
  const toggle = document.querySelector('[data-gallery-toggle]');
  const currentLabel = document.querySelector('[data-gallery-current]');
  const totalLabel = document.querySelector('[data-gallery-total]');

  if (!track || cards.length === 0) return;

  let index = 0;
  let timer;
  let playing = true;
  const total = cards.length;

  totalLabel.textContent = String(total).padStart(2, '0');

  const render = () => {
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const cardWidth = cards[0].getBoundingClientRect().width + gap;
    track.style.transform = `translateX(${-index * cardWidth}px)`;
    cards.forEach((card, cardIndex) => card.classList.toggle('is-active', cardIndex === index));
    currentLabel.textContent = String(index + 1).padStart(2, '0');
  };

  const move = (direction) => {
    index = (index + direction + total) % total;
    render();
  };

  const start = () => {
    window.clearInterval(timer);
    if (playing) timer = window.setInterval(() => move(1), 5600);
  };

  previous.addEventListener('click', () => { move(-1); start(); });
  next.addEventListener('click', () => { move(1); start(); });
  window.addEventListener('resize', render);

  toggle.addEventListener('click', () => {
    playing = !playing;
    toggle.setAttribute('aria-pressed', String(!playing));
    toggle.textContent = playing ? '暂停自动播放' : '继续自动播放';
    start();
  });

  track.addEventListener('mouseenter', () => window.clearInterval(timer));
  track.addEventListener('mouseleave', start);

  render();
  start();
})();
