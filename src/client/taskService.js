import api from "./api";

import {
    getPendingErrorSuccessApiPatternFunction,
    getUseCreateResourceFunction,
    getUseDeleteResourceFunction,
    getUseFetchOneResourceFunction,
    getUseUpdateResourceFunction,
} from "./crudService";

const PATH_PREFIX = "api/task"

export const useFetchOneTask = getUseFetchOneResourceFunction(PATH_PREFIX);

export const useUpdateTask = getUseUpdateResourceFunction(PATH_PREFIX);

export const useCreateTask = getUseCreateResourceFunction(PATH_PREFIX);

export const useDeleteTask = getUseDeleteResourceFunction(PATH_PREFIX);

export const useFetchTaskLabelsOfTask = getPendingErrorSuccessApiPatternFunction(
    ({ setIsError, setIsPending, setIsSuccess, setData }) => {
        const fetchList = async (taskId) => {
            setIsError(false);
            setIsSuccess(false);
            setIsPending(true);

            try {
                const response = await api.get(`/api/task/${taskId}/tasklabel/`);

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

    }
)()

export const useUpdateTaskDescription = getPendingErrorSuccessApiPatternFunction(
    ({ setIsError, setIsPending, setIsSuccess, setData }) => {
        const updateDescription = async (taskId, description) => {
            setIsError(false);
            setIsSuccess(false);
            setIsPending(true);

            try {
                await api.put(`/api/task/${taskId}/description`, { description: description });
                setIsSuccess(true);
            } catch (err) {
                setIsError(true);
                console.error(err);
            } finally {
                setIsPending(false);
            }
        }

        return updateDescription;
    }
)();

export const useFetchTaskCommentsOfTask = getPendingErrorSuccessApiPatternFunction(
    ({ setIsError, setIsPending, setIsSuccess, setData }) => {
        const fetchTaskCommentsOfTask = async (taskId) => {
            setIsError(false);
            setIsSuccess(false);
            setIsPending(true);

            try {
                const response = await api.get(`/api/task/${taskId}/taskcomment`);
                if (response.data) {
                    setData(response.data);
                }
                setIsSuccess(true);
            }
            catch (err) {
                console.error(err);
                setIsError(true);
            }
            finally {
                setIsPending(false);
            }
        }

        return fetchTaskCommentsOfTask;
    }
)();

export const useMoveTask = getPendingErrorSuccessApiPatternFunction(
    ({ setIsError, setIsSuccess, setIsPending }) => {
        const moveTask = async (taskId, taskBoardId, sourceColumnName, destinationColumnName) => {
            setIsError(false);
            setIsSuccess(false);
            setIsPending(true);

            try {
                await api.put(`/api/task/${taskId}/taskcolumn`,
                    { taskBoardId, sourceColumnName, destinationColumnName }
                );
                setIsSuccess(true);
            }
            catch (err) {
                console.error(err);
                setIsError(true);
            }
            finally {
                setIsPending(false);
            }
        }

        return moveTask;
    })();


export const useAddTaskComment = getPendingErrorSuccessApiPatternFunction(
    ({ setIsError, setIsSuccess, setIsPending }) => {
        const addComment = async (taskId, data) => {
            setIsError(false);
            setIsSuccess(false);
            setIsPending(true);

            try {
                await api.post(`/api/task/${taskId}/taskcomment`, data);
                setIsSuccess(true);
            }
            catch (err) {
                console.error(err);
                setIsError(true);
            }
            finally {
                setIsPending(false);
            }
        }

        return addComment;
    })();




export const useFetchTaskFilesOfTask = getPendingErrorSuccessApiPatternFunction(
    ({ setIsError, setIsPending, setIsSuccess, setData }) => {
        const fetchList = async (taskId) => {
            setIsError(false);
            setIsSuccess(false);
            setIsPending(true);

            try {
                const response = await api.get(`/api/task/${taskId}/taskfile/`);

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
    }
)();

export const useAddTaskLabel = getPendingErrorSuccessApiPatternFunction(
    ({ setIsError, setIsPending, setIsSuccess, setData }) => {
        const addTaskLabel = async (taskId, tasklabelid) => {
            setIsError(false);
            setIsSuccess(false);
            setIsPending(true);

            try {
                const response = await api.post(`/api/task/${taskId}/tasklabel/${tasklabelid}`);

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

        return addTaskLabel;
    }
)();

export const useRemoveTaskLabelFromTask = getPendingErrorSuccessApiPatternFunction(
    ({ setIsError, setIsPending, setIsSuccess, setData }) => {
        const removeTaskLabelFromTask = async (taskId, tasklabelid) => {
            setIsError(false);
            setIsSuccess(false);
            setIsPending(true);

            try {
                const response = await api.delete(`/api/task/${taskId}/tasklabel/${tasklabelid}`);

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

        return removeTaskLabelFromTask;
    }
)();

export const useFetchTaskHistoriesOfTask = getPendingErrorSuccessApiPatternFunction(
    ({ setIsError, setIsPending, setIsSuccess, setData }) => {
        const fetchList = async (taskId) => {
            setIsError(false);
            setIsSuccess(false);
            setIsPending(true);

            try {
                const response = await api.get(`/api/task/${taskId}/taskhistory`);

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
    }
)();

export const useFetchSubtasksOfTask = getPendingErrorSuccessApiPatternFunction(
    ({ setIsError, setIsPending, setIsSuccess, setData }) => {
        const fetchList = async (taskId) => {
            setIsError(false);
            setIsSuccess(false);
            setIsPending(true);

            try {
                const response = await api.get(`/api/task/${taskId}/subtasks`);

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
    }
)();

export const useCreateSubtaskOfTask = getPendingErrorSuccessApiPatternFunction(
    ({ setIsError, setIsPending, setIsSuccess, setData }) => {
        const fetchList = async (taskId, data) => {
            setIsError(false);
            setIsSuccess(false);
            setIsPending(true);

            try {
                const response = await api.post(`/api/task/${taskId}/subtasks`, data);

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
    }
)();