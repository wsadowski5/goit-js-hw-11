import axios from "axios";
const url = 'https://pixabay.com/api/';



//------------------ axios fetch ------------------


export const fetchImages = async (query, page) => {
    try {
        const response = await axios.get(url, {
            params: {
                key : '39805913-a4bc2a6c03690a5e9014989d5',
    q : query, 
    image_type : 'photo',
    orientation : 'horizontal',
    safesearch : true,
    page: page,
    per_page: 40,
   
            },
        });
        console.log(response.data)
    } catch (error) {
        console.error('ERROR:', error);
        throw error;
    }
}