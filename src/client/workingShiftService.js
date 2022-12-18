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

export const useDeleteRegistration =
    getUseDeleteResourceFunction("/api/workingshiftregistration");

export const useDeleteRegistrationByIdAndUserId = getPendingErrorSuccessApiPatternFunction(
    ({ setIsError, setIsSuccess, setIsPending, setData }) => {
        const fetch = async (userId, registrationId) => {
            setIsError(false);
            setIsSuccess(false);
            setIsPending(true);

            try {
                const response = await api.delete(
                    `/api/user/${userId}/workingshiftregistration/${registrationId}`);

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


export const useFetchWorkingShiftsOfUser = getPendingErrorSuccessApiPatternFunction(
    ({ setIsError, setIsSuccess, setIsPending, setData }) => {
        const fetch = async (userId, query, queryType) => {
            setIsError(false);
            setIsSuccess(false);
            setIsPending(true);

            try {
                const response = await api.get(
                    `/api/user/${userId}/workingshift/`,
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

export const useFetchListWorkingShiftDayConfig =
    getPendingErrorSuccessApiPatternFunction(({ setIsError, setIsPending, setIsSuccess, setData }, pathPrefix) => {
        const fetchList = async function (offset = 0, limit = 8, query, type = "name") {
            setIsError(false);
            setIsPending(true);
            setIsSuccess(false);

            try {
                const params = !query ? { offset, limit }
                    : { offset, limit, query: encodeURIComponent(query), queryType: type }

                const response = await api.get(pathPrefix, {
                    params
                });

                if (response.data) {
                    setData(response.data);
                }

                setIsSuccess(true);
            } catch (err) {
                console.log(err);
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        }

        return fetchList;
    })('api/workingshiftdayconfig');


export const useFetchOneWorkingShiftDayConfig =
    getUseFetchListResourceFunction("api/workingshiftdayconfig");

export const useCreateWorkingShiftDayConfig =
    getUseCreateResourceFunction("api/workingshiftdayconfig");

export const useUpdateWorkingShiftDayConfig =
    getUseUpdateResourceFunction("api/workingshiftdayconfig");

export const useDeleteWorkingShiftDayConfig =
    getUseDeleteResourceFunction("api/workingshiftdayconfig");

export const useCreateWorkingShiftOvertime =
    getPendingErrorSuccessApiPatternFunction(({ setIsError, setIsPending, setIsSuccess, setData }, pathPrefix) => {
        const fetchList = async function (data) {
            setIsError(false);
            setIsPending(true);
            setIsSuccess(false);

            try {
                const response = await api.post(pathPrefix, data);

                if (response.data) {
                    setData(response.data);
                }

                setIsSuccess(true);
            } catch (err) {
                console.log(err);
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        }

        return fetchList;
    })('api/workingshift/overtimeshift');

export const useCreateWorkingShiftFixed =
    getPendingErrorSuccessApiPatternFunction(({ setIsError, setIsPending, setIsSuccess, setData }, pathPrefix) => {
        const fetchList = async function (data) {
            setIsError(false);
            setIsPending(true);
            setIsSuccess(false);

            try {
                const response = await api.post(pathPrefix, data);

                if (response.data) {
                    setData(response.data);
                }

                setIsSuccess(true);
            } catch (err) {
                console.log(err);
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        }

        return fetchList;
    })('api/workingshift/basicshift');


export const useUpdateOverTimeShift =
    getPendingErrorSuccessApiPatternFunction(({ setIsError, setIsPending, setIsSuccess, setData }, pathPrefix) => {
        const fetchList = async function (id, data) {
            setIsError(false);
            setIsPending(true);
            setIsSuccess(false);

            try {
                const response = await api.put(pathPrefix + `/${id}`, data);

                if (response.data) {
                    setData(response.data);
                }

                setIsSuccess(true);
            } catch (err) {
                console.log(err);
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        }

        return fetchList;
    })('api/workingshift/basicshift');


export const useFetchUnregisterWorkingShift =
    getPendingErrorSuccessApiPatternFunction(({ setIsError, setIsPending, setIsSuccess, setData }, pathPrefix) => {
        const fetchList = async function (id, query, queryType) {
            setIsError(false);
            setIsPending(true);
            setIsSuccess(false);

            try {
                const params = { query: encodeURIComponent(query), queryType }

                const response = await api.get(`api/user/${id}/unregisteredworkingshift/`, {
                    params
                });

                if (response.data) {
                    setData(response.data);
                }

                setIsSuccess(true);
            } catch (err) {
                console.log(err);
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        }

        return fetchList;
    })();
