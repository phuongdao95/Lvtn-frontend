import api from "./api";

import {
    getUseCreateResourceFunction,
    getUseDeleteResourceFunction,
    getUseFetchOneResourceFunction,
    getUseUpdateResourceFunction,
    getPendingErrorSuccessApiPatternFunction
} from "./crudService";

const PATH_PREFIX = "api/taskboard"

export const useFetchOneTaskBoard = getUseFetchOneResourceFunction(PATH_PREFIX);

export const useUpdateTaskBoard = getUseUpdateResourceFunction(PATH_PREFIX);

export const useCreateTaskBoard = getUseCreateResourceFunction(PATH_PREFIX);

export const useDeleteTaskBoard = getUseDeleteResourceFunction(PATH_PREFIX);


export const useFetchTaskColumnsOfTaskBoard = getPendingErrorSuccessApiPatternFunction(
    ({ setIsError, setIsPending, setIsSuccess, setData }) => {
        const fetchTasks = async (taskboardId) => {
            setIsError(false);
            setIsPending(true);
            setIsSuccess(false);

            try {
                const response = await api.get(`api/taskboard/${taskboardId}/taskcolumn`)
                if (response.data) {
                    setData(response.data)
                }

                setIsSuccess(true);
            } catch (err) {
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        }

        return fetchTasks;
    })();

export const useFetchTaskLabelsOfBoard =
    getPendingErrorSuccessApiPatternFunction(
        ({ setIsError, setIsPending, setIsSuccess, setData }) => {
            const fetchTaskLabelsOfBoard = async (taskboardId) => {
                setIsError(false);
                setIsPending(false);
                setIsSuccess(false);

                try {
                    const response = await api.get(`api/taskboard/${taskboardId}/tasklabel`)
                    if (response.data) {
                        setData(response.data);
                    }

                    setIsSuccess(true);
                }
                catch (err) {
                    setIsError(true);
                }
                finally {
                    setIsPending(false);
                }
            }

            return fetchTaskLabelsOfBoard;
        }
    )();

export const useFetchTasksOfTaskColumn =
    getPendingErrorSuccessApiPatternFunction(
        ({ setIsError, setIsPending, setIsSuccess, setData }) => {
            const fetchTaskListOfTaskColumn = async (taskboardId, formData) => {
                setIsError(false);
                setIsPending(true);
                setIsSuccess(false);

                try {
                    const response = await api.post(`api/taskcolumn/${taskboardId}/task`)
                    if (response.data) {
                        setData(response.data)
                    }
                    setIsSuccess(true);
                }
                catch (err) {
                    console.error(err);
                    setIsError(true);
                }
                finally {
                    setIsPending(false)
                }
            }

            return fetchTaskListOfTaskColumn;
        })();

export const useFetchTasksOfTaskColumns =
    getPendingErrorSuccessApiPatternFunction(
        ({ setIsError, setIsPending, setIsSuccess, setData }) => {
            const fetchTaskListOfTaskColumn = async (columnList, formData = { isDisabled: true }) => {
                setIsError(false);
                setIsPending(true);
                setIsSuccess(false);

                try {
                    const responses = await Promise.all(columnList.map((column) => {
                        const { labels, inChargeds, reportTos } = formData;
                        const labelIds = labels?.map((label) => label.id);
                        const inChargeIds = inChargeds?.map((inCharged) => inCharged.id);
                        const reportToIds = reportTos?.map((reportTo) => reportTo.id);

                        return api.post(`/api/taskcolumn/${column.id}/task`,
                            { ...formData, labelIds, inChargeIds, reportToIds, startDate: null, endDate: null })
                            .then((response) => {
                                const taskInfo = response.data;

                                return taskInfo;
                            });
                    }));


                    const mapped = responses.map((response) => response.data)
                        .map((column, index) => ({ items: column, name: columnList[index].name, id: columnList[index].columnId }))

                    setData(mapped);

                    setIsSuccess(true);
                }
                catch (err) {
                    console.error(err);
                    setIsError(true);
                }
                finally {
                    setIsPending(false)
                }
            }

            return fetchTaskListOfTaskColumn;
        })();

export const useFetchTaskBoardListOfUser =
    getPendingErrorSuccessApiPatternFunction(
        ({
            setIsError,
            setIsPending,
            setIsSuccess,
            setData }
        ) => {
            const fetchList = async (userId) => {
                setIsError(false);
                setIsSuccess(false);
                setIsPending(true);

                try {
                    const response = await api.get(`/api/user/${userId}/taskboard/`);

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

            return fetchList;
        })();

export const useFetchUsersOfBoard
    = getPendingErrorSuccessApiPatternFunction(({
        setIsError,
        setIsPending,
        setIsSuccess,
        setData
    }) => {
        const fetchList = async (boardId) => {
            setIsError(false);
            setIsSuccess(false);
            setIsPending(true);

            try {
                const response = await api.get(`/api/taskboard/${boardId}/user`);

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

        return fetchList;
    })();


export const useFetchReportOfBoard
    = getPendingErrorSuccessApiPatternFunction(({
        setIsError,
        setIsPending,
        setIsSuccess,
        setData
    }) => {
        const fetchReport = async (boardId) => {
            setIsError(false);
            setIsSuccess(false);
            setIsPending(true);

            try {
                const response = await api.get(`/api/taskboard/${boardId}/report`);

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

        return fetchReport;
    })()