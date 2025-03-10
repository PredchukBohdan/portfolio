import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper('.swiper-container', {
        loop: false,
        navigation: {
             nextEl: '.swiper-navigation .swiper-button-next',
            prevEl: '.swiper-navigation .swiper-button-prev', 
           
        },
    });
});