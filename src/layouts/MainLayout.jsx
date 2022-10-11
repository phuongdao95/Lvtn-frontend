import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import MuiAppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "../components/NavBar";
import NavigationMenu from "../components/SideBar/NavigationMenu";
import { blueGrey, grey } from "@mui/material/colors";

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
        background: blueGrey[100],
        marginTop: "60px",
        height: "calc(100vh - 60px)",
        ...(open && {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    })
);

export default function MainLayout({ children }) {
    const [open, setOpen] = React.useState(false);

    return <Box sx={{
        display: "flex"
    }}>
        <CssBaseline />

        <AppBar open={open}>
            <NavBar onOpenSideBar={() => setOpen(true)} open={open} />
        </AppBar>

        <NavigationMenu onCloseSideBar={() => setOpen(false)} open={open} />
        <Main open={open}>
            {children}
        </Main>
    </Box>;
}