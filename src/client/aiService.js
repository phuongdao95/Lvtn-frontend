import api from './api';

const BASE_PATH = '/api';

export const uploadImage = (data) =>
    api.post(
        `${BASE_PATH}/UploadImage`,
        data,
    )
    .then((res) => res)
    .catch(error => error);

export const recognize = () => {
    console.log('recognize');
}