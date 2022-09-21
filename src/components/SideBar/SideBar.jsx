import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import Chip from '@mui/material/Chip';

import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ContactsIcon from '@mui/icons-material/Contacts';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import WorkIcon from '@mui/icons-material/Work';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const SideBar = (props) => {

    const theme = useTheme();

    const handleDrawerClose = () => {
        props.onCloseSideBar();
    };

    const routes = [
        {
            link: "/",
            text: "Trang chủ",
            icon: <HomeIcon />
        },
        {
            link: "/user-info",
            text: "Thông tin cá nhân",
            icon: <PersonIcon />
        },
        {
            link: "/about-us",
            text: "Về chúng tôi",
            icon: <ContactsIcon />
        },
        {
            link: "/check-in",
            text: "Chấm công",
            icon: <FactCheckIcon />
        },
        {
            link: "/virtual-space",
            text: "Môi trường ảo",
            icon: <WorkIcon />
        }
    ];

    const awItems = [
        {
            link: "/approve-workflows",
            text: "Approve Workflows",
            icon: <ThumbUpAltIcon />
        },
        {
            link: "/approve-workflows/my-requests",
            text: "My Requests",
            icon: <HourglassTopIcon />
        },
        {
            link: "/approve-workflows/user-nghi-phep",
            text: "Nghi Phep",
            icon: <HourglassTopIcon />
        },
        {
            link: "/approve-workflows/config-nghi-phep",
            text: "Nghi Phep Config",
            icon: <HourglassTopIcon />
        },
        {
            link: "/approve-workflows/user-nghi-thai-san",
            text: "Nghi Thai San",
            icon: <HourglassTopIcon />
        },
        {
            link: "/approve-workflows/config-nghi-thai-san",
            text: "Nghi Thai San Config",
            icon: <HourglassTopIcon />
        }
    ];

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="persistent"
            anchor="left"
            open={props.open}
        >
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </DrawerHeader>

            <Divider>
                <Chip icon={<ManageAccountsIcon />} label="Account" variant="outlined" />
            </Divider>

            <List>
                {routes.map((route, index) => (
                    <Link key={index} to={route.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {route.icon}
                                </ListItemIcon>
                                <ListItemText primary={route.text} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>

            <Divider>
                <Chip icon={<ThumbUpAltIcon />} label="Approve Workflow" variant="outlined" />
            </Divider>

            <List>
                {awItems.map((item, index) => (
                    <Link key={index} to={item.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </Drawer>
    )
}

export default SideBar;