import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '7130529-cd9ea3f018b85a189f3c85b8b';

export async function getData(search = '', page = 1, imageType = 'photo', orientation = 'horizontal', perPage = 12) {
    const config = {
        url: BASE_URL,
        params: {
            q: search,
            page: page,
            key: API_KEY,
            image_type: imageType,
            orientation: orientation,
            per_page: perPage
        }
    };

    const response = await axios(config);

    if (response.status === 200) {
        const filteredResponse = response.data.hits.map((item) => {
            return {
                id: item.id,
                webformatURL: item.webformatURL,
                largeImageURL: item.largeImageURL
            };
        });
        const result = {
            pages: Math.ceil(response.data.totalHits / perPage),
            hits: filteredResponse
        };
        return result;
    };

    return response;
}