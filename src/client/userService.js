import api from "./api";
import { getPendingErrorSuccessApiPatternFunction, getUseCreateResourceFunction, getUseFetchListResourceFunction, getUseFetchOneResourceFunction, getUseUpdateResourceFunction } from "./crudService";

const PATH_PREFIX = 'api/user';

export const useFetchOneUser =
    getUseFetchOneResourceFunction(PATH_PREFIX);

export const useFetchListUser =
    getUseFetchListResourceFunction(PATH_PREFIX);

export const useCreateUser =
    getUseCreateResourceFunction(PATH_PREFIX);

export const useUpdateUser =
    getUseUpdateResourceFunction(PATH_PREFIX);

export const useFetchListUserWithNoTeam =
    getPendingErrorSuccessApiPatternFunction(({
        setIsError,
        setIsSuccess,
        setIsPending,
        setData },
        pathPrefix) => {
        const fetchUsers = async (query) => {
            setIsError(false);
            setIsSuccess(false);
            setIsPending(true);
            try {
                const response = await api.get(pathPrefix, {
                    offset: 0,
                    limit: 9999,
                    query: query,
                    type: "no_team",
                });

                if (response.data) {
                    setData(response.data);
                }
                setIsSuccess(true);
                return response.data;
            } catch (err) {
                setIsError(false);
                console.error(err);
            } finally {
                setIsPending(false);
            }
        }

        return fetchUsers;
    })(PATH_PREFIX);

export const useFetchListUserWhoIsManager =
    getPendingErrorSuccessApiPatternFunction(({
        setIsError,
        setIsSuccess,
        setIsPending,
        setData },
        pathPrefix) => {
        const fetchUsers = async (query) => {
            setIsError(false);
            setIsSuccess(false);
            setIsPending(true);
            try {
                const response = await api.get(pathPrefix, {
                    offset: 0,
                    limit: 9999,
                    query: query,
                    type: "manager",
                });

                if (response.data) {
                    setData(response.data);
                }
                setIsSuccess(true);
                return response.data;
            } catch (err) {
                setIsError(false);
                console.error(err);
            } finally {
                setIsPending(false);
            }
        }

        return fetchUsers;
    })(PATH_PREFIX);