import api from "./api";
import {
    getPendingErrorSuccessApiPatternFunction,
    getUseCreateResourceFunction,
    getUseDeleteResourceFunction,
    getUseFetchListResourceFunction,
    getUseFetchOneResourceFunction,
    getUseUpdateResourceFunction
} from "./crudService";

const PATH_PREFIX = 'api/workingShiftTimekeeping';

export const useFetchOne =
    getUseFetchOneResourceFunction(PATH_PREFIX);

export const useFetchList =
getPendingErrorSuccessApiPatternFunction(({ setIsError, setIsSuccess, setIsPending, setData }, pathPrefix) => {
    const fetchList = async (userId, currentDate, eventId) => {
        try {
            const params = { userId: parseInt(userId), currentDate: currentDate, eventId: parseInt(eventId)};
            const response = await api.get(`${pathPrefix}`, {params});
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
    return fetchList;
})(PATH_PREFIX);

export const useCreate =
    getUseCreateResourceFunction(PATH_PREFIX);

export const useUpdate =
    getUseUpdateResourceFunction(PATH_PREFIX);

export const useDelete =
    getUseDeleteResourceFunction(PATH_PREFIX);

export const useFetchListByUser =
getPendingErrorSuccessApiPatternFunction(({ setIsError, setIsSuccess, setIsPending, setData }, pathPrefix) => {
    const fetchList = async (userId, selectedDate) => {
        try {
            const params = { selectedDate: selectedDate };
            const response = await api.get(`${pathPrefix}/${userId}`, {params});
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
    return fetchList;
})('api/workingShiftTimekeeping/getAllByUser');
