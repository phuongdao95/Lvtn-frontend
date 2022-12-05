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

export const useGetByUser =
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
