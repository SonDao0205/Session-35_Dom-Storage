const popUpElement = document.querySelector("#addPopUp")
const cancelPopUpElement = document.querySelector("#cancelButton")
// Hiện và tắt popUp
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