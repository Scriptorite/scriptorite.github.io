const carousel = document.querySelector('.carousel');
const carouselItems = document.querySelectorAll('.carousel-item');
const carouselCaptions = document.querySelectorAll('.carousel-caption');

let activeIndex = 0;

carouselItems[activeIndex].classList.add('active');

setInterval(() => {
  carouselItems[activeIndex].classList.remove('active');
  activeIndex++;
  if (activeIndex >= carouselItems.length) {
    activeIndex = 0;
  }
  carouselItems[activeIndex].classList.add('active');
}, 3000); // Change the interval time to adjust the carousel speed
