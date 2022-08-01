import * as React from 'react';
import NavBar from "./modules/shares/NavBar";
import SideBar from "./modules/shares/SideBar";
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const App = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar open={open}>
        <NavBar onOpenSideBar={() => setOpen(true)} open={open}/>
      </AppBar>
      <SideBar onCloseSideBar={() => setOpen(false)} open={open}/>
    </Box>
  );
}

export default App;
