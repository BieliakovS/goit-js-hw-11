import ImageCard from './templates/imageCard.hbs';
import { getImages } from './js/getImages';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

let pageNumber = 1;
let searchQuery = '';
let totalHits = 0;
let nowHits = 0;

refs.searchForm.addEventListener('submit', onSubmitForm);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

async function onSubmitForm(e) {
  e.preventDefault();
  searchQuery = refs.searchForm.elements['searchQuery'].value;
  refs.loadMoreBtn.setAttribute('hidden', true);
  pageNumber = 1;
  totalHits = 0;
  nowHits = 0;
  refs.gallery.innerHTML = '';

  try {
    const obj = await getImages(searchQuery, pageNumber);

    totalHits = obj.data.totalHits;
    nowHits += obj.data.hits.length;

    if (nowHits <= obj.config.params.per_page) {
      Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
    }

    if (obj.data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );

      return;
    }

    markGallery(obj);

    refs.loadMoreBtn.removeAttribute('hidden');

    pageNumber += 1;
  } catch (error) {
    console.warn(error);
  }
}

async function onLoadMoreBtnClick(e) {
  e.preventDefault();

  try {
    const obj = await getImages(searchQuery, pageNumber);

    nowHits += obj.data.hits.length;

    markGallery(obj);

    if (nowHits >= totalHits) {
      refs.loadMoreBtn.setAttribute('hidden', true);

      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
    pageNumber += 1;
  } catch (error) {
    console.warn(error);
  }
}

function markGallery(obj) {
  let markup = '';

  for (let i = 0; i < obj.data.hits.length; i += 1) {
    markup += ImageCard(obj.data.hits[i]);
  }

  refs.gallery.insertAdjacentHTML('beforeend', markup);

  const lightbox = new SimpleLightbox('.gallery a', {});

  lightbox.refresh();

  if (nowHits > obj.config.params.per_page) {
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
