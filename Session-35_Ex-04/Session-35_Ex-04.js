
let employees = [
    {
        id:1,
        staffName: `Nguyễn Văn A`,
        position: `Developer`
    }
]
const formElement = document.querySelector("#form")
const inputElement = document.querySelector("#nameInput")
const positionElement = document.querySelector("#positionInput")
const employeeLocals = JSON.parse(localStorage.getItem("employs")) || employees
const tableElement = document.querySelector("#bodyTable")

const renderData = () => {
    const htmls = employeeLocals.map((staff,index) => {
        return`
        <tr>
            <td>${index+1}</td>
            <td>${staff.staffName}</td>
            <td>${staff.position}</td>
        </tr>`
    })
    tableElement.innerHTML = htmls.join("")
}
renderData()

formElement.addEventListener("submit", function(event) {
    event.preventDefault();
    const inputValue = inputElement.value.trim();
    const positionValue = positionElement.value.trim()

    if (inputValue && positionValue) {
        const newStaff = {
            id: Math.ceil(Math.random() * 100),
            staffName: inputValue,
            position: positionValue
        };
        employeeLocals.push(newStaff)
        localStorage.setItem("employs",JSON.stringify(employeeLocals))
        renderData();
        inputElement.value = "";
    }
});