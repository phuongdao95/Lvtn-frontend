import { Navigate } from "react-router";
import { hasLoggedIn } from "../../client/autheticationService";

const isAllowedToVist = () => {
    return true;
}

export default function ProtectedRoute({ component, pageName }) {
    if (!hasLoggedIn()) {
        return <Navigate to={"/"} />
    }

    if (!isAllowedToVist(pageName)) {
        return <Navigate to={"/403"} />
    }

    return component;
}