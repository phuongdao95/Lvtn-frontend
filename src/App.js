import * as React from "react";
import NavBar from "./modules/main-components/NavBar";
import SideBar from "./modules/main-components/SideBar";
import MainContent from "./modules/main-components/MainContent";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ManageSalaryPage from "./modules/salary-management/pages/ManageSalaryPage/ManageSalaryPage";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    marginTop: "60px",
    backgroundColor: "#e6e6e6",
    height: "100vh",
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const App = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar open={open}>
        <NavBar onOpenSideBar={() => setOpen(true)} open={open} />
      </AppBar>
      <SideBar onCloseSideBar={() => setOpen(false)} open={open} />
      <Main open={open}>
        <MainContent />
      </Main>
    </Box>
  );
};

export default App;
