import api from "./api";
import { getPendingErrorSuccessApiPatternFunction, getUseCreateResourceFunction, getUseDeleteResourceFunction, getUseFetchListResourceFunction, getUseFetchOneResourceFunction, getUseUpdateResourceFunction } from "./crudService";

const PATH_PREFIX = 'api/timekeepingmanage';

export const useFetchList = getPendingErrorSuccessApiPatternFunction(
    ({ setIsError, setIsSuccess, setIsPending, setData }) => {
        const fetch = async (month, year, workCount) => {
            setIsError(false);
            setIsSuccess(false);
            setIsPending(true);

            try {
                const response = await api.get(
                    `api/TimekeepingManage?month=${month}&year=${year}&workCount=${workCount}`);

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

        return fetch;
    })();

export const useIsFullTime = getPendingErrorSuccessApiPatternFunction(
        ({ setIsError, setIsSuccess, setIsPending, setData }) => {
            const fetch = async (day, month, year, id) => {
                setIsError(false);
                setIsSuccess(false);
                setIsPending(true);
    
                try {
                    const response = await api.get(
                        `api/manage?day=${day}&month=${month}&year=${year}&id=${id}`);
    
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
    
            return fetch;
        })();

