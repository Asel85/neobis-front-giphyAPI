
const API_TOKEN = "5JXKTKJjED4B2grbFIxtpkXIs749Grd5";

const TRENDING_GIFS_ENDPOINT = `https://api.giphy.com/v1/gifs/trending?api_key=${API_TOKEN}&limit=25&rating=g`;
const TRENDING_STICKERS_ENDPOINT = `https://api.giphy.com/v1/stickers/trending?api_key=${API_TOKEN}&limit=25&rating=g`;

async function fetchTrendingGIFs() {
  try {
      const response = await fetch(TRENDING_GIFS_ENDPOINT);
      const data = await response.json();
      //console.log(data.data);
      return data.data;
  } catch (error) {
      console.error('Error fetching trending GIFs:', error);
      return null;
  }
}
function displayTrendingGIFs(gifs) {
  const container = document.querySelector('.container');
  if (!container) {
      console.error('Container element not found');
      return;
  }
      gifs.forEach(gif => {
      const gifElement = document.createElement('img');
      gifElement.style.width="200px";
      gifElement.style.height="200px";
      gifElement.src = gif.images.fixed_height.url;
      container.appendChild(gifElement);
   });
  }
  fetchTrendingGIFs()
  .then(trendingGIFs => {
      if (trendingGIFs) {
         displayTrendingGIFs(trendingGIFs);
      }
  });

  ///search
const SEARCH_ENDPOINT = "https://api.giphy.com/v1/gifs/search";

document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('.search-form');
  const searchInput = document.querySelector('.search-form__txt');
  const searchButton = document.querySelector('.search-form__btn');

  //console.log("DOMContentLoaded event fired.");

  searchForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const searchTerm = searchInput.value.trim();
      //console.log("Search term:", searchTerm);
      if (!searchTerm) return;

      try {
          const gifs = await searchGIFs(searchTerm);
         // console.log("GIFs:", gifs);
          displayGIFs(gifs);
      } catch (error) {
          console.error('Error searching GIFs:', error);
      }
  });

  searchButton.addEventListener('click', async (event) => {
      event.preventDefault();
      searchForm.dispatchEvent(new Event('submit'));
  });
});

async function searchGIFs(query, limit = 25, offset = 0, rating = 'g', lang = 'en') {
  const url = new URL(SEARCH_ENDPOINT);
  url.searchParams.append('api_key', API_TOKEN);
  url.searchParams.append('q', query);
  url.searchParams.append('limit', limit);
  url.searchParams.append('offset', offset);
  url.searchParams.append('rating', rating);
  url.searchParams.append('lang', lang);

  try {
      const response = await fetch(url);
      const data = await response.json();
      return data.data;
  } catch (error) {
      console.error('Error fetching GIFs:', error);
      return null;
  }
}


function displayGIFs(gifs) {
  const container = document.querySelector('.container');
  container.innerHTML = '';

  gifs.forEach(gif => {
      const img = document.createElement('img');
      img.style.width="200px";
      img.style.height="200px";
      img.src = gif.images.fixed_height.url;
      img.alt = gif.title;
      container.appendChild(img);
  });
}
 