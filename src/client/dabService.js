import {
    getPendingErrorSuccessApiPatternFunction,
    getUseCreateResourceFunction,
    getUseDeleteResourceFunction,
    getUseFetchListResourceFunction,
    getUseFetchOneResourceFunction,
    getUseUpdateResourceFunction
} from "./crudService";

import api from "./api";

const PATH_PREFIX = "api/salarydelta"

export const useFetchListDAB = getUseFetchListResourceFunction(PATH_PREFIX);

export const useFetchOneDAB = getUseFetchOneResourceFunction(PATH_PREFIX);

export const useUpdateDAB = getUseUpdateResourceFunction(PATH_PREFIX);

export const useCreateDAB = getUseCreateResourceFunction(PATH_PREFIX);

export const useDeleteDAB = getUseDeleteResourceFunction(PATH_PREFIX);

export const useFetchDeduction =
    getPendingErrorSuccessApiPatternFunction(({ setIsError, setIsPending, setIsSuccess, setData }, pathPrefix) => {
        const fetchList = async function (offset = 0, limit = 8, query = "", queryType = "deduction") {
            setIsError(false);
            setIsPending(true);
            setIsSuccess(false);

            try {
                const params = { offset, limit, query: encodeURIComponent(query), queryType }

                const response = await api.get('api/salarydelta', {
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

export const useFetchAllowance =
    getPendingErrorSuccessApiPatternFunction(({ setIsError, setIsPending, setIsSuccess, setData }, pathPrefix) => {
        const fetchList = async function (offset = 0, limit = 8, query = "", queryType = "allowance") {
            setIsError(false);
            setIsPending(true);
            setIsSuccess(false);

            try {
                const params = { offset, limit, query: encodeURIComponent(query), queryType }

                const response = await api.get('api/salarydelta', {
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


export const useFetchBonus =
    getPendingErrorSuccessApiPatternFunction(({ setIsError, setIsPending, setIsSuccess, setData }, pathPrefix) => {
        const fetchList = async function (offset = 0, limit = 8, query = "", queryType = "bonus") {
            setIsError(false);
            setIsPending(true);
            setIsSuccess(false);

            try {
                const params = { offset, limit, query: encodeURIComponent(query), queryType }

                const response = await api.get('api/salarydelta', {
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