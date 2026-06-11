// =============================================
// Grokking Algorithms – Interactive Explorer
// Structured Content for VI & EN Languages
// =============================================

// --- Vietnamese Chapter Data ---
const GrokkingDataVI = [
  {
    id: 1,
    title: "Chapter 1: Introduction to Algorithms",
    subtitle: "Giới thiệu về Thuật toán, Tìm kiếm nhị phân & Ký hiệu Big O",
    color: "hsl(354, 85%, 62%)",
    shadow: "rgba(240, 82, 82, 0.4)",
    concepts: [
      {
        name: "Binary Search (Tìm kiếm nhị phân)",
        points: [
          "<strong>Đầu vào (Input):</strong> Một danh sách đã được sắp xếp tăng dần.",
          "<strong>Đầu ra (Output):</strong> Vị trí (index) của phần tử cần tìm, hoặc <code>null</code> nếu không tìm thấy.",
          "<strong>Cách hoạt động:</strong> Mỗi bước so sánh phần tử ở giữa (mid) với giá trị cần tìm để loại bỏ một nửa số phần tử còn lại.",
          "<strong>Hiệu quả:</strong> Cực kỳ nhanh so với Tìm kiếm tuần tự (Simple Search). Với 4 tỷ phần tử, Tìm kiếm tuần tự mất tối đa 4 tỷ bước, trong khi Tìm kiếm nhị phân chỉ mất tối đa 32 bước!"
        ]
      },
      {
        name: "Big O Notation (Ký hiệu O lớn)",
        points: [
          "<strong>Định nghĩa:</strong> Đo lường tốc độ tăng trưởng thời gian chạy (runtime) của thuật toán khi kích thước đầu vào (N) tăng lên.",
          "<strong>Bản chất:</strong> Không đo bằng giây/mili giây, mà đo bằng <em>số lượng phép toán</em> tối đa cần thực hiện.",
          "<strong>Các độ phức tạp phổ biến (từ nhanh đến chậm):</strong>",
          "• <code>O(log n)</code>: Thời gian logarit (ví dụ: Binary Search)",
          "• <code>O(n)</code>: Thời gian tuyến tính (ví dụ: Simple Search)",
          "• <code>O(n log n)</code>: Thời gian tuyến tính nhân logarit (ví dụ: Quicksort trung bình)",
          "• <code>O(n²)</code>: Thời gian bậc hai (ví dụ: Selection Sort)",
          "• <code>O(n!)</code>: Thời gian giai thừa (ví dụ: Bài toán người bán hàng)"
        ]
      }
    ],
    code: {
      python: `def binary_search(list_data, item):
    low = 0
    high = len(list_data) - 1

    while low <= high:
        mid = (low + high) // 2
        guess = list_data[mid]
        if guess == item:
            return mid
        if guess > item:
            high = mid - 1
        else:
            low = mid + 1
    return None

my_list = [1, 3, 5, 7, 9]
print(binary_search(my_list, 3)) # Output: 1
print(binary_search(my_list, -1)) # Output: None`,
      javascript: `function binarySearch(list, item) {
    let low = 0;
    let high = list.length - 1;

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        let guess = list[mid];
        
        if (guess === item) {
            return mid;
        }
        if (guess > item) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return null;
}

const myList = [1, 3, 5, 7, 9];
console.log(binarySearch(myList, 3)); // Output: 1
console.log(binarySearch(myList, -1)); // Output: null`
    },
    quizzes: [
      {
        question: "Đầu vào bắt buộc của thuật toán Tìm kiếm nhị phân là gì?",
        options: [
          "Một mảng chứa các số nguyên dương",
          "Một danh sách đã được sắp xếp thứ tự",
          "Một cây nhị phân cân bằng",
          "Một bảng băm"
        ],
        answer: 1
      },
      {
        question: "Nếu kích thước đầu vào tăng từ 100 lên 10,000 phần tử, số bước tối đa của Tìm kiếm tuần tự O(n) và Tìm kiếm nhị phân O(log n) thay đổi thế nào?",
        options: [
          "Simple Search tăng gấp 100 lần; Binary Search tăng thêm khoảng 7 bước",
          "Cả hai đều tăng gấp 100 lần",
          "Simple Search tăng thêm 100 bước; Binary Search tăng gấp đôi",
          "Không thay đổi số lượng bước"
        ],
        answer: 0
      }
    ]
  },
  {
    id: 2,
    title: "Chapter 2: Selection Sort",
    subtitle: "Cách bộ nhớ hoạt động, Mảng (Arrays), Danh sách liên kết (Linked Lists) & Sắp xếp chọn",
    color: "hsl(28, 95%, 53%)",
    shadow: "rgba(249, 115, 22, 0.4)",
    concepts: [
      {
        name: "Bộ nhớ hoạt động thế nào?",
        points: [
          "Bộ nhớ máy tính giống như một chiếc tủ có rất nhiều ngăn kéo.",
          "Mỗi ngăn kéo có một địa chỉ cụ thể.",
          "Mỗi khi bạn cần lưu dữ liệu, bạn yêu cầu máy tính cấp cho một số ngăn kéo trống để sử dụng."
        ]
      },
      {
        name: "Mảng (Arrays) vs. Danh sách liên kết (Linked Lists)",
        points: [
          "<strong>Mảng (Arrays):</strong> Các phần tử được lưu trữ <em>liền kề nhau</em> trong bộ nhớ.",
          "• Ưu điểm: Truy cập ngẫu nhiên cực nhanh <code>O(1)</code> vì dễ dàng tính toán địa chỉ phần tử thứ i.",
          "• Nhược điểm: Chèn và xóa phần tử rất chậm <code>O(n)</code> vì phải dịch chuyển các phần tử khác, hoặc không đủ ngăn trống liền kề.",
          "<strong>Danh sách liên kết (Linked Lists):</strong> Các phần tử có thể nằm <em>ở bất kỳ đâu</em> trong bộ nhớ. Mỗi phần tử chứa giá trị và địa chỉ (pointer) của phần tử tiếp theo.",
          "• Ưu điểm: Chèn và xóa cực nhanh <code>O(1)</code> chỉ bằng cách đổi con trỏ chỉ tới.",
          "• Nhược điểm: Truy cập ngẫu nhiên chậm <code>O(n)</code> vì phải duyệt từ đầu danh sách để tìm."
        ]
      },
      {
        name: "Selection Sort (Sắp xếp chọn)",
        points: [
          "<strong>Ý tưởng:</strong> Duyệt qua danh sách, tìm phần tử nhỏ nhất (hoặc lớn nhất) rồi chuyển nó vào danh sách mới (hoặc đổi chỗ lên đầu). Lặp lại với các phần tử còn lại.",
          "<strong>Độ phức tạp:</strong> <code>O(n²)</code>. Mỗi lần tìm kiếm mất <code>O(n)</code>, thực hiện <code>n</code> lần nên tổng thời gian là <code>O(n²)</code>."
        ]
      }
    ],
    code: {
      python: `def find_smallest(arr):
    smallest = arr[0]
    smallest_index = 0
    for i in range(1, len(arr)):
        if arr[i] < smallest:
            smallest = arr[i]
            smallest_index = i
    return smallest_index

def selection_sort(arr):
    new_arr = []
    copied_arr = list(arr) # Sao chép mảng tránh thay đổi mảng gốc
    for i in range(len(copied_arr)):
        smallest = find_smallest(copied_arr)
        new_arr.append(copied_arr.pop(smallest))
    return new_arr

print(selection_sort([5, 3, 6, 2, 10])) # Output: [2, 3, 5, 6, 10]`,
      javascript: `function findSmallest(arr) {
    let smallest = arr[0];
    let smallestIndex = 0;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < smallest) {
            smallest = arr[i];
            smallestIndex = i;
        }
    }
    return smallestIndex;
}

function selectionSort(arr) {
    const newArr = [];
    const copiedArr = [...arr];
    const length = copiedArr.length;
    for (let i = 0; i < length; i++) {
        let smallestIndex = findSmallest(copiedArr);
        newArr.push(copiedArr.splice(smallestIndex, 1)[0]);
    }
    return newArr;
}

console.log(selectionSort([5, 3, 6, 2, 10])); // Output: [2, 3, 5, 6, 10]`
    },
    quizzes: [
      {
        question: "Tại sao truy cập ngẫu nhiên phần tử trong Mảng (Array) nhanh hơn trong Danh sách liên kết (Linked List)?",
        options: [
          "Mảng tự động sắp xếp các phần tử của nó",
          "Mảng lưu trữ các phần tử liền kề nhau nên địa chỉ có thể tính toán được ngay lập tức",
          "Danh sách liên kết tốn nhiều RAM hơn",
          "Mảng không chứa con trỏ liên kết"
        ],
        answer: 1
      },
      {
        question: "Độ phức tạp thời gian chạy của thuật toán Sắp xếp chọn (Selection Sort) là bao nhiêu?",
        options: [
          "O(n)",
          "O(n log n)",
          "O(n²)",
          "O(2^n)"
        ],
        answer: 2
      }
    ]
  },
  {
    id: 3,
    title: "Chapter 3: Recursion",
    subtitle: "Đệ quy, Điều kiện dừng (Base Case) & Ngăn xếp cuộc gọi (The Stack)",
    color: "hsl(48, 96%, 53%)",
    shadow: "rgba(234, 179, 8, 0.4)",
    concepts: [
      {
        name: "Đệ quy (Recursion) là gì?",
        points: [
          "Đệ quy là kỹ thuật trong đó một hàm tự gọi lại chính nó.",
          "Giúp viết code ngắn gọn và dễ hiểu hơn đối với một số bài toán có tính lặp cấu trúc (như duyệt cây, thư mục).",
          "Không làm tăng tốc độ chạy của chương trình (thực tế đệ quy thường tốn bộ nhớ và chậm hơn vòng lặp thường một chút)."
        ]
      },
      {
        name: "Base Case (Điều kiện dừng) & Recursive Case",
        points: [
          "Mọi hàm đệ quy bắt buộc phải có 2 phần để không bị lặp vô hạn:",
          "<strong>Base Case (Trường hợp cơ sở / Điều kiện dừng):</strong> Điều kiện mà tại đó hàm dừng tự gọi lại và trả về kết quả cụ thể.",
          "<strong>Recursive Case (Trường hợp đệ quy):</strong> Nơi hàm tiếp tục gọi chính nó với một tham số nhỏ hơn tiến dần về điều kiện dừng."
        ]
      },
      {
        name: "The Call Stack (Ngăn xếp cuộc gọi)",
        points: [
          "Máy tính quản lý các lệnh gọi hàm bằng một Call Stack.",
          "Hoạt động theo nguyên lý <strong>LIFO (Last In, First Out)</strong>: Hàm nào gọi sau cùng sẽ hoàn thành và thoát ra trước.",
          "Mỗi lần hàm đệ quy tự gọi, một khung ngăn xếp (stack frame) mới được đẩy vào bộ nhớ. Nếu đệ quy quá sâu mà không gặp điều kiện dừng, chương trình sẽ lỗi tràn bộ nhớ (<strong>Stack Overflow</strong>)."
        ]
      }
    ],
    code: {
      python: `def countdown(i):
    print(i)
    # Base Case (Điều kiện dừng)
    if i <= 1:
        return
    # Recursive Case (Trường hợp đệ quy)
    else:
        countdown(i - 1)

countdown(3) 
# In ra: 3, sau đó 2, sau đó 1

def fact(x):
    if x == 1:
        return 1
    return x * fact(x - 1)

print(fact(5)) # Output: 120 (5 * 4 * 3 * 2 * 1)`,
      javascript: `function countdown(i) {
    console.log(i);
    // Base Case
    if (i <= 1) {
        return;
    } 
    // Recursive Case
    else {
        countdown(i - 1);
    }
}

countdown(3); // Output: 3 -> 2 -> 1

function fact(x) {
    if (x === 1) {
        return 1;
    }
    return x * fact(x - 1);
}

console.log(fact(5)); // Output: 120`
    },
    quizzes: [
      {
        question: "Điều gì sẽ xảy ra nếu một hàm đệ quy không có Base Case?",
        options: [
          "Chương trình sẽ tự động chuyển đổi thành vòng lặp while",
          "Hàm trả về giá trị null ngay lập tức",
          "Chương trình chạy vô hạn và gây ra lỗi Stack Overflow (tràn ngăn xếp)",
          "Trình biên dịch sẽ báo lỗi cú pháp trước khi chạy"
        ],
        answer: 2
      },
      {
        question: "Cấu trúc dữ liệu nào được sử dụng để quản lý các lệnh gọi hàm trong hệ điều hành/máy tính?",
        options: [
          "Hàng đợi (Queue) - FIFO",
          "Ngăn xếp (Stack) - LIFO",
          "Cây (Tree)",
          "Bảng băm (Hash Table)"
        ],
        answer: 1
      }
    ]
  },
  {
    id: 4,
    title: "Chapter 4: Quicksort",
    subtitle: "Chiến lược Chia để trị (Divide and Conquer) & Thuật toán Quicksort",
    color: "hsl(142, 70%, 45%)",
    shadow: "rgba(34, 197, 94, 0.4)",
    concepts: [
      {
        name: "Divide & Conquer (Chia để trị - D&C)",
        points: [
          "Một phương pháp tư duy giải quyết vấn đề gồm 2 bước:",
          "1. Tìm điều kiện dừng đơn giản nhất (Base Case).",
          "2. Thu nhỏ bài toán gốc cho đến khi nó trở thành điều kiện dừng (Recursive Step).",
          "Ví dụ: Đo đạc một mảnh đất lớn bằng cách chia nó thành các ô vuông có kích thước lớn nhất có thể."
        ]
      },
      {
        name: "Thuật toán Quicksort (Sắp xếp nhanh)",
        points: [
          "Là thuật toán sắp xếp áp dụng D&C, chạy nhanh hơn nhiều so với Selection Sort.",
          "<strong>Các bước thực hiện:</strong>",
          "1. Chọn một phần tử làm <strong>chốt (pivot)</strong> (ví dụ: phần tử đầu tiên, ở giữa hoặc ngẫu nhiên).",
          "2. Phân vùng (Partitioning): Chia mảng thành 2 mảng con: một mảng chứa các phần tử nhỏ hơn pivot, mảng kia chứa các phần tử lớn hơn pivot.",
          "3. Gọi đệ quy Quicksort trên 2 mảng con đó.",
          "<strong>Hiệu quả:</strong> Trung bình chạy với tốc độ <code>O(n log n)</code>. Trường hợp xấu nhất là <code>O(n²)</code> (khi chọn pivot tồi liên tục)."
        ]
      }
    ],
    code: {
      python: `def quicksort(arr):
    if len(arr) < 2:
        return arr # Base Case: Mảng có 0 hoặc 1 phần tử đã được sắp xếp sẵn
    else:
        pivot = arr[0] # Chọn pivot là phần tử đầu
        less = [i for i in arr[1:] if i <= pivot] # Mảng con nhỏ hơn pivot
        greater = [i for i in arr[1:] if i > pivot] # Mảng con lớn hơn pivot
        return quicksort(less) + [pivot] + quicksort(greater)

print(quicksort([10, 5, 2, 3])) # Output: [2, 3, 5, 10]`,
      javascript: `function quicksort(arr) {
    if (arr.length < 2) {
        return arr; // Base Case
    }
    
    let pivot = arr[0]; // Chọn pivot
    let less = [];
    let greater = [];
    
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] <= pivot) {
            less.push(arr[i]);
        } else {
            greater.push(arr[i]);
        }
    }
    
    return [...quicksort(less), pivot, ...quicksort(greater)];
}

console.log(quicksort([10, 5, 2, 3])); // Output: [2, 3, 5, 10]`
    },
    quizzes: [
      {
        question: "Trường hợp xấu nhất O(n²) của Quicksort xảy ra khi nào?",
        options: [
          "Mảng đầu vào đã được sắp xếp sẵn và ta luôn chọn pivot là phần tử đầu hoặc cuối",
          "Mảng đầu vào chứa toàn các giá trị giống nhau",
          "Ta luôn chọn pivot là phần tử trung vị (median)",
          "Khi kích thước mảng là lũy thừa của 2"
        ],
        answer: 0
      },
      {
        question: "Độ phức tạp thời gian chạy trung bình (average-case) của Quicksort là bao nhiêu?",
        options: [
          "O(n)",
          "O(n log n)",
          "O(n²)",
          "O(log n)"
        ],
        answer: 1
      }
    ]
  },
  {
    id: 5,
    title: "Chapter 5: Hash Tables",
    subtitle: "Hàm băm (Hash Functions), Bảng băm & Xử lý va chạm (Collisions)",
    color: "hsl(174, 75%, 41%)",
    shadow: "rgba(20, 184, 166, 0.4)",
    concepts: [
      {
        name: "Hàm băm (Hash Function)",
        points: [
          "Là một hàm nhận vào một chuỗi ký tự (hoặc dữ liệu bất kỳ) và trả về một con số tương ứng.",
          "<strong>Tính chất:</strong>",
          "• Nhất quán: Cùng một chuỗi đầu vào phải luôn cho ra cùng một số đầu ra.",
          "• Không trùng lặp (lý tưởng): Các chuỗi khác nhau nên cho ra các số khác nhau.",
          "• Giới hạn: Trả về số trong phạm vi kích thước của mảng lưu trữ."
        ]
      },
      {
        name: "Bảng băm (Hash Tables / Maps)",
        points: [
          "Kết hợp giữa hàm băm và mảng: Hàm băm sẽ chỉ ra vị trí (chỉ số mảng) chính xác cần lưu trữ hoặc tìm kiếm giá trị.",
          "<strong>Hiệu năng:</strong> Đạt tốc độ <code>O(1)</code> cho cả tìm kiếm, thêm mới và xóa phần tử (cực kỳ nhanh).",
          "<strong>Ứng dụng phổ biến:</strong>",
          "• Tra cứu danh bạ, từ điển.",
          "• Ngăn chặn dữ liệu trùng lặp (ví dụ: danh sách cử tri bầu cử).",
          "• Làm bộ nhớ đệm (Cache) cho máy chủ web."
        ]
      },
      {
        name: "Va chạm (Collisions) & Hệ số tải (Load Factor)",
        points: [
          "<strong>Va chạm:</strong> Khi hai key khác nhau được hàm băm trả về cùng một chỉ số. Cách giải quyết phổ biến là lưu một <em>danh sách liên kết</em> tại chỉ số đó.",
          "<strong>Hệ số tải (Load Factor):</strong> Số lượng phần tử đã lưu chia cho tổng số ô trống của bảng băm.",
          "• Nếu Hệ số tải > 0.7, ta cần mở rộng (resize) bảng băm để tránh va chạm nhiều làm chậm tốc độ xuống <code>O(n)</code>."
        ]
      }
    ],
    code: {
      python: `# Python sử dụng dictionary làm bảng băm
voted = {}

def check_voter(name):
    if voted.get(name):
        print("Kick them out!")
    else:
        voted[name] = True
        print("Let them vote!")

check_voter("tom") # Let them vote!
check_voter("mike") # Let them vote!
check_voter("tom") # Kick them out!`,
      javascript: `// JavaScript sử dụng Object hoặc Map làm bảng băm
const voted = new Map();

function checkVoter(name) {
    if (voted.has(name)) {
        console.log("Kick them out!");
    } else {
        voted.set(name, true);
        console.log("Let them vote!");
    }
}

checkVoter("tom"); // Let them vote!
checkVoter("mike"); // Let them vote!
checkVoter("tom"); // Kick them out!`
    },
    quizzes: [
      {
        question: "Hệ số tải (Load factor) lý tưởng để bắt đầu mở rộng kích thước bảng băm (resizing) là bao nhiêu?",
        options: [
          "Lớn hơn 0.5",
          "Lớn hơn 0.7",
          "Đạt chính xác 1.0",
          "Khi bảng băm đã đầy 100%"
        ],
        answer: 1
      },
      {
        question: "Trong trường hợp xấu nhất khi toàn bộ các key đều bị va chạm và băm vào cùng một ô, tốc độ tra cứu của bảng băm sẽ là bao nhiêu?",
        options: [
          "O(1)",
          "O(log n)",
          "O(n)",
          "O(n²)"
        ],
        answer: 2
      }
    ]
  },
  {
    id: 6,
    title: "Chapter 6: Breadth-First Search",
    subtitle: "Đồ thị (Graphs), Hàng đợi (Queues) & Tìm kiếm theo chiều rộng (BFS)",
    color: "hsl(200, 95%, 48%)",
    shadow: "rgba(14, 165, 233, 0.4)",
    concepts: [
      {
        name: "Đồ thị (Graphs) là gì?",
        points: [
          "Đồ thị dùng để mô hình hóa các mối liên kết hoặc mạng lưới giữa các đối tượng.",
          "Gồm hai thành phần chính:",
          "• <strong>Nút (Nodes / Vertices):</strong> Các đối tượng (ví dụ: con người, địa điểm).",
          "• <strong>Cạnh (Edges):</strong> Mối liên kết giữa các nút. Có hai loại cạnh: Có hướng (Directed) và Vô hướng (Undirected)."
        ]
      },
      {
        name: "Hàng đợi (Queues)",
        points: [
          "Cấu trúc dữ liệu hoạt động theo nguyên tắc <strong>FIFO (First In, First Out)</strong>: Vào trước ra trước.",
          "Chỉ hỗ trợ hai thao tác chính: Thêm vào cuối hàng (Enqueue) và Lấy ra từ đầu hàng (Dequeue)."
        ]
      },
      {
        name: "Breadth-First Search (BFS - Tìm kiếm theo chiều rộng)",
        points: [
          "BFS giúp trả lời 2 câu hỏi chính trên đồ thị vô hướng/có hướng không trọng số:",
          "1. Có đường đi nào từ nút A đến nút B không?",
          "2. Đâu là đường đi ngắn nhất (ít số cạnh nhất) từ nút A đến nút B?",
          "<strong>Cách hoạt động:</strong> Duyệt các nút lân cận gần nhất (bậc 1) trước, rồi mới mở rộng sang các nút xa hơn (bậc 2, bậc 3...). Sử dụng một <strong>Hàng đợi</strong> để lưu trữ thứ tự duyệt và một danh sách đã duyệt để tránh lặp vô hạn."
        ]
      }
    ],
    code: {
      python: `from collections import deque

# Đồ thị biểu diễn bằng Hash Table (kèm danh sách kề)
graph = {}
graph["you"] = ["alice", "bob", "claire"]
graph["bob"] = ["anuj", "peggy"]
graph["alice"] = ["peggy"]
graph["claire"] = ["thom", "jonny"]
graph["anuj"] = []
graph["peggy"] = []
graph["thom"] = []
graph["jonny"] = []

def person_is_seller(name):
    return name[-1] == 'm' # Giả định người bán xoài có tên kết thúc bằng chữ 'm'

def search(name):
    search_queue = deque()
    search_queue += graph[name]
    searched = set() # Tránh kiểm tra trùng lặp dẫn đến lặp vô hạn
    
    while search_queue:
        person = search_queue.popleft()
        if person not in searched:
            if person_is_seller(person):
                print(person + " is a mango seller!")
                return True
            else:
                search_queue += graph[person]
                searched.add(person)
    return False

search("you") # Output: thom is a mango seller!`,
      javascript: `// Đồ thị biểu diễn bằng Object kề
const graph = {
    you: ["alice", "bob", "claire"],
    bob: ["anuj", "peggy"],
    alice: ["peggy"],
    claire: ["thom", "jonny"],
    anuj: [],
    peggy: [],
    thom: [],
    jonny: []
};

function personIsSeller(name) {
    return name.endsWith('m');
}

function searchBFS(startName) {
    let queue = [...graph[startName]];
    const searched = new Set();
    
    while (queue.length > 0) {
        let person = queue.shift(); // popleft() - O(n) trong JS array thường, nhưng ổn cho ví dụ
        if (!searched.has(person)) {
            if (personIsSeller(person)) {
                console.log(person + " is a mango seller!");
                return true;
            } else {
                queue.push(...graph[person]);
                searched.add(person);
            }
        }
    }
    return false;
}

searchBFS("you"); // Output: thom is a mango seller!`
    },
    quizzes: [
      {
        question: "Cấu trúc dữ liệu nào đóng vai trò cốt lõi trong thuật toán Tìm kiếm theo chiều rộng (BFS)?",
        options: [
          "Ngăn xếp (Stack)",
          "Hàng đợi (Queue)",
          "Bảng băm (Hash Table)",
          "Cây nhị phân (Binary Tree)"
        ],
        answer: 1
      },
      {
        question: "Thuật toán BFS tìm ra loại đường đi ngắn nhất nào trên đồ thị?",
        options: [
          "Đường đi có tổng trọng số các cạnh nhỏ nhất",
          "Đường đi đi qua ít số cạnh (số bước nhảy) nhất trên đồ thị không trọng số",
          "Đường đi đi qua tất cả các nút đúng 1 lần",
          "Đường đi ngẫu nhiên"
        ],
        answer: 1
      }
    ]
  },
  {
    id: 7,
    title: "Chapter 7: Trees",
    subtitle: "Cấu trúc cây, Tìm kiếm chiều sâu (DFS), Cây nhị phân & Mã hóa Huffman",
    color: "hsl(271, 81%, 56%)",
    shadow: "rgba(139, 92, 246, 0.4)",
    concepts: [
      {
        name: "Cây (Trees) là gì?",
        points: [
          "Cây là một dạng đồ thị đặc biệt không có chu trình kín (cycle).",
          "Gồm một nút gốc (Root Node) liên kết tới các nút con (Child Nodes). Nút không có con gọi là nút lá (Leaf Node)."
        ]
      },
      {
        name: "DFS (Tìm kiếm theo chiều sâu) vs. BFS",
        points: [
          "Khác với BFS duyệt theo từng tầng, DFS sẽ đi sâu xuống một nhánh cho đến khi chạm nút lá, sau đó quay lui (backtrack) để duyệt các nhánh tiếp theo.",
          "DFS sử dụng **Ngăn xếp (Stack)** (hoặc đệ quy hệ thống)."
        ]
      },
      {
        name: "Cây nhị phân (Binary Trees) & Mã hóa Huffman",
        points: [
          "<strong>Cây nhị phân:</strong> Mỗi nút có tối đa 2 nút con (trái và phải).",
          "<strong>Mã hóa Huffman:</strong> Thuật toán nén dữ liệu cực kỳ phổ biến sử dụng cây nhị phân để gán các chuỗi bit ngắn cho các ký tự xuất hiện nhiều và chuỗi bit dài cho các ký tự ít xuất hiện."
        ]
      }
    ],
    code: {
      python: `class Node:
    def __init__(self, key):
        self.left = None
        self.right = None
        self.val = key

# Duyệt cây theo chiều sâu (DFS - Inorder)
def print_inorder(root):
    if root:
        print_inorder(root.left)
        print(root.val, end=" ")
        print_inorder(root.right)

root = Node(1)
root.left = Node(2)
root.right = Node(3)
print_inorder(root) # Output: 2 1 3`,
      javascript: `class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// Duyệt cây theo chiều sâu (DFS - Inorder)
function printInorder(node) {
    if (node !== null) {
        printInorder(node.left);
        console.log(node.value);
        printInorder(node.right);
    }
}

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
printInorder(root); // Output: 2 -> 1 -> 3`
    },
    quizzes: [
      {
        question: "Cây nhị phân có đặc điểm gì nổi bật?",
        options: [
          "Mọi nút đều phải có chính xác 2 nút con",
          "Mỗi nút có tối đa là 2 nút con",
          "Các giá trị bên trái luôn nhỏ hơn giá trị bên phải",
          "Không có nút gốc"
        ],
        answer: 1
      }
    ]
  },
  {
    id: 8,
    title: "Chapter 8: Balanced Trees",
    subtitle: "Cây tìm kiếm nhị phân (BST), Cây AVL & Cây B-Tree",
    color: "hsl(325, 78%, 49%)",
    shadow: "rgba(219, 39, 119, 0.4)",
    concepts: [
      {
        name: "Cây tìm kiếm nhị phân (BST - Binary Search Trees)",
        points: [
          "Là cây nhị phân có tính chất sắp xếp: với mỗi nút, mọi giá trị ở cây con bên trái đều <em>nhỏ hơn</em> giá trị nút đó, và mọi giá trị ở cây con bên phải đều <em>lớn hơn</em>.",
          "<strong>Hiệu năng:</strong> Tìm kiếm, thêm, xóa mất trung bình <code>O(log n)</code>.",
          "• Tuy nhiên, nếu chèn các số đã sắp xếp thứ tự, cây sẽ bị lệch hoàn toàn thành một đường thẳng (thoái hóa), hiệu năng giảm xuống <code>O(n)</code>."
        ]
      },
      {
        name: "Cây cân bằng: AVL Trees & B-Trees",
        points: [
          "Để khắc phục việc cây bị lệch, ta sử dụng các thuật toán tự động cân bằng cây.",
          "<strong>Cây AVL:</strong> Tự động xoay các nút để đảm bảo chênh lệch chiều cao giữa các nhánh con không bao giờ vượt quá 1. Giữ tốc độ luôn là <code>O(log n)</code>.",
          "<strong>B-Trees:</strong> Cây tìm kiếm tự cân bằng tổng quát hơn, cho phép mỗi nút chứa nhiều hơn 2 con và nhiều key. Được sử dụng rộng rãi trong các Hệ quản trị Cơ sở dữ liệu (Database) để đọc/ghi các khối dữ liệu lớn hiệu quả."
        ]
      }
    ],
    code: {
      python: `# Cấu trúc chèn cơ bản vào BST
class Node:
    def __init__(self, key):
        self.left = None
        self.right = None
        self.val = key

def insert(root, key):
    if root is None:
        return Node(key)
    else:
        if root.val < key:
            root.right = insert(root.right, key)
        else:
            root.left = insert(root.left, key)
    return root`,
      javascript: `class BSTNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

function insertBST(node, val) {
    if (node === null) {
        return new BSTNode(val);
    }
    if (val < node.val) {
        node.left = insertBST(node.left, val);
    } else {
        node.right = insertBST(node.right, val);
    }
    return node;
}`
    },
    quizzes: [
      {
        question: "Cây tìm kiếm nhị phân (BST) bị thoái hóa thành danh sách liên kết O(n) khi nào?",
        options: [
          "Khi ta chèn các phần tử ngẫu nhiên",
          "Khi ta chèn các phần tử theo thứ tự đã sắp xếp tăng hoặc giảm dần",
          "Khi cây có số phần tử lẻ",
          "Khi chiều cao của cây quá thấp"
        ],
        answer: 1
      }
    ]
  },
  {
    id: 9,
    title: "Chapter 9: Dijkstra's Algorithm",
    subtitle: "Đồ thị có trọng số & Thuật toán tìm đường đi ngắn nhất Dijkstra",
    color: "hsl(14, 85%, 55%)",
    shadow: "rgba(234, 88, 12, 0.4)",
    concepts: [
      {
        name: "Đồ thị có trọng số (Weighted Graphs)",
        points: [
          "Các cạnh của đồ thị được gán thêm các con số thể hiện chi phí, khoảng cách hoặc thời gian di chuyển giữa các nút.",
          "BFS chỉ tìm đường đi ngắn nhất dựa trên *số lượng cạnh* (số bước nhảy), không tính đến trọng số. Do đó không phù hợp cho đồ thị có trọng số."
        ]
      },
      {
        name: "Thuật toán Dijkstra",
        points: [
          "Giáp tìm đường đi có **tổng chi phí/trọng số nhỏ nhất** giữa nút bắt đầu và tất cả các nút khác trên đồ thị có trọng số dương.",
          "<strong>Các bước thực hiện:</strong>",
          "1. Tìm nút 'rẻ nhất' (nút có khoảng cách ngắn nhất từ điểm bắt đầu mà chưa xử lý).",
          "2. Cập nhật chi phí đi tới các nút lân cận của nút này (nếu đi qua nút này rẻ hơn đường đi cũ, cập nhật lại).",
          "3. Đánh dấu nút này đã xử lý.",
          "4. Lặp lại cho đến khi toàn bộ nút được xử lý."
        ]
      },
      {
        name: "Lưu ý quan trọng: Trọng số âm",
        points: [
          "Thuật toán Dijkstra **không hoạt động** trên đồ thị có cạnh mang trọng số âm (vì giả định nút đã xử lý là nút tối ưu nhất không còn thay đổi được nữa).",
          "Đối với đồ thị có trọng số âm, ta phải dùng thuật toán **Bellman-Ford**."
        ]
      }
    ],
    code: {
      python: `# Biểu diễn đồ thị có trọng số dưới dạng hash table lồng nhau
graph = {}
graph["start"] = {}
graph["start"]["a"] = 6
graph["start"]["b"] = 2
graph["a"] = {}
graph["a"]["fin"] = 1
graph["b"] = {}
graph["b"]["a"] = 3
graph["b"]["fin"] = 5
graph["fin"] = {} # Nút kết thúc không có lân cận

# Cần thêm bảng chi phí (costs) và cha (parents) để tìm đường
costs = {"a": 6, "b": 2, "fin": float("inf")}
parents = {"a": "start", "b": "start", "fin": None}
processed = []`,
      javascript: `// Biểu diễn đồ thị trong JS
const graph = {
    start: { a: 6, b: 2 },
    a: { fin: 1 },
    b: { a: 3, fin: 5 },
    fin: {}
};

const costs = { a: 6, b: 2, fin: Infinity };
const parents = { a: "start", b: "start", fin: null };
const processed = [];`
    },
    quizzes: [
      {
        question: "Dijkstra có chạy đúng trên đồ thị có chứa cạnh mang trọng số âm không?",
        options: [
          "Có, thuật toán tự động lấy trị tuyệt đối",
          "Không, vì thuật toán giả định khoảng cách tới các nút đã xử lý là tối ưu nhất và không thể giảm thêm",
          "Có, miễn là không có chu trình âm",
          "Có, thuật toán hoạt động hoàn hảo"
        ],
        answer: 1
      },
      {
        question: "Thuật toán nào được dùng để thay thế Dijkstra khi đồ thị có các cạnh trọng số âm?",
        options: [
          "Kruskal's Algorithm",
          "Bellman-Ford Algorithm",
          "Prim's Algorithm",
          "Depth-First Search (DFS)"
        ],
        answer: 1
      }
    ]
  },
  {
    id: 10,
    title: "Chapter 10: Greedy Algorithms",
    subtitle: "Thuật toán tham lam, Bài toán cái túi, Phủ tập hợp & Thuật toán xấp xỉ NP-hard",
    color: "hsl(43, 90%, 50%)",
    shadow: "rgba(202, 138, 4, 0.4)",
    concepts: [
      {
        name: "Greedy Strategy (Chiến lược tham lam)",
        points: [
          "Một chiến lược giải quyết bài toán cực kỳ đơn giản: ở mỗi bước, luôn chọn phương án tối ưu nhất tại thời điểm hiện tại (cục bộ) với hy vọng nó sẽ dẫn đến kết quả tối ưu toàn cục.",
          "• Ưu điểm: Cực kỳ dễ triển khai và chạy nhanh.",
          "• Nhược điểm: Rất nhiều bài toán không thể giải đúng bằng cách tham lam."
        ]
      },
      {
        name: "Bài toán Cái túi (Knapsack Problem) & Phủ tập hợp",
        points: [
          "<strong>Bài toán cái túi:</strong> Chọn các món đồ có giá trị và khối lượng khác nhau sao cho tổng giá trị lớn nhất mà không vượt quá sức chứa cái túi. Cách chọn tham lam (món đắt nhất trước) không phải lúc nào cũng ra kết quả tối ưu.",
          "<strong>Bài toán phủ tập hợp (Set-Covering):</strong> Tìm số lượng tối thiểu các đài phát thanh để phủ sóng toàn bộ các tỉnh thành. Đây là bài toán **NP-hard** - việc tìm ra lời giải chính xác tuyệt đối là cực kỳ tốn thời gian khi N lớn (mất <code>O(2^n)</code>)."
        ]
      },
      {
        name: "Thuật toán xấp xỉ (Approximation Algorithms)",
        points: [
          "Khi một bài toán là NP-hard (quá khó để tìm lời giải chính xác trong thời gian thực tế), ta dùng thuật toán xấp xỉ (áp dụng tham lam) để tìm một lời giải **đủ tốt** trong thời gian ngắn.",
          "Độ hiệu quả của thuật toán xấp xỉ được đánh giá qua: tốc độ chạy và khoảng cách sai lệch so với đáp án tối ưu thực sự."
        ]
      }
    ],
    code: {
      python: `# Ví dụ thuật toán xấp xỉ cho bài toán Phủ tập hợp đài phát thanh
states_needed = set(["mt", "wa", "or", "id", "nv", "ut", "ca", "az"])

stations = {}
stations["kone"] = set(["id", "nv", "ut"])
stations["ktwo"] = set(["wa", "id", "mt"])
stations["kthree"] = set(["or", "nv", "ca"])
stations["kfour"] = set(["nv", "ut"])
stations["kfive"] = set(["ca", "az"])

final_stations = set()

while states_needed:
    best_station = None
    states_covered = set()
    for station, states in stations.items():
        covered = states_needed & states
        if len(covered) > len(states_covered):
            best_station = station
            states_covered = covered
            
    states_needed -= states_covered
    final_stations.add(best_station)

print(final_stations) # Output: {'kfive', 'kthree', 'ktwo', 'kone'}`,
      javascript: `// Thuật toán xấp xỉ cho phủ tập hợp trong JS
let statesNeeded = new Set(["mt", "wa", "or", "id", "nv", "ut", "ca", "az"]);

const stations = {
    kone: new Set(["id", "nv", "ut"]),
    ktwo: new Set(["wa", "id", "mt"]),
    kthree: new Set(["or", "nv", "ca"]),
    kfour: new Set(["nv", "ut"]),
    kfive: new Set(["ca", "az"])
};

const finalStations = new Set();

while (statesNeeded.size > 0) {
    let bestStation = null;
    let statesCovered = new Set();
    
    for (let station in stations) {
        let states = stations[station];
        let intersection = new Set([...statesNeeded].filter(x => states.has(x)));
        if (intersection.size > statesCovered.size) {
            bestStation = station;
            statesCovered = intersection;
        }
    }
    
    statesCovered.forEach(state => statesNeeded.delete(state));
    finalStations.add(bestStation);
}

console.log(finalStations); // Output: Set { 'kfive', 'kthree', 'ktwo', 'kone' }`
    },
    quizzes: [
      {
        question: "Đặc trưng chính của Thuật toán tham lam (Greedy) là gì?",
        options: [
          "Xem xét mọi khả năng xảy ra trước khi chọn",
          "Luôn luôn chọn phương án tối ưu cục bộ ở mỗi bước",
          "Sử dụng đệ quy để tối ưu hóa bộ nhớ",
          "Chia nhỏ bài toán thành các bài toán con chồng chéo"
        ],
        answer: 1
      }
    ]
  },
  {
    id: 11,
    title: "Chapter 11: Dynamic Programming",
    subtitle: "Quy hoạch động, Lưu trữ kết quả (Memoization) & Chuỗi con chung dài nhất",
    color: "hsl(100, 65%, 42%)",
    shadow: "rgba(101, 163, 13, 0.4)",
    concepts: [
      {
        name: "Quy hoạch động (Dynamic Programming - DP)",
        points: [
          "Là phương pháp giải quyết các bài toán phức tạp bằng cách chia chúng thành các bài toán con <em>chồng chéo</em>, giải quyết từng bài toán con một lần và lưu trữ kết quả lại (tránh tính toán lặp lại).",
          "• Khác với Chia để trị (Quicksort - các bài toán con không chồng chéo), DP áp dụng khi các bài toán con phụ thuộc lẫn nhau."
        ]
      },
      {
        name: "Cách thiết lập bảng Quy hoạch động",
        points: [
          "Mọi thuật toán quy hoạch động đều bắt đầu bằng một chiếc bảng (lưới/grid).",
          "Các giá trị trong ô của bảng thường là giá trị bạn muốn tối ưu hóa.",
          "Mỗi ô tương ứng với một bài toán con."
        ]
      },
      {
        name: "Ví dụ kinh điển",
        points: [
          "<strong>Bài toán cái túi (Knapsack):</strong> Sử dụng bảng DP để so sánh mọi kết hợp đồ vật ở từng mức tải trọng nhỏ của túi. Tìm ra lời giải chính xác tuyệt đối mà không cần vét cạn <code>O(2^n)</code>.",
          "<strong>Chuỗi con chung dài nhất (Longest Common Subsequence):</strong> Dùng để so sánh độ tương đồng giữa hai chuỗi văn bản (ứng dụng trong Git diff, kiểm tra đạo văn, so sánh chuỗi DNA)."
        ]
      }
    ],
    code: {
      python: `# Mô tả công thức tính toán ô trong bài toán Cái túi (DP)
# cell[i][j] = max(
#    giá trị trước đó (ở ô cell[i-1][j]),
#    giá trị đồ vật hiện tại + giá trị của sức chứa còn lại (cell[i-1][j-trọng_lượng_đồ])
# )

def lcs(X, Y):
    m = len(X)
    n = len(Y)
    L = [[0]*(n+1) for i in range(m+1)]
 
    for i in range(m+1):
        for j in range(n+1):
            if i == 0 or j == 0:
                L[i][j] = 0
            elif X[i-1] == Y[j-1]:
                L[i][j] = L[i-1][j-1] + 1
            else:
                L[i][j] = max(L[i-1][j], L[i][j-1])
    return L[m][n]

print(lcs("blue", "clues")) # Output: 3 (l-u-e)`,
      javascript: `function lcs(X, Y) {
    let m = X.length;
    let n = Y.length;
    let L = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
            if (i === 0 || j === 0) {
                L[i][j] = 0;
            } else if (X[i - 1] === Y[j - 1]) {
                L[i][j] = L[i - 1][j - 1] + 1;
            } else {
                L[i][j] = Math.max(L[i - 1][j], L[i][j - 1]);
            }
        }
    }
    return L[m][n];
}

console.log(lcs("blue", "clues")); // Output: 3`
    },
    quizzes: [
      {
        question: "Quy hoạch động khác biệt với Chia để trị ở điểm cốt lõi nào?",
        options: [
          "Quy hoạch động chỉ chạy trên mảng đã sắp xếp",
          "Quy hoạch động áp dụng cho các bài toán con chồng chéo (overlapping subproblems) và lưu kết quả lại",
          "Chia để trị luôn có tốc độ chạy nhanh hơn",
          "Quy hoạch động không sử dụng cấu trúc bảng dữ liệu"
        ],
        answer: 1
      }
    ]
  },
  {
    id: 12,
    title: "Chapter 12: K-Nearest Neighbors",
    subtitle: "Giới thiệu Học máy, Phân loại, Trích xuất đặc trưng & Thuật toán KNN",
    color: "hsl(215, 80%, 46%)",
    shadow: "rgba(37, 99, 235, 0.4)",
    concepts: [
      {
        name: "Thuật toán KNN (K-Nearest Neighbors)",
        points: [
          "Là một thuật toán học máy đơn giản, dùng để **Phân loại (Classification)** hoặc **Dự đoán giá trị số (Regression)** dựa trên K điểm dữ liệu gần nhất.",
          "Ví dụ: Hệ thống gợi ý phim (phim tương tự), phân loại hoa, phân loại khách hàng."
        ]
      },
      {
        name: "Tính toán khoảng cách & Trích xuất đặc trưng",
        points: [
          "Để đo độ gần nhau giữa các điểm dữ liệu, ta dùng công thức khoảng cách (phổ biến nhất là **Khoảng cách Euclid**): <code>d = √((x₁-x₂)² + (y₁-y²² + ...)</code>.",
          "<strong>Trích xuất đặc trưng (Feature Extraction):</strong> Chuyển đổi đối tượng (như bài hát, khách hàng) thành một danh sách các con số (tọa độ đặc trưng) để tính toán khoảng cách."
        ]
      },
      {
        name: "Phân loại vs. Hồi quy (Regression)",
        points: [
          "• Phân loại: Xếp nhóm đối tượng (ví dụ: bưởi hay cam? Nhóm A hay nhóm B?). Trả về kết quả là nhãn của đa số trong K điểm gần nhất.",
          "• Hồi quy: Dự đoán một con số (ví dụ: dự đoán doanh thu ngày mai). Trả về kết quả là trung bình cộng giá trị của K điểm gần nhất."
        ]
      }
    ],
    code: {
      python: `import math

# Tính khoảng cách Euclid giữa 2 điểm đặc trưng
def distance(p1, p2):
    # Mỗi điểm là một danh sách tọa độ, ví dụ [độ hài hước, độ hành động]
    total = 0
    for i in range(len(p1)):
        total += (p1[i] - p2[i]) ** 2
    return math.sqrt(total)

# Khoảng cách giữa phim A [4, 5, 1] và phim B [1, 2, 5]
print(distance([4, 5, 1], [1, 2, 5])) # Output: 5.385`,
      javascript: `function euclideanDistance(p1, p2) {
    let sum = 0;
    for (let i = 0; i < p1.length; i++) {
        sum += Math.pow(p1[i] - p2[i], 2);
    }
    return Math.sqrt(sum);
}

// Khoảng cách giữa 2 bài hát dựa trên [tempo, năng lượng]
console.log(euclideanDistance([120, 0.8], [115, 0.75])); // Output: 5.0002`
    },
    quizzes: [
      {
        question: "Trong KNN, nếu ta cần dự đoán một giá trị số cụ thể (như giá nhà, doanh thu) thay vì phân nhóm nhãn, đây được gọi là bài toán gì?",
        options: [
          "Bài toán Phân loại (Classification)",
          "Bài toán Hồi quy (Regression)",
          "Bài toán Gom cụm (Clustering)",
          "Bài toán Phân rã (Decomposition)"
        ],
        answer: 1
      }
    ]
  },
  {
    id: 13,
    title: "Chapter 13: Where to Go Next",
    subtitle: "Con đường tiếp theo: Hồi quy tuyến tính, Lọc Bloom, MapReduce, Bảo mật & Thuật toán nâng cao",
    color: "hsl(285, 80%, 54%)",
    shadow: "rgba(168, 85, 247, 0.4)",
    concepts: [
      {
        name: "Các thuật toán phân tích & cấu trúc dữ liệu tiên tiến",
        points: [
          "• <strong>Linear Regression (Hồi quy tuyến tính):</strong> Tìm đường thẳng khớp nhất với các điểm dữ liệu để dự đoán xu hướng tương lai.",
          "• <strong>Inverted Indexes (Chỉ mục đảo ngược):</strong> Ánh xạ từ khóa với danh sách tài liệu chứa từ khóa đó. Cốt lõi của các công cụ tìm kiếm như Google.",
          "• <strong>Fourier Transform (Biến đổi Fourier):</strong> Tách một tín hiệu thành các tần số cấu thành. Ứng dụng trong nén ảnh MP3, JPEG, nhận diện giọng nói.",
          "• <strong>Parallel Algorithms (Thuật toán song song):</strong> Chạy thuật toán trên nhiều lõi CPU/GPU cùng lúc để xử lý dữ liệu khổng lồ."
        ]
      },
      {
        name: "Xử lý dữ liệu lớn & Bảo mật",
        points: [
          "• <strong>MapReduce:</strong> Mô hình lập trình chia nhỏ bài toán khổng lồ chạy trên hàng nghìn máy tính (phân tán), gồm bước ánh xạ (Map) và tổng hợp (Reduce).",
          "• <strong>Bloom Filters & HyperLogLog:</strong> Cấu trúc dữ liệu xác suất. Bloom Filter cho biết phần tử có chắc chắn *không* thuộc tập hợp hay không (tiết kiệm RAM). HyperLogLog dùng để đếm các phần tử duy nhất trong tập dữ liệu khổng lồ.",
          "• <strong>HTTPS & Trao đổi khóa Diffie-Hellman:</strong> Mã hóa thông tin truyền tải trên internet, đảm bảo tính bảo mật và riêng tư.",
          "• <strong>Linear Programming (Quy hoạch tuyến tính):</strong> Tối ưu hóa một hàm mục tiêu tuyến tính dưới các điều kiện ràng buộc. Dùng rất nhiều trong vận tải, logistic."
        ]
      }
    ],
    code: {
      python: `# Python ví dụ MapReduce đơn giản sử dụng hàm built-in
from functools import reduce

words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
# Bước Map: Chuyển từ thành cặp (từ, 1)
mapped = list(map(lambda w: (w, 1), words))

# Bước Reduce: Tổng hợp số lần xuất hiện
def reducer(acc, item):
    word, count = item
    acc[word] = acc.get(word, 0) + count
    return acc

word_counts = reduce(reducer, mapped, {})
print(word_counts)
# Output: {'apple': 3, 'banana': 2, 'cherry': 1}`,
      javascript: `// MapReduce đơn giản trong JS
const words = ["apple", "banana", "apple", "cherry", "banana", "apple"];

// Map: Tạo danh sách các cặp key-value
const mapped = words.map(w => ({ key: w, value: 1 }));

// Reduce: Gom nhóm và tính tổng
const wordCounts = mapped.reduce((acc, item) => {
    acc[item.key] = (acc[item.key] || 0) + item.value;
    return acc;
}, {});

console.log(wordCounts); 
// Output: { apple: 3, banana: 2, cherry: 1 }`
    },
    quizzes: [
      {
        question: "Cấu trúc dữ liệu xác suất nào được dùng để kiểm tra nhanh sự tồn tại của một phần tử trong một tập dữ liệu cực lớn với lượng bộ nhớ siêu nhỏ?",
        options: [
          "Bloom Filter",
          "B-Tree",
          "AVL Tree",
          "Bảng băm (Hash Table)"
        ],
        answer: 0
      }
    ]
  }
];

