import { getUseCreateResourceFunction, getUseFetchListResourceFunction, getUseFetchOneResourceFunction, getUseUpdateResourceFunction } from "./crudService";

const PATH_PREFIX = 'api/permission';

export const useFetchOnePermission =
    getUseFetchOneResourceFunction(PATH_PREFIX);

export const useFetchListPermission =
    getUseFetchListResourceFunction(PATH_PREFIX);

export const useCreatePermission =
    getUseCreateResourceFunction(PATH_PREFIX);

export const useUpdatePermission =
    getUseUpdateResourceFunction(PATH_PREFIX);

// export const useAddOneTeam =
//     getPendingErrorSuccessApiPatternFunction(({ setIsError, setIsSuccess, setIsPending }) => {
//         return;
//     });

// export const useRemoveOneTeam =
//     getPendingErrorSuccessApiPatternFunction((setIsError, setIsSuccess, setIsPending) => {
//         return;
//     });
