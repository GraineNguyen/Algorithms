const GrokkingData = [
  {
    id: 1,
    title: "Chapter 1: Introduction to Algorithms",
    subtitle: "Giới thiệu về Thuật toán, Binary Search & Ký hiệu Big O",
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
          "Giúp tìm đường đi có **tổng chi phí/trọng số nhỏ nhất** giữa nút bắt đầu và tất cả các nút khác trên đồ thị có trọng số dương.",
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
          "Để đo độ gần nhau giữa các điểm dữ liệu, ta dùng công thức khoảng cách (phổ biến nhất là **Khoảng cách Euclid**): <code>d = √((x₁-x₂)² + (y₁-y₂)² + ...)</code>.",
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
