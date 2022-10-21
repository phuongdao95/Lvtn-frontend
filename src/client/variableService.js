import {
    getUseCreateResourceFunction,
    getUseDeleteResourceFunction,
    getUseFetchListResourceFunction,
    getUseFetchOneResourceFunction,
    getUseUpdateResourceFunction
} from "./crudService";

const PATH_PREFIX = 'api/salaryvariable';

export const useFetchOneVariable =
    getUseFetchOneResourceFunction(PATH_PREFIX);

export const useFetchListVariable =
    getUseFetchListResourceFunction(PATH_PREFIX);

export const useCreateVariable =
    getUseCreateResourceFunction(PATH_PREFIX);

export const useUpdateVariable =
    getUseUpdateResourceFunction(PATH_PREFIX);

export const useDeleteVariable =
    getUseDeleteResourceFunction(PATH_PREFIX);