// --- English Chapter Data ---
const GrokkingDataEN = [
  {
    id: 1,
    title: "Chapter 1: Introduction to Algorithms",
    subtitle: "Introduction to Algorithms, Binary Search & Big O Notation",
    color: "hsl(354, 85%, 62%)",
    shadow: "rgba(240, 82, 82, 0.4)",
    concepts: [
      {
        name: "Binary Search",
        points: [
          "<strong>Input:</strong> A sorted list of elements.",
          "<strong>Output:</strong> The index of the target element, or <code>null</code> if not found.",
          "<strong>How it works:</strong> Each step compares the middle element (mid) with the target to eliminate half of the remaining elements.",
          "<strong>Efficiency:</strong> Extremely fast compared to Simple Search. For 4 billion items, Simple Search takes up to 4 billion steps, while Binary Search takes at most 32 steps!"
        ]
      },
      {
        name: "Big O Notation",
        points: [
          "<strong>Definition:</strong> Measures how quickly the runtime of an algorithm increases relative to the input size (N).",
          "<strong>Nature:</strong> Does not measure in seconds/milliseconds, but in the maximum <em>number of operations</em> required.",
          "<strong>Common Complexities (fastest to slowest):</strong>",
          "• <code>O(log n)</code>: Logarithmic time (e.g., Binary Search)",
          "• <code>O(n)</code>: Linear time (e.g., Simple Search)",
          "• <code>O(n log n)</code>: Log-linear time (e.g., average Quicksort)",
          "• <code>O(n²)</code>: Quadratic time (e.g., Selection Sort)",
          "• <code>O(n!)</code>: Factorial time (e.g., Traveling Salesperson problem)"
        ]
      }
    ],
    code: {
      python: `def binary_search(list_data, item):
    low = 0
    high = len(list_data) - 1

    while low <= high:
        mid = (low + high) // 2
        guess = list_data[mid]
        if guess == item:
            return mid
        if guess > item:
            high = mid - 1
        else:
            low = mid + 1
    return None

my_list = [1, 3, 5, 7, 9]
print(binary_search(my_list, 3)) # Output: 1
print(binary_search(my_list, -1)) # Output: None`,
      javascript: `function binarySearch(list, item) {
    let low = 0;
    let high = list.length - 1;

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        let guess = list[mid];
        
        if (guess === item) {
            return mid;
        }
        if (guess > item) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return null;
}

const myList = [1, 3, 5, 7, 9];
console.log(binarySearch(myList, 3)); // Output: 1
console.log(binarySearch(myList, -1)); // Output: null`
    },
    quizzes: [
      {
        question: "What is the mandatory input for Binary Search?",
        options: [
          "An array of positive integers",
          "A sorted list of elements",
          "A balanced binary tree",
          "A hash table"
        ],
        answer: 1
      },
      {
        question: "If the input size grows from 100 to 10,000, how does the maximum number of steps change for Simple Search O(n) and Binary Search O(log n)?",
        options: [
          "Simple Search increases 100 times; Binary Search increases by about 7 steps",
          "Both increase 100 times",
          "Simple Search increases by 100 steps; Binary Search doubles",
          "No change in the number of steps"
        ],
        answer: 0
      }
    ]
  },
  {
    id: 2,
    title: "Chapter 2: Selection Sort",
    subtitle: "How Memory Works, Arrays, Linked Lists & Selection Sort",
    color: "hsl(28, 95%, 53%)",
    shadow: "rgba(249, 115, 22, 0.4)",
    concepts: [
      {
        name: "How memory works?",
        points: [
          "Computer memory is like a cabinet with many drawers.",
          "Each drawer has a specific address.",
          "Whenever you need to store data, you ask the computer for some empty drawers to use."
        ]
      },
      {
        name: "Arrays vs. Linked Lists",
        points: [
          "<strong>Arrays:</strong> Elements are stored <em>contiguously</em> in memory.",
          "• Advantage: Extremely fast random access <code>O(1)</code> because the address of the i-th element can be calculated instantly.",
          "• Disadvantage: Inserting and deleting elements is very slow <code>O(n)</code> because other elements must be shifted, or there might not be enough contiguous space.",
          "<strong>Linked Lists:</strong> Elements can be scattered <em>anywhere</em> in memory. Each element contains the value and the address (pointer) of the next element.",
          "• Advantage: Extremely fast insertion and deletion <code>O(1)</code> just by updating pointers.",
          "• Disadvantage: Random access is slow <code>O(n)</code> because you must traverse from the start."
        ]
      },
      {
        name: "Selection Sort",
        points: [
          "<strong>Idea:</strong> Traverse the list, find the smallest (or largest) element, remove it, and push it to a new list. Repeat for the remaining elements.",
          "<strong>Complexity:</strong> <code>O(n²)</code>. Each search takes <code>O(n)</code>, and we do this <code>n</code> times, so total time is <code>O(n²)</code>."
        ]
      }
    ],
    code: {
      python: `def find_smallest(arr):
    smallest = arr[0]
    smallest_index = 0
    for i in range(1, len(arr)):
        if arr[i] < smallest:
            smallest = arr[i]
            smallest_index = i
    return smallest_index

def selection_sort(arr):
    new_arr = []
    copied_arr = list(arr) # Copy array to avoid mutating original
    for i in range(len(copied_arr)):
        smallest = find_smallest(copied_arr)
        new_arr.append(copied_arr.pop(smallest))
    return new_arr

print(selection_sort([5, 3, 6, 2, 10])) # Output: [2, 3, 5, 6, 10]`,
      javascript: `function findSmallest(arr) {
    let smallest = arr[0];
    let smallestIndex = 0;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < smallest) {
            smallest = arr[i];
            smallestIndex = i;
        }
    }
    return smallestIndex;
}

function selectionSort(arr) {
    const newArr = [];
    const copiedArr = [...arr];
    const length = copiedArr.length;
    for (let i = 0; i < length; i++) {
        let smallestIndex = findSmallest(copiedArr);
        newArr.push(copiedArr.splice(smallestIndex, 1)[0]);
    }
    return newArr;
}

console.log(selectionSort([5, 3, 6, 2, 10])); // Output: [2, 3, 5, 6, 10]`
    },
    quizzes: [
      {
        question: "Why is random access in an Array faster than in a Linked List?",
        options: [
          "Arrays automatically sort their elements",
          "Arrays store elements contiguously so addresses can be calculated instantly",
          "Linked lists use more RAM",
          "Arrays do not contain pointers"
        ],
        answer: 1
      },
      {
        question: "What is the runtime complexity of Selection Sort?",
        options: [
          "O(n)",
          "O(n log n)",
          "O(n²)",
          "O(2^n)"
        ],
        answer: 2
      }
    ]
  },
  {
    id: 3,
    title: "Chapter 3: Recursion",
    subtitle: "Recursion, Base Cases & The Call Stack",
    color: "hsl(48, 96%, 53%)",
    shadow: "rgba(234, 179, 8, 0.4)",
    concepts: [
      {
        name: "What is Recursion?",
        points: [
          "Recursion is a programming technique where a function calls itself.",
          "It helps write cleaner and more readable code for structurally repetitive tasks (like tree or directory traversals).",
          "It does not speed up execution (in fact, recursion consumes call stack memory and is often slightly slower than normal loops)."
        ]
      },
      {
        name: "Base Case & Recursive Case",
        points: [
          "Every recursive function must have two parts to avoid running into infinite loops:",
          "<strong>Base Case:</strong> The condition where the function stops calling itself and returns a specific value.",
          "<strong>Recursive Case:</strong> Where the function continues to call itself with parameters that get closer to the base case."
        ]
      },
      {
        name: "The Call Stack",
        points: [
          "The computer manages function calls using a Call Stack.",
          "It operates on a <strong>LIFO (Last In, First Out)</strong> basis: the last function called is the first to complete and exit.",
          "Each recursive call pushes a new stack frame into memory. If recursion goes too deep without hitting a base case, it causes a <strong>Stack Overflow</strong> error."
        ]
      }
    ],
    code: {
      python: `def countdown(i):
    print(i)
    # Base Case
    if i <= 1:
        return
    # Recursive Case
    else:
        countdown(i - 1)

countdown(3) 
# Prints: 3, then 2, then 1

def fact(x):
    if x == 1:
        return 1
    return x * fact(x - 1)

print(fact(5)) # Output: 120 (5 * 4 * 3 * 2 * 1)`,
      javascript: `function countdown(i) {
    console.log(i);
    // Base Case
    if (i <= 1) {
        return;
    } 
    // Recursive Case
    else {
        countdown(i - 1);
    }
}

countdown(3); // Output: 3 -> 2 -> 1

function fact(x) {
    if (x === 1) {
        return 1;
    }
    return x * fact(x - 1);
}

console.log(fact(5)); // Output: 120`
    },
    quizzes: [
      {
        question: "What happens if a recursive function does not have a Base Case?",
        options: [
          "The program automatically converts it into a while loop",
          "The function returns null immediately",
          "The program runs infinitely and throws a Stack Overflow error",
          "The compiler reports a syntax error before running"
        ],
        answer: 2
      },
      {
        question: "Which data structure is used to manage function calls in operating systems?",
        options: [
          "Queue - FIFO",
          "Stack - LIFO",
          "Tree",
          "Hash Table"
        ],
        answer: 1
      }
    ]
  },
  {
    id: 4,
    title: "Chapter 4: Quicksort",
    subtitle: "Divide and Conquer Strategy & The Quicksort Algorithm",
    color: "hsl(142, 70%, 45%)",
    shadow: "rgba(34, 197, 94, 0.4)",
    concepts: [
      {
        name: "Divide & Conquer (D&C)",
        points: [
          "A problem-solving mindset consisting of 2 steps:",
          "1. Find the simplest base case scenario.",
          "2. Reduce the original problem until it hits that base case (Recursive step).",
          "Example: Measuring a large plot of land by partitioning it into the largest squares possible."
        ]
      },
      {
        name: "Quicksort Algorithm",
        points: [
          "A sorting algorithm applying D&C, which runs much faster than Selection Sort.",
          "<strong>Steps:</strong>",
          "1. Choose a <strong>pivot</strong> element (e.g., first, middle, or a random element).",
          "2. Partitioning: Divide the array into two sub-arrays: elements smaller than/equal to the pivot, and elements larger than the pivot.",
          "3. Recursively apply Quicksort to both sub-arrays.",
          "<strong>Efficiency:</strong> Runs at <code>O(n log n)</code> on average. Worst case is <code>O(n²)</code> (when consistently picking poor pivots)."
        ]
      }
    ],
    code: {
      python: `def quicksort(arr):
    if len(arr) < 2:
        return arr # Base Case: Arrays with 0 or 1 element are already sorted
    else:
        pivot = arr[0] # Pick first element as pivot
        less = [i for i in arr[1:] if i <= pivot] # Sub-array of elements <= pivot
        greater = [i for i in arr[1:] if i > pivot] # Sub-array of elements > pivot
        return quicksort(less) + [pivot] + quicksort(greater)

print(quicksort([10, 5, 2, 3])) # Output: [2, 3, 5, 10]`,
      javascript: `function quicksort(arr) {
    if (arr.length < 2) {
        return arr; // Base Case
    }
    
    let pivot = arr[0]; // Pick pivot
    let less = [];
    let greater = [];
    
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] <= pivot) {
            less.push(arr[i]);
        } else {
            greater.push(arr[i]);
        }
    }
    
    return [...quicksort(less), pivot, ...quicksort(greater)];
}

console.log(quicksort([10, 5, 2, 3])); // Output: [2, 3, 5, 10]`
    },
    quizzes: [
      {
        question: "When does the worst-case O(n²) of Quicksort occur?",
        options: [
          "When the input array is already sorted and we always pick the first or last element as pivot",
          "When the input array contains identical values",
          "When we always choose the median element as pivot",
          "When the array size is a power of 2"
        ],
        answer: 0
      },
      {
        question: "What is the average-case runtime complexity of Quicksort?",
        options: [
          "O(n)",
          "O(n log n)",
          "O(n²)",
          "O(log n)"
        ],
        answer: 1
      }
    ]
  },
  {
    id: 5,
    title: "Chapter 5: Hash Tables",
    subtitle: "Hash Functions, Hash Tables & Resolving Collisions",
    color: "hsl(174, 75%, 41%)",
    shadow: "rgba(20, 184, 166, 0.4)",
    concepts: [
      {
        name: "Hash Functions",
        points: [
          "A function that takes a string (or any data) and maps it to a corresponding number.",
          "<strong>Properties:</strong>",
          "• Consistent: The same input string must always produce the same output number.",
          "• Low Collisions (ideal): Different strings should map to different numbers.",
          "• Bounded: Returns numbers within the size bounds of the backing array."
        ]
      },
      {
        name: "Hash Tables (Maps)",
        points: [
          "Combines a hash function and an array: the hash function points directly to the exact index in the array to store or look up values.",
          "<strong>Performance:</strong> Achieves <code>O(1)</code> time complexity for search, insert, and delete (extremely fast).",
          "<strong>Common applications:</strong>",
          "• Looking up phone books, dictionaries.",
          "• Preventing duplicate entries (e.g., voting check lists).",
          "• Caching web page requests on servers."
        ]
      },
      {
        name: "Collisions & Load Factor",
        points: [
          "<strong>Collision:</strong> When two different keys produce the same hash index. A common fix is storing a <em>linked list</em> at that index.",
          "<strong>Load Factor:</strong> The ratio of items stored to total slots in the hash table.",
          "• If the Load Factor > 0.7, we need to expand (resize) the hash table to prevent too many collisions which degrade lookups to <code>O(n)</code>."
        ]
      }
    ],
    code: {
      python: `# Python dictionaries are built-in hash tables
voted = {}

def check_voter(name):
    if voted.get(name):
        print("Kick them out!")
    else:
        voted[name] = True
        print("Let them vote!")

check_voter("tom") # Let them vote!
check_voter("mike") # Let them vote!
check_voter("tom") # Kick them out!`,
      javascript: `// JavaScript uses Objects or Maps as hash tables
const voted = new Map();

function checkVoter(name) {
    if (voted.has(name)) {
        console.log("Kick them out!");
    } else {
        voted.set(name, true);
        console.log("Let them vote!");
    }
}

checkVoter("tom"); // Let them vote!
checkVoter("mike"); // Let them vote!
checkVoter("tom"); // Kick them out!`
    },
    quizzes: [
      {
        question: "What is the ideal Load Factor threshold to trigger a hash table resize?",
        options: [
          "Greater than 0.5",
          "Greater than 0.7",
          "Exactly 1.0",
          "When the table is 100% full"
        ],
        answer: 1
      },
      {
        question: "In the worst case where all keys collide and hash to the same slot, what is the lookup speed of a hash table?",
        options: [
          "O(1)",
          "O(log n)",
          "O(n)",
          "O(n²)"
        ],
        answer: 2
      }
    ]
  },
  {
    id: 6,
    title: "Chapter 6: Breadth-First Search",
    subtitle: "Graphs, Queues & Breadth-First Search (BFS)",
    color: "hsl(200, 95%, 48%)",
    shadow: "rgba(14, 165, 233, 0.4)",
    concepts: [
      {
        name: "What are Graphs?",
        points: [
          "Graphs model relationships or networks between various objects.",
          "Consists of two main parts:",
          "• <strong>Nodes (Vertices):</strong> The entities themselves (e.g., people, locations).",
          "• <strong>Edges:</strong> The links connecting nodes. Edges can be Directed (one-way) or Undirected (two-way)."
        ]
      },
      {
        name: "Queues",
        points: [
          "A data structure operating on the <strong>FIFO (First In, First Out)</strong> principle: first in, first out.",
          "Supports two main operations: adding to the tail (Enqueue) and removing from the head (Dequeue)."
        ]
      },
      {
        name: "Breadth-First Search (BFS)",
        points: [
          "BFS answers two main questions on unweighted graphs:",
          "1. Is there a path from node A to node B?",
          "2. What is the shortest path (fewest edges) from node A to node B?",
          "<strong>How it works:</strong> Check nearest neighbors (degree 1) first, then expand outward (degree 2, degree 3...). Uses a <strong>Queue</strong> to manage traversal order and a set of visited nodes to avoid infinite cycles."
        ]
      }
    ],
    code: {
      python: `from collections import deque

# Graph represented by a Hash Table (adjacency list)
graph = {}
graph["you"] = ["alice", "bob", "claire"]
graph["bob"] = ["anuj", "peggy"]
graph["alice"] = ["peggy"]
graph["claire"] = ["thom", "jonny"]
graph["anuj"] = []
graph["peggy"] = []
graph["thom"] = []
graph["jonny"] = []

def person_is_seller(name):
    return name[-1] == 'm' # Assume mango seller name ends with 'm'

def search(name):
    search_queue = deque()
    search_queue += graph[name]
    searched = set() # Avoid inspecting duplicates to prevent infinite loops
    
    while search_queue:
        person = search_queue.popleft()
        if person not in searched:
            if person_is_seller(person):
                print(person + " is a mango seller!")
                return True
            else:
                search_queue += graph[person]
                searched.add(person)
    return False

search("you") # Output: thom is a mango seller!`,
      javascript: `// Adjacency graph represented in JS object
const graph = {
    you: ["alice", "bob", "claire"],
    bob: ["anuj", "peggy"],
    alice: ["peggy"],
    claire: ["thom", "jonny"],
    anuj: [],
    peggy: [],
    thom: [],
    jonny: []
};

function personIsSeller(name) {
    return name.endsWith('m');
}

function searchBFS(startName) {
    let queue = [...graph[startName]];
    const searched = new Set();
    
    while (queue.length > 0) {
        let person = queue.shift(); // popleft() - O(n) in standard JS arrays
        if (!searched.has(person)) {
            if (personIsSeller(person)) {
                console.log(person + " is a mango seller!");
                return true;
            } else {
                queue.push(...graph[person]);
                searched.add(person);
            }
        }
    }
    return false;
}

searchBFS("you"); // Output: thom is a mango seller!`
    },
    quizzes: [
      {
        question: "Which data structure is core to the Breadth-First Search (BFS) algorithm?",
        options: [
          "Stack",
          "Queue",
          "Hash Table",
          "Binary Tree"
        ],
        answer: 1
      },
      {
        question: "What kind of shortest path does BFS guarantee to find?",
        options: [
          "The path with the lowest sum of edge weights",
          "The path with the fewest number of edges (steps) on an unweighted graph",
          "A path that visits every node exactly once",
          "A random path"
        ],
        answer: 1
      }
    ]
  },
  {
    id: 7,
    title: "Chapter 7: Trees",
    subtitle: "Tree structures, Depth-First Search (DFS), Binary Trees & Huffman Coding",
    color: "hsl(271, 81%, 56%)",
    shadow: "rgba(139, 92, 246, 0.4)",
    concepts: [
      {
        name: "What are Trees?",
        points: [
          "A tree is a special type of graph that contains no cycles (closed loops).",
          "Consists of a Root Node connected to Child Nodes. Nodes with no children are called Leaf Nodes."
        ]
      },
      {
        name: "DFS vs. BFS",
        points: [
          "Unlike BFS which traverses level by level, DFS goes as deep as possible down one branch until it hits a leaf node, then backtracks to explore other branches.",
          "DFS uses a **Stack** (or system recursion)."
        ]
      },
      {
        name: "Binary Trees & Huffman Coding",
        points: [
          "<strong>Binary Trees:</strong> Each node has at most 2 child nodes (left and right).",
          "<strong>Huffman Coding:</strong> A very popular data compression algorithm that uses binary trees to assign shorter bit codes to frequently occurring characters and longer codes to rarer ones."
        ]
      }
    ],
    code: {
      python: `class Node:
    def __init__(self, key):
        self.left = None
        self.right = None
        self.val = key

# Traverse tree in-depth (DFS - Inorder)
def print_inorder(root):
    if root:
        print_inorder(root.left)
        print(root.val, end=" ")
        print_inorder(root.right)

root = Node(1)
root.left = Node(2)
root.right = Node(3)
print_inorder(root) # Output: 2 1 3`,
      javascript: `class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// DFS traversal (Inorder)
function printInorder(node) {
    if (node !== null) {
        printInorder(node.left);
        console.log(node.value);
        printInorder(node.right);
    }
}

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
printInorder(root); // Output: 2 -> 1 -> 3`
    },
    quizzes: [
      {
        question: "What is the defining characteristic of a Binary Tree?",
        options: [
          "Every node must have exactly 2 child nodes",
          "Each node has at most 2 child nodes",
          "Left values must always be smaller than right values",
          "It has no root node"
        ],
        answer: 1
      }
    ]
  },
  {
    id: 8,
    title: "Chapter 8: Balanced Trees",
    subtitle: "Binary Search Trees (BST), AVL Trees & B-Trees",
    color: "hsl(325, 78%, 49%)",
    shadow: "rgba(219, 39, 119, 0.4)",
    concepts: [
      {
        name: "Binary Search Trees (BST)",
        points: [
          "A sorted binary tree where for each node, all values in the left sub-tree are <em>smaller</em> than that node's value, and all values in the right sub-tree are <em>larger</em>.",
          "<strong>Performance:</strong> Search, insert, and delete take <code>O(log n)</code> on average.",
          "• However, if values are inserted in sorted order, the tree degenerates into a single straight line, dropping performance to <code>O(n)</code>."
        ]
      },
      {
        name: "Balanced Trees: AVL Trees & B-Trees",
        points: [
          "To prevent skewing, self-balancing algorithms are used.",
          "<strong>AVL Trees:</strong> Automatically rotate nodes to ensure the height difference between child branches never exceeds 1, keeping speeds at <code>O(log n)</code>.",
          "<strong>B-Trees:</strong> A more general self-balancing search tree allowing nodes to have more than 2 children and multiple keys. Extensively used in databases to read/write large blocks of data efficiently."
        ]
      }
    ],
    code: {
      python: `# Basic insert into BST
class Node:
    def __init__(self, key):
        self.left = None
        self.right = None
        self.val = key

def insert(root, key):
    if root is None:
        return Node(key)
    else:
        if root.val < key:
            root.right = insert(root.right, key)
        else:
            root.left = insert(root.left, key)
    return root`,
      javascript: `class BSTNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

function insertBST(node, val) {
    if (node === null) {
        return new BSTNode(val);
    }
    if (val < node.val) {
        node.left = insertBST(node.left, val);
    } else {
        node.right = insertBST(node.right, val);
    }
    return node;
}`
    },
    quizzes: [
      {
        question: "When does a Binary Search Tree (BST) degenerate into an O(n) linked list?",
        options: [
          "When inserting elements in random order",
          "When inserting elements in sorted (ascending or descending) order",
          "When the tree has an odd number of elements",
          "When the height of the tree is too low"
        ],
        answer: 1
      }
    ]
  },
  {
    id: 9,
    title: "Chapter 9: Dijkstra's Algorithm",
    subtitle: "Weighted Graphs & Dijkstra's Shortest Path Algorithm",
    color: "hsl(14, 85%, 55%)",
    shadow: "rgba(234, 88, 12, 0.4)",
    concepts: [
      {
        name: "Weighted Graphs",
        points: [
          "Graph edges are assigned numerical values representing cost, distance, or travel time.",
          "BFS only finds shortest paths based on the *number of edges* (steps), ignoring weights. Thus, it cannot solve weighted graphs."
        ]
      },
      {
        name: "Dijkstra's Algorithm",
        points: [
          "Finds the path with the **lowest total weight/cost** between a start node and all other nodes in a positive weighted graph.",
          "<strong>Steps:</strong>",
          "1. Find the cheapest unprocessed node (closest to start).",
          "2. Update the costs of all its neighbors (if route via this node is cheaper than current, update it).",
          "3. Mark this node as processed.",
          "4. Repeat until all nodes are processed."
        ]
      },
      {
        name: "Important: Negative Weights",
        points: [
          "Dijkstra's algorithm **fails** on graphs with negative weights because it assumes a processed node has an optimal path that cannot decrease further.",
          "For graphs with negative weights, you must use the **Bellman-Ford** algorithm."
        ]
      }
    ],
    code: {
      python: `# Weighted graph represented by nested dictionaries
graph = {}
graph["start"] = {}
graph["start"]["a"] = 6
graph["start"]["b"] = 2
graph["a"] = {}
graph["a"]["fin"] = 1
graph["b"] = {}
graph["b"]["a"] = 3
graph["b"]["fin"] = 5
graph["fin"] = {} # End node has no neighbors

# Backing tables for costs and parents
costs = {"a": 6, "b": 2, "fin": float("inf")}
parents = {"a": "start", "b": "start", "fin": None}
processed = []`,
      javascript: `// Weighted graph representation in JS
const graph = {
    start: { a: 6, b: 2 },
    a: { fin: 1 },
    b: { a: 3, fin: 5 },
    fin: {}
};

const costs = { a: 6, b: 2, fin: Infinity };
const parents = { a: "start", b: "start", fin: null };
const processed = [];`
    },
    quizzes: [
      {
        question: "Does Dijkstra run correctly on graphs containing negative edge weights?",
        options: [
          "Yes, the algorithm automatically takes absolute values",
          "No, because it assumes processed nodes are already optimal and cannot be decreased further",
          "Yes, as long as there are no negative cycles",
          "Yes, it works perfectly"
        ],
        answer: 1
      },
      {
        question: "Which algorithm should replace Dijkstra when the graph contains negative weights?",
        options: [
          "Kruskal's Algorithm",
          "Bellman-Ford Algorithm",
          "Prim's Algorithm",
          "Depth-First Search (DFS)"
        ],
        answer: 1
      }
    ]
  },
  {
    id: 10,
    title: "Chapter 10: Greedy Algorithms",
    subtitle: "Greedy Strategy, Knapsack Problem, Set Covering & NP-Hard Approximation",
    color: "hsl(43, 90%, 50%)",
    shadow: "rgba(202, 138, 4, 0.4)",
    concepts: [
      {
        name: "Greedy Strategy",
        points: [
          "A simple problem-solving strategy: at each step, make the locally optimal choice hoping it leads to the globally optimal solution.",
          "• Advantage: Very easy to implement and runs fast.",
          "• Disadvantage: Many problems cannot be solved optimally using a greedy approach."
        ]
      },
      {
        name: "Knapsack & Set-Covering Problems",
        points: [
          "<strong>Knapsack Problem:</strong> Pack items of different values and weights to maximize total value without exceeding capacity. Greedy choices (choosing most expensive item first) do not guarantee the optimal result.",
          "<strong>Set-Covering Problem:</strong> Find the minimum number of radio stations to cover a set of regions. This is an **NP-hard** problem - finding the exact optimal solution takes exponential time <code>O(2^n)</code> when N is large."
        ]
      },
      {
        name: "Approximation Algorithms",
        points: [
          "When a problem is NP-hard (too slow to compute exactly), we use approximation algorithms (greedy strategies) to find a **good enough** solution quickly.",
          "Approximation quality is judged by: execution speed and the ratio of deviation from the true optimal solution."
        ]
      }
    ],
    code: {
      python: `# Approximation algorithm for the Set-Covering problem
states_needed = set(["mt", "wa", "or", "id", "nv", "ut", "ca", "az"])

stations = {}
stations["kone"] = set(["id", "nv", "ut"])
stations["ktwo"] = set(["wa", "id", "mt"])
stations["kthree"] = set(["or", "nv", "ca"])
stations["kfour"] = set(["nv", "ut"])
stations["kfive"] = set(["ca", "az"])

final_stations = set()

while states_needed:
    best_station = None
    states_covered = set()
    for station, states in stations.items():
        covered = states_needed & states
        if len(covered) > len(states_covered):
            best_station = station
            states_covered = covered
            
    states_needed -= states_covered
    final_stations.add(best_station)

print(final_stations) # Output: {'kfive', 'kthree', 'ktwo', 'kone'}`,
      javascript: `// Set covering approximation in JS
let statesNeeded = new Set(["mt", "wa", "or", "id", "nv", "ut", "ca", "az"]);

const stations = {
    kone: new Set(["id", "nv", "ut"]),
    ktwo: new Set(["wa", "id", "mt"]),
    kthree: new Set(["or", "nv", "ca"]),
    kfour: new Set(["nv", "ut"]),
    kfive: new Set(["ca", "az"])
};

const finalStations = new Set();

while (statesNeeded.size > 0) {
    let bestStation = null;
    let statesCovered = new Set();
    
    for (let station in stations) {
        let states = stations[station];
        let intersection = new Set([...statesNeeded].filter(x => states.has(x)));
        if (intersection.size > statesCovered.size) {
            bestStation = station;
            statesCovered = intersection;
        }
    }
    
    statesCovered.forEach(state => statesNeeded.delete(state));
    finalStations.add(bestStation);
}

console.log(finalStations); // Output: Set { 'kfive', 'kthree', 'ktwo', 'kone' }`
    },
    quizzes: [
      {
        question: "What is the core feature of a Greedy Algorithm?",
        options: [
          "Analyze all combinations before choosing",
          "Always make the locally optimal choice at each step",
          "Use recursion to optimize memory usage",
          "Divide the problem into overlapping subproblems"
        ],
        answer: 1
      }
    ]
  },
  {
    id: 11,
    title: "Chapter 11: Dynamic Programming",
    subtitle: "Dynamic Programming, Memoization & Longest Common Subsequence",
    color: "hsl(100, 65%, 42%)",
    shadow: "rgba(101, 163, 13, 0.4)",
    concepts: [
      {
        name: "Dynamic Programming (DP)",
        points: [
          "A method for solving complex problems by breaking them down into <em>overlapping</em> subproblems, solving each subproblem once, and caching results (memoization) to avoid duplicate work.",
          "• Unlike Divide & Conquer (Quicksort - subproblems are independent), DP applies when subproblems are dependent."
        ]
      },
      {
        name: "Designing a Dynamic Programming Grid",
        points: [
          "Every dynamic programming algorithm starts with a grid (table).",
          "The cell values usually represent the metric you are trying to optimize.",
          "Each cell corresponds to a subproblem."
        ]
      },
      {
        name: "Classic Examples",
        points: [
          "<strong>Knapsack Problem:</strong> Use a DP table to compare item combinations at fractional capacities, finding the exact optimal choice without exponential <code>O(2^n)</code> brute force.",
          "<strong>Longest Common Subsequence (LCS):</strong> Used to measure similarity between two strings (e.g., git diff, spelling checkers, DNA matching)."
        ]
      }
    ],
    code: {
      python: `# Grid formula representation for Knapsack DP
# cell[i][j] = max(
#    previous_value (cell[i-1][j]),
#    current_item_value + value_of_remaining_capacity (cell[i-1][j-item_weight])
# )

def lcs(X, Y):
    m = len(X)
    n = len(Y)
    L = [[0]*(n+1) for i in range(m+1)]
 
    for i in range(m+1):
        for j in range(n+1):
            if i == 0 or j == 0:
                L[i][j] = 0
            elif X[i-1] == Y[j-1]:
                L[i][j] = L[i-1][j-1] + 1
            else:
                L[i][j] = max(L[i-1][j], L[i][j-1])
    return L[m][n]

print(lcs("blue", "clues")) # Output: 3 (l-u-e)`,
      javascript: `function lcs(X, Y) {
    let m = X.length;
    let n = Y.length;
    let L = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
            if (i === 0 || j === 0) {
                L[i][j] = 0;
            } else if (X[i - 1] === Y[j - 1]) {
                L[i][j] = L[i - 1][j - 1] + 1;
            } else {
                L[i][j] = Math.max(L[i - 1][j], L[i][j - 1]);
            }
        }
    }
    return L[m][n];
}

console.log(lcs("blue", "clues")); // Output: 3`
    },
    quizzes: [
      {
        question: "How does Dynamic Programming fundamentally differ from Divide & Conquer?",
        options: [
          "Dynamic programming only runs on sorted arrays",
          "Dynamic programming solves overlapping subproblems and caches their results",
          "Divide and Conquer is always faster",
          "Dynamic programming does not use grid tables"
        ],
        answer: 1
      }
    ]
  },
  {
    id: 12,
    title: "Chapter 12: K-Nearest Neighbors",
    subtitle: "Introduction to Machine Learning, Classification, Feature Extraction & KNN",
    color: "hsl(215, 80%, 46%)",
    shadow: "rgba(37, 99, 235, 0.4)",
    concepts: [
      {
        name: "K-Nearest Neighbors (KNN)",
        points: [
          "A simple machine learning algorithm used for **Classification** (grouping) or **Regression** (predicting numerical values) based on the K closest data points.",
          "Examples: Movie recommendation engines (similar taste), classifying flowers, predicting customer behavior."
        ]
      },
      {
        name: "Distance Calculation & Feature Extraction",
        points: [
          "To measure proximity between points, distance formulas are used (most commonly **Euclidean Distance**): <code>d = √((x₁-x₂)² + (y₁-y₂)² + ...)</code>.",
          "<strong>Feature Extraction:</strong> Translating objects (like songs or users) into a list of numbers (feature coordinates) for distance calculations."
        ]
      },
      {
        name: "Classification vs. Regression",
        points: [
          "• Classification: Predict a label or group (e.g., Orange or Apple?). Determined by the majority vote of its K closest neighbors.",
          "• Regression: Predict a number (e.g., tomorrow's revenue). Determined by averaging the values of its K closest neighbors."
        ]
      }
    ],
    code: {
      python: `import math

# Calculate Euclidean distance between feature points
def distance(p1, p2):
    # e.g., points are coordinates: [humor rating, action rating]
    total = 0
    for i in range(len(p1)):
        total += (p1[i] - p2[i]) ** 2
    return math.sqrt(total)

# Distance between Movie A [4, 5, 1] and Movie B [1, 2, 5]
print(distance([4, 5, 1], [1, 2, 5])) # Output: 5.385`,
      javascript: `function euclideanDistance(p1, p2) {
    let sum = 0;
    for (let i = 0; i < p1.length; i++) {
        sum += Math.pow(p1[i] - p2[i], 2);
    }
    return Math.sqrt(sum);
}

// Distance between 2 songs based on [tempo, energy]
console.log(euclideanDistance([120, 0.8], [115, 0.75])); // Output: 5.0002`
    },
    quizzes: [
      {
        question: "In KNN, if we predict a continuous numerical value (like housing prices) rather than a group label, what is this called?",
        options: [
          "Classification",
          "Regression",
          "Clustering",
          "Decomposition"
        ],
        answer: 1
      }
    ]
  },
  {
    id: 13,
    title: "Chapter 13: Where to Go Next",
    subtitle: "Next Steps: Linear Regression, Bloom Filters, MapReduce, Security & Advanced Algorithms",
    color: "hsl(285, 80%, 54%)",
    shadow: "rgba(168, 85, 247, 0.4)",
    concepts: [
      {
        name: "Advanced Analytics & Data Structures",
        points: [
          "• <strong>Linear Regression:</strong> Fit a straight line to data points to predict continuous trends.",
          "• <strong>Inverted Indexes:</strong> Map keywords to document lists containing them. The core of search engines like Google.",
          "• <strong>Fourier Transform:</strong> Break down a signal into its constituent frequencies. Used in MP3/JPEG compression and speech recognition.",
          "• <strong>Parallel Algorithms:</strong> Distribute workloads across multiple CPU/GPU cores to process massive datasets simultaneously."
        ]
      },
      {
        name: "Big Data Processing & Security",
        points: [
          "• <strong>MapReduce:</strong> A programming model to split massive tasks across thousands of distributed servers via mapping (Map) and compiling (Reduce) steps.",
          "• <strong>Bloom Filters & HyperLogLog:</strong> Probabilistic data structures. Bloom Filters check if an element is *definitely not* in a set (highly space-efficient). HyperLogLog estimates unique elements in huge datasets.",
          "• <strong>HTTPS & Diffie-Hellman Key Exchange:</strong> Encrypt data transmitted online, guaranteeing communication privacy.",
          "• <strong>Linear Programming:</strong> Optimize linear objective functions subject to constraints. Extensively used in logistics and routing."
        ]
      }
    ],
    code: {
      python: `# Simple MapReduce example using built-ins
from functools import reduce

words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
# Map step: Map strings to (word, 1) tuples
mapped = list(map(lambda w: (w, 1), words))

# Reduce step: Compile word counts
def reducer(acc, item):
    word, count = item
    acc[word] = acc.get(word, 0) + count
    return acc

word_counts = reduce(reducer, mapped, {})
print(word_counts)
# Output: {'apple': 3, 'banana': 2, 'cherry': 1}`,
      javascript: `// Simple MapReduce in JS
const words = ["apple", "banana", "apple", "cherry", "banana", "apple"];

// Map: Create key-value pairs
const mapped = words.map(w => ({ key: w, value: 1 }));

// Reduce: Aggregate counts
const wordCounts = mapped.reduce((acc, item) => {
    acc[item.key] = (acc[item.key] || 0) + item.value;
    return acc;
}, {});

console.log(wordCounts); 
// Output: { apple: 3, banana: 2, cherry: 1 }`
    },
    quizzes: [
      {
        question: "Which probabilistic data structure is used to check set membership inside massive datasets using minimal memory?",
        options: [
          "Bloom Filter",
          "B-Tree",
          "AVL Tree",
          "Hash Table"
        ],
        answer: 0
      }
    ]
  }
];

