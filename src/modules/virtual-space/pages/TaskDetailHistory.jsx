import React, { Fragment } from "react";

import { Typography, Box } from "@mui/material";
import DataGrid from "../../../components/DataGrid";
import TaskDetailFileCreate from "./TaskDetailFileCreate";
import { useFetchTaskHistoriesOfTask } from "../../../client/taskService";


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
                    rows={fetchedTaskHistories?.data ?? []}
                    columns={getColumnConfig()}
                />
            </Box>
        </Box>;
    </Fragment>
}

