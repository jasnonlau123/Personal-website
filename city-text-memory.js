(() => {
  const cities = ["济南", "青岛", "北京", "上海", "广州", "淄博", "西安", "成都"];
  const types = ["sign", "hand", "wall", "shop", "public"];
  const typeNames = {
    sign: "街头招牌",
    hand: "民间手写字",
    wall: "墙面文字",
    shop: "店铺门头",
    public: "公共标识",
  };
  const descriptions = {
    sign: "旧招牌保留着行业、街区与时代共同塑造的视觉习惯。",
    hand: "手写文字记录了个体笔迹与地方生活最直接的温度。",
    wall: "墙面上的文字随时间褪色，也成为城市更新前的视觉切片。",
    shop: "店铺门头连接商业日常、社区关系与地方审美。",
    public: "公共标识在功能信息之外，也保存着特定年代的设计语言。",
  };

  const items = [
    ...Array.from({ length: 25 }, (_, index) => {
      const number = String(index + 2).padStart(2, "0");
      const type = types[index % types.length];
      const city = cities[index % cities.length];
      return {
        image: `网页素材/文化传播-城市文字记忆/城市文字记忆-${number}.jpg`,
        title: `${typeNames[type]} · ${number}`,
        type,
        city,
        date: `2023.${String((index % 12) + 1).padStart(2, "0")}`,
        description: descriptions[type],
      };
    }),
    {
      image: "网页素材/文化传播-城市文字记忆/城市文字记忆_画板 1.jpg",
      title: "城市文字样本 · 27",
      type: "sign",
      city: "淄博",
      date: "2023",
      description: "城市文字影像档案，详细说明待补充。",
    },
  ];

  const rail = document.getElementById("memory-browser-rail");
  const empty = document.getElementById("memory-empty");
  const prev = document.querySelector("[data-memory-prev]");
  const next = document.querySelector("[data-memory-next]");
  const caption = document.querySelector(".memory-browser-caption");
  const activeCity = document.getElementById("memory-active-city");
  const activeDate = document.getElementById("memory-active-date");
  const activeTitle = document.getElementById("memory-active-title");
  const activeDescription = document.getElementById("memory-active-description");
  const currentLabel = document.getElementById("memory-current");
  const totalLabel = document.getElementById("memory-total");
  const lightbox = document.querySelector(".memory-lightbox");
  const lightboxImage = lightbox.querySelector("img");
  const lightboxCaption = lightbox.querySelector("figcaption");
  const lightboxClose = lightbox.querySelector(".memory-lightbox-close");

  let activeType = "all";
  let activeCityFilter = "all";
  let filteredItems = items;
  let activeIndex = 0;

  function wrap(index, length) {
    return ((index % length) + length) % length;
  }

  function updateCaption(item) {
    activeCity.textContent = `${item.city} / ${item.city === "济南" ? "JINAN" : "CITY ARCHIVE"}`;
    activeDate.textContent = item.date;
    activeTitle.textContent = item.title;
    activeDescription.textContent = item.description;
    currentLabel.textContent = String(activeIndex + 1).padStart(2, "0");
    totalLabel.textContent = String(filteredItems.length).padStart(2, "0");
  }

  function openLightbox(item) {
    lightboxImage.src = item.image;
    lightboxImage.alt = `${item.city}${item.title}`;
    lightboxCaption.textContent = `${item.city} · ${item.title} · ${item.date}`;
    lightbox.showModal();
    lightboxClose.focus();
  }

  function renderBrowser() {
    rail.replaceChildren();
    const hasItems = filteredItems.length > 0;
    empty.hidden = hasItems;
    prev.disabled = !hasItems;
    next.disabled = !hasItems;
    rail.hidden = !hasItems;
    caption.hidden = !hasItems;
    if (!hasItems) return;

    activeIndex = wrap(activeIndex, filteredItems.length);
    for (let offset = -3; offset <= 3; offset += 1) {
      const itemIndex = wrap(activeIndex + offset, filteredItems.length);
      const item = filteredItems[itemIndex];
      const button = document.createElement("button");
      button.className = "memory-browser-item";
      button.type = "button";
      button.dataset.offset = String(offset);
      button.setAttribute("aria-label", `查看${item.city}${item.title}`);
      if (offset === 0) {
        button.classList.add("is-active");
        button.setAttribute("aria-current", "true");
      }

      const image = document.createElement("img");
      image.src = item.image;
      image.alt = `${item.city}${item.title}`;
      image.loading = offset === 0 ? "eager" : "lazy";
      button.append(image);
      button.addEventListener("click", () => {
        if (offset === 0) {
          openLightbox(item);
          return;
        }
        activeIndex = itemIndex;
        renderBrowser();
      });
      rail.append(button);
    }
    updateCaption(filteredItems[activeIndex]);
  }

  function applyFilters() {
    filteredItems = items.filter((item) => {
      const typeMatches = activeType === "all" || item.type === activeType;
      const cityMatches = activeCityFilter === "all" || item.city === activeCityFilter;
      return typeMatches && cityMatches;
    });
    activeIndex = 0;
    renderBrowser();
  }

  document.querySelectorAll("[data-filter-group]").forEach((group) => {
    group.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-filter]");
      if (!button) return;
      group.querySelectorAll("button").forEach((candidate) => {
        const isCurrent = candidate === button;
        candidate.classList.toggle("is-active", isCurrent);
        candidate.setAttribute("aria-pressed", String(isCurrent));
      });
      if (group.dataset.filterGroup === "type") activeType = button.dataset.filter;
      if (group.dataset.filterGroup === "city") activeCityFilter = button.dataset.filter;
      applyFilters();
    });
  });

  prev.addEventListener("click", () => {
    if (!filteredItems.length) return;
    activeIndex = wrap(activeIndex - 1, filteredItems.length);
    renderBrowser();
  });

  next.addEventListener("click", () => {
    if (!filteredItems.length) return;
    activeIndex = wrap(activeIndex + 1, filteredItems.length);
    renderBrowser();
  });

  let pointerStartX = null;
  rail.addEventListener("pointerdown", (event) => {
    pointerStartX = event.clientX;
    rail.setPointerCapture?.(event.pointerId);
  });
  rail.addEventListener("pointerup", (event) => {
    if (pointerStartX === null) return;
    const distance = event.clientX - pointerStartX;
    pointerStartX = null;
    if (Math.abs(distance) < 44) return;
    if (distance > 0) prev.click();
    if (distance < 0) next.click();
  });

  document.addEventListener("keydown", (event) => {
    if (lightbox.open || !filteredItems.length) return;
    if (event.key === "ArrowLeft") prev.click();
    if (event.key === "ArrowRight") next.click();
  });

  document.querySelectorAll("[data-city-jump]").forEach((button) => {
    button.addEventListener("click", () => {
      const cityButton = document.querySelector(`[data-filter-group="city"] [data-filter="${button.dataset.cityJump}"]`);
      cityButton?.click();
      document.getElementById("browser-title").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  lightboxClose.addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
  });

  renderBrowser();
})();
