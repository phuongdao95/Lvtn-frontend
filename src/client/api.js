import axios from 'axios';

const BASE_URL = "https://localhost:7115/";

const api = axios.create({
    baseURL: BASE_URL
});

/*
api.interceptors.request.use((onRequestSuccess) => {
    // TODO: add Token to request
    // Fake Token
    const authorizationToken = "SomeToken";
    
    if (authorizationToken) {
        onRequestSuccess.headers = {
            ...onRequestSuccess.headers,
            'Authorization': authorizationToken
        };
    }
    return onRequestSuccess;
});
*/

export default api;