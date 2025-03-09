import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
// Functions ============================================================
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
// Begin ================================================================
const reviewsRefs = {
  list: document.querySelector('#reviews-list'),
  nav: document.querySelector('.reviews-swiper-nav'),
  errLabel: document.querySelector('.reviews-err'),
  errBtn: document.querySelector('.reviews-err-btn'),
};
try {
  // Populate the reviews list
  const serverReviews = await getReviews();
  reviewsRefs.list.innerHTML = reviewsTemplate(serverReviews.data);
  // Initialize swiper on the reviews list
  const reviewsSwiperConfig = {
    navigation: {
      nextEl: '.reviews-next-card',
      prevEl: '.reviews-previous-card',
    },
    slidesPerView: 1,
    spaceBetween: 16,
    grabCursor: true,
    // mousewheel: true,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1440: {
        slidesPerView: 4,
      },
    },
  };
  const reviewsSwiper = new Swiper('.reviews-swiper', reviewsSwiperConfig);
} catch (err) {
  reviewsRefs.nav.classList.add('js-hidden');
  reviewsRefs.errLabel.classList.remove('js-hidden');
  reviewsRefs.errBtn.classList.remove('js-hidden');
  reviewsRefs.errBtn.addEventListener('click', () => {
    iziToast.error({
      message: `${err.message}`,
      position: 'bottomRight',
    });
  });
}
