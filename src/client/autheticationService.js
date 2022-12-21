import api from "./api";
import { getPendingErrorSuccessApiPatternFunction } from "./crudService";

export const useLogin =
    getPendingErrorSuccessApiPatternFunction(({
        setIsError,
        setIsPending,
        setIsSuccess,
    }, pathPrefix) => {
        const login = async (username, password) => {
            setIsPending(true);
            try {
                const path = pathPrefix;
                const response = await api.post(path, { username, password });
                if (response.data) {
                    const jwt = response.data['jwt_token'];
                    const userId = response.data["user_id"];
                    const name = response.data["name"];
                    const username = response.data["user_name"];
                    const pageAccess = response.data["page_access_list"];

                    if (jwt) {
                        window.localStorage.setItem('jwt_token', jwt);
                        window.localStorage.setItem('user_id', userId);
                        window.localStorage.setItem('name', name);
                        window.localStorage.setItem('username', username);
                        window.localStorage.setItem('page_access_list', JSON.stringify(pageAccess));
                    }

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

        return login;
    })('api/token');


export const useLogOut = () => {
    const logOut = (callback) => {
        const jwt = window.localStorage.getItem('jwt_token');
        if (jwt) {
            /**Simply remove the jwt token */
            window.localStorage.removeItem('jwt_token');
            window.localStorage.removeItem('user_id');
            window.localStorage.removeItem('name');
            window.localStorage.removeItem('username');
            window.localStorage.removeItem('page_access_list');
        }

        callback();
    }

    return { logOut };
}

export const hasLoggedIn = () => {
    if (!window || !window.localStorage) {
        return false;
    }

    return !!window.localStorage.getItem('user_id');
}

export const getCurrentUserId = () => {
    if (!window || !window.localStorage) {
        return false;
    }

    return window.localStorage.getItem('user_id');
}
