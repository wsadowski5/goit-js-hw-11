
import simpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";
const lightbox = new simpleLightbox('.gallery a');

import Notiflix from "notiflix";
import { fetchImages } from "./partials/pixabay-api";

const input = document.querySelector('input')
const form = document.querySelector('form')
const gallery = document.querySelector('.gallery')
const loadMoreBtn = document.querySelector('.load-more')

// import InfiniteScroll from "infinite-scroll";
// let infScroll = new InfiniteScroll(gallery, {
//   path: '.gallery',
//   append: '.photo-card',
//   history: false,
// })


loadMoreBtn.classList.add('is-hidden')
let query =  ''
let page = 1
let perPage = 40

function clearGallery() {
    gallery.innerHTML = '';
  }

async function renderGallery (event) {
    event.preventDefault();
    const newQuery = await input.value;
    if (newQuery !== query ) {
      query = newQuery
      page = 1;
    }
    await clearGallery();
    await fetchImages(query,page,perPage)
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

async function loadMoreImages() {
  page += 1
  await fetchImages(query,page,perPage)
  .then(images =>{
    createGallery(images);
    lightbox.refresh();

    const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

 window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",

});

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