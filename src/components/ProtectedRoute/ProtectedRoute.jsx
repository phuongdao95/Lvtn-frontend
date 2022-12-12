import { Navigate, useNavigate } from "react-router";
import { hasLoggedIn } from "../../client/autheticationService";


export default function ProtectedRoute({ component, pageName }) {
    if (!hasLoggedIn()) {
        return <Navigate to={"/"}/>
    }

    return component;
}