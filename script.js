const scrollProgress = document.querySelector(".scroll-progress");
const cursorRing = document.querySelector(".cursor-ring");
const hero = document.querySelector(".hero");
const heroOrb = document.querySelector(".hero-orb");
const orbText = document.getElementById("orb-text");
const languageButton = document.querySelector(".language-button");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");
const revealEls = document.querySelectorAll(".reveal");
const finePointer = window.matchMedia("(pointer: fine)");
const identityCard = document.querySelector(".identity-card");
const wechatButton = document.querySelector("[data-wechat]");
const wechatNote = document.querySelector(".wechat-note");
const backToTop = document.querySelector(".back-to-top");

const orbWords = {
  zh: ["创新", "传播", "设计", "研究", "叙事"],
  en: ["Create", "Media", "Design", "Study", "Story"],
};

const copy = {
  zh: {
    nav: ["传播", "服务", "研究", "合作"],
    location: "山东 济南",
    languageButton: "EN",
    brandAria: "回到首页",
    orbAria: "切换首页关键词",
    heroSubtitle: "Master's student in Art and Design / Digital and Media Major",
    scrollHint: "移动鼠标开启探索吧 · 向下滚动查看更多",
    aboutTitle: "关于我",
    aboutText: "我关注文化如何被看见、被理解、被重新组织。实践上，我把传播策略、视觉设计和研究方法结合起来，服务于展览、品牌、媒体内容、公共文化项目与学术写作。",
    profileItems: [
      "<strong>身份：</strong>艺术与设计硕士研究生",
      "<strong>方向：</strong>文化传播 / 视觉设计 / 学术研究",
      "<strong>坐标：</strong>山东济南",
    ],
    cultureTitle: "文化传播",
    cultureIntro: "从文化议题出发，将研究、内容与视觉组织为可被理解、参与和持续传播的公共经验。",
    topics: [
      ["文化议题策划", "从地方经验、传统资源与公共议题中建立清晰的传播主题。"],
      ["城市文化叙事", "保存城市更新中的文字痕迹，让地方记忆重新进入公共视野。"],
      ["文化内容转译", "用字体、图像与编辑系统降低复杂文化材料的理解门槛。"],
      ["媒介协作传播", "根据展览、品牌、社交媒体与数字产品场景，建立彼此连贯的传播触点。"],
    ],
    designTitle: "设计服务",
    designIntro: "覆盖品牌识别、字体创意、包装文创、视觉传播、数字体验、插画 IP 与出版物。",
    serviceSlides: [
      ["帝台春标志", "READ DETAILS"],
      ["传承人百科", "READ DETAILS"],
      ["包装文创", "READ DETAILS"],
      ["山东大学管理学院四十周年标志", "READ DETAILS"],
      ["数字体验", "READ DETAILS"],
      ["北朝佛传图像故事研究", "READ DETAILS"],
    ],
    researchTitle: "学术研究",
    researchIntro: "以文字、印刷、媒介与城市视觉文化为线索，将史料研究、设计实验与公共表达连接起来。",
    researchSlides: [
      ["中文金属活字出版物发展概略信息图", "#印刷史　#中文活字　#信息可视化"],
      ["汉字解构与重组", "#汉字语义　#字形重组　#视觉实验"],
      ["参数化逻辑下的字体形态生成", "#算法设计　#字体生成　#设计方法"],
      ["城市文字记忆", "#城市叙事　#视觉文化遗产　#地方档案"],
      ["塔林文字复刻计划", "#传统书体　#文字复刻　#开源计划"],
      ["马圈湾汉简隶书可变字体设计", "#汉简隶书　#可变字体　#传统文化"],
      ["基于西文书写工具的汉字字体创新设计", "#书写工具　#汉字字体　#设计创新"],
    ],
    collabTitle: "与我合作",
    collabText: "文化传播、品牌设计、视觉系统与研究项目，欢迎交流新的合作可能。",
    collabLink: "发起合作对话",
    contactLabel: "联系合作",
    backToTop: "TOP",
    controls: { prev: "上一张", next: "下一张", pause: "暂停", play: "播放" },
    wechat: "WeChat 联系方式待补充，欢迎先通过邮件联系。",
    copyright: "Copyright © 2026 Liu YongKai. All rights reserved.",
  },
  en: {
    nav: ["Culture", "Services", "Research", "Contact"],
    location: "Jinan, Shandong",
    languageButton: "中",
    brandAria: "Back to home",
    orbAria: "Switch hero keyword",
    heroSubtitle: "Master's student in Art and Design / Digital and Media Major",
    scrollHint: "Move the cursor to explore · Scroll down for more",
    aboutTitle: "About Me",
    aboutText: "I focus on how culture is seen, understood, and reorganized. My practice combines communication strategy, visual design, and research methods for exhibitions, branding, media content, public culture projects, and academic writing.",
    profileItems: [
      "<strong>Identity:</strong> Master's student in Art and Design",
      "<strong>Focus:</strong> Cultural Communication / Visual Design / Academic Research",
      "<strong>Location:</strong> Jinan, Shandong",
    ],
    cultureTitle: "Cultural Communication",
    cultureIntro: "Turning research, content, and visual systems into public cultural experiences that can be understood, joined, and shared.",
    topics: [
      ["Cultural Topic Strategy", "Build communication themes from local experience, cultural resources, and public issues."],
      ["Urban Cultural Narrative", "Preserve lettering traces from urban change and return local memory to public view."],
      ["Cultural Content Translation", "Use type, image, and editorial systems to make complex cultural material accessible."],
      ["Media Collaboration", "Connect exhibitions, brands, social media, and digital products through coherent touchpoints."],
    ],
    designTitle: "Design Services",
    designIntro: "Brand identity, creative typography, cultural packaging, visual communication, digital experience, illustration, and publications.",
    serviceSlides: [
      ["Di Tai Chun Brand Mark", "READ DETAILS"],
      ["Heritage Encyclopedia", "READ DETAILS"],
      ["Cultural Products", "READ DETAILS"],
      ["Visual Communication", "READ DETAILS"],
      ["Digital Experience", "READ DETAILS"],
      ["Northern Dynasties Buddhist Image Stories", "READ DETAILS"],
    ],
    researchTitle: "Academic Research",
    researchIntro: "Connecting historical materials, design experiments, and public expression through type, printing, media, and urban visual culture.",
    researchSlides: [
      ["Chinese Metal Type Publishing Infographic", "#Printing History　#Chinese Type　#Information Design"],
      ["Chinese Character Deconstruction and Recombination", "#Semantic Type　#Glyph Form　#Visual Experiment"],
      ["Parametric Typeface Form Generation", "#Computational Design　#Type Generation　#Design Method"],
      ["Urban Text Memory", "#Urban Narrative　#Visual Heritage　#Local Archive"],
      ["Tallinn Lettering Reproduction Project", "#Traditional Type　#Lettering Reproduction　#Open Source"],
      ["Maquanwan Han-Slip Variable Typeface", "#Han-Slip Script　#Variable Font　#Cultural Heritage"],
      ["Chinese Typeface Innovation with Western Writing Tools", "#Writing Tools　#Chinese Type　#Design Innovation"],
    ],
    collabTitle: "Collaboration",
    collabText: "Open to cultural communication, brand design, visual systems, and research collaborations.",
    collabLink: "Start a conversation",
    contactLabel: "Collaborate",
    backToTop: "TOP",
    controls: { prev: "PREV", next: "NEXT", pause: "PAUSE", play: "PLAY" },
    wechat: "WeChat details will be added soon. Please use email in the meantime.",
    copyright: "Copyright © 2026 Liu YongKai. All rights reserved.",
  },
};

let currentLanguage = "zh";
let orbIndex = 0;

function updateScrollProgress() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  scrollProgress.style.setProperty("--scroll", `${progress}%`);
}

window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();

window.addEventListener("pointermove", (event) => {
  if (!finePointer.matches) return;
  cursorRing.style.left = `${event.clientX}px`;
  cursorRing.style.top = `${event.clientY}px`;
  const rect = hero.getBoundingClientRect();
  if (event.clientY >= rect.top && event.clientY <= rect.bottom) {
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    heroOrb.style.left = `${Math.max(8, Math.min(78, x - 8))}%`;
    heroOrb.style.top = `${Math.max(22, Math.min(72, y - 8))}%`;
  }
});

document.querySelectorAll("a, button, .topic-card, .carousel-slide").forEach((item) => {
  item.addEventListener("pointerenter", () => cursorRing.classList.add("is-active"));
  item.addEventListener("pointerleave", () => cursorRing.classList.remove("is-active"));
});

function resetIdentityTilt() {
  identityCard.classList.remove("is-tilting");
  ["--tilt-x", "--tilt-y", "--glow-x", "--glow-y", "--image-x", "--image-y"].forEach((property) => identityCard.style.removeProperty(property));
}

identityCard.addEventListener("pointermove", (event) => {
  if (!finePointer.matches) return;
  const rect = identityCard.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;
  identityCard.classList.add("is-tilting");
  identityCard.style.setProperty("--tilt-x", `${-y * 1.4}deg`);
  identityCard.style.setProperty("--tilt-y", `${x * 1.7}deg`);
  identityCard.style.setProperty("--glow-x", `${(x + 0.5) * 100}%`);
  identityCard.style.setProperty("--glow-y", `${(y + 0.5) * 100}%`);
  identityCard.style.setProperty("--image-x", `${x * -7}px`);
  identityCard.style.setProperty("--image-y", `${y * -7}px`);
});
identityCard.addEventListener("pointerleave", resetIdentityTilt);
finePointer.addEventListener("change", () => {
  if (!finePointer.matches) resetIdentityTilt();
});

