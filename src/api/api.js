import * as axios from "axios";

export const loadApiData = (defaultLimit, defaultOrder, defaultType, searchBreedId) => {
    return axios.get(`https://api.thecatapi.com/v1/images/search?limit=${defaultLimit}&page=0&order=${defaultOrder}&mime_types=${defaultType}&breed_ids=${searchBreedId}`, {
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "f6b95f64-bf7a-47dd-a2df-100221f15eb9"
        }
    })
};

export const loadSingleImage = (imageId) => {
    return axios.get(`https://api.thecatapi.com/v1/images/${imageId}`, {
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "f6b95f64-bf7a-47dd-a2df-100221f15eb9"
        }
    })
};

export const loadBreedsApiData = (searchBreed) => {
    return axios.get(`https://api.thecatapi.com/v1/breeds/search?q=${searchBreed}`, {
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "f6b95f64-bf7a-47dd-a2df-100221f15eb9"
        }
    })
};

export const searchBreedsApiData = (defaultLimit, defaultBreed) => {
    return axios.get(`https://api.thecatapi.com/v1/images/search?limit=${defaultLimit}&breed_ids=${defaultBreed}`, {
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "f6b95f64-bf7a-47dd-a2df-100221f15eb9"
        }
    })
};

export const getMyFavoritesApiData = () => { //getFavorites
    return axios.get(`https://api.thecatapi.com/v1/favourites?`, {
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "f6b95f64-bf7a-47dd-a2df-100221f15eb9",
        }
    })
};

export const postToMyFavoritesApiData = (imageId) => { //postFavorites
    return axios.post(`https://api.thecatapi.com/v1/favourites?api_key=f6b95f64-bf7a-47dd-a2df-100221f15eb9`,{"image_id": `${imageId}`, "sub_id":"Danuca-123"}, {
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "f6b95f64-bf7a-47dd-a2df-100221f15eb9",
        },
    })
};

export const deleteFromMyFavoritesApiData = (imageId) => { //delFavorites
    return axios.delete(`https://api.thecatapi.com/v1/favourites/${imageId}`, {
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "f6b95f64-bf7a-47dd-a2df-100221f15eb9"
        },
    })
};

export const getMyVotesApiData = () => { //getVotes
    return axios.get(`https://api.thecatapi.com/v1/votes?sub_id=Danuca-123`, {
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "f6b95f64-bf7a-47dd-a2df-100221f15eb9",
        },
    })
};

export const postToMyVotesApiData = (imageId) => { //postToVotes
    return axios.post(`https://api.thecatapi.com/v1/votes?api_key=f6b95f64-bf7a-47dd-a2df-100221f15eb9`,{"image_id": `${imageId}`, "sub_id":"Danuca-123", "value": 1}, {
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "f6b95f64-bf7a-47dd-a2df-100221f15eb9",
        },
    })
};

export const deleteFromMyVotesApiData = (imageId) => { //delVotes
    return axios.post(`https://api.thecatapi.com/v1/votes?api_key=f6b95f64-bf7a-47dd-a2df-100221f15eb9`,{"image_id": `${imageId}`, "sub_id":"Danuca-123", "value": -1}, {
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "f6b95f64-bf7a-47dd-a2df-100221f15eb9"
        },
    })
};

export const getMyVotesApiDataImg = (imageId) => { //getVotesImg
    return axios.get(`https://api.thecatapi.com/v1/images/${imageId}`, {
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "f6b95f64-bf7a-47dd-a2df-100221f15eb9",
        },
    })
};