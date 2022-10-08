import api from "./api";
import {
    getPendingErrorSuccessApiPatternFunction,
    getUseCreateResourceFunction,
    getUseFetchOneResourceFunction,
    getUseFetchListResourceFunction,
    getUseUpdateResourceFunction,
    getUseDeleteResourceFunction
} from "./crudService";

const PATH_PREFIX = 'api/team'

export const useFetchOneTeam =
    getUseFetchOneResourceFunction(PATH_PREFIX);

export const useFetchListTeam =
    getUseFetchListResourceFunction(PATH_PREFIX);

export const useCreateTeam =
    getUseCreateResourceFunction(PATH_PREFIX);

export const useUpdateTeam =
    getUseUpdateResourceFunction(PATH_PREFIX);

export const useDeleteTeam = 
    getUseDeleteResourceFunction(PATH_PREFIX);

export const useFetchTeamListWithoutDepartment =
    getPendingErrorSuccessApiPatternFunction(
        ({
            setIsError,
            setIsPending,
            setIsSuccess,
            setData }, pathPrefix
        ) => {
            const fetchList = async () => {
                setIsError(false);
                setIsSuccess(false);
                setIsPending(true);

                try {
                    const response = await api.get(pathPrefix, {
                        params: {
                            type: "no_department",
                            limit: 9999,
                            offset: 0
                        }
                    });

                    if (response.data) {
                        setData(response.data);
                    }


                } catch (err) {
                    console.error(err);
                }
            }

            return fetchList;
        })(PATH_PREFIX);
