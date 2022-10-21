import {
    getUseCreateResourceFunction,
    getUseDeleteResourceFunction,
    getUseFetchListResourceFunction,
    getUseFetchOneResourceFunction,
    getUseUpdateResourceFunction
} from "./crudService";

const PATH_PREFIX = "api/taskcolumn"

export const useFetchListTaskColumn = getUseFetchListResourceFunction(PATH_PREFIX);

export const useFetchOneTaskColumn = getUseFetchOneResourceFunction(PATH_PREFIX);

export const useUpdateTaskColumn = getUseUpdateResourceFunction(PATH_PREFIX);

export const useCreateTaskColumn = getUseCreateResourceFunction(PATH_PREFIX);

export const useDeleteTaskColumn = getUseDeleteResourceFunction(PATH_PREFIX);
