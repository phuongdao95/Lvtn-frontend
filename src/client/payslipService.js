import {
    getUseFetchListResourceFunction,
    getUseFetchOneResourceFunction,
    getUseUpdateResourceFunction
} from "./crudService"

const PATH_PREFIX = "api/payslip";

export const useFetchListPayslip = getUseFetchListResourceFunction(PATH_PREFIX);

export const useFetchOnePayslip = getUseFetchOneResourceFunction(PATH_PREFIX);

export const useUpdatePayslip = getUseUpdateResourceFunction(PATH_PREFIX);
