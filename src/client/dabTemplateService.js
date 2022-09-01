import { getUseCreateResourceFunction, getUseDeleteResourceFunction, getUseFetchListResourceFunction, getUseFetchOneResourceFunction, getUseUpdateResourceFunction } from "./crudService"

const PATH_PREFIX = "api/dabtemplate"

export const useFetchListDABTemplate = getUseFetchListResourceFunction(PATH_PREFIX);

export const useFetchOneDABTemplate = getUseFetchOneResourceFunction(PATH_PREFIX);

export const useCreateDABTemplate = getUseCreateResourceFunction(PATH_PREFIX);

export const useUpdateDABTemplate = getUseUpdateResourceFunction(PATH_PREFIX); 

export const useDeleteDABTemplate = getUseDeleteResourceFunction(PATH_PREFIX);