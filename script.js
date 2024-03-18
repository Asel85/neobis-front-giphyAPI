/* 

const API_TOKEN = "5JXKTKJjED4B2grbFIxtpkXIs749Grd5";

const API = "https://api.giphy.com/v1/gifs/search?api_key=" + API_TOKEN;
const TRENDING_API =
  "https://api.giphy.com/v1/gifs/trending?api_key=" +
  API_TOKEN +
  "&limit=25&offset=0&rating=g&bundle=messaging_non_clips";

  async function getGifs() {
    try{
        const result = await  fetch (TRENDING_API +  {headers: {Authorization: API_TOKEN}});
        const data = await result.json();
        console.log(data) 
        getGif(data) ;
    }catch(error){
        console.log("error")
    }
  }
  getGifs();
  function getGif(card){
    const myContainer = document.querySelector(".container");
    
     myContainer.innerHTML = card.map((item)=>{
        return `<div class=card>
          <img style="width:200px;height:100px;"  src="${item.url}" alt="img">
        </div>`
    });
  }

   */
const API_TOKEN = "5JXKTKJjED4B2grbFIxtpkXIs749Grd5";

const TRENDING_GIFS_ENDPOINT = `https://api.giphy.com/v1/gifs/trending?api_key=${API_TOKEN}&limit=25&rating=g`;
const TRENDING_STICKERS_ENDPOINT = `https://api.giphy.com/v1/stickers/trending?api_key=${API_TOKEN}&limit=25&rating=g`;

async function fetchTrendingGIFs() {
  try {
      const response = await fetch(TRENDING_GIFS_ENDPOINT);
      const data = await response.json();
      console.log(data.data);
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