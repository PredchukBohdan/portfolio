import Accordion from 'accordion-js';
import Swiper from 'swiper/bundle';
import 'accordion-js/dist/accordion.min.css';
import 'swiper/css/bundle';

document.addEventListener('DOMContentLoaded', () => {
  /* Accordion block */

  const aboutAccordionContainer = document.querySelector(
    '.accordion-container'
  );

  if (aboutAccordionContainer) {
    const aboutAccordion = new Accordion(aboutAccordionContainer, {
      showMultiple: true,
    });
    aboutAccordion.open(0);
  }

  /* Slider block */

  const aboutSwiperContainer = document.querySelector('.about-me-swiper');

  if (aboutSwiperContainer) {
    const aboutSwiper = new Swiper(aboutSwiperContainer, {
      loop: true,
      slidesPerView: 2,
      grabCursor: true,
      simulateTouch: true,
      touchRatio: 1,
      keyboard: { enabled: true, onlyInViewport: true },
      mousewheel: true,
      speed: 500,
      navigation: {
        nextEl: '.about-me-swiper__next',
      },
      breakpoints: { 768: { slidesPerView: 3 }, 1440: { slidesPerView: 6 } },
    });
  }
});
