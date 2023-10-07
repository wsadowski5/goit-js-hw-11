import { fetchImages } from "./partials/pixabay-api";
const input = document.querySelector('input')
const form = document.querySelector('form')


let query =  input.value
let page = 1

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    const newQuery = input.value;
    if (newQuery === query ) {
                page ++
            }
            else {
                query = newQuery
                page = 1;
            } 
    fetchImages(query,page);
}
)




