import React from "react";
import Dialog from "../../../components/Dialog";
import BasicTable from "../../../components/BasicTable";
import dayjs from "dayjs";
import { useFetchTimekeepingHistoriesOfTimekeeping, useFetchTimekeepingsOfUser } from "../../../client/timekeepingService";

const getPermissionColumnConfig = () => {
    return [
        {
            field: "id",
            headerName: "Id",
            size: "small"
        },
        {
            field: "dateTime",
            headerName: "Giờ",
            size: "small",
        },
        {
            field: "type",
            headerName: "Loại",
            size: "small",
        },
    ]
}

export default function TimekeepingHistoryManage({ closeDialogCb, id }) {
    const [histories, setHistories] = React.useState([]);

    const {
        isPending,
        isSuccess,
        isError,
        data: fetchedHistories,
        method: fetchHistories,
    } = useFetchTimekeepingHistoriesOfTimekeeping();

    React.useEffect(() => {
        fetchHistories(id);
    }, [])

    React.useEffect(() => {
        if (isSuccess) {
            const data = fetchedHistories.data.map((history) => ({
                id: history.id,
                dateTime: history.dateTime,
                type: history.isCheckIn ? "Check in" : "Check out",
            }))

            setHistories(data);
        }
    }, [isSuccess])

    return <Dialog
        sx={{ position: 'relative' }}
        secondaryAction={{
            text: "Cancel",
            handler: closeDialogCb
        }}
        title="Lịch sử chấm công"
    >
        {histories.length > 0 ?
            <BasicTable
                rows={histories?.map((event) => ({
                    id: <p style={{ textTransform: 'capitalize' }}>
                        {event.id}</p>,
                    dateTime: <p style={{ textTransform: 'capitalize' }}>
                        {dayjs(event.dateTime).format("HH:mm")}</p>,
                    type: <p style={{ textTransform: 'capitalize' }}>
                        {event.type}</p>,
                })) ?? []}
                columns={getPermissionColumnConfig()}
                maxHeight={'250px'}
            />
            :
            <div>
                Không có lịch sử nào
            </div>
        }
    </Dialog>;
}