import axios from "axios";
const url = 'https://pixabay.com/api/';

import "simplelightbox/dist/simple-lightbox.min.css";

//------------------ axios fetch ------------------


export const fetchImages = async (query, page, perPage) => {
    try {
        const response = await axios.get(url, {
            params: {
                key : '39805913-a4bc2a6c03690a5e9014989d5',
                q : query, 
                image_type : 'photo',
                orientation : 'horizontal',
                safesearch : true,
                page: page,
                per_page: perPage,
   
            },
        });
        return response.data
        
    } catch (error) {
        console.error('ERROR:', error);
        throw error;
    }
}

