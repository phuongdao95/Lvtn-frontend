import api from "./api";
import {
    getPendingErrorSuccessApiPatternFunction,
    getUseCreateResourceFunction,
    getUseDeleteResourceFunction,
    getUseFetchListResourceFunction,
    getUseFetchOneResourceFunction,
    getUseUpdateResourceFunction
} from "./crudService";

const PATH_PREFIX = 'api/role';

export const useFetchOneRole =
    getUseFetchOneResourceFunction(PATH_PREFIX);

export const useFetchListRole =
    getUseFetchListResourceFunction(PATH_PREFIX);

export const useCreateRole =
    getUseCreateResourceFunction(PATH_PREFIX);

export const useUpdateRole =
    getUseUpdateResourceFunction(PATH_PREFIX);

export const useDeleteRole =
    getUseDeleteResourceFunction(PATH_PREFIX);

export const useFetchPermissionOfRole =
    getPendingErrorSuccessApiPatternFunction(({ setIsError, setIsSuccess, setIsPending, setData }, pathPrefix) => {
        const fetchPermissionOfRole = async (roleId) => {
            try {
                const response = await api.get(`${pathPrefix}/${roleId}/permission`);
                if (response.data) {
                    setData(response.data);
                }
                setIsSuccess(true);
            } catch (err) {
                console.error(err);
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        }

        return fetchPermissionOfRole;
    })(PATH_PREFIX);

// export const useAddOneTeam =
//     getPendingErrorSuccessApiPatternFunction(({ setIsError, setIsSuccess, setIsPending }) => {
//         return;
//     });

// export const useRemoveOneTeam =
//     getPendingErrorSuccessApiPatternFunction((setIsError, setIsSuccess, setIsPending) => {
//         return;
//     });
