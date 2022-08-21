import api from './api';

const BASE_PATH = '/api';

export const getAllUsers = () =>
    api.get(
        `${BASE_PATH}/user`,
        
    )
    .then((res) => res.data);
