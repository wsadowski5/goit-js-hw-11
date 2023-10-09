
import simpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";
const lightbox = new simpleLightbox('.gallery a');

// const lightbox = new SimpleLightbox('.gallery a',{
//   captions : true,
//   captionsType : 'attr',
//   captionsData : 'alt',
//   captionDelay : '250'
// } )


import Notiflix from "notiflix";
import { fetchImages } from "./partials/pixabay-api";

const input = document.querySelector('input')
const form = document.querySelector('form')
const gallery = document.querySelector('.gallery')
const loadMoreBtn = document.querySelector('.load-more')


loadMoreBtn.classList.add('is-hidden')
let query =  ''
let page = 1
let perPage = 40

function clearGallery() {
    gallery.innerHTML = '';
  }

function renderGallery (event) {
    event.preventDefault();
    clearGallery();

    const newQuery = input.value;
    if (newQuery !== query ) {
      query = newQuery
      page = 1;
    }
    fetchImages(query,page,perPage)
    .then(images => {
      if (images.totalHits === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        createGallery(images);
        lightbox.refresh();
        Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);
      }
      if (images.totalHits > perPage) {
        loadMoreBtn.classList.remove('is-hidden');
      }
    })
    .catch(error => console.log(error));
}

function loadMoreImages() {
  page += 1
  fetchImages(query,page,perPage)
  .then(images =>{
    createGallery(images);
    lightbox.refresh();
  })
}

function createGallery(images) {
  const markup = images.hits
  .map(({webformatURL,largeImageURL,tags,likes,comments,views,downloads}) => {
    return `<div class="photo-card">
              <a href="${largeImageURL}">
                <img src="${webformatURL}" alt="${tags}" loading="lazy"/> 
              </a>
              <div class="info">
                <p class="info-item">
                  <b>Likes: ${likes}</b>
                </p>
                <p class="info-item">
                  <b>Views: ${views}</b>
                </p>
                <p class="info-item">
                  <b>Comments: ${comments}</b>
                </p>
                <p class="info-item">
                  <b>Downloads: ${downloads}</b>
                </p>
              </div>
            </div>`
      })
      .join("")
      gallery.insertAdjacentHTML('beforeend',markup);
      const displayedHits = document.getElementsByClassName('info').length;
      if(displayedHits === images.totalHits){
        loadMoreBtn.classList.add('is-hidden');
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      }
} 

loadMoreBtn.addEventListener('click', loadMoreImages);

form.addEventListener('submit', renderGallery);