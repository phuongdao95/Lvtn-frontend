import api from "./api";
import {
    getPendingErrorSuccessApiPatternFunction,
    getUseCreateResourceFunction,
    getUseDeleteResourceFunction,
    getUseFetchListResourceFunction,
    getUseFetchOneResourceFunction,
    getUseUpdateResourceFunction
} from "./crudService";

const PATH_PREFIX = 'api/salaryvariable';

export const useFetchOneVariable =
    getUseFetchOneResourceFunction(PATH_PREFIX);

export const useFetchListVariable =
    getUseFetchListResourceFunction(PATH_PREFIX);

export const useCreateVariable =
    getUseCreateResourceFunction(PATH_PREFIX);

export const useUpdateVariable =
    getUseUpdateResourceFunction(PATH_PREFIX);

export const useDeleteVariable =
    getUseDeleteResourceFunction(PATH_PREFIX);

export const useFetchSystemVariableList = getPendingErrorSuccessApiPatternFunction(
    ({ setIsError, setIsSuccess, setIsPending, setData }) => {
        const fetchVariables = async (type) => {
            setIsError(false);
            setIsSuccess(false);
            setIsPending(false);

            try {
                const response = await api.get(`api/salarysystemvariable?kind=${type}`)
                if (response.data) {
                    setData(response.data);
                }
                setIsSuccess(true);
            }
            catch (err) {
                setData(err);
                setIsError(true);
            }
            finally {
                setIsPending(false);
            }
        }

        return fetchVariables;
    }
)()