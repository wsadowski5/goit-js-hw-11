


import { fetchImages } from "./partials/pixabay-api";

const input = document.querySelector('input')
const form = document.querySelector('form')
const gallery = document.querySelector('.gallery')



let query =  input.value
let page = 1

function clearGallery() {
    gallery.innerHTML = '';
  }


function createGallery (event) {
    event.preventDefault();



    const newQuery = input.value;
    if (newQuery === query ) {
                page ++
            }
            else {
                query = newQuery
                page = 1;
            } 
    fetchImages(query,page)
    .then(data => {
        console.log(data)

        clearGallery()
        for (let i= 0; i <= data.hits.length; i++)
        {
            const markup = `<div class="photo-card">
            <img src="${data.hits[i].webformatURL}" alt="${data.hits[i].tags}" loading="lazy" />
            <div class="info">
              <p class="info-item">
                <b>Likes: ${data.hits[i].likes}</b>
              </p>
              <p class="info-item">
                <b>Views: ${data.hits[i].views}</b>
              </p>
              <p class="info-item">
                <b>Comments: ${data.hits[i].comments}</b>
              </p>
              <p class="info-item">
                <b>Downloads: ${data.hits[i].downloads}</b>
              </p>
            </div>
          </div>`
          gallery.innerHTML += markup
        }
    }
)
.catch (error => {
    console.log(error)
})
}


form.addEventListener('submit', createGallery)