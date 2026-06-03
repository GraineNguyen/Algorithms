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
  function renderMindMap() {
    const container = $(".mindmap-view");
    container.innerHTML = `
      <div style="margin-bottom:15px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
        <h3 style="font-size:18px;">🗺️ Sơ đồ tư duy tổng quan – Grokking Algorithms</h3>
        <button class="back-btn" id="btn-back-map">← Quay lại Dashboard</button>
      </div>
      <div class="mindmap-svg-container" id="mindmap-container">
        <div class="mindmap-overlay-tip">Click vào nút bất kỳ để xem chi tiết chương đó</div>
        <svg id="mindmap-svg" width="1100" height="620"></svg>
      </div>
    `;

    $("#btn-back-map").addEventListener("click", () => setView("dashboard"));
    drawMindMap();
  }

  function drawMindMap() {
    const svg = $("#mindmap-svg");
    svg.innerHTML = "";

    const cx = 550;
    const cy = 310;
    const radius = 240;

    // Draw center node
    const centerG = createSVGElement("g");
    centerG.setAttribute("class", "map-node");
    const centerCircle = createSVGElement("circle");
    centerCircle.setAttribute("cx", cx);
    centerCircle.setAttribute("cy", cy);
    centerCircle.setAttribute("r", 55);
    centerCircle.setAttribute("fill", "#1e293b");
    centerCircle.setAttribute("stroke", "#3b82f6");
    centerCircle.setAttribute("stroke-width", "3");
    centerG.appendChild(centerCircle);

    const centerText1 = createSVGElement("text");
    centerText1.setAttribute("x", cx);
    centerText1.setAttribute("y", cy - 8);
    centerText1.setAttribute("text-anchor", "middle");
    centerText1.setAttribute("fill", "#fff");
    centerText1.setAttribute("font-size", "13");
    centerText1.setAttribute("font-weight", "700");
    centerText1.textContent = "Grokking";
    centerG.appendChild(centerText1);

    const centerText2 = createSVGElement("text");
    centerText2.setAttribute("x", cx);
    centerText2.setAttribute("y", cy + 10);
    centerText2.setAttribute("text-anchor", "middle");
    centerText2.setAttribute("fill", "#60a5fa");
    centerText2.setAttribute("font-size", "12");
    centerText2.setAttribute("font-weight", "600");
    centerText2.textContent = "Algorithms";
    centerG.appendChild(centerText2);

    svg.appendChild(centerG);

    // Place chapter nodes in a circle
    const total = GrokkingData.length;
    GrokkingData.forEach((ch, i) => {
      const angle = (2 * Math.PI * i) / total - Math.PI / 2;
      const nx = cx + radius * Math.cos(angle);
      const ny = cy + radius * Math.sin(angle);

      // Draw edge line
      const line = createSVGElement("line");
      line.setAttribute("x1", cx);
      line.setAttribute("y1", cy);
      line.setAttribute("x2", nx);
      line.setAttribute("y2", ny);
      line.setAttribute("stroke", ch.color);
      line.setAttribute("stroke-width", "1.5");
      line.setAttribute("stroke-opacity", "0.3");
      svg.appendChild(line);

      // Draw chapter node group
      const g = createSVGElement("g");
      g.setAttribute("class", "map-node");
      g.style.cursor = "pointer";

      const circle = createSVGElement("circle");
      circle.setAttribute("cx", nx);
      circle.setAttribute("cy", ny);
      circle.setAttribute("r", 30);
      circle.setAttribute("fill", "#1e293b");
      circle.setAttribute("stroke", ch.color);
      circle.setAttribute("stroke-width", "2.5");
      g.appendChild(circle);

      // Chapter number
      const numText = createSVGElement("text");
      numText.setAttribute("x", nx);
      numText.setAttribute("y", ny - 5);
      numText.setAttribute("text-anchor", "middle");
      numText.setAttribute("fill", ch.color);
      numText.setAttribute("font-size", "10");
      numText.setAttribute("font-weight", "800");
      numText.textContent = `CH ${ch.id}`;
      g.appendChild(numText);

      // Short label
      const shortTitle = ch.title
        .replace(/^Chapter \d+:\s*/, "")
        .split(" ")
        .slice(0, 2)
        .join(" ");
      const labelText = createSVGElement("text");
      labelText.setAttribute("x", nx);
      labelText.setAttribute("y", ny + 8);
      labelText.setAttribute("text-anchor", "middle");
      labelText.setAttribute("fill", "#cbd5e1");
      labelText.setAttribute("font-size", "8");
      labelText.setAttribute("font-weight", "500");
      labelText.textContent = shortTitle;
      g.appendChild(labelText);

      // Learned indicator
      if (progress[ch.id]) {
        const checkCircle = createSVGElement("circle");
        checkCircle.setAttribute("cx", nx + 20);
        checkCircle.setAttribute("cy", ny - 20);
        checkCircle.setAttribute("r", 7);
        checkCircle.setAttribute("fill", "#10b981");
        g.appendChild(checkCircle);
        const checkMark = createSVGElement("text");
        checkMark.setAttribute("x", nx + 20);
        checkMark.setAttribute("y", ny - 16);
        checkMark.setAttribute("text-anchor", "middle");
        checkMark.setAttribute("fill", "#fff");
        checkMark.setAttribute("font-size", "9");
        checkMark.setAttribute("font-weight", "bold");
        checkMark.textContent = "✓";
        g.appendChild(checkMark);
      }

      g.addEventListener("click", () => openChapter(ch.id));
      svg.appendChild(g);
    });
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
