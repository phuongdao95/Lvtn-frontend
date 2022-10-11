import {
    getUseCreateResourceFunction,
    getUseFetchListResourceFunction,
    getUseFetchOneResourceFunction,
    getUseUpdateResourceFunction
} from "./crudService"

const PATH_PREFIX = "api/payroll";

export const useFetchListPayroll = getUseFetchListResourceFunction(PATH_PREFIX);

export const useFetchOnePayroll = getUseFetchOneResourceFunction(PATH_PREFIX);

export const useUpdatePayroll = getUseUpdateResourceFunction(PATH_PREFIX);

export const useCreatePayroll = getUseCreateResourceFunction(PATH_PREFIX);

