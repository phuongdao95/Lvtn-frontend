import { getUseCreateResourceFunction, getUseFetchListResourceFunction, getUseFetchOneResourceFunction, getUseUpdateResourceFunction } from "./crudService";

const PATH_PREFIX = 'api/role';

export const useFetchOneRole =
    getUseFetchOneResourceFunction(PATH_PREFIX);

export const useFetchListRole =
    getUseFetchListResourceFunction(PATH_PREFIX);

export const useCreateRole =
    getUseCreateResourceFunction(PATH_PREFIX);

export const useUpdateRole =
    getUseUpdateResourceFunction(PATH_PREFIX);

// export const useAddOneTeam =
//     getPendingErrorSuccessApiPatternFunction(({ setIsError, setIsSuccess, setIsPending }) => {
//         return;
//     });

// export const useRemoveOneTeam =
//     getPendingErrorSuccessApiPatternFunction((setIsError, setIsSuccess, setIsPending) => {
//         return;
//     });
