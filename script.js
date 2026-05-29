const scrollProgress = document.querySelector(".scroll-progress");
const cursorRing = document.querySelector(".cursor-ring");
const hero = document.querySelector(".hero");
const heroOrb = document.querySelector(".hero-orb");
const orbText = document.getElementById("orb-text");
const languageButton = document.querySelector(".language-button");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");
const revealEls = document.querySelectorAll(".reveal");
const skillCards = document.querySelectorAll(".skill-card");
const researchButtons = document.querySelectorAll(".research-tabs button");
const researchDetail = document.getElementById("research-detail");
const projectRows = document.querySelectorAll(".project-row");
const dialog = document.getElementById("project-dialog");
const dialogKicker = document.getElementById("dialog-kicker");
const dialogTitle = document.getElementById("dialog-title");
const dialogBody = document.getElementById("dialog-body");
const projectSubmenu = document.getElementById("project-submenu");
const projectSubpanel = document.getElementById("project-subpanel");
const contactForm = document.getElementById("contact-form");
const toast = document.getElementById("toast");

const orbWords = {
  zh: ["创新", "传播", "设计", "研究", "叙事"],
  en: ["Create", "Media", "Design", "Study", "Story"],
};
let orbIndex = 0;
let currentLanguage = "zh";

const researchContent = {
  zh: {
    media: {
      title: "媒介环境中的文化转译",
      body: "研究文化内容如何在社交媒体、视觉系统与公共空间中被重新编码，并影响受众的理解、参与和身份认同。",
    },
    design: {
      title: "设计作为研究方法",
      body: "关注视觉语言如何帮助梳理问题、组织证据，并把抽象的社会与文化议题转化为可讨论的界面。",
    },
    city: {
      title: "城市叙事与地方感",
      body: "探索城市记忆、社区经验和公共文化项目如何共同塑造地方形象，以及设计如何参与这种叙事。",
    },
  },
  en: {
    media: {
      title: "Cultural Translation In Media Environments",
      body: "This research explores how cultural content is re-coded across social media, visual systems, and public spaces, shaping understanding, participation, and identity.",
    },
    design: {
      title: "Design As A Research Method",
      body: "I study how visual language can organize questions and evidence, turning abstract cultural issues into discussable interfaces and narratives.",
    },
    city: {
      title: "Urban Narrative And Sense Of Place",
      body: "This direction examines how city memory, community experience, and public cultural projects shape place identity through design.",
    },
  },
};

const projectContent = {
  zh: {
    brand: {
      kicker: "Brand System",
      title: "文化机构视觉识别",
      body: "围绕文化机构的公共形象建立标志、字体、色彩、版式和应用系统。",
      menu: [
        {
          label: "项目概览",
          title: "从公共形象到识别系统",
          body: "梳理文化机构的定位、受众和传播场景，把抽象的文化气质转化为清晰、可延展的视觉语言。",
        },
        {
          label: "标志系统",
          title: "标志与基础图形",
          body: "建立主标志、辅助图形、留白规范和组合规则，保证线上页面、线下物料与展览现场保持一致识别。",
        },
        {
          label: "字体色彩",
          title: "字体、色彩与版式秩序",
          body: "围绕标题、正文、导视和社媒传播建立字体层级，并用主色、辅助色和灰阶系统控制整体气质。",
        },
        {
          label: "应用延展",
          title: "多场景应用方案",
          body: "延展到海报、展签、导览手册、社交媒体封面、活动视觉和基础办公物料，形成可落地的品牌工具包。",
        },
      ],
    },
    editorial: {
      kicker: "Editorial Design",
      title: "城市文化专题页面",
      body: "把城市文化议题拆解成可阅读、可浏览、可分享的图文叙事，适合承载调研文本、视觉素材和访谈摘录。",
    },
    digital: {
      kicker: "Digital Experience",
      title: "互动展览导览原型",
      body: "围绕观众动线、内容层级和触屏交互，构建展览导览的数字原型，展示流程图、界面稿和用户反馈。",
    },
  },
  en: {
    brand: {
      kicker: "Brand System",
      title: "Visual Identity For Cultural Institutions",
      body: "A visual identity system for cultural institutions, including logo, typography, color, layout, and application rules.",
      menu: [
        {
          label: "Overview",
          title: "From Public Image To Identity System",
          body: "Clarify positioning, audiences, and communication scenes, then translate the institution's cultural character into a scalable visual language.",
        },
        {
          label: "Logo System",
          title: "Logo And Graphic Foundation",
          body: "Build primary marks, supporting graphics, clear-space rules, and lockups for consistent recognition across digital and physical touchpoints.",
        },
        {
          label: "Type & Color",
          title: "Typography, Color, And Layout Order",
          body: "Define type hierarchy, primary and supporting colors, and layout rhythm for editorial, wayfinding, and social media use.",
        },
        {
          label: "Applications",
          title: "Multi-Scene Application Toolkit",
          body: "Extend the system into posters, captions, guidebooks, social covers, event visuals, and office materials.",
        },
      ],
    },
    editorial: {
      kicker: "Editorial Design",
      title: "Urban Culture Feature Page",
      body: "An editorial web experience that turns urban cultural topics into readable, browsable, and shareable visual stories.",
    },
    digital: {
      kicker: "Digital Experience",
      title: "Interactive Exhibition Guide Prototype",
      body: "A digital guide prototype built around visitor flow, content hierarchy, and touchscreen interaction.",
    },
  },
};

