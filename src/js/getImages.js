const API_KEY = '34987662-26e97d4e150e3c854c752264a';
const BASE_URL = 'https://pixabay.com/api/';

// import axios from 'axios';

// export const getImages = value => {
//   return axios.get(`${BASE_URL}`, {
//     params: {
//       key: API_KEY,
//       q: value,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: true,
//     },
//   });
// };



export const getImages = value =>
  fetch(
    `${BASE_URL}/?key=${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.warn(error);
      return null;
    });
  