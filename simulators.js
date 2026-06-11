// Simulators for Grokking Algorithms
window.GrokkingSimulators = {
  // CHAPTER 1: BINARY SEARCH
  1: {
    init: function(container) {
      container.innerHTML = `
        <div class="sim-wrapper">
          <h3>${t("simBS_title")}</h3>
          <p class="sim-desc">${t("simBS_desc")}</p>
          
          <div class="sim-controls">
            <label>${t("simBS_target")}</label>
            <input type="number" id="bs-target" value="47" min="10" max="99" style="width: 60px;">
            <button id="bs-btn-start" class="btn btn-primary">${t("simBS_btnInit")}</button>
            <button id="bs-btn-step" class="btn btn-accent">${t("simBS_btnStep")}</button>
          </div>

          <div id="bs-array-container" class="array-visualizer"></div>
          
          <div id="bs-status" class="sim-status-box">
            ${t("simBS_statusInit")}
          </div>
        </div>
      `;

      const array = [12, 19, 24, 33, 37, 42, 47, 53, 65, 71, 80, 88, 92, 99];
      let low = 0;
      let high = array.length - 1;
      let mid = -1;
      let stepCount = 0;
      let target = 47;
      let found = false;
      let finished = false;

      function renderArray() {
        const arrDiv = document.getElementById("bs-array-container");
        arrDiv.innerHTML = "";
        array.forEach((val, idx) => {
          const item = document.createElement("div");
          item.className = "array-item";
          item.innerText = val;
          item.id = `bs-item-${idx}`;

          // Highlight pointers
          if (idx === mid) {
            item.classList.add("item-mid");
            const label = document.createElement("span");
            label.className = "ptr-label label-mid";
            label.innerText = "mid";
            item.appendChild(label);
          }
          if (idx === low && !finished) {
            item.classList.add("item-low");
            const label = document.createElement("span");
            label.className = "ptr-label label-low";
            label.innerText = "low";
            item.appendChild(label);
          }
          if (idx === high && !finished) {
            item.classList.add("item-high");
            const label = document.createElement("span");
            label.className = "ptr-label label-high";
            label.innerText = "high";
            item.appendChild(label);
          }

          // Dim out elements outside search range
          if (idx < low || idx > high) {
            item.classList.add("item-dimmed");
          }

          // Highlight found item
          if (found && idx === mid) {
            item.classList.add("item-success");
          }

          arrDiv.appendChild(item);
        });
      }

      function initSearch() {
        target = parseInt(document.getElementById("bs-target").value) || 47;
        low = 0;
        high = array.length - 1;
        mid = -1;
        stepCount = 0;
        found = false;
        finished = false;
        
        document.getElementById("bs-status").innerHTML = t("simBS_statusStart", { target, low, high });
        renderArray();
      }

      function stepSearch() {
        if (finished) return;
        
        stepCount++;
        if (low > high) {
          document.getElementById("bs-status").innerHTML = t("simBS_statusNotFound", { target, stepCount });
          finished = true;
          renderArray();
          return;
        }

        mid = Math.floor((low + high) / 2);
        const guess = array[mid];
        renderArray();

        if (guess === target) {
          found = true;
          finished = true;
          document.getElementById("bs-status").innerHTML = t("simBS_statusFound", { target, mid, stepCount });
          renderArray();
        } else if (guess > target) {
          high = mid - 1;
          document.getElementById("bs-status").innerHTML = t("simBS_statusStepLeft", { stepCount, mid, guess, target, high });
        } else {
          low = mid + 1;
          document.getElementById("bs-status").innerHTML = t("simBS_statusStepRight", { stepCount, mid, guess, target, low });
        }
      }

      document.getElementById("bs-btn-start").addEventListener("click", initSearch);
      document.getElementById("bs-btn-step").addEventListener("click", stepSearch);
      
      initSearch();
    }
  },

  // CHAPTER 2: SELECTION SORT & ARRAYS VS LISTS
  2: {
    init: function(container) {
      container.innerHTML = `
        <div class="sim-wrapper">
          <h3>${t("simSS_title")}</h3>
          
          <div class="tabs-control">
            <button id="tab-mem" class="tab-btn active">${t("simSS_tabMemory")}</button>
            <button id="tab-sort" class="tab-btn">${t("simSS_tabSort")}</button>
          </div>

          <div id="sim-mem-view" class="tab-content active">
            <p class="sim-desc">${t("simSS_descArray")}</p>
            <div class="memory-grid" id="array-mem-grid"></div>

            <p class="sim-desc" style="margin-top:20px;">${t("simSS_descList")}</p>
            <div class="memory-grid" id="list-mem-grid"></div>
          </div>

          <div id="sim-sort-view" class="tab-content">
            <p class="sim-desc">${t("simSS_descSort")}</p>
            <div class="sim-controls">
              <button id="ss-btn-reset" class="btn btn-primary">${t("simBS_btnInit")}</button>
              <button id="ss-btn-step" class="btn btn-accent">${t("simBS_btnStep")}</button>
            </div>
            
            <div class="sort-visualizer-container">
              <div>
                <h5>${t("simSS_btnUnsorted")}</h5>
                <div id="ss-unsorted" class="array-visualizer"></div>
              </div>
              <div style="margin-top:20px;">
                <h5>${t("simSS_btnSorted")}</h5>
                <div id="ss-sorted" class="array-visualizer" style="min-height:50px;"></div>
              </div>
            </div>

            <div id="ss-status" class="sim-status-box" style="margin-top:15px;">
              ${t("simSS_statusInit")}
            </div>
          </div>
        </div>
      `;

      // Set up tabs
      document.getElementById("tab-mem").addEventListener("click", () => {
        document.getElementById("tab-mem").classList.add("active");
        document.getElementById("tab-sort").classList.remove("active");
        document.getElementById("sim-mem-view").classList.add("active");
        document.getElementById("sim-sort-view").classList.remove("active");
      });
      document.getElementById("tab-sort").addEventListener("click", () => {
        document.getElementById("tab-sort").classList.add("active");
        document.getElementById("tab-mem").classList.remove("active");
        document.getElementById("sim-sort-view").classList.add("active");
        document.getElementById("sim-mem-view").classList.remove("active");
        initSort();
      });

      // Memory visualizer setup
      function setupMemory() {
        const arrGrid = document.getElementById("array-mem-grid");
        const listGrid = document.getElementById("list-mem-grid");
        arrGrid.innerHTML = "";
        listGrid.innerHTML = "";

        // Array: consecutive slots occupied (say slots 2,3,4,5)
        for (let i = 0; i < 8; i++) {
          const cell = document.createElement("div");
          cell.className = "mem-cell";
          if (i >= 2 && i <= 5) {
            cell.classList.add("mem-occupied-array");
            cell.innerHTML = `<div>[${i-2}]</div><div style="font-size:11px;font-weight:bold;color:#f97316;">S:${i+10}</div>`;
          } else {
            cell.className = "mem-cell mem-empty";
            cell.innerText = t("simSS_empty");
          }
          arrGrid.appendChild(cell);
        }

        // Linked list: scattered slots
        const listPositions = [1, 6, 3, 5]; 
        const listValues = ["A", "B", "C", "D"];
        const nextPtr = [3, 5, 6, -1]; 
        
        for (let i = 0; i < 8; i++) {
          const cell = document.createElement("div");
          cell.className = "mem-cell";
          
          let listIdx = listPositions.indexOf(i);
          if (listIdx !== -1) {
            cell.classList.add("mem-occupied-list");
            let nextText = nextPtr[listIdx] === -1 ? "null" : `T:${nextPtr[listIdx]}`;
            cell.innerHTML = `<div style="font-weight:bold;color:#a855f7;">${listValues[listIdx]}</div><div style="font-size:9px;opacity:0.8;">Next: ${nextText}</div>`;
          } else {
            cell.className = "mem-cell mem-empty";
            cell.innerText = t("simSS_empty");
          }
          listGrid.appendChild(cell);
        }
      }

      setupMemory();

      // Selection Sort Setup
      let originalArray = [64, 25, 12, 22, 11];
      let unsorted = [...originalArray];
      let sorted = [];
      let currentSmallestIdx = -1;
      let checkIdx = -1;
      let state = "search"; 

      function renderSortVisualizer() {
        const unsortedDiv = document.getElementById("ss-unsorted");
        const sortedDiv = document.getElementById("ss-sorted");
        
        unsortedDiv.innerHTML = "";
        unsorted.forEach((val, idx) => {
          const item = document.createElement("div");
          item.className = "array-item";
          item.innerText = val;
          if (idx === checkIdx) {
            item.classList.add("item-checking");
          }
          if (idx === currentSmallestIdx) {
            item.classList.add("item-smallest");
          }
          unsortedDiv.appendChild(item);
        });

        sortedDiv.innerHTML = "";
        sorted.forEach(val => {
          const item = document.createElement("div");
          item.className = "array-item item-success";
          item.innerText = val;
          sortedDiv.appendChild(item);
        });
      }

      function initSort() {
        unsorted = [...originalArray];
        sorted = [];
        currentSmallestIdx = -1;
        checkIdx = -1;
        state = "search";
        document.getElementById("ss-status").innerHTML = t("simSS_statusStart", { array: originalArray.join(", ") });
        renderSortVisualizer();
      }

      function stepSort() {
        if (unsorted.length === 0) {
          document.getElementById("ss-status").innerHTML = t("simSS_statusCompleted", { array: sorted.join(", ") });
          return;
        }

        if (state === "search") {
          if (checkIdx === -1) {
            currentSmallestIdx = 0;
            checkIdx = 1;
            document.getElementById("ss-status").innerHTML = t("simSS_statusSearching", { smallest: unsorted[0] });
          } else if (checkIdx < unsorted.length) {
            if (unsorted[checkIdx] < unsorted[currentSmallestIdx]) {
              document.getElementById("ss-status").innerHTML = t("simSS_statusFoundNew", {
                guess: unsorted[checkIdx],
                smallest: unsorted[currentSmallestIdx],
                idx: checkIdx
              });
              currentSmallestIdx = checkIdx;
            } else {
              document.getElementById("ss-status").innerHTML = t("simSS_statusKeep", {
                guess: unsorted[checkIdx],
                smallest: unsorted[currentSmallestIdx]
              });
            }
            checkIdx++;
          }

          if (checkIdx >= unsorted.length) {
            state = "move";
          }
        } else if (state === "move") {
          const val = unsorted[currentSmallestIdx];
          document.getElementById("ss-status").innerHTML = t("simSS_statusMove", { val });
          sorted.push(val);
          unsorted.splice(currentSmallestIdx, 1);
          currentSmallestIdx = -1;
          checkIdx = -1;
          state = "search";
        }

        renderSortVisualizer();
      }

      document.getElementById("ss-btn-reset").addEventListener("click", initSort);
      document.getElementById("ss-btn-step").addEventListener("click", stepSort);
    }
  },

  // CHAPTER 3: RECURSION CALL STACK
  3: {
    init: function(container) {
      container.innerHTML = `
        <div class="sim-wrapper">
          <h3>${t("simRec_title")}</h3>
          <p class="sim-desc">${t("simRec_desc")}</p>

          <div class="sim-controls">
            <button id="rec-btn-reset" class="btn btn-primary">${t("simBS_btnInit")}</button>
            <button id="rec-btn-step" class="btn btn-accent">${t("simBS_btnStep")}</button>
          </div>

          <div style="display: flex; gap: 20px; margin-top: 15px; flex-wrap: wrap;">
            <div style="flex: 1; min-width: 250px;">
              <h5>${t("simRec_stackTitle")}</h5>
              <div id="rec-stack" class="stack-visualizer"></div>
            </div>
            
            <div style="flex: 1; min-width: 250px;">
              <h5>${t("simRec_varsTitle")}</h5>
              <div id="rec-status" class="sim-status-box" style="height: calc(100% - 30px); display: flex; align-items: center; justify-content: center; text-align: left;">
                ${t("simRec_statusInit")}
              </div>
            </div>
          </div>
        </div>
      `;

      let stack = [];
      let currentVal = 4;
      let phase = "push"; 
      let result = 1;
      let step = 0;

      function renderStack() {
        const stackDiv = document.getElementById("rec-stack");
        stackDiv.innerHTML = "";
        
        if (stack.length === 0) {
          stackDiv.innerHTML = `<div style="text-align:center; padding: 20px; color:#555;">[Empty]</div>`;
          return;
        }

        // Draw LIFO style (latest on top)
        for (let i = stack.length - 1; i >= 0; i--) {
          const frame = document.createElement("div");
          frame.className = "stack-frame";
          frame.innerHTML = `
            <div class="frame-title">${stack[i].name}</div>
            <div class="frame-vars">x = ${stack[i].x}</div>
            ${stack[i].retVal !== undefined ? `<div class="frame-ret">Return = ${stack[i].retVal}</div>` : ""}
          `;
          if (i === stack.length - 1) {
            frame.classList.add("frame-top");
          }
          stackDiv.appendChild(frame);
        }
      }

      function initRecursion() {
        stack = [];
        currentVal = 4;
        phase = "push";
        result = 1;
        step = 0;
        document.getElementById("rec-status").innerHTML = t("simRec_statusStart");
        renderStack();
      }

      function stepRecursion() {
        step++;
        
        if (phase === "push") {
          if (currentVal > 1) {
            stack.push({
              name: `factorial(${currentVal})`,
              x: currentVal
            });
            document.getElementById("rec-status").innerHTML = t("simRec_statusPush", { step, val: currentVal, nextVal: currentVal - 1 });
            currentVal--;
          } else {
            stack.push({
              name: `factorial(1)`,
              x: 1,
              retVal: 1
            });
            document.getElementById("rec-status").innerHTML = t("simRec_statusBaseCase", { step });
            phase = "pop";
          }
        } else if (phase === "pop") {
          if (stack.length > 0) {
            const topFrame = stack.pop();
            if (stack.length > 0) {
              const nextFrame = stack[stack.length - 1];
              const prevResult = result;
              result = result * nextFrame.x;
              nextFrame.retVal = result;
              
              document.getElementById("rec-status").innerHTML = t("simRec_statusPop", {
                step,
                topFrame: topFrame.name,
                prevResult,
                nextFrameX: nextFrame.x,
                result
              });
            } else {
              document.getElementById("rec-status").innerHTML = t("simRec_statusCompleted", { step, result });
            }
          }
        }
        renderStack();
      }

      document.getElementById("rec-btn-reset").addEventListener("click", initRecursion);
      document.getElementById("rec-btn-step").addEventListener("click", stepRecursion);
      
      initRecursion();
    }
  },

  // CHAPTER 5: HASH TABLES & COLLISIONS
  5: {
    init: function(container) {
      container.innerHTML = `
        <div class="sim-wrapper">
          <h3>${t("simHash_title")}</h3>
          <p class="sim-desc">${t("simHash_desc")}</p>
          
          <div class="sim-controls">
            <input type="text" id="hash-key" placeholder="Key (e.g. apple)" style="width: 130px;">
            <input type="text" id="hash-val" placeholder="Value (e.g. 15$)" style="width: 110px;">
            <button id="hash-btn-insert" class="btn btn-accent">${t("simHash_btnInsert")}</button>
            <button id="hash-btn-clear" class="btn btn-primary">${t("simHash_btnClear")}</button>
          </div>

          <div style="display: flex; gap: 20px; margin-top: 15px; flex-wrap: wrap;">
            <div style="flex: 1.2; min-width: 280px;">
              <h5>${t("simHash_tableTitle")}</h5>
              <div id="hash-table-visualizer" class="hash-table-visualizer"></div>
            </div>
            
            <div style="flex: 0.8; min-width: 220px;">
              <h5>${t("simHash_logTitle")}</h5>
              <div id="hash-log" class="sim-status-box" style="height: calc(100% - 30px); font-size:13px; line-height: 1.5; overflow-y:auto; max-height:220px;">
                ${t("simHash_logInit")}
              </div>
            </div>
          </div>
        </div>
      `;

      let table = Array(8).fill(null).map(() => []);

      function renderTable() {
        const tableDiv = document.getElementById("hash-table-visualizer");
        tableDiv.innerHTML = "";

        for (let i = 0; i < 8; i++) {
          const row = document.createElement("div");
          row.className = "hash-row";
          
          const idxCell = document.createElement("div");
          idxCell.className = "hash-idx-cell";
          idxCell.innerText = `Index ${i}`;
          row.appendChild(idxCell);

          const chainDiv = document.createElement("div");
          chainDiv.className = "hash-chain-container";

          if (table[i].length === 0) {
            chainDiv.innerHTML = `<span class="hash-empty-slot">${t("simSS_empty")}</span>`;
          } else {
            table[i].forEach((pair, cIdx) => {
              const node = document.createElement("div");
              node.className = "hash-node";
              node.innerHTML = `<strong>${pair.key}</strong>: ${pair.value}`;
              chainDiv.appendChild(node);

              if (cIdx < table[i].length - 1) {
                const arrow = document.createElement("div");
                arrow.className = "hash-chain-arrow";
                arrow.innerText = "➔";
                chainDiv.appendChild(arrow);
              }
            });
          }

          row.appendChild(chainDiv);
          tableDiv.appendChild(row);
        }
      }

      function hashFunction(key) {
        let sum = 0;
        let breakdown = [];
        for (let i = 0; i < key.length; i++) {
          let code = key.charCodeAt(i);
          sum += code;
          breakdown.push(`'${key[i]}'(${code})`);
        }
        let index = sum % 8;
        return {
          index: index,
          sum: sum,
          breakdown: breakdown
        };
      }

      function insertData() {
        const keyInput = document.getElementById("hash-key");
        const valInput = document.getElementById("hash-val");
        const key = keyInput.value.trim();
        const value = valInput.value.trim() || "1";

        if (!key) {
          alert(t("simHash_alertKey"));
          return;
        }

        const res = hashFunction(key);
        const index = res.index;
        
        let existingIdx = table[index].findIndex(p => p.key === key);
        let statusText = "";
        
        if (existingIdx !== -1) {
          table[index][existingIdx].value = value;
          statusText = t("simHash_update", { key, value, index });
        } else {
          table[index].push({ key, value });
          if (table[index].length > 1) {
            statusText = t("simHash_collision", { key, index });
          } else {
            statusText = t("simHash_success", { key, value, index });
          }
        }

        document.getElementById("hash-log").innerHTML = t("simHash_formula", {
          key,
          breakdown: res.breakdown.join(" + "),
          sum: res.sum,
          index,
          statusText
        });

        keyInput.value = "";
        valInput.value = "";
        renderTable();
      }

      function clearTable() {
        table = Array(8).fill(null).map(() => []);
        document.getElementById("hash-log").innerText = t("simHash_cleared");
        renderTable();
      }

      document.getElementById("hash-btn-insert").addEventListener("click", insertData);
      document.getElementById("hash-btn-clear").addEventListener("click", clearTable);

      renderTable();
    }
  },

  // CHAPTER 6: BREADTH-FIRST SEARCH (BFS)
  6: {
    init: function(container) {
      container.innerHTML = `
        <div class="sim-wrapper">
          <h3>${t("simBfs_title")}</h3>
          <p class="sim-desc">${t("simBfs_desc")}</p>
          
          <div class="sim-controls">
            <button id="bfs-btn-reset" class="btn btn-primary">${t("simBS_btnInit")}</button>
            <button id="bfs-btn-step" class="btn btn-accent">${t("simBS_btnStep")}</button>
          </div>

          <div style="display: flex; gap: 20px; margin-top: 15px; flex-wrap: wrap;">
            <div style="flex: 1.2; min-width: 280px; position:relative;">
              <h5>${t("simBfs_graphTitle")}</h5>
              <div id="bfs-graph-svg-container" style="background:#0f172a; border-radius: 8px; border:1px solid #1e293b; height: 280px;">
                <svg id="bfs-svg" viewBox="0 0 320 280" style="width: 100%; height: 100%; overflow: visible;"></svg>
              </div>
            </div>
            
            <div style="flex: 0.8; min-width: 220px;">
              <h5>${t("simBfs_queueTitle")}</h5>
              <div style="margin-bottom: 10px;">
                <strong>Queue (FIFO):</strong>
                <div id="bfs-queue-visualizer" class="queue-visualizer"></div>
              </div>
              <div id="bfs-status" class="sim-status-box" style="height: 140px; overflow-y: auto; font-size: 13px;">
                ${t("simBfs_statusInit")}
              </div>
            </div>
          </div>
        </div>
      `;

      // Absolute node coordinates in a 320x280 viewbox
      const nodes = {
        you: { x: 40, y: 140, label: "You", status: "unvisited" },
        alice: { x: 130, y: 50, label: "Alice", status: "unvisited" },
        bob: { x: 130, y: 140, label: "Bob", status: "unvisited" },
        claire: { x: 130, y: 230, label: "Claire", status: "unvisited" },
        peggy: { x: 260, y: 50, label: "Peggy", status: "unvisited" },
        anuj: { x: 260, y: 110, label: "Anuj", status: "unvisited" },
        thom: { x: 260, y: 170, label: "Thom", status: "unvisited" }, 
        jonny: { x: 260, y: 230, label: "Jonny", status: "unvisited" }
      };

      const edges = [
        { from: "you", to: "alice" },
        { from: "you", to: "bob" },
        { from: "you", to: "claire" },
        { from: "bob", to: "anuj" },
        { from: "bob", to: "peggy" },
        { from: "alice", to: "peggy" },
        { from: "claire", to: "thom" },
        { from: "claire", to: "jonny" }
      ];

      let queue = [];
      let searched = new Set();
      let finished = false;
      let stepCount = 0;
      let activeNode = null;

      function renderGraph() {
        const svg = document.getElementById("bfs-svg");
        svg.innerHTML = "";

        const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        defs.innerHTML = `
          <marker id="arrow" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#475569" />
          </marker>
        `;
        svg.appendChild(defs);

        edges.forEach(edge => {
          const fromNode = nodes[edge.from];
          const toNode = nodes[edge.to];
          const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
          line.setAttribute("x1", fromNode.x);
          line.setAttribute("y1", fromNode.y);
          line.setAttribute("x2", toNode.x);
          line.setAttribute("y2", toNode.y);
          line.setAttribute("stroke", "#475569");
          line.setAttribute("stroke-width", "2");
          line.setAttribute("marker-end", "url(#arrow)");
          svg.appendChild(line);
        });

        // Render nodes
        Object.keys(nodes).forEach(key => {
          const node = nodes[key];
          const g = document.createElementNS("http://www.w3.org/2000/svg", "g");

          const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          circle.setAttribute("cx", node.x);
          circle.setAttribute("cy", node.y);
          circle.setAttribute("r", "18");
          
          let fillColor = "#1e293b";
          let strokeColor = "#64748b";
          if (node.status === "visiting") {
            fillColor = "#0284c7";
            strokeColor = "#38bdf8";
          } else if (node.status === "searched") {
            fillColor = "#334155";
            strokeColor = "#475569";
          } else if (node.status === "found") {
            fillColor = "#16a34a";
            strokeColor = "#4ade80";
          }
          if (key === activeNode && node.status !== "found") {
            fillColor = "#d97706";
            strokeColor = "#fbbf24";
          }

          circle.setAttribute("fill", fillColor);
          circle.setAttribute("stroke", strokeColor);
          circle.setAttribute("stroke-width", "2.5");
          g.appendChild(circle);

          const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
          text.setAttribute("x", node.x);
          text.setAttribute("y", node.y + 4);
          text.setAttribute("text-anchor", "middle");
          text.setAttribute("fill", "#fff");
          text.setAttribute("font-size", "10px");
          text.setAttribute("font-weight", "bold");
          
          // Local translation for 'You' node label
          let labelText = node.label;
          if (labelText === "You" && currentLang === "vi") {
            labelText = "Bạn";
          }
          text.textContent = labelText;
          g.appendChild(text);

          svg.appendChild(g);
        });
      }

      function renderQueue() {
        const qDiv = document.getElementById("bfs-queue-visualizer");
        qDiv.innerHTML = "";
        
        if (queue.length === 0) {
          qDiv.innerHTML = `<span style="font-size:12px;color:#475569;padding:5px;">${t("simBfs_queueEmpty")}</span>`;
          return;
        }

        queue.forEach(item => {
          const qNode = document.createElement("div");
          qNode.className = "queue-item";
          let labelText = nodes[item].label;
          if (labelText === "You" && currentLang === "vi") {
            labelText = "Bạn";
          }
          qNode.innerText = labelText;
          qDiv.appendChild(qNode);
        });
      }

      function initBFS() {
        queue = [];
        searched.clear();
        finished = false;
        stepCount = 0;
        activeNode = null;
        Object.keys(nodes).forEach(k => nodes[k].status = "unvisited");
        
        nodes.you.status = "searched";
        searched.add("you");
        queue.push("alice", "bob", "claire");
        queue.forEach(n => nodes[n].status = "visiting");

        document.getElementById("bfs-status").innerHTML = t("simBfs_statusStart");
        renderGraph();
        renderQueue();
      }

      function stepBFS() {
        if (finished) return;
        stepCount++;

        if (queue.length === 0) {
          document.getElementById("bfs-status").innerHTML = t("simBfs_statusQueueEmptyResult");
          finished = true;
          return;
        }

        let current = queue.shift();
        activeNode = current;
        renderQueue();

        const person = nodes[current];
        if (person.label.endsWith("m")) {
          person.status = "found";
          finished = true;
          document.getElementById("bfs-status").innerHTML = t("simBfs_statusFound", { step: stepCount, label: person.label });
        } else {
          person.status = "searched";
          searched.add(current);

          let neighbors = [];
          if (current === "bob") neighbors = ["anuj", "peggy"];
          if (current === "alice") neighbors = ["peggy"];
          if (current === "claire") neighbors = ["thom", "jonny"];

          let added = [];
          neighbors.forEach(n => {
            if (!searched.has(n) && !queue.includes(n)) {
              queue.push(n);
              nodes[n].status = "visiting";
              added.push(nodes[n].label);
            }
          });

          let addedText = added.length > 0 ? t("simBfs_addedFriend", { added: added.join(", ") }) : t("simBfs_noFriend");
          document.getElementById("bfs-status").innerHTML = t("simBfs_statusChecked", { step: stepCount, label: person.label, addedText });
        }

        renderGraph();
        renderQueue();
      }

      document.getElementById("bfs-btn-reset").addEventListener("click", initBFS);
      document.getElementById("bfs-btn-step").addEventListener("click", stepBFS);

      initBFS();
    }
  },

  // CHAPTER 9: DIJKSTRA'S ALGORITHM
  9: {
    init: function(container) {
      container.innerHTML = `
        <div class="sim-wrapper">
          <h3>${t("simDj_title")}</h3>
          <p class="sim-desc">${t("simDj_desc")}</p>
          
          <div class="sim-controls">
            <button id="dj-btn-reset" class="btn btn-primary">${t("simBS_btnInit")}</button>
            <button id="dj-btn-step" class="btn btn-accent">${t("simBS_btnStep")}</button>
          </div>

          <div style="display: flex; gap: 20px; margin-top: 15px; flex-wrap: wrap;">
            <div style="flex: 1.1; min-width: 280px;">
              <h5>${t("simDj_graphTitle")}</h5>
              <div style="background:#0f172a; border-radius: 8px; border:1px solid #1e293b; height: 200px;">
                <svg id="dj-svg" viewBox="0 0 320 200" style="width: 100%; height: 100%; overflow: visible;"></svg>
              </div>
            </div>
            
            <div style="flex: 0.9; min-width: 220px;">
              <h5>${t("simDj_tableTitle")}</h5>
              <table class="sim-table">
                <thead>
                  <tr>
                    <th>${t("simDj_tableNode")}</th>
                    <th>${t("simDj_tableCost")}</th>
                    <th>${t("simDj_tableParent")}</th>
                  </tr>
                </thead>
                <tbody id="dj-table-body">
                </tbody>
              </table>
              <div id="dj-status" class="sim-status-box" style="margin-top: 10px; font-size:12px;">
                ${t("simDj_statusInit")}
              </div>
            </div>
          </div>
        </div>
      `;

      // Absolute node positions in a 320x200 viewbox
      const nodes = {
        start: { x: 30, y: 100, label: "Start" },
        a: { x: 140, y: 40, label: "A" },
        b: { x: 140, y: 160, label: "B" },
        fin: { x: 250, y: 100, label: "Fin" }
      };

      const edges = [
        { from: "start", to: "a", weight: 6 },
        { from: "start", to: "b", weight: 2 },
        { from: "b", to: "a", weight: 3 },
        { from: "b", to: "fin", weight: 5 },
        { from: "a", to: "fin", weight: 1 }
      ];

      let costs = {};
      let parents = {};
      let processed = new Set();
      let finished = false;
      let stepCount = 0;
      let activeNode = null;

      function renderGraph() {
        const svg = document.getElementById("dj-svg");
        svg.innerHTML = "";

        const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        defs.innerHTML = `
          <marker id="dj-arrow" viewBox="0 0 10 10" refX="20" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#475569" />
          </marker>
        `;
        svg.appendChild(defs);

        // Render edges and weights
        edges.forEach(edge => {
          const fromNode = nodes[edge.from];
          const toNode = nodes[edge.to];
          
          const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
          line.setAttribute("x1", fromNode.x);
          line.setAttribute("y1", fromNode.y);
          line.setAttribute("x2", toNode.x);
          line.setAttribute("y2", toNode.y);
          
          let isShortPath = false;
          if (parents[edge.to] === edge.from && processed.has(edge.to)) {
            isShortPath = true;
          }
          line.setAttribute("stroke", isShortPath ? "#10b981" : "#475569");
          line.setAttribute("stroke-width", isShortPath ? "3" : "2");
          line.setAttribute("marker-end", "url(#dj-arrow)");
          svg.appendChild(line);

          // Weight text label
          const midX = (fromNode.x + toNode.x) / 2;
          const midY = (fromNode.y + toNode.y) / 2;
          const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
          text.setAttribute("x", midX);
          text.setAttribute("y", midY - 8);
          text.setAttribute("text-anchor", "middle");
          text.setAttribute("fill", isShortPath ? "#34d399" : "#94a3b8");
          text.setAttribute("font-size", "11px");
          text.setAttribute("font-weight", "bold");
          text.textContent = edge.weight;
          svg.appendChild(text);
        });

        // Render nodes
        Object.keys(nodes).forEach(key => {
          const node = nodes[key];
          const g = document.createElementNS("http://www.w3.org/2000/svg", "g");

          const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          circle.setAttribute("cx", node.x);
          circle.setAttribute("cy", node.y);
          circle.setAttribute("r", "16");
          
          let fill = "#1e293b";
          let stroke = "#475569";
          if (processed.has(key)) {
            fill = "#334155";
            stroke = "#10b981";
          }
          if (key === activeNode) {
            fill = "#d97706";
            stroke = "#fbbf24";
          }

          circle.setAttribute("fill", fill);
          circle.setAttribute("stroke", stroke);
          circle.setAttribute("stroke-width", "2.5");
          g.appendChild(circle);

          const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
          text.setAttribute("x", node.x);
          text.setAttribute("y", node.y + 4);
          text.setAttribute("text-anchor", "middle");
          text.setAttribute("fill", "#fff");
          text.setAttribute("font-size", "10px");
          text.setAttribute("font-weight", "bold");
          
          let labelText = node.label;
          if (labelText === "Start" && currentLang === "vi") {
            labelText = "Đầu";
          }
          text.textContent = labelText;
          g.appendChild(text);

          svg.appendChild(g);
        });
      }

      function renderTable() {
        const tbody = document.getElementById("dj-table-body");
        tbody.innerHTML = "";

        const order = ["a", "b", "fin"];
        order.forEach(n => {
          const row = document.createElement("tr");
          if (activeNode === n) {
            row.style.background = "rgba(217, 119, 6, 0.2)";
          }

          const val = costs[n] === Infinity ? "∞" : costs[n];
          let parent = parents[n] ? parents[n].toUpperCase() : "-";
          if (parent === "START" && currentLang === "vi") {
            parent = "ĐẦU";
          }
          
          row.innerHTML = `
            <td style="font-weight:bold;">${n.toUpperCase()}</td>
            <td>${val}</td>
            <td>${parent}</td>
          `;
          tbody.appendChild(row);
        });
      }

      function initDijkstra() {
        costs = { a: 6, b: 2, fin: Infinity };
        parents = { a: "start", b: "start", fin: null };
        processed.clear();
        finished = false;
        stepCount = 0;
        activeNode = null;

        document.getElementById("dj-status").innerHTML = t("simDj_statusStart");
        renderGraph();
        renderTable();
      }

      function findLowestCostNode() {
        let lowestCost = Infinity;
        let lowestNode = null;
        for (let node in costs) {
          let cost = costs[node];
          if (cost < lowestCost && !processed.has(node)) {
            lowestCost = cost;
            lowestNode = node;
          }
        }
        return lowestNode;
      }

      function stepDijkstra() {
        if (finished) return;
        stepCount++;

        const node = findLowestCostNode();
        activeNode = node;

        if (node === null) {
          finished = true;
          let path = ["FIN"];
          let curr = "fin";
          while (parents[curr]) {
            let pName = parents[curr].toUpperCase();
            if (pName === "START" && currentLang === "vi") {
              pName = "ĐẦU";
            }
            path.push(pName);
            curr = parents[curr];
          }
          path.reverse();
          document.getElementById("dj-status").innerHTML = t("simDj_statusCompleted", {
            path: path.join(" ➔ "),
            cost: costs.fin
          });
          activeNode = null;
          renderGraph();
          renderTable();
          return;
        }

        const cost = costs[node];
        let neighbors = {};
        if (node === "a") neighbors = { fin: 1 };
        if (node === "b") neighbors = { a: 3, fin: 5 };

        let logs = [];
        logs.push(t("simDj_statusStep", { step: stepCount, node: node.toUpperCase(), cost }));

        for (let n in neighbors) {
          let newCost = cost + neighbors[n];
          if (newCost < costs[n]) {
            costs[n] = newCost;
            parents[n] = node;
            logs.push(t("simDj_statusUpdate", { n, newCost, node }));
          } else {
            logs.push(t("simDj_statusNoUpdate", { n, node, newCost, cost: costs[n] }));
          }
        }

        processed.add(node);
        document.getElementById("dj-status").innerHTML = logs.join("<br>");
        
        renderGraph();
        renderTable();
      }

      document.getElementById("dj-btn-reset").addEventListener("click", initDijkstra);
      document.getElementById("dj-btn-step").addEventListener("click", stepDijkstra);

      initDijkstra();
    }
  },

  // CHAPTER 12: K-NEAREST NEIGHBORS (KNN)
  12: {
    init: function(container) {
      container.innerHTML = `
        <div class="sim-wrapper">
          <h3>${t("simKnn_title")}</h3>
          <p class="sim-desc">${t("simKnn_desc")}</p>

          <div class="sim-controls">
            <label>${t("simKnn_kVal")}</label>
            <select id="knn-k-val" style="background:#1e293b; color:#fff; border:1px solid #475569; border-radius:4px; padding: 2px 5px;">
              <option value="1">K = 1</option>
              <option value="3" selected>K = 3</option>
              <option value="5">K = 5</option>
            </select>
            <button id="knn-btn-clear" class="btn btn-primary">${t("simKnn_btnClear")}</button>
          </div>

          <div style="display: flex; gap: 20px; margin-top: 15px; flex-wrap: wrap;">
            <div style="flex: 1.2; min-width: 280px; position:relative;">
              <canvas id="knn-canvas" width="300" height="220" style="background:#0f172a; border-radius:8px; border:1px solid #1e293b; width:100%; cursor:crosshair;"></canvas>
              <div style="display:flex; justify-content:space-between; font-size:11px; color:#64748b; padding:2px 5px;">
                <span>${t("simKnn_sweetnessLabel")}</span>
                <span>${t("simKnn_sizeLabel")}</span>
              </div>
            </div>
            
            <div style="flex: 0.8; min-width: 220px;">
              <h5>${t("simKnn_legendTitle")}</h5>
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:5px; font-size:12px;">
                <span style="display:inline-block; width:12px; height:12px; border-radius:50%; background:#ef4444;"></span> ${t("simKnn_legendOrange")}
                <span style="display:inline-block; width:12px; height:12px; border-radius:50%; background:#10b981; margin-left: 15px;"></span> ${t("simKnn_legendApple")}
              </div>
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:15px; font-size:12px;">
                <span style="display:inline-block; width:12px; height:12px; border-radius:50%; border:2px dashed #fbbf24; background:transparent;"></span> ${t("simKnn_legendTest")}
              </div>
              
              <h5>${t("simKnn_resultTitle")}</h5>
              <div id="knn-status" class="sim-status-box" style="height: 100px; font-size: 13px;">
                ${t("simKnn_statusInit")}
              </div>
            </div>
          </div>
        </div>
      `;

      const dataPoints = [
        { x: 50, y: 170, type: "orange" },
        { x: 70, y: 150, type: "orange" },
        { x: 90, y: 180, type: "orange" },
        { x: 110, y: 130, type: "orange" },
        { x: 60, y: 110, type: "orange" },
        { x: 130, y: 160, type: "orange" },

        { x: 180, y: 60, type: "apple" },
        { x: 200, y: 80, type: "apple" },
        { x: 220, y: 50, type: "apple" },
        { x: 240, y: 90, type: "apple" },
        { x: 260, y: 40, type: "apple" },
        { x: 160, y: 100, type: "apple" }
      ];

      let testPoint = null;
      const canvas = document.getElementById("knn-canvas");
      const ctx = canvas.getContext("2d");

      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw axis markers (grid lines)
        ctx.strokeStyle = "#1e293b";
        ctx.lineWidth = 1;
        for (let i = 50; i < canvas.width; i += 50) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i, canvas.height);
          ctx.stroke();
        }
        for (let j = 50; j < canvas.height; j += 50) {
          ctx.beginPath();
          ctx.moveTo(0, j);
          ctx.lineTo(canvas.width, j);
          ctx.stroke();
        }

        // Draw training points
        dataPoints.forEach(pt => {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 6, 0, 2 * Math.PI);
          ctx.fillStyle = pt.type === "orange" ? "#ef4444" : "#10b981"; 
          ctx.fill();
          ctx.strokeStyle = "#fff";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        });

        // Draw test point if exists
        if (testPoint) {
          const kVal = parseInt(document.getElementById("knn-k-val").value) || 3;
          const distances = dataPoints.map(pt => {
            let dist = Math.sqrt((pt.x - testPoint.x)**2 + (pt.y - testPoint.y)**2);
            return { pt, dist };
          });

          // Sort by distance
          distances.sort((a, b) => a.dist - b.dist);
          const nearest = distances.slice(0, kVal);

          // Draw lines to nearest
          ctx.strokeStyle = "rgba(251, 191, 36, 0.4)";
          ctx.lineWidth = 1.5;
          ctx.setLineDash([3, 3]);
          nearest.forEach(n => {
            ctx.beginPath();
            ctx.moveTo(testPoint.x, testPoint.y);
            ctx.lineTo(n.pt.x, n.pt.y);
            ctx.stroke();
          });
          ctx.setLineDash([]); 

          // Draw the test point
          ctx.beginPath();
          ctx.arc(testPoint.x, testPoint.y, 8, 0, 2 * Math.PI);
          ctx.fillStyle = "#fbbf24"; 
          ctx.fill();
          ctx.strokeStyle = "#fff";
          ctx.lineWidth = 2;
          ctx.stroke();

          // Classify
          let orangeCount = nearest.filter(n => n.pt.type === "orange").length;
          let appleCount = nearest.filter(n => n.pt.type === "apple").length;
          
          let winner = orangeCount > appleCount ? t("simKnn_orange") : t("simKnn_apple");
          let winnerColor = orangeCount > appleCount ? "#ef4444" : "#10b981";

          document.getElementById("knn-status").innerHTML = t("simKnn_statusResult", {
            sweet: Math.round(testPoint.x),
            size: Math.round(220 - testPoint.y),
            kVal,
            oranges: orangeCount,
            apples: appleCount,
            winner,
            color: winnerColor
          });
        }
      }

      function handleCanvasClick(e) {
        const rect = canvas.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
        const y = ((e.clientY - rect.top) / rect.height) * canvas.height;
        testPoint = { x, y };
        draw();
      }

      canvas.addEventListener("mousedown", handleCanvasClick);
      document.getElementById("knn-k-val").addEventListener("change", draw);
      document.getElementById("knn-btn-clear").addEventListener("click", () => {
        testPoint = null;
        document.getElementById("knn-status").innerText = t("simKnn_clearStatus");
        draw();
      });

      draw();
    }
  }
};
