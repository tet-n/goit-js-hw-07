import { galleryItems } from './gallery-items.js';
// Change code below this line

//REFERENCES
const galleryContainerRef = document.querySelector('.gallery');
const imageRef = document.querySelector('.gallery__image');

//Creating markup
galleryContainerRef.insertAdjacentHTML('afterbegin', creatingMarkup(galleryItems));

function creatingMarkup(gallery) {
  return gallery
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item"><a href="${original}" class="gallery__link">
  <img class="gallery__image" src="${preview}" alt="${description}" data-source="${original}"/></a></div>`;
    })
    .join('');
}

// Delegation
galleryContainerRef.addEventListener('click', onImageClick);

function onImageClick(e) {
  e.preventDefault();
  const isImage = e.target.classList.contains('gallery__image');
  if (!isImage) {
    return;
  }

  showFullScreenImage(e.target);
}

function showFullScreenImage(target) {
  const img = `
  <img src="${target.dataset.source}">
`;
  const instance = basicLightbox.create(img, {
    onShow: () => document.addEventListener('keydown', onCloseImageByKeyboard),
  });

  instance.show();

  function onCloseImageByKeyboard(e) {
    if (e.code !== 'Escape') {
      return;
    }
    instance.close();
    document.removeEventListener('keydown', onCloseImageByKeyboard);
  }
}

