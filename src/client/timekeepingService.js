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

export const useFetchWorkingShiftsOfUser =
    getPendingErrorSuccessApiPatternFunction(({ setIsError, setIsSuccess, setIsPending, setData }, pathPrefix) => {
        const fetchByUser = async (userId) => {
            try {
                const response = await api.get(`api/user/${userId}/workingshift`);
                if (response.data) {
                    setData(response.data);
                }
                setIsSuccess(true);
            } catch (err) {
                console.error(err);
                setIsSuccess(false);
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        }
        return fetchByUser;
    })();

export const useUpdateSelected =
    getPendingErrorSuccessApiPatternFunction(({ setIsError, setIsSuccess, setIsPending, setData }, pathPrefix) => {
        const updateSelected = async (userId, activeId) => {
            try {
                const params = { userId: parseInt(userId) };
                const response = await api.put(pathPrefix, activeId, { params });
                if (response.data) {
                    setData(response.data);
                }
                setIsSuccess(true);
            } catch (err) {
                console.error(err);
                setIsSuccess(false);
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        }
        return updateSelected;
    })('workingshift/user');

export const useFetchTimekeepingsOfUser =
    getPendingErrorSuccessApiPatternFunction(({ setIsError, setIsSuccess, setIsPending, setData }, pathPrefix) => {
        const fetch = async (userId, query, queryType) => {
            try {
                const params = {
                    query: encodeURI(query),
                    queryType
                };

                const response = await api.get(`/api/user/${userId}/scheduler`,
                    { params });
                if (response.data) {
                    setData(response.data);
                }
                setIsSuccess(true);
            } catch (err) {
                console.error(err);
                setIsSuccess(false);
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        }
        return fetch;
    })();


export const useFetchTimekeepingHistoriesOfTimekeeping =
    getPendingErrorSuccessApiPatternFunction(({ setIsError, setIsSuccess, setIsPending, setData }, pathPrefix) => {
        const fetch = async (timekeepingId) => {
            try {
                const response = await api.get(`/api/workingshifttimekeeping/${timekeepingId}/workingshifttimekeepinghistory`);
                if (response.data) {
                    setData(response.data);
                }
                setIsSuccess(true);
            } catch (err) {
                console.error(err);
                setIsSuccess(false);
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        }
        return fetch;
    })();