// --- Translation Dictionary ---
const GrokkingTranslations = {
  vi: {
    appSubtitle: "Interactive Explorer – Khám phá thuật toán từng phần nhỏ",
    tabDashboard: "📊 Dashboard",
    tabMindmap: "🗺️ Sơ đồ tư duy",
    searchPlaceholder: "Tìm khái niệm... (Big O, Hash, BFS...)",
    noResults: "Không tìm thấy kết quả cho",
    searchTip: "Thử tìm kiếm với từ khóa khác, ví dụ: \"hash\", \"BFS\", \"Big O\"",
    conceptCount: "khái niệm",
    quizCount: "câu hỏi",
    backToDashboard: "← Quay lại Dashboard",
    backToDashboardMap: "← Dashboard",
    tabSimulator: "🧪 Mô phỏng",
    tabCode: "💻 Code mẫu",
    tabQuiz: "❓ Quiz",
    noCode: "Chưa có code mẫu cho chương này.",
    noQuiz: "Chưa có câu hỏi cho chương này.",
    questionPrefix: "Câu",
    quizFeedbackCorrect: "✅ Chính xác! Bạn đã hiểu đúng khái niệm.",
    quizFeedbackIncorrect: "❌ Sai rồi. Đáp án đúng là",
    mindmapTitle: "🗺️ Sơ đồ tư duy – Grokking Algorithms",
    mindmapTip: "🖱️ Cuộn chuột để zoom • Kéo để di chuyển<br>Click vào nút chương để xem thông tin",
    tryItBtn: "🧪 Try it – Xem Mô phỏng & Code",
    zoomOut: "Thu nhỏ",
    zoomIn: "Phóng to",
    zoomReset: "Đặt lại",
    
    // Simulators UI Texts
    simBS_title: "Mô phỏng Tìm kiếm nhị phân (Binary Search)",
    simBS_desc: "Nhập số cần tìm hoặc chọn ngẫu nhiên một số từ mảng. Nhấn nút \"Bước tiếp\" để xem thuật toán thu hẹp phạm vi tìm kiếm.",
    simBS_target: "Số cần tìm: ",
    simBS_btnInit: "Khởi tạo lại",
    simBS_btnStep: "Bước tiếp (Step)",
    simBS_statusInit: "<strong>Trạng thái:</strong> Nhấn \"Bước tiếp\" để bắt đầu tìm kiếm.",
    simBS_statusStart: "<strong>Trạng thái:</strong> Bắt đầu tìm kiếm số <strong>{target}</strong> trong mảng 14 phần tử.<br>Phạm vi tìm kiếm hiện tại: từ chỉ số <strong>{low}</strong> đến <strong>{high}</strong> (toàn bộ mảng).",
    simBS_statusNotFound: "<strong>Kết quả:</strong> Không tìm thấy giá trị <strong>{target}</strong> trong mảng!<br>Thuật toán kết thúc sau <strong>{stepCount}</strong> bước vì <code>low > high</code>.",
    simBS_statusFound: "<strong style=\"color:#10b981;\">Tìm thấy!</strong> Số <strong>{target}</strong> nằm ở chỉ số <strong>{mid}</strong>.<br>Hoàn thành trong <strong>{stepCount}</strong> bước so sánh!",
    simBS_statusStepLeft: "<strong>Bước {stepCount}:</strong> So sánh phần tử giữa <code>mid = {mid}</code> (giá trị <code>{guess}</code>) với target <code>{target}</code>.<br>Vì <code>{guess} > {target}</code>, target nằm ở nửa bên trái. Cập nhật <code>high = mid - 1 = {high}</code>.",
    simBS_statusStepRight: "<strong>Bước {stepCount}:</strong> So sánh phần tử giữa <code>mid = {mid}</code> (giá trị <code>{guess}</code>) với target <code>{target}</code>.<br>Vì <code>{guess} < {target}</code>, target nằm ở nửa bên phải. Cập nhật <code>low = mid + 1 = {low}</code>.",

    simSS_title: "Mô phỏng Mảng vs Danh sách liên kết & Sắp xếp chọn",
    simSS_tabMemory: "Bộ nhớ (Mảng vs DS liên kết)",
    simSS_tabSort: "Sắp xếp chọn (Selection Sort)",
    simSS_descArray: "<strong>Mảng (Array):</strong> Các phần tử xếp liền kề nhau. Truy cập ngẫu nhiên <code>O(1)</code> bằng cách cộng chỉ số. Thêm/Xóa chậm vì phải dịch chuyển.",
    simSS_descList: "<strong>Danh sách liên kết (Linked List):</strong> Các phần tử nằm rải rác. Mỗi phần tử trỏ tới phần tử tiếp theo. Thêm/Xóa <code>O(1)</code> bằng cách sửa con trỏ. Truy cập ngẫu nhiên chậm <code>O(n)</code>.",
    simSS_descSort: "Bấm \"Bước tiếp\" để thuật toán tìm phần tử nhỏ nhất trong mảng chưa sắp xếp, loại bỏ nó và đẩy sang mảng kết quả.",
    simSS_btnUnsorted: "Mảng chưa sắp xếp:",
    simSS_btnSorted: "Mảng đã sắp xếp:",
    simSS_statusInit: "<strong>Trạng thái:</strong> Bấm \"Bước tiếp\" để bắt đầu sắp xếp chọn.",
    simSS_statusStart: "<strong>Trạng thái:</strong> Bắt đầu sắp xếp mảng <code>[{array}]</code>. <br>Bấm \"Bước tiếp\" để tìm phần tử nhỏ nhất.",
    simSS_statusCompleted: "<strong style=\"color:#10b981;\">Hoàn thành!</strong> Mảng đã được sắp xếp tăng dần: <code>[{array}]</code>.",
    simSS_statusSearching: "<strong>Đang tìm kiếm:</strong> Khởi tạo phần tử nhỏ nhất là <code>{smallest}</code> ở chỉ số 0. So sánh với các phần tử tiếp theo...",
    simSS_statusFoundNew: "So sánh <code>{guess}</code> với phần tử nhỏ nhất hiện tại là <code>{smallest}</code>.<br>Vì <code>{guess} < {smallest}</code>, cập nhật phần tử nhỏ nhất là <code>{guess}</code> (chỉ số <code>{idx}</code>).",
    simSS_statusKeep: "So sánh <code>{guess}</code> với phần tử nhỏ nhất hiện tại là <code>{smallest}</code>.<br>Vì lớn hơn hoặc bằng, giữ nguyên.",
    simSS_statusMove: "<strong>Di chuyển:</strong> Phần tử nhỏ nhất tìm được là <code>{val}</code>.<br>Loại bỏ khỏi mảng chưa sắp xếp và đẩy vào cuối mảng kết quả.",
    simSS_empty: "Trống",

    simRec_title: "Mô phỏng Ngăn xếp Đệ quy (Recursion Call Stack)",
    simRec_desc: "Tính toán Giai thừa của 4: <code>factorial(4) = 4 * 3 * 2 * 1 = 24</code>.<br>Bấm \"Bước tiếp\" để xem các tầng hàm được đẩy vào (Push) và lấy ra (Pop) khỏi Ngăn xếp cuộc gọi.",
    simRec_stackTitle: "Ngăn xếp Cuộc gọi (Call Stack):",
    simRec_varsTitle: "Bảng biến trạng thái:",
    simRec_statusInit: "Nhấn \"Bước tiếp\" để bắt đầu thực thi factorial(4).",
    simRec_statusStart: "<strong>Trạng thái ban đầu:</strong><br>Lệnh gọi đầu tiên: <code>factorial(4)</code>. <br>Hệ thống bắt đầu tạo khung ngăn xếp cho hàm này.",
    simRec_statusPush: "<strong>Bước {step} (Đệ quy đi xuống - PUSH):</strong><br>Gọi hàm <code>factorial({val})</code>. <br>Vì <code>x > 1</code>, chương trình chạy vào nhánh <em>Recursive Case</em> và gọi tiếp <code>factorial({nextVal})</code>.<br>Một khung ngăn xếp mới được thêm (push) vào đỉnh của Call Stack.",
    simRec_statusBaseCase: "<strong>Bước {step} (Đạt Base Case - PUSH):</strong><br>Gọi hàm <code>factorial(1)</code>. <br>Vì <code>x == 1</code>, điều kiện dừng (Base Case) được thỏa mãn. Hàm trả về ngay kết quả <strong>1</strong> mà không gọi đệ quy tiếp.<br>Ngăn xếp đạt độ sâu tối đa. Từ bước sau sẽ bắt đầu quy trình rút gọn ngăn xếp (Pop).",
    simRec_statusPop: "<strong>Bước {step} (Quay lui giải phóng - POP):</strong><br>Hàm <code>{topFrame}</code> đã hoàn thành và trả về giá trị <strong>{prevResult}</strong>. Nó bị lấy ra (pop) khỏi ngăn xếp.<br>Dữ liệu trả về được nhân vào tham số của hàm nằm dưới: <code>factorial({nextFrameX})</code>.<br>Kết quả tích lũy: <code>{prevResult} * {nextFrameX} = {result}</code>.",
    simRec_statusCompleted: "<strong>Bước {step} (Hoàn thành - POP):</strong><br>Hàm cuối cùng <code>factorial(4)</code> được giải phóng.<br>Kết quả cuối cùng thu được là: <strong style=\"font-size: 18px; color: #10b981;\">{result}</strong>.<br>Ngăn xếp cuộc gọi trống hoàn toàn.",

    simHash_title: "Mô phỏng Bảng băm & Va chạm (Hash Collisions)",
    simHash_desc: "Nhập khóa (key) và giá trị (value) để chèn vào Bảng băm kích thước N=8.<br>Hàm băm đơn giản: <code>Index = (Tổng mã ASCII của ký tự) % 8</code>. Nếu 2 key trùng Index sẽ tạo ra <strong>Danh sách liên kết (Collision)</strong>.",
    simHash_btnInsert: "Chèn dữ liệu",
    simHash_btnClear: "Xóa bảng",
    simHash_tableTitle: "Cấu trúc lưu trữ (Bảng băm kích thước 8):",
    simHash_logTitle: "Công thức & Log hoạt động:",
    simHash_logInit: "Chưa có hoạt động. Nhập key và bấm chèn dữ liệu.",
    simHash_alertKey: "Vui lòng nhập Key!",
    simHash_update: "<span style=\"color:#f59e0b;\">Cập nhật:</span> Key <strong>{key}</strong> đã tồn tại. Thay thế giá trị thành <strong>{value}</strong> tại index {index}.",
    simHash_collision: "<span style=\"color:#ef4444;\">Va chạm (Collision)!</span> Index {index} đã có dữ liệu. Đã thêm <strong>{key}</strong> vào cuối danh sách liên kết của index {index}.",
    simHash_success: "<span style=\"color:#10b981;\">Thành công:</span> Thêm cặp <code>{key}: {value}</code> vào ô trống index {index}.",
    simHash_formula: "<strong>Tính toán Hash:</strong><br>• Chữ '{key}': {breakdown} = tổng <strong>{sum}</strong>.<br>• Phép lấy dư: <code>{sum} % 8 = {index}</code>.<br><br><strong>Hành động:</strong><br>{statusText}",
    simHash_cleared: "Đã dọn dẹp bảng băm.",

    simBfs_title: "Mô phỏng Tìm kiếm theo chiều rộng (Breadth-First Search)",
    simBfs_desc: "Mục tiêu: Tìm người bán xoài (tên kết thúc bằng chữ <strong>'m'</strong>) xuất phát từ bạn (<strong>You</strong>). BFS đảm bảo tìm ra người bán xoài gần bạn nhất trong mạng lưới bạn bè.",
    simBfs_graphTitle: "Mạng lưới Bạn bè (Graph):",
    simBfs_queueTitle: "Hàng đợi BFS (Queue) & Trạng thái:",
    simBfs_queueEmpty: "Hàng đợi rỗng",
    simBfs_statusInit: "Nhấn \"Bước tiếp\" để bắt đầu đẩy bạn bè của bạn vào hàng đợi.",
    simBfs_statusStart: "<strong>Trạng thái ban đầu:</strong><br>Bạn được đánh dấu đã duyệt. Thêm bạn bè trực tiếp của bạn vào hàng đợi: <strong>Alice, Bob, Claire</strong>.",
    simBfs_statusQueueEmptyResult: "<strong>Kết quả:</strong> Đã duyệt toàn bộ đồ thị mà không tìm thấy người bán xoài nào!",
    simBfs_statusFound: "<strong>Bước {step}:</strong> Lấy <strong>{label}</strong> ra khỏi hàng đợi.<br><span style=\"color:#10b981; font-weight:bold;\">Tìm thấy người bán xoài!</span> Tên \"{label}\" kết thúc bằng chữ 'm'.<br>Hoàn thành tìm kiếm!",
    simBfs_statusChecked: "<strong>Bước {step}:</strong> Lấy <strong>{label}</strong> ra khỏi hàng đợi và kiểm tra.<br>Không phải người bán xoài. {addedText}",
    simBfs_addedFriend: "Thêm bạn bè của họ chưa duyệt vào hàng đợi: <strong>{added}</strong>",
    simBfs_noFriend: "Không có bạn bè mới cần thêm.",

    simDj_title: "Mô phỏng Thuật toán Dijkstra",
    simDj_desc: "Tìm đường đi ngắn nhất từ nút <strong>Start</strong> đến nút <strong>Fin</strong>. Cạnh có số thể hiện trọng số (chi phí).",
    simDj_graphTitle: "Đồ thị & Trọng số (SVG):",
    simDj_tableTitle: "Bảng chi phí (Costs Table):",
    simDj_tableNode: "Nút",
    simDj_tableCost: "Chi phí từ Start",
    simDj_tableParent: "Nút cha",
    simDj_statusInit: "Bấm \"Bước tiếp\" để bắt đầu thuật toán.",
    simDj_statusStart: "<strong>Khởi tạo:</strong> Đã cập nhật chi phí ban đầu từ Start:<br>• Đi tới A tốn <strong>6</strong><br>• Đi tới B tốn <strong>2</strong><br>• Đi tới Fin tốn <strong>vô cùng (∞)</strong>",
    simDj_statusCompleted: "<strong>Hoàn thành!</strong> Đã xử lý tất cả các nút.<br>Đường đi ngắn nhất: <strong style=\"color:#10b981;\">{path}</strong> với tổng chi phí = <strong>{cost}</strong>.",
    simDj_statusStep: "<strong>Bước {step}:</strong> Chọn nút rẻ nhất chưa xử lý là <strong>{node}</strong> (chi phí = <strong>{cost}</strong>).",
    simDj_statusUpdate: "• Cập nhật chi phí tới <strong>{n}</strong>: <code>{newCost}</code> (qua {node}).",
    simDj_statusNoUpdate: "• Đi tới <strong>{n}</strong> qua {node} tốn <code>{newCost}</code> (không tốt hơn chi phí hiện tại <code>{cost}</code>).",

    simKnn_title: "Mô phỏng K-Láng giềng gần nhất (KNN)",
    simKnn_desc: "Click chuột vào vùng bản đồ thị dưới để tạo một quả <strong>Cam hoặc Táo mới</strong> (tọa độ đại diện cho Độ ngọt và Kích thước). KNN sẽ tìm K điểm gần nhất để phân loại quả đó.",
    simKnn_kVal: "Giá trị K: ",
    simKnn_btnClear: "Xóa điểm test",
    simKnn_legendTitle: "Chú giải:",
    simKnn_legendOrange: "Cam (Orange)",
    simKnn_legendApple: "Táo (Apple)",
    simKnn_legendTest: "Quả cần đoán",
    simKnn_resultTitle: "Kết quả phân loại:",
    simKnn_statusInit: "Click vào đồ thị bên trái để bắt đầu đoán loại quả.",
    simKnn_sweetnessLabel: "← Ít ngọt (Độ Ngọt) Nhiều ngọt →",
    simKnn_sizeLabel: "↑ Quả to (Kích thước)",
    simKnn_statusResult: "• Tọa độ test: <code>Sweet={sweet}, Size={size}</code>.<br>• Kết quả lân cận (K={kVal}): <br>- Cam (Đỏ): <strong>{oranges}</strong> quả.<br>- Táo (Xanh): <strong>{apples}</strong> quả.<br>➔ Phân loại quả này là: <strong style=\"color:{color}; font-size:15px;\">{winner}</strong>.",
    simKnn_orange: "Cam (Orange)",
    simKnn_apple: "Táo (Apple)",
    simKnn_clearStatus: "Đã xóa điểm test. Click vào đồ thị để test lại."
  },
  en: {
    appSubtitle: "Interactive Explorer – Discover algorithms in small chunks",
    tabDashboard: "📊 Dashboard",
    tabMindmap: "🗺️ Mind Map",
    searchPlaceholder: "Search concepts... (Big O, Hash, BFS...)",
    noResults: "No results found for",
    searchTip: "Try searching other keywords, e.g. \"hash\", \"BFS\", \"Big O\"",
    conceptCount: "concepts",
    quizCount: "quizzes",
    backToDashboard: "← Back to Dashboard",
    backToDashboardMap: "← Dashboard",
    tabSimulator: "🧪 Simulator",
    tabCode: "💻 Sample Code",
    tabQuiz: "❓ Quiz",
    noCode: "No sample code available for this chapter.",
    noQuiz: "No quizzes available for this chapter.",
    questionPrefix: "Question",
    quizFeedbackCorrect: "✅ Correct! You understood the concept.",
    quizFeedbackIncorrect: "❌ Incorrect. The correct answer is",
    mindmapTitle: "🗺️ Mind Map – Grokking Algorithms",
    mindmapTip: "🖱️ Scroll to zoom • Drag to pan<br>Click on a chapter node to view details",
    tryItBtn: "🧪 Try it – View Simulator & Code",
    zoomOut: "Zoom Out",
    zoomIn: "Zoom In",
    zoomReset: "Reset",

    // Simulators UI Texts
    simBS_title: "Binary Search Simulator",
    simBS_desc: "Enter a number to find or pick one from the array. Click \"Step\" to see the algorithm narrow down the search range.",
    simBS_target: "Target number: ",
    simBS_btnInit: "Reset",
    simBS_btnStep: "Step",
    simBS_statusInit: "<strong>Status:</strong> Press \"Step\" to start searching.",
    simBS_statusStart: "<strong>Status:</strong> Start searching for <strong>{target}</strong> in an array of 14 elements.<br>Current search range: index <strong>{low}</strong> to <strong>{high}</strong> (full array).",
    simBS_statusNotFound: "<strong>Result:</strong> Value <strong>{target}</strong> not found in the array!<br>Algorithm ended after <strong>{stepCount}</strong> steps because <code>low > high</code>.",
    simBS_statusFound: "<strong style=\"color:#10b981;\">Found!</strong> Number <strong>{target}</strong> is at index <strong>{mid}</strong>.<br>Completed in <strong>{stepCount}</strong> comparison steps!",
    simBS_statusStepLeft: "<strong>Step {stepCount}:</strong> Compare middle element <code>mid = {mid}</code> (value <code>{guess}</code>) with target <code>{target}</code>.<br>Since <code>{guess} > {target}</code>, target is in the left half. Update <code>high = mid - 1 = {high}</code>.",
    simBS_statusStepRight: "<strong>Step {stepCount}:</strong> Compare middle element <code>mid = {mid}</code> (value <code>{guess}</code>) with target <code>{target}</code>.<br>Since <code>{guess} < {target}</code>, target is in the right half. Update <code>low = mid + 1 = {low}</code>.",

    simSS_title: "Arrays vs Linked Lists & Selection Sort Simulator",
    simSS_tabMemory: "Memory (Array vs Linked List)",
    simSS_tabSort: "Selection Sort",
    simSS_descArray: "<strong>Array:</strong> Elements are stored contiguously in memory. Random access is <code>O(1)</code> by adding indices. Inserts/Deletes are slow because elements must be shifted.",
    simSS_descList: "<strong>Linked List:</strong> Elements are scattered in memory. Each element points to the next. Inserts/Deletes are <code>O(1)</code> by changing pointers. Random access is slow <code>O(n)</code>.",
    simSS_descSort: "Click \"Step\" to find the smallest element in the unsorted array, remove it, and push it to the sorted array.",
    simSS_btnUnsorted: "Unsorted Array:",
    simSS_btnSorted: "Sorted Array:",
    simSS_statusInit: "<strong>Status:</strong> Click \"Step\" to start selection sort.",
    simSS_statusStart: "<strong>Status:</strong> Start sorting array <code>[{array}]</code>. <br>Click \"Step\" to find the smallest element.",
    simSS_statusCompleted: "<strong style=\"color:#10b981;\">Completed!</strong> Array sorted in ascending order: <code>[{array}]</code>.",
    simSS_statusSearching: "<strong>Searching:</strong> Initialize smallest element as <code>{smallest}</code> at index 0. Comparing with subsequent elements...",
    simSS_statusFoundNew: "Compare <code>{guess}</code> with current smallest <code>{smallest}</code>.<br>Since <code>{guess} < {smallest}</code>, update smallest to <code>{guess}</code> (index <code>{idx}</code>).",
    simSS_statusKeep: "Compare <code>{guess}</code> with current smallest <code>{smallest}</code>.<br>Since it is larger or equal, keep current smallest.",
    simSS_statusMove: "<strong>Move:</strong> The smallest element found is <code>{val}</code>.<br>Remove it from the unsorted array and append it to the sorted array.",
    simSS_empty: "Empty",

    simRec_title: "Recursion Call Stack Simulator",
    simRec_desc: "Compute Factorial of 4: <code>factorial(4) = 4 * 3 * 2 * 1 = 24</code>.<br>Click \"Step\" to see functions pushed onto and popped off the Call Stack.",
    simRec_stackTitle: "Call Stack:",
    simRec_varsTitle: "State Variables Table:",
    simRec_statusInit: "Press \"Step\" to start execution of factorial(4).",
    simRec_statusStart: "<strong>Initial Status:</strong><br>First call: <code>factorial(4)</code>. <br>The system starts creating a stack frame for this function.",
    simRec_statusPush: "<strong>Step {step} (Recursion going down - PUSH):</strong><br>Call <code>factorial({val})</code>. <br>Since <code>x > 1</code>, the program runs the <em>Recursive Case</em> and calls <code>factorial({nextVal})</code>.<br>A new stack frame is pushed to the top of the Call Stack.",
    simRec_statusBaseCase: "<strong>Step {step} (Base Case reached - PUSH):</strong><br>Call <code>factorial(1)</code>. <br>Since <code>x == 1</code>, the stop condition (Base Case) is met. The function returns <strong>1</strong> immediately without further calls.<br>The stack has reached maximum depth. Pop operations will start next.",
    simRec_statusPop: "<strong>Step {step} (Winding down - POP):</strong><br>Function <code>{topFrame}</code> finished and returned <strong>{prevResult}</strong>. It is popped off the stack.<br>The returned value is multiplied into the parameter of the function below: <code>factorial({nextFrameX})</code>.<br>Accumulated result: <code>{prevResult} * {nextFrameX} = {result}</code>.",
    simRec_statusCompleted: "<strong>Step {step} (Completed - POP):</strong><br>The final function <code>factorial(4)</code> is popped off the stack.<br>The final result obtained is: <strong style=\"font-size: 18px; color: #10b981;\">{result}</strong>.<br>Call Stack is now completely empty.",

    simHash_title: "Hash Tables & Collisions Simulator",
    simHash_desc: "Enter a key and a value to insert into a Hash Table of size N=8.<br>Simple hash function: <code>Index = (Sum of character ASCII values) % 8</code>. Duplicate indices will resolve using a <strong>Linked List (Collision)</strong>.",
    simHash_btnInsert: "Insert Data",
    simHash_btnClear: "Clear Table",
    simHash_tableTitle: "Storage Structure (Hash Table of size 8):",
    simHash_logTitle: "Formula & Operation Log:",
    simHash_logInit: "No activity yet. Enter a key and click Insert Data.",
    simHash_alertKey: "Please enter a Key!",
    simHash_update: "<span style=\"color:#f59e0b;\">Update:</span> Key <strong>{key}</strong> already exists. Replacing its value with <strong>{value}</strong> at index {index}.",
    simHash_collision: "<span style=\"color:#ef4444;\">Collision!</span> Index {index} already has data. Appended <strong>{key}</strong> to the linked list of index {index}.",
    simHash_success: "<span style=\"color:#10b981;\">Success:</span> Added pair <code>{key}: {value}</code> to empty slot at index {index}.",
    simHash_formula: "<strong>Hash Calculation:</strong><br>• Word '{key}': {breakdown} = sum <strong>{sum}</strong>.<br>• Modulo operation: <code>{sum} % 8 = {index}</code>.<br><br><strong>Action:</strong><br>{statusText}",
    simHash_cleared: "Cleared the hash table.",

    simBfs_title: "Breadth-First Search (BFS) Simulator",
    simBfs_desc: "Goal: Find a mango seller (name ending with <strong>'m'</strong>) starting from you (<strong>You</strong>). BFS guarantees to find the closest mango seller in your network.",
    simBfs_graphTitle: "Friends Network (Graph):",
    simBfs_queueTitle: "BFS Queue (FIFO) & Status:",
    simBfs_queueEmpty: "Queue is empty",
    simBfs_statusInit: "Press \"Step\" to start pushing friends into the queue.",
    simBfs_statusStart: "<strong>Initial Status:</strong><br>You are marked as searched. Add your direct friends to the queue: <strong>Alice, Bob, Claire</strong>.",
    simBfs_statusQueueEmptyResult: "<strong>Result:</strong> Traversed the entire graph but found no mango seller!",
    simBfs_statusFound: "<strong>Step {step}:</strong> Remove <strong>{label}</strong> from queue and check.<br><span style=\"color:#10b981; font-weight:bold;\">Mango seller found!</span> Name \"{label}\" ends with 'm'.<br>Search complete!",
    simBfs_statusChecked: "<strong>Step {step}:</strong> Remove <strong>{label}</strong> from queue and check.<br>Not a mango seller. {addedText}",
    simBfs_addedFriend: "Add their unvisited friends to the queue: <strong>{added}</strong>",
    simBfs_noFriend: "No new friends to add.",

    simDj_title: "Dijkstra's Shortest Path Simulator",
    simDj_desc: "Find the shortest path from the <strong>Start</strong> node to the <strong>Fin</strong> node. Numbers represent edge weights (costs).",
    simDj_graphTitle: "Graph & Weights (SVG):",
    simDj_tableTitle: "Costs Table:",
    simDj_tableNode: "Node",
    simDj_tableCost: "Cost from Start",
    simDj_tableParent: "Parent Node",
    simDj_statusInit: "Click \"Step\" to start the algorithm.",
    simDj_statusStart: "<strong>Initialization:</strong> Initial costs from Start updated:<br>• Cost to A is <strong>6</strong><br>• Cost to B is <strong>2</strong><br>• Cost to Fin is <strong>infinity (∞)</strong>",
    simDj_statusCompleted: "<strong>Completed!</strong> Processed all nodes.<br>Shortest path: <strong style=\"color:#10b981;\">{path}</strong> with total cost = <strong>{cost}</strong>.",
    simDj_statusStep: "<strong>Step {step}:</strong> Select the cheapest unprocessed node: <strong>{node}</strong> (cost = <strong>{cost}</strong>).",
    simDj_statusUpdate: "• Update cost to <strong>{n}</strong>: <code>{newCost}</code> (via {node}).",
    simDj_statusNoUpdate: "• Route to <strong>{n}</strong> via {node} costs <code>{newCost}</code> (not better than current cost <code>{cost}</code>).",

    simKnn_title: "K-Nearest Neighbors (KNN) Simulator",
    simKnn_desc: "Click inside the plot to plot a new <strong>Orange or Apple</strong> (coordinates represent Sweetness and Size). KNN will find the K closest neighbors to classify it.",
    simKnn_kVal: "K Value: ",
    simKnn_btnClear: "Clear Test Point",
    simKnn_legendTitle: "Legend:",
    simKnn_legendOrange: "Orange",
    simKnn_legendApple: "Apple",
    simKnn_legendTest: "Fruit to predict",
    simKnn_resultTitle: "Classification Result:",
    simKnn_statusInit: "Click on the graph to start predicting.",
    simKnn_sweetnessLabel: "← Less sweet (Sweetness) More sweet →",
    simKnn_sizeLabel: "↑ Large size (Size)",
    simKnn_statusResult: "• Test coordinates: <code>Sweet={sweet}, Size={size}</code>.<br>• Nearest neighbors result (K={kVal}): <br>- Orange (Red): <strong>{oranges}</strong> fruits.<br>- Apple (Green): <strong>{apples}</strong> fruits.<br>➔ Classify this fruit as: <strong style=\"color:{color}; font-size:15px;\">{winner}</strong>.",
    simKnn_orange: "Orange",
    simKnn_apple: "Apple",
    simKnn_clearStatus: "Cleared the test point. Click on the graph to test again."
  }
};
