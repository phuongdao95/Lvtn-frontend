import { Navigate } from "react-router";
import { hasLoggedIn } from "../../client/autheticationService";

const isAllowedToVist = (pageName) => {
    const pageAccessList = window?.localStorage?.getItem('page_access_list');
    if (!pageAccessList) {
        return false;
    }

    return pageAccessList.includes(pageName);
}

export default function ProtectedRoute({ component, pageName }) {
    if (!hasLoggedIn()) {
        return <Navigate to={"/"} />
    }

    // if (!isAllowedToVist(pageName)) {
    //     return <Navigate to={"/403"} />
    // }

    return component;
}