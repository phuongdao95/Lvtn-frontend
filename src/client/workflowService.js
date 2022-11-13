import api from "./api";


const PATH_PREFIX = 'api/workflow';
const userId = window?.localStorage.user_id;


export const createNghiPhep = ({ reason, startDate, endDate }, callBack) => {
    api.post(`${PATH_PREFIX}/nghi-phep`, { userId, reason, startDate, endDate })
    .then(() => {
        callBack();
    });
}

export const createNghiThaiSan = ({ isHusband, startDate }, callBack) => {
    api.post(`${PATH_PREFIX}/nghi-thai-san`, { userId, isHusband, startDate })
    .then(() => {
        callBack();
    });
}

export const getWorkflowRequests = () => api.get(`${PATH_PREFIX}/requests/${userId}`)
    .then(res => res.data)
    .catch(err => console.log(err));


// Workflow config

export const getSelections = () => api.get(`${PATH_PREFIX}/request/approve/selection-list`)
    .then(res => res.data)
    .catch(err => console.log(err));

export const getNghiPhepConfig = () => api.get(`${PATH_PREFIX}/nghi-phep-config`)
    .then(res => res.data)
    .catch(err => console.log(err));

export const postNghiPhepConfig = (data) => api.post(`${PATH_PREFIX}/nghi-phep-config`, data)
    .then(res => res.data)
    .catch(err => console.log(err));

export const getNghiThaiSanConfig = () => api.get(`${PATH_PREFIX}/nghi-thai-san-config`)
    .then(res => res.data)
    .catch(err => console.log(err));

export const postNghiThaiSanConfig = (data) => api.post(`${PATH_PREFIX}/nghi-thai-san-config`, data)
    .then(res => res.data)
    .catch(err => console.log(err));

export const getHelpDeskConfig = () => api.get(`${PATH_PREFIX}/helpdesk-config`)
    .then(res => res.data)
    .catch(err => console.log(err));

export const postHelpDeskConfig = (data) => api.post(`${PATH_PREFIX}/helpdesk-config`, data)
    .then(res => res.data)
    .catch(err => console.log(err));

    export const getCostConfig = () => api.get(`${PATH_PREFIX}/cost-config`)
    .then(res => res.data)
    .catch(err => console.log(err));

export const postCostConfig = (data) => api.post(`${PATH_PREFIX}/cost-config`, data)
    .then(res => res.data)
    .catch(err => console.log(err));

    export const getWfhConfig = () => api.get(`${PATH_PREFIX}/wfh-config`)
    .then(res => res.data)
    .catch(err => console.log(err));

export const postWfhConfig = (data) => api.post(`${PATH_PREFIX}/wfh-config`, data)
    .then(res => res.data)
    .catch(err => console.log(err));

export const getAdvancePaymentConfig = () => api.get(`${PATH_PREFIX}/advance-payment-config`)
    .then(res => res.data)
    .catch(err => console.log(err));

export const postAdvancePaymentConfig = (data) => api.post(`${PATH_PREFIX}/advance-payment-config`, data)
    .then(res => res.data)
    .catch(err => console.log(err));

    export const getCheckInConfig = () => api.get(`${PATH_PREFIX}/checkinout-config`)
    .then(res => res.data)
    .catch(err => console.log(err));

export const postCheckInConfig = (data) => api.post(`${PATH_PREFIX}/checkinout-config`, data)
    .then(res => res.data)
    .catch(err => console.log(err));

    export const getOvertimeConfig = () => api.get(`${PATH_PREFIX}/overtime-config`)
    .then(res => res.data)
    .catch(err => console.log(err));

export const postOvertimeConfig = (data) => api.post(`${PATH_PREFIX}/overtime-config`, data)
    .then(res => res.data)
    .catch(err => console.log(err));