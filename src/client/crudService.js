import { useEffect, useState } from "react";
import api from "./api";


/**
 * All the methods inheritting this interface return the object below
 * @ isPending: Is the request pending.
 * @ isSuccess: Has the request completed successfully.
 * @ isError: Has the request completed with a failure
 * @ method: The method related to the name of the hook
 * @ data: The data returned from calling the hook.
 */
export const getPendingErrorSuccessApiPatternFunction = (fn) => (pathPrefix) => () => {
    const [isPending, setIsPending] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [data, setData] = useState(false);

    const method = fn({ setIsError, setIsPending, setIsSuccess, setData }, pathPrefix);

    return {
        method,
        data,
        isPending,
        isSuccess,
        isError
    }
};


/**These methods return corresponding hooks that can be used inside react component */
export const getUseCreateResourceFunction =
    getPendingErrorSuccessApiPatternFunction(({ setIsError, setIsPending, setIsSuccess }, pathPrefix) => {
        const createResource = async (formData) => {
            try {
                const path = pathPrefix;
                await api.post(path, formData);
                setIsSuccess(true);
            } catch (err) {
                console.log(err);
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        }

        return createResource;
    });


export const getUseUpdateResourceFunction =
    getPendingErrorSuccessApiPatternFunction(({ setIsError, setIsPending, setIsSuccess, setMethod }, pathPrefix) => {
        const updateResource = async (id, formData) => {
            try {
                const path = `${pathPrefix}/${id}`;
                await api.put(path, formData);
                setIsSuccess(true);
            } catch (err) {
                console.log(err);
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        }

        return updateResource;
    });


export const getUseFetchListResourceFunction =
    getPendingErrorSuccessApiPatternFunction(({ setIsError, setIsPending, setIsSuccess, setData }, pathPrefix) => {
        const fetchList = async function (offset = 0, limit = 8, query) {
            setIsError(false);
            setIsPending(true);
            setIsSuccess(false);

            try {
                const params = !query ? { offset, limit } : { offset, limit, query: encodeURIComponent(query) }
                const response = await api.get(pathPrefix, {
                    params
                });
                if (response.data) {
                    setData(response.data);
                    setIsSuccess(true);
                }
            } catch (err) {
                console.log(err);
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        }

        useEffect(() => {
            fetchList();
        }, []);

        return fetchList;
    });


export const getUseDeleteResourceFunction =
    getPendingErrorSuccessApiPatternFunction(({ setIsError, setIsPending, setIsSuccess, setMethod }, pathPrefix) => {
        const deleteResource = async (id) => {
            try {
                const path = `${pathPrefix}/${id}`
                await api.delete(path, {});
                setIsSuccess(true);
            } catch (err) {
                console.log(err);
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        }

        return deleteResource;
    });


export const getUseFetchOneResourceFunction =
    getPendingErrorSuccessApiPatternFunction(({ setIsError, setIsPending, setIsSuccess, setData }, pathPrefix) => {
        const fetchOneResource = async (id) => {
            try {
                const path = `${pathPrefix}/${id}`
                const response = await api.get(path, {});
                if (response.data) {
                    setData(response.data);
                    setIsSuccess(true);
                }
            } catch (err) {
                console.log(err);
                setIsSuccess(false);
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        }

        return fetchOneResource;
    });
