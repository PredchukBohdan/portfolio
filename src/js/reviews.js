import axios from 'axios';

async function getReviews() {
  return await axios.get('https://portfolio-js.b.goit.study/api/reviews');
}
function reviewTemplate({ author, avatar_url, review }) {
  return `<li>
            <img src="${avatar_url}" alt="${author}'s photo" />
            <h3>${author}</h3>
            <p>${review}</p>
          </li>`;
}
function reviewsTemplate(arr) {
  return arr.map(reviewTemplate).join('');
}

const reviewsUl = document.querySelector('.reviews-list');
try {
  const response = await getReviews();
  reviewsUl.innerHTML = reviewsTemplate(response.data);
} catch {}
