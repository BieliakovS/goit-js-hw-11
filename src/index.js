import ImageCard from './templates/imageCard.hbs';
import { getImages } from './js/getImages';
import Notiflix from 'notiflix';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.searchForm.addEventListener('submit', onSubmitForm);

async function onSubmitForm(e) {
  e.preventDefault();
  const inputValue = refs.searchForm.elements['searchQuery'].value;

  try {
    const obj = await getImages(inputValue);

    if (obj.data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else if (obj.data.hits.length < 40) {
      markGallery(obj);
    }
    markGallery(obj);
  } catch (error) {
    console.warn(error);
  }
}

function markGallery(obj) {
  let markup = '';
  for (let i = 0; i < obj.data.hits.length; i += 1) {
    markup += ImageCard(obj.data.hits[i]);
  }
  refs.gallery.innerHTML = markup;
}
