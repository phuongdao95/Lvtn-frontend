import {
    getUseCreateResourceFunction,
    getUseDeleteResourceFunction,
    getUseFetchListResourceFunction,
    getUseFetchOneResourceFunction,
    getUseUpdateResourceFunction
} from "./crudService";

const PATH_PREFIX = "api/salarygroup"

export const useFetchListSalaryGroup = getUseFetchListResourceFunction(PATH_PREFIX);

export const useFetchOneSalaryGroup = getUseFetchOneResourceFunction(PATH_PREFIX);

export const useUpdateSalaryGroup = getUseUpdateResourceFunction(PATH_PREFIX);

export const useCreateSalaryGroup = getUseCreateResourceFunction(PATH_PREFIX);

export const useDeleteSalaryGroup = getUseDeleteResourceFunction(PATH_PREFIX);
