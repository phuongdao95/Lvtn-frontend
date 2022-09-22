import {
    getPendingErrorSuccessApiPatternFunction,
    getUseCreateResourceFunction,
    getUseFetchOneResourceFunction,
    getUseFetchListResourceFunction,
    getUseUpdateResourceFunction
} from "./crudService";

const PATH_PREFIX = 'api/team'

export const useFetchOneTeam =
    getUseFetchOneResourceFunction(PATH_PREFIX);

export const useFetchListTeam =
    getUseFetchListResourceFunction(PATH_PREFIX);

export const useCreateTeam =
    getUseCreateResourceFunction(PATH_PREFIX);

export const useUpdateTeam =
    getUseUpdateResourceFunction(PATH_PREFIX);

export const useAddOneUser =
    getPendingErrorSuccessApiPatternFunction(async ({ setIsError, setIsSuccess, setData }) => {
        ;
    })(PATH_PREFIX);
