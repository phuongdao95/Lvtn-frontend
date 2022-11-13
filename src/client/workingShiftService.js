import api from "./api";
import {
    getPendingErrorSuccessApiPatternFunction,
    getUseCreateResourceFunction,
    getUseDeleteResourceFunction,
    getUseFetchListResourceFunction,
    getUseFetchOneResourceFunction,
    getUseUpdateResourceFunction
} from "./crudService";

const PATH_PREFIX = 'api/workingShift';

export const useFetchOneWorkingShift =
    getUseFetchOneResourceFunction(PATH_PREFIX);

export const useFetchListWorkingShift =
    getUseFetchListResourceFunction(PATH_PREFIX);

export const useCreateWorkingShift =
    getUseCreateResourceFunction(PATH_PREFIX);

export const useUpdateWorkingShift =
    getUseUpdateResourceFunction(PATH_PREFIX);

export const useDeleteWorkingShift =
    getUseDeleteResourceFunction(PATH_PREFIX);


export const useFetchListWorkingShiftRegistration =
    getUseFetchListResourceFunction("/api/workingshiftregistration");

export const useCreateWorkingShiftRegistration =
    getUseCreateResourceFunction("/api/workingshiftregistration");


export const useFetchRegistrationListOfUser = getPendingErrorSuccessApiPatternFunction(
    ({ setIsError, setIsSuccess, setIsPending, setData }) => {
        const fetch = async (userId, query, queryType) => {
            setIsError(false);
            setIsSuccess(false);
            setIsPending(true);

            try {
                const response = await api.get(
                    `/api/user/${userId}/workingshiftregistration/`,
                    {
                        params: {
                            query: encodeURIComponent(query),
                            queryType: encodeURIComponent(queryType),
                        }
                    });

                if (response.data) {
                    setData(response.data);
                }
                setIsSuccess(true);
            } catch (err) {
                setIsError(true);
                console.error(err);
            } finally {
                setIsPending(false);
            }
        }

        return fetch;
    })();