const copy = {
  zh: {
    nav: ["关于", "传播", "项目", "研究", "合作"],
    location: "山东 济南",
    languageButton: "EN",
    orbAria: "切换首页关键词",
    brandAria: "回到首页",
    heroSubtitle: "Master's student in Art and Design / Digital and Media Major",
    scrollHint: "移动鼠标开启探索吧 · 向下滚动查看更多",
    aboutTitle: "关于我",
    aboutText:
      "我关注文化如何被看见、被理解、被重新组织。实践上，我把传播策略、视觉设计和研究方法结合起来，服务于展览、品牌、媒体内容、公共文化项目与学术写作。",
    profileItems: [
      "<strong>身份：</strong>艺术与设计硕士研究生",
      "<strong>方向：</strong>文化传播 / 视觉设计 / 学术研究",
      "<strong>坐标：</strong>山东济南",
    ],
    cultureTitle: "文化传播",
    skills: [
      {
        title: "文化议题策划",
        desc: "传统文化、城市记忆、青年社群与跨文化交流",
        stats: ["核心方向", "持续研究", "内容转译"],
        detail: "可延展为活动主题策划、传播口径、视觉关键词、社媒栏目和线下体验路径。",
      },
      {
        title: "内容与媒介传播",
        desc: "活动、展览、访谈、短视频与社媒内容整合",
        stats: ["内容模块", "媒介类型", "叙事完整度"],
        detail: "适合呈现你参与过的展览、讲座、媒体账号、短视频栏目或校园文化项目。",
      },
      {
        title: "视觉化表达",
        desc: "海报、信息图、页面设计与文化内容可视化",
        stats: ["视觉形式", "项目类型", "传播适配"],
        detail: "以视觉设计转译文化内涵，让传统记忆、地域符号与当代表达在图像中被重新看见。",
      },
    ],
    moreOpen: "收起细节",
    moreClosed: "查看细节",
    designTitle: "设计项目",
    projects: [
      {
        title: "文化机构视觉识别",
        desc: "围绕文化机构的公共形象建立标志、字体、色彩、版式和应用系统。",
      },
      {
        title: "城市文化专题页面",
        desc: "把城市文化议题拆解成可阅读、可浏览、可分享的图文叙事。",
      },
      {
        title: "互动展览导览原型",
        desc: "围绕观众动线、内容层级和触屏交互，构建展览导览的数字原型。",
      },
    ],
    researchTitle: "学术研究",
    researchTabs: ["媒介与文化", "设计研究", "城市叙事"],
    contactTitle: "与我合作",
    contactLead: "期待与志同道合的伙伴一起，创造有意义的文化传播、视觉设计与研究项目。",
    coop: [
      ["文化咨询", "文化议题策划、传播策略与项目定位。"],
      ["项目设计", "品牌视觉、页面体验与内容结构设计。"],
      ["研究分享", "学术讨论、讲座分享与跨领域合作。"],
    ],
    learnMore: "了解更多 →",
    formTitle: "快速联系",
    namePlaceholder: "您的姓名",
    emailPlaceholder: "邮箱地址",
    messagePlaceholder: "留言内容",
    submit: "发送消息 ✈",
    sent: "已生成联系意向。正式上线前可改为真实表单服务。",
    closeAria: "关闭",
  },
  en: {
    nav: ["About", "Culture", "Projects", "Research", "Contact"],
    location: "Jinan, Shandong",
    languageButton: "中",
    orbAria: "Switch hero keyword",
    brandAria: "Back to home",
    heroSubtitle: "Master's student in Art and Design / Digital and Media Major",
    scrollHint: "Move the cursor to explore · Scroll down for more",
    aboutTitle: "About Me",
    aboutText:
      "I focus on how culture is seen, understood, and reorganized. My practice combines communication strategy, visual design, and research methods for exhibitions, branding, media content, public culture projects, and academic writing.",
    profileItems: [
      "<strong>Identity:</strong> Master's student in Art and Design",
      "<strong>Focus:</strong> Cultural Communication / Visual Design / Academic Research",
      "<strong>Location:</strong> Jinan, Shandong",
    ],
    cultureTitle: "Cultural Communication",
    skills: [
      {
        title: "Cultural Topic Planning",
        desc: "Traditional culture, city memory, youth communities, and cross-cultural exchange",
        stats: ["Core Focus", "Ongoing Study", "Content Translation"],
        detail: "This can expand into event themes, communication tone, visual keywords, social media columns, and offline experience paths.",
      },
      {
        title: "Content And Media Communication",
        desc: "Activities, exhibitions, interviews, short videos, and social media content",
        stats: ["Content Modules", "Media Types", "Narrative Integrity"],
        detail: "This section can present exhibitions, lectures, media accounts, short-video columns, or campus cultural projects.",
      },
      {
        title: "Visual Expression",
        desc: "Posters, infographics, page design, and cultural content visualization",
        stats: ["Visual Forms", "Project Types", "Communication Fit"],
        detail:
          "Visual design translates cultural meaning, allowing traditional memory, regional symbols, and contemporary expression to be seen anew through images.",
      },
    ],
    moreOpen: "Hide details",
    moreClosed: "View details",
    designTitle: "Design Projects",
    projects: [
      {
        title: "Visual Identity For Cultural Institutions",
        desc: "A public-facing identity system with logo, typography, color, layout, and applications.",
      },
      {
        title: "Urban Culture Feature Page",
        desc: "An editorial page that turns urban culture topics into readable and shareable stories.",
      },
      {
        title: "Interactive Exhibition Guide Prototype",
        desc: "A digital guide prototype built around visitor flow, content hierarchy, and touchscreen interaction.",
      },
    ],
    researchTitle: "Academic Research",
    researchTabs: ["Media & Culture", "Design Research", "Urban Narrative"],
    contactTitle: "Collaboration",
    contactLead: "I look forward to creating meaningful cultural communication, visual design, and research projects with like-minded partners.",
    coop: [
      ["Cultural Consulting", "Cultural topic planning, communication strategy, and project positioning."],
      ["Project Design", "Brand visuals, page experience, and content structure design."],
      ["Research Sharing", "Academic discussion, lectures, and cross-disciplinary collaboration."],
    ],
    learnMore: "Learn more →",
    formTitle: "Quick Contact",
    namePlaceholder: "Your name",
    emailPlaceholder: "Email address",
    messagePlaceholder: "Message",
    submit: "Send Message ✈",
    sent: "Contact intent generated. This can be connected to a real form service before launch.",
    closeAria: "Close",
  },
};

