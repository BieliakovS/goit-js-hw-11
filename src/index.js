import ImageCard from './templates/imageCard.hbs';
import { getImages } from './js/getImages';
import Notiflix from 'notiflix';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
};

function onSubmitForm(e) {
  e.preventDefault();
  const inputValue = refs.searchForm.elements['searchQuery'].value;

  getImages(inputValue)
    .then(({ hits }) => {
      if (hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      refs.gallery.innerHTML = '';
      let markup = '';
      for (let i = 0; i < hits.length; i += 1) {
        markup += ImageCard(hits[i]);
      }
      refs.gallery.innerHTML = markup;
    })
    .catch(console.warn);
}

refs.searchForm.addEventListener('submit', onSubmitForm);
