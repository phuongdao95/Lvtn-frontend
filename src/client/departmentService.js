import { getUseCreateResourceFunction, getUseDeleteResourceFunction, getUseFetchListResourceFunction, getUseFetchOneResourceFunction, getUseUpdateResourceFunction } from "./crudService";

const PATH_PREFIX = 'api/department';

export const useFetchOneDepartment =
    getUseFetchOneResourceFunction(PATH_PREFIX);

export const useFetchListDepartment =
    getUseFetchListResourceFunction(PATH_PREFIX);

export const useCreateDepartment =
    getUseCreateResourceFunction(PATH_PREFIX);

export const useUpdateDepartment =
    getUseUpdateResourceFunction(PATH_PREFIX);

export const useDeleteDepartment = 
    getUseDeleteResourceFunction(PATH_PREFIX);
