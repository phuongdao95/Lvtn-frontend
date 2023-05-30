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
import { AddAlarm, AttachMoney, Settings, AlarmOff } from '@mui/icons-material';
import NavigationItem from './NavigationItem';
import { useLogOut } from '../../client/autheticationService';

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

    const { logOut } = useLogOut();

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
                    pageName: 'user_list',
                    onClick: () => {
                        navigate("/user");
                    }
                },
                {
                    text: "Quản lý Chức vụ",
                    pageName: 'role_list',
                    onClick: () => {
                        navigate("/role");
                    }
                },
                {
                    text: "Quản lý Quyền",
                    pageName: 'permission_list',
                    onClick: () => {
                        navigate("/permission");
                    }
                },
                {
                    text: "Quản lý Department",
                    pageName: 'department_list',
                    onClick: () => {
                        navigate("/department");
                    }
                },
                {
                    text: "Quản lý Team",
                    pageName: 'team_list',
                    onClick: () => {
                        navigate("/team");
                    }
                },

                {
                    text: "Quản lý Nhóm",
                    pageName: 'group_list',
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
                    pageName: 'dab_list',
                    onClick: () => {
                        navigate("/dab");
                    }
                },
                {
                    text: "Công thức và Biến",
                    pageName: 'formula_variable_list',
                    onClick: () => {
                        navigate("/formula-variable")
                    }
                },
                {
                    text: "Khấu trừ, Phụ cấp, Thưởng của tôi",
                    pageName: 'my_dab',
                    onClick: () => {
                        navigate("/my-dab")
                    }
                },
                {
                    text: "Danh sách Payslip của tôi",
                    pageName: 'my_payslip',
                    onClick: () => {
                        navigate("/my-payslips")
                    },
                },
                {
                    text: "Danh sách Payroll",
                    pageName: 'payroll_list',
                    onClick: () => {
                        navigate("/payroll")
                    }
                },
                {
                    text: "Danh sách nhóm lương",
                    pageName: 'salary_group_list',
                    onClick: () => {
                        navigate("/salary-group")
                    }
                },
                {
                    text: "Báo cáo",
                    pageName: 'salary_report',
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
                    pageName: 'approve_workflow_list',
                    onClick: () => {
                        navigate("/approve-workflows")
                    }
                },
                {
                    text: "Danh sách request đã tạo",
                    pageName: 'approve_workflow_config_list',
                    onClick: () => {
                        navigate("/approve-workflows/my-requests")
                    }
                },
                {
                    text: "Danh sách request cần xem xét",
                    pageName: 'my_todo_request',
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
                    text: "Team của tôi",
                    pageName: 'my_team',
                    onClick: () => {
                        navigate("/my-team")
                    }
                },
                {
                    text: "Bảng công việc",
                    pageName: 'taskboard_list',
                    onClick: () => {
                        navigate("/taskboard")
                    }
                },
                {
                    text: "Báo cáo và thống kê tổng quát",
                    pageName: 'taskboard_report',
                    onClick: () => {
                        navigate("/taskboard-report")
                    }
                },
            ]
        },

        {
            text: "Chấm công",
            icon: <AddAlarm style={{ color: textColor }} />,
            onClick: () => { },
            subItems: [
                {
                    text: "Chấm công",
                    pageName: 'check_in',
                    onClick: () => {
                        navigate("/check-in")
                    }
                },
                {
                    text: "Đăng ký hình ảnh",
                    pageName: 'image_registration',
                    onClick: () => {
                        navigate("/registe-image")
                    }
                },
                {
                    text: "Lịch chấm công",
                    pageName: 'timekeeping_schedule',
                    onClick: () => {
                        navigate("/timekeeping-schedule")
                    }
                },
                {
                    text: "Danh sách ca làm",
                    pageName: 'workingshift_list',
                    onClick: () => {
                        navigate("/workingshift")
                    }
                },
                {
                    text: "Danh sách ngày nghỉ",
                    pageName: 'workingshift_dayconfig',
                    onClick: () => {
                        navigate("/workingshiftdayconfig");
                    }
                },
                {
                    text: "Đăng ký ca làm",
                    pageName: 'workingshift_registration',
                    onClick: () => {
                        navigate("/workingshift-registration")
                    }
                },
                {
                    text: "Danh sách đã đăng ký",
                    pageName: 'registered_workingshift',
                    onClick: () => {
                        navigate("/registered-workingshift")
                    }
                },
                {
                    text: "Thống kê chấm công",
                    pageName: 'timekeeping_manage',
                    onClick: () => {
                        navigate("/timekeeping-manage")
                    }
                },
                {
                    text: "Quản lý ca làm",
                    pageName: 'workingshift_registration_of_user',
                    onClick: () => {
                        navigate("/workingshift-registration-of-user")
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
                {routes.map((route) => {
                    const pageAccessList = window?.localStorage?.getItem('page_access_list');
                    let processedList = [];
                    if (!pageAccessList || !Array.isArray(processedList = JSON.parse(pageAccessList)) ) {
                        logOut(() => navigate('/'));
                    }

                    const intersectioned = processedList.filter((n) => {
                        return route.subItems.map((item) => item.pageName).indexOf(n) !== -1;
                    })


                    const containsAtLeastOne = intersectioned.length !== 0;

                    if (containsAtLeastOne || route.subItems.length === 0 ) {
                        return <NavigationItem
                            key={route.text}
                            icon={route.icon}
                            text={route.text}
                            onClick={route.onClick}
                            subItems={route.subItems}
                        />
                    }

                }
                )}
            </List>
        </Drawer>
    )
}

export default SideBar;