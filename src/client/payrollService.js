import {
    getPendingErrorSuccessApiPatternFunction,
    getUseCreateResourceFunction,
    getUseFetchListResourceFunction,
    getUseFetchOneResourceFunction,
    getUseUpdateResourceFunction
} from "./crudService"

import api from "./api";

const PATH_PREFIX = "api/payroll";

export const useFetchListPayroll = getUseFetchListResourceFunction(PATH_PREFIX);

export const useFetchOnePayroll = getUseFetchOneResourceFunction(PATH_PREFIX);

export const useUpdatePayroll = getUseUpdateResourceFunction(PATH_PREFIX);

export const useCreatePayroll = getUseCreateResourceFunction(PATH_PREFIX);

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