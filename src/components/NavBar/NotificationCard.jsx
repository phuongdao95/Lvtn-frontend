import { Box, IconButton } from "@mui/material"
import { Typography } from "@mui/material"
import { Fragment } from "react"
import { HubConnectionBuilder } from "@microsoft/signalr";
import dayjs from "dayjs"
import React from "react";
import { grey } from "@mui/material/colors";
import { useDeleteAllNotification, useDeleteNotifiication } from "../../client/notificationService";


export default function NotificationCard({
    id,
    title,
    message,
    dateTime,
}) {
    const {
        method: deleteNotification
    } = useDeleteNotifiication();

    return <Fragment>
        <Box sx={{ position: 'absolute', top: '1px', right: '8px' }}>
            <IconButton sx={{ height: '10px', width: '10px' }} onClick={() => deleteNotification(id)}>
                x
            </IconButton>
        </Box>

        <Box sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '400px',
            overflow: 'hidden',
            gap: 0.5,
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 0.25,
            }}>
                <Typography noWrap sx={{ fontWeight: 'bold', fontSize: 15 }}>
                    {title}
                </Typography>
                <Typography noWrap whiteSpace={"normal"} sx={{ fontSize: 15 }}>
                    {message}
                </Typography>
            </Box>
            <Box>
                <Typography sx={{ fontSize: 12 }}>
                    Vào lúc {dayjs(dateTime).format('HH:mm DD/MM/YYYY')}
                </Typography>
            </Box>
        </Box>
    </Fragment>
}