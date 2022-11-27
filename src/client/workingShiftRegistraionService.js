import api from "./api";

import {
    getPendingErrorSuccessApiPatternFunction,
    getUseCreateResourceFunction,
    getUseDeleteResourceFunction,
    getUseFetchOneResourceFunction,
    getUseUpdateResourceFunction,
} from "./crudService";

const PATH_PREFIX = "api/task"

export const useFetchOneWorkingShiftRegistration = getUseFetchOneResourceFunction(PATH_PREFIX);

export const useUpdateWorkingShiftRegistration = getUseUpdateResourceFunction(PATH_PREFIX);

export const useCreateWorkingShiftRegistration = getUseCreateResourceFunction(PATH_PREFIX);

export const useDeleteWorkingShiftRegistration = getUseDeleteResourceFunction(PATH_PREFIX);

export const useFetchWorkingShiftRegistrationLabelsOfTask = getPendingErrorSuccessApiPatternFunction(
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

