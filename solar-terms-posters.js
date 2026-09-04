(() => {
  const posters = Array.from(document.querySelectorAll('.solar-poster-wall figure'));
  const lightbox = document.querySelector('.poster-lightbox');
  const preview = lightbox?.querySelector('img');
  const caption = lightbox?.querySelector('figcaption');
  const download = lightbox?.querySelector('.poster-download');
  const close = lightbox?.querySelector('.poster-lightbox-close');

  if (!lightbox || !preview || !caption || !download || !close) return;

  const openPoster = (poster) => {
    const image = poster.querySelector('img');
    const label = poster.querySelector('figcaption')?.textContent?.trim() || '二十四节气海报';
    if (!image) return;

    preview.src = image.currentSrc || image.src;
    preview.alt = image.alt;
    caption.textContent = label;
    download.href = image.currentSrc || image.src;
    download.download = image.src.split('/').pop() || 'solar-terms-poster.jpg';
    lightbox.showModal();
    close.focus();
  };

  posters.forEach((poster) => {
    poster.tabIndex = 0;
    poster.setAttribute('role', 'button');
    poster.setAttribute('aria-haspopup', 'dialog');
    poster.addEventListener('click', () => openPoster(poster));
    poster.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openPoster(poster);
      }
    });
  });

  close.addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) lightbox.close();
  });
})();
