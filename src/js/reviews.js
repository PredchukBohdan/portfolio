import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
const reviewsRefs = {
  list: document.querySelector('#reviews-list'),
  nav: document.querySelector('.reviews-swiper-nav'),
  errLabel: document.querySelector('.reviews-err'),
  errBtn: document.querySelector('.reviews-err-btn'),
};
// Functions ============================================================
async function initReviews() {
  try {
    // Populate the reviews list
    const requestUrl = 'https://portfolio-js.b.goit.study/api/reviews';
    const serverReviews = await axios.get(requestUrl);
    if (!serverReviews.data.length)
      throw { message: 'There is no data to display.' };
    if (!reviewsRefs.list) throw { message: 'Unable to access list element.' };
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
      speed: 500,
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
    reviewsRefs.nav?.classList.add('js-hidden');
    reviewsRefs.errLabel?.classList.remove('js-hidden');
    reviewsRefs.errBtn?.classList.remove('js-hidden');
    reviewsRefs.errBtn?.addEventListener('click', () => {
      iziToast.error({
        message: `${err.message}`,
        position: 'bottomRight',
      });
    });
  }
}
function reviewTemplate({ author, avatar_url, review }) {
  return `<li class="swiper-slide" role="none">
            <img src="${avatar_url}" alt="${author}'s photo" loading="lazy"/>
            <h3>${author}</h3>
            <p>${review}</p>
          </li>`;
}
function reviewsTemplate(arr) {
  return arr.map(reviewTemplate).join('');
}
// Begin ================================================================
initReviews();
