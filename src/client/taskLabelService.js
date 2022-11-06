import {
    getUseCreateResourceFunction,
    getUseDeleteResourceFunction,
    getUseFetchListResourceFunction,
    getUseFetchOneResourceFunction,
    getUseUpdateResourceFunction
} from "./crudService";

const PATH_PREFIX = "api/tasklabel"

export const useFetchListTaskLabel = getUseFetchListResourceFunction(PATH_PREFIX);

export const useFetchOneTaskLabel = getUseFetchOneResourceFunction(PATH_PREFIX);

export const useUpdateTaskLabel = getUseUpdateResourceFunction(PATH_PREFIX);

export const useCreateTaskLabel = getUseCreateResourceFunction(PATH_PREFIX);

export const useDeleteTaskLabel = getUseDeleteResourceFunction(PATH_PREFIX);
