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

export const useAddComment = getPendingErrorSuccessApiPatternFunction(
    ({ setIsError, setIsSuccess, setIsPending }) => {
        const addComment = async (taskId, data) => {
            setIsError(false);
            setIsSuccess(false);
            SetIsPending(true);

            try {
                await api.put(`/api/task/${taskId}/taskcomment`, data);
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


