import { useLocation } from "react-router";
import { hasLoggedIn } from "./client/autheticationService";
import Routings from "./components/Routings";
import MainLayout from "./layouts/MainLayout";
import Login from "./modules/shares/pages/Login";

const LOGIN_PATH_NAME = "/";
export default function App() {
  const currentLocation = useLocation();

  return (
    currentLocation.pathname == LOGIN_PATH_NAME && !hasLoggedIn() ?
      <Login />
      :
      (<MainLayout >
        <Routings />
      </MainLayout >)
  );
};

