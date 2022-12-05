import React, { Fragment } from "react";

import DataGrid from "../../../components/DataGrid";
import { Typography, Box } from "@mui/material";
import { useFetchTaskHistoriesOfTask } from "../../../client/taskService";
import dayjs from "dayjs";

const getColumnConfig = () => [
    {
        field: "id",
        headerName: "Id",
        width: 150,
    },
    {
        field: "message",
        headerName: "Mô tả",
        width: 350,
    },
    {
        field: "dateTime",
        headerName: "Thời gian",
        width: 150,
    },
]

export default function TaskDetailHistory({ taskId }) {
    const {
        isPending,
        isSuccess,
        isError,
        method: fetchTaskHistories,
        data: fetchedTaskHistories,
    } = useFetchTaskHistoriesOfTask();

    React.useEffect(() => {
        fetchTaskHistories(taskId)
    }, [])

    return <Fragment>
        <Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Typography sx={{ fontWeight: 'bold' }}>{"Lịch sử thay đổi"}</Typography>
            </Box>
            <Box sx={{ padding: 2 }}>
                <DataGrid
                    rows={fetchedTaskHistories?.data?.map((row) => ({
                        ...row,
                        dateTime: dayjs(row.dateTime).format("DD/MM/YYYY HH:mm")
                    })) ?? []}
                    columns={getColumnConfig()}
                />
            </Box>
        </Box>;
    </Fragment>
}

