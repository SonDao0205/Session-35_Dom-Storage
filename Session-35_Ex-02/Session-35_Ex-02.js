const addBookmarkElement = document.querySelector("#addBookmark"); // Thêm sự kiện hiển thị popup
const popUpElement = document.querySelector("#popUp"); // Popup thêm bookmark
const listBookmarkElement = document.querySelector("#listBookmark");
const formElement = document.querySelector("#form");
const websiteNameInput = document.querySelector("#websiteNameInput");
const websiteURLInput = document.querySelector("#websiteURLInput");
let bookmarkLocals = JSON.parse(localStorage.getItem("bookmarks")) || [];

// Hiển thị popup khi nhấn "ADD BOOKMARK"
addBookmarkElement.addEventListener("click", () => {
    popUpElement.style.display = "block";
});

// Ẩn popup khi nhấn nút đóng
document.querySelector(".deletePopup").addEventListener("click", () => {
    popUpElement.style.display = "none";
});

// Hàm render danh sách bookmark
const renderData = () => {
    listBookmarkElement.innerHTML = "";
    const htmls = bookmarkLocals.map((bookmark) => {
        return `
        <li>
            <p>${bookmark.name}</p>
            <button type="button" class="btn-close deleteLi" data-id="${bookmark.id}" aria-label="Close"></button>
        </li>`;
    });
    listBookmarkElement.innerHTML = htmls.join("");

    document.querySelectorAll(".deleteLi").forEach(button => {
        button.addEventListener("click", (event) => {
            const id = parseInt(event.target.getAttribute("data-id"), 10);
            deleteBookmark(id);
        });
    });
};
renderData();

// Hàm xoá bookmark
const deleteBookmark = (id) => {
    if (confirm("Bạn có chắc chắn muốn xoá không?")) {
        bookmarkLocals = bookmarkLocals.filter(bookmark => bookmark.id !== id);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarkLocals));
        renderData();
    }
};

// Xử lý thêm bookmark mới
formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = websiteNameInput.value.trim();
    const url = websiteURLInput.value.trim();

    if (!name || !url) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    const newBookmark = {
        id: Date.now(),
        name: name,
        url: url
    };

    bookmarkLocals.push(newBookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkLocals));

    renderData();
    popUpElement.style.display = "none"; // Ẩn popup sau khi thêm
    websiteNameInput.value = "";
    websiteURLInput.value = "";
});
