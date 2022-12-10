import React from "react";
import Dialog from "../../../components/Dialog";
import BasicTable from "../../../components/BasicTable/";
import ActionButton from "../../../components/DataGrid/ActionButton";
import { Box } from "@mui/material";
import { useFetchRegistrationListOfUser, useFetchWorkingShiftsOfUser } from "../../../client/workingShiftService";
import { getCurrentUserId } from "../../../client/autheticationService";
import dayjs from "dayjs";
import TimekeepingHistory from "./TimekeepingHistory";
import { useFetchTimekeepingsOfUser } from "../../../client/timekeepingService";

const getPermissionColumnConfig = () => {
    return [
        {
            field: "startTime",
            headerName: "Bắt đầu",
            size: "small"
        },
        {
            field: "endTime",
            headerName: "Kết thúc",
            size: "small",
        },
        {
            field: "didCheckIn",
            headerName: "Checkin",
            size: "small",
        },
        {
            field: "didCheckout",
            headerName: "Checkout",
            size: "small",
        },
        {
            field: "type",
            headerName: "Loại",
            size: "small",
        },
        {
            field: "action",
            headerName: "Thao tác",
            size: "small",
        }
    ]
}

export default function TimekeepingsOfDay({
    closeDialogCb,
    date,
}) {
    const [isHistoryOpen, setIsHistoryOpen] = React.useState(false);
    const [events, setEvents] = React.useState([]);

    const {
        isPending,
        isError,
        isSuccess,
        method: fetchWorkingShifts,
        data: fetched
    } = useFetchTimekeepingsOfUser();

    React.useEffect(() => {
        fetchWorkingShifts(getCurrentUserId(), date.format('DD/MM/YYYY'), 'date');
    }, [])

    React.useEffect(() => {
        if (isSuccess) {
            const events = fetched.data.map((item) => ({
                startTime: dayjs(item.workingShiftEvent.startTime).format('HH:mm'),
                endTime: dayjs(item.workingShiftEvent.endTime).format('HH:mm'),
                didCheckIn: item.didCheckIn,
                didCheckout: item.didCheckout
            }));

            setEvents(events);
        }
    }, [isSuccess])

    return <Dialog
        sx={{ position: 'relative' }}
        primaryAction={{
            text: "Submit",
            handler: () => {
            },
        }}
        secondaryAction={{
            text: "Cancel",
            handler: closeDialogCb
        }}
        title={`Lịch làm việc ${date.format('DD/MM/YYYY')}`}
    >
        {isHistoryOpen && <TimekeepingHistory
            closeDialogCb={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setIsHistoryOpen(false)
            }} />}

        <BasicTable
            rows={events?.map((event) => ({
                startTime: <p style={{ textTransform: 'capitalize' }}>
                    {event.startTime}</p>,
                endTime: <p style={{ textTransform: 'capitalize' }}>
                    {event.endTime}</p>,
                didCheckIn: <p style={{ textTransform: 'capitalize' }}>
                    {event.didCheckIn ? "Yes" : "No"}</p>,
                didCheckout: <p style={{ textTransform: 'capitalize' }}>
                    {event.didCheckout ? "Yes" : "No"}</p>,
                action: <Box sx={{ display: 'flex', gap: '2px' }}>
                    <ActionButton>
                        Chấm công
                    </ActionButton>
                    <ActionButton onClick={() => setIsHistoryOpen(true)}>
                        Lịch sử
                    </ActionButton>
                </Box>
            })) ?? []}
            columns={getPermissionColumnConfig()}
            maxHeight={'250px'}
        />
    </Dialog >;
}