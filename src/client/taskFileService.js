import {
    getPendingErrorSuccessApiPatternFunction,
    getUseDeleteResourceFunction,
    getUseFetchListResourceFunction,
    getUseFetchOneResourceFunction,
    getUseUpdateResourceFunction
} from "./crudService";

import api from "./api";

const PATH_PREFIX = "api/taskfile"

export const useFetchListTaskFile = getUseFetchListResourceFunction(PATH_PREFIX);

export const useFetchOneTaskFile = getUseFetchOneResourceFunction(PATH_PREFIX);

export const useUpdateTaskFile = getUseUpdateResourceFunction(PATH_PREFIX);

export const useDeleteTaskFile = getUseDeleteResourceFunction(PATH_PREFIX);

export const useCreateTaskFile = getPendingErrorSuccessApiPatternFunction(
    ({ setIsError, setIsSuccess, setIsPending, setData }) => {
        const fetchList = async (taskId, values) => {
            setIsError(false);
            setIsSuccess(false);
            setIsPending(true);
            try {
                console.log(values);
                const response = await api.post(`/api/task/${taskId}/taskfile/`,
                    {
                        ...values
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

        return fetchList;
    })();


export const downloadFile = (id) => {
    window.open(`${api.getUri()}${PATH_PREFIX}/${id}/download`);
}