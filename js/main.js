import galleryList from "./gallery-items.js";

const gallery = document.querySelector(".js-gallery");
const lightBox = document.querySelector(".js-lightbox");
const modalImg = document.querySelector(".lightbox__image");
const window = document.body;
let imgIndex;

const imageCard = galleryList.map((elem, index) => {
  return `<li class="gallery__item">
  <a class="gallery_link" href="${elem.original}" >
  <img class="gallery__image" src="${elem.preview}" alt="${elem.description}" data-source="${elem.original}" data-index="${index}">
  </a>
  </li>`;
});

gallery.insertAdjacentHTML("beforeend", imageCard.join(""));
gallery.addEventListener("click", galleryOnClick);
lightBox.addEventListener("click", toCloseModal);

function galleryOnClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") return;
  lightBox.classList.add("is-open");
  imgIndex = +event.target.getAttribute("data-index");
  modalImg.src = event.target.dataset.source;
  modalImg.alt = event.target.alt;
  setKeyNavigation();
}

function setKeyNavigation() {
  window.addEventListener("keydown", toEscape);
  window.addEventListener("keydown", toChangeImg);
}

function removeKeyNavigation() {
  window.removeEventListener("keydown", toEscape);
  window.removeEventListener("keydown", toChangeImg);
}

function toCloseModal(event) {
  if (event.target.nodeName === "IMG") return;
  lightBox.classList.remove("is-open");
  modalImg.src = "";
  modalImg.alt = "";
  removeKeyNavigation();
}

function toEscape(event) {
  if (event.code === "Escape") toCloseModal(event);
}

function toChangeImg(event) {
  const left = "ArrowLeft";
  const right = "ArrowRight";
  switch (event.code) {
    case left:
      imgIndex -= 1;
      break;
    case right:
      imgIndex += 1;
      break;
  }
  if (imgIndex > galleryList.length - 1) {
    imgIndex = 0;
  }
  if (imgIndex < 0) {
    imgIndex = galleryList.length - 1;
  }
  modalImg.src = galleryList[imgIndex].original;
}
