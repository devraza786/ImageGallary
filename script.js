const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const filterButtons = document.querySelectorAll('[data-filter]');


let currentIndex = 0;
let images = [];

function updateLightbox(index) {
  lightboxImg.src = images[index].querySelector('img').src;
}

galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
   images = Array.from(document.querySelectorAll('.gallery-item:not(.hide)'));
    currentIndex = images.indexOf(item);
    updateLightbox(currentIndex);
    lightbox.style.display = 'flex';
  });
});

closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateLightbox(currentIndex);
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateLightbox(currentIndex);
});

document.addEventListener('keydown', (e) => {
  if (lightbox.style.display === 'flex') {
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'Escape') closeBtn.click();
  }
});

// Category filtering

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');

    galleryItems.forEach(item => {
      const category = item.getAttribute('data-category');

      if (filter === 'all' || category === filter) {
        item.classList.remove('hide');
      } else {
        item.classList.add('hide');
      }
    });
  });
});