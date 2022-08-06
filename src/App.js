import { Fragment } from "react";
import { Box } from "@mui/system";
import NavBar from "./modules/shares/NavBar";
import { DepartmentPage } from "./modules/shares/pages/DepartmentPage/DepartmentPage";
import { AccountsAndRolesPage } from "./modules/shares/pages/AccountsAndRolesPage/AccountsAndRolesPage";

const App = () => {
  return (
    <Fragment>
      <NavBar />

      <Box sx={{ padding: 4 }}>
        <AccountsAndRolesPage />
      </Box>
    </Fragment>
  );
};

export default App;
