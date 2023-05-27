import React from "react";
import Dialog from "../../../components/Dialog";
import BasicTable from "../../../components/BasicTable/";
import ActionButton from "../../../components/DataGrid/ActionButton";
import { Box } from "@mui/material";
import { getCurrentUserId } from "../../../client/autheticationService";
import { useFetchTimekeepingsOfUser } from "../../../client/timekeepingService";
import dayjs from "dayjs";
import TimekeepingHistoryManage from "./TimekeepingHistoryManage";

import CreateAddedCheck from "./CreateAddedCheck";
import MenuButton from "../../../components/DataGrid/MenuButton";

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
            size: "small",
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
            field: "action",
            headerName: "Thao tác",
            size: "small",
        }
    ]
}

export default function TimekeepingsOfDayManager({
    closeDialogCb,
    date,
    id
}) {
    const [isHistoryOpen, setIsHistoryOpen] = React.useState(false);
    const [events, setEvents] = React.useState([]);
    const [timekeepingId, setTimekeepingId] = React.useState([]);
    const [timekeeping, setTimekeeping] = React.useState(null);
    const [isCreateOpen, setIsCreateOpen] = React.useState(false);

    const {
        isPending,
        isError,
        isSuccess,
        method: fetchWorkingShifts,
        data: fetched
    } = useFetchTimekeepingsOfUser();

    React.useEffect(() => {
        fetchWorkingShifts(id, date.format('DD/MM/YYYY'), 'date');
    }, [])

    React.useEffect(() => {
        console.log(isSuccess);
        if (isSuccess) {
            const events = fetched.data.map((item) => ({
                id: item.id,
                startTime: dayjs(item.workingShiftEvent.startTime).format('HH:mm'),
                endTime: dayjs(item.workingShiftEvent.endTime).format('HH:mm'),
                didCheckIn: item.didCheckIn,
                didCheckout: item.didCheckout
            }));
            // console.log(events)
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
        {isHistoryOpen && <TimekeepingHistoryManage
            id={timekeepingId}
            closeDialogCb={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setIsHistoryOpen(false)
                setTimekeepingId(null);
                fetchWorkingShifts(id, date.format('DD/MM/YYYY'), 'date');
            }} />}

        {isCreateOpen && <CreateAddedCheck
            workingShiftTimekeeping={timekeeping}
            closeDialogCb={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setIsCreateOpen(false)
                fetchWorkingShifts(id, date.format('DD/MM/YYYY'), 'date');
            }} 
            closeAfterSubmit={(event) => {
                setIsCreateOpen(false)
                fetchWorkingShifts(id, date.format('DD/MM/YYYY'), 'date');
            }}
            />}

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
                    action: 
                    <MenuButton
                        text={"Thao tác"}
                        menu={
                            [
                                {
                                    text: "Lịch sử",
                                    handler: () => {
                                        setIsHistoryOpen(true);
                                        setTimekeepingId(event.id);
                                    }
                                },
                                {
                                    text: "Chấm công bù",
                                    handler: () => {
                                        setTimekeeping(event);
                                        setIsCreateOpen(true);
                                    }
                                },
                            ]
                        }
                    />
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