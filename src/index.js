import { fetchBreeds, fetchCatByBreed } from './cat-api';
import './index.css';
import SlimSelect from 'slim-select';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
//import 'slim-select/dist/slimselect.css';

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

loader.classList.replace('loader', 'is-hidden');
error.classList.add('is-hidden');
catInfo.classList.add('is-hidden');

const cats = [];
fetchBreeds()
  .then(data => {
    data.forEach(el => {
      cats.push({ text: el.name, value: el.id });
    });
    new SlimSelect({
      select: select,
      data: cats,
    });
  })
  .catch(onError);

select.addEventListener('change', onSelectBreed);

function onSelectBreed(event) {
  loader.classList.replace('is-hidden', 'loader');
  select.classList.add('is-hidden');
  catInfo.classList.add('is-hidden');

  const breedId = event.currentTarget.value;

  fetchCatByBreed(breedId)
    .then(data => {
      loader.classList.replace('loader', 'is-hidden');
      select.classList.remove('is-hidden');
      const { url, breeds } = data[0];

      catInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`;
      catInfo.classList.remove('is-hidden');
    })
    .catch(onError);
}

function onError(error) {
  select.classList.remove('is-hidden');
  loader.classList.replace('loader', 'is-hidden');
  Notify.failure('Ops! Something went wrong!', {
    position: 'center-center',
    width: '400px',
    fontSize: '60px',
  });
}
