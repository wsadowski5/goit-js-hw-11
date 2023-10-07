import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "39805913-a4bc2a6c03690a5e9014989d5";


const searchInput = document.querySelector('input')
const searchButton = document.querySelector('button')

const url = 'https://pixabay.com/api/';



//------------------ axios fetch ------------------


const fetchImages = async (query, page) => {
    try {
        const response = await axios.get(url, {
            params: {
                key : '39805913-a4bc2a6c03690a5e9014989d5',
    q : query, 
    //  localStorage.getItem('searchTerms'),
    image_type : 'photo',
    orientation : 'horizontal',
    safesearch : true,
    page: page,
    per_page: 20,
            },
        });
        console.log(response.data)
    } catch (error) {
        console.error('ERROR fatch:', error);
        throw error;
    }
}


searchInput.addEventListener('change', (event) => {
    localStorage.setItem('searchTerms', event.currentTarget.value)
    })

searchButton.addEventListener('click', (event) =>{
    event.preventDefault();
    const query = localStorage.getItem('searchTerms');
    const page = 1;
    if (query )
    fetchImages(query,page);
}
)
