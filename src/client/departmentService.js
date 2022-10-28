import api from "./api";
import { getPendingErrorSuccessApiPatternFunction, getUseCreateResourceFunction, getUseDeleteResourceFunction, getUseFetchListResourceFunction, getUseFetchOneResourceFunction, getUseUpdateResourceFunction } from "./crudService";

const PATH_PREFIX = 'api/department';

export const useFetchOneDepartment =
    getUseFetchOneResourceFunction(PATH_PREFIX);

export const useFetchListDepartment =
    getUseFetchListResourceFunction(PATH_PREFIX);

export const useCreateDepartment =
    getUseCreateResourceFunction(PATH_PREFIX);

export const useUpdateDepartment =
    getUseUpdateResourceFunction(PATH_PREFIX);

export const useDeleteDepartment =
    getUseDeleteResourceFunction(PATH_PREFIX);

export const useFetchTeamsOfDepartment = getPendingErrorSuccessApiPatternFunction(
    ({ setIsError, setIsSuccess, setIsPending, setData }) => {
        const fetchTeams = async (departmentId) => {
            setIsError(false);
            setIsPending(true);
            setIsSuccess(false);
            setData(null);

            try {
                const response = await api.get(`/api/department/${departmentId}/team`)
                if (response.data) {
                    setData(response.data);
                }
                setIsSuccess(true);
            }
            catch (err) {
                setData(err)
                setIsError(true);
            }
            finally {
                setIsPending(false);
            }
        }

        return fetchTeams;
    }
)();