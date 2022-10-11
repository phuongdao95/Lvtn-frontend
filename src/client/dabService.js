import {
    getUseCreateResourceFunction,
    getUseDeleteResourceFunction,
    getUseFetchListResourceFunction,
    getUseFetchOneResourceFunction,
    getUseUpdateResourceFunction
} from "./crudService";

const PATH_PREFIX = "api/salarydelta/"

export const useFetchListDAB = getUseFetchListResourceFunction(PATH_PREFIX);

export const useFetchOneDAB = getUseFetchOneResourceFunction(PATH_PREFIX);

export const useUpdateDAB = getUseUpdateResourceFunction(PATH_PREFIX);

export const useCreateDAB = getUseCreateResourceFunction(PATH_PREFIX);

export const useDeleteDAB = getUseDeleteResourceFunction(PATH_PREFIX);
