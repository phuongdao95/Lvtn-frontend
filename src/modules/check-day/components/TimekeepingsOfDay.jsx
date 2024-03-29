import React from "react";
import Dialog from "../../../components/Dialog";
import BasicTable from "../../../components/BasicTable/";
import ActionButton from "../../../components/DataGrid/ActionButton";
import { Box } from "@mui/material";
import { getCurrentUserId } from "../../../client/autheticationService";
import { useFetchTimekeepingsOfUser } from "../../../client/timekeepingService";
import dayjs from "dayjs";
import TimekeepingHistory from "./TimekeepingHistory";

const getPermissionColumnConfig = () => {
    return [
        {
            field: "id",
            headerName: "Id",
            size: "small",
        },
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
            headerName: "Đã Checkin",
            size: "small",
        },
        {
            field: "didCheckout",
            headerName: "Đã Checkout",
            size: "small",
        },
        {
            field: "type",
            headerName: "Loại ca",
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
    const [timekeepingId, setTimekeepingId] = React.useState([]);

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
                id: item.id,
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
        secondaryAction={{
            text: "Cancel",
            handler: closeDialogCb
        }}
        title={`Lịch làm việc ${date.format('DD/MM/YYYY')}`}
    >
        {isHistoryOpen && <TimekeepingHistory
            id={timekeepingId}
            closeDialogCb={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setIsHistoryOpen(false)
                setTimekeepingId(null);
            }} />}

        {events.length > 0 ?
            <BasicTable
                rows={events?.map((event) => ({
                    id: <p style={{ textTransform: 'capitalize' }}>
                        {event.id}</p>,
                    startTime: <p style={{ textTransform: 'capitalize' }}>
                        {event.startTime}</p>,
                    endTime: <p style={{ textTransform: 'capitalize' }}>
                        {event.endTime}</p>,
                    didCheckIn: <p style={{ textTransform: 'capitalize' }}>
                        {event.didCheckIn ? "Có" : "Không"}</p>,
                    didCheckout: <p style={{ textTransform: 'capitalize' }}>
                        {event.didCheckout ? "Có" : "Không"}</p>,
                    action: <Box sx={{ display: 'flex', gap: '2px' }}>
                        <ActionButton onClick={() => {
                            setIsHistoryOpen(true);
                            setTimekeepingId(event.id);
                        }}>
                            Lịch sử
                        </ActionButton>
                    </Box>
                })) ?? []}
                columns={getPermissionColumnConfig()}
                maxHeight={'250px'}
            />
            :
            <div>
                Không có ca làm việc nào
            </div>
        }
    </Dialog >;
}