import { getUseFetchListResourceFunction, getUseFetchOneResourceFunction, getUseUpdateResourceFunction } from "./crudService";

const PATH_PREFIX = "api/salary";

export const useUpdateSalary = getUseUpdateResourceFunction(PATH_PREFIX);

export const useFetchOneSalary = getUseFetchOneResourceFunction(PATH_PREFIX);

export const useFetchListSalary = getUseFetchListResourceFunction(PATH_PREFIX);