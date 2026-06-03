// Simulators for Grokking Algorithms
window.GrokkingSimulators = {
  // CHAPTER 1: BINARY SEARCH
  1: {
    init: function(container) {
      container.innerHTML = `
        <div class="sim-wrapper">
          <h3>Mô phỏng Tìm kiếm nhị phân (Binary Search)</h3>
          <p class="sim-desc">Nhập số cần tìm hoặc chọn ngẫu nhiên một số từ mảng. Nhấn nút "Bước tiếp" để xem thuật toán thu hẹp phạm vi tìm kiếm.</p>
          
          <div class="sim-controls">
            <label>Số cần tìm: </label>
            <input type="number" id="bs-target" value="47" min="10" max="99" style="width: 60px;">
            <button id="bs-btn-start" class="btn btn-primary">Khởi tạo lại</button>
            <button id="bs-btn-step" class="btn btn-accent">Bước tiếp (Step)</button>
          </div>

          <div id="bs-array-container" class="array-visualizer"></div>
          
          <div id="bs-status" class="sim-status-box">
            <strong>Trạng thái:</strong> Nhấn "Bước tiếp" để bắt đầu tìm kiếm.
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
        document.getElementById("bs-status").innerHTML = `
          <strong>Trạng thái:</strong> Bắt đầu tìm kiếm số <strong>${target}</strong> trong mảng 14 phần tử.<br>
          Phạm vi tìm kiếm hiện tại: từ chỉ số <strong>${low}</strong> đến <strong>${high}</strong> (toàn bộ mảng).
        `;
        renderArray();
      }

      function stepSearch() {
        if (finished) return;
        
        stepCount++;
        if (low > high) {
          document.getElementById("bs-status").innerHTML = `
            <strong>Kết quả:</strong> Không tìm thấy giá trị <strong>${target}</strong> trong mảng!<br>
            Thuật toán kết thúc sau <strong>${stepCount}</strong> bước vì <code>low > high</code>.
          `;
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
          document.getElementById("bs-status").innerHTML = `
            <strong style="color:#10b981;">Tìm thấy!</strong> Số <strong>${target}</strong> nằm ở chỉ số <strong>${mid}</strong>.<br>
            Hoàn thành trong <strong>${stepCount}</strong> bước bước so sánh!
          `;
          renderArray();
        } else if (guess > target) {
          document.getElementById("bs-status").innerHTML = `
            <strong>Bước ${stepCount}:</strong> 
            So sánh phần tử giữa <code>mid = ${mid}</code> (giá trị <code>${guess}</code>) với target <code>${target}</code>.<br>
            Vì <code>${guess} > ${target}</code>, target nằm ở nửa bên trái. 
            Cập nhật <code>high = mid - 1 = ${mid - 1}</code>.
          `;
          high = mid - 1;
        } else {
          document.getElementById("bs-status").innerHTML = `
            <strong>Bước ${stepCount}:</strong> 
            So sánh phần tử giữa <code>mid = ${mid}</code> (giá trị <code>${guess}</code>) với target <code>${target}</code>.<br>
            Vì <code>${guess} < ${target}</code>, target nằm ở nửa bên phải. 
            Cập nhật <code>low = mid + 1 = ${mid + 1}</code>.
          `;
          low = mid + 1;
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
          <h3>Mô phỏng Mảng vs Danh sách liên kết & Sắp xếp chọn</h3>
          
          <div class="tabs-control">
            <button id="tab-mem" class="tab-btn active">Bộ nhớ (Mảng vs DS liên kết)</button>
            <button id="tab-sort" class="tab-btn">Sắp xếp chọn (Selection Sort)</button>
          </div>

          <div id="sim-mem-view" class="tab-content active">
            <p class="sim-desc"><strong>Mảng (Array):</strong> Các phần tử xếp liền kề nhau. Truy cập ngẫu nhiên <code>O(1)</code> bằng cách cộng chỉ số. Thêm/Xóa chậm vì phải dịch chuyển.</p>
            <div class="memory-grid" id="array-mem-grid"></div>

            <p class="sim-desc" style="margin-top:20px;"><strong>Danh sách liên kết (Linked List):</strong> Các phần tử nằm rải rác. Mỗi phần tử trỏ tới phần tử tiếp theo. Thêm/Xóa <code>O(1)</code> bằng cách sửa con trỏ. Truy cập ngẫu nhiên chậm <code>O(n)</code>.</p>
            <div class="memory-grid" id="list-mem-grid"></div>
          </div>

          <div id="sim-sort-view" class="tab-content">
            <p class="sim-desc">Bấm "Bước tiếp" để thuật toán tìm phần tử nhỏ nhất trong mảng chưa sắp xếp, loại bỏ nó và đẩy sang mảng kết quả.</p>
            <div class="sim-controls">
              <button id="ss-btn-reset" class="btn btn-primary">Khởi tạo lại</button>
              <button id="ss-btn-step" class="btn btn-accent">Bước tiếp (Step)</button>
            </div>
            
            <div class="sort-visualizer-container">
              <div>
                <h5>Mảng chưa sắp xếp:</h5>
                <div id="ss-unsorted" class="array-visualizer"></div>
              </div>
              <div style="margin-top:20px;">
                <h5>Mảng đã sắp xếp:</h5>
                <div id="ss-sorted" class="array-visualizer" style="min-height:50px;"></div>
              </div>
            </div>

            <div id="ss-status" class="sim-status-box" style="margin-top:15px;">
              <strong>Trạng thái:</strong> Bấm "Bước tiếp" để bắt đầu sắp xếp chọn.
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
            cell.innerText = "Trống";
          }
          arrGrid.appendChild(cell);
        }

        // Linked list: scattered slots
        const listPositions = [1, 6, 3, 5]; // Node index in list: 0->1, 1->6, 2->3, 3->5
        const listValues = ["A", "B", "C", "D"];
        const nextPtr = [3, 5, 6, -1]; // A(slot 1) points to C(slot 3), C points to B(slot 6), B points to D(slot 5), D points to null(-1)
        
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
            cell.innerText = "Trống";
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
      let state = "search"; // "search" or "move"

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
        document.getElementById("ss-status").innerHTML = `
          <strong>Trạng thái:</strong> Bắt đầu sắp xếp mảng <code>[${originalArray.join(", ")}]</code>. <br>Bấm "Bước tiếp" để tìm phần tử nhỏ nhất.
        `;
        renderSortVisualizer();
      }

      function stepSort() {
        if (unsorted.length === 0) {
          document.getElementById("ss-status").innerHTML = `
            <strong style="color:#10b981;">Hoàn thành!</strong> Mảng đã được sắp xếp tăng dần: <code>[${sorted.join(", ")}]</code>.
          `;
          return;
        }

        if (state === "search") {
          if (checkIdx === -1) {
            // Start searching smallest
            currentSmallestIdx = 0;
            checkIdx = 1;
            document.getElementById("ss-status").innerHTML = `
              <strong>Đang tìm kiếm:</strong> Khởi tạo phần tử nhỏ nhất là <code>${unsorted[0]}</code> ở chỉ số 0. So sánh với các phần tử tiếp theo...
            `;
          } else if (checkIdx < unsorted.length) {
            if (unsorted[checkIdx] < unsorted[currentSmallestIdx]) {
              document.getElementById("ss-status").innerHTML = `
                So sánh <code>${unsorted[checkIdx]}</code> với phần tử nhỏ nhất hiện tại là <code>${unsorted[currentSmallestIdx]}</code>.<br>
                Vì <code>${unsorted[checkIdx]} < ${unsorted[currentSmallestIdx]}</code>, cập nhật phần tử nhỏ nhất là <code>${unsorted[checkIdx]}</code> (chỉ số <code>${checkIdx}</code>).
              `;
              currentSmallestIdx = checkIdx;
            } else {
              document.getElementById("ss-status").innerHTML = `
                So sánh <code>${unsorted[checkIdx]}</code> với phần tử nhỏ nhất hiện tại là <code>${unsorted[currentSmallestIdx]}</code>.<br>
                Vì lớn hơn hoặc bằng, giữ nguyên.
              `;
            }
            checkIdx++;
          }

          if (checkIdx >= unsorted.length) {
            // Finished searching for this round
            state = "move";
          }
        } else if (state === "move") {
          const val = unsorted[currentSmallestIdx];
          document.getElementById("ss-status").innerHTML = `
            <strong>Di chuyển:</strong> Phần tử nhỏ nhất tìm được là <code>${val}</code>.<br>
            Loại bỏ khỏi mảng chưa sắp xếp và đẩy vào cuối mảng kết quả.
          `;
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
          <h3>Mô phỏng Ngăn xếp Đệ quy (Recursion Call Stack)</h3>
          <p class="sim-desc">Tính toán Giai thừa của 4: <code>factorial(4) = 4 * 3 * 2 * 1 = 24</code>.<br>
          Bấm "Bước tiếp" để xem các tầng hàm được đẩy vào (Push) và lấy ra (Pop) khỏi Ngăn xếp cuộc gọi.</p>

          <div class="sim-controls">
            <button id="rec-btn-reset" class="btn btn-primary">Khởi tạo lại</button>
            <button id="rec-btn-step" class="btn btn-accent">Bước tiếp (Step)</button>
          </div>

          <div style="display: flex; gap: 20px; margin-top: 15px; flex-wrap: wrap;">
            <div style="flex: 1; min-width: 250px;">
              <h5>Ngăn xếp Cuộc gọi (Call Stack):</h5>
              <div id="rec-stack" class="stack-visualizer"></div>
            </div>
            
            <div style="flex: 1; min-width: 250px;">
              <h5>Bảng biến trạng thái:</h5>
              <div id="rec-status" class="sim-status-box" style="height: calc(100% - 30px); display: flex; align-items: center; justify-content: center; text-align: left;">
                Nhấn "Bước tiếp" để bắt đầu thực thi factorial(4).
              </div>
            </div>
          </div>
        </div>
      `;

      let stack = [];
      let currentVal = 4;
      let phase = "push"; // "push" or "pop"
      let result = 1;
      let step = 0;

      function renderStack() {
        const stackDiv = document.getElementById("rec-stack");
        stackDiv.innerHTML = "";
        
        if (stack.length === 0) {
          stackDiv.innerHTML = `<div style="text-align:center; padding: 20px; color:#555;">[Ngăn xếp rỗng]</div>`;
          return;
        }

        // Draw from top to bottom (LIFO style, so latest on top)
        for (let i = stack.length - 1; i >= 0; i--) {
          const frame = document.createElement("div");
          frame.className = "stack-frame";
          frame.innerHTML = `
            <div class="frame-title">${stack[i].name}</div>
            <div class="frame-vars">Biến x = ${stack[i].x}</div>
            ${stack[i].retVal !== undefined ? `<div class="frame-ret">Trả về = ${stack[i].retVal}</div>` : ""}
          `;
          // Highlight top element
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
        document.getElementById("rec-status").innerHTML = `
          <strong>Trạng thái ban đầu:</strong><br>
          Lệnh gọi đầu tiên: <code>factorial(4)</code>. <br>Hệ thống bắt đầu tạo khung ngăn xếp cho hàm này.
        `;
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
            document.getElementById("rec-status").innerHTML = `
              <strong>Bước ${step} (Đệ quy đi xuống - PUSH):</strong><br>
              Gọi hàm <code>factorial(${currentVal})</code>. <br>
              Vì <code>x > 1</code>, chương trình chạy vào nhánh <em>Recursive Case</em> và gọi tiếp <code>factorial(${currentVal - 1})</code>.<br>
              Một khung ngăn xếp mới được thêm (push) vào đỉnh của Call Stack.
            `;
            currentVal--;
          } else {
            // Reach base case
            stack.push({
              name: `factorial(1)`,
              x: 1,
              retVal: 1
            });
            document.getElementById("rec-status").innerHTML = `
              <strong>Bước ${step} (Đạt Base Case - PUSH):</strong><br>
              Gọi hàm <code>factorial(1)</code>. <br>
              Vì <code>x == 1</code>, điều kiện dừng (Base Case) được thỏa mãn. Hàm trả về ngay kết quả <strong>1</strong> mà không gọi đệ quy tiếp.<br>
              Ngăn xếp đạt độ sâu tối đa. Từ bước sau sẽ bắt đầu quy trình rút gọn ngăn xếp (Pop).
            `;
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
              
              document.getElementById("rec-status").innerHTML = `
                <strong>Bước ${step} (Quay lui giải phóng - POP):</strong><br>
                Hàm <code>${topFrame.name}</code> đã hoàn thành và trả về giá trị <strong>${prevResult}</strong>. Nó bị lấy ra (pop) khỏi ngăn xếp.<br>
                Dữ liệu trả về được nhân vào tham số của hàm nằm dưới: <code>factorial(${nextFrame.x})</code>.<br>
                Kết quả tích lũy: <code>${prevResult} * ${nextFrame.x} = ${result}</code>.
              `;
            } else {
              // Final pop
              document.getElementById("rec-status").innerHTML = `
                <strong>Bước ${step} (Hoàn thành - POP):</strong><br>
                Hàm cuối cùng <code>factorial(4)</code> được giải phóng.<br>
                Kết quả cuối cùng thu được là: <strong style="font-size: 18px; color: #10b981;">${result}</strong>.<br>
                Call Stack trống hoàn toàn.
              `;
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
          <h3>Mô phỏng Bảng băm & Va chạm (Hash Collisions)</h3>
          <p class="sim-desc">Nhập khóa (key) và giá trị (value) để chèn vào Bảng băm kích thước N=8.<br>
          Hàm băm đơn giản: <code>Index = (Tổng mã ASCII của ký tự) % 8</code>. Nếu 2 key trùng Index sẽ tạo ra <strong>Danh sách liên kết (Collision)</strong>.</p>
          
          <div class="sim-controls">
            <input type="text" id="hash-key" placeholder="Key (ví dụ: apple)" style="width: 130px;">
            <input type="text" id="hash-val" placeholder="Value (ví dụ: 15$)" style="width: 110px;">
            <button id="hash-btn-insert" class="btn btn-accent">Chèn dữ liệu</button>
            <button id="hash-btn-clear" class="btn btn-primary">Xóa bảng</button>
          </div>

          <div style="display: flex; gap: 20px; margin-top: 15px; flex-wrap: wrap;">
            <div style="flex: 1.2; min-width: 280px;">
              <h5>Cấu trúc lưu trữ (Bảng băm kích thước 8):</h5>
              <div id="hash-table-visualizer" class="hash-table-visualizer"></div>
            </div>
            
            <div style="flex: 0.8; min-width: 220px;">
              <h5>Công thức & Log hoạt động:</h5>
              <div id="hash-log" class="sim-status-box" style="height: calc(100% - 30px); font-size:13px; line-height: 1.5; overflow-y:auto; max-height:220px;">
                Chưa có hoạt động. Nhập key và bấm chèn dữ liệu.
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
          
          // Index cell
          const idxCell = document.createElement("div");
          idxCell.className = "hash-idx-cell";
          idxCell.innerText = `Index ${i}`;
          row.appendChild(idxCell);

          // Value chain container
          const chainDiv = document.createElement("div");
          chainDiv.className = "hash-chain-container";

          if (table[i].length === 0) {
            chainDiv.innerHTML = `<span class="hash-empty-slot">Trống</span>`;
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
          logText: `• Chữ '${key}': ${breakdown.join(" + ")} = tổng <strong>${sum}</strong>.<br>• Phép lấy dư: <code>${sum} % 8 = ${index}</code>.`
        };
      }

      function insertData() {
        const keyInput = document.getElementById("hash-key");
        const valInput = document.getElementById("hash-val");
        const key = keyInput.value.trim();
        const value = valInput.value.trim() || "1";

        if (!key) {
          alert("Vui lòng nhập Key!");
          return;
        }

        const res = hashFunction(key);
        const index = res.index;
        
        // Check if key already exists, replace value
        let existingIdx = table[index].findIndex(p => p.key === key);
        let statusText = "";
        
        if (existingIdx !== -1) {
          table[index][existingIdx].value = value;
          statusText = `<span style="color:#f59e0b;">Cập nhật:</span> Key <strong>${key}</strong> đã tồn tại. Thay thế giá trị thành <strong>${value}</strong> tại index ${index}.`;
        } else {
          table[index].push({ key, value });
          if (table[index].length > 1) {
            statusText = `<span style="color:#ef4444;">Va chạm (Collision)!</span> Index ${index} đã có dữ liệu. Đã thêm <strong>${key}</strong> vào cuối danh sách liên kết của index ${index}.`;
          } else {
            statusText = `<span style="color:#10b981;">Thành công:</span> Thêm cặp <code>${key}: ${value}</code> vào ô trống index ${index}.`;
          }
        }

        document.getElementById("hash-log").innerHTML = `
          <strong>Tính toán Hash:</strong><br>
          ${res.logText}<br><br>
          <strong>Hành động:</strong><br>
          ${statusText}
        `;

        keyInput.value = "";
        valInput.value = "";
        renderTable();
      }

      function clearTable() {
        table = Array(8).fill(null).map(() => []);
        document.getElementById("hash-log").innerText = "Đã dọn dẹp bảng băm.";
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
          <h3>Mô phỏng Tìm kiếm theo chiều rộng (Breadth-First Search)</h3>
          <p class="sim-desc">Mục tiêu: Tìm người bán xoài (tên kết thúc bằng chữ <strong>'m'</strong>) xuất phát từ bạn (<strong>You</strong>). BFS đảm bảo tìm ra người bán xoài gần bạn nhất trong mạng lưới bạn bè.</p>
          
          <div class="sim-controls">
            <button id="bfs-btn-reset" class="btn btn-primary">Khởi tạo lại</button>
            <button id="bfs-btn-step" class="btn btn-accent">Bước tiếp (Step)</button>
          </div>

          <div style="display: flex; gap: 20px; margin-top: 15px; flex-wrap: wrap;">
            <div style="flex: 1.2; min-width: 280px; position:relative;">
              <h5>Mạng lưới Bạn bè (Graph):</h5>
              <div id="bfs-graph-svg-container" style="background:#0f172a; border-radius: 8px; border:1px solid #1e293b; height: 280px;">
                <svg id="bfs-svg" width="100%" height="100%" style="overflow: visible;"></svg>
              </div>
            </div>
            
            <div style="flex: 0.8; min-width: 220px;">
              <h5>Hàng đợi BFS (Queue) & Trạng thái:</h5>
              <div style="margin-bottom: 10px;">
                <strong>Queue (FIFO):</strong>
                <div id="bfs-queue-visualizer" class="queue-visualizer"></div>
              </div>
              <div id="bfs-status" class="sim-status-box" style="height: 140px; overflow-y: auto; font-size: 13px;">
                Nhấn "Bước tiếp" để bắt đầu đẩy bạn bè của bạn vào hàng đợi.
              </div>
            </div>
          </div>
        </div>
      `;

      // Graph node layout positions
      const nodes = {
        you: { x: 50, y: 140, label: "You", status: "unvisited" },
        alice: { x: 150, y: 50, label: "Alice", status: "unvisited" },
        bob: { x: 150, y: 140, label: "Bob", status: "unvisited" },
        claire: { x: 150, y: 230, label: "Claire", status: "unvisited" },
        peggy: { x: 270, y: 50, label: "Peggy", status: "unvisited" },
        anuj: { x: 270, y: 120, label: "Anuj", status: "unvisited" },
        thom: { x: 270, y: 200, label: "Thom", status: "unvisited" }, // Mango seller ('m' ends)
        jonny: { x: 270, y: 260, label: "Jonny", status: "unvisited" }
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

        // Render edges (lines with arrows)
        // Set up marker arrow definition
        const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        defs.innerHTML = `
          <marker id="arrow" viewBox="0 0 10 10" refX="20" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#475569" />
          </marker>
        `;
        svg.appendChild(defs);

        edges.forEach(edge => {
          const fromNode = nodes[edge.from];
          const toNode = nodes[edge.to];
          const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
          line.setAttribute("x1", `${fromNode.x}%`);
          line.setAttribute("y1", fromNode.y);
          line.setAttribute("x2", `${toNode.x}%`);
          line.setAttribute("y2", toNode.y);
          line.setAttribute("stroke", "#475569");
          line.setAttribute("stroke-width", "2");
          line.setAttribute("marker-end", "url(#arrow)");
          svg.appendChild(line);
        });

        // Render nodes (circles)
        Object.keys(nodes).forEach(key => {
          const node = nodes[key];
          const g = document.createElementNS("http://www.w3.org/2000/svg", "g");

          const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          circle.setAttribute("cx", `${node.x}%`);
          circle.setAttribute("cy", node.y);
          circle.setAttribute("r", "20");
          
          // Color based on status
          let fillColor = "#1e293b";
          let strokeColor = "#64748b";
          if (node.status === "visiting") {
            fillColor = "#0284c7"; // sky-600
            strokeColor = "#38bdf8";
          } else if (node.status === "searched") {
            fillColor = "#334155";
            strokeColor = "#475569";
          } else if (node.status === "found") {
            fillColor = "#16a34a"; // green-600
            strokeColor = "#4ade80";
          }
          if (key === activeNode && node.status !== "found") {
            fillColor = "#d97706"; // amber-600
            strokeColor = "#fbbf24";
          }

          circle.setAttribute("fill", fillColor);
          circle.setAttribute("stroke", strokeColor);
          circle.setAttribute("stroke-width", "3");
          g.appendChild(circle);

          // Node Text Label
          const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
          text.setAttribute("x", `${node.x}%`);
          text.setAttribute("y", node.y + 5);
          text.setAttribute("text-anchor", "middle");
          text.setAttribute("fill", "#fff");
          text.setAttribute("font-size", "11px");
          text.setAttribute("font-weight", "bold");
          text.textContent = node.label;
          g.appendChild(text);

          svg.appendChild(g);
        });
      }

      function renderQueue() {
        const qDiv = document.getElementById("bfs-queue-visualizer");
        qDiv.innerHTML = "";
        
        if (queue.length === 0) {
          qDiv.innerHTML = `<span style="font-size:12px;color:#475569;padding:5px;">Hàng đợi rỗng</span>`;
          return;
        }

        queue.forEach(item => {
          const qNode = document.createElement("div");
          qNode.className = "queue-item";
          qNode.innerText = nodes[item].label;
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
        
        // Start state
        nodes.you.status = "searched";
        searched.add("you");
        queue.push("alice", "bob", "claire");
        queue.forEach(n => nodes[n].status = "visiting");

        document.getElementById("bfs-status").innerHTML = `
          <strong>Trạng thái ban đầu:</strong><br>
          Bạn được đánh dấu đã duyệt. Thêm bạn bè trực tiếp của bạn vào hàng đợi: <strong>Alice, Bob, Claire</strong>.
        `;
        renderGraph();
        renderQueue();
      }

      function stepBFS() {
        if (finished) return;
        stepCount++;

        if (queue.length === 0) {
          document.getElementById("bfs-status").innerHTML = `
            <strong>Kết quả:</strong> Đã duyệt toàn bộ đồ thị mà không tìm thấy người bán xoài nào!
          `;
          finished = true;
          return;
        }

        // Pop from queue
        let current = queue.shift();
        activeNode = current;
        renderQueue();

        const person = nodes[current];
        // Check if mango seller
        if (person.label.endsWith("m")) {
          person.status = "found";
          finished = true;
          document.getElementById("bfs-status").innerHTML = `
            <strong>Bước ${stepCount}:</strong> Lấy <strong>${person.label}</strong> ra khỏi hàng đợi.<br>
            <span style="color:#10b981; font-weight:bold;">Tìm thấy người bán xoài!</span> Tên "${person.label}" kết thúc bằng chữ 'm'.<br>
            Hoàn thành tìm kiếm!
          `;
        } else {
          person.status = "searched";
          searched.add(current);

          // Get neighbors
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

          let addedText = added.length > 0 ? `Thêm bạn bè của họ chưa duyệt vào hàng đợi: <strong>${added.join(", ")}</strong>` : "Không có bạn bè mới cần thêm.";
          document.getElementById("bfs-status").innerHTML = `
            <strong>Bước ${stepCount}:</strong> Lấy <strong>${person.label}</strong> ra khỏi hàng đợi và kiểm tra.<br>
            Không phải người bán xoài. ${addedText}
          `;
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
          <h3>Mô phỏng Thuật toán Dijkstra</h3>
          <p class="sim-desc">Tìm đường đi ngắn nhất từ nút <strong>Start</strong> đến nút <strong>Fin</strong>. Cạnh có số thể hiện trọng số (chi phí).</p>
          
          <div class="sim-controls">
            <button id="dj-btn-reset" class="btn btn-primary">Khởi tạo lại</button>
            <button id="dj-btn-step" class="btn btn-accent">Bước tiếp (Step)</button>
          </div>

          <div style="display: flex; gap: 20px; margin-top: 15px; flex-wrap: wrap;">
            <div style="flex: 1.1; min-width: 280px;">
              <h5>Đồ thị & Trọng số (SVG):</h5>
              <div style="background:#0f172a; border-radius: 8px; border:1px solid #1e293b; height: 200px;">
                <svg id="dj-svg" width="100%" height="100%" style="overflow: visible;"></svg>
              </div>
            </div>
            
            <div style="flex: 0.9; min-width: 220px;">
              <h5>Bảng chi phí (Costs Table):</h5>
              <table class="sim-table">
                <thead>
                  <tr>
                    <th>Nút</th>
                    <th>Chi phí từ Start</th>
                    <th>Nút cha</th>
                  </tr>
                </thead>
                <tbody id="dj-table-body">
                </tbody>
              </table>
              <div id="dj-status" class="sim-status-box" style="margin-top: 10px; font-size:12px;">
                Bấm "Bước tiếp" để bắt đầu thuật toán.
              </div>
            </div>
          </div>
        </div>
      `;

      // Dijkstra Graph nodes
      const nodes = {
        start: { x: 10, y: 100, label: "Start" },
        a: { x: 50, y: 40, label: "A" },
        b: { x: 50, y: 160, label: "B" },
        fin: { x: 90, y: 100, label: "Fin" }
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

        // Render arrow markers
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
          line.setAttribute("x1", `${fromNode.x}%`);
          line.setAttribute("y1", fromNode.y);
          line.setAttribute("x2", `${toNode.x}%`);
          line.setAttribute("y2", toNode.y);
          
          // Draw bold green line if it is part of final short path
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
          text.setAttribute("x", `${midX}%`);
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
          circle.setAttribute("cx", `${node.x}%`);
          circle.setAttribute("cy", node.y);
          circle.setAttribute("r", "18");
          
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
          circle.setAttribute("stroke-width", "3");
          g.appendChild(circle);

          const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
          text.setAttribute("x", `${node.x}%`);
          text.setAttribute("y", node.y + 4);
          text.setAttribute("text-anchor", "middle");
          text.setAttribute("fill", "#fff");
          text.setAttribute("font-size", "10px");
          text.setAttribute("font-weight", "bold");
          text.textContent = node.label;
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
          
          // Add highlight class if it is the current processed node
          if (activeNode === n) {
            row.style.background = "rgba(217, 119, 6, 0.2)";
          }

          const val = costs[n] === Infinity ? "∞" : costs[n];
          const parent = parents[n] ? parents[n].toUpperCase() : "-";
          
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

        document.getElementById("dj-status").innerHTML = `
          <strong>Khởi tạo:</strong> Đã cập nhật chi phí ban đầu từ Start:<br>
          • Đi tới A tốn <strong>6</strong><br>
          • Đi tới B tốn <strong>2</strong><br>
          • Đi tới Fin tốn <strong>vô cùng (∞)</strong>
        `;
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
          // Reconstruct short path
          let path = ["FIN"];
          let curr = "fin";
          while (parents[curr]) {
            path.push(parents[curr].toUpperCase());
            curr = parents[curr];
          }
          path.reverse();
          document.getElementById("dj-status").innerHTML = `
            <strong>Hoàn thành!</strong> Đã xử lý tất cả các nút.<br>
            Đường đi ngắn nhất: <strong style="color:#10b981;">${path.join(" ➔ ")}</strong> với tổng chi phí = <strong>${costs.fin}</strong>.
          `;
          activeNode = null;
          renderGraph();
          renderTable();
          return;
        }

        const cost = costs[node];
        // Get neighbors of current node
        let neighbors = {};
        if (node === "a") neighbors = { fin: 1 };
        if (node === "b") neighbors = { a: 3, fin: 5 };

        let logs = [];
        logs.push(`<strong>Bước ${stepCount}:</strong> Chọn nút rẻ nhất chưa xử lý là <strong>${node.toUpperCase()}</strong> (chi phí = <strong>${cost}</strong>).`);

        for (let n in neighbors) {
          let newCost = cost + neighbors[n];
          if (newCost < costs[n]) {
            costs[n] = newCost;
            parents[n] = node;
            logs.push(`• Cập nhật chi phí tới <strong>${n.toUpperCase()}</strong>: <code>${newCost}</code> (qua ${node.toUpperCase()}).`);
          } else {
            logs.push(`• Đi tới <strong>${n.toUpperCase()}</strong> qua ${node.toUpperCase()} tốn <code>${newCost}</code> (không tốt hơn chi phí hiện tại <code>${costs[n]}</code>).`);
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
          <h3>Mô phỏng K-Láng giềng gần nhất (KNN)</h3>
          <p class="sim-desc">Click chuột vào vùng bảng đồ thị dưới để tạo một quả <strong>Cam hoặc Táo mới</strong> (tọa độ đại diện cho Độ ngọt và Kích thước). KNN sẽ tìm K điểm gần nhất để phân loại quả đó.</p>

          <div class="sim-controls">
            <label>Giá trị K: </label>
            <select id="knn-k-val" style="background:#1e293b; color:#fff; border:1px solid #475569; border-radius:4px; padding: 2px 5px;">
              <option value="1">K = 1</option>
              <option value="3" selected>K = 3</option>
              <option value="5">K = 5</option>
            </select>
            <button id="knn-btn-clear" class="btn btn-primary">Xóa điểm test</button>
          </div>

          <div style="display: flex; gap: 20px; margin-top: 15px; flex-wrap: wrap;">
            <div style="flex: 1.2; min-width: 280px; position:relative;">
              <canvas id="knn-canvas" width="300" height="220" style="background:#0f172a; border-radius:8px; border:1px solid #1e293b; width:100%; cursor:crosshair;"></canvas>
              <div style="display:flex; justify-content:space-between; font-size:11px; color:#64748b; padding:2px 5px;">
                <span>← Ít ngọt (Độ Ngọt) Nhiều ngọt →</span>
                <span>↑ Quả to (Kích thước)</span>
              </div>
            </div>
            
            <div style="flex: 0.8; min-width: 220px;">
              <h5>Chú giải:</h5>
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:5px; font-size:12px;">
                <span style="display:inline-block; width:12px; height:12px; border-radius:50%; background:#ef4444;"></span> Cam (Orange)
                <span style="display:inline-block; width:12px; height:12px; border-radius:50%; background:#10b981; margin-left: 15px;"></span> Táo (Apple)
              </div>
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:15px; font-size:12px;">
                <span style="display:inline-block; width:12px; height:12px; border-radius:50%; border:2px dashed #fbbf24; background:transparent;"></span> Quả cần đoán
              </div>
              
              <h5>Kết quả phân loại:</h5>
              <div id="knn-status" class="sim-status-box" style="height: 100px; font-size: 13px;">
                Click vào đồ thị bên trái để bắt đầu đoán loại quả.
              </div>
            </div>
          </div>
        </div>
      `;

      // Static dataset of existing fruits (coordinates out of width=300, height=220)
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
          ctx.fillStyle = pt.type === "orange" ? "#ef4444" : "#10b981"; // redish-orange vs green apple
          ctx.fill();
          ctx.strokeStyle = "#fff";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        });

        // Draw test point if exists
        if (testPoint) {
          // Find K nearest
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
          ctx.setLineDash([]); // Reset

          // Draw the test point
          ctx.beginPath();
          ctx.arc(testPoint.x, testPoint.y, 8, 0, 2 * Math.PI);
          ctx.fillStyle = "#fbbf24"; // amber
          ctx.fill();
          ctx.strokeStyle = "#fff";
          ctx.lineWidth = 2;
          ctx.stroke();

          // Classify
          let orangeCount = nearest.filter(n => n.pt.type === "orange").length;
          let appleCount = nearest.filter(n => n.pt.type === "apple").length;
          let winner = orangeCount > appleCount ? "Cam (Orange)" : "Táo (Apple)";
          let winnerColor = orangeCount > appleCount ? "#ef4444" : "#10b981";

          document.getElementById("knn-status").innerHTML = `
            • Tọa độ test: <code>Sweet=${testPoint.x}, Size=${Math.round(220-testPoint.y)}</code>.<br>
            • Kết quả lân cận (K=${kVal}): <br>
            - Cam (Đỏ): <strong>${orangeCount}</strong> quả.<br>
            - Táo (Xanh): <strong>${appleCount}</strong> quả.<br>
            ➔ Phân loại quả này là: <strong style="color:${winnerColor}; font-size:15px;">${winner}</strong>.
          `;
        }
      }

      function handleCanvasClick(e) {
        // Correct for scaling
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
        document.getElementById("knn-status").innerText = "Đã xóa điểm test. Click vào đồ thị để test lại.";
        draw();
      });

      draw();
    }
  }
};
