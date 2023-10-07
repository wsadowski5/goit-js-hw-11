// const fetchImages = () => {
//     return axios
//     .get(url, config)
//     .then((response) => {
//         console.log(response.data)
// })
//     .catch((error) => console.log('error',error))
// }


// ----------------- standard fetch ---------------


// export function fetchImages () {
//     return fetch (`${url}?${searchParams}`)
//         .then((response) => {
//         if (!response.ok) {
//             throw new Error(response.status);
//         }
//         console.log(response)
//         console.log(response.json())
//         return response.json();
//         }
//     )
//     .catch((error) => console.log('error',error))
// }

//-------------------------------------------------

// const searchParams  = new URLSearchParams({
//     key : '39805913-a4bc2a6c03690a5e9014989d5',
//     q : localStorage.getItem('searchTerms'),
//     image_type : 'photo',
//     orientation : 'horizontal',
//     safesearch : true,
//     page: 1,
//     per_page: 20,
// })

// const url = `${urlBase}?${searchParams}`;
