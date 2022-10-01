import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MailMenu from "./MailMenu";
import AccountMenu from './AccountMenu';
import NotificationMenu from './NotificationMenu';

const NavBar = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

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
                        aria-label="open drawer"
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
                        fontStyle={"italic"}
                    >
                        Hệ Thống Quản Lý Nhân Viên
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <MailMenu />
                        <NotificationMenu />
                        <AccountMenu />
                    </Box>
                </Toolbar>
            </AppBar>

        </Box>
    );
}

export default NavBar;