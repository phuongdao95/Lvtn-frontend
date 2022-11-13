import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { grey, lightBlue } from '@mui/material/colors';
import { AddAlarm, AttachMoney, Settings } from '@mui/icons-material';
import NavigationItem from './NavigationItem';

const drawerWidth = 240;

const textColor = grey[800];

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));




const SideBar = (props) => {
    const navigate = useNavigate();

    const theme = useTheme();

    const handleDrawerClose = () => {
        props.onCloseSideBar();
    };

    const routes = [
        {
            text: "Thông tin cá nhân",
            onClick: () => { },
            icon: <PersonIcon style={{ color: textColor }} />,
            subItems: []
        },

        {
            text: "Quản lý hành chính",
            onClick: () => { },
            icon: <HomeIcon style={{ color: textColor }} />,
            subItems: [
                {
                    text: "Quản lý Người dùng",
                    onClick: () => {
                        navigate("/user");
                    }
                },
                {
                    text: "Quản lý Chức vụ",
                    onClick: () => {
                        navigate("/role");
                    }
                },
                {
                    text: "Quản lý Quyền",
                    onClick: () => {
                        navigate("/permission");
                    }
                },
                {
                    text: "Quản lý Department",
                    onClick: () => {
                        navigate("/department");
                    }
                },
                {
                    text: "Quản lý Team",
                    onClick: () => {
                        navigate("/team");
                    }
                },

            ]
        },

        {
            text: "Quản lý lương",
            icon: <AttachMoney style={{ color: textColor }} />,
            onClick: () => { },
            subItems: [
                {
                    text: "Khấu trừ, Phụ cấp, Thưởng",
                    onClick: () => {
                        navigate("/dab");
                    }
                },
                {
                    text: "Công thức và Biến",
                    onClick: () => {
                        navigate("/formula")
                    }
                },
                {
                    text: "Khấu trừ, Phụ cấp, Thưởng của tôi",
                    onClick: () => {
                        navigate("/my-dab")
                    }
                },
                {
                    text: "Danh sách Payroll",
                    onClick: () => {
                        navigate("/payroll")
                    }
                },
            ]
        },

        {
            text: "Quản lý phê duyệt",
            icon: <FactCheckIcon style={{ color: textColor }} />,
            onClick: () => { },
            subItems: [
                {
                    text: "Tạo mới request",
                    onClick: () => {
                        navigate("/approve-workflows")
                    }
                },
                {
                    text: "Danh sách request đã tạo",
                    onClick: () => {
                        navigate("/approve-workflows/my-requests")
                    }
                }
            ]
        },

        {
            text: "Môi trường ảo",
            icon: <AssignmentIcon style={{ color: textColor }} />,
            onClick: () => { },
            subItems: [
                {
                    text: "Bảng công việc",
                    onClick: () => {
                        navigate("/virtual-space")
                    }
                },
                {
                    text: "Danh sách Bảng",
                    onClick: () => {

                    }
                }
            ]
        },

        {
            text: "Chấm công",
            icon: <AddAlarm style={{ color: textColor }} />,
            onClick: () => { },
            subItems: [
                {
                    text: "Chấm công",
                    onClick: () => {
                        navigate("/check-in")
                    }
                },
                {
                    text: "Đăng ký hình ảnh",
                    onClick: () => {
                        navigate("/registe-image")
                    }
                },
                {
                    text: "Lịch biểu",
                    onClick: () => {
                        navigate("/calendar")
                    }
                },
                {
                    text: "Chọn ca làm",
                    onClick: () => {
                        navigate("/select-type-work-shift")
                    }
                },
            ]
        },

        {
            text: "Cài đặt",
            icon: <Settings style={{ color: textColor }} />,
            onClick: () => { },
            subItems: [
                {
                    text: "Cài đặt chấm công",
                    onClick: () => {
                        navigate("/check-day-config/type-work-shift-day")
                    }
                },
                {
                    text: "Cài đặt môi trường ảo",
                    onClick: () => {
                        navigate("/virtual-space-config/table")
                    }
                },
            ]
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
                    background: lightBlue[100],
                    color: textColor,
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

            <List>
                {routes.map((route) =>
                    <NavigationItem
                        key={route.text}
                        icon={route.icon}
                        text={route.text}
                        onClick={route.onClick}
                        subItems={route.subItems}
                    />
                )}
            </List>
        </Drawer>
    )
}

export default SideBar;