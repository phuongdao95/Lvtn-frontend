import {
    getPendingErrorSuccessApiPatternFunction,
    getUseCreateResourceFunction,
    getUseDeleteResourceFunction,
    getUseFetchListResourceFunction,
    getUseFetchOneResourceFunction,
    getUseUpdateResourceFunction
} from "./crudService";

import api from "./api";

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

export const useFetchUsersOfGroup =
    getPendingErrorSuccessApiPatternFunction(
        ({ setIsError, setIsSuccess, setIsPending, setData }) => {
            const fetchUsersOfGroup = async (groupId) => {
                setIsError(false);
                setIsSuccess(false);
                setIsPending(true);
                setData(null);

                try {
                    const response = await api.get(`api/group/${groupId}/user`)
                    if (response.data) {
                        setData(response.data);
                    }

                    setIsSuccess(true);
                }
                catch (err) {
                    setData(null);
                    setIsError(true);
                }
                finally {
                    setIsPending(false);
                }
            }

            return fetchUsersOfGroup;
        }
    )();