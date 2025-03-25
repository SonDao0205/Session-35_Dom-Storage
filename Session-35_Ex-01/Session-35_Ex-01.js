const formElement = document.querySelector("#form")
const inputElement = document.querySelector("#inputForm")
const listTaskElement = document.querySelector("#listTask")
const taskLocals = JSON.parse(localStorage.getItem("tasks")) || []

const renderTask = ()=> {
    listTaskElement.textContent = ""
    taskLocals.forEach((element,index) => {
        // thêm phần từ li
        const liElement = document.createElement("li")
        // thêm div chứa 2 nút sửa và xoá
        const buttonContainer = document.createElement("div")
        liElement.textContent = element
        // xoá task
        const btnDelete = document.createElement("button")
        btnDelete.textContent = "Xoá"
        btnDelete.addEventListener("click",function(){
            taskLocals.splice(index,1)
            localStorage.setItem("tasks",JSON.stringify(taskLocals))
            renderTask()
        })
        // sửa task
        const btnUpdate = document.createElement("button")
        btnUpdate.textContent = "Sửa"
        btnUpdate.addEventListener("click",function(){
            const updateTask = prompt("Chỉnh sửa công việc")
            taskLocals[index] = updateTask
            localStorage.setItem("tasks",JSON.stringify(taskLocals))
            renderTask()
        })
        // thêm nút sửa vào div chứa nút
        buttonContainer.appendChild(btnUpdate)
        // thêm nút xoá vào div chứa nút
        buttonContainer.appendChild(btnDelete)
        // thêm div vào trong li
        liElement.appendChild(buttonContainer)
        // thêm li vào trong ul
        listTaskElement.appendChild(liElement)
    });
}

// thêm task
formElement.addEventListener("submit",function(event){
    event.preventDefault()
    const inputValue = inputElement.value
    if (inputValue) {
        taskLocals.push(inputValue)
        localStorage.setItem("tasks",JSON.stringify(taskLocals))
        renderTask()
        inputElement.value = ""
    }
})
renderTask()
