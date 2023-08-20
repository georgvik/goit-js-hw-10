import axios from "axios";
import SlimSelect from "slim-select";


const selectBreeds = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

const MY_KEY = "live_lnSB6tQvj2QOP8KCX1cjNfXrpmhqZhN1dZHsKSBK6Mt55ghCOOB7PBq9lvnk0r8x";
axios.defaults.headers.common["x-api-key"] = MY_KEY;

selectBreeds.addEventListener('change', fetchCatByBreed);

function fetchBreeds() {
return axios.get('https://api.thecatapi.com/v1/breeds?api_key=live_lnSB6tQvj2QOP8KCX1cjNfXrpmhqZhN1dZHsKSBK6Mt55ghCOOB7PBq9lvnk0r8x')
.then((response)=>{
return response.data;
});
};
  
fetchBreeds().then((data) => {
  // console.log(data)
 data = data.map(
       (({ id, name}) => {
       return  `<option value="${id}">${name}</option>`
   })).join("");
   selectBreeds.insertAdjacentHTML('afterbegin', data)
   new SlimSelect({
    select:document.querySelector('.breed-select')
  })
})

function fetchCatByBreed(breedId) {

  const URL_SERCH = "https://api.thecatapi.com/v1/images/search"
  breedId = selectBreeds.value;
  console.log(`${breedId}`)
return axios.get(`${URL_SERCH}?api_key=${MY_KEY}&breed_ids=${breedId}`)
.then((response)=>{
//  console.log(response)
return response.data;
})
.then((data) =>{
  console.log(data)
  data = data.map((({name, temperament, description, url})=>{
  return `<img src="${url}"/>`})).join("");
  catInfo.insertAdjacentHTML("beforeend", data)
   })
   
}

// fetchCatByBreed()