function applyLanguage(language) {
  const text = copy[language];
  currentLanguage = language;
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  document.querySelector(".brand").setAttribute("aria-label", text.brandAria);
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
  document.querySelector("#culture .section-title h2").textContent = text.cultureTitle;
  skillCards.forEach((card, index) => {
    const skill = text.skills[index];
    card.querySelector("h3").textContent = skill.title;
    card.querySelector("header p").textContent = skill.desc;
    card.querySelectorAll(".skill-stats span").forEach((item, statIndex) => {
      item.textContent = skill.stats[statIndex];
    });
    card.querySelector(".skill-detail").textContent = skill.detail;
    card.querySelector(".skill-more").textContent = card.classList.contains("is-open")
      ? text.moreOpen
      : text.moreClosed;
  });
  document.querySelector("#design .section-title h2").textContent = text.designTitle;
  projectRows.forEach((row, index) => {
    row.querySelector("h3").textContent = text.projects[index].title;
    row.querySelector("p").textContent = text.projects[index].desc;
  });
  document.querySelector("#research .section-title h2").textContent = text.researchTitle;
  researchButtons.forEach((button, index) => {
    button.textContent = text.researchTabs[index];
  });
  const activeTopic = document.querySelector(".research-tabs button.active")?.dataset.topic || "media";
  researchDetail.querySelector("h3").textContent = researchContent[language][activeTopic].title;
  researchDetail.querySelector(".research-body").textContent = researchContent[language][activeTopic].body;
  document.querySelector("#contact .section-title h2").textContent = text.contactTitle;
  document.querySelector(".contact-lead").textContent = text.contactLead;
  document.querySelectorAll(".coop-card").forEach((card, index) => {
    card.querySelector("h3").textContent = text.coop[index][0];
    card.querySelector("p").textContent = text.coop[index][1];
    card.querySelector("a").textContent = text.learnMore;
  });
  document.querySelector(".contact-form h3").textContent = text.formTitle;
  document.querySelector('.contact-form input[type="text"]').placeholder = text.namePlaceholder;
  document.querySelector('.contact-form input[type="text"]').setAttribute("aria-label", text.namePlaceholder);
  document.querySelector('.contact-form input[type="email"]').placeholder = text.emailPlaceholder;
  document.querySelector('.contact-form input[type="email"]').setAttribute("aria-label", text.emailPlaceholder);
  document.querySelector(".contact-form textarea").placeholder = text.messagePlaceholder;
  document.querySelector(".contact-form textarea").setAttribute("aria-label", text.messagePlaceholder);
  document.querySelector(".contact-form button").textContent = text.submit;
  document.querySelector(".dialog-close").setAttribute("aria-label", text.closeAria);
}

