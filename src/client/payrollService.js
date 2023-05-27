import {
    getPendingErrorSuccessApiPatternFunction,
    getUseCreateResourceFunction,
    getUseDeleteResourceFunction,
    getUseFetchListResourceFunction,
    getUseFetchOneResourceFunction,
    getUseUpdateResourceFunction
} from "./crudService"

import api from "./api";

const PATH_PREFIX = "api/payroll";

export const useFetchListPayroll = getUseFetchListResourceFunction(PATH_PREFIX);

export const useFetchOnePayroll = getUseFetchOneResourceFunction(PATH_PREFIX);

export const useUpdatePayroll = getUseUpdateResourceFunction(PATH_PREFIX);

export const useDeletePayroll = getUseDeleteResourceFunction(PATH_PREFIX);

export const useCreatePayroll = getUseCreateResourceFunction(PATH_PREFIX);

export const useFetchOnePayslip = getUseFetchOneResourceFunction('api/payslip');

export const useFetchPayslipOfPayroll = getPendingErrorSuccessApiPatternFunction(
    ({ setIsError, setIsSuccess, setIsPending, setMethod, setData }) => {
        const fetchList = async (payrollId) => {
            setIsError(false);
            setIsSuccess(false);
            setIsPending(true);

            try {
                const response = await api.get(`/api/payroll/${payrollId}/payslip/`);

                if (response.data) {
                    setData(response.data);
                }
                setIsSuccess(true);

            } catch (err) {
                setIsError(true);
                console.error(err);
            } finally {
                setIsPending(false);
            }
        }

        return fetchList;
    })();


export const useFetchPayslipTimekeepings = getPendingErrorSuccessApiPatternFunction(
    ({ setIsError, setIsSuccess, setIsPending, setData }) => {
        const fetchList = async (payslipId) => {
            setIsError(false);
            setIsSuccess(false);
            setIsPending(true);
            try {
                const response = await api.get(`/api/payslip/${payslipId}/timekeeping/`);

                if (response.data) {
                    setData(response.data);
                }
                setIsSuccess(true);
            } catch (err) {
                setIsError(true);
                console.error(err);
            } finally {
                setIsPending(false);
            }
        }

        return fetchList;
    })();


export const useFetchPayslipSalaryDeltas = getPendingErrorSuccessApiPatternFunction(
    ({ setIsError, setIsSuccess, setIsPending, setData }) => {
        const fetchList = async (payslipId) => {
            setIsError(false);
            setIsSuccess(false);
            setIsPending(true);
            try {
                const response = await api.get(`/api/payslip/${payslipId}/salarydelta/`);

                if (response.data) {
                    setData(response.data);
                }
                setIsSuccess(true);
            } catch (err) {
                setIsError(true);
                console.error(err);
            } finally {
                setIsPending(false);
            }
        }

        return fetchList;
    })();


export const useFetchPayslipsOfUser = getPendingErrorSuccessApiPatternFunction(
    ({ setIsError, setIsSuccess, setIsPending, setData }) => {
        const fetchList = async (userId) => {
            setIsError(false);
            setIsSuccess(false);
            setIsPending(true);


            try {
                const response = await api.get(`/api/user/${userId}/payslip/`);

                if (response.data) {
                    setData(response.data);
                }
                setIsSuccess(true);
            } catch (err) {
                setIsError(true);
                console.error(err);
            } finally {
                setIsPending(false);
            }
        }

        return fetchList;
    })();

export const useSendPayroll = getPendingErrorSuccessApiPatternFunction(
    ({ setIsError, setIsSuccess, setIsPending, setData }) => {
        const sendPayroll = async (payrollId) => {
            setIsError(false);
            setIsSuccess(false);
            setIsPending(true);

            try {
                const response = await api.post(`/api/payroll/${payrollId}/status/`);

                if (response.data) {
                    setData(response.data);
                }
                setIsSuccess(true);
            } catch (err) {
                setIsError(true);
                console.error(err);
            } finally {
                setIsPending(false);
            }
        }

        return sendPayroll;
    })();


export const useGetReport = getPendingErrorSuccessApiPatternFunction(
    ({ setIsError, setIsSuccess, setIsPending, setData }) => {
        const fetchPayroll = async (payrollId) => {
            setIsError(false);
            setIsSuccess(false);
            setIsPending(true);

            try {
                const response = await api.get(`/api/payroll/${payrollId}/report/`);

                if (response.data) {
                    setData(response.data);
                }
                setIsSuccess(true);
            } catch (err) {
                setIsError(true);
                console.error(err);
            } finally {
                setIsPending(false);
            }
        }

        return fetchPayroll;
    })();


const downloadPayslip = async (payrollId) => {
    const response = await api.get(`/api/payroll/${payrollId}/download`)
}

const downloadPayroll = async (payslipId) => {
    const response = await api.get(`/api/payslip/${payslipId}/download`)
}
