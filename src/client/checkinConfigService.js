import api from './api';

const BASE_PATH = '/api';

export const getRule = (data) => 
    api.get(
        `${BASE_PATH}/CheckInConfig`,
        data,
    )
    .then((res) => res)
    .catch(error => error);

export const updateRule = (data) => 
    api.put(
        `${BASE_PATH}/CheckInConfig?minutes=`+data,
    )
    .then((res) => res)
    .catch(error => error);