function updateScrollProgress() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  scrollProgress.style.setProperty("--scroll", `${progress}%`);
}

window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();

window.addEventListener("pointermove", (event) => {
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

document.querySelectorAll("a, button, input, textarea, .project-row, .skill-card[data-url]").forEach((item) => {
  item.addEventListener("pointerenter", () => cursorRing.classList.add("is-active"));
  item.addEventListener("pointerleave", () => cursorRing.classList.remove("is-active"));
});

heroOrb.addEventListener("click", () => {
  orbIndex = (orbIndex + 1) % orbWords[currentLanguage].length;
  orbText.textContent = orbWords[currentLanguage][orbIndex];
  heroOrb.classList.toggle("is-centered");
});

languageButton.addEventListener("click", () => {
  applyLanguage(currentLanguage === "zh" ? "en" : "zh");
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.18 }
);

revealEls.forEach((el) => revealObserver.observe(el));

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-45% 0px -45% 0px" }
);

sections.forEach((section) => navObserver.observe(section));

skillCards.forEach((card) => {
  const button = card.querySelector(".skill-more");
  function openLinkedSkill() {
    if (!card.dataset.url) return;
    window.location.href = card.dataset.url;
  }

  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = card.classList.toggle("is-open");
    button.textContent = isOpen ? copy[currentLanguage].moreOpen : copy[currentLanguage].moreClosed;
  });

  card.addEventListener("click", (event) => {
    if (event.target.closest(".skill-more")) return;
    openLinkedSkill();
  });

  card.addEventListener("keydown", (event) => {
    if (!["Enter", " "].includes(event.key)) return;
    if (event.target.closest(".skill-more")) return;
    event.preventDefault();
    openLinkedSkill();
  });
});

researchButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const content = researchContent[currentLanguage][button.dataset.topic];
    researchButtons.forEach((item) => item.classList.toggle("active", item === button));
    researchDetail.animate(
      [
        { opacity: 0, transform: "translateY(8px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 240, easing: "ease-out" }
    );
    researchDetail.querySelector("h3").textContent = content.title;
    researchDetail.querySelector(".research-body").textContent = content.body;
  });
});

function renderProjectSubmenu(content) {
  projectSubmenu.innerHTML = "";
  projectSubpanel.innerHTML = "";
  dialog.classList.toggle("has-submenu", Boolean(content.menu));

  if (!content.menu) return;

  function activateItem(item, button) {
    projectSubmenu.querySelectorAll("button").forEach((submenuButton) => {
      submenuButton.classList.toggle("active", submenuButton === button);
    });
    projectSubpanel.innerHTML = `<h3>${item.title}</h3><p>${item.body}</p>`;
    projectSubpanel.animate(
      [
        { opacity: 0, transform: "translateY(6px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 220, easing: "ease-out" }
    );
  }

  content.menu.forEach((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = item.label;
    button.addEventListener("click", () => activateItem(item, button));
    projectSubmenu.append(button);

    if (index === 0) {
      activateItem(item, button);
    }
  });
}

function openProject(row) {
  if (row.dataset.url) {
    window.location.href = row.dataset.url;
    return;
  }

  const content = projectContent[currentLanguage][row.dataset.project];
  dialogKicker.textContent = content.kicker;
  dialogTitle.textContent = content.title;
  dialogBody.textContent = content.body;
  renderProjectSubmenu(content);
  dialog.showModal();
}

projectRows.forEach((row) => {
  row.addEventListener("click", () => openProject(row));
  row.addEventListener("keydown", (event) => {
    if (!["Enter", " "].includes(event.key)) return;
    event.preventDefault();
    openProject(row);
  });
});

document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  toast.textContent = copy[currentLanguage].sent;
  window.setTimeout(() => {
    toast.textContent = "";
  }, 2400);
});

applyLanguage("zh");
