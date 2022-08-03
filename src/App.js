import { Fragment } from "react";
import { Box } from "@mui/system";
import NavBar from "./modules/shares/NavBar";
import { DepartmentPage } from "./modules/shares/pages/DepartmentPage/DepartmentPage";

const App = () => {
  return (
    <Fragment>
      <NavBar />

      <Box sx={{ padding: 4 }}>
        <DepartmentPage />
      </Box>
    </Fragment>
  );
};

export default App;
