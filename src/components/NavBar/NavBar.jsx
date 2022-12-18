import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import AccountMenu from './AccountMenu';
import NotificationMenu from './NotificationMenu';

const NavBar = (props) => {
    const handleSideBarOpen = () => {
        props.onOpenSideBar();
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky">
                <Toolbar>
                    {!props.open && <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        sx={{ mr: 2 }}
                        onClick={handleSideBarOpen}
                    >
                        <MenuIcon />
                    </IconButton>}
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                        textTransform='capitalize'
                    >
                        Hệ thống quản lý nhân viên
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <NotificationMenu />
                        <AccountMenu />
                    </Box>
                </Toolbar>
            </AppBar>

        </Box>
    );
}

export default NavBar;