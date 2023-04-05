const API_KEY = '34987662-26e97d4e150e3c854c752264a';
const BASE_URL = 'https://pixabay.com/api/';

import axios from 'axios';

export const getImages = (inputValue, pageNumber) => {
  return axios.get(`${BASE_URL}`, {
    params: {
      key: API_KEY,
      q: inputValue,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page: pageNumber,
    },
  });
};
