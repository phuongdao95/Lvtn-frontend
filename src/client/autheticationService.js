import api from "./api";
import { getPendingErrorSuccessApiPatternFunction } from "./crudService";

const routeMap = {
    "/my-profile": "my_profile",
    "/user": "user_list",
    "/role": "role_list",
    "/permission": "permission_list",
    "department": "team_list",
    "group": "group_list",
    "department": "department_list",

    "/dab": "dab_list",
    "my_dab": "my_dab",
    "/my-payslip": "my_payslip",
    "/formula": "salary_formula_list",
    "/variable": "salary_variable_list",
    "/salary-group": "salary_group_list",
    "/payroll": "payroll_list",

    "/virtual-space/board": "board_list",
    "/virtual-space/task": "task_list",
    "/virtual-space/my-board": "board_list_of_team",
    "/virtual-space/my-board/:id/task": "task_list_of_board",
    "/virtual-space/": "label_list_of_board",

    ["timekeeping_image_registration"]: "",
    ["timekeeping_check_in"]: "/check-in",
    ["timekeeping_check_out"]: "/check-out",
    ["timekeeping_list"]: "/timekeeping",
    ["workingshift_list"]: "/workingshift",
};

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

export const isAllowedToVisitRoute = (pathname) => {
    if (!window && !window.localStorage) {
        return false;
    }

    if (!window.localStorage.getItem('page_access_list')) {
        return false;
    }

    try {
        const localStorage = window.localStorage;
        const pageAccessList = JSON.parse(localStorage.getItem('page_access_list'));
        if (pageAccessList.includes(routeMap[pathname])) {
            return true;
        }
    }
    catch (err) {
        console.err(err);
        return false;
    }
}