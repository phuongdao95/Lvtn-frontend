import { useLocation } from "react-router";
import { hasLoggedIn, isAllowedToVisitRoute } from "../../client/autheticationService";
import UnauthenticatedDialog from "./UnauthenticatedDialog";
import UnauthorizedDialog from "./UnauthorizedDialog";


export default function ProtectedRoute({ children }) {
    const location = useLocation();

    if (!hasLoggedIn()) {
        return <UnauthenticatedDialog />
    }

    if (!isAllowedToVisitRoute(location.pathname)) {
        return <UnauthorizedDialog />
    }

    return children;
}