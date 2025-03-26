let employees = [
    {
        id: 1,
        staffName: `Nguyễn Văn A`,
        position: `Developer`
    }
];




const formElement = document.querySelector("#form");
const inputElement = document.querySelector("#nameInput");
const positionElement = document.querySelector("#positionInput");
const employeeLocals = JSON.parse(localStorage.getItem("employs")) || employees;
const tableElement = document.querySelector("#bodyTable");

// phân trang
const paginationElement = document.querySelector(".pagination");

let currentPage = 1;
// Số lượng nhân viên hiển thị trên mỗi trang
const totalPerPage = 3; 

// Cập nhật tổng số trang
const getTotalPages = Math.ceil(employeeLocals.length / totalPerPage);

// Render dữ liệu theo trang
const renderData = (page = 1) => {
    const start = (page - 1) * totalPerPage;
    const end = start + totalPerPage;
    const currentEmployees = employeeLocals.slice(start, end);

    const htmls = currentEmployees.map((staff, index) => {
        return `
        <tr>
            <td>${start + index + 1}</td>
            <td>${staff.staffName}</td>
            <td>${staff.position}</td>
        </tr>`;
    });

    tableElement.innerHTML = htmls.join("");
};

// Hàm render nút phân trang
const renderPagination = () => {
    paginationElement.innerHTML = ""; // Xóa các nút cũ
    const totalPages = getTotalPages;

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement("li");
        li.classList.add("page-item");
        li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        // Xử lý sự kiện khi bấm vào số trang
        li.addEventListener("click", () => {
            currentPage = i;
            renderData(currentPage);
            renderPagination(); // Cập nhật lại giao diện phân trang
        });

        paginationElement.appendChild(li);
    }
};
// --------------

formElement.addEventListener("submit", function (event) {
    event.preventDefault();
    const inputValue = inputElement.value.trim();
    const positionValue = positionElement.value.trim();

    if (inputValue && positionValue) {
        const newStaff = {
            id: Math.ceil(Math.random() * 100),
            staffName: inputValue,
            position: positionValue
        };

        employeeLocals.push(newStaff);
        localStorage.setItem("employs", JSON.stringify(employeeLocals));
         // Chuyển đến trang cuối sau khi thêm nhân viên mới
        currentPage = getTotalPages;
        renderData(currentPage);
        renderPagination();

        inputElement.value = "";
        positionElement.value = "";
    }
});

// Khởi tạo dữ liệu ban đầu
renderData(currentPage);
renderPagination();


