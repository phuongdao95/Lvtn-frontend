import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import NotificationCard from './NotificationCard';
import Typography from '@mui/material/Typography';
import { Notifications } from '@mui/icons-material';
import { Badge, Divider } from '@mui/material';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { useDeleteAllNotification, useFetchNotificationsOfUser, useMarkAllNotificationAsRead } from '../../client/notificationService';
import { getCurrentUserId } from '../../client/autheticationService';
import { grey } from '@mui/material/colors';

function HubNotify({ onReceiveMessage }) {
    const [connection, setConnection] = React.useState(null);

    React.useEffect(() => {
        const connect = new HubConnectionBuilder()
            .withUrl("https://localhost:7115/notification", {
                accessTokenFactory: () =>
                    window.localStorage.getItem('jwt_token')
            })
            .withAutomaticReconnect()
            .build();

        setConnection(connect);

        return () => {
            if (connection) {
                connection.stop();
            }
        }
    }, []);

    React.useEffect(() => {
        if (connection) {
            connection
                .start()
                .then(() => {
                    connection.on("receiveMessage", (message) => {
                        onReceiveMessage(message);
                    });
                })
                .catch((error) => console.log(error));
        }
    }, [connection]);

    return (
        <>
        </>
    );

}


export default function NotificationMenu() {
    const [notifications, setNotifications] = React.useState([]);
    const [totalUnread, setTotalUnread] = React.useState(0);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const {
        isPending,
        isSuccess,
        isError,
        method: fetchNotificationOfUser,
        data: fetchedNotifications
    } = useFetchNotificationsOfUser();

    const {
        isPending: isMarkPending,
        isSuccess: isMarkSuccess,
        isError: isMarkError,
        method: markAllNotificationAsRead,
    } = useMarkAllNotificationAsRead();

    const {
        isPending: isDeletePending,
        isSuccess: isDeleteSuccess,
        isError: isDeleteError,
        method: deleteAllNotification,
    } = useDeleteAllNotification();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    React.useEffect(() => {
        fetchNotificationOfUser(getCurrentUserId());
    }, [])

    const handleReceiveMessage = React.useCallback((message) => {
        if (message === "refreshNotification") {
            fetchNotificationOfUser(getCurrentUserId());
        }
    }, [])

    React.useEffect(() => {
        if (isSuccess) {
            const data = fetchedNotifications.data.map((notification) => ({
                id: notification.id,
                title: notification.title,
                message: notification.message,
                dateTime: notification.dateTime,
                isRead: notification.isRead
            }))
            setNotifications(data)
            console.log(data)
            setTotalUnread(data.filter(item => !item.isRead).length);
        }
    }, [isSuccess])

    return (
        <React.Fragment>
            <HubNotify onReceiveMessage={handleReceiveMessage} />
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Tin nhắn">
                    <Badge badgeContent={totalUnread} color={"secondary"}>
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                        >
                            <Notifications sx={{ color: 'white' }} />
                        </IconButton>
                    </Badge>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        width: '325px',
                        minHeight: '400px',
                        paddingX: 1,
                        maxHeight: '500px',
                        overflowY: 'auto',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'right' }}>
                    <Button size='small'
                        sx={{ fontSize: 12, textTransform: 'none' }}
                        onClick={() => markAllNotificationAsRead(getCurrentUserId())}>
                        Đánh dấu đã đọc
                    </Button>
                    <Button size='small'
                        sx={{ fontSize: 12, textTransform: 'none' }}
                        onClick={() => deleteAllNotification(getCurrentUserId())}
                    >
                        Xóa toàn bộ
                    </Button>
                </Box>
                {notifications.length === 0 &&
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px'}}>
                        <Typography textAlign={"center"}>
                            Chưa có tin nhắn nào
                        </Typography>
                    </Box>
                }
                {notifications.map(({ id, message, title, dateTime, isRead }, index) =>
                    <Box >
                        <Box sx={{ padding: 2, position: 'relative', background: !isRead ? grey[300] : 'white' }}>
                            <NotificationCard
                                id={id}
                                message={message}
                                title={title}
                                dateTime={dateTime}
                                isRead={isRead}
                            />
                        </Box>

                        {index != notifications.length - 1 &&
                            < Divider />
                        }
                    </Box>
                )}
            </Menu>
        </React.Fragment>
    );
}
