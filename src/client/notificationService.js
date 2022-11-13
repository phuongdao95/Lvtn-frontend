import {
    getPendingErrorSuccessApiPatternFunction,
    getUseDeleteResourceFunction,
    getUseFetchListResourceFunction,
} from "./crudService"

import api from "./api";

const PATH_PREFIX = "api/notification";

export const useFetchListNotification = getUseFetchListResourceFunction(PATH_PREFIX);

export const useDeleteNotifiication = getUseDeleteResourceFunction(PATH_PREFIX);

export const useFetchNotificationsOfUser = getPendingErrorSuccessApiPatternFunction(
    ({ setIsError, setIsSuccess, setIsPending, setData }) => {
        const sendPayroll = async (userId) => {
            setIsError(false);
            setIsSuccess(false);
            setIsPending(true);

            try {
                const response = await api.get(`/api/user/${userId}/notification/`);

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

        return sendPayroll;
    })();


export const useMarkAllNotificationAsRead = getPendingErrorSuccessApiPatternFunction(
    ({ setIsError, setIsSuccess, setIsPending, setData }) => {
        const sendPayroll = async (userId) => {
            setIsError(false);
            setIsSuccess(false);
            setIsPending(true);

            try {
                const response = await api.post(`/api/user/${userId}/notification/isread`);

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

        return sendPayroll;
    })();


export const useDeleteAllNotification = getPendingErrorSuccessApiPatternFunction(
    ({ setIsError, setIsSuccess, setIsPending, setData }) => {
        const sendPayroll = async (userId) => {
            setIsError(false);
            setIsSuccess(false);
            setIsPending(true);

            try {
                const response = await api.delete(`/api/user/${userId}/notification`);

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

        return sendPayroll;
    })();
