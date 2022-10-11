import {
    getUseCreateResourceFunction,
    getUseDeleteResourceFunction,
    getUseFetchListResourceFunction,
    getUseFetchOneResourceFunction,
    getUseUpdateResourceFunction
} from "./crudService";

const PATH_PREFIX = 'api/group';

export const useFetchOneGroup =
    getUseFetchOneResourceFunction(PATH_PREFIX);

export const useFetchListGroup =
    getUseFetchListResourceFunction(PATH_PREFIX);

export const useCreateGroup =
    getUseCreateResourceFunction(PATH_PREFIX);

export const useUpdateGroup =
    getUseUpdateResourceFunction(PATH_PREFIX);

export const useDeleteGroup =
    getUseDeleteResourceFunction(PATH_PREFIX);