// =============================================
// Grokking Algorithms – Interactive Explorer
// Main Application Controller
// =============================================

(function () {
  "use strict";

  // ---- State ----
  let currentView = "dashboard"; // "dashboard" | "workspace" | "mindmap"
  let activeChapter = null;
  let activeWorkspaceTab = "simulator"; // "simulator" | "code" | "quiz"
  let codeLang = "python";
  let searchTerm = "";
  
  // Language state (retrieve from local storage or default to Vietnamese)
  let currentLang = localStorage.getItem("grokking_lang") || "vi";
  let GrokkingData = currentLang === "vi" ? GrokkingDataVI : GrokkingDataEN;

  // ---- Translation Helper ----
  function t(key, replacements) {
    let str = "";
    if (GrokkingTranslations[currentLang] && GrokkingTranslations[currentLang][key]) {
      str = GrokkingTranslations[currentLang][key];
    } else if (GrokkingTranslations["vi"] && GrokkingTranslations["vi"][key]) {
      str = GrokkingTranslations["vi"][key];
    } else {
      return key;
    }
    
    if (replacements) {
      for (const k in replacements) {
        str = str.replace(new RegExp(`{${k}}`, "g"), replacements[k]);
      }
    }
    return str;
  }

  // ---- Helpers ----
  function $(sel, ctx) {
    return (ctx || document).querySelector(sel);
  }
  function $$(sel, ctx) {
    return Array.from((ctx || document).querySelectorAll(sel));
  }

  // ---- Rendering helpers ----
  function setView(view) {
    currentView = view;
    const dash = $(".dashboard-view");
    const work = $(".workspace-view");
    const mind = $(".mindmap-view");

    dash.style.display = view === "dashboard" ? "grid" : "none";
    work.style.display = view === "workspace" ? "grid" : "none";
    mind.style.display = view === "mindmap" ? "block" : "none";

    $$(".nav-tab").forEach((t) => t.classList.remove("active"));
    if (view === "dashboard") $('[data-view="dashboard"]').classList.add("active");
    if (view === "mindmap") $('[data-view="mindmap"]').classList.add("active");
  }

  // ---- Dashboard ----
  function renderDashboard(filter) {
    const container = $(".dashboard-view");
    container.innerHTML = "";

    const term = (filter || "").toLowerCase();
    const filtered = GrokkingData.filter((ch) => {
      if (!term) return true;
      const haystack = (
        ch.title +
        " " +
        ch.subtitle +
        " " +
        ch.concepts.map((c) => c.name + " " + c.points.join(" ")).join(" ")
      ).toLowerCase();
      return haystack.includes(term);
    });

    if (filtered.length === 0) {
      container.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 20px;">
        <div style="font-size:40px;margin-bottom:12px;">🔍</div>
        <h3 style="color:var(--text-muted);font-weight:500;">${t("noResults")} "<em>${term}</em>"</h3>
        <p style="color:#475569;margin-top:6px;font-size:14px;">${t("searchTip")}</p>
      </div>`;
      return;
    }

    filtered.forEach((ch) => {
      const card = document.createElement("div");
      card.className = "chapter-card";
      card.style.setProperty("--accent-color", ch.color);
      card.style.setProperty("--shadow-glow", ch.shadow);

      const conceptCount = ch.concepts.length;
      // Grab a clean subtitle (first 75 chars)
      const shortDesc =
        ch.subtitle.length > 75 ? ch.subtitle.slice(0, 75) + "…" : ch.subtitle;

      card.innerHTML = `
        <div>
          <span class="chapter-num">Chapter ${ch.id}</span>
          <div class="chapter-title">${ch.title.replace(/^Chapter \d+:\s*/, "")}</div>
          <div class="chapter-desc">${shortDesc}</div>
        </div>
        <div class="chapter-card-footer">
          <span style="color:var(--text-muted);font-size:11px;">${conceptCount} ${t("conceptCount")} • ${(ch.quizzes || []).length} ${t("quizCount")}</span>
        </div>
      `;

      card.addEventListener("click", () => openChapter(ch.id));
      container.appendChild(card);
    });
  }

  // ---- Chapter Detail (Workspace) ----
  function openChapter(id) {
    const ch = GrokkingData.find((c) => c.id === id);
    if (!ch) return;
    activeChapter = ch;
    activeWorkspaceTab = "simulator";
    codeLang = "python";

    // Apply chapter accent color to workspace
    const workRoot = $(".workspace-view");
    workRoot.style.setProperty("--chapter-accent", ch.color);
    workRoot.style.setProperty("--shadow-glow", ch.shadow);

    // ---- Side Panel ----
    renderSidePanel(ch);

    // ---- Main workspace tabs ----
    renderWorkspaceTabs(ch);

    setView("workspace");
  }

  function renderSidePanel(ch) {
    const panel = $(".side-panel");

    let conceptsHTML = ch.concepts
      .map(
        (c) => `
      <div class="concept-block">
        <div class="concept-title">📌 ${c.name}</div>
        <ul class="concept-points">
          ${c.points.map((p) => `<li>${p}</li>`).join("")}
        </ul>
      </div>
    `
      )
      .join("");

    panel.innerHTML = `
      <button class="back-btn" id="btn-back">${t("backToDashboard")}</button>

      <div class="side-header">
        <span class="chapter-num" style="color:${ch.color};">Chapter ${ch.id}</span>
        <h2>${ch.title.replace(/^Chapter \d+:\s*/, "")}</h2>
        <p>${ch.subtitle}</p>
      </div>

      <div class="learn-content" style="overflow-y:auto; max-height: 480px; padding-right: 6px;">
        ${conceptsHTML}
      </div>
    `;

    $("#btn-back").addEventListener("click", () => {
      setView("dashboard");
    });
  }

  function renderWorkspaceTabs(ch) {
    const main = $(".main-workspace");

    // Check if a simulator exists for this chapter
    const hasSimulator = !!window.GrokkingSimulators[ch.id];

    main.innerHTML = `
      <div class="workspace-tabs">
        ${
          hasSimulator
            ? `<button class="workspace-tab active" data-wtab="simulator">${t("tabSimulator")}</button>`
            : ""
        }
        <button class="workspace-tab ${!hasSimulator ? "active" : ""}" data-wtab="code">${t("tabCode")}</button>
        <button class="workspace-tab" data-wtab="quiz">${t("tabQuiz")}</button>
      </div>

      ${
        hasSimulator
          ? '<div class="tab-panel active" id="panel-simulator"></div>'
          : ""
      }
      <div class="tab-panel ${!hasSimulator ? "active" : ""}" id="panel-code"></div>
      <div class="tab-panel" id="panel-quiz"></div>
    `;

    // Wire tab buttons
    $$(".workspace-tab", main).forEach((btn) => {
      btn.addEventListener("click", () => {
        $$(".workspace-tab", main).forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        $$(".tab-panel", main).forEach((p) => p.classList.remove("active"));
        const target = btn.getAttribute("data-wtab");
        $(`#panel-${target}`).classList.add("active");
      });
    });

    // Populate panels
    if (hasSimulator) {
      window.GrokkingSimulators[ch.id].init($("#panel-simulator"));
    }
    renderCodePanel(ch);
    renderQuizPanel(ch);
  }

  // ---- Code Panel ----
  function renderCodePanel(ch) {
    const panel = $("#panel-code");
    if (!ch.code) {
      panel.innerHTML =
        `<p style="color:var(--text-muted);text-align:center;padding:40px;">${t("noCode")}</p>`;
      return;
    }

    function render(lang) {
      const source = ch.code[lang] || "";
      panel.innerHTML = `
        <div class="code-panel-wrapper">
          <div class="code-header">
            <h4 style="font-size:16px;">${t("tabCode")} – Chapter ${ch.id}</h4>
            <div class="lang-selector">
              <button class="lang-btn ${lang === "python" ? "active" : ""}" data-lang="python">Python</button>
              <button class="lang-btn ${lang === "javascript" ? "active" : ""}" data-lang="javascript">JavaScript</button>
            </div>
          </div>
          <pre><code>${escapeHTML(source)}</code></pre>
        </div>
      `;

      $$(".lang-btn", panel).forEach((btn) => {
        btn.addEventListener("click", () => {
          codeLang = btn.getAttribute("data-lang");
          render(codeLang);
        });
      });
    }

    render(codeLang);
  }

  function escapeHTML(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // ---- Quiz Panel ----
  function renderQuizPanel(ch) {
    const panel = $("#panel-quiz");
    const quizzes = ch.quizzes || [];
    if (quizzes.length === 0) {
      panel.innerHTML =
        `<p style="color:var(--text-muted);text-align:center;padding:40px;">${t("noQuiz")}</p>`;
      return;
    }

    let html = '<div class="quiz-panel-wrapper">';
    quizzes.forEach((q, qi) => {
      html += `
        <div class="quiz-card" id="quiz-${qi}">
          <div class="quiz-question">${t("questionPrefix")} ${qi + 1}: ${q.question}</div>
          <div class="quiz-options">
            ${q.options
              .map(
                (opt, oi) =>
                  `<button class="quiz-opt" data-qi="${qi}" data-oi="${oi}">${opt}</button>`
              )
              .join("")}
          </div>
          <div class="quiz-feedback" id="quiz-fb-${qi}"></div>
        </div>
      `;
    });
    html += "</div>";
    panel.innerHTML = html;

    // Wire quiz buttons
    $$(".quiz-opt", panel).forEach((btn) => {
      btn.addEventListener("click", () => {
        const qi = parseInt(btn.getAttribute("data-qi"));
        const oi = parseInt(btn.getAttribute("data-oi"));
        const q = quizzes[qi];
        const feedback = $(`#quiz-fb-${qi}`);

        // Disable all options in this quiz
        $$(`[data-qi="${qi}"]`, panel).forEach((b) => {
          b.style.pointerEvents = "none";
          if (parseInt(b.getAttribute("data-oi")) === q.answer) {
            b.classList.add("correct");
          }
        });

        if (oi === q.answer) {
          feedback.innerHTML =
            `<span style="color:#10b981;">${t("quizFeedbackCorrect")}</span>`;
        } else {
          btn.classList.add("incorrect");
          feedback.innerHTML = `<span style="color:#ef4444;">${t("quizFeedbackIncorrect")}: "${q.options[q.answer]}".</span>`;
        }
      });
    });
  }

  // ---- Mind Map View ----
  let mapState = {
    zoom: 1,
    panX: 0,
    panY: 0,
    isPanning: false,
    startX: 0,
    startY: 0,
    expandedChapterId: null
  };

  function renderMindMap() {
    const container = $(".mindmap-view");

    // Reset map state
    mapState.zoom = 1;
    mapState.panX = 0;
    mapState.panY = 0;
    mapState.expandedChapterId = null;

    container.innerHTML = `
      <div class="mindmap-header">
        <div style="display:flex; align-items:center; gap:15px; flex-wrap:wrap;">
          <h3>${t("mindmapTitle")}</h3>
          <button class="back-btn" id="btn-back-map">${t("backToDashboardMap")}</button>
        </div>
        <div class="mindmap-zoom-controls">
          <button class="zoom-btn" id="zoom-out" title="${t("zoomOut")}">−</button>
          <span class="zoom-label" id="zoom-label">100%</span>
          <button class="zoom-btn" id="zoom-in" title="${t("zoomIn")}">+</button>
          <button class="zoom-btn" id="zoom-reset" title="${t("zoomReset")}" style="font-size:12px;">⟳</button>
        </div>
      </div>
      <div class="mindmap-svg-container" id="mindmap-container">
        <div class="mindmap-overlay-tip">${t("mindmapTip")}</div>
        <svg id="mindmap-svg" width="2400" height="1600"></svg>
      </div>
    `;

    // Remove any lingering popup
    const oldPopup = $(".mindmap-detail-popup");
    if (oldPopup) oldPopup.remove();

    $("#btn-back-map").addEventListener("click", () => setView("dashboard"));

    drawMindMap();
    initMapInteractions();
  }

  function initMapInteractions() {
    const container = $("#mindmap-container");

    // ---- Pan ----
    container.addEventListener("mousedown", (e) => {
      // Ignore if clicking on a node or popup
      if (e.target.closest(".map-node") || e.target.closest(".mindmap-detail-popup")) return;
      mapState.isPanning = true;
      mapState.startX = e.clientX - mapState.panX;
      mapState.startY = e.clientY - mapState.panY;
      container.classList.add("grabbing");
    });

    window.addEventListener("mousemove", (e) => {
      if (!mapState.isPanning) return;
      mapState.panX = e.clientX - mapState.startX;
      mapState.panY = e.clientY - mapState.startY;
      applyTransform();
    });

    window.addEventListener("mouseup", () => {
      mapState.isPanning = false;
      container.classList.remove("grabbing");
    });

    // ---- Zoom (scroll wheel) ----
    container.addEventListener("wheel", (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.08 : 0.08;
      setZoom(mapState.zoom + delta);
    }, { passive: false });

    // ---- Zoom buttons ----
    $("#zoom-in").addEventListener("click", () => setZoom(mapState.zoom + 0.15));
    $("#zoom-out").addEventListener("click", () => setZoom(mapState.zoom - 0.15));
    function centerMap() {
      const r = container.getBoundingClientRect();
      mapState.panX = (r.width - 2400) / 2;
      mapState.panY = (r.height - 1600) / 2;
      applyTransform();
    }

    $("#zoom-reset").addEventListener("click", () => {
      mapState.zoom = 1;
      centerMap();
      updateZoomLabel();
    });

    // Center the view initially — defer so the container has layout
    requestAnimationFrame(() => centerMap());
  }

  function setZoom(z) {
    mapState.zoom = Math.max(0.3, Math.min(3, z));
    applyTransform();
    updateZoomLabel();
  }

  function applyTransform() {
    const svg = $("#mindmap-svg");
    if (!svg) return;
    svg.style.transform = `translate(${mapState.panX}px, ${mapState.panY}px) scale(${mapState.zoom})`;
    svg.style.transformOrigin = "0 0";
  }

  function updateZoomLabel() {
    const label = $("#zoom-label");
    if (label) label.textContent = Math.round(mapState.zoom * 100) + "%";
  }

  // ---- Drawing the full Mind Map ----
  function drawMindMap() {
    const svg = $("#mindmap-svg");
    svg.innerHTML = "";

    const cx = 1200; // center X of 2400
    const cy = 800;  // center Y of 1600
    const radius = 380;

    // ---- Central Node ----
    const centerG = createSVGElement("g");
    const centerGlow = createSVGElement("circle");
    centerGlow.setAttribute("cx", cx);
    centerGlow.setAttribute("cy", cy);
    centerGlow.setAttribute("r", 80);
    centerGlow.setAttribute("fill", "none");
    centerGlow.setAttribute("stroke", "rgba(59, 130, 246, 0.15)");
    centerGlow.setAttribute("stroke-width", "20");
    svg.appendChild(centerGlow);

    const centerCircle = createSVGElement("circle");
    centerCircle.setAttribute("cx", cx);
    centerCircle.setAttribute("cy", cy);
    centerCircle.setAttribute("r", 65);
    centerCircle.setAttribute("fill", "#111827");
    centerCircle.setAttribute("stroke", "#3b82f6");
    centerCircle.setAttribute("stroke-width", "3");
    centerG.appendChild(centerCircle);

    const cText1 = createSVGElement("text");
    cText1.setAttribute("x", cx);
    cText1.setAttribute("y", cy - 10);
    cText1.setAttribute("text-anchor", "middle");
    cText1.setAttribute("fill", "#fff");
    cText1.setAttribute("font-size", "18");
    cText1.setAttribute("font-weight", "800");
    cText1.setAttribute("font-family", "Outfit, sans-serif");
    cText1.textContent = "Grokking";
    centerG.appendChild(cText1);

    const cText2 = createSVGElement("text");
    cText2.setAttribute("x", cx);
    cText2.setAttribute("y", cy + 14);
    cText2.setAttribute("text-anchor", "middle");
    cText2.setAttribute("fill", "#60a5fa");
    cText2.setAttribute("font-size", "15");
    cText2.setAttribute("font-weight", "600");
    cText2.setAttribute("font-family", "Outfit, sans-serif");
    cText2.textContent = "Algorithms";
    centerG.appendChild(cText2);

    svg.appendChild(centerG);

    // ---- Chapter Nodes ----
    const total = GrokkingData.length;
    const chapterPositions = [];

    GrokkingData.forEach((ch, i) => {
      const angle = (2 * Math.PI * i) / total - Math.PI / 2;
      const nx = cx + radius * Math.cos(angle);
      const ny = cy + radius * Math.sin(angle);
      chapterPositions.push({ id: ch.id, x: nx, y: ny, angle });

      // ---- Edge line (curved) ----
      const path = createSVGElement("path");
      const cpx = cx + (nx - cx) * 0.5 + Math.sin(angle) * 40;
      const cpy = cy + (ny - cy) * 0.5 - Math.cos(angle) * 40;
      path.setAttribute("d", `M ${cx} ${cy} Q ${cpx} ${cpy} ${nx} ${ny}`);
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", ch.color);
      path.setAttribute("stroke-width", "2");
      path.setAttribute("stroke-opacity", "0.3");
      svg.appendChild(path);

      // ---- Chapter node group ----
      const g = createSVGElement("g");
      g.setAttribute("class", "map-node");
      g.setAttribute("data-chapter-id", ch.id);

      // Node glow ring
      const glowRing = createSVGElement("circle");
      glowRing.setAttribute("cx", nx);
      glowRing.setAttribute("cy", ny);
      glowRing.setAttribute("r", 44);
      glowRing.setAttribute("fill", "none");
      glowRing.setAttribute("stroke", ch.color);
      glowRing.setAttribute("stroke-width", "1");
      glowRing.setAttribute("stroke-opacity", "0.15");
      g.appendChild(glowRing);

      const circle = createSVGElement("circle");
      circle.setAttribute("cx", nx);
      circle.setAttribute("cy", ny);
      circle.setAttribute("r", 38);
      circle.setAttribute("fill", "#111827");
      circle.setAttribute("stroke", ch.color);
      circle.setAttribute("stroke-width", "2.5");
      g.appendChild(circle);

      // Chapter number text
      const numTxt = createSVGElement("text");
      numTxt.setAttribute("x", nx);
      numTxt.setAttribute("y", ny - 7);
      numTxt.setAttribute("text-anchor", "middle");
      numTxt.setAttribute("fill", ch.color);
      numTxt.setAttribute("font-size", "12");
      numTxt.setAttribute("font-weight", "800");
      numTxt.setAttribute("font-family", "Outfit, sans-serif");
      numTxt.textContent = `CH ${ch.id}`;
      g.appendChild(numTxt);

      // Short title
      const shortTitle = ch.title.replace(/^Chapter \d+:\s*/, "").split(" ").slice(0, 2).join(" ");
      const labelTxt = createSVGElement("text");
      labelTxt.setAttribute("x", nx);
      labelTxt.setAttribute("y", ny + 10);
      labelTxt.setAttribute("text-anchor", "middle");
      labelTxt.setAttribute("fill", "#cbd5e1");
      labelTxt.setAttribute("font-size", "10");
      labelTxt.setAttribute("font-weight", "500");
      labelTxt.setAttribute("font-family", "Outfit, sans-serif");
      labelTxt.textContent = shortTitle;
      g.appendChild(labelTxt);

      // ---- Click handler: show HTML popup directly, no SVG sub-branches ----
      g.addEventListener("click", (e) => {
        e.stopPropagation();
        expandChapter(ch, nx, ny, angle);
      });

      svg.appendChild(g);
    });

    // Store positions for reference
    svg._chapterPositions = chapterPositions;
  }

  function expandChapter(ch, nx, ny, angle) {
    const container = $("#mindmap-container");

    // Remove old popup
    const oldPopup = container.querySelector(".mindmap-detail-popup");
    if (oldPopup) oldPopup.remove();

    // If clicking the same chapter, collapse
    if (mapState.expandedChapterId === ch.id) {
      mapState.expandedChapterId = null;
      return;
    }
    mapState.expandedChapterId = ch.id;

    // ---- Show HTML Detail Popup ----
    const popup = document.createElement("div");
    popup.className = "mindmap-detail-popup";
    popup.style.setProperty("--popup-accent", ch.color);

    // Position popup near the node (accounting for pan/zoom)
    const containerRect = container.getBoundingClientRect();
    let popupLeft = (nx * mapState.zoom) + mapState.panX + 50;
    let popupTop = (ny * mapState.zoom) + mapState.panY - 100;

    // Keep popup inside container
    if (popupLeft + 400 > containerRect.width) {
      popupLeft = (nx * mapState.zoom) + mapState.panX - 430;
    }
    if (popupTop < 10) popupTop = 10;
    if (popupTop + 460 > containerRect.height) popupTop = containerRect.height - 470;

    popup.style.left = popupLeft + "px";
    popup.style.top = popupTop + "px";

    let conceptsHTML = ch.concepts.map(c => `
      <div class="popup-concept-item">
        <div class="popup-concept-name">📌 ${c.name}</div>
      </div>
    `).join("");

    popup.innerHTML = `
      <button class="popup-close" title="Đóng">✕</button>
      <div class="popup-chapter-num" style="color:${ch.color};">Chapter ${ch.id}</div>
      <div class="popup-title">${ch.title.replace(/^Chapter \d+:\s*/, "")}</div>
      <div class="popup-subtitle">${ch.subtitle}</div>
      <div class="popup-concepts">
        ${conceptsHTML}
      </div>
      <button class="btn-try-it" style="--popup-accent:${ch.color};">
        ${t("tryItBtn")}
      </button>
    `;

    container.appendChild(popup);

    // Close button
    popup.querySelector(".popup-close").addEventListener("click", (e) => {
      e.stopPropagation();
      popup.remove();
      mapState.expandedChapterId = null;
    });

    // Try it button -> navigate to workspace
    popup.querySelector(".btn-try-it").addEventListener("click", (e) => {
      e.stopPropagation();
      popup.remove();
      mapState.expandedChapterId = null;
      openChapter(ch.id);
    });

    // Close popup when clicking outside
    const closeHandler = (e) => {
      if (!popup.contains(e.target) && !e.target.closest(`[data-chapter-id="${ch.id}"]`)) {
        popup.remove();
        mapState.expandedChapterId = null;
        container.removeEventListener("mousedown", closeHandler);
      }
    };
    setTimeout(() => container.addEventListener("mousedown", closeHandler), 100);
  }

  function createSVGElement(tag) {
    return document.createElementNS("http://www.w3.org/2000/svg", tag);
  }

  // ---- Search ----
  function initSearch() {
    const input = $(".search-input");
    if (!input) return;
    input.addEventListener("input", (e) => {
      searchTerm = e.target.value.trim();
      if (currentView === "dashboard") {
        renderDashboard(searchTerm);
      }
    });
  }

  // ---- Navigation tabs ----
  function initNavTabs() {
    $$(".nav-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.getAttribute("data-view");
        if (target === "dashboard") {
          setView("dashboard");
          renderDashboard(searchTerm);
        } else if (target === "mindmap") {
          setView("mindmap");
          renderMindMap();
        }
      });
    });
  }

  // ---- Language Switcher ----
  function initLangSwitcher() {
    const viBtn = $('.lang-switcher [data-lang="vi"]');
    const enBtn = $('.lang-switcher [data-lang="en"]');
    
    function updateActiveBtn() {
      if (currentLang === "vi") {
        viBtn.classList.add("active");
        enBtn.classList.remove("active");
      } else {
        enBtn.classList.add("active");
        viBtn.classList.remove("active");
      }
    }
    
    updateActiveBtn();
    
    $$(".lang-switcher .lang-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const lang = btn.getAttribute("data-lang");
        if (lang !== currentLang) {
          currentLang = lang;
          localStorage.setItem("grokking_lang", currentLang);
          GrokkingData = currentLang === "vi" ? GrokkingDataVI : GrokkingDataEN;
          updateActiveBtn();
          translateUI();
          
          // Re-render the active view immediately
          if (currentView === "dashboard") {
            renderDashboard(searchTerm);
          } else if (currentView === "workspace") {
            if (activeChapter) {
              openChapter(activeChapter.id);
            }
          } else if (currentView === "mindmap") {
            renderMindMap();
          }
        }
      });
    });
  }

  function translateUI() {
    // Dynamic text replacements in HTML skeleton
    $("#app-subtitle").textContent = t("appSubtitle");
    $("#tab-dash-btn").innerHTML = t("tabDashboard");
    $("#tab-map-btn").innerHTML = t("tabMindmap");
    $("#search-input-box").placeholder = t("searchPlaceholder");
  }

  // ---- 3D Aquarium Background (Three.js / WebGL) ----
  function initAquarium() {
    const canvas = document.getElementById("aquarium-canvas");
    if (!canvas) return;

    // Graceful fallback: if Three.js failed to load, the CSS underwater
    // gradient still provides a pleasant static background.
    if (typeof THREE === "undefined") {
      console.warn("[Aquarium] Three.js not available – using static CSS background.");
      return;
    }

    const reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const DEEP = 0x04162a;

    // ---- Scene / Camera / Renderer ----
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(DEEP, 0.0055);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.set(0, 0, 130);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    });
    renderer.setClearColor(0x000000, 0); // transparent -> CSS gradient shows through
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // ---- Lights ----
    scene.add(new THREE.AmbientLight(0x88bbff, 0.85));
    const keyLight = new THREE.DirectionalLight(0xbfe9ff, 1.1);
    keyLight.position.set(-40, 140, 80);
    scene.add(keyLight);
    const fillLight = new THREE.PointLight(0x3b82f6, 0.7, 700);
    fillLight.position.set(70, -50, 90);
    scene.add(fillLight);

    const clock = new THREE.Clock();
    const X_BOUND = 210;

    // ---- Fish ----
    const fishColors = [
      0x60a5fa, 0x34d399, 0xf59e0b, 0xf472b6, 0xa78bfa, 0x22d3ee, 0xfb7185
    ];
    const fishes = [];
    const FISH_COUNT = reduceMotion ? 6 : 16;

    function makeFish(color) {
      const group = new THREE.Group();
      const mat = new THREE.MeshPhongMaterial({
        color: color,
        shininess: 70,
        specular: 0x335577,
        transparent: true,
        opacity: 0.92
      });

      const body = new THREE.Mesh(new THREE.SphereGeometry(3, 18, 14), mat);
      body.scale.set(1.9, 1, 0.7); // long axis along +x
      group.add(body);

      const tail = new THREE.Mesh(new THREE.ConeGeometry(2.4, 4.2, 14), mat);
      tail.rotation.z = Math.PI / 2; // points toward -x (rear)
      tail.position.x = -5.3;
      tail.scale.set(1, 1, 0.4);
      group.add(tail);

      const dorsal = new THREE.Mesh(new THREE.ConeGeometry(1.4, 2.8, 10), mat);
      dorsal.position.set(-0.4, 2.3, 0);
      dorsal.scale.set(0.5, 1, 0.4);
      group.add(dorsal);

      group.userData.tail = tail;
      return group;
    }

    for (let i = 0; i < FISH_COUNT; i++) {
      const fish = makeFish(fishColors[i % fishColors.length]);
      fish.scale.setScalar(0.6 + Math.random() * 1.1);
      const dir = Math.random() > 0.5 ? 1 : -1;
      fish.userData = Object.assign(fish.userData, {
        dir: dir,
        speed: 7 + Math.random() * 11,
        baseY: (Math.random() - 0.5) * 80,
        ampY: 4 + Math.random() * 8,
        freqY: 0.4 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
        wiggleFreq: 6 + Math.random() * 4
      });
      fish.position.set(
        (Math.random() - 0.5) * 2 * X_BOUND,
        fish.userData.baseY,
        -130 + Math.random() * 160
      );
      fish.rotation.y = dir > 0 ? 0 : Math.PI;
      scene.add(fish);
      fishes.push(fish);
    }

    // ---- Soft circular sprite texture (shared by bubbles) ----
    function makeBubbleTexture() {
      const c = document.createElement("canvas");
      c.width = c.height = 64;
      const g = c.getContext("2d");
      const grad = g.createRadialGradient(32, 32, 1, 32, 32, 30);
      grad.addColorStop(0, "rgba(255,255,255,0.95)");
      grad.addColorStop(0.25, "rgba(190,225,255,0.45)");
      grad.addColorStop(0.7, "rgba(120,180,255,0.12)");
      grad.addColorStop(1, "rgba(120,180,255,0)");
      g.fillStyle = grad;
      g.beginPath();
      g.arc(32, 32, 30, 0, Math.PI * 2);
      g.fill();
      g.strokeStyle = "rgba(255,255,255,0.55)";
      g.lineWidth = 2;
      g.beginPath();
      g.arc(32, 32, 23, 0, Math.PI * 2);
      g.stroke();
      return new THREE.CanvasTexture(c);
    }

    // ---- Bubbles (depth-attenuated point cloud) ----
    const BUBBLE_COUNT = reduceMotion ? 60 : 170;
    const bubbleGeo = new THREE.BufferGeometry();
    const bubblePos = new Float32Array(BUBBLE_COUNT * 3);
    const bubbleData = [];
    for (let i = 0; i < BUBBLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 340;
      const y = Math.random() * 220 - 110;
      const z = -170 + Math.random() * 250;
      bubblePos[i * 3] = x;
      bubblePos[i * 3 + 1] = y;
      bubblePos[i * 3 + 2] = z;
      bubbleData.push({
        speed: 7 + Math.random() * 17,
        swayFreq: 0.5 + Math.random() * 1.5,
        swayAmp: 2 + Math.random() * 6,
        phase: Math.random() * Math.PI * 2,
        baseX: x
      });
    }
    bubbleGeo.setAttribute("position", new THREE.BufferAttribute(bubblePos, 3));
    const bubbles = new THREE.Points(
      bubbleGeo,
      new THREE.PointsMaterial({
        size: 6,
        map: makeBubbleTexture(),
        transparent: true,
        depthWrite: false,
        opacity: 0.7,
        sizeAttenuation: true
      })
    );
    scene.add(bubbles);

    // ---- Plankton specks (adds depth / volume) ----
    const PLANK_COUNT = reduceMotion ? 90 : 240;
    const plankGeo = new THREE.BufferGeometry();
    const plankPos = new Float32Array(PLANK_COUNT * 3);
    for (let i = 0; i < PLANK_COUNT; i++) {
      plankPos[i * 3] = (Math.random() - 0.5) * 440;
      plankPos[i * 3 + 1] = (Math.random() - 0.5) * 260;
      plankPos[i * 3 + 2] = -220 + Math.random() * 280;
    }
    plankGeo.setAttribute("position", new THREE.BufferAttribute(plankPos, 3));
    const plankton = new THREE.Points(
      plankGeo,
      new THREE.PointsMaterial({
        color: 0x9fd8ff,
        size: 1.5,
        transparent: true,
        opacity: 0.38,
        depthWrite: false,
        sizeAttenuation: true
      })
    );
    scene.add(plankton);

    // ---- God-ray light shafts ----
    const rays = [];
    const rayTex = (function () {
      const c = document.createElement("canvas");
      c.width = 64;
      c.height = 256;
      const g = c.getContext("2d");
      const grad = g.createLinearGradient(0, 0, 0, 256);
      grad.addColorStop(0, "rgba(150,205,255,0.55)");
      grad.addColorStop(1, "rgba(150,205,255,0)");
      g.fillStyle = grad;
      g.fillRect(0, 0, 64, 256);
      return new THREE.CanvasTexture(c);
    })();
    for (let i = 0; i < 5; i++) {
      const ray = new THREE.Mesh(
        new THREE.PlaneGeometry(34, 340),
        new THREE.MeshBasicMaterial({
          map: rayTex,
          transparent: true,
          opacity: 0.06,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          side: THREE.DoubleSide
        })
      );
      ray.position.set(-130 + i * 62 + Math.random() * 18, 70, -140 - Math.random() * 70);
      const baseRot = 0.22 + Math.random() * 0.16;
      ray.rotation.z = baseRot;
      ray.userData = {
        baseRot: baseRot,
        swaySpeed: 0.2 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
        baseOp: 0.04 + Math.random() * 0.05
      };
      scene.add(ray);
      rays.push(ray);
    }

    // ---- Pointer parallax ----
    let targetRX = 0,
      targetRY = 0,
      curRX = 0,
      curRY = 0;
    window.addEventListener("mousemove", function (e) {
      targetRY = ((e.clientX / window.innerWidth) * 2 - 1) * 0.12;
      targetRX = ((e.clientY / window.innerHeight) * 2 - 1) * 0.08;
    });

    // ---- Resize ----
    window.addEventListener("resize", function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // ---- Animation loop ----
    function animate() {
      requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      // Gentle camera drift + pointer parallax for the 3D feel
      curRX += (targetRX - curRX) * 0.04;
      curRY += (targetRY - curRY) * 0.04;
      camera.position.x = Math.sin(t * 0.1) * 6 + curRY * 40;
      camera.position.y = Math.cos(t * 0.13) * 4 - curRX * 30;
      camera.lookAt(0, 0, 0);

      for (let k = 0; k < fishes.length; k++) {
        const f = fishes[k];
        const u = f.userData;
        f.position.x += u.dir * u.speed * dt;
        f.position.y = u.baseY + Math.sin(t * u.freqY + u.phase) * u.ampY;
        if (u.dir > 0 && f.position.x > X_BOUND) {
          f.position.x = -X_BOUND;
          u.baseY = (Math.random() - 0.5) * 80;
          f.position.z = -130 + Math.random() * 160;
        } else if (u.dir < 0 && f.position.x < -X_BOUND) {
          f.position.x = X_BOUND;
          u.baseY = (Math.random() - 0.5) * 80;
          f.position.z = -130 + Math.random() * 160;
        }
        if (u.tail) u.tail.rotation.y = Math.sin(t * u.wiggleFreq + u.phase) * 0.5;
        f.rotation.z = Math.sin(t * u.freqY + u.phase) * 0.08;
      }

      const arr = bubbleGeo.attributes.position.array;
      for (let i = 0; i < BUBBLE_COUNT; i++) {
        const d = bubbleData[i];
        arr[i * 3 + 1] += d.speed * dt;
        arr[i * 3] = d.baseX + Math.sin(t * d.swayFreq + d.phase) * d.swayAmp;
        if (arr[i * 3 + 1] > 115) {
          arr[i * 3 + 1] = -115;
          d.baseX = (Math.random() - 0.5) * 340;
          arr[i * 3 + 2] = -170 + Math.random() * 250;
        }
      }
      bubbleGeo.attributes.position.needsUpdate = true;

      plankton.rotation.y += dt * 0.02;

      for (let r = 0; r < rays.length; r++) {
        const ray = rays[r];
        const u = ray.userData;
        ray.rotation.z = u.baseRot + Math.sin(t * u.swaySpeed + u.phase) * 0.06;
        ray.material.opacity = u.baseOp + Math.sin(t * 0.6 + u.phase) * 0.02;
      }

      renderer.render(scene, camera);
    }

    if (reduceMotion) {
      renderer.render(scene, camera); // single static frame, respects accessibility
    } else {
      animate();
    }
  }

  // ---- Boot ----
  function init() {
    translateUI();
    initLangSwitcher();
    initAquarium();
    renderDashboard("");
    initSearch();
    initNavTabs();
  }

  // Export translator helper globally for simulators
  window.t = t;

  // Wait for DOM
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
