import api from "./api";


const PATH_PREFIX = 'api/workflow';
const userId = window?.localStorage.user_id;

// Nghi phep

export const createNghiPhep = ({ reason, startDate, endDate }, callBack) => {
    api.post(`${PATH_PREFIX}/nghi-phep`, { userId, reason, startDate, endDate })
    .then(() => {
        callBack();
    });
}
export const getNghiPhepById = (id) => api.get(`${PATH_PREFIX}/workflow/nghi-phep/${id}`)
    .then(res => res.data);

export const updateNghiPhep = ({id, reason, startDate, endDate}, callBack) => {
    api.put(`${PATH_PREFIX}/nghi-phep`, { id, reason, startDate, endDate })
    .then(() => {
        callBack();
    });
} 

// Nghi thai san

export const createNghiThaiSan = ({ isHusband, startDate }, callBack) => {
    api.post(`${PATH_PREFIX}/nghi-thai-san`, { userId, isHusband, startDate })
    .then(() => {
        callBack();
    });
}

export const getNghiThaiSanById = (id) => api.get(`${PATH_PREFIX}/workflow/nghi-thai-san/${id}`)
    .then(res => res.data);

export const updateNghiThaiSan = ({id, startDate}, callBack) => {
    api.put(`${PATH_PREFIX}/nghi-thai-san`, { id, startDate})
    .then(() => {
        callBack();
    });
} 

// Check in-out manually

export const createCheckInout = (checkedTime, callBack) => {
    api.post(`${PATH_PREFIX}/check-in-out`, { userId, checkedTime })
    .then(() => {
        callBack();
    });
}

export const getCheckInoutById = (id) => api.get(`${PATH_PREFIX}/workflow/check-in-out/${id}`)
    .then(res => res.data);

// Helpers

export const getWorkflowRequests = () => api.get(`${PATH_PREFIX}/requests/${userId}`)
    .then(res => res.data);

export const getMyToDoWorkflowRequests = () => api.get(`${PATH_PREFIX}/flows/${userId}`)
    .then(res => res.data);

export const setWorkflowStatus = (flowId, status) => api.post(`${PATH_PREFIX}/workflow/${userId}/${flowId}/set-status?status=${status}`)
    .then(res => res.data);

export const addComment = (flowId, content) => api.post(`${PATH_PREFIX}/comment`, {userId, workflowId: flowId, content});

// Workflow config

export const getSelections = () => api.get(`${PATH_PREFIX}/request/approve/selection-list`)
    .then(res => res.data);

// Nghi phep

export const getNghiPhepConfig = () => api.get(`${PATH_PREFIX}/nghi-phep-config`)
    .then(res => res.data)
    .catch(err => Promise.reject(err));

export const postNghiPhepConfig = (data) => api.post(`${PATH_PREFIX}/nghi-phep-config`, data)
    .then(res => res.data);

export const getIntialNghiPhep = () => api.get(`${PATH_PREFIX}/initial-nghi-phep/${userId}`)
    .then(res => res.data);

export const getDataNghiPhep = (id) => api.get(`${PATH_PREFIX}/workflow/nghi-phep/${id}`)
    .then(res => res.data); 

// Nghi thai san

export const getNghiThaiSanConfig = () => api.get(`${PATH_PREFIX}/nghi-thai-san-config`)
    .then(res => res.data);

export const postNghiThaiSanConfig = (data) => api.post(`${PATH_PREFIX}/nghi-thai-san-config`, data)
    .then(res => res.data);

export const getIntialNghiThaiSan = () => api.get(`${PATH_PREFIX}/initial-nghi-thai-san/${userId}`)
    .then(res => res.data);

export const getDataNghiThaiSan = (id) => api.get(`${PATH_PREFIX}/workflow/nghi-thai-san/${id}`)
    .then(res => res.data); 

// Check in manually

export const getCheckInConfig = () => api.get(`${PATH_PREFIX}/checkinout-config`)
    .then(res => res.data);

export const postCheckInConfig = (data) => api.post(`${PATH_PREFIX}/checkinout-config`, data)
    .then(res => res.data);
    
export const getIntialCheckin = () => api.get(`${PATH_PREFIX}/initial-check-in-out/${userId}`)
.then(res => res.data);

export const getDataCheckin = (id) => api.get(`${PATH_PREFIX}/workflow/check-in-out/${id}`)
.then(res => res.data); 