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
  let progress = loadProgress();
  let searchTerm = "";

  // ---- Helpers ----
  function loadProgress() {
    try {
      return JSON.parse(localStorage.getItem("grokking_progress") || "{}");
    } catch {
      return {};
    }
  }
  function saveProgress() {
    localStorage.setItem("grokking_progress", JSON.stringify(progress));
  }

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
        <h3 style="color:var(--text-muted);font-weight:500;">Không tìm thấy kết quả cho "<em>${term}</em>"</h3>
        <p style="color:#475569;margin-top:6px;font-size:14px;">Thử tìm kiếm với từ khóa khác, ví dụ: "hash", "BFS", "Big O"</p>
      </div>`;
      return;
    }

    filtered.forEach((ch) => {
      const card = document.createElement("div");
      card.className = "chapter-card";
      card.style.setProperty("--accent-color", ch.color);
      card.style.setProperty("--shadow-glow", ch.shadow);

      const isLearned = !!progress[ch.id];
      const conceptCount = ch.concepts.length;
      // Grab a clean subtitle (first 70 chars)
      const shortDesc =
        ch.subtitle.length > 75 ? ch.subtitle.slice(0, 75) + "…" : ch.subtitle;

      card.innerHTML = `
        <div>
          <span class="chapter-num">Chapter ${ch.id}</span>
          <div class="chapter-title">${ch.title.replace(/^Chapter \d+:\s*/, "")}</div>
          <div class="chapter-desc">${shortDesc}</div>
        </div>
        <div class="chapter-card-footer">
          <span style="color:var(--text-muted);font-size:11px;">${conceptCount} khái niệm • ${(ch.quizzes || []).length} câu hỏi</span>
          ${
            isLearned
              ? '<span class="learned-badge">✓ Đã học</span>'
              : '<span class="unlearned-badge">Chưa học</span>'
          }
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
    const isLearned = !!progress[ch.id];

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
      <button class="back-btn" id="btn-back">← Quay lại Dashboard</button>

      <div class="side-header">
        <span class="chapter-num" style="color:${ch.color};">Chapter ${ch.id}</span>
        <h2>${ch.title.replace(/^Chapter \d+:\s*/, "")}</h2>
        <p>${ch.subtitle}</p>
      </div>

      <div class="learn-content" style="overflow-y:auto; max-height: 460px; padding-right: 6px;">
        ${conceptsHTML}
      </div>

      <div class="learn-progress-toggle">
        <label>Đánh dấu đã học xong</label>
        <label class="switch">
          <input type="checkbox" id="toggle-learned" ${isLearned ? "checked" : ""}>
          <span class="slider"></span>
        </label>
      </div>
    `;

    $("#btn-back").addEventListener("click", () => {
      setView("dashboard");
    });
    $("#toggle-learned").addEventListener("change", (e) => {
      if (e.target.checked) {
        progress[ch.id] = true;
      } else {
        delete progress[ch.id];
      }
      saveProgress();
      renderDashboard(searchTerm);
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
            ? '<button class="workspace-tab active" data-wtab="simulator">🧪 Mô phỏng</button>'
            : ""
        }
        <button class="workspace-tab ${!hasSimulator ? "active" : ""}" data-wtab="code">💻 Code mẫu</button>
        <button class="workspace-tab" data-wtab="quiz">❓ Quiz</button>
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
        '<p style="color:var(--text-muted);text-align:center;padding:40px;">Chưa có code mẫu cho chương này.</p>';
      return;
    }

    function render(lang) {
      const source = ch.code[lang] || "";
      panel.innerHTML = `
        <div class="code-panel-wrapper">
          <div class="code-header">
            <h4 style="font-size:16px;">Code mẫu – Chapter ${ch.id}</h4>
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
        '<p style="color:var(--text-muted);text-align:center;padding:40px;">Chưa có câu hỏi cho chương này.</p>';
      return;
    }

    let html = '<div class="quiz-panel-wrapper">';
    quizzes.forEach((q, qi) => {
      html += `
        <div class="quiz-card" id="quiz-${qi}">
          <div class="quiz-question">Câu ${qi + 1}: ${q.question}</div>
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
            '<span style="color:#10b981;">✅ Chính xác! Bạn đã hiểu đúng khái niệm.</span>';
        } else {
          btn.classList.add("incorrect");
          feedback.innerHTML = `<span style="color:#ef4444;">❌ Sai rồi. Đáp án đúng là: "${q.options[q.answer]}".</span>`;
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
    expandedChapterId: null,
    subBranchGroup: null
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
          <h3>🗺️ Sơ đồ tư duy – Grokking Algorithms</h3>
          <button class="back-btn" id="btn-back-map">← Dashboard</button>
        </div>
        <div class="mindmap-zoom-controls">
          <button class="zoom-btn" id="zoom-out" title="Thu nhỏ">−</button>
          <span class="zoom-label" id="zoom-label">100%</span>
          <button class="zoom-btn" id="zoom-in" title="Phóng to">+</button>
          <button class="zoom-btn" id="zoom-reset" title="Đặt lại" style="font-size:12px;">⟳</button>
        </div>
      </div>
      <div class="mindmap-svg-container" id="mindmap-container">
        <div class="mindmap-overlay-tip">🖱️ Cuộn chuột để zoom • Kéo để di chuyển<br>Click vào nút chương để xem nhánh chi tiết</div>
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
    const svg = $("#mindmap-svg");

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
    $("#zoom-reset").addEventListener("click", () => {
      mapState.zoom = 1;
      mapState.panX = 0;
      mapState.panY = 0;
      applyTransform();
      updateZoomLabel();
    });

    // Center the view initially
    const rect = container.getBoundingClientRect();
    mapState.panX = (rect.width - 2400) / 2;
    mapState.panY = (rect.height - 1600) / 2 + 100;
    applyTransform();
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
    const chapterPositions = []; // store for sub-branch drawing

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

      // Learned badge
      if (progress[ch.id]) {
        const bg = createSVGElement("circle");
        bg.setAttribute("cx", nx + 28);
        bg.setAttribute("cy", ny - 28);
        bg.setAttribute("r", 9);
        bg.setAttribute("fill", "#10b981");
        g.appendChild(bg);
        const checkTxt = createSVGElement("text");
        checkTxt.setAttribute("x", nx + 28);
        checkTxt.setAttribute("y", ny - 24);
        checkTxt.setAttribute("text-anchor", "middle");
        checkTxt.setAttribute("fill", "#fff");
        checkTxt.setAttribute("font-size", "11");
        checkTxt.setAttribute("font-weight", "bold");
        checkTxt.textContent = "✓";
        g.appendChild(checkTxt);
      }

      // ---- Click handler: expand sub-branches + show popup ----
      g.addEventListener("click", (e) => {
        e.stopPropagation();
        expandChapter(ch, nx, ny, angle);
      });

      svg.appendChild(g);
    });

    // Store positions for later
    svg._chapterPositions = chapterPositions;

    // Create a group for sub-branches (drawn above edges but below nodes)
    mapState.subBranchGroup = createSVGElement("g");
    mapState.subBranchGroup.setAttribute("id", "sub-branches");
    svg.appendChild(mapState.subBranchGroup);
  }

  function expandChapter(ch, nx, ny, angle) {
    const svg = $("#mindmap-svg");
    const container = $("#mindmap-container");

    // Clear previous sub-branches
    const sbGroup = $("#sub-branches");
    if (sbGroup) sbGroup.innerHTML = "";

    // Remove old popup
    const oldPopup = container.querySelector(".mindmap-detail-popup");
    if (oldPopup) oldPopup.remove();

    // If clicking the same chapter, collapse
    if (mapState.expandedChapterId === ch.id) {
      mapState.expandedChapterId = null;
      return;
    }
    mapState.expandedChapterId = ch.id;

    // ---- Draw sub-branch concept nodes in SVG ----
    const concepts = ch.concepts;
    const subRadius = 140;
    const spreadAngle = Math.PI * 0.7; // fan out ~126 degrees
    const startAngle = angle - spreadAngle / 2;

    concepts.forEach((concept, ci) => {
      const subAngle = concepts.length === 1 ? angle : startAngle + (spreadAngle * ci) / (concepts.length - 1);
      const sx = nx + subRadius * Math.cos(subAngle);
      const sy = ny + subRadius * Math.sin(subAngle);

      // Branch line
      const line = createSVGElement("line");
      line.setAttribute("x1", nx);
      line.setAttribute("y1", ny);
      line.setAttribute("x2", sx);
      line.setAttribute("y2", sy);
      line.setAttribute("stroke", ch.color);
      line.setAttribute("stroke-width", "1.5");
      line.setAttribute("stroke-opacity", "0.5");
      line.setAttribute("class", "map-sub-branch");
      sbGroup.appendChild(line);

      // Sub-node (rounded rect)
      const g = createSVGElement("g");
      g.setAttribute("class", "map-sub-node");

      // Truncate concept name
      const name = concept.name.length > 28 ? concept.name.slice(0, 26) + "…" : concept.name;
      const textWidth = Math.max(name.length * 6.5, 100);
      const rectW = textWidth + 24;
      const rectH = 28;

      const rect = createSVGElement("rect");
      rect.setAttribute("x", sx - rectW / 2);
      rect.setAttribute("y", sy - rectH / 2);
      rect.setAttribute("width", rectW);
      rect.setAttribute("height", rectH);
      rect.setAttribute("rx", 8);
      rect.setAttribute("ry", 8);
      rect.setAttribute("fill", "rgba(17, 24, 39, 0.9)");
      rect.setAttribute("stroke", ch.color);
      rect.setAttribute("stroke-width", "1.5");
      rect.setAttribute("stroke-opacity", "0.5");
      g.appendChild(rect);

      const text = createSVGElement("text");
      text.setAttribute("x", sx);
      text.setAttribute("y", sy + 4);
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("fill", "#e2e8f0");
      text.setAttribute("font-size", "10");
      text.setAttribute("font-weight", "500");
      text.setAttribute("font-family", "Outfit, sans-serif");
      text.textContent = name;
      g.appendChild(text);

      sbGroup.appendChild(g);
    });

    // ---- Show HTML Detail Popup ----
    const popup = document.createElement("div");
    popup.className = "mindmap-detail-popup";
    popup.style.setProperty("--popup-accent", ch.color);

    // Position popup near the node (accounting for pan/zoom)
    // We calculate position in container-relative coordinates
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
        🧪 Try it – Xem Mô phỏng & Code
      </button>
    `;

    container.appendChild(popup);

    // Close button
    popup.querySelector(".popup-close").addEventListener("click", (e) => {
      e.stopPropagation();
      popup.remove();
      if (sbGroup) sbGroup.innerHTML = "";
      mapState.expandedChapterId = null;
    });

    // Try it button -> navigate to workspace
    popup.querySelector(".btn-try-it").addEventListener("click", (e) => {
      e.stopPropagation();
      popup.remove();
      if (sbGroup) sbGroup.innerHTML = "";
      mapState.expandedChapterId = null;
      openChapter(ch.id);
    });

    // Close popup when clicking outside
    const closeHandler = (e) => {
      if (!popup.contains(e.target) && !e.target.closest(`[data-chapter-id="${ch.id}"]`)) {
        popup.remove();
        if (sbGroup) sbGroup.innerHTML = "";
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

  // ---- Progress bar ----
  function renderProgressBar() {
    const bar = $("#progress-bar-fill");
    const label = $("#progress-label");
    if (!bar || !label) return;

    const learned = Object.keys(progress).length;
    const total = GrokkingData.length;
    const pct = total > 0 ? Math.round((learned / total) * 100) : 0;

    bar.style.width = pct + "%";
    label.textContent = `${learned}/${total} chương (${pct}%)`;
  }

  // Keep progress bar up-to-date
  const origSave = saveProgress;
  saveProgress = function () {
    origSave();
    renderProgressBar();
  };

  // ---- Boot ----
  function init() {
    renderDashboard("");
    initSearch();
    initNavTabs();
    renderProgressBar();
  }

  // Wait for DOM
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
