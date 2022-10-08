import api from "./api";
import {
    getPendingErrorSuccessApiPatternFunction,
    getUseCreateResourceFunction,
    getUseDeleteResourceFunction,
    getUseFetchListResourceFunction,
    getUseFetchOneResourceFunction,
    getUseUpdateResourceFunction
} from "./crudService";

const PATH_PREFIX = 'api/workingShiftEvent';

export const useFetchOne =
    getUseFetchOneResourceFunction(PATH_PREFIX);

export const useFetchList =
    getUseFetchListResourceFunction(PATH_PREFIX);

export const useCreate =
    getUseCreateResourceFunction(PATH_PREFIX);

export const useUpdate =
    getUseUpdateResourceFunction(PATH_PREFIX);

export const useDelete =
    getUseDeleteResourceFunction(PATH_PREFIX);
