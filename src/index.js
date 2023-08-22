import axios from "axios";
import SlimSelect from "slim-select";

const selectBreeds = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const errorEl = document.querySelector('.error');
const loaderEl = document.querySelector('.loader');

const URL_SERCH = "https://api.thecatapi.com/v1/images/search"
const BASE_URL = "https://api.thecatapi.com/v1/breeds"
const MY_KEY = "live_lnSB6tQvj2QOP8KCX1cjNfXrpmhqZhN1dZHsKSBK6Mt55ghCOOB7PBq9lvnk0r8x";
axios.defaults.headers.common["x-api-key"] = MY_KEY;

selectBreeds.addEventListener('change', fetchCatByBreed);
selectBreeds.addEventListener('change', offLoad);

function fetchBreeds() {
return axios.get(`${BASE_URL}?api_key=${MY_KEY}`)
.then((response)=>{
return response.data;
})
.catch((error)=>{
  onLoad()
errorEl.classList.remove("error");
})
};
  
fetchBreeds().then((data) => {
 data = data.map(
       (({ id, name}) => {
       return  `<option value="${id}">${name}</option>`
   })).join("");
   selectBreeds.insertAdjacentHTML('afterbegin', data)
   new SlimSelect({
    select:document.querySelector('.breed-select')
  })
   
  onLoad()
  
})

function fetchCatByBreed(breedId) {
  breedId = selectBreeds.value;
  return axios.get(`${URL_SERCH}?api_key=${MY_KEY}&breed_ids=${breedId}`)
.then((response)=>{
return response.data;
})
.catch((error)=>{
  onLoad()
  errorEl.classList.remove("error");
  })
.then((data) =>{
 data = data.map((el)=>{
  return catInfo.innerHTML = `<ul class="cat-info-list">
  <li class="cat-info-item"><img src="${el.url}" width="600px" height="600px"/>
  </li>
  <li class="cat-info-item"><h2>${el.breeds[0].name}</h2>
  <p class="description-cat">${el.breeds[0].description}</p>
  <p class="description-temp"><span class="cat-temp">Temperament:</span>${el.breeds[0].temperament}</p></li>
  </ul>`}).join("");
      onLoad()
  
  })
 
}
function onLoad() {
    loaderEl.classList.add("loaders");
}

function offLoad(){
  loaderEl.classList.remove("loaders");
}

