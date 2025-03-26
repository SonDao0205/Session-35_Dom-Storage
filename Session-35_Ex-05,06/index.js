// Hiện và tắt popUp
const popUpElement = document.querySelector("#addPopUp")
const cancelPopUpElement = document.querySelector("#cancelButton")
const showPopup = () => {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('popUp').style.display = 'block';
};

const hidePopup = () => {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('popUp').style.display = 'none';
};

document.querySelector('[data-bs-toggle="modal"]').addEventListener('click', showPopup);
document.querySelector('.btn-close').addEventListener('click', hidePopup);

// Nhập và lưu dữ liệu
const category = [
    {
        id:`DM001`,
        categoryName:`Quần áo`,
        status: false
    }
]
const formElement = document.querySelector("#form")
const idProductElement = document.querySelector("#idProduct")
const nameProductElement = document.querySelector("#nameProduct")
const categoryLocals = JSON.parse(localStorage.getItem("category")) || []
const listElement = document.querySelector("#bodyTable")
const addElement = document.querySelector("#addButton")
const radioValue = document.querySelector("input[name='flexRadioDefault']:checked").value
const optionFilterElement = document.querySelector("#optionFilter")
let editIndex = -1
const searchInputElement = document.querySelector("#searchInput")
const searchButtonElement = document.querySelector("#searchButton")

const renderData = () => {
    const htmls = categoryLocals.map((category,index) => {
        return`
        <tr class="align-middle">
            <td scope="row">${category.id}</td>
            <td>${category.categoryName}</td>
            <td>
                ${category.status === true 
                    ?`<span class="status active">
                        <span class="dot"></span> Đang hoạt động
                    </span>` :
                    `<span class="status inactive">
                        <span class="dot"></span> Ngừng hoạt động
                    </span>`
                }
            </td>
            <td>
                <i class="bi bi-trash3" onclick="handleDelete(${index})" id="deleteButton"></i>
                <span>&nbsp;</span>
                <i class="bi bi-pencil" onclick="handleEdit(${index})" id="editButton"></i>
            </td>
        </tr>`
    })
    const convert = htmls.join("")
    listElement.innerHTML = convert
    const deleteButton = document.querySelectorAll("#deleteButton")
    const editButton = document.querySelectorAll("#editButton")
}
renderData()


// Hàm edit
function handleEdit(index) {
    // Cập nhật vị trí đang chỉnh sửa
    editIndex = index; 
    addElement.textContent = "Lưu";
    showPopup();

    idProductElement.value = categoryLocals[index].id;
    nameProductElement.value = categoryLocals[index].categoryName;
    
    // Đặt trạng thái radio button theo dữ liệu cũ
    document.querySelector(`input[name='flexRadioDefault'][value='${categoryLocals[index].status ? "1" : "0"}']`).checked = true;
}

// Hàm xoá
function handleDelete(index) {
    if (confirm(`Bạn có chắc chắn muốn xoá không?`)) {
        categoryLocals.splice(index,1)
        localStorage.setItem("category",JSON.stringify(categoryLocals))
        renderData()
    }
}

formElement.addEventListener("submit", function(event) {
    event.preventDefault();
    const idValue = idProductElement.value.trim();
    const nameValue = nameProductElement.value.trim();
    const statusValue = document.querySelector("input[name='flexRadioDefault']:checked").value; // Lấy giá trị radio tại thời điểm submit
    if (idValue.length === 0 || nameValue.length === 0) {
        idProductElement.style.border = "1px solid red";
        nameProductElement.style.border = "1px solid red";
        const errorText = document.querySelectorAll(".error")
        errorText.forEach(error => {
            error.style.display = "block";
        });
        return
    }
    else {
        idProductElement.style.border = "1px solid #ced4da";
        nameProductElement.style.border = "1px solid #ced4da";
        const errorText = document.querySelectorAll(".error")
        errorText.forEach(error => {
            error.style.display = "none";
        });
    }
    if (editIndex >= 0) {
        categoryLocals[editIndex].id = idValue;
        categoryLocals[editIndex].categoryName = nameValue;
        categoryLocals[editIndex].status = statusValue === "1";
        editIndex = -1; // Reset lại trạng thái
        addElement.textContent = "Thêm"; // Đổi nút về "Add"
    }
    else{
        const newCategory = {
            id: idValue,
            categoryName: nameValue,
            status: statusValue === "1"
        };
        categoryLocals.push(newCategory);
    }
    localStorage.setItem("category", JSON.stringify(categoryLocals));
    renderData();

    // Reset form sau khi thêm xong
    idProductElement.value = "";
    nameProductElement.value = "";
    hidePopup()
});


// filter
optionFilterElement.addEventListener("change", function () {
    let filteredCategories = categoryLocals;

    if (optionFilterElement.value === "2") {
        filteredCategories = categoryLocals.filter(category => category.status === true);
    } else if (optionFilterElement.value === "3") {
        filteredCategories = categoryLocals.filter(category => category.status === false);
    }

    renderFilteredData(filteredCategories);
});

const renderFilteredData = (filteredCategories) => {
    const htmls = filteredCategories.map((category, index) => {
        return `
        <tr class="align-middle">
            <td scope="row">${category.id}</td>
            <td>${category.categoryName}</td>
            <td>
                ${category.status === true 
                    ? `<span class="status active">
                        <span class="dot"></span> Đang hoạt động
                    </span>` :
                    `<span class="status inactive">
                        <span class="dot"></span> Ngừng hoạt động
                    </span>`
                }
            </td>
            <td>
                <i class="bi bi-trash3" onclick="handleDelete(${index})" id="deleteButton"></i>
                <span>&nbsp;</span>
                <i class="bi bi-pencil" onclick="handleEdit(${index})" id="editButton"></i>
            </td>
        </tr>`;
    });
    const convert = htmls.join("");
    listElement.innerHTML = convert;
};

// Search
searchButtonElement.addEventListener("click", function (event) {
    event.preventDefault();
    const searchValue = searchInputElement.value.trim().toLowerCase();
    const index = categoryLocals.findIndex((category) => category.categoryName.toLowerCase().includes(searchValue));
    if (index === -1) {
        alert("Không tìm thấy sản phẩm");
        return;
    }
    renderFilteredData([categoryLocals[index]]);
})
