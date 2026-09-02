(() => {
  const track = document.querySelector('.research-gallery-track');
  const cards = Array.from(document.querySelectorAll('.research-gallery-card'));
  const previous = document.querySelector('[data-research-prev]');
  const next = document.querySelector('[data-research-next]');
  const toggle = document.querySelector('[data-research-toggle]');
  const current = document.querySelector('[data-research-current]');
  const total = document.querySelector('[data-research-total]');

  if (!track || !cards.length) return;

  let index = 0;
  let timer;
  let playing = true;
  total.textContent = String(cards.length).padStart(2, '0');

  const render = () => {
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const width = cards[0].getBoundingClientRect().width + gap;
    track.style.transform = `translateX(${-index * width}px)`;
    cards.forEach((card, cardIndex) => card.classList.toggle('is-active', cardIndex === index));
    current.textContent = String(index + 1).padStart(2, '0');
  };

  const move = (direction) => {
    index = (index + direction + cards.length) % cards.length;
    render();
  };

  const start = () => {
    window.clearInterval(timer);
    if (playing) timer = window.setInterval(() => move(1), 5500);
  };

  previous.addEventListener('click', () => { move(-1); start(); });
  next.addEventListener('click', () => { move(1); start(); });
  toggle.addEventListener('click', () => {
    playing = !playing;
    toggle.setAttribute('aria-pressed', String(!playing));
    toggle.textContent = playing ? '暂停自动播放' : '继续自动播放';
    start();
  });
  track.addEventListener('mouseenter', () => window.clearInterval(timer));
  track.addEventListener('mouseleave', start);
  window.addEventListener('resize', render);

  render();
  start();
})();
