import { getUseCreateResourceFunction, getUseFetchListResourceFunction, getUseFetchOneResourceFunction, getUseUpdateResourceFunction } from "./crudService";

const PATH_PREFIX = 'api/user';

export const useFetchOneUser =
    getUseFetchOneResourceFunction(PATH_PREFIX);

export const useFetchListUser =
    getUseFetchListResourceFunction(PATH_PREFIX);

export const useCreateUser =
    getUseCreateResourceFunction(PATH_PREFIX);

export const useUpdateUser =
    getUseUpdateResourceFunction(PATH_PREFIX);

// export const useAddOneTeam =
//     getPendingErrorSuccessApiPatternFunction(({ setIsError, setIsSuccess, setIsPending }) => {
//         return;
//     });

// export const useRemoveOneTeam =
//     getPendingErrorSuccessApiPatternFunction((setIsError, setIsSuccess, setIsPending) => {
//         return;
//     });
