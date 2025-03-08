import axios from 'axios';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

async function getReviews() {
  return await axios.get('https://portfolio-js.b.goit.study/api/reviews');
}
function reviewTemplate({ author, avatar_url, review }) {
  return `<li class="swiper-slide">
            <img src="${avatar_url}" alt="${author}'s photo" />
            <h3>${author}</h3>
            <p>${review}</p>
          </li>`;
}
function reviewsTemplate(arr) {
  return arr.map(reviewTemplate).join('');
}

const reviewsSwiper = document.querySelector('.reviews-swiper');
const reviewsUl = document.querySelector('#reviews-list');
try {
  const response = await getReviews();
  reviewsUl.innerHTML = reviewsTemplate(response.data);
  const reviewsSwiperConfig = {
    navigation: {
      nextEl: '.reviews-next-card',
      prevEl: '.reviews-previous-card',
    },
    slidesPerView: 1,
    grabCursor: true,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    mousewheel: true,
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
      1440: {
        slidesPerView: 4,
        spaceBetween: 16,
      },
    },
  };
  const reviewsSwiperInstance = new Swiper(reviewsSwiper, reviewsSwiperConfig);
} catch {}
