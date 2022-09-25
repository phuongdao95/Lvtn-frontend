import {
    getUseCreateResourceFunction,
    getUseDeleteResourceFunction,
    getUseFetchListResourceFunction,
    getUseFetchOneResourceFunction,
    getUseUpdateResourceFunction
} from "./crudService";

const PATH_PREFIX = "api/dab"

export const useFetchListDAB = getUseFetchListResourceFunction(PATH_PREFIX);

export const useFetchOneDAB = getUseFetchOneResourceFunction(PATH_PREFIX);

export const useUpdateDAB = getUseUpdateResourceFunction(PATH_PREFIX);

export const useCreateDAB = getUseCreateResourceFunction(PATH_PREFIX);

export const useDeleteDAB = getUseDeleteResourceFunction(PATH_PREFIX);


/**Post localhost:8080/task */
export const useCreateTask = getUseFetchListResourceFunction(PATH_PREFIX);
