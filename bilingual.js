(() => {
  const storageKey = "lyk-language";
  const storedLanguage = () => {
    try { return localStorage.getItem(storageKey); } catch { return null; }
  };
  const saveLanguage = (language) => {
    try { localStorage.setItem(storageKey, language); } catch { /* File previews can block storage. */ }
  };
  const english = {
    "关于": "About", "关于我": "About", "传播": "Culture", "服务": "Services", "项目": "Projects", "研究": "Research", "合作": "Collaborate",
    "主要导航": "Main navigation", "社交媒体": "Social media", "联系合作": "Collaborate", "回到首页": "Back to home", "返回": "Back", "返回文化传播": "Back to Culture", "返回设计服务": "Back to Design Services", "← 返回设计服务": "← Back to Design Services",
    "山东 济南": "Jinan, Shandong", "广东 深圳": "Shenzhen, Guangdong", "中国，山东省济南市": "Jinan, Shandong, China", "中国，广东省深圳市": "Shenzhen, Guangdong, China", "中国，山东济南": "Jinan, Shandong, China",
    "首页": "Home", "设计服务": "Design Services", "文化传播": "Cultural Communication", "学术研究": "Academic Research", "品牌识别": "Brand Identity", "标志设计": "Logo Design", "视觉延展": "Visual Extension", "数字体验": "Digital Experience",
    "向下阅读": "Scroll to read", "向下阅读 ↓": "Scroll to read ↓", "项目介绍": "Project Overview", "服务内容": "Services", "项目内容": "Project Scope", "项目资料": "Project Materials", "研究资料": "Research Materials", "分享": "Share", "链接已复制": "Link copied", "请复制浏览器地址栏链接": "Please copy the browser URL",
    "项目名称": "Project", "委托方": "Client", "项目地点": "Location", "项目时间": "Year", "项目类型": "Type", "设计范围": "Design Scope", "研究类型": "Research Type", "研究对象": "Research Subject", "研究方法": "Methods", "关键词": "Keywords",
    "项目图片控制": "Project image controls", "上一张图片": "Previous image", "下一张图片": "Next image", "暂停自动播放": "Pause autoplay", "继续自动播放": "Resume autoplay", "项目结语": "Project closing", "下载 VIS 手册": "Download VIS Guide", "下载 VIS 预览手册": "Download VIS Preview", "下载研究 PDF": "Download Research PDF", "下载研究论文 PDF": "Download Research Paper PDF", "下载字体设计 PDF": "Download Typeface PDF", "下载海报": "Download Poster", "观看字体演示": "View typeface demo",
    "山东大学管理学院四十周年标志": "SDU School of Management 40th Anniversary Mark", "帝台春标志": "Ditai Chun Logo", "传承人百科": "Heritage Encyclopedia", "北朝佛传图像故事研究": "Northern Dynasties Buddhist Image Stories", "山东省国外语言学学会": "Shandong Association of Foreign Linguistics", "山东省国外语言学学会品牌设计": "Shandong Association of Foreign Linguistics Brand Design",
    "二十四节气": "The 24 Solar Terms", "文字的时间叙事": "A Typographic Narrative of Time", "城市文字记忆": "Urban Text Memory", "敦煌马圈湾汉简隶书可变字体设计实践研究": "Maquanwan Han-Slip Clerical Script Variable Typeface", "基于西文书写工具的汉字字体创新设计": "Chinese Typeface Innovation with Western Writing Tools",
    "以四十年积淀，": "With four decades of heritage,", "连接学院的当下与未来": "connecting the school's present and future.", "以东方意境为底，": "Rooted in Eastern sensibility,", "呈现温润而现代的品牌识别。": "a refined and contemporary identity.", "以知识为经纬，": "Using knowledge as its framework,", "连接传承人与当代生活。": "connecting heritage bearers with contemporary life.", "从佛传图像出发，": "Beginning with Buddhist imagery,", "重新阅读北朝的视觉叙事。": "re-reading the visual narratives of the Northern Dynasties.", "以文字记录时间，": "Recording time through type,", "以设计重述四季。": "retelling the seasons through design.", "以汉简隶书为起点，": "Starting with Han-slip clerical script,", "重建传统书体的当代表达。": "renewing its expression for today.", "从书写工具出发，": "Starting with writing tools,", "探索魏碑字体的当代表达。": "exploring a contemporary expression of Wei stele type.",
    "为山东大学管理学院四十周年建立一套清晰而有延展性的视觉识别。标志以“40”为核心，将纪念时刻、学院精神与校园场景纳入统一视觉语言，并在空间导视、活动传播与日常触点中持续展开。": "A clear, extensible visual identity was created for the School of Management's 40th anniversary. Centered on the number 40, it brings together the commemorative moment, the school's spirit and campus settings in one visual language for wayfinding, events and everyday touchpoints.",
    "为帝台春建立清晰、克制且富有质感的品牌标志系统。设计以东方审美中的温润、雅致与留白为线索，将中文标志、拉丁文字与空间应用统一为具有识别度的视觉语言，并延展至门店、包装、会员体系与日常传播触点。": "A clear, restrained and tactile identity system was created for Ditai Chun. Guided by Eastern warmth, elegance and negative space, it brings the Chinese mark, Latin letterforms and spatial applications into one distinctive language that extends to stores, packaging, membership and daily communications.",
    "为传承人百科建立具有文化温度的品牌识别系统。设计从“百科”所代表的整理、记录与分享出发，以清晰的标志结构统合内容平台、人物档案与视觉传播，让传统技艺与当代公众之间形成更易理解和持续生长的连接。": "A culturally warm identity system was created for Heritage Encyclopedia. Starting from the ideas of organizing, documenting and sharing, a clear mark unifies the content platform, practitioner archives and visual communication, making traditional craft more accessible to contemporary audiences.",
    "围绕北朝佛传图像展开图像采集、叙事梳理与视觉转译研究。项目以历史图像中的人物、场景与符号为线索，建立可阅读的故事结构，并通过版式、色彩与当代视觉语言，使石刻与壁画中的文化信息重新进入公众视野。": "This research collects, structures and visually translates Buddhist image stories from the Northern Dynasties. Characters, scenes and symbols in historical images form a readable narrative, while layout, colour and contemporary visual language bring the cultural information in carvings and murals back into public view.",
    "二十四节气不仅是一套时间划分方式，也是中国人观察自然、感知季节与组织生活的文化经验。本系列以汉字为主要视觉媒介，从节气名称本身出发，通过字形、笔画、结构、尺度与版式关系的重新组织，将气候变化、物候特征与传统文化意象转译为当代视觉语言。": "The 24 Solar Terms are both a way of measuring time and a cultural way of observing nature, sensing seasons and organising life. Using Chinese characters as its main visual medium, this series reorganises glyph form, strokes, structure, scale and layout to translate climate, seasonal phenomena and traditional imagery into a contemporary language.",
    "山东省国外语言学学会成立于1995年，是连接山东省外国语言学研究、教育实践与学术交流的重要平台。学会立足齐鲁、面向全国、连接世界，长期致力于推动国外语言学研究与外语教育发展，汇聚省内外高校专家学者，促进学术交流、跨学科合作与青年人才成长。": "Founded in 1995, the Shandong Association of Foreign Linguistics is an important platform for research, educational practice and academic exchange. Rooted in Shandong and connected to the world, it brings together scholars from universities across and beyond the province, advancing research, collaboration and emerging talent.",
    "面向数字化、智能化与全球化发展的新阶段，学会积极关注人工智能、语言教育、翻译传播、区域国别研究、数字人文及语言与社会等前沿领域，不断拓展国外语言学研究的边界，推动语言研究服务教育发展、文化交流与社会需求。": "In a new era of digitalisation, intelligence and globalisation, the association engages with AI, language education, translation and communication, area studies, digital humanities, and language in society. It extends the boundaries of foreign linguistics and helps research serve education, cultural exchange and social needs.",
    "视觉识别系统 · 山东 济南": "Visual Identity System · Jinan, Shandong", "山东省国外语言学学会视觉识别系统": "Shandong Association of Foreign Linguistics Visual Identity System", "标志设计、视觉识别、品牌传播与数字应用": "Logo design, visual identity, brand communication and digital applications", "以“学术组织、齐鲁根基、国际视野、语言研究、跨学科创新”为设计线索，将学会的精神凝练为可识别、可传播、可延展的视觉语言。": "Guided by academic organisation, Shandong roots, global vision, language research and cross-disciplinary innovation, the system distils the association's spirit into a recognisable, communicable and extensible visual language.",
    "立足齐鲁 · 面向世界 · 聚焦语言 · 服务学术 · 促进交流 · 推动创新": "Rooted in Shandong · Engaging the world · Focused on language · Serving scholarship · Enabling dialogue · Advancing innovation", "以山、地球、对话弧线、书本与水纹构建标志，让齐鲁文化与全球视野在同一视觉体系中相遇。": "The mark combines mountains, a globe, dialogue arcs, an open book and ripples to bring Shandong culture and global vision together in one system.",
    "立足齐鲁，向学术高峰不断攀登。": "Rooted in Shandong, climbing toward new academic heights.", "以全球视野观察语言，以开放姿态连接世界。": "Observing language with a global outlook and connecting to the world with openness.", "让语言成为思想交流与文明互鉴的桥梁。": "Making language a bridge for the exchange of ideas and mutual learning among civilisations.", "汇聚知识、传播思想、培育新生学术力量。": "Gathering knowledge, sharing ideas and nurturing emerging scholars.", "思想因交流而流动，知识因传播而抵达更远。": "Ideas flow through dialogue; knowledge reaches farther through communication.",
    "探索语言规律，理解语言与人、社会和世界的关系。": "Exploring language patterns and its relationship with people, society and the world.", "搭建跨院校、跨学科、跨文化的学术交流平台。": "Building a platform for academic exchange across institutions, disciplines and cultures.", "面向人工智能与数字文明，拓展语言研究新范式。": "Exploring new linguistic research paradigms for AI and digital civilisation.", "连接学者、知识、文化与世界。": "Connecting scholars, knowledge, culture and the world.",
    "以统一的视觉识别连接空间、传播与日常触点，让每一次相遇都成为学术交流的开始。": "A unified identity connects spaces, communication and everyday touchpoints, making every encounter the beginning of academic exchange.", "从桌面到移动端，延续清晰、开放的品牌识别，连接学术信息、研究资源与交流场景。": "From desktop to mobile, the clear and open identity connects academic information, research resources and occasions for exchange.", "汇聚思想，连接学术。在语言研究的不同领域之间建立连接，在不同学科之间展开对话，在理论探索与社会实践之间寻找新的可能。": "Gathering ideas and connecting scholarship. Creating links between linguistic fields, dialogue among disciplines, and new possibilities between theory and social practice.", "语言不仅是沟通的工具，更是理解世界的方式。以语言连接文化，以研究深化理解，以开放的学术视野促进交流互鉴。": "Language is more than a tool for communication; it is a way of understanding the world. It connects cultures, deepens understanding through research, and enables exchange through an open academic outlook.", "让新的声音被听见，让新的思想不断生长。汇聚青年学术力量，拓展语言研究边界，共同探索语言学的未来。": "Let new voices be heard and new ideas grow. Bringing together emerging scholars to extend the boundaries of language research and explore its future.",
    "立足齐鲁，": "Rooted in Shandong,", "面向世界。": "engaging the world.", "以语言连接思想，": "Connecting ideas through language,", "以学术沟通世界。": "communicating with the world through scholarship.", "汇聚语言智慧，连接全球学术": "Gathering linguistic insight, connecting global scholarship", "语言无界，学术共融": "Language without borders, scholarship in dialogue", "从学术现场，走向日常交流": "From academic settings to everyday exchange", "以语言为桥，与世界对话": "Using language as a bridge to the world", "三十年，": "Thirty years", "与语言同行。": "alongside language.", "一种持续生长的学术连接": "An enduring academic connection", "语言连接世界，": "Language connects the world,", "学术成就未来。": "scholarship shapes the future.",
    "品牌识别": "Brand Identity", "VIS设计": "VIS Design", "视觉延展": "Visual Extension", "品牌使命": "Brand Mission", "品牌愿景": "Brand Vision", "开放 · 交流 · 创新 · 共融": "Openness · Dialogue · Innovation · Inclusion", "语言": "Language", "交流": "Dialogue", "创新": "Innovation", "连接": "Connection", "山": "Mountain", "地球": "Globe", "对话弧线": "Dialogue Arcs", "书本": "Book", "水纹": "Ripples",
    "城市专题": "City Feature", "专题策划": "Feature Planning", "叙事页面": "Narrative Page", "媒介延展": "Media Extension", "城市文字样本": "Urban Text Samples", "专题章节": "Feature Chapters", "延展媒介": "Extended Media", "城市入口": "City Entry", "内容可视化": "Content Visualisation", "视觉化表达": "Visual Expression", "海报": "Poster", "信息图": "Infographic", "动态设计": "Motion Design", "全部": "All", "分类筛选": "Filter", "按城市浏览": "Browse by city", "当前筛选条件下暂无档案，请选择其他类别或城市。": "No records match these filters. Please choose another category or city.",
    "把城市文化议题组织成一条可阅读、可浏览、可延展传播的视觉叙事链路。": "Organising urban cultural themes into a visual narrative that can be read, explored and extended across media.", "把城市线索拆成章节，让每一次滚动都像翻开一份现场档案。": "Dividing city clues into chapters so each scroll feels like opening a field archive.", "一页专题，不止是一页。": "A feature page can be more than a page.", "把实时影像拆成会呼吸的字符颗粒。所有处理都在当前浏览器中完成。": "Transform live imagery into breathing particles of type. All processing happens in this browser.", "图像来源": "Image Source", "开启摄像头": "Start Camera", "上传图片": "Upload Image", "定格当前画面": "Capture Frame", "当前使用示例图像": "Using a sample image", "颗粒样式": "Particle Style", "颗粒大小": "Particle Size", "颗粒颜色": "Particle Colour", "输出设置": "Output Settings", "画布尺寸": "Canvas Size", "文件格式": "File Format", "自定义尺寸": "Custom Size", "宽度": "Width", "高度": "Height", "导出海报": "Export Poster", "移动鼠标，让字符场产生偏移": "Move the pointer to shift the field of characters.", "摄像头画面不会上传服务器，只用于本地实时绘制与导出。": "Camera frames are never uploaded; they are used only for local rendering and export.", "跳到主要内容": "Skip to main content", "跳到海报预览": "Skip to poster preview",
    "社交海报 · 1080 × 1350": "Social Poster · 1080 × 1350", "方形卡片 · 1080 × 1080": "Square Card · 1080 × 1080", "横向屏幕 · 1920 × 1080": "Landscape Screen · 1920 × 1080", "A4 打印 · 2480 × 3508": "A4 Print · 2480 × 3508", "石墨黑": "Graphite Black", "雾紫": "Misty Violet", "朱橙": "Vermilion Orange", "荧光绿": "Fluorescent Green", "自定义颜色": "Custom Colour",
    "首页 / 设计服务 / 品牌识别": "Home / Design Services / Brand Identity", "首页 / 设计服务 / 视觉研究": "Home / Design Services / Visual Research", "首页 / 文化传播 / 海报设计": "Home / Cultural Communication / Poster Design", "首页 / 学术研究 / 可变字体": "Home / Academic Research / Variable Typeface", "首页 / 学术研究 / 魏碑字体": "Home / Academic Research / Wei Stele Typeface", "项目标签与分享": "Project tags and sharing", "分享到 Facebook": "Share on Facebook", "分享到 X": "Share on X", "分享到 Instagram": "Share on Instagram", "分享到 WeChat": "Share on WeChat",
    "山东大学管理学院": "Shandong University School of Management", "品牌策略、周年标志、视觉系统、空间与传播应用": "Brand strategy, anniversary mark, visual system, spatial and communication applications", "在校园场景中持续生长": "Growing across campus settings", "标志以紫色渐变为线索，从入口装置延展至灯旗、活动背景与校园日常。": "A purple gradient carries the mark from entrance installations to flags, event backdrops and campus life.", "校园入口与灯旗系统": "Campus entrance and flag system", "周年标志与空间装置": "Anniversary mark and spatial installation", "学院入口主视觉": "School entrance key visual", "品牌视觉延展": "Brand visual extension", "活动场景应用": "Event applications", "让纪念成为": "Making commemoration", "面向未来的视觉起点。": "a visual starting point for the future.",
    "品牌策略、标志设计、空间与包装视觉应用": "Brand strategy, logo design, spatial and packaging applications", "珠宝品牌视觉识别": "Jewellery Brand Identity", "让标志在每一处触点中被看见": "Making the mark visible at every touchpoint", "从品牌门店到产品包装、会员物料与空间陈列，建立统一而从容的品牌体验。": "From stores and product packaging to membership materials and spatial displays, the system creates a unified and composed brand experience.", "门店品牌标志": "Storefront brand mark", "空间识别应用": "Spatial identity application", "包装视觉系统": "Packaging visual system", "品牌印刷物料": "Brand print materials", "礼盒与会员体系": "Gift boxes and membership system", "品牌空间细节": "Brand space details", "城市门店形象": "Urban storefront identity", "产品陈列应用": "Product display application", "视觉延展系统": "Visual extension system", "品牌体验场景": "Brand experience setting", "让东方美学成为": "Making Eastern aesthetics", "品牌日常的一部分。": "part of the brand's everyday life.",
    "品牌策略、标志设计、内容平台与视觉传播应用": "Brand strategy, logo design, content platform and visual communication applications", "让每一种技艺都拥有": "Giving every craft", "被理解与传承的入口。": "a way to be understood and passed on.", "让沉静的图像成为": "Making quiet images", "可阅读的故事": "readable stories", "让历史图像成为可阅读的故事": "Making historical images into readable stories", "图像研究、视觉叙事、版式设计与传播应用": "Image research, visual narrative, editorial design and communication applications"
  };

  const attributes = ["alt", "aria-label", "title", "placeholder"];
  const nodes = [];
  const originals = new WeakMap();
  const attributeOriginals = new WeakMap();

  function capture() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue.trim() || node.parentElement?.closest("script, style")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    while (walker.nextNode()) {
      const node = walker.currentNode;
      nodes.push(node);
      originals.set(node, node.nodeValue);
    }
    document.querySelectorAll("*").forEach((element) => {
      const values = {};
      attributes.forEach((name) => {
        if (element.hasAttribute(name)) values[name] = element.getAttribute(name);
      });
      if (Object.keys(values).length) attributeOriginals.set(element, values);
    });
  }

  function translate(value) {
    const leading = value.match(/^\s*/)?.[0] || "";
    const trailing = value.match(/\s*$/)?.[0] || "";
    const core = value.trim();
    return Object.hasOwn(english, core) ? `${leading}${english[core]}${trailing}` : value;
  }

  function apply(language) {
    nodes.forEach((node) => {
      const original = originals.get(node);
      node.nodeValue = language === "en" ? translate(original) : original;
    });
    document.querySelectorAll("*").forEach((element) => {
      const values = attributeOriginals.get(element);
      if (!values) return;
      Object.entries(values).forEach(([name, value]) => element.setAttribute(name, language === "en" ? translate(value) : value));
    });
    const title = document.documentElement.dataset.titleZh;
    if (!title) document.documentElement.dataset.titleZh = document.title;
    document.documentElement.lang = language === "en" ? "en" : "zh-CN";
    document.documentElement.classList.toggle("is-english", language === "en");
    const toggle = document.querySelector(".bilingual-toggle");
    if (toggle) {
      toggle.textContent = language === "en" ? "中" : "EN";
      toggle.setAttribute("aria-label", language === "en" ? "切换至中文" : "Switch to English");
    }
    document.dispatchEvent(new CustomEvent("site-language-change", { detail: { language } }));
  }

  function createToggle() {
    const current = document.querySelector("button.language-button");
    if (current) {
      current.classList.add("bilingual-toggle");
      return current;
    }
    const toggle = document.createElement("button");
    toggle.className = "language-button bilingual-toggle";
    toggle.type = "button";
    const host = document.querySelector(".header-meta, .project-header-side, .studio-brand") || document.body;
    host.append(toggle);
    return toggle;
  }

  const style = document.createElement("style");
  style.textContent = `
    .bilingual-toggle { white-space: nowrap; }
    .studio-brand .bilingual-toggle { margin-left: auto; min-width: 2.8rem; min-height: 2.2rem; border: 1px solid currentColor; border-radius: 999px; background: transparent; color: inherit; font: inherit; font-size: .72rem; font-weight: 800; cursor: pointer; }
    .header-meta > .bilingual-toggle:not(:only-child) { margin-left: .55rem; }
  `;
  document.head.append(style);

  capture();
  const toggle = createToggle();
  let language = storedLanguage() === "en" ? "en" : "zh";
  apply(language);
  toggle.addEventListener("click", () => {
    language = language === "zh" ? "en" : "zh";
    saveLanguage(language);
    apply(language);
  });
})();