heroOrb.addEventListener("click", () => {
  orbIndex = (orbIndex + 1) % orbWords[currentLanguage].length;
  orbText.textContent = orbWords[currentLanguage][orbIndex];
  heroOrb.classList.toggle("is-centered");
});

const carouselApis = [];

function initCarousel(root) {
  const viewport = root.querySelector(".carousel-viewport");
  const track = root.querySelector(".carousel-track");
  const sourceSlides = Array.from(root.querySelectorAll(".carousel-slide"));
  const loopFill = root.dataset.loopFill === "true";
  const cloneCount = loopFill ? Math.min(3, sourceSlides.length) : 0;

  if (loopFill) {
    const prepend = sourceSlides.slice(-cloneCount).map((slide) => slide.cloneNode(true));
    const append = sourceSlides.slice(0, cloneCount).map((slide) => slide.cloneNode(true));
    prepend.forEach((slide) => {
      slide.dataset.carouselClone = "true";
    });
    append.forEach((slide) => {
      slide.dataset.carouselClone = "true";
    });
    // Keep neighboring project cards visible on both sides at the loop boundary.
    track.replaceChildren(...prepend, ...sourceSlides, ...append);
  }

  const slides = Array.from(root.querySelectorAll(".carousel-slide"));
  const dots = root.querySelector(".carousel-dots");
  const prev = root.querySelector(".carousel-prev");
  const next = root.querySelector(".carousel-next");
  const toggle = root.querySelector(".carousel-toggle");
  let index = 0;
  let physicalIndex = cloneCount;
  let loopResetIndex = null;
  let loopResetTimer = null;
  let paused = window.matchMedia("(prefers-reduced-motion: reduce)").matches || root.dataset.autoplay === "false";
  let timer = null;
  let pointerStart = null;
  let draggedAt = 0;

  sourceSlides.forEach((slide, slideIndex) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", `显示第 ${slideIndex + 1} 张`);
    dot.addEventListener("click", () => goTo(slideIndex, true));
    dots.append(dot);
  });

  slides.forEach((slide) => {
    slide.addEventListener("click", (event) => {
      if (performance.now() - draggedAt < 250) event.preventDefault();
    });
  });

  function update() {
    const activeSlide = slides[physicalIndex];
    const offset = (viewport.clientWidth - activeSlide.offsetWidth) / 2 - activeSlide.offsetLeft;
    track.style.transform = `translate3d(${offset}px, 0, 0)`;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === physicalIndex;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
      slide.tabIndex = active ? 0 : -1;
    });
    Array.from(dots.children).forEach((dot, dotIndex) => {
      const active = dotIndex === index;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-selected", String(active));
    });
  }

  function resetLoopPosition() {
    if (loopResetIndex === null) return;
    window.clearTimeout(loopResetTimer);
    const nextPhysicalIndex = loopResetIndex;
    loopResetIndex = null;
    track.style.transition = "none";
    physicalIndex = nextPhysicalIndex;
    update();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => track.style.removeProperty("transition"));
    });
  }

  track.addEventListener("transitionend", (event) => {
    if (event.target === track && event.propertyName === "transform") resetLoopPosition();
  });

  function restartTimer() {
    window.clearInterval(timer);
    if (!paused) timer = window.setInterval(() => goTo(index + 1, false), 5200);
  }

  function goTo(nextIndex, userInitiated = false) {
    window.clearTimeout(loopResetTimer);
    loopResetIndex = null;
    const isForwardWrap = loopFill && index === sourceSlides.length - 1 && nextIndex === sourceSlides.length;
    const isBackwardWrap = loopFill && index === 0 && nextIndex === -1;

    if (isForwardWrap) {
      index = 0;
      physicalIndex = cloneCount + sourceSlides.length;
      loopResetIndex = cloneCount;
    } else if (isBackwardWrap) {
      index = sourceSlides.length - 1;
      physicalIndex = cloneCount - 1;
      loopResetIndex = cloneCount + sourceSlides.length - 1;
    } else {
      index = (nextIndex + sourceSlides.length) % sourceSlides.length;
      physicalIndex = cloneCount + index;
    }
    update();
    if (loopResetIndex !== null) loopResetTimer = window.setTimeout(resetLoopPosition, 920);
    if (userInitiated) restartTimer();
  }

  prev.addEventListener("click", () => goTo(index - 1, true));
  next.addEventListener("click", () => goTo(index + 1, true));
  if (toggle) {
    toggle.addEventListener("click", () => {
      paused = !paused;
      toggle.setAttribute("aria-pressed", String(paused));
      updateCarouselLanguage();
      restartTimer();
    });
  }
  viewport.addEventListener("pointerdown", (event) => {
    pointerStart = { x: event.clientX, id: event.pointerId };
    viewport.setPointerCapture(event.pointerId);
  });
  viewport.addEventListener("pointerup", (event) => {
    if (!pointerStart) return;
    const distance = event.clientX - pointerStart.x;
    if (Math.abs(distance) > 45) {
      draggedAt = performance.now();
      goTo(index + (distance < 0 ? 1 : -1), true);
    }
    if (viewport.hasPointerCapture(pointerStart.id)) viewport.releasePointerCapture(pointerStart.id);
    pointerStart = null;
  });
  viewport.addEventListener("pointercancel", () => {
    pointerStart = null;
  });

  const api = { root, prev, next, toggle, getPaused: () => paused, update };
  carouselApis.push(api);
  requestAnimationFrame(update);
  restartTimer();
}

