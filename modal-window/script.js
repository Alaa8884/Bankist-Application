/** @format */

'use strict';
const btns = document.querySelectorAll('.btn');
const modal = document.querySelector('.modal');
const overLay = document.querySelector('.over-lay');
const closeBtn = document.querySelector('.cls-btn');

const openModel = function () {
  modal.classList.remove('hidden')
  overLay.classList.remove('hidden')
}
const closeModel = function () {
  modal.classList.add('hidden')
  overLay.classList.add('hidden')
}

for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", openModel);
}

closeBtn.addEventListener("click", closeModel)

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModel();
  }
  
})