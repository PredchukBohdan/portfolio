import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

document.addEventListener('DOMContentLoaded', function () {
  const swiper = new Swiper('.swiper-container', {
    loop: false,
    grabCursor: true,
    simulateTouch: true,
    touchRatio: 1,
    keyboard: { enabled: true, onlyInViewport: true },
    speed: 500,
    navigation: {
      nextEl: '.swiper-navigation .swiper-button-next',
      prevEl: '.swiper-navigation .swiper-button-prev',
    },
  });
});