document.querySelectorAll("[data-carousel]").forEach(initCarousel);
window.addEventListener("resize", () => carouselApis.forEach((api) => api.update()));

function updateCarouselLanguage() {
  const controls = copy[currentLanguage].controls;
  carouselApis.forEach((api) => {
    if (api.root.dataset.compactControls !== "true") {
      api.prev.textContent = controls.prev;
      api.next.textContent = controls.next;
    }
    if (api.toggle) {
      api.toggle.textContent = api.getPaused() ? controls.play : controls.pause;
      api.toggle.setAttribute("aria-label", api.getPaused() ? controls.play : controls.pause);
    }
  });
}

function applyLanguage(language) {
  const text = copy[language];
  currentLanguage = language;
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  document.querySelector(".brand").setAttribute("aria-label", text.brandAria);
  document.querySelector(".footer-brand").setAttribute("aria-label", text.brandAria);
  languageButton.textContent = text.languageButton;
  document.querySelector(".header-meta span").textContent = text.location;
  navLinks.forEach((link, index) => {
    link.textContent = text.nav[index];
  });
  heroOrb.setAttribute("aria-label", text.orbAria);
  orbText.textContent = orbWords[language][orbIndex % orbWords[language].length];
  document.querySelector(".hero-content p").textContent = text.heroSubtitle;
  document.querySelector(".scroll-hint").textContent = text.scrollHint;
  document.querySelector("#about .section-title h2").textContent = text.aboutTitle;
  document.querySelector(".about-copy > p").textContent = text.aboutText;
  document.querySelectorAll(".profile-list li").forEach((item, index) => {
    item.innerHTML = text.profileItems[index];
  });
  document.querySelector("#culture .topics-title h2").textContent = text.cultureTitle;
  document.querySelector("#design .institutional-heading h2").textContent = text.designTitle;
  document.querySelectorAll("#design .carousel-slide:not([data-carousel-clone])").forEach((slide, index) => {
    slide.querySelector("h3").textContent = text.serviceSlides[index][0];
    slide.querySelector("p").textContent = text.serviceSlides[index][1];
  });
  document.querySelector("#research .institutional-heading h2").textContent = text.researchTitle;
  document.querySelector("#research .institutional-heading > p").textContent = text.researchIntro;
  document.querySelectorAll("#research .carousel-slide:not([data-carousel-clone])").forEach((slide, index) => {
    slide.querySelector("h3").textContent = text.researchSlides[index][0];
    slide.querySelector("p").textContent = text.researchSlides[index][1];
  });
  document.querySelector(".site-footer > p").textContent = text.copyright;
  document.querySelector(".footer-contact-label").textContent = text.contactLabel;
  backToTop.textContent = text.backToTop;
  backToTop.setAttribute("aria-label", text.backToTop);
  if (wechatNote.textContent) wechatNote.textContent = text.wechat;
  updateCarouselLanguage();
}

languageButton.addEventListener("click", () => applyLanguage(currentLanguage === "zh" ? "en" : "zh"));
wechatButton.addEventListener("click", () => {
  wechatNote.textContent = copy[currentLanguage].wechat;
  window.setTimeout(() => {
    wechatNote.textContent = "";
  }, 3200);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.13 }
);
revealEls.forEach((element) => revealObserver.observe(element));

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const current = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", current);
        link.toggleAttribute("aria-current", current);
      });
    });
  },
  { rootMargin: "-45% 0px -45% 0px" }
);
sections.forEach((section) => navObserver.observe(section));

applyLanguage("zh");
