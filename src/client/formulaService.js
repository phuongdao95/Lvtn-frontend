import {
    getUseCreateResourceFunction,
    getUseDeleteResourceFunction,
    getUseFetchListResourceFunction,
    getUseFetchOneResourceFunction,
    getUseUpdateResourceFunction
} from "./crudService";

const PATH_PREFIX = "/api/salaryformula/"

export const useFetchListFormula = getUseFetchListResourceFunction(PATH_PREFIX);

export const useFetchOneFormula = getUseFetchOneResourceFunction(PATH_PREFIX);

export const useCreateFormula = getUseCreateResourceFunction(PATH_PREFIX); 

export const useUpdateFormula = getUseUpdateResourceFunction(PATH_PREFIX);

export const useDeleteFormula = getUseDeleteResourceFunction(PATH_PREFIX);