import axios from 'axios';

export const BASE_URL = "https://localhost:7115/";

const api = axios.create({
    baseURL: BASE_URL
});

api.interceptors.request.use(async (config) => {
    const localStorage = window?.localStorage;
    const jwt = localStorage.getItem("jwt_token");

    if (jwt) {
        config.headers = {
            ...config.headers,
            authorization: `Bearer ${jwt}`
        }
    }
    config.headers = {
        ...config.headers,
        authorization: `Bearer ${jwt}`
    }

    return config;
}, (err) => Promise.reject(err));

export default api;