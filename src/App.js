import { useEffect } from "react";
import { useLocation } from "react-router";
import Routings from "./components/Routings";
import MainLayout from "./layouts/MainLayout";
import Login from "./modules/shares/pages/Login";

const LOGIN_PATH_NAME = "/login";

export default function App() {
  const currentLocation = useLocation();

  return (
    currentLocation.pathname == LOGIN_PATH_NAME ?
      <Login />
      :
      (<MainLayout >
        <Routings />
      </MainLayout >)

  );
};

