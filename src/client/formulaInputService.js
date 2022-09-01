import {
    getUseCreateResourceFunction,
    getUseDeleteResourceFunction,
    getUseFetchListResourceFunction,
    getUseFetchOneResourceFunction,
    getUseUpdateResourceFunction
} from "./crudService";

const PATH_PREFIX = "/api/formula-input"

export const useFetchListFormulaInputService = getUseFetchListResourceFunction(PATH_PREFIX);

export const useFetchOneFormulaInputService = getUseFetchOneResourceFunction(PATH_PREFIX);

export const useCreateFormulaInputService = getUseCreateResourceFunction(PATH_PREFIX); 

export const useUpdateFormulaInputService = getUseUpdateResourceFunction(PATH_PREFIX);

export const useDeleteFormulaInputService = getUseDeleteResourceFunction(PATH_PREFIX);