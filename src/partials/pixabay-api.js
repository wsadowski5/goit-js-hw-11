import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "39805913-a4bc2a6c03690a5e9014989d5";


const searchInput = document.querySelector('input')
const searchButton = document.querySelector('button')

const urlBase = 'https://pixabay.com/api/';

const searchParams  = new URLSearchParams({
    key : '39805913-a4bc2a6c03690a5e9014989d5',
    q : localStorage.getItem('searchTerms'),
    image_type : 'photo',
    orientation : 'horizontal',
    safesearch : true,
})

const url = `${urlBase}?${searchParams}`;

const config = {
    headers :{
        // Access-Control-Allow-Origin : *
    }
}

//------------------ axios fetch ------------------

const fetchData = () => {
    return axios
    .get(url, config)
    .then((response) => {
        console.log(response.data)
})
    .catch((error) => console.log('error',error))
}


// ----------------- standard fetch ---------------


export function fetchImages () {
    return fetch (`${url}?${searchParams}`)
        .then((response) => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        console.log(response)
        console.log(response.json())
        return response.json();
        }
    )
    .catch((error) => console.log('error',error))
}

//-------------------------------------------------


searchInput.addEventListener('change', (event) => {
    localStorage.setItem('searchTerms', event.currentTarget.value)
    })

searchButton.addEventListener('click', (event) =>{
    event.preventDefault();
    searchParams.q = localStorage.getItem('searchTerms');
    fetchImages();
    fetchData();
}
)

