// import axios from 'axios';
// console.log(axios.isCancel('something'));
// axios.defaults.headers.common['x-api-key'] = API_KEY;

const baseUrl = 'https://api.thecatapi.com/v1/breeds';
console.log(baseUrl);

const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

const API_KEY =
  'live_IdApGXIAKcxCAjhTnlmbrrlQITj7lRQEEX6tzNIuOlEm5HI0caFpwYL0JNML6eEz';

function fetchBreeds() {
  return fetch(`${baseUrl}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(cats => {
      console.log(cats);
      const markup = renderUserList(cats);
      console.log(markup);
    })
    .catch(error => {
      console.log(error);
    });
}

function renderUserList(cats) {
  const markup = cats
    .map(cat => {
      return `${cat.name}`;
      // `<li>
      //     <p> ${cat.name}</p>
      //   </li>`;
    })
    .join('');
  select.innerHTML = markup;
}

// select.addEventListener('click', () => {
//   fetchBreeds()
//     .then(cats => renderUserList(cats))
//     .catch(error => console.log(error));
// });
//fetchBreeds().then(renderUserList).catch();
