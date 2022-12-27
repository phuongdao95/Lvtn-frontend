import {
    getUseCreateResourceFunction,
    getUseDeleteResourceFunction,
    getUseFetchOneResourceFunction,
    getUseUpdateResourceFunction,
    getPendingErrorSuccessApiPatternFunction
} from "./crudService";

import api from "./api";

const PATH_PREFIX = "/api/salaryformula"

export const useFetchListFormula = getPendingErrorSuccessApiPatternFunction(({ setIsError, setIsPending, setIsSuccess, setData }, pathPrefix) => {
    const fetchList = async function (query, type = "name") {
        setIsError(false);
        setIsPending(true);
        setIsSuccess(false);

        try {
            const params = { query: encodeURIComponent(query), type }

            const response = await api.get(pathPrefix, {
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
})(PATH_PREFIX);


export const useFetchOneFormula = getUseFetchOneResourceFunction(PATH_PREFIX);

export const useCreateFormula = getUseCreateResourceFunction(PATH_PREFIX);

export const useUpdateFormula = getUseUpdateResourceFunction(PATH_PREFIX);

export const useDeleteFormula = getUseDeleteResourceFunction(PATH_PREFIX);

export const checkIfSalaryNameValid = async function ({ name, area }) {
    const response = await api.post(`api/salaryformula/validation/name`, {
        name, formulaArea: area
    });

    if (response.data) {
        return response?.data?.value;
    }
}

export const checkIfSalaryDefineValid = async function ({ define, area }) {
    const response = await api.post(`api/salaryformula/validation/formulaDefine`, {
        define, formulaArea: area
    });

    if (response.data) {
        return response?.data?.value;
    }
}

