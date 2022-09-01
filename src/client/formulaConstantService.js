import {
    getUseCreateResourceFunction,
    getUseDeleteResourceFunction,
    getUseFetchListResourceFunction,
    getUseFetchOneResourceFunction,
    getUseUpdateResourceFunction
} from "./crudService";

const PATH_PREFIX = "/api/formula-constant"

export const useFetchListFormulaConstant = getUseFetchListResourceFunction(PATH_PREFIX);

export const useFetchOneFormulaConstant = getUseFetchOneResourceFunction(PATH_PREFIX);

export const useCreateFormulaConstant = getUseCreateResourceFunction(PATH_PREFIX); 

export const useUpdateFormulaConstant = getUseUpdateResourceFunction(PATH_PREFIX);

export const useDeleteFormulaConstant = getUseDeleteResourceFunction(PATH_PREFIX);