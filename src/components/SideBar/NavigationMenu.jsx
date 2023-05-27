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
import DashboardIcon from '@mui/icons-material/Dashboard';
import { grey, lightBlue } from '@mui/material/colors';
import { AddAlarm, AttachMoney, Settings, AlarmOff } from '@mui/icons-material';
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
            onClick: (e) => {
                e.stopPropagation();
                navigate("/profile");
            },
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

                {
                    text: "Quản lý Nhóm",
                    onClick: () => {
                        navigate("/group")
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
                        navigate("/formula-variable")
                    }
                },
                {
                    text: "Khấu trừ, Phụ cấp, Thưởng của tôi",
                    onClick: () => {
                        navigate("/my-dab")
                    }
                },
                {
                    text: "Danh sách Payslip của tôi",
                    onClick: () => {
                        navigate("/my-payslips")
                    },
                },
                {
                    text: "Danh sách Payroll",
                    onClick: () => {
                        navigate("/payroll")
                    }
                },
                {
                    text: "Danh sách nhóm lương",
                    onClick: () => {
                        navigate("/salary-group")
                    }
                },
                {
                    text: "Báo cáo",
                    onClick: () => {
                        navigate("/salary-report")
                    }
                }
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
                },
                {
                    text: "Danh sách request cần xem xét",
                    onClick: () => {
                        navigate("/approve-workflows/my-todo-requests")
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
                    text: "Danh sách bảng công việc",
                    onClick: () => {
                        navigate("/taskboard")
                    }
                },
                {
                    text: "Danh sách báo cáo",
                    onClick: () => {
                        navigate("/taskboard-report")
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
                    text: "Lịch chấm công",
                    onClick: () => {
                        navigate("/timekeeping-schedule")
                    }
                },
                {
                    text: "Danh sách ca làm",
                    onClick: () => {
                        navigate("/workingshift")
                    }
                },
                {
                    text: "Danh sách ngày nghỉ",
                    onClick: () => {
                        navigate("/workingshiftdayconfig");
                    }
                },
                {
                    text: "Đăng ký ca làm",
                    onClick: () => {
                        navigate("/workingshift-registration")
                    }
                },
                {
                    text: "Danh sách đã đăng ký",
                    onClick: () => {
                        navigate("/registered-workingshift")
                    }
                },
                {
                    text: "Thống kê chấm công",
                    onClick: () => {
                        navigate("/timekeeping-manage")
                    }
                },
            ]
        },
        // {
        //     text: "Ngày nghỉ",
        //     icon: <AlarmOff style={{ color: textColor }} />,
        //     onClick: () => { },
        //     subItems: [
        //         {
        //             text: "Department quản lý",
        //             onClick: () => {
        //                 navigate("/leave-balance/members")
        //             }
        //         },
        //         {
        //             text: "Của tôi",
        //             onClick: () => {
        //                 navigate("/leave-balance/me")
        //             }
        //         }
        //     ]
        // },